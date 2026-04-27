(function () {
  window.SELECTIVE_TOPIC_TOPICS = window.SELECTIVE_TOPIC_TOPICS || {};
  Object.assign(window.SELECTIVE_TOPIC_TOPICS, {
    'writing-narrative': {
      file: 'selective-writing-narrative.html',
      domain: 'writing',
      title: 'Narrative Writing',
      subtitle: 'Build a story with character, setting, conflict, and control',
      intro: 'Narrative writing is not about writing the biggest story — it is about writing the most controlled one. The best selective narratives are like a strong short film: a clear setting, one real problem, tension that builds, and an ending that lands. Students who plan for 2 minutes before writing almost always produce a better story than students who start immediately.',
      lesson: {
        theory: [
          {
            title: 'What narrative writing really is',
            text: 'Narrative writing is a story. You do not need a huge adventure. You need one character, one main problem, and one ending that feels complete. Think of it as a zoom lens: start close on one moment, not wide on an entire life.',
            visual: 'narrative-arc'
          },
          {
            title: 'How to approach the prompt',
            text: 'Ask 3 quick questions first: <mark>Who is the character?</mark> <mark>Where are they?</mark> <mark>What goes wrong?</mark> If you know those, the story will be much easier to write. Spend 2 minutes on this before writing a single word.',
            visual: 'character-setting'
          },
          {
            title: 'What strong narrative writers do',
            text: 'Good writers start the scene fast. They bring in the problem early. They use a few strong details to show feeling. Then they end the story properly, not suddenly. Every sentence should push the story forward, set a mood, or reveal character — nothing should just fill space.',
            visual: 'show-dont-tell'
          },
          {
            title: 'The SCOPE method — write better stories in less time',
            text: 'SCOPE is a 5-part narrative plan you can write in 90 seconds: S = SETTING (one detail — where and when). C = CHARACTER (one trait or goal). O = OBSTACLE (the problem — what goes wrong?). P = PEAK (the worst or most important moment). E = EXIT (how it ends — a change, a decision, a new feeling). Students who follow SCOPE never run out of ideas mid-story and almost never forget to write an ending. Exam tip: in the selective exam, the ENDING is the most commonly missed mark. Always plan it before you start writing.',
            visual: 'writing-map'
          }
        ],
        guidance: [
          'Choose one main event, not five different adventures.',
          'Give the character one clear feeling or goal very early.',
          'Bring the problem in quickly so the story has direction.',
          'Use a few strong details instead of trying to describe everything.',
          'Finish by showing what changed, what was learned, or how the problem was handled.'
        ],
        visuals: [
          { type: 'narrative-arc' },
          { type: 'character-setting' },
          { type: 'show-dont-tell' }
        ],
        modelExample: {
          title: 'Model Narrative Example',
          intro: 'This is the kind of short, controlled narrative that fits the exam better than a giant adventure.',
          prompt: 'Write a story about a surprise.',
          response: [
            'Lina nearly missed the last bus. Rain tapped against the shelter roof, and the street beyond the lights looked watery and blurred. She hugged her school bag to her chest and wished she had not stayed back to finish the poster.',
            'Then she saw a small box sitting on the bench beside her. It was wrapped in silver paper, but there was no name on it. Lina looked around. The street was empty. Even the corner shop had already closed.',
            'For a moment, she only stared. Her heart gave a quick thump. She should probably leave it alone. Still, the lid had slipped a little, and inside she could see a flash of bright yellow.',
            'Lina lifted the lid carefully. Inside was the missing ribbon from her poster — the ribbon she had searched for all afternoon. Tucked beside it was a note in thick blue marker: You dropped this. Good luck for tomorrow.',
            'Lina laughed out loud. The day that had felt heavy only minutes before suddenly seemed much lighter. When the bus finally arrived, she climbed aboard smiling, the silver box tucked safely under her arm.'
          ],
          points: [
            { title: 'Small focus', text: 'The whole story stays in one short moment at the bus stop.' },
            { title: 'Problem', text: 'The missing ribbon and mysterious box create tension.' },
            { title: 'Ending', text: 'The ending connects back to the problem and shows a clear change in feeling.' }
          ]
        },
        exampleVisuals: ['narrative-arc', 'character-setting', 'show-dont-tell', 'writing-map', 'narrative-arc'],
        examples: [
          {
            label: 'Example 1 - Pick a manageable story',
            prompt: 'A prompt says: "Write a story about a surprise." Which idea is best for a timed selective narrative?',
            options: [
              'A child finds a lost puppy outside the school gate and must decide what to do before the bell rings.',
              'A child grows up, travels the world, becomes famous, and tells every life event in order.',
              'A child writes a full history of their whole family from the year 1800.',
              'A child describes every room in their house with no problem or change.'
            ],
            answerIndex: 0,
            steps: [
              'In a timed exam, choose one small but interesting event.',
              'The puppy idea gives a character, setting, problem, and urgency straight away.',
              'The other options are too broad or do not really create a story problem.'
            ],
            note: 'Small stories are easier to control, and control matters a lot.'
          },
          {
            label: 'Example 2 - Start with character and setting',
            prompt: 'Which opening gives the clearest start to a story?',
            options: [
              '"Lina gripped the dripping umbrella and stared at the dark bus stop, wishing she had not missed the last bus."',
              '"There were many things in the world and some of them were interesting in different ways."',
              '"People sometimes have feelings and life can be surprising."',
              '"This story is about Lina and it will now begin with some information."'
            ],
            answerIndex: 0,
            steps: [
              'A good opening quickly shows who, where, and what is already happening.',
              'The best option gives a character, a rainy setting, and a problem in one sentence.',
              'The weaker options are too vague, too general, or too artificial.'
            ],
            note: 'A strong opening puts the reader inside the scene straight away.'
          },
          {
            label: 'Example 3 - Build the conflict early',
            prompt: 'Which sentence adds the strongest problem to a story about a science fair?',
            options: [
              '"When Arjun lifted the cloth, the model volcano was gone."',
              '"Arjun thought science was a school subject."',
              '"The hall had many tables and chairs."',
              '"Some students liked posters and others liked projects."'
            ],
            answerIndex: 0,
            steps: [
              'A narrative needs tension or something to solve.',
              'The missing volcano creates immediate trouble and a reason for the story to continue.',
              'The other sentences may give information, but they do not create a strong conflict.'
            ],
            note: 'The problem gives the story movement.'
          },
          {
            label: 'Example 4 - Show feeling, do not label it weakly',
            prompt: 'Which sentence shows a character is nervous most effectively?',
            options: [
              '"Mina rubbed her palms on her skirt for the third time and checked the stage curtain again."',
              '"Mina was nervous and that was the end of that thought."',
              '"Mina had a feeling that was probably nervousness because she was nervous."',
              '"Mina existed in a nervous manner."'
            ],
            answerIndex: 0,
            steps: [
              'Strong narrative writing often shows emotion through action or physical detail.',
              'Rubbing her palms and checking the curtain are clues the reader can picture.',
              'The weaker answers only name the feeling awkwardly without helping the reader experience it.'
            ],
            note: 'Show the feeling with a clue the reader can picture.'
          },
          {
            label: 'Example 5 - End with purpose',
            prompt: 'Which ending feels most complete for a short school-story narrative?',
            options: [
              '"As the applause filled the hall, Mina finally smiled. She had not forgotten the song after all."',
              '"Anyway, that is all I have to say and then everything stopped."',
              '"Maybe something else happened later, but I am not sure."',
              '"Then the story kept going into many more adventures for seven more years."'
            ],
            answerIndex: 0,
            steps: [
              'A good ending should connect back to the problem or tension from earlier.',
              'This ending shows the result of the challenge and the change in Mina.',
              'The other endings feel sudden, weak, or too unfinished.'
            ],
            note: 'A good ending feels connected to the problem from earlier.'
          }
        ],
        questions: [
          {
            q: 'What is usually the best size for a selective narrative idea?',
            options: [
              'One clear event or turning point',
              'An entire lifetime from birth to adulthood',
              'Ten separate adventures in different places',
              'A piece with no problem at all'
            ],
            answerIndex: 0,
            note: 'A smaller story is easier to control in a short exam response.'
          },
          {
            q: 'What should a student do before writing the first sentence?',
            options: [
              'Make a quick plan for character, setting, problem, and ending',
              'Write as fast as possible without thinking',
              'Copy the prompt into the response box many times',
              'Spend all the time choosing a title only'
            ],
            answerIndex: 0,
            note: 'A short plan prevents a messy middle and a weak ending.'
          },
          {
            q: 'Which part should appear fairly early in a strong narrative?',
            options: [
              'The main problem or tension',
              "A long history of the character's grandparents",
              'Several unrelated side plots',
              'A list of random facts'
            ],
            answerIndex: 0,
            note: 'The reader needs to know what the story is building toward.'
          },
          {
            q: 'Which sentence best uses setting to help the story?',
            options: [
              '"The empty corridor echoed behind Tia as the last classroom door clicked shut."',
              '"There was a place and it had things in it."',
              '"The setting was a setting in a story setting."',
              '"Many buildings exist in the world and this was one of them."'
            ],
            answerIndex: 0,
            note: 'Good setting details create mood and support the story problem.'
          },
          {
            q: 'Why is "showing" a feeling often stronger than simply naming it?',
            options: [
              'Because actions and details help the reader feel the moment',
              'Because the word "sad" is not allowed in stories',
              'Because stories should never mention emotions',
              'Because it makes the story longer'
            ],
            answerIndex: 0,
            note: 'Specific clues help the marker and reader imagine the scene more clearly.'
          },
          {
            q: 'What is a common weak point in timed narrative writing?',
            options: [
              'A rushed or abrupt ending',
              'Planning too clearly',
              'Using one main event',
              'Keeping the story focused'
            ],
            answerIndex: 0,
            note: 'Many students spend too long on the opening and do not finish with control.'
          },
          {
            q: 'Which paragraph plan is strongest for a short narrative?',
            options: [
              'Opening scene, problem grows, turning point, ending',
              'Random ideas in any order',
              'One giant paragraph with no shape',
              'Only an opening with no ending'
            ],
            answerIndex: 0,
            note: 'The reader should be able to feel the story moving somewhere.'
          },
          {
            q: 'What does the marker usually reward most in narrative writing?',
            options: [
              'Control, clarity, and purposeful detail',
              'The biggest number of events possible',
              'Using difficult words incorrectly',
              'Writing the longest piece no matter what'
            ],
            answerIndex: 0,
            note: 'Quality and control matter more than size.'
          },
          {
            q: 'Which is the best reason to stay close to the prompt?',
            options: [
              'Because writing off-topic usually weakens ideas and content marks',
              'Because the prompt must be copied word for word',
              'Because every story should be identical',
              'Because creative details are never allowed'
            ],
            answerIndex: 0,
            note: 'A creative idea still needs to answer the task.'
          },
          {
            q: 'What makes a narrative ending feel successful?',
            options: [
              'It connects back to the problem and shows some change or result',
              'It stops without warning in the middle of the action',
              'It suddenly introduces a brand-new story',
              'It apologises for being unfinished'
            ],
            answerIndex: 0,
            note: 'The ending should feel linked to what came before.'
          }
        ]
      },
      skills: [
        ['Sharp Story Focus', 'Choose one central conflict or turning point.'],
        ['Character and Setting', 'Use precise detail to make the world feel real quickly.'],
        ['Control the Ending', 'Finish with purpose instead of stopping suddenly.']
      ],
      questionTypes: ['planning a small but strong story', 'choosing the best opening or conflict', 'improving narrative control and endings'],
      starter: ['Plan the beginning, conflict, and ending in three lines first.', 'Choose one vivid setting detail and one strong character trait early.', 'Keep the story arc manageable for the time limit.'],
      watchouts: ['overloading the story with too many events', 'spending too long on the opening only', 'ending abruptly without resolving the main tension'],
      related: ['writing-ideas-content', 'writing-language-vocabulary']
    },
    'writing-persuasive': {
      file: 'selective-writing-persuasive.html',
      domain: 'writing',
      title: 'Persuasive Writing',
      subtitle: 'Argue clearly, organise reasons, and sustain a viewpoint',
      intro: 'Persuasive writing is one of the most rewarding exam tasks once you know the structure. The secret is not to be the loudest voice in the room — it is to be the most organised and convincing one. Students who give two fully explained reasons outscore students who give five half-finished ones every time.',
      lesson: {
        theory: [
          {
            title: 'What persuasive writing really is',
            text: "Persuasive writing tries to change the reader's mind. You need a clear opinion, strong reasons, and a finish that sounds confident. Think of it as a lawyer's closing argument: state your case, prove it, and leave the judge with no doubt.",
            visual: 'persuasive-position'
          },
          {
            title: 'How to start the task',
            text: 'Ask 3 quick questions: <mark>What is my opinion?</mark> <mark>What are my best 2-3 reasons?</mark> <mark>What brief example can support each reason?</mark> Then plan your paragraphs: opening (opinion + map), 2-3 body paragraphs (reason + explanation + example), closing (opinion restated with confidence).',
            visual: 'reason-evidence'
          },
          {
            title: 'What strong persuasive writers do',
            text: 'They stay on one side with no wobbling. They explain each reason instead of just listing it. They use strong but sensible words — not over-the-top exaggeration. They do not repeat the same point in different words. Two well-developed reasons are stronger than five thin ones.',
            visual: 'argument-ladder'
          },
          {
            title: 'The OREO method and persuasive word toolkit',
            text: 'OREO = Opinion, Reason, Evidence, Opinion (restated). Use it for every body paragraph: state the reason (O+R), give an example or explanation (E), link back to the opinion (O). Persuasive word toolkit — use these naturally: STRONG OPENERS: "It is clear that...", "Few would argue against...", "Evidence shows that...". REASON STARTERS: "First, ...", "Furthermore, ...", "Most importantly, ...". CONCESSION PHRASES (to sound fair): "While some may argue..., the reality is...". CLOSERS: "For these reasons, ...", "It is therefore essential that...". Exam trap: avoid "I think" at the start of every sentence — it sounds weak. Say "The evidence suggests" or "It is clear that" instead.',
            visual: 'persuasive-position'
          }
        ],
        guidance: [
          'Choose your side straight away.',
          'Plan two or three strong reasons before writing.',
          'Give each paragraph one reason only.',
          'Add an example or explanation after each reason.',
          'Finish by restating your opinion in a strong clear way.'
        ],
        visuals: [
          { type: 'persuasive-position' },
          { type: 'reason-evidence' },
          { type: 'argument-ladder' }
        ],
        modelExample: {
          title: 'Model Persuasive Example',
          intro: 'Notice how this example states the opinion early, gives clear reasons, and explains each reason instead of only listing it.',
          prompt: 'Should school uniforms be compulsory?',
          response: [
            'School uniforms should remain compulsory because they help schools feel fairer, calmer, and more united.',
            'First, uniforms reduce pressure about clothing. Without uniforms, some students may worry about wearing the newest or most expensive items. A uniform makes the focus schoolwork and friendship, not fashion competition.',
            'Second, uniforms help build a team feeling. When students dress in the same colours, they feel part of one community. This can strengthen school pride and help new students feel included more quickly.',
            'Finally, uniforms save time and reduce arguments at home. Families do not need to make difficult clothing choices every morning, and students can get ready for school more efficiently.',
            'For these reasons, school uniforms should stay. They support fairness, belonging, and a better start to the school day.'
          ],
          points: [
            { title: 'Clear opinion', text: 'The writer chooses a side in the first sentence.' },
            { title: 'Reason + explanation', text: 'Each paragraph gives a reason and explains why it matters.' },
            { title: 'Strong conclusion', text: 'The ending restates the opinion without sounding repetitive.' }
          ]
        },
        exampleVisuals: ['persuasive-position', 'reason-evidence', 'argument-ladder', 'writing-map', 'reason-evidence'],
        examples: [
          {
            label: 'Example 1 - Pick a clear side',
            prompt: 'A prompt says: "Should school uniforms be compulsory?" What is the strongest first move?',
            options: [
              'Choose one side clearly before writing any paragraph.',
              'Try to agree and disagree in every sentence.',
              'Write lots of random ideas and hope one works.',
              'Avoid having any opinion at all.'
            ],
            answerIndex: 0,
            steps: [
              'Persuasive writing needs a clear position.',
              'If the writer keeps changing sides, the piece becomes weak and confusing.',
              'Choose your side first so every paragraph has direction.'
            ],
            note: 'The reader should know your opinion early.'
          },
          {
            label: 'Example 2 - Build a good opening',
            prompt: 'Which opening sounds most persuasive?',
            options: [
              '"School uniforms should stay because they help students feel part of one team and reduce unnecessary pressure about clothes."',
              '"Some people think many things about uniforms and life is complex and there are clothes in the world."',
              '"This writing task is about uniforms and I will now begin writing words."',
              '"Uniforms maybe might perhaps sometimes have some ideas around them."'
            ],
            answerIndex: 0,
            steps: [
              'A strong opening states the opinion clearly.',
              'It also hints at the reasons that will come next.',
              'The best option sounds direct and controlled.'
            ],
            note: 'Persuasive openings should feel sure, not foggy.'
          },
          {
            label: 'Example 3 - Add explanation, not just a reason',
            prompt: 'Which body sentence pair is strongest?',
            options: [
              '"Uniforms reduce distraction. Students can focus more on learning instead of comparing outfits all day."',
              '"Uniforms are good. Uniforms are good. Uniforms are good."',
              '"Uniforms exist in many schools around the world."',
              '"I like uniforms because I like them and that is my reason."'
            ],
            answerIndex: 0,
            steps: [
              'A strong reason needs explanation or an example.',
              'The first option gives the reason and then explains why it matters.',
              'The weaker options are repetitive, too general, or too thin.'
            ],
            note: 'Reason plus explanation is much stronger than a bare opinion.'
          },
          {
            label: 'Example 4 - Use persuasive language carefully',
            prompt: 'Which sentence uses persuasive language best?',
            options: [
              '"It is important that every student has a fair chance to learn without extra social pressure."',
              '"Uniforms are the most unbelievably extra-super perfect idea in the universe forever."',
              '"Uniforms are there and that is a sentence."',
              '"Perhaps uniforms may maybe be okay or not okay."'
            ],
            answerIndex: 0,
            steps: [
              'Good persuasive language sounds strong but believable.',
              'Wild exaggeration can sound silly instead of convincing.',
              'The best option sounds serious, clear, and purposeful.'
            ],
            note: 'Strong does not mean over-the-top.'
          },
          {
            label: 'Example 5 - End with force',
            prompt: 'Which conclusion feels strongest?',
            options: [
              '"For these reasons, school uniforms should remain. They support fairness, focus, and school pride."',
              '"Anyway, that is everything and I am done now."',
              '"Maybe uniforms matter, maybe they do not, who knows."',
              '"In conclusion, I will now say something different about lunch."'
            ],
            answerIndex: 0,
            steps: [
              'A persuasive conclusion should restate the opinion clearly.',
              'It should briefly remind the reader of the best reasons.',
              'The strongest ending sounds controlled and final.'
            ],
            note: 'A good ending closes the argument instead of wandering away.'
          }
        ],
        questions: [
          {
            q: 'What should a writer do first in a persuasive task?',
            options: [
              'Choose a clear side',
              'Avoid having an opinion',
              'Write the ending before thinking',
              'List random facts only'
            ],
            answerIndex: 0,
            note: 'A clear position gives the whole piece direction.'
          },
          {
            q: 'What makes a body paragraph strong in persuasive writing?',
            options: [
              'One clear reason plus explanation or an example',
              'Three unrelated reasons mixed together',
              'The same sentence repeated many times',
              'Only a title and no detail'
            ],
            answerIndex: 0,
            note: 'Each paragraph should do one job well.'
          },
          {
            q: 'Why is planning useful before persuasive writing?',
            options: [
              'It helps organise the best reasons in the best order',
              'It wastes time and makes writing weaker',
              'It means you do not need a conclusion',
              'It removes the need for examples'
            ],
            answerIndex: 0,
            note: 'A quick plan usually makes the whole piece clearer.'
          },
          {
            q: 'Which tone usually works best in persuasive writing?',
            options: [
              'Confident and controlled',
              'Completely confused',
              'Wild and silly all the way through',
              'Flat and empty'
            ],
            answerIndex: 0,
            note: 'Strong persuasive writing sounds sure of itself.'
          },
          {
            q: 'What is a common weak point in persuasive writing?',
            options: [
              'Listing reasons without explaining them',
              'Having a clear opinion',
              'Using linking words well',
              'Keeping paragraphs organised'
            ],
            answerIndex: 0,
            note: 'Reasons need support to become convincing.'
          },
          {
            q: 'Which phrase shows persuasive intent best?',
            options: [
              'It is essential that students are given this opportunity.',
              'Students are there sometimes.',
              'This is a sentence about a thing.',
              'Maybe perhaps things exist.'
            ],
            answerIndex: 0,
            note: 'Words like essential, important, and unfair can strengthen persuasive tone when used carefully.'
          },
          {
            q: 'Why should each paragraph have one main reason?',
            options: [
              'So the argument is easy to follow',
              'So the reader gets lost',
              'So the writing becomes longer for no reason',
              'So the conclusion can be skipped'
            ],
            answerIndex: 0,
            note: 'Clear paragraph jobs create a stronger overall structure.'
          },
          {
            q: 'What should the conclusion do?',
            options: [
              'Restate the opinion and close the argument strongly',
              'Introduce a new unrelated topic',
              'Apologise for writing',
              'Repeat the introduction word for word only'
            ],
            answerIndex: 0,
            note: 'The conclusion should feel final and connected.'
          },
          {
            q: 'What is better than using very fancy words badly?',
            options: [
              'Using clear strong words correctly',
              'Using words you do not understand',
              'Avoiding all descriptive language',
              'Writing only one-word sentences'
            ],
            answerIndex: 0,
            note: 'Control matters more than showing off.'
          },
          {
            q: 'What does the marker usually reward in persuasive writing?',
            options: [
              'A clear viewpoint, good structure, and well-explained reasons',
              'The longest piece no matter what',
              'Changing sides in every paragraph',
              'Using confusing ideas'
            ],
            answerIndex: 0,
            note: 'Clarity and control matter more than size.'
          }
        ]
      },
      skills: [
        ['Clear Position', 'State the viewpoint early and keep it consistent.'],
        ['Reason + Evidence', 'Pair each reason with explanation or example.'],
        ['Persuasive Voice', 'Use deliberate language to influence the reader.']
      ],
      questionTypes: ['choosing a clear viewpoint', 'building reason-and-example paragraphs', 'strengthening openings and conclusions'],
      starter: ['Choose your side immediately.', 'Plan two or three strong reasons before writing paragraphs.', 'Use linking words to guide the reader through the argument.'],
      watchouts: ['listing reasons without explanation', 'repeating the same idea in every paragraph', 'forgetting a clear conclusion'],
      related: ['writing-structure-organisation', 'writing-language-vocabulary']
    },
    'writing-discursive': {
      file: 'selective-writing-discursive.html',
      domain: 'writing',
      title: 'Discursive Writing',
      subtitle: 'Explore more than one side of an issue with balance and control',
      intro: 'Discursive writing is the most mature form of writing in the selective exam. Instead of winning an argument, you are showing the examiner that you can think clearly about complexity. The skill is not having the strongest opinion — it is being the most thoughtful, fair, and organised thinker in the room.',
      lesson: {
        theory: [
          {
            title: 'What discursive writing really is',
            text: 'Discursive writing explores an issue from more than one side. It sounds calm, fair, and thoughtful — like a journalist, not a debater. The writer does not need to pick a winner. They need to show the reader the full picture.',
            visual: 'discursive-balance'
          },
          {
            title: 'How to start the task',
            text: 'Ask 3 quick questions: <mark>What are the two or three main sides?</mark> <mark>What is the strongest point on each side?</mark> <mark>What is my thoughtful conclusion?</mark> Plan your paragraphs: introduction (the issue), one paragraph per side, conclusion (thoughtful reflection — not a sudden opinion shout).',
            visual: 'two-sides-map'
          },
          {
            title: 'What strong discursive writers do',
            text: 'They compare ideas fairly, giving each side proper space. They use language that signals balance: "On one hand...", "However...", "It could also be argued...". They keep each paragraph focused on one side only. They do not secretly turn the discursive piece into a persuasive piece.',
            visual: 'thoughtful-path'
          },
          {
            title: 'The discursive language toolkit — signal your thinking clearly',
            text: 'Use these phrases to sound balanced and thoughtful: INTRODUCING AN ISSUE: "This issue raises important questions about...", "People hold a range of views on...". SIDE ONE: "On one hand, ...", "Supporters of this view argue that...", "Some evidence suggests...". SIDE TWO: "On the other hand, ...", "However, others point out that...", "A contrasting view holds that...". CONCLUSION: "Considering both perspectives, ...", "Perhaps the most reasonable position is...", "The full picture suggests that...". Exam trap: the most common error in discursive writing is drifting into pure persuasion — if you find yourself arguing one side for three paragraphs in a row, you have left discursive territory.',
            visual: 'discursive-balance'
          }
        ],
        guidance: [
          'List the main sides before writing.',
          'Keep one side in one paragraph and the other side in another.',
          'Use calm language instead of trying to win an argument.',
          'Show the reader that both sides have something worth thinking about.',
          'End with a thoughtful reflection, not a sudden shout of opinion.'
        ],
        visuals: [
          { type: 'discursive-balance' },
          { type: 'two-sides-map' },
          { type: 'thoughtful-path' }
        ],
        modelExample: {
          title: 'Model Discursive Example',
          intro: 'Notice how this sample explores both sides fairly. It does not try to defeat one side. It weighs the ideas and ends thoughtfully.',
          prompt: 'Is homework helpful for students?',
          response: [
            'Homework is a topic that creates many different opinions. Some people believe it is an important part of learning, while others think too much of it can create stress.',
            'On one hand, homework can be helpful because it gives students another chance to practise skills they have learned in class. It can also teach responsibility, time management, and independent thinking.',
            'On the other hand, too much homework can leave students tired and frustrated. After a full day at school, many children also need time for rest, family, sport, and hobbies. If homework becomes too heavy, it may stop being useful.',
            'Perhaps the best answer is not whether homework is good or bad, but how much is given and whether it has a clear purpose. Thoughtful homework may help students, but too much can have the opposite effect.'
          ],
          points: [
            { title: 'Balanced opening', text: 'The first paragraph introduces more than one side of the issue.' },
            { title: 'Clear organisation', text: 'One paragraph explores one side, and the next explores the other.' },
            { title: 'Thoughtful ending', text: 'The conclusion reflects on the issue instead of shouting one final opinion.' }
          ]
        },
        exampleVisuals: ['discursive-balance', 'two-sides-map', 'thoughtful-path', 'writing-map', 'discursive-balance'],
        examples: [
          {
            label: 'Example 1 - Know the difference',
            prompt: 'What is the best description of discursive writing?',
            options: [
              'It explores more than one side of an issue fairly.',
              'It argues strongly for one side only.',
              'It tells a full adventure story.',
              'It is just a list of unrelated facts.'
            ],
            answerIndex: 0,
            steps: [
              'Discursive writing is balanced, not one-sided.',
              'The goal is to explore and compare ideas.',
              'That makes the first option the strongest answer.'
            ],
            note: 'The key word is explore, not attack.'
          },
          {
            label: 'Example 2 - Start with the right opening',
            prompt: 'Which opening sounds most discursive?',
            options: [
              '"Some people think homework is useful because it builds habits, while others believe too much homework leaves children tired and stressed."',
              '"Homework must be banned immediately because it is terrible in every way."',
              '"Once there was a child who carried homework through a forest."',
              '"Homework is a word that begins with h."'
            ],
            answerIndex: 0,
            steps: [
              'A discursive opening usually introduces more than one side.',
              'The best option sounds balanced and thoughtful.',
              'The second option is persuasive, not discursive.'
            ],
            note: 'Good discursive openings show the issue is not simple.'
          },
          {
            label: 'Example 3 - Organise the middle clearly',
            prompt: 'Which structure is strongest for a short discursive piece?',
            options: [
              'One paragraph for one side, one paragraph for the other side, then a thoughtful ending',
              'All ideas mixed together randomly',
              'Only one paragraph saying the same thing again and again',
              'A giant argument for one side with no other view'
            ],
            answerIndex: 0,
            steps: [
              'Discursive writing needs clear organisation.',
              'Keeping each side in its own paragraph helps the reader follow the thinking.',
              'A thoughtful ending ties the discussion together.'
            ],
            note: 'Separate sides clearly so the writing feels controlled.'
          },
          {
            label: 'Example 4 - Keep the tone balanced',
            prompt: 'Which sentence sounds most suitable for discursive writing?',
            options: [
              '"Online learning can offer flexibility, but face-to-face classrooms also give students direct support and social connection."',
              '"Anyone who disagrees with me is completely wrong."',
              '"This topic is the easiest topic ever and there is no debate."',
              '"I will now shout my opinion with no other idea at all."'
            ],
            answerIndex: 0,
            steps: [
              'Discursive tone should be calm and balanced.',
              'The best option compares two real sides fairly.',
              'The other options sound too aggressive or too silly.'
            ],
            note: 'Balanced tone helps the writing sound mature.'
          },
          {
            label: 'Example 5 - End thoughtfully',
            prompt: 'Which ending fits a discursive response best?',
            options: [
              '"In the end, the best choice may depend on the student, the task, and the amount of support available."',
              '"Therefore everyone must agree with me right now."',
              '"That is the end because I ran out of time and ideas."',
              '"Then a dragon appeared and changed everything."'
            ],
            answerIndex: 0,
            steps: [
              'A discursive ending often reflects rather than commands.',
              'The best answer sounds thoughtful and balanced.',
              'The other endings are too forceful, too weak, or not relevant.'
            ],
            note: 'A thoughtful ending is often stronger than a loud ending.'
          }
        ],
        questions: [
          {
            q: 'What is the main job of discursive writing?',
            options: [
              'To explore more than one side of an issue',
              'To tell a mystery story',
              'To argue one side only',
              'To list facts with no structure'
            ],
            answerIndex: 0,
            note: 'Discursive writing is about thoughtful exploration.'
          },
          {
            q: 'How is discursive writing different from persuasive writing?',
            options: [
              'Discursive writing explores different sides instead of pushing one side only',
              'Discursive writing has no paragraphs',
              'Discursive writing cannot mention opinions',
              'Discursive writing must always be longer'
            ],
            answerIndex: 0,
            note: 'This is the biggest difference students need to know.'
          },
          {
            q: 'What should a student do before writing a discursive response?',
            options: [
              'List the main sides and points for each side',
              'Choose one side and ignore the other',
              'Write without planning at all',
              'Copy the prompt many times'
            ],
            answerIndex: 0,
            note: 'A quick plan helps keep the writing balanced.'
          },
          {
            q: 'Which tone usually works best in a discursive piece?',
            options: [
              'Calm and thoughtful',
              'Angry and shouting',
              'Completely random',
              'Very silly all the way through'
            ],
            answerIndex: 0,
            note: 'Discursive writing should sound fair and controlled.'
          },
          {
            q: 'What is a common trap in discursive writing?',
            options: [
              'Turning it into a persuasive piece',
              'Comparing two sides clearly',
              'Using separate paragraphs for each side',
              'Ending with reflection'
            ],
            answerIndex: 0,
            note: 'Many students accidentally slide into one-sided argument.'
          },
          {
            q: 'Why is paragraph structure important in discursive writing?',
            options: [
              'It helps the reader follow each side clearly',
              'It removes the need for ideas',
              'It makes the ending unnecessary',
              'It means the writer can ignore the prompt'
            ],
            answerIndex: 0,
            note: 'Clear paragraph jobs make balanced thinking easier to see.'
          },
          {
            q: 'Which is the best ending for a discursive response?',
            options: [
              'A thoughtful conclusion that reflects on the issue',
              'A sudden command telling the reader to agree',
              'A new unrelated topic',
              'An unfinished sentence'
            ],
            answerIndex: 0,
            note: 'Discursive endings often reflect instead of attack.'
          },
          {
            q: 'What makes a discursive opening strong?',
            options: [
              'It introduces the issue and shows there is more than one side',
              'It attacks one side immediately',
              'It tells a full fantasy story',
              'It avoids the topic completely'
            ],
            answerIndex: 0,
            note: 'The opening should frame the discussion clearly.'
          },
          {
            q: 'Why should a writer avoid extreme language in discursive writing?',
            options: [
              'Because balanced writing sounds more thoughtful and fair',
              'Because no opinions are allowed',
              'Because long words are banned',
              'Because examples are not useful'
            ],
            answerIndex: 0,
            note: 'Extreme language can make the piece sound persuasive or immature.'
          },
          {
            q: 'What does the marker usually reward in discursive writing?',
            options: [
              'Balance, structure, and clear thoughtful comparison',
              'The loudest opinion',
              'The longest piece no matter what',
              'Random ideas with no order'
            ],
            answerIndex: 0,
            note: 'Control and balance matter most here.'
          }
        ]
      },
      skills: [
        ['Balanced Exploration', 'Consider more than one perspective fairly.'],
        ['Logical Progression', 'Move from one side of the issue to another smoothly.'],
        ['Measured Tone', 'Sound thoughtful and controlled rather than overly emotional.']
      ],
      questionTypes: ['introducing more than one side of an issue', 'organising balanced discussion paragraphs', 'writing thoughtful reflections and endings'],
      starter: ['List possible sides of the issue before drafting.', 'Use paragraphs to separate viewpoints clearly.', 'End with a thoughtful reflection or balanced conclusion.'],
      watchouts: ['turning a discursive piece into a fully persuasive essay', 'jumping between ideas without structure', 'treating both sides too shallowly'],
      related: ['writing-structure-organisation', 'writing-ideas-content']
    },
  });
})();
