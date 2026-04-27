(function () {
  function ensureStyles() {
    if (document.getElementById('global-slim-topbar-styles')) return;
    const style = document.createElement('style');
    style.id = 'global-slim-topbar-styles';
    style.textContent = `
      body.with-global-slim-topbar {
        padding-top: calc(var(--global-slim-topbar-height, 84px) + 16px);
      }

      .global-slim-topbar {
        position: fixed;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        width: min(1060px, calc(100vw - 20px));
        z-index: 1250;
        display: grid;
        grid-template-columns: auto max-content minmax(200px, 230px);
        align-items: center;
        gap: 4px;
        padding: 6px 8px;
        border-radius: 22px;
        background: rgba(255, 255, 255, 0.92);
        border: 1px solid rgba(227, 233, 243, 0.95);
        box-shadow: 0 18px 36px rgba(48, 55, 86, 0.12);
        backdrop-filter: blur(12px);
      }

      .global-slim-topbar-brand {
        display: inline-flex;
        align-items: center;
        flex-shrink: 0;
      }

      .global-slim-topbar-logo {
        display: block;
        width: 118px;
        height: auto;
      }

      .global-slim-topbar-menu-btn {
        display: none;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-height: 34px;
        border: 1px solid #d6ddeb;
        border-radius: 12px;
        padding: 6px 11px;
        background: linear-gradient(135deg, #f2f7ff 0%, #e9f1ff 100%);
        color: #2f4b82;
        font: 900 0.74rem "Nunito", sans-serif;
        cursor: pointer;
        white-space: nowrap;
      }

      .global-slim-topbar-menu-icon {
        position: relative;
        width: 14px;
        height: 10px;
        border-top: 2px solid currentColor;
        border-bottom: 2px solid currentColor;
      }

      .global-slim-topbar-menu-icon::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        border-top: 2px solid currentColor;
        transform: translateY(-50%);
      }

      .global-slim-topbar.is-menu-open .global-slim-topbar-menu-btn {
        background: linear-gradient(135deg, #e6efff 0%, #dce9ff 100%);
        border-color: #b9ccec;
      }

      .global-slim-topbar-links {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 6px;
        flex-wrap: nowrap;
        overflow: visible;
        min-width: 0;
      }

      .global-slim-topbar-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 32px;
        padding: 5px 9px;
        border-radius: 12px;
        text-decoration: none;
        font-size: 0.74rem;
        font-weight: 900;
        font-family: "Nunito", sans-serif;
        white-space: nowrap;
        border: 1px solid var(--menu-border, #d6ddeb);
        background: var(--menu-bg, #f8f9fc);
        color: var(--menu-text, #3a4868);
        box-shadow: 0 4px 10px var(--menu-shadow, rgba(35, 58, 102, 0.1));
        transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease;
      }

      .global-slim-topbar-link:hover,
      .global-slim-topbar-link.is-active {
        filter: brightness(1.03);
        transform: translateY(-1px);
        box-shadow: 0 8px 16px var(--menu-shadow, rgba(35, 58, 102, 0.16));
      }

      .global-slim-topbar-links .global-top-menu-group:nth-child(1) .global-slim-topbar-link {
        --menu-bg: linear-gradient(135deg, #e4faf4 0%, #d3f5eb 100%);
        --menu-border: #9ddfcf;
        --menu-text: #175548;
        --menu-shadow: rgba(43, 163, 137, 0.24);
      }

      .global-slim-topbar-links .global-top-menu-group:nth-child(2) .global-slim-topbar-link {
        --menu-bg: linear-gradient(135deg, #fff3de 0%, #ffe8c7 100%);
        --menu-border: #f2cd95;
        --menu-text: #744b1a;
        --menu-shadow: rgba(224, 154, 63, 0.24);
      }

      .global-slim-topbar-links .global-top-menu-group:nth-child(3) .global-slim-topbar-link {
        --menu-bg: linear-gradient(135deg, #f2ecff 0%, #e8deff 100%);
        --menu-border: #c9b8f3;
        --menu-text: #4f3a85;
        --menu-shadow: rgba(125, 92, 195, 0.24);
      }

      .global-slim-topbar-links .global-top-menu-group:nth-child(4) .global-slim-topbar-link {
        --menu-bg: linear-gradient(135deg, #fff8da 0%, #fff0b9 100%);
        --menu-border: #ecd58b;
        --menu-text: #6f5914;
        --menu-shadow: rgba(198, 156, 39, 0.24);
      }

      .global-slim-topbar-links .global-top-menu-group:nth-child(5) .global-slim-topbar-link {
        --menu-bg: linear-gradient(135deg, #e3f8ff 0%, #d4f0ff 100%);
        --menu-border: #9ecde5;
        --menu-text: #1b516a;
        --menu-shadow: rgba(57, 133, 170, 0.24);
      }

      .global-slim-topbar-links .global-top-menu-group:nth-child(6) .global-slim-topbar-link {
        --menu-bg: linear-gradient(135deg, #ffe8ee 0%, #ffdce6 100%);
        --menu-border: #efb4c3;
        --menu-text: #7f2f46;
        --menu-shadow: rgba(190, 82, 114, 0.24);
      }

      .global-top-menu-group {
        position: relative;
        display: inline-flex;
        align-items: center;
        flex: 0 0 auto;
      }

      .global-top-menu-group::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 100%;
        height: 8px;
      }

      .global-top-main-link::after {
        content: "▾";
        margin-left: 4px;
        font-size: 0.58rem;
        opacity: 0.75;
      }

      .global-top-submenu {
        position: absolute;
        left: 0;
        top: calc(100% - 1px);
        min-width: 230px;
        max-height: min(68vh, 560px);
        overflow-y: auto;
        border: 1px solid #d6ddeb;
        border-radius: 14px;
        background: #fff;
        box-shadow: 0 14px 26px rgba(35, 58, 102, 0.16);
        padding: 6px;
        display: grid;
        gap: 4px;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translateY(8px) scale(0.98);
        transform-origin: top left;
        transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s ease;
        z-index: 20;
      }

      .global-top-submenu::-webkit-scrollbar {
        width: 8px;
      }

      .global-top-submenu::-webkit-scrollbar-thumb {
        background: #cfdaf0;
        border-radius: 999px;
      }

      .global-top-menu-group:hover .global-top-submenu,
      .global-top-menu-group:focus-within .global-top-submenu {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateY(0) scale(1);
      }

      .global-top-menu-group:hover,
      .global-top-menu-group:focus-within {
        z-index: 40;
      }

      .global-top-submenu-link {
        display: block;
        text-decoration: none;
        color: #2f3f66;
        border: 1px solid #e4e9f5;
        border-radius: 10px;
        background: #fafcff;
        font: 800 0.74rem "Nunito", sans-serif;
        padding: 6px 8px;
      }

      .global-top-submenu-link:hover {
        background: #f2f7ff;
        border-color: #ccd8f1;
      }

      .global-top-submenu.is-limited .global-top-submenu-link.is-overflow-item {
        display: none;
      }

      .global-top-submenu.is-limited.is-expanded .global-top-submenu-link.is-overflow-item {
        display: block;
      }

      .global-top-submenu-more {
        display: block;
        width: 100%;
        border: 1px dashed #c9d8f1;
        border-radius: 10px;
        background: linear-gradient(135deg, #f2f7ff 0%, #eef5ff 100%);
        color: #2f4b82;
        font: 900 0.72rem "Nunito", sans-serif;
        padding: 6px 8px;
        text-align: center;
        cursor: pointer;
      }

      .global-top-submenu-more:hover {
        background: linear-gradient(135deg, #e8f2ff 0%, #e4efff 100%);
        border-color: #b4cbed;
      }

      .global-slim-topbar-search {
        position: relative;
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 6px;
        align-items: center;
      }

      .global-slim-topbar-search-icon {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        opacity: 0.75;
        pointer-events: none;
      }

      .global-slim-topbar-search-input {
        width: 100%;
        min-height: 32px;
        border-radius: 12px;
        border: 1px solid #d4dced;
        background: #fff;
        color: #2c3550;
        padding: 6px 10px 6px 32px;
        font: 700 0.74rem "Nunito", sans-serif;
      }

      .global-slim-topbar-search-input:focus {
        outline: none;
        border-color: #59b7f9;
        box-shadow: 0 0 0 3px rgba(89, 183, 249, 0.18);
      }

      .global-slim-topbar-search-btn {
        min-height: 32px;
        border: none;
        border-radius: 12px;
        padding: 5px 9px;
        background: #f1f5ff;
        color: #355496;
        font: 900 0.72rem "Nunito", sans-serif;
        cursor: pointer;
      }

      .global-slim-topbar-search-btn:hover {
        background: #e7eeff;
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }

      @media (max-width: 980px) {
        .global-slim-topbar {
          grid-template-columns: auto auto minmax(0, 1fr);
          width: min(1060px, calc(100vw - 16px));
          padding: 10px 12px;
        }

        .global-slim-topbar-logo {
          width: 104px;
        }

        .global-slim-topbar-menu-btn {
          display: inline-flex;
        }

        .global-slim-topbar-links {
          display: none;
          grid-column: 1 / -1;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
          max-height: min(56vh, 360px);
          overflow-y: auto;
          padding-top: 4px;
        }

        .global-slim-topbar.is-menu-open .global-slim-topbar-links {
          display: grid;
        }

        .global-slim-topbar .global-top-menu-group {
          display: block;
        }

        .global-slim-topbar .global-slim-topbar-link {
          width: 100%;
          justify-content: center;
          text-align: center;
        }

        .global-slim-topbar .global-top-submenu {
          display: none !important;
        }

        .global-slim-topbar .global-top-main-link::after {
          display: none;
        }

        .global-slim-topbar-search {
          grid-column: 1 / -1;
        }
      }

      @media (max-width: 700px) {
        .global-slim-topbar {
          top: 7px;
          width: calc(100vw - 14px);
          padding: 8px;
          gap: 8px;
        }

        .global-slim-topbar-logo {
          width: 92px;
        }

        .global-slim-topbar-link {
          min-height: 34px;
          padding: 6px 9px;
          font-size: 0.74rem;
        }

        .global-slim-topbar-links {
          grid-template-columns: 1fr;
        }

        .global-top-submenu {
          min-width: 210px;
        }

        .global-top-submenu-link {
          font-size: 0.72rem;
          padding: 6px 8px;
        }
      }

      @media (max-width: 500px) {
        .global-slim-topbar-logo {
          width: 76px;
        }

        .global-slim-topbar-search-btn {
          min-height: 34px;
          padding: 5px 9px;
          font-size: 0.72rem;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const TOP_MENU_GROUPS = [
    {
      key: 'home',
      label: 'Home',
      href: 'index.html',
      items: [
        { label: 'Home Library', href: 'index.html' },
        { label: 'News', href: 'news.html' },
        { label: 'Ideas', href: 'ideas.html' }
      ]
    },
    {
      key: 'stories',
      label: 'Stories',
      href: 'index.html#story-collection',
      items: [
        { label: 'Story Collection', href: 'index.html#story-collection' },
        { label: 'Math is Fun', href: 'index.html#math-is-fun' },
        { label: 'Addition Tables', href: 'addition-tables-hub.html' },
        { label: 'Multiplication Tables', href: 'multiplication-tables-hub.html' },
        { label: 'Space & Science', href: 'index.html#space-science' },
        { label: 'Chemistry Lab', href: 'index.html#chemistry-lab' },
        { label: 'World & History', href: 'index.html#world-history' }
      ]
    },
    {
      key: 'worksheets',
      label: 'Worksheets',
      href: 'worksheets.html',
      items: [
        { label: 'Worksheets Hub', href: 'worksheets.html' },
        { label: 'Alphabet Worksheets A-Z', href: 'alphabet-worksheets.html' },
        { label: 'Addition Table Worksheets', href: 'addition-table-worksheets.html' },
        { label: 'Multiplication Worksheets', href: 'multiplication-worksheets.html' },
        { label: 'Table Practice 1 to 12', href: 'worksheet-multiplication-table-practice.html' },
        { label: 'Skip Counting', href: 'worksheet-multiplication-skip-counting.html' },
        { label: 'Repeated Addition to Multiplication', href: 'worksheet-multiplication-repeated-addition.html' },
        { label: 'Missing Factor', href: 'worksheet-multiplication-missing-factor.html' },
        { label: 'Multiplication Word Problems', href: 'worksheet-multiplication-word-problems.html' },
        { label: 'Table Maze', href: 'worksheet-multiplication-table-maze.html' },
        { label: 'Mixed Times-Table Challenge', href: 'worksheet-multiplication-mixed-challenge.html' },
        { label: 'Clock and Time Worksheets', href: 'clock-and-time-worksheets.html' },
        { label: 'Draw Hands on the Clock', href: 'worksheet-clock-draw-hands.html' },
        { label: 'Write the Time', href: 'worksheet-clock-write-time.html' },
        { label: 'Match Analog to Digital', href: 'worksheet-clock-match-analog-digital.html' },
        { label: 'Morning Afternoon Sorting', href: 'worksheet-clock-morning-afternoon.html' },
        { label: 'Elapsed Time Basics', href: 'worksheet-clock-elapsed-time.html' },
        { label: 'Daily Routine Timeline', href: 'worksheet-clock-daily-routine.html' },
        { label: 'Complete the Table', href: 'worksheet-addition-complete-table.html' },
        { label: 'Color the Answers', href: 'worksheet-addition-color-answers.html' },
        { label: 'Cut and Match', href: 'worksheet-addition-cut-match.html' },
        { label: 'Multiple Choice Facts', href: 'worksheet-addition-multiple-choice.html' },
        { label: 'Speed Practice Sheet', href: 'worksheet-addition-speed-practice.html' },
        { label: 'Mixed Revision Sheet', href: 'worksheet-addition-mixed-revision.html' },
        { label: 'Final Test Sheet', href: 'worksheet-addition-final-test.html' },
        { label: 'Addition Facts', href: 'worksheet-addition-facts.html' },
        { label: 'Two & Three Number Addition Workout', href: 'worksheet-two-number-addition-practice.html' },
        { label: 'Subtraction Facts', href: 'worksheet-subtraction-facts.html' },
        { label: 'Number Bonds', href: 'worksheet-number-bonds.html' },
        { label: 'Count and Circle', href: 'worksheet-count-and-circle.html' },
        { label: 'Before After Between', href: 'worksheet-before-after-between.html' },
        { label: 'Missing Number', href: 'worksheet-missing-number.html' },
        { label: 'Compare Bigger Smaller', href: 'worksheet-compare-bigger-smaller.html' }
      ]
    },
    {
      key: 'games',
      label: 'Games',
      href: 'index.html#games',
      items: [
        { label: 'Games Hub', href: 'index.html#games' },
        { label: 'Addition Bubble Pop', href: 'game-addition-bubble-pop.html' },
        { label: 'Multiplication Meteor', href: 'game-multiplication-meteor.html' },
        { label: 'Clock Match Rush', href: 'game-clock-match-rush.html' },
        { label: 'Grammar Fix-it Lab', href: 'game-grammar-fix-it-lab.html' }
      ]
    },
    {
      key: 'focus-calm',
      label: 'Focus & Calm',
      href: 'index.html#focus-calm-learning',
      items: [
        { label: 'Focus & Calm Hub', href: 'index.html#focus-calm-learning' },
        { label: 'Routine Adventure', href: 'first-then-routine-kids.html' },
        { label: 'Feelings and Faces', href: 'feelings-and-faces-kids.html' },
        { label: 'Sorting Fun', href: 'sorting-fun-kids.html' },
        { label: 'Matching Fun', href: 'matching-fun-kids.html' }
      ]
    },
    {
      key: 'exam-paths',
      label: 'Exam Paths',
      href: 'index.html#challenge-prep',
      items: [
        { label: 'Competitive Prep', href: 'index.html#challenge-prep' },
        { label: 'Micro-Topics', href: 'index.html#micro-topics' },
        { label: 'Exam Sessions', href: 'index.html#exam-sessions' },
        { label: 'Selective Exam', href: 'index.html#selective-exam' }
      ]
    },
  ];

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function buildTopMenuMarkup() {
    return TOP_MENU_GROUPS.map(function (group) {
      const submenu = group.items.map(function (item) {
        return '<a class="global-top-submenu-link" href="' + item.href + '">' + escapeHtml(item.label) + '</a>';
      }).join('');

      return [
        '<div class="global-top-menu-group">',
        '<a class="global-slim-topbar-link global-top-main-link" data-nav="' + group.key + '" href="' + group.href + '">' + escapeHtml(group.label) + '</a>',
        '<div class="global-top-submenu">',
        submenu,
        '</div>',
        '</div>'
      ].join('');
    }).join('');
  }

  function buildTopbar() {
    const bar = document.createElement('div');
    bar.className = 'global-slim-topbar';
    bar.id = 'globalSlimTopbar';
    bar.innerHTML = [
      '<a class="global-slim-topbar-brand" href="index.html" aria-label="Go to home library">',
      '<img class="global-slim-topbar-logo" src="fivetofifteen-logo.svg" alt="FiveToFifteen logo" />',
      '</a>',
      '<button class="global-slim-topbar-menu-btn" id="globalTopbarMenuBtn" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="globalTopbarLinks"><span class="global-slim-topbar-menu-icon" aria-hidden="true"></span><span>Menu</span></button>',
      '<nav class="global-slim-topbar-links" id="globalTopbarLinks" aria-label="Primary navigation">' + buildTopMenuMarkup() + '</nav>',
      '<form class="global-slim-topbar-search" id="globalLibrarySearchForm" role="search" aria-label="Search the learning library">',
      '<label class="sr-only" for="globalLibrarySearchInput">Search the library</label>',
      '<span class="global-slim-topbar-search-icon" aria-hidden="true">🔍</span>',
      '<input id="globalLibrarySearchInput" class="global-slim-topbar-search-input" type="search" placeholder="Search stories, worksheets, games, prep..." autocomplete="off" />',
      '<button class="global-slim-topbar-search-btn" id="globalLibrarySearchBtn" type="submit">Search</button>',
      '</form>'
    ].join('');
    document.body.appendChild(bar);
  }

  function syncTopbarHeightVar() {
    const bar = document.getElementById('globalSlimTopbar');
    if (!bar) return;
    const measuredHeight = Math.ceil(bar.getBoundingClientRect().height || bar.offsetHeight || 0);
    if (measuredHeight > 0) {
      document.documentElement.style.setProperty('--global-slim-topbar-height', measuredHeight + 'px');
    }
  }

  function setupMobileMenu() {
    const bar = document.getElementById('globalSlimTopbar');
    const menuBtn = document.getElementById('globalTopbarMenuBtn');
    const links = document.getElementById('globalTopbarLinks');
    if (!bar || !menuBtn || !links || menuBtn.dataset.menuReady === 'true') return;

    function closeMenu() {
      bar.classList.remove('is-menu-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      syncTopbarHeightVar();
    }

    function isMobileMenu() {
      return window.matchMedia('(max-width: 980px)').matches;
    }

    menuBtn.addEventListener('click', function (event) {
      event.stopPropagation();
      const willOpen = !bar.classList.contains('is-menu-open');
      bar.classList.toggle('is-menu-open', willOpen);
      menuBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      syncTopbarHeightVar();
    });

    document.addEventListener('click', function (event) {
      if (!bar.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });

    const menuLinks = Array.from(links.querySelectorAll('.global-slim-topbar-link, .global-top-submenu-link'));
    menuLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (isMobileMenu()) {
          closeMenu();
        }
      });
    });

    window.addEventListener('resize', function () {
      if (!isMobileMenu()) {
        closeMenu();
      } else {
        syncTopbarHeightVar();
      }
    });

    menuBtn.dataset.menuReady = 'true';
  }

  function getCurrentPageName() {
    const path = (window.location.pathname || '').split('/').pop();
    return (path || 'index.html').toLowerCase();
  }

  function getActiveNavKey() {
    const file = getCurrentPageName();
    const hash = (window.location.hash || '').toLowerCase();

    if (file === 'index.html' || file === '') {
      const current = hash.replace(/^#/, '');
      if (!current || current === 'header' || current === 'learningmappanel') return 'home';
      if (current === 'worksheets') return 'worksheets';
      if (current === 'games') return 'games';
      if (current === 'focus-calm-learning') return 'focus-calm';
      if (current === 'comments') return 'home';
      if (current === 'challenge-prep' || current === 'micro-topics' || current === 'exam-sessions' || current === 'selective-exam' || current === 'weekly-competition') return 'exam-paths';
      if (current === 'story-collection' || current === 'math-is-fun' || current === 'addition-tables' || current === 'multiplication-tables' || current === 'space-science' || current === 'world-history') return 'stories';
      return 'home';
    }

    if (file.indexOf('worksheet-') === 0 || file.indexOf('worksheets') !== -1 || file.indexOf('alphabet-worksheets') === 0 || file.indexOf('addition-table-worksheets') === 0 || file.indexOf('clock-and-time-worksheets') === 0 || file.indexOf('multiplication-worksheets') === 0) return 'worksheets';
    if (file.indexOf('game-') === 0) return 'games';
    if (file === 'first-then-routine-kids.html' || file === 'feelings-and-faces-kids.html' || file === 'sorting-fun-kids.html' || file === 'matching-fun-kids.html') return 'focus-calm';
    if (file === 'news.html' || file === 'ideas.html') return 'home';
    if (file.indexOf('np-') === 0 || file.indexOf('selective-') === 0 || file.indexOf('competition-week-') === 0) return 'exam-paths';
    return 'stories';
  }

  function syncActiveNav() {
    const activeKey = getActiveNavKey();
    const links = Array.from(document.querySelectorAll('#globalSlimTopbar [data-nav]'));
    links.forEach(function (link) {
      const key = link.getAttribute('data-nav') || '';
      const isActive = key === activeKey;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function setupSearch() {
    const form = document.getElementById('globalLibrarySearchForm');
    const input = document.getElementById('globalLibrarySearchInput');
    if (!form || !input) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const term = input.value.trim();
      const url = new URL('index.html', window.location.href);
      if (term) {
        url.searchParams.set('q', term);
      }
      url.hash = 'story-collection';
      window.location.href = url.pathname + url.search + url.hash;
    });

    input.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        input.value = '';
      }
    });
  }

  function setupTopSubmenuMoreOptions() {
    const LIMIT = 8;
    const submenus = Array.from(document.querySelectorAll('#globalSlimTopbar .global-top-submenu'));
    submenus.forEach(function (submenu) {
      if (!submenu || submenu.dataset.moreReady === 'true') return;
      const links = Array.from(submenu.querySelectorAll('.global-top-submenu-link'));
      if (links.length <= LIMIT) return;

      const hiddenCount = links.length - LIMIT;
      submenu.classList.add('is-limited');
      links.forEach(function (link, index) {
        if (index >= LIMIT) {
          link.classList.add('is-overflow-item');
        }
      });

      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'global-top-submenu-more';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'More (' + hiddenCount + ')';

      function collapse() {
        submenu.classList.remove('is-expanded');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'More (' + hiddenCount + ')';
      }

      toggle.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        const expanded = submenu.classList.toggle('is-expanded');
        toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        toggle.textContent = expanded ? 'Less' : 'More (' + hiddenCount + ')';
      });

      const group = submenu.closest('.global-top-menu-group');
      if (group) {
        group.addEventListener('mouseleave', collapse);
      }

      submenu.appendChild(toggle);
      submenu.dataset.moreReady = 'true';
    });
  }

  function initSlimTopbar() {
    if (document.getElementById('miniTopbar')) return;
    ensureStyles();
    if (!document.getElementById('globalSlimTopbar')) {
      buildTopbar();
    }
    syncTopbarHeightVar();
    document.body.classList.add('with-global-slim-topbar');
    syncActiveNav();
    setupSearch();
    setupTopSubmenuMoreOptions();
    setupMobileMenu();
    window.addEventListener('resize', syncTopbarHeightVar);
    window.addEventListener('hashchange', syncActiveNav);
  }

  window.initSlimTopbar = initSlimTopbar;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlimTopbar, { once: true });
  } else {
    initSlimTopbar();
  }
})();
