(function () {
  const key = window.SELECTIVE_TOPIC_KEY;
  if (!key) return;

  function ensureBaseFontBoost() {
    if (document.getElementById('selective-base-font-boost')) return;
    const style = document.createElement('style');
    style.id = 'selective-base-font-boost';
    style.textContent = 'html{font-size:18px}@media (max-width:500px){html{font-size:17px}}';
    document.head.appendChild(style);
  }

  ensureBaseFontBoost();

  const scripts = [
    'site-drawer.js',
    'selective-topic-core.js',
    'selective-topic-data-maths.js',
    'selective-topic-data-thinking.js',
    'selective-topic-data-reading.js',
    'selective-topic-data-writing.js',
    'selective-topic-data-writing-criteria.js',
    'selective-topic-visuals.js',
    'selective-topic-renderer.js'
  ];

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      const existing = document.querySelector('script[data-selective-chunk="' + src + '"]');
      if (existing) {
        if (existing.dataset.loaded === 'true') {
          resolve();
          return;
        }
        existing.addEventListener('load', function handleLoad() {
          existing.dataset.loaded = 'true';
          resolve();
        }, { once: true });
        existing.addEventListener('error', function handleError() {
          reject(new Error('Failed to load ' + src));
        }, { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.defer = true;
      script.dataset.selectiveChunk = src;
      script.onload = function () {
        script.dataset.loaded = 'true';
        resolve();
      };
      script.onerror = function () {
        reject(new Error('Failed to load ' + src));
      };
      document.head.appendChild(script);
    });
  }

  scripts.reduce(function (chain, src) {
    return chain.then(function () { return loadScript(src); });
  }, Promise.resolve()).then(function () {
    if (typeof window.renderSelectiveTopicPage === 'function') {
      window.renderSelectiveTopicPage(key);
    }
  }).catch(function (error) {
    console.error(error);
  });
})();
