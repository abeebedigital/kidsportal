(function(){
  const TOPICS = {
    "numeracy-place-value-recognising": {
      domain:"Numeracy", emoji:"🏯", accent:"#e65100", accentLight:"#fff3e0",
      title:"Place Value Detectives",
      subtitle:"Recognising 1s, 10s, 100s, and 1,000s",
      guide:"Numi the Number Ninja",
      tagline:"Learn what each digit is worth by its position.",
      intro:["A digit can change value depending on where it stands in a number.","In 4,582 the 4 means 4,000, not 4.","Strong mathematicians read ones, tens, hundreds, and thousands quickly."],
      facts:["Ones are single units.","Tens are groups of 10.","Hundreds are groups of 100.","Thousands are groups of 1,000."],
      lessons:[
        {title:"The Place Value House",body:["Every digit lives in a room.","From right to left: ones, tens, hundreds, thousands.","The room tells the digit's value."],facts:["2 in ones = 2","2 in tens = 20","2 in hundreds = 200","2 in thousands = 2,000"],check:{q:"What is the value of 5 in 3,561?",opts:["5","50","500","5,000"],ans:2}},
        {title:"Read the Number",body:["Look at 6,203.","The 6 means 6,000. The 2 means 200. The 0 means no tens. The 3 means 3.","Zero matters because it keeps the places in order."],facts:["6,203 = 6 thousands, 2 hundreds, 0 tens, 3 ones"],check:{q:"What is the value of 8 in 8,041?",opts:["8","80","800","8,000"],ans:3}},
        {title:"Spotting Value Fast",body:["Start from the left for large values and the right for small values.","Ask: what place is the digit in?","Then say the value, not just the digit."],facts:["9 in 9,400 = 9,000","4 in 9,400 = 400"],check:{q:"In 7,364, the 3 is worth...",opts:["3","30","300","3,000"],ans:2}}
      ],
      review:["A digit's position changes its value.","Thousands are bigger than hundreds, tens, and ones.","Zero can hold a place.","Say the value, not just the digit."],
      quiz:[
        {q:"What is the value of 6 in 2,685?",opts:["6","60","600","6,000"],ans:2},
        {q:"Which digit is in the thousands place in 4,213?",opts:["4","2","1","3"],ans:0},
        {q:"What is the value of 9 in 9,041?",opts:["9","90","900","9,000"],ans:3},
        {q:"In 5,870, the 7 is worth...",opts:["7","70","700","7,000"],ans:1}
      ],
      cert:"Place Value Detectives Certificate"
    },
    "numeracy-place-value-expanding": {
      domain:"Numeracy", emoji:"🧩", accent:"#e65100", accentLight:"#fff3e0",
      title:"Expanded Form Builders", subtitle:"Breaking numbers into parts", guide:"Numi the Number Ninja",
      tagline:"See whole numbers as the sum of thousands, hundreds, tens, and ones.",
      intro:["Expanded form breaks a number into place-value parts.","432 becomes 400 + 30 + 2.","This helps you understand what a number is made of."],
      facts:["4,306 = 4,000 + 300 + 6","7,520 = 7,000 + 500 + 20"],
      lessons:[
        {title:"Split the Number",body:["Write one part for each place.","Leave out places with zero if needed.","That shows the value clearly."],facts:["5,682 = 5,000 + 600 + 80 + 2"],check:{q:"Which is the expanded form of 3,214?",opts:["3,000 + 200 + 10 + 4","300 + 20 + 10 + 4","3,000 + 21 + 4","3 + 2 + 1 + 4"],ans:0}},
        {title:"Zero Can Hide",body:["Some places have zero.","In 8,040 there are no hundreds.","So the expanded form is 8,000 + 40."],facts:["8,040 does not need a hundreds part."],check:{q:"8,040 in expanded form is...",opts:["8,000 + 400","8,000 + 40","800 + 40","8,040 + 0"],ans:1}},
        {title:"Build It Back Up",body:["Expanded form also works in reverse.","4,000 + 200 + 30 + 9 becomes 4,239.","This helps in puzzle questions."],facts:["9,000 + 60 + 1 = 9,061"],check:{q:"What number is 6,000 + 500 + 70 + 2?",opts:["6,572","6,752","6,5072","657.2"],ans:0}}
      ],
      review:["Expanded form shows each place value part.","Zero places can be left out.","You can split a number or build it back up.","Thousands, hundreds, tens, ones stay in order."],
      quiz:[
        {q:"Which expanded form matches 4,509?",opts:["4,000 + 500 + 9","4,000 + 50 + 9","400 + 500 + 9","4,000 + 509 + 0"],ans:0},
        {q:"What number is 7,000 + 300 + 20 + 5?",opts:["7,325","7,235","7,3025","732.5"],ans:0},
        {q:"Which expanded form is correct for 9,031?",opts:["9,000 + 30 + 1","9,000 + 300 + 1","900 + 30 + 1","9,000 + 31 + 0"],ans:0},
        {q:"3,408 is...",opts:["3,000 + 400 + 8","3,000 + 40 + 8","300 + 400 + 8","3,408 + 0"],ans:0}
      ],
      cert:"Expanded Form Builders Certificate"
    },
    "numeracy-place-value-comparing": {
      domain:"Numeracy", emoji:"🐊", accent:"#e65100", accentLight:"#fff3e0",
      title:"Number Comparison Champions", subtitle:"Comparing and ordering 4-digit numbers", guide:"Numi the Number Ninja",
      tagline:"Use <, >, and = to compare and order numbers with confidence.",
      intro:["Compare from the biggest place first.","Thousands matter more than hundreds, tens, and ones.","Ordering numbers means comparing again and again."],
      facts:["4,582 > 4,529","3,105 < 3,150","2,400 = 2,400"],
      lessons:[
        {title:"Start on the Left",body:["First compare the thousands.","If they match, compare the hundreds.","Then tens, then ones."],facts:["4,582 > 4,529 because 8 tens is bigger than 2 tens"],check:{q:"Which is greater?",opts:["4,203","4,230","They are equal","Not enough information"],ans:1}},
        {title:"Hungry Crocodile Symbols",body:["The crocodile mouth opens to the bigger number.","< means less than. > means greater than.","= means exactly equal."],facts:["5,001 > 4,999","2,340 < 2,430"],check:{q:"Choose the correct symbol: 3,450 __ 3,405",opts:["<",">","=","?"],ans:1}},
        {title:"Order from Smallest to Largest",body:["Find the smallest first.","Then compare the remaining numbers.","Check the order one last time."],facts:["2,105, 2,145, 2,451"],check:{q:"Which list is ordered correctly?",opts:["2,430, 2,403, 2,340","2,340, 2,403, 2,430","2,403, 2,340, 2,430","2,430, 2,340, 2,403"],ans:1}}
      ],
      review:["Compare thousands first.","Use crocodile symbols correctly.","Ordering means repeated comparison.","Always re-check from left to right."],
      quiz:[
        {q:"Which is the greatest?",opts:["5,089","5,809","5,098","5,780"],ans:1},
        {q:"Choose the correct sign: 4,321 __ 4,312",opts:["<",">","=","~"],ans:1},
        {q:"Which list goes smallest to largest?",opts:["6,230, 6,203, 6,320","6,203, 6,230, 6,320","6,320, 6,230, 6,203","6,230, 6,320, 6,203"],ans:1},
        {q:"Which statement is true?",opts:["3,999 > 4,001","7,105 < 7,015","2,600 = 2,600","8,101 < 8,011"],ans:2}
      ],
      cert:"Number Comparison Champions Certificate"
    },
    "numeracy-addition-strategies": {
      domain:"Numeracy", emoji:"➕", accent:"#e65100", accentLight:"#fff3e0",
      title:"Addition Strategy Heroes", subtitle:"Mental addition shortcuts", guide:"Numi the Number Ninja",
      tagline:"Use smart shortcuts like bridging to 10 and splitting numbers.",
      intro:["Addition can be quick when you use a strategy.","Strong mathematicians choose a method that fits the numbers.","Bridging to 10 is one of the best Year 3 and 4 tricks."],
      facts:["48 + 35 = 48 + 30 + 5","56 + 29 = 56 + 30 - 1"],
      lessons:[
        {title:"Bridge to 10",body:["Use a small jump to make a friendly number.","For 8 + 7, move 2 from 7 to 8.","Then 10 + 5 = 15."],facts:["Bridge to 10 makes mental maths easier."],check:{q:"Use bridging: 9 + 6 =",opts:["14","15","16","13"],ans:1}},
        {title:"Split the Addends",body:["Break numbers into tens and ones.","46 + 37 becomes 40 + 30 and 6 + 7.","Then combine the parts."],facts:["46 + 37 = 70 + 13 = 83"],check:{q:"53 + 26 =",opts:["69","79","89","78"],ans:1}},
        {title:"Compensation",body:["Round one number, add, then adjust.","56 + 29 becomes 56 + 30 - 1.","This is fast for numbers near a ten."],facts:["Compensation uses a friendly number first."],check:{q:"67 + 19 =",opts:["85","86","87","88"],ans:1}}
      ],
      review:["Bridge to 10 with small numbers.","Split tens and ones.","Compensation helps with 9, 19, 29, and similar numbers.","Choose the quickest safe strategy."],
      quiz:[
        {q:"Bridge to 10: 8 + 5 =",opts:["12","13","14","15"],ans:1},
        {q:"53 + 29 =",opts:["72","82","92","78"],ans:1},
        {q:"46 + 37 =",opts:["73","83","93","84"],ans:1},
        {q:"67 + 19 =",opts:["85","86","87","88"],ans:1}
      ],
      cert:"Addition Strategy Heroes Certificate"
    },
    "numeracy-subtraction-renaming": {
      domain:"Numeracy", emoji:"➖", accent:"#e65100", accentLight:"#fff3e0",
      title:"Subtraction Renaming Rangers", subtitle:"Trading and renaming", guide:"Numi the Number Ninja",
      tagline:"Learn how borrowing works when the top digit is too small.",
      intro:["Sometimes you cannot subtract a bigger ones digit from a smaller ones digit.","Then you rename a ten as 10 ones.","This is also called trading or borrowing."],
      facts:["52 - 38 uses renaming.","5 tens becomes 4 tens and 12 ones."],
      lessons:[
        {title:"Why Rename?",body:["In 52 - 38, you cannot do 2 - 8.","So take 1 ten from the tens place.","Now you have 12 ones and 4 tens."],facts:["52 becomes 4 tens and 12 ones"],check:{q:"In 62 - 27, 62 becomes...",opts:["5 tens and 12 ones","6 tens and 12 ones","4 tens and 22 ones","5 tens and 2 ones"],ans:0}},
        {title:"Subtract the Ones",body:["After renaming, subtract the ones first.","12 - 8 = 4.","Then subtract the tens."],facts:["52 - 38 = 14"],check:{q:"After renaming in 52 - 38, what is 12 - 8?",opts:["2","3","4","5"],ans:2}},
        {title:"Subtract the Tens",body:["Use the new tens amount, not the old one.","In 52 - 38, 4 tens - 3 tens = 1 ten.","So the answer is 14."],facts:["Always use the renamed number."],check:{q:"52 - 38 =",opts:["12","14","24","16"],ans:1}}
      ],
      review:["Rename when the top digit is too small.","Trade 1 ten for 10 ones.","Subtract ones, then tens.","Use the new digits after renaming."],
      quiz:[
        {q:"Which subtraction needs renaming?",opts:["43 - 21","62 - 40","51 - 28","70 - 30"],ans:2},
        {q:"In 41 - 26, 41 becomes...",opts:["3 tens and 11 ones","4 tens and 11 ones","2 tens and 21 ones","3 tens and 1 one"],ans:0},
        {q:"72 - 38 =",opts:["44","34","46","42"],ans:1},
        {q:"64 - 27 =",opts:["37","47","27","43"],ans:0}
      ],
      cert:"Subtraction Renaming Rangers Certificate"
    },
    "numeracy-multiplication-arrays": {
      domain:"Numeracy", emoji:"✖️", accent:"#e65100", accentLight:"#fff3e0",
      title:"Array Multiplication Masters", subtitle:"Multiplication as arrays and groups", guide:"Numi the Number Ninja",
      tagline:"See multiplication as equal rows and repeated addition.",
      intro:["Multiplication means equal groups.","An array shows rows and columns.","Arrays help you see repeated addition clearly."],
      facts:["3 rows of 5 = 15","4 groups of 2 = 8"],
      lessons:[
        {title:"Equal Groups",body:["3 x 5 means 3 groups of 5.","That is 5 + 5 + 5.","The total is 15."],facts:["Multiplication is faster than repeated addition."],check:{q:"3 groups of 4 =",opts:["7","10","12","14"],ans:2}},
        {title:"Rows and Columns",body:["An array can show the groups.","3 rows of 5 dots is the same as 3 x 5.","You can count rows or columns."],facts:["3 x 5 and 5 x 3 give the same total"],check:{q:"4 rows of 3 dots =",opts:["7","10","12","14"],ans:2}},
        {title:"Turn Arrays into Facts",body:["Look at the rows and how many are in each row.","Then write a multiplication sentence.","Arrays help you know what the numbers mean."],facts:["Rows x dots in each row = total"],check:{q:"2 rows of 8 =",opts:["10","12","14","16"],ans:3}}
      ],
      review:["Multiplication means equal groups.","Arrays show rows and columns.","Rows x amount in each row = total.","The order can swap but the total stays the same."],
      quiz:[
        {q:"3 x 6 =",opts:["9","12","18","24"],ans:2},
        {q:"Which array matches 4 x 2?",opts:["4 rows of 2","2 rows of 6","3 rows of 4","1 row of 8"],ans:0},
        {q:"5 groups of 3 =",opts:["8","12","15","18"],ans:2},
        {q:"2 rows of 7 dots =",opts:["9","12","14","16"],ans:2}
      ],
      cert:"Array Multiplication Masters Certificate"
    },
    "numeracy-division-sharing": {
      domain:"Numeracy", emoji:"➗", accent:"#e65100", accentLight:"#fff3e0",
      title:"Division Sharing Stars", subtitle:"Division as sharing and grouping", guide:"Numi the Number Ninja",
      tagline:"Split totals into equal parts or find equal groups.",
      intro:["Division can mean sharing equally or making equal groups.","Both ideas help in challenge problems.","Times tables help you solve division faster."],
      facts:["12 ÷ 3 = 4","24 ÷ 6 = 4"],
      lessons:[
        {title:"Sharing Equally",body:["12 ÷ 3 can mean share 12 among 3 people.","Each person gets 4.","That is equal sharing."],facts:["Equal means fair and same amount"],check:{q:"18 ÷ 3 =",opts:["5","6","7","8"],ans:1}},
        {title:"Grouping",body:["12 ÷ 3 can also mean how many groups of 3 fit into 12.","The answer is still 4.","Same numbers, different story."],facts:["Grouping asks how many groups"],check:{q:"20 ÷ 5 =",opts:["2","3","4","5"],ans:2}},
        {title:"Use Multiplication Backwards",body:["Think 6 x ? = 24.","If 6 x 4 = 24, then 24 ÷ 6 = 4.","This is the fastest method for many questions."],facts:["Division is reverse multiplication"],check:{q:"35 ÷ 7 =",opts:["4","5","6","7"],ans:1}}
      ],
      review:["Division means sharing or grouping.","Equal groups are important.","Use times tables backwards.","Check that the answer makes sense."],
      quiz:[
        {q:"15 ÷ 3 =",opts:["4","5","6","7"],ans:1},
        {q:"24 ÷ 6 =",opts:["3","4","5","6"],ans:1},
        {q:"How many groups of 4 in 20?",opts:["4","5","6","7"],ans:1},
        {q:"Share 16 equally between 4 children.",opts:["2","3","4","5"],ans:2}
      ],
      cert:"Division Sharing Stars Certificate"
    },
    "numeracy-unit-fractions": {
      domain:"Numeracy", emoji:"🍕", accent:"#00897b", accentLight:"#e0f7f4",
      title:"Unit Fraction Explorers", subtitle:"1/2, 1/4, and 1/8 on a number line", guide:"Miko the Market Ninja",
      tagline:"See where common unit fractions belong between 0 and 1.",
      intro:["Unit fractions have 1 on the top.","The bottom number tells how many equal parts the whole is cut into.","Number lines help compare the size of fractions."],
      facts:["1/2 is halfway.","1/4 is smaller than 1/2.","1/8 is smaller than 1/4."],
      lessons:[
        {title:"Equal Parts First",body:["Fractions must show equal parts.","1/4 means 1 out of 4 equal parts.","If the parts are not equal, the picture is wrong."],facts:["Equal parts matter more than the shape"],check:{q:"Which is a unit fraction?",opts:["2/4","1/3","3/3","4/1"],ans:1}},
        {title:"Number Line Positions",body:["1/2 goes in the middle between 0 and 1.","1/4 goes halfway between 0 and 1/2.","1/8 sits closer to 0."],facts:["Fractions farther right are bigger"],check:{q:"Which fraction is in the middle?",opts:["1/8","1/4","1/2","1"],ans:2}},
        {title:"Order the Fractions",body:["From smallest to largest: 1/8, 1/4, 1/2.","A bigger denominator makes smaller pieces for unit fractions.","That is why 1/8 is smallest."],facts:["Unit fractions shrink as the bottom number grows"],check:{q:"Which is the smallest?",opts:["1/2","1/4","1/8","All the same"],ans:2}}
      ],
      review:["Unit fractions have 1 on top.","Fractions need equal parts.","1/8 < 1/4 < 1/2.","Number lines show size clearly."],
      quiz:[
        {q:"Which is the biggest?",opts:["1/8","1/4","1/2","All the same"],ans:2},
        {q:"Where does 1/4 go?",opts:["At 0","Between 0 and 1/2","Past 1","Exactly at 1"],ans:1},
        {q:"Which list is smallest to largest?",opts:["1/2, 1/4, 1/8","1/8, 1/4, 1/2","1/4, 1/8, 1/2","1/4, 1/2, 1/8"],ans:1},
        {q:"A unit fraction always has...",opts:["1 on the top","1 on the bottom","two equal numerators","a zero"],ans:0}
      ],
      cert:"Unit Fraction Explorers Certificate"
    },
    "numeracy-money-change": {
      domain:"Numeracy", emoji:"💰", accent:"#00897b", accentLight:"#e0f7f4",
      title:"Money Change Champions", subtitle:"Calculating change", guide:"Miko the Market Ninja",
      tagline:"Use subtraction or count-up strategies to find change in dollars and cents.",
      intro:["Change is the money you get back after paying.","Change = amount paid minus cost.","Count-up is a very helpful shop strategy."],
      facts:["$5.00 - $3.40 = $1.60","100 cents = $1"],
      lessons:[
        {title:"Subtract to Find Change",body:["Write the amount paid first.","Then subtract the cost.","Check that the answer is smaller than the amount paid."],facts:["Paid - cost = change"],check:{q:"$5.00 - $2.80 =",opts:["$2.20","$2.30","$1.20","$3.20"],ans:0}},
        {title:"Count Up Strategy",body:["Start at the cost and count up to the paid amount.","Go to the next 10 cents, then next dollar.","Add the jumps."],facts:["$3.65 to $5.00 is 5c + 30c + $1.00 = $1.35"],check:{q:"$4.75 to $5.00 =",opts:["25c","35c","45c","50c"],ans:0}},
        {title:"Write Money Carefully",body:["Use two digits for cents.","$2.20 is clearer than $2.2.","Reasonableness checks catch silly mistakes."],facts:["Money uses dollars and cents together"],check:{q:"Which is written correctly?",opts:["$3.4","$3.40","3.40$","$3,40"],ans:1}}
      ],
      review:["Change means paid minus cost.","Count-up is useful in shops.","Write two digits for cents.","Check that your answer makes sense."],
      quiz:[
        {q:"A toy costs $7.50. You pay $10.00. Change?",opts:["$1.50","$2.50","$3.50","$4.50"],ans:1},
        {q:"$2.80 paid from $5.00 leaves...",opts:["$2.20","$2.30","$1.20","$3.20"],ans:0},
        {q:"Which subtraction finds the change?",opts:["cost - paid","paid - cost","cost + paid","paid + cost"],ans:1},
        {q:"How many cents are in $1?",opts:["10","50","100","1000"],ans:2}
      ],
      cert:"Money Change Champions Certificate"
    },
    "reading-text-features": {
      domain:"Reading", emoji:"🏷️", accent:"#1a237e", accentLight:"#e8eaf6",
      title:"Text Feature Trackers", subtitle:"Headings, captions, and diagrams", guide:"Lexie the Bookworm",
      tagline:"Learn how non-fiction text features help readers find meaning.",
      intro:["Text features give clues before you read every word.","Headings organise ideas.","Captions and diagrams add extra information."],
      facts:["Headings name sections.","Captions explain pictures.","Diagrams show parts visually."],
      lessons:[
        {title:"Headings",body:["Headings tell what a section is about.","They help you scan for the right information.","Good readers use headings to predict the topic."],facts:["A heading like 'Habitat' suggests where an animal lives"],check:{q:"A heading usually tells...",opts:["the writer's age","the section topic","the page number only","the font size"],ans:1}},
        {title:"Captions",body:["Captions sit near pictures.","They explain what the picture shows.","Sometimes the caption gives facts not in the paragraph."],facts:["Pictures and captions work together"],check:{q:"A caption helps you...",opts:["ignore the picture","understand the picture","write a story ending","find speech marks"],ans:1}},
        {title:"Diagrams and Labels",body:["Diagrams show parts clearly.","Labels name those parts.","This makes tricky information easier to understand."],facts:["Diagrams reduce reading load"],check:{q:"Labels on a diagram usually...",opts:["name parts","show dialogue","tell a joke","replace the title"],ans:0}}
      ],
      review:["Headings organise ideas.","Captions explain visuals.","Diagrams and labels support understanding.","Text features help readers scan and learn."],
      quiz:[
        {q:"Which text feature names a section?",opts:["caption","heading","diagram","speech mark"],ans:1},
        {q:"A caption is used to...",opts:["start a paragraph","explain an image","show a title page","order events"],ans:1},
        {q:"Labels are most common on...",opts:["dialogue bubbles","diagrams","poems","jokes"],ans:1},
        {q:"Text features are especially useful in...",opts:["reports","only fairy tales","songs only","riddles only"],ans:0}
      ],
      cert:"Text Feature Trackers Certificate"
    },
    "reading-main-purpose": {
      domain:"Reading", emoji:"🎯", accent:"#1a237e", accentLight:"#e8eaf6",
      title:"Author Purpose Detectives", subtitle:"Identifying the main purpose", guide:"Lexie the Bookworm",
      tagline:"Work out whether a text wants to teach, persuade, or tell a story.",
      intro:["Writers write for a reason.","Some texts inform, some persuade, and some entertain.","Readers should always ask: what is the writer trying to do?"],
      facts:["Inform = teach facts","Persuade = change your mind","Entertain = tell a story or amuse"],
      lessons:[
        {title:"Texts That Inform",body:["Reports, explanations, and fact files often inform.","They give facts, headings, and clear information.","The purpose is to teach."],facts:["Informative texts answer questions like what, where, when, and how"],check:{q:"A report about koalas mostly tries to...",opts:["persuade","inform","entertain with fantasy","give a shopping list"],ans:1}},
        {title:"Texts That Persuade",body:["Persuasive texts try to convince you.","They use opinions, reasons, and strong words.","Advertisements often persuade."],facts:["Persuasive texts want you to think or do something"],check:{q:"A poster saying 'Save Water Today!' is mainly trying to...",opts:["inform only","persuade","tell a story","describe a character"],ans:1}},
        {title:"Texts That Entertain",body:["Narratives are often written to entertain.","They use characters, settings, and events.","They may still teach something, but the main purpose is story."],facts:["Stories usually focus on events and characters"],check:{q:"A fairy tale is mainly written to...",opts:["measure length","entertain","show a timetable","explain a graph"],ans:1}}
      ],
      review:["Ask what the writer wants the reader to do or feel.","Inform teaches facts.","Persuade changes opinion or action.","Entertain tells a story or amuses."],
      quiz:[
        {q:"A recipe mainly aims to...",opts:["entertain","inform/instruct","persuade","describe a dragon"],ans:1},
        {q:"An ad for a new toy mainly aims to...",opts:["inform only","persuade","entertain with a long story","compare fractions"],ans:1},
        {q:"A short story about a puppy mainly aims to...",opts:["entertain","measure mass","show directions","list prices"],ans:0},
        {q:"The best question to ask is...",opts:["How many commas?","What is the writer trying to do?","Is the page blue?","How long is the title?"],ans:1}
      ],
      cert:"Author Purpose Detectives Certificate"
    },
    "grammar-parts-of-speech": {
      domain:"Conventions", emoji:"🧱", accent:"#2e7d32", accentLight:"#e8f5e9",
      title:"Parts of Speech Builders", subtitle:"Nouns, verbs, adjectives, and adverbs", guide:"Grammarly the Parrot",
      tagline:"Identify the building blocks that make sentences work.",
      intro:["Sentences are built from different kinds of words.","Nouns name things. Verbs show action. Adjectives describe nouns. Adverbs describe actions.","Knowing these helps reading and writing."],
      facts:["noun = cat","verb = run","adjective = fluffy","adverb = quickly"],
      lessons:[
        {title:"Nouns",body:["Nouns name people, places, things, or ideas.","Dog, school, and Emma are nouns.","They tell us who or what."],facts:["proper nouns need capitals"],check:{q:"Which word is a noun?",opts:["run","happy","school","quickly"],ans:2}},
        {title:"Verbs",body:["Verbs show actions or states.","Jump, think, and is are verbs.","They tell what is happening."],facts:["Every sentence needs a verb"],check:{q:"Which word is a verb?",opts:["blue","sing","garden","slowly"],ans:1}},
        {title:"Adjectives and Adverbs",body:["Adjectives describe nouns.","Adverbs often describe verbs and often end in -ly.","They add detail to sentences."],facts:["bright sun","ran quickly"],check:{q:"In 'The fast rabbit ran quickly', 'quickly' is a...",opts:["noun","verb","adjective","adverb"],ans:3}}
      ],
      review:["Nouns name.","Verbs do.","Adjectives describe nouns.","Adverbs describe actions or other words."],
      quiz:[
        {q:"Which word is an adjective?",opts:["quiet","whisper","teacher","softly"],ans:0},
        {q:"Which word is a noun?",opts:["jump","desk","slowly","shiny"],ans:1},
        {q:"Which word is a verb?",opts:["green","carefully","build","mountain"],ans:2},
        {q:"Which word is an adverb?",opts:["cloud","happy","skip","slowly"],ans:3}
      ],
      cert:"Parts of Speech Builders Certificate"
    },
    "grammar-tense-consistency": {
      domain:"Conventions", emoji:"⏰", accent:"#2e7d32", accentLight:"#e8f5e9",
      title:"Tense Consistency Timekeepers", subtitle:"Keeping verbs in the same tense", guide:"Grammarly the Parrot",
      tagline:"Check whether writing stays correctly in past or present tense.",
      intro:["Tense tells when something happens.","Good writing usually stays in the same tense unless there is a clear reason to change.","Readers get confused when tenses jump around."],
      facts:["past = walked","present = walk / is walking"],
      lessons:[
        {title:"Past Tense",body:["Past tense tells about things that already happened.","Walked, played, and went are past tense verbs.","Stories often use past tense."],facts:["Yesterday I played outside."],check:{q:"Which sentence is in past tense?",opts:["I play soccer.","I played soccer.","I will play soccer.","I am playing soccer."],ans:1}},
        {title:"Present Tense",body:["Present tense tells what happens now or usually happens.","Walk, runs, and is jumping can be present tense forms.","Instructions often use present tense."],facts:["The koala eats leaves."],check:{q:"Which sentence stays in present tense?",opts:["She walks to school and waved.","She walks to school and smiles.","She walked to school and smiles.","She walking to school."],ans:1}},
        {title:"Keep It Consistent",body:["Do not switch tense by mistake.","If a story starts in past tense, keep the verbs in past tense.","Edit by checking all the verbs."],facts:["He opened the gate and stepped inside."],check:{q:"Which sentence has a tense mistake?",opts:["Sam packed his bag and left.","Sam packs his bag and leaves.","Sam packed his bag and leaves.","Sam runs and jumps."],ans:2}}
      ],
      review:["Past tense = already happened.","Present tense = happening now or usually.","Check all verbs in the sentence.","Fix tense jumps when editing."],
      quiz:[
        {q:"Which sentence is consistent?",opts:["Mia jumped and lands.","Mia jumps and lands.","Mia jumped and landing.","Mia jumping and landed."],ans:1},
        {q:"Which verb is past tense?",opts:["runs","ran","running","will run"],ans:1},
        {q:"Find the tense mistake.",opts:["He cooked dinner and washed up.","He cooks dinner and washes up.","He cooked dinner and washes up.","He sings and dances."],ans:2},
        {q:"Stories are often written in...",opts:["mixed tense","past tense","maths tense","diagram tense"],ans:1}
      ],
      cert:"Tense Consistency Timekeepers Certificate"
    },
    "punctuation-sentence-boundaries": {
      domain:"Conventions", emoji:"🔠", accent:"#2e7d32", accentLight:"#e8f5e9",
      title:"Sentence Boundary Detectives", subtitle:"Capitals and full stops", guide:"Spelly the Wizard",
      tagline:"Mark exactly where one sentence ends and the next begins.",
      intro:["Sentences start with capitals and end with punctuation.","The most common ending mark is a full stop.","Readers rely on sentence boundaries to make sense of ideas."],
      facts:["Capital at the start.","Full stop at the end."],
      lessons:[
        {title:"Sentence Starts",body:["A new sentence begins with a capital letter.","Names also need capitals.","Capitals help readers see where ideas begin."],facts:["The dog barked."],check:{q:"Which sentence starts correctly?",opts:["the dog barked.","The dog barked.","the Dog barked.","dog barked."],ans:1}},
        {title:"Sentence Ends",body:["A statement usually ends with a full stop.","Questions use a question mark. Excited sentences may use an exclamation mark.","You must still show the sentence ending clearly."],facts:["I found a shell."],check:{q:"Which sentence ends correctly?",opts:["I found a shell","I found a shell.","I found a shell,","I found a shell:"],ans:1}},
        {title:"Fixing Boundary Errors",body:["Run-on writing pushes many ideas together.","Editing means deciding where one idea ends and the next begins.","Then add the capital and ending mark."],facts:["We ran outside. It started to rain."],check:{q:"Which version is correct?",opts:["we ran outside it started to rain","We ran outside. It started to rain.","We ran outside it started. to rain","We Ran outside it started to rain."],ans:1}}
      ],
      review:["Capitals start sentences.","Full stops end statements.","Questions and exclamations still need clear endings.","Fix run-on writing by splitting ideas."],
      quiz:[
        {q:"Which sentence is punctuated correctly?",opts:["the bird flew.","The bird flew.","The bird flew","the Bird flew."],ans:1},
        {q:"Which line has two sentences?",opts:["We packed our bags.","We packed our bags We left.","we packed our bags. We left","We packed our bags. We left."],ans:3},
        {q:"What usually ends a statement?",opts:["comma","full stop","dash","quote"],ans:1},
        {q:"Which needs a capital?",opts:["middle of a sentence","the start of a sentence","every word","only numbers"],ans:1}
      ],
      cert:"Sentence Boundary Detectives Certificate"
    },
    "punctuation-quotation-marks": {
      domain:"Conventions", emoji:"💬", accent:"#2e7d32", accentLight:"#e8f5e9",
      title:"Quotation Mark Detectives", subtitle:"Showing speech correctly", guide:"Spelly the Wizard",
      tagline:"Track who is speaking and where the spoken words begin and end.",
      intro:["Quotation marks show the exact words a speaker says.","They help readers know where speech begins and ends.","Punctuation around speech needs careful attention."],
      facts:['"Hello," said Mia.','New speaker = new line'],
      lessons:[
        {title:"Start and End Speech",body:["Put quotation marks around the spoken words.","The speech starts with an opening mark and ends with a closing mark.","This tells the reader exactly what was said."],facts:['"Come here," Dad called.'],check:{q:"Which part needs quotation marks?",opts:["the action","the spoken words","the noun only","the heading"],ans:1}},
        {title:"Comma and Full Stop Placement",body:["A comma often comes before a speech tag.","The punctuation usually goes inside the quotation marks in this style.","Read examples carefully."],facts:['"I found it," said Sam.'],check:{q:'Which is correct?',opts:['"Run!" shouted Mia.','"Run"! shouted Mia.','Run! shouted "Mia".','"Run" shouted! Mia.'],ans:0}},
        {title:"New Speaker, New Line",body:["When another person speaks, start a new line.","This keeps dialogue easy to follow.","It also helps readers track who is talking."],facts:["Speaker changes should be easy to see."],check:{q:"When a new character speaks, you should...",opts:["keep writing on the same line always","start a new line","remove the quotation marks","use brackets"],ans:1}}
      ],
      review:["Quotation marks wrap the spoken words.","Speech punctuation needs care.","Speech tags help identify the speaker.","New speaker means new line."],
      quiz:[
        {q:'Which sentence shows speech correctly?',opts:['"Stop," said Ben.','Stop," said Ben.','"Stop", said Ben.','"Stop said Ben."'],ans:0},
        {q:"Quotation marks are used for...",opts:["headings","speech","maths answers","captions only"],ans:1},
        {q:"When another speaker talks, start...",opts:["a new line","a new book","a diagram","a heading"],ans:0},
        {q:'Which is punctuated correctly?',opts:['"I can help," said Ava.','"I can help", said Ava.','I can help," said Ava.','"I can help said Ava."'],ans:0}
      ],
      cert:"Quotation Mark Detectives Certificate"
    },
    "spelling-error-identification": {
      domain:"Conventions", emoji:"🔎", accent:"#00695c", accentLight:"#e0f7fa",
      title:"Spelling Error Spotters", subtitle:"Finding and correcting misspelled words", guide:"Spelly the Wizard",
      tagline:"Spot the word that looks wrong and fix it accurately.",
      intro:["Some spelling challenge questions ask you to find the mistake in a sentence.","You need to notice what looks wrong and write the correct spelling.","Context can help you choose the right word."],
      facts:["mistake identified","proofreading matters"],
      lessons:[
        {title:"Look Carefully",body:["Read the whole sentence.","Sometimes the wrong word is obvious.","Other times you must compare it to words you already know."],facts:["The word shape can give clues."],check:{q:"Which word is misspelled?",opts:["garden","because","frend","yellow"],ans:2}},
        {title:"Use the Sentence Meaning",body:["Context helps you know what word should be there.","If the sentence is about school, 'techer' is likely 'teacher'.","Think about sound and meaning together."],facts:["Meaning and spelling work together."],check:{q:"The correct spelling of 'becaus' is...",opts:["becos","because","becuse","beecaus"],ans:1}},
        {title:"Proofread Slowly",body:["Fast readers can miss small errors.","Check beginnings, middles, and endings of words.","Many mistakes hide in tricky parts like vowel teams."],facts:["Read with your eyes and your brain."],check:{q:"Which is the correct spelling?",opts:["difrent","different","differant","diffrent"],ans:1}}
      ],
      review:["Read the whole sentence.","Find the word that looks wrong.","Use context and known patterns.","Write the correct spelling carefully."],
      quiz:[
        {q:"Which word is misspelled?",opts:["friend","school","beleive","window"],ans:2},
        {q:"The correct spelling is...",opts:["adress","address","adres","addres"],ans:1},
        {q:"Which sentence has a spelling mistake?",opts:["The cat slept.","We walked home.","My brther waved.","I like apples."],ans:2},
        {q:"Which is correct?",opts:["seperate","separate","seprate","seperete"],ans:1}
      ],
      cert:"Spelling Error Spotters Certificate"
    },
    "spelling-homophones": {
      domain:"Conventions", emoji:"🔤", accent:"#00695c", accentLight:"#e0f7fa",
      title:"Homophone Heroes", subtitle:"there, their, they're and more", guide:"Spelly the Wizard",
      tagline:"Choose the correct spelling by thinking about the sentence meaning.",
      intro:["Homophones sound the same but have different spellings and meanings.","You must use context to choose the right one.","This is a common spelling challenge skill."],
      facts:["there = place","their = belongs to them","they're = they are"],
      lessons:[
        {title:"There, Their, They're",body:["There tells a place.","Their shows belonging.","They're means they are."],facts:["Look for the meaning, not just the sound."],check:{q:"Choose the correct word: ____ bag is on the floor.",opts:["There","Their","They're","Thare"],ans:1}},
        {title:"To, Too, Two",body:["To is often part of an action or direction.","Too means also or very.","Two is the number 2."],facts:["We went to the park too with two friends."],check:{q:"Choose the correct word: I have ____ dogs.",opts:["to","too","two","tu"],ans:2}},
        {title:"Its and It's",body:["Its shows belonging.","It's means it is.","Apostrophes matter."],facts:["It's raining. The dog wagged its tail."],check:{q:"Choose the correct word: ____ time to go.",opts:["Its","It's","Its'","It"],ans:1}}
      ],
      review:["Homophones sound the same.","Meaning decides the spelling.","Check for clues in the sentence.","Apostrophes can change the meaning."],
      quiz:[
        {q:"Choose the correct word: ____ going home now.",opts:["Their","There","They're","Thair"],ans:2},
        {q:"Choose the correct word: Put the book over ____.",opts:["there","their","they're","thare"],ans:0},
        {q:"Choose the correct word: I want ____ pieces.",opts:["to","too","two","tu"],ans:2},
        {q:"Choose the correct word: The bird flapped ____ wings.",opts:["it's","its","it is","its'"],ans:1}
      ],
      cert:"Homophone Heroes Certificate"
    },
    "writing-character-setting": {
      domain:"Writing", emoji:"🎭", accent:"#7b1fa2", accentLight:"#f3e5f5",
      title:"Character & Setting Creators", subtitle:"Making readers see the story", guide:"Frankie the Story Fox",
      tagline:"Use descriptive details to build vivid characters and settings.",
      intro:["Narratives need people and places that feel real.","Writers use descriptive details to help readers picture the story.","A strong beginning often introduces character and setting clearly."],
      facts:["Who?","Where?","What is it like?"],
      lessons:[
        {title:"Build the Character",body:["Tell the reader what the character is like.","Use details about appearance, feelings, actions, and habits.","Choose a few strong details, not a huge list."],facts:["brave, shy, curious, muddy boots"],check:{q:"Which detail builds character best?",opts:["Sam was there.","Sam was a curious boy who asked endless questions.","Sam had words.","Sam existed."],ans:1}},
        {title:"Build the Setting",body:["Show where and when the story happens.","Use sensory details like sound, light, smell, and weather.","This helps the reader imagine the place."],facts:["misty forest","creaky hallway","hot afternoon"],check:{q:"Which detail shows setting best?",opts:["It was somewhere.","The alley smelled of rain and old bricks.","The story had a place.","The place was a place."],ans:1}},
        {title:"Blend Them Together",body:["The best openings connect character and setting.","A scared child in a dark cave feels different from the same child at a sunny beach.","Setting affects mood."],facts:["Character and setting work as a team."],check:{q:"Which opening is stronger?",opts:["Lia went outside.","Lia stepped onto the windy jetty, gripping her hat as waves slammed below.","Lia was somewhere outside.","Lia had a day."],ans:1}}
      ],
      review:["Describe who the character is.","Describe where the story happens.","Use sensory detail.","Let the setting affect the mood."],
      quiz:[
        {q:"Which phrase best builds character?",opts:["a person","a nervous boy chewing his sleeve","someone there","the person"],ans:1},
        {q:"Which phrase best builds setting?",opts:["in a place","inside a dusty library with cracked windows","at somewhere","there was a place"],ans:1},
        {q:"Good description helps the reader...",opts:["sleep","picture the story","count faster","skip the ending"],ans:1},
        {q:"Which is the best setting detail?",opts:["It was nice.","The cold wind rattled the tin roof.","It happened outside.","There was weather."],ans:1}
      ],
      cert:"Character & Setting Creators Certificate"
    },
    "writing-complication": {
      domain:"Writing", emoji:"🔥", accent:"#7b1fa2", accentLight:"#f3e5f5",
      title:"Complication Creators", subtitle:"Building the problem in a story", guide:"Frankie the Story Fox",
      tagline:"Create tension and excitement with a clear story problem.",
      intro:["A narrative needs a complication, or there is no real story.","The complication is the problem or challenge.","It creates tension and makes the reader want to know what happens next."],
      facts:["Problem","Tension","What could go wrong?"],
      lessons:[
        {title:"What Is a Complication?",body:["A complication is the moment something goes wrong or becomes difficult.","It should matter to the character.","It pushes the story forward."],facts:["lost map","storm arrives","secret discovered"],check:{q:"Which is a complication?",opts:["The sky was blue.","Mia lost the key to the gate.","The dog was a dog.","They ate breakfast."],ans:1}},
        {title:"Raise the Tension",body:["Add danger, urgency, fear, or mystery.","Make the reader worry about the outcome.","Tension keeps the reader interested."],facts:["footsteps behind her","the timer kept ticking"],check:{q:"Which sentence adds tension?",opts:["Tom walked home.","Tom heard footsteps behind him in the empty street.","Tom wore shoes.","Tom existed."],ans:1}},
        {title:"Link to the Character Goal",body:["The problem should block what the character wants.","If the character wants to win, escape, or find something, the complication gets in the way.","That makes the story feel connected."],facts:["Goal + obstacle = strong plot"],check:{q:"Which is strongest?",opts:["A random problem appears.","The bridge collapses just as Ava races to deliver the medicine.","Something happened.","There was an issue somewhere."],ans:1}}
      ],
      review:["A complication is the story problem.","It should matter to the character.","Tension makes readers care.","The problem should connect to the goal."],
      quiz:[
        {q:"Which sentence shows a complication?",opts:["The day was sunny.","The boat rope snapped and drifted away.","The water was wet.","They had lunch."],ans:1},
        {q:"Tension makes the reader want to...",opts:["stop reading","know what happens next","count commas","change fonts"],ans:1},
        {q:"A strong complication should...",opts:["be unrelated","block the character's goal","appear after the ending","avoid all emotion"],ans:1},
        {q:"Which adds urgency?",opts:["The bell might ring sometime.","The bell was about to ring and Zara still had not found her bag.","There was a bell.","Zara liked bags."],ans:1}
      ],
      cert:"Complication Creators Certificate"
    },
    "writing-persuasive-devices": {
      domain:"Writing", emoji:"📣", accent:"#7b1fa2", accentLight:"#f3e5f5",
      title:"Persuasive Device Detectives", subtitle:"Using strong words to sway readers", guide:"Grammarly the Parrot",
      tagline:"Use emotive and forceful language to make your opinion stronger.",
      intro:["Persuasive writing tries to convince the reader.","Persuasive devices include strong words, emotive language, and direct appeals.","These choices make arguments more powerful."],
      facts:["must","essential","unfair","cruel"],
      lessons:[
        {title:"Strong Opinion Words",body:["Words like must, should, and need show confidence.","They tell the reader the idea matters.","Weak language can sound unsure."],facts:["School should have more reading time."],check:{q:"Which sentence sounds more persuasive?",opts:["Cats are okay pets.","Cats are wonderful pets for families.","Cats exist.","Some people know cats."],ans:1}},
        {title:"Emotive Language",body:["Emotive words try to make the reader feel something.","Words like cruel, safe, exciting, and unfair can shape an opinion.","Use them honestly and carefully."],facts:["It is unfair to waste food."],check:{q:"Which word is most emotive?",opts:["object","item","cruel","thing"],ans:2}},
        {title:"Direct Appeals",body:["Sometimes writers speak straight to the reader.","Words like you and everyone can create connection.","Rhetorical questions can also help."],facts:["Do we really want a dirty playground?"],check:{q:"Which line directly appeals to the reader?",opts:["Playgrounds exist.","You deserve a clean and safe playground.","Some places are clean.","There was a playground."],ans:1}}
      ],
      review:["Strong opinion words show confidence.","Emotive language affects feelings.","Direct appeals involve the reader.","Persuasive devices should support the main opinion."],
      quiz:[
        {q:"Which word is most persuasive?",opts:["thing","must","maybe","item"],ans:1},
        {q:"Which sentence uses emotive language?",opts:["The rule exists.","The cruel rule hurts students.","The rule is a rule.","Some rule happened."],ans:1},
        {q:"Which directly appeals to the reader?",opts:["Readers read.","You can help save the library.","The library is a building.","Books are books."],ans:1},
        {q:"Persuasive devices help the writer...",opts:["confuse the reader","convince the reader","hide the topic","end the story"],ans:1}
      ],
      cert:"Persuasive Device Detectives Certificate"
    },
    "writing-logical-sequencing": {
      domain:"Writing", emoji:"🧭", accent:"#7b1fa2", accentLight:"#f3e5f5",
      title:"Logical Sequencing Leaders", subtitle:"Organising ideas in a sensible order", guide:"Grammarly the Parrot",
      tagline:"Arrange reasons from introduction to conclusion so the reader can follow them easily.",
      intro:["Good persuasive writing follows a clear path.","Ideas should move in a sensible order from introduction to body to conclusion.","Connectives help the reader follow the argument."],
      facts:["introduction","reason 1, reason 2, reason 3","conclusion"],
      lessons:[
        {title:"Start with a Clear Opinion",body:["The introduction tells the reader your view.","It should be easy to understand.","A clear beginning prepares the reader for your reasons."],facts:["I believe every class should have a garden."],check:{q:"What belongs in the introduction?",opts:["random joke","clear opinion","new character","shopping list"],ans:1}},
        {title:"Order the Reasons",body:["Put your reasons in a sensible order.","You might go from strongest to strongest, or from simple to complex.","Do not jump around."],facts:["First, gardens teach science. Next, they build responsibility."],check:{q:"Which is best sequencing?",opts:["Conclusion, reason, introduction","Reason, introduction, reason","Introduction, reasons, conclusion","Reason, conclusion, title"],ans:2}},
        {title:"Link Ideas Smoothly",body:["Words like first, next, also, because, and finally create flow.","They show how ideas connect.","This makes the argument easier to follow."],facts:["Connectives are signposts for the reader."],check:{q:"Which word helps sequence ideas?",opts:["banana","finally","window","purple"],ans:1}}
      ],
      review:["Start with the opinion.","Put reasons in a clear order.","Use connectives for flow.","End with a conclusion that matches the argument."],
      quiz:[
        {q:"Which comes first in a persuasive text?",opts:["conclusion","opinion/introduction","third reason","example only"],ans:1},
        {q:"Which connective shows order?",opts:["finally","yellow","because?","story"],ans:0},
        {q:"A logical sequence helps the reader...",opts:["get lost","follow the argument","forget the opinion","skip the reasons"],ans:1},
        {q:"Which structure is best?",opts:["reason, conclusion, introduction","introduction, body reasons, conclusion","conclusion, body, introduction","title, ending, random reasons"],ans:1}
      ],
      cert:"Logical Sequencing Leaders Certificate"
    }
  };

  const key = window.STORY_CONFIG_KEY;
  const cfg = TOPICS[key];
  if (!cfg) return;

  const style = document.createElement("style");
  style.textContent = `
    :root{--accent:${cfg.accent};--accent-light:${cfg.accentLight};--coral:#ff6b6b;--mint:#6bcb77;--blue:#4d96ff;--yellow:#ffd93d;--dark:#2c3e50;--bg:#fff8f0;--card:#fffef8}
    *{box-sizing:border-box;margin:0;padding:0}
    html{font-size:17px}
    @media (max-width:500px){html{font-size:16px}}
    body{font-family:'Nunito',sans-serif;background:var(--bg);min-height:100vh;overflow-x:hidden}
    #app{max-width:860px;margin:0 auto;padding:12px;position:relative;z-index:2}
    .cloud{position:fixed;opacity:.06;font-size:56px;z-index:0;animation:drift linear infinite;pointer-events:none}
    @keyframes drift{from{transform:translateX(-100px)}to{transform:translateX(calc(100vw + 100px))}}
    .home-link{display:inline-flex;align-items:center;gap:6px;background:var(--mint);color:#fff;font-family:'Fredoka One',cursive;font-size:13px;padding:7px 16px;border-radius:20px;text-decoration:none;margin-bottom:10px}
    .tts-bar,.progress-strip,.nav-bar{display:flex;align-items:center;gap:10px;margin-bottom:8px;flex-wrap:wrap}
    .tts-btn,.tts-stop,.nav-btn,.next-q-btn,.cert-btn,.retry-btn,.proceed-btn{border:none;color:#fff;border-radius:22px;cursor:pointer;font-family:'Fredoka One',cursive}
    .tts-btn,.tts-stop{font-size:13px;padding:7px 16px}.tts-btn{background:linear-gradient(135deg,#f39c12,#e67e22)}.tts-stop{background:#7f8c8d}
    .progress-strip,.nav-bar{background:#fff;border:2px solid var(--accent-light);border-radius:16px;padding:10px 16px;box-shadow:0 2px 12px rgba(0,0,0,.06)}
    .progress-bar{flex:1;height:7px;background:var(--accent-light);border-radius:4px;overflow:hidden}.progress-fill{height:100%;background:linear-gradient(90deg,var(--accent),var(--blue),var(--yellow))}
    .progress-label{font-family:'Fredoka One',cursive;font-size:12px;color:#999}
    .nav-bar{justify-content:space-between}.nav-btn{background:var(--accent);font-size:15px;padding:8px 22px}.nav-btn:disabled{background:#ddd;color:#999;cursor:not-allowed}
    .page-dots{display:flex;gap:4px;flex-wrap:wrap;justify-content:center;max-width:320px}.dot{width:9px;height:9px;border-radius:50%;background:#ddd;cursor:pointer}.dot.active{background:var(--accent);transform:scale(1.3)}.dot.visited{background:rgba(0,0,0,.2)}
    .page{display:none;animation:pageIn .4s ease}.page.active{display:block}@keyframes pageIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    .cover,.story-page,.quiz-page,.cert-page{background:var(--card);border-radius:22px;padding:26px;min-height:540px;border:3px solid var(--accent-light);box-shadow:0 4px 20px rgba(0,0,0,.06)}
    .cover{background:linear-gradient(160deg,#1a1a2e 0%,#243b55 45%,#141e30 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;position:relative;overflow:hidden}
    .cover::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 50%, rgba(255,255,255,.08), transparent 60%)}
    .hero{font-size:56px;position:relative;z-index:1}.cover-title{font-family:'Fredoka One',cursive;font-size:38px;color:var(--yellow);line-height:1.15;margin:8px 0;position:relative;z-index:1}
    .cover-sub{font-family:'Fredoka One',cursive;font-size:20px;color:#d8c7ff;position:relative;z-index:1}.cover-tag{font-size:13px;color:rgba(255,255,255,.72);margin-top:14px;position:relative;z-index:1}
    .badge-row{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:16px 0;position:relative;z-index:1}.badge{font-size:28px}
    .page-corner{position:absolute;top:14px;right:16px;font-family:'Fredoka One',cursive;font-size:15px;color:#b0bec5}
    .story-header{display:flex;align-items:center;gap:10px;margin-bottom:16px}.chapter-badge{font-family:'Fredoka One',cursive;font-size:12px;padding:4px 13px;border-radius:16px;background:var(--accent);color:#fff}.story-title{font-family:'Fredoka One',cursive;font-size:22px;color:var(--dark)}
    .story-body{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start}.story-text{font-size:15px;line-height:1.85;color:#444}.story-text p{margin-bottom:10px}
    .story-art{border-radius:16px;padding:18px;border:2px dashed #cfd8dc;background:linear-gradient(135deg,#fff,#f7fafc)}
    .art-emoji{font-size:56px;text-align:center;margin-bottom:8px}.fact-list{margin-top:10px}.fact{padding:6px 0;border-bottom:1px solid rgba(0,0,0,.06);font-size:13px;color:#555}.fact:last-child{border-bottom:none}
    .quiz-bubble,.review-box{border-radius:18px;padding:18px;margin-top:16px}.quiz-bubble{background:linear-gradient(135deg,var(--accent-light),#fff8e1);border:2px solid var(--accent)}.review-box{background:#f8fafc;border:2px solid var(--blue)}
    .quiz-title{font-family:'Fredoka One',cursive;font-size:17px;color:var(--accent);margin-bottom:12px}.quiz-options,.fquiz-options{display:grid;grid-template-columns:1fr 1fr;gap:8px}
    .q-opt,.fq-opt{background:#fff;border:2px solid #cfd8dc;border-radius:12px;padding:10px 14px;font-size:14px;color:var(--dark);cursor:pointer;text-align:left;font-family:'Nunito',sans-serif;font-weight:700}
    .q-opt.correct,.fq-opt.correct{background:#d4edda;border-color:#27ae60;color:#155724}.q-opt.wrong,.fq-opt.wrong{background:#f8d7da;border-color:#c0392b;color:#721c24}.fq-opt.locked{cursor:not-allowed;opacity:.7}
    .quiz-feedback,.q-result-msg{font-family:'Fredoka One',cursive;font-size:16px;margin-top:10px;min-height:24px;text-align:center}
    .review-box li{margin-left:18px;color:#444;line-height:1.7}
    .quiz-progress-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.q-counter{font-family:'Fredoka One',cursive;font-size:13px;color:#999}.q-score-badge{font-family:'Fredoka One',cursive;font-size:14px;background:var(--accent-light);border:2px solid var(--accent);padding:4px 14px;border-radius:20px;color:var(--accent)}
    .quiz-question-card{background:#fff;border-radius:16px;padding:20px;margin-bottom:16px;border:2px solid var(--accent-light)}.quiz-q-text{font-family:'Fredoka One',cursive;font-size:19px;color:var(--dark);line-height:1.4}.quiz-q-emoji{font-size:40px;margin-bottom:10px}
    .next-q-btn{display:block;margin:12px auto 0;background:linear-gradient(135deg,var(--accent),var(--blue));font-size:16px;padding:10px 28px}
    .result-screen{text-align:center;padding:20px 10px}.result-title{font-family:'Fredoka One',cursive;font-size:28px;margin-bottom:10px}.result-score{font-family:'Fredoka One',cursive;font-size:48px;color:var(--yellow)}.result-msg{font-size:16px;color:#888;margin:12px 0 20px;line-height:1.7}.retry-btn{background:linear-gradient(135deg,#e74c3c,#ff6b6b);font-size:18px;padding:12px 32px}.proceed-btn{background:linear-gradient(135deg,#27ae60,#2ecc71);font-size:18px;padding:12px 32px}
    .cert-controls{display:flex;gap:10px;align-items:center;margin-bottom:16px;flex-wrap:wrap}.cert-name-input{font-family:'Nunito',sans-serif;font-size:16px;padding:10px 16px;border:2px solid var(--yellow);border-radius:12px;outline:none;flex:1;min-width:180px;color:#333}.cert-btn{background:var(--accent);font-size:15px;padding:10px 20px}
    .cert-wrap{background:#fff;border-radius:16px;padding:6px;border:3px solid var(--yellow)} canvas#cert{width:100%;border-radius:12px;display:block}.cert-hint{font-size:12px;color:#aaa;margin-top:8px;text-align:center}
    @media(max-width:580px){.story-body{grid-template-columns:1fr}.quiz-options,.fquiz-options,.cert-controls{grid-template-columns:1fr;display:flex;flex-direction:column}.cover-title{font-size:28px}}
  `;
  document.head.appendChild(style);

  function pageHtml(page, index) {
    if (page.type === "cover") {
      return `<div class="page active" data-page="0"><div class="cover"><div class="hero">${cfg.emoji}</div><div class="cover-title">${cfg.title}</div><div class="cover-sub">${cfg.subtitle}</div><div class="badge-row"><span class="badge">${cfg.emoji}</span><span class="badge">⭐</span><span class="badge">📘</span></div><p class="cover-tag">${cfg.tagline} · Year 3–5</p></div></div>`;
    }
    if (page.type === "intro") {
      return `<div class="page" data-page="${index}"><div class="story-page"><div class="page-corner">p.${index}</div><div class="story-header"><span class="chapter-badge">Welcome!</span><h2 class="story-title">Meet ${cfg.guide}!</h2></div><div class="story-body"><div class="story-text" data-tts>${cfg.intro.map(p=>`<p>${p}</p>`).join("")}</div><div class="story-art"><div class="art-emoji">${cfg.emoji}</div><div class="fact-list">${cfg.facts.map(f=>`<div class="fact">${f}</div>`).join("")}</div></div></div></div></div>`;
    }
    if (page.type === "lesson") {
      const l = page.lesson;
      return `<div class="page" data-page="${index}"><div class="story-page"><div class="page-corner">p.${index}</div><div class="story-header"><span class="chapter-badge">Lesson ${page.num}</span><h2 class="story-title">${l.title}</h2></div><div class="story-body"><div class="story-text" data-tts>${l.body.map(p=>`<p>${p}</p>`).join("")}</div><div class="story-art"><div class="art-emoji">${cfg.emoji}</div><div class="fact-list">${l.facts.map(f=>`<div class="fact">${f}</div>`).join("")}</div></div></div><div class="quiz-bubble"><div class="quiz-title">Quick Check</div><p style="font-size:14px;color:#555;margin-bottom:10px;">${l.check.q}</p><div class="quiz-options">${l.check.opts.map((opt,i)=>`<button class="q-opt" onclick="miniCheck(this,${i===l.check.ans},'fb-${key}-${page.num}')">${opt}</button>`).join("")}</div><div class="quiz-feedback" id="fb-${key}-${page.num}"></div></div></div></div>`;
    }
    if (page.type === "review") {
      return `<div class="page" data-page="${index}"><div class="story-page"><div class="page-corner">p.${index}</div><div class="story-header"><span class="chapter-badge">Review</span><h2 class="story-title">Remember These Key Ideas</h2></div><div class="review-box"><ul>${cfg.review.map(r=>`<li>${r}</li>`).join("")}</ul></div></div></div>`;
    }
    if (page.type === "quiz") {
      return `<div class="page" data-page="${index}"><div class="quiz-page"><div id="quizActive"><div class="story-header"><span class="chapter-badge">Final Quiz</span><h2 class="story-title">${cfg.title} Challenge!</h2></div><p style="font-size:14px;color:#666;margin-bottom:16px;">Answer 4 questions. You need at least 3 correct to unlock your certificate.</p><div class="quiz-progress-row"><span class="q-counter" id="qCounter">Question 1 of 4</span><span class="q-score-badge" id="qScoreBadge">Score: 0 / 4</span></div><div class="quiz-question-card"><div class="quiz-q-emoji" id="qEmoji">${cfg.emoji}</div><div class="quiz-q-text" id="qText"></div></div><div class="fquiz-options" id="fquizOptions"></div><div class="q-result-msg" id="qResultMsg"></div><button class="next-q-btn" id="nextQBtn" onclick="nextQuestion()" style="display:none;">Next Question →</button></div><div id="quizPass" style="display:none;"><div class="result-screen"><div class="result-title" style="color:#2e7d32;">Great Work!</div><div class="result-score" id="passScore">4 / 4</div><div class="result-msg" id="passMsg"></div><button class="proceed-btn" onclick="goToCert()">Get My Certificate</button></div></div><div id="quizFail" style="display:none;"><div class="result-screen"><div class="result-title" style="color:var(--coral);">Almost There!</div><div class="result-score" id="failScore">2 / 4</div><div class="result-msg">Read the lesson again and try once more.</div><button class="retry-btn" onclick="restartQuiz()">Try Again</button></div></div></div></div>`;
    }
    return `<div class="page" data-page="${index}"><div class="cert-page"><div class="page-corner">🎓</div><div class="story-header"><span class="chapter-badge">Certificate</span><h2 class="story-title">${cfg.cert}</h2></div><div class="cert-controls"><input class="cert-name-input" id="certName" placeholder="Type the child's name here..." oninput="drawCert()"/><button class="cert-btn" onclick="downloadCert()">Download PNG</button><button class="cert-btn" onclick="printCert()">Print</button></div><div class="cert-wrap"><canvas id="cert" width="900" height="630"></canvas></div><p class="cert-hint">Type a name, then download or print the certificate.</p></div></div>`;
  }

  const pages = [{type:"cover"},{type:"intro"},...cfg.lessons.map((lesson,i)=>({type:"lesson",lesson,num:i+1})),{type:"review"},{type:"quiz"},{type:"cert"}];
  document.body.innerHTML = `<div id="clouds"></div><div id="app"><div class="tts-bar"><button class="tts-btn" id="ttsBtn" onclick="toggleTTS()">🔊 Read Aloud</button><button class="tts-stop" id="ttsStop" onclick="stopTTS()" style="display:none;">⏹ Stop</button></div><div class="progress-strip"><span class="progress-label">${cfg.domain}...</span><div class="progress-bar"><div class="progress-fill" id="progressFill" style="width:0%"></div></div><span class="progress-label" id="progressText">Page 1 of ${pages.length}</span></div><div class="nav-bar"><button class="nav-btn" id="prevBtn" onclick="changePage(-1)" disabled>← Back</button><div class="page-dots" id="pageDots"></div><button class="nav-btn" id="nextBtn" onclick="changePage(1)">Next →</button></div>${pages.map((p,i)=>pageHtml(p,i)).join("")}</div>`;

  if (typeof window.initSlimTopbar === "function") {
    window.initSlimTopbar();
  }

  const clouds = document.getElementById("clouds");
  [cfg.emoji,"✨","☁️"].forEach((sym,i)=>{for(let j=0;j<2;j++){const el=document.createElement("div");el.className="cloud";el.textContent=sym;el.style.top=(Math.random()*80)+"%";el.style.animationDuration=(20+Math.random()*30)+"s";el.style.animationDelay=(Math.random()*20)+"s";el.style.fontSize=(40+Math.random()*30)+"px";clouds.appendChild(el);}});

  window.totalPages = pages.length - 1;
  window.currentPage = 0;
  window.pageEls = document.querySelectorAll(".page");
  const dots = document.getElementById("pageDots");
  for (let i = 0; i < pages.length; i++) {
    const d = document.createElement("div");
    d.className = "dot" + (i === 0 ? " active" : "");
    d.onclick = () => goToPage(i);
    dots.appendChild(d);
  }

  window.quizPassed = false;
  window.goToPage = function(n){ if(n<0||n>window.totalPages) return; if(pages[n].type==="cert"&&!window.quizPassed){alert("Pass the quiz first to unlock your certificate! 🌟");return;} stopTTS(); pageEls[window.currentPage].classList.remove("active"); window.currentPage=n; pageEls[window.currentPage].classList.add("active"); document.getElementById("prevBtn").disabled = window.currentPage===0; document.getElementById("nextBtn").disabled = window.currentPage===window.totalPages; document.getElementById("progressFill").style.width = Math.round(window.currentPage/window.totalPages*100)+"%"; document.getElementById("progressText").textContent = "Page "+(window.currentPage+1)+" of "+pages.length; document.querySelectorAll(".dot").forEach((d,i)=>{d.classList.toggle("active",i===window.currentPage); if(i<window.currentPage)d.classList.add("visited");}); if(pages[window.currentPage].type==="quiz") initQuiz(); if(pages[window.currentPage].type==="cert") setTimeout(drawCert,120); window.scrollTo({top:0,behavior:"smooth"}); };
  window.changePage = function(delta){ goToPage(window.currentPage + delta); };
  window.miniCheck = function(btn, isCorrect, feedbackId){ const wrap = btn.closest(".quiz-bubble"); wrap.querySelectorAll(".q-opt").forEach(b=>b.style.pointerEvents="none"); const fb = document.getElementById(feedbackId); if(isCorrect){ btn.classList.add("correct"); fb.innerHTML='<span style="color:#27ae60;">Correct! Nice work.</span>'; } else { btn.classList.add("wrong"); fb.innerHTML='<span style="color:#c0392b;">Not quite. Try reviewing that lesson idea.</span>'; } };

  let isSpeaking=false,utterance=null;
  window.toggleTTS = function(){ if(isSpeaking){stopTTS();return;} const el = pageEls[window.currentPage].querySelector("[data-tts]") || pageEls[window.currentPage].querySelector(".story-text") || pageEls[window.currentPage]; if(!el)return; speak(el.textContent); };
  function speak(text){ if(!("speechSynthesis" in window)) return; stopTTS(); text=text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/gu,"").replace(/\s+/g," ").trim(); utterance=new SpeechSynthesisUtterance(text); utterance.rate=.8; utterance.pitch=1.1; utterance.lang="en-AU"; utterance.onstart=()=>{isSpeaking=true;document.getElementById("ttsBtn").textContent="🔊 Reading...";document.getElementById("ttsStop").style.display="inline-flex";}; utterance.onend=resetTTS; utterance.onerror=resetTTS; speechSynthesis.speak(utterance);}
  window.stopTTS = function(){ if("speechSynthesis" in window) speechSynthesis.cancel(); resetTTS(); };
  function resetTTS(){ isSpeaking=false; if(document.getElementById("ttsBtn")) document.getElementById("ttsBtn").textContent="🔊 Read Aloud"; if(document.getElementById("ttsStop")) document.getElementById("ttsStop").style.display="none"; }

  let qIndex=0, score=0, answered=false;
  window.initQuiz = function(){ qIndex=0; score=0; answered=false; document.getElementById("quizActive").style.display="block"; document.getElementById("quizPass").style.display="none"; document.getElementById("quizFail").style.display="none"; renderQuestion(); };
  function renderQuestion(){ const q = cfg.quiz[qIndex]; document.getElementById("qEmoji").textContent = cfg.emoji; document.getElementById("qText").textContent = q.q; document.getElementById("qCounter").textContent = "Question "+(qIndex+1)+" of "+cfg.quiz.length; document.getElementById("qScoreBadge").textContent = "Score: "+score+" / "+cfg.quiz.length; document.getElementById("qResultMsg").textContent = ""; document.getElementById("nextQBtn").style.display="none"; answered=false; const box = document.getElementById("fquizOptions"); box.innerHTML=""; q.opts.forEach((opt,i)=>{const b=document.createElement("button"); b.className="fq-opt"; b.textContent=opt; b.onclick=()=>answerQuestion(i,b); box.appendChild(b);}); }
  function answerQuestion(i,btn){ if(answered) return; answered=true; const q=cfg.quiz[qIndex]; document.querySelectorAll(".fq-opt").forEach(b=>b.classList.add("locked")); if(i===q.ans){ btn.classList.add("correct"); score++; document.getElementById("qResultMsg").innerHTML='<span style="color:#27ae60;">Correct!</span>'; } else { btn.classList.add("wrong"); document.querySelectorAll(".fq-opt")[q.ans].classList.add("correct"); document.getElementById("qResultMsg").innerHTML='<span style="color:#c0392b;">Not quite. The correct answer is highlighted.</span>'; } document.getElementById("qScoreBadge").textContent = "Score: "+score+" / "+cfg.quiz.length; document.getElementById("nextQBtn").style.display="block"; document.getElementById("nextQBtn").textContent = qIndex===cfg.quiz.length-1 ? "See My Result! 🏁" : "Next Question →"; }
  window.nextQuestion = function(){ qIndex++; if(qIndex>=cfg.quiz.length){ showResult(); return; } renderQuestion(); };
  function showResult(){ document.getElementById("quizActive").style.display="none"; if(score>=3){ window.quizPassed=true; document.getElementById("quizPass").style.display="block"; document.getElementById("passScore").textContent=score+" / "+cfg.quiz.length; document.getElementById("passMsg").textContent = score===cfg.quiz.length ? "Perfect score! You mastered this topic." : "Strong work. You understand this topic well."; } else { document.getElementById("quizFail").style.display="block"; document.getElementById("failScore").textContent=score+" / "+cfg.quiz.length; } }
  window.restartQuiz = function(){ initQuiz(); };
  window.goToCert = function(){ goToPage(window.totalPages); };

  const canvas = document.getElementById("cert"), ctx = canvas.getContext("2d");
  function drawStar(cx,cy,r,pts,col){ctx.save();ctx.fillStyle=col;ctx.beginPath();for(let i=0;i<pts*2;i++){const a=(i*Math.PI/pts)-Math.PI/2,rd=i%2===0?r:r*.45;i===0?ctx.moveTo(cx+rd*Math.cos(a),cy+rd*Math.sin(a)):ctx.lineTo(cx+rd*Math.cos(a),cy+rd*Math.sin(a));}ctx.closePath();ctx.fill();ctx.restore();}
  function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.arcTo(x+w,y,x+w,y+r,r);ctx.lineTo(x+w,y+h-r);ctx.arcTo(x+w,y+h,x+w-r,y+h,r);ctx.lineTo(x+r,y+h);ctx.arcTo(x,y+h,x,y+h-r,r);ctx.lineTo(x,y+r);ctx.arcTo(x,y,x+r,y,r);ctx.closePath();}
  const qrImage = new Image(); let qrReady = false; qrImage.crossOrigin = "anonymous"; qrImage.onload = ()=>{ qrReady = true; window.drawCert(); }; qrImage.src = "https://quickchart.io/qr?text="+encodeURIComponent("https://fivetofifteen.com/")+"&size=180";
  window.drawCert = function(){ const name=(document.getElementById("certName").value||"Star Learner").trim()||"Star Learner"; const CW=900,CH=630; ctx.clearRect(0,0,CW,CH); const bg=ctx.createLinearGradient(0,0,CW,CH); bg.addColorStop(0,"#fff8f0"); bg.addColorStop(.5,"#f6f8ff"); bg.addColorStop(1,"#fffef5"); ctx.fillStyle=bg; rr(0,0,CW,CH,20); ctx.fill(); ctx.strokeStyle=cfg.accent; ctx.lineWidth=6; rr(8,8,CW-16,CH-16,16); ctx.stroke(); [[52,52],[CW-52,52],[52,CH-52],[CW-52,CH-52]].forEach(([x,y])=>drawStar(x,y,18,5,"#ffd93d")); ctx.fillStyle=cfg.accent; ctx.font='bold 18px "Fredoka One",cursive'; ctx.textAlign="center"; ctx.fillText(cfg.title.toUpperCase(),CW/2,56); ctx.font='64px serif'; ctx.fillText(cfg.emoji,CW/2,140); ctx.font='bold 40px "Fredoka One",cursive'; ctx.fillText(cfg.cert,CW/2,195); ctx.fillStyle="#666"; ctx.font='17px "Nunito",sans-serif'; ctx.fillText("This certificate is proudly awarded to",CW/2,232); ctx.strokeStyle=cfg.accent; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(CW/2-240,276); ctx.lineTo(CW/2+240,276); ctx.stroke(); ctx.fillStyle="#c62828"; ctx.font='bold 38px "Fredoka One",cursive'; ctx.fillText(name,CW/2,270); ctx.fillStyle="#444"; ctx.font='17px "Nunito",sans-serif'; ctx.fillText("for mastering this micro-topic with confidence",CW/2,312); ctx.fillStyle=cfg.accent; ctx.font='bold 24px "Fredoka One",cursive'; ctx.fillText(cfg.subtitle,CW/2,348); ctx.fillStyle="#888"; ctx.font='14px "Nunito",sans-serif'; ctx.fillText("Guide: "+cfg.guide, CW/2, 376); ctx.fillStyle="#ffffff"; ctx.strokeStyle="#dbe3ef"; ctx.lineWidth=2; rr(CW-154,68,102,102,14); ctx.fill(); ctx.stroke(); if(qrReady){ ctx.drawImage(qrImage,CW-144,78,82,82); } else { ctx.fillStyle="#eef3ff"; ctx.fillRect(CW-144,78,82,82); ctx.fillStyle=cfg.accent; ctx.font='bold 10px "Nunito",sans-serif'; ctx.fillText("QR loading...",CW-103,122); } ctx.fillStyle=cfg.accent; ctx.font='bold 10px "Nunito",sans-serif'; ctx.fillText("Scan to visit",CW-103,185); ctx.fillStyle="#7a7f87"; ctx.font='bold 12px "Nunito",sans-serif'; ctx.fillText("Presented by fivetofifteen.com",CW/2,538); const d=new Date().toLocaleDateString("en-AU",{day:"numeric",month:"long",year:"numeric"}); ctx.fillStyle="#999"; ctx.font='12px "Nunito",sans-serif'; ctx.fillText("Awarded on "+d,CW/2,560); };
  window.downloadCert = function(){ drawCert(); const a=document.createElement("a"); a.download=(key+"-certificate.png"); a.href=canvas.toDataURL("image/png"); a.click(); };
  window.printCert = function(){ drawCert(); const url=canvas.toDataURL("image/png"); const w=window.open("","_blank"); const html=`<!DOCTYPE html><html><head><title>Certificate</title><style>body{margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#f5f5f5;}img{max-width:100%;}@media print{body{background:#fff;}}</style></head><body><img src="${url}" alt="Certificate"/></body></html>`; w.document.open(); w.document.write(html); w.document.close(); w.onload=()=>{w.focus(); w.print();}; };
  drawCert();
})();
