/**
 * Fox Industrial CMS Loader
 * Fetches content from Firestore and populates the page dynamically.
 * Add this script to all public pages BEFORE closing </body>.
 * Usage: <script type="module" src="./js/cms-loader.js"></script>
 *
 * Mark HTML elements with data-cms="section.field" to make them dynamic.
 * Example: <h1 data-cms="home.heroTitle">Fallback Text</h1>
 */
import { db, doc, getDoc, collection, getDocs } from './firebase-config.js';

async function loadCMSContent() {
  const page = document.body.dataset.cmsPage;
  if (!page) return;

  try {
    // Load page-specific content (e.g., home, lavori, about...)
    if (page !== 'lavori') {
      const snap = await getDoc(doc(db, 'cms', page));
      if (snap.exists()) {
        const data = snap.data();
        applyData(data, page);
      }
    }

    // Load ongoing works for index and lavori pages
    if (page === 'index' || page === 'lavori') {
      await loadWorks(page);
    }
  } catch (err) {
    console.warn('[CMS] Could not load content:', err.message);
  }
}

function applyData(data, section) {
  document.querySelectorAll('[data-cms]').forEach(el => {
    const key = el.dataset.cms;
    const [sec, field] = key.split('.');
    if (sec === section && data[field] !== undefined) {
      if (el.tagName === 'IMG') {
        el.src = data[field];
        el.alt = data[field + 'Alt'] || el.alt;
      } else if (el.tagName === 'A') {
        el.href = data[field];
      } else {
        el.textContent = data[field];
      }
    }
  });
}

async function loadWorks(page) {
  const querySnap = await getDocs(collection(db, 'works'));
  const works = [];
  querySnap.forEach(d => works.push({ id: d.id, ...d.data() }));
  works.sort((a, b) => (a.order || 99) - (b.order || 99));

  const ongoing = works.filter(w => w.status === 'ongoing');
  const completed = works.filter(w => w.status === 'completed');
  
  console.log("All Works:", works.length, works);
  console.log("Ongoing:", ongoing.length, ongoing);
  console.log("Completed:", completed.length, completed);

  if (page === 'index') {
    renderIndexWorks(ongoing);
  } else if (page === 'lavori') {
    renderLavoriPage(ongoing, completed);
  }
}

function renderIndexWorks(ongoing) {
  const container = document.getElementById('cms-ongoing-works');
  if (!container) return;
  if (ongoing.length === 0) {
    container.innerHTML = '<p class="text-gray-500 col-span-2">Nessun lavoro in corso al momento.</p>';
    return;
  }
  container.innerHTML = ongoing.slice(0, 6).map(w => `
    <div class="glass-effect rounded-2xl p-8 border-accent-light hover-tilt">
      <div class="flex items-start space-x-4">
        <div class="w-3 h-3 bg-accent rounded-full mt-2 animate-pulse flex-shrink-0"></div>
        <div>
          <h3 class="text-xl sm:text-2xl font-bold text-accent mb-2">${escHtml(w.client || w.title)}</h3>
          <p class="text-secondary mb-2">${escHtml(w.description)}</p>
          <p class="text-muted">${escHtml(w.location)}</p>
        </div>
      </div>
    </div>
  `).join('');
}

function renderLavoriPage(ongoing, completed) {
  // Ongoing section
  const ongoingContainer = document.getElementById('cms-ongoing-section');
  if (ongoingContainer) {
    ongoingContainer.innerHTML = ongoing.map(w => `
      <div class="glass-effect rounded-2xl p-8 border hover-tilt" style="border-color: #3FBFFF30;">
        <div class="flex items-start space-x-4">
          <div class="w-3 h-3 rounded-full mt-2 animate-pulse flex-shrink-0" style="background-color: #3FBFFF;"></div>
          <div>
            <h3 class="text-2xl font-bold mb-2" style="color: #3FBFFF;">${escHtml(w.client || w.title)}</h3>
            <p class="text-gray-600 mb-2">${escHtml(w.description)}</p>
            <p class="text-gray-400">${escHtml(w.location)}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Completed section grouped by year
  const completedContainer = document.getElementById('cms-completed-section');
  if (completedContainer) {
    const byYear = {};
    completed.forEach(w => {
      const yr = w.year || 'N.D.';
      if (!byYear[yr]) byYear[yr] = [];
      byYear[yr].push(w);
    });
    const years = Object.keys(byYear).sort((a, b) => b - a);
    completedContainer.innerHTML = years.map(yr => `
      <section class="section-padding bg-white/50">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Lavori Terminati ${yr}</h2>
            <div class="animated-divider mx-auto"></div>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-children">
            ${byYear[yr].map(w => `
              <div class="glass-effect rounded-2xl p-6 border border-[#3FBFFF]/30 hover-tilt">
                <h3 class="text-xl font-bold text-gray-900 mb-2">${escHtml(w.client || w.title)}</h3>
                <p class="text-gray-600 mb-2">${escHtml(w.description)}</p>
                <p class="text-gray-400">${escHtml(w.location)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `).join('');
  }
}

function escHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

loadCMSContent();
