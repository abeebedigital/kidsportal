(function () {
  const header = document.getElementById('header');
  const miniTopbar = document.getElementById('miniTopbar');
  const miniTopbarMenuBtn = document.getElementById('miniTopbarMenuBtn');
  const miniTopbarLinks = document.getElementById('miniTopbarLinks');
  const starData = [
    { size: 6, top: 10, left: 8, delay: 0, tone: 'warm' },
    { size: 4, top: 18, left: 21, delay: 0.8, tone: 'soft' },
    { size: 7, top: 9, left: 34, delay: 1.5, tone: 'warm' },
    { size: 5, top: 38, left: 50, delay: 0.4, tone: 'cool' },
    { size: 6, top: 16, left: 68, delay: 1.1, tone: 'soft' },
    { size: 5, top: 48, left: 82, delay: 0.6, tone: 'warm' },
    { size: 7, top: 14, left: 92, delay: 1.8, tone: 'cool' },
    { size: 5, top: 58, left: 12, delay: 1.3, tone: 'soft' },
    { size: 6, top: 34, left: 44, delay: 0.2, tone: 'warm' },
    { size: 5, top: 68, left: 64, delay: 2.0, tone: 'soft' },
    { size: 4, top: 56, left: 30, delay: 1.4, tone: 'cool' },
    { size: 6, top: 30, left: 88, delay: 2.2, tone: 'warm' }
  ];

  if (header) {
    starData.forEach(function (s) {
      const el = document.createElement('div');
      el.className = 'star star-' + s.tone;
      el.style.width = s.size + 'px';
      el.style.height = s.size + 'px';
      el.style.top = s.top + '%';
      el.style.left = s.left + '%';
      el.style.animationDelay = s.delay + 's';
      header.appendChild(el);
    });
  }

  function syncMiniTopbar() {
    if (!miniTopbar) return;
    const shouldShow = header
      ? header.getBoundingClientRect().bottom <= 12
      : window.scrollY > 160;
    document.body.classList.toggle('has-mini-topbar', shouldShow);
  }

  function syncMiniTopbarHeightVar() {
    if (!miniTopbar) return;
    const measuredHeight = Math.ceil(miniTopbar.getBoundingClientRect().height || miniTopbar.offsetHeight || 0);
    if (measuredHeight > 0) {
      document.documentElement.style.setProperty('--mini-topbar-height', measuredHeight + 'px');
    }
  }

  if (miniTopbar) {
    function closeMiniTopbarMenu() {
      miniTopbar.classList.remove('is-menu-open');
      if (miniTopbarMenuBtn) miniTopbarMenuBtn.setAttribute('aria-expanded', 'false');
      syncMiniTopbarHeightVar();
    }

    function isMobileTopbarMenu() {
      return window.matchMedia('(max-width: 980px)').matches;
    }

    if (miniTopbarMenuBtn && miniTopbarLinks) {
      miniTopbarMenuBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        const willOpen = !miniTopbar.classList.contains('is-menu-open');
        miniTopbar.classList.toggle('is-menu-open', willOpen);
        miniTopbarMenuBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        syncMiniTopbarHeightVar();
      });

      document.addEventListener('click', function (event) {
        if (!miniTopbar.contains(event.target)) {
          closeMiniTopbarMenu();
        }
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          closeMiniTopbarMenu();
        }
      });

      const menuLinks = Array.from(miniTopbarLinks.querySelectorAll('.flat-nav-link, .top-submenu-link, .age-filter-chip, [data-learning-map-toggle]'));
      menuLinks.forEach(function (link) {
        link.addEventListener('click', function () {
          if (isMobileTopbarMenu()) {
            closeMiniTopbarMenu();
          }
        });
      });
    }

    syncMiniTopbarHeightVar();
    syncMiniTopbar();
    let miniTopbarTicking = false;
    function queueMiniTopbarSync() {
      if (miniTopbarTicking) return;
      miniTopbarTicking = true;
      window.requestAnimationFrame(function () {
        miniTopbarTicking = false;
        syncMiniTopbarHeightVar();
        syncMiniTopbar();
        if (!isMobileTopbarMenu()) {
          closeMiniTopbarMenu();
        }
      });
    }
    window.addEventListener('scroll', queueMiniTopbarSync, { passive: true });
    window.addEventListener('resize', queueMiniTopbarSync);
  }
})();

(function () {
  const COMMENTS_API_URL = 'https://script.google.com/macros/s/AKfycbyuChQRsqHqP7eYaj4kSiikKvmIzQSKdvU2k7Ln265CyolJ6NDJ4HBFla6YiyqC9jCv/exec';
  const copyShareBtn = document.getElementById('copyShareBtn');
  const shareUrl = document.getElementById('shareUrl');
  const commentForm = document.getElementById('commentForm');
  const commentName = document.getElementById('commentName');
  const commentMessage = document.getElementById('commentMessage');
  const commentTypeInputs = Array.from(document.querySelectorAll('input[name="commentType"]'));
  const captchaQuestion = document.getElementById('captchaQuestion');
  const captchaAnswer = document.getElementById('captchaAnswer');
  const refreshCaptcha = document.getElementById('refreshCaptcha');
  const commentStatus = document.getElementById('commentStatus');
  const librarySearchInput = document.getElementById('librarySearchInput');
  const librarySearchClear = document.getElementById('librarySearchClear');
  const librarySearchStatus = document.getElementById('librarySearchStatus');
  const searchLinkPopup = document.getElementById('searchLinkPopup');
  const miniTopbarSearch = document.querySelector('.mini-topbar-search');
  const ageFilterButtons = Array.from(document.querySelectorAll('[data-age-filter]'));
  const pathFilterButtons = Array.from(document.querySelectorAll('[data-path-filter]'));
  const pathShortcutLinks = Array.from(document.querySelectorAll('[data-path-link]'));
  const learningMapPanel = document.getElementById('learningMapPanel');
  const learningMapToggles = Array.from(document.querySelectorAll('[data-learning-map-toggle]'));
  const learningMapToggleBadges = Array.from(document.querySelectorAll('[data-learning-map-toggle-badge]'));
  const learningMapCompleted = document.getElementById('learningMapCompleted');
  const learningMapBadges = document.getElementById('learningMapBadges');
  const learningMapStreak = document.getElementById('learningMapStreak');
  const learningMapStreakFill = document.getElementById('learningMapStreakFill');
  const learningMapStreakLabel = document.getElementById('learningMapStreakLabel');
  const learningMapStars = document.getElementById('learningMapStars');
  const learningMapBadgeGrid = document.getElementById('learningMapBadgeGrid');
  const learningMapNext = document.getElementById('learningMapNext');
  const learningMapNextTitle = document.getElementById('learningMapNextTitle');
  const topbarStreakCount = document.getElementById('topbarStreakCount');
  const heroProgressCompleted = document.getElementById('heroProgressCompleted');
  const heroProgressBadges = document.getElementById('heroProgressBadges');
  const heroProgressStars = document.getElementById('heroProgressStars');
  const pipGuide = document.getElementById('pipGuide');
  const pipGuideBubble = document.getElementById('pipGuideBubble');
  const pipGuideMinimize = document.getElementById('pipGuideMinimize');
  const pipGuideTip = document.getElementById('pipGuideTip');
  const pipRouteButtons = Array.from(document.querySelectorAll('[data-pip-route]'));
  const topicSuggestionInput = document.getElementById('topicSuggestionInput');
  const topicSuggestionBtn = document.getElementById('topicSuggestionBtn');
  const topicHelper = document.getElementById('topicHelper');
  const topicHelperCharacter = document.getElementById('topicHelperCharacter');
  const topicHelperMinimize = document.getElementById('topicHelperMinimize');
  const topicHelperFeedbackMini = document.getElementById('topicHelperFeedbackMini');
  const commentsSection = document.getElementById('comments');
  const searchCards = Array.from(document.querySelectorAll('.section-block .story-card'));
  const searchableSections = Array.from(document.querySelectorAll('.section-block')).filter(function (section) {
    return !!section.querySelector('.story-card');
  });

  let currentCaptchaAnswer = null;
  let activeAgeFilter = 'all';
  let activePathFilter = 'all';
  const PROGRESS_STORAGE_KEY = 'ftf_learning_progress_v1';
  const PIP_LAST_SEEN_KEY = 'ftf_pip_intro_last_seen_v1';
  // Test mode: show Pip again after 30 minutes.
  // Production: set to 1440 for once per day.
  const PIP_PROMPT_COOLDOWN_MINUTES = 30;
  const generatedQuickLinks = Array.isArray(window.SELECTIVE_SEARCH_LINKS) ? window.SELECTIVE_SEARCH_LINKS : [];
  const selectiveQuickLinks = generatedQuickLinks
    .filter(function (item) {
      return item && typeof item.href === 'string' && item.href;
    })
    .map(function (item) {
      const href = item.href.trim();
      const label = typeof item.label === 'string' && item.label.trim()
        ? item.label.trim()
        : getQuickLinkLabel(href);
      const group = typeof item.group === 'string' && item.group.trim()
        ? item.group.trim()
        : getQuickLinkGroup(href);
      const searchableText = [
        label,
        group,
        typeof item.searchableText === 'string' ? item.searchableText : '',
        href.replace('.html', '').replace(/-/g, ' ')
      ].join(' ').toLowerCase();
      return {
        href: href,
        label: label,
        group: group,
        searchableText: searchableText
      };
    });

  function titleCaseWord(word) {
    if (!word) return '';
    if (word === 'oc') return 'OC';
    if (word === 'naplan') return 'NAPLAN';
    if (word === 'nsw') return 'NSW';
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  function getQuickLinkGroup(href) {
    if (href.indexOf('selective-geometry-') === 0) return 'Selective Geometry';
    if (href.indexOf('selective-maths-') === 0) return 'Selective Maths';
    if (href.indexOf('selective-reading-') === 0) return 'Selective Reading';
    if (href.indexOf('selective-writing-') === 0) return 'Selective Writing';
    if (href.indexOf('selective-thinking-') === 0) return 'Selective Thinking';
    return 'Selective Exam';
  }

  function getQuickLinkLabel(href) {
    const key = href.replace('.html', '');
    if (key === 'selective-school-exam') return 'Selective School Exam Hub';
    if (key === 'selective-exam-introduction') return 'Selective Exam Introduction';
    if (key === 'selective-exam-syllabus') return 'Selective Exam Syllabus';
    const plain = key.replace(/^selective-/, '').split('-').map(titleCaseWord).join(' ');
    return 'Selective ' + plain;
  }

  function hideSearchLinkPopup() {
    if (!searchLinkPopup) return;
    searchLinkPopup.hidden = true;
    searchLinkPopup.innerHTML = '';
  }

  function renderSearchLinkPopup(rawTerm) {
    if (!searchLinkPopup) return 0;
    const term = (rawTerm || '').toLowerCase().trim();
    if (!term || term.length < 2) {
      hideSearchLinkPopup();
      return 0;
    }

    const matches = selectiveQuickLinks.filter(function (item) {
      return item.searchableText.indexOf(term) !== -1;
    }).slice(0, 8);

    if (!matches.length) {
      hideSearchLinkPopup();
      return 0;
    }

    searchLinkPopup.innerHTML = matches.map(function (item) {
      return '<a class="search-link-popup-item" href="' + item.href + '"><span class="search-link-popup-title">' + item.label + '</span><span class="search-link-popup-meta">' + item.group + '</span></a>';
    }).join('');
    searchLinkPopup.hidden = false;
    return matches.length;
  }

  function setTopicHelperMinimized(isMinimized) {
    if (!topicHelper) return;
    topicHelper.classList.toggle('is-minimized', !!isMinimized);
    topicHelper.setAttribute('data-minimized', isMinimized ? 'true' : 'false');
    const mini = topicHelper.querySelector('.topic-helper-mini');
    if (mini) {
      mini.setAttribute('aria-hidden', isMinimized ? 'false' : 'true');
    }
  }

  function setPipGuideMinimized(isMinimized) {
    if (!pipGuide) return;
    pipGuide.classList.toggle('is-minimized', !!isMinimized);
    pipGuide.setAttribute('data-minimized', isMinimized ? 'true' : 'false');
  }

  function setLearningMapExpanded(isExpanded) {
    if (!learningMapPanel || !learningMapToggles.length) return;
    learningMapPanel.classList.toggle('is-collapsed', !isExpanded);
    learningMapToggles.forEach(function (toggle) {
      toggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
  }

  function readPipLastSeen() {
    try {
      const raw = window.localStorage.getItem(PIP_LAST_SEEN_KEY);
      const value = Number(raw);
      return Number.isFinite(value) && value > 0 ? value : 0;
    } catch (_) {
      return 0;
    }
  }

  function markPipIntroSeen() {
    try {
      window.localStorage.setItem(PIP_LAST_SEEN_KEY, String(Date.now()));
    } catch (_) {
      // Ignore storage write failures.
    }
  }

  function shouldShowPipIntro() {
    const lastSeen = readPipLastSeen();
    if (!lastSeen) return true;
    const cooldownMs = PIP_PROMPT_COOLDOWN_MINUTES * 60 * 1000;
    return Date.now() - lastSeen >= cooldownMs;
  }

  function initPipGuide() {
    if (!pipGuide) return;
    const showNow = shouldShowPipIntro();
    setPipGuideMinimized(!showNow);
    if (showNow && pipGuideTip) {
      pipGuideTip.textContent = 'Hi! I can help you choose the best starting point by age.';
    }
  }

  function buildCardSearchText(card) {
    if (!card) return '';
    if (card.dataset.searchText) return card.dataset.searchText;

    const section = card.closest('.section-block');
    const sectionTitle = section && section.querySelector('.section-title')
      ? section.querySelector('.section-title').textContent
      : '';
    const text = [
      sectionTitle,
      card.textContent || '',
      card.getAttribute('href') || ''
    ].join(' ').replace(/\s+/g, ' ').toLowerCase().trim();
    card.dataset.searchText = text;
    return text;
  }

  function getAgeFilterRange(filterKey) {
    switch (filterKey) {
      case '4-6':
        return { min: 4, max: 6 };
      case '7-9':
        return { min: 7, max: 9 };
      case '10-12':
        return { min: 10, max: 12 };
      case '13-15':
        return { min: 13, max: 15 };
      default:
        return null;
    }
  }

  function getAgeFilterLabel(filterKey) {
    switch (filterKey) {
      case '4-6':
        return '4-6';
      case '7-9':
        return '7-9';
      case '10-12':
        return '10-12';
      case '13-15':
        return '13-15';
      default:
        return 'All';
    }
  }

  function getPathFilterLabel(filterKey) {
    switch (filterKey) {
      case 'story':
        return 'Story Adventures';
      case 'prep':
        return 'Competitive Prep';
      case 'exam':
        return 'Exam and Selective';
      default:
        return 'All Paths';
    }
  }

  function getSectionPathGroup(sectionId) {
    switch (sectionId) {
      case 'story-collection':
      case 'worksheets':
      case 'focus-calm-learning':
      case 'games':
        return 'story';
      case 'challenge-prep':
      case 'micro-topics':
      case 'weekly-competition':
        return 'prep';
      case 'exam-sessions':
      case 'selective-exam':
        return 'exam';
      default:
        return 'all';
    }
  }

  function matchesActivePathFilter(sectionId) {
    if (activePathFilter === 'all') return true;
    const group = getSectionPathGroup(sectionId);
    if (group === 'all') return true;
    return group === activePathFilter;
  }

  function parseAgeRangeFromTag(text) {
    const raw = (text || '').toLowerCase();
    const numbers = (raw.match(/\d+/g) || []).map(function (item) {
      return Number(item);
    }).filter(function (value) {
      return Number.isFinite(value);
    });

    if (!numbers.length) return null;

    let min = numbers[0];
    let max = numbers.length > 1 ? numbers[1] : numbers[0];

    if (raw.indexOf('year') !== -1) {
      min += 5;
      max += 5;
    }

    if (min > max) {
      const swap = min;
      min = max;
      max = swap;
    }

    return { min: min, max: max };
  }

  function getCardAgeRange(card) {
    if (!card) return null;

    if (card.dataset.ageMin && card.dataset.ageMax) {
      const ageMin = Number(card.dataset.ageMin);
      const ageMax = Number(card.dataset.ageMax);
      if (Number.isFinite(ageMin) && Number.isFinite(ageMax)) {
        return { min: ageMin, max: ageMax };
      }
    }

    const ageTag = card.querySelector('.tag-age');
    const parsed = parseAgeRangeFromTag(ageTag ? ageTag.textContent : '');
    if (!parsed) return null;

    card.dataset.ageMin = String(parsed.min);
    card.dataset.ageMax = String(parsed.max);
    return parsed;
  }

  function isCardVisible(card) {
    return !card.classList.contains('is-search-hidden')
      && !card.classList.contains('is-age-hidden')
      && !card.classList.contains('is-path-hidden');
  }

  function matchesActiveAgeFilter(card) {
    const filterRange = getAgeFilterRange(activeAgeFilter);
    if (!filterRange) return true;

    const cardRange = getCardAgeRange(card);
    if (!cardRange) return false;

    const overlapMin = Math.max(cardRange.min, filterRange.min);
    const overlapMax = Math.min(cardRange.max, filterRange.max);
    if (overlapMax < overlapMin) return false;

    const overlapCount = (overlapMax - overlapMin) + 1;
    const cardSpan = (cardRange.max - cardRange.min) + 1;

    // Show a card when at least half of its tagged age span fits the selected filter bucket.
    // This avoids wrong matches like 6–10 appearing in 10–12 while still returning useful results.
    return (overlapCount / cardSpan) >= 0.5;
  }

  function syncAgeFilterButtons() {
    ageFilterButtons.forEach(function (button) {
      const value = button.getAttribute('data-age-filter') || 'all';
      const isActive = value === activeAgeFilter;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  function applyAgeFilter(filterKey) {
    const normalized = getAgeFilterRange(filterKey) ? filterKey : 'all';
    activeAgeFilter = normalized;
    syncAgeFilterButtons();
    applyLibrarySearch(librarySearchInput ? librarySearchInput.value : '');
  }

  function syncPathFilterButtons() {
    pathFilterButtons.forEach(function (button) {
      const value = button.getAttribute('data-path-filter') || 'all';
      const isActive = value === activePathFilter;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  function applyPathFilter(filterKey) {
    const normalized = (filterKey === 'story' || filterKey === 'prep' || filterKey === 'exam') ? filterKey : 'all';
    activePathFilter = normalized;
    syncPathFilterButtons();
    applyLibrarySearch(librarySearchInput ? librarySearchInput.value : '');
  }

  function getSectionIdForCard(card) {
    const section = card ? card.closest('.section-block') : null;
    return section ? section.id : '';
  }

  function getCardProfile(card) {
    const sectionId = getSectionIdForCard(card);
    const tagsText = Array.from(card.querySelectorAll('.tag')).map(function (tag) {
      return (tag.textContent || '').toLowerCase();
    }).join(' ');
    const ageRange = getCardAgeRange(card);

    if (sectionId === 'games') {
      return { group: 'games', tone: 'challenge', label: 'Game Quest', icon: '🎮', xp: 45, ageRange: ageRange };
    }
    if (sectionId === 'worksheets') {
      return { group: 'worksheets', tone: 'math', label: 'Practice Pack', icon: '🧾', xp: 25, ageRange: ageRange };
    }
    if (sectionId === 'focus-calm-learning') {
      return { group: 'focus', tone: 'story', label: 'Calm Learning', icon: '🌿', xp: 30, ageRange: ageRange };
    }
    if (sectionId === 'challenge-prep' || sectionId === 'micro-topics') {
      return { group: 'challenge', tone: 'challenge', label: 'Skill Challenge', icon: '🎯', xp: 55, ageRange: ageRange };
    }
    if (sectionId === 'exam-sessions' || sectionId === 'selective-exam' || sectionId === 'weekly-competition') {
      return { group: 'exam', tone: 'exam', label: 'Exam Path', icon: '🏆', xp: 70, ageRange: ageRange };
    }
    if (tagsText.indexOf('math') !== -1 || tagsText.indexOf('numeracy') !== -1) {
      return { group: 'math', tone: 'math', label: 'Math Adventure', icon: '✨', xp: 50, ageRange: ageRange };
    }
    return { group: 'stories', tone: 'story', label: 'Story Quest', icon: '📖', xp: 40, ageRange: ageRange };
  }

  function getDifficultyFromAgeRange(ageRange) {
    const maxAge = ageRange && Number.isFinite(ageRange.max) ? ageRange.max : 9;
    if (maxAge <= 7) return { stars: 1, label: 'Easy' };
    if (maxAge <= 9) return { stars: 2, label: 'Warm-Up' };
    if (maxAge <= 11) return { stars: 3, label: 'Medium' };
    if (maxAge <= 13) return { stars: 4, label: 'Challenge' };
    return { stars: 5, label: 'Advanced' };
  }

  function decorateCardsGamified() {
    if (!searchCards.length) return;
    searchCards.forEach(function (card) {
      if (card.dataset.gamified === 'true') return;

      const cardBody = card.querySelector('.card-body');
      const cardFooter = card.querySelector('.card-footer');
      if (!cardBody || !cardFooter) return;

      const profile = getCardProfile(card);
      const difficulty = getDifficultyFromAgeRange(profile.ageRange);
      const emptyStars = Math.max(0, 5 - difficulty.stars);

      card.classList.add('card-tone-' + profile.tone);

      const gameHead = document.createElement('div');
      gameHead.className = 'card-game-head card-game-head-' + profile.tone;
      gameHead.innerHTML = [
        '<span class="card-game-cat">' + profile.icon + ' ' + profile.label + '</span>',
        '<span class="card-game-xp">+' + profile.xp + ' XP</span>'
      ].join('');
      cardBody.insertBefore(gameHead, cardBody.firstChild);

      const gameMeta = document.createElement('div');
      gameMeta.className = 'card-game-meta';
      gameMeta.innerHTML = [
        '<span><span class="card-difficulty-stars">' + '★'.repeat(difficulty.stars) + '☆'.repeat(emptyStars) + '</span><span class="card-difficulty-label">' + difficulty.label + '</span></span>',
        '<span class="card-difficulty-xp">+' + profile.xp + ' XP</span>'
      ].join('');
      cardFooter.insertBefore(gameMeta, cardFooter.firstChild);

      card.dataset.gamified = 'true';
    });
  }

  function safeReadProgress() {
    try {
      const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (!raw) return { completed: {}, activityDays: [] };
      const parsed = JSON.parse(raw);
      return {
        completed: parsed && typeof parsed.completed === 'object' && parsed.completed ? parsed.completed : {},
        activityDays: Array.isArray(parsed && parsed.activityDays) ? parsed.activityDays : []
      };
    } catch (_) {
      return { completed: {}, activityDays: [] };
    }
  }

  function safeSaveProgress(progress) {
    try {
      window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch (_) {
      // Ignore storage write failures.
    }
  }

  function getTodayKey() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
  }

  function dateKeyForOffset(offsetDays) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + offsetDays);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
  }

  function computeStreak(activityDays) {
    if (!Array.isArray(activityDays) || !activityDays.length) return 0;
    const daySet = new Set(activityDays);
    let streak = 0;
    while (daySet.has(dateKeyForOffset(-streak))) {
      streak += 1;
    }
    return streak;
  }

  function markCardCompleted(href) {
    if (!href) return;
    const progress = safeReadProgress();
    const today = getTodayKey();
    progress.completed[href] = Date.now();
    if (progress.activityDays.indexOf(today) === -1) {
      progress.activityDays.push(today);
    }
    safeSaveProgress(progress);
    renderLearningMap();
  }

  function renderLearningMap() {
    if (!learningMapCompleted || !learningMapStars || !learningMapBadgeGrid || !learningMapStreak || !learningMapBadges) return;

    const progress = safeReadProgress();
    const completedMap = progress.completed || {};
    const completedCards = searchCards.filter(function (card) {
      const href = card.getAttribute('href') || '';
      return !!completedMap[href];
    });
    const completedCount = completedCards.length;
    const streak = computeStreak(progress.activityDays || []);

    if (learningMapCompleted) {
      learningMapCompleted.textContent = String(completedCount);
    }
    learningMapToggleBadges.forEach(function (badge) {
      badge.textContent = completedCount > 99 ? '99+' : String(completedCount);
    });
    learningMapToggles.forEach(function (toggle) {
      toggle.classList.toggle('has-progress', completedCount > 0);
      toggle.setAttribute('aria-label', 'My Learning Map. ' + completedCount + ' adventures completed.');
    });
    if (learningMapStreak) {
      learningMapStreak.textContent = '🔥 ' + streak + ' day' + (streak === 1 ? '' : 's') + ' streak';
    }
    if (topbarStreakCount) {
      topbarStreakCount.textContent = String(streak);
    }
    if (learningMapStreakFill) {
      const streakProgress = Math.max(0, Math.min(3, streak));
      learningMapStreakFill.style.width = String((streakProgress / 3) * 100) + '%';
    }
    if (learningMapStreakLabel) {
      const streakProgress = Math.max(0, Math.min(3, streak));
      learningMapStreakLabel.textContent = String(streakProgress) + ' / 3 day goal';
    }

    const starFillCount = completedCount === 0 ? 0 : Math.max(1, Math.min(12, Math.floor(completedCount / 2)));
    if (learningMapStars) {
      const stars = [];
      for (let i = 0; i < 12; i += 1) {
        stars.push('<span class="learning-map-star' + (i < starFillCount ? ' is-on' : '') + '">' + (i < starFillCount ? '⭐' : '☆') + '</span>');
      }
      learningMapStars.innerHTML = stars.join('');
    }

    const counters = { stories: 0, math: 0, games: 0, challenge: 0, exam: 0, worksheets: 0, focus: 0 };
    completedCards.forEach(function (card) {
      const group = getCardProfile(card).group;
      if (Object.prototype.hasOwnProperty.call(counters, group)) {
        counters[group] += 1;
      }
    });

    const badgeRules = [
      { icon: '🌟', title: 'Story Starter', ok: counters.stories >= 1, note: counters.stories >= 1 ? 'Unlocked' : 'Complete 1 story' },
      { icon: '🧮', title: 'Math Explorer', ok: counters.math >= 4, note: counters.math >= 4 ? 'Unlocked' : 'Complete 4 maths pages' },
      { icon: '🎮', title: 'Game Sprinter', ok: counters.games >= 2, note: counters.games >= 2 ? 'Unlocked' : 'Complete 2 games' },
      { icon: '🎯', title: 'Challenge Hero', ok: counters.challenge >= 3, note: counters.challenge >= 3 ? 'Unlocked' : 'Complete 3 challenge pages' },
      { icon: '🔥', title: 'Consistency Flame', ok: streak >= 3, note: streak >= 3 ? 'Unlocked' : 'Reach a 3-day streak' },
      { icon: '🏆', title: 'Super Learner', ok: completedCount >= 20, note: completedCount >= 20 ? 'Unlocked' : 'Complete 20 adventures' }
    ];

    const unlockedCount = badgeRules.filter(function (badge) { return badge.ok; }).length;
    learningMapBadges.textContent = unlockedCount + ' / 6';
    learningMapBadgeGrid.innerHTML = badgeRules.map(function (badge) {
      return '<div class="learning-badge' + (badge.ok ? '' : ' is-locked') + '"><div class="learning-badge-title">' + badge.icon + ' ' + badge.title + '</div><div class="learning-badge-note">' + badge.note + '</div></div>';
    }).join('');
    if (heroProgressCompleted) {
      heroProgressCompleted.textContent = String(completedCount);
    }
    if (heroProgressBadges) {
      heroProgressBadges.textContent = unlockedCount + '/6';
    }
    if (heroProgressStars) {
      heroProgressStars.textContent = String(starFillCount);
    }

    if (learningMapNext && learningMapNextTitle) {
      const nextCard = searchCards.find(function (card) {
        const href = card.getAttribute('href') || '';
        return !completedMap[href] && matchesActiveAgeFilter(card);
      }) || searchCards.find(function (card) {
        const href = card.getAttribute('href') || '';
        return !completedMap[href];
      });

      if (nextCard) {
        const nextHref = nextCard.getAttribute('href') || '#story-collection';
        const titleNode = nextCard.querySelector('.card-title');
        learningMapNext.setAttribute('href', nextHref);
        learningMapNextTitle.textContent = titleNode ? titleNode.textContent.trim() : 'Keep learning';
      } else {
        learningMapNext.setAttribute('href', '#story-collection');
        learningMapNextTitle.textContent = 'Amazing! You finished everything here 🎉';
      }
    }
  }

  function routeWithPip(routeKey) {
    const routeMap = {
      young: {
        filter: '4-6',
        target: '#story-collection',
        tip: 'Great choice! Start with short stories and easy maths adventures.'
      },
      middle: {
        filter: '7-9',
        target: '#challenge-prep',
        tip: 'Awesome! Let us practise challenge pages and build confidence.'
      },
      senior: {
        filter: 'all',
        target: '#exam-sessions',
        tip: 'Brilliant! Jump into exam paths and selective-style practice.'
      }
    };

    const route = routeMap[routeKey];
    if (!route) return;

    applyAgeFilter(route.filter);
    if (pipGuideTip) {
      pipGuideTip.textContent = route.tip;
    }

    const target = document.querySelector(route.target);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    markPipIntroSeen();
    setPipGuideMinimized(true);
  }

  function applyLibrarySearch(rawTerm) {
    if (!searchCards.length) return;

    const term = (rawTerm || '').toLowerCase().trim();
    const hasAgeFilter = activeAgeFilter !== 'all';
    const hasPathFilter = activePathFilter !== 'all';
    let visibleCount = 0;
    let quickLinkCount = 0;

    searchCards.forEach(function (card) {
      const searchMatch = !term || buildCardSearchText(card).indexOf(term) !== -1;
      const ageMatch = matchesActiveAgeFilter(card);
      const sectionId = getSectionIdForCard(card);
      const pathMatch = matchesActivePathFilter(sectionId);

      card.classList.toggle('is-path-hidden', !pathMatch);
      card.classList.toggle('is-search-hidden', pathMatch ? !searchMatch : false);
      card.classList.toggle('is-age-hidden', pathMatch ? !ageMatch : false);
      if (pathMatch && searchMatch && ageMatch) visibleCount += 1;
    });

    searchableSections.forEach(function (section) {
      const sectionId = section.id || '';
      const pathMatch = matchesActivePathFilter(sectionId);
      const hasVisibleCard = Array.from(section.querySelectorAll('.story-card')).some(function (card) {
        return isCardVisible(card);
      });
      section.classList.toggle('is-path-hidden', !pathMatch);
      section.classList.toggle('is-search-hidden', !pathMatch || !hasVisibleCard);
    });

    document.body.classList.toggle('path-filter-active', hasPathFilter);
    document.body.classList.toggle('search-active', !!term || hasAgeFilter || hasPathFilter);
    if (term) {
      quickLinkCount = renderSearchLinkPopup(term);
    } else {
      hideSearchLinkPopup();
    }
    if (librarySearchStatus) {
      if (!term && !hasAgeFilter && !hasPathFilter) {
        librarySearchStatus.textContent = 'Type to find pages by title, tags, and description.';
      } else {
        const suffix = [];
        if (term) {
          suffix.push('for "' + term + '"');
        }
        if (hasAgeFilter) {
          suffix.push('in age ' + getAgeFilterLabel(activeAgeFilter));
        }
        if (hasPathFilter) {
          suffix.push('inside ' + getPathFilterLabel(activePathFilter));
        }
        if (visibleCount > 0) {
          librarySearchStatus.textContent = 'Showing ' + visibleCount + ' result' + (visibleCount === 1 ? '' : 's') + ' ' + suffix.join(' ') + '.';
        } else if (quickLinkCount > 0) {
          librarySearchStatus.textContent = 'No on-page cards found ' + suffix.join(' ') + '. Use the quick-link popup beside search.';
        } else {
          librarySearchStatus.textContent = 'No pages found ' + suffix.join(' ') + '. Try another keyword, age, or path.';
        }
      }
    }

    renderLearningMap();
  }

  function buildCaptcha() {
    if (!captchaQuestion || !captchaAnswer) return;
    const left = Math.floor(Math.random() * 9) + 1;
    const right = Math.floor(Math.random() * 9) + 1;
    currentCaptchaAnswer = left + right;
    captchaQuestion.textContent = 'Captcha: What is ' + left + ' + ' + right + '?';
    captchaAnswer.value = '';
  }

  function setStatus(message, type) {
    if (!commentStatus) return;
    commentStatus.textContent = message;
    commentStatus.className = ('comment-status ' + (type || '')).trim();
  }

  function getSelectedCommentType() {
    const checked = commentTypeInputs.find(function (input) {
      return input.checked;
    });
    return checked ? checked.value : '';
  }

  function applyInitialSearchTermFromUrl() {
    if (!librarySearchInput) return;
    try {
      const params = new URLSearchParams(window.location.search);
      const term = (params.get('q') || '').trim();
      if (!term) return;
      librarySearchInput.value = term;
    } catch (_) {
      // Ignore malformed URL edge cases.
    }
  }

  function setTreeNodeState(node, isOpen) {
    if (!node) return;
    node.classList.toggle('is-open', isOpen);
    const toggle = node.querySelector('.tree-toggle');
    if (toggle) {
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
  }

  function openTreeNode(node) {
    let current = node;
    while (current) {
      setTreeNodeState(current, true);
      current = current.parentElement ? current.parentElement.closest('.tree-node') : null;
    }
  }

  function setupTreeNav() {
    const nodes = Array.from(document.querySelectorAll('.tree-node'));
    nodes.forEach(function (node) {
      const toggle = node.querySelector('.tree-toggle');
      if (!toggle) return;
      toggle.addEventListener('click', function () {
        const isOpen = node.classList.contains('is-open');
        setTreeNodeState(node, !isOpen);
      });
    });
  }

  function setupTopSubmenuMoreOptions() {
    const LIMIT = 8;
    const submenus = Array.from(document.querySelectorAll('#miniTopbar .top-submenu'));
    submenus.forEach(function (submenu) {
      if (!submenu || submenu.dataset.moreReady === 'true') return;
      const links = Array.from(submenu.querySelectorAll('.top-submenu-link'));
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
      toggle.className = 'top-submenu-more';
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

      const group = submenu.closest('.top-menu-group');
      if (group) {
        group.addEventListener('mouseleave', collapse);
      }

      submenu.appendChild(toggle);
      submenu.dataset.moreReady = 'true';
    });
  }

  function setActiveNav() {
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const sections = navLinks
      .map(function (link) {
        const target = document.querySelector(link.getAttribute('href'));
        return target ? { link: link, section: target } : null;
      })
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        sections.forEach(function (item) {
          const isMatch = item.section === entry.target;
          item.link.classList.toggle('active', isMatch);
          if (isMatch) {
            openTreeNode(item.link.closest('.tree-node'));
          }
        });
      });
    }, {
      rootMargin: '-20% 0px -55% 0px',
      threshold: 0.15
    });

    sections.forEach(function (item) {
      observer.observe(item.section);
    });
  }

  function formatCompetitionDate(value) {
    return new Date(value).toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short'
    });
  }

  function setupCompetitionStatuses() {
    const cards = Array.from(document.querySelectorAll('[data-competition-card]'));
    if (!cards.length) return;

    const now = Date.now();

    cards.forEach(function (card) {
      const start = new Date(card.getAttribute('data-competition-start') || '').getTime();
      const end = new Date(card.getAttribute('data-competition-end') || '').getTime();
      const statusEl = card.querySelector('[data-competition-status]');
      const metaEl = card.querySelector('[data-competition-meta]');
      const ctaEl = card.querySelector('[data-competition-cta]');

      if (!Number.isFinite(start) || !Number.isFinite(end) || !statusEl) return;

      statusEl.classList.remove('is-pending', 'is-active', 'is-upcoming', 'is-expired');

      if (now < start) {
        statusEl.classList.add('is-upcoming');
        statusEl.textContent = '🟦 Upcoming';
        if (metaEl) metaEl.textContent = '📅 Starts ' + formatCompetitionDate(start);
        if (ctaEl) ctaEl.textContent = 'Opens Soon →';
        return;
      }

      if (now <= end) {
        statusEl.classList.add('is-active');
        statusEl.textContent = '🟢 Active Now';
        if (metaEl) metaEl.textContent = '⏳ Valid until ' + formatCompetitionDate(end);
        if (ctaEl) ctaEl.textContent = 'Enter →';
        return;
      }

      statusEl.classList.add('is-expired');
      statusEl.textContent = '🔴 Expired';
      if (metaEl) metaEl.textContent = '📁 Round ended ' + formatCompetitionDate(end);
      if (ctaEl) ctaEl.textContent = 'View Round →';
    });
  }

  function sendTopicSuggestionToFeedback() {
    const text = topicSuggestionInput ? topicSuggestionInput.value.trim() : '';
    if (!text) {
      if (topicSuggestionInput && (!topicHelper || !topicHelper.classList.contains('is-minimized'))) {
        topicSuggestionInput.focus();
      } else if (commentsSection) {
        commentsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (!text && (!topicHelper || topicHelper.classList.contains('is-minimized'))) {
        const suggestionRadio = document.querySelector('input[name="commentType"][value="Suggestion"]');
        if (suggestionRadio) {
          suggestionRadio.checked = true;
        }
        return;
      }
      return;
    }

    if (commentMessage) {
      commentMessage.value = 'Topic request: ' + text;
    }

    const suggestionRadio = document.querySelector('input[name="commentType"][value="Suggestion"]');
    if (suggestionRadio) {
      suggestionRadio.checked = true;
    }

    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.hash = '#comments';
    }

    window.setTimeout(function () {
      if (commentMessage) {
        commentMessage.focus();
        const end = commentMessage.value.length;
        commentMessage.setSelectionRange(end, end);
      }
    }, 380);

    if (topicSuggestionInput) {
      topicSuggestionInput.value = '';
    }
  }

  if (copyShareBtn && shareUrl) {
    copyShareBtn.addEventListener('click', async function () {
      try {
        await navigator.clipboard.writeText(shareUrl.value);
        copyShareBtn.textContent = 'Copied!';
        setTimeout(function () {
          copyShareBtn.textContent = 'Copy Link';
        }, 1600);
      } catch (error) {
        copyShareBtn.textContent = 'Copy Failed';
        setTimeout(function () {
          copyShareBtn.textContent = 'Copy Link';
        }, 1600);
      }
    });
  }

  if (refreshCaptcha) {
    refreshCaptcha.addEventListener('click', buildCaptcha);
  }

  if (librarySearchInput) {
    librarySearchInput.addEventListener('input', function () {
      applyLibrarySearch(librarySearchInput.value);
    });

    librarySearchInput.addEventListener('focus', function () {
      renderSearchLinkPopup(librarySearchInput.value);
    });

    librarySearchInput.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        librarySearchInput.value = '';
        applyLibrarySearch('');
        hideSearchLinkPopup();
      }
    });
  }

  if (librarySearchClear) {
    librarySearchClear.addEventListener('click', function () {
      if (!librarySearchInput) return;
      librarySearchInput.value = '';
      applyLibrarySearch('');
      hideSearchLinkPopup();
      librarySearchInput.focus();
    });
  }

  document.addEventListener('click', function (event) {
    if (!miniTopbarSearch) return;
    if (miniTopbarSearch.contains(event.target)) return;
    hideSearchLinkPopup();
  });

  if (ageFilterButtons.length) {
    ageFilterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const nextFilter = button.getAttribute('data-age-filter') || 'all';
        if (nextFilter === activeAgeFilter) return;
        applyAgeFilter(nextFilter);
      });
    });
  }

  if (pathFilterButtons.length) {
    pathFilterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const nextFilter = button.getAttribute('data-path-filter') || 'all';
        if (nextFilter === activePathFilter) return;
        applyPathFilter(nextFilter);
      });
    });
  }

  if (pathShortcutLinks.length) {
    pathShortcutLinks.forEach(function (link) {
      link.addEventListener('click', function (event) {
        const nextFilter = link.getAttribute('data-path-link') || 'all';
        applyPathFilter(nextFilter);

        const targetSelector = link.getAttribute('href');
        const target = targetSelector ? document.querySelector(targetSelector) : null;
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  if (learningMapPanel && learningMapToggles.length) {
    const shouldOpenFromHash = ((window.location.hash || '').replace(/^#/, '').toLowerCase() === 'learningmappanel');
    setLearningMapExpanded(shouldOpenFromHash);

    learningMapToggles.forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        setLearningMapExpanded(!isExpanded);
        if (!isExpanded) {
          learningMapPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    window.addEventListener('hashchange', function () {
      const hash = (window.location.hash || '').replace(/^#/, '').toLowerCase();
      if (hash === 'learningmappanel') {
        setLearningMapExpanded(true);
      }
    });
  }

  if (pipGuideMinimize) {
    pipGuideMinimize.addEventListener('click', function () {
      markPipIntroSeen();
      setPipGuideMinimized(true);
    });
  }

  if (pipGuideBubble) {
    pipGuideBubble.addEventListener('click', function () {
      setPipGuideMinimized(false);
    });
  }

  if (pipRouteButtons.length) {
    pipRouteButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const route = button.getAttribute('data-pip-route') || '';
        routeWithPip(route);
      });
    });
  }

  if (searchCards.length) {
    searchCards.forEach(function (card) {
      card.addEventListener('click', function () {
        const href = card.getAttribute('href') || '';
        if (href) {
          markCardCompleted(href);
        }
      });
    });
  }

  if (topicSuggestionBtn) {
    topicSuggestionBtn.addEventListener('click', sendTopicSuggestionToFeedback);
  }

  if (topicHelperFeedbackMini) {
    topicHelperFeedbackMini.addEventListener('click', sendTopicSuggestionToFeedback);
  }

  if (topicSuggestionInput) {
    topicSuggestionInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        sendTopicSuggestionToFeedback();
      }
    });
  }

  if (topicHelperMinimize) {
    topicHelperMinimize.addEventListener('click', function () {
      setTopicHelperMinimized(true);
    });
  }

  if (topicHelperCharacter) {
    topicHelperCharacter.addEventListener('click', function () {
      if (!topicHelper || !topicHelper.classList.contains('is-minimized')) return;
      setTopicHelperMinimized(false);
      if (topicSuggestionInput) {
        window.setTimeout(function () {
          topicSuggestionInput.focus();
        }, 80);
      }
    });
  }

  if (commentForm) {
    commentForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      const name = commentName ? commentName.value.trim() : '';
      const message = commentMessage ? commentMessage.value.trim() : '';
      const commentType = getSelectedCommentType();
      const captcha = Number(captchaAnswer ? captchaAnswer.value.trim() : '');

      if (!name) {
        setStatus('Please enter a name before submitting.', 'error');
        return;
      }

      if (!commentType) {
        setStatus('Please choose whether this is a suggestion or a correction.', 'error');
        return;
      }

      if (!message) {
        setStatus('Please write a comment before submitting.', 'error');
        return;
      }

      if (message.length < 6) {
        setStatus('Please make the comment a little more detailed.', 'error');
        return;
      }

      if (captcha !== currentCaptchaAnswer) {
        setStatus('Captcha answer is not correct. Please try again.', 'error');
        buildCaptcha();
        return;
      }

      if (!COMMENTS_API_URL || COMMENTS_API_URL.indexOf('PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') !== -1) {
        setStatus('Add your Google Apps Script web app URL in index.html before submitting comments.', 'error');
        return;
      }

      setStatus('Submitting comment...', '');

      try {
        const response = await fetch(COMMENTS_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify({
            action: 'create',
            name: name.slice(0, 40),
            commentType: commentType,
            message: message.slice(0, 400),
            captchaQuestion: captchaQuestion ? captchaQuestion.textContent : '',
            captchaAnswer: captcha,
            page: 'index.html'
          })
        });

        if (!response.ok) {
          throw new Error('Submit failed');
        }

        const payload = await response.json();

        if (!payload.success) {
          throw new Error(payload.message || 'Submit failed');
        }

        if (commentName) commentName.value = '';
        if (commentMessage) commentMessage.value = '';
        setStatus('Thank you! Your comment was sent! 🎉', 'success');
        buildCaptcha();
      } catch (error) {
        setStatus(error.message || 'Comment could not be submitted right now.', 'error');
      }
    });
  }

  buildCaptcha();
  decorateCardsGamified();
  initPipGuide();
  setupTreeNav();
  setupTopSubmenuMoreOptions();
  setActiveNav();
  setupCompetitionStatuses();
  renderLearningMap();
  syncAgeFilterButtons();
  syncPathFilterButtons();
  applyInitialSearchTermFromUrl();
  applyLibrarySearch(librarySearchInput ? librarySearchInput.value : '');
})();
