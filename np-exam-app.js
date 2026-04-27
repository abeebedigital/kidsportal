(function(){
  const SESSIONS = {
    "exam-01": makeSession(1, "The Adventure Warm-Up", "A balanced starter mixed-skills practice", [
      q("📖","Ava packed her hat because dark clouds were rolling over the beach.","Why did Ava pack her hat?","She was going swimming","It looked like rain","She lost her bag","The hat was broken",1,"reading"),
      q("🔍","Title: How Bees Help Plants. Headings: Pollen, Nectar, Hives.","Which feature suggests this text is informative?","The heading structure","A dragon character","A funny ending","Speech marks",0,"reading"),
      q("🧱","","Which word is a verb?","bright","school","leapt","slowly",2,"grammar"),
      q("💬","","Choose the correct sentence.","\"Run!\" shouted Mia.","\"Run\"! shouted Mia.","Run!\" shouted Mia.","\"Run shouted Mia.\"",0,"punctuation"),
      q("🔤","","Choose the correct word: ____ books are on the desk.","There","Their","They're","Thare",1,"spelling"),
      q("🏯","","What is the value of the digit 6 in 3,641?","6","60","600","6,000",2,"numeracy"),
      q("➕","","53 + 29 =","72","82","92","78",1,"numeracy"),
      q("🍕","","Which is the smallest fraction?","1/2","1/4","1/8","They are equal",2,"numeracy"),
      q("🎭","","Which opening best builds character and setting?","Lia went outside.","Lia stepped into the windy yard, clutching her red scarf.","There was a girl.","The story started.",1,"writing"),
      q("📣","","Which word is most persuasive?","thing","must","maybe","item",1,"writing")
    ]),
    "exam-02": makeSession(2, "The Reading & Language Run", "Extra focus on reading and conventions", [
      q("📖","Sam hid the note under his pillow before Mum entered the room.","What can you infer?","Sam wanted Mum to find it","Sam did not want Mum to see it","Sam forgot about the note","Mum wrote the note",1,"reading"),
      q("🎯","Every class should have a garden because it teaches science and responsibility.","The writer mainly wants to...","inform","persuade","entertain","describe a setting",1,"reading"),
      q("🔠","","Which sentence is punctuated correctly?","the bird flew.","The bird flew.","The bird flew","the Bird flew.",1,"punctuation"),
      q("⏰","","Which sentence keeps the same tense?","Mia packed her bag and walks out.","Mia packs her bag and walked out.","Mia packed her bag and walked out.","Mia packing her bag and walked out.",2,"grammar"),
      q("🔤","","Choose the correct word: I have ____ pencils.","to","too","two","tu",2,"spelling"),
      q("🔎","","Which word is misspelled?","window","friend","beleive","yellow",2,"spelling"),
      q("🐊","","Which number is greatest?","4,908","4,890","4,809","4,098",0,"numeracy"),
      q("➖","","64 - 27 =","37","47","27","43",0,"numeracy"),
      q("🧭","","Which structure is best for persuasive writing?","Conclusion, reasons, introduction","Introduction, reasons, conclusion","Reasons only","Conclusion first",1,"writing"),
      q("✂️","","Proofreading mostly means...","adding a new character","checking for errors","changing the topic","drawing pictures",1,"writing")
    ]),
    "exam-03": makeSession(3, "The Number Ninja Trial", "Numeracy-heavy mixed practice", [
      q("🏯","","Which number has 4 thousands, 2 hundreds, 3 tens and 5 ones?","4,235","4,325","4,253","4,523",0,"numeracy"),
      q("🧩","","Which is the expanded form of 6,041?","6,000 + 40 + 1","6,000 + 400 + 1","600 + 40 + 1","6,000 + 41",0,"numeracy"),
      q("➕","","67 + 19 =","85","86","87","88",1,"numeracy"),
      q("➖","","72 - 38 =","44","34","46","42",1,"numeracy"),
      q("✖️","","3 rows of 6 equals...","9","12","18","24",2,"numeracy"),
      q("➗","","24 ÷ 6 =","3","4","5","6",1,"numeracy"),
      q("💰","","A book costs $8.50 and you pay $10.00. Change is...","$2.50","$1.50","$2.00","$1.00",1,"numeracy"),
      q("🍕","","Which order is correct from smallest to largest?","1/2, 1/4, 1/8","1/8, 1/4, 1/2","1/4, 1/2, 1/8","1/4, 1/8, 1/2",1,"numeracy"),
      q("📏","","A shape with 4 equal sides is most likely a...","triangle","square","circle","sphere",1,"numeracy"),
      q("📊","","Which graph is best for showing favourite fruit choices?","bar graph","map","calendar","story",0,"numeracy")
    ]),
    "exam-04": makeSession(4, "The Storycraft Sprint", "Writing-heavy mixed practice", [
      q("🎭","","Which detail best builds setting?","It was somewhere.","The cave smelled damp and cold.","There was a place.","A setting existed.",1,"writing"),
      q("🔥","","Which sentence creates a complication?","The dog was fluffy.","The bridge snapped just as Zara stepped onto it.","Sam ate breakfast.","The sun was bright.",1,"writing"),
      q("📣","","Which phrase uses emotive language?","The rule exists.","The unfair rule hurts students.","The rule is a rule.","The item is there.",1,"writing"),
      q("🧭","","Which connective helps sequence ideas?","finally","purple","window","banana",0,"writing"),
      q("✂️","","Which sentence is most polished?","Mia found a shell and she put it in her pocket.","Mia found a shell shell shell.","Mia shell pocket.","Found shell Mia.",0,"writing"),
      q("📖","The puppy shivered beside the gate until Ella wrapped it in her jumper.","What feeling is suggested?","anger","fear or cold","boredom","pride",1,"reading"),
      q("🔤","","Choose the correct word: ____ going to win.","There","Their","They're","Thier",2,"spelling"),
      q("💬","","Which sentence shows speech correctly?","\"I can help,\" said Ava.","\"I can help\", said Ava.","I can help,\" said Ava.","\"I can help said Ava.\"",0,"punctuation"),
      q("🏯","","In 5,203 the digit 2 is worth...","2","20","200","2,000",2,"numeracy"),
      q("➕","","46 + 37 =","73","83","93","84",1,"numeracy")
    ]),
    "exam-05": makeSession(5, "The Conventions Challenge", "Grammar, punctuation, and spelling focus", [
      q("🧱","","Which word is an adjective?","quiet","whisper","teacher","softly",0,"grammar"),
      q("⏰","","Which sentence has a tense mistake?","He cooked dinner and washed up.","He cooks dinner and washes up.","He cooked dinner and washes up.","She sings and dances.",2,"grammar"),
      q("🔠","","Which line has two correct sentences?","We packed our bags We left.","We packed our bags. We left.","we packed our bags. We left","We packed our bags, We left.",1,"punctuation"),
      q("💬","","When a new speaker talks, you should...","start a new line","remove quotation marks","use brackets","stay on the same line always",0,"punctuation"),
      q("🔎","","Which is the correct spelling?","adress","address","adres","addres",1,"spelling"),
      q("🔤","","Choose the correct word: Put the chair over ____.","there","their","they're","thare",0,"spelling"),
      q("📖","Koalas sleep for many hours each day and eat eucalyptus leaves.","The main purpose is to...","persuade","inform","entertain","joke",1,"reading"),
      q("🎯","","A heading in a report helps the reader...","find section topics","hear dialogue","see rhyming words","count pages only",0,"reading"),
      q("➖","","41 - 26 =","15","25","35","16",0,"numeracy"),
      q("📣","","Which sentence sounds most persuasive?","School lunches exist.","Healthy lunches are essential for strong learning.","Lunch is a noun.","Food can be food.",1,"writing")
    ]),
    "exam-06": makeSession(6, "The Skills Safari", "Balanced mixed-domain set", [
      q("📖","Nina zipped her jacket before stepping into the icy wind.","Why did Nina zip her jacket?","She was hot","It was cold","She lost it","She was swimming",1,"reading"),
      q("🏷️","Title: Amazing Ants. Labels point to antennae, legs, and thorax.","Which text feature helps show body parts?","dialogue","labels","rhyme","speech marks",1,"reading"),
      q("🧱","","Which word is a noun?","swiftly","river","sparkle","brave",1,"grammar"),
      q("💬","","Which is correct?","\"Stop!\" yelled Ben.","\"Stop\"! yelled Ben.","Stop!\" yelled Ben.","\"Stop yelled Ben.\"",0,"punctuation"),
      q("🔤","","Choose the correct word: The dog wagged ____ tail.","it's","its","it is","its'",1,"spelling"),
      q("🧩","","What number is 7,000 + 300 + 20 + 4?","7,234","7,324","7,304","7,243",1,"numeracy"),
      q("✖️","","5 groups of 3 =","8","12","15","18",2,"numeracy"),
      q("💰","","$3.65 to $5.00 is...","$1.15","$1.25","$1.35","$1.45",2,"numeracy"),
      q("🎭","","Which detail best builds character?","Tom was there.","Tom was a nervous boy who checked the lock three times.","Tom existed.","Tom had a body.",1,"writing"),
      q("🧭","","What usually comes last in a persuasive text?","title","conclusion","second reason","example",1,"writing")
    ]),
    "exam-07": makeSession(7, "The Inference Quest", "Deeper reading and reasoning practice", [
      q("📖","Luca stared at the empty cage and felt his stomach drop.","How does Luca likely feel?","excited","upset or worried","hungry","proud",1,"reading"),
      q("📖","The classroom fell silent when the principal entered holding a clipboard.","What might happen next?","A surprise announcement or check","A beach trip begins","Lunch appears","A dragon flies in",0,"reading"),
      q("🎯","","A poster saying 'Bring a bottle, save the planet!' is mainly trying to...","entertain","persuade","describe a setting","tell a fairy tale",1,"reading"),
      q("✂️","","Which sentence is edited best?","When the bell rang, we lined up quietly.","When the bell rang, we lined quietly up.","When bell rang we lined up quietly","When the bell rang and quietly.",0,"writing"),
      q("⏰","","Which sentence stays in present tense?","The bird sings and hopped.","The bird sings and hops.","The bird sang and hops.","The bird singing and hops.",1,"grammar"),
      q("🔎","","Which word is misspelled?","different","school","frend","garden",2,"spelling"),
      q("🐊","","Which is smaller?","6,203","6,230","They are equal","Not enough info",0,"numeracy"),
      q("➗","","Share 16 equally between 4 children.","2","3","4","5",2,"numeracy"),
      q("🍕","","Which is the biggest unit fraction?","1/8","1/4","1/2","all same",2,"numeracy"),
      q("🔥","","Which line adds tension best?","Mia walked home.","Mia heard footsteps behind her in the dark lane.","Mia had shoes.","Mia was outside.",1,"writing")
    ]),
    "exam-08": makeSession(8, "The Persuasion Parade", "Writing and language blend", [
      q("📣","","Which word is most forceful?","nice","must","maybe","fine",1,"writing"),
      q("🧭","","Which order is best?","reason, conclusion, introduction","introduction, reasons, conclusion","conclusion, title, reasons","reasons only",1,"writing"),
      q("🧱","","Which word is an adverb?","slowly","blue","desk","build",0,"grammar"),
      q("🔠","","Which sentence starts correctly?","the cat slept.","The cat slept.","the Cat slept.","cat slept.",1,"punctuation"),
      q("🔤","","Choose the correct word: We went ____ the park.","to","too","two","tu",0,"spelling"),
      q("📖","Every classroom should have a reading corner because books grow imagination.","This text type is...","narrative","persuasive","procedure","poem",1,"reading"),
      q("🏷️","Title: How Rainbows Form. Caption: Sunlight bends in raindrops.","Which feature explains the picture?","heading","caption","dialogue","index",1,"reading"),
      q("➕","","8 + 7 using bridge to 10 =","14","15","16","17",1,"numeracy"),
      q("💰","","A toy costs $4.75. You pay $5.00. Change is...","15c","20c","25c","35c",2,"numeracy"),
      q("🎭","","Which opening is stronger?","Zoe went into the house.","Zoe pushed open the creaky door of the abandoned house, her torch shaking.","There was a house.","Zoe was near somewhere.",1,"writing")
    ]),
    "exam-09": makeSession(9, "The Mixed Mastery Mock", "Mock exam style mixed set", [
      q("📖","Ben hid behind the couch when he heard the thunder crack.","Why did Ben hide?","He was scared","He was dancing","He was reading","He was hungry",0,"reading"),
      q("🎯","","Which question best helps identify author's purpose?","How long is the text?","What is the writer trying to do?","Is the font large?","How many commas?",1,"reading"),
      q("🧱","","Which word is a verb?","golden","slide","garden","slowly",1,"grammar"),
      q("💬","","Choose the correct sentence.","\"Come back,\" called Mum.","\"Come back\", called Mum.","Come back,\" called Mum.","\"Come back called Mum.\"",0,"punctuation"),
      q("🔤","","Choose the correct word: ____ favourite game is soccer.","There","Their","They're","Thare",1,"spelling"),
      q("🏯","","In 8,104, the digit 1 is worth...","1","10","100","1,000",2,"numeracy"),
      q("✖️","","4 rows of 3 equals...","7","10","12","14",2,"numeracy"),
      q("📊","","A bar graph is useful for showing...","categories and counts","a story ending","speech punctuation","dialogue",0,"numeracy"),
      q("📣","","Which sentence uses emotive language?","The rule exists.","The cruel rule harms pets.","A rule is present.","The rule was there.",1,"writing"),
      q("✂️","","Which belongs to proofreading?","checking capitals","adding a dragon","changing every character","rewriting the whole topic",0,"writing")
    ]),
    "exam-10": makeSession(10, "The Grand Challenge", "Final mixed-session exam", [
      q("📖","Talia smiled at the trophy but kept glancing at her teammate beside her.","What can you infer?","She feels only selfish","She cares about sharing the moment","She hates the trophy","She is leaving",1,"reading"),
      q("🏷️","Headings: Habitat, Diet, Behaviour. Diagram labels: tail, wings, beak.","This is most likely...","an informative report","a fairy tale","a shopping list","a poem",0,"reading"),
      q("⏰","","Which sentence has correct tense consistency?","He opened the gate and steps inside.","He opens the gate and stepped inside.","He opened the gate and stepped inside.","He opening the gate and stepped inside.",2,"grammar"),
      q("🔎","","Which spelling is correct?","seperate","separate","seprate","seperete",1,"spelling"),
      q("💬","","When a new character speaks, you should usually...","start a new line","delete the speech marks","use brackets","add a heading",0,"punctuation"),
      q("🐊","","Which is greatest?","7,089","7,809","7,098","7,780",1,"numeracy"),
      q("➗","","35 ÷ 7 =","4","5","6","7",1,"numeracy"),
      q("🍕","","Which list is correct from smallest to largest?","1/2, 1/4, 1/8","1/8, 1/4, 1/2","1/4, 1/2, 1/8","1/4, 1/8, 1/2",1,"numeracy"),
      q("🔥","","Which line creates the strongest complication?","The path was there.","The map blew from Zara's hand and vanished into the river.","Zara held a map.","It was afternoon.",1,"writing"),
      q("🧭","","Which is the best persuasive structure?","introduction, reasons, conclusion","reasons, title, ending","conclusion, introduction, reasons","random order",0,"writing")
    ])
  };

  function q(emoji, passage, question, a,b,c,d, ans, domain){
    return {emoji, passage, question, options:[a,b,c,d], answer:ans, domain};
  }
  function makeSession(num, title, subtitle, questions){
    return {num,title,subtitle,questions};
  }

  const key = window.EXAM_SESSION_KEY;
  const session = SESSIONS[key];
  if(!session) return;

  const styles = `
    :root{--coral:#ff6b6b;--mint:#6bcb77;--blue:#4d96ff;--purple:#c77dff;--orange:#ff9f1c;--yellow:#ffd93d;--dark:#2d3436;--paper:#fffef7;--warm:#fff8f0;--exam:#c62828;--exam-light:#fdecea}
    *{box-sizing:border-box;margin:0;padding:0}
    html{font-size:17px}
    @media (max-width:500px){html{font-size:16px}}
    body{font-family:'Nunito',sans-serif;background:var(--warm);min-height:100vh;overflow-x:hidden}
    #app{position:relative;z-index:2;max-width:900px;margin:0 auto;padding:12px}
    .cloud{position:fixed;opacity:.06;font-size:58px;z-index:0;animation:drift linear infinite;pointer-events:none}
    @keyframes drift{from{transform:translateX(-100px)}to{transform:translateX(calc(100vw + 100px))}}
    .home-link{display:inline-flex;align-items:center;gap:6px;background:var(--mint);color:#fff;font-family:'Fredoka One',cursive;font-size:13px;padding:7px 16px;border-radius:20px;text-decoration:none;margin-bottom:10px}
    .tts-bar,.progress-strip,.nav-bar{display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap}
    .tts-btn,.tts-stop,.nav-btn,.next-q-btn,.retry-btn,.proceed-btn,.cert-btn{border:none;border-radius:22px;color:#fff;cursor:pointer;font-family:'Fredoka One',cursive}
    .tts-btn,.tts-stop{font-size:13px;padding:7px 16px}.tts-btn{background:linear-gradient(135deg,#f39c12,#e67e22)}.tts-stop{background:#7f8c8d}
    .progress-strip,.nav-bar{background:#fff;border:2px solid var(--exam-light);border-radius:16px;padding:10px 16px;box-shadow:0 2px 12px rgba(0,0,0,.06)}
    .progress-bar{flex:1;height:7px;background:var(--exam-light);border-radius:4px;overflow:hidden}.progress-fill{height:100%;background:linear-gradient(90deg,var(--exam),var(--orange),var(--yellow))}
    .progress-label{font-family:'Fredoka One',cursive;font-size:12px;color:#999}.nav-bar{justify-content:space-between}.nav-btn{background:var(--exam);font-size:15px;padding:8px 22px}.nav-btn:disabled{background:#ddd;color:#999;cursor:not-allowed}
    .page-dots{display:flex;gap:4px;flex-wrap:wrap;justify-content:center;max-width:260px}.dot{width:9px;height:9px;border-radius:50%;background:#ddd;cursor:pointer}.dot.active{background:var(--exam);transform:scale(1.3)}.dot.visited{background:rgba(198,40,40,.25)}
    .page{display:none;animation:pageIn .4s ease}.page.active{display:block}@keyframes pageIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    .cover,.story-page,.quiz-page,.cert-page{background:var(--paper);border-radius:22px;padding:28px;min-height:560px;border:3px solid var(--exam-light);box-shadow:0 4px 20px rgba(0,0,0,.06)}
    .cover{background:linear-gradient(160deg,#1a1a2e 0%,#3b1f2b 45%,#6a040f 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;position:relative;overflow:hidden}
    .cover::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 50%, rgba(255,255,255,.08), transparent 60%)}
    .hero{font-size:58px;position:relative;z-index:1}.cover-title{font-family:'Fredoka One',cursive;font-size:38px;color:var(--yellow);line-height:1.1;margin:8px 0;position:relative;z-index:1}.cover-sub{font-family:'Fredoka One',cursive;font-size:20px;color:#ffcdd2;position:relative;z-index:1}.cover-tag{font-size:13px;color:rgba(255,255,255,.72);margin-top:14px;position:relative;z-index:1}
    .badge-row{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:18px 0;position:relative;z-index:1}.badge{font-size:28px}
    .page-corner{position:absolute;top:14px;right:16px;font-family:'Fredoka One',cursive;font-size:15px;color:#b0bec5}
    .story-header{display:flex;align-items:center;gap:10px;margin-bottom:16px}.chapter-badge{font-family:'Fredoka One',cursive;font-size:12px;padding:4px 13px;border-radius:16px;background:var(--exam);color:#fff}.story-title{font-family:'Fredoka One',cursive;font-size:22px;color:var(--dark)}
    .story-body{display:grid;grid-template-columns:1.2fr .9fr;gap:20px;align-items:start}.story-text{font-size:15px;line-height:1.85;color:#444}.story-text p{margin-bottom:10px}
    .story-art{border-radius:16px;padding:18px;border:2px dashed #d7d7d7;background:linear-gradient(135deg,#fff,#fff8f8)}.art-emoji{font-size:56px;text-align:center;margin-bottom:8px}.fact{padding:6px 0;border-bottom:1px solid rgba(0,0,0,.06);font-size:13px;color:#555}.fact:last-child{border-bottom:none}
    .rules-box,.domains-box{border-radius:18px;padding:18px;margin-top:16px}.rules-box{background:linear-gradient(135deg,var(--exam-light),#fff8e1);border:2px solid var(--exam)}.domains-box{background:#f7fbff;border:2px solid var(--blue)}
    .box-title{font-family:'Fredoka One',cursive;font-size:17px;color:var(--exam);margin-bottom:10px}
    .rules-list li,.domains-list li{margin-left:18px;line-height:1.7;color:#444}
    .quiz-progress-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}.q-counter{font-family:'Fredoka One',cursive;font-size:13px;color:#999}.q-score-badge{font-family:'Fredoka One',cursive;font-size:14px;background:var(--exam-light);border:2px solid var(--exam);padding:4px 14px;border-radius:20px;color:var(--exam)}
    .quiz-question-card{background:#fff;border-radius:16px;padding:20px;margin-bottom:16px;border:2px solid var(--exam-light)}.quiz-q-emoji{font-size:40px;margin-bottom:10px}.quiz-q-passage{background:#f5f5f5;border-radius:10px;padding:12px;font-size:13px;line-height:1.7;margin-bottom:12px;color:#444}.quiz-q-text{font-family:'Fredoka One',cursive;font-size:19px;color:var(--dark);line-height:1.4}
    .fquiz-options{display:grid;grid-template-columns:1fr 1fr;gap:10px}.fq-opt{background:#fff;border:2px solid #cfd8dc;border-radius:14px;padding:12px 16px;font-size:15px;color:var(--dark);cursor:pointer;font-family:'Nunito',sans-serif;font-weight:700;text-align:left}
    .fq-opt.correct{background:#d4edda;border-color:#27ae60;color:#155724}.fq-opt.wrong{background:#f8d7da;border-color:#c0392b;color:#721c24}.fq-opt.locked{cursor:not-allowed;opacity:.7}
    .q-result-msg{font-family:'Fredoka One',cursive;font-size:16px;text-align:center;min-height:28px;margin-top:8px}.next-q-btn{display:block;margin:12px auto 0;background:linear-gradient(135deg,var(--exam),var(--orange));font-size:16px;padding:10px 28px}
    .result-screen{text-align:center;padding:20px 10px}.result-title{font-family:'Fredoka One',cursive;font-size:28px;margin-bottom:10px}.result-score{font-family:'Fredoka One',cursive;font-size:52px;color:var(--yellow)}.result-msg{font-size:16px;color:#777;margin:12px 0 20px;line-height:1.7}
    .retry-btn{background:linear-gradient(135deg,#e74c3c,#ff6b6b);font-size:18px;padding:12px 32px}.proceed-btn{background:linear-gradient(135deg,#27ae60,#2ecc71);font-size:18px;padding:12px 32px}
    .breakdown{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;max-width:520px;margin:18px auto 0}.break-card{background:#fff;border:2px solid #eee;border-radius:14px;padding:12px}.break-label{font-family:'Fredoka One',cursive;font-size:13px;color:#666}.break-value{font-size:18px;font-weight:800;color:var(--exam)}
    .cert-controls{display:flex;gap:10px;align-items:center;margin-bottom:16px;flex-wrap:wrap}.cert-name-input{font-family:'Nunito',sans-serif;font-size:16px;padding:10px 16px;border:2px solid var(--yellow);border-radius:12px;outline:none;flex:1;min-width:180px;color:#333}.cert-btn{background:var(--exam);font-size:15px;padding:10px 20px}
    .cert-wrap{background:#fff;border-radius:16px;padding:6px;border:3px solid var(--yellow)} canvas#cert{width:100%;border-radius:12px;display:block}.cert-hint{font-size:12px;color:#aaa;margin-top:8px;text-align:center}
    @media(max-width:580px){.story-body,.fquiz-options,.breakdown{grid-template-columns:1fr}.cover-title{font-size:28px}.cert-controls{flex-direction:column}}
  `;
  const styleEl = document.createElement("style");
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  document.body.innerHTML = `
    <div id="clouds"></div>
    <div id="app"><div class="tts-bar">
        <button class="tts-btn" id="ttsBtn" onclick="toggleTTS()">🔊 Read Aloud</button>
        <button class="tts-stop" id="ttsStop" onclick="stopTTS()" style="display:none;">⏹ Stop</button>
      </div>
      <div class="progress-strip">
        <span class="progress-label">Skills Exam...</span>
        <div class="progress-bar"><div class="progress-fill" id="progressFill" style="width:0%"></div></div>
        <span class="progress-label" id="progressText">Page 1 of 5</span>
      </div>
      <div class="nav-bar">
        <button class="nav-btn" id="prevBtn" onclick="changePage(-1)" disabled>← Back</button>
        <div class="page-dots" id="pageDots"></div>
        <button class="nav-btn" id="nextBtn" onclick="changePage(1)">Next →</button>
      </div>

      <div class="page active" data-page="0">
        <div class="cover">
          <div class="hero">📝</div>
          <div class="cover-title">Exam Session ${session.num}</div>
          <div class="cover-sub">${session.title}</div>
          <div class="badge-row"><span class="badge">📖</span><span class="badge">✏️</span><span class="badge">🔢</span><span class="badge">🏆</span></div>
          <p class="cover-tag">${session.subtitle} · 10 mixed challenge questions · Year 3–5</p>
        </div>
      </div>

      <div class="page" data-page="1">
        <div class="story-page">
          <div class="page-corner">p.1</div>
          <div class="story-header"><span class="chapter-badge">Ready?</span><h2 class="story-title">Exam Rules and Tips</h2></div>
          <div class="story-body">
            <div class="story-text" data-tts>
              <p>Welcome to <strong>Exam Session ${session.num}</strong>!</p>
              <p>This practice session mixes <strong>reading, writing, spelling, grammar, punctuation, and numeracy</strong> in a mini challenge across the main skill areas.</p>
              <p>Read each question carefully, look for clues, and choose the <strong>best answer</strong>.</p>
              <p>You need <strong>7 out of 10</strong> correct to unlock your exam certificate.</p>
              <p>Take your time, stay calm, and do your best. Let's begin!</p>
            </div>
            <div class="story-art">
              <div class="art-emoji">🧭</div>
              <div class="fact">10 multiple-choice questions</div>
              <div class="fact">Mixed domains</div>
              <div class="fact">Instant feedback</div>
              <div class="fact">Certificate when you pass</div>
            </div>
          </div>
          <div class="rules-box">
            <div class="box-title">Exam Tips</div>
            <ul class="rules-list">
              <li>Read the whole question before looking at the answers.</li>
              <li>Use elimination if two answers look similar.</li>
              <li>Check the writer's purpose and text clues in reading questions.</li>
              <li>In numeracy, decide what the digits or operation really mean before solving.</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="page" data-page="2">
        <div class="story-page">
          <div class="page-corner">p.2</div>
          <div class="story-header"><span class="chapter-badge">Domains</span><h2 class="story-title">What This Session Covers</h2></div>
          <div class="domains-box">
            <ul class="domains-list">
              <li>Reading: literal, inferential, text features, and purpose</li>
              <li>Writing: narrative craft, editing, persuasive language, and sequencing</li>
              <li>Conventions: grammar, punctuation, spelling, and homophones</li>
              <li>Numeracy: place value, operations, fractions, money, and data</li>
            </ul>
          </div>
          <div class="rules-box">
            <div class="box-title">Scoring</div>
            <ul class="rules-list">
              <li>7-10 correct: pass and unlock certificate</li>
              <li>0-6 correct: retry after reviewing mistakes</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="page" data-page="3">
        <div class="quiz-page">
          <div id="quizActive">
            <div class="story-header"><span class="chapter-badge">Exam</span><h2 class="story-title">Session ${session.num} Questions</h2></div>
            <div class="quiz-progress-row">
              <span class="q-counter" id="qCounter">Question 1 of 10</span>
              <span class="q-score-badge" id="qScoreBadge">Score: 0 / 10</span>
            </div>
            <div class="quiz-question-card">
              <div class="quiz-q-emoji" id="qEmoji">📝</div>
              <div class="quiz-q-passage" id="qPassage" style="display:none;"></div>
              <div class="quiz-q-text" id="qText"></div>
            </div>
            <div class="fquiz-options" id="fquizOptions"></div>
            <div class="q-result-msg" id="qResultMsg"></div>
            <button class="next-q-btn" id="nextQBtn" onclick="nextQuestion()" style="display:none;">Next Question →</button>
          </div>

          <div id="quizPass" style="display:none;">
            <div class="result-screen">
              <div class="result-title" style="color:#2e7d32;">Session Passed!</div>
              <div class="result-score" id="passScore">10 / 10</div>
              <div class="result-msg" id="passMsg"></div>
              <div class="breakdown" id="breakdownPass"></div>
              <button class="proceed-btn" onclick="goToCert()">Get My Certificate</button>
            </div>
          </div>

          <div id="quizFail" style="display:none;">
            <div class="result-screen">
              <div class="result-title" style="color:var(--coral);">Keep Going!</div>
              <div class="result-score" id="failScore">5 / 10</div>
              <div class="result-msg">You need 7 correct to pass this exam session. Review the questions and try again.</div>
              <div class="breakdown" id="breakdownFail"></div>
              <button class="retry-btn" onclick="restartQuiz()">Try Again</button>
            </div>
          </div>
        </div>
      </div>

      <div class="page" data-page="4">
        <div class="cert-page">
          <div class="page-corner">🎓</div>
          <div class="story-header"><span class="chapter-badge">Certificate</span><h2 class="story-title">Exam Session ${session.num} Certificate</h2></div>
          <div class="cert-controls">
            <input class="cert-name-input" id="certName" placeholder="Type the child's name here..." oninput="drawCert()"/>
            <button class="cert-btn" onclick="downloadCert()">⬇ Download PNG</button>
            <button class="cert-btn" onclick="printCert()">🖨 Print</button>
          </div>
          <div class="cert-wrap"><canvas id="cert" width="900" height="630"></canvas></div>
          <p class="cert-hint">Type a name, then download or print the certificate.</p>
        </div>
      </div>
    </div>
  `;

  if (typeof window.initSlimTopbar === "function") {
    window.initSlimTopbar();
  }

  const clouds = document.getElementById("clouds");
  ["📝","⭐","☁️"].forEach(sym=>{for(let i=0;i<2;i++){const el=document.createElement("div");el.className="cloud";el.textContent=sym;el.style.top=(Math.random()*80)+"%";el.style.animationDuration=(20+Math.random()*30)+"s";el.style.animationDelay=(Math.random()*20)+"s";el.style.fontSize=(40+Math.random()*30)+"px";clouds.appendChild(el);}});

  const TOTAL = 4;
  let currentPage = 0;
  const pages = document.querySelectorAll(".page");
  const dotsC = document.getElementById("pageDots");
  for(let i=0;i<=TOTAL;i++){const d=document.createElement("div");d.className="dot"+(i===0?" active":"");d.onclick=()=>goToPage(i);dotsC.appendChild(d);}

  let quizPassed=false;
  window.goToPage = function(n){if(n<0||n>TOTAL)return;if(n===4&&!quizPassed){alert("Pass the exam first to unlock your certificate! 🌟");return;}stopTTS();pages[currentPage].classList.remove("active");currentPage=n;pages[currentPage].classList.add("active");document.getElementById("prevBtn").disabled=currentPage===0;document.getElementById("nextBtn").disabled=currentPage===TOTAL;document.getElementById("progressFill").style.width=Math.round(currentPage/TOTAL*100)+"%";document.getElementById("progressText").textContent="Page "+(currentPage+1)+" of "+(TOTAL+1);document.querySelectorAll(".dot").forEach((d,i)=>{d.classList.toggle("active",i===currentPage);if(i<currentPage)d.classList.add("visited");});if(currentPage===3)initQuiz();if(currentPage===4)setTimeout(drawCert,120);window.scrollTo({top:0,behavior:"smooth"});};
  window.changePage = function(delta){goToPage(currentPage+delta);};

  let isSpeaking=false,utterance=null;
  window.toggleTTS = function(){if(isSpeaking){stopTTS();return;}const el=pages[currentPage].querySelector("[data-tts]")||pages[currentPage].querySelector(".story-text")||pages[currentPage];if(!el)return;speak(el.textContent);};
  function speak(text){if(!("speechSynthesis" in window))return;stopTTS();text=text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/gu,"").replace(/\s+/g," ").trim();utterance=new SpeechSynthesisUtterance(text);utterance.rate=.8;utterance.pitch=1.08;utterance.lang="en-AU";utterance.onstart=()=>{isSpeaking=true;document.getElementById("ttsBtn").textContent="🔊 Reading...";document.getElementById("ttsStop").style.display="inline-flex";};utterance.onend=resetTTS;utterance.onerror=resetTTS;speechSynthesis.speak(utterance);}
  window.stopTTS = function(){if("speechSynthesis" in window)speechSynthesis.cancel();resetTTS();};
  function resetTTS(){isSpeaking=false;if(document.getElementById("ttsBtn"))document.getElementById("ttsBtn").textContent="🔊 Read Aloud";if(document.getElementById("ttsStop"))document.getElementById("ttsStop").style.display="none";}

  let qIndex=0, score=0, answered=false;
  const breakdown = {reading:0, writing:0, grammar:0, punctuation:0, spelling:0, numeracy:0};
  const possible = countDomains(session.questions);
  function countDomains(questions){const out={reading:0, writing:0, grammar:0, punctuation:0, spelling:0, numeracy:0};questions.forEach(q=>out[q.domain]++);return out;}
  function resetBreakdown(){Object.keys(breakdown).forEach(k=>breakdown[k]=0);}

  window.initQuiz = function(){qIndex=0;score=0;answered=false;resetBreakdown();document.getElementById("quizActive").style.display="block";document.getElementById("quizPass").style.display="none";document.getElementById("quizFail").style.display="none";renderQuestion();};
  function renderQuestion(){const q=session.questions[qIndex];document.getElementById("qEmoji").textContent=q.emoji;document.getElementById("qText").textContent=q.question;document.getElementById("qCounter").textContent=`Question ${qIndex+1} of ${session.questions.length}`;document.getElementById("qScoreBadge").textContent=`Score: ${score} / ${session.questions.length}`;const passage=document.getElementById("qPassage");if(q.passage){passage.style.display="block";passage.textContent=q.passage;}else{passage.style.display="none";passage.textContent="";}document.getElementById("qResultMsg").textContent="";document.getElementById("nextQBtn").style.display="none";answered=false;const box=document.getElementById("fquizOptions");box.innerHTML="";q.options.forEach((opt,i)=>{const b=document.createElement("button");b.className="fq-opt";b.textContent=opt;b.onclick=()=>answerQuestion(i,b);box.appendChild(b);});}
  function answerQuestion(i,btn){if(answered)return;answered=true;const q=session.questions[qIndex];document.querySelectorAll(".fq-opt").forEach(b=>b.classList.add("locked"));if(i===q.answer){btn.classList.add("correct");score++;breakdown[q.domain]++;document.getElementById("qResultMsg").innerHTML='<span style="color:#27ae60;">Correct!</span>';}else{btn.classList.add("wrong");document.querySelectorAll(".fq-opt")[q.answer].classList.add("correct");document.getElementById("qResultMsg").innerHTML='<span style="color:#c0392b;">Not quite. The correct answer is highlighted.</span>';}document.getElementById("qScoreBadge").textContent=`Score: ${score} / ${session.questions.length}`;document.getElementById("nextQBtn").style.display="block";document.getElementById("nextQBtn").textContent=qIndex===session.questions.length-1?"See My Result! 🏁":"Next Question →";}
  window.nextQuestion = function(){qIndex++;if(qIndex>=session.questions.length){showResult();return;}renderQuestion();};
  function showResult(){document.getElementById("quizActive").style.display="none";const pass = score>=7;quizPassed=pass;if(pass){document.getElementById("quizPass").style.display="block";document.getElementById("passScore").textContent=`${score} / ${session.questions.length}`;document.getElementById("passMsg").textContent=score===10?"Outstanding work. You aced this exam session!":"Strong work. You passed this exam session with confidence.";renderBreakdown("breakdownPass");}else{document.getElementById("quizFail").style.display="block";document.getElementById("failScore").textContent=`${score} / ${session.questions.length}`;renderBreakdown("breakdownFail");}}
  function renderBreakdown(id){const el=document.getElementById(id);el.innerHTML="";const labels={reading:"Reading",writing:"Writing",grammar:"Grammar",punctuation:"Punctuation",spelling:"Spelling",numeracy:"Numeracy"};Object.keys(possible).forEach(k=>{if(possible[k]===0)return;const card=document.createElement("div");card.className="break-card";card.innerHTML=`<div class="break-label">${labels[k]}</div><div class="break-value">${breakdown[k]} / ${possible[k]}</div>`;el.appendChild(card);});}
  window.restartQuiz = function(){initQuiz();};
  window.goToCert = function(){goToPage(4);};

  const canvas=document.getElementById("cert"), ctx=canvas.getContext("2d");
  function drawStar(cx,cy,r,pts,col){ctx.save();ctx.fillStyle=col;ctx.beginPath();for(let i=0;i<pts*2;i++){const a=(i*Math.PI/pts)-Math.PI/2,rd=i%2===0?r:r*.45;i===0?ctx.moveTo(cx+rd*Math.cos(a),cy+rd*Math.sin(a)):ctx.lineTo(cx+rd*Math.cos(a),cy+rd*Math.sin(a));}ctx.closePath();ctx.fill();ctx.restore();}
  function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.arcTo(x+w,y,x+w,y+r,r);ctx.lineTo(x+w,y+h-r);ctx.arcTo(x+w,y+h,x+w-r,y+h,r);ctx.lineTo(x+r,y+h);ctx.arcTo(x,y+h,x,y+h-r,r);ctx.lineTo(x,y+r);ctx.arcTo(x,y,x+r,y,r);ctx.closePath();}
  const qrImage=new Image(); let qrReady=false; qrImage.crossOrigin="anonymous"; qrImage.onload=()=>{qrReady=true;window.drawCert();}; qrImage.src="https://quickchart.io/qr?text="+encodeURIComponent("https://fivetofifteen.com/")+"&size=180";
  window.drawCert = function(){const name=(document.getElementById("certName").value.trim()||"Exam Star");const CW=900,CH=630;ctx.clearRect(0,0,CW,CH);const bg=ctx.createLinearGradient(0,0,CW,CH);bg.addColorStop(0,"#fff8f0");bg.addColorStop(.5,"#fff3f3");bg.addColorStop(1,"#fffde7");ctx.fillStyle=bg;rr(0,0,CW,CH,20);ctx.fill();ctx.strokeStyle="#c62828";ctx.lineWidth=6;rr(8,8,CW-16,CH-16,16);ctx.stroke();ctx.strokeStyle="#ff9f1c";ctx.lineWidth=2;ctx.setLineDash([8,5]);rr(20,20,CW-40,CH-40,10);ctx.stroke();ctx.setLineDash([]);[[52,52],[CW-52,52],[52,CH-52],[CW-52,CH-52]].forEach(([x,y])=>drawStar(x,y,18,5,"#ffd93d"));ctx.fillStyle="#c62828";ctx.font='bold 18px "Fredoka One",cursive';ctx.textAlign="center";ctx.fillText(`EXAM SESSION ${session.num}`,CW/2,56);ctx.font='64px serif';ctx.fillText("🏆",CW/2,140);ctx.font='bold 40px "Fredoka One",cursive';ctx.fillText("Exam Session Certificate",CW/2,195);ctx.fillStyle="#666";ctx.font='17px "Nunito",sans-serif';ctx.fillText("This certificate is proudly awarded to",CW/2,232);ctx.strokeStyle="#c62828";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(CW/2-240,276);ctx.lineTo(CW/2+240,276);ctx.stroke();ctx.fillStyle="#b71c1c";ctx.font='bold 38px "Fredoka One",cursive';ctx.fillText(name,CW/2,270);ctx.fillStyle="#444";ctx.font='17px "Nunito",sans-serif';ctx.fillText(`for successfully passing ${session.title}`,CW/2,312);ctx.fillStyle="#c62828";ctx.font='bold 24px "Fredoka One",cursive';ctx.fillText(`${score} / ${session.questions.length} correct`,CW/2,348);ctx.fillStyle="#888";ctx.font='14px "Nunito",sans-serif';ctx.fillText("Mixed domains: Reading • Writing • Conventions • Numeracy",CW/2,376);ctx.font='30px serif';ctx.fillText("📖  ✏️  🔤  🔢  🏆",CW/2,450);ctx.fillStyle="#ffffff";ctx.strokeStyle="#f0dede";ctx.lineWidth=2;rr(CW-154,68,102,102,14);ctx.fill();ctx.stroke();if(qrReady){ctx.drawImage(qrImage,CW-144,78,82,82);}else{ctx.fillStyle="#fff3f3";ctx.fillRect(CW-144,78,82,82);ctx.fillStyle="#c62828";ctx.font='bold 10px "Nunito",sans-serif';ctx.fillText("QR loading...",CW-103,122);}ctx.fillStyle="#c62828";ctx.font='bold 10px "Nunito",sans-serif';ctx.fillText("Scan to visit",CW-103,185);ctx.fillStyle="#9a031e";ctx.font='bold 12px "Nunito",sans-serif';ctx.fillText("Presented by fivetofifteen.com",CW/2,538);const d=new Date().toLocaleDateString("en-AU",{day:"numeric",month:"long",year:"numeric"});ctx.fillStyle="#999";ctx.font='12px "Nunito",sans-serif';ctx.fillText("Awarded on "+d,CW/2,560);};
  window.downloadCert = function(){drawCert();const a=document.createElement("a");a.download=`np-exam-session-${session.num}.png`;a.href=canvas.toDataURL("image/png");a.click();};
  window.printCert = function(){drawCert();const url=canvas.toDataURL("image/png");const w=window.open("","_blank");const html=`<!DOCTYPE html><html><head><title>Certificate</title><style>body{margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#f5f5f5;}img{max-width:100%;}@media print{body{background:#fff;}}</style></head><body><img src="${url}" alt="Certificate"/></body></html>`;w.document.open();w.document.write(html);w.document.close();w.onload=()=>{w.focus();w.print();};};
  drawCert();
})();
