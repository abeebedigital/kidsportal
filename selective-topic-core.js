(function () {
  if (!window.SELECTIVE_TOPIC_TOPICS) {
    window.SELECTIVE_TOPIC_TOPICS = {};
  }
  if (window.SELECTIVE_TOPIC_DOMAINS) {
    return;
  }
  const domains = {
    maths: {
      label: 'Mathematical Reasoning',
      emoji: '➗',
      exam: '40 mins · 35 questions',
      stage: 'Upper-primary focus',
      gradient: 'linear-gradient(135deg,#92400e 0%,#f59e0b 100%)',
      accent: '#b45309',
      soft: '#fff7ed'
    },
    thinking: {
      label: 'Thinking Skills',
      emoji: '🧠',
      exam: '40 mins · 40 questions',
      stage: 'Reasoning-first section',
      gradient: 'linear-gradient(135deg,#155e75 0%,#0ea5e9 100%)',
      accent: '#0f766e',
      soft: '#ecfeff'
    },
    reading: {
      label: 'Reading',
      emoji: '📘',
      exam: '40 mins · 30 questions',
      stage: 'Inference and subtext focus',
      gradient: 'linear-gradient(135deg,#7c3aed 0%,#a855f7 100%)',
      accent: '#7c3aed',
      soft: '#faf5ff'
    },
    writing: {
      label: 'Writing',
      emoji: '✍️',
      exam: '30 mins · 1 prompt',
      stage: 'Timed composition',
      gradient: 'linear-gradient(135deg,#be123c 0%,#fb7185 100%)',
      accent: '#be123c',
      soft: '#fff1f2'
    }
  };

  window.SELECTIVE_TOPIC_DOMAINS = domains;
})();
