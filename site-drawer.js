(function () {
  const links = [
    {
      heading: 'Home',
      items: [
        { emoji: '🏠', label: 'Home Library', href: 'index.html' },
        { emoji: '📰', label: 'News', href: 'news.html' },
        { emoji: '💡', label: 'Ideas', href: 'ideas.html' }
      ]
    },
    {
      heading: 'Stories',
      items: [
        { emoji: '📖', label: 'Story Collection', href: 'index.html#story-collection' },
        { emoji: '➕', label: 'Math is Fun', href: 'index.html#math-is-fun' },
        { emoji: '🔢', label: 'Addition Tables', href: 'addition-tables-hub.html' },
        { emoji: '✖️', label: 'Multiplication Tables', href: 'multiplication-tables-hub.html' },
        { emoji: '🚀', label: 'Space & Science', href: 'index.html#space-science' },
        { emoji: '🧪', label: 'Chemistry Lab', href: 'index.html#chemistry-lab' },
        { emoji: '🌍', label: 'World & History', href: 'index.html#world-history' }
      ]
    },
    {
      heading: 'Worksheets',
      items: [
        { emoji: '🧾', label: 'Worksheets Hub', href: 'worksheets.html' },
        { emoji: '🔤', label: 'Alphabet Worksheets A-Z', href: 'alphabet-worksheets.html' },
        { emoji: '🧮', label: 'Addition Table Worksheets', href: 'addition-table-worksheets.html' },
        { emoji: '✖️', label: 'Multiplication Worksheets', href: 'multiplication-worksheets.html' },
        { emoji: '📚', label: 'Table Practice 1 to 12', href: 'worksheet-multiplication-table-practice.html' },
        { emoji: '🔢', label: 'Skip Counting', href: 'worksheet-multiplication-skip-counting.html' },
        { emoji: '➕', label: 'Repeated Addition to Multiplication', href: 'worksheet-multiplication-repeated-addition.html' },
        { emoji: '❓', label: 'Missing Factor', href: 'worksheet-multiplication-missing-factor.html' },
        { emoji: '📘', label: 'Multiplication Word Problems', href: 'worksheet-multiplication-word-problems.html' },
        { emoji: '🌀', label: 'Table Maze', href: 'worksheet-multiplication-table-maze.html' },
        { emoji: '🏁', label: 'Mixed Times-Table Challenge', href: 'worksheet-multiplication-mixed-challenge.html' },
        { emoji: '🕒', label: 'Clock and Time Worksheets', href: 'clock-and-time-worksheets.html' },
        { emoji: '🖍️', label: 'Draw Hands on the Clock', href: 'worksheet-clock-draw-hands.html' },
        { emoji: '✍️', label: 'Write the Time', href: 'worksheet-clock-write-time.html' },
        { emoji: '🔗', label: 'Match Analog to Digital', href: 'worksheet-clock-match-analog-digital.html' },
        { emoji: '🌤️', label: 'Morning Afternoon Sorting', href: 'worksheet-clock-morning-afternoon.html' },
        { emoji: '⏳', label: 'Elapsed Time Basics', href: 'worksheet-clock-elapsed-time.html' },
        { emoji: '📅', label: 'Daily Routine Timeline', href: 'worksheet-clock-daily-routine.html' },
        { emoji: '📋', label: 'Complete the Table', href: 'worksheet-addition-complete-table.html' },
        { emoji: '🎨', label: 'Color the Answers', href: 'worksheet-addition-color-answers.html' },
        { emoji: '✂️', label: 'Cut and Match', href: 'worksheet-addition-cut-match.html' },
        { emoji: '✅', label: 'Multiple Choice Facts', href: 'worksheet-addition-multiple-choice.html' },
        { emoji: '⏱️', label: 'Speed Practice Sheet', href: 'worksheet-addition-speed-practice.html' },
        { emoji: '🔁', label: 'Mixed Revision Sheet', href: 'worksheet-addition-mixed-revision.html' },
        { emoji: '🏁', label: 'Final Test Sheet', href: 'worksheet-addition-final-test.html' },
        { emoji: '➕', label: 'Addition Facts', href: 'worksheet-addition-facts.html' },
        { emoji: '🧮', label: 'Two & Three Number Addition Workout', href: 'worksheet-two-number-addition-practice.html' },
        { emoji: '➖', label: 'Subtraction Facts', href: 'worksheet-subtraction-facts.html' },
        { emoji: '🔗', label: 'Number Bonds', href: 'worksheet-number-bonds.html' },
        { emoji: '🔵', label: 'Count and Circle', href: 'worksheet-count-and-circle.html' },
        { emoji: '↔️', label: 'Before After Between', href: 'worksheet-before-after-between.html' },
        { emoji: '❓', label: 'Missing Number', href: 'worksheet-missing-number.html' },
        { emoji: '⚖️', label: 'Compare Bigger Smaller', href: 'worksheet-compare-bigger-smaller.html' }
      ]
    },
    {
      heading: 'Games',
      items: [
        { emoji: '🎮', label: 'Games Hub', href: 'index.html#games' },
        { emoji: '🫧', label: 'Addition Bubble Pop', href: 'game-addition-bubble-pop.html' },
        { emoji: '☄️', label: 'Multiplication Meteor', href: 'game-multiplication-meteor.html' },
        { emoji: '🕒', label: 'Clock Match Rush', href: 'game-clock-match-rush.html' },
        { emoji: '🧪', label: 'Grammar Fix-it Lab', href: 'game-grammar-fix-it-lab.html' }
      ]
    },
    {
      heading: 'Focus & Calm',
      items: [
        { emoji: '🌿', label: 'Focus & Calm Hub', href: 'index.html#focus-calm-learning' },
        { emoji: '➡️', label: 'Routine Adventure', href: 'first-then-routine-kids.html' },
        { emoji: '🙂', label: 'Feelings and Faces', href: 'feelings-and-faces-kids.html' },
        { emoji: '🧺', label: 'Sorting Fun', href: 'sorting-fun-kids.html' },
        { emoji: '🧩', label: 'Matching Fun', href: 'matching-fun-kids.html' }
      ]
    },
    {
      heading: 'Exam Paths',
      items: [
        { emoji: '🎯', label: 'Competitive Prep', href: 'index.html#challenge-prep' },
        { emoji: '🧩', label: 'Micro-Topics', href: 'index.html#micro-topics' },
        { emoji: '📝', label: 'Exam Sessions', href: 'index.html#exam-sessions' },
        { emoji: '🎓', label: 'Selective Exam', href: 'index.html#selective-exam' },
        { emoji: '🏆', label: 'Competition', href: 'index.html#weekly-competition' }
      ]
    },
    {
      heading: 'Help & Feedback',
      items: [{ emoji: '💬', label: 'Comments', href: 'index.html#comments' }]
    }
  ];

  const selectiveLinks = [
    {
      heading: 'Introduction',
      items: [
        { emoji: '🎓', label: 'Selective Hub', href: 'selective-school-exam.html' },
        { emoji: '📘', label: 'Syllabus', href: 'selective-exam-introduction.html' }
      ]
    },
    {
      heading: 'Mathematical Reasoning',
      items: [
        { emoji: '🔢', label: 'Whole Numbers', href: 'selective-maths-whole-numbers.html' },
        { emoji: '➗', label: 'Divisibility & Remainders', href: 'selective-maths-divisibility-remainders.html' },
        { emoji: '🍕', label: 'Fractions & Decimals', href: 'selective-maths-fractions-decimals.html' },
        { emoji: '💯', label: 'Percentages', href: 'selective-maths-percentages.html' },
        { emoji: '⚖️', label: 'Ratios & Rates', href: 'selective-maths-ratios-rates.html' },
        { emoji: '🧠', label: 'Patterns & Algebra', href: 'selective-maths-patterns-algebra.html' },
        { emoji: '🧮', label: 'Counting & Combinatorics', href: 'selective-maths-counting-combinatorics.html' },
        { emoji: '🎯', label: 'Optimisation & Constraints', href: 'selective-maths-optimisation-constraints.html' },
        { emoji: '📏', label: 'Measurement', href: 'selective-maths-measurement.html' },
        { emoji: '⏰', label: 'Time Systems & Timetables', href: 'selective-maths-time-systems.html' },
        { emoji: '📐', label: 'Geometry', href: 'selective-maths-geometry.html' },
        { emoji: '🗺️', label: 'Position & Coordinates', href: 'selective-maths-position-coordinates.html' },
        { emoji: '📊', label: 'Data Interpretation', href: 'selective-maths-data-interpretation.html' },
        { emoji: '📈', label: 'Mean, Median & Mode', href: 'selective-maths-averages.html' },
        { emoji: '🎲', label: 'Probability', href: 'selective-maths-probability.html' }
      ]
    },
    {
      heading: 'Thinking Skills',
      items: [
        { emoji: '🗣️', label: 'Verbal Reasoning', href: 'selective-thinking-verbal-reasoning.html' },
        { emoji: '⚖️', label: 'Evaluating Arguments', href: 'selective-thinking-evaluating-arguments.html' },
        { emoji: '🔍', label: 'Drawing Conclusions', href: 'selective-thinking-drawing-conclusions.html' },
        { emoji: '🧩', label: 'Identifying Flaws', href: 'selective-thinking-identifying-flaws.html' },
        { emoji: '➗', label: 'Problem Solving', href: 'selective-thinking-problem-solving.html' },
        { emoji: '📋', label: 'Data Analysis', href: 'selective-thinking-data-analysis.html' },
        { emoji: '🧱', label: 'Spatial Reasoning', href: 'selective-thinking-spatial-reasoning.html' }
      ]
    },
    {
      heading: 'Reading',
      items: [
        { emoji: '📚', label: 'Fiction Reading', href: 'selective-reading-fiction.html' },
        { emoji: '📝', label: 'Poetry Reading', href: 'selective-reading-poetry.html' },
        { emoji: '📰', label: 'Non-Fiction Reading', href: 'selective-reading-non-fiction.html' },
        { emoji: '💡', label: 'Inference', href: 'selective-reading-inference.html' },
        { emoji: '🔤', label: 'Vocabulary in Context', href: 'selective-reading-vocabulary-context.html' },
        { emoji: '🔗', label: 'Synthesis Across Texts', href: 'selective-reading-synthesis.html' }
      ]
    },
    {
      heading: 'Writing',
      items: [
        { emoji: '📖', label: 'Narrative Writing', href: 'selective-writing-narrative.html' },
        { emoji: '📣', label: 'Persuasive Writing', href: 'selective-writing-persuasive.html' },
        { emoji: '⚖️', label: 'Discursive Writing', href: 'selective-writing-discursive.html' },
        { emoji: '💭', label: 'Ideas & Content', href: 'selective-writing-ideas-content.html' },
        { emoji: '🧱', label: 'Structure & Organisation', href: 'selective-writing-structure-organisation.html' },
        { emoji: '✨', label: 'Language & Vocabulary', href: 'selective-writing-language-vocabulary.html' },
        { emoji: '✍️', label: 'Grammar & Punctuation', href: 'selective-writing-grammar-punctuation.html' }
      ]
    }
  ];

  function ensureStyles() {
    if (document.getElementById('site-drawer-styles')) return;
    const style = document.createElement('style');
    style.id = 'site-drawer-styles';
    style.textContent = [
      '.site-drawer-toggle{position:fixed;left:16px;top:50%;transform:translateY(-50%);z-index:1400;border:none;border-radius:18px;min-height:52px;padding:12px 14px;display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,#39c3ad 0%,#48ceb3 100%);color:#fff;font:900 .92rem "Nunito",sans-serif;box-shadow:0 16px 28px rgba(57,195,173,.24);cursor:pointer;writing-mode:vertical-rl;text-orientation:mixed}',
      '.site-drawer-toggle:hover{transform:translateY(calc(-50% - 2px))}',
      '.site-drawer-toggle-label{display:inline-flex;align-items:center}',
      '.site-drawer-shell{position:fixed;inset:0;z-index:1390;pointer-events:none}',
      '.site-drawer-backdrop{position:absolute;inset:0;background:rgba(25,36,58,.24);opacity:0;transition:opacity .18s ease}',
      '.site-drawer-panel{position:absolute;left:0;top:0;bottom:0;width:min(340px,88vw);background:linear-gradient(180deg,#fffefa 0%,#f8fbff 100%);border-right:1px solid #e6edf6;box-shadow:22px 0 40px rgba(37,64,90,.16);transform:translateX(-100%);transition:transform .2s ease;display:grid;grid-template-rows:auto 1fr}',
      '.site-drawer-shell.is-open{pointer-events:auto}',
      '.site-drawer-shell.is-open .site-drawer-backdrop{opacity:1}',
      '.site-drawer-shell.is-open .site-drawer-panel{transform:translateX(0)}',
      '.site-drawer-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:18px;border-bottom:1px solid #e7edf6;background:linear-gradient(135deg,#eefbf6 0%,#f7fbff 58%,#fff7ea 100%)}',
      '.site-drawer-title{font:400 1.12rem "Fredoka One",cursive;color:#2e5670}',
      '.site-drawer-close{border:none;background:#eef4fb;color:#4c647b;border-radius:14px;min-height:42px;padding:10px 14px;font:900 .9rem "Nunito",sans-serif;cursor:pointer}',
      '.site-drawer-scroll{overflow:auto;padding:16px;display:grid;gap:14px}',
      '.site-drawer-card{background:rgba(255,255,255,.94);backdrop-filter:blur(10px);border-radius:26px;padding:20px;box-shadow:0 18px 32px rgba(44,86,128,.11);border:1px solid rgba(224,231,240,.92)}',
      '.site-drawer-card + .site-drawer-card{margin-top:14px}',
      '.site-drawer-card.is-primary{border-color:rgba(15,118,110,.22);box-shadow:0 18px 34px rgba(15,118,110,.16);background:linear-gradient(180deg,#ffffff 0%,#f7fffc 100%)}',
      '.site-drawer-card-title{font:400 1.04rem "Fredoka One",cursive;color:#2e5670;margin-bottom:14px}',
      '.tree-nav{padding-top:2px}',
      '.tree-root,.tree-children{list-style:none;margin:0;padding:0}',
      '.tree-root{display:grid;gap:10px}',
      '.tree-node{position:relative;border:1px solid #ede8f4;border-radius:18px;background:linear-gradient(180deg,#fff 0%,#fdfdfd 100%);padding:8px 10px 10px}',
      '.tree-toggle{width:100%;border:0;background:transparent;color:#45366a;font-family:"Nunito",sans-serif;font-size:.94rem;font-weight:900;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:6px 6px 10px;cursor:pointer;text-align:left}',
      '.tree-toggle:hover{color:#39c3ad}',
      '.tree-label{display:inline-flex;align-items:center;gap:8px}',
      '.tree-label::before{content:"▸";font-size:.8rem;color:#83cfc2}',
      '.tree-caret{font-size:.95rem;transition:transform .18s ease}',
      '.tree-node.is-open .tree-caret{transform:rotate(180deg)}',
      '.tree-children{position:relative;margin-left:10px;padding-left:18px;display:grid;gap:8px}',
      '.tree-children::before{content:"";position:absolute;left:6px;top:2px;bottom:10px;width:2px;background:linear-gradient(180deg,#d8c8fb 0%,#efe7ff 100%)}',
      '.tree-leaf{position:relative}',
      '.tree-leaf::before{content:"";position:absolute;left:-12px;top:22px;width:12px;height:2px;background:#d8c8fb}',
      '.tree-node:not(.is-open) .tree-children{display:none}',
      '.nav-link{display:flex;align-items:center;gap:10px;text-decoration:none;color:#4c576f;background:linear-gradient(180deg,#fff 0%,#fdfcfe 100%);border:1px solid #ece8f4;border-radius:999px;padding:11px 14px;font-weight:800;min-height:46px;transition:transform .18s ease,box-shadow .18s ease,background .18s ease,color .18s ease}',
      '.nav-link:hover{transform:translateY(-2px);background:#39c3ad;color:#fff;box-shadow:0 8px 18px rgba(0,0,0,.08)}',
      '.nav-link.active{background:#39c3ad;color:#fff;box-shadow:0 12px 22px rgba(57,195,173,.24)}',
      '.tree-link{min-height:42px;padding:9px 12px;font-size:.96rem}',
      '.nav-emoji{font-size:1.2rem;flex-shrink:0}',
      '.nav-copy{font-size:.9rem;color:#7b8a8b;line-height:1.5;margin-top:12px}',
      '@media (max-width:640px){.site-drawer-toggle{left:12px;top:auto;bottom:12px;transform:none;writing-mode:horizontal-tb;min-height:42px;min-width:42px;padding:10px;border-radius:14px;gap:0;box-shadow:0 10px 18px rgba(57,195,173,.24)}.site-drawer-toggle:hover{transform:translateY(-2px)}.site-drawer-toggle .site-drawer-toggle-label{display:none}}'
    ].join('');
    document.head.appendChild(style);
  }

  function normalize(path) {
    return path.replace(/^\/+/, '').split('#')[0];
  }

  function buildGroup(group, currentFile) {
    const wrap = document.createElement('li');
    wrap.className = 'tree-node is-open';

    const toggle = document.createElement('button');
    toggle.className = 'tree-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', 'true');
    toggle.innerHTML = '<span class="tree-label">' + group.heading + '</span><span class="tree-caret">▾</span>';

    const list = document.createElement('ul');
    list.className = 'tree-children';
    group.items.forEach(function (item) {
      const leaf = document.createElement('li');
      leaf.className = 'tree-leaf';
      const link = document.createElement('a');
      link.className = 'nav-link tree-link';
      link.href = item.href;
      link.innerHTML = '<span class="nav-emoji">' + item.emoji + '</span><span>' + item.label + '</span>';
      if (normalize(item.href) === currentFile) {
        link.classList.add('active');
      }
      leaf.appendChild(link);
      list.appendChild(leaf);
    });

    toggle.addEventListener('click', function () {
      const isOpen = wrap.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    wrap.appendChild(toggle);
    wrap.appendChild(list);
    return wrap;
  }

  function buildTree(groups, currentFile) {
    const root = document.createElement('ul');
    root.className = 'tree-root';
    groups.forEach(function (group) {
      root.appendChild(buildGroup(group, currentFile));
    });
    return root;
  }

  function initDrawer() {
    if (document.getElementById('siteDrawerToggle')) return;
    ensureStyles();

    const currentFile = normalize(window.location.pathname.split('/').pop() || 'index.html');
    const isSelectivePage = /^selective-/.test(currentFile);

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.id = 'siteDrawerToggle';
    toggle.className = 'site-drawer-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = isSelectivePage
      ? '<span aria-hidden="true">🎓</span><span class="site-drawer-toggle-label">Selective</span>'
      : '<span aria-hidden="true">☰</span><span class="site-drawer-toggle-label">Menu</span>';

    const shell = document.createElement('div');
    shell.className = 'site-drawer-shell';
    shell.innerHTML = [
      '<div class="site-drawer-backdrop"></div>',
      '<aside class="site-drawer-panel" aria-label="Site navigation">',
      '<div class="site-drawer-head"><div class="site-drawer-title">' + (isSelectivePage ? 'Selective Menu' : 'Explore Library') + '</div><button class="site-drawer-close" type="button">Close</button></div>',
      '<div class="site-drawer-scroll"></div>',
      '</aside>'
    ].join('');

    const scroll = shell.querySelector('.site-drawer-scroll');

    if (isSelectivePage) {
      const selectiveCard = document.createElement('div');
      selectiveCard.className = 'site-drawer-card is-primary';
      selectiveCard.innerHTML = '<div class="site-drawer-card-title">Selective Exam Topics</div><nav class="tree-nav" aria-label="Selective exam topics"></nav><div class="nav-copy">Move between the hub, syllabus, and all selective subtopics without leaving the selective area.</div>';
      selectiveCard.querySelector('.tree-nav').appendChild(buildTree(selectiveLinks, currentFile));
      scroll.appendChild(selectiveCard);
    }

    const libraryCard = document.createElement('div');
    libraryCard.className = 'site-drawer-card';
    libraryCard.innerHTML = '<div class="site-drawer-card-title">' + (isSelectivePage ? 'Whole Library' : 'Explore Library') + '</div><nav class="tree-nav" aria-label="Library sections"></nav><div class="nav-copy">Jump across stories, games, focus-friendly activities, and exam paths from anywhere in the library.</div>';
    libraryCard.querySelector('.tree-nav').appendChild(buildTree(links, currentFile));
    scroll.appendChild(libraryCard);

    function openDrawer() {
      shell.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    }

    function closeDrawer() {
      shell.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      if (shell.classList.contains('is-open')) closeDrawer();
      else openDrawer();
    });
    shell.querySelector('.site-drawer-close').addEventListener('click', closeDrawer);
    shell.querySelector('.site-drawer-backdrop').addEventListener('click', closeDrawer);
    shell.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeDrawer();
    });

    document.body.appendChild(toggle);
    document.body.appendChild(shell);
  }

  window.initSiteDrawer = initDrawer;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDrawer, { once: true });
  } else {
    initDrawer();
  }
})();
