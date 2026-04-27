(function () {
  window.SELECTIVE_TOPIC_TOPICS = window.SELECTIVE_TOPIC_TOPICS || {};
  Object.assign(window.SELECTIVE_TOPIC_TOPICS, {
    'writing-ideas-content': {
      file: 'selective-writing-ideas-content.html',
      domain: 'writing',
      title: 'Ideas & Content',
      subtitle: 'Generate engaging ideas that are clear, focused, and original',
      intro: 'Ideas & Content is about what you choose to say and how deeply you develop it. A simple idea that is explored with care and detail will always outscore a grand idea that is never developed. The best selective writing is not impressive because of its ambition — it is impressive because of its control and depth.',
      lesson: {
        theory: [
          {
            title: 'What this marking area really checks',
            text: 'The marker asks: Is this idea clear? Is it interesting? Does it stay on the prompt? Is it developed with real detail — not just named but explored? A simple idea can score very well if it is grown with specific details, examples, or images.',
            visual: 'idea-funnel'
          },
          {
            title: 'How to start the task',
            text: 'Think of 2 or 3 possible angles first. Then choose the one that feels <mark>clear</mark>, <mark>specific</mark>, and <mark>easy to develop</mark> in the time limit. Spend 1-2 minutes brainstorming before writing. Students who plan their core idea before writing almost always produce richer content.',
            visual: 'prompt-target'
          },
          {
            title: 'What strong writers do',
            text: 'They stay with one good idea and add layers to grow it: a specific detail, a feeling, a consequence, a comparison. They do not jump to new ideas every few lines. They understand that depth (going further into one idea) beats breadth (mentioning many ideas briefly).',
            visual: 'detail-zoom'
          },
          {
            title: 'The ZOOM technique — from general to specific in 3 steps',
            text: 'Weak content stays general. Strong content zooms in. Use this 3-step method: Step 1: NAME the main idea in one sentence. Step 2: SHOW a specific moment, detail, or example. Step 3: EXPLAIN what it means, proves, or suggests. Example — GENERAL: "People can be kind." ZOOMED: "On the last morning of term, Maya noticed that Tom had forgotten his lunch. Without saying a word, she split her sandwich in half and left it on his desk while he was at the board. It was such a small thing, but it changed the whole day." Exam tip: whenever you write a general statement, immediately ask "for example?" or "what specifically?" — the answer to that question is always stronger content.',
            visual: 'detail-zoom'
          }
        ],
        guidance: [
          'Brainstorm a few angles first.',
          'Choose the clearest and most workable idea.',
          'Stay close to the key words in the prompt.',
          'Grow one main idea with details or examples.',
          'Avoid going too broad just to sound impressive.'
        ],
        visuals: [
          { type: 'idea-funnel' },
          { type: 'prompt-target' },
          { type: 'detail-zoom' }
        ],
        modelExample: {
          title: 'Model Ideas & Content Example',
          intro: 'This example shows how a simple idea can become strong when it stays focused and grows with clear detail.',
          prompt: 'Write about a time when something small made a big difference.',
          response: [
            'A strong idea for this prompt is not "saving the world" or "changing all of history." A better idea is one small action with a clear effect. For example, a student returning a lost note to a friend can be enough for a good response.',
            "That idea works because it is easy to picture. The writer can show the note being found, the worry on the friend's face, and the relief when it is returned. The story stays small, but the feeling becomes important.",
            'This is what strong Ideas & Content looks like: one clear angle, a close link to the prompt, and details that help the main idea grow.'
          ],
          points: [
            { title: 'Focused angle', text: 'The idea is small enough to control.' },
            { title: 'Prompt match', text: 'It clearly fits "something small made a big difference."' },
            { title: 'Development', text: 'The example shows how the writer could build the idea with feeling and detail.' }
          ]
        },
        exampleParagraph: {
          title: 'Example Paragraph',
          intro: 'This paragraph focuses on one small idea and develops it with useful detail.',
          prompt: 'Write about a time when something small made a big difference.',
          text: "At first, the note looked unimportant. It was only a folded square of paper near the edge of my desk. But when I opened it and saw my grandmother's neat blue handwriting, the whole afternoon changed. The one sentence inside — \"You are braver than you think\" — seemed to push the noise of the classroom away. My speech for assembly was still waiting in my bag, and I was still nervous, but the note gave me something stronger than confidence. It gave me a reason to walk to the front and begin.",
          notes: [
            { title: 'One clear idea', text: 'The paragraph stays on one small thing: the note.' },
            { title: 'Prompt link', text: 'The note is small, but its effect is big.' },
            { title: 'Detail', text: 'Specific details like "folded square of paper" and "neat blue handwriting" help the idea feel real.' }
          ]
        },
        exampleVisuals: ['idea-funnel', 'prompt-target', 'detail-zoom', 'writing-map', 'idea-funnel'],
        examples: [
          {
            label: 'Example 1 - Pick the strongest idea',
            prompt: 'For the prompt "Write about courage," which idea is strongest for a timed response?',
            options: [
              'A child speaking up when they see another student being treated unfairly.',
              'A full history of every brave person in the world.',
              'A list of ten random adventurous activities.',
              'A very general paragraph saying courage is good.'
            ],
            answerIndex: 0,
            steps: [
              'A strong idea should be clear and manageable.',
              'The first option gives one focused moment that can grow into a real piece of writing.',
              'The other options are too broad, too random, or too vague.'
            ],
            note: 'Focused ideas are easier to develop well.'
          },
          {
            label: 'Example 2 - Stay close to the prompt',
            prompt: 'Which idea best matches the prompt "A door opened"?',
            options: [
              'A student opens the music room and hears the sound of their forgotten violin inside.',
              'A long essay about school rules in general.',
              'A story about a beach holiday with no door at all.',
              'A random paragraph about food.'
            ],
            answerIndex: 0,
            steps: [
              'The best idea stays close to the key image in the prompt.',
              'The first option uses the door as the centre of the scene.',
              'The other options drift away from the task.'
            ],
            note: 'Prompt words should stay important all the way through.'
          },
          {
            label: 'Example 3 - Add depth to one idea',
            prompt: 'Which option develops an idea best?',
            options: [
              "\"Mila waited outside the principal's office, folding the apology letter until the paper softened at the edges.\"",
              '"Mila was there. She did things. Then more things happened. Then the end."',
              '"Mila had many thoughts about many topics in life and the universe."',
              '"Mila liked school. Mila liked lunch. Mila liked shoes."'
            ],
            answerIndex: 0,
            steps: [
              'Depth comes from details that build the moment.',
              'The first option gives a clear action and a strong small detail.',
              'The weaker options stay thin or unfocused.'
            ],
            note: 'Specific detail makes the idea feel alive.'
          },
          {
            label: 'Example 4 - Avoid going too broad',
            prompt: 'Which plan is too broad for a short response?',
            options: [
              "A story covering every year of a child's life from kindergarten to adulthood.",
              'One afternoon when a student decides whether to enter a race.',
              'One argument between two friends and how it is solved.',
              'One speech about why reading matters.'
            ],
            answerIndex: 0,
            steps: [
              'Big sweeping ideas are hard to control in exam time.',
              'The first option is too large to develop properly.',
              'The smaller ideas are easier to shape into complete responses.'
            ],
            note: 'Smaller ideas often lead to stronger content.'
          },
          {
            label: 'Example 5 - Keep the main idea alive',
            prompt: 'What helps a piece keep strong Ideas & Content from start to end?',
            options: [
              'Returning to the same core idea and growing it with details',
              'Adding unrelated ideas every paragraph',
              'Changing the topic halfway through',
              'Ignoring the prompt after the opening'
            ],
            answerIndex: 0,
            steps: [
              'Strong content stays connected to one main idea.',
              'That idea can grow, but it should not be replaced by random new ones.',
              'The first option shows the strongest control.'
            ],
            note: 'Growth is good. Drift is not.'
          }
        ],
        questions: [
          { q: 'What makes an idea strong in this marking area?', options: ['It is clear, relevant, and developed well', 'It is huge and impossible to control', 'It changes every paragraph', 'It ignores the prompt'], answerIndex: 0, note: 'Markers reward clarity and development.' },
          { q: 'Why is a small focused idea often better than a huge idea?', options: ['Because it is easier to develop properly in the time limit', 'Because small ideas are always more exciting', 'Because large ideas are not allowed', 'Because the writer should avoid detail'], answerIndex: 0, note: 'Control matters more than size.' },
          { q: 'What should a student do before choosing an idea?', options: ['Think of a few angles and pick the strongest one', 'Use the very first random idea with no thought', "Copy a friend's exact idea", 'Avoid planning at all'], answerIndex: 0, note: 'A quick choice between a few ideas often improves quality.' },
          { q: 'How can a writer stay close to the prompt?', options: ['Keep the key words and central image in mind while planning and writing', 'Ignore the prompt after the title', 'Use a completely unrelated topic', 'Add many side ideas that do not connect'], answerIndex: 0, note: 'Prompt control is part of strong content.' },
          { q: 'What helps develop one main idea well?', options: ['Adding useful details and examples', 'Repeating the same sentence many times', 'Leaving the idea very vague', 'Switching topics constantly'], answerIndex: 0, note: 'Details help the main idea grow.' },
          { q: 'What is a common trap in Ideas & Content?', options: ['Choosing an idea that is too broad', 'Keeping the idea focused', 'Using one clear angle', 'Returning to the prompt'], answerIndex: 0, note: 'Broad ideas often become thin and rushed.' },
          { q: 'Why is relevance important in this marking area?', options: ['Because strong writing must answer the task set', 'Because only titles matter', 'Because detail is not important', 'Because ideas do not need to connect'], answerIndex: 0, note: 'A creative idea still has to fit the prompt.' },
          { q: 'Which is better for content quality?', options: ['One clear idea grown properly', 'Many weak ideas thrown together', 'An off-topic idea with fancy words', 'A very empty piece with no examples'], answerIndex: 0, note: 'Depth usually beats scattered variety.' },
          { q: 'What does the marker usually reward here?', options: ['Clear thought, relevant detail, and strong development', 'The longest piece only', 'The most random idea possible', 'A response with no clear angle'], answerIndex: 0, note: 'The best content feels purposeful and developed.' },
          { q: 'What should a writer do if their idea starts drifting?', options: ['Go back to the prompt and refocus on the main angle', 'Keep drifting and hope it works', 'Add an unrelated ending', 'Remove all detail'], answerIndex: 0, note: 'Refocusing early can save the whole piece.' }
        ]
      },
      skills: [
        ['Idea Generation', 'Find a fresh angle on the prompt quickly.'],
        ['Content Depth', 'Develop the main idea with details, not just broad statements.'],
        ['Prompt Relevance', 'Stay clearly connected to the stimulus or question.']
      ],
      questionTypes: ['choosing the strongest angle from several ideas', 'developing one core idea with detail', 'staying tightly linked to the prompt'],
      starter: ['Brainstorm three possible angles, then choose the strongest one.', 'Ask what makes this idea specific rather than generic.', 'Keep returning to the prompt words while planning.'],
      watchouts: ['choosing an idea that is too broad for the time limit', 'writing lots but saying little', 'drifting away from the prompt halfway through'],
      related: ['writing-narrative', 'writing-discursive']
    },
    'writing-structure-organisation': {
      file: 'selective-writing-structure-organisation.html',
      domain: 'writing',
      title: 'Structure & Organisation',
      subtitle: 'Use paragraphs and sequencing to guide the reader clearly',
      intro: 'Structure and Organisation is the skeleton of writing. Without it, even brilliant ideas collapse. With it, simple ideas become clear and convincing. The examiner can see structure immediately — a well-organised response signals a confident, capable writer before a single sentence is read carefully.',
      lesson: {
        theory: [
          { title: 'What this marking area really checks', text: 'The marker asks: Does this piece have a clear shape? Do the paragraphs go in a sensible order? Does the ending feel connected to the start? Does the writing progress or just circle the same point repeatedly?', visual: 'paragraph-path' },
          { title: 'How to start the task', text: 'Plan the order before you write. Ask: <mark>What does my opening do?</mark> <mark>What does each middle paragraph do?</mark> <mark>What does my ending do?</mark> A 60-second plan saves minutes of confused writing later. The plan itself does not need to be long — just 4-5 dot points mapping the shape of the piece.', visual: 'paragraph-boxes' },
          { title: 'What strong writers do', text: 'They give each paragraph one clear job. They use signposting language to guide the reader. They avoid repeating the same point in different places. Their ending connects back to the opening so the piece feels complete — not cut off.', visual: 'linking-bridge' },
          { title: 'The paragraph job checklist + linking word toolkit',
            text: 'Every paragraph needs a job. Before writing, label each one: OPENING = set up the topic, introduce the main angle. BODY 1 = first point, reason, or scene. BODY 2 = second point, reason, or scene (must advance the writing — not repeat body 1). CONCLUSION = close the piece by connecting back to the opening idea. Linking word toolkit: ADDING: "Furthermore, ... / In addition, ... / Beyond this, ...". CONTRASTING: "However, ... / On the other hand, ... / Despite this, ...". SEQUENCING: "First, ... / Then, ... / Finally, ...". CONCLUDING: "As a result, ... / For these reasons, ... / Ultimately, ...". Exam trap: do not use the same linking word more than twice. And never start a conclusion with "In conclusion" — it sounds like you are filling a template, not thinking.',
            visual: 'paragraph-path' }
        ],
        guidance: ['Plan the order before drafting.', 'Give each paragraph one main job.', 'Make the opening match the ending.', 'Move forward clearly instead of circling around the same point.', 'Use simple linking words when they help the reader.'],
        visuals: [{ type: 'paragraph-path' }, { type: 'paragraph-boxes' }, { type: 'linking-bridge' }],
        modelExample: {
          title: 'Model Structure Example',
          intro: 'This example shows how a short piece can feel clear because every paragraph has a job.',
          prompt: 'Should students have a short homework-free weekend?',
          response: [
            'A strong response would begin by stating the issue clearly and introducing the main opinion or discussion focus.',
            'The next paragraph would explain one reason, such as rest and family time. After that, another paragraph could add a second reason, such as better focus when students return to school.',
            'The ending would not introduce a new idea. Instead, it would bring the main thinking together and close the piece clearly.'
          ],
          points: [
            { title: 'Opening', text: 'Starts the piece and tells the reader what it is about.' },
            { title: 'Middle', text: 'Each paragraph adds one clear point.' },
            { title: 'Ending', text: 'Closes the response instead of wandering into a new idea.' }
          ]
        },
        exampleParagraph: {
          title: 'Example Structured Paragraph Set',
          intro: 'These short paragraphs show how organisation can help the reader move easily through the writing.',
          prompt: 'Should students have more outdoor learning time?',
          text: '<strong>Opening:</strong> Outdoor learning should be used more often because it can improve focus, health, and curiosity.<br><br><strong>Body:</strong> First, outdoor learning gives students a change of space, which can help them feel fresher and more ready to think. Lessons outside can also make science, art, and observation tasks feel more real and memorable.<br><br><strong>Ending:</strong> For these reasons, more outdoor learning time could be a smart way to make school more active and engaging.',
          notes: [
            { title: 'Clear order', text: 'The writing moves from opening to body to ending in a logical way.' },
            { title: 'Paragraph job', text: 'Each section has a different purpose.' },
            { title: 'No drift', text: 'The ending closes the main idea instead of changing topic.' }
          ]
        },
        exampleVisuals: ['paragraph-path', 'paragraph-boxes', 'linking-bridge', 'writing-map', 'paragraph-path'],
        examples: [
          { label: 'Example 1 - Give each part a job', prompt: 'Which plan has the strongest structure?', options: ['Opening, reason 1, reason 2, ending', 'Random ideas in no order', 'Only an opening and nothing else', 'The conclusion first, then unrelated details'], answerIndex: 0, steps: ['A strong piece moves in a clear order.', 'The first option gives the writing a simple shape the reader can follow.', 'The other plans feel incomplete or confusing.'], note: 'Simple structure is strong structure.' },
          { label: 'Example 2 - Keep one paragraph to one job', prompt: 'What is the best use of a paragraph in a persuasive response?', options: ['One main reason with explanation', 'Three unrelated reasons mixed together', 'A list of random facts and a new conclusion', 'No clear point at all'], answerIndex: 0, steps: ['Paragraphs help organise thinking.', 'If one paragraph does too many jobs, the reader gets lost.', 'One main reason per paragraph is usually strongest.'], note: 'Clear paragraph jobs make ideas easier to follow.' },
          { label: 'Example 3 - Match the opening and ending', prompt: 'Why should a writer read the opening and ending together?', options: ['To check they connect and belong to the same piece', 'To make them completely unrelated', 'To remove the middle of the response', 'To add a brand-new topic at the end'], answerIndex: 0, steps: ['A good ending should feel connected to the beginning.', 'Reading them together quickly shows whether the piece still feels focused.', 'The first option shows the strongest structure habit.'], note: 'The end should sound like it belongs to the same response.' },
          { label: 'Example 4 - Avoid repetition', prompt: 'What hurts organisation most?', options: ['Repeating the same idea in several places', 'Planning before writing', 'Using a clear paragraph order', 'Writing a proper ending'], answerIndex: 0, steps: ['When ideas repeat, the piece feels messy and stuck.', 'Good organisation moves forward instead of circling back again and again.', 'That is why repetition is the weakest option here.'], note: 'Progression matters more than repetition.' },
          { label: 'Example 5 - Close properly', prompt: 'Which ending is best organised?', options: ['"For these reasons, the change would help students and should be considered seriously."', '"Before I finish, here is a completely new idea about lunch boxes."', '"This ending is not really an ending and now I will start again."', '"There is no conclusion because I forgot what I was saying."'], answerIndex: 0, steps: ['A strong ending closes the writing clearly.', 'It should feel linked to what came before.', 'The first option wraps up the point without drifting.'], note: 'Good endings finish the thought neatly.' }
        ],
        questions: [
          { q: 'What does strong structure help the reader do?', options: ['Follow the writing easily', 'Get confused quickly', 'Forget the main point', 'Ignore the ending'], answerIndex: 0, note: 'Good structure makes the writing easy to follow.' },
          { q: 'What should a writer do before drafting?', options: ['Plan the order of ideas and paragraphs', 'Write randomly with no plan', 'Start with the conclusion only', 'Skip the ending completely'], answerIndex: 0, note: 'A short plan improves organisation a lot.' },
          { q: 'What is a good rule for paragraphs?', options: ['Each paragraph should have one main job', 'Each paragraph should do everything at once', 'Paragraphs do not matter', 'Only the first paragraph needs a purpose'], answerIndex: 0, note: 'This helps the writing stay clear and controlled.' },
          { q: 'What is a common problem in weak organisation?', options: ['Ideas repeating in different places', 'A clear opening', 'A connected ending', 'A sensible order'], answerIndex: 0, note: 'Repetition often makes structure feel messy.' },
          { q: 'Why should the ending connect to the opening?', options: ['So the whole piece feels complete', 'So the reader gets a surprise topic', 'So the middle no longer matters', 'So the prompt can be ignored'], answerIndex: 0, note: 'A connected ending makes the response feel shaped.' },
          { q: 'What usually comes after the opening in a clear response?', options: ['A paragraph that develops the next main point', 'An unrelated topic', 'A random conclusion', 'No further structure'], answerIndex: 0, note: 'The middle should grow the writing step by step.' },
          { q: 'What do linking words help with?', options: ['Showing how ideas move and connect', 'Making the piece longer for no reason', 'Replacing all planning', 'Avoiding paragraphs completely'], answerIndex: 0, note: 'Simple linking can improve flow.' },
          { q: 'What should a conclusion usually avoid?', options: ['Introducing a brand-new idea', 'Closing the main thought', 'Connecting back to the topic', 'Summing up the response'], answerIndex: 0, note: 'New ideas in the conclusion can weaken structure.' },
          { q: 'What is the best description of strong organisation?', options: ['The writing moves in a sensible order from start to finish', 'The writing jumps everywhere', 'The writing has no clear sections', 'The writing repeats itself often'], answerIndex: 0, note: 'Order and flow are central here.' },
          { q: 'What does the marker usually reward in this area?', options: ['Clear sequencing, useful paragraphs, and a purposeful ending', 'The longest response only', 'Random ideas with no shape', 'A conclusion that changes topic'], answerIndex: 0, note: 'Structure is about shape and control.' }
        ]
      },
      skills: [
        ['Logical Paragraphing', 'Group related ideas together and move in a sensible order.'],
        ['Strong Openings and Endings', 'Create a clear start and a purposeful finish.'],
        ['Flow', 'Use transitions so the writing does not feel chopped or abrupt.']
      ],
      questionTypes: ['sequencing ideas clearly', 'giving each paragraph one job', 'building connected openings and endings'],
      starter: ['Plan the paragraph order before drafting.', 'Give each paragraph one main job.', 'Read the opening and ending together to check they match.'],
      watchouts: ['one giant paragraph', 'ideas repeating in different places', 'a conclusion that adds a new idea instead of closing the piece'],
      related: ['writing-persuasive', 'writing-discursive']
    },
    'writing-language-vocabulary': {
      file: 'selective-writing-language-vocabulary.html',
      domain: 'writing',
      title: 'Language & Vocabulary',
      subtitle: 'Choose precise words and deliberate techniques',
      intro: 'Language and Vocabulary is where writing comes alive. The difference between a good piece and a great piece is almost always the words. Not bigger words — better words. A precise verb, one well-placed image, or a sentence rhythm that surprises the reader can lift an ordinary piece into the top marks.',
      lesson: {
        theory: [
          { title: 'What this marking area really checks', text: 'The marker asks: Do the words fit the meaning with precision? Do the sentences sound smooth and controlled? Does the language help the writing, or does it get in the way? Is there variety in sentence length and opening style?', visual: 'precise-words' },
          { title: 'How to start improving language', text: 'Look for the weakest words first: vague verbs (went, got, said, was) and flat adjectives (nice, good, big, bad). Then ask: <mark>What is a stronger verb here?</mark> <mark>What ONE image could make this clearer?</mark> A better verb or a sharper detail is almost always stronger than a long, forced description.', visual: 'word-upgrade' },
          { title: 'What strong writers do', text: 'They choose verbs with precision (slammed, whispered, drifted — not moved, said, went). They vary sentence openings so the reader is not reading the same pattern every line. They use one or two strong images rather than five weak ones. They do not overload every line with description — some lines stay plain to give the strong ones more power.', visual: 'sentence-variety' },
          { title: 'The verb upgrade list + sentence variety tricks',
            text: 'VERB UPGRADES — replace these instantly: went → dashed, crept, stumbled, strode. said → whispered, announced, muttered, replied. looked → glanced, stared, peered, studied. was → felt, seemed, remained, became. got → received, grabbed, found, earned. SENTENCE VARIETY — 5 ways to start a sentence differently: VERB FIRST: "Racing across the courtyard, she..." ADVERB FIRST: "Quietly, she..." SHORT PUNCH: "She stopped." DESCRIPTION FIRST: "Cold and exhausted, she..." QUESTION: "Had she made the right choice?" Exam tip: read your last draft and circle the first word of every sentence. If more than 3 sentences in a row start with "She" or "He" or "The", mix them up. Variety in sentence openings is one of the fastest ways to improve a mark.',
            visual: 'word-upgrade' }
        ],
        guidance: ['Choose the right word, not the fanciest word.', 'Use stronger verbs when possible.', 'Mix short and longer sentences.', 'Add one or two strong images instead of too many.', 'Read a sentence aloud to hear whether it sounds natural.'],
        visuals: [{ type: 'precise-words' }, { type: 'word-upgrade' }, { type: 'sentence-variety' }],
        modelExample: {
          title: 'Model Language Example',
          intro: 'This sample shows how simple writing can become stronger when the vocabulary is sharper and the sentences are more controlled.',
          prompt: 'Write about a storm arriving.',
          response: [
            'At first, the playground only seemed quieter than usual. Then the wind swept across the oval and bent the tall grass in one quick shiver. Clouds rolled over the school roof, dark and heavy, and the metal flagpole began to rattle. By the time the first cold drop struck my hand, the whole sky felt as if it were holding its breath.'
          ],
          points: [
            { title: 'Precise verbs', text: 'Words like "swept", "bent", and "rolled" are stronger than plain verbs like "went" or "moved".' },
            { title: 'Imagery', text: 'The writing helps the reader picture and feel the storm.' },
            { title: 'Control', text: 'The language sounds strong but still natural.' }
          ]
        },
        exampleParagraph: {
          title: 'Example Paragraph Upgrade',
          intro: 'Look at how better vocabulary can make the same idea feel stronger.',
          prompt: 'A nervous student is waiting to perform on stage.',
          text: '<strong>Weaker:</strong> The student was nervous and looked at the curtain.<br><br><strong>Stronger:</strong> The student rubbed her damp hands against her blazer and glanced at the curtain again as the music teacher called the next name.',
          notes: [
            { title: 'Better verb choice', text: '"Rubbed" and "glanced" are more vivid than "looked".' },
            { title: 'Small detail', text: '"Damp hands" helps show nervousness without naming it directly.' },
            { title: 'Natural style', text: 'The stronger sentence sounds richer but still believable.' }
          ]
        },
        exampleVisuals: ['precise-words', 'word-upgrade', 'sentence-variety', 'imagery-spark', 'precise-words'],
        examples: [
          { label: 'Example 1 - Pick the stronger verb', prompt: 'Which sentence uses the stronger verb?', options: ['"The leaves whipped across the path."', '"The leaves went across the path."', '"The leaves were some leaves on the path."', '"The leaves existed near the path."'], answerIndex: 0, steps: ['Strong verbs create clearer pictures.', '"Whipped" gives speed and energy.', 'The other options sound weak or vague.'], note: 'Precise verbs often improve a sentence quickly.' },
          { label: 'Example 2 - Avoid forced vocabulary', prompt: 'Which sentence sounds strongest?', options: ["\"The hallway was silent except for the squeak of Sam's shoes.\"", '"The hallway was extraordinarily sonorous in a silence-oriented manner."', '"The hallway was hallway-like and hallish."', '"The hallway did a hallway thing."'], answerIndex: 0, steps: ['Good vocabulary should sound natural.', 'The first option is clear, precise, and easy to picture.', 'The second option uses difficult language badly.'], note: 'Natural control is better than forced cleverness.' },
          { label: 'Example 3 - Add useful imagery', prompt: 'Which sentence uses imagery best?', options: ['"The lantern threw a small gold circle onto the dark wall."', '"The lantern was a lantern and it was there."', '"The lantern was very, very, very amazing and nice and good."', '"The lantern happened."'], answerIndex: 0, steps: ['Imagery helps the reader picture the scene.', 'The best option shows colour, shape, and contrast.', 'The weaker options are flat or repetitive.'], note: 'One clear image is usually enough.' },
          { label: 'Example 4 - Vary sentence style', prompt: 'Why is sentence variety helpful?', options: ['It keeps the writing smoother and more interesting to read.', 'It makes every sentence confusing.', 'It means punctuation no longer matters.', 'It replaces the need for ideas.'], answerIndex: 0, steps: ['If every sentence sounds the same, the writing can feel dull.', 'Mixing shorter and longer sentences creates better rhythm.', 'That is why variety helps.'], note: 'Variety supports flow, but it should still sound natural.' },
          { label: 'Example 5 - Choose precision', prompt: 'Which word is most precise for this sentence: "The puppy ____ under the fence"?', options: ['squeezed', 'went', 'did', 'was'], answerIndex: 0, steps: ['The best word should match the action closely.', '"Squeezed" helps the reader picture exactly how the puppy moved.', 'The other words are too vague.'], note: 'Precise words make scenes clearer.' }
        ],
        questions: [
          { q: 'What is usually better than using a very fancy word badly?', options: ['Using a clear strong word correctly', 'Using the longest word possible', 'Using random difficult words', 'Avoiding verbs completely'], answerIndex: 0, note: 'Control matters more than showing off.' },
          { q: 'What often makes a sentence stronger quickly?', options: ['Choosing a better verb', 'Adding three extra weak adjectives', 'Repeating the same word many times', 'Making it as long as possible'], answerIndex: 0, note: 'Strong verbs can improve clarity and energy.' },
          { q: 'Why should a writer read a sentence aloud?', options: ['To hear whether it sounds natural and smooth', 'To make it longer', 'To avoid checking meaning', 'To remove all punctuation'], answerIndex: 0, note: 'Reading aloud often reveals awkward wording.' },
          { q: 'What is a common trap in Language & Vocabulary?', options: ['Using complicated words inaccurately', 'Choosing a precise verb', 'Adding one useful image', 'Keeping the tone controlled'], answerIndex: 0, note: 'Fancy but wrong vocabulary weakens the writing.' },
          { q: 'What does useful imagery do?', options: ['It helps the reader picture or feel the scene', 'It removes the need for ideas', 'It makes every sentence confusing', 'It should appear in every single line'], answerIndex: 0, note: 'Imagery works best when it adds meaning.' },
          { q: 'Why is sentence variety helpful?', options: ['It gives the writing better rhythm and flow', 'It makes the response harder to read', 'It means structure no longer matters', 'It replaces good ideas'], answerIndex: 0, note: 'Variety helps the writing feel alive.' },
          { q: 'What should a writer ask when choosing vocabulary?', options: ['Does this word fit the meaning exactly?', 'Is this the longest word I know?', 'Will this confuse the reader?', 'Can I add more words for no reason?'], answerIndex: 0, note: 'Exact fit is the key question.' },
          { q: 'Which sentence is usually stronger?', options: ['A sentence with clear precise detail', 'A sentence stuffed with random hard words', 'A sentence with no clear meaning', 'A sentence repeated again and again'], answerIndex: 0, note: 'Precision is stronger than clutter.' },
          { q: 'What does the marker usually reward in this area?', options: ['Controlled language, strong word choice, and effective expression', 'The most difficult vocabulary possible', 'The longest sentence on the page', 'Repetition of the same phrase'], answerIndex: 0, note: 'Good language sounds deliberate and controlled.' },
          { q: 'What should a writer avoid if they want stronger style?', options: ['Overloading every sentence with description', 'Using one or two good images', 'Choosing a sharper verb', 'Improving a weak sentence'], answerIndex: 0, note: 'Too much description can make the writing heavy.' }
        ]
      },
      skills: [
        ['Precision', 'Choose the exact word for the effect you want.'],
        ['Variety', 'Blend sentence patterns and language choices smoothly.'],
        ['Literary Devices', 'Use tools such as similes or imagery where they genuinely add meaning.']
      ],
      questionTypes: ['improving weak word choices', 'spotting better sentence rhythm', 'using imagery and precise language effectively'],
      starter: ['Swap vague verbs for stronger ones during editing.', 'Use one or two memorable images rather than forcing many.', 'Read a sentence aloud to test whether the vocabulary sounds natural.'],
      watchouts: ['using complicated words inaccurately', 'overloading every sentence with description', 'repeating the same key words too often'],
      related: ['writing-narrative', 'writing-grammar-punctuation']
    },
    'writing-grammar-punctuation': {
      file: 'selective-writing-grammar-punctuation.html',
      domain: 'writing',
      title: 'Grammar & Punctuation',
      subtitle: 'Accuracy in tense, sentence control, spelling, and punctuation',
      intro: 'Grammar and Punctuation is the quality control stage of writing. Even the best ideas lose marks when sentences break, tenses jump, or full stops disappear. The good news: most grammar errors are fixable in 90 seconds of careful rereading at the end. Building that habit is worth more than any grammar rule you could memorise.',
      lesson: {
        theory: [
          { title: 'What this marking area really checks', text: 'The marker asks: Are the sentences complete and not run-on? Does the tense stay steady throughout? Is punctuation used correctly and consistently? Are capitals, commas, and full stops in the right places?', visual: 'sentence-lock' },
          { title: 'How to check your writing effectively', text: 'Spend the last 90 seconds reading your piece ONE SENTENCE AT A TIME — not the whole piece at once. Ask for each sentence: (1) Does it make sense by itself? (2) Is the tense steady? (3) Is there a capital at the start and a full stop at the end? (4) Does any comma or dialogue mark look wrong? Reading sentence by sentence catches far more errors than reading straight through.', visual: 'tense-timeline' },
          { title: 'What strong writers do', text: 'They keep sentences complete — no fragments, no run-on sentences. They choose one tense (past OR present) and stay in it the whole piece. They place capitals, full stops, commas, and speech marks correctly. They save 1-2 minutes for proofreading and actually use that time, not waste it.', visual: 'punctuation-signals' },
          { title: 'The top 5 grammar traps and how to avoid them',
            text: '(1) TENSE JUMP: writing "She ran to the door and opens it." Fix: pick past OR present and stay in it. Read one sentence and ask "what tense is this?" before writing the next. (2) RUN-ON SENTENCES: "She ran to the door she opened it she went inside." Fix: end each idea with a full stop. Every "she" or "he" that follows another action without a full stop is a warning sign. (3) MISSING SPEECH MARKS: He said come in. Fix: dialogue always needs speech marks around the spoken words. (4) COMMA SPLICES: "She was tired, she sat down." Fix: use a full stop or add "and/but/so". (5) APOSTROPHE ERRORS: "its raining" should be "it is raining" = "it\'s raining". But "the dogs collar" = "the dog\'s collar" (possession). Exam tip: the single most common error is tense jumping — usually in the middle of the piece when the writer speeds up. Slow down at the midpoint and double-check the tense.',
            visual: 'sentence-lock' }
        ],
        guidance: [
          'Check sentence endings first.',
          'Make sure the tense stays steady.',
          'Watch for capitals and full stops.',
          'Use commas and quotation marks carefully.',
          'Save a minute or two for proofreading.'
        ],
        visuals: [
          { type: 'sentence-lock' },
          { type: 'tense-timeline' },
          { type: 'punctuation-signals' }
        ],
        modelExample: {
          title: 'Model Grammar Example',
          intro: 'This sample is short, but the grammar and punctuation are controlled. Notice how the tense stays steady and the sentence endings are clear.',
          prompt: 'Write a short narrative moment.',
          response: [
            'Mina waited beside the curtain and listened to the murmur of the hall. She pressed the folded lyrics sheet flat against her palm. When her name was called, she took one breath, stepped forward, and began.'
          ],
          points: [
            { title: 'Sentence control', text: 'Each sentence is complete and easy to follow.' },
            { title: 'Tense control', text: 'The whole paragraph stays in the past tense.' },
            { title: 'Punctuation', text: 'Full stops and commas are used to guide the reader clearly.' }
          ]
        },
        exampleParagraph: {
          title: 'Example Editing Upgrade',
          intro: 'Look at how grammar and punctuation fixes can make writing clearer immediately.',
          prompt: 'A student is nervous before a race.',
          text: '<strong>Weaker:</strong> Jay was nervous he looked down at his shoes the whistle blew and he ran.<br><br><strong>Stronger:</strong> Jay was nervous. He looked down at his shoes. Then the whistle blew, and he ran.',
          notes: [
            { title: 'Sentence boundaries', text: 'The stronger version separates the ideas into proper sentences.' },
            { title: 'Comma use', text: 'The comma helps the final sentence flow more naturally.' },
            { title: 'Clarity', text: 'The stronger version is much easier to read.' }
          ]
        },
        exampleVisuals: ['sentence-lock', 'tense-timeline', 'punctuation-signals', 'sentence-lock', 'punctuation-signals'],
        examples: [
          { label: 'Example 1 - Fix the sentence boundary', prompt: 'Which version is punctuated correctly?', options: ['"Sam grabbed the note, and he ran outside."', '"Sam grabbed the note and he ran outside"', '"Sam grabbed the note and, he ran outside."', '"Sam grabbed the note and he, ran outside."'], answerIndex: 0, steps: ['The sentence needs a clear ending or a correct internal punctuation pattern.', 'The first option uses a comma correctly between two complete parts.', 'The others are missing or misusing punctuation.'], note: 'Clear sentence boundaries make writing easier to trust.' },
          { label: 'Example 2 - Keep the tense steady', prompt: 'Which sentence keeps the tense consistent?', options: ['"Lila opened the gate and hurried to the bus."', '"Lila opens the gate and hurried to the bus."', '"Lila opened the gate and hurries to the bus."', '"Lila open the gate and hurried to the bus."'], answerIndex: 0, steps: ['Choose one tense and keep it steady.', 'The first option stays in past tense all the way through.', 'The other options switch tense or break the verb form.'], note: 'Tense slips often happen when students rush.' },
          { label: 'Example 3 - Use capitals and full stops', prompt: 'Which sentence is written correctly?', options: ['"The rain stopped. Mia looked up and smiled."', '"the rain stopped. Mia looked up and smiled"', '"The rain stopped mia looked up and smiled."', '"The rain stopped. mia looked up and smiled."'], answerIndex: 0, steps: ['The start of the sentence needs a capital.', 'Each complete sentence needs a full stop.', 'The first option gets both right.'], note: 'Simple punctuation marks still matter a lot.' },
          { label: 'Example 4 - Quote speech properly', prompt: 'Which sentence shows speech punctuation correctly?', options: ['"Come back here," Dad shouted.', 'Come back here, "Dad shouted."', '"Come back here" dad shouted.', '"Come back here", Dad shouted.'], answerIndex: 0, steps: ['The spoken words go inside quotation marks.', 'The comma belongs before the reporting clause in this example.', 'The first option uses the cleanest punctuation.'], note: 'Speech punctuation helps the reader know exactly who is speaking.' },
          { label: 'Example 5 - Proofread for small errors', prompt: 'What is the best final proofreading habit?', options: ['Read slowly and check one sentence at a time', 'Only reread the title', 'Add extra words at the end', 'Ignore punctuation if the idea is good'], answerIndex: 0, steps: ['Proofreading works best when it is slow and careful.', 'Checking one sentence at a time helps you notice errors.', 'That is the safest final habit.'], note: 'A small proofreading routine can save important marks.' }
        ],
        questions: [
          { q: 'What does grammar help a writer do?', options: ['Make sentences clear and correct', 'Avoid having any ideas', 'Replace all planning', 'Make every sentence longer'], answerIndex: 0, note: 'Grammar helps the reader understand the writing.' },
          { q: 'Why is punctuation important?', options: ['It shows the reader where ideas begin, pause, and end', 'It is only decoration', 'It can be ignored in exams', 'It replaces vocabulary'], answerIndex: 0, note: 'Punctuation helps the writing sound controlled.' },
          { q: 'What is a common grammar trap in writing?', options: ['Switching tense halfway through', 'Keeping tense steady', 'Checking sentence endings', 'Using capitals correctly'], answerIndex: 0, note: 'Tense slips are common when students rush.' },
          { q: 'What should a complete sentence have?', options: ['A clear meaning that can stand by itself', 'Only a noun', 'Only a verb', 'No ending mark'], answerIndex: 0, note: 'A sentence should feel complete on its own.' },
          { q: 'What should a writer check first when proofreading quickly?', options: ['Sentence beginnings and endings', 'Only the title', 'Only adjectives', 'Only the longest paragraph'], answerIndex: 0, note: 'This catches many simple errors fast.' },
          { q: 'Why are capitals important?', options: ['They mark the start of sentences and proper names clearly', 'They make the text longer', 'They replace punctuation', 'They are optional in formal writing'], answerIndex: 0, note: 'Capitals help the writing look polished and clear.' },
          { q: 'What is the safest tense choice in a narrative?', options: ['Pick one tense and stay in it', 'Change tense every sentence', 'Use no verbs', 'Switch tense whenever you feel like it'], answerIndex: 0, note: 'Consistency matters more than variety here.' },
          { q: 'What do quotation marks help show?', options: ['The exact spoken words', 'The setting only', 'The title only', "The writer's handwriting"], answerIndex: 0, note: 'They are important in dialogue.' },
          { q: 'What usually happens when punctuation is missing?', options: ['The writing becomes harder to read', 'The writing always improves', 'Ideas become stronger automatically', 'The ending becomes clearer'], answerIndex: 0, note: 'Missing punctuation can make strong ideas look weak.' },
          { q: 'What does the marker usually reward in this area?', options: ['Accurate sentences, steady tense, and careful punctuation', 'The longest paragraph only', 'The wildest idea', 'A piece with no proofreading'], answerIndex: 0, note: 'Accuracy helps the whole piece feel polished.' }
        ]
      },
      skills: [
        ['Sentence Control', 'Write complete sentences with clear meaning.'],
        ['Tense and Agreement', 'Keep grammar consistent across the piece.'],
        ['Proofreading', 'Notice and correct errors before time runs out.']
      ],
      questionTypes: ['editing for accuracy', 'keeping tense and punctuation controlled', 'proofreading short passages effectively'],
      starter: ['Save two minutes for a final read-through.', 'Check sentence beginnings and endings first.', 'Look for tense slips after action-heavy paragraphs.'],
      watchouts: ['comma splices', 'switching tense halfway through', 'missing simple spelling errors because of rushing'],
      related: ['writing-structure-organisation', 'writing-language-vocabulary']
    }
  });
})();
