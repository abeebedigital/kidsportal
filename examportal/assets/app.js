(function () {
  var menuButton = document.querySelector('[data-menu-toggle]');
  var drawer = document.querySelector('[data-mobile-drawer]');
  var overlay = document.querySelector('[data-overlay]');

  if (!menuButton || !drawer || !overlay) {
    return;
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('show');
    menuButton.setAttribute('aria-expanded', 'false');
  }

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('show');
    menuButton.setAttribute('aria-expanded', 'true');
  }

  menuButton.addEventListener('click', function () {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  overlay.addEventListener('click', closeDrawer);

  drawer.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeDrawer();
    }
  });
})();
