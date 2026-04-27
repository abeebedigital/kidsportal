(function () {
  window.SELECTIVE_TOPIC_TOPICS = window.SELECTIVE_TOPIC_TOPICS || {};
  Object.assign(window.SELECTIVE_TOPIC_TOPICS, {
    'thinking-evaluating-arguments': {
      file: 'selective-thinking-evaluating-arguments.html',
      domain: 'thinking',
      title: 'Evaluating Arguments',
      subtitle: 'Find what supports or weakens a claim most strongly',
      intro: 'Evaluating arguments is like being a judge in a debate. You hear a claim, then decide which piece of evidence changes the verdict most. Strong solvers ignore what sounds interesting and focus only on what directly proves or disproves the exact claim on the page.',
      lesson: {
        theory: [
          {
            title: 'What is a claim?',
            text: 'A claim is the main idea or opinion in a question. It is the thing we are checking. Think of it as the headline — everything else is judged against it.',
            visual: 'claim-evidence'
          },
          {
            title: 'What helps a claim?',
            text: 'A support answer gives direct evidence that makes the claim more believable. The key word is DIRECT — it must link clearly to the exact claim, not just the topic.',
            visual: 'logic-balance'
          },
          {
            title: 'What weakens a claim?',
            text: 'A weaken answer introduces a fact or reason that makes the claim less certain. It does not need to disprove it completely — it just needs to create doubt.',
            visual: 'support-weakens'
          },
          {
            title: 'The 3-Test shortcut for any argument question',
            text: 'Ask three quick questions for each option: (1) Does it DIRECTLY address the claim — not just the topic? (2) Does it make the claim MORE believable (support) or LESS believable (weaken)? (3) If you removed this option, would the argument change? If removing it makes no difference, it is irrelevant. The correct answer always changes the argument most strongly and most directly.',
            visual: 'logic-balance'
          }
        ],
        guidance: [
          'Read the claim first and say it in your own words.',
          'Ask whether each option gives proof, gives doubt, or does nothing useful.',
          'Choose the option that changes the argument the most.',
          'Stay close to the exact wording so you do not drift into a different idea.'
        ],
        visuals: [
          { type: 'claim-evidence' },
          { type: 'logic-balance' },
          { type: 'support-weakens' }
        ],
        examples: [
          {
            label: 'Example 1 - Simple support',
            prompt: 'Claim: The playground was wet. Which option best supports that idea?',
            options: ['It rained before playtime.', 'The swings were painted red.', 'The gate was open.', 'The benches were new.'],
            answerIndex: 0,
            steps: ['The claim says the playground was wet.', 'Rain before playtime gives a clear reason for wet ground.', 'That supports the claim best.'],
            note: 'Support gives a strong reason.'
          },
          {
            label: 'Example 2 - Simple weaken',
            prompt: 'Claim: The class finished early. Which option weakens that idea?',
            options: ['Some students were still packing their bags.', 'The teacher smiled at the class.', 'The room had bright lights.', 'The desks were clean.'],
            answerIndex: 0,
            steps: ['If students are still packing, the class is not fully finished.', 'That shows the claim may not be true.', 'So this weakens the argument.'],
            note: 'A weaken answer creates doubt.'
          },
          {
            label: 'Example 3 - Find the best evidence',
            prompt: 'Claim: The game was fair. Which option is the best evidence?',
            options: ['Both players had the same chance to win.', 'The game was played outside.', 'The board was colourful.', 'The players sat at the same table.'],
            answerIndex: 0,
            steps: ['Fair means each side has the same chance.', 'The first option says that directly.', 'It is the strongest support.'],
            note: 'Pick the most direct proof.'
          },
          {
            label: 'Example 4 - Clue words matter',
            prompt: 'The boy was happy because he finished his work. What does because show?',
            options: ['It gives the reason.', 'It gives the ending.', 'It gives the opposite idea.', 'It gives a question.'],
            answerIndex: 0,
            steps: ['Because usually tells the reason for something.', 'Here it explains why the boy was happy.', 'So the answer is reason.'],
            note: 'Clue words tell us how ideas fit together.'
          },
          {
            label: 'Example 5 - Harder support',
            prompt: 'Claim: The school picnic will probably be sunny. Which option supports the claim best?',
            options: ['The forecast says clear skies all afternoon.', 'The children packed lunchboxes.', 'The grass is green.', 'The buses arrived early.'],
            answerIndex: 0,
            steps: ['Look for weather evidence, not just picnic details.', 'A forecast with clear skies is direct support.', 'That makes the claim stronger.'],
            note: 'Choose the evidence that matches the claim most closely.'
          },
          {
            label: 'Example 6 - Harder weaken',
            prompt: 'Claim: The library was busy. Which option weakens that idea most?',
            options: ['No people were inside when the bell rang.', 'The books were neatly stacked.', 'The chairs were blue.', 'The shelves were tall.'],
            answerIndex: 0,
            steps: ['If no people were inside, the library was not busy.', 'That is a strong reason against the claim.', 'So this weakens it best.'],
            note: 'A weakener should clearly push against the claim.'
          }
        ],
        questions: [
          { q: 'Claim: The grass is wet. Which option best supports it?', options: ['It rained last night.', 'The fence is brown.', 'The ball is round.', 'The dog is noisy.'], answerIndex: 0, note: 'Rain is direct support.' },
          { q: 'Claim: The class went outside at lunch. Which option weakens it?', options: ['It was raining and the class stayed inside.', 'The lunch bell rang.', 'The tables were cleaned.', 'The teacher smiled.'], answerIndex: 0, note: 'That gives a clear reason against the claim.' },
          { q: 'What is the main job of an argument question?', options: ['To test which option helps or hurts the claim most.', 'To find the longest sentence.', 'To count the number of words.', 'To copy the statement exactly.'], answerIndex: 0, note: 'We judge the reasoning.' },
          { q: 'Claim: The game is fair. Which option best supports it?', options: ['Both sides have the same chance to win.', 'The game is played outside.', 'The board is blue.', 'The players wear hats.'], answerIndex: 0, note: 'Equal chance means fair.' },
          { q: 'Which clue word often gives a reason?', options: ['because', 'near', 'under', 'around'], answerIndex: 0, note: 'Because shows a reason.' },
          { q: 'Claim: The team won because they trained hard. What does trained hard do?', options: ['It supports the claim.', 'It weakens the claim.', 'It changes the subject.', 'It makes no sense.'], answerIndex: 0, note: 'Training hard is a reason.' },
          { q: 'Claim: The shop opened early. Which option weakens it?', options: ['The sign said it would open late.', 'The shop sold bread.', 'The windows were clean.', 'The lights were bright.'], answerIndex: 0, note: 'A late opening sign contradicts the claim.' },
          { q: 'Claim: The plant grew well. Which option best supports it?', options: ['It got water and sunlight every day.', 'The pot was red.', 'The room was quiet.', 'The table was wooden.'], answerIndex: 0, note: 'Water and sunlight are direct support.' },
          { q: 'If a claim says "the room was empty," what would weaken it most?', options: ['Students were still sitting inside.', 'The door was open.', 'The lights were on.', 'The carpet was clean.'], answerIndex: 0, note: 'If people are inside, the room is not empty.' },
          { q: 'Which answer is usually the strongest support?', options: ['The one that gives the clearest proof.', 'The one with the biggest word.', 'The one that sounds funny.', 'The one that is shortest.'], answerIndex: 0, note: 'Clear proof is best.' }
        ]
      },
      skills: [
        ['Identify the Main Claim', 'Work out exactly what is being argued before judging evidence.'],
        ['Support vs. Weaken', 'Decide whether a new statement makes the claim stronger or weaker.'],
        ['Relevance Checks', 'Ignore facts that sound interesting but do not affect the reasoning.']
      ],
      questionTypes: ['which statement best supports', 'which statement weakens the claim', 'most relevant evidence'],
      starter: ['Restate the argument in one short sentence first.', 'Ask "does this help prove it?" for each option.', 'Look for evidence that connects directly to the claim.'],
      watchouts: ['choosing the fact you personally agree with', 'confusing emotional wording with solid support', 'ignoring the exact wording of the claim'],
      related: ['thinking-identifying-flaws', 'reading-non-fiction']
    },
    'thinking-drawing-conclusions': {
      file: 'selective-thinking-drawing-conclusions.html',
      domain: 'thinking',
      title: 'Drawing Conclusions',
      subtitle: 'Decide what must be true from the facts you are given',
      intro: 'Drawing conclusions is detective work with no guessing allowed. You are given exactly the facts on the page — nothing more. Your job is to find the one answer that MUST follow. Think of it like a locked room: if a fact is not in the room, it cannot open the door.',
      lesson: {
        theory: [
          {
            title: 'What are they asking?',
            text: 'They are asking you to be a fact detective. You read the clues and choose the one answer that the facts prove — not the one that sounds smart or interesting.',
            visual: 'fact-chain'
          },
          {
            title: 'What does "must be true" mean?',
            text: 'Think of a MUST-BE-TRUE test: can this conclusion be false, even if all the given facts are true? If yes, it is not the answer. Only choose the option that CANNOT be false given the facts.',
            visual: 'logic-balance'
          },
          {
            title: 'What are we trying to prove?',
            text: 'We are trying to prove the safest answer. Rate each option: PROVED (must be true), POSSIBLE (might be true), OUTSIDE (uses knowledge not given). Only pick PROVED.',
            visual: 'claim-evidence'
          },
          {
            title: 'The must-be-true filter: a 3-second check',
            text: 'After reading the facts, say: "Given only THESE facts, could the answer be wrong?" If there is any way it could be wrong — even slightly — it is not must-be-true. Cross it out. Real exam trick: look for answer options that say "always" or "never" — they are often traps unless the facts literally say so.',
            visual: 'fact-chain'
          }
        ],
        guidance: [
          'Read the facts first and underline the key pieces.',
          'Say the facts in your own words so the pattern is easy to see.',
          'Ask which answer must follow from those facts, not just which answer sounds nice.',
          'Reject answers that use outside knowledge or extra guessing.',
          'If two answers look close, choose the one that is proven most clearly.'
        ],
        visuals: [
          { type: 'fact-chain' },
          { type: 'logic-balance' },
          { type: 'claim-evidence' }
        ],
        examples: [
          {
            label: 'Example 1 - Simple must be true',
            prompt: 'All birds have wings. A robin is a bird. What must be true?',
            options: ['A robin has wings.', 'A robin can swim.', 'A robin is a fish.', 'A robin is a building.'],
            answerIndex: 0,
            steps: ['The facts say all birds have wings.', 'A robin is a bird, so it follows the bird rule.', 'A robin must have wings.'],
            note: 'Use only the facts that are given.'
          },
          {
            label: 'Example 2 - Keep the facts linked',
            prompt: 'All cats are animals. Mimi is a cat. What must be true?',
            options: ['Mimi is an animal.', 'Mimi is a bird.', 'Mimi is sleeping.', 'Mimi is running.'],
            answerIndex: 0,
            steps: ['Cats are inside the animal group.', 'Mimi is a cat, so Mimi is in that group too.', 'That means Mimi is an animal.'],
            note: 'The rule travels from one fact to the next.'
          },
          {
            label: 'Example 3 - Order the idea',
            prompt: 'All triangles have 3 sides. What must be true about a triangle?',
            options: ['It has 3 sides.', 'It has 4 corners.', 'It is always red.', 'It can never be folded.'],
            answerIndex: 0,
            steps: ['The fact gives the rule directly.', 'If a shape is a triangle, it has 3 sides.', 'That is the only safe answer.'],
            note: 'The exact rule is the answer.'
          },
          {
            label: 'Example 4 - Harder fact chain',
            prompt: 'All books in the box are blue. This notebook is in the box. What must be true?',
            options: ['This notebook is blue.', 'This notebook is heavy.', 'This notebook is old.', 'This notebook is on a shelf.'],
            answerIndex: 0,
            steps: ['The facts tell us everything in the box is blue.', 'The notebook is in the box.', 'So the notebook must be blue.'],
            note: 'If it is in the group, it follows the group rule.'
          },
          {
            label: 'Example 5 - Do not overreach',
            prompt: 'All students in Room 3 wear hats. Sam is in Room 3. What must be true?',
            options: ['Sam wears a hat.', 'Sam is tall.', 'Sam likes games.', 'Sam is late.'],
            answerIndex: 0,
            steps: ['Room 3 has a clear rule.', 'Sam is in Room 3, so Sam follows that rule too.', 'Sam must wear a hat.'],
            note: 'Do not add extra ideas that are not stated.'
          },
          {
            label: 'Example 6 - Look for the safest answer',
            prompt: 'All toys in the basket are red. The ball is in the basket. What must be true?',
            options: ['The ball is red.', 'The ball is round.', 'The ball is small.', 'The ball is new.'],
            answerIndex: 0,
            steps: ['The basket has a colour rule.', 'The ball is in the basket, so it follows the rule.', 'The ball must be red.'],
            note: 'Must be true means the fact has to follow.'
          }
        ],
        questions: [
          { q: 'What does "must be true" mean?', options: ['It follows from the facts.', 'It sounds clever.', 'It is probably wrong.', 'It is a guess.'], answerIndex: 0, note: 'Must be true means the facts prove it.' },
          { q: 'All dogs bark. Ben has a dog. What must be true?', options: ["Ben's dog barks.", "Ben's dog flies.", "Ben's dog is a cat.", "Ben's dog is asleep."], answerIndex: 0, note: 'The rule applies to the dog.' },
          { q: 'All pencils in the box are yellow. This pencil is in the box. What must be true?', options: ['This pencil is yellow.', 'This pencil is broken.', 'This pencil is short.', 'This pencil is old.'], answerIndex: 0, note: 'The box rule applies here.' },
          { q: 'Which answer is safest in a conclusion question?', options: ['The one proved by the facts.', 'The one that seems interesting.', 'The one with the longest sentence.', 'The one that mentions a new idea.'], answerIndex: 0, note: 'Choose the proven answer.' },
          { q: 'All birds have feathers. A sparrow is a bird. What must be true?', options: ['A sparrow has feathers.', 'A sparrow has fur.', 'A sparrow is a fish.', 'A sparrow is a rock.'], answerIndex: 0, note: 'Bird rule applies to sparrows.' },
          { q: 'What should you do first in a conclusion question?', options: ['Read the facts carefully.', 'Pick the longest option.', 'Use outside knowledge.', 'Guess quickly.'], answerIndex: 0, note: 'Facts come first.' },
          { q: 'All cakes in the shop are sweet. This cake is in the shop. What must be true?', options: ['This cake is sweet.', 'This cake is round.', 'This cake is large.', 'This cake is cheap.'], answerIndex: 0, note: 'It follows the shop rule.' },
          { q: 'If a fact is not stated, should you assume it is true?', options: ['No, only use the given facts.', 'Yes, always.', 'Only if it sounds right.', 'Only if it is funny.'], answerIndex: 0, note: 'Do not add extra assumptions.' },
          { q: 'All windows in the hall are open. This window is in the hall. What must be true?', options: ['This window is open.', 'This window is blue.', 'This window is large.', 'This window is old.'], answerIndex: 0, note: 'The rule applies to the window.' },
          { q: 'Which idea is closest to a conclusion?', options: ['A fact that follows from the evidence.', 'A random guess.', 'A new story detail.', 'A question with no facts.'], answerIndex: 0, note: 'A conclusion comes from facts.' }
        ]
      },
      skills: [
        ['Fact Tracking', 'Separate what is stated from what is guessed.'],
        ['Necessary Truth', 'Choose the option that must follow from the evidence.'],
        ['Eliminate Overreach', 'Reject answers that add extra assumptions.']
      ],
      questionTypes: ['what can be concluded', 'which statement must be true', 'fact-chain reasoning'],
      starter: ['Underline the given facts before reading options.', 'Test each option only against the evidence provided.', 'Reject answers that use "always" when the facts do not prove that.'],
      watchouts: ['choosing what seems likely instead of certain', 'importing outside knowledge', 'missing a small detail that changes the conclusion'],
      related: ['thinking-evaluating-arguments', 'reading-inference']
    },
    'thinking-identifying-flaws': {
      file: 'selective-thinking-identifying-flaws.html',
      domain: 'thinking',
      title: 'Identifying Flaws in Logic',
      subtitle: 'Spot weak reasoning, false links, and broken assumptions',
      intro: 'Identifying flaws is the art of finding where an argument pretends to prove something but does not quite get there. Imagine you are a quality inspector on a production line — a good argument is one where every part connects perfectly. Your job is to find the broken connection.',
      lesson: {
        theory: [
          {
            title: 'What is a flaw?',
            text: 'A flaw is a crack in the reasoning. The claim may sound convincing, but the reason does not really prove it. Think of it as a bridge with a missing plank — it looks fine from a distance but collapses when tested.',
            visual: 'logic-flaw'
          },
          {
            title: 'What are they testing?',
            text: 'They want to know if you can spot the weak link. Ask: "Even if the evidence is true, could the conclusion still be wrong?" If yes — there is a flaw. The correct answer names exactly what step the argument skipped.',
            visual: 'missing-link'
          },
          {
            title: 'How do you find it?',
            text: 'Separate the claim (the conclusion) from the evidence (the reason). Then ask: does this evidence guarantee the claim? Often the speaker assumes a connection that was never actually proven.',
            visual: 'logic-balance'
          },
          {
            title: 'The 4 most common flaw types — memorise these',
            text: 'Know these 4 patterns: (1) HASTY GENERALISATION — one example does not prove a universal rule (one kind dog does not mean all dogs are kind). (2) FALSE CAUSE — two things happened together but one did not cause the other (red pot did not make the plant grow). (3) IRRELEVANT EVIDENCE — the reason is about a different topic (clean chair does not prove a busy class). (4) MISSING ALTERNATIVE — the speaker ignores other possible causes (maybe it rained AND the sprinkler was on). Exam tip: the correct flaw answer usually names the broken link clearly.',
            visual: 'logic-flaw'
          }
        ],
        guidance: [
          'Read the claim and the reason separately before looking at the options.',
          'Ask what the speaker is assuming without proving.',
          'Look for a missing step, a weak comparison, or a jump to a big conclusion.',
          'Choose the option that explains the broken link most clearly.'
        ],
        visuals: [
          { type: 'logic-flaw' },
          { type: 'missing-link' },
          { type: 'logic-balance' }
        ],
        examples: [
          {
            label: 'Example 1 - Simple missing step',
            prompt: 'Mia says the playground is safe because the grass is green. What is the flaw?',
            options: ['Green grass does not prove the playground is safe.', 'Grass can only be green in summer.', 'The playground must be empty.', 'Mia is talking about the wrong school.'],
            answerIndex: 0,
            steps: ['The claim is about safety.', 'Green grass is a nice detail, but it does not prove safety.', 'The reason does not support the conclusion properly.'],
            note: 'A flaw often means the reason is not enough.'
          },
          {
            label: 'Example 2 - Hidden assumption',
            prompt: 'The class must be noisy because the door was open. What is the flaw?',
            options: ['An open door does not prove the class is noisy.', 'The class has only one door.', 'The classroom is painted blue.', 'The teacher likes fresh air.'],
            answerIndex: 0,
            steps: ['The speaker assumes an open door means noise.', 'That link is not proven.', 'So the argument has a weak assumption.'],
            note: 'Do not let one detail prove too much.'
          },
          {
            label: 'Example 3 - False cause',
            prompt: 'The plant grew well because the pot was red. What is wrong with that reasoning?',
            options: ['The colour of the pot does not cause the plant to grow.', 'Plants cannot grow in pots.', 'Red pots are always broken.', 'The plant must be fake.'],
            answerIndex: 0,
            steps: ['The reason and the result are not connected.', 'The pot colour does not explain growth.', 'So the cause is wrong.'],
            note: 'A false cause is a common flaw.'
          },
          {
            label: 'Example 4 - Small sample mistake',
            prompt: 'Tom met one friendly dog, so all dogs must be friendly. What is the flaw?',
            options: ['One example is not enough to prove all dogs are friendly.', 'Dogs are not real animals.', 'Tom did not like the dog.', 'Friendly dogs are always small.'],
            answerIndex: 0,
            steps: ['The speaker uses one example to prove a big rule.', 'That is too small a sample.', 'The conclusion goes far beyond the evidence.'],
            note: 'One example cannot prove everything.'
          },
          {
            label: 'Example 5 - Comparing the wrong things',
            prompt: 'The new shoes must be better because they are brighter. What is the flaw?',
            options: ['Brightness does not prove the shoes are better.', 'Shoes should never be bright.', 'New shoes are always free.', 'Better shoes are always heavier.'],
            answerIndex: 0,
            steps: ['The speaker uses a detail that does not match "better".', 'Brighter does not prove better in quality.', 'So the comparison is weak.'],
            note: 'Look for whether the reason really matches the claim.'
          },
          {
            label: 'Example 6 - Stronger flaw',
            prompt: 'The shop must be open because the lights are on. What is the problem with that idea?',
            options: ['Lights can be on even when the shop is closed.', 'Shops cannot have lights.', 'The shop is definitely empty.', 'The lights prove it is daytime.'],
            answerIndex: 0,
            steps: ['The argument jumps from lights to open.', 'That is not a proven link.', 'The reason does not guarantee the claim.'],
            note: 'A flaw is the place where the proof breaks.'
          }
        ],
        questions: [
          { q: 'What is a flaw in logic?', options: ['A mistake in the thinking.', 'A spelling mistake only.', 'A funny sentence.', 'A long explanation.'], answerIndex: 0, note: 'A flaw is a broken or weak idea in the reasoning.' },
          { q: 'Which is the best clue that an argument is flawed?', options: ['The reason does not really prove the conclusion.', 'The sentence is short.', 'The topic is about animals.', 'The words are in capitals.'], answerIndex: 0, note: 'The proof must match the claim.' },
          { q: 'The sky is cloudy, so it must be raining. What is the flaw?', options: ['Cloudy sky does not prove rain.', 'Clouds cannot exist.', 'Rain only happens at night.', 'Clouds are always blue.'], answerIndex: 0, note: 'A clue is not always enough proof.' },
          { q: 'What do you look for first in a flaw question?', options: ['The missing link or assumption.', 'The longest answer.', 'The most colourful word.', 'The first option only.'], answerIndex: 0, note: 'Find the broken link first.' },
          { q: 'The class is happy because the room is big. What is the flaw?', options: ['A big room does not explain happiness.', 'Rooms cannot be big.', 'Classes are never happy.', 'The room is empty.'], answerIndex: 0, note: 'The reason does not match the result.' },
          { q: 'Which word means the speaker is taking something for granted?', options: ['assumption', 'question', 'answer', 'picture'], answerIndex: 0, note: 'An assumption is something not proved.' },
          { q: 'One student was kind, so all students must be kind. What is the flaw?', options: ['One example cannot prove everyone.', 'Students do not talk.', 'Kindness is not real.', 'Only one student exists.'], answerIndex: 0, note: 'A single example is not enough.' },
          { q: 'The cake is sweet because the plate is white. What is wrong?', options: ['The plate colour does not cause sweetness.', 'Cakes cannot be sweet.', 'White plates are rare.', 'Sweet cakes are always round.'], answerIndex: 0, note: 'The cause does not fit the effect.' },
          { q: 'Which answer best explains a logic flaw?', options: ['It shows why the reason does not prove the claim.', 'It repeats the claim with different words.', 'It gives a new story detail.', 'It changes the topic completely.'], answerIndex: 0, note: 'Explain the weak link clearly.' },
          { q: 'What should you ask yourself to find a flaw?', options: ['Does this reason really prove it?', 'Is this sentence the longest?', 'Is this answer funny?', 'Does this look easy?'], answerIndex: 0, note: 'The proof question helps find the flaw.' }
        ]
      },
      skills: [
        ['Find the Assumption', 'Notice what the speaker is taking for granted.'],
        ['Check the Link', 'See whether the evidence really leads to the conclusion.'],
        ['Name the Weakness', 'Explain the gap simply and clearly.']
      ],
      questionTypes: ['what is wrong with this reasoning', 'which option explains the flaw', 'assumption checks'],
      starter: ['Ask whether the conclusion could still fail even if the facts are true.', 'Look for missing evidence or unfair comparisons.', 'Translate complex wording into plain language.'],
      watchouts: ['mistaking disagreement for a logic flaw', 'focusing on topic facts instead of reasoning structure', 'missing hidden assumptions'],
      related: ['thinking-evaluating-arguments', 'thinking-drawing-conclusions']
    },
    'thinking-verbal-reasoning': {
      file: 'selective-thinking-verbal-reasoning.html',
      domain: 'thinking',
      title: 'Verbal Reasoning',
      subtitle: 'Read the clues, judge the reasoning, and choose what really fits',
      intro: 'Verbal reasoning is like being a word detective and a logic judge at the same time. The words on the page are clues. Your job is to follow the trail of reasoning — not to decide what you believe, but to judge what the evidence actually proves. Master the clue words and you unlock the whole topic.',
      lesson: {
        theory: [
          {
            title: 'What verbal reasoning means',
            text: 'It is a thinking task that uses words, clues, and logic. The answer must match the reasoning in the question — not just sound nice or be about the same topic. Always ask: does this option change the argument directly?',
            visual: 'claim-evidence'
          },
          {
            title: 'The clue word dictionary — learn these cold',
            text: 'Five power words that appear in almost every question: BECAUSE / SO / THEREFORE = reason or result (shows why something happened). BUT / ALTHOUGH / HOWEVER = contrast (warns that the next idea changes direction). IF / THEN = condition (one thing only happens when another does). ONLY / ALWAYS / NEVER = absolute rule (be careful — these are often traps). ALL / SOME / NONE = quantity (signals how broad the claim is). When you spot a clue word, underline it — it tells you the shape of the whole argument.',
            visual: 'clue-arrow'
          },
          {
            title: 'Support or weaken?',
            text: 'A support answer makes the claim harder to doubt. A weaken answer creates a reason to question it. Quick test: read the claim, then read the option. Does the argument feel stronger or weaker? The option that changes the argument MOST is the answer.',
            visual: 'support-weakens'
          },
          {
            title: 'The must-say-it-in-your-words rule',
            text: 'Before reading the options, pause and say the claim in your own words in one short sentence. This forces your brain to understand the logic, not just the words. Students who skip this step often pick an option about the same TOPIC rather than one that affects the CLAIM. The topic is the background. The claim is the target.',
            visual: 'logic-balance'
          }
        ],
        guidance: [
          'Read the main claim first, then look at the options one by one.',
          'Underline clue words like because, so, if, and but when they appear.',
          'Ask whether the option helps prove the claim or makes it weaker.',
          'Stay close to the exact words in the question so you do not drift away from the logic.'
        ],
        visuals: [
          { type: 'claim-evidence' },
          { type: 'clue-arrow' },
          { type: 'support-weakens' },
          { type: 'logic-balance' }
        ],
        exampleVisuals: ['claim-evidence', 'clue-arrow', 'support-weakens', 'logic-balance', 'claim-evidence', 'support-weakens', 'clue-arrow'],
        examples: [
          {
            label: 'Example 1 - Simple support',
            prompt: 'The ground is wet. Which statement best supports the idea that it rained?',
            options: ['The clouds were dark and it rained all morning.', 'The grass was cut yesterday.', 'The park had a new sign.', 'The children wore hats.'],
            answerIndex: 0,
            steps: ['Wet ground is a clue that rain may have fallen.', 'A statement about dark clouds and rain makes the idea stronger.', 'That supports the claim best.'],
            note: 'Support answers add strong evidence.'
          },
          {
            label: 'Example 2 - Simple weaken',
            prompt: 'The class finished early. Which fact weakens that idea?',
            options: ['Some students were still working when the bell rang.', 'The desks were neat and tidy.', 'The teacher smiled at the class.', 'The room had bright lights.'],
            answerIndex: 0,
            steps: ['A weakener shows the claim may not be fully true.', 'If some students were still working, the class was not finished early.', 'That weakens the statement.'],
            note: 'Weakening means making the claim less strong.'
          },
          {
            label: 'Example 3 - Must be true',
            prompt: 'All birds have wings. A robin is a bird. What must be true?',
            options: ['A robin has wings.', 'A robin can swim.', 'A robin is a fish.', 'A robin is a building.'],
            answerIndex: 0,
            steps: ['Start with the given facts only.', 'If robins are birds and all birds have wings, the robin has wings too.', 'This must be true.'],
            note: 'Must be true questions need facts, not guesses.'
          },
          {
            label: 'Example 4 - Spot the best evidence',
            prompt: 'The school picnic will probably be sunny. Which statement best supports this idea?',
            options: ['The forecast says the sky will be clear all afternoon.', 'The playground has tall trees.', 'The lunch boxes are packed.', 'The principal is at school.'],
            answerIndex: 0,
            steps: ['Look for evidence that points toward sun, not just weather words.', 'A forecast saying clear skies is direct support.', 'That is stronger than a statement about the weather yesterday.'],
            note: 'The best support is the clearest match.'
          },
          {
            label: 'Example 5 - Harder reasoning',
            prompt: 'Ella says the library was busy because every table had books on it. Which statement weakens her reasoning most?',
            options: ['The library lights were on, but no people were inside.', 'The books were neatly stacked.', 'The shelves were tall.', 'The chairs were blue.'],
            answerIndex: 0,
            steps: ['Check whether the reason really proves "busy".', 'Tables can have books on them even when no one is there.', 'A statement showing the room was empty weakens her idea.'],
            note: 'A weakener shows the reason is not enough.'
          },
          {
            label: 'Example 6 - Clue word meaning',
            prompt: 'The boy was smiling because he had finished the puzzle. What clue word tells you the reason?',
            options: ['because', 'before', 'under', 'near'],
            answerIndex: 0,
            steps: ['The word because introduces the reason.', 'It tells us why the boy was smiling.', 'So the reason is linked directly to the smile.'],
            note: 'Clue words show how the ideas connect.'
          },
          {
            label: 'Example 7 - Strongest support',
            prompt: 'A child says the game was fair. Which statement is the strongest support?',
            options: ['Both players had the same chance to win.', 'The game was played outside.', 'The game used a large board.', 'The players wore different hats.'],
            answerIndex: 0,
            steps: ['A fair game gives each player the same chance.', 'Look for the most direct evidence.', 'The best support says both players had the same chance.'],
            note: 'Choose the clearest evidence, not just a related fact.'
          }
        ],
        questions: [
          { q: 'Which statement best supports: "The grass is wet because it rained"?', options: ['It rained during the night.', 'The grass was cut yesterday.', 'The sky was blue at noon.', 'The park was busy with children.'], answerIndex: 0, note: 'That is direct support.' },
          { q: 'Which statement weakens: "The shop opened early today"?', options: ['The sign said it would open late.', 'The shop sold fresh bread.', 'The door was painted blue.', 'A worker smiled at customers.'], answerIndex: 0, note: 'A conflicting fact weakens the claim.' },
          { q: 'What must be true if all cats are animals and Mimi is a cat?', options: ['Mimi is an animal.', 'Mimi is a bird.', 'Mimi is asleep.', 'Mimi is in a house.'], answerIndex: 0, note: 'Facts must be followed exactly.' },
          { q: 'Which clue word often shows a reason?', options: ['because', 'before', 'around', 'behind'], answerIndex: 0, note: 'Because usually gives a reason.' },
          { q: 'Which statement best supports: "The game is fair"?', options: ['Both players have the same chance to win.', 'One player gets extra turns.', 'The winner is chosen by a teacher.', 'The game is played outside.'], answerIndex: 0, note: 'Equal chance supports fairness.' },
          { q: 'Which statement weakens: "The class went outside at lunch"?', options: ['It was raining at lunchtime and the class stayed inside.', 'The bell rang at midday.', 'The tables were cleaned after lunch.', 'The students packed their bags.'], answerIndex: 0, note: 'That is the opposite of the claim.' },
          { q: 'If all triangles have 3 sides, what must be true about a triangle?', options: ['It has 3 sides.', 'It has 4 corners.', 'It is always red.', 'It can never be folded.'], answerIndex: 0, note: 'Use the rule exactly.' },
          { q: 'Which option is the best support for: "The car stopped because the fuel ran out"?', options: ['The fuel gauge was already on empty.', 'The car was washed yesterday.', 'The driver wore a hat.', 'The road had many trees.'], answerIndex: 0, note: 'That evidence matches the claim well.' },
          { q: 'Which statement weakens: "Everyone finished the puzzle"?', options: ['One student was still missing a piece.', 'The puzzles were colourful.', 'The classroom was quiet.', 'The teacher gave a hint.'], answerIndex: 0, note: 'One exception weakens "everyone".' },
          { q: 'What is the main job of verbal reasoning questions?', options: ['To choose the answer that best fits the logic and clues.', 'To remember long lists of facts.', 'To find the fastest calculator method.', 'To copy the sentence exactly.'], answerIndex: 0, note: 'The reasoning must match the evidence.' },
          { q: 'Which statement is a stronger support: "The road was wet" or "It had just rained for an hour"?', options: ['It had just rained for an hour.', 'The road was near a park.', 'The sky was bright last week.', 'The car was parked nearby.'], answerIndex: 0, note: 'It gives clearer evidence.' },
          { q: 'Which statement best weakens: "The plant grew because it was watered"?', options: ['The plant had also been in bright sunlight every day.', 'The plant sat on a windowsill.', 'The plant was in a pot.', 'The plant had green leaves.'], answerIndex: 0, note: 'Another reason means the claim is not proven fully.' },
          { q: 'If all stars are bright objects and this object is a star, what must be true?', options: ['It is a bright object.', 'It is a cloud.', 'It is made of paper.', 'It is small.'], answerIndex: 0, note: 'The rule must apply.' },
          { q: 'Which clue word can show a result?', options: ['so', 'under', 'near', 'between'], answerIndex: 0, note: 'So often shows what happens next.' },
          { q: 'Which is the best way to check an answer?', options: ['See whether it supports or weakens the main claim directly.', 'Choose the longest sentence.', 'Pick the option with the most punctuation.', 'Choose the first word you notice.'], answerIndex: 0, note: 'Keep the claim in mind while choosing.' }
        ]
      },
      skills: [
        ['Main Claim', 'Spot what is being argued before looking at the options.'],
        ['Clue Word Control', 'Notice words like because, so, if, and but because they guide the logic.'],
        ['Support vs Weaken', 'Judge whether an option strengthens the claim or makes it less believable.']
      ],
      questionTypes: ['support the claim', 'weaken the argument', 'must be true from the facts'],
      starter: ['Say the main claim in your own words first.', 'Look for clue words that show reasons or results.', 'Choose the answer that changes the argument most clearly.'],
      watchouts: ['choosing the option you like best instead of the best evidence', 'missing small clue words like but or so', 'using outside knowledge when the facts already answer the question'],
      related: ['thinking-evaluating-arguments', 'thinking-drawing-conclusions', 'thinking-identifying-flaws']
    },
    'thinking-problem-solving': {
      file: 'selective-thinking-problem-solving.html',
      domain: 'thinking',
      title: 'Problem Solving with Numbers',
      subtitle: 'Choose efficient strategies for puzzles and unfamiliar setups',
      intro: 'Problem solving is the skill that separates students who finish the exam confidently from those who run out of time. It is not about working harder — it is about working smarter. The best solvers spend 10 seconds choosing a strategy and then execute cleanly. No random trying. No panicking. Just a plan and a check.',
      lesson: {
        theory: [
          {
            title: 'What are they testing?',
            text: 'They are testing whether you can choose a smart method, not just calculate fast. The answer might come from a table, a list, a pattern, working backwards, or testing the answer choices directly. A student who picks the right strategy rarely needs to do much calculation at all.',
            visual: 'strategy-map'
          },
          {
            title: 'RUCSAC — the 6-step problem solving method',
            text: 'Use RUCSAC every time: R = READ the problem all the way through. U = UNDERLINE the key numbers and the question word (how many? how much? what is left?). C = CHOOSE a strategy (list, pattern, work backwards, draw it). S = SOLVE using your chosen strategy. A = ANSWER by writing a clear number with units. C = CHECK by plugging the answer back into the original clue. RUCSAC prevents the two most common mistakes: misreading the question and forgetting to check.',
            visual: 'list-grid'
          },
          {
            title: 'The 4 strategies and when to use them',
            text: 'MAKE A LIST or TABLE: when there are several cases to check (e.g. which combinations work?). FIND THE PATTERN: when numbers go up or down by a fixed amount. WORK BACKWARDS: when you know the end result and want the starting value. TEST THE ANSWER CHOICES: when the options are numbers — plug each back into the clue and see which one fits. Exam tip: working backwards and testing answer choices are the two fastest strategies on a multiple-choice exam.',
            visual: 'work-backwards'
          },
          {
            title: 'The 30-second rule',
            text: 'If you have been calculating for 30 seconds with no progress, STOP. You have probably missed a simpler path. Re-read the question, look at the answer choices for a clue about the size of the answer, and try a different strategy. Students who keep going blindly waste time and still get it wrong. Smart solvers reset and try again from a different angle.',
            visual: 'check-fit'
          }
        ],
        guidance: [
          'Rewrite the puzzle in your own words before calculating.',
          'Use a table or list when there are several cases to check.',
          'Look for a pattern or a simpler route before doing long work.',
          'Check that your final answer fits the clue you were given.'
        ],
        visuals: [
          { type: 'strategy-map' },
          { type: 'list-grid' },
          { type: 'work-backwards' }
        ],
        examples: [
          {
            label: 'Example 1 - Simple organise first',
            prompt: 'A box has 3 red balls and 2 blue balls. How many balls are there altogether?',
            options: ['5', '6', '4', '8'],
            answerIndex: 0,
            steps: ['Write the numbers down: 3 and 2.', 'Add them together.', '3 + 2 = 5.'],
            note: 'Start with the numbers you know.'
          },
          {
            label: 'Example 2 - Use a table',
            prompt: 'There are 2 rows of chairs with 4 chairs in each row. How many chairs are there?',
            options: ['8', '6', '10', '12'],
            answerIndex: 0,
            steps: ['Make the problem neat: 2 rows and 4 chairs in each row.', 'Multiply 2 × 4.', 'The answer is 8 chairs.'],
            note: 'A table or picture can help you see groups.'
          },
          {
            label: 'Example 3 - Work backwards',
            prompt: 'A number becomes 15 after adding 7. What was the number before that?',
            options: ['8', '22', '10', '12'],
            answerIndex: 0,
            steps: ['Think backwards from the answer 15.', 'Undo the +7 by subtracting 7.', '15 - 7 = 8.'],
            note: 'Working backwards is a strong strategy.'
          },
          {
            label: 'Example 4 - Find the pattern',
            prompt: 'The pattern is 2, 4, 6, 8, __. What comes next?',
            options: ['10', '9', '12', '14'],
            answerIndex: 0,
            steps: ['Look at what changes each time.', 'The numbers go up by 2.', 'So the next number is 10.'],
            note: 'Patterns are easier when you spot the rule.'
          },
          {
            label: 'Example 5 - Choose the best strategy',
            prompt: 'A child has 24 stickers and wants to share them equally between 6 friends. What is the best first move?',
            options: ['Divide 24 by 6.', 'Add 24 and 6.', 'Multiply 24 by 6.', 'Guess and check only.'],
            answerIndex: 0,
            steps: ['The word equally tells you to share the amount.', 'Division is the right operation.', '24 ÷ 6 = 4 stickers each.'],
            note: 'The wording helps you pick the method.'
          },
          {
            label: 'Example 6 - Test the answer',
            prompt: 'A puzzle answer is 9. Which check helps most?',
            options: ['See whether the answer fits the clues.', 'Choose the neatest number.', 'Pick the answer that looks fastest.', 'Guess the next number.'],
            answerIndex: 0,
            steps: ['A good solver checks the answer against the clues.', 'If it fits, the method worked.', 'If not, try another strategy.'],
            note: 'Always check the answer against the question.'
          }
        ],
        questions: [
          { q: 'What should you do first in a number puzzle?', options: ['Organise the clues.', 'Guess quickly.', 'Choose the biggest number.', 'Skip the question.'], answerIndex: 0, note: 'Organisation comes first.' },
          { q: 'A problem says "share equally". What is the best operation?', options: ['Division', 'Addition', 'Subtraction', 'Counting by tens only'], answerIndex: 0, note: 'Share equally means divide.' },
          { q: 'What is a good sign you have found a pattern?', options: ['The same rule keeps repeating.', 'The numbers look random.', 'The question is long.', 'The answer is on the next page.'], answerIndex: 0, note: 'A pattern follows a rule.' },
          { q: 'Which strategy is useful when there are many possibilities?', options: ['Make a list or table.', 'Ignore the clues.', 'Guess the first answer.', 'Only use mental maths.'], answerIndex: 0, note: 'A table keeps things tidy.' },
          { q: 'If the question gives a final answer and asks for the start, what strategy helps?', options: ['Work backwards.', 'Add more numbers.', 'Draw random shapes.', 'Change the question.'], answerIndex: 0, note: 'Working backwards fits this type.' },
          { q: 'What does a good solver check at the end?', options: ['Whether the answer fits the clue.', 'Whether the number is big.', 'Whether it looks easy.', 'Whether it was guessed.'], answerIndex: 0, note: 'The answer must match the question.' },
          { q: 'If 3 bags each have 5 apples, what is the best strategy?', options: ['Multiply 3 × 5.', 'Add 3 + 5 + 5 + 5 randomly.', 'Subtract 5 from 3.', 'Guess 15 without checking.'], answerIndex: 0, note: 'Groups of equal size use multiplication.' },
          { q: 'Which action helps most before solving?', options: ['Rewrite the puzzle in your own words.', 'Read only the answer choices.', 'Skip the numbers.', 'Start with the hardest step.'], answerIndex: 0, note: 'Rewriting helps make it clear.' },
          { q: 'A pattern goes up by 4 each time. What comes after 11?', options: ['15', '14', '13', '12'], answerIndex: 0, note: 'Add 4 to keep the pattern going.' },
          { q: 'What is the smartest way to solve a tricky number puzzle?', options: ['Use a clear method and check it.', 'Rush and hope.', 'Pick the longest answer.', 'Ignore the wording.'], answerIndex: 0, note: 'Clear method first, then check.' }
        ]
      },
      skills: [
        ['Choose a Strategy', 'Decide whether to list, draw, work backwards, or use a pattern.'],
        ['Organise the Information', 'Turn messy wording into a simple structure.'],
        ['Check Efficiency', 'Look for the shortest accurate path to the answer.']
      ],
      questionTypes: ['number puzzles', 'logic grids with values', 'work-backwards challenges'],
      starter: ['Rewrite the puzzle in your own words.', 'Use a table or list when there are several cases.', 'Check whether a simple pattern appears before brute force solving.'],
      watchouts: ['starting with calculations before understanding the puzzle', 'repeating cases', 'missing a shortcut hidden in the structure'],
      related: ['thinking-data-analysis', 'maths-patterns-algebra']
    },
    'thinking-data-analysis': {
      file: 'selective-thinking-data-analysis.html',
      domain: 'thinking',
      title: 'Data Analysis under Rules',
      subtitle: 'Read tables and schedules, follow every rule, and ignore the extra noise',
      intro: 'Data analysis under rules is about two skills working together: reading accurately and filtering strictly. Imagine you are a gate agent at an airport — you have a checklist, and a passenger only boards if they tick EVERY box. One missing box and they are out. That is exactly how these questions work.',
      lesson: {
        theory: [
          {
            title: 'What this topic is really testing',
            text: 'The test checks whether you can follow multiple rules at once without losing track. It is not about general knowledge. It is about reading a table or timetable, applying every rule, and choosing the option that satisfies ALL conditions — not just most of them.',
            visual: 'rule-board'
          },
          {
            title: 'Circle the rule words first — always',
            text: 'Rule words are the engine of the question. Before you look at the data, go through the question and circle: ONLY, EXCEPT, MUST, NOT, AND, OR, IF, BEFORE, AFTER, AT LEAST, NO MORE THAN. Each of these words sets a condition. If you miss one, you will choose a wrong answer that looks perfectly fine. In the exam, these words are often hidden in plain sight — they look small but carry all the power.',
            visual: 'filter-checklist'
          },
          {
            title: 'The elimination method — fast and safe',
            text: 'Do not try to find the correct answer by looking for what fits. Instead, ELIMINATE answers that break any rule. Cross out each option as soon as it fails one condition. The answer is the last one standing. This method is faster and safer than searching for the right answer directly, especially when the question has 3 or more rules.',
            visual: 'check-fit'
          },
          {
            title: 'Build a micro-checklist for every question',
            text: 'When a question has 2 or more rules, write them as a numbered list before looking at options. Example: 1. Must be a weekday. 2. Must be after 12 pm. 3. Must not be Thursday. Then check each option against the list in order. Stop and cross out as soon as one rule fails. Students who skip the checklist almost always miss one condition and pick the trap answer. Thirty seconds of list-writing saves minutes of second-guessing.',
            visual: 'rule-board'
          }
        ],
        guidance: [
          'Circle the rule words first, such as only, except, must, and not.',
          'Use a small checklist so you do not forget any condition.',
          'If one option breaks a rule, cross it out and keep checking.'
        ],
        visuals: [
          { type: 'rule-board' },
          { type: 'timetable-grid' },
          { type: 'filter-checklist' },
          { type: 'check-fit' }
        ],
        exampleVisuals: ['timetable-grid', 'rule-board', 'filter-checklist', 'check-fit', 'rule-board'],
        examples: [
          {
            label: 'Example 1 - One rule only',
            prompt: 'A homework club meets on Monday, Wednesday, and Friday. Which day fits the rule?',
            options: ['Tuesday', 'Wednesday', 'Sunday', 'Saturday'],
            answerIndex: 1,
            steps: ['Read the rule: only Monday, Wednesday, and Friday are allowed.', 'Check the choices one by one.', 'Wednesday fits the rule.'],
            note: 'Start by matching the rule word for word.'
          },
          {
            label: 'Example 2 - Time rule',
            prompt: 'A snack break happens only after 12:00 pm. Which time fits best?',
            options: ['11:30 am', '12:15 pm', '9:00 am', '10:45 am'],
            answerIndex: 1,
            steps: ['The rule says after 12:00 pm.', '12:15 pm is after 12:00 pm.', 'The other times are too early.'],
            note: 'Watch the time carefully.'
          },
          {
            label: 'Example 3 - Two conditions',
            prompt: 'A bus stop is for Year 5 students with a pass. Which student can use it?',
            options: ['Year 4 with a pass', 'Year 5 without a pass', 'Year 5 with a pass', 'Year 6 with a pass'],
            answerIndex: 2,
            steps: ['The student must be in Year 5.', 'The student must also have a pass.', 'Only Year 5 with a pass fits both rules.'],
            note: 'Both rules must be true.'
          },
          {
            label: 'Example 4 - Sort by box',
            prompt: 'Red cards go in Box A and blue cards go in Box B. A red card is shown. Where does it go?',
            options: ['Box A', 'Box B', 'Either box', 'Nowhere'],
            answerIndex: 0,
            steps: ['Find the colour rule first.', 'Red means Box A.', 'So the red card goes in Box A.'],
            note: 'Colour rules are often simple but easy to rush.'
          },
          {
            label: 'Example 5 - One rule blocks the answer',
            prompt: 'A club meets on school days but not on rainy days. If Wednesday is rainy, which day could still work?',
            options: ['Wednesday', 'Saturday', 'Sunday', 'Monday'],
            answerIndex: 3,
            steps: ['The day must be a school day.', 'It must also not be rainy.', 'Monday can work if it is not rainy.'],
            note: 'If one rule breaks, the day is out.'
          }
        ],
        questions: [
          { q: 'What is the main job in this topic?', options: ['Follow the rules exactly.', 'Guess the answer quickly.', 'Ignore the table.', 'Pick the longest option.'], answerIndex: 0, note: 'Rule-following is the skill being tested.' },
          { q: 'If one answer breaks a rule, what should happen?', options: ['Cross it out.', 'Keep it because it is close.', 'Choose it anyway.', 'Ignore the rule.'], answerIndex: 0, note: 'One broken rule is enough to remove it.' },
          { q: 'Which word is a rule word?', options: ['Only', 'Blue', 'Table', 'Maybe'], answerIndex: 0, note: 'Only tells you a condition.' },
          { q: 'A sign says "Use the lab only on Thursday." Which day fits?', options: ['Monday', 'Thursday', 'Tuesday', 'Friday'], answerIndex: 1, note: 'Thursday is the allowed day.' },
          { q: 'A student needs a permission note and a hat to go outside. Which student can go?', options: ['Has a note and a hat', 'Has a note only', 'Has a hat only', 'Has neither'], answerIndex: 0, note: 'Both conditions must be true.' },
          { q: 'What helps most when there are many clues?', options: ['A checklist', 'A bigger guess', 'Rereading the answer choices only', 'Skipping the table'], answerIndex: 0, note: 'A checklist keeps the rules tidy.' },
          { q: 'If a timetable says "after lunch", what should you check first?', options: ['The time', 'The colour', 'The title', 'The page number'], answerIndex: 0, note: 'Time is the important clue.' },
          { q: 'When two choices remain, what should you do?', options: ['Check both against every rule again.', 'Pick the first one.', 'Guess the more colourful one.', 'Stop checking.'], answerIndex: 0, note: 'Re-checking avoids mistakes.' },
          { q: 'A rule says "not on rainy days." What does that mean?', options: ['Rainy days are not allowed.', 'Only rainy days are allowed.', 'Rain does not matter.', 'Every day is allowed.'], answerIndex: 0, note: 'Not on rainy days means rainy days are out.' },
          { q: 'What is the safest habit?', options: ['Match each clue one by one.', 'Use memory only.', 'Choose quickly and move on.', 'Ignore extra words.'], answerIndex: 0, note: 'One clue at a time is safest.' }
        ]
      },
      skills: [
        ['Rule Filtering', 'Pick out only the rules that matter for the current question.'],
        ['Table and Schedule Reading', 'Move accurately across rows, columns, and time slots.'],
        ['Constraint Matching', 'Check that every condition is satisfied before choosing.']
      ],
      questionTypes: ['timetable questions', 'rule-based sorting tasks', 'multi-condition table problems'],
      starter: ['Highlight the rule words first.', 'Tick off each condition as you satisfy it.', 'Use elimination when several options are close.'],
      watchouts: ['forgetting one of the rules', 'reading the wrong row or time block', 'answering from memory instead of checking the data'],
      related: ['maths-data-interpretation', 'thinking-problem-solving']
    },
    'thinking-spatial-reasoning': {
      file: 'selective-thinking-spatial-reasoning.html',
      domain: 'thinking',
      title: 'Spatial Reasoning',
      subtitle: 'Rotate, reflect, and fit shapes mentally',
      intro: 'Spatial reasoning is the superpower of imagining shapes moving in your mind. It feels hard at first because most of us do not practise it the way we practise sums. But with one simple trick — tracking one special point — even the hardest rotation or reflection question becomes manageable. This skill also transfers: students who master spatial reasoning think more clearly in geometry, maps, and design.',
      lesson: {
        theory: [
          {
            title: 'What this topic is really testing',
            text: 'The test checks whether you can mentally move a shape. It might be rotated (turned), reflected (flipped), or split into pieces that need to fit together. The answer comes from tracking the shape carefully, not from guessing by the overall outline — outlines can look very similar after a transformation.',
            visual: 'rotation-arrow'
          },
          {
            title: 'The one-point tracking trick',
            text: 'Here is the most powerful habit in spatial reasoning: pick ONE unique feature — a shaded corner, a notch, a dot, or an arrow — and track only that point. Ask: where does it end up after the rotation or reflection? Once you know where that point lands, you can almost always identify the answer without visualising the whole shape. This single technique solves about 80% of rotation questions.',
            visual: 'mirror-flip'
          },
          {
            title: 'Turn vs flip vs fit — know the difference instantly',
            text: 'ROTATION (turn): the shape spins around a centre point. The shape does NOT flip — it just points in a new direction. 90 degrees = quarter turn, 180 degrees = half turn. REFLECTION (flip): the shape mirrors across a line. One side becomes the other — like a photo in a mirror. SIZE stays the same but left and right swap. FIT / COMPOSE: two or more pieces join edge to edge to make a target shape. Check edges, not just general outline.',
            visual: 'fit-pieces'
          },
          {
            title: 'Visualisation tricks that actually work in exams',
            text: 'For ROTATIONS: pretend you are sitting inside the shape and turning with it. Ask which direction your special point now faces. For REFLECTIONS: put your hand flat on the page as if it is a mirror line — the other side is the flip. For NETS folding into 3D shapes: fold in your imagination one face at a time, starting from the bottom face. For FITTING pieces: match the longest edge first, then check the corners. Exam tip: eliminate wrong answers by finding the one that places your special point in the wrong spot.',
            visual: 'rotation-arrow'
          }
        ],
        guidance: [
          'Choose one unique corner or mark so you can track the shape.',
          'Think "turn" for rotation and "flip" for reflection.',
          'Check the edges when pieces need to fit together.'
        ],
        visuals: [
          { type: 'rotation-arrow' },
          { type: 'mirror-flip' },
          { type: 'fit-pieces' }
        ],
        exampleVisuals: ['rotation-arrow', 'mirror-flip', 'fit-pieces', 'shape-symmetry', 'net-fold'],
        examples: [
          {
            label: 'Example 1 - A simple turn',
            prompt: 'A shape turns a quarter turn to the right. What happens?',
            options: ['It rotates 90 degrees.', 'It flips over.', 'It gets bigger.', 'It disappears.'],
            answerIndex: 0,
            steps: ['A quarter turn means 90 degrees.', 'Turning right is a rotation.', 'So the shape rotates 90 degrees.'],
            note: 'Rotation means the shape turns around.'
          },
          {
            label: 'Example 2 - Mirror image',
            prompt: 'A shape is seen in a mirror. What is that called?',
            options: ['A reflection', 'A rotation', 'A resize', 'A translation only'],
            answerIndex: 0,
            steps: ['A mirror gives a flipped image.', 'Flipped means reflection.', 'The shape is not just turned.'],
            note: 'Reflection means flipping across a line.'
          },
          {
            label: 'Example 3 - Track one corner',
            prompt: 'A shape has one blue corner. After turning, where should you look first?',
            options: ['Find the blue corner again.', 'Ignore the blue corner.', 'Count all the sides only.', 'Guess by the size.'],
            answerIndex: 0,
            steps: ['Use one unique mark to track the movement.', 'The blue corner helps you follow the turn.', 'Then compare the new position.'],
            note: 'One clear mark makes the shape easier to follow.'
          },
          {
            label: 'Example 4 - Fit the pieces',
            prompt: 'Two puzzle pieces need to join to make one square. What should you check first?',
            options: ['Whether the edges match.', 'Whether the colours are the same.', 'Whether the pieces are the biggest.', 'Whether the pieces are both triangles.'],
            answerIndex: 0,
            steps: ['Puzzle pieces fit by their edges.', 'If the edges line up, the shape can join.', 'So the first check is the edge match.'],
            note: 'Fit questions are about shape and edge matching.'
          },
          {
            label: 'Example 5 - Net into a cube',
            prompt: 'A flat shape is folded into a cube. What is important?',
            options: ['Which faces touch when it folds.', 'How shiny the paper is.', 'How many colours are used.', 'Whether the shape is moved across the page.'],
            answerIndex: 0,
            steps: ['A net is flat before folding.', 'The faces must line up to make the cube.', 'Check which faces touch after the fold.'],
            note: 'Net questions are about folding the flat shape into 3D.'
          }
        ],
        questions: [
          { q: 'What does rotation mean?', options: ['Turning a shape', 'Flipping a shape in a mirror', 'Making a shape larger', 'Colouring a shape'], answerIndex: 0, note: 'Rotation is a turn.' },
          { q: 'What does reflection mean?', options: ['A flip across a line', 'A turn around a point', 'A shape that grows', 'A shape that disappears'], answerIndex: 0, note: 'Reflection is a mirror flip.' },
          { q: 'Why is one corner or mark useful?', options: ['It helps track the shape.', 'It makes the shape bigger.', 'It changes the answer.', 'It hides the shape.'], answerIndex: 0, note: 'A unique mark helps you follow movement.' },
          { q: 'What should you check in a fit question?', options: ['Whether the edges match', 'Whether the colour is bright', 'Whether the shape is heavy', 'Whether the page is neat'], answerIndex: 0, note: 'Edges tell you if pieces fit.' },
          { q: 'If a shape turns but does not flip, what happened?', options: ['Rotation', 'Reflection', 'Zoom', 'Colour change'], answerIndex: 0, note: 'Turning without flipping is rotation.' },
          { q: 'What should you think about first in a mirror question?', options: ['Which side flips over', 'How many colours there are', 'How fast the shape moves', 'Which page it is on'], answerIndex: 0, note: 'A mirror flips the shape.' },
          { q: 'A flat shape becomes a cube. What is that flat shape called?', options: ['A net', 'A line', 'A circle', 'A ruler'], answerIndex: 0, note: 'A net folds into a 3D object.' },
          { q: 'Which clue helps most with a rotated shape?', options: ['A special corner or dot', 'The colour of the paper only', 'The size of the page', 'The word count'], answerIndex: 0, note: 'A unique point helps track the turn.' },
          { q: 'What does "fit together" mean?', options: ['Pieces join correctly', 'Pieces stay separate', 'Pieces get bigger', 'Pieces turn blue'], answerIndex: 0, note: 'Fit questions are about joining parts.' },
          { q: 'What is the safest way to answer spatial questions?', options: ['Track one feature and compare carefully.', 'Guess from the outside shape only.', 'Pick the tallest drawing.', 'Ignore the directions.'], answerIndex: 0, note: 'Careful tracking is the best habit.' }
        ]
      },
      skills: [
        ['Rotation', 'Picture how a shape looks after turning.'],
        ['Reflection', 'Track which parts reverse and which stay aligned.'],
        ['Fit and Compose', 'See how parts combine into a larger shape or solid.']
      ],
      questionTypes: ['rotated-shape matching', 'mirror-image checks', 'which pieces fit together'],
      starter: ['Focus on one unique corner or marking to track movement.', 'Imagine the turn in small steps.', 'Use your finger to trace edge order if needed.'],
      watchouts: ['confusing a reflection with a rotation', 'judging only by overall outline', 'forgetting that orientation can change while size stays the same'],
      related: ['maths-geometry', 'maths-position-coordinates']
    },
  });
})();
