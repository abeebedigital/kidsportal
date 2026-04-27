(function () {
  const STORAGE_KEY = 'fivetofifteen-accessibility-preferences';
  const DEFAULTS = {
    calmMode: false,
    focusMode: false,
    bigText: false,
    reduceMotion: false
  };

  function readPreferences() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULTS };
      const parsed = JSON.parse(raw);
      return { ...DEFAULTS, ...parsed };
    } catch (error) {
      return { ...DEFAULTS };
    }
  }

  function writePreferences(preferences) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }

  function applyPreferences(preferences) {
    const root = document.documentElement;
    const body = document.body;
    const map = {
      calmMode: 'pref-calm',
      focusMode: 'pref-focus',
      bigText: 'pref-big-text',
      reduceMotion: 'pref-reduce-motion'
    };

    Object.keys(map).forEach(function (key) {
      const enabled = !!preferences[key];
      root.classList.toggle(map[key], enabled);
      if (body) {
        body.classList.toggle(map[key], enabled);
      }
    });
  }

  function syncToggleButtons(preferences) {
    const buttons = Array.from(document.querySelectorAll('[data-pref-toggle]'));
    buttons.forEach(function (button) {
      const key = button.getAttribute('data-pref-toggle');
      const isActive = !!preferences[key];
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  function initializePreferenceToggles() {
    const preferences = readPreferences();
    applyPreferences(preferences);
    syncToggleButtons(preferences);

    const buttons = Array.from(document.querySelectorAll('[data-pref-toggle]'));
    buttons.forEach(function (button) {
      if (button.dataset.prefBound === 'true') return;
      button.dataset.prefBound = 'true';
      button.addEventListener('click', function () {
        const current = readPreferences();
        const key = button.getAttribute('data-pref-toggle');
        current[key] = !current[key];
        writePreferences(current);
        applyPreferences(current);
        syncToggleButtons(current);
      });
    });
  }

  window.initializePreferenceToggles = initializePreferenceToggles;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePreferenceToggles, { once: true });
  } else {
    initializePreferenceToggles();
  }
})();
