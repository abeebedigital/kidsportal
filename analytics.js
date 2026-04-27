(function () {
  var MEASUREMENT_ID = 'G-R1ZB80DCNX';
  var PLACEHOLDER_ID = 'G-PASTEYOURGA4ID';

  if (!MEASUREMENT_ID || MEASUREMENT_ID === PLACEHOLDER_ID) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }

  window.gtag = gtag;

  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
  document.head.appendChild(script);

  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID, {
    page_path: window.location.pathname,
    page_title: document.title
  });
})();
