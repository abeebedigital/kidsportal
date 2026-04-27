(function () {
  const STATE = {
    queue: [],
    index: 0,
    utterance: null,
    activeElement: null,
    isSpeaking: false
  };

  const EMOJI_REGEX = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/gu;

  function ensureStyles() {
    if (document.getElementById('natural-read-aloud-styles')) return;
    const style = document.createElement('style');
    style.id = 'natural-read-aloud-styles';
    style.textContent = [
      '.tts-reading-highlight{position:relative;box-shadow:0 0 0 3px rgba(77,150,255,.22),0 14px 28px rgba(77,150,255,.16) !important;background:linear-gradient(180deg,rgba(255,249,219,.96) 0%,rgba(240,247,255,.96) 100%) !important;border-radius:18px;transition:box-shadow .18s ease,background .18s ease,transform .18s ease}',
      '.tts-reading-highlight .story-text,.tts-reading-highlight p,.tts-reading-highlight li,.tts-reading-highlight .quiz-q-text,.tts-reading-highlight .result-msg{color:#22304a !important}',
      '.tts-btn.speaking,.tts-btn.tts-speaking{background:linear-gradient(135deg,#ff9f1c,#ff6b6b) !important}',
      '.tts-stop.tts-stop-visible{display:inline-flex !important}'
    ].join('');
    document.head.appendChild(style);
  }

  function getReadButton() {
    return document.getElementById('ttsBtn');
  }

  function getStopButton() {
    return document.getElementById('ttsStop');
  }

  function getGlobalValue(name) {
    try {
      return Function('return typeof ' + name + ' !== "undefined" ? ' + name + ' : undefined;')();
    } catch (error) {
      return undefined;
    }
  }

  function getCurrentPageIndex() {
    const fromWindow = window.currentPage;
    if (typeof fromWindow === 'number') return fromWindow;
    const fromGlobal = getGlobalValue('currentPage');
    if (typeof fromGlobal === 'number') return fromGlobal;
    return 0;
  }

  function getPageCollection() {
    const values = [
      window.pages,
      window.pageEls,
      getGlobalValue('pages'),
      getGlobalValue('pageEls')
    ];
    for (let i = 0; i < values.length; i += 1) {
      if (values[i] && typeof values[i].length === 'number') {
        return values[i];
      }
    }
    return null;
  }

  function getActiveRoot() {
    const collection = getPageCollection();
    const index = getCurrentPageIndex();
    if (collection && collection[index]) {
      return collection[index];
    }
    return document.querySelector('.page.active, .story-page.active, .cover.active, [data-page].active') || document.body;
  }

  function isVisible(element) {
    return !!(element && (element.offsetWidth || element.offsetHeight || element.getClientRects().length));
  }

  function dedupeBlocks(blocks) {
    return blocks.filter(function (element, index) {
      return blocks.indexOf(element) === index && !blocks.some(function (other) {
        return other !== element && other.contains(element);
      });
    });
  }

  function collectBlocks(root) {
    if (!root) return [];

    const marked = Array.from(root.querySelectorAll('[data-tts]')).filter(function (element) {
      return isVisible(element) && !element.closest('.tts-bar');
    });

    if (marked.length) {
      return dedupeBlocks(marked.filter(function (element) {
        return !marked.some(function (other) {
          return other !== element && other.contains(element);
        });
      }));
    }

    const fallbackSelectors = [
      '.story-text',
      '.story-text p',
      '.cover-title',
      '.cover-sub',
      '.cover-tagline',
      '.story-title',
      '.story-sub',
      '.quiz-q-text',
      '.result-msg',
      '.quiz-title',
      '.chapter-badge',
      '.fact',
      'li',
      'p'
    ];

    return dedupeBlocks(Array.from(root.querySelectorAll(fallbackSelectors.join(','))).filter(function (element) {
      return isVisible(element) && (element.innerText || element.textContent || '').trim();
    }));
  }

  function normalizeText(text) {
    return String(text || '')
      .replace(EMOJI_REGEX, ' ')
      .replace(/(\d)\s*[x×X]\s*(\d)/g, '$1 times $2')
      .replace(/(\d)\s*\+\s*(\d)/g, '$1 plus $2')
      .replace(/(\d)\s*-\s*(\d)/g, '$1 minus $2')
      .replace(/(\d)\s*=\s*(\d)/g, '$1 equals $2')
      .replace(/%/g, ' percent ')
      .replace(/\bcm\b/gi, ' centimetres ')
      .replace(/\bmm\b/gi, ' millimetres ')
      .replace(/\bm\b/gi, ' metres ')
      .replace(/\bkm\b/gi, ' kilometres ')
      .replace(/\bkg\b/gi, ' kilograms ')
      .replace(/\bg\b/gi, ' grams ')
      .replace(/\bmin\b/gi, ' minutes ')
      .replace(/\bhr\b/gi, ' hours ')
      .replace(/\s*[—–]\s*/g, ', ')
      .replace(/\.\.\./g, '. ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function getTextForBlock(element) {
    if (!element) return '';
    const attr = element.getAttribute('data-tts');
    const source = attr && attr.trim() ? attr : (element.innerText || element.textContent || '');
    return normalizeText(source);
  }

  function splitIntoChunks(text) {
    const clean = normalizeText(text);
    if (!clean) return [];
    if (clean.length <= 220) return [clean];

    const sentences = clean.match(/[^.!?]+[.!?]?/g) || [clean];
    const chunks = [];
    let current = '';

    sentences.forEach(function (sentence) {
      const next = sentence.trim();
      if (!next) return;
      const combined = current ? current + ' ' + next : next;
      if (combined.length > 220 && current) {
        chunks.push(current.trim());
        current = next;
      } else {
        current = combined;
      }
    });

    if (current.trim()) {
      chunks.push(current.trim());
    }

    return chunks.length ? chunks : [clean];
  }

  function buildQueue() {
    const root = getActiveRoot();
    const blocks = collectBlocks(root);
    const queue = [];

    blocks.forEach(function (element) {
      splitIntoChunks(getTextForBlock(element)).forEach(function (chunk) {
        queue.push({ element: element, text: chunk });
      });
    });

    return queue;
  }

  function pickPreferredVoice() {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;

    const scoreVoice = function (voice) {
      const name = String(voice.name || '').toLowerCase();
      const lang = String(voice.lang || '').toLowerCase();
      let score = 0;

      if (lang.indexOf('en-au') === 0) score += 10;
      else if (lang.indexOf('en-gb') === 0) score += 8;
      else if (lang.indexOf('en-us') === 0) score += 7;
      else if (lang.indexOf('en') === 0) score += 5;

      if (voice.localService) score += 4;
      if (/karen|samantha|siri|natasha|aria|tessa|zoe|olivia|google uk english female|google us english/.test(name)) score += 6;
      if (/female|woman|girl/.test(name)) score += 1;
      if (/compact|enhanced|premium|neural|natural/.test(name)) score += 2;

      return score;
    };

    return voices.slice().sort(function (a, b) {
      return scoreVoice(b) - scoreVoice(a);
    })[0] || null;
  }

  function setHighlight(element) {
    if (STATE.activeElement === element) return;
    clearHighlight();
    STATE.activeElement = element || null;
    if (STATE.activeElement) {
      STATE.activeElement.classList.add('tts-reading-highlight');
      try {
        STATE.activeElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } catch (error) {
        return;
      }
    }
  }

  function clearHighlight() {
    if (!STATE.activeElement) return;
    STATE.activeElement.classList.remove('tts-reading-highlight');
    STATE.activeElement = null;
  }

  function resetUI() {
    const readButton = getReadButton();
    const stopButton = getStopButton();
    if (readButton) {
      readButton.classList.remove('speaking', 'tts-speaking');
      readButton.textContent = '🔊 Read Aloud';
    }
    if (stopButton) {
      stopButton.classList.remove('tts-stop-visible');
      stopButton.style.display = 'none';
    }
  }

  function stopReading(cancelSpeech) {
    if (cancelSpeech !== false && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    STATE.queue = [];
    STATE.index = 0;
    STATE.utterance = null;
    STATE.isSpeaking = false;
    clearHighlight();
    resetUI();
  }

  function speakNext() {
    if (!STATE.queue.length || STATE.index >= STATE.queue.length) {
      stopReading(false);
      return;
    }

    const item = STATE.queue[STATE.index];
    const utterance = new SpeechSynthesisUtterance(item.text);
    const readButton = getReadButton();
    const stopButton = getStopButton();
    const preferredVoice = pickPreferredVoice();

    if (preferredVoice) {
      utterance.voice = preferredVoice;
      utterance.lang = preferredVoice.lang || 'en-AU';
    } else {
      utterance.lang = 'en-AU';
    }

    utterance.rate = 0.92;
    utterance.pitch = 1.02;
    utterance.volume = 1;

    utterance.onstart = function () {
      STATE.isSpeaking = true;
      STATE.utterance = utterance;
      setHighlight(item.element);
      if (readButton) {
        readButton.classList.add('speaking', 'tts-speaking');
        readButton.textContent = '🔊 Reading...';
      }
      if (stopButton) {
        stopButton.style.display = 'inline-flex';
        stopButton.classList.add('tts-stop-visible');
      }
    };

    utterance.onend = function () {
      STATE.index += 1;
      window.setTimeout(speakNext, 80);
    };

    utterance.onerror = function () {
      stopReading(false);
    };

    window.speechSynthesis.speak(utterance);
  }

  function toggleReading() {
    if (!('speechSynthesis' in window)) return;
    if (STATE.isSpeaking || window.speechSynthesis.speaking) {
      stopReading(true);
      return;
    }

    STATE.queue = buildQueue();
    STATE.index = 0;
    if (!STATE.queue.length) return;

    stopReading(true);
    STATE.queue = buildQueue();
    STATE.index = 0;
    if (!STATE.queue.length) return;
    speakNext();
  }

  function initNaturalReadAloud() {
    if (!document.getElementById('ttsBtn') || !document.getElementById('ttsStop')) return;
    ensureStyles();
    window.toggleReadAloud = toggleReading;
    window.stopReadAloud = function () { stopReading(true); };
    window.toggleTTS = toggleReading;
    window.stopTTS = function () { stopReading(true); };
  }

  window.initNaturalReadAloud = initNaturalReadAloud;
  window.stopNaturalReadAloud = function () { stopReading(true); };

  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = function () {
      pickPreferredVoice();
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNaturalReadAloud, { once: true });
  } else {
    initNaturalReadAloud();
  }
})();
