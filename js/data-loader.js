// Data Loader for dynamically rendering Lavori and Carousel from JSON

document.addEventListener('DOMContentLoaded', () => {
  // 1. Load Lavori
  const lavoriContainer = document.getElementById('lavori-container');
  if (lavoriContainer) {
    fetch('/data/lavori.json')
      .then(res => res.json())
      .then(data => {
        renderLavori(data.projects);
      })
      .catch(err => console.error('Error loading Lavori data:', err));
  }

  // 2. Load Carousel if it exists (carousel.js relies on allImages array)
  // We need to modify carousel.js to fetch the images first instead of hardcoding.
});

function renderLavori(projects) {
  const container = document.getElementById('lavori-container');
  container.innerHTML = ''; // Clear hardcoded content

  // Group by status
  const grouped = projects.reduce((acc, project) => {
    if (!acc[project.status]) acc[project.status] = [];
    acc[project.status].push(project);
    return acc;
  }, {});

  // Define sort order or mapping for colors/styles
  const sectionsConfig = [
    { status: 'In Corso', colorTitle: '#3FBFFF', bgClass: 'bg-surface' },
    { status: 'Terminati 2026', colorTitle: 'text-gray-900', bgClass: 'bg-white/50' },
    { status: 'Terminati 2025', colorTitle: 'text-gray-900', bgClass: 'bg-white/50' },
    { status: 'Terminati 2024', colorTitle: 'text-gray-900', bgClass: 'bg-white/50' },
    { status: 'Terminati 2023', colorTitle: 'text-gray-900', bgClass: 'bg-white/50' }
  ];

  sectionsConfig.forEach(config => {
    const list = grouped[config.status];
    if (!list || list.length === 0) return;

    const sectionHtml = `
      <section class="section-padding ${config.bgClass}" data-animate="fade-up">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16" data-animate="fade-up">
            ${config.status === 'In Corso' 
              ? `<h2 class="text-4xl font-bold" style="color: #3FBFFF; margin-bottom: 1.5rem;">Lavori ${config.status}</h2>` 
              : `<h2 class="text-3xl font-bold text-gray-900 mb-4">Lavori ${config.status}</h2>`}
            <div class="animated-divider mx-auto" aria-hidden="true"></div>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16 stagger-children" data-stagger="0.12">
            ${list.map(p => `
              <div class="glass-effect rounded-2xl p-8 border hover-tilt" data-animate="fade-up" style="border-color: #3FBFFF30;">
                <div class="flex items-start space-x-4">
                  <div class="w-3 h-3 rounded-full mt-2 animate-pulse" style="background-color: #3FBFFF;"></div>
                  <div>
                    ${config.status === 'In Corso' 
                      ? `<h3 class="text-2xl font-bold mb-2" style="color: #3FBFFF;">${p.title}</h3>` 
                      : `<h3 class="text-xl font-bold text-gray-900 mb-2">${p.title}</h3>`}
                    <p class="text-gray-600 mb-2">${p.description}</p>
                    <p class="text-gray-400">${p.location}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
    container.innerHTML += sectionHtml;
  });

  // Re-trigger animations if motion.js is active
  if (typeof initAnimations === 'function') {
    initAnimations();
  }
}