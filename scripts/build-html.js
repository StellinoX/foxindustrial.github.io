const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

// 1. Load Data
const globalData = JSON.parse(fs.readFileSync('./data/global/settings.json', 'utf-8'));
const lavoriData = JSON.parse(fs.readFileSync('./data/lavori.json', 'utf-8'));
const carouselData = JSON.parse(fs.readFileSync('./data/carousel.json', 'utf-8'));

// If you have specific page data, load it here

const contactData = JSON.parse(fs.readFileSync('./data/pages/contact.json', 'utf-8'));
const aboutData = JSON.parse(fs.readFileSync('./data/pages/about.json', 'utf-8'));
const certData = JSON.parse(fs.readFileSync('./data/pages/certifications.json', 'utf-8'));
const servicesData = JSON.parse(fs.readFileSync('./data/pages/services.json', 'utf-8'));




const context = {
  global: globalData,
  lavori: lavoriData.projects,
  carousel: carouselData.images,
  
  pages: {
    contact: contactData,
    about: aboutData,
    certifications: certData,
    services: servicesData
  }

};

// 2. Register Helpers
Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});

Handlebars.registerHelper('filterByStatus', function(projects, status) {
  return projects.filter(p => p.status === status);
});

// 3. Compile Templates
const srcDir = './src';
const distDir = './'; // root

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const source = fs.readFileSync(path.join(srcDir, file), 'utf-8');
  const template = Handlebars.compile(source);
  const result = template(context);
  
  fs.writeFileSync(path.join(distDir, file), result);
  console.log(`Built ${file}`);
});

// Compile structured data JS
const sdTemplate = Handlebars.compile(fs.readFileSync('./js/structured-data.js', 'utf-8'));
fs.writeFileSync('./js/structured-data.js', sdTemplate(context));
console.log('Built js/structured-data.js');
let carouselJs = fs.readFileSync('./js/carousel.js', 'utf-8');
const carouselRegex = /let allImages = \[\];[\s\S]*?fetch\('\.\/data\/carousel\.json'\)[\s\S]*?\.catch\(err => console\.error\('Error loading carousel images:', err\)\);/;
if (carouselRegex.test(carouselJs)) {
  const newJs = `let allImages = ${JSON.stringify(carouselData.images)};
  console.log('Carousel initialized with ' + allImages.length + ' images');
  if (typeof init3DCarousel === 'function') {
    init3DCarousel();
  }`;
  carouselJs = carouselJs.replace(carouselRegex, newJs);
  fs.writeFileSync('./js/carousel.js', carouselJs);
  console.log('Updated js/carousel.js with static images array.');
}
