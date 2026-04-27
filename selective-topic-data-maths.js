(function () {
  window.SELECTIVE_TOPIC_TOPICS = window.SELECTIVE_TOPIC_TOPICS || {};
  Object.assign(window.SELECTIVE_TOPIC_TOPICS, {
    'maths-whole-numbers': {
      file: 'selective-maths-whole-numbers.html',
      domain: 'maths',
      title: 'Whole Numbers & Multi-Step Operations',
      subtitle: 'Place value, estimation, and choosing the right operation path',
      intro: 'Imagine a detective looking at clues scattered across a crime scene. A selective maths question does exactly the same thing — it hides several operations inside one story and waits to see if you can find them all. Every number has a position that matters, every word is a clue about which operation to use, and a quick estimate at the start tells you when an answer has gone wrong before you even finish. Master these three habits and multi-step questions become very manageable.',
      lesson: {
        theory: [
          {
            title: 'Place value — every digit has a job',
            text: 'Think of a number like a team of players, each in their own position. In 4,682: the 4 plays in the thousands position (worth 4,000), the 6 in hundreds (worth 600), the 8 in tens (worth 80), and the 2 in ones (worth 2). Change one player to the wrong position and the team falls apart. When comparing numbers, always go left to right — the FIRST digit that differs decides the winner. 5,418 vs 5,481: thousands match (5), hundreds match (4), so look at tens: 8 > 1 so 5,481 wins.',
            visual: 'place-value'
          },
          {
            title: 'Estimate FIRST — it is your safety net',
            text: 'Before any calculation, round each number to the nearest friendly value and do a rough check. 398 + 206 + 51: round to 400 + 200 + 50 = 650. Your exact answer should be CLOSE to 650. If you get 1,200 you know something went wrong without even checking the steps. This habit catches errors in under 5 seconds and is used by every strong maths student in the selective exam.',
            visual: 'rounding-estimate'
          },
          {
            title: 'Multi-step problems — one step at a time',
            text: 'When a problem has the words "then", "after that", or "how many are left", it needs more than one operation. The trick is to write each step on a SEPARATE line and label it. Step 1: 245 + 180 = 425 (books after buying more). Step 2: 425 - 96 = 329 (books after giving some away). Writing steps on separate lines prevents the most common mistake: mixing two calculations on one line and losing track of which number is which.',
            visual: 'multi-step-calc'
          },
          {
            title: 'Exam shortcuts and secret weapons',
            text: 'Place value instant tricks: adding 1,000 to any number? Just increase the thousands digit by 1. 6,274 + 1,000 = 7,274 in one second. Expanded form shortcut: zero digits are invisible — 9,040 expands to 9,000 + 40 (skip the hundreds and ones because they are zero). Operation keyword guide: "total", "altogether", "combined" = add. "difference", "how many more", "left over" = subtract. "groups of", "each" = multiply or divide.',
            visual: 'expanded-form'
          }
        ],
        guidance: [
          'Start by reading the question twice and circle the numbers, units, and verbs.',
          'Work from place value first, because a small digit mistake can change the whole answer.',
          'Estimate before you calculate so you can check whether the final answer makes sense.'
        ],
        visuals: [
          { type: 'place-value' },
          { type: 'number-line-compare' },
          { type: 'expanded-form' }
        ],
        exampleVisuals: ['place-value', 'expanded-form', 'number-line-compare', 'multi-step-calc', 'rounding-estimate'],
        examples: [
          {
            label: 'Example 1 - Very simple place value',
            prompt: 'What is the value of the 6 in 4,682?',
            steps: ['The 6 is in the hundreds place.', 'Hundreds means 600.'],
            answer: '600',
            note: 'This is the easiest kind of place value question.'
          },
          {
            label: 'Example 2 - Expanded form',
            prompt: 'Write 7,304 in expanded form.',
            steps: ['7,304 has 7 thousands, 3 hundreds, 0 tens, and 4 ones.', 'Expanded form is 7,000 + 300 + 4.'],
            answer: '7,000 + 300 + 4',
            note: 'Zero tens are usually skipped in the final expanded form.'
          },
          {
            label: 'Example 3 - Comparing numbers',
            prompt: 'Which is greater: 5,418 or 5,481?',
            steps: ['Compare the thousands: both are 5,000.', 'Compare the hundreds: both have 4 hundreds, so move to the tens place.', '8 tens is greater than 1 ten.'],
            answer: '5,481',
            note: 'Always compare from left to right.'
          },
          {
            label: 'Example 4 - Two-step calculation',
            prompt: 'A library has 245 books and buys 180 more. Then it gives away 96 books. How many books are left?',
            steps: ['First add: 245 + 180 = 425.', 'Then subtract: 425 - 96 = 329.'],
            answer: '329 books',
            note: 'This is a simple multi-step question.'
          },
          {
            label: 'Example 5 - Estimation before exact work',
            prompt: 'Estimate 398 + 206 + 51, then find the exact answer.',
            steps: ['Estimate by rounding: 400 + 200 + 50 = 650.', 'Exact calculation: 398 + 206 = 604, then 604 + 51 = 655.'],
            answer: 'Exact answer: 655',
            note: 'The estimate helps you notice if an answer is way too small or too large.'
          }
        ],
        questions: [
          { q: 'What is the value of the 8 in 8,152?', a: '8,000', note: 'It is in the thousands place.' },
          { q: 'Write 9,040 in expanded form.', a: '9,000 + 40', note: 'There are no hundreds or ones.' },
          { q: 'Which is larger: 6,302 or 6,230?', a: '6,302', note: 'Compare the tens place after the thousands and hundreds match.' },
          { q: 'A box holds 128 pencils. If 37 are taken out, how many remain?', a: '91', note: 'Subtract carefully: 128 - 37 = 91.' },
          { q: 'What is 700 + 60 + 4 written as a number?', a: '764', note: 'Put each part into the correct place value.' },
          { q: 'What is the value of the 3 in 3,506?', a: '3,000', note: 'The 3 is in the thousands place.' },
          { q: 'Which is smaller: 4,910 or 4,901?', a: '4,901', note: 'Compare the tens and ones after the thousands and hundreds match.' },
          { q: 'Estimate 498 + 201.', a: 'About 700', note: 'Round 498 to 500 and 201 to 200.' },
          { q: 'A train has 245 passengers and 150 more get on. How many passengers now?', a: '395', note: 'Add 245 + 150.' },
          { q: 'What number is 1,000 more than 6,274?', a: '7,274', note: 'Adding 1,000 changes only the thousands place.' },
          { q: 'Write 5,080 in expanded form.', a: '5,000 + 80', note: 'There are zero hundreds and zero ones.' },
          { q: 'Which number comes between 3,450 and 3,540?', a: '3,500', note: 'Look for the number with 5 hundreds.' },
          { q: 'A farmer has 640 eggs and sells 125. How many are left?', a: '515', note: 'Subtract 640 - 125.' },
          { q: 'Which is greater: 7,099 or 7,190?', a: '7,190', note: 'Compare hundreds after the thousands match.' }
        ]
      },
      skills: [
        ['Place Value Control', 'Read, compare, and round large numbers without losing digit value.'],
        ['Operation Choice', 'Decide whether the question needs addition, subtraction, multiplication, division, or a combination.'],
        ['Estimation Checks', 'Use rough answers first so exact calculations can be checked for reasonableness.']
      ],
      questionTypes: ['multi-step word problems', 'missing-number calculations', 'large-number estimation checks'],
      starter: ['Underline the numbers and units before solving.', 'Estimate first, then calculate exactly.', 'Write each step on a separate line to avoid mixing operations.'],
      watchouts: ['copying a digit into the wrong place', 'using all numbers even when one is irrelevant', 'forgetting to check whether the final answer is sensible'],
      related: ['maths-patterns-algebra', 'maths-fractions-decimals']
    },
    'maths-fractions-decimals': {
      file: 'selective-maths-fractions-decimals.html',
      domain: 'maths',
      title: 'Fractions & Decimals',
      subtitle: 'Same value, different outfit — and how to move between the two',
      intro: 'Here is a secret: 1/2, 0.5, and 50% are all exactly the same amount wearing different uniforms. The selective exam loves to dress them up differently to see if you get confused. Once you see fractions and decimals as the same family of numbers — just written differently — comparing, ordering, and converting them becomes natural. The students who struggle are those who treat fractions and decimals as two completely separate topics.',
      lesson: {
        theory: [
          {
            title: 'Fractions and decimals are the same family',
            text: 'A fraction says "this many parts out of this many equal parts". A decimal says the same thing using the base-10 place value system. 3/10 means 3 parts out of 10 equal parts, which is 0.3 (three tenths). The key insight: the denominator of the fraction tells you the PLACE VALUE. Denominator 10 = tenths place. Denominator 100 = hundredths place. Denominator 1,000 = thousandths place. 47/100 = 0.47. Done.',
            visual: 'fraction-strip'
          },
          {
            title: 'The Big 6 benchmarks — memorise these forever',
            text: 'These six fraction-decimal pairs appear in almost every selective exam. Write them on a card and drill them: 1/4 = 0.25, 1/2 = 0.5, 3/4 = 0.75, 1/5 = 0.2, 1/10 = 0.1, 1/8 = 0.125. With these benchmarks, you can estimate any fraction question instantly. Is 3/8 greater than 0.4? 3/8 = 3 x 0.125 = 0.375. Yes, 0.4 > 0.375, so 0.4 is bigger.',
            visual: 'fraction-number-line'
          },
          {
            title: 'Comparing — convert to the same form first',
            text: 'Never compare fractions with different denominators by just looking at the top numbers. 3/8 vs 5/12 look close but you cannot just compare 3 and 5. Convert both to decimals: 3/8 = 0.375 and 5/12 = 0.417. Now it is easy: 5/12 is bigger. Shortcut for ordering a mixed list: convert everything to decimals first, order the decimals, then swap back to the original form.',
            visual: 'decimal-grid'
          },
          {
            title: 'Fast conversion shortcuts',
            text: 'Denominator 10: one decimal place (3/10 = 0.3). Denominator 100: two decimal places (27/100 = 0.27). Denominator 4: divide numerator by 4 (3/4 = 0.75). Denominator 5: multiply numerator by 2, then put over 10 (3/5 = 6/10 = 0.6). Denominator 8: multiply numerator by 125, then put over 1,000 (3/8 = 375/1000 = 0.375). Exam trap to avoid: 0.7 is NOT less than 0.65 just because 7 < 65. Write 0.7 as 0.70 first, then compare: 0.70 > 0.65.',
            visual: 'tenths-strip'
          }
        ],
        guidance: [
          'Think of fractions and decimals as different labels for the same amount.',
          'Use benchmarks like 0.5, 1/2, and 1 to judge size quickly.',
          'When comparing, convert into the clearest form before choosing the answer.'
        ],
        visuals: [
          { type: 'fraction-strip' },
          { type: 'fraction-number-line' },
          { type: 'decimal-grid' }
        ],
        exampleVisuals: ['fraction-strip', 'fraction-number-line', 'decimal-grid', 'tenths-strip', 'mixed-values-line'],
        examples: [
          {
            label: 'Example 1 - Simple fraction meaning',
            prompt: 'What does 1/2 of a chocolate bar mean?',
            steps: ['The whole bar is split into 2 equal parts.', '1/2 means one of those two equal parts.'],
            answer: 'One equal part out of two',
            note: 'This is the first step before doing harder calculations.'
          },
          {
            label: 'Example 2 - Fraction on a number line',
            prompt: 'Place 1/4 on a number line between 0 and 1.',
            steps: ['0 to 1 is one whole.', 'Divide it into 4 equal parts.', '1/4 is the first mark after 0.'],
            answer: 'One quarter of the distance from 0 to 1',
            note: 'A number line makes the size visible.'
          },
          {
            label: 'Example 3 - Decimal comparison',
            prompt: 'Which is larger: 0.7 or 0.65?',
            steps: ['Write 0.7 as 0.70 so both have the same number of decimal places.', 'Compare 0.70 and 0.65.', '70 hundredths is greater than 65 hundredths.'],
            answer: '0.7',
            note: 'Zeros can help you compare fairly.'
          },
          {
            label: 'Example 4 - Convert between forms',
            prompt: 'Write 3/10 as a decimal.',
            steps: ['10 means tenths.', '3 tenths is 0.3.'],
            answer: '0.3',
            note: 'Tenths are easy to see as decimals.'
          },
          {
            label: 'Example 5 - Ordering mixed values',
            prompt: 'Put 1/2, 0.4, and 3/4 in order from smallest to largest.',
            steps: ['Convert to decimals or use benchmarks: 1/2 = 0.5 and 3/4 = 0.75.', 'Now compare 0.4, 0.5, and 0.75.', 'The order is 0.4, 1/2, 3/4.'],
            answer: '0.4, 1/2, 3/4',
            note: 'Convert first, then compare.'
          }
        ],
        questions: [
          { q: 'Which is greater: 3/5 or 1/2?', a: '3/5', note: '3/5 = 0.6 and 1/2 = 0.5.' },
          { q: 'Write 7/10 as a decimal.', a: '0.7', note: 'Seven tenths is 0.7.' },
          { q: 'Put 0.25 and 1/4 in the same form and compare.', a: 'They are equal', note: '1/4 = 0.25.' },
          { q: 'What is 1/8 of a whole when split into 8 equal parts?', a: 'One part out of eight', note: 'One eighth is a single equal piece.' },
          { q: 'Which is smaller: 0.6 or 0.59?', a: '0.59', note: 'Write 0.6 as 0.60 before comparing.' },
          { q: 'Convert 3/4 into a decimal.', a: '0.75', note: 'Three quarters is 75 hundredths.' },
          { q: 'Which fraction is closest to 1: 7/8 or 3/4?', a: '7/8', note: 'Seven eighths is larger than three quarters.' },
          { q: 'Order these from smallest to largest: 1/3, 0.4, 1/2.', a: '1/3, 0.4, 1/2', note: '1/3 is about 0.33, then 0.4, then 0.5.' },
          { q: 'What is 2/10 as a decimal?', a: '0.2', note: 'Two tenths is 0.2.' },
          { q: 'Which is greater: 0.08 or 0.8?', a: '0.8', note: 'Eight tenths is much bigger than eight hundredths.' },
          { q: 'What fraction is 0.5 equal to?', a: '1/2', note: 'Half is 0.5.' },
          { q: 'A pizza is cut into 4 equal parts. Two parts are eaten. What fraction is left?', a: '1/2', note: 'Two of four parts left is 2/4 = 1/2.' },
          { q: 'Which is larger: 5/6 or 0.82?', a: '5/6', note: '5/6 is about 0.83.' },
          { q: 'Write 0.125 as a fraction.', a: '1/8', note: '0.125 is one eighth.' }
        ]
      },
      skills: [
        ['Equivalent Values', 'Recognise that fractions and decimals can describe the same amount.'],
        ['Ordering Accuracy', 'Compare values by converting them into the clearest common form.'],
        ['Operations with Meaning', 'Add, subtract, or multiply while staying aware of what the numbers represent.']
      ],
      questionTypes: ['ordering mixed lists', 'converting between forms', 'fraction-decimal word problems'],
      starter: ['Turn awkward pairs into a common form before comparing.', 'Use benchmarks such as 0.5 and 1 to judge size quickly.', 'Sketch a quick model when the question feels abstract.'],
      watchouts: ['treating the denominator like a whole-number label only', 'ordering decimals by digit count instead of value', 'forgetting to simplify when needed'],
      related: ['maths-percentages', 'maths-whole-numbers']
    },
    'maths-percentages': {
      file: 'selective-maths-percentages.html',
      domain: 'maths',
      title: 'Percentages',
      subtitle: 'Discounts, increases, and the 10% shortcut that solves almost everything',
      intro: 'You are at the shops and a jacket is "30% off". You want to know if you can afford it. That is exactly what this topic is about — percentages in real life. The good news: you do NOT need to divide by complicated decimals. There is a shortcut called the "10% ladder" that lets you find 30%, 25%, 15% or almost any percentage mentally in about 5 seconds. Selective questions use shopping, surveys, and score changes — once you see the pattern, this topic becomes one of the easiest to score full marks on.',
      lesson: {
        theory: [
          {
            title: 'Percent means out of 100',
            text: 'Imagine a 100-square grid (like graph paper). If 25 squares are shaded, that is 25%. If 50 are shaded, that is 50% — exactly half. Percent literally means "per hundred" in Latin. So 10% of 80 means "10 out of every 100 of 80" which is simply 8. That is all it is. The moment you see a percentage, replace it with its fraction twin: 50% = 1/2, 25% = 1/4, 10% = 1/10.',
            visual: 'hundred-grid'
          },
          {
            title: 'The 10% ladder shortcut — your secret weapon',
            text: 'Step 1: Find 10% by moving the decimal one place LEFT. 10% of 240 = 24. Now you can build ANY percentage from 10%: 20% = double 10% = 48. 5% = half of 10% = 12. 30% = 10% x 3 = 72. 15% = 10% + 5% = 24 + 12 = 36. 25% = halve the number twice (240 / 2 = 120, then 120 / 2 = 60). This single technique covers roughly 80% of all percentage questions in selective exams.',
            visual: 'percent-bar'
          },
          {
            title: 'Discounts and increases — identify the original first',
            text: 'For discounts: new price = original - (% amount). For increases: new price = original + (% amount). The CRITICAL rule: always identify the ORIGINAL amount first. That is what you multiply by the percentage. A common exam trap: a jacket costs $80 after a 20% discount. What was the original price? The original is NOT $80 + 20% of $80. You need to work backwards: $80 = 80% of original, so original = $80 / 0.8 = $100.',
            visual: 'discount-arrow'
          },
          {
            title: 'Exam shortcuts and percentage traps',
            text: 'Benchmark fractions to switch between: 50% = 1/2, 25% = 1/4, 75% = 3/4, 20% = 1/5, 33.3% ~ 1/3, 66.7% ~ 2/3. Percentage CHANGE formula: change / original x 100. Do not divide by the NEW amount — always divide by the ORIGINAL. Exam trap: "A score goes from 40 to 50, what is the percentage increase?" The change is 10, divide by the ORIGINAL 40: 10/40 = 25%, not 20% (which would use the new amount 50 as the base).',
            visual: 'increase-arrow'
          }
        ],
        guidance: [
          'Percent means "out of 100", so 10%, 25%, 50%, and 100% are great benchmark values.',
          'Always identify the original amount before finding a discount or increase.',
          'When the numbers look hard, start by finding 10% or another friendly part first.'
        ],
        visuals: [
          { type: 'hundred-grid' },
          { type: 'percent-bar' },
          { type: 'discount-arrow' }
        ],
        exampleVisuals: ['hundred-grid', 'percent-bar', 'percent-bar', 'discount-arrow', 'increase-arrow'],
        examples: [
          {
            label: 'Example 1 - What percent means',
            prompt: 'What does 25% mean?',
            steps: ['Percent means out of 100.', '25% means 25 out of 100.', 'It is the same as one quarter.'],
            answer: '25 out of 100 or 1/4',
            note: 'Knowing benchmark percentages makes later work faster.'
          },
          {
            label: 'Example 2 - Find 10%',
            prompt: 'Find 10% of 80.',
            steps: ['10% means one tenth.', 'One tenth of 80 is 8.'],
            answer: '8',
            note: '10% is one of the fastest percentage facts to use.'
          },
          {
            label: 'Example 3 - Find 25%',
            prompt: 'Find 25% of 60.',
            steps: ['25% is one quarter.', 'One quarter of 60 is 15.'],
            answer: '15',
            note: 'A quarter is much easier than a long calculation.'
          },
          {
            label: 'Example 4 - Discount problem',
            prompt: 'A jacket costs $40 and is reduced by 25%. How much is the discount?',
            steps: ['25% of 40 is 10.', 'So the discount is $10.', 'The new price would be $30.'],
            answer: 'Discount = $10, new price = $30',
            note: 'First find the change, then the new total.'
          },
          {
            label: 'Example 5 - Percentage increase',
            prompt: 'A score rises from 50 to 60. What is the percentage increase?',
            steps: ['The change is 10.', '10 out of the original 50 is 1/5.', '1/5 = 20%.'],
            answer: '20%',
            note: 'The original number is the base for the percentage change.'
          }
        ],
        questions: [
          { q: 'What is 50% of 90?', a: '45', note: 'Half of 90 is 45.' },
          { q: 'What is 10% of 250?', a: '25', note: 'One tenth of 250 is 25.' },
          { q: 'A toy costs $20 and is discounted by 25%. What is the discount?', a: '$5', note: 'A quarter of 20 is 5.' },
          { q: 'What percent is 1/2?', a: '50%', note: 'One half equals 50 out of 100.' },
          { q: 'What is 25% of 80?', a: '20', note: 'A quarter of 80 is 20.' },
          { q: 'What is 10% of 360?', a: '36', note: 'Move the decimal one place left.' },
          { q: 'A game score goes from 40 to 50. What is the increase?', a: '10', note: 'Find the difference first.' },
          { q: 'What percent is 1/4?', a: '25%', note: 'One quarter equals 25 out of 100.' },
          { q: 'If 100 students are surveyed and 30 choose soccer, what percent chose soccer?', a: '30%', note: '30 out of 100 is 30%.' },
          { q: 'What is 50% of 64?', a: '32', note: 'Half of 64 is 32.' },
          { q: 'A jacket costs $60 and is reduced by 10%. What is the discount?', a: '$6', note: '10% of 60 is 6.' },
          { q: 'What is 75% of 40?', a: '30', note: 'Three quarters of 40 is 30.' },
          { q: 'A number increases from 200 to 250. What is the percentage increase?', a: '25%', note: '50 is one quarter of 200.' },
          { q: 'What is 20% of 150?', a: '30', note: '10% is 15, so 20% is 30.' },
          { q: 'What percent is 3/4?', a: '75%', note: 'Three quarters is 75 out of 100.' }
        ]
      },
      skills: [
        ['Percent of Amount', 'Find a percentage using simple partitions or scaling.'],
        ['Increase and Decrease', 'Track what changes from the original amount and what stays fixed.'],
        ['Flexible Conversions', 'Move between 10%, 25%, 50%, and related benchmarks to work efficiently.']
      ],
      questionTypes: ['sale and discount problems', 'survey interpretation', 'before-and-after value changes'],
      starter: ['Find 10% first when the number allows it.', 'Label the original amount before applying change.', 'Check whether the question wants the new value or the amount changed.'],
      watchouts: ['taking a percentage of the wrong base number', 'mixing percentage change with final value', 'forgetting that 25% means one quarter'],
      related: ['maths-ratios-rates', 'maths-fractions-decimals']
    },
    'maths-ratios-rates': {
      file: 'selective-maths-ratios-rates.html',
      domain: 'maths',
      title: 'Ratios & Rates',
      subtitle: 'Simplification, scaling, and the "find 1 unit first" trick',
      intro: 'A ratio is like a recipe. If your lemonade uses 2 lemons for every 3 cups of water, that 2:3 relationship must stay true whether you are making one glass or a whole jug. Selective questions love recipes, mixing problems, map scales, and speed questions — all of which are secretly just ratio and rate questions in disguise. The one habit that unlocks every single one of them: find the value of ONE part first, then build to what you need.',
      lesson: {
        theory: [
          {
            title: 'What a ratio actually is',
            text: 'A ratio compares two or more amounts and tells you their relative sizes. 2:3 means "for every 2 of the first thing, there are 3 of the second." The ORDER matters — 2:3 (red:blue) is different from 3:2 (blue:red). Simplifying a ratio is like simplifying a fraction: divide both parts by their HCF. 6:9 divides by 3 to become 2:3. The relationship stays the same, the numbers just get friendlier.',
            visual: 'ratio-strip'
          },
          {
            title: 'Scaling — multiply both parts by the SAME number',
            text: 'To scale a ratio up or down, multiply (or divide) BOTH parts by the same number. If the ratio is 2:3 and you need the first part to be 10, multiply both by 5: 2x5 : 3x5 = 10:15. Key rule: never scale just one side. If you do, the relationship changes and the answer is wrong. Simplify first, then scale — this keeps the numbers small and manageable.',
            visual: 'scale-arrow'
          },
          {
            title: 'The unitary method — find 1 first',
            text: 'The unitary method is the most powerful tool for ratio and rate questions. Step 1: find the value of 1 unit. Step 2: multiply to find the value you need. Example: 5 pencils cost $8.50. Find the cost of 3 pencils. 1 pencil = $8.50 / 5 = $1.70. Then 3 pencils = $1.70 x 3 = $5.10. This works for every ratio problem, recipe scaling, speed calculation, and map question. Find 1 first, then build.',
            visual: 'unitary-bar'
          },
          {
            title: 'Rate vs ratio and exam shortcuts',
            text: 'A RATE uses different units (like km per hour, dollars per kg). A RATIO uses same-unit amounts. The method is identical — find 1 unit first. Speed: 120 km in 2 hours. 1 hour = 60 km. Rates always use the word "per". For sharing-in-ratio questions: total parts = sum of ratio numbers. Then 1 part = total / sum. Example: share $45 in ratio 2:3. Total parts = 5. One part = $9. So shares are $18 and $27. Check: 18 + 27 = 45.',
            visual: 'ratio-strip'
          }
        ],
        guidance: [
          'A ratio compares amounts in the same order every time.',
          'Before scaling, make sure you know how many parts each side has.',
          'If the numbers are awkward, find one unit first and then rebuild the situation.'
        ],
        visuals: [
          { type: 'ratio-strip' },
          { type: 'unitary-bar' },
          { type: 'scale-arrow' }
        ],
        exampleVisuals: ['ratio-strip', 'ratio-strip', 'scale-arrow', 'unitary-bar', 'unitary-bar'],
        examples: [
          {
            label: 'Example 1 - Simple ratio meaning',
            prompt: 'A bag has 2 red beads and 3 blue beads. Write the ratio of red to blue.',
            steps: ['Count the red beads: 2.', 'Count the blue beads: 3.', 'Write the ratio in order red:blue = 2:3.'],
            answer: '2:3',
            note: 'Ratios must stay in the same order.'
          },
          {
            label: 'Example 2 - Simplify a ratio',
            prompt: 'Simplify 6:9.',
            steps: ['Find a common factor of 6 and 9.', 'Both can be divided by 3.', '6:9 becomes 2:3.'],
            answer: '2:3',
            note: 'Simplifying keeps the relationship the same.'
          },
          {
            label: 'Example 3 - Scaling up',
            prompt: 'If a recipe uses 2 cups of flour for 1 cup of sugar, how much flour is needed for 3 cups of sugar?',
            steps: ['The ratio is 2 cups flour to 1 cup sugar.', 'If sugar becomes 3 cups, multiply both parts by 3.', 'Flour becomes 6 cups.'],
            answer: '6 cups of flour',
            note: 'Scale both parts together.'
          },
          {
            label: 'Example 4 - Rate thinking',
            prompt: 'A car travels 120 km in 2 hours. How far in 1 hour?',
            steps: ['Split the distance into 2 equal hours.', '120 divided by 2 is 60.', 'The rate is 60 km per hour.'],
            answer: '60 km in 1 hour',
            note: 'This is unitary thinking: find one unit first.'
          },
          {
            label: 'Example 5 - Harder ratio problem',
            prompt: 'The ratio of boys to girls is 4:5. If there are 36 students in total, how many girls are there?',
            steps: ['The ratio has 4 + 5 = 9 parts.', '36 divided by 9 = 4 students per part.', 'Girls have 5 parts, so 5 × 4 = 20 girls.'],
            answer: '20 girls',
            note: 'Use the total parts first, then one part.'
          }
        ],
        questions: [
          { q: 'Simplify 8:12.', a: '2:3', note: 'Divide both parts by 4.' },
          { q: 'If 1 part is 5 ml, what is 3 parts?', a: '15 ml', note: 'Multiply one unit by 3.' },
          { q: 'A map uses 1 cm : 5 km. How much is 4 cm?', a: '20 km', note: 'Multiply both sides by 4.' },
          { q: 'If the ratio of apples to oranges is 3:2 and there are 10 fruits in total, how many apples?', a: '6 apples', note: '5 parts total, so 2 fruits per part; apples have 3 parts.' },
          { q: 'Simplify 12:18.', a: '2:3', note: 'Divide both by 6.' },
          { q: 'A drink mix uses 2 cups juice to 5 cups water. What is the ratio juice:water?', a: '2:5', note: 'Keep the order the same.' },
          { q: 'If 2 notebooks cost $6, how much do 4 notebooks cost?', a: '$12', note: 'Double both the number and the cost.' },
          { q: 'A recipe uses 1 egg for every 3 muffins. How many eggs for 9 muffins?', a: '3 eggs', note: 'Divide 9 by 3.' },
          { q: 'A scale map is 1:100. What does 3 cm on the map represent?', a: '300 cm', note: 'Multiply by 3.' },
          { q: 'If 5 pencils cost $10, what is the cost of 1 pencil?', a: '$2', note: 'Divide $10 by 5.' },
          { q: 'The ratio of boys to girls is 4:6. Simplify it.', a: '2:3', note: 'Divide both parts by 2.' },
          { q: 'A paint mix uses 4 parts red to 1 part blue. How many blue parts for 12 red parts?', a: '3 blue parts', note: 'Multiply both parts by 3.' },
          { q: 'If 8 litres fill 2 buckets equally, how many litres per bucket?', a: '4 litres', note: 'Find one unit first.' },
          { q: 'The ratio 9:12 is simplified to what?', a: '3:4', note: 'Divide both parts by 3.' },
          { q: 'If a car travels 150 km in 3 hours, how far in 1 hour?', a: '50 km', note: 'Use unitary reasoning.' }
        ]
      },
      skills: [
        ['Simplify Ratios', 'Reduce ratios to their clearest matching form.'],
        ['Scale Proportionally', 'Keep both parts balanced while enlarging or shrinking.'],
        ['Use Unitary Thinking', 'Find the value of one part first, then rebuild the whole situation.']
      ],
      questionTypes: ['recipes and mixtures', 'map or scale drawings', 'cost-per-item rate questions'],
      starter: ['Write the ratio with labels attached.', 'Divide to find one unit when the numbers are messy.', 'Check whether the relationship should grow or shrink.'],
      watchouts: ['scaling only one side of the ratio', 'dropping labels such as dollars, litres, or students', 'confusing ratio with fraction language'],
      related: ['maths-percentages', 'maths-measurement']
    },
    'maths-patterns-algebra': {
      file: 'selective-maths-patterns-algebra.html',
      domain: 'maths',
      title: 'Patterns & Algebra',
      subtitle: 'Spot the rule, describe it clearly, and use it for any number',
      intro: 'Every sequence of numbers has a secret rule hiding inside it — like a code. A pattern question is asking you to crack the code. The exciting part: once you find the rule, you can predict ANY term in the sequence, not just the next one. Algebra takes this one step further: instead of writing the rule in words, you write it with a letter so the rule works for ANY starting number. Detectives crack codes. Mathematicians crack patterns.',
      lesson: {
        theory: [
          {
            title: 'Finding the rule — check the DIFFERENCES',
            text: 'Calculate the difference between CONSECUTIVE terms (next to each other). Check at least 2 or 3 gaps to be sure. If all differences are the same (like +4, +4, +4), the rule is "add 4". If they double (x2, x2, x2), the rule is "multiply by 2". If the differences themselves grow (+2, +3, +4, +5), that is a TWO-LAYER pattern — the differences form their own sequence. Always check at least 3 gaps before deciding.',
            visual: 'growing-pattern'
          },
          {
            title: 'Repeating vs growing patterns',
            text: 'GROWING patterns keep changing by the same (or changing) amount each step: 3, 6, 9, 12... REPEATING patterns cycle through a fixed group: red, blue, green, red, blue, green... For repeating patterns, find the length of the cycle and use division with remainders to find any position. Cycle length 3. What is the 17th term? 17 / 3 = 5 remainder 2. The 2nd item in the cycle is the answer.',
            visual: 'repeating-pattern'
          },
          {
            title: 'Algebra — letters are just unnamed numbers',
            text: 'When you see "n + 5", think: "add 5 to whatever n is." Substitution means replacing the letter with a known number to find the result: if n = 7, then n + 5 = 12. Finding the unknown means reversing the operation: if n + 5 = 12, undo the +5 by subtracting: n = 12 - 5 = 7. Algebra uses the same inverse operation idea as working backwards in a number puzzle.',
            visual: 'algebra-balance'
          },
          {
            title: 'Exam shortcuts and pattern traps',
            text: 'Trap 1: do not assume the rule is addition just because the numbers are growing. 2, 4, 8, 16 grows by doubling (x2), not adding. Trap 2: for a missing MIDDLE term, do not average the outer terms unless the rule is "add a constant". Instead, apply the rule forward from the left. Shortcut for the nth term: if the rule is "start at a, add d each time", the nth term = a + (n-1) x d. Example: start at 3, add 4 each time. The 10th term = 3 + 9x4 = 39.',
            visual: 'pattern-rule'
          }
        ],
        guidance: [
          'Always compare at least two jumps in the pattern before deciding on a rule.',
          'Patterns can grow by adding, subtracting, multiplying, or repeating in a cycle.',
          'Algebra is just a way of naming a rule so it works for any number.'
        ],
        visuals: [
          { type: 'growing-pattern' },
          { type: 'pattern-rule' },
          { type: 'algebra-balance' }
        ],
        exampleVisuals: ['growing-pattern', 'repeating-pattern', 'pattern-rule', 'growing-pattern', 'algebra-balance'],
        examples: [
          {
            label: 'Example 1 - Simple growing pattern',
            prompt: 'What comes next: 3, 6, 9, 12, ?',
            steps: ['Each number goes up by 3.', 'Add 3 to 12.', 'The next number is 15.'],
            answer: '15',
            note: 'Look for the change between terms.'
          },
          {
            label: 'Example 2 - Repeating pattern',
            prompt: 'What comes next: red, blue, red, blue, ?',
            steps: ['The pattern repeats every two items.', 'After blue comes red again.'],
            answer: 'red',
            note: 'Not all patterns grow; some repeat.'
          },
          {
            label: 'Example 3 - Find the rule',
            prompt: 'The pattern is 2, 5, 8, 11. What is the rule?',
            steps: ['Check the difference between terms: +3, +3, +3.', 'The rule is add 3 each time.'],
            answer: 'Add 3 each time',
            note: 'Say the rule in words before trying symbols.'
          },
          {
            label: 'Example 4 - Work backwards',
            prompt: 'A pattern starts at 4 and adds 7 each time. What is the 4th term?',
            steps: ['1st term = 4.', '2nd term = 11.', '3rd term = 18.', '4th term = 25.'],
            answer: '25',
            note: 'Work step by step instead of jumping ahead.'
          },
          {
            label: 'Example 5 - Simple algebra',
            prompt: 'If n = 6, what is n + 4?',
            steps: ['Replace n with 6.', '6 + 4 = 10.'],
            answer: '10',
            note: 'A letter can stand for a number.'
          }
        ],
        questions: [
          { q: 'What comes next: 5, 10, 15, 20, ?', a: '25', note: 'Add 5 each time.' },
          { q: 'What comes next: triangle, square, triangle, square, ?', a: 'triangle', note: 'The pattern repeats.' },
          { q: 'What is the rule for 7, 14, 21, 28?', a: 'Multiply by 7 or add 7 each time', note: 'The change is +7 each step.' },
          { q: 'If a pattern starts at 10 and subtracts 2 each time, what is the 3rd term?', a: '6', note: '10, 8, 6.' },
          { q: 'What comes next: 2, 4, 8, 16, ?', a: '32', note: 'Multiply by 2 each time.' },
          { q: 'What is the next shape: circle, circle, triangle, circle, circle, triangle, ?', a: 'circle', note: 'The repeating block is circle, circle, triangle.' },
          { q: 'The pattern is 3, 6, 9, 12. What is the 5th term?', a: '15', note: 'Keep adding 3.' },
          { q: 'A pattern goes +4 each time. If the first term is 1, what is the 4th term?', a: '13', note: '1, 5, 9, 13.' },
          { q: 'If n = 8, what is n - 3?', a: '5', note: 'Replace the letter with the given number.' },
          { q: 'A pattern starts at 2 and doubles each time. What is the 4th term?', a: '16', note: '2, 4, 8, 16.' },
          { q: 'What is the rule for 4, 8, 12, 16?', a: 'Add 4 each time', note: 'The difference is always 4.' },
          { q: 'If the rule is n + 5 and n = 11, what is the answer?', a: '16', note: '11 + 5 = 16.' },
          { q: 'Find the missing number: 6, 11, 16, ?, 26.', a: '21', note: 'Add 5 each time.' },
          { q: 'What comes next: A, B, A, B, A, B, ?', a: 'A', note: 'This is a repeating pattern.' },
          { q: 'The pattern is 1, 3, 6, 10. What is the next number if the differences keep growing by 1?', a: '15', note: 'Add 2, then 3, then 4, then 5.' }
        ]
      },
      skills: [
        ['Spot the Rule', 'Look for changes between terms, not just the terms themselves.'],
        ['Generalise', 'Describe the rule in words or a simple expression.'],
        ['Work Backwards', 'Use the pattern rule to fill gaps or test unknown values.']
      ],
      questionTypes: ['continue the sequence', 'missing terms', 'simple substitution with symbols'],
      starter: ['Compare consecutive terms first.', 'Check whether the pattern alternates.', 'Test the rule on at least two terms before trusting it.'],
      watchouts: ['assuming every pattern is add or subtract only', 'describing the pattern too vaguely', 'forgetting to test the rule on later terms'],
      related: ['maths-whole-numbers', 'thinking-problem-solving']
    },
    'maths-measurement': {
      file: 'selective-maths-measurement.html',
      domain: 'maths',
      title: 'Measurement',
      subtitle: 'Perimeter, area, volume, and metric units — and never confusing them again',
      intro: 'Picture a sheep paddock. The farmer wants to know two things: how much fencing to buy (that is perimeter), and how much grass the sheep can eat (that is area). These are two completely different measurements of the same paddock. Adding a water trough? Now you need volume. This topic is entirely about asking "WHAT am I measuring?" before touching any formula. Get that right and the rest is just arithmetic.',
      lesson: {
        theory: [
          {
            title: 'P, A, V — three different measurements, never mix them',
            text: 'PERIMETER = the total distance around the outside edge of a shape. Unit: cm, m, km. AREA = the amount of flat surface inside a shape. Unit: cm squared, m squared. VOLUME = the amount of 3D space inside a solid. Unit: cm cubed, m cubed. Memory trick: "Perimeter Walks Around. Area Fills Inside. Volume Stacks Up." Never give an area answer in cm — it must be cm squared. Never give a volume in m squared — it must be m cubed.',
            visual: 'ruler-length'
          },
          {
            title: 'The four formulas that cover everything',
            text: 'Perimeter of rectangle = 2 x (length + width). Area of rectangle = length x width. Area of triangle = 1/2 x base x height. Volume of rectangular prism = length x width x height. Capacity: 1 litre = 1,000 mL, 1 kL = 1,000 litres. Write these four on a card and test yourself until they are automatic. For composite shapes (L-shapes, T-shapes): split them into simple rectangles, find each area, then add or subtract.',
            visual: 'area-rectangle'
          },
          {
            title: 'Metric conversions — going up and down the ladder',
            text: 'The metric ladder for length: km, m, cm, mm. Moving down to smaller units: multiply (1 m = 100 cm, 1 cm = 10 mm). Moving up to larger units: divide (250 cm = 2.5 m, 3,000 m = 3 km). For capacity: 1 L = 1,000 mL. For mass: 1 kg = 1,000 g. Memory trick for the direction: "Down the ladder = x10 or x100 or x1000. Up the ladder = divide." Always convert to the SAME unit before calculating.',
            visual: 'capacity-bottle'
          },
          {
            title: 'Exam shortcuts for measurement questions',
            text: 'Composite shape shortcut: to find the area of an L-shape, calculate the area of the LARGE rectangle that would enclose it, then SUBTRACT the missing corner piece. Perimeter trap: for an L-shape, do not just add length and width twice. Trace every single outside edge. Missing side shortcut: opposite sides of a rectangle are equal, so a missing side on an L-shape can always be found by subtracting the known partial side from the total.',
            visual: 'volume-cube'
          }
        ],
        guidance: [
          'Always ask what is being measured before choosing a formula.',
          'Write the unit in every answer so you do not lose marks for the wrong label.',
          'If the shape is crowded, redraw it with simple sides and numbers.'
        ],
        visuals: [
          { type: 'ruler-length' },
          { type: 'area-rectangle' },
          { type: 'volume-cube' }
        ],
        exampleVisuals: ['ruler-length', 'perimeter-rectangle', 'area-rectangle', 'capacity-bottle', 'volume-cube'],
        examples: [
          {
            label: 'Example 1 - Reading a ruler',
            prompt: 'What length is shown on a ruler if the line reaches 8 cm?',
            steps: ['Start at zero on the ruler.', 'Read the mark where the line ends.', 'The length is 8 cm.'],
            answer: '8 cm',
            note: 'Length is the first measurement skill.'
          },
          {
            label: 'Example 2 - Perimeter',
            prompt: 'A rectangle has sides 5 cm and 3 cm. What is the perimeter?',
            steps: ['Perimeter means the distance around the outside.', 'Add all sides: 5 + 3 + 5 + 3.', 'The answer is 16 cm.'],
            answer: '16 cm',
            note: 'Perimeter uses the outside edge.'
          },
          {
            label: 'Example 3 - Area',
            prompt: 'A rectangle is 4 cm by 3 cm. What is its area?',
            steps: ['Area means the inside space.', 'Multiply length by width: 4 × 3.', 'The answer is 12 square cm.'],
            answer: '12 cm²',
            note: 'Area is measured in square units.'
          },
          {
            label: 'Example 4 - Capacity',
            prompt: 'A bottle holds 2 litres. How much is that in millilitres?',
            steps: ['1 litre = 1000 millilitres.', '2 litres = 2 × 1000.', 'The answer is 2000 mL.'],
            answer: '2000 mL',
            note: 'Capacity often uses litres and millilitres.'
          },
          {
            label: 'Example 5 - Volume thinking',
            prompt: 'A box is 2 cubes long, 2 cubes wide, and 2 cubes high. How many unit cubes fill it?',
            steps: ['Count the layers: 2 by 2 on the bottom.', 'Each layer has 4 cubes.', 'There are 2 layers, so 4 × 2 = 8 cubes.'],
            answer: '8 cubes',
            note: 'Volume is the space inside a 3D shape.'
          }
        ],
        questions: [
          { q: 'What do we measure around the outside of a shape?', a: 'Perimeter', note: 'Perimeter is the outside edge.' },
          { q: 'What is the area of a 2 cm by 6 cm rectangle?', a: '12 cm²', note: 'Multiply length by width.' },
          { q: 'How many millilitres are in 1 litre?', a: '1000 mL', note: '1 litre = 1000 millilitres.' },
          { q: 'A rectangle has sides 7 cm and 2 cm. What is the perimeter?', a: '18 cm', note: '7 + 2 + 7 + 2 = 18.' },
          { q: 'What is 3 litres in millilitres?', a: '3000 mL', note: 'Multiply by 1000.' },
          { q: 'A square has sides 4 cm. What is its area?', a: '16 cm²', note: '4 × 4 = 16.' },
          { q: 'Which unit is best for the length of a pencil?', a: 'cm', note: 'Centimetres suit small lengths.' },
          { q: 'Which is bigger: 500 mL or 1 L?', a: '1 L', note: '1 litre is 1000 mL.' },
          { q: 'A box is 3 cubes by 2 cubes by 2 cubes. How many cubes fill it?', a: '12 cubes', note: '3 × 2 × 2 = 12.' },
          { q: 'What is 2 m in centimetres?', a: '200 cm', note: '1 m = 100 cm.' },
          { q: 'A rectangle is 5 cm by 8 cm. What is the area?', a: '40 cm²', note: '5 × 8 = 40.' },
          { q: 'What unit is best for the area of a carpet?', a: 'm²', note: 'Area uses square units.' },
          { q: 'A jug holds 750 mL. How much more to make 1 L?', a: '250 mL', note: '1000 - 750 = 250.' },
          { q: 'A room is 6 m long and 4 m wide. What is the perimeter?', a: '20 m', note: '6 + 4 + 6 + 4 = 20.' },
          { q: 'A cube has 3 cubes on each edge. How many unit cubes in total?', a: '27 cubes', note: '3 × 3 × 3 = 27.' }
        ]
      },
      skills: [
        ['Choose the Measure', 'Distinguish between length, perimeter, area, volume, and capacity.'],
        ['Use Metric Units', 'Convert between common metric units without losing scale.'],
        ['Model Shapes', 'Break composite situations into smaller workable parts.']
      ],
      questionTypes: ['composite shape measures', 'unit conversion questions', 'real-world capacity or area problems'],
      starter: ['Write the unit beside every intermediate answer.', 'Sketch or redraw the shape if the picture is crowded.', 'Check whether the answer should be square units, cubic units, or litres.'],
      watchouts: ['using perimeter when the question asks for area', 'forgetting unit conversion before calculation', 'giving an answer with the wrong unit'],
      related: ['maths-geometry', 'maths-position-coordinates']
    },
    'maths-geometry': {
      file: 'selective-maths-geometry.html',
      domain: 'maths',
      title: 'Geometry',
      subtitle: 'Angles, symmetry, nets — and the two angle rules that solve most questions',
      intro: 'Here is a fact that will save you on exam day: you do not need to memorise every shape. You only need to memorise TWO angle rules and a handful of shape properties — and from those, you can figure out almost everything. A triangle always has angles summing to 180 degrees. A quadrilateral always sums to 360. Those two facts, combined with the ability to spot sides and symmetry, handle the vast majority of geometry questions in the selective exam.',
      lesson: {
        theory: [
          {
            title: 'Shape properties — your checklist',
            text: 'For every shape question, quickly check: (1) How many sides? (2) Are any sides equal? (3) Are any sides parallel? (4) Are there right angles? (5) Does it have line symmetry? Triangle: 3 sides, angles add to 180. Quadrilateral: 4 sides, angles add to 360. Pentagon: 5 sides. Hexagon: 6. Octagon: 8. Memory trick for the names: PENTagon = 5 (a pentagon has 5 sides like PENTs in a tent have 5 poles... well, almost!). HEXagon = 6 (a hex has 6 letters). OCTagon = 8 (an octopus has 8 arms).',
            visual: 'shape-symmetry'
          },
          {
            title: 'The two angle rules — know these cold',
            text: 'Rule 1: Angles in ANY triangle add to exactly 180 degrees. No exceptions, no matter the shape. Missing angle = 180 - (sum of the other two). Rule 2: Angles in ANY quadrilateral add to exactly 360 degrees. Missing angle = 360 - (sum of the other three). Bonus rule: angles on a straight line add to 180. Angles around a full point add to 360. Vertically opposite angles (an X shape) are always equal.',
            visual: 'angle-triangle'
          },
          {
            title: 'Symmetry and nets',
            text: 'A shape has LINE symmetry if you can fold it in half and both halves match perfectly. A square has 4 lines of symmetry. A rectangle has 2. An isosceles triangle has 1. A scalene triangle has 0. For NETS: a net is a flat shape that folds into a 3D object. A cube needs 6 squares. A square pyramid needs 4 triangles + 1 square base. When checking a net, mentally fold each face up and see if it wraps around without overlap or gaps.',
            visual: 'net-fold'
          },
          {
            title: 'Exam shortcuts for geometry',
            text: 'Finding a missing angle fast: subtract the known angles from the angle sum. 180 for triangle, 360 for quadrilateral. Symmetry shortcut: an isosceles triangle has 2 equal sides AND 2 equal base angles. If you know one base angle is 40, the other is also 40, and the top is 180 - 80 = 100. Net trap: not every arrangement of 6 squares folds into a cube. The 2-1-3 arrangement (2 in a row, 1 attached to the side, 3 in a row below) does not fold correctly. When in doubt, trace and fold mentally face by face.',
            visual: 'angle-triangle'
          }
        ],
        guidance: [
          'Look for sides, corners, angles, and symmetry before guessing the shape.',
          'Imagine folding a net or flipping a shape in your head.',
          'Use the angle rules you know instead of trying to memorise every shape by sight.'
        ],
        visuals: [
          { type: 'shape-symmetry' },
          { type: 'angle-triangle' },
          { type: 'net-fold' }
        ],
        exampleVisuals: ['square-shape', 'shape-symmetry', 'angle-triangle', 'net-fold', 'angle-triangle'],
        examples: [
          {
            label: 'Example 1 - Shape name',
            prompt: 'A shape has 4 equal sides and 4 right angles. What is it?',
            steps: ['Four equal sides and four right angles point to a square.'],
            answer: 'Square',
            note: 'Start with the simplest shape facts.'
          },
          {
            label: 'Example 2 - Symmetry',
            prompt: 'Does a rectangle have line symmetry?',
            steps: ['Yes. A rectangle can be folded in half through the middle.', 'The two sides match.'],
            answer: 'Yes',
            note: 'Symmetry means both halves match.'
          },
          {
            label: 'Example 3 - Triangle angles',
            prompt: 'Two angles in a triangle are 50° and 60°. What is the third angle?',
            steps: ['Triangle angles add to 180°.', '50 + 60 = 110.', '180 - 110 = 70.'],
            answer: '70°',
            note: 'Triangle angles always total 180°.'
          },
          {
            label: 'Example 4 - Net folding',
            prompt: 'Which is more likely to fold into a cube: a square net or a line of six squares?',
            steps: ['A cube needs a net that can fold around all sides.', 'A line of six squares is usually too long and does not wrap neatly.'],
            answer: 'The square net',
            note: 'Think about folding, not just looking flat.'
          },
          {
            label: 'Example 5 - Angle reasoning',
            prompt: 'A quadrilateral has three angles: 90°, 80°, and 100°. What is the fourth angle?',
            steps: ['Quadrilateral angles add to 360°.', '90 + 80 + 100 = 270.', '360 - 270 = 90.'],
            answer: '90°',
            note: 'Use the total angle sum for the shape.'
          }
        ],
        questions: [
          { q: 'How many sides does a hexagon have?', a: '6', note: 'Hexa means six.' },
          { q: 'What is the missing angle in a triangle with angles 40° and 50°?', a: '90°', note: '180 - 90 = 90.' },
          { q: 'A shape has one pair of parallel sides and one pair of equal sides. What shape could it be?', a: 'An isosceles trapezium', note: 'Use the given properties.' },
          { q: 'What is the total of the angles in a quadrilateral?', a: '360°', note: 'Four-sided shapes total 360°.' },
          { q: 'Does a circle have sides?', a: 'No', note: 'A circle is curved, not straight-sided.' },
          { q: 'How many faces does a cube have?', a: '6', note: 'A cube has 6 square faces.' },
          { q: 'Which shape has exactly one line of symmetry: a square or a kite?', a: 'A kite', note: 'A square has more than one.' },
          { q: 'What is the missing angle if three angles in a quadrilateral are 90°, 90°, and 70°?', a: '110°', note: '360 - 250 = 110.' },
          { q: 'What is a net used for?', a: 'To fold into a 3D shape', note: 'A net is a flat shape that folds.' },
          { q: 'Which shape has 3 sides?', a: 'Triangle', note: 'Three sides make a triangle.' },
          { q: 'How many vertices does a cube have?', a: '8', note: 'Count the corners.' },
          { q: 'A right angle is how many degrees?', a: '90°', note: 'A right angle makes a square corner.' },
          { q: 'What is the sum of the angles in a triangle?', a: '180°', note: 'Always 180°.' },
          { q: 'Which is more likely to fold into a prism: a 6-square net or a single square?', a: '6-square net', note: 'A prism needs several connected faces.' },
          { q: 'How many lines of symmetry does a rectangle have?', a: '2', note: 'One horizontal and one vertical.' }
        ]
      },
      skills: [
        ['2D Shape Reasoning', 'Use symmetry, side properties, and angle facts to classify shapes.'],
        ['3D Visualisation', 'Link nets, faces, edges, and vertices to solid objects.'],
        ['Angle Logic', 'Apply triangle and quadrilateral angle sums in short chains of reasoning.']
      ],
      questionTypes: ['which net folds correctly', 'find the missing angle', 'shape property comparisons'],
      starter: ['Mark right angles and equal sides directly on a sketch.', 'Imagine folding the net rather than guessing from memory.', 'Use known total angles to find missing parts step by step.'],
      watchouts: ['mixing up perimeter facts with angle facts', 'forgetting hidden faces on 3D objects', 'rushing net questions without visualising the fold'],
      related: ['maths-measurement', 'thinking-spatial-reasoning']
    },
    'maths-position-coordinates': {
      file: 'selective-maths-position-coordinates.html',
      domain: 'maths',
      title: 'Position & Coordinates',
      subtitle: 'Reading grids, maps, and ordered pairs — and never swapping x and y again',
      intro: 'Imagine every city in the world has a unique coordinate pair — like (33.87, 151.21) for Sydney. Coordinates let us describe ANY exact location using just two numbers. The selective exam tests this with grids, treasure maps, robot paths, and shape plotting. The one rule that never changes: x comes before y, and x is always the horizontal (across) direction. Learn that rule so deeply that swapping them becomes impossible.',
      lesson: {
        theory: [
          {
            title: 'Walk before you climb — the golden rule',
            text: 'The coordinate pair (x, y) ALWAYS has x first and y second. x tells you how far to go ACROSS (left-right). y tells you how far to go UP (up-down). Mnemonic: "Walk along the corridor, then climb the stairs." You always walk horizontally before going vertical. Another way: the alphabet puts x before y. So in (x, y), x is first — horizontal. In every exam, before plotting any point, say out loud: "Across first, then up."',
            visual: 'grid-point'
          },
          {
            title: 'Reading and plotting — the step-by-step method',
            text: 'TO READ a point: from the dot, draw a vertical line DOWN to the x-axis to find x. Then draw a horizontal line LEFT to the y-axis to find y. TO PLOT (3, 5): start at origin (0,0). Move 3 units right along the x-axis. Then move 5 units UP. Mark the point. Common mistake: going up first, then across. This lands in the wrong place. Always across first.',
            visual: 'coordinate-plane'
          },
          {
            title: 'Movement on the grid',
            text: 'When a point MOVES: right = add to x. Left = subtract from x. Up = add to y. Down = subtract from y. For multi-step paths, update the coordinates AFTER EACH individual move. Example: start at (2, 3). Move 4 right and 2 down. After right: (6, 3). After down: (6, 1). Never try to do all moves at once in your head — you will drift to the wrong answer.',
            visual: 'path-grid'
          },
          {
            title: 'Exam shortcuts for grid questions',
            text: 'Fastest direction comparison: furthest RIGHT = largest x. Furthest UP = largest y. Furthest LEFT = smallest x. Furthest DOWN = smallest y. You can answer "which point is furthest right" without reading the grid at all — just compare the x-values. Grid reference trap: in map references (like C5), the LETTER is the column (x-direction) and the NUMBER is the row (y-direction). Read the letter first then the number, just like (x, y).',
            visual: 'coordinate-plane'
          }
        ],
        examNotes: [
          'Always read coordinates as (across, up) — never the other way. Say "along the corridor, then up the stairs" to remember the order.',
          'If a question gives a grid reference like C3 it usually means column C, row 3 — read the letter first, then the number.',
          'For movement questions, track each step separately and update the coordinate after every move, not at the end.'
        ],
        guidance: [
          'Read across first, then up, so the point order stays correct.',
          'Use the grid labels before guessing the location.',
          'Track movement in small steps when a path has turns.'
        ],
        visuals: [
          { type: 'grid-point' },
          { type: 'coordinate-plane' },
          { type: 'path-grid' }
        ],
        exampleVisuals: ['grid-point', 'grid-point', 'coordinate-plane', 'path-grid', 'path-grid'],
        examples: [
          {
            label: 'Example 1 - Reading a point',
            prompt: 'On a grid, what point is 3 across and 2 up?',
            steps: ['Across is the first number.', 'Up is the second number.', 'The point is (3, 2).'],
            answer: '(3, 2)',
            note: 'Across first, up second.'
          },
          {
            label: 'Example 2 - Plotting a point',
            prompt: 'Plot the point (1, 4).',
            steps: ['Move 1 across from the start.', 'Move 4 up.', 'Mark the point.'],
            answer: '(1, 4)',
            note: 'The x-value comes first.'
          },
          {
            label: 'Example 3 - Compare positions',
            prompt: 'Which is further right: (2, 5) or (4, 1)?',
            steps: ['Compare the first number only.', '4 is further right than 2.'],
            answer: '(4, 1)',
            note: 'Left/right uses the first number.'
          },
          {
            label: 'Example 4 - Map movement',
            prompt: 'A robot moves 2 right and 3 up from (1, 1). Where does it land?',
            steps: ['Start at (1, 1).', 'Move to (3, 1) then up to (3, 4).'],
            answer: '(3, 4)',
            note: 'Do each movement in order.'
          },
          {
            label: 'Example 5 - Path and turns',
            prompt: 'A path goes 1 left, 2 up, and 3 right from (4, 2). Where does it end?',
            steps: ['Start at (4, 2).', '1 left gives (3, 2).', '2 up gives (3, 4).', '3 right gives (6, 4).'],
            answer: '(6, 4)',
            note: 'Count each move carefully.'
          }
        ],
        questions: [
          { q: 'What point is 2 across and 3 up?', a: '(2, 3)', note: 'Across first, up second.' },
          { q: 'If a point is (5, 1), what is the first number?', a: '5', note: 'The first number is across.' },
          { q: 'Which point is further up: (2, 6) or (4, 3)?', a: '(2, 6)', note: 'Compare the second number.' },
          { q: 'Plot (0, 4): where does it start?', a: 'On the y-axis, 4 up', note: 'Zero across stays on the vertical axis.' },
          { q: 'A point moves 3 right from (2, 2). Where is it now?', a: '(5, 2)', note: 'Add 3 to the first number.' },
          { q: 'A point moves 2 up from (1, 3). Where is it now?', a: '(1, 5)', note: 'Add 2 to the second number.' },
          { q: 'Which is further left: (1, 7) or (4, 7)?', a: '(1, 7)', note: 'Smaller first number is further left.' },
          { q: 'A robot moves 1 left and 1 down from (3, 3). Where is it?', a: '(2, 2)', note: 'Subtract 1 from both numbers.' },
          { q: 'What is the ordered pair for 6 across and 0 up?', a: '(6, 0)', note: 'The second number can be zero.' },
          { q: 'A path goes 2 right from (0, 0). Where does it end?', a: '(2, 0)', note: 'Move only on the horizontal line.' },
          { q: 'What point is 4 across and 5 up?', a: '(4, 5)', note: 'Write the numbers in order.' },
          { q: 'Which number tells you how far up you go?', a: 'The second number', note: 'The y-value is the second number.' },
          { q: 'Which point is higher: (3, 8) or (6, 2)?', a: '(3, 8)', note: 'Compare the second number.' },
          { q: 'A path goes 2 left from (5, 5). Where is it?', a: '(3, 5)', note: 'Move left subtracts from the first number.' },
          { q: 'If a point is at (7, 4), how far across is it?', a: '7', note: 'Across is the first number.' }
        ]
      },
      skills: [
        ['Grid Reading', 'Locate points correctly on maps and coordinate planes.'],
        ['Ordered-Pair Accuracy', 'Remember the horizontal value comes before the vertical value.'],
        ['Path and Position Logic', 'Track movement, direction, and location changes clearly.']
      ],
      questionTypes: ['plot and identify points', 'follow movement instructions', 'map grid interpretation'],
      starter: ['Say "across first, up second" while plotting.', 'Circle the row and column labels before choosing a point.', 'Use a finger or ruler edge to track across the grid.'],
      watchouts: ['reversing x and y order', 'starting from the wrong row or column', 'mixing grid references with coordinate pairs'],
      related: ['maths-geometry', 'thinking-data-analysis']
    },
    'maths-data-interpretation': {
      file: 'selective-maths-data-interpretation.html',
      domain: 'maths',
      title: 'Data Interpretation',
      subtitle: 'Reading graphs, tables, and dot plots — then answering beyond the obvious',
      intro: 'Imagine you are a detective looking at a crime-scene report. Every number on a graph or table is a clue. The trick is: you must read the title and labels BEFORE looking at the numbers, just like a detective reads the case file before examining the evidence. Most wrong answers in data questions come from reading the wrong row, the wrong scale, or rushing before checking what each axis means.',
      lesson: {
        theory: [
          {
            title: 'Read labels before numbers',
            text: 'A graph with no title or labels is useless. Always check: What is the title? What does the vertical axis measure? What unit is being used (students, kg, dollars)? What does each bar, dot, or column represent? Skipping this step is the number-one cause of wrong answers in data questions.',
            visual: 'data-labels'
          },
          {
            title: 'Watch the scale — it can trick you',
            text: 'The scale is the ruler on the side of a graph. If it goes up by 2s (0, 2, 4, 6…), a bar halfway between 4 and 6 means 5. If it goes up by 5s (0, 5, 10…), a bar halfway means 7 or 8. Always check the gap between each mark before you read off a value. A scale that skips from 0 to 50 makes every bar look tiny — do not be fooled!',
            visual: 'column-graph'
          },
          {
            title: 'Know the three question types',
            text: 'Selective data questions are almost always one of three types: (1) Read one value — "How many students chose soccer?" (2) Find a difference — "How many more chose soccer than tennis?" (3) Find a total — "How many students answered in all?" Always check which type you are facing before you start so you know whether to read, subtract, or add.',
            visual: 'dot-plot'
          }
        ],
        guidance: [
          'Read the title and both axis labels before looking at any numbers.',
          'Check the scale interval — count the gap between two labelled marks to confirm the step size.',
          'Underline the question word: "how many more" needs subtraction; "how many in total" needs addition.',
          'For dot plots, count the dots carefully — each dot is one data point, never more.'
        ],
        visuals: [
          { type: 'data-labels' },
          { type: 'column-graph' },
          { type: 'dot-plot' }
        ],
        exampleVisuals: ['data-labels', 'column-graph', 'dot-plot', 'column-graph', 'data-labels'],
        examples: [
          {
            label: 'Example 1 — Read one value',
            prompt: 'A column graph shows favourite fruits. The Apple bar reaches 8 and the Banana bar reaches 5. How many students chose Apple?',
            options: ['8', '5', '3', '13'],
            answerIndex: 0,
            steps: ['Identify which bar is Apple.', 'Read the height of the Apple bar against the scale.', 'The bar reaches 8 on the vertical axis.'],
            note: 'Read ONLY the bar you are asked about — do not combine both unless the question says "total".'
          },
          {
            label: 'Example 2 — Find a difference',
            prompt: 'The Apple bar shows 8 and the Banana bar shows 5. How many MORE students chose Apple than Banana?',
            options: ['3', '8', '5', '13'],
            answerIndex: 0,
            steps: ['"How many more" always means subtract.', '8 − 5 = 3.', 'Three more students chose Apple.'],
            note: 'The word "more" is your subtraction signal. The word "total" or "altogether" is your addition signal.'
          },
          {
            label: 'Example 3 — Dot plot reading',
            prompt: 'A dot plot shows test scores. There are 3 dots at score 7, 2 dots at score 8, and 1 dot at score 9. How many students are shown?',
            options: ['6', '7', '24', '3'],
            answerIndex: 0,
            steps: ['Each dot = one student.', 'Count all dots: 3 + 2 + 1 = 6.', 'Six students are shown in total.'],
            note: 'Never add the scores together — count the dots. Each dot is one item, not the value shown.'
          },
          {
            label: 'Example 4 — Scale check (tricky)',
            prompt: 'A bar chart has a scale going 0, 2, 4, 6, 8, 10. A bar ends exactly halfway between 4 and 6. What is the value?',
            options: ['5', '4', '6', '4.5'],
            answerIndex: 0,
            steps: ['The gap between 4 and 6 is 2.', 'Halfway between them is exactly 5.', 'So the bar represents 5.'],
            note: 'Always check the scale step size first. Halfway does not always mean 0.5 — it depends on the gap!'
          },
          {
            label: 'Example 5 — Multi-step table question',
            prompt: 'A table shows: Monday 12 students, Tuesday 9 students, Wednesday 15 students. What is the total for the three days, and which day had the most?',
            options: ['Total 36, Wednesday', 'Total 36, Monday', 'Total 21, Wednesday', 'Total 24, Tuesday'],
            answerIndex: 0,
            steps: ['Add all three days for the total: 12 + 9 + 15 = 36.', 'Compare: 15 is the highest.', 'Wednesday had the most students.'],
            note: 'Multi-step questions need two answers. Write both clearly so you do not lose the second part.'
          }
        ],
        questions: [
          { q: 'What should you always read BEFORE looking at the numbers in a graph?', options: ['Title and axis labels', 'The biggest bar', 'The answer choices', 'The bottom row only'], answerIndex: 0, note: 'Labels tell you what the numbers mean.' },
          { q: 'A bar reaches 14 on a scale. What value does it represent?', options: ['14', '7', '28', '10'], answerIndex: 0, note: 'Read the bar against the scale directly.' },
          { q: 'A graph scale goes 0, 5, 10, 15. A bar lands halfway between 10 and 15. What is the value?', options: ['12 or 13', '10', '15', '5'], answerIndex: 0, note: 'The gap is 5 so halfway is 12.5 — round to nearest labelled mark.' },
          { q: '"How many MORE" in a data question tells you to do what?', options: ['Subtract', 'Add', 'Multiply', 'Divide'], answerIndex: 0, note: '"More" = subtraction.' },
          { q: '"How many in total" tells you to do what?', options: ['Add all the values', 'Find the biggest bar', 'Subtract the smallest', 'Divide by two'], answerIndex: 0, note: '"Total" = addition.' },
          { q: 'A dot plot has 4 dots at score 5 and 3 dots at score 6. How many data points are there altogether?', options: ['7', '11', '4', '3'], answerIndex: 0, note: 'Count every dot: 4 + 3 = 7.' },
          { q: 'A table shows cats: 8, dogs: 12, birds: 4. Which is the most popular pet?', options: ['Dogs', 'Cats', 'Birds', 'Tied'], answerIndex: 0, note: '12 is the highest value.' },
          { q: 'Using the same table: how many fewer birds than dogs?', options: ['8', '4', '12', '16'], answerIndex: 0, note: '12 − 4 = 8.' },
          { q: 'Using the same table: what is the total for all three pets?', options: ['24', '20', '16', '12'], answerIndex: 0, note: '8 + 12 + 4 = 24.' },
          { q: 'If a column graph shows rainfall in mm for each month, what does each column represent?', options: ['Rainfall for that month', 'Temperature for that month', 'The number of days', 'Total rainfall for the year'], answerIndex: 0, note: 'The title tells you what each column measures.' },
          { q: 'A bar reads 20 but the scale goes up in steps of 4. Is 20 a valid reading?', options: ['Yes — it sits on a scale mark', 'No — only even numbers work', 'No — scales must go in 5s', 'Not enough information'], answerIndex: 0, note: '4, 8, 12, 16, 20 — yes, 20 is a valid mark.' },
          { q: 'Which question requires you to look at TWO values on a graph?', options: ['"How many more X than Y?"', '"How many X are there?"', '"What is the title?"', '"What does the y-axis show?"'], answerIndex: 0, note: 'Comparing two things needs two values.' },
          { q: 'A table shows: Maths 85, English 72, Science 91. What is the difference between the highest and lowest scores?', options: ['19', '9', '163', '13'], answerIndex: 0, note: '91 − 72 = 19.' },
          { q: 'A dot plot shows 5 dots at 10 and 2 dots at 12. What is the total count of items shown?', options: ['7', '10', '12', '22'], answerIndex: 0, note: '5 + 2 = 7 dots total.' }
        ]
      },
      skills: [
        ['Scale and Label Reading', 'Identify the interval, unit, and category before extracting any value.'],
        ['Single vs Comparative Questions', 'Know instantly whether the question asks for one value, a difference, or a total.'],
        ['Table and Graph Accuracy', 'Read tables and graphs precisely without drifting to the wrong row or bar.']
      ],
      questionTypes: ['read a single value from a graph', 'find a difference between two categories', 'find a total across categories', 'interpret a scale or axis label', 'multi-step table questions'],
      starter: ['Always read the title and axis labels before touching the numbers.', 'Underline the question keyword (more, total, least) to lock in the operation.', 'For dot plots, count the dots — never add the values shown on the axis.'],
      watchouts: ['reading the scale without checking the step size first', 'adding all values when the question only asks about one', 'misreading a dot plot by adding scores instead of counting dots'],
      related: ['maths-averages', 'thinking-data-analysis']
    },
    'maths-averages': {
      file: 'selective-maths-averages.html',
      domain: 'maths',
      title: 'Mean, Median & Mode',
      subtitle: 'Three ways to describe a set of numbers — and when to use each one',
      intro: 'Imagine your class takes a maths test. The teacher wants one number to describe how everyone did. But which single number is fairest? That is exactly what mean, median, and mode answer. Each one tells a different story about the same data. Selective questions love to test whether you know which average to use — and whether you can calculate it without making the classic sorting mistake.',
      lesson: {
        theory: [
          {
            title: 'Mean — the fair share',
            text: 'Mean = (add all values) ÷ (how many values). Think of it as giving everyone the same amount. If 3 friends have 2, 4, and 6 stickers, the total is 12. Shared fairly among 3 friends, each gets 4. So the mean is 4. Secret exam shortcut: to find a MISSING value when you know the mean, multiply mean × count to get the total, then subtract the values you already have.',
            visual: 'mean-sharing'
          },
          {
            title: 'Median — the middle one',
            text: 'Median = the middle value after you sort the list from smallest to largest. With an ODD count of values (3, 5, 7 numbers…), there is one middle number. With an EVEN count (4, 6, 8 numbers…), there are TWO middle numbers — add them and divide by 2. The most common exam mistake: forgetting to sort first. If the list is 7, 3, 5 and you pick 3 as the middle, you are wrong. Sort first: 3, 5, 7 → median is 5.',
            visual: 'median-middle'
          },
          {
            title: 'Mode — the most popular',
            text: 'Mode = the value that appears most often. A list can have NO mode (all values appear once), ONE mode, or TWO modes (bimodal). The mode is the only average that works with non-number data too — the most popular colour, the most common pet. Exam tip: do not confuse the mode with the largest number. In 2, 2, 8, 9, 9 there are two modes: 2 and 9.',
            visual: 'mode-frequency'
          }
        ],
        guidance: [
          'For MEAN: add all, then divide by how many. Use total = mean × count to find a missing value.',
          'For MEDIAN: always sort first, every single time. Then find the middle (or average the two middle values if the count is even).',
          'For MODE: count how many times each value appears. Watch for bimodal (two modes) or no mode.',
          'If the question says "average" without specifying which kind, it almost always means MEAN in a maths exam.'
        ],
        visuals: [
          { type: 'mean-sharing' },
          { type: 'median-middle' },
          { type: 'mode-frequency' }
        ],
        exampleVisuals: ['mean-sharing', 'median-middle', 'mode-frequency', 'mean-sharing', 'median-middle'],
        examples: [
          {
            label: 'Example 1 — Calculate the mean',
            prompt: 'Five students scored 8, 6, 9, 7, and 5 in a quiz. What is the mean score?',
            options: ['7', '6', '8', '9'],
            answerIndex: 0,
            steps: ['Add all scores: 8 + 6 + 9 + 7 + 5 = 35.', 'Divide by the number of students: 35 ÷ 5 = 7.'],
            note: 'Always count HOW MANY values before dividing. Here it is 5 students, not 4 or 6.'
          },
          {
            label: 'Example 2 — Find the median (odd count)',
            prompt: 'Find the median of: 11, 3, 7, 15, 9.',
            options: ['9', '7', '11', '3'],
            answerIndex: 0,
            steps: ['Sort from smallest to largest: 3, 7, 9, 11, 15.', 'There are 5 values (odd count), so the middle is the 3rd value.', 'The 3rd value is 9.'],
            note: 'Sort FIRST. If you skip sorting and pick from the original order, you will get the wrong answer every time.'
          },
          {
            label: 'Example 3 — Median with even count',
            prompt: 'Find the median of: 4, 8, 2, 10, 6, 12.',
            options: ['7', '6', '8', '10'],
            answerIndex: 0,
            steps: ['Sort: 2, 4, 6, 8, 10, 12.', 'Six values (even count). The two middle values are the 3rd and 4th: 6 and 8.', 'Median = (6 + 8) ÷ 2 = 7.'],
            note: 'Even count → find the TWO middle numbers → average them. This is a common exam trap.'
          },
          {
            label: 'Example 4 — Find the missing value using the mean',
            prompt: 'Four test scores have a mean of 85. Three of the scores are 80, 90, and 88. What is the fourth score?',
            options: ['82', '85', '80', '88'],
            answerIndex: 0,
            steps: ['Total needed = mean × count = 85 × 4 = 340.', 'Current total = 80 + 90 + 88 = 258.', 'Missing score = 340 − 258 = 82.'],
            note: 'This type appears in almost every selective maths paper. Remember: total needed = mean × count.'
          },
          {
            label: 'Example 5 — Mode and best average choice',
            prompt: 'Scores: 3, 3, 3, 8, 9, 10. The mode is 3. Why might the mean be a better description of this data?',
            options: ['The mode ignores the higher scores and gives a misleadingly low picture', 'The mode is larger than the mean', 'The mean is always the correct average', 'The median is always wrong here'],
            answerIndex: 0,
            steps: ['Mode = 3 (most frequent). Mean = (3+3+3+8+9+10)/6 = 36/6 = 6.', 'The mean 6 sits near the middle of the full range.', 'The mode 3 only reflects the repeated low score — it does not represent the higher scores at all.'],
            note: 'Selective questions sometimes ask WHICH average best describes a dataset. Always look at whether any values are very different from the others.'
          }
        ],
        questions: [
          { q: 'What is the mean of 4, 6, 8, 10?', options: ['7', '6', '8', '10'], answerIndex: 0, note: '4+6+8+10=28, then 28÷4=7.' },
          { q: 'What MUST you do before finding the median?', options: ['Sort the values in order', 'Add all the values', 'Find the most common value', 'Divide by 2'], answerIndex: 0, note: 'Sorting first is non-negotiable for the median.' },
          { q: 'Find the median of 5, 1, 3, 9, 7.', options: ['5', '3', '7', '9'], answerIndex: 0, note: 'Sorted: 1,3,5,7,9 → middle is 5.' },
          { q: 'Find the mode of 2, 4, 2, 7, 4, 2.', options: ['2', '4', '7', 'No mode'], answerIndex: 0, note: '2 appears 3 times — more than any other value.' },
          { q: 'The mean of three numbers is 10. Two of them are 8 and 11. What is the third?', options: ['11', '9', '10', '12'], answerIndex: 0, note: 'Total needed = 30. 8+11=19. Third = 30−19=11.' },
          { q: 'Find the median of 2, 8, 4, 6.', options: ['5', '4', '6', '2'], answerIndex: 0, note: 'Sorted: 2,4,6,8 → two middle values 4 and 6 → (4+6)/2=5.' },
          { q: 'Which average tells you the most frequent value?', options: ['Mode', 'Mean', 'Median', 'Range'], answerIndex: 0, note: 'Mode = most frequent.' },
          { q: 'A data set has no value appearing more than once. What is the mode?', options: ['No mode', '0', 'The middle value', 'The largest value'], answerIndex: 0, note: 'If nothing repeats, there is no mode.' },
          { q: 'What is the mean of 0, 0, 0, 12?', options: ['3', '0', '4', '12'], answerIndex: 0, note: '0+0+0+12=12, then 12÷4=3.' },
          { q: 'Five students have scores with a mean of 6. What is the total of all five scores?', options: ['30', '6', '25', '11'], answerIndex: 0, note: 'Mean × count = 6 × 5 = 30.' },
          { q: 'What is the median of 1, 1, 3, 5, 9, 11?', options: ['4', '3', '5', '1'], answerIndex: 0, note: 'Six values. Middle pair is 3 and 5. Median = (3+5)/2 = 4.' },
          { q: 'Can a data set have two modes?', options: ['Yes — if two values appear equally often', 'No — there is always only one mode', 'Only if the values are the same', 'Only with an even count'], answerIndex: 0, note: 'A bimodal set has two modes.' },
          { q: 'Which average is most affected by one very large or very small value?', options: ['Mean', 'Median', 'Mode', 'All equally'], answerIndex: 0, note: 'One extreme value pulls the mean up or down. Median stays more stable.' },
          { q: 'What is the mean of 15, 15, 15, 15?', options: ['15', '60', '4', '0'], answerIndex: 0, note: 'When all values are the same, the mean equals that value.' }
        ]
      },
      skills: [
        ['Mean Calculation', 'Add all values and divide by how many — and reverse it to find a missing value.'],
        ['Median with Sorting', 'Always sort first, then pick the middle (or average two middles for even count).'],
        ['Mode Identification', 'Spot the most frequent value and recognise bimodal or no-mode cases.']
      ],
      questionTypes: ['calculate mean, median, or mode', 'find a missing value given the mean', 'choose which average best describes a data set', 'even-count median problems'],
      starter: ['Mean: add everything, then divide. Use total = mean × count to work backwards.', 'Median: sort EVERY time without exception, then find the middle.', 'Mode: tally each value. Two equal tallies = two modes.'],
      watchouts: ['forgetting to sort before finding the median', 'dividing by the wrong count for the mean', 'picking the largest value instead of the most frequent for the mode'],
      related: ['maths-data-interpretation', 'maths-probability']
    },
    'maths-probability': {
      file: 'selective-maths-probability.html',
      domain: 'maths',
      title: 'Probability',
      subtitle: 'Chance as a fraction, outcome listing, and the complement rule',
      intro: 'Probability is the maths of "what are the chances?". Every time you flip a coin, roll a die, or pull a ball from a bag, you are running a probability experiment. The great thing about probability is that once you know TWO rules — how to write a fraction and the complement rule — you can solve almost every type of selective question on this topic.',
      lesson: {
        theory: [
          {
            title: 'Probability as a fraction',
            text: 'Probability = (number of favourable outcomes) ÷ (total number of equally likely outcomes). If a bag has 3 red and 2 blue balls, the probability of pulling red is 3/5. The fraction is always between 0 (impossible) and 1 (certain). An event with probability 1/2 has a 50-50 chance. Write probabilities as fractions for the exam unless the question asks for a percentage.',
            visual: 'coin-chance'
          },
          {
            title: 'List the sample space first',
            text: 'The "sample space" is all the possible outcomes. For a coin: {Heads, Tails} — 2 outcomes. For a die: {1, 2, 3, 4, 5, 6} — 6 outcomes. For a bag with 3 red and 2 blue balls: {R, R, R, B, B} — 5 outcomes. ALWAYS list the sample space before writing the fraction. Counting outcomes is where most mistakes happen.',
            visual: 'spinner'
          },
          {
            title: 'The complement rule — a huge shortcut',
            text: 'The complement rule says: P(not A) = 1 − P(A). In other words, the probability something does NOT happen = 1 minus the probability it DOES happen. Example: if the probability of rain is 3/5, the probability of no rain is 1 − 3/5 = 2/5. This shortcut works every time and saves a lot of counting.',
            visual: 'dice-chance'
          }
        ],
        guidance: [
          'Write the probability as a fraction: favourable outcomes ÷ total outcomes.',
          'List ALL outcomes in the sample space before you start. Count carefully.',
          'Use the complement rule when it is easier to count what you do NOT want.',
          'Check: probability must always be between 0 and 1 (inclusive). If your answer is bigger than 1, you have made a mistake.'
        ],
        visuals: [
          { type: 'coin-chance' },
          { type: 'spinner' },
          { type: 'dice-chance' }
        ],
        exampleVisuals: ['coin-chance', 'spinner', 'dice-chance', 'coin-chance', 'spinner'],
        examples: [
          {
            label: 'Example 1 — Probability as a fraction',
            prompt: 'A bag has 4 green balls and 1 red ball. What is the probability of picking a green ball?',
            options: ['4/5', '1/5', '4/1', '1/4'],
            answerIndex: 0,
            steps: ['Count the favourable outcomes: 4 green balls.', 'Count the total outcomes: 4 + 1 = 5 balls.', 'Probability = 4/5.'],
            note: 'Always write the fraction with total outcomes on the bottom. 4/1 makes no sense here — probability can never be more than 1.'
          },
          {
            label: 'Example 2 — Spinner with unequal sections',
            prompt: 'A spinner has 4 equal sections: 2 red, 1 blue, 1 yellow. What is the probability of landing on blue?',
            options: ['1/4', '2/4', '1/3', '3/4'],
            answerIndex: 0,
            steps: ['Total sections = 4.', 'Blue sections = 1.', 'Probability of blue = 1/4.'],
            note: 'Each section must be equal size for this approach to work. If sections are different sizes, you cannot use this formula.'
          },
          {
            label: 'Example 3 — Complement rule shortcut',
            prompt: 'A bag has 10 balls. The probability of picking a red ball is 3/10. What is the probability of NOT picking a red ball?',
            options: ['7/10', '3/10', '10/3', '1/3'],
            answerIndex: 0,
            steps: ['P(not red) = 1 − P(red).', '1 − 3/10 = 7/10.'],
            note: 'The complement rule is extremely fast. Use it whenever it is easier to count "not this" than "this".'
          },
          {
            label: 'Example 4 — List the sample space for a die',
            prompt: 'A fair die is rolled. What is the probability of rolling a number greater than 4?',
            options: ['2/6 = 1/3', '3/6 = 1/2', '4/6 = 2/3', '1/6'],
            answerIndex: 0,
            steps: ['Sample space = {1, 2, 3, 4, 5, 6}. Total = 6.', 'Numbers greater than 4: {5, 6}. Favourable = 2.', 'Probability = 2/6 = 1/3.'],
            note: 'Always simplify the fraction at the end if possible. 2/6 and 1/3 are the same value.'
          },
          {
            label: 'Example 5 — Which is more likely?',
            prompt: 'Event A: pulling a red ball from a bag with 3 red and 7 blue. Event B: rolling a 5 on a fair die. Which event is more likely?',
            options: ['Event A (3/10 > 1/6)', 'Event B (1/6 > 3/10)', 'Both equally likely', 'Not enough information'],
            answerIndex: 0,
            steps: ['Event A: 3 red out of 10 total = 3/10 = 0.3.', 'Event B: 1 out of 6 = 1/6 ≈ 0.167.', '0.3 > 0.167, so Event A is more likely.'],
            note: 'To compare fractions quickly, convert to decimals or find a common denominator.'
          }
        ],
        questions: [
          { q: 'A bag has 2 red, 3 blue, and 5 green balls. What is the probability of picking blue?', options: ['3/10', '2/10', '5/10', '1/3'], answerIndex: 0, note: '3 blue out of 10 total = 3/10.' },
          { q: 'What are all possible outcomes when flipping a coin?', options: ['Heads and Tails', 'Heads only', 'Tails only', 'Three outcomes'], answerIndex: 0, note: 'A coin has exactly 2 outcomes.' },
          { q: 'A spinner is divided into 5 equal sections. What is the probability of any single section?', options: ['1/5', '5/1', '1/10', '2/5'], answerIndex: 0, note: '1 section out of 5 equal sections.' },
          { q: 'The probability of rain is 2/7. What is the probability it will NOT rain?', options: ['5/7', '2/7', '7/2', '1/7'], answerIndex: 0, note: '1 − 2/7 = 5/7.' },
          { q: 'A die is rolled. How many possible outcomes are there?', options: ['6', '1', '3', '12'], answerIndex: 0, note: 'A standard die has 6 faces.' },
          { q: 'What is the probability of rolling an even number on a fair die?', options: ['3/6 = 1/2', '2/6 = 1/3', '1/6', '4/6'], answerIndex: 0, note: 'Even numbers: 2, 4, 6. That is 3 out of 6.' },
          { q: 'A bag has 1 yellow ball and 9 other coloured balls. What is the probability of picking yellow?', options: ['1/10', '9/10', '1/9', '1/1'], answerIndex: 0, note: '1 yellow out of 10 total.' },
          { q: 'If P(winning) = 1/4, what is P(not winning)?', options: ['3/4', '1/4', '4/1', '1/2'], answerIndex: 0, note: '1 − 1/4 = 3/4.' },
          { q: 'Which probability is impossible?', options: ['7/5', '1/2', '3/4', '0'], answerIndex: 0, note: 'Probability cannot be greater than 1.' },
          { q: 'A spinner has 8 equal sections with 3 labelled "Win". What is the probability of winning?', options: ['3/8', '5/8', '8/3', '1/8'], answerIndex: 0, note: '3 winning sections out of 8 total.' },
          { q: 'Which probability represents a certain event?', options: ['1', '0', '1/2', '2/1'], answerIndex: 0, note: 'Probability of 1 means the event always happens.' },
          { q: 'If P(A) = 0.6, what is P(not A)?', options: ['0.4', '0.6', '1.6', '0.3'], answerIndex: 0, note: '1 − 0.6 = 0.4.' },
          { q: 'A bag has 6 balls — 2 red, 2 green, 2 blue. Are the outcomes equally likely?', options: ['Yes, each colour has probability 2/6 = 1/3', 'No, red is most likely', 'Yes, each ball has probability 1/2', 'No, not enough information'], answerIndex: 0, note: 'Each colour has the same count, so equal chance.' },
          { q: 'What is the probability of rolling a number less than 3 on a fair die?', options: ['2/6 = 1/3', '3/6 = 1/2', '1/6', '4/6'], answerIndex: 0, note: 'Numbers less than 3: {1, 2}. That is 2 out of 6.' }
        ]
      },
      skills: [
        ['Outcome Counting', 'List or count possible results carefully and completely.'],
        ['Likelihood Comparison', 'Compare events using chance language and simple fractions.'],
        ['Fairness Judgement', 'Decide whether a game or spinner is balanced or biased.']
      ],
      questionTypes: ['spinners and dice', 'bag-of-counters questions', 'most likely / least likely comparisons'],
      starter: ['List outcomes before choosing an answer.', 'Check whether outcomes are equally likely.', 'Use simple fractions to compare chance.'],
      watchouts: ['counting repeated outcomes twice', 'assuming every game is fair', 'using past results to predict independent future events'],
      related: ['maths-data-interpretation', 'thinking-problem-solving']
    },
    'maths-divisibility-remainders': {
      file: 'selective-maths-divisibility-remainders.html',
      domain: 'maths',
      title: 'Divisibility & Remainders',
      subtitle: 'Remainder patterns, divisibility shortcuts, and modular reasoning',
      intro: 'Think of remainders like leftover pizza slices after sharing equally. If 29 slices feed tables of 6, each table gets 4 slices and 5 slices are left over — that leftover is the remainder. Selective questions use this idea in clever ways, but once you see the pattern, they become very manageable.',
      lesson: {
        theory: [
          {
            title: 'What is a remainder?',
            text: 'A remainder is what is left after you make as many equal groups as possible. When you divide 29 by 6, you can make 4 full groups of 6 (that is 24). The leftover 5 is the remainder. Key rule: the remainder is ALWAYS less than the divisor. A remainder of 6 when dividing by 6 is impossible — that would make one more complete group!',
            visual: 'divisibility-check'
          },
          {
            title: 'Remainders form a repeating cycle',
            text: 'When you divide any series of numbers by the same divisor, the remainders always repeat in a cycle of 0, 1, 2, … up to (divisor − 1). Dividing by 5 gives remainders 0, 1, 2, 3, 4, 0, 1, 2, 3, 4 … over and over. This cycle trick lets you find remainders for huge numbers without long division.',
            visual: 'remainder-cycle'
          },
          {
            title: 'Four fast divisibility checks',
            text: '÷ 2: last digit is even (0, 2, 4, 6, 8). ÷ 3: add all digits — if the digit-sum divides by 3, the number does too (e.g., 135 → 1+3+5=9, and 9÷3=3 ✓). ÷ 5: last digit is 0 or 5. ÷ 10: last digit is 0. Memorise these four and you can eliminate wrong answers in seconds without any long calculation.',
            visual: 'divisibility-check'
          }
        ],
        guidance: [
          'Always write the full division sentence first: n = divisor × quotient + remainder. This one formula solves three different question types.',
          'Remainder must ALWAYS be less than the divisor. If an option shows remainder ≥ divisor, cross it out immediately.',
          'To find the remainder fast: find the largest multiple of the divisor that fits below your number, then subtract.',
          'Use the digit-sum trick for ÷3 and ÷9 instead of long division — it saves precious exam time.'
        ],
        visuals: [
          { type: 'divisibility-check' },
          { type: 'remainder-cycle' },
          { type: 'divisibility-check' }
        ],
        exampleVisuals: ['divisibility-check', 'remainder-cycle', 'divisibility-check', 'remainder-cycle', 'divisibility-check'],
        examples: [
          {
            label: 'Example 1 — Finding a remainder',
            prompt: 'What is the remainder when 43 is divided by 6?',
            options: ['1', '3', '5', '7'],
            answerIndex: 0,
            steps: ['Find the biggest multiple of 6 that fits inside 43.', '6 × 7 = 42. That fits. 6 × 8 = 48. Too big.', '43 − 42 = 1.', 'So 43 = 6 × 7 + 1. Remainder is 1.'],
            note: 'Quick check: remainder 7 is impossible — it is bigger than the divisor 6!'
          },
          {
            label: 'Example 2 — Divisibility rules in action',
            prompt: 'Which of these numbers is divisible by 3: 124, 135, 256?',
            options: ['135', '124', '256', 'None of them'],
            answerIndex: 0,
            steps: ['Add the digits of each number and check if the sum divides by 3.', '124 → 1+2+4 = 7. Not divisible by 3.', '135 → 1+3+5 = 9. 9 ÷ 3 = 3. Yes!', '256 → 2+5+6 = 13. Not divisible by 3.'],
            note: 'The digit-sum trick only works for ÷3 and ÷9. For ÷2 and ÷5 look at the last digit only.'
          },
          {
            label: 'Example 3 — Remainder cycle shortcut',
            prompt: 'When dividing by 5, the remainders for 25, 26, 27, 28, 29 are 0, 1, 2, 3, 4. What is the remainder when 37 is divided by 5?',
            options: ['2', '0', '3', '4'],
            answerIndex: 0,
            steps: ['The cycle for ÷5 is 0, 1, 2, 3, 4, 0, 1, 2, 3, 4 …', '35 ÷ 5 = 7 remainder 0. So 35 is the start of a new cycle.', '36 → r1, 37 → r2.'],
            note: 'Cycle thinking is very fast: once you find ONE number with remainder 0, just count from there.'
          },
          {
            label: 'Example 4 — Rebuild the original number',
            prompt: 'A number gives quotient 8 and remainder 3 when divided by 7. What is the number?',
            options: ['59', '56', '62', '67'],
            answerIndex: 0,
            steps: ['Use the formula: number = divisor × quotient + remainder.', 'number = 7 × 8 + 3 = 56 + 3 = 59.', 'Check: 59 ÷ 7 = 8 remainder 3. ✓'],
            note: 'This formula rebuilds ANY number from its division parts. Memorise it!'
          },
          {
            label: 'Example 5 — Spot the odd one out',
            prompt: 'Which number has a DIFFERENT remainder when divided by 4: 17, 21, 25, 30?',
            options: ['30', '17', '21', '25'],
            answerIndex: 0,
            steps: ['Find each remainder: 17 ÷ 4 = 4 r1. 21 ÷ 4 = 5 r1. 25 ÷ 4 = 6 r1.', '30 ÷ 4 = 7 r2.', '17, 21, and 25 all give remainder 1. Only 30 gives remainder 2.'],
            note: 'These "same remainder" questions appear often. Check each number quickly — do not assume they are all the same.'
          }
        ],
        questions: [
          { q: 'What is the remainder when 35 is divided by 6?', options: ['5', '4', '6', '1'], answerIndex: 0, note: '6 × 5 = 30, then 35 − 30 = 5.' },
          { q: 'Is 246 divisible by 2? How do you know?', options: ['Yes — last digit 6 is even', 'No — digit sum is odd', 'Yes — divisible by 3', 'No — it ends in 6'], answerIndex: 0, note: 'Any even last digit means ÷2 works.' },
          { q: 'Is 315 divisible by 3?', options: ['Yes — digit sum 9 divides by 3', 'No — ends in 5', 'Yes — ends in 5', 'No — it is odd'], answerIndex: 0, note: '3+1+5 = 9 and 9 ÷ 3 = 3.' },
          { q: 'What is the largest possible remainder when dividing by 8?', options: ['7', '8', '9', '6'], answerIndex: 0, note: 'Remainder is always less than the divisor, so max is 7.' },
          { q: 'If n = 5 × 7 + 4, what is n?', options: ['39', '35', '44', '34'], answerIndex: 0, note: '5 × 7 = 35, then 35 + 4 = 39.' },
          { q: 'What is the remainder when 50 is divided by 7?', options: ['1', '2', '6', '7'], answerIndex: 0, note: '7 × 7 = 49, then 50 − 49 = 1.' },
          { q: 'Which number is NOT divisible by 3: 123, 145, 162?', options: ['145', '123', '162', 'All are'], answerIndex: 0, note: '1+4+5 = 10 — not divisible by 3.' },
          { q: 'What is the remainder when 100 is divided by 9?', options: ['1', '2', '9', '10'], answerIndex: 0, note: '9 × 11 = 99, then 100 − 99 = 1.' },
          { q: 'A number gives quotient 5 and remainder 6 when divided by 9. What is the number?', options: ['51', '56', '45', '59'], answerIndex: 0, note: '9 × 5 + 6 = 45 + 6 = 51.' },
          { q: 'Remainders when dividing 20, 21, 22, 23 by 4 — list them in order.', options: ['0, 1, 2, 3', '1, 2, 3, 4', '0, 2, 4, 3', '4, 1, 2, 3'], answerIndex: 0, note: '20÷4=5r0, 21÷4=5r1, 22÷4=5r2, 23÷4=5r3.' },
          { q: 'Is 360 divisible by both 4 and 5?', options: ['Yes — 360 ÷ 4 = 90 and 360 ends in 0', 'No — 360 is odd', 'Only by 5', 'Only by 4'], answerIndex: 0, note: 'Check ÷4: 360 ÷ 4 = 90. Check ÷5: ends in 0. Both work!' },
          { q: 'Which has the same remainder as 17 when divided by 5: 12, 22, or 18?', options: ['22', '12', '18', 'None'], answerIndex: 0, note: '17 ÷ 5 → r2. 22 ÷ 5 → r2 as well. They match!' },
          { q: 'What is the remainder when 63 is divided by 8?', options: ['7', '1', '3', '6'], answerIndex: 0, note: '8 × 7 = 56, then 63 − 56 = 7.' },
          { q: 'A number is divisible by 10. What must its last digit be?', options: ['0', '5', '0 or 5', '2'], answerIndex: 0, note: 'Divisible by 10 always ends in 0.' }
        ]
      },
      skills: [
        ['Remainder Reasoning', 'Find what is left after equal grouping and use the formula n = d × q + r.'],
        ['Divisibility Shortcuts', 'Use fast digit-based rules to check divisibility without long division.'],
        ['Cycle Recognition', 'Spot repeating remainder patterns to solve problems about large numbers quickly.']
      ],
      questionTypes: ['find the remainder', 'same-remainder classification', 'quotient-plus-remainder reconstruction', 'divisibility checks'],
      starter: ['Always write the full sentence: number = divisor × quotient + remainder.', 'Use the digit-sum trick for ÷3 and ÷9 before trying long division.', 'If remainder ≥ divisor in any answer option, cross it out immediately.'],
      watchouts: ['choosing a remainder equal to or bigger than the divisor', 'applying the digit-sum trick to ÷2 or ÷5 (it does not work there)', 'mixing up the quotient and remainder in the formula'],
      related: ['maths-whole-numbers', 'maths-patterns-algebra']
    },
    'maths-time-systems': {
      file: 'selective-maths-time-systems.html',
      domain: 'maths',
      title: 'Time Systems & Timetables',
      subtitle: '24-hour time, elapsed time, schedules, and time-zone shifts',
      intro: 'Selective time questions often include multiple time systems at once: 12-hour, 24-hour, timetables, and place-to-place time differences.',
      lesson: {
        theory: [
          {
            title: '12-hour vs 24-hour',
            text: 'Convert carefully before calculating. The same digits can mean very different times.',
            visual: 'timetable-grid'
          },
          {
            title: 'Elapsed time in chunks',
            text: 'Break long intervals into easy jumps: to next hour, then full hours, then minutes.',
            visual: 'elapsed-time-calc'
          },
          {
            title: 'Time-zone offset',
            text: 'Anchor one city first, then apply fixed offsets step by step.',
            visual: 'time-zone-compare'
          }
        ],
        guidance: [
          'Convert all times to one format before comparing.',
          'For journey problems, separate waiting time from travel time.',
          'When crossing midnight, move date and day labels deliberately.'
        ],
        visuals: [
          { type: 'timetable-grid' },
          { type: 'elapsed-time-calc' },
          { type: 'time-zone-compare' }
        ],
        exampleVisuals: ['timetable-grid', 'elapsed-time-calc', 'time-zone-compare'],
        examples: [
          {
            label: 'Example 1 - 24-hour conversion',
            prompt: 'What is 19:05 in 12-hour time?',
            steps: ['19:05 is 7 hours after 12:00.', 'So it is 7:05 pm.'],
            answer: '7:05 pm',
            options: ['7:05 pm', '8:05 pm', '6:05 pm', '9:05 pm'],
            answerIndex: 0,
            note: 'Afternoon/evening hours are 13 to 23 in 24-hour format.'
          },
          {
            label: 'Example 2 - Elapsed time',
            prompt: 'A bus leaves at 09:40 and arrives at 12:15. How long is the trip?',
            steps: ['09:40 to 10:00 is 20 min.', '10:00 to 12:00 is 2 hours.', '12:00 to 12:15 is 15 min.'],
            answer: '2 hours 35 minutes',
            options: ['2 hours 35 minutes', '3 hours 35 minutes', '2 hours 25 minutes', '1 hour 35 minutes'],
            answerIndex: 0,
            note: 'Chunking prevents subtraction mistakes.'
          },
          {
            label: 'Example 3 - Time zones',
            prompt: 'City B is 3 hours ahead of City A. If it is 21:30 in A, what time is it in B?',
            steps: ['Add 3 hours to 21:30.', '21:30 + 3:00 = 00:30 next day.'],
            answer: '00:30 (next day)',
            options: ['00:30 (next day)', '18:30 (same day)', '23:30 (same day)', '01:30 (next day)'],
            answerIndex: 0,
            note: 'Always track day change after midnight.'
          }
        ],
        questions: [
          { q: 'Convert 18:45 to 12-hour format.', a: '6:45 pm', options: ['6:45 pm', '7:45 pm', '8:45 pm', '5:45 pm'], answerIndex: 0, note: 'Subtract 12 from the hour.' },
          { q: 'How long from 14:20 to 16:05?', a: '1 hour 45 minutes', options: ['1 hour 45 minutes', '2 hours 45 minutes', '1 hour 35 minutes', '2 hours 5 minutes'], answerIndex: 0, note: 'Use jumps through 15:00 and 16:00.' },
          { q: 'If Town X is 5 hours behind Town Y and Y is 10:00, what is X time?', a: '05:00', options: ['05:00', '15:00', '04:00', '06:00'], answerIndex: 0, note: 'Subtract offset from Y.' },
          { q: 'Which is later: 07:50 pm or 20:05?', a: '20:05', options: ['20:05', '07:50 pm', 'They are equal', '19:50'], answerIndex: 0, note: '07:50 pm is 19:50, which is earlier than 20:05.' },
          { q: 'A train leaves 23:40 and arrives 00:25. How long?', a: '45 minutes', options: ['45 minutes', '35 minutes', '55 minutes', '1 hour 25 minutes'], answerIndex: 0, note: 'Crosses midnight: 23:40 to 00:00 is 20 min, plus 25 min = 45 min.' }
        ]
      },
      skills: [
        ['Time Conversion', 'Move safely between 12-hour and 24-hour systems.'],
        ['Elapsed-Time Planning', 'Split intervals into manageable chunks without losing minutes.'],
        ['Offset Reasoning', 'Handle time-zone and schedule offsets including day rollover.']
      ],
      questionTypes: ['12-hour/24-hour conversions', 'multi-leg timetable calculations', 'time-zone offset questions'],
      starter: ['Convert first, calculate second.', 'Write each time step on a separate line.', 'Mark day changes when crossing midnight.'],
      watchouts: ['mixing am/pm with 24-hour values', 'forgetting waiting intervals', 'missing next-day rollover'],
      related: ['maths-measurement', 'maths-optimisation-constraints']
    },
    'maths-counting-combinatorics': {
      file: 'selective-maths-counting-combinatorics.html',
      domain: 'maths',
      title: 'Counting & Combinatorics',
      subtitle: 'Count possibilities without missing any or counting the same thing twice',
      intro: 'Imagine you are picking what to wear: 3 shirts × 4 pairs of shorts = 12 possible outfits. That is the product rule in one sentence. Combinatorics (counting possibilities) sounds fancy but it only uses a few ideas. The golden question to ask every single time is: "Does the order matter?" That one question determines almost everything about how you count.',
      lesson: {
        theory: [
          {
            title: 'The Product Rule — multiply the choices',
            text: 'When you have independent choices at each step, multiply the number of options at each step together. 3 shirt choices × 4 shorts choices × 2 shoe choices = 3 × 4 × 2 = 24 outfits. This works when: each choice is made separately, choosing one option does not affect another stage, and you are counting arrangements (order matters) or one item per slot.',
            visual: 'list-grid'
          },
          {
            title: 'Does order matter?',
            text: 'This is the key question. ARRANGEMENTS (order matters): AB is different from BA — e.g., the code "12" and "21" are different PIN numbers. Here you multiply: 3 × 2 × 1 = 6 arrangements of three items. SELECTIONS (order does not matter): the team of {A, B} is the same as {B, A}. Here you list systematically and remove duplicates. Pairs from 4 people: AB, AC, AD, BC, BD, CD = 6 pairs.',
            visual: 'filter-checklist'
          },
          {
            title: 'Systematic listing to avoid mistakes',
            text: 'For small numbers (up to about 5 or 6 items), listing every possibility in a table or tree diagram is faster and safer than using a formula. A tree diagram: start with all first choices, branch each one into all second choices, then all third choices. Count the end branches. Tables work best for two-step problems. Always check: can you flip any two entries and get the same outcome twice?',
            visual: 'logic-balance'
          }
        ],
        guidance: [
          'Ask "does order matter?" before anything else. That single question changes the whole method.',
          'For product-rule questions: multiply choices at each stage.',
          'For pair/team questions: list systematically or use the pairing formula n × (n−1) ÷ 2.',
          'Always double-check by asking: "Have I listed AB AND BA? If order does not matter, delete one."'
        ],
        visuals: [
          { type: 'list-grid' },
          { type: 'filter-checklist' },
          { type: 'logic-balance' }
        ],
        exampleVisuals: ['list-grid', 'list-grid', 'filter-checklist', 'logic-balance', 'list-grid'],
        examples: [
          {
            label: 'Example 1 — Outfit combinations (product rule)',
            prompt: 'A student has 3 shirts (Red, Blue, Green) and 2 pairs of shorts (Black, White). How many different outfits can they wear?',
            options: ['6', '5', '9', '3'],
            answerIndex: 0,
            steps: ['Each shirt can be paired with each pair of shorts.', 'Product rule: 3 shirts × 2 shorts = 6 outfits.', 'List to check: RB, RW, BlB, BlW, GrB, GrW. That is 6.'],
            note: 'The product rule works whenever choices at each stage are independent of each other.'
          },
          {
            label: 'Example 2 — Two-digit codes (order matters)',
            prompt: 'How many two-digit numbers can be made from the digits 1, 2, 3 without repeating a digit?',
            options: ['6', '9', '3', '8'],
            answerIndex: 0,
            steps: ['First digit: 3 choices (1, 2, or 3).', 'Second digit: 2 remaining choices (cannot repeat).', 'Total = 3 × 2 = 6.', 'List: 12, 13, 21, 23, 31, 32. That is 6.'],
            note: '12 and 21 are different numbers, so order matters here. With repetition allowed it would be 3 × 3 = 9.'
          },
          {
            label: 'Example 3 — Pair counting (order does NOT matter)',
            prompt: 'Four students — Ava, Ben, Cara, Dan — want to form pairs for a project. How many different pairs are possible?',
            options: ['6', '12', '4', '8'],
            answerIndex: 0,
            steps: ['List all pairs starting with Ava: AB, AC, AD.', 'Then pairs starting with Ben (not repeating Ava): BC, BD.', 'Then pairs starting with Cara (not repeating Ava or Ben): CD.', 'Total: AB, AC, AD, BC, BD, CD = 6 pairs.'],
            note: 'AB and BA are the SAME pair. That is why we do not list BA again. Formula shortcut: n(n−1)/2 = 4 × 3 / 2 = 6.'
          },
          {
            label: 'Example 4 — Three-step product rule (meal choices)',
            prompt: 'A canteen offers 2 soups, 3 mains, and 2 desserts. How many different 3-course meals are possible?',
            options: ['12', '7', '6', '18'],
            answerIndex: 0,
            steps: ['Choices at each stage: 2 × 3 × 2.', 'Multiply: 2 × 3 = 6, then 6 × 2 = 12.'],
            note: 'Three independent choices → multiply all three numbers together.'
          },
          {
            label: 'Example 5 — With vs without repetition',
            prompt: 'How many 3-digit codes can be made from {1, 2, 3}? (a) With repetition allowed. (b) Without repetition.',
            options: ['27 with repetition; 6 without', '6 with; 27 without', '9 with; 6 without', 'Both 6'],
            answerIndex: 0,
            steps: ['(a) With repetition: 3 choices × 3 choices × 3 choices = 27.', '(b) Without repetition: 3 × 2 × 1 = 6 (one digit used each time).'],
            note: '"With repetition" always gives a bigger answer than "without repetition". Use this as a quick check.'
          }
        ],
        questions: [
          { q: '2 hats and 5 shirt colours. How many hat-and-shirt outfits?', options: ['10', '7', '3', '25'], answerIndex: 0, note: '2 × 5 = 10.' },
          { q: 'How many 2-digit codes from {4, 5, 6} with repetition allowed?', options: ['9', '6', '3', '12'], answerIndex: 0, note: '3 choices × 3 choices = 9.' },
          { q: 'How many 2-digit codes from {4, 5, 6} WITHOUT repetition?', options: ['6', '9', '3', '8'], answerIndex: 0, note: '3 choices × 2 remaining = 6.' },
          { q: 'Five students want to form pairs. How many different pairs?', options: ['10', '20', '5', '25'], answerIndex: 0, note: '5 × 4 ÷ 2 = 10.' },
          { q: 'A menu has 4 starters and 3 mains. How many starter-and-main combinations?', options: ['12', '7', '1', '4'], answerIndex: 0, note: '4 × 3 = 12.' },
          { q: 'Does the pair "Alex and Beth" count the same as "Beth and Alex"?', options: ['Yes — they are the same pair', 'No — order matters here', 'Only if the task involves seating', 'Depends on the number of people'], answerIndex: 0, note: 'For pairs (teams, groups), order does not matter.' },
          { q: 'How many 3-letter codes from A, B, C, D with no repetition?', options: ['24', '12', '6', '64'], answerIndex: 0, note: '4 × 3 × 2 = 24.' },
          { q: 'How many ways can 3 people sit in 3 seats if every arrangement is different?', options: ['6', '3', '9', '1'], answerIndex: 0, note: '3 × 2 × 1 = 6 arrangements.' },
          { q: 'A lock has 3 dials each with digits 0–9. How many codes are possible?', options: ['1000', '30', '100', '27'], answerIndex: 0, note: '10 × 10 × 10 = 1000.' },
          { q: 'From 3 colours and 4 sizes, how many colour-size combinations for a shirt?', options: ['12', '7', '1', '16'], answerIndex: 0, note: '3 × 4 = 12.' },
          { q: 'How many handshakes between 5 people (everyone shakes everyone else once)?', options: ['10', '20', '5', '25'], answerIndex: 0, note: '5 × 4 ÷ 2 = 10 handshakes.' },
          { q: 'A school lunch has 3 drink options, 4 food options, and 2 dessert options. How many complete lunches?', options: ['24', '9', '12', '6'], answerIndex: 0, note: '3 × 4 × 2 = 24.' },
          { q: 'With 3 coins (H or T each), how many total outcomes?', options: ['8', '6', '9', '3'], answerIndex: 0, note: '2 × 2 × 2 = 8.' },
          { q: 'How many 2-letter codes from 5 letters where the two letters must be different?', options: ['20', '25', '10', '15'], answerIndex: 0, note: '5 × 4 = 20 (order matters, no repetition).' }
        ]
      },
      skills: [
        ['Product Rule', 'Multiply independent choices at each stage to get the total combinations.'],
        ['Order Awareness', 'Decide whether AB and BA are different (arrangements) or the same (selections).'],
        ['Systematic Listing', 'List all possibilities in a structured way to avoid missing cases or double-counting.']
      ],
      questionTypes: ['outfit and meal combinations', 'two-digit and three-digit number arrangements', 'pair and team selection counting'],
      starter: ['Ask "does order matter?" first — this single question determines your entire method.', 'Product rule: multiply choices at each stage for independent decisions.', 'For pairs: list carefully and use n(n−1)/2 as a fast check.'],
      watchouts: ['forgetting that AB and BA are the same pair when order does not matter', 'using the product rule when repetition is not allowed without adjusting the count', 'missing branches in a tree because the listing was not systematic'],
      related: ['maths-patterns-algebra', 'maths-optimisation-constraints']
    },
    'maths-optimisation-constraints': {
      file: 'selective-maths-optimisation-constraints.html',
      domain: 'maths',
      title: 'Optimisation & Constraint Logic',
      subtitle: 'Find the best answer that still follows all the rules',
      intro: 'Imagine you have $20 and need to buy as many snacks as possible without going over budget. You must compare prices, work within a rule (the $20 limit), and then pick the best option. That is optimisation under constraints in one sentence. Selective questions love this topic because it combines arithmetic, reading carefully, and logical thinking. The two-step habit is everything: (1) check the rules first, (2) then find the best among those that pass.',
      lesson: {
        theory: [
          {
            title: 'Step 1 — Know exactly what you are optimising',
            text: 'Before you touch any numbers, identify the target. Is the question asking for the CHEAPEST option, the HIGHEST score, the MOST items, the SHORTEST time, or the SMALLEST number? Write it down. Students who jump straight into calculating often solve for the wrong thing and lose easy marks. Look for words like: minimum, maximum, least, most, best, cheapest, fastest, largest, smallest.',
            visual: 'strategy-map'
          },
          {
            title: 'Step 2 — List the constraints (rules that must be followed)',
            text: 'Constraints are the MUST conditions. An option that breaks even one rule is invalid and should be crossed out immediately, no matter how good it looks otherwise. Common constraints: budget limit ("must not exceed $30"), minimum requirement ("must score at least 70"), time window ("must arrive before 9 am"), divisibility ("must be divisible by 4"). Write each constraint on a separate line so none get forgotten.',
            visual: 'rule-board'
          },
          {
            title: 'Step 3 — Compare only the valid candidates',
            text: 'Once you have crossed out every option that breaks a rule, look only at what remains. Among those valid options, pick the one that best meets the target. Two powerful tools: (1) Unit price comparison — convert everything to "cost per item" before comparing deals. (2) Total target method — for average questions, use total needed = mean x count, then subtract what you have to find the missing value.',
            visual: 'check-fit'
          }
        ],
        guidance: [
          'Write the goal on one line: "Find the CHEAPEST / MAXIMUM / SHORTEST..."',
          'List every constraint separately and check each answer against all of them.',
          'For best-value comparisons: find the cost per single item before comparing packs.',
          'For LCM (overlapping schedules): list multiples of both numbers and find the first match.',
          'For average targets: total needed = mean x count, then subtract what you already know.'
        ],
        visuals: [
          { type: 'strategy-map' },
          { type: 'rule-board' },
          { type: 'check-fit' }
        ],
        exampleVisuals: ['strategy-map', 'check-fit', 'rule-board', 'strategy-map', 'check-fit'],
        examples: [
          {
            label: 'Example 1 -- Best-value comparison',
            prompt: 'Shop A sells pens at 3 for $5.40. Shop B sells pens at $1.90 each. You need 6 pens. Which shop is cheaper?',
            options: ['Shop A ($10.80 total)', 'Shop B ($11.40 total)', 'Both the same', 'Not enough information'],
            answerIndex: 0,
            steps: ['Shop A: 1 pen costs $5.40 / 3 = $1.80 each. For 6 pens: 6 x $1.80 = $10.80.', 'Shop B: 1 pen costs $1.90 each. For 6 pens: 6 x $1.90 = $11.40.', 'Shop A is $0.60 cheaper for 6 pens.'],
            note: 'ALWAYS find the unit price (cost per item) before comparing deals. Never compare pack prices directly.'
          },
          {
            label: 'Example 2 -- Minimum score needed',
            prompt: 'Mia scored 74 and 82 in her first two tests. She wants an average of at least 80 across 3 tests. What is the minimum score she needs in the third test?',
            options: ['84', '80', '78', '86'],
            answerIndex: 0,
            steps: ['Total needed = mean x count = 80 x 3 = 240.', 'Current total = 74 + 82 = 156.', 'Minimum third score = 240 - 156 = 84.'],
            note: 'The total target trick: total = mean x count. Then subtract what you have. This works every time.'
          },
          {
            label: 'Example 3 -- Overlapping schedules (LCM)',
            prompt: 'Bus A leaves every 6 minutes. Bus B leaves every 9 minutes. Both leave at 8:00 am together. When is the next time both leave at the same time?',
            options: ['8:18 am', '8:15 am', '8:24 am', '8:30 am'],
            answerIndex: 0,
            steps: ['Find the LCM of 6 and 9.', 'Multiples of 6: 6, 12, 18, 24...', 'Multiples of 9: 9, 18, 27...', 'First match = 18. Both leave again 18 minutes after 8:00 am = 8:18 am.'],
            note: 'LCM finds the first time two cycles overlap. Write out the multiples of both numbers and find the smallest one they share.'
          },
          {
            label: 'Example 4 -- Constraint filtering (budget + quantity)',
            prompt: 'Stickers cost $3 each. Max has $20. He must buy at least 5 stickers. What is the maximum number he can buy within budget?',
            options: ['6', '5', '7', '4'],
            answerIndex: 0,
            steps: ['Constraint: must spend $20 or less.', 'Constraint: must buy at least 5.', '$3 x 6 = $18 (fits the budget).', '$3 x 7 = $21 (over $20 -- cross it out).', 'Maximum valid purchase = 6 stickers.'],
            note: 'Always check BOTH constraints: the upper limit (budget) AND the lower limit (minimum 5). Both must be satisfied.'
          },
          {
            label: 'Example 5 -- Largest valid number under a rule',
            prompt: 'What is the largest two-digit multiple of 7 that is less than 90?',
            options: ['84', '91', '77', '70'],
            answerIndex: 0,
            steps: ['List multiples of 7 near 90: 7 x 13 = 91 (too big), 7 x 12 = 84 (fits!).', '84 is less than 90 and is a two-digit number.'],
            note: 'For "largest number under X" questions: work downward from X, testing each candidate against the rule.'
          }
        ],
        questions: [
          { q: 'Shop A: 4 for $10. Shop B: $2.60 each. Which is cheaper per item?', options: ['Shop A ($2.50 each)', 'Shop B ($2.60 each)', 'Same price', 'Not enough info'], answerIndex: 0, note: '$10 / 4 = $2.50 vs $2.60. Shop A wins.' },
          { q: 'Three test scores have a target mean of 75. Two scores are 68 and 80. What is the minimum third score?', options: ['77', '75', '72', '80'], answerIndex: 0, note: 'Total needed = 225. 68 + 80 = 148. Third = 225 - 148 = 77.' },
          { q: 'Trains leave every 8 min and every 12 min. Both leave at 7:00 am. When do they next leave together?', options: ['7:24 am', '7:20 am', '7:30 am', '7:16 am'], answerIndex: 0, note: 'LCM of 8 and 12 = 24. Next together at 7:24 am.' },
          { q: 'What is the smallest number greater than 50 divisible by both 3 and 4?', options: ['60', '48', '54', '72'], answerIndex: 0, note: 'LCM of 3 and 4 = 12. Multiples of 12 above 50: 60.' },
          { q: 'A budget of $15. Items cost $4 each. Maximum items within budget?', options: ['3', '4', '2', '5'], answerIndex: 0, note: '4 x 3 = $12. 4 x 4 = $16 -- over. Max = 3.' },
          { q: 'Largest two-digit multiple of 9 less than 95?', options: ['90', '81', '99', '72'], answerIndex: 0, note: '9 x 11 = 99 (too big). 9 x 10 = 90. 90 < 95, so 90 is correct.' },
          { q: 'A goal: average 80 across 4 tests. Three scores are 75, 85, 78. What is the minimum fourth score?', options: ['82', '80', '78', '84'], answerIndex: 0, note: 'Total needed = 320. 75+85+78 = 238. Fourth = 320 - 238 = 82.' },
          { q: 'Which pack is better value: 5 pencils for $4, or 8 pencils for $6?', options: ['8 for $6 (75 cents each)', '5 for $4 (80 cents each)', 'Same value', 'Cannot compare'], answerIndex: 0, note: '$4/5 = 80c each. $6/8 = 75c each. Bigger pack is cheaper per item.' },
          { q: 'Lights flash every 4 and 6 seconds. Both flash at second 0. When do they next flash together?', options: ['12 seconds', '10 seconds', '8 seconds', '24 seconds'], answerIndex: 0, note: 'LCM of 4 and 6 = 12.' },
          { q: 'A student needs at least 60% to pass. A test is out of 40. What is the minimum marks needed?', options: ['24', '20', '28', '30'], answerIndex: 0, note: '60% of 40 = 0.6 x 40 = 24.' },
          { q: 'What does the word "minimum" tell you in an optimisation question?', options: ['Find the smallest valid answer', 'Find the largest answer', 'Ignore all constraints', 'Add all values together'], answerIndex: 0, note: 'Minimum = smallest. Maximum = largest.' },
          { q: 'Which step must come FIRST when solving an optimisation question?', options: ['Identify what you are trying to minimise or maximise', 'Calculate all possible values', 'Pick the biggest number', 'Write a list of decimals'], answerIndex: 0, note: 'Always know the goal before any arithmetic.' },
          { q: 'Shop A sells juice 2 for $3. Shop B sells juice 3 for $4. For 6 juices, which is cheaper?', options: ['Shop B ($8)', 'Shop A ($9)', 'Same', 'Shop B ($6)'], answerIndex: 0, note: 'Shop A: 3 packs x $3 = $9. Shop B: 2 packs x $4 = $8. Shop B wins.' },
          { q: 'Smallest number above 40 that is divisible by both 5 and 6?', options: ['60', '30', '50', '45'], answerIndex: 0, note: 'LCM of 5 and 6 = 30. Multiples of 30 above 40: 60.' }
        ]
      },
      skills: [
        ['Goal Identification', 'Spot the optimisation target (cheapest, largest, minimum, fastest) before calculating.'],
        ['Constraint Checking', 'Test every candidate against all rules and discard any that fail even one.'],
        ['Structured Comparison', 'Use unit prices, LCM, and total-target methods to compare efficiently.']
      ],
      questionTypes: ['best-value purchase comparisons', 'minimum required score/value from known mean', 'first-overlap LCM schedule problems', 'largest/smallest number under constraints'],
      starter: ['Write the goal in one line: minimum / maximum / cheapest / fastest.', 'List constraints and cross out invalid options before comparing.', 'Use total = mean x count to find a missing value in average questions.'],
      watchouts: ['comparing pack prices directly without finding the unit price first', 'forgetting one constraint and choosing an invalid answer', 'confusing LCM with HCF (LCM for overlap, HCF for splitting equally)'],
      related: ['maths-counting-combinatorics', 'maths-time-systems']
    },
  });
})();
