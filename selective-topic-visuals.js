(function () {
  function lessonVisualMarkup(visual) {
    const captions = {
      'place-value': ['Place Value Blocks', 'Each digit has a job in the number.'],
      'number-line-compare': ['Number Line Compare', 'Compare from left to right on the line.'],
      'expanded-form': ['Expanded Form', 'See the number broken into parts.'],
      'grid-axes': ['Grid Axes', 'Across goes first, up goes second.'],
      'multi-step-calc': ['Two-Step Calc', 'Solve one step, then use the result for the next step.'],
      'rounding-estimate': ['Estimate First', 'Round to friendly numbers before the exact answer.'],
      'fraction-strip': ['Fraction Strip', 'Equal parts help you see the size clearly.'],
      'fraction-number-line': ['Fraction Number Line', 'Place fractions between 0 and 1.'],
      'tenths-strip': ['Tenths Strip', 'Ten equal parts make decimals easier to see.'],
      'mixed-values-line': ['Mixed Value Line', 'Put different forms on the same scale.'],
      'decimal-grid': ['Decimal Grid', 'Hundreds grid makes decimals visible.'],
      'hundred-grid': ['Hundred Grid', 'Percent means out of 100.'],
      'percent-bar': ['Percent Bar', 'Helpful benchmark percentages.'],
      'mean-sharing': ['Mean Sharing', 'Add the numbers, then share them evenly.'],
      'median-middle': ['Median Middle', 'Put the numbers in order and find the middle one.'],
      'mode-frequency': ['Mode Frequency', 'The most repeated number is the mode.'],
      'data-labels': ['Data Labels', 'The title and labels tell you what the graph means.'],
      'dot-plot': ['Dot Plot', 'Each dot shows one item or one answer.'],
      'column-graph': ['Column Graph', 'Tall bars help compare values quickly.'],
      'coin-chance': ['Coin Chance', 'A simple chance model with two equal outcomes.'],
      'dice-chance': ['Dice Chance', 'Count equal outcomes on the die.'],
      'bar-chart': ['Bar Chart', 'Compare values using clear bars.'],
      'spinner': ['Spinner', 'Chance depends on the sections on the wheel.'],
      'discount-arrow': ['Discount Path', 'Find the change before the new total.'],
      'increase-arrow': ['Increase Path', 'Start with the original amount and move up.'],
      'ratio-strip': ['Ratio Strip', 'Keep both parts in balance.'],
      'unitary-bar': ['Unitary Bar', 'Find one part first, then scale.'],
      'scale-arrow': ['Scale Up / Down', 'Both sides grow or shrink together.'],
      'growing-pattern': ['Growing Pattern', 'Spot what changes from step to step.'],
      'repeating-pattern': ['Repeating Pattern', 'The same block comes back again and again.'],
      'pattern-rule': ['Pattern Rule', 'Turn the change into a rule.'],
      'algebra-balance': ['Algebra Balance', 'A letter stands for a number.'],
      'logic-balance': ['Logic Balance', 'Reasoning should hold up under the facts.'],
      'claim-evidence': ['Claim and Clues', 'A claim gets stronger when the evidence fits it well.'],
      'clue-arrow': ['Clue Arrow', 'Tiny words like because and so show how ideas connect.'],
      'support-weakens': ['Support or Weaken', 'One option makes the claim stronger, the other makes it weaker.'],
      'fact-chain': ['Fact Chain', 'One fact leads to the next fact.'],
      'logic-flaw': ['Logic Flaw', 'A reasoning mistake can hide in the middle.'],
      'missing-link': ['Missing Link', 'The proof is missing one important step.'],
      'strategy-map': ['Strategy Map', 'Choose the best way to solve first.'],
      'list-grid': ['List Grid', 'Write the clues in a tidy table or list.'],
      'work-backwards': ['Work Backwards', 'Start from the answer and undo the steps.'],
      'check-fit': ['Check Fit', 'See whether the answer matches the clue.'],
      'elapsed-time-calc': ['Elapsed Time Steps', 'Chunk the journey: minutes to the hour, full hours, then remaining minutes.'],
      'time-zone-compare': ['Time Zone Compare', 'Add or subtract the offset to move between cities.'],
      'timetable-grid': ['Timetable Grid', 'Read rows, rules, and times carefully.'],
      'rule-board': ['Rule Board', 'Read the rules before picking an answer.'],
      'filter-checklist': ['Filter Checklist', 'Keep only the clues that matter.'],
      'rotation-arrow': ['Rotation Arrow', 'A shape turns around a point.'],
      'mirror-flip': ['Mirror Flip', 'A shape turns over like a reflection.'],
      'fit-pieces': ['Fit Pieces', 'Pieces join when the edges match.'],
      'reading-page': ['Reading Page', 'Look at clues, layout, and meaning together.'],
      'text-highlights': ['Text Highlights', 'Underline the proof words in the story.'],
      'evidence-marker': ['Evidence Marker', 'Spot the exact line that proves the answer.'],
      'because-bubble': ['Because Bubble', 'Say the answer and then prove it with the text.'],
      'mood-shift': ['Mood Shift', 'Notice how the feeling changes in the story.'],
      'quote-spotter': ['Quote Spotter', 'Choose the line that matches the question best.'],
      'writing-map': ['Writing Map', 'Plan the start, middle, and end of a response.'],
      'narrative-arc': ['Narrative Arc', 'A short story still needs a beginning, problem, and ending.'],
      'character-setting': ['Character + Setting', 'Show who is there and where they are fast.'],
      'show-dont-tell': ['Show, Do Not Just Tell', 'Actions and details help the reader feel the moment.'],
      'persuasive-position': ['Clear Position', 'Choose your side early and stay with it.'],
      'reason-evidence': ['Reason + Example', 'A good point becomes stronger with explanation.'],
      'argument-ladder': ['Argument Ladder', 'Build the piece step by step toward a strong finish.'],
      'discursive-balance': ['Balanced Thinking', 'Look at more than one side fairly.'],
      'two-sides-map': ['Two Sides Map', 'Keep the viewpoints separate and clear.'],
      'thoughtful-path': ['Thoughtful Ending', 'Finish with reflection, not a shout.'],
      'idea-funnel': ['Idea Funnel', 'Choose the strongest idea from a few options.'],
      'prompt-target': ['Prompt Target', 'Stay close to the key words in the task.'],
      'detail-zoom': ['Detail Zoom', 'Grow one idea with useful detail.'],
      'paragraph-path': ['Paragraph Path', 'The writing should move in a clear order.'],
      'paragraph-boxes': ['Paragraph Boxes', 'Give each paragraph one main job.'],
      'linking-bridge': ['Linking Bridge', 'Help the reader move from one idea to the next.'],
      'precise-words': ['Precise Words', 'Choose the word that fits best.'],
      'word-upgrade': ['Word Upgrade', 'A sharper verb can strengthen the whole sentence.'],
      'sentence-variety': ['Sentence Variety', 'Mix sentence shapes so the writing flows.'],
      'imagery-spark': ['Imagery Spark', 'One strong image can lift the writing.'],
      'sentence-lock': ['Sentence Lock', 'A complete sentence holds together clearly.'],
      'tense-timeline': ['Tense Timeline', 'Keep the verb time steady from start to finish.'],
      'punctuation-signals': ['Punctuation Signals', 'Marks help the reader pause, stop, and follow speech.'],
      'square-shape': ['Square Shape', 'Four equal sides and four right angles.'],
      'ruler-length': ['Ruler Read', 'Start at zero and read the end point.'],
      'perimeter-rectangle': ['Perimeter Path', 'Add the outside edges all the way around.'],
      'area-rectangle': ['Area Box', 'Inside space means length times width.'],
      'capacity-bottle': ['Capacity Bottle', 'Litres and millilitres measure how much it holds.'],
      'volume-cube': ['Cube Count', 'Count the cubes inside the box.'],
      'shape-symmetry': ['Symmetry Fold', 'Both halves should match.'],
      'angle-triangle': ['Triangle Angles', 'Angles in a triangle add to 180°.'],
      'net-fold': ['Net Fold', 'A flat shape can fold into a 3D object.'],
      'grid-point': ['Grid Point', 'Across first, up second.'],
      'coordinate-plane': ['Coordinate Plane', 'The first number is x, the second is y.'],
      'path-grid': ['Path Grid', 'Follow each move in order.'],
      'remainder-cycle': ['Remainder Cycle', 'Remainders repeat in a fixed pattern when dividing by the same number.'],
      'divisibility-check': ['Divisibility Rules', 'Four fast checks to test if a number divides evenly without long division.']
    };

    const svgMap = {
      'place-value': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Place value blocks">
          <rect x="26" y="58" width="70" height="82" rx="16" fill="#fff7ed" stroke="#f59e0b" stroke-width="3"/>
          <rect x="108" y="58" width="70" height="82" rx="16" fill="#ffedd5" stroke="#fb923c" stroke-width="3"/>
          <rect x="190" y="58" width="70" height="82" rx="16" fill="#fef3c7" stroke="#fbbf24" stroke-width="3"/>
          <rect x="272" y="58" width="62" height="82" rx="16" fill="#ecfdf5" stroke="#22c55e" stroke-width="3"/>
          <text x="61" y="92" text-anchor="middle" font-family="Fredoka One" font-size="24" fill="#b45309">4</text>
          <text x="61" y="118" text-anchor="middle" font-family="Nunito" font-size="17" fill="#7c2d12">thousands</text>
          <text x="143" y="92" text-anchor="middle" font-family="Fredoka One" font-size="24" fill="#c2410c">6</text>
          <text x="143" y="118" text-anchor="middle" font-family="Nunito" font-size="17" fill="#7c2d12">hundreds</text>
          <text x="225" y="92" text-anchor="middle" font-family="Fredoka One" font-size="24" fill="#b45309">8</text>
          <text x="225" y="118" text-anchor="middle" font-family="Nunito" font-size="17" fill="#7c2d12">tens</text>
          <text x="303" y="92" text-anchor="middle" font-family="Fredoka One" font-size="24" fill="#15803d">2</text>
          <text x="303" y="118" text-anchor="middle" font-family="Nunito" font-size="17" fill="#166534">ones</text>
          <text x="180" y="168" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">4,682 = 4,000 + 600 + 80 + 2</text>
        </svg>
      `,
      'number-line-compare': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Number line compare">
          <line x1="40" y1="96" x2="320" y2="96" stroke="#334155" stroke-width="5" stroke-linecap="round"/>
          <polygon points="320,96 304,88 304,104" fill="#334155"/>
          <circle cx="108" cy="96" r="15" fill="#14b8a6"/>
          <circle cx="250" cy="96" r="15" fill="#f59e0b"/>
          <text x="108" y="60" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#0f766e">5418</text>
          <text x="250" y="60" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#b45309">5481</text>
          <text x="180" y="150" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Compare the biggest place first</text>
        </svg>
      `,
      'grid-axes': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Grid axes">
          <rect x="70" y="28" width="220" height="120" fill="#f8fbff" stroke="#cbd5e1" stroke-width="3"/>
          ${Array.from({length:6}, (_, i) => `<line x1="${70 + i*44}" y1="28" x2="${70 + i*44}" y2="148" stroke="#e2e8f0" stroke-width="2"/>`).join('')}
          ${Array.from({length:4}, (_, i) => `<line x1="70" y1="${28 + i*40}" x2="290" y2="${28 + i*40}" stroke="#e2e8f0" stroke-width="2"/>`).join('')}
          <line x1="180" y1="28" x2="180" y2="148" stroke="#0ea5e9" stroke-width="4"/>
          <line x1="70" y1="88" x2="290" y2="88" stroke="#f59e0b" stroke-width="4"/>
          <text x="180" y="20" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#0f766e">x goes across</text>
          <text x="300" y="96" text-anchor="start" font-family="Fredoka One" font-size="18" fill="#b45309">y goes up</text>
          <text x="180" y="170" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Ordered pairs use across first, up second</text>
        </svg>
      `,
      'multi-step-calc': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Two step calculation">
          <rect x="42" y="44" width="276" height="100" rx="18" fill="#fff7ed" stroke="#f59e0b" stroke-width="4"/>
          <text x="180" y="70" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#b45309">245 + 180 = 425</text>
          <line x1="92" y1="88" x2="268" y2="88" stroke="#fb923c" stroke-width="4" stroke-dasharray="8 6"/>
          <text x="180" y="116" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#0f766e">425 - 96 = 329</text>
          <text x="180" y="160" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">One step feeds the next step</text>
        </svg>
      `,
      'rounding-estimate': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Estimate first">
          <rect x="44" y="54" width="86" height="64" rx="16" fill="#dbeafe" stroke="#0ea5e9" stroke-width="3"/>
          <rect x="137" y="54" width="86" height="64" rx="16" fill="#dbeafe" stroke="#0ea5e9" stroke-width="3"/>
          <rect x="230" y="54" width="86" height="64" rx="16" fill="#dbeafe" stroke="#0ea5e9" stroke-width="3"/>
          <text x="87" y="93" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#0f766e">400</text>
          <text x="180" y="93" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#0f766e">200</text>
          <text x="273" y="93" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#0f766e">50</text>
          <text x="180" y="160" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Estimate 400 + 200 + 50 = 650</text>
        </svg>
      `,
      'expanded-form': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Expanded form">
          <rect x="30" y="50" width="76" height="84" rx="18" fill="#fff7ed" stroke="#fb923c" stroke-width="3"/>
          <rect x="140" y="50" width="76" height="84" rx="18" fill="#ffedd5" stroke="#f97316" stroke-width="3"/>
          <rect x="250" y="50" width="76" height="84" rx="18" fill="#ecfdf5" stroke="#22c55e" stroke-width="3"/>
          <text x="68" y="88" text-anchor="middle" font-family="Fredoka One" font-size="24" fill="#c2410c">7,000</text>
          <text x="178" y="88" text-anchor="middle" font-family="Fredoka One" font-size="24" fill="#c2410c">300</text>
          <text x="288" y="88" text-anchor="middle" font-family="Fredoka One" font-size="24" fill="#15803d">4</text>
          <text x="180" y="160" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">7,304 = 7,000 + 300 + 4</text>
        </svg>
      `,
      'tenths-strip': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Tenths strip">
          <rect x="44" y="66" width="272" height="44" rx="14" fill="#f8fafc" stroke="#64748b" stroke-width="3"/>
          ${Array.from({length:10}, (_, i) => `<line x1="${71 + i*27}" y1="66" x2="${71 + i*27}" y2="110" stroke="#cbd5e1" stroke-width="2"/>`).join('')}
          <rect x="44" y="66" width="27" height="44" fill="#dbeafe" opacity="0.95"/>
          <text x="180" y="46" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#0f766e">3 tenths</text>
          <text x="180" y="150" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Ten equal parts make 0.3 easy to see</text>
        </svg>
      `,
      'mixed-values-line': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Mixed values line">
          <line x1="48" y1="100" x2="312" y2="100" stroke="#334155" stroke-width="5" stroke-linecap="round"/>
          <circle cx="102" cy="100" r="10" fill="#0ea5e9"/>
          <circle cx="172" cy="100" r="10" fill="#f59e0b"/>
          <circle cx="258" cy="100" r="10" fill="#22c55e"/>
          <text x="102" y="74" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#0f766e">0.4</text>
          <text x="172" y="74" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#0f766e">1/2</text>
          <text x="258" y="74" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#0f766e">3/4</text>
          <text x="180" y="154" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Put everything on the same scale first</text>
        </svg>
      `,
      'fraction-strip': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Fraction strip">
          <rect x="36" y="72" width="288" height="26" rx="10" fill="#e2e8f0"/>
          <rect x="36" y="72" width="144" height="26" rx="10" fill="#60a5fa"/>
          <text x="108" y="64" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#0f766e">1/2</text>
          <text x="180" y="64" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#475569">1/4</text>
          <text x="252" y="64" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#475569">1/4</text>
          <text x="180" y="138" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Half the strip is shaded</text>
        </svg>
      `,
      'fraction-number-line': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Fraction number line">
          <line x1="48" y1="106" x2="312" y2="106" stroke="#334155" stroke-width="5" stroke-linecap="round"/>
          <polygon points="312,106 296,98 296,114" fill="#334155"/>
          <line x1="48" y1="106" x2="48" y2="82" stroke="#334155" stroke-width="4"/>
          <line x1="136" y1="106" x2="136" y2="82" stroke="#334155" stroke-width="4"/>
          <line x1="224" y1="106" x2="224" y2="82" stroke="#0ea5e9" stroke-width="4"/>
          <line x1="312" y1="106" x2="312" y2="82" stroke="#334155" stroke-width="4"/>
          <text x="48" y="70" text-anchor="middle" font-family="Nunito" font-size="18" fill="#475569">0</text>
          <text x="136" y="70" text-anchor="middle" font-family="Nunito" font-size="18" fill="#475569">1/4</text>
          <text x="224" y="70" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#0284c7">1/2</text>
          <text x="312" y="70" text-anchor="middle" font-family="Nunito" font-size="18" fill="#475569">1</text>
        </svg>
      `,
      'decimal-grid': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Decimal grid">
          <g transform="translate(48 20)">
            ${Array.from({length:5}, (_, r) => Array.from({length:5}, (_, c) => {
              const filled = r < 2 && c < 3;
              return `<rect x="${c*48}" y="${r*24}" width="40" height="18" rx="5" fill="${filled ? '#60a5fa' : '#e2e8f0'}" stroke="#cbd5e1" stroke-width="1"/>`;
            }).join('')).join('')}
          </g>
          <text x="180" y="166" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">A small shaded part means 0.25 or 1/4</text>
        </svg>
      `,
      'hundred-grid': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Hundred grid">
          <g transform="translate(34 18)">
            ${Array.from({length:10}, (_, r) => Array.from({length:10}, (_, c) => {
              const filled = c < 5;
              return `<rect x="${c*28}" y="${r*15}" width="26" height="13" rx="3" fill="${filled ? '#f59e0b' : '#fde68a'}" stroke="#f59e0b" stroke-width="1"/>`;
            }).join('')).join('')}
          </g>
          <text x="180" y="166" text-anchor="middle" font-family="Nunito" font-size="18" fill="#475569">50 shaded squares = 50%</text>
        </svg>
      `,
      'percent-bar': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Percent bar">
          <rect x="30" y="70" width="300" height="34" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
          <rect x="30" y="70" width="150" height="34" rx="14" fill="#fb923c"/>
          <rect x="30" y="70" width="75" height="34" rx="14" fill="#fde68a"/>
          <text x="105" y="96" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#7c2d12">25%</text>
          <text x="180" y="58" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#b45309">50%</text>
          <text x="255" y="58" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#475569">100%</text>
        </svg>
      `,
      'mean-sharing': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Mean sharing">
          <rect x="50" y="46" width="260" height="92" rx="18" fill="#ecfeff" stroke="#06b6d4" stroke-width="3"/>
          <text x="180" y="72" text-anchor="middle" font-family="Fredoka One" font-size="24" fill="#0f766e">2 + 4 + 6 = 12</text>
          <text x="180" y="102" text-anchor="middle" font-family="Fredoka One" font-size="24" fill="#b45309">12 ÷ 3 = 4</text>
          <text x="180" y="142" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Share the total evenly</text>
        </svg>
      `,
      'median-middle': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Median middle">
          <rect x="52" y="78" width="64" height="34" rx="10" fill="#dbeafe" stroke="#0ea5e9" stroke-width="3"/>
          <rect x="136" y="78" width="64" height="34" rx="10" fill="#fef3c7" stroke="#f59e0b" stroke-width="5"/>
          <rect x="220" y="78" width="64" height="34" rx="10" fill="#d1fae5" stroke="#22c55e" stroke-width="3"/>
          <text x="84" y="100" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#0f766e">3</text>
          <text x="168" y="100" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#b45309">5</text>
          <text x="252" y="100" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#15803d">7</text>
          <text x="180" y="46" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#0f766e">Put in order first</text>
          <text x="180" y="152" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">The middle number is the median</text>
        </svg>
      `,
      'mode-frequency': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Mode frequency">
          <circle cx="92" cy="94" r="22" fill="#dbeafe" stroke="#0ea5e9" stroke-width="3"/>
          <circle cx="150" cy="94" r="22" fill="#dbeafe" stroke="#0ea5e9" stroke-width="3"/>
          <circle cx="208" cy="94" r="22" fill="#fef3c7" stroke="#f59e0b" stroke-width="5"/>
          <circle cx="266" cy="94" r="22" fill="#d1fae5" stroke="#22c55e" stroke-width="3"/>
          <text x="92" y="100" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#0f766e">2</text>
          <text x="150" y="100" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#0f766e">4</text>
          <text x="208" y="100" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#b45309">4</text>
          <text x="266" y="100" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#15803d">6</text>
          <text x="180" y="46" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#0f766e">The most repeated one wins</text>
          <text x="180" y="152" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">The number that appears most is the mode</text>
        </svg>
      `,
      'data-labels': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Data labels">
          <rect x="54" y="34" width="252" height="122" rx="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="3"/>
          <rect x="74" y="54" width="90" height="16" rx="5" fill="#bfdbfe"/>
          <rect x="74" y="82" width="182" height="10" rx="4" fill="#e2e8f0"/>
          <rect x="74" y="102" width="152" height="10" rx="4" fill="#e2e8f0"/>
          <rect x="74" y="122" width="126" height="10" rx="4" fill="#e2e8f0"/>
          <circle cx="256" cy="60" r="18" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/>
          <text x="256" y="66" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#b45309">?</text>
          <text x="180" y="170" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Read the title and labels first</text>
        </svg>
      `,
      'dot-plot': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Dot plot">
          <line x1="64" y1="122" x2="296" y2="122" stroke="#334155" stroke-width="4"/>
          <line x1="96" y1="122" x2="96" y2="114" stroke="#334155" stroke-width="3"/>
          <line x1="144" y1="122" x2="144" y2="114" stroke="#334155" stroke-width="3"/>
          <line x1="192" y1="122" x2="192" y2="114" stroke="#334155" stroke-width="3"/>
          <line x1="240" y1="122" x2="240" y2="114" stroke="#334155" stroke-width="3"/>
          <line x1="288" y1="122" x2="288" y2="114" stroke="#334155" stroke-width="3"/>
          <circle cx="96" cy="100" r="10" fill="#0ea5e9"/>
          <circle cx="144" cy="88" r="10" fill="#0ea5e9"/>
          <circle cx="192" cy="76" r="10" fill="#0ea5e9"/>
          <circle cx="240" cy="100" r="10" fill="#0ea5e9"/>
          <circle cx="288" cy="88" r="10" fill="#0ea5e9"/>
          <text x="180" y="154" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Each dot is one answer or one item</text>
        </svg>
      `,
      'column-graph': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Column graph">
          <line x1="70" y1="146" x2="290" y2="146" stroke="#334155" stroke-width="4"/>
          <line x1="70" y1="146" x2="70" y2="42" stroke="#334155" stroke-width="4"/>
          <rect x="94" y="96" width="34" height="50" rx="8" fill="#60a5fa"/>
          <rect x="146" y="72" width="34" height="74" rx="8" fill="#f59e0b"/>
          <rect x="198" y="58" width="34" height="88" rx="8" fill="#22c55e"/>
          <rect x="250" y="82" width="34" height="64" rx="8" fill="#7c3aed"/>
          <text x="111" y="168" text-anchor="middle" font-family="Nunito" font-size="16" fill="#475569">A</text>
          <text x="163" y="168" text-anchor="middle" font-family="Nunito" font-size="16" fill="#475569">B</text>
          <text x="215" y="168" text-anchor="middle" font-family="Nunito" font-size="16" fill="#475569">C</text>
          <text x="267" y="168" text-anchor="middle" font-family="Nunito" font-size="16" fill="#475569">D</text>
        </svg>
      `,
      'coin-chance': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Coin chance">
          <circle cx="128" cy="92" r="46" fill="#ecfeff" stroke="#06b6d4" stroke-width="4"/>
          <line x1="128" y1="46" x2="128" y2="138" stroke="#06b6d4" stroke-width="3"/>
          <text x="128" y="82" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#0f766e">H</text>
          <text x="128" y="116" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#0f766e">T</text>
          <text x="230" y="80" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#0f766e">Heads</text>
          <text x="230" y="114" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#b45309">Tails</text>
          <text x="180" y="160" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Two equal outcomes means a fair coin</text>
        </svg>
      `,
      'dice-chance': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Dice chance">
          <rect x="116" y="48" width="128" height="92" rx="20" fill="#fff7ed" stroke="#f59e0b" stroke-width="4"/>
          <circle cx="144" cy="76" r="7" fill="#0f766e"/>
          <circle cx="180" cy="76" r="7" fill="#0f766e"/>
          <circle cx="216" cy="76" r="7" fill="#0f766e"/>
          <circle cx="144" cy="112" r="7" fill="#0f766e"/>
          <circle cx="180" cy="112" r="7" fill="#0f766e"/>
          <circle cx="216" cy="112" r="7" fill="#0f766e"/>
          <text x="180" y="168" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">A die has 6 equal sides</text>
        </svg>
      `,
      'bar-chart': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Bar chart">
          <line x1="70" y1="146" x2="290" y2="146" stroke="#334155" stroke-width="4"/>
          <line x1="70" y1="146" x2="70" y2="42" stroke="#334155" stroke-width="4"/>
          <rect x="94" y="102" width="34" height="44" rx="8" fill="#60a5fa"/>
          <rect x="146" y="78" width="34" height="68" rx="8" fill="#f59e0b"/>
          <rect x="198" y="58" width="34" height="88" rx="8" fill="#22c55e"/>
          <rect x="250" y="88" width="34" height="58" rx="8" fill="#7c3aed"/>
          <text x="111" y="168" text-anchor="middle" font-family="Nunito" font-size="16" fill="#475569">A</text>
          <text x="163" y="168" text-anchor="middle" font-family="Nunito" font-size="16" fill="#475569">B</text>
          <text x="215" y="168" text-anchor="middle" font-family="Nunito" font-size="16" fill="#475569">C</text>
          <text x="267" y="168" text-anchor="middle" font-family="Nunito" font-size="16" fill="#475569">D</text>
        </svg>
      `,
      'spinner': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Spinner">
          <circle cx="180" cy="92" r="58" fill="#fff7ed" stroke="#f59e0b" stroke-width="4"/>
          <path d="M180 34 L180 92 L232 62 Z" fill="#f59e0b" opacity=".95"/>
          <path d="M180 92 L232 62 L240 122 Z" fill="#fb923c" opacity=".95"/>
          <path d="M180 92 L240 122 L180 150 Z" fill="#fbbf24" opacity=".95"/>
          <path d="M180 92 L180 150 L120 122 Z" fill="#fde68a" opacity=".95"/>
          <path d="M180 92 L120 122 L128 62 Z" fill="#fdba74" opacity=".95"/>
          <path d="M180 92 L128 62 L180 34 Z" fill="#f59e0b" opacity=".75"/>
          <circle cx="180" cy="92" r="10" fill="#334155"/>
          <text x="180" y="168" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Chance depends on the sections on the wheel</text>
        </svg>
      `,
      'increase-arrow': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Increase arrow">
          <rect x="62" y="78" width="136" height="38" rx="12" fill="#ecfeff" stroke="#06b6d4" stroke-width="3"/>
          <rect x="202" y="62" width="96" height="70" rx="14" fill="#d1fae5" stroke="#22c55e" stroke-width="3"/>
          <path d="M198 97 H208 L208 78 L236 97 L208 116 V97 Z" fill="#f59e0b"/>
          <text x="130" y="102" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#0f766e">50</text>
          <text x="250" y="104" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#15803d">60</text>
          <text x="180" y="154" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Start with the original amount and move up</text>
        </svg>
      `,
      'discount-arrow': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Discount arrow">
          <rect x="32" y="54" width="102" height="74" rx="18" fill="#fff7ed" stroke="#f59e0b" stroke-width="3"/>
          <text x="83" y="96" text-anchor="middle" font-family="Fredoka One" font-size="24" fill="#b45309">$40</text>
          <polygon points="160,91 212,91 212,76 254,104 212,132 212,117 160,117" fill="#0ea5e9"/>
          <rect x="258" y="54" width="70" height="74" rx="18" fill="#ecfdf5" stroke="#22c55e" stroke-width="3"/>
          <text x="293" y="96" text-anchor="middle" font-family="Fredoka One" font-size="24" fill="#15803d">$30</text>
          <text x="180" y="148" text-anchor="middle" font-family="Nunito" font-size="18" fill="#475569">Find the discount, then the new price</text>
        </svg>
      `,
      'ratio-strip': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Ratio strip">
          <rect x="30" y="60" width="120" height="40" rx="14" fill="#0ea5e9"/>
          <rect x="160" y="60" width="180" height="40" rx="14" fill="#f59e0b"/>
          <text x="90" y="88" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#fff">2 parts</text>
          <text x="250" y="88" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#fff">3 parts</text>
          <text x="180" y="150" text-anchor="middle" font-family="Nunito" font-size="18" fill="#475569">The ratio stays balanced</text>
        </svg>
      `,
      'unitary-bar': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Unitary bar">
          <rect x="34" y="72" width="220" height="30" rx="12" fill="#dbeafe" stroke="#0ea5e9" stroke-width="2"/>
          <rect x="34" y="72" width="110" height="30" rx="12" fill="#0ea5e9"/>
          <text x="89" y="94" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#fff">1 part</text>
          <text x="254" y="94" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#0f766e">Then scale</text>
          <polygon points="276,87 320,87 320,72 344,100 320,128 320,113 276,113" fill="#f59e0b"/>
        </svg>
      `,
      'scale-arrow': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Scale arrow">
          <rect x="34" y="54" width="86" height="74" rx="18" fill="#ecfeff" stroke="#14b8a6" stroke-width="3"/>
          <text x="77" y="95" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#0f766e">2</text>
          <polygon points="138,91 214,91 214,76 256,104 214,132 214,117 138,117" fill="#7c3aed"/>
          <rect x="264" y="54" width="62" height="74" rx="18" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/>
          <text x="295" y="95" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#b45309">6</text>
        </svg>
      `,
      'growing-pattern': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Growing pattern">
          <g fill="#0ea5e9">
            <rect x="40" y="118" width="36" height="36" rx="8"/>
            <rect x="92" y="98" width="36" height="56" rx="8"/>
            <rect x="144" y="78" width="36" height="76" rx="8"/>
            <rect x="196" y="58" width="36" height="96" rx="8"/>
          </g>
          <text x="58" y="170" text-anchor="middle" font-family="Nunito" font-size="16" fill="#475569">1</text>
          <text x="110" y="170" text-anchor="middle" font-family="Nunito" font-size="16" fill="#475569">2</text>
          <text x="162" y="170" text-anchor="middle" font-family="Nunito" font-size="16" fill="#475569">3</text>
          <text x="214" y="170" text-anchor="middle" font-family="Nunito" font-size="16" fill="#475569">4</text>
          <text x="286" y="106" text-anchor="middle" font-family="Fredoka One" font-size="26" fill="#b45309">+4 each time</text>
        </svg>
      `,
      'repeating-pattern': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Repeating pattern">
          <circle cx="92" cy="92" r="26" fill="#f59e0b"/>
          <circle cx="150" cy="92" r="26" fill="#3b82f6"/>
          <circle cx="208" cy="92" r="26" fill="#f59e0b"/>
          <circle cx="266" cy="92" r="26" fill="#3b82f6"/>
          <text x="180" y="38" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#0f766e">Repeat, repeat, repeat</text>
          <text x="180" y="160" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">The same block comes back again</text>
        </svg>
      `,
      'pattern-rule': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Pattern rule">
          <rect x="32" y="58" width="54" height="54" rx="14" fill="#fff7ed" stroke="#f59e0b" stroke-width="3"/>
          <rect x="100" y="58" width="54" height="54" rx="14" fill="#ffedd5" stroke="#fb923c" stroke-width="3"/>
          <rect x="168" y="58" width="54" height="54" rx="14" fill="#fef3c7" stroke="#fbbf24" stroke-width="3"/>
          <polygon points="240,85 280,85 280,70 312,104 280,138 280,123 240,123" fill="#0ea5e9"/>
          <text x="59" y="92" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#b45309">2</text>
          <text x="127" y="92" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#c2410c">5</text>
          <text x="195" y="92" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#b45309">8</text>
          <text x="286" y="166" text-anchor="middle" font-family="Nunito" font-size="18" fill="#475569">Rule: add 3 each time</text>
        </svg>
      `,
      'algebra-balance': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Algebra balance">
          <line x1="84" y1="120" x2="276" y2="120" stroke="#334155" stroke-width="6" stroke-linecap="round"/>
          <polygon points="180,50 150,120 210,120" fill="#f59e0b"/>
          <rect x="42" y="78" width="80" height="34" rx="12" fill="#dbeafe" stroke="#0ea5e9" stroke-width="3"/>
          <rect x="238" y="78" width="80" height="34" rx="12" fill="#fce7f3" stroke="#be185d" stroke-width="3"/>
          <text x="82" y="101" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#0f766e">n</text>
          <text x="278" y="101" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#be185d">4</text>
          <text x="180" y="158" text-anchor="middle" font-family="Nunito" font-size="18" fill="#475569">If n = 6, then n + 4 = 10</text>
        </svg>
      `,
      'logic-balance': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Logic balance">
          <line x1="84" y1="120" x2="276" y2="120" stroke="#334155" stroke-width="6" stroke-linecap="round"/>
          <polygon points="180,50 150,120 210,120" fill="#7c3aed"/>
          <rect x="42" y="78" width="80" height="34" rx="12" fill="#ecfeff" stroke="#06b6d4" stroke-width="3"/>
          <rect x="238" y="78" width="80" height="34" rx="12" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/>
          <text x="82" y="101" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#0f766e">Fact</text>
          <text x="278" y="101" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#b45309">Claim</text>
          <text x="180" y="158" text-anchor="middle" font-family="Nunito" font-size="18" fill="#475569">Good reasoning keeps both sides steady</text>
        </svg>
      `,
      'claim-evidence': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Claim and evidence">
          <rect x="104" y="24" width="152" height="36" rx="14" fill="#ecfeff" stroke="#06b6d4" stroke-width="3"/>
          <text x="180" y="48" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#0f766e">Main claim</text>
          <rect x="36" y="106" width="82" height="42" rx="14" fill="#ecfdf5" stroke="#22c55e" stroke-width="3"/>
          <rect x="139" y="106" width="82" height="42" rx="14" fill="#fff7ed" stroke="#f59e0b" stroke-width="3"/>
          <rect x="242" y="106" width="82" height="42" rx="14" fill="#fef2f2" stroke="#fb7185" stroke-width="3"/>
          <text x="77" y="132" text-anchor="middle" font-family="Nunito" font-size="16" fill="#166534">Evidence</text>
          <text x="180" y="132" text-anchor="middle" font-family="Nunito" font-size="16" fill="#92400e">Clue</text>
          <text x="283" y="132" text-anchor="middle" font-family="Nunito" font-size="16" fill="#be123c">Check</text>
          <path d="M180 60 V94" stroke="#0ea5e9" stroke-width="4" stroke-linecap="round"/>
          <path d="M77 96 C94 84, 116 78, 146 72" fill="none" stroke="#22c55e" stroke-width="4" stroke-linecap="round"/>
          <path d="M180 96 C180 84, 180 80, 180 72" fill="none" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
          <path d="M283 96 C266 84, 244 78, 214 72" fill="none" stroke="#fb7185" stroke-width="4" stroke-linecap="round"/>
          <text x="180" y="170" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Good evidence points straight to the claim</text>
        </svg>
      `,
      'clue-arrow': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Clue arrow">
          <rect x="54" y="56" width="252" height="70" rx="18" fill="#fff7ed" stroke="#f59e0b" stroke-width="3"/>
          <text x="180" y="83" text-anchor="middle" font-family="Nunito" font-size="18" fill="#475569">because   so   therefore   but</text>
          <line x1="86" y1="104" x2="272" y2="104" stroke="#0ea5e9" stroke-width="4" stroke-dasharray="8 6"/>
          <polygon points="272,104 258,96 258,112" fill="#0ea5e9"/>
          <text x="180" y="148" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#0f766e">Clue words connect ideas</text>
        </svg>
      `,
      'support-weakens': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Support or weaken">
          <line x1="84" y1="120" x2="276" y2="120" stroke="#334155" stroke-width="6" stroke-linecap="round"/>
          <polygon points="180,50 150,120 210,120" fill="#f59e0b"/>
          <rect x="44" y="78" width="84" height="34" rx="12" fill="#dcfce7" stroke="#22c55e" stroke-width="3"/>
          <rect x="232" y="78" width="84" height="34" rx="12" fill="#fee2e2" stroke="#ef4444" stroke-width="3"/>
          <text x="86" y="101" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#15803d">Support</text>
          <text x="274" y="101" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#b91c1c">Weaken</text>
          <text x="180" y="158" text-anchor="middle" font-family="Nunito" font-size="18" fill="#475569">Support makes it stronger, weaken makes it weaker</text>
        </svg>
      `,
      'fact-chain': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Fact chain">
          <rect x="32" y="66" width="84" height="46" rx="14" fill="#ecfeff" stroke="#06b6d4" stroke-width="3"/>
          <rect x="138" y="66" width="84" height="46" rx="14" fill="#fff7ed" stroke="#f59e0b" stroke-width="3"/>
          <rect x="244" y="66" width="84" height="46" rx="14" fill="#ecfdf5" stroke="#22c55e" stroke-width="3"/>
          <text x="74" y="94" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#0f766e">Fact 1</text>
          <text x="180" y="94" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#b45309">Fact 2</text>
          <text x="286" y="94" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#15803d">Conclusion</text>
          <path d="M118 89 H134" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
          <path d="M224 89 H240" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
          <polygon points="134,89 124,83 124,95" fill="#334155"/>
          <polygon points="240,89 230,83 230,95" fill="#334155"/>
          <text x="180" y="150" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">A conclusion follows from the facts</text>
        </svg>
      `,
      'logic-flaw': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Logic flaw">
          <rect x="40" y="66" width="90" height="44" rx="14" fill="#ecfeff" stroke="#06b6d4" stroke-width="3"/>
          <rect x="225" y="66" width="90" height="44" rx="14" fill="#fef2f2" stroke="#ef4444" stroke-width="3"/>
          <text x="85" y="93" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#0f766e">Reason</text>
          <text x="270" y="93" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#b91c1c">Claim</text>
          <path d="M132 88 H210" stroke="#ef4444" stroke-width="5" stroke-linecap="round" stroke-dasharray="8 6"/>
          <text x="171" y="74" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#dc2626">?</text>
          <text x="180" y="150" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">The reason does not fully prove the claim</text>
        </svg>
      `,
      'missing-link': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Missing link">
          <rect x="34" y="70" width="76" height="44" rx="14" fill="#ecfeff" stroke="#06b6d4" stroke-width="3"/>
          <rect x="144" y="70" width="76" height="44" rx="14" fill="#fff7ed" stroke="#f59e0b" stroke-width="3"/>
          <rect x="254" y="70" width="76" height="44" rx="14" fill="#ecfdf5" stroke="#22c55e" stroke-width="3"/>
          <text x="72" y="97" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#0f766e">Fact</text>
          <text x="182" y="97" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#b45309">Gap</text>
          <text x="292" y="97" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#15803d">Answer</text>
          <line x1="110" y1="92" x2="144" y2="92" stroke="#334155" stroke-width="4"/>
          <line x1="220" y1="92" x2="254" y2="92" stroke="#334155" stroke-width="4" stroke-dasharray="8 6"/>
          <text x="182" y="150" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">The missing step makes the argument weak</text>
        </svg>
      `,
      'strategy-map': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Strategy map">
          <rect x="28" y="64" width="86" height="48" rx="14" fill="#ecfeff" stroke="#06b6d4" stroke-width="3"/>
          <rect x="137" y="64" width="86" height="48" rx="14" fill="#fff7ed" stroke="#f59e0b" stroke-width="3"/>
          <rect x="246" y="64" width="86" height="48" rx="14" fill="#ecfdf5" stroke="#22c55e" stroke-width="3"/>
          <text x="71" y="93" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#0f766e">Plan</text>
          <text x="180" y="93" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#b45309">Solve</text>
          <text x="289" y="93" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#15803d">Check</text>
          <path d="M114 88 H133" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
          <path d="M223 88 H242" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
          <polygon points="133,88 123,82 123,94" fill="#334155"/>
          <polygon points="242,88 232,82 232,94" fill="#334155"/>
          <text x="180" y="150" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Plan first, solve second, check last</text>
        </svg>
      `,
      'list-grid': `
        <svg viewBox="0 0 360 190" role="img" aria-label="List grid">
          <rect x="54" y="34" width="252" height="122" rx="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="3"/>
          <line x1="54" y1="70" x2="306" y2="70" stroke="#e2e8f0" stroke-width="2"/>
          <line x1="54" y1="106" x2="306" y2="106" stroke="#e2e8f0" stroke-width="2"/>
          <line x1="138" y1="34" x2="138" y2="156" stroke="#e2e8f0" stroke-width="2"/>
          <line x1="222" y1="34" x2="222" y2="156" stroke="#e2e8f0" stroke-width="2"/>
          <circle cx="82" cy="52" r="8" fill="#0ea5e9"/>
          <circle cx="82" cy="88" r="8" fill="#f59e0b"/>
          <circle cx="82" cy="124" r="8" fill="#22c55e"/>
          <text x="180" y="52" text-anchor="middle" font-family="Nunito" font-size="16" fill="#475569">Clue 1</text>
          <text x="180" y="88" text-anchor="middle" font-family="Nunito" font-size="16" fill="#475569">Clue 2</text>
          <text x="180" y="124" text-anchor="middle" font-family="Nunito" font-size="16" fill="#475569">Clue 3</text>
          <text x="180" y="170" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">A neat list helps keep track of clues</text>
        </svg>
      `,
      'work-backwards': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Work backwards">
          <rect x="246" y="58" width="74" height="44" rx="14" fill="#ecfdf5" stroke="#22c55e" stroke-width="3"/>
          <rect x="138" y="58" width="74" height="44" rx="14" fill="#fff7ed" stroke="#f59e0b" stroke-width="3"/>
          <rect x="30" y="58" width="74" height="44" rx="14" fill="#ecfeff" stroke="#06b6d4" stroke-width="3"/>
          <text x="283" y="85" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#15803d">Answer</text>
          <text x="175" y="85" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#b45309">Undo</text>
          <text x="67" y="85" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#0f766e">Start</text>
          <path d="M246 80 H212" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
          <path d="M138 80 H104" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
          <polygon points="212,80 222,74 222,86" fill="#334155"/>
          <polygon points="104,80 114,74 114,86" fill="#334155"/>
          <text x="180" y="150" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Start from the answer and reverse the steps</text>
        </svg>
      `,
      'timetable-grid': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Timetable grid">
          <rect x="34" y="34" width="292" height="124" rx="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="3"/>
          <rect x="34" y="34" width="292" height="28" rx="18" fill="#dbeafe" stroke="none"/>
          <text x="78" y="53" text-anchor="middle" font-family="Fredoka One" font-size="15" fill="#0f766e">Mon</text>
          <text x="136" y="53" text-anchor="middle" font-family="Fredoka One" font-size="15" fill="#0f766e">Tue</text>
          <text x="194" y="53" text-anchor="middle" font-family="Fredoka One" font-size="15" fill="#0f766e">Wed</text>
          <text x="252" y="53" text-anchor="middle" font-family="Fredoka One" font-size="15" fill="#0f766e">Thu</text>
          <text x="310" y="53" text-anchor="middle" font-family="Fredoka One" font-size="15" fill="#0f766e">Fri</text>
          ${Array.from({length:4}, (_, r) => `<line x1="34" y1="${62 + r*31}" x2="326" y2="${62 + r*31}" stroke="#e2e8f0" stroke-width="2"/>`).join('')}
          ${Array.from({length:4}, (_, c) => `<line x1="${92 + c*58}" y1="34" x2="${92 + c*58}" y2="158" stroke="#e2e8f0" stroke-width="2"/>`).join('')}
          <rect x="92" y="63" width="58" height="31" fill="#fef3c7"/>
          <rect x="150" y="94" width="58" height="31" fill="#dcfce7"/>
          <rect x="208" y="125" width="58" height="31" fill="#fef2f2"/>
          <text x="180" y="176" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Read the row, column, and rule together</text>
        </svg>
      `,
      'rule-board': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Rule board">
          <rect x="36" y="28" width="288" height="132" rx="20" fill="#fffdf7" stroke="#f59e0b" stroke-width="3"/>
          <rect x="56" y="46" width="248" height="28" rx="10" fill="#fef3c7"/>
          <text x="180" y="65" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#92400e">Rule Board</text>
          <circle cx="72" cy="96" r="8" fill="#22c55e"/>
          <circle cx="72" cy="120" r="8" fill="#22c55e"/>
          <circle cx="72" cy="144" r="8" fill="#ef4444"/>
          <text x="96" y="101" font-family="Nunito" font-size="17" fill="#475569">Only Monday, Wednesday, Friday</text>
          <text x="96" y="125" font-family="Nunito" font-size="17" fill="#475569">Must have a pass</text>
          <text x="96" y="149" font-family="Nunito" font-size="17" fill="#475569">Not rainy days</text>
          <text x="180" y="172" text-anchor="middle" font-family="Nunito" font-size="16" fill="#475569">Read the rule words first</text>
        </svg>
      `,
      'filter-checklist': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Filter checklist">
          <rect x="52" y="34" width="256" height="122" rx="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="3"/>
          <text x="180" y="58" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#0f766e">Filter the clues</text>
          <rect x="78" y="74" width="24" height="24" rx="6" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
          <path d="M84 87 L89 92 L98 80" fill="none" stroke="#15803d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="116" y="91" font-family="Nunito" font-size="16" fill="#475569">Keep this rule</text>
          <rect x="78" y="104" width="24" height="24" rx="6" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
          <path d="M84 110 L96 122 M96 110 L84 122" fill="none" stroke="#b91c1c" stroke-width="3" stroke-linecap="round"/>
          <text x="116" y="121" font-family="Nunito" font-size="16" fill="#475569">Cross this out</text>
          <rect x="78" y="134" width="24" height="24" rx="6" fill="#dbeafe" stroke="#0ea5e9" stroke-width="2"/>
          <circle cx="90" cy="146" r="5" fill="#0ea5e9"/>
          <text x="116" y="151" font-family="Nunito" font-size="16" fill="#475569">Check the remaining choice</text>
        </svg>
      `,
      'rotation-arrow': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Rotation arrow">
          <circle cx="180" cy="96" r="56" fill="#eff6ff" stroke="#0ea5e9" stroke-width="4" stroke-dasharray="10 8"/>
          <polygon points="180,36 170,54 190,54" fill="#0ea5e9"/>
          <path d="M180 54 A42 42 0 0 1 222 96" fill="none" stroke="#f59e0b" stroke-width="6" stroke-linecap="round"/>
          <polygon points="223,96 207,88 209,106" fill="#f59e0b"/>
          <rect x="154" y="82" width="52" height="28" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/>
          <text x="180" y="101" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#1d4ed8">Turn</text>
          <text x="180" y="164" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">A rotation turns a shape around a point</text>
        </svg>
      `,
      'mirror-flip': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Mirror flip">
          <line x1="180" y1="32" x2="180" y2="150" stroke="#7c3aed" stroke-width="4" stroke-dasharray="8 6"/>
          <polygon points="110,72 145,52 148,94" fill="#bfdbfe" stroke="#0ea5e9" stroke-width="3"/>
          <polygon points="250,72 215,52 212,94" fill="#fde68a" stroke="#f59e0b" stroke-width="3"/>
          <text x="128" y="122" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#0f766e">Before</text>
          <text x="232" y="122" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#b45309">After</text>
          <text x="180" y="24" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#7c3aed">Mirror line</text>
          <text x="180" y="164" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">A reflection flips the shape across the line</text>
        </svg>
      `,
      'fit-pieces': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Fit pieces">
          <rect x="70" y="56" width="86" height="62" rx="14" fill="#dbeafe" stroke="#0ea5e9" stroke-width="3"/>
          <rect x="204" y="56" width="86" height="62" rx="14" fill="#dcfce7" stroke="#22c55e" stroke-width="3"/>
          <path d="M156 87 H204" stroke="#334155" stroke-width="5" stroke-linecap="round"/>
          <polygon points="204,87 192,80 192,94" fill="#334155"/>
          <text x="113" y="92" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#0f766e">Piece A</text>
          <text x="247" y="92" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#15803d">Piece B</text>
          <text x="180" y="150" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Pieces fit when the edges line up</text>
        </svg>
      `,
      'check-fit': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Check fit">
          <rect x="60" y="54" width="240" height="82" rx="18" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3"/>
          <circle cx="126" cy="95" r="26" fill="#dbeafe" stroke="#0ea5e9" stroke-width="3"/>
          <circle cx="180" cy="95" r="26" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/>
          <circle cx="234" cy="95" r="26" fill="#dcfce7" stroke="#22c55e" stroke-width="3"/>
          <text x="126" y="100" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#0f766e">Clue</text>
          <text x="180" y="100" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#b45309">Fit?</text>
          <text x="234" y="100" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#15803d">Yes</text>
          <text x="180" y="154" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Check whether the answer matches the clue</text>
        </svg>
      `,
      'reading-page': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Reading page">
          <rect x="68" y="34" width="224" height="122" rx="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="3"/>
          <rect x="88" y="54" width="76" height="14" rx="5" fill="#bfdbfe"/>
          <rect x="88" y="80" width="184" height="9" rx="4" fill="#e2e8f0"/>
          <rect x="88" y="98" width="164" height="9" rx="4" fill="#e2e8f0"/>
          <rect x="88" y="116" width="132" height="9" rx="4" fill="#e2e8f0"/>
          <circle cx="250" cy="62" r="18" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/>
          <text x="250" y="68" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#b45309">?</text>
          <text x="180" y="166" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Read the clues, then think a little deeper</text>
        </svg>
      `,
      'text-highlights': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Text highlights">
          <rect x="56" y="32" width="248" height="126" rx="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="3"/>
          <rect x="84" y="58" width="182" height="12" rx="4" fill="#e2e8f0"/>
          <rect x="84" y="82" width="202" height="12" rx="4" fill="#e2e8f0"/>
          <rect x="84" y="106" width="166" height="12" rx="4" fill="#e2e8f0"/>
          <rect x="84" y="82" width="92" height="12" rx="4" fill="#fde68a"/>
          <rect x="84" y="106" width="112" height="12" rx="4" fill="#bbf7d0"/>
          <text x="180" y="52" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#7c3aed">Underline the clues</text>
          <text x="180" y="164" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Mark the words that prove your answer</text>
        </svg>
      `,
      'evidence-marker': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Evidence marker">
          <rect x="58" y="36" width="244" height="120" rx="18" fill="#fff7ed" stroke="#f59e0b" stroke-width="3"/>
          <rect x="82" y="64" width="196" height="20" rx="6" fill="#e2e8f0"/>
          <rect x="82" y="96" width="154" height="20" rx="6" fill="#e2e8f0"/>
          <path d="M140 96 L168 96" stroke="#ef4444" stroke-width="8" stroke-linecap="round"/>
          <path d="M168 96 L158 88" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
          <path d="M168 96 L158 104" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
          <text x="180" y="52" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#b45309">Find the proof line</text>
          <text x="180" y="154" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Point to the exact words that support the answer</text>
        </svg>
      `,
      'because-bubble': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Because bubble">
          <rect x="64" y="42" width="232" height="96" rx="24" fill="#ecfeff" stroke="#06b6d4" stroke-width="3"/>
          <text x="180" y="76" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#0f766e">My answer is ___</text>
          <text x="180" y="102" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#b45309">because the text says ___</text>
          <text x="180" y="156" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Say the reason out loud before you choose</text>
        </svg>
      `,
      'mood-shift': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Mood shift">
          <rect x="42" y="60" width="84" height="54" rx="14" fill="#dcfce7" stroke="#22c55e" stroke-width="3"/>
          <rect x="138" y="60" width="84" height="54" rx="14" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/>
          <rect x="234" y="60" width="84" height="54" rx="14" fill="#fee2e2" stroke="#ef4444" stroke-width="3"/>
          <text x="84" y="92" text-anchor="middle" font-family="Fredoka One" font-size="17" fill="#15803d">Calm</text>
          <text x="180" y="92" text-anchor="middle" font-family="Fredoka One" font-size="17" fill="#b45309">Uneasy</text>
          <text x="276" y="92" text-anchor="middle" font-family="Fredoka One" font-size="17" fill="#b91c1c">Tense</text>
          <path d="M126 86 H138" stroke="#334155" stroke-width="4"/>
          <path d="M222 86 H234" stroke="#334155" stroke-width="4"/>
          <polygon points="138,86 128,80 128,92" fill="#334155"/>
          <polygon points="234,86 224,80 224,92" fill="#334155"/>
          <text x="180" y="154" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">The mood can change from one line to the next</text>
        </svg>
      `,
      'quote-spotter': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Quote spotter">
          <rect x="52" y="36" width="256" height="120" rx="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="3"/>
          <rect x="78" y="60" width="204" height="18" rx="6" fill="#dbeafe"/>
          <rect x="78" y="88" width="184" height="18" rx="6" fill="#e2e8f0"/>
          <rect x="78" y="116" width="150" height="18" rx="6" fill="#e2e8f0"/>
          <circle cx="98" cy="69" r="8" fill="#0ea5e9"/>
          <circle cx="98" cy="97" r="8" fill="#f59e0b"/>
          <circle cx="98" cy="125" r="8" fill="#22c55e"/>
          <text x="180" y="52" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#7c3aed">Spot the matching line</text>
          <text x="180" y="164" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Choose the quote that proves your answer</text>
        </svg>
      `,
      'writing-map': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Writing map">
          <rect x="56" y="32" width="248" height="124" rx="18" fill="#fff1f2" stroke="#fb7185" stroke-width="3"/>
          <line x1="108" y1="58" x2="108" y2="130" stroke="#cbd5e1" stroke-width="2"/>
          <line x1="180" y1="58" x2="180" y2="130" stroke="#cbd5e1" stroke-width="2"/>
          <line x1="252" y1="58" x2="252" y2="130" stroke="#cbd5e1" stroke-width="2"/>
          <text x="108" y="50" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#be123c">Start</text>
          <text x="180" y="50" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#b45309">Middle</text>
          <text x="252" y="50" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#15803d">End</text>
          <text x="180" y="164" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Plan the story or essay before you write</text>
        </svg>
      `,
      'narrative-arc': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Narrative arc">
          <path d="M38 138 C88 136, 104 122, 138 100 S214 58, 268 82 S314 120, 322 128" fill="none" stroke="#fb7185" stroke-width="8" stroke-linecap="round"/>
          <circle cx="58" cy="136" r="12" fill="#fff1f2" stroke="#be123c" stroke-width="3"/>
          <circle cx="164" cy="90" r="12" fill="#fff7ed" stroke="#f59e0b" stroke-width="3"/>
          <circle cx="286" cy="96" r="12" fill="#ecfdf5" stroke="#22c55e" stroke-width="3"/>
          <text x="58" y="164" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#be123c">Start</text>
          <text x="164" y="58" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#b45309">Problem</text>
          <text x="286" y="164" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#15803d">Ending</text>
          <text x="180" y="22" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#be123c">One clear story shape</text>
        </svg>
      `,
      'character-setting': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Character and setting">
          <rect x="38" y="38" width="130" height="114" rx="18" fill="#fff1f2" stroke="#fb7185" stroke-width="3"/>
          <circle cx="102" cy="74" r="22" fill="#fde68a" stroke="#f59e0b" stroke-width="3"/>
          <rect x="78" y="98" width="48" height="30" rx="12" fill="#bfdbfe" stroke="#0ea5e9" stroke-width="3"/>
          <rect x="196" y="38" width="126" height="114" rx="18" fill="#ecfeff" stroke="#06b6d4" stroke-width="3"/>
          <rect x="214" y="96" width="90" height="38" rx="10" fill="#dbeafe" stroke="#0ea5e9" stroke-width="3"/>
          <path d="M210 96 L259 58 L308 96" fill="#fecaca" stroke="#fb7185" stroke-width="3"/>
          <text x="102" y="144" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#be123c">Character</text>
          <text x="259" y="144" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#0f766e">Setting</text>
          <text x="180" y="22" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Tell the reader who and where very early</text>
        </svg>
      `,
      'show-dont-tell': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Show don't tell">
          <rect x="34" y="44" width="122" height="102" rx="18" fill="#fff7ed" stroke="#f59e0b" stroke-width="3"/>
          <rect x="204" y="44" width="122" height="102" rx="18" fill="#ecfeff" stroke="#06b6d4" stroke-width="3"/>
          <text x="95" y="74" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#b45309">Tell</text>
          <text x="95" y="100" text-anchor="middle" font-family="Nunito" font-size="16" fill="#7c2d12">"He was scared."</text>
          <text x="265" y="74" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#0f766e">Show</text>
          <text x="265" y="98" text-anchor="middle" font-family="Nunito" font-size="15" fill="#155e75">"His hands shook</text>
          <text x="265" y="118" text-anchor="middle" font-family="Nunito" font-size="15" fill="#155e75">at the door."</text>
          <text x="180" y="168" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Specific actions help the reader feel the moment</text>
        </svg>
      `,
      'persuasive-position': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Persuasive position">
          <rect x="38" y="42" width="124" height="96" rx="18" fill="#ecfeff" stroke="#06b6d4" stroke-width="3"/>
          <rect x="198" y="42" width="124" height="96" rx="18" fill="#fff1f2" stroke="#fb7185" stroke-width="3"/>
          <text x="100" y="86" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#0f766e">YES</text>
          <text x="260" y="86" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#be123c">NO</text>
          <text x="180" y="160" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Pick one side before you start writing</text>
        </svg>
      `,
      'reason-evidence': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Reason and evidence">
          <rect x="34" y="54" width="114" height="82" rx="18" fill="#fff7ed" stroke="#f59e0b" stroke-width="3"/>
          <rect x="170" y="54" width="156" height="82" rx="18" fill="#ecfeff" stroke="#06b6d4" stroke-width="3"/>
          <text x="91" y="84" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#b45309">Reason</text>
          <text x="91" y="110" text-anchor="middle" font-family="Nunito" font-size="15" fill="#7c2d12">Uniforms are fair</text>
          <path d="M150 95 H168" stroke="#334155" stroke-width="4"/>
          <polygon points="168,95 158,89 158,101" fill="#334155"/>
          <text x="248" y="84" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#0f766e">Explain</text>
          <text x="248" y="108" text-anchor="middle" font-family="Nunito" font-size="14" fill="#155e75">Less pressure about</text>
          <text x="248" y="126" text-anchor="middle" font-family="Nunito" font-size="14" fill="#155e75">what students wear</text>
          <text x="180" y="164" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">A reason gets stronger when you explain it</text>
        </svg>
      `,
      'argument-ladder': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Argument ladder">
          <rect x="54" y="122" width="62" height="20" rx="8" fill="#fde68a"/>
          <rect x="126" y="96" width="62" height="20" rx="8" fill="#fdba74"/>
          <rect x="198" y="70" width="62" height="20" rx="8" fill="#93c5fd"/>
          <rect x="270" y="44" width="42" height="20" rx="8" fill="#fda4af"/>
          <text x="85" y="116" text-anchor="middle" font-family="Nunito" font-size="13" fill="#7c2d12">Opinion</text>
          <text x="157" y="90" text-anchor="middle" font-family="Nunito" font-size="13" fill="#7c2d12">Reason 1</text>
          <text x="229" y="64" text-anchor="middle" font-family="Nunito" font-size="13" fill="#0f766e">Reason 2</text>
          <text x="291" y="38" text-anchor="middle" font-family="Nunito" font-size="13" fill="#9f1239">End</text>
          <text x="180" y="166" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Build the argument step by step</text>
        </svg>
      `,
      'discursive-balance': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Balanced thinking">
          <line x1="180" y1="42" x2="180" y2="130" stroke="#334155" stroke-width="6"/>
          <line x1="108" y1="72" x2="252" y2="72" stroke="#334155" stroke-width="6"/>
          <line x1="132" y1="72" x2="96" y2="118" stroke="#334155" stroke-width="3"/>
          <line x1="228" y1="72" x2="264" y2="118" stroke="#334155" stroke-width="3"/>
          <rect x="64" y="118" width="64" height="26" rx="10" fill="#dbeafe" stroke="#0ea5e9" stroke-width="3"/>
          <rect x="232" y="118" width="64" height="26" rx="10" fill="#fff1f2" stroke="#fb7185" stroke-width="3"/>
          <text x="96" y="136" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#0f766e">Side A</text>
          <text x="264" y="136" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#be123c">Side B</text>
          <text x="180" y="24" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#7c3aed">Keep both sides in view</text>
        </svg>
      `,
      'two-sides-map': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Two sides map">
          <rect x="32" y="48" width="128" height="102" rx="18" fill="#ecfeff" stroke="#06b6d4" stroke-width="3"/>
          <rect x="200" y="48" width="128" height="102" rx="18" fill="#fff1f2" stroke="#fb7185" stroke-width="3"/>
          <text x="96" y="76" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#0f766e">Good points</text>
          <text x="96" y="102" text-anchor="middle" font-family="Nunito" font-size="14" fill="#155e75">for one side</text>
          <text x="264" y="76" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#be123c">Other points</text>
          <text x="264" y="102" text-anchor="middle" font-family="Nunito" font-size="14" fill="#9f1239">for the other side</text>
          <text x="180" y="170" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Sort ideas before you start writing</text>
        </svg>
      `,
      'thoughtful-path': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Thoughtful path">
          <circle cx="70" cy="118" r="18" fill="#dbeafe" stroke="#0ea5e9" stroke-width="3"/>
          <circle cx="166" cy="92" r="18" fill="#fde68a" stroke="#f59e0b" stroke-width="3"/>
          <circle cx="274" cy="64" r="18" fill="#fecdd3" stroke="#fb7185" stroke-width="3"/>
          <path d="M88 114 C110 108, 132 101, 148 96" fill="none" stroke="#334155" stroke-width="4"/>
          <path d="M184 88 C208 82, 236 74, 256 68" fill="none" stroke="#334155" stroke-width="4"/>
          <text x="70" y="148" text-anchor="middle" font-family="Nunito" font-size="13" fill="#0f766e">Side 1</text>
          <text x="166" y="122" text-anchor="middle" font-family="Nunito" font-size="13" fill="#b45309">Side 2</text>
          <text x="274" y="94" text-anchor="middle" font-family="Nunito" font-size="13" fill="#9f1239">Reflect</text>
          <text x="180" y="24" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#7c3aed">Move toward a thoughtful ending</text>
        </svg>
      `,
      'idea-funnel': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Idea funnel">
          <circle cx="84" cy="58" r="18" fill="#dbeafe" stroke="#0ea5e9" stroke-width="3"/>
          <circle cx="180" cy="58" r="18" fill="#fde68a" stroke="#f59e0b" stroke-width="3"/>
          <circle cx="276" cy="58" r="18" fill="#fecdd3" stroke="#fb7185" stroke-width="3"/>
          <path d="M62 88 H298 L220 146 H140 Z" fill="#fff7ed" stroke="#fb923c" stroke-width="4"/>
          <rect x="130" y="146" width="100" height="20" rx="8" fill="#ecfeff" stroke="#06b6d4" stroke-width="3"/>
          <text x="84" y="64" text-anchor="middle" font-family="Fredoka One" font-size="14" fill="#0f766e">1</text>
          <text x="180" y="64" text-anchor="middle" font-family="Fredoka One" font-size="14" fill="#b45309">2</text>
          <text x="276" y="64" text-anchor="middle" font-family="Fredoka One" font-size="14" fill="#be123c">3</text>
          <text x="180" y="178" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Choose the strongest idea, not every idea</text>
        </svg>
      `,
      'prompt-target': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Prompt target">
          <circle cx="180" cy="96" r="66" fill="#fff7ed" stroke="#fb923c" stroke-width="4"/>
          <circle cx="180" cy="96" r="44" fill="#ffedd5" stroke="#f59e0b" stroke-width="4"/>
          <circle cx="180" cy="96" r="20" fill="#fecdd3" stroke="#fb7185" stroke-width="4"/>
          <line x1="272" y1="54" x2="206" y2="88" stroke="#0ea5e9" stroke-width="4"/>
          <polygon points="206,88 218,82 216,96" fill="#0ea5e9"/>
          <text x="180" y="24" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#be123c">Hit the prompt clearly</text>
          <text x="180" y="166" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Keep the main task at the centre</text>
        </svg>
      `,
      'detail-zoom': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Detail zoom">
          <rect x="40" y="52" width="132" height="88" rx="18" fill="#ecfeff" stroke="#06b6d4" stroke-width="3"/>
          <rect x="220" y="44" width="96" height="96" rx="18" fill="#fff1f2" stroke="#fb7185" stroke-width="3"/>
          <circle cx="150" cy="94" r="18" fill="none" stroke="#334155" stroke-width="4"/>
          <line x1="164" y1="108" x2="214" y2="146" stroke="#334155" stroke-width="4"/>
          <text x="106" y="94" text-anchor="middle" font-family="Nunito" font-size="15" fill="#155e75">One main idea</text>
          <text x="268" y="86" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#be123c">More detail</text>
          <text x="268" y="112" text-anchor="middle" font-family="Nunito" font-size="14" fill="#9f1239">Grow it</text>
          <text x="180" y="170" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Zoom in instead of jumping away</text>
        </svg>
      `,
      'paragraph-path': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Paragraph path">
          <circle cx="70" cy="118" r="18" fill="#dbeafe" stroke="#0ea5e9" stroke-width="3"/>
          <circle cx="166" cy="92" r="18" fill="#fde68a" stroke="#f59e0b" stroke-width="3"/>
          <circle cx="274" cy="66" r="18" fill="#fecdd3" stroke="#fb7185" stroke-width="3"/>
          <path d="M88 114 C110 108, 132 101, 148 96" fill="none" stroke="#334155" stroke-width="4"/>
          <path d="M184 88 C208 82, 236 74, 256 70" fill="none" stroke="#334155" stroke-width="4"/>
          <text x="70" y="148" text-anchor="middle" font-family="Nunito" font-size="13" fill="#0f766e">Start</text>
          <text x="166" y="122" text-anchor="middle" font-family="Nunito" font-size="13" fill="#b45309">Middle</text>
          <text x="274" y="96" text-anchor="middle" font-family="Nunito" font-size="13" fill="#9f1239">End</text>
          <text x="180" y="24" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#7c3aed">Move in a sensible order</text>
        </svg>
      `,
      'paragraph-boxes': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Paragraph boxes">
          <rect x="34" y="48" width="88" height="92" rx="18" fill="#ecfeff" stroke="#06b6d4" stroke-width="3"/>
          <rect x="136" y="48" width="88" height="92" rx="18" fill="#fff7ed" stroke="#f59e0b" stroke-width="3"/>
          <rect x="238" y="48" width="88" height="92" rx="18" fill="#fff1f2" stroke="#fb7185" stroke-width="3"/>
          <text x="78" y="78" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#0f766e">Open</text>
          <text x="180" y="78" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#b45309">Build</text>
          <text x="282" y="78" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#be123c">Close</text>
          <text x="78" y="108" text-anchor="middle" font-family="Nunito" font-size="13" fill="#155e75">start the idea</text>
          <text x="180" y="108" text-anchor="middle" font-family="Nunito" font-size="13" fill="#7c2d12">grow the point</text>
          <text x="282" y="108" text-anchor="middle" font-family="Nunito" font-size="13" fill="#9f1239">finish clearly</text>
          <text x="180" y="168" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Let each paragraph do one job</text>
        </svg>
      `,
      'linking-bridge': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Linking bridge">
          <rect x="44" y="96" width="82" height="42" rx="12" fill="#dbeafe" stroke="#0ea5e9" stroke-width="3"/>
          <rect x="234" y="96" width="82" height="42" rx="12" fill="#fecdd3" stroke="#fb7185" stroke-width="3"/>
          <path d="M126 116 C152 70, 208 70, 234 116" fill="none" stroke="#f59e0b" stroke-width="6"/>
          <text x="180" y="86" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#b45309">because • next • finally</text>
          <text x="85" y="122" text-anchor="middle" font-family="Nunito" font-size="13" fill="#155e75">idea 1</text>
          <text x="275" y="122" text-anchor="middle" font-family="Nunito" font-size="13" fill="#9f1239">idea 2</text>
          <text x="180" y="166" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Linking words can help the reader cross smoothly</text>
        </svg>
      `,
      'precise-words': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Precise words">
          <rect x="36" y="48" width="120" height="94" rx="18" fill="#fff7ed" stroke="#f59e0b" stroke-width="3"/>
          <rect x="204" y="48" width="120" height="94" rx="18" fill="#ecfeff" stroke="#06b6d4" stroke-width="3"/>
          <text x="96" y="76" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#b45309">Weak</text>
          <text x="96" y="104" text-anchor="middle" font-family="Nunito" font-size="15" fill="#7c2d12">went</text>
          <text x="264" y="76" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#0f766e">Stronger</text>
          <text x="264" y="104" text-anchor="middle" font-family="Nunito" font-size="15" fill="#155e75">hurried</text>
          <text x="180" y="168" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Sharper words create clearer pictures</text>
        </svg>
      `,
      'word-upgrade': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Word upgrade">
          <rect x="46" y="70" width="102" height="40" rx="14" fill="#dbeafe" stroke="#0ea5e9" stroke-width="3"/>
          <path d="M150 90 H210" stroke="#334155" stroke-width="4"/>
          <polygon points="210,90 200,84 200,96" fill="#334155"/>
          <rect x="214" y="60" width="102" height="60" rx="14" fill="#fecdd3" stroke="#fb7185" stroke-width="3"/>
          <text x="97" y="95" text-anchor="middle" font-family="Nunito" font-size="15" fill="#155e75">looked</text>
          <text x="265" y="86" text-anchor="middle" font-family="Fredoka One" font-size="15" fill="#be123c">glanced</text>
          <text x="265" y="106" text-anchor="middle" font-family="Fredoka One" font-size="15" fill="#be123c">stared</text>
          <text x="180" y="160" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Choose the word that matches the action best</text>
        </svg>
      `,
      'sentence-variety': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Sentence variety">
          <rect x="36" y="54" width="288" height="82" rx="18" fill="#fff1f2" stroke="#fb7185" stroke-width="3"/>
          <rect x="58" y="74" width="78" height="12" rx="6" fill="#fecdd3"/>
          <rect x="58" y="96" width="162" height="12" rx="6" fill="#bfdbfe"/>
          <rect x="58" y="118" width="108" height="12" rx="6" fill="#fde68a"/>
          <text x="180" y="30" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#be123c">Short. Then longer. Then short again.</text>
          <text x="180" y="164" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Sentence rhythm helps the writing flow</text>
        </svg>
      `,
      'imagery-spark': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Imagery spark">
          <rect x="54" y="44" width="252" height="100" rx="20" fill="#fff7ed" stroke="#f59e0b" stroke-width="3"/>
          <polygon points="180,56 188,78 212,78 193,92 200,114 180,100 160,114 167,92 148,78 172,78" fill="#fde68a" stroke="#f59e0b" stroke-width="3"/>
          <text x="180" y="136" text-anchor="middle" font-family="Nunito" font-size="17" fill="#7c2d12">One strong image can light up the sentence</text>
        </svg>
      `,
      'sentence-lock': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Sentence lock">
          <rect x="42" y="60" width="276" height="68" rx="18" fill="#ecfeff" stroke="#06b6d4" stroke-width="3"/>
          <text x="180" y="90" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#0f766e">Subject + verb + clear meaning</text>
          <text x="180" y="118" text-anchor="middle" font-family="Nunito" font-size="16" fill="#155e75">The sentence holds together properly.</text>
          <text x="180" y="166" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Complete sentences feel secure and readable</text>
        </svg>
      `,
      'tense-timeline': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Tense timeline">
          <line x1="54" y1="98" x2="306" y2="98" stroke="#334155" stroke-width="5" stroke-linecap="round"/>
          <circle cx="96" cy="98" r="12" fill="#fde68a" stroke="#f59e0b" stroke-width="3"/>
          <circle cx="180" cy="98" r="12" fill="#fde68a" stroke="#f59e0b" stroke-width="3"/>
          <circle cx="264" cy="98" r="12" fill="#fde68a" stroke="#f59e0b" stroke-width="3"/>
          <text x="96" y="74" text-anchor="middle" font-family="Nunito" font-size="14" fill="#7c2d12">walked</text>
          <text x="180" y="74" text-anchor="middle" font-family="Nunito" font-size="14" fill="#7c2d12">opened</text>
          <text x="264" y="74" text-anchor="middle" font-family="Nunito" font-size="14" fill="#7c2d12">smiled</text>
          <text x="180" y="166" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Keep the verbs in the same time unless you truly mean to change</text>
        </svg>
      `,
      'punctuation-signals': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Punctuation signals">
          <rect x="42" y="48" width="74" height="94" rx="18" fill="#fff7ed" stroke="#f59e0b" stroke-width="3"/>
          <rect x="143" y="48" width="74" height="94" rx="18" fill="#fff1f2" stroke="#fb7185" stroke-width="3"/>
          <rect x="244" y="48" width="74" height="94" rx="18" fill="#ecfeff" stroke="#06b6d4" stroke-width="3"/>
          <text x="79" y="98" text-anchor="middle" font-family="Fredoka One" font-size="34" fill="#b45309">.</text>
          <text x="180" y="98" text-anchor="middle" font-family="Fredoka One" font-size="34" fill="#be123c">,</text>
          <text x="281" y="98" text-anchor="middle" font-family="Fredoka One" font-size="34" fill="#0f766e">"</text>
          <text x="180" y="166" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Different marks help the reader stop, pause, and hear speech</text>
        </svg>
      `,
      'square-shape': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Square shape">
          <rect x="94" y="42" width="172" height="108" rx="10" fill="#dbeafe" stroke="#0ea5e9" stroke-width="5"/>
          <circle cx="94" cy="42" r="7" fill="#f59e0b"/>
          <circle cx="266" cy="42" r="7" fill="#f59e0b"/>
          <circle cx="94" cy="150" r="7" fill="#f59e0b"/>
          <circle cx="266" cy="150" r="7" fill="#f59e0b"/>
          <text x="180" y="24" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#0f766e">4 equal sides</text>
          <text x="180" y="168" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Four corners, all right angles</text>
        </svg>
      `,
      'ruler-length': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Ruler read">
          <rect x="34" y="88" width="292" height="34" rx="12" fill="#fff7ed" stroke="#f59e0b" stroke-width="3"/>
          ${Array.from({length:13}, (_, i) => {
            const x = 46 + i * 22;
            const h = i % 5 === 0 ? 22 : i % 2 === 0 ? 16 : 12;
            return `<line x1="${x}" y1="88" x2="${x}" y2="${88 + h}" stroke="#92400e" stroke-width="2"/>`;
          }).join('')}
          <line x1="224" y1="72" x2="224" y2="88" stroke="#0ea5e9" stroke-width="4"/>
          <text x="224" y="62" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#0f766e">8 cm</text>
          <text x="180" y="154" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Read the mark where the line ends</text>
        </svg>
      `,
      'perimeter-rectangle': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Perimeter rectangle">
          <rect x="78" y="42" width="204" height="100" rx="18" fill="#ecfeff" stroke="#06b6d4" stroke-width="4"/>
          <line x1="78" y1="42" x2="282" y2="42" stroke="#0f766e" stroke-width="7"/>
          <line x1="282" y1="42" x2="282" y2="142" stroke="#0f766e" stroke-width="7"/>
          <line x1="78" y1="142" x2="282" y2="142" stroke="#0f766e" stroke-width="7"/>
          <line x1="78" y1="42" x2="78" y2="142" stroke="#0f766e" stroke-width="7"/>
          <text x="180" y="28" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#0f766e">5 cm + 3 cm + 5 cm + 3 cm</text>
          <text x="180" y="166" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Perimeter is the outside distance</text>
        </svg>
      `,
      'area-rectangle': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Area rectangle">
          <rect x="60" y="44" width="240" height="96" rx="18" fill="#ffedd5" stroke="#fb923c" stroke-width="4"/>
          <line x1="180" y1="44" x2="180" y2="140" stroke="#f59e0b" stroke-width="3" stroke-dasharray="7 6"/>
          <text x="180" y="22" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#b45309">4 cm</text>
          <text x="24" y="98" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#b45309" transform="rotate(-90 24 98)">3 cm</text>
          <text x="180" y="168" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Area = length × width</text>
        </svg>
      `,
      'capacity-bottle': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Capacity bottle">
          <rect x="145" y="32" width="70" height="26" rx="10" fill="#dbeafe" stroke="#0ea5e9" stroke-width="3"/>
          <path d="M156 56 H204 V132 C204 144 194 154 182 154 H178 C166 154 156 144 156 132 Z" fill="#ecfeff" stroke="#06b6d4" stroke-width="4"/>
          <line x1="160" y1="88" x2="200" y2="88" stroke="#0ea5e9" stroke-width="3"/>
          <line x1="160" y1="110" x2="200" y2="110" stroke="#0ea5e9" stroke-width="3"/>
          <line x1="160" y1="132" x2="200" y2="132" stroke="#0ea5e9" stroke-width="3"/>
          <text x="180" y="24" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#0f766e">1 L = 1000 mL</text>
          <text x="180" y="170" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Capacity tells how much a container holds</text>
        </svg>
      `,
      'volume-cube': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Volume cube">
          <rect x="116" y="58" width="120" height="84" rx="16" fill="#ecfdf5" stroke="#22c55e" stroke-width="3"/>
          <line x1="156" y1="58" x2="156" y2="142" stroke="#16a34a" stroke-width="2"/>
          <line x1="196" y1="58" x2="196" y2="142" stroke="#16a34a" stroke-width="2"/>
          <line x1="116" y1="90" x2="236" y2="90" stroke="#16a34a" stroke-width="2"/>
          <line x1="116" y1="118" x2="236" y2="118" stroke="#16a34a" stroke-width="2"/>
          <text x="180" y="44" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#15803d">2 × 2 × 2</text>
          <text x="180" y="168" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Count the cubes inside the box</text>
        </svg>
      `,
      'shape-symmetry': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Shape symmetry">
          <path d="M90 96 L140 54 L220 54 L270 96 L220 138 L140 138 Z" fill="#dbeafe" stroke="#0ea5e9" stroke-width="4"/>
          <line x1="180" y1="44" x2="180" y2="146" stroke="#7c3aed" stroke-width="4" stroke-dasharray="8 6"/>
          <text x="180" y="28" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#7c3aed">Fold line</text>
          <text x="180" y="168" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Both sides match exactly</text>
        </svg>
      `,
      'angle-triangle': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Triangle angles">
          <polygon points="180,40 92,138 268,138" fill="#fff7ed" stroke="#f59e0b" stroke-width="4"/>
          <text x="180" y="30" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#b45309">180° in total</text>
          <text x="180" y="88" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#0f766e">70°</text>
          <text x="115" y="138" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#0f766e">50°</text>
          <text x="245" y="138" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#0f766e">60°</text>
        </svg>
      `,
      'net-fold': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Net fold">
          <rect x="132" y="28" width="42" height="42" rx="8" fill="#dbeafe" stroke="#0ea5e9" stroke-width="3"/>
          <rect x="174" y="28" width="42" height="42" rx="8" fill="#bfdbfe" stroke="#0ea5e9" stroke-width="3"/>
          <rect x="90" y="70" width="42" height="42" rx="8" fill="#93c5fd" stroke="#0ea5e9" stroke-width="3"/>
          <rect x="132" y="70" width="42" height="42" rx="8" fill="#60a5fa" stroke="#0ea5e9" stroke-width="3"/>
          <rect x="174" y="70" width="42" height="42" rx="8" fill="#3b82f6" stroke="#0ea5e9" stroke-width="3"/>
          <rect x="216" y="70" width="42" height="42" rx="8" fill="#1d4ed8" stroke="#0ea5e9" stroke-width="3"/>
          <text x="180" y="154" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">A flat net can fold into a cube</text>
        </svg>
      `,
      'grid-point': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Grid point">
          <rect x="56" y="28" width="232" height="120" fill="#f8fbff" stroke="#cbd5e1" stroke-width="3"/>
          ${Array.from({length:6}, (_, i) => `<line x1="${56 + i*46}" y1="28" x2="${56 + i*46}" y2="148" stroke="#e2e8f0" stroke-width="2"/>`).join('')}
          ${Array.from({length:4}, (_, i) => `<line x1="56" y1="${28 + i*40}" x2="288" y2="${28 + i*40}" stroke="#e2e8f0" stroke-width="2"/>`).join('')}
          <circle cx="148" cy="108" r="10" fill="#0ea5e9"/>
          <text x="148" y="96" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#0f766e">(2,3)</text>
          <text x="172" y="166" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Across first, up second</text>
        </svg>
      `,
      'coordinate-plane': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Coordinate plane">
          <line x1="180" y1="24" x2="180" y2="150" stroke="#334155" stroke-width="4"/>
          <line x1="70" y1="88" x2="290" y2="88" stroke="#334155" stroke-width="4"/>
          <circle cx="250" cy="52" r="10" fill="#f59e0b"/>
          <text x="250" y="40" text-anchor="middle" font-family="Fredoka One" font-size="20" fill="#b45309">(4,5)</text>
          <text x="280" y="166" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">x is across, y is up</text>
        </svg>
      `,
      'elapsed-time-calc': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Elapsed time steps">
          <rect x="20" y="70" width="60" height="54" rx="14" fill="#dbeafe" stroke="#0ea5e9" stroke-width="3"/>
          <text x="50" y="92" text-anchor="middle" font-family="Fredoka One" font-size="15" fill="#0284c7">09:40</text>
          <text x="50" y="112" text-anchor="middle" font-family="Nunito" font-size="12" fill="#0369a1">start</text>
          <polygon points="86,97 98,90 98,104" fill="#0ea5e9"/>
          <rect x="102" y="70" width="60" height="54" rx="14" fill="#dcfce7" stroke="#22c55e" stroke-width="3"/>
          <text x="132" y="92" text-anchor="middle" font-family="Fredoka One" font-size="15" fill="#15803d">10:00</text>
          <text x="132" y="112" text-anchor="middle" font-family="Nunito" font-size="12" fill="#166534">+20 min</text>
          <polygon points="168,97 180,90 180,104" fill="#22c55e"/>
          <rect x="184" y="70" width="60" height="54" rx="14" fill="#dcfce7" stroke="#22c55e" stroke-width="3"/>
          <text x="214" y="92" text-anchor="middle" font-family="Fredoka One" font-size="15" fill="#15803d">12:00</text>
          <text x="214" y="112" text-anchor="middle" font-family="Nunito" font-size="12" fill="#166534">+2 h</text>
          <polygon points="250,97 262,90 262,104" fill="#f59e0b"/>
          <rect x="266" y="70" width="60" height="54" rx="14" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/>
          <text x="296" y="92" text-anchor="middle" font-family="Fredoka One" font-size="15" fill="#b45309">12:15</text>
          <text x="296" y="112" text-anchor="middle" font-family="Nunito" font-size="12" fill="#92400e">+15 min</text>
          <text x="180" y="158" text-anchor="middle" font-family="Nunito" font-size="15" fill="#475569">Total = 20 min + 2 h + 15 min = 2 h 35 min</text>
        </svg>
      `,
      'time-zone-compare': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Time zone compare">
          <rect x="22" y="44" width="130" height="82" rx="16" fill="#eff6ff" stroke="#3b82f6" stroke-width="3"/>
          <text x="87" y="72" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#1d4ed8">City A</text>
          <text x="87" y="98" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#1e40af">21:30</text>
          <text x="87" y="116" text-anchor="middle" font-family="Nunito" font-size="13" fill="#3b82f6">local time</text>
          <rect x="208" y="44" width="130" height="82" rx="16" fill="#f0fdf4" stroke="#22c55e" stroke-width="3"/>
          <text x="273" y="72" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#15803d">City B</text>
          <text x="273" y="98" text-anchor="middle" font-family="Fredoka One" font-size="22" fill="#166534">00:30</text>
          <text x="273" y="116" text-anchor="middle" font-family="Nunito" font-size="13" fill="#22c55e">next day</text>
          <text x="180" y="100" text-anchor="middle" font-family="Fredoka One" font-size="18" fill="#f59e0b">+3 h</text>
          <line x1="155" y1="85" x2="205" y2="85" stroke="#f59e0b" stroke-width="3" stroke-dasharray="5 4"/>
          <polygon points="205,85 196,80 196,90" fill="#f59e0b"/>
          <text x="180" y="158" text-anchor="middle" font-family="Nunito" font-size="15" fill="#475569">Add the offset to move between time zones</text>
        </svg>
      `,
      'remainder-cycle': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Remainder cycle">
          <text x="180" y="22" text-anchor="middle" font-family="Fredoka One" font-size="15" fill="#1e3a5f">Dividing by 5 — remainders repeat!</text>
          <rect x="12" y="40" width="54" height="58" rx="12" fill="#f0fdf4" stroke="#22c55e" stroke-width="2"/>
          <text x="39" y="64" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#15803d">25</text>
          <text x="39" y="84" text-anchor="middle" font-family="Nunito" font-size="13" fill="#15803d">r 0</text>
          <polygon points="70,69 78,64 78,74" fill="#94a3b8"/>
          <rect x="81" y="40" width="54" height="58" rx="12" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
          <text x="108" y="64" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#b45309">26</text>
          <text x="108" y="84" text-anchor="middle" font-family="Nunito" font-size="13" fill="#b45309">r 1</text>
          <polygon points="139,69 147,64 147,74" fill="#94a3b8"/>
          <rect x="150" y="40" width="54" height="58" rx="12" fill="#fee2e2" stroke="#f43f5e" stroke-width="2"/>
          <text x="177" y="64" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#be123c">27</text>
          <text x="177" y="84" text-anchor="middle" font-family="Nunito" font-size="13" fill="#be123c">r 2</text>
          <polygon points="208,69 216,64 216,74" fill="#94a3b8"/>
          <rect x="219" y="40" width="54" height="58" rx="12" fill="#f3e8ff" stroke="#a855f7" stroke-width="2"/>
          <text x="246" y="64" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#7e22ce">28</text>
          <text x="246" y="84" text-anchor="middle" font-family="Nunito" font-size="13" fill="#7e22ce">r 3</text>
          <polygon points="277,69 285,64 285,74" fill="#94a3b8"/>
          <rect x="288" y="40" width="60" height="58" rx="12" fill="#fff7ed" stroke="#ea580c" stroke-width="2"/>
          <text x="318" y="64" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#c2410c">29</text>
          <text x="318" y="84" text-anchor="middle" font-family="Nunito" font-size="13" fill="#c2410c">r 4</text>
          <path d="M340 118 Q180 155 20 118" fill="none" stroke="#22c55e" stroke-width="3" stroke-dasharray="6 4"/>
          <polygon points="20,118 32,113 30,124" fill="#22c55e"/>
          <text x="180" y="145" text-anchor="middle" font-family="Fredoka One" font-size="14" fill="#15803d">30 ÷ 5 → r 0 again!</text>
          <text x="180" y="166" text-anchor="middle" font-family="Nunito" font-size="14" fill="#475569">Remainders always cycle from 0 to (divisor − 1)</text>
        </svg>
      `,
      'divisibility-check': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Divisibility check">
          <rect x="20" y="12" width="320" height="166" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3"/>
          <text x="180" y="36" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#1e3a5f">4 Quick Divisibility Checks</text>
          <rect x="34" y="46" width="38" height="24" rx="8" fill="#dbeafe"/>
          <text x="53" y="63" text-anchor="middle" font-family="Fredoka One" font-size="15" fill="#1d4ed8">÷ 2</text>
          <text x="82" y="63" font-family="Nunito" font-size="14" fill="#334155">Last digit is even  (0, 2, 4, 6, 8)</text>
          <text x="338" y="63" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#22c55e">✓</text>
          <rect x="34" y="78" width="38" height="24" rx="8" fill="#dcfce7"/>
          <text x="53" y="95" text-anchor="middle" font-family="Fredoka One" font-size="15" fill="#15803d">÷ 3</text>
          <text x="82" y="95" font-family="Nunito" font-size="14" fill="#334155">Add all digits — if sum ÷ 3, yes!</text>
          <text x="338" y="95" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#22c55e">✓</text>
          <rect x="34" y="110" width="38" height="24" rx="8" fill="#fef3c7"/>
          <text x="53" y="127" text-anchor="middle" font-family="Fredoka One" font-size="15" fill="#b45309">÷ 5</text>
          <text x="82" y="127" font-family="Nunito" font-size="14" fill="#334155">Last digit is 0 or 5</text>
          <text x="338" y="127" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#22c55e">✓</text>
          <rect x="34" y="142" width="38" height="24" rx="8" fill="#fce7f3"/>
          <text x="53" y="159" text-anchor="middle" font-family="Fredoka One" font-size="15" fill="#be185d">÷10</text>
          <text x="82" y="159" font-family="Nunito" font-size="14" fill="#334155">Last digit is 0</text>
          <text x="338" y="159" text-anchor="middle" font-family="Fredoka One" font-size="16" fill="#22c55e">✓</text>
        </svg>
      `,
      'path-grid': `
        <svg viewBox="0 0 360 190" role="img" aria-label="Path grid">
          <rect x="52" y="26" width="256" height="120" fill="#fff" stroke="#cbd5e1" stroke-width="3"/>
          ${Array.from({length:6}, (_, i) => `<line x1="${52 + i*51}" y1="26" x2="${52 + i*51}" y2="146" stroke="#e2e8f0" stroke-width="2"/>`).join('')}
          ${Array.from({length:5}, (_, i) => `<line x1="52" y1="${26 + i*30}" x2="308" y2="${26 + i*30}" stroke="#e2e8f0" stroke-width="2"/>`).join('')}
          <path d="M104 116 L155 116 L155 86 L206 86 L206 56" fill="none" stroke="#0ea5e9" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="104" cy="116" r="7" fill="#f59e0b"/>
          <circle cx="206" cy="56" r="7" fill="#f59e0b"/>
          <text x="180" y="166" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">Follow each move in order</text>
        </svg>
      `
    };

    const fallback = ['Visual', 'A helpful visual for this topic.'];
    const meta = captions[visual.type] || fallback;
    const svg = svgMap[visual.type] || `
      <svg viewBox="0 0 360 190" role="img" aria-label="Generic visual">
        <rect x="52" y="48" width="256" height="94" rx="18" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3"/>
        <text x="180" y="90" text-anchor="middle" font-family="Fredoka One" font-size="24" fill="#334155">Look, think, answer</text>
        <text x="180" y="122" text-anchor="middle" font-family="Nunito" font-size="17" fill="#475569">A simple visual guide</text>
      </svg>`;
    return '<article class="visual-card"><div class="visual-label">' + meta[0] + '</div>' + svg + '<div class="visual-caption">' + meta[1] + '</div></article>';
  }

  window.SELECTIVE_TOPIC_LESSON_VISUAL = lessonVisualMarkup;
})();
