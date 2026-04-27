(function () {
  window.renderSelectiveTopicPage = function (key) {
    const topics = window.SELECTIVE_TOPIC_TOPICS || {};
    const domains = window.SELECTIVE_TOPIC_DOMAINS || {};
    const topic = topics[key];
    if (!topic) return;

    const domain = domains[topic.domain];
    const lessonVisualMarkup = window.SELECTIVE_TOPIC_LESSON_VISUAL;
  const style = document.createElement('style');
  style.textContent = `
    :root{--accent:${domain.accent};--soft:${domain.soft};--ink:#22303a;--muted:#5a6a75;--card:#ffffff}
    *{box-sizing:border-box;margin:0;padding:0}
    html{font-size:18px}
    @media (max-width:500px){html{font-size:17px}}
    body{font-family:'Nunito',sans-serif;color:var(--ink);background:radial-gradient(circle at top left,rgba(255,255,255,.82),transparent 26%),linear-gradient(180deg,#fbfffe 0%,#f8fbff 100%);min-height:100vh}
    header{background:${domain.gradient};color:#fff;padding:44px 20px 64px;text-align:center}
    .hero-emoji{font-size:72px;display:block;margin-bottom:12px}
    .hero-title{font-family:'Fredoka One',cursive;font-size:clamp(2rem,5vw,3.3rem);line-height:1.1;color:#fffef7;text-shadow:0 6px 20px rgba(0,0,0,.16)}
    .hero-copy{max-width:820px;margin:14px auto 0;line-height:1.75;color:rgba(255,255,255,.94);font-size:1.02rem}
    .hero-actions{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:24px}
    .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:999px;min-height:46px;padding:13px 22px;text-decoration:none;font-weight:800;transition:transform .18s ease,box-shadow .18s ease}
    .btn-primary{background:#fff9dd;color:var(--accent);box-shadow:0 14px 26px rgba(0,0,0,.12)}
    .btn-secondary{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.3);color:#fff}
    .btn:hover{transform:translateY(-2px)}
    main{max-width:1100px;margin:0 auto;padding:34px 20px 70px}
    .panel{background:rgba(255,255,255,.94);border:1px solid rgba(0,0,0,.05);border-radius:28px;padding:26px;box-shadow:0 14px 32px rgba(0,0,0,.06);margin-bottom:24px}
    .section-title{font-family:'Fredoka One',cursive;font-size:1.7rem;margin-bottom:10px}
    .section-copy{color:var(--muted);line-height:1.75;margin-bottom:16px}
    .pill-row{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px}
    .pill{border-radius:999px;padding:8px 12px;background:var(--soft);border:1px solid rgba(0,0,0,.04);font-size:.8rem;font-weight:800;color:#48606d;text-transform:uppercase;letter-spacing:.4px}
    .stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
    .stat{background:${domain.gradient};color:#fff;border-radius:20px;padding:16px;text-align:center}
    .stat strong{display:block;font-family:'Fredoka One',cursive;font-size:1.2rem;margin-bottom:4px}
    .grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
    .card{background:var(--card);border:1px solid rgba(0,0,0,.05);border-radius:22px;padding:18px;box-shadow:0 10px 22px rgba(0,0,0,.05)}
    .card h3{font-family:'Fredoka One',cursive;font-size:1rem;margin-bottom:8px}
    .card p{color:var(--muted);line-height:1.65;font-size:.94rem}
    .focus-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
    .focus-card{background:linear-gradient(180deg,#fff 0%,#fbfcff 100%);border:1px solid rgba(0,0,0,.05);border-radius:22px;padding:18px;box-shadow:0 10px 22px rgba(0,0,0,.05)}
    .focus-card h3{font-family:'Fredoka One',cursive;font-size:1rem;margin-bottom:8px}
    .focus-card p{color:var(--muted);line-height:1.65;font-size:.94rem}
    .focus-tag{display:inline-flex;padding:7px 11px;border-radius:999px;background:${domain.soft};color:var(--accent);font-size:.76rem;font-weight:800;text-transform:uppercase;letter-spacing:.45px;margin-bottom:10px}
    .focus-visual{margin-bottom:10px}
    .focus-visual .visual-card{padding:12px;box-shadow:none}
    .theory-card{display:flex;flex-direction:column;gap:10px}
    .theory-visual{margin:-4px -4px 4px}
    .theory-visual .visual-card{padding:12px;box-shadow:none}
    .lesson-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
    .lesson-chip,.lesson-card,.quiz-card{background:#fff;border:1px solid rgba(0,0,0,.05);border-radius:22px;box-shadow:0 10px 22px rgba(0,0,0,.05)}
    .lesson-chip{padding:14px 16px;display:flex;gap:12px;align-items:flex-start}
    .lesson-chip strong{width:30px;height:30px;border-radius:50%;background:${domain.gradient};color:#fff;display:inline-flex;align-items:center;justify-content:center;font-family:'Fredoka One',cursive;flex-shrink:0}
    .lesson-chip span{color:var(--muted);line-height:1.6;font-size:.94rem}
    .lesson-card{padding:18px}
    .lesson-label{display:inline-flex;padding:7px 11px;border-radius:999px;background:var(--soft);color:var(--accent);font-weight:800;font-size:.76rem;text-transform:uppercase;letter-spacing:.45px;margin-bottom:10px}
    .lesson-prompt{font-family:'Fredoka One',cursive;font-size:1.02rem;line-height:1.35;color:var(--ink);margin-bottom:10px}
    .lesson-answer,.lesson-note{font-size:.94rem;line-height:1.65;color:var(--muted);margin-top:10px}
    .lesson-answer strong{color:var(--ink)}
    .lesson-steps{margin-top:10px;padding-left:18px;display:grid;gap:8px;color:var(--muted);line-height:1.6}
    .example-visual{margin-bottom:12px}
    .example-visual .visual-card{padding:12px;box-shadow:none}
    .example-visual .visual-caption{font-size:.88rem}
    .reveal-box{margin-top:12px;padding:12px 14px;border-radius:16px;background:#f8fbff;border:1px dashed #d7e2ec}
    .reveal-box summary{cursor:pointer;font-weight:800;color:var(--accent);list-style:none}
    .reveal-box summary::-webkit-details-marker{display:none}
    .reveal-box[open] summary{margin-bottom:10px}
    .visual-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
    .visual-card{background:#fff;border:1px solid rgba(0,0,0,.05);border-radius:22px;box-shadow:0 10px 22px rgba(0,0,0,.05);padding:16px}
    .visual-label{display:inline-flex;padding:7px 11px;border-radius:999px;background:${domain.soft};color:var(--accent);font-weight:800;font-size:.76rem;text-transform:uppercase;letter-spacing:.45px;margin-bottom:10px}
    .visual-card svg{width:100%;height:auto;display:block}
    .visual-caption{margin-top:10px;color:var(--muted);font-size:.94rem;line-height:1.65}
    mark{background:#fde68a;padding:0 .2em;border-radius:6px;color:#7c2d12}
    .reading-passsage-card{display:grid;grid-template-columns:250px minmax(0,1fr);gap:18px;align-items:start;background:linear-gradient(180deg,#fff 0%,#f8fbff 100%);border:1.5px solid rgba(124,58,237,.12);border-radius:24px;padding:18px;box-shadow:0 10px 24px rgba(0,0,0,.05)}
    .reading-passsage-visual{background:linear-gradient(135deg,#faf5ff,#f8fbff);border:1.5px solid rgba(124,58,237,.12);border-radius:20px;padding:16px;display:grid;gap:12px;align-content:start}
    .reading-mini-note{color:var(--muted);line-height:1.6;font-size:.92rem}
    .reading-passage-body{display:grid;gap:10px}
    .reading-line{display:grid;grid-template-columns:34px minmax(0,1fr);gap:12px;align-items:start;padding:10px 12px;border-radius:16px;background:#fff;border:1px solid #eef2f7}
    .reading-line-num{font-family:'Fredoka One',cursive;color:#7c3aed;font-size:.95rem;text-align:center;background:#f3e8ff;border-radius:999px;padding:6px 0;line-height:1}
    .reading-line p{color:var(--ink);line-height:1.7;font-size:1rem}
    .quiz-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
    .quiz-card{padding:18px;background:linear-gradient(180deg,#fff 0%,#fbfcff 100%)}
    .quiz-number{display:inline-flex;padding:6px 10px;border-radius:999px;background:${domain.soft};color:var(--accent);font-size:.76rem;font-weight:800;text-transform:uppercase;letter-spacing:.45px;margin-bottom:10px}
    .quiz-card h3{font-family:'Fredoka One',cursive;font-size:1rem;margin-bottom:10px}
    .quiz-answer,.quiz-note{color:var(--muted);line-height:1.65;font-size:.94rem}
    .list{display:grid;gap:10px}
    .list-item{background:linear-gradient(180deg,#fffdf8 0%,#ffffff 100%);border:1px solid #ece7d6;border-radius:18px;padding:14px 16px;color:var(--muted);line-height:1.65}
    .list-item strong{color:var(--ink)}
    .related-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
    .related-link{display:block;background:linear-gradient(180deg,#fff 0%,#fbfcff 100%);border:1px solid #e5edf5;border-radius:18px;padding:16px;text-decoration:none;color:var(--ink);box-shadow:0 8px 18px rgba(0,0,0,.04);transition:transform .18s ease,border-color .18s ease}
    .related-link:hover{transform:translateY(-2px);border-color:var(--accent)}
    .related-link span{display:block;font-size:.8rem;font-weight:800;color:var(--accent);text-transform:uppercase;letter-spacing:.4px;margin-bottom:6px}
    .related-link strong{display:block;font-family:'Fredoka One',cursive;font-size:1rem;margin-bottom:6px}
    .related-link em{display:block;font-style:normal;color:var(--muted);line-height:1.55;font-size:.92rem}
    footer{text-align:center;padding:0 20px 40px;color:#60717d}
    @media (max-width:860px){.stats,.grid-3,.focus-grid,.lesson-grid,.visual-grid,.quiz-grid,.related-grid,.reading-passsage-card{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  function relatedMarkup(keys) {
    return keys.map(function (relatedKey) {
      const related = topics[relatedKey];
      return '<a class="related-link" href="' + related.file + '"><span>' + domains[related.domain].label + '</span><strong>' + related.title + '</strong><em>' + related.subtitle + '</em></a>';
    }).join('');
  }

  function storyForTopic(topicKey, topic) {
    const storyMap = {
      'maths-whole-numbers': {
        title: 'The Library Box Count',
        text: 'Mia and Ben are packing books into boxes for the school library. One box has hundreds, tens, and ones written on it, and they must count carefully so no books go in the wrong place.',
        focus: 'This story helps children see place value and multi-step thinking in a simple real-world setting.'
      },
      'maths-fractions-decimals': {
        title: 'The Pizza Sharing Table',
        text: 'At lunch, the class shares pizzas and fruit pieces. Some children talk in halves, some in tenths, and others in decimals, so the students need to match the same amount in different forms.',
        focus: 'This story shows that fractions and decimals can describe the same amount in different ways.'
      },
      'maths-percentages': {
        title: 'The Toy Sale Sign',
        text: 'A shop window has big sale signs with 10%, 25%, and 50% off. Zara wants to check which discount is the best deal before she spends her pocket money.',
        focus: 'This story makes percentage change feel like everyday shopping.'
      },
      'maths-ratios-rates': {
        title: 'The Smoothie Recipe',
        text: 'A family is making smoothies and the recipe uses a ratio of fruit to yoghurt. They need to scale the recipe up without changing the balance of ingredients.',
        focus: 'This story shows how ratios stay balanced when you scale up or down.'
      },
      'maths-patterns-algebra': {
        title: 'The Pattern Tiles',
        text: 'In a craft corner, students build tile patterns that grow by the same rule each time. One child notices the pattern, another explains the rule, and a third writes it using a letter.',
        focus: 'This story connects repeated patterns with early algebra.'
      },
      'maths-measurement': {
        title: 'The Playground Fence',
        text: 'A class measures a new playground fence, checks the outside edge, and compares how much paint is needed for the wall space inside. They also look at a water bottle to think about capacity.',
        focus: 'This story helps children tell perimeter, area, volume, and capacity apart.'
      },
      'maths-geometry': {
        title: 'The Shape Detective',
        text: 'A student looks at folded paper shapes, triangle corners, and a cube net to work out what each shape will look like. The clues are all about sides, angles, and symmetry.',
        focus: 'This story makes shape properties and angle ideas easier to picture.'
      },
      'maths-position-coordinates': {
        title: 'The Treasure Grid',
        text: 'On a map grid, a treasure is hidden at one ordered pair. The explorer must move across first and then up to land in exactly the right square.',
        focus: 'This story explains x and y as a map journey.'
      },
      'maths-data-interpretation': {
        title: 'The Class Survey Board',
        text: 'A teacher posts a survey chart showing favourite sports and reading times. The students need to read the labels, compare the bars, and find answers from the data, not from guessing.',
        focus: 'This story shows how to read graphs and tables carefully.'
      },
      'maths-averages': {
        title: 'The Score Cards',
        text: 'Four friends record their game scores and want to know which average best describes the result. They line the numbers up, share them, and look for the most common score.',
        focus: 'This story introduces mean, median, and mode in a friendly way.'
      },
      'maths-probability': {
        title: 'The Lucky Spinner',
        text: 'At a game booth, a spinner, a die, and a coin are used to decide the next turn. The children need to think about which outcomes are likely, fair, or more common.',
        focus: 'This story turns chance into a simple game idea.'
      },
      'thinking-verbal-reasoning': {
        title: 'The Club Debate',
        text: 'A class wants to choose a new reading corner rule. One student gives a claim, another adds evidence, and the rest decide which statement really supports the idea and which one weakens it.',
        focus: 'This story makes support, weaken, and clue words feel natural.'
      },
      'thinking-evaluating-arguments': {
        title: 'The Sports Team Claim',
        text: 'A coach says the team should train indoors. The students read different statements and decide which one makes the coach’s argument stronger or weaker.',
        focus: 'This story introduces support and weaken language.'
      },
      'thinking-drawing-conclusions': {
        title: 'The Animal Facts Board',
        text: 'A zoo sign lists facts about animals and asks children to decide what must be true. They have to stay inside the facts and avoid guessing too much.',
        focus: 'This story helps children see what must be true from given facts.'
      },
      'thinking-identifying-flaws': {
        title: 'The Park Rule Mistake',
        text: 'A student hears a rule that sounds clever, but a second student notices the missing piece in the reasoning. The class learns how to spot a weak link in an argument.',
        focus: 'This story shows how to find logic gaps.'
      },
      'thinking-problem-solving': {
        title: 'The Puzzle Tray',
        text: 'On a puzzle table, children must arrange numbers and clues to fit a challenge with as few moves as possible. A quick plan works better than guessing.',
        focus: 'This story shows how to choose a smart strategy.'
      },
      'thinking-data-analysis': {
        title: 'The Rule Board',
        text: 'A school timetable and a set of club rules are pinned to the same board. The children need to read the information carefully, follow every rule, and choose the option that fits all the clues.',
        focus: 'This story shows how to use tables, timetables, and rules together.'
      },
      'thinking-spatial-reasoning': {
        title: 'The Shape Card Game',
        text: 'A child lays out shape cards, turns one card around, and then checks a mirror card and a puzzle fit card. The trick is to notice how the shape changes, not just what it looks like at first glance.',
        focus: 'This story shows rotation, reflection, and fitting pieces together.'
      },
      'reading-fiction': {
        title: 'The Underlined Clue Story',
        text: 'A child is reading a short story and underlining words that show how the character feels. The trick is to spot the clue, not just the event, and then explain the answer with proof.',
        focus: 'This story teaches proof-based inference from fiction.'
      },
      'reading-poetry': {
        title: 'The Moonlight Poem',
        text: 'A poem describes moonlight, shadows, and night sounds. The children need to spot the images and the deeper feeling rather than just reading the lines literally.',
        focus: 'This story makes poetry feel like a picture in words.'
      },
      'reading-non-fiction': {
        title: 'The Ocean Report',
        text: 'A magazine report explains how sea animals survive and uses captions, headings, and facts. Students practise reading for purpose and structure, not just story events.',
        focus: 'This story shows how non-fiction gives information in organised sections.'
      },
      'reading-inference': {
        title: 'The Missing Lunchbox Clue',
        text: 'A child leaves the classroom quickly and returns looking worried. The reader must use the clues to infer what might have happened, without inventing extra details.',
        focus: 'This story helps students read between the lines.'
      },
      'reading-vocabulary-context': {
        title: 'The Unusual Word',
        text: 'A story uses a word that could mean several things, but the nearby sentences give the real clue. Students work out the meaning by looking at context instead of a dictionary list.',
        focus: 'This story shows how context clues help with vocabulary.'
      },
      'reading-poetry': {
        title: 'The Storm Watcher',
        text: 'A child stands at a window watching a storm roll in across the hills. She does not describe it in plain words — she thinks in pictures. The thunder is a drum, the rain is a held breath finally released, and the clean air afterwards is a new beginning.',
        focus: 'This story shows how poetry thinks in comparisons rather than plain facts, and why reading the image carefully is more important than reading the words literally.'
      },
      'reading-synthesis': {
        title: 'The Three Short Notices',
        text: 'Three small notices describe the same event in different ways. The reader has to match the right statement to the right text and compare the details carefully.',
        focus: 'This story supports comparing and combining texts.'
      },
      'writing-narrative': {
        title: 'The Broken Robot',
        text: 'A student sees a robot that stops working just as the school fair begins. The challenge is to write a short story with a clear character, setting, and problem.',
        focus: 'This story gives a simple narrative prompt idea.'
      },
      'writing-persuasive': {
        title: 'The Longer Recess Petition',
        text: 'A class wants longer playtime and must convince the principal with strong reasons. The writer needs a clear opinion, sensible reasons, and a confident voice.',
        focus: 'This story frames a persuasive argument in school life.'
      },
      'writing-discursive': {
        title: 'The Phone Rule Discussion',
        text: 'Students talk about whether phones should be allowed at school. A good response explores both sides fairly before reaching a thoughtful ending.',
        focus: 'This story shows balanced discussion writing.'
      },
      'writing-ideas-content': {
        title: 'The Prompt Idea Board',
        text: 'A writer looks at a prompt and brainstorms three possible angles before choosing the best one. The goal is to make the response interesting but still closely tied to the task.',
        focus: 'This story helps children choose a strong idea.'
      },
      'writing-structure-organisation': {
        title: 'The Paragraph Train',
        text: 'A writer needs to get the ideas in the right order so the reader can follow the journey. Beginning, middle, and ending all need a clear job.',
        focus: 'This story makes paragraph order easy to remember.'
      },
      'writing-language-vocabulary': {
        title: 'The Word Choice Workshop',
        text: 'A writer swaps ordinary words for more precise ones so the message feels stronger. The class learns that good vocabulary should fit naturally, not sound forced.',
        focus: 'This story shows how word choice changes writing quality.'
      },
      'writing-grammar-punctuation': {
        title: 'The Proofreading Desk',
        text: 'Before handing in a piece, a student checks sentence endings, tense, commas, and spelling. Small fixes turn a good draft into a polished one.',
        focus: 'This story shows why proofreading matters.'
      }
    };

    const story = storyMap[topicKey] || {
      title: topic.title,
      text: topic.intro,
      focus: topic.subtitle
    };
    return `
      <article class="card">
        <span class="icon">${domain.emoji}</span>
        <h3>${story.title}</h3>
        <p>${story.text}</p>
        <div class="reveal-box" style="margin-top:14px">
          <strong style="display:block;margin-bottom:6px;color:var(--accent)">Why this story helps</strong>
          <div style="color:var(--muted);line-height:1.65">${story.focus}</div>
        </div>
      </article>
    `;
  }

  function topicGuideMarkup(topic) {
    const whatItTests = topic.intro || 'This topic checks a core thinking skill.';
    const howToStart = topic.starter && topic.starter.length ? topic.starter[0] : 'Read the question carefully first.';
    const whatToNotice = topic.skills && topic.skills.length ? topic.skills[0][1] : 'Use the main skill the topic is teaching.';
    const commonTrap = topic.watchouts && topic.watchouts.length ? topic.watchouts[0] : 'Watch for small mistakes and extra guesses.';
    const visualType = theoryVisualForTopic(key, 0);
    return `
      <div class="focus-grid">
        <article class="focus-card">
          <span class="focus-tag">What it tests</span>
          <div class="focus-visual"><div class="theory-visual">${lessonVisualMarkup({ type: visualType })}</div></div>
          <h3>What this topic is checking</h3>
          <p>${whatItTests}</p>
        </article>
        <article class="focus-card">
          <span class="focus-tag">How to start</span>
          <h3>Your first move</h3>
          <p>${howToStart}${topic.starter && topic.starter[1] ? ' ' + topic.starter[1] : ''}</p>
        </article>
        <article class="focus-card">
          <span class="focus-tag">What to watch for</span>
          <h3>What the marker wants</h3>
          <p>${whatToNotice} ${commonTrap}</p>
        </article>
      </div>
    `;
  }

  function buildMathChoiceData(answer, topicKey, prompt) {
    const raw = String(answer == null ? '' : answer).trim();
    if (!raw) return null;
    const lower = raw.toLowerCase();
    const uniqueOptions = function (items) {
      return Array.from(new Set(items.map(function (item) { return String(item).trim(); }).filter(Boolean)));
    };

    const conceptBanks = [
      { match: /\bperimeter\b/, options: ['Perimeter', 'Area', 'Volume', 'Capacity', 'Length'] },
      { match: /\barea\b/, options: ['Area', 'Perimeter', 'Volume', 'Capacity', 'Length'] },
      { match: /\bvolume\b/, options: ['Volume', 'Area', 'Perimeter', 'Length', 'Capacity'] },
      { match: /\bcapacity\b/, options: ['Capacity', 'Volume', 'Area', 'Perimeter', 'Length'] },
      { match: /\blength\b/, options: ['Length', 'Area', 'Volume', 'Probability', 'Capacity'] },
      { match: /\bmean\b/, options: ['Mean', 'Median', 'Mode', 'Range', 'Total'] },
      { match: /\bmedian\b/, options: ['Median', 'Mean', 'Mode', 'Range', 'Average'] },
      { match: /\bmode\b/, options: ['Mode', 'Mean', 'Median', 'Range', 'Count'] },
      { match: /\bfair\b/, options: ['Fair', 'Unfair', 'Lucky', 'Random', 'Certain'] },
      { match: /\blikely\b/, options: ['Likely', 'Unlikely', 'Impossible', 'Certain', 'Maybe'] },
      { match: /\bheads?\s+and\s+tails?\b/, options: ['Heads and tails', 'Heads only', 'Tails only', 'No outcome', 'Both and neither'] },
      { match: /^\s*yes\s*$/i, options: ['Yes', 'No', 'Maybe', 'Sometimes', 'Not sure'] },
      { match: /^\s*no\s*$/i, options: ['No', 'Yes', 'Maybe', 'Sometimes', 'Not sure'] },
      { match: /\badd\s+\d+\s+each\s+time\b/, options: null },
      { match: /\bmultiply by\s+\d+\s+each\s+time\b/, options: null },
      { match: /\brepeat\b/, options: ['Repeat every time', 'Add 2 each time', 'Subtract 2 each time', 'Multiply by 2 each time', 'Skip one each time'] },
      { match: /\bprobability\b/, options: ['Probability', 'Perimeter', 'Area', 'Volume', 'Capacity'] }
    ];

    const conceptBank = conceptBanks.find(function (entry) { return entry.match.test(lower); });
    if (conceptBank && conceptBank.options) {
      const answerIndex = conceptBank.options.findIndex(function (opt) { return opt.toLowerCase() === lower; });
      return {
        options: uniqueOptions(conceptBank.options).slice(0, 5),
        answerIndex: answerIndex >= 0 ? answerIndex : 0
      };
    }

    const ratioMatch = raw.match(/^(\d+)\s*:\s*(\d+)$/);
    if (ratioMatch) {
      const a = Number(ratioMatch[1]);
      const b = Number(ratioMatch[2]);
      const options = uniqueOptions([
        `${a}:${b}`,
        `${a + 1}:${b}`,
        `${a}:${b + 1}`,
        `${a * 2}:${b * 2}`,
        `${Math.max(1, a - 1)}:${Math.max(1, b - 1)}`
      ]);
      return { options, answerIndex: 0 };
    }

    const fractionMatch = raw.match(/^(\d+)\s*\/\s*(\d+)$/);
    if (fractionMatch) {
      const n = Number(fractionMatch[1]);
      const d = Number(fractionMatch[2]);
      const options = uniqueOptions([
        `${n}/${d}`,
        `${n}/${d + 1}`,
        `${Math.min(d - 1, n + 1)}/${d}`,
        `${n + 1}/${d + 1}`,
        `${Math.max(1, n - 1)}/${Math.max(2, d - 1)}`
      ]);
      return { options, answerIndex: 0 };
    }

    const percentMatch = raw.match(/^(\d+(?:\.\d+)?)\s*%$/);
    if (percentMatch) {
      const value = Number(percentMatch[1]);
      const options = uniqueOptions([
        `${value}%`,
        `${Math.max(0, value - 10)}%`,
        `${value + 10}%`,
        `${Math.max(0, value - 20)}%`,
        `${value + 20}%`
      ]);
      return { options, answerIndex: 0 };
    }

    const numberMatch = raw.match(/^([A-Za-z$]*\s*)?(-?\d[\d,]*(?:\.\d+)?)(.*)$/);
    if (numberMatch) {
      const prefix = numberMatch[1] || '';
      const numberText = numberMatch[2];
      const suffix = numberMatch[3] || '';
      const numeric = Number(numberText.replace(/,/g, ''));
      if (!Number.isNaN(numeric)) {
        const decimals = (numberText.split('.')[1] || '').length;
        const thousandStyle = /,/.test(numberText);
        const formatNumber = function (value) {
          let formatted = decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));
          if (thousandStyle && decimals === 0) {
            formatted = Number(formatted).toLocaleString('en-US');
          } else if (thousandStyle && decimals > 0) {
            const parts = formatted.split('.');
            parts[0] = Number(parts[0]).toLocaleString('en-US');
            formatted = parts.join('.');
          }
          return prefix + formatted + suffix;
        };
        const delta = Math.max(1, Math.round(Math.abs(numeric) * 0.1) || 1);
        const options = uniqueOptions([
          raw,
          formatNumber(numeric + delta),
          formatNumber(Math.max(0, numeric - delta)),
          formatNumber(numeric + delta * 2),
          formatNumber(Math.max(0, numeric - delta * 2))
        ]);
        return { options: options.slice(0, 5), answerIndex: 0 };
      }
    }

    const normalized = raw.replace(/\s+/g, ' ');
    const genericBank = {
      'perimeter': ['Perimeter', 'Area', 'Volume', 'Capacity'],
      'area': ['Area', 'Perimeter', 'Volume', 'Length'],
      'volume': ['Volume', 'Area', 'Perimeter', 'Length'],
      'capacity': ['Capacity', 'Volume', 'Area', 'Length'],
      'heads and tails': ['Heads and tails', 'Heads only', 'Tails only', 'No outcomes'],
      'yes': ['Yes', 'No', 'Maybe', 'Sometimes'],
      'no': ['No', 'Yes', 'Maybe', 'Sometimes'],
      'fair': ['Fair', 'Unfair', 'Lucky', 'Random'],
      'likely': ['Likely', 'Unlikely', 'Impossible', 'Certain'],
      'probability': ['Probability', 'Perimeter', 'Area', 'Volume'],
      'mean': ['Mean', 'Median', 'Mode', 'Range'],
      'median': ['Median', 'Mean', 'Mode', 'Range'],
      'mode': ['Mode', 'Mean', 'Median', 'Range']
    };
    const bank = genericBank[normalized.toLowerCase()];
    if (bank) {
      const answerIndex = bank.findIndex(function (opt) { return opt.toLowerCase() === normalized.toLowerCase(); });
      return { options: uniqueOptions(bank).slice(0, 5), answerIndex: answerIndex >= 0 ? answerIndex : 0 };
    }

    // Fallback for maths only: keep the correct answer and give four simple nearby distractors.
    return {
      options: [raw, 'Check the method', 'Try a different strategy', 'Look again at the numbers', 'Read the question again'],
      answerIndex: 0
    };
  }

  function theoryMarkup(topic) {
    const baseTheory = topic.lesson && topic.lesson.theory ? topic.lesson.theory : [
      {
        title: 'What this topic means',
        text: topic.intro
      },
      {
        title: 'Key idea',
        text: topic.skills && topic.skills[0] ? topic.skills[0][1] : 'Look for the main rule before you start solving.'
      },
      {
        title: 'How to begin',
        text: topic.starter && topic.starter[0] ? topic.starter[0] : 'Read the question slowly and find the main clue.'
      }
    ];
    return baseTheory.map(function (item, index) {
      const visualType = item.visual || (index === 0 ? theoryVisualForTopic(key, index) : null);
      const visualHtml = visualType ? '<div class="theory-visual">' + lessonVisualMarkup({ type: visualType }) + '</div>' : '';
      return '<article class="card theory-card">' + visualHtml + '<h3>' + item.title + '</h3><p>' + item.text + '</p></article>';
    }).join('');
  }

  function passageMarkup(topic) {
    const passage = topic.passage || (topic.lesson && topic.lesson.passage);
    if (!passage || !Array.isArray(passage.lines) || !passage.lines.length) return '';
    const lineHtml = passage.lines.map(function (line) {
      return '<div class="reading-line"><span class="reading-line-num">' + line.num + '</span><p>' + line.text + '</p></div>';
    }).join('');
    const tipsHtml = passage.tips && passage.tips.length ? '<div class="reading-guide-grid" style="grid-template-columns:repeat(3,minmax(0,1fr));margin-top:16px">' + passage.tips.map(function (tip, index) {
      return '<article class="reading-guide-card"><div class="reading-guide-badge">Tip ' + (index + 1) + '</div><p>' + tip + '</p></article>';
    }).join('') + '</div>' : '';
    const examNotesHtml = topic.lesson && topic.lesson.examNotes && topic.lesson.examNotes.length ? '<div class="reading-guide-grid" style="grid-template-columns:repeat(3,minmax(0,1fr));margin-top:16px">' + topic.lesson.examNotes.map(function (note, index) {
      return '<article class="reading-guide-card"><div class="reading-guide-badge">Exam note ' + (index + 1) + '</div><p>' + note + '</p></article>';
    }).join('') + '</div>' : '';
    return `
      <section class="panel">
        <h2 class="section-title">${passage.title}</h2>
        <p class="section-copy">${passage.intro}</p>
        <div class="reading-passsage-card">
          <div class="reading-passsage-visual">
            <div class="reading-proof">📖 Read once, then prove</div>
            <div class="reading-mini-note">Underline the clue words and use the line numbers when explaining your answer.</div>
          </div>
          <div class="reading-passage-body">
            ${lineHtml}
          </div>
        </div>
        ${tipsHtml}
        ${examNotesHtml}
      </section>
    `;
  }

  function secondaryPassageMarkup(passage, titleText) {
    if (!passage || !Array.isArray(passage.lines) || !passage.lines.length) return '';
    const lineHtml = passage.lines.map(function (line) {
      return '<div class="reading-line"><span class="reading-line-num">' + line.num + '</span><p>' + line.text + '</p></div>';
    }).join('');
    const tipsHtml = passage.tips && passage.tips.length ? '<div class="reading-guide-grid" style="grid-template-columns:repeat(3,minmax(0,1fr));margin-top:16px">' + passage.tips.map(function (tip, index) {
      return '<article class="reading-guide-card"><div class="reading-guide-badge">Practice tip ' + (index + 1) + '</div><p>' + tip + '</p></article>';
    }).join('') + '</div>' : '';
    return `
      <section class="panel">
        <h2 class="section-title">${titleText || passage.title}</h2>
        <p class="section-copy">${passage.intro || 'Use this new passage for the practice questions below.'}</p>
        <div class="reading-passsage-card">
          <div class="reading-passsage-visual">
            <div class="reading-proof">📝 New passage for practice</div>
            <div class="reading-mini-note">This passage is separate from the worked examples. Answer the questions below using only this text.</div>
          </div>
          <div class="reading-passage-body">
            ${lineHtml}
          </div>
        </div>
        ${tipsHtml}
      </section>
    `;
  }

  function theoryVisualForTopic(topicKey, index) {
    const map = {
      'maths-whole-numbers': ['place-value', 'expanded-form', 'number-line-compare'],
      'maths-fractions-decimals': ['fraction-strip', 'fraction-number-line', 'decimal-grid'],
      'maths-percentages': ['hundred-grid', 'percent-bar', 'discount-arrow'],
      'maths-ratios-rates': ['ratio-strip', 'unitary-bar', 'scale-arrow'],
      'maths-patterns-algebra': ['growing-pattern', 'pattern-rule', 'algebra-balance'],
      'maths-measurement': ['ruler-length', 'perimeter-rectangle', 'capacity-bottle'],
      'maths-geometry': ['shape-symmetry', 'angle-triangle', 'net-fold'],
      'maths-position-coordinates': ['grid-axes', 'coordinate-plane', 'path-grid'],
      'maths-divisibility-remainders': ['divisibility-check', 'remainder-cycle', 'divisibility-check'],
      'maths-time-systems': ['timetable-grid', 'elapsed-time-calc', 'time-zone-compare'],
      'maths-counting-combinatorics': ['list-grid', 'filter-checklist', 'logic-balance'],
      'maths-optimisation-constraints': ['strategy-map', 'rule-board', 'check-fit'],
      'maths-data-interpretation': ['data-labels', 'dot-plot', 'column-graph'],
      'maths-averages': ['mean-sharing', 'median-middle', 'mode-frequency'],
      'maths-probability': ['coin-chance', 'spinner', 'dice-chance'],
      'thinking-verbal-reasoning': ['claim-evidence', 'clue-arrow', 'support-weakens'],
      'thinking-evaluating-arguments': ['logic-balance', 'claim-evidence', 'support-weakens'],
      'thinking-drawing-conclusions': ['fact-chain', 'logic-balance', 'claim-evidence'],
      'thinking-identifying-flaws': ['logic-flaw', 'missing-link', 'logic-balance'],
      'thinking-problem-solving': ['strategy-map', 'work-backwards', 'list-grid'],
      'thinking-data-analysis': ['timetable-grid', 'list-grid', 'check-fit'],
      'thinking-spatial-reasoning': ['rotation-arrow', 'mirror-flip', 'fit-pieces'],
      'reading-fiction': ['text-highlights', 'mood-shift', 'evidence-marker'],
      'reading-poetry': ['text-highlights', 'mood-shift', 'quote-spotter'],
      'reading-non-fiction': ['reading-page', 'evidence-marker', 'quote-spotter'],
      'reading-inference': ['text-highlights', 'because-bubble', 'evidence-marker'],
      'reading-vocabulary-context': ['text-highlights', 'quote-spotter', 'because-bubble'],
      'reading-synthesis': ['text-highlights', 'quote-spotter', 'evidence-marker'],
      'writing-narrative': ['narrative-arc', 'character-setting', 'show-dont-tell'],
      'writing-persuasive': ['persuasive-position', 'reason-evidence', 'argument-ladder'],
      'writing-discursive': ['discursive-balance', 'two-sides-map', 'thoughtful-path'],
      'writing-ideas-content': ['idea-funnel', 'prompt-target', 'detail-zoom'],
      'writing-structure-organisation': ['paragraph-path', 'paragraph-boxes', 'linking-bridge'],
      'writing-language-vocabulary': ['precise-words', 'word-upgrade', 'sentence-variety'],
      'writing-grammar-punctuation': ['sentence-lock', 'tense-timeline', 'punctuation-signals']
    };
    const list = map[topicKey] || ['place-value', 'expanded-form', 'number-line-compare'];
    return list[index % list.length];
  }

  function lessonGuidanceMarkup(items) {
    return items.map(function (item, index) {
      return '<div class="lesson-chip"><strong>' + (index + 1) + '</strong><span>' + item + '</span></div>';
    }).join('');
  }

  function lessonExampleMarkup(example, index) {
    const visualType = topic.lesson.exampleVisuals && topic.lesson.exampleVisuals[index] ? topic.lesson.exampleVisuals[index] : topic.lesson.visuals[index % topic.lesson.visuals.length].type;
    const choiceData = example.options ? { options: example.options, answerIndex: typeof example.answerIndex === 'number' ? example.answerIndex : 0 } : (topic.domain === 'maths' ? buildMathChoiceData(example.answer || example.answerText || example.prompt, key, example.prompt) : null);
    const optionsMarkup = choiceData ? '<div class="list" style="margin-top:12px">' + choiceData.options.map(function (option, optionIndex) {
      return '<div class="list-item"><strong>' + String.fromCharCode(65 + optionIndex) + '.</strong> ' + option + '</div>';
    }).join('') + '</div>' : '';
    const answerText = choiceData ? 'Correct answer: ' + String.fromCharCode(65 + choiceData.answerIndex) + '. ' + choiceData.options[choiceData.answerIndex] : 'Answer: ' + example.answer;
    return '<article class="lesson-card"><div class="lesson-label">' + example.label + '</div><div class="example-visual">' + lessonVisualMarkup({ type: visualType }) + '</div><div class="lesson-prompt">' + example.prompt + '</div>' + optionsMarkup + '<ul class="lesson-steps">' + example.steps.map(function (step) { return '<li>' + step + '</li>'; }).join('') + '</ul><details class="reveal-box"><summary>Reveal answer</summary><div class="lesson-answer"><strong>' + answerText + '</strong></div><div class="lesson-note">' + example.note + '</div></details></article>';
  }

  function lessonQuestionMarkup(question, index) {
    const choiceData = question.options ? { options: question.options, answerIndex: typeof question.answerIndex === 'number' ? question.answerIndex : 0 } : (topic.domain === 'maths' ? buildMathChoiceData(question.a || question.answer, key, question.q) : null);
    const optionsMarkup = choiceData ? '<div class="list" style="margin-top:12px">' + choiceData.options.map(function (option, optionIndex) {
      return '<div class="list-item"><strong>' + String.fromCharCode(65 + optionIndex) + '.</strong> ' + option + '</div>';
    }).join('') + '</div>' : '';
    const answerText = choiceData ? 'Correct answer: ' + String.fromCharCode(65 + choiceData.answerIndex) + '. ' + choiceData.options[choiceData.answerIndex] : 'Sample answer: ' + question.a;
    return '<article class="quiz-card"><div class="quiz-number">Question ' + (index + 1) + '</div><h3>' + question.q + '</h3>' + optionsMarkup + '<details class="reveal-box"><summary>Reveal answer</summary><div class="quiz-answer"><strong>' + answerText + '</strong></div><div class="quiz-note">' + question.note + '</div></details></article>';
  }

  function modelExampleMarkup(modelExample) {
    if (!modelExample) return '';
    const pointsMarkup = modelExample.points && modelExample.points.length ? '<div class="list" style="margin-top:14px">' + modelExample.points.map(function (point) {
      return '<div class="list-item"><strong>' + point.title + ':</strong> ' + point.text + '</div>';
    }).join('') + '</div>' : '';
    const responseMarkup = Array.isArray(modelExample.response)
      ? modelExample.response.map(function (paragraph) {
          return '<p class="section-copy" style="margin-bottom:12px;color:var(--ink)">' + paragraph + '</p>';
        }).join('')
      : '<p class="section-copy" style="color:var(--ink)">' + (modelExample.response || '') + '</p>';
    return `
      <section class="panel">
        <h2 class="section-title">${modelExample.title || 'Model Example'}</h2>
        <p class="section-copy">${modelExample.intro || 'Read this sample carefully and notice how the ideas are organised.'}</p>
        <div class="card">
          ${modelExample.prompt ? '<div class="lesson-label">Prompt</div><div class="lesson-prompt">' + modelExample.prompt + '</div>' : ''}
          ${responseMarkup}
        </div>
        ${pointsMarkup}
      </section>
    `;
  }

  function exampleParagraphMarkup(exampleParagraph) {
    if (!exampleParagraph) return '';
    const notesMarkup = exampleParagraph.notes && exampleParagraph.notes.length
      ? '<div class="list" style="margin-top:14px">' + exampleParagraph.notes.map(function (note) {
          return '<div class="list-item"><strong>' + note.title + ':</strong> ' + note.text + '</div>';
        }).join('') + '</div>'
      : '';
    return `
      <section class="panel">
        <h2 class="section-title">${exampleParagraph.title || 'Example Paragraph'}</h2>
        <p class="section-copy">${exampleParagraph.intro || 'Read this paragraph and notice how one main idea is developed clearly.'}</p>
        <div class="card">
          ${exampleParagraph.prompt ? '<div class="lesson-label">Prompt focus</div><div class="lesson-prompt">' + exampleParagraph.prompt + '</div>' : ''}
          <p class="section-copy" style="margin-top:12px;color:var(--ink)">${exampleParagraph.text || ''}</p>
        </div>
        ${notesMarkup}
      </section>
    `;
  }
  document.title = topic.title + ' | Selective Exam Prep';

  document.body.innerHTML = `
    <header>
      <span class="hero-emoji">${domain.emoji}</span>
      <h1 class="hero-title">${topic.title}</h1>
      <p class="hero-copy">${topic.intro}</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="selective-school-exam.html">🎓 Back to Selective Hub</a></div>
    </header>

    <main>
      <section class="panel">
        <h2 class="section-title">Topic Snapshot</h2>
        <p class="section-copy">${topic.subtitle}</p>
        <div class="pill-row">
          <span class="pill">${domain.label}</span>
          <span class="pill">${domain.exam}</span>
          <span class="pill">${domain.stage}</span>
        </div>
        <div class="stats">
          <div class="stat"><strong>${domain.exam.split(' · ')[0]}</strong><span>Exam Window</span></div>
          <div class="stat"><strong>${domain.exam.split(' · ')[1]}</strong><span>Section Size</span></div>
          <div class="stat"><strong>Focused</strong><span>One Skill Page</span></div>
        </div>
      </section>

      ${topic.passage || (topic.lesson && topic.lesson.passage) ? passageMarkup(topic) : ''}

      <section class="panel">
        <h2 class="section-title">Topic Guide</h2>
        <p class="section-copy">This part explains what the topic is really testing and how to begin, in simple student-friendly language.</p>
        ${topicGuideMarkup(topic)}
      </section>

      <section class="panel">
        <h2 class="section-title">Mini Story</h2>
        <p class="section-copy">Each topic starts with a simple scene so the skill feels real before the theory and examples begin.</p>
        ${storyForTopic(key, topic)}
      </section>

      <section class="panel">
        <h2 class="section-title">Basic Theory</h2>
        <p class="section-copy">Start here first. We explain the idea in simple words so the examples make sense afterwards.</p>
        <div class="grid-3">
          ${theoryMarkup(topic)}
        </div>
      </section>

      ${topic.lesson ? `
      <section class="panel">
        <h2 class="section-title">Lesson Guidance</h2>
        <p class="section-copy">Read these first before trying the examples. The idea is to build confidence from simple to complex.</p>
        <div class="lesson-grid">
          ${lessonGuidanceMarkup(topic.lesson.guidance)}
        </div>
      </section>

      <section class="panel">
        <h2 class="section-title">Visual Models</h2>
        <p class="section-copy">These diagrams help students see the idea before they solve the questions. They work for younger and older learners alike.</p>
        <div class="visual-grid">
          ${topic.lesson.visuals.map(lessonVisualMarkup).join('')}
        </div>
      </section>

      ${topic.lesson.modelExample ? modelExampleMarkup(topic.lesson.modelExample) : ''}

      ${topic.lesson.exampleParagraph ? exampleParagraphMarkup(topic.lesson.exampleParagraph) : ''}

      <section class="panel">
        <h2 class="section-title">Worked Examples</h2>
        <p class="section-copy">Each example moves from easy to harder so the same idea becomes more familiar step by step.</p>
        <div class="grid-3">
          ${topic.lesson.examples.map(function (example, index) { return lessonExampleMarkup(example, index); }).join('')}
        </div>
      </section>

      ${topic.lesson.practicePassage ? secondaryPassageMarkup(topic.lesson.practicePassage, 'Practice Passage') : ''}

      <section class="panel">
        <h2 class="section-title">Sample Questions</h2>
        <p class="section-copy">Try these after the examples. The sample answer is shown so students can check their thinking right away.</p>
        <div class="quiz-grid">
          ${topic.lesson.questions.map(lessonQuestionMarkup).join('')}
        </div>
      </section>
      ` : ''}

      <section class="panel">
        <h2 class="section-title">What You Will Practise</h2>
        <div class="grid-3">
          ${topic.skills.map(function (skill) {
            return '<article class="card"><h3>' + skill[0] + '</h3><p>' + skill[1] + '</p></article>';
          }).join('')}
        </div>
      </section>

      <section class="panel">
        <h2 class="section-title">Common Question Styles</h2>
        <div class="list">
          ${topic.questionTypes.map(function (item) {
            return '<div class="list-item"><strong>Question Style:</strong> ' + item + '</div>';
          }).join('')}
        </div>
      </section>

      <section class="panel">
        <h2 class="section-title">How to Prepare</h2>
        <div class="grid-3">
          <article class="card"><h3>Starter Moves</h3><p>${topic.starter.join(' ')}</p></article>
          <article class="card"><h3>Common Traps</h3><p>${topic.watchouts.join(' ')}</p></article>
          <article class="card"><h3>Study Goal</h3><p>Build enough control in ${topic.title.toLowerCase()} that exam questions feel structured rather than surprising.</p></article>
        </div>
      </section>

      <section class="panel">
        <h2 class="section-title">Related Topic Pages</h2>
        <p class="section-copy">Use these next when you want to widen the same skill family without jumping straight into a full selective mock.</p>
        <div class="related-grid">
          ${relatedMarkup(topic.related)}
        </div>
      </section>
    </main>

    <footer>Built for the Selective School Exam Hub inside Little Star's Learning World.</footer>
  `;

  if (typeof window.initSiteDrawer === 'function') {
    window.initSiteDrawer();
  }
  if (typeof window.initSlimTopbar === 'function') {
    window.initSlimTopbar();
  }
  };
})();
