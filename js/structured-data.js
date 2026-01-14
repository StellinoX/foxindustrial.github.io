// Structured Data (JSON-LD) for SEO
(function() {
  'use strict';
  
  // Get the current page URL (you'll need to set this per page)
  const baseUrl = window.location.origin || 'https://foxindustrialcontracting.com';
  const currentUrl = window.location.href;
  
  // Organization Schema (shared across all pages)
  function getOrganizationSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Fox Industrial Contracting S.r.l.",
      "legalName": "Fox Industrial Contracting S.r.l.",
      "url": baseUrl,
      "logo": baseUrl + "/foto/LOGO.png",
      "description": "Azienda specializzata nella fabbricazione e montaggio di impianti di piping, carpenteria metallica e componenti meccanici in Italia ed Europa.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Via Duomo, 348",
        "addressLocality": "Napoli",
        "addressRegion": "NA",
        "postalCode": "80133",
        "addressCountry": "IT"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+39-081-18939249",
        "contactType": "customer service",
        "email": "info@foxindustrialcontractingsrl.com",
        "areaServed": ["IT", "EU"],
        "availableLanguage": "Italian"
      },
      "sameAs": []
    };
  }
  
  // LocalBusiness Schema (for contact page)
  function getLocalBusinessSchema() {
    const orgSchema = getOrganizationSchema();
    return {
      ...orgSchema,
      "@type": "LocalBusiness",
      "priceRange": "€€",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "40.901463",
        "longitude": "14.345181"
      }
    };
  }
  
  // BreadcrumbList Schema
  function getBreadcrumbSchema(items) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": baseUrl + item.url
      }))
    };
  }
  
  // WebSite Schema with SearchAction (for homepage)
  function getWebSiteSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Fox Industrial Contracting S.r.l.",
      "url": baseUrl,
      "description": "Fabbricazione e montaggio di impianti di piping, carpenteria metallica e componenti meccanici in Italia ed Europa.",
      "publisher": getOrganizationSchema()
    };
  }
  
  // Function to add schema to page
  function addStructuredData(schema) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }
  
  // Export functions for use in pages
  window.StructuredData = {
    getOrganizationSchema,
    getLocalBusinessSchema,
    getBreadcrumbSchema,
    getWebSiteSchema,
    addStructuredData,
    baseUrl
  };
})();
