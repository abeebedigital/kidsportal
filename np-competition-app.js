(function () {
  function q(emoji, passage, question, options, answer, domain) {
    return { emoji, passage, question, options, answer, domain };
  }

  const COMPETITIONS = {
    "weekly-competition-2026-04-01": {
      key: "weekly-competition-2026-04-01",
      weekLabel: "Week 1 Competition",
      title: "The Weekly Skills Cup",
      subtitle: "25 mixed challenge questions in 60 minutes",
      weekStart: "2026-04-01T00:00:00+11:00",
      weekEnd: "2026-04-07T23:59:59+11:00",
      minutes: 60,
      passingScore: 18,
      questions: [
        q("📖", "Aria grabbed her raincoat when she heard thunder near the oval.", "Why did Aria grab her raincoat?", ["She was going to swim", "It might rain", "She lost her jumper", "She wanted new shoes"], 1, "reading"),
        q("🔎", "Title: Life in a Beehive. Headings: Queen, Workers, Drones.", "What does this suggest about the text?", ["It is an informative report", "It is a shopping list", "It is a play script", "It is a joke book"], 0, "reading"),
        q("📖", "Tom stared at the empty food bowl and sighed.", "What can you infer?", ["Tom is proud", "Tom is worried or disappointed", "Tom is asleep", "Tom is laughing"], 1, "reading"),
        q("🏷️", "Diagram labels show root, stem, and leaf.", "Which text feature is being used?", ["speech marks", "labels", "chapters", "rhyme"], 1, "reading"),
        q("🎯", "Bring your own drink bottle and help our school cut plastic waste.", "The main purpose is to...", ["entertain", "persuade", "confuse", "tell a fairy tale"], 1, "reading"),
        q("📖", "The playground fell silent as the principal unfolded the paper.", "What is most likely about to happen?", ["An announcement", "A football game", "A science experiment", "A birthday party"], 0, "reading"),
        q("📖", "Caption: The baby turtle uses the moonlight to find the sea.", "What does the caption help the reader do?", ["Find the page number", "Understand the picture", "Hear dialogue", "Check spelling rules"], 1, "reading"),
        q("🧱", "", "Which word is a noun?", ["swiftly", "honest", "lantern", "glowed"], 2, "grammar"),
        q("⏰", "", "Which sentence keeps the same tense?", ["Mia packed her bag and runs outside.", "Mia packs her bag and ran outside.", "Mia packed her bag and ran outside.", "Mia packing her bag and ran outside."], 2, "grammar"),
        q("🧱", "", "Which word is an adjective?", ["carefully", "parrot", "shiny", "dance"], 2, "grammar"),
        q("🔠", "", "Which sentence has correct sentence boundaries?", ["the dog barked. We ran inside.", "The dog barked. We ran inside.", "The dog barked we ran inside.", "The dog barked, We ran inside."], 1, "punctuation"),
        q("💬", "", "Which sentence shows speech correctly?", ["\"Wait for me!\" called Zara.", "\"Wait for me\"! called Zara.", "Wait for me!\" called Zara.", "\"Wait for me called Zara."], 0, "punctuation"),
        q("🔤", "", "Choose the correct word: ____ books are on the shelf.", ["There", "Their", "They're", "Thare"], 1, "spelling"),
        q("🔎", "", "Which word is misspelled?", ["garden", "friend", "becuase", "winter"], 2, "spelling"),
        q("🔤", "", "Choose the correct word: We are going ____ the museum.", ["to", "too", "two", "tu"], 0, "spelling"),
        q("🏯", "", "What is the value of the digit 5 in 4,582?", ["5", "50", "500", "5,000"], 2, "numeracy"),
        q("🧩", "", "Which is the expanded form of 6,407?", ["6,000 + 400 + 7", "6,000 + 40 + 7", "600 + 400 + 7", "6,000 + 4070"], 0, "numeracy"),
        q("🐊", "", "Which number is greatest?", ["5,890", "5,980", "5,809", "5,908"], 1, "numeracy"),
        q("➕", "", "48 + 27 =", ["65", "75", "74", "85"], 1, "numeracy"),
        q("➖", "", "63 - 28 =", ["45", "25", "35", "31"], 2, "numeracy"),
        q("✖️", "", "4 rows of 6 equals...", ["10", "20", "24", "26"], 2, "numeracy"),
        q("➗", "", "Share 18 equally between 3 children.", ["5", "6", "7", "8"], 1, "numeracy"),
        q("🍕", "", "Which is the smallest fraction?", ["1/2", "1/4", "1/8", "They are equal"], 2, "numeracy"),
        q("🎭", "", "Which opening best builds character and setting?", ["Sam was there.", "Sam tiptoed through the misty garden, clutching his torch.", "There was a place.", "It started."], 1, "writing"),
        q("📣", "", "Which sentence is most persuasive?", ["We have a rule.", "This essential rule keeps everyone safe.", "Rules are words.", "There is a rule somewhere."], 1, "writing")
      ]
    },
    "weekly-competition-2026-04-08": {
      key: "weekly-competition-2026-04-08",
      weekLabel: "Week 2 Competition",
      title: "The Weekly Skills Cup",
      subtitle: "25 fresh mixed challenge questions in 60 minutes",
      weekStart: "2026-04-06T00:00:00+10:00",
      weekEnd: "2026-04-14T23:59:59+10:00",
      minutes: 60,
      passingScore: 18,
      questions: [
        q("📖", "Ella tucked the note into her pocket before anyone else could read it.", "What can you infer about Ella?", ["She wants privacy", "She forgot the note", "She is bored", "She cannot read"], 0, "reading"),
        q("🔎", "Heading: How Seeds Travel. Subheadings: Wind, Water, Animals.", "What kind of text is this most likely to be?", ["A poem", "An information report", "A comic strip", "A shopping list"], 1, "reading"),
        q("📖", "Jay looked at the muddy footprints near the back door and frowned.", "What is Jay probably thinking?", ["Someone came inside", "The floor is too shiny", "The door is painted blue", "The cat is asleep"], 0, "reading"),
        q("🖼️", "Caption: The chick cracks the shell with its egg tooth.", "How does the caption help?", ["It gives extra information about the picture", "It tells the ending of a story", "It shows who is speaking", "It explains a spelling rule"], 0, "reading"),
        q("🎯", "Please put your scraps in the green bin so we can make compost for the garden.", "The main purpose is to...", ["entertain with a joke", "persuade people to compost", "describe a holiday", "retell a legend"], 1, "reading"),
        q("📖", "Nina tapped her pencil three times before opening the envelope.", "What does this suggest about Nina?", ["She feels calm and sleepy", "She is nervous or excited", "She has forgotten the pencil", "She is practising music"], 1, "reading"),
        q("📖", "Diagram labels show orbit, axis, and moon.", "Which text feature is being used?", ["chapters", "labels", "speech bubbles", "rhyming words"], 1, "reading"),
        q("🧱", "", "Which word is a verb?", ["careful", "jumped", "garden", "softly"], 1, "grammar"),
        q("⏰", "", "Which sentence keeps the same tense?", ["I brush my teeth and washed my face.", "I brushed my teeth and wash my face.", "I brushed my teeth and washed my face.", "I brushing my teeth and washed my face."], 2, "grammar"),
        q("🧱", "", "Which word is an adverb?", ["glitter", "happy", "quickly", "teacher"], 2, "grammar"),
        q("🔠", "", "Which sentence has correct capitals and full stops?", ["my sister baked muffins.", "My sister baked muffins.", "My Sister baked muffins.", "my sister baked muffins"], 1, "punctuation"),
        q("💬", "", "Which sentence uses quotation marks correctly?", ["\"Please line up,\" said Mr Lee.", "\"Please line up, said Mr Lee.\"", "Please line up,\" said Mr Lee.", "\"Please\" line up, said Mr Lee."], 0, "punctuation"),
        q("🔤", "", "Choose the correct word: ____ going to finish the puzzle soon.", ["There", "Their", "They're", "Thier"], 2, "spelling"),
        q("🔎", "", "Which word is misspelled?", ["blanket", "holiday", "seperate", "minute"], 2, "spelling"),
        q("🔤", "", "Choose the correct word: Mum said I could have one apple ____ one pear.", ["to", "too", "two", "tu"], 2, "spelling"),
        q("🏯", "", "What is the value of the digit 7 in 3,764?", ["7", "70", "700", "7,000"], 2, "numeracy"),
        q("🧩", "", "Which is the expanded form of 8,205?", ["8,000 + 200 + 5", "8,000 + 20 + 5", "800 + 200 + 5", "8,000 + 2050"], 0, "numeracy"),
        q("🐊", "", "Which number is smallest?", ["6,340", "6,304", "6,430", "6,043"], 3, "numeracy"),
        q("➕", "", "57 + 26 =", ["73", "83", "93", "72"], 1, "numeracy"),
        q("➖", "", "82 - 37 =", ["45", "55", "35", "47"], 0, "numeracy"),
        q("✖️", "", "5 rows of 4 equals...", ["9", "20", "16", "25"], 1, "numeracy"),
        q("➗", "", "Share 24 equally between 4 children.", ["5", "6", "7", "8"], 1, "numeracy"),
        q("🍕", "", "Which fraction is the largest?", ["1/8", "1/6", "1/4", "1/3"], 3, "numeracy"),
        q("🎭", "", "Which sentence best creates a problem in a story?", ["The sun was bright.", "Lena heard the key snap inside the lock.", "The dog had brown fur.", "They walked to school."], 1, "writing"),
        q("📣", "", "Which sentence sounds most persuasive?", ["I like our library.", "Our library is an essential space where every child can learn and dream.", "Libraries have books.", "Some people visit libraries."], 1, "writing")
      ]
    }
  };

  const competitionKey = window.COMPETITION_KEY || window.COMPETITION_KEY;
  const competition = COMPETITIONS[competitionKey];
  if (!competition) return;

  const COMPETITION_API_URL = window.COMPETITION_API_URL || window.COMPETITION_API_URL || "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
  const totalQuestions = competition.questions.length;
  let timerId = null;
  let startedAt = null;
  let kidName = "";
  let finished = false;
  let currentResult = null;
  let currentWinner = null;

  const styles = `
    :root{--paper:#fffdf7;--warm:#fff8f0;--ink:#2d3436;--muted:#687076;--red:#c62828;--pink:#fdecea;--yellow:#ffd93d;--orange:#ff9f1c;--green:#2e7d32;--mint:#6bcb77;--blue:#4d96ff;--purple:#8e44ad}
    *{box-sizing:border-box;margin:0;padding:0}
    html{font-size:17px}
    @media (max-width:500px){html{font-size:16px}}
    body{font-family:'Nunito',sans-serif;background:var(--warm);color:var(--ink);min-height:100vh}
    #competitionApp{max-width:1080px;margin:0 auto;padding:16px}
    .home-link{display:inline-flex;align-items:center;gap:6px;background:var(--mint);color:#fff;text-decoration:none;padding:8px 16px;border-radius:20px;font-family:'Fredoka One',cursive;font-size:13px;margin-bottom:12px}
    .panel{background:var(--paper);border:3px solid var(--pink);border-radius:26px;box-shadow:0 8px 24px rgba(0,0,0,.06);padding:24px}
    .hero{background:linear-gradient(150deg,#1a1a2e 0%,#5f0f40 45%,#9a031e 100%);color:#fff;text-align:center;position:relative;overflow:hidden}
    .hero::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 30%,rgba(255,255,255,.12),transparent 58%)}
    .hero > *{position:relative;z-index:1}
    .hero-badge{display:inline-block;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.2);padding:6px 14px;border-radius:999px;font-family:'Fredoka One',cursive;font-size:12px;margin-bottom:12px}
    .hero-title{font-family:'Fredoka One',cursive;font-size:38px;line-height:1.1;color:var(--yellow)}
    .hero-sub{font-size:18px;color:#ffe9ef;margin-top:8px}
    .hero-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:22px}
    .hero-stat{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.12);padding:14px;border-radius:18px}
    .hero-stat strong{display:block;font-family:'Fredoka One',cursive;font-size:24px;color:#fff}
    .hero-stat span{font-size:12px;color:#ffd9de;text-transform:uppercase;font-weight:800;letter-spacing:.5px}
    .layout{display:grid;grid-template-columns:320px minmax(0,1fr);gap:20px;margin-top:18px}
    .side-card,.main-card{background:var(--paper);border:2px solid #f3dfd2;border-radius:22px;padding:20px;box-shadow:0 6px 18px rgba(0,0,0,.04)}
    .card-title{font-family:'Fredoka One',cursive;font-size:22px;color:var(--ink);margin-bottom:10px}
    .small-copy{font-size:14px;line-height:1.7;color:var(--muted)}
    .week-chip{display:inline-flex;gap:8px;align-items:center;background:#fff4d5;color:#8b5e00;border:1px solid #f5d77f;border-radius:999px;padding:6px 12px;font-weight:800;font-size:12px;margin-bottom:12px}
    .meta-list{display:grid;gap:10px;margin-top:12px}
    .meta-item{background:#fff8f5;border:1px solid #f4dfd1;border-radius:16px;padding:12px}
    .meta-item strong{display:block;font-size:13px;color:#8d4f39;text-transform:uppercase;letter-spacing:.5px}
    .meta-item span{display:block;margin-top:4px;font-size:16px;font-weight:800;color:var(--ink)}
    .field{margin-top:14px}
    .field label{display:block;font-size:13px;font-weight:800;color:#6e4a3c;margin-bottom:6px}
    .text-input{width:100%;padding:12px 14px;border-radius:14px;border:2px solid #f0d7c7;font-size:16px;outline:none}
    .text-input:focus{border-color:var(--orange)}
    .btn{border:none;border-radius:18px;padding:12px 18px;color:#fff;font-family:'Fredoka One',cursive;font-size:15px;cursor:pointer}
    .btn-primary{background:linear-gradient(135deg,var(--red),var(--orange))}
    .btn-secondary{background:linear-gradient(135deg,var(--blue),#1d4ed8)}
    .btn-green{background:linear-gradient(135deg,var(--green),var(--mint))}
    .btn:disabled{background:#c7c7c7;cursor:not-allowed}
    .status{min-height:22px;margin-top:10px;font-size:14px;font-weight:800}
    .status.error{color:#b3261e}
    .status.success{color:#1b5e20}
    .leaderboard{display:grid;gap:10px;margin-top:14px}
    .leader-item{display:grid;grid-template-columns:42px minmax(0,1fr) auto;gap:12px;align-items:center;background:#fff8f6;border:1px solid #f2dfd7;border-radius:16px;padding:12px}
    .leader-item.is-topper{background:linear-gradient(135deg,#fff9d8,#fff2b8);border-color:#f4cf45;box-shadow:0 10px 22px rgba(244,207,69,.18)}
    .rank{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Fredoka One',cursive;background:#ffe6c9;color:#9a4d00}
    .leader-item.is-topper .rank{background:linear-gradient(135deg,#ffd54d,#ffb300);color:#7a4900;position:relative}
    .leader-crown{display:inline-flex;align-items:center;justify-content:center;font-size:15px;margin-right:2px}
    .leader-main{min-width:0}
    .leader-name{font-weight:900;word-break:break-word}
    .leader-meta{font-size:13px;color:var(--muted);margin-top:3px}
    .leader-time{font-size:12px;color:var(--muted);text-align:right;line-height:1.5;white-space:normal;max-width:120px}
    .winner-banner{background:linear-gradient(135deg,#fff5cc,#fff0a8);border:2px solid #f4cf45;border-radius:20px;padding:16px;margin-top:14px}
    .winner-title{font-family:'Fredoka One',cursive;font-size:18px;color:#8b5e00}
    .timer-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;background:#fff1f1;border:2px solid #f4c5c5;border-radius:18px;padding:12px 16px;margin-bottom:16px;position:sticky;top:10px;z-index:5}
    .timer-label{font-weight:900;color:#8c2b2b}
    .timer-value{font-family:'Fredoka One',cursive;font-size:26px;color:var(--red)}
    .timer-fill-wrap{flex:1;height:10px;background:#f5d5d5;border-radius:999px;overflow:hidden}
    .timer-fill{height:100%;background:linear-gradient(90deg,var(--green),var(--yellow),var(--orange),var(--red))}
    .question-grid{display:grid;gap:14px}
    .question-card{background:#fff;border:2px solid #f1e3db;border-radius:20px;padding:18px}
    .q-top{display:flex;align-items:center;gap:10px;margin-bottom:10px}
    .q-number{font-family:'Fredoka One',cursive;font-size:14px;color:#8d4f39}
    .q-domain{font-size:12px;background:#f6ecff;color:#6d28d9;border-radius:999px;padding:5px 10px;font-weight:800;text-transform:capitalize}
    .q-passage{background:#f7f7f7;border-radius:14px;padding:12px;line-height:1.7;font-size:14px;color:#4b5563;margin-bottom:10px}
    .q-text{font-family:'Fredoka One',cursive;font-size:20px;line-height:1.35;margin-bottom:12px}
    .options{display:grid;grid-template-columns:1fr 1fr;gap:10px}
    .option{display:block;cursor:pointer}
    .option input{display:none}
    .option span{display:block;background:#fff;border:2px solid #d9d9d9;border-radius:14px;padding:12px 14px;font-weight:800;min-height:56px}
    .option input:checked + span{border-color:var(--blue);background:#ebf5ff;color:#134a8e}
    .submit-row{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:18px;flex-wrap:wrap}
    .progress-copy{font-size:14px;font-weight:800;color:var(--muted)}
    .result-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:18px}
    .result-box{background:#fff8f3;border:1px solid #efd9c7;border-radius:18px;padding:14px;text-align:center}
    .result-box strong{display:block;font-family:'Fredoka One',cursive;font-size:24px;color:#9a031e}
    .result-box span{font-size:12px;font-weight:800;text-transform:uppercase;color:#8d4f39}
    .certificate-panel{margin-top:18px;padding:18px;border:2px dashed #f4cf45;border-radius:20px;background:#fffdf1}
    .certificate-panel h3{font-family:'Fredoka One',cursive;color:#8b5e00;margin-bottom:8px}
    .note{font-size:13px;color:var(--muted);margin-top:8px}
    @media(max-width:860px){
      .layout,.hero-stats,.result-grid,.options{grid-template-columns:1fr}
      .timer-bar{position:static}
      .hero-title{font-size:28px}
      .leader-item{grid-template-columns:42px minmax(0,1fr);align-items:start}
      .leader-time{grid-column:2;grid-row:2;text-align:left;max-width:none}
    }
  `;

  const styleEl = document.createElement("style");
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  document.body.innerHTML = `
    <div id="competitionApp"><section class="panel hero">
        <div class="hero-badge">🏆 Weekly Competition</div>
        <h1 class="hero-title">${competition.title}</h1>
        <p class="hero-sub">${competition.subtitle}</p>
        <div class="hero-stats">
          <div class="hero-stat"><strong>${totalQuestions}</strong><span>Questions</span></div>
          <div class="hero-stat"><strong>${competition.minutes}</strong><span>Minutes</span></div>
          <div class="hero-stat"><strong>1</strong><span>Winner</span></div>
          <div class="hero-stat"><strong>7 Days</strong><span>Competition Window</span></div>
        </div>
      </section>

      <section class="layout">
        <aside class="side-card">
          <div class="week-chip">📅 ${competition.weekLabel}</div>
          <h2 class="card-title">Register and Start</h2>
          <p class="small-copy">Enter the child’s name, then start the competition. The timer begins immediately and the final score is saved with the time taken.</p>
          <div class="meta-list">
            <div class="meta-item"><strong>Valid From</strong><span id="weekStartLabel"></span></div>
            <div class="meta-item"><strong>Valid Until</strong><span id="weekEndLabel"></span></div>
            <div class="meta-item"><strong>Winner Rule</strong><span>Highest score, then fastest time</span></div>
          </div>
          <div class="field">
            <label for="kidName">Kid Name</label>
            <input class="text-input" id="kidName" maxlength="40" placeholder="Enter the child’s name" />
          </div>
          <div class="field">
            <button class="btn btn-primary" id="startBtn">Start Competition</button>
          </div>
          <div class="status" id="registrationStatus"></div>

          <div class="winner-banner" id="winnerBanner">
            <div class="winner-title">Current Leader</div>
            <div class="small-copy" id="winnerCopy">Leaderboard will appear here once entries are loaded.</div>
          </div>
        </aside>

        <main class="main-card">
          <div id="preflightView">
            <h2 class="card-title">Competition Rules</h2>
            <p class="small-copy">This weekly challenge uses a full 25-question mixed paper. Once the timer begins, the child should work steadily and submit before the hour ends.</p>
            <div class="meta-list">
              <div class="meta-item"><strong>Question Mix</strong><span>Reading, writing, conventions, and numeracy</span></div>
              <div class="meta-item"><strong>Scoring</strong><span>Automatic scoring after submission</span></div>
            <div class="meta-item"><strong>Certificate</strong><span>Winner can download a certificate</span></div>
            </div>
            <div class="leaderboard" id="leaderboard"></div>
            <div class="certificate-panel" id="claimPanel" style="display:none;">
              <h3>Claim Winner Certificate</h3>
              <p class="small-copy" id="claimCopy">After the competition closes, the final winner can enter their name and download the certificate.</p>
              <div class="field">
                <label for="claimWinnerName">Winner Name</label>
                <input class="text-input" id="claimWinnerName" maxlength="40" placeholder="Enter the winner's name" />
              </div>
              <div class="field">
                <button class="btn btn-green" id="claimCertificateBtn" type="button">Claim Certificate</button>
              </div>
              <div class="status" id="claimStatus"></div>
            </div>
          </div>

          <div id="quizView" style="display:none;">
            <div class="timer-bar">
              <div>
                <div class="timer-label">Competition Timer</div>
                <div class="timer-value" id="timerValue">60:00</div>
              </div>
              <div class="timer-fill-wrap"><div class="timer-fill" id="timerFill" style="width:100%;"></div></div>
              <button class="btn btn-secondary" id="submitBtn">Submit Answers</button>
            </div>
            <div class="progress-copy" id="answerProgress">0 of ${totalQuestions} answered</div>
            <div class="question-grid" id="questionGrid"></div>
          </div>

          <div id="resultView" style="display:none;">
            <h2 class="card-title">Competition Result</h2>
            <p class="small-copy" id="resultIntro"></p>
            <div class="result-grid" id="resultGrid"></div>
            <div class="winner-banner">
              <div class="winner-title">Winner Board</div>
              <div class="small-copy" id="resultWinnerCopy"></div>
            </div>
            <div class="certificate-panel" id="certificatePanel" style="display:none;">
              <h3>Winner Certificate</h3>
              <p class="small-copy">This result is currently the winning entry for the week. Download the certificate below.</p>
              <button class="btn btn-green" id="downloadCertificateBtn">Download Certificate</button>
              <div class="note">If the leaderboard changes later in the week, the newest winner should download the latest certificate.</div>
            </div>
          </div>
        </main>
      </section>
    </div>
  `;

  if (typeof window.initSlimTopbar === "function") {
    window.initSlimTopbar();
  }

  const kidNameInput = document.getElementById("kidName");
  const startBtn = document.getElementById("startBtn");
  const registrationStatus = document.getElementById("registrationStatus");
  const questionGrid = document.getElementById("questionGrid");
  const answerProgress = document.getElementById("answerProgress");
  const quizView = document.getElementById("quizView");
  const preflightView = document.getElementById("preflightView");
  const resultView = document.getElementById("resultView");
  const leaderboardEl = document.getElementById("leaderboard");
  const winnerCopy = document.getElementById("winnerCopy");
  const resultWinnerCopy = document.getElementById("resultWinnerCopy");
  const timerValue = document.getElementById("timerValue");
  const timerFill = document.getElementById("timerFill");
  const submitBtn = document.getElementById("submitBtn");
  const resultIntro = document.getElementById("resultIntro");
  const resultGrid = document.getElementById("resultGrid");
  const certificatePanel = document.getElementById("certificatePanel");
  const downloadCertificateBtn = document.getElementById("downloadCertificateBtn");
  const claimPanel = document.getElementById("claimPanel");
  const claimCopy = document.getElementById("claimCopy");
  const claimWinnerName = document.getElementById("claimWinnerName");
  const claimCertificateBtn = document.getElementById("claimCertificateBtn");
  const claimStatus = document.getElementById("claimStatus");
  const weekStartLabel = document.getElementById("weekStartLabel");
  const weekEndLabel = document.getElementById("weekEndLabel");
  let latestWinnerEntryId = null;

  function formatDate(value) {
    return new Date(value).toLocaleString("en-AU", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  }

  function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${String(secs).padStart(2, "0")}s`;
  }

  function formatCountdown(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function isCompetitionActive() {
    const now = Date.now();
    return now >= new Date(competition.weekStart).getTime() && now <= new Date(competition.weekEnd).getTime();
  }

  function isCompetitionClosed() {
    return Date.now() > new Date(competition.weekEnd).getTime();
  }

  function setRegistrationStatus(message, type) {
    registrationStatus.textContent = message;
    registrationStatus.className = `status ${type || ""}`.trim();
  }

  function setClaimStatus(message, type) {
    if (!claimStatus) return;
    claimStatus.textContent = message;
    claimStatus.className = `status ${type || ""}`.trim();
  }

  function getCheckedCount() {
    let count = 0;
    competition.questions.forEach(function (_, index) {
      if (document.querySelector(`input[name="q-${index}"]:checked`)) {
        count += 1;
      }
    });
    return count;
  }

  function updateAnswerProgress() {
    answerProgress.textContent = `${getCheckedCount()} of ${totalQuestions} answered`;
  }

  function renderQuestions() {
    questionGrid.innerHTML = competition.questions.map(function (item, index) {
      const passageHtml = item.passage ? `<div class="q-passage">${item.passage}</div>` : "";
      const optionsHtml = item.options.map(function (option, optionIndex) {
        return `
          <label class="option">
            <input type="radio" name="q-${index}" value="${optionIndex}" />
            <span>${String.fromCharCode(65 + optionIndex)}. ${option}</span>
          </label>
        `;
      }).join("");

      return `
        <article class="question-card">
          <div class="q-top">
            <div style="font-size:28px;">${item.emoji}</div>
            <div class="q-number">Question ${index + 1}</div>
            <div class="q-domain">${item.domain}</div>
          </div>
          ${passageHtml}
          <div class="q-text">${item.question}</div>
          <div class="options">${optionsHtml}</div>
        </article>
      `;
    }).join("");

    questionGrid.addEventListener("change", updateAnswerProgress);
    updateAnswerProgress();
  }

  function updateTimer() {
    const totalSeconds = competition.minutes * 60;
    const elapsed = Math.max(0, Math.floor((Date.now() - startedAt) / 1000));
    const remaining = Math.max(0, totalSeconds - elapsed);
    timerValue.textContent = formatCountdown(remaining);
    timerFill.style.width = `${Math.max(0, (remaining / totalSeconds) * 100)}%`;

    if (remaining <= 0) {
      clearInterval(timerId);
      finalizeCompetition(true);
    }
  }

  function scoreSubmission() {
    let correct = 0;
    competition.questions.forEach(function (item, index) {
      const selected = document.querySelector(`input[name="q-${index}"]:checked`);
      if (selected && Number(selected.value) === item.answer) {
        correct += 1;
      }
    });

    const endedAt = Date.now();
    const durationSeconds = Math.max(1, Math.floor((endedAt - startedAt) / 1000));

    return {
      kidName: kidName,
      correctAnswers: correct,
      totalQuestions: totalQuestions,
      startedAt: new Date(startedAt).toISOString(),
      endedAt: new Date(endedAt).toISOString(),
      durationSeconds: durationSeconds
    };
  }

  function getApiConfigured() {
    return !!(
      COMPETITION_API_URL &&
      COMPETITION_API_URL.trim() &&
      COMPETITION_API_URL.indexOf("PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE") === -1
    );
  }

  function loadJsonp(url) {
    return new Promise(function (resolve, reject) {
      const callbackName = `npCompetitionJsonp_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
      const separator = url.indexOf("?") === -1 ? "?" : "&";
      const script = document.createElement("script");
      let settled = false;

      window[callbackName] = function (payload) {
        settled = true;
        cleanup();
        resolve(payload);
      };

      function cleanup() {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        delete window[callbackName];
      }

      script.onerror = function () {
        if (settled) return;
        cleanup();
        reject(new Error("JSONP request failed."));
      };

      script.src = `${url}${separator}callback=${callbackName}`;
      document.body.appendChild(script);

      setTimeout(function () {
        if (settled) return;
        cleanup();
        reject(new Error("JSONP request timed out."));
      }, 12000);
    });
  }

  async function fetchLeaderboard() {
    if (!getApiConfigured()) {
      leaderboardEl.innerHTML = `<div class="small-copy">Connect a Google Apps Script competition API to load shared leaderboard entries.</div>`;
      winnerCopy.textContent = "API not connected yet. Winner will appear here after the leaderboard is linked.";
      return null;
    }

    try {
      return await loadJsonp(`${COMPETITION_API_URL}?action=leaderboard&competitionKey=${encodeURIComponent(competition.key)}`);
    } catch (error) {
      leaderboardEl.innerHTML = `<div class="small-copy">Leaderboard could not be loaded right now.</div>`;
      winnerCopy.textContent = "Leaderboard unavailable at the moment.";
      return null;
    }
  }

  function renderLeaderboard(payload) {
    const leaderboard = payload && Array.isArray(payload.leaderboard) ? payload.leaderboard : [];
    const winner = payload && payload.winner ? payload.winner : null;
    latestWinnerEntryId = winner && winner.entryId ? winner.entryId : null;
    currentWinner = winner || null;

    if (!leaderboard.length) {
      leaderboardEl.innerHTML = `<div class="small-copy">No entries yet this week. The first player can set the pace.</div>`;
    } else {
      leaderboardEl.innerHTML = leaderboard.slice(0, 8).map(function (entry, index) {
        const isTopper = index === 0;
        return `
          <div class="leader-item${isTopper ? ' is-topper' : ''}">
            <div class="rank">${isTopper ? '<span class="leader-crown">👑</span>' : ''}${index + 1}</div>
            <div class="leader-main">
              <div class="leader-name">${entry.kidName}</div>
              <div class="leader-meta">${entry.correctAnswers}/${entry.totalQuestions} correct · ${formatDuration(Number(entry.durationSeconds || 0))}</div>
            </div>
            <div class="leader-time">${formatDate(entry.submittedAt || entry.endedAt)}</div>
          </div>
        `;
      }).join("");
    }

    if (winner) {
      winnerCopy.textContent = isCompetitionClosed()
        ? `${winner.kidName} finished as the weekly winner with ${winner.correctAnswers}/${winner.totalQuestions} correct in ${formatDuration(Number(winner.durationSeconds || 0))}.`
        : `${winner.kidName} is leading with ${winner.correctAnswers}/${winner.totalQuestions} correct in ${formatDuration(Number(winner.durationSeconds || 0))}.`;
    } else {
      winnerCopy.textContent = isCompetitionClosed()
        ? "The competition has ended, but no winner could be confirmed yet."
        : "No winner yet. The first completed entry will lead the board.";
    }

    updateClaimPanel();
  }

  function updateClaimPanel() {
    if (!claimPanel) return;

    if (!isCompetitionClosed()) {
      claimPanel.style.display = "none";
      setClaimStatus("");
      return;
    }

    claimPanel.style.display = "block";

    if (currentWinner) {
      claimCopy.textContent = `The competition is now closed. ${currentWinner.kidName} finished as the final winner. Enter the winner name exactly to download the certificate.`;
    } else {
      claimCopy.textContent = "The competition is closed, but the final winner could not be loaded yet. Please refresh again later.";
    }
  }

  async function submitToApi(result) {
    if (!getApiConfigured()) {
      return {
        success: true,
        leaderboard: [{
          entryId: "local-preview-entry",
          kidName: result.kidName,
          correctAnswers: result.correctAnswers,
          totalQuestions: result.totalQuestions,
          durationSeconds: result.durationSeconds,
          submittedAt: result.endedAt
        }],
        winner: {
          entryId: "local-preview-entry",
          kidName: result.kidName,
          correctAnswers: result.correctAnswers,
          totalQuestions: result.totalQuestions,
          durationSeconds: result.durationSeconds
        },
        isWinner: true,
        message: "Local preview result only. Connect the competition API for shared weekly leaderboards."
      };
    }

    const body = new URLSearchParams({
        action: "submitCompetition",
        competitionKey: competition.key,
        competitionTitle: competition.title,
        weekStart: competition.weekStart,
        weekEnd: competition.weekEnd,
        kidName: result.kidName,
        startedAt: result.startedAt,
        endedAt: result.endedAt,
        durationSeconds: String(result.durationSeconds),
        correctAnswers: String(result.correctAnswers),
        totalQuestions: String(result.totalQuestions)
    });

    await fetch(COMPETITION_API_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: body.toString()
    });

    await new Promise(function (resolve) {
      setTimeout(resolve, 1500);
    });

    const leaderboardPayload = await fetchLeaderboard();
    if (!leaderboardPayload) {
      throw new Error("Competition result was submitted, but the leaderboard refresh failed.");
    }

    let entryId = null;
    const leaderboard = Array.isArray(leaderboardPayload.leaderboard) ? leaderboardPayload.leaderboard : [];
    leaderboard.forEach(function (entry) {
      if (
        entry.kidName === result.kidName &&
        Number(entry.correctAnswers) === result.correctAnswers &&
        Number(entry.totalQuestions) === result.totalQuestions &&
        Number(entry.durationSeconds) === result.durationSeconds &&
        !entryId
      ) {
        entryId = entry.entryId || null;
      }
    });

    return {
      success: true,
      leaderboard: leaderboard,
      winner: leaderboardPayload.winner || null,
      entryId: entryId,
      isWinner: !!(leaderboardPayload.winner && entryId && leaderboardPayload.winner.entryId === entryId)
    };
  }

  async function finalizeCompetition(timeExpired) {
    if (finished) return;
    finished = true;
    clearInterval(timerId);
    submitBtn.disabled = true;

    const result = scoreSubmission();
    currentResult = result;

    quizView.style.display = "none";
    resultView.style.display = "block";
    resultIntro.textContent = timeExpired
      ? `${result.kidName} reached the end of the one-hour competition window.`
      : `${result.kidName} completed the weekly competition.`;

    resultGrid.innerHTML = `
      <div class="result-box"><strong>${result.correctAnswers}</strong><span>Correct</span></div>
      <div class="result-box"><strong>${result.totalQuestions}</strong><span>Total Questions</span></div>
      <div class="result-box"><strong>${formatDuration(result.durationSeconds)}</strong><span>Time Taken</span></div>
      <div class="result-box"><strong>${result.correctAnswers >= competition.passingScore ? "Strong Run" : "Keep Practising"}</strong><span>Performance</span></div>
    `;

    try {
      const payload = await submitToApi(result);
      renderLeaderboard(payload);
      resultWinnerCopy.textContent = payload.winner
        ? (
            isCompetitionClosed()
              ? `${payload.winner.kidName} finished as the weekly winner with ${payload.winner.correctAnswers}/${payload.winner.totalQuestions} correct in ${formatDuration(Number(payload.winner.durationSeconds || 0))}.`
              : `${payload.winner.kidName} is the current winner with ${payload.winner.correctAnswers}/${payload.winner.totalQuestions} correct in ${formatDuration(Number(payload.winner.durationSeconds || 0))}. If this result stays on top after ${formatDate(competition.weekEnd)}, the winner can claim the certificate.`
          )
        : "Winner not available yet.";
      certificatePanel.style.display = payload.isWinner && isCompetitionClosed() ? "block" : "none";
    } catch (error) {
      resultWinnerCopy.textContent = `${result.kidName} scored ${result.correctAnswers}/${result.totalQuestions} in ${formatDuration(result.durationSeconds)}. The shared leaderboard could not be refreshed right now, so please check that the Google Apps Script deployment supports JSONP leaderboard loading and form-style competition submissions.`;
      certificatePanel.style.display = "none";
    }
  }

  function startCompetition() {
    kidName = kidNameInput.value.trim();
    if (!kidName) {
      setRegistrationStatus("Enter the child’s name before starting.", "error");
      return;
    }

    if (!isCompetitionActive()) {
      setRegistrationStatus("This weekly competition is outside its 7-day window.", "error");
      return;
    }

    setRegistrationStatus("");
    startedAt = Date.now();
    preflightView.style.display = "none";
    quizView.style.display = "block";
    startBtn.disabled = true;
    kidNameInput.disabled = true;
    renderQuestions();
    updateTimer();
    timerId = setInterval(updateTimer, 1000);
  }

  function buildCertificate(entry) {
    const certificateEntry = entry || currentWinner || currentResult;
    if (!certificateEntry) return;
    const startDate = new Date(competition.weekStart);
    const endDate = new Date(competition.weekEnd);
    const weekValue = `${startDate.getDate()}-${endDate.getDate()} ${startDate.toLocaleDateString("en-AU", { month: "short" })}`;

    const canvas = document.createElement("canvas");
    canvas.width = 1600;
    canvas.height = 1100;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#fffaf1");
    gradient.addColorStop(0.55, "#fff2c6");
    gradient.addColorStop(1, "#ffe3b1");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(255,255,255,0.45)";
    [
      [170, 170, 115],
      [1380, 185, 95],
      [1440, 900, 130],
      [220, 900, 100],
      [810, 120, 140]
    ].forEach(function (bubble) {
      ctx.beginPath();
      ctx.arc(bubble[0], bubble[1], bubble[2], 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.strokeStyle = "#d49a1c";
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.roundRect(36, 36, canvas.width - 72, canvas.height - 72, 34);
    ctx.stroke();

    ctx.strokeStyle = "rgba(133, 74, 3, 0.55)";
    ctx.lineWidth = 3;
    ctx.setLineDash([16, 10]);
    ctx.beginPath();
    ctx.roundRect(58, 58, canvas.width - 116, canvas.height - 116, 26);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.textAlign = "center";

    function drawStar(x, y, r, fill) {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      for (let i = 0; i < 10; i += 1) {
        const angle = -Math.PI / 2 + (i * Math.PI) / 5;
        const radius = i % 2 === 0 ? r : r * 0.45;
        const sx = Math.cos(angle) * radius;
        const sy = Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.restore();
    }

    drawStar(120, 120, 22, "#71d16e");
    drawStar(canvas.width - 120, 120, 22, "#71d16e");
    drawStar(130, canvas.height - 130, 24, "#71d16e");
    drawStar(canvas.width - 130, canvas.height - 130, 24, "#71d16e");

    ctx.fillStyle = "#1d7f3c";
    ctx.beginPath();
    ctx.roundRect(canvas.width / 2 - 320, 86, 640, 66, 33);
    ctx.fill();

    ctx.fillStyle = "#ffd34d";
    ctx.font = "bold 36px Nunito";
    ctx.fillText("WEEKLY CHAMPION AWARD", canvas.width / 2, 130);

    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#ead8b1";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(canvas.width / 2 - 470, 178, 940, 620, 36);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f5b700";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 210, 36, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff7d1";
    ctx.font = "bold 42px Nunito";
    ctx.fillText("👑", canvas.width / 2, 224);

    ctx.fillStyle = "#4d5966";
    ctx.font = "bold 28px Nunito";
    ctx.fillText("This certificate proudly celebrates", canvas.width / 2, 290);

    ctx.fillStyle = "#1f4b99";
    ctx.font = "bold 88px Nunito";
    ctx.fillText(certificateEntry.kidName, canvas.width / 2, 420);

    ctx.strokeStyle = "#2ec4b6";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 280, 446);
    ctx.lineTo(canvas.width / 2 + 280, 446);
    ctx.stroke();

    ctx.fillStyle = "#2d3436";
    ctx.font = "bold 38px Nunito";
    ctx.fillText("for outstanding focus, effort, and problem solving", canvas.width / 2, 505);

    ctx.fillStyle = "#ffefe1";
    ctx.beginPath();
    ctx.roundRect(canvas.width / 2 - 290, 548, 580, 68, 22);
    ctx.fill();
    ctx.fillStyle = "#9a031e";
    ctx.font = "bold 34px Nunito";
    ctx.fillText(competition.title, canvas.width / 2, 593);

    const statY = 636;
    const statWidth = 250;
    const statGap = 28;
    const statStart = canvas.width / 2 - ((statWidth * 3 + statGap * 2) / 2);
    const statCards = [
      { label: "Score", value: `${certificateEntry.correctAnswers}/${certificateEntry.totalQuestions}`, fill: "#e3f8f3", color: "#167b65" },
      { label: "Time Taken", value: formatDuration(Number(certificateEntry.durationSeconds || 0)), fill: "#eef2ff", color: "#4355d0" },
      { label: "Week", value: weekValue, fill: "#fff2d8", color: "#ba6a00" }
    ];

    statCards.forEach(function (card, index) {
      const x = statStart + index * (statWidth + statGap);
      ctx.fillStyle = card.fill;
      ctx.beginPath();
      ctx.roundRect(x, statY, statWidth, 118, 22);
      ctx.fill();
      ctx.fillStyle = card.color;
      ctx.font = "bold 24px Nunito";
      ctx.fillText(card.label, x + statWidth / 2, statY + 38);
      ctx.font = "bold 34px Nunito";
      ctx.fillText(card.value, x + statWidth / 2, statY + 82);
    });

    ctx.fillStyle = "#5c4b51";
    ctx.font = "30px Nunito";
    ctx.fillText(
      `Competition Week: ${formatDate(competition.weekStart)} to ${formatDate(competition.weekEnd)}`,
      canvas.width / 2,
      828
    );

    ctx.fillStyle = "rgba(255,255,255,0.76)";
    ctx.beginPath();
    ctx.roundRect(canvas.width / 2 - 360, 844, 720, 144, 28);
    ctx.fill();
    ctx.strokeStyle = "#ecdab2";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#9a031e";
    ctx.font = "bold 28px Nunito";
    ctx.fillText("Presented by fivetofifteen.com", canvas.width / 2, 878);

    const qr = new Image();
    qr.crossOrigin = "anonymous";
    qr.src = "https://quickchart.io/qr?text=" + encodeURIComponent("https://fivetofifteen.com/") + "&size=180";

    const logo = new Image();
    logo.crossOrigin = "anonymous";
    logo.src = "https://fivetofifteen.com/fivetofifteen-logo.svg";

    function drawLogoCard() {
      const logoWidth = 210;
      const logoHeight = 72;
      const logoX = canvas.width / 2 - logoWidth / 2;
      const logoY = 888;
      if (logo.complete && logo.naturalWidth > 0) {
        ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
      } else {
        ctx.fillStyle = "#1d7f3c";
        ctx.font = "bold 26px Nunito";
        ctx.fillText("FiveToFifteen", canvas.width / 2, 922);
        ctx.fillStyle = "#6c757d";
        ctx.font = "18px Nunito";
        ctx.fillText("Kids Learning App", canvas.width / 2, 948);
      }
      ctx.fillStyle = "#8a6d3b";
      ctx.font = "19px Nunito";
      ctx.fillText("Keep shining, keep practising, and keep reaching higher.", canvas.width / 2, 972);
    }

    function drawQrCard() {
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#e0cfab";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(canvas.width - 214, 86, 122, 132, 20);
      ctx.fill();
      ctx.stroke();
      if (qr.complete && qr.naturalWidth > 0) {
        ctx.drawImage(qr, canvas.width - 200, 98, 94, 94);
      } else {
        ctx.fillStyle = "#fff5d6";
        ctx.fillRect(canvas.width - 200, 98, 94, 94);
        ctx.fillStyle = "#8b5e00";
        ctx.font = "bold 14px Nunito";
        ctx.fillText("QR loading...", canvas.width - 153, 150);
      }
      ctx.fillStyle = "#8b5e00";
      ctx.font = "bold 14px Nunito";
      ctx.fillText("Scan to visit", canvas.width - 153, 212);
    }

    let saved = false;
    function finishDownload() {
      if (saved) return;
      saved = true;
      drawLogoCard();
      drawQrCard();
      const link = document.createElement("a");
      link.download = `${competition.key}-winner-certificate.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }

    let pendingAssets = 2;
    function settleAsset() {
      pendingAssets -= 1;
      if (pendingAssets <= 0) finishDownload();
    }
    qr.onload = settleAsset;
    qr.onerror = settleAsset;
    logo.onload = settleAsset;
    logo.onerror = settleAsset;
    setTimeout(finishDownload, 1500);
  }

  weekStartLabel.textContent = formatDate(competition.weekStart);
  weekEndLabel.textContent = formatDate(competition.weekEnd);
  startBtn.addEventListener("click", startCompetition);
  submitBtn.addEventListener("click", function () {
    finalizeCompetition(false);
  });
  downloadCertificateBtn.addEventListener("click", function () {
    buildCertificate(currentResult);
  });
  claimCertificateBtn.addEventListener("click", function () {
    if (!isCompetitionClosed()) {
      setClaimStatus("The certificate can only be claimed after the competition has ended.", "error");
      return;
    }

    if (!currentWinner) {
      setClaimStatus("The final winner is not available yet. Please refresh and try again.", "error");
      return;
    }

    const enteredName = (claimWinnerName.value || "").trim().toLowerCase();
    const winnerName = String(currentWinner.kidName || "").trim().toLowerCase();

    if (!enteredName) {
      setClaimStatus("Enter the winner's name to claim the certificate.", "error");
      return;
    }

    if (enteredName !== winnerName) {
      setClaimStatus("That name does not match the final winner.", "error");
      return;
    }

    setClaimStatus("Certificate download starting...", "success");
    buildCertificate(currentWinner);
  });

  fetchLeaderboard().then(function (payload) {
    if (payload) {
      renderLeaderboard(payload);
    } else {
      updateClaimPanel();
    }
  });
})();
