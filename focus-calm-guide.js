(function () {
  let guideSpeech = null;
  const DEFAULT_STEPS = [
    'Look at the picture or cards on the screen.',
    'Read the clue or rule.',
    'Tap the best answer.',
    'Check the result.',
    'Press Next to play the next round.'
  ];
  const DEFAULT_GAME_TEXT = 'This is a calm learning game. It helps children look carefully, think slowly, and choose the best answer in a simple visual way.';

  function ensureGuideStyles() {
    if (document.getElementById('focus-calm-guide-styles')) return;
    const style = document.createElement('style');
    style.id = 'focus-calm-guide-styles';
    style.textContent = [
      '.fc-help-btn{position:fixed;right:18px;top:50%;transform:translateY(-50%);z-index:1200;border:none;border-radius:999px;min-height:50px;padding:12px 16px;display:inline-flex;align-items:center;gap:10px;font:900 .92rem "Nunito",sans-serif;background:linear-gradient(135deg,#39c3ad 0%,#48ceb3 100%);color:#fff;box-shadow:0 16px 28px rgba(57,195,173,.24);cursor:pointer;transition:transform .16s ease,box-shadow .16s ease}',
      '.fc-help-btn:hover{transform:translateY(calc(-50% - 2px));box-shadow:0 18px 30px rgba(57,195,173,.28)}',
      '.fc-guide-overlay{position:fixed;inset:0;z-index:1190;background:rgba(37,64,90,.18);display:flex;align-items:center;justify-content:flex-end;padding:18px}',
      '.fc-guide-card{width:min(360px,calc(100vw - 24px));border-radius:28px;border:1px solid rgba(227,235,242,.96);background:linear-gradient(180deg,#fffefa 0%,#f9fcff 100%);box-shadow:0 20px 40px rgba(37,64,90,.18);overflow:hidden;animation:fcGuideIn .2s ease}',
      '.fc-guide-top{display:grid;grid-template-columns:84px minmax(0,1fr);gap:14px;padding:18px 18px 12px;background:linear-gradient(135deg,#eefbf6 0%,#f6fbff 58%,#fff8ec 100%)}',
      '.fc-guide-mascot{width:84px;height:84px;border-radius:24px;display:grid;place-items:center;font-size:3rem;background:linear-gradient(135deg,#fff4de 0%,#efeaff 100%);border:1px solid #e1ebea}',
      '.fc-guide-copy h2{font:400 1.08rem "Fredoka One",cursive;color:#2e5670;margin:4px 0 8px}',
      '.fc-guide-copy p{font:800 .92rem "Nunito",sans-serif;color:#64758a;line-height:1.6}',
      '.fc-guide-body{padding:14px 18px 18px;display:grid;gap:12px}',
      '.fc-guide-announce{display:inline-flex;align-items:center;gap:8px;justify-self:start;padding:8px 12px;border-radius:999px;background:#eef8ff;border:1px solid #dce8f4;color:#4b6981;font:900 .82rem "Nunito",sans-serif}',
      '.fc-guide-goal{border-radius:18px;background:#fff;border:1px solid #e3ebf2;padding:12px 14px;color:#47637d;font:800 .9rem "Nunito",sans-serif;line-height:1.6}',
      '.fc-guide-section{display:grid;gap:8px}',
      '.fc-guide-section-title{font:400 1rem "Fredoka One",cursive;color:#2f5671}',
      '.fc-guide-plain-list{display:grid;gap:8px;padding-left:18px;color:#47637d;font:800 .9rem "Nunito",sans-serif;line-height:1.6}',
      '.fc-guide-list{display:grid;gap:10px}',
      '.fc-guide-step{display:grid;grid-template-columns:34px minmax(0,1fr);gap:10px;align-items:start;border-radius:18px;background:#fff;border:1px solid #e3ebf2;padding:10px 12px}',
      '.fc-guide-num{width:34px;height:34px;border-radius:12px;display:grid;place-items:center;background:#eef8ff;color:#4b6981;font:900 .92rem "Nunito",sans-serif}',
      '.fc-guide-step strong{display:block;color:#2f5671;font:900 .9rem "Nunito",sans-serif;margin-top:3px}',
      '.fc-guide-tip{border-radius:18px;background:linear-gradient(135deg,#fff7e5 0%,#fffaf2 100%);border:1px solid #f1dfc2;padding:12px 14px;color:#8b6618;font:800 .88rem "Nunito",sans-serif;line-height:1.6}',
      '.fc-guide-actions{display:flex;gap:10px;flex-wrap:wrap}',
      '.fc-guide-primary,.fc-guide-secondary{border:none;border-radius:16px;min-height:46px;padding:11px 16px;cursor:pointer;font:900 .9rem "Nunito",sans-serif}',
      '.fc-guide-primary{background:linear-gradient(135deg,#39c3ad 0%,#48ceb3 100%);color:#fff;box-shadow:0 10px 18px rgba(57,195,173,.18)}',
      '.fc-guide-secondary{background:#eef4fb;color:#4c647b}',
      '@keyframes fcGuideIn{from{opacity:0;transform:translateX(10px)}to{opacity:1;transform:translateX(0)}}',
      '@media (max-width:640px){.fc-guide-overlay{padding:10px;align-items:flex-end}.fc-guide-card{width:100%}.fc-help-btn{right:12px;top:auto;bottom:12px;transform:none}.fc-help-btn:hover{transform:translateY(-2px)}}'
    ].join('');
    document.head.appendChild(style);
  }

  function stopGuideSpeech() {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    guideSpeech = null;
  }

  function speakGuide(text) {
    if (!('speechSynthesis' in window) || !text || !text.trim()) return;
    stopGuideSpeech();
    guideSpeech = new SpeechSynthesisUtterance(text.replace(/\s+/g, ' ').trim());
    guideSpeech.lang = 'en-AU';
    guideSpeech.rate = 0.96;
    guideSpeech.pitch = 1.04;
    guideSpeech.onend = function () {
      guideSpeech = null;
    };
    guideSpeech.onerror = function () {
      guideSpeech = null;
    };
    window.speechSynthesis.speak(guideSpeech);
  }

  function buildStep(index, step) {
    return [
      '<div class="fc-guide-step">',
      '<div class="fc-guide-num">', String(index + 1), '</div>',
      '<div><strong>', step.title, '</strong><p>', step.text, '</p></div>',
      '</div>'
    ].join('');
  }

  function setupFocusCalmGuide(config) {
    ensureGuideStyles();
    const gameText = config.gameText || DEFAULT_GAME_TEXT;
    const steps = Array.isArray(config.steps) && config.steps.length ? config.steps : DEFAULT_STEPS;

    const overlay = document.createElement('div');
    overlay.className = 'fc-guide-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    const card = document.createElement('div');
    card.className = 'fc-guide-card';
    card.innerHTML = [
      '<div class="fc-guide-top">',
      '<div class="fc-guide-mascot">', config.mascot || '🦊', '</div>',
      '<div class="fc-guide-copy">',
      '<h2>', config.heading || 'Let me help', '</h2>',
      '<p>', config.intro || '', '</p>',
      '</div>',
      '</div>',
      '<div class="fc-guide-body">',
      '<div class="fc-guide-announce">📣 Help</div>',
      '<div class="fc-guide-section">',
      '<div class="fc-guide-section-title">What is this game?</div>',
      '<div class="fc-guide-goal">', gameText, '</div>',
      '</div>',
      '<div class="fc-guide-section">',
      '<div class="fc-guide-section-title">How to play</div>',
      '<div class="fc-guide-list">', steps.map(function (step, index) { return buildStep(index, { title: 'Step ' + String(index + 1), text: step }); }).join(''), '</div>',
      '</div>',
      '<div class="fc-guide-actions">',
      '<button class="fc-guide-secondary fc-guide-explain" type="button">Explain</button>',
      '<button class="fc-guide-primary" type="button">Let\'s Play</button>',
      '<button class="fc-guide-secondary fc-guide-hide" type="button">Hide</button>',
      '</div>',
      '</div>'
    ].join('');
    overlay.appendChild(card);

    const helpButton = document.createElement('button');
    helpButton.type = 'button';
    helpButton.className = 'fc-help-btn';
    helpButton.innerHTML = '<span>' + (config.helpMascot || config.mascot || '🦊') + '</span><span>Help</span>';

    const announceText = [
      'What is this game?',
      gameText,
      'How to play.',
      steps.join(' ')
    ].join(' ');

    function showGuide() {
      overlay.style.display = 'flex';
      helpButton.style.display = 'none';
    }

    function hideGuide() {
      overlay.style.display = 'none';
      helpButton.style.display = 'inline-flex';
      stopGuideSpeech();
    }

    card.querySelector('.fc-guide-explain').addEventListener('click', function () {
      speakGuide(announceText);
    });
    card.querySelector('.fc-guide-primary').addEventListener('click', hideGuide);
    card.querySelector('.fc-guide-hide').addEventListener('click', hideGuide);
    helpButton.addEventListener('click', showGuide);
    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) hideGuide();
    });

    document.body.appendChild(overlay);
    document.body.appendChild(helpButton);
    showGuide();
  }

  window.setupFocusCalmGuide = setupFocusCalmGuide;
})();
