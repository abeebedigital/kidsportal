(function () {
  let currentUtterance = null;
  let activeButtons = null;
  const MUTE_KEY = 'voiceAssistMuted';
  const EMOJI_REGEX = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/gu;

  function ensureVoiceStyles() {
    if (document.getElementById('voice-assist-styles')) return;
    const style = document.createElement('style');
    style.id = 'voice-assist-styles';
    style.textContent = [
      '.voice-bar{display:flex;align-items:center;gap:10px;flex-wrap:wrap}',
      '.voice-btn{border:none;min-height:42px;padding:10px 14px;border-radius:999px;font:800 .88rem "Nunito",sans-serif;cursor:pointer;transition:transform .14s ease,box-shadow .14s ease}',
      '.voice-btn:hover{transform:translateY(-1px);box-shadow:0 10px 18px rgba(36,57,95,.10)}',
      '.voice-btn-read{background:linear-gradient(135deg,#4d96ff 0%,#6aa9ff 100%);color:#fff}',
      '.voice-btn-stop{background:linear-gradient(135deg,#eef2f8 0%,#dbe4ef 100%);color:#38506f}',
      '.voice-btn-mute{background:linear-gradient(135deg,#fff1cf 0%,#ffd97b 100%);color:#6d4a00}',
      '.voice-btn.is-muted{background:linear-gradient(135deg,#f2f4f9 0%,#d7dfeb 100%);color:#5c6f8a}',
      '.voice-note{color:#6a7b95;font-size:.82rem;font-weight:800}'
    ].join('');
    document.head.appendChild(style);
  }

  function isMuted() {
    try {
      return window.localStorage.getItem(MUTE_KEY) === 'true';
    } catch (error) {
      return false;
    }
  }

  function setMuted(value) {
    try {
      window.localStorage.setItem(MUTE_KEY, value ? 'true' : 'false');
    } catch (error) {
      return;
    }
  }

  function resetButtons(buttons) {
    if (!buttons) return;
    if (buttons.stop) {
      buttons.stop.style.display = 'none';
    }
    if (buttons.read) {
      buttons.read.textContent = buttons.read.dataset.defaultLabel || 'Read Aloud';
    }
    updateMuteButton(buttons);
  }

  function updateMuteButton(buttons) {
    if (!buttons || !buttons.mute) return;
    const muted = isMuted();
    buttons.mute.textContent = muted ? '🔇 Sound Off' : '🔊 Sound On';
    buttons.mute.classList.toggle('is-muted', muted);
    buttons.mute.setAttribute('aria-pressed', muted ? 'true' : 'false');
  }

  function stopVoice(buttons, shouldCancel) {
    if (shouldCancel !== false && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    currentUtterance = null;
    if (buttons) {
      resetButtons(buttons);
      if (activeButtons === buttons) {
        activeButtons = null;
      }
      return;
    }
    if (activeButtons) {
      resetButtons(activeButtons);
      activeButtons = null;
    }
  }

  function normalizeSpeechText(text) {
    return String(text || '')
      .replace(EMOJI_REGEX, ' ')
      .replace(/(\d)\s*[x×X]\s*(\d)/g, '$1 times $2')
      .replace(/(\d)\s*\+\s*(\d)/g, '$1 plus $2')
      .replace(/(\d)\s*-\s*(\d)/g, '$1 minus $2')
      .replace(/(\d)\s*=\s*(\d)/g, '$1 equals $2')
      .replace(/%/g, ' percent ')
      .replace(/\s*[—–]\s*/g, ', ')
      .replace(/\.\.\./g, '. ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function pickPreferredVoice(lang) {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;
    const target = String(lang || 'en-AU').toLowerCase();

    const scoreVoice = function (voice) {
      const name = String(voice.name || '').toLowerCase();
      const voiceLang = String(voice.lang || '').toLowerCase();
      let score = 0;

      if (voiceLang === target) score += 12;
      else if (voiceLang.indexOf('en-au') === 0) score += 10;
      else if (voiceLang.indexOf('en-gb') === 0) score += 8;
      else if (voiceLang.indexOf('en-us') === 0) score += 7;
      else if (voiceLang.indexOf('en') === 0) score += 5;

      if (voice.localService) score += 4;
      if (/karen|samantha|siri|natasha|aria|tessa|zoe|olivia|google uk english female|google us english/.test(name)) score += 6;
      if (/female|woman|girl/.test(name)) score += 1;
      if (/natural|neural|premium|enhanced/.test(name)) score += 2;

      return score;
    };

    return voices.slice().sort(function (a, b) {
      return scoreVoice(b) - scoreVoice(a);
    })[0] || null;
  }

  function speakText(text, options) {
    if (!('speechSynthesis' in window) || !text || !text.trim()) return;
    if (isMuted()) return;

    const opts = options || {};
    const cleanText = normalizeSpeechText(text);

    if (!cleanText) return;

    if (opts.interrupt !== false) {
      stopVoice(null, true);
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const buttons = opts.buttons || null;
    const lang = opts.lang || 'en-AU';
    const preferredVoice = pickPreferredVoice(lang);

    utterance.rate = typeof opts.rate === 'number' ? opts.rate : 0.95;
    utterance.pitch = typeof opts.pitch === 'number' ? opts.pitch : 1.0;
    utterance.lang = lang;
    if (preferredVoice) {
      utterance.voice = preferredVoice;
      utterance.lang = preferredVoice.lang || lang;
    }
    utterance.onend = function () {
      currentUtterance = null;
      if (buttons) {
        stopVoice(buttons, false);
      }
      if (typeof opts.onend === 'function') {
        opts.onend();
      }
    };
    utterance.onerror = function () {
      currentUtterance = null;
      if (buttons) {
        stopVoice(buttons, false);
      }
      if (typeof opts.onerror === 'function') {
        opts.onerror();
      }
    };

    if (buttons) {
      activeButtons = buttons;
      buttons.read.textContent = 'Reading...';
      buttons.stop.style.display = 'inline-flex';
    }

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  function setupVoiceAssist(config) {
    ensureVoiceStyles();

    if (!('speechSynthesis' in window)) return;

    const readButton = document.getElementById(config.readButtonId);
    const stopButton = document.getElementById(config.stopButtonId);
    const muteButton = config.muteButtonId ? document.getElementById(config.muteButtonId) : null;
    if (!readButton || !stopButton) return;

    const buttons = { read: readButton, stop: stopButton, mute: muteButton };
    readButton.dataset.defaultLabel = readButton.textContent;
    updateMuteButton(buttons);

    readButton.addEventListener('click', function () {
      if (isMuted()) return;
      if (window.speechSynthesis.speaking && activeButtons === buttons) {
        stopVoice(buttons);
        return;
      }

      const text = typeof config.getText === 'function' ? config.getText() : '';
      if (!text || !text.trim()) return;
      speakText(text, {
        buttons: buttons,
        interrupt: true,
        rate: 0.93,
        pitch: 1.0,
        lang: 'en-AU'
      });
    });

    stopButton.addEventListener('click', function () {
      stopVoice(buttons);
    });

    if (muteButton) {
      muteButton.addEventListener('click', function () {
        const nextMuted = !isMuted();
        setMuted(nextMuted);
        if (nextMuted) {
          stopVoice(buttons);
        }
        updateMuteButton(buttons);
      });
    }
  }

  window.voiceAssistSay = function (text, options) {
    speakText(text, options);
  };
  window.voiceAssistIsMuted = isMuted;
  window.setupVoiceAssist = setupVoiceAssist;
  window.stopVoiceAssist = stopVoice;
})();
