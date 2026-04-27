#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const stories = [
  {
    file: 'chemistry-foundation-materials-kids.html',
    year: 'Foundation',
    age: 'Ages 4-6',
    emoji: '🧪',
    hero: 'My First Chemistry Adventure',
    subtitle: 'What Chemistry Means and Why It Matters',
    gradient: 'linear-gradient(140deg,#fff2c4 0%,#ffdcb8 45%,#c7e9ff 100%)',
    badge: 'Chemistry · Foundation',
    topicLabel: 'Chemistry basics for young learners',
    intro: [
      'Chemistry is the science of what things are made of and how they can change.',
      'It helps us understand water, food, soap bubbles, paint, air, and many things around us.',
      'In this first lesson, we learn what chemistry is and why it is useful every day.'
    ],
    chapters: [
      {
        badge: 'Chapter 1',
        title: 'What Chemistry Means',
        paragraphs: [
          'Chemistry studies matter. Matter means anything that has mass and takes up space.',
          'Your toy, your water bottle, your lunch, and even the air are all matter.',
          'When we ask “What is it made of?”, we are doing chemistry thinking.'
        ],
        artEmoji: '📘',
        artTitle: 'Meaning of chemistry',
        artFacts: [
          'Chemistry = study of matter.',
          'Matter = stuff around us.',
          'Questions help us learn science.'
        ],
        visualIcons: ['🧪', '💧', '🍎']
      },
      {
        badge: 'Chapter 2',
        title: 'How Chemistry Works',
        paragraphs: [
          'Chemistry starts with observing, testing, and comparing what we see.',
          'Scientists look for clues like color, smell, texture, and changes over time.',
          'Then they explain what happened with clear evidence.'
        ],
        artEmoji: '🔍',
        artTitle: 'Observe, test, explain',
        artFacts: [
          'Step 1: Observe carefully.',
          'Step 2: Test safely.',
          'Step 3: Explain with evidence.'
        ],
        visualIcons: ['👀', '📝', '✅']
      },
      {
        badge: 'Chapter 3',
        title: 'Chemistry Is Everywhere',
        paragraphs: [
          'When milk turns to yogurt, when bread bakes, and when ice melts, chemistry is happening.',
          'When soap cleans dirty hands, chemistry is helping us stay healthy.',
          'Chemistry is not only in labs. It is in kitchens, homes, schools, and nature.'
        ],
        artEmoji: '🌍',
        artTitle: 'Daily-life chemistry',
        artFacts: [
          'Food changes involve chemistry.',
          'Cleaning uses chemistry.',
          'Weather includes chemistry too.'
        ],
        visualIcons: ['🍳', '🧼', '🌦️']
      },
      {
        badge: 'Chapter 4',
        title: 'Why Chemistry Is Relevant',
        paragraphs: [
          'Chemistry helps doctors make medicines and helps farmers grow better food.',
          'Chemistry helps engineers make safer materials for homes, roads, and toys.',
          'Learning chemistry helps children ask smart questions and solve real problems.'
        ],
        artEmoji: '💡',
        artTitle: 'Why it matters',
        artFacts: [
          'Health: medicines and hygiene.',
          'Safety: better materials.',
          'Future jobs: science and engineering.'
        ],
        visualIcons: ['💊', '🏗️', '🚀']
      }
    ],
    useCases: [
      {
        icon: '🍲',
        title: 'Food and Cooking',
        text: 'Cooking changes ingredients into meals, and chemistry explains those changes.'
      },
      {
        icon: '🧼',
        title: 'Health and Hygiene',
        text: 'Soap, toothpaste, and clean water systems all rely on chemistry ideas.'
      },
      {
        icon: '🏗️',
        title: 'Building and Technology',
        text: 'Chemistry helps create strong materials, batteries, paints, and useful products.'
      }
    ],
    activity: {
      title: 'Chemistry Around Me Hunt',
      materials: ['A notebook', 'A pencil', '3 daily items (food, cleaner, object)'],
      steps: [
        'Pick three everyday items from home or class.',
        'Write what each item is made of (or guess).',
        'Write one change each item can go through (melt, mix, clean, cook, etc.).',
        'Explain why chemistry helps in that item’s use.'
      ],
      safety: 'Use only safe items and ask an adult before observing kitchen or cleaning products.'
    },
    flowTitle: 'How Chemistry Helps Us Learn',
    flowSteps: [
      { icon: '❓', label: 'Ask', detail: 'What is this made of?' },
      { icon: '👀', label: 'Observe', detail: 'Notice clues and changes.' },
      { icon: '🧠', label: 'Explain', detail: 'Tell why it happened.' },
      { icon: '🌍', label: 'Apply', detail: 'Use it in real life.' }
    ],
    vocabulary: [
      { term: 'Chemistry', meaning: 'Science of matter and change.', example: 'Cooking is a chemistry example.' },
      { term: 'Matter', meaning: 'Anything that has mass and takes space.', example: 'Water is matter.' },
      { term: 'Change', meaning: 'When something becomes different.', example: 'Ice melting is a change.' },
      { term: 'Observation', meaning: 'What we notice with senses/tools.', example: 'Color change is an observation.' },
      { term: 'Evidence', meaning: 'Clues that support an explanation.', example: 'Bubbles can be evidence of change.' }
    ],
    definitionSpotlight: 'Chemistry is the science of matter and how matter changes.',
    equationSpotlight: 'Questions + Observations + Evidence -> Better chemistry understanding',
    practice: [
      {
        question: 'What does chemistry study?',
        answer: 'Chemistry studies matter and how matter changes.'
      },
      {
        question: 'Give one example of chemistry at home.',
        answer: 'Examples: cooking food, soap cleaning, or water boiling.'
      },
      {
        question: 'Why is chemistry relevant for children?',
        answer: 'It helps understand daily life, health, safety, and problem-solving.'
      }
    ],
    quiz: [
      {
        q: 'Chemistry is mainly the study of...',
        emoji: '🧪',
        options: ['Only stars', 'Matter and change', 'Only animals', 'Only numbers'],
        answer: 1,
        explain: 'Chemistry studies what things are made of and how they change.'
      },
      {
        q: 'Which of these is an example of chemistry in life?',
        emoji: '🍳',
        options: ['Cooking food', 'Jumping rope', 'Running race', 'Reading a map'],
        answer: 0,
        explain: 'Cooking involves changes in ingredients, which is chemistry.'
      },
      {
        q: 'Why do scientists use observations?',
        emoji: '👀',
        options: ['To guess only', 'To collect clues', 'To skip experiments', 'To avoid learning'],
        answer: 1,
        explain: 'Observations provide clues for science explanations.'
      },
      {
        q: 'Which sentence shows relevance of chemistry?',
        emoji: '💡',
        options: ['Chemistry is only for labs', 'Chemistry helps in medicines and cleaning', 'Chemistry is only for adults', 'Chemistry is only for exams'],
        answer: 1,
        explain: 'Chemistry is relevant in health, safety, food, and technology.'
      },
      {
        q: 'A good first chemistry question is...',
        emoji: '❓',
        options: ['What color is my shoe only?', 'What is this made of?', 'Can I skip this?', 'Is science boring?'],
        answer: 1,
        explain: '“What is this made of?” is a strong chemistry starting question.'
      }
    ],
    nextLink: 'chemistry-year-1-materials-kids.html'
  },
  {
    file: 'chemistry-year-1-materials-kids.html',
    year: 'Year 1',
    age: 'Ages 5-7',
    emoji: '🧩',
    hero: 'The Material Match Mission',
    subtitle: 'Why Different Jobs Need Different Materials',
    gradient: 'linear-gradient(140deg,#dcf6ff 0%,#c9e7ff 45%,#ffe7ba 100%)',
    badge: 'Chemistry · Year 1',
    topicLabel: 'Properties of objects and materials; purpose',
    intro: [
      'Captain Cora must build a mini town before sunset.',
      'She must choose the right material for windows, raincoats, chairs, and school bags.',
      'You will help her match each object with the best material property.'
    ],
    chapters: [
      {
        badge: 'Chapter 1',
        title: 'Every Material Has Strengths',
        paragraphs: [
          'Plastic can be light and waterproof. Metal can be strong. Fabric can be soft and bendy.',
          'No one material is best for everything. It depends on the job.',
          'Scientists and designers ask: What property do we need first?'
        ],
        artEmoji: '🏗️',
        artTitle: 'Material toolkit',
        artFacts: [
          'Plastic: light, waterproof.',
          'Metal: strong, hard.',
          'Fabric: soft, flexible.'
        ],
        visualIcons: ['🪟', '🧥', '🪑']
      },
      {
        badge: 'Chapter 2',
        title: 'Choose by Purpose',
        paragraphs: [
          'Windows need to let light in, so transparent glass works well.',
          'Raincoats need water resistance, so waterproof materials are useful.',
          'A school chair needs strength and stability, so hard materials are chosen.'
        ],
        artEmoji: '🎯',
        artTitle: 'Purpose first',
        artFacts: [
          'Ask: what must this object do?',
          'Then choose the property needed.',
          'Finally choose the material.'
        ],
        visualIcons: ['☔', '💡', '🪑']
      },
      {
        badge: 'Chapter 3',
        title: 'Compare Two Choices',
        paragraphs: [
          'Should a toy be glass or plastic? Plastic is often safer and lighter.',
          'Should a spoon be paper or metal? Metal stays strong in hot soup.',
          'Comparing options helps us make smart decisions.'
        ],
        artEmoji: '⚖️',
        artTitle: 'Compare and decide',
        artFacts: [
          'Think about safety.',
          'Think about durability.',
          'Think about comfort.'
        ],
        visualIcons: ['🧸', '🥄', '🛡️']
      },
      {
        badge: 'Chapter 4',
        title: 'Design Around Us',
        paragraphs: [
          'From lunch boxes to umbrellas, material choice changes how useful objects are.',
          'Engineers test materials before making products.',
          'You can think like an engineer by asking why each object uses that material.'
        ],
        artEmoji: '🧠',
        artTitle: 'Young engineer mindset',
        artFacts: [
          'Observe everyday objects.',
          'Guess the key property.',
          'Check if your guess makes sense.'
        ],
        visualIcons: ['🎒', '☂️', '🔧']
      }
    ],
    useCases: [
      {
        icon: '🚲',
        title: 'Bike Helmet Design',
        text: 'Helmets use tough outside layers and softer inside padding for safety.'
      },
      {
        icon: '🏠',
        title: 'Home Windows',
        text: 'Glass lets light in while still protecting the inside of the home.'
      },
      {
        icon: '🎒',
        title: 'School Bags',
        text: 'Bags use strong fabric and zips so they can carry books every day.'
      }
    ],
    activity: {
      title: 'Material Match Game',
      materials: ['Spoon', 'Raincoat', 'Window', 'Pillow', 'Notebook'],
      steps: [
        'Choose one object and name its material.',
        'Say one property of that material.',
        'Explain why that property helps the object do its job.',
        'Try replacing it with another material and discuss what might go wrong.'
      ],
      safety: 'This is a thinking activity. No risky testing needed.'
    },
    flowTitle: 'How Designers Choose Materials',
    flowSteps: [
      { icon: '❓', label: 'Need', detail: 'What must the object do?' },
      { icon: '🔎', label: 'Property', detail: 'Strong, soft, waterproof?' },
      { icon: '🧱', label: 'Material', detail: 'Pick glass, metal, fabric, etc.' },
      { icon: '✅', label: 'Test', detail: 'Check if it works well.' }
    ],
    vocabulary: [
      { term: 'Purpose', meaning: 'The job an object must do.', example: 'A raincoat keeps us dry.' },
      { term: 'Waterproof', meaning: 'Does not let water pass through.', example: 'Many raincoats are waterproof.' },
      { term: 'Flexible', meaning: 'Can bend without breaking.', example: 'Fabric is flexible.' },
      { term: 'Transparent', meaning: 'Can see through it.', example: 'Glass is transparent.' },
      { term: 'Durable', meaning: 'Lasts a long time.', example: 'Metal chairs are often durable.' }
    ],
    definitionSpotlight: 'A material property is a feature that helps an object do its job.',
    equationSpotlight: 'Purpose + Needed property -> Best material choice',
    practice: [
      {
        question: 'Why is glass used for windows?',
        answer: 'It is transparent, so it lets light in while acting as a barrier.'
      },
      {
        question: 'Why is rubber useful for erasers?',
        answer: 'It is soft and grippy, so it can rub pencil marks away.'
      },
      {
        question: 'Pick one object and suggest a better material for it.',
        answer: 'Answers vary. Justify with a property.'
      }
    ],
    quiz: [
      {
        q: 'Why is glass often chosen for windows?',
        emoji: '🪟',
        options: ['It is soft', 'It is transparent', 'It is rough', 'It is stretchy'],
        answer: 1,
        explain: 'Glass is transparent, so it allows us to see through.'
      },
      {
        q: 'Which material is usually best for a raincoat?',
        emoji: '☔',
        options: ['Wool', 'Paper', 'Waterproof plastic', 'Glass'],
        answer: 2,
        explain: 'Raincoats need water resistance, so waterproof material is best.'
      },
      {
        q: 'A spoon for hot soup should be...',
        emoji: '🥄',
        options: ['Very weak', 'Strong and heat-safe', 'Made of ice', 'Transparent'],
        answer: 1,
        explain: 'A spoon should stay strong and safe while being used with hot food.'
      },
      {
        q: 'Choosing materials by purpose helps us...',
        emoji: '🎯',
        options: ['Make random choices', 'Design better objects', 'Ignore safety', 'Break things faster'],
        answer: 1,
        explain: 'Purpose-based choices make objects safer and more useful.'
      },
      {
        q: 'Which object needs a soft material for comfort?',
        emoji: '🛏️',
        options: ['Pillow', 'Hammer', 'Steel ruler', 'Window'],
        answer: 0,
        explain: 'Pillows are soft so they feel comfortable.'
      }
    ],
    nextLink: 'chemistry-year-2-changes-kids.html'
  },
  {
    file: 'chemistry-year-2-changes-kids.html',
    year: 'Year 2',
    age: 'Ages 6-8',
    emoji: '✂️',
    hero: 'Bend, Stretch, Cut, Mix!',
    subtitle: 'How Materials Can Be Changed',
    gradient: 'linear-gradient(140deg,#e6ffe1 0%,#cdf5ea 45%,#d9e5ff 100%)',
    badge: 'Chemistry · Year 2',
    topicLabel: 'Physical changes and mixing materials',
    intro: [
      'Nia the Maker opens a mini lab full of paper, clay, rubber bands, and bowls.',
      'She asks: Which changes are just shape changes, and which mixtures can we separate?',
      'Let us test and classify changes with evidence.'
    ],
    chapters: [
      {
        badge: 'Chapter 1',
        title: 'Physical Changes',
        paragraphs: [
          'When you bend a straw or cut paper, the material can change shape.',
          'The substance usually stays the same. Paper pieces are still paper.',
          'These are called physical changes.'
        ],
        artEmoji: '📄',
        artTitle: 'Before and after shape',
        artFacts: [
          'Bending: shape changes.',
          'Cutting: size changes.',
          'Substance stays same.'
        ],
        visualIcons: ['✂️', '📄', '📎']
      },
      {
        badge: 'Chapter 2',
        title: 'Stretch and Return',
        paragraphs: [
          'A rubber band can stretch and often return to original shape.',
          'This shows elasticity, a useful material property.',
          'Not all materials stretch well. Comparing helps us choose tools.'
        ],
        artEmoji: '🪢',
        artTitle: 'Elastic test',
        artFacts: [
          'Rubber: elastic.',
          'Paper: tears if stretched too much.',
          'Metal wire: bends but may not return.'
        ],
        visualIcons: ['🪢', '🧵', '📏']
      },
      {
        badge: 'Chapter 3',
        title: 'Mixing Materials',
        paragraphs: [
          'Mixing joins two or more materials in one container.',
          'Rice and lentils can be separated by hand. Sand and water can be filtered.',
          'Some mixtures are easy to separate, others are harder.'
        ],
        artEmoji: '🥣',
        artTitle: 'Mixture bowl',
        artFacts: [
          'Mixture = no new substance required.',
          'Parts can often be separated.',
          'Use tools like sieve or filter.'
        ],
        visualIcons: ['🍚', '🫘', '💧']
      },
      {
        badge: 'Chapter 4',
        title: 'Describe with Evidence',
        paragraphs: [
          'Instead of saying only “it changed,” describe how it changed.',
          'Say whether shape changed, size changed, or materials mixed.',
          'Good science writing uses clear before-and-after evidence.'
        ],
        artEmoji: '📝',
        artTitle: 'Science notes',
        artFacts: [
          'Write what you did.',
          'Write what you observed.',
          'Use science words correctly.'
        ],
        visualIcons: ['🔎', '📘', '✅']
      }
    ],
    useCases: [
      {
        icon: '👩‍🍳',
        title: 'Cooking and Mixing',
        text: 'Chefs mix ingredients to make dough, batter, and sauces.'
      },
      {
        icon: '🧱',
        title: 'Construction Work',
        text: 'Builders mix cement and sand to make strong structures.'
      },
      {
        icon: '♻️',
        title: 'Recycling Sort',
        text: 'Sorting and separating materials helps recycling plants work better.'
      }
    ],
    activity: {
      title: 'Change Detective Lab',
      materials: ['Paper', 'Rubber band', 'Bowl of dry rice and lentils', 'Notebook'],
      steps: [
        'Cut paper into strips and record what changed.',
        'Stretch a rubber band and observe if it returns.',
        'Mix rice and lentils, then separate them.',
        'Label each task as shape change, stretch, or mixture.'
      ],
      safety: 'Keep scissors use supervised. Do not place small items in mouth.'
    },
    flowTitle: 'How to Classify a Change',
    flowSteps: [
      { icon: '👀', label: 'Observe', detail: 'What changed?' },
      { icon: '🔁', label: 'Compare', detail: 'Before vs after' },
      { icon: '🏷️', label: 'Label', detail: 'Physical change or mixture' },
      { icon: '✍️', label: 'Explain', detail: 'Give one evidence sentence' }
    ],
    vocabulary: [
      { term: 'Physical change', meaning: 'Change in shape or form, not substance.', example: 'Cutting paper is physical.' },
      { term: 'Mixture', meaning: 'Two or more materials combined.', example: 'Rice and lentils in a bowl.' },
      { term: 'Separate', meaning: 'Take mixed parts apart again.', example: 'Use hands or a sieve.' },
      { term: 'Elastic', meaning: 'Can stretch and return.', example: 'Rubber band is elastic.' },
      { term: 'Evidence', meaning: 'Observation that supports your idea.', example: 'It returned to shape after stretch.' }
    ],
    definitionSpotlight: 'Physical change alters form, but the substance itself remains the same.',
    equationSpotlight: 'Same substance + New shape/state -> Physical change',
    practice: [
      {
        question: 'Is tearing paper a physical change? Why?',
        answer: 'Yes. The shape changes, but it is still paper.'
      },
      {
        question: 'Can rice and lentils be separated after mixing?',
        answer: 'Yes, because each material remains its own part.'
      },
      {
        question: 'Name one elastic object at home.',
        answer: 'Examples: hair tie, rubber band, stretch toy.'
      }
    ],
    quiz: [
      {
        q: 'Which is a physical change?',
        emoji: '✂️',
        options: ['Rusting', 'Cutting paper', 'Burning wood', 'Cooking egg'],
        answer: 1,
        explain: 'Cutting changes shape but keeps the same material.'
      },
      {
        q: 'What does a mixture mean?',
        emoji: '🥣',
        options: ['New planet', 'One pure metal', 'Materials combined together', 'A shape only'],
        answer: 2,
        explain: 'A mixture has two or more materials together.'
      },
      {
        q: 'Which tool can help separate solids in a mixture?',
        emoji: '🧺',
        options: ['Sieve', 'Paintbrush', 'Pillow', 'Torch'],
        answer: 0,
        explain: 'A sieve helps separate based on particle size.'
      },
      {
        q: 'A rubber band that returns to shape is...',
        emoji: '🪢',
        options: ['Transparent', 'Elastic', 'Magnetic', 'Frozen'],
        answer: 1,
        explain: 'Returning after stretch is elasticity.'
      },
      {
        q: 'Good science notes include...',
        emoji: '📝',
        options: ['Only guesses', 'No details', 'Before-and-after evidence', 'Only drawings'],
        answer: 2,
        explain: 'Evidence-based notes explain what changed and how.'
      }
    ],
    nextLink: 'chemistry-year-3-states-kids.html'
  },
  {
    file: 'chemistry-year-3-states-kids.html',
    year: 'Year 3',
    age: 'Ages 7-9',
    emoji: '🌡️',
    hero: 'Solid, Liquid, Gas Express',
    subtitle: 'How Heating and Cooling Change Materials',
    gradient: 'linear-gradient(140deg,#e5f4ff 0%,#c9e0ff 45%,#ffedc6 100%)',
    badge: 'Chemistry · Year 3',
    topicLabel: 'Properties of solids, liquids and gases',
    intro: [
      'Ava boards the Matter Express and visits Solid City, Liquid Lake, and Gas Sky.',
      'Each station shows how particles and shapes behave differently.',
      'By the end, you will explain heating and cooling changes with confidence.'
    ],
    chapters: [
      {
        badge: 'Chapter 1',
        title: 'What Is a Solid?',
        paragraphs: [
          'Solids usually keep their own shape and volume.',
          'A brick, pencil, and ice cube are solids.',
          'Solids can be hard or soft, but they do not flow like liquids.'
        ],
        artEmoji: '🧊',
        artTitle: 'Solid station',
        artFacts: [
          'Fixed shape.',
          'Usually easy to hold.',
          'Particles are close together.'
        ],
        visualIcons: ['🧱', '✏️', '🧊']
      },
      {
        badge: 'Chapter 2',
        title: 'How Liquids Behave',
        paragraphs: [
          'Liquids flow and take the shape of their container.',
          'Water in a glass and soup in a bowl are liquids.',
          'Liquids keep volume but not fixed shape.'
        ],
        artEmoji: '💧',
        artTitle: 'Liquid station',
        artFacts: [
          'Flows easily.',
          'Takes container shape.',
          'Can be poured.'
        ],
        visualIcons: ['🥛', '🥣', '🚰']
      },
      {
        badge: 'Chapter 3',
        title: 'What About Gases?',
        paragraphs: [
          'Gases spread out and fill all available space.',
          'Air in a room and steam above hot water are gases.',
          'Gases are often invisible, but they still have mass and take space.'
        ],
        artEmoji: '☁️',
        artTitle: 'Gas station',
        artFacts: [
          'No fixed shape.',
          'No fixed volume in open space.',
          'Particles move freely.'
        ],
        visualIcons: ['🎈', '🌬️', '♨️']
      },
      {
        badge: 'Chapter 4',
        title: 'Heating and Cooling',
        paragraphs: [
          'Heating can melt solids into liquids or turn liquids into gas.',
          'Cooling can condense gas into liquid or freeze liquids into solids.',
          'These changes are common in kitchens and weather.'
        ],
        artEmoji: '🔥',
        artTitle: 'Change with temperature',
        artFacts: [
          'Heat often speeds particles up.',
          'Cooling slows particles down.',
          'State can change with energy.'
        ],
        visualIcons: ['🧊', '💧', '☁️']
      }
    ],
    useCases: [
      {
        icon: '🍫',
        title: 'Melting Chocolate',
        text: 'Chocolate melts from solid to liquid when warmed gently.'
      },
      {
        icon: '🌧️',
        title: 'Rain Formation',
        text: 'Water vapor cools and condenses into droplets in clouds.'
      },
      {
        icon: '🥤',
        title: 'Cold Drink Drops',
        text: 'Water from air condenses on the outside of a cold glass.'
      }
    ],
    activity: {
      title: 'State Spotter Challenge',
      materials: ['Ice cube', 'Glass of water', 'Kettle steam (adult help)', 'Notebook'],
      steps: [
        'Identify one solid, one liquid, and one gas example.',
        'Write how each behaves: shape, flow, and space.',
        'Watch ice melt and describe the state change.',
        'Discuss where you have seen these changes in daily life.'
      ],
      safety: 'Steam and hot water must be handled by an adult.'
    },
    flowTitle: 'State Change Journey',
    flowSteps: [
      { icon: '🧊', label: 'Solid', detail: 'Fixed shape' },
      { icon: '🔥', label: 'Heat', detail: 'Add energy' },
      { icon: '💧', label: 'Liquid', detail: 'Flows' },
      { icon: '☁️', label: 'Gas', detail: 'Spreads out' }
    ],
    vocabulary: [
      { term: 'Solid', meaning: 'State with fixed shape.', example: 'A book is a solid.' },
      { term: 'Liquid', meaning: 'State that flows and takes container shape.', example: 'Milk is a liquid.' },
      { term: 'Gas', meaning: 'State that spreads to fill space.', example: 'Air is a gas.' },
      { term: 'Melt', meaning: 'Solid to liquid change.', example: 'Ice melts into water.' },
      { term: 'Condense', meaning: 'Gas to liquid change.', example: 'Water vapor condenses into drops.' }
    ],
    definitionSpotlight: 'A state of matter describes how particles are arranged and how they move.',
    equationSpotlight: 'Heating: Solid -> Liquid -> Gas | Cooling: Gas -> Liquid -> Solid',
    practice: [
      {
        question: 'Why can water be poured but ice cannot?',
        answer: 'Water is a liquid and flows; ice is a solid with fixed shape.'
      },
      {
        question: 'What state is steam?',
        answer: 'Steam is water in gas form.'
      },
      {
        question: 'Give one example of cooling change at home.',
        answer: 'Water freezing into ice in the freezer.'
      }
    ],
    quiz: [
      {
        q: 'Which state usually keeps its own shape?',
        emoji: '🧊',
        options: ['Solid', 'Liquid', 'Gas', 'Steam'],
        answer: 0,
        explain: 'Solids usually keep their shape.'
      },
      {
        q: 'Which state can be poured?',
        emoji: '💧',
        options: ['Liquid', 'Solid', 'Stone', 'Plastic toy'],
        answer: 0,
        explain: 'Liquids flow and can be poured.'
      },
      {
        q: 'What happens when ice is heated?',
        emoji: '🔥',
        options: ['Turns to gas directly always', 'Melts into liquid', 'Becomes metal', 'No change ever'],
        answer: 1,
        explain: 'Ice usually melts into liquid water first.'
      },
      {
        q: 'Steam is best described as...',
        emoji: '☁️',
        options: ['A solid', 'A gas', 'A rock', 'A plastic'],
        answer: 1,
        explain: 'Steam is water vapor, which is a gas.'
      },
      {
        q: 'Cooling water in a freezer causes...',
        emoji: '❄️',
        options: ['Melting', 'Freezing', 'Evaporation', 'Rusting'],
        answer: 1,
        explain: 'Freezing changes liquid water to solid ice.'
      }
    ],
    nextLink: 'chemistry-year-4-state-changes-kids.html'
  },
  {
    file: 'chemistry-year-4-state-changes-kids.html',
    year: 'Year 4',
    age: 'Ages 8-10',
    emoji: '💧',
    hero: 'The State Change Station',
    subtitle: 'Melting, Freezing, Evaporation, Condensation',
    gradient: 'linear-gradient(140deg,#f5e8ff 0%,#ddd2ff 45%,#cff0ff 100%)',
    badge: 'Chemistry · Year 4',
    topicLabel: 'Changes of state; reversible vs irreversible changes',
    intro: [
      'Professor Drops runs a station where matter changes in surprising ways.',
      'Some changes can be reversed, while others cannot return to the original form.',
      'You will classify examples and explain your reasons.'
    ],
    chapters: [
      {
        badge: 'Chapter 1',
        title: 'Four Key State Changes',
        paragraphs: [
          'Melting: solid to liquid. Freezing: liquid to solid.',
          'Evaporation: liquid to gas. Condensation: gas to liquid.',
          'These changes happen because energy is added or removed.'
        ],
        artEmoji: '🔄',
        artTitle: 'State change wheel',
        artFacts: [
          'Melting needs heat.',
          'Freezing needs cooling.',
          'Evaporation and condensation connect in weather.'
        ],
        visualIcons: ['🧊', '💧', '☁️']
      },
      {
        badge: 'Chapter 2',
        title: 'Reversible Changes',
        paragraphs: [
          'Reversible means you can change back to the original material form.',
          'Ice can melt to water and freeze back again.',
          'This is common in the water cycle.'
        ],
        artEmoji: '↔️',
        artTitle: 'Can it change back?',
        artFacts: [
          'Ice ⇄ Water is reversible.',
          'Wax melting then solidifying can be reversible.',
          'No new substance needed.'
        ],
        visualIcons: ['🧊', '💧', '🕒']
      },
      {
        badge: 'Chapter 3',
        title: 'Irreversible Changes',
        paragraphs: [
          'Irreversible means it cannot return to the exact original material.',
          'Burning paper and baking cake create new substances and structures.',
          'These changes are usually permanent.'
        ],
        artEmoji: '🚫',
        artTitle: 'No easy return',
        artFacts: [
          'Burning: irreversible.',
          'Cooking egg: irreversible.',
          'New substance clues matter.'
        ],
        visualIcons: ['🔥', '🍳', '🍰']
      },
      {
        badge: 'Chapter 4',
        title: 'Explain Your Classification',
        paragraphs: [
          'Do not just label a change. Explain with evidence.',
          'Ask: Can it go back? Did a new substance form?',
          'Using both questions makes stronger science answers.'
        ],
        artEmoji: '🧭',
        artTitle: 'Decision questions',
        artFacts: [
          'Question 1: reversible?',
          'Question 2: new substance?',
          'Give one clear example.'
        ],
        visualIcons: ['❓', '✅', '🧠']
      }
    ],
    useCases: [
      {
        icon: '🌦️',
        title: 'Water Cycle Science',
        text: 'Evaporation and condensation drive cloud and rain formation.'
      },
      {
        icon: '🍳',
        title: 'Cooking Changes',
        text: 'Cooking often causes irreversible changes in food texture and structure.'
      },
      {
        icon: '🏭',
        title: 'Industrial Cooling',
        text: 'Factories control heating and cooling to shape products properly.'
      }
    ],
    activity: {
      title: 'Reversible or Not?',
      materials: ['Ice cube', 'Paper strip', 'Chocolate piece', 'Notebook'],
      steps: [
        'Observe ice melting and discuss if it can reverse.',
        'Observe chocolate melting and cooling to set.',
        'Think about burning paper as a non-reversible example.',
        'Create a two-column chart: reversible / irreversible.'
      ],
      safety: 'Do not perform burning experiments. Discuss them as thought examples only.'
    },
    flowTitle: 'How to Classify Changes',
    flowSteps: [
      { icon: '👀', label: 'Observe', detail: 'What happened?' },
      { icon: '↩️', label: 'Check Back', detail: 'Can it return?' },
      { icon: '🧪', label: 'Substance', detail: 'New material formed?' },
      { icon: '🏷️', label: 'Classify', detail: 'Reversible or irreversible' }
    ],
    vocabulary: [
      { term: 'Reversible', meaning: 'Can change back to original state.', example: 'Water freezing and melting.' },
      { term: 'Irreversible', meaning: 'Cannot easily return to original.', example: 'Burning paper.' },
      { term: 'Evaporation', meaning: 'Liquid to gas change.', example: 'Puddle drying in sun.' },
      { term: 'Condensation', meaning: 'Gas to liquid change.', example: 'Drops on cold glass.' },
      { term: 'Evidence', meaning: 'Observation supporting your classification.', example: 'It formed ash and smoke.' }
    ],
    definitionSpotlight: 'A reversible change can return to the original form; an irreversible change cannot.',
    equationSpotlight: 'Can change back? Yes -> Reversible | No -> Irreversible',
    practice: [
      {
        question: 'Is melting butter reversible?',
        answer: 'Usually yes. It can cool and solidify again.'
      },
      {
        question: 'Why is baking cake irreversible?',
        answer: 'Heat causes new structures and reactions that cannot return to raw batter.'
      },
      {
        question: 'Name one sign that a new substance formed.',
        answer: 'Examples: ash, gas bubbles with odor change, permanent color change.'
      }
    ],
    quiz: [
      {
        q: 'Which is a reversible change?',
        emoji: '🧊',
        options: ['Burning wood', 'Frying egg', 'Ice melting then freezing', 'Baking bread'],
        answer: 2,
        explain: 'Ice and water can change back and forth.'
      },
      {
        q: 'Evaporation is...',
        emoji: '☀️',
        options: ['Gas to liquid', 'Liquid to gas', 'Solid to liquid', 'Solid to gas only'],
        answer: 1,
        explain: 'Evaporation is liquid changing into gas.'
      },
      {
        q: 'Condensation happens when...',
        emoji: '🥤',
        options: ['Gas cools to liquid', 'Solid melts', 'Wood burns', 'Liquid freezes always'],
        answer: 0,
        explain: 'Gas cooling can form liquid droplets.'
      },
      {
        q: 'Which question helps classify change best?',
        emoji: '❓',
        options: ['Is it colorful?', 'Is it noisy?', 'Can it return and did new substance form?', 'Is it expensive?'],
        answer: 2,
        explain: 'These two checks are strong science criteria.'
      },
      {
        q: 'Cooking an egg is usually...',
        emoji: '🍳',
        options: ['Reversible', 'Irreversible', 'Only physical shape change', 'No change'],
        answer: 1,
        explain: 'Cooking egg changes proteins in ways that do not reverse easily.'
      }
    ],
    nextLink: 'chemistry-year-5-particles-kids.html'
  },
  {
    file: 'chemistry-year-5-particles-kids.html',
    year: 'Year 5',
    age: 'Ages 9-11',
    emoji: '⚛️',
    hero: 'Particle Detective Academy',
    subtitle: 'What Matter Looks Like Up Close',
    gradient: 'linear-gradient(140deg,#e9f4ff 0%,#d7eaff 45%,#ebfff2 100%)',
    badge: 'Chemistry · Year 5',
    topicLabel: 'Particle model and state changes',
    intro: [
      'Detective Nova shrinks to particle size to solve the Matter Mystery.',
      'You will compare how particles move in solids, liquids, and gases.',
      'Then you will connect particle movement to heating and cooling.'
    ],
    chapters: [
      {
        badge: 'Chapter 1',
        title: 'Particles in Solids',
        paragraphs: [
          'In solids, particles are tightly packed and mostly vibrate in place.',
          'Strong attraction keeps them close together.',
          'This helps solids keep a fixed shape.'
        ],
        artEmoji: '🧱',
        artTitle: 'Packed particle map',
        artFacts: [
          'Close-packed arrangement.',
          'Low freedom to move around.',
          'Shape remains stable.'
        ],
        visualIcons: ['🔵', '🔵', '🔵']
      },
      {
        badge: 'Chapter 2',
        title: 'Particles in Liquids',
        paragraphs: [
          'In liquids, particles are close but can slide past one another.',
          'That is why liquids flow and take container shape.',
          'Particles still attract each other, but less rigidly than solids.'
        ],
        artEmoji: '💧',
        artTitle: 'Sliding particle map',
        artFacts: [
          'Close but mobile.',
          'Flow behavior.',
          'No fixed shape.'
        ],
        visualIcons: ['🔵', '↔️', '🔵']
      },
      {
        badge: 'Chapter 3',
        title: 'Particles in Gases',
        paragraphs: [
          'Gas particles are far apart and move rapidly in all directions.',
          'They collide with container walls and spread to fill space.',
          'This explains gas pressure and expansion.'
        ],
        artEmoji: '☁️',
        artTitle: 'Fast particle map',
        artFacts: [
          'Far apart spacing.',
          'High movement freedom.',
          'Fills available space.'
        ],
        visualIcons: ['🔵', '💨', '🔵']
      },
      {
        badge: 'Chapter 4',
        title: 'Energy and State Change',
        paragraphs: [
          'Heating gives particles more kinetic energy, so they move faster.',
          'Cooling removes energy, so particles slow and come closer.',
          'State changes can be explained using this particle-energy idea.'
        ],
        artEmoji: '🌡️',
        artTitle: 'Energy link',
        artFacts: [
          'Heat ↑ particle speed.',
          'Cooling ↓ particle speed.',
          'Movement affects state.'
        ],
        visualIcons: ['🔥', '🔵', '❄️']
      }
    ],
    useCases: [
      {
        icon: '🚗',
        title: 'Tyre Pressure',
        text: 'Gas particles move faster when warm, changing pressure inside tyres.'
      },
      {
        icon: '🧊',
        title: 'Freezer Storage',
        text: 'Cooling slows particles and helps preserve food quality.'
      },
      {
        icon: '🧴',
        title: 'Perfume Spread',
        text: 'Gas particles spread out, so smells travel across a room.'
      }
    ],
    activity: {
      title: 'Particle Role Play',
      materials: ['Open space', '3 labels: solid, liquid, gas', 'Notebook'],
      steps: [
        'Stand shoulder-to-shoulder and vibrate gently as “solid particles”.',
        'Move slowly around each other as “liquid particles”.',
        'Spread out and move faster as “gas particles”.',
        'Discuss how movement changed in each model.'
      ],
      safety: 'Move carefully and leave safe space between students.'
    },
    flowTitle: 'Particle Model Logic',
    flowSteps: [
      { icon: '📍', label: 'Arrangement', detail: 'How close are particles?' },
      { icon: '🏃', label: 'Movement', detail: 'How freely do they move?' },
      { icon: '🌡️', label: 'Energy', detail: 'Heat or cooling effect' },
      { icon: '🧪', label: 'State', detail: 'Solid, liquid, or gas' }
    ],
    vocabulary: [
      { term: 'Particle model', meaning: 'Matter made of tiny moving particles.', example: 'All states can be explained with particles.' },
      { term: 'Kinetic energy', meaning: 'Energy of movement.', example: 'Heating increases particle kinetic energy.' },
      { term: 'Attraction', meaning: 'Pull between particles.', example: 'Stronger in solids than gases.' },
      { term: 'Pressure', meaning: 'Force from particle collisions.', example: 'Gas pressure rises in warm conditions.' },
      { term: 'Expand', meaning: 'Take up more space.', example: 'Gases expand when heated.' }
    ],
    definitionSpotlight: 'The particle model explains matter as tiny particles that move and interact.',
    equationSpotlight: 'More heat -> Faster particles -> Possible state change',
    practice: [
      {
        question: 'Why do solids keep shape at particle level?',
        answer: 'Particles are tightly packed and cannot move freely past each other.'
      },
      {
        question: 'How does heating affect gas particles?',
        answer: 'They move faster and collide more strongly.'
      },
      {
        question: 'Why can liquid be poured?',
        answer: 'Liquid particles can slide past each other while staying close.'
      }
    ],
    quiz: [
      {
        q: 'In solids, particles are usually...',
        emoji: '🧱',
        options: ['Far apart and fast', 'Close and mostly fixed', 'Only in liquid form', 'Invisible and not moving'],
        answer: 1,
        explain: 'Solid particles are packed closely and mostly vibrate in place.'
      },
      {
        q: 'Liquids can flow because particles...',
        emoji: '💧',
        options: ['Disappear', 'Are locked rigidly', 'Slide past one another', 'Turn into light'],
        answer: 2,
        explain: 'Liquid particles remain close but can move around each other.'
      },
      {
        q: 'Gas particles are best described as...',
        emoji: '☁️',
        options: ['Tightly locked', 'Far apart and moving freely', 'Stuck to bottom', 'Not real'],
        answer: 1,
        explain: 'Gases have particles far apart with high freedom of movement.'
      },
      {
        q: 'Heating generally makes particles...',
        emoji: '🔥',
        options: ['Move slower', 'Stop moving', 'Move faster', 'Become heavier'],
        answer: 2,
        explain: 'Heating increases particle kinetic energy, so motion speeds up.'
      },
      {
        q: 'Particle collisions in gases help explain...',
        emoji: '🎈',
        options: ['Pressure', 'Color only', 'Sound only', 'Mass loss'],
        answer: 0,
        explain: 'Gas pressure comes from particle collisions with surfaces.'
      }
    ],
    nextLink: 'chemistry-year-6-matter-kids.html'
  },
  {
    file: 'chemistry-year-6-matter-kids.html',
    year: 'Year 6',
    age: 'Ages 10-12',
    emoji: '🧪',
    hero: 'Matter Mystery Investigators',
    subtitle: 'Physical vs Chemical Changes and Conservation',
    gradient: 'linear-gradient(140deg,#ffe8ef 0%,#ffd7e3 45%,#fff0cf 100%)',
    badge: 'Chemistry · Year 6',
    topicLabel: 'Physical vs chemical changes; conservation of matter',
    intro: [
      'Team Catalyst investigates mystery events: rusting bikes, fizzing tablets, melting wax, and burning wood.',
      'Your mission is to classify each change with evidence, not guessing.',
      'You will also test the idea that matter is conserved in closed systems.'
    ],
    chapters: [
      {
        badge: 'Chapter 1',
        title: 'Physical vs Chemical Change',
        paragraphs: [
          'Physical changes alter form or state but keep the same substance.',
          'Chemical changes form one or more new substances.',
          'Correct classification depends on evidence from observations.'
        ],
        artEmoji: '⚖️',
        artTitle: 'Two change types',
        artFacts: [
          'Physical: shape/state change.',
          'Chemical: new substance forms.',
          'Use clues, not guesses.'
        ],
        visualIcons: ['🧊', '🔥', '🧪']
      },
      {
        badge: 'Chapter 2',
        title: 'Signs of Chemical Change',
        paragraphs: [
          'Look for clue signals: fizzing bubbles (gas), surprise color shifts, temperature jumps or drops, and a new solid forming (precipitate).',
          'One clue is a hint, not full proof. Strong scientists combine multiple observations before deciding.',
          'Rusting is a classic chemical change: iron reacts with oxygen to form a brand-new substance called iron oxide (rust).'
        ],
        artEmoji: '🔬',
        artTitle: 'Evidence clues',
        artFacts: [
          'Gas bubbles can be a clue.',
          'Permanent color change can be a clue.',
          'New material confirms chemical change.'
        ],
        visualIcons: ['🫧', '🎨', '🧱']
      },
      {
        badge: 'Chapter 3',
        title: 'Conservation of Matter',
        paragraphs: [
          'In a closed system, total matter stays constant even when reactions occur.',
          'Mass may seem to change in open systems because gas enters or leaves.',
          'Careful measurement and controlled conditions are important.'
        ],
        artEmoji: '⚛️',
        artTitle: 'Mass accounting',
        artFacts: [
          'Matter is rearranged, not destroyed.',
          'Closed system gives better totals.',
          'Measurement errors can mislead.'
        ],
        visualIcons: ['⚖️', '📦', '🧮']
      },
      {
        badge: 'Chapter 4',
        title: 'Think Like an Investigator',
        paragraphs: [
          'Good scientists record procedure, observations, and evidence-based conclusions.',
          'Use statements like: “I classify this as chemical because...”',
          'Clear reasoning matters more than fancy words.'
        ],
        artEmoji: '🕵️',
        artTitle: 'Investigation protocol',
        artFacts: [
          'Observe carefully.',
          'Record clearly.',
          'Conclude with evidence.'
        ],
        visualIcons: ['📝', '🔎', '✅']
      }
    ],
    useCases: [
      {
        icon: '♻️',
        title: 'Recycling Decisions',
        text: 'Knowing physical vs chemical change helps choose recycling or disposal methods.'
      },
      {
        icon: '🍳',
        title: 'Food Science',
        text: 'Cooking often uses chemical changes to create flavor and texture.'
      },
      {
        icon: '🏭',
        title: 'Industrial Safety',
        text: 'Factories monitor reactions and mass flow to control processes safely.'
      }
    ],
    activity: {
      title: 'Change Classifier Casebook',
      materials: ['Notebook', 'Example list: melting wax, rusting nail, burning wood, tearing paper'],
      steps: [
        'Create two columns: physical and chemical.',
        'Classify each example with one sentence of evidence.',
        'Mark whether new substance forms.',
        'Discuss what would happen in a closed container setup.'
      ],
      safety: 'Discuss hazardous examples as theory only unless supervised in school labs.'
    },
    flowTitle: 'Investigation Decision Path',
    flowSteps: [
      { icon: '👀', label: 'Observe', detail: 'What changed?' },
      { icon: '🧾', label: 'Evidence', detail: 'Any new substance clues?' },
      { icon: '⚖️', label: 'Conservation', detail: 'What happens to total matter?' },
      { icon: '✅', label: 'Conclude', detail: 'Physical or chemical?' }
    ],
    vocabulary: [
      { term: 'Chemical change', meaning: 'Change that creates new substances.', example: 'Rusting iron.' },
      { term: 'Physical change', meaning: 'Change in form/state without new substance.', example: 'Melting wax.' },
      { term: 'Conservation of matter', meaning: 'Total matter remains constant in a closed system.', example: 'Reaction mass balance in sealed flask.' },
      { term: 'Reactant', meaning: 'Starting substance in a reaction.', example: 'Iron is a reactant in rusting.' },
      { term: 'Product', meaning: 'New substance formed.', example: 'Rust is a product.' }
    ],
    definitionSpotlight: 'A chemical change forms new substances, while a physical change does not.',
    equationSpotlight: 'Reactants -> Products (new substance); in a closed system mass before = mass after',
    practice: [
      {
        question: 'Why can open systems appear to lose mass?',
        answer: 'Gas can escape, so measured mass in container may drop.'
      },
      {
        question: 'Give one clue for chemical change.',
        answer: 'Formation of gas, precipitate, or new persistent substance.'
      },
      {
        question: 'Classify dissolving sugar in water.',
        answer: 'Typically physical change; no new substance formed.'
      }
    ],
    quiz: [
      {
        q: 'Which example is a chemical change?',
        emoji: '🧪',
        options: ['Crushing can', 'Melting ice', 'Rusting iron', 'Boiling water'],
        answer: 2,
        explain: 'Rusting forms a new substance (iron oxide), so it is chemical.'
      },
      {
        q: 'Which is usually a physical change?',
        emoji: '🧊',
        options: ['Burning paper', 'Melting wax', 'Cooking egg', 'Rusting nail'],
        answer: 1,
        explain: 'Melting wax changes state but not substance.'
      },
      {
        q: 'Conservation of matter means...',
        emoji: '⚖️',
        options: ['Matter vanishes', 'Matter is created from nothing', 'Total matter is constant in closed system', 'Only solids conserve'],
        answer: 2,
        explain: 'Matter is rearranged, not created or destroyed, in closed systems.'
      },
      {
        q: 'A strong clue of chemical change is...',
        emoji: '🫧',
        options: ['Object moved', 'Temperature and gas formation with new substance', 'Shape change only', 'Container color'],
        answer: 1,
        explain: 'Combined evidence of new substance and reaction clues supports chemical change.'
      },
      {
        q: 'Why are closed systems useful in experiments?',
        emoji: '📦',
        options: ['They hide data', 'They prevent matter from leaving/entering', 'They look better', 'They reduce temperature always'],
        answer: 1,
        explain: 'Closed systems help track total matter more accurately.'
      }
    ],
    nextLink: 'index.html#chemistry-lab'
  }
];

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderList(items) {
  return items.map((item) => `<li>${esc(item)}</li>`).join('');
}

function renderSceneIcons(icons) {
  return icons
    .map((icon) => `<span class="scene-icon">${esc(icon)}</span>`)
    .join('');
}

function renderUseCases(items) {
  return items
    .map(
      (item) =>
        `<article class="use-case-card"><div class="use-case-icon">${esc(item.icon)}</div><h4>${esc(item.title)}</h4><p>${esc(item.text)}</p></article>`
    )
    .join('');
}

function renderFlowSteps(steps) {
  return steps
    .map(
      (step, idx) =>
        `<div class="flow-step"><div class="flow-index">${idx + 1}</div><div class="flow-icon">${esc(step.icon)}</div><div class="flow-label">${esc(step.label)}</div><div class="flow-detail">${esc(step.detail)}</div></div>`
    )
    .join('');
}

function renderVocabulary(rows) {
  return rows
    .map(
      (row) =>
        `<tr><td class="word-term">${esc(row.term)}</td><td class="word-definition">${esc(row.meaning)}</td><td class="word-example">${esc(row.example)}</td></tr>`
    )
    .join('');
}

function renderPractice(items) {
  return items
    .map(
      (item, idx) =>
        `<div class="practice-card"><h4>Try ${idx + 1}</h4><p class="practice-q">${esc(item.question)}</p><p class="practice-a"><strong>Hint answer:</strong> ${esc(item.answer)}</p></div>`
    )
    .join('');
}

function renderChapterPages(chapters) {
  return chapters
    .map(
      (chapter, idx) => `
    <section class="page">
      <div class="story-page">
        <div class="page-corner">p.${idx + 2}</div>
        <div class="story-header"><span class="chapter-badge">${esc(chapter.badge)}</span><h2 class="story-title">${esc(chapter.title)}</h2></div>
        <div class="story-body">
          <div class="story-text" data-tts>
            ${chapter.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}
          </div>
          <aside class="story-art">
            <div class="art-emoji">${esc(chapter.artEmoji)}</div>
            <div class="art-title">${esc(chapter.artTitle)}</div>
            <div class="art-facts">${chapter.artFacts
              .map((fact) => `<div class="fact-row">${esc(fact)}</div>`)
              .join('')}</div>
            <div class="scene-strip">${renderSceneIcons(chapter.visualIcons)}</div>
          </aside>
        </div>
      </div>
    </section>`
    )
    .join('');
}

function quizJSON(quiz) {
  return JSON.stringify(quiz).replace(/</g, '\\u003c');
}

function renderPage(s) {
  const chapterPages = renderChapterPages(s.chapters);
  const totalPages = s.chapters.length + 8;
  const nextHref = s.nextLink;
  const nextText = nextHref.indexOf('chemistry-') === 0 ? 'Open Next Chemistry Story' : 'Back to Chemistry Story Shelf';
  const warningText = 'Dont try any expiremetns by your own , try it with only help of your teachers or parents superivsion';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(s.hero)} | FiveToFifteen</title>
  <meta name="description" content="${esc(s.year)} chemistry story for kids covering ${esc(s.topicLabel)} with diagrams, activities, and quizzes." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <style>
    :root {
      --dark: #2b335a;
      --card: #fffefb;
      --bg: #f6fbff;
      --navy: #4263eb;
      --sky: #38bdf8;
      --mint: #22b8a7;
      --sun: #ffb703;
      --violet: #7c3aed;
      --pink: #ff5d8f;
      --line: #d9e6fb;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Nunito', sans-serif;
      background: var(--bg);
      min-height: 100vh;
      overflow-x: hidden;
      color: #33425e;
    }
    .floaty {
      position: fixed;
      opacity: .09;
      z-index: 0;
      pointer-events: none;
      animation: drift linear infinite;
      font-size: 1.2rem;
    }
    @keyframes drift {
      from { transform: translateX(-120px); }
      to { transform: translateX(calc(100vw + 120px)); }
    }
    #app {
      position: relative;
      z-index: 1;
      max-width: 900px;
      margin: 0 auto;
      padding: 12px;
    }
    .home-link {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: linear-gradient(135deg, #14b8a6, #0ea5e9);
      color: #fff;
      font-family: 'Fredoka One', cursive;
      font-size: 0.83rem;
      padding: 7px 16px;
      border-radius: 999px;
      text-decoration: none;
      margin-bottom: 10px;
      box-shadow: 0 8px 16px rgba(14, 165, 233, .2);
    }
    .tts-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }
    .tts-btn,
    .tts-stop {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border: none;
      color: #fff;
      font-family: 'Fredoka One', cursive;
      font-size: 0.8rem;
      padding: 7px 14px;
      border-radius: 999px;
      cursor: pointer;
    }
    .tts-btn { background: linear-gradient(135deg, var(--navy), var(--violet)); }
    .tts-stop { background: linear-gradient(135deg, #8f9aad, #72809a); }
    .progress-strip {
      background: #fff;
      border-radius: 13px;
      border: 2px solid var(--line);
      padding: 8px 12px;
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
      box-shadow: 0 2px 12px rgba(23, 39, 75, .07);
    }
    .progress-label {
      font-family: 'Fredoka One', cursive;
      font-size: .74rem;
      color: #7283a2;
      white-space: nowrap;
    }
    .progress-bar {
      flex: 1;
      height: 8px;
      border-radius: 999px;
      background: #e1e9fb;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      width: 0;
      border-radius: inherit;
      background: linear-gradient(90deg, var(--mint), var(--navy), var(--pink));
      transition: width .4s ease;
    }
    .nav-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      background: #fff;
      border-radius: 16px;
      margin-bottom: 10px;
      border: 2px solid var(--line);
      box-shadow: 0 2px 12px rgba(23, 39, 75, .07);
      gap: 10px;
    }
    .nav-btn {
      background: var(--navy);
      color: #fff;
      border: none;
      border-radius: 999px;
      font-family: 'Fredoka One', cursive;
      font-size: .92rem;
      min-height: 40px;
      padding: 8px 16px;
      cursor: pointer;
    }
    .nav-btn:disabled {
      background: #d1d9ec;
      color: #7b87a0;
      cursor: not-allowed;
    }
    .page-dots {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
      justify-content: center;
      max-width: 300px;
    }
    .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #d4ddf2;
      border: none;
      cursor: pointer;
      padding: 0;
    }
    .dot.active {
      background: var(--navy);
      transform: scale(1.15);
      box-shadow: 0 0 0 2px rgba(66, 99, 235, .2);
    }
    .dot.visited {
      background: #aebce8;
    }
    .page { display: none; animation: pageIn .45s ease; }
    .page.active { display: block; }
    @keyframes pageIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .cover {
      background: ${s.gradient};
      border-radius: 24px;
      border: 2px solid rgba(255, 255, 255, .42);
      min-height: 560px;
      padding: 36px 26px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      box-shadow: 0 18px 36px rgba(45, 65, 112, .18);
    }
    .cover::before {
      content: '';
      position: absolute;
      width: 320px;
      height: 320px;
      border-radius: 50%;
      background: rgba(255, 255, 255, .2);
      top: -120px;
      left: -90px;
      pointer-events: none;
    }
    .cover::after {
      content: '';
      position: absolute;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: rgba(255, 255, 255, .16);
      bottom: -120px;
      right: -70px;
      pointer-events: none;
    }
    .hero-emoji {
      font-size: 64px;
      margin-bottom: 12px;
      filter: drop-shadow(0 8px 15px rgba(0, 0, 0, .16));
      z-index: 1;
    }
    .cover-badge {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      border-radius: 999px;
      border: 1.5px solid rgba(255, 255, 255, .6);
      background: rgba(255, 255, 255, .45);
      color: #2b476c;
      font-size: .8rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: .35px;
      padding: 7px 13px;
      margin-bottom: 14px;
      z-index: 1;
    }
    .cover-title {
      font-family: 'Fredoka One', cursive;
      color: #203a58;
      font-size: clamp(1.85rem, 5.2vw, 2.7rem);
      line-height: 1.16;
      margin-bottom: 8px;
      z-index: 1;
    }
    .cover-sub {
      color: #2d5278;
      font-size: 1rem;
      font-weight: 800;
      max-width: 690px;
      line-height: 1.65;
      z-index: 1;
    }
    .cover-icons {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 18px;
      z-index: 1;
    }
    .cover-icons span {
      font-size: 1.7rem;
      background: rgba(255, 255, 255, .44);
      border: 1px solid rgba(255, 255, 255, .6);
      border-radius: 13px;
      padding: 6px 10px;
    }
    .story-page,
    .quiz-page,
    .result-page {
      background: var(--card);
      border-radius: 22px;
      border: 2px solid var(--line);
      min-height: 560px;
      padding: 24px;
      box-shadow: 0 4px 20px rgba(27, 38, 70, .08);
      position: relative;
      overflow: hidden;
    }
    .page-corner {
      position: absolute;
      top: 14px;
      right: 18px;
      font-family: 'Fredoka One', cursive;
      color: #a0acc6;
      font-size: .83rem;
    }
    .story-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 14px;
      flex-wrap: wrap;
    }
    .chapter-badge {
      font-family: 'Fredoka One', cursive;
      font-size: .72rem;
      border-radius: 999px;
      padding: 6px 12px;
      background: #eaf2ff;
      border: 1px solid #ccdcfa;
      color: #385f95;
      text-transform: uppercase;
      letter-spacing: .4px;
    }
    .story-title {
      font-family: 'Fredoka One', cursive;
      color: var(--dark);
      font-size: 1.38rem;
      line-height: 1.3;
    }
    .story-body {
      display: grid;
      grid-template-columns: 1.1fr .9fr;
      gap: 16px;
      align-items: start;
    }
    .story-text {
      color: #435676;
      font-size: .98rem;
      line-height: 1.72;
    }
    .story-text p + p { margin-top: 9px; }
    .highlight { color: #234eb4; font-weight: 900; }
    .story-art {
      border-radius: 16px;
      border: 1.5px dashed #c6d8f0;
      background: linear-gradient(145deg, #f8fbff, #eff5ff);
      padding: 14px;
      display: grid;
      gap: 8px;
    }
    .art-emoji {
      font-size: 2.45rem;
      text-align: center;
    }
    .art-title {
      font-family: 'Fredoka One', cursive;
      font-size: .9rem;
      color: #48668f;
      text-align: center;
    }
    .art-facts {
      display: grid;
      gap: 7px;
    }
    .fact-row {
      border: 1px solid #d8e4f8;
      border-radius: 10px;
      background: #fff;
      font-size: .86rem;
      color: #4d6388;
      font-weight: 700;
      line-height: 1.45;
      padding: 7px 10px;
    }
    .scene-strip {
      display: flex;
      justify-content: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 4px;
    }
    .scene-icon {
      font-size: 1.3rem;
      border-radius: 10px;
      border: 1px solid #d7e5fb;
      background: #fff;
      min-width: 37px;
      min-height: 37px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
    }
    .mission-card {
      margin-top: 12px;
      border-radius: 14px;
      border: 1.5px solid #caece0;
      background: linear-gradient(135deg, #edfff7, #f5fff8);
      padding: 14px;
    }
    .global-warning {
      margin-bottom: 10px;
      border-radius: 13px;
      border: 2px solid #f59e0b;
      background: linear-gradient(145deg, #fff8e6, #fff2d8);
      color: #7a4b0b;
      font-size: .9rem;
      line-height: 1.55;
      font-weight: 900;
      padding: 10px 12px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(245, 158, 11, .16);
    }
    .mission-title {
      font-family: 'Fredoka One', cursive;
      color: #0f766e;
      font-size: 1rem;
      margin-bottom: 8px;
    }
    .mission-list {
      padding-left: 18px;
      color: #376966;
      font-size: .93rem;
      line-height: 1.66;
      font-weight: 700;
    }
    .use-case-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
      margin-top: 10px;
    }
    .use-case-card {
      border-radius: 14px;
      border: 1.5px solid #d9e4f8;
      background: linear-gradient(160deg, #fff, #f7fbff);
      padding: 12px;
      text-align: center;
    }
    .use-case-icon {
      font-size: 1.65rem;
      margin-bottom: 6px;
    }
    .use-case-card h4 {
      font-family: 'Fredoka One', cursive;
      color: #2e4769;
      font-size: .92rem;
      margin-bottom: 6px;
    }
    .use-case-card p {
      color: #4d6387;
      font-size: .86rem;
      line-height: 1.52;
      font-weight: 700;
    }
    .activity-wrap {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-top: 10px;
    }
    .activity-card {
      border-radius: 14px;
      border: 1.5px solid #d6e4fa;
      background: #fff;
      padding: 12px;
    }
    .activity-card h4 {
      font-family: 'Fredoka One', cursive;
      color: #324b73;
      font-size: .92rem;
      margin-bottom: 8px;
    }
    .activity-card ul,
    .activity-card ol {
      padding-left: 18px;
      color: #4e6285;
      font-size: .9rem;
      line-height: 1.58;
      font-weight: 700;
    }
    .safety-note {
      margin-top: 10px;
      border-radius: 12px;
      border: 1.5px solid #ffdca8;
      background: #fff8ea;
      color: #7a5727;
      font-size: .88rem;
      line-height: 1.55;
      font-weight: 800;
      padding: 10px 12px;
    }
    .flow-title {
      font-family: 'Fredoka One', cursive;
      color: #2f4d78;
      font-size: 1.12rem;
      margin-bottom: 10px;
    }
    .flow-diagram {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 9px;
      margin-top: 8px;
    }
    .flow-step {
      border-radius: 14px;
      border: 1.5px solid #d5e2fa;
      background: linear-gradient(160deg, #fff, #f5f9ff);
      padding: 12px 10px;
      text-align: center;
      position: relative;
    }
    .flow-step:not(:last-child)::after {
      content: '➜';
      position: absolute;
      right: -11px;
      top: 50%;
      transform: translateY(-50%);
      color: #9eb3dd;
      font-size: 1rem;
      font-weight: 900;
    }
    .flow-index {
      position: absolute;
      left: 8px;
      top: 7px;
      font-family: 'Fredoka One', cursive;
      font-size: .7rem;
      color: #92a5cc;
    }
    .flow-icon {
      font-size: 1.35rem;
      margin-bottom: 5px;
    }
    .flow-label {
      font-family: 'Fredoka One', cursive;
      color: #34507c;
      font-size: .86rem;
      margin-bottom: 3px;
    }
    .flow-detail {
      font-size: .8rem;
      color: #617698;
      font-weight: 700;
      line-height: 1.45;
    }
    .definition-callout,
    .equation-callout {
      border-radius: 13px;
      border: 1.5px solid;
      padding: 10px 12px;
      margin-top: 10px;
      font-size: .9rem;
      line-height: 1.55;
      font-weight: 800;
    }
    .definition-callout {
      background: #ecfdf5;
      border-color: #6ee7b7;
      color: #065f46;
    }
    .equation-callout {
      background: #fff1f2;
      border-color: #fda4af;
      color: #9f1239;
    }
    .definition-label,
    .equation-label {
      font-family: 'Fredoka One', cursive;
      font-size: .82rem;
      letter-spacing: .2px;
      display: block;
      margin-bottom: 4px;
    }
    .equation-text {
      font-family: 'Courier New', Consolas, monospace;
      font-size: .9rem;
      font-weight: 700;
    }
    .vocab-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      border-radius: 12px;
      overflow: hidden;
      border: 1.5px solid #d6e3fa;
    }
    .vocab-table th,
    .vocab-table td {
      border-bottom: 1px solid #e3ecfb;
      padding: 9px 10px;
      text-align: left;
      vertical-align: top;
      font-size: .86rem;
      line-height: 1.5;
    }
    .vocab-table th {
      background: #eef4ff;
      color: #345481;
      font-family: 'Fredoka One', cursive;
      font-size: .78rem;
      letter-spacing: .2px;
    }
    .vocab-table td {
      color: #4a6084;
      font-weight: 700;
      background: #fff;
    }
    .vocab-table td.word-term {
      color: #2f4f79;
      font-weight: 900;
    }
    .vocab-table td.word-definition {
      color: #0f766e;
      background: #f0fdf4;
    }
    .vocab-table td.word-example {
      color: #9f1239;
      background: #fff1f2;
    }
    .practice-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
      margin-top: 12px;
    }
    .practice-card {
      border-radius: 13px;
      border: 1.5px solid #d7e4fa;
      background: #fff;
      padding: 10px;
    }
    .practice-card h4 {
      font-family: 'Fredoka One', cursive;
      color: #2f507e;
      font-size: .83rem;
      margin-bottom: 6px;
    }
    .practice-q {
      color: #455c82;
      font-size: .84rem;
      line-height: 1.48;
      font-weight: 800;
      margin-bottom: 7px;
    }
    .practice-a {
      color: #5c7092;
      font-size: .8rem;
      line-height: 1.5;
      font-weight: 700;
    }
    .quiz-progress-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      margin-bottom: 14px;
      flex-wrap: wrap;
    }
    .q-counter,
    .q-score-badge {
      font-family: 'Fredoka One', cursive;
      font-size: .8rem;
      border-radius: 999px;
      padding: 6px 12px;
    }
    .q-counter {
      color: #5f7396;
      background: #edf3ff;
      border: 1.5px solid #cfdcf8;
    }
    .q-score-badge {
      color: #354f78;
      background: #f0f9ff;
      border: 1.5px solid #bfe8ff;
    }
    .quiz-question-card {
      border-radius: 16px;
      border: 1.5px solid #d8e5fb;
      background: #fff;
      padding: 16px;
      margin-bottom: 10px;
    }
    .quiz-q-emoji {
      font-size: 2.4rem;
      margin-bottom: 8px;
    }
    .quiz-q-text {
      font-family: 'Fredoka One', cursive;
      color: #2d4468;
      font-size: 1.12rem;
      line-height: 1.35;
    }
    .quiz-options {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .quiz-option {
      border: 1.5px solid #d7e3fa;
      background: #fff;
      border-radius: 12px;
      color: #3e567d;
      font: 800 .9rem 'Nunito', sans-serif;
      text-align: left;
      padding: 10px 12px;
      cursor: pointer;
      transition: background .2s ease;
    }
    .quiz-option:hover {
      background: #edf4ff;
    }
    .quiz-option.correct {
      background: #dff6e8;
      border-color: #7dcea0;
      color: #1d6b46;
    }
    .quiz-option.wrong {
      background: #ffe9e8;
      border-color: #f3a3a3;
      color: #872f2f;
    }
    .quiz-option.locked {
      cursor: not-allowed;
      opacity: .78;
    }
    .quiz-feedback {
      min-height: 24px;
      margin-top: 10px;
      color: #3f5f8a;
      font-size: .92rem;
      line-height: 1.5;
      font-weight: 800;
    }
    .next-q-btn {
      display: none;
      margin: 10px auto 0;
      border: none;
      border-radius: 999px;
      background: linear-gradient(135deg, var(--navy), var(--violet));
      color: #fff;
      font-family: 'Fredoka One', cursive;
      font-size: .92rem;
      padding: 9px 20px;
      cursor: pointer;
    }
    .quiz-result {
      display: none;
      text-align: center;
      border-radius: 16px;
      border: 1.5px solid #d6e3fa;
      background: #fff;
      padding: 22px 14px;
      margin-top: 8px;
    }
    .quiz-result .emoji {
      font-size: 3rem;
      margin-bottom: 8px;
    }
    .quiz-result h3 {
      font-family: 'Fredoka One', cursive;
      color: #304f79;
      font-size: 1.3rem;
      margin-bottom: 6px;
    }
    .quiz-result .score {
      font-family: 'Fredoka One', cursive;
      color: #f59e0b;
      font-size: 2rem;
      margin-bottom: 8px;
    }
    .quiz-result p {
      color: #51698c;
      font-size: .95rem;
      line-height: 1.6;
      font-weight: 800;
    }
    .retry-btn {
      margin-top: 12px;
      border: none;
      border-radius: 999px;
      background: linear-gradient(135deg, #ef4444, #fb7185);
      color: #fff;
      font-family: 'Fredoka One', cursive;
      font-size: .86rem;
      padding: 8px 16px;
      cursor: pointer;
    }
    .recap-grid {
      margin-top: 12px;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
    }
    .recap-item {
      border-radius: 14px;
      border: 1.5px solid #d5e2fa;
      background: #f7fbff;
      padding: 11px;
      text-align: center;
      color: #496180;
      font-size: .87rem;
      line-height: 1.5;
      font-weight: 700;
    }
    .recap-item strong {
      display: block;
      font-family: 'Fredoka One', cursive;
      color: #29496f;
      font-size: .92rem;
      margin-bottom: 4px;
    }
    .next-link-box {
      margin-top: 14px;
      border-radius: 14px;
      border: 1.5px solid #caede0;
      background: linear-gradient(140deg, #ecfff8, #f8fffc);
      padding: 13px;
    }
    .next-link-box p {
      color: #3f6372;
      line-height: 1.58;
      font-weight: 800;
      font-size: .93rem;
    }
    .next-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
      text-decoration: none;
      font-family: 'Fredoka One', cursive;
      font-size: .87rem;
      color: #0f766e;
    }
    @media (max-width: 760px) {
      .story-body,
      .activity-wrap {
        grid-template-columns: 1fr;
      }
      .use-case-grid,
      .practice-grid,
      .recap-grid,
      .flow-diagram {
        grid-template-columns: 1fr;
      }
      .flow-step::after { display: none; }
      .quiz-options { grid-template-columns: 1fr; }
      .nav-bar { flex-wrap: wrap; justify-content: center; }
    }
  </style>
  <script src="analytics.js" defer></script>
  <script src="site-drawer.js" defer></script>
  <script src="page-share.js" defer></script>
  <script src="natural-read-aloud.js" defer></script>
  <script src="slim-topbar.js" defer></script>
</head>
<body>
  <div class="floaty" style="top:9%;animation-duration:24s;animation-delay:0s;">🧪</div>
  <div class="floaty" style="top:24%;animation-duration:30s;animation-delay:2s;">⚗️</div>
  <div class="floaty" style="top:43%;animation-duration:27s;animation-delay:4s;">🔬</div>
  <div class="floaty" style="top:63%;animation-duration:31s;animation-delay:1s;">🫧</div>
  <div class="floaty" style="top:82%;animation-duration:26s;animation-delay:3s;">⚛️</div>

  <main id="app">
    <a class="home-link" href="index.html#chemistry-lab">🧪 Back to Chemistry Stories</a>

    <div class="tts-bar">
      <button class="tts-btn" id="ttsBtn" onclick="toggleReadAloud()">🔊 Read Aloud</button>
      <button class="tts-stop" id="ttsStop" onclick="stopReadAloud()" style="display:none;">⏹ Stop</button>
    </div>

    <div class="progress-strip">
      <span class="progress-label">${esc(s.year)} Chemistry</span>
      <div class="progress-bar"><div class="progress-fill" id="progressFill"></div></div>
      <span class="progress-label" id="progressText">Page 1 of ${totalPages}</span>
    </div>

    <div class="nav-bar">
      <button class="nav-btn" id="prevBtn" disabled>← Back</button>
      <div class="page-dots" id="pageDots"></div>
      <button class="nav-btn" id="nextBtn">Next →</button>
    </div>
    <div class="global-warning">⚠️ ${esc(warningText)}</div>

    <section class="page active">
      <div class="cover">
        <div class="hero-emoji">${esc(s.emoji)}</div>
        <div class="cover-badge">${esc(s.badge)} · ${esc(s.age)}</div>
        <h1 class="cover-title">${esc(s.hero)}</h1>
        <p class="cover-sub">${esc(s.subtitle)}<br>${esc(s.topicLabel)}</p>
        <div class="cover-icons">
          <span>🧪</span><span>📘</span><span>🎯</span><span>🧠</span><span>✨</span>
        </div>
      </div>
    </section>

    <section class="page">
      <div class="story-page">
        <div class="page-corner">p.1</div>
        <div class="story-header"><span class="chapter-badge">Welcome</span><h2 class="story-title">Mission ${esc(s.year)} Chemistry</h2></div>
        <div class="story-body">
          <div class="story-text" data-tts>
            ${s.intro.map((p) => `<p>${esc(p)}</p>`).join('')}
            <p>We will use <span class="highlight">science words</span>, <span class="highlight">simple diagrams</span>, and <span class="highlight">real-life examples</span>.</p>
          </div>
          <aside class="story-art">
            <div class="art-emoji">${esc(s.emoji)}</div>
            <div class="art-title">Explorer briefing</div>
            <div class="art-facts">
              <div class="fact-row">Observe carefully and compare.</div>
              <div class="fact-row">Use topic words in full sentences.</div>
              <div class="fact-row">Connect each idea to daily life.</div>
            </div>
            <div class="scene-strip"><span class="scene-icon">🔍</span><span class="scene-icon">🧠</span><span class="scene-icon">✅</span></div>
          </aside>
        </div>
        <div class="mission-card">
          <div class="mission-title">Today's Mission Goals</div>
          <ol class="mission-list">
            <li>Understand the key chemistry concept for ${esc(s.year)}.</li>
            <li>Interpret diagrams and visual clues.</li>
            <li>Apply ideas to real situations.</li>
            <li>Complete a 5-question quiz challenge.</li>
          </ol>
        </div>
      </div>
    </section>

    ${chapterPages}

    <section class="page">
      <div class="story-page">
        <div class="page-corner">p.${s.chapters.length + 2}</div>
        <div class="story-header"><span class="chapter-badge">Real Life</span><h2 class="story-title">Why This Topic Matters</h2></div>
        <div class="story-text" data-tts>
          <p>These chemistry ideas are not only for exams. They are used in design, cooking, transport, weather, safety, and technology.</p>
          <p>When students ask “Why should I learn this?”, these examples give clear answers.</p>
        </div>
        <div class="use-case-grid">
          ${renderUseCases(s.useCases)}
        </div>
      </div>
    </section>

    <section class="page">
      <div class="story-page">
        <div class="page-corner">p.${s.chapters.length + 3}</div>
        <div class="story-header"><span class="chapter-badge">Activity</span><h2 class="story-title">${esc(s.activity.title)}</h2></div>
        <div class="activity-wrap">
          <div class="activity-card">
            <h4>Materials Needed</h4>
            <ul>${renderList(s.activity.materials)}</ul>
          </div>
          <div class="activity-card">
            <h4>Steps</h4>
            <ol>${renderList(s.activity.steps)}</ol>
          </div>
        </div>
        <div class="safety-note">🛡️ Safety note: ${esc(warningText)} ${esc(s.activity.safety)}</div>
      </div>
    </section>

    <section class="page">
      <div class="story-page">
        <div class="page-corner">p.${s.chapters.length + 4}</div>
        <div class="story-header"><span class="chapter-badge">Diagram</span><h2 class="story-title">${esc(s.flowTitle)}</h2></div>
        <p class="flow-title">Follow the flow and explain each step in your own words.</p>
        <div class="flow-diagram">
          ${renderFlowSteps(s.flowSteps)}
        </div>
      </div>
    </section>

    <section class="page">
      <div class="story-page">
        <div class="page-corner">p.${s.chapters.length + 5}</div>
        <div class="story-header"><span class="chapter-badge">Vocabulary + Practice</span><h2 class="story-title">Build Strong Chemistry Answers</h2></div>
        <div class="definition-callout">
          <span class="definition-label">Definition Spotlight</span>
          ${esc(s.definitionSpotlight)}
        </div>
        <div class="equation-callout">
          <span class="equation-label">Equation / Rule Spotlight</span>
          <span class="equation-text">${esc(s.equationSpotlight)}</span>
        </div>
        <table class="vocab-table">
          <thead>
            <tr><th>Word</th><th>Meaning</th><th>Example</th></tr>
          </thead>
          <tbody>
            ${renderVocabulary(s.vocabulary)}
          </tbody>
        </table>
        <div class="practice-grid">
          ${renderPractice(s.practice)}
        </div>
      </div>
    </section>

    <section class="page">
      <div class="quiz-page">
        <div class="page-corner">p.${s.chapters.length + 6}</div>
        <div class="story-header"><span class="chapter-badge">Quiz</span><h2 class="story-title">5-Question Chemistry Challenge</h2></div>
        <div id="quizPlayground">
          <div class="quiz-progress-row">
            <div class="q-counter" id="quizCounter">Question 1 of ${s.quiz.length}</div>
            <div class="q-score-badge" id="quizScoreBadge">Score: 0 / ${s.quiz.length}</div>
          </div>
          <div class="quiz-question-card">
            <div class="quiz-q-emoji" id="quizEmoji">🧪</div>
            <div class="quiz-q-text" id="quizQuestion"></div>
          </div>
          <div class="quiz-options" id="quizOptions"></div>
          <div class="quiz-feedback" id="quizFeedback"></div>
          <button class="next-q-btn" id="nextQuizBtn">Next Question →</button>
        </div>
        <div class="quiz-result" id="quizResult"></div>
      </div>
    </section>

    <section class="page">
      <div class="result-page">
        <div class="page-corner">p.${s.chapters.length + 7}</div>
        <div class="story-header"><span class="chapter-badge">Recap</span><h2 class="story-title">Mission Complete: ${esc(s.year)} Chemistry</h2></div>
        <div class="story-text" data-tts>
          <p>You completed this chemistry adventure with concepts, diagrams, examples, and quiz practice.</p>
          <p>Use your vocabulary words and evidence sentences when answering school questions.</p>
        </div>
        <div class="recap-grid">
          <div class="recap-item"><strong>Understand</strong>Know the core idea and key terms clearly.</div>
          <div class="recap-item"><strong>Apply</strong>Connect chemistry with homes, schools, weather, and design.</div>
          <div class="recap-item"><strong>Explain</strong>Give reasoned answers with evidence, not guesses.</div>
        </div>
        <div class="next-link-box">
          <p>Keep the momentum. Open the next chemistry story and continue your year-wise learning journey.</p>
          <a class="next-link" href="${esc(nextHref)}">➡️ ${esc(nextText)}</a>
          <br />
          <a class="next-link" href="index.html#chemistry-lab">🧪 Back to Chemistry Story Shelf</a>
        </div>
      </div>
    </section>
  </main>

  <script>
    (function () {
      var pages = Array.prototype.slice.call(document.querySelectorAll('.page'));
      var dotsWrap = document.getElementById('pageDots');
      var progressFill = document.getElementById('progressFill');
      var progressText = document.getElementById('progressText');
      var prevBtn = document.getElementById('prevBtn');
      var nextBtn = document.getElementById('nextBtn');
      var currentPage = 0;
      var visited = {};
      visited[0] = true;

      function renderDots() {
        dotsWrap.innerHTML = '';
        pages.forEach(function (_, idx) {
          var dot = document.createElement('button');
          dot.className = 'dot' + (idx === currentPage ? ' active' : '') + (visited[idx] ? ' visited' : '');
          dot.type = 'button';
          dot.addEventListener('click', function () { goTo(idx); });
          dotsWrap.appendChild(dot);
        });
      }

      function updateProgress() {
        var percent = Math.round(((currentPage + 1) / pages.length) * 100);
        progressFill.style.width = percent + '%';
        progressText.textContent = 'Page ' + (currentPage + 1) + ' of ' + pages.length;
      }

      function goTo(idx) {
        if (idx < 0 || idx >= pages.length) return;
        pages[currentPage].classList.remove('active');
        currentPage = idx;
        visited[idx] = true;
        pages[currentPage].classList.add('active');
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === pages.length - 1;
        renderDots();
        updateProgress();
      }

      prevBtn.addEventListener('click', function () { goTo(currentPage - 1); });
      nextBtn.addEventListener('click', function () { goTo(currentPage + 1); });

      var quizData = ${quizJSON(s.quiz)};
      var quizIndex = 0;
      var quizScore = 0;
      var locked = false;

      var quizCounter = document.getElementById('quizCounter');
      var quizScoreBadge = document.getElementById('quizScoreBadge');
      var quizEmoji = document.getElementById('quizEmoji');
      var quizQuestion = document.getElementById('quizQuestion');
      var quizOptions = document.getElementById('quizOptions');
      var quizFeedback = document.getElementById('quizFeedback');
      var nextQuizBtn = document.getElementById('nextQuizBtn');
      var quizResult = document.getElementById('quizResult');
      var quizPlayground = document.getElementById('quizPlayground');

      function updateQuizHeader() {
        quizCounter.textContent = 'Question ' + (quizIndex + 1) + ' of ' + quizData.length;
        quizScoreBadge.textContent = 'Score: ' + quizScore + ' / ' + quizData.length;
      }

      function renderQuizQuestion() {
        locked = false;
        quizFeedback.textContent = '';
        nextQuizBtn.style.display = 'none';

        var q = quizData[quizIndex];
        quizEmoji.textContent = q.emoji || '🧪';
        quizQuestion.textContent = q.q;
        quizOptions.innerHTML = '';

        q.options.forEach(function (optionText, optionIndex) {
          var btn = document.createElement('button');
          btn.className = 'quiz-option';
          btn.type = 'button';
          btn.textContent = optionText;
          btn.addEventListener('click', function () {
            if (locked) return;
            locked = true;

            var buttons = Array.prototype.slice.call(quizOptions.querySelectorAll('.quiz-option'));
            buttons.forEach(function (item) { item.classList.add('locked'); });

            if (optionIndex === q.answer) {
              btn.classList.add('correct');
              quizScore += 1;
              quizFeedback.textContent = '✅ Correct! ' + q.explain;
            } else {
              btn.classList.add('wrong');
              buttons[q.answer].classList.add('correct');
              quizFeedback.textContent = '🧠 Good try! ' + q.explain;
            }

            quizScoreBadge.textContent = 'Score: ' + quizScore + ' / ' + quizData.length;

            if (quizIndex < quizData.length - 1) {
              nextQuizBtn.style.display = 'inline-flex';
            } else {
              showQuizResult();
            }
          });
          quizOptions.appendChild(btn);
        });

        updateQuizHeader();
      }

      function showQuizResult() {
        quizPlayground.style.display = 'none';
        quizResult.style.display = 'block';

        var percent = Math.round((quizScore / quizData.length) * 100);
        var emoji = '🌟';
        var message = 'Great effort! Review the story once more to become a chemistry champion.';

        if (percent >= 90) {
          emoji = '🏆';
          message = 'Outstanding! You answered with strong chemistry understanding.';
        } else if (percent >= 70) {
          emoji = '🎉';
          message = 'Excellent work! You are building strong chemistry skills.';
        } else if (percent >= 50) {
          emoji = '👍';
          message = 'Nice progress! Revisit key pages and try again for an even better score.';
        }

        quizResult.innerHTML =
          '<div class="emoji">' + emoji + '</div>' +
          '<h3>Quiz Complete</h3>' +
          '<div class="score">' + quizScore + ' / ' + quizData.length + '</div>' +
          '<p>' + message + '</p>' +
          '<button class="retry-btn" type="button" id="retryQuizBtn">Retry Quiz</button>';

        document.getElementById('retryQuizBtn').addEventListener('click', resetQuiz);
      }

      function resetQuiz() {
        quizIndex = 0;
        quizScore = 0;
        quizResult.style.display = 'none';
        quizPlayground.style.display = 'block';
        renderQuizQuestion();
      }

      nextQuizBtn.addEventListener('click', function () {
        if (quizIndex < quizData.length - 1) {
          quizIndex += 1;
          renderQuizQuestion();
        }
      });

      renderDots();
      updateProgress();
      renderQuizQuestion();
    })();
  </script>
</body>
</html>`;
}

function run() {
  const cwd = process.cwd();
  stories.forEach((story) => {
    const outputPath = path.join(cwd, story.file);
    fs.writeFileSync(outputPath, renderPage(story));
  });
  console.log('Generated ' + stories.length + ' enhanced chemistry story pages.');
}

run();
