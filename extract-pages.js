const fs = require('fs');
const path = require('path');

// Make directories
fs.mkdirSync('./data/pages', { recursive: true });

// 1. Contact Page
const contactJson = {
  title: "Contatti",
  subtitle: "Fox Industrial Contracting S.R.L.",
  phone: "+39 08118939249",
  email: "info@foxindustrialcontractingsrl.com",
  sede_legale: "Via Duomo, 348 , 80133 Napoli NA",
  sede_operativa: "Via Nazionale delle Puglie, 7, 80013 Casalnuovo di Napoli NA",
  cf_piva: "09601321210",
  sdi: "M5UXCR1",
  pec: "fox.industrialcontracting@pec.it"
};
fs.writeFileSync('./data/pages/contact.json', JSON.stringify(contactJson, null, 2));

let contactHtml = fs.readFileSync('./src/contact.html', 'utf-8');
contactHtml = contactHtml.replace('<h1 class="text-5xl font-bold mb-4" data-animate="fade-down">Contatti</h1>', '<h1 class="text-5xl font-bold mb-4" data-animate="fade-down">{{pages.contact.title}}</h1>');
contactHtml = contactHtml.replace('<p class="text-2xl text-secondary" data-animate="fade-up" data-delay="0.1">Fox Industrial Contracting S.R.L.</p>', '<p class="text-2xl text-secondary" data-animate="fade-up" data-delay="0.1">{{pages.contact.subtitle}}</p>');
contactHtml = contactHtml.replace('<p class="text-secondary">Via Duomo, 348 , 80133 Napoli NA</p>', '<p class="text-secondary">{{pages.contact.sede_legale}}</p>');
contactHtml = contactHtml.replace('<p class="text-secondary">Via Nazionale delle Puglie, 7, 80013 Casalnuovo di Napoli NA</p>', '<p class="text-secondary">{{pages.contact.sede_operativa}}</p>');
contactHtml = contactHtml.replace('<p class="text-secondary">09601321210</p>', '<p class="text-secondary">{{pages.contact.cf_piva}}</p>');
contactHtml = contactHtml.replace('<p class="text-secondary">M5UXCR1</p>', '<p class="text-secondary">{{pages.contact.sdi}}</p>');
contactHtml = contactHtml.replace('<p class="text-secondary">fox.industrialcontracting@pec.it</p>', '<p class="text-secondary">{{pages.contact.pec}}</p>');
fs.writeFileSync('./src/contact.html', contactHtml);

// 2. About Page
const aboutJson = {
  title: "Chi Siamo",
  subtitle: "La nostra storia, la nostra missione e i nostri valori",
  description_1: "Fox Industrial Contracting S.r.l. vanta un team di soci attivi in Italia ed all'estero da oltre dieci anni nei settori della meccanica e della prefabbricazione industriale.",
  description_2: "Affidabilità, competenza e sicurezza sono i pilastri del nostro lavoro. Ci impegniamo a fornire soluzioni su misura, garantendo il rispetto delle tempistiche e dei più alti standard qualitativi."
};
fs.writeFileSync('./data/pages/about.json', JSON.stringify(aboutJson, null, 2));

let aboutHtml = fs.readFileSync('./src/about.html', 'utf-8');
aboutHtml = aboutHtml.replace('<h1 class="text-5xl font-bold mb-4" data-animate="fade-down">Chi Siamo</h1>', '<h1 class="text-5xl font-bold mb-4" data-animate="fade-down">{{pages.about.title}}</h1>');
aboutHtml = aboutHtml.replace('<p class="text-2xl text-secondary" data-animate="fade-up" data-delay="0.1">La nostra storia, la nostra missione\\n          e i nostri valori</p>', '<p class="text-2xl text-secondary" data-animate="fade-up" data-delay="0.1">{{pages.about.subtitle}}</p>');
aboutHtml = aboutHtml.replace('Fox Industrial Contracting S.r.l. vanta un team di soci attivi in Italia ed all\'estero da oltre dieci anni nei settori della meccanica e della prefabbricazione industriale.', '{{pages.about.description_1}}');
aboutHtml = aboutHtml.replace('Affidabilità, competenza e sicurezza sono i pilastri del nostro lavoro. Ci impegniamo a fornire soluzioni su misura, garantendo il rispetto delle tempistiche e dei più alti standard qualitativi.', '{{pages.about.description_2}}');
fs.writeFileSync('./src/about.html', aboutHtml);

// 3. Build script update to include pages
let buildScript = fs.readFileSync('./scripts/build-html.js', 'utf-8');
buildScript = buildScript.replace('// const homeData = JSON.parse(fs.readFileSync(\'./data/pages/home.json\', \'utf-8\'));', `
const contactData = JSON.parse(fs.readFileSync('./data/pages/contact.json', 'utf-8'));
const aboutData = JSON.parse(fs.readFileSync('./data/pages/about.json', 'utf-8'));
`);
buildScript = buildScript.replace('// home: homeData', `
  pages: {
    contact: contactData,
    about: aboutData
  }
`);
fs.writeFileSync('./scripts/build-html.js', buildScript);

console.log("Extraction and replacement done.");