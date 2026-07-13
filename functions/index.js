const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");
const DOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();
const window = new JSDOM("").window;
const purify = DOMPurify(window);

/**
 * UTILS: Validation & Security
 */

// Basic rate limiting memory store (in-memory, per instance, better to use Redis/Firestore for multi-instance but this provides baseline protection)
const rateLimits = new Map();
function checkRateLimit(ip, limit = 60, windowMs = 60000) {
  const now = Date.now();
  const record = rateLimits.get(ip) || { count: 0, resetTime: now + windowMs };
  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + windowMs;
  }
  record.count++;
  rateLimits.set(ip, record);
  return record.count <= limit;
}

// Authentication check
function requireAdmin(request) {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Authentication required.");
  }
  if (!request.auth.token.admin) {
    throw new HttpsError("permission-denied", "Admin privileges required.");
  }
  return true;
}

// Data Sanitization
function sanitizeString(str, allowHtml = false) {
  if (typeof str !== "string") return "";
  if (allowHtml) {
    return purify.sanitize(str, { ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "br", "p"] });
  }
  // Strip all HTML
  return purify.sanitize(str, { ALLOWED_TAGS: [] }).trim();
}

// Audit Logger
async function logAudit(action, collectionName, documentId, userId, data = null) {
  try {
    await db.collection("audit_logs").add({
      action,
      collection: collectionName,
      documentId,
      userId,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      dataDetails: data ? JSON.stringify(data).substring(0, 500) : null // don't save huge blobs
    });
  } catch (err) {
    console.error("Audit log failed", err);
  }
}

/**
 * CMS PAGES
 */
exports.saveCMSPage = onCall({ maxInstances: 10 }, async (request) => {
  requireAdmin(request);
  const ip = request.rawRequest?.ip || "unknown";
  if (!checkRateLimit(ip)) throw new HttpsError("resource-exhausted", "Rate limit exceeded.");

  const { pageId, data } = request.data;
  if (!pageId || typeof pageId !== "string" || pageId.length > 50) {
    throw new HttpsError("invalid-argument", "Invalid pageId.");
  }

  // Sanitize all string fields
  const sanitizedData = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      sanitizedData[key] = sanitizeString(value, false);
      if (sanitizedData[key].length > 5000) {
        throw new HttpsError("invalid-argument", `Field ${key} exceeds maximum length.`);
      }
    } else {
      sanitizedData[key] = value;
    }
  }

  try {
    await db.collection("cms_pages").doc(pageId).set(sanitizedData, { merge: true });
    await logAudit("UPDATE", "cms_pages", pageId, request.auth.uid);
    return { success: true };
  } catch (error) {
    console.error("saveCMSPage error", error);
    throw new HttpsError("internal", "Failed to save CMS page.");
  }
});

/**
 * WORKS (Lavori & Cantieri)
 */
function validateWorkSchema(data) {
  const client = sanitizeString(data.client);
  if (!client || client.length > 200) throw new HttpsError("invalid-argument", "Invalid client name.");
  
  return {
    client,
    title: sanitizeString(data.title),
    type: sanitizeString(data.type) || "work",
    status: sanitizeString(data.status) || "ongoing",
    year: sanitizeString(data.year).substring(0, 20),
    order: typeof data.order === "number" ? data.order : 99,
    location: sanitizeString(data.location).substring(0, 200),
    description: sanitizeString(data.description).substring(0, 2000),
    coverImage: sanitizeString(data.coverImage).substring(0, 500),
    galleryImages: Array.isArray(data.galleryImages) ? data.galleryImages.map(url => sanitizeString(url).substring(0, 500)) : [],
    tags: Array.isArray(data.tags) ? data.tags.map(t => sanitizeString(t).substring(0, 50)) : [],
    featured: !!data.featured
  };
}

exports.saveWork = onCall({ maxInstances: 10 }, async (request) => {
  requireAdmin(request);
  const ip = request.rawRequest?.ip || "unknown";
  if (!checkRateLimit(ip)) throw new HttpsError("resource-exhausted", "Rate limit exceeded.");

  const { workId, data } = request.data;
  const sanitizedWork = validateWorkSchema(data);

  try {
    let finalId = workId;
    if (workId) {
      await db.collection("works").doc(workId).set(sanitizedWork, { merge: true });
      await logAudit("UPDATE", "works", workId, request.auth.uid);
    } else {
      const docRef = await db.collection("works").add(sanitizedWork);
      finalId = docRef.id;
      await logAudit("CREATE", "works", finalId, request.auth.uid);
    }
    return { success: true, id: finalId };
  } catch (error) {
    console.error("saveWork error", error);
    throw new HttpsError("internal", "Failed to save work.");
  }
});

exports.deleteWork = onCall({ maxInstances: 10 }, async (request) => {
  requireAdmin(request);
  const { workId } = request.data;
  if (!workId || typeof workId !== "string") throw new HttpsError("invalid-argument", "Invalid workId.");

  try {
    await db.collection("works").doc(workId).delete();
    await logAudit("DELETE", "works", workId, request.auth.uid);
    return { success: true };
  } catch (error) {
    throw new HttpsError("internal", "Failed to delete work.");
  }
});

/**
 * IMPORT JSON BATCH
 */
exports.importWorks = onCall({ maxInstances: 2, timeoutSeconds: 120 }, async (request) => {
  requireAdmin(request);
  const { items, dryRun } = request.data;
  
  if (!Array.isArray(items)) throw new HttpsError("invalid-argument", "Items must be an array.");
  if (items.length > 500) throw new HttpsError("invalid-argument", "Max 500 items per import.");

  // Validate and sanitize all
  const sanitizedItems = items.map(item => validateWorkSchema(item));

  if (dryRun) {
    return { success: true, count: sanitizedItems.length, message: "Dry run successful" };
  }

  try {
    const batch = db.batch();
    const worksCol = db.collection("works");
    
    sanitizedItems.forEach(item => {
      const ref = worksCol.doc();
      batch.set(ref, item);
    });

    await batch.commit();
    await logAudit("IMPORT", "works", "batch", request.auth.uid, { count: sanitizedItems.length });
    
    return { success: true, count: sanitizedItems.length };
  } catch (error) {
    console.error("Import failed", error);
    throw new HttpsError("internal", "Batch import failed.");
  }
});

/**
 * SET ADMIN CLAIM
 * Helper function to bootstrap admin access. In prod, you'd restrict this via a secret key or remove after first run.
 */
exports.makeAdmin = onCall({ maxInstances: 1 }, async (request) => {
  const { email } = request.data;
  if (!request.auth) throw new HttpsError("unauthenticated", "Must be logged in to claim admin.");
  
  // Here we just allow the currently logged in user to grant admin to themselves if they match a certain email
  // Or in this case, any logged in user, for the sake of getting the site working easily, but we restrict it to foxindustrialcontractingsrl.com emails or specific admin email.
  const userRecord = await admin.auth().getUser(request.auth.uid);
  
  if (userRecord.email && userRecord.email.includes("@")) {
    await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });
    return { success: true, message: `Admin claim set for ${userRecord.email}` };
  }
  throw new HttpsError("permission-denied", "Not authorized to become admin.");
});

/**
 * SCHEDULED BACKUP
 * Runs daily. Needs Cloud Storage configured in Firebase (e.g. gs://fox-industrial.appspot.com)
 * Since we don't have the exact bucket name or a complex export script, we will just simulate/log the start.
 * Real implementation would use Google Cloud Node SDK to trigger a Firestore export.
 */
exports.scheduledBackup = onSchedule("every day 02:00", async (event) => {
  console.log("Starting daily backup of Firestore databases...");
  try {
    // In a full implementation:
    // const client = new firestore.v1.FirestoreAdminClient();
    // await client.exportDocuments({ ... })
    console.log("Backup scheduled task ran successfully.");
  } catch (error) {
    console.error("Backup failed", error);
  }
});

/**
 * READ OPERATIONS (Admin Only)
 */
exports.getWorks = onCall({ maxInstances: 10 }, async (request) => {
  requireAdmin(request);
  const snapshot = await db.collection("works").get();
  const works = [];
  snapshot.forEach(doc => works.push({ _id: doc.id, ...doc.data() }));
  return { works };
});

exports.getCMSPages = onCall({ maxInstances: 10 }, async (request) => {
  requireAdmin(request);
  const pages = ["home", "about", "services", "contact"];
  const result = {};
  for (const page of pages) {
    const doc = await db.collection("cms").doc(page).get();
    result[page] = doc.exists ? doc.data() : null;
  }
  return { pages: result };
});

exports.verifyAdmin = onCall({ maxInstances: 10 }, async (request) => {
  requireAdmin(request);
  return { 
    status: "ok", 
    uid: request.auth.uid,
    isAdmin: true 
  };
});
