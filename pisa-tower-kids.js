const pages = Array.from(document.querySelectorAll('.page'));
const pageDots = document.getElementById('pageDots');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentPage = 0;
const visited = new Set([0]);

for (let i = 0; i < pages.length; i++) {
  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.onclick = () => goToPage(i);
  pageDots.appendChild(dot);
}

function updateNav() {
  pages.forEach((page, index) => page.classList.toggle('active', index === currentPage));
  const dots = [...pageDots.children];
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentPage);
    dot.classList.toggle('visited', visited.has(index) && index !== currentPage);
  });
  progressFill.style.width = ((currentPage + 1) / pages.length * 100) + '%';
  progressText.textContent = `Page ${currentPage + 1} of ${pages.length}`;
  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage === pages.length - 1;
}

function goToPage(n) {
  if (n < 0 || n >= pages.length) return;
  if (n === 9 && !quizPassed) {
    alert('You need to pass the final quiz with at least 5/6 to unlock the certificate! 🌟');
    return;
  }
  currentPage = n;
  visited.add(n);
  updateNav();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function changePage(dir) {
  goToPage(currentPage + dir);
}

function checkMini(btn, group, correct, feedbackId) {
  const container = btn.closest('.quiz-bubble');
  const buttons = [...container.querySelectorAll('.q-opt')];
  if (buttons.some((b) => b.classList.contains('correct') || b.classList.contains('wrong'))) return;
  const selected = btn.textContent.trim().charAt(0);
  buttons.forEach((b) => {
    const letter = b.textContent.trim().charAt(0);
    if (letter === correct) b.classList.add('correct');
    else if (b === btn) b.classList.add('wrong');
  });
  const fb = document.getElementById(feedbackId);
  fb.textContent = selected === correct ? 'Correct! Great job! 🌟' : 'Nice try! The correct answer is ' + correct + '.';
}

window.changePage = changePage;
window.goToPage = goToPage;
window.checkMini = checkMini;

const finalQuestions = [
  { emoji: '📍', question: 'In which country is the Leaning Tower of Pisa?', options: ['Italy', 'India', 'Brazil', 'Japan'], answer: 0 },
  { emoji: '🪨', question: 'Why did the tower begin to lean?', options: ['It was pushed by a storm', 'The ground below it was soft', 'It was built on wheels', 'It was made of wood'], answer: 1 },
  { emoji: '🔔', question: 'What kind of building is the tower?', options: ['A bell tower', 'A bridge', 'A palace', 'A lighthouse'], answer: 0 },
  { emoji: '🛠️', question: 'What did engineers do to help save the tower?', options: ['Painted it brighter', 'Added a second tower', 'Strengthened the ground', 'Moved it to a new city'], answer: 2 },
  { emoji: '📷', question: 'What do many visitors like to do at the tower?', options: ['Swim around it', 'Take funny leaning photos', 'Fly kites from it', 'Camp on the roof'], answer: 1 },
  { emoji: '💛', question: 'Why is the tower special to so many people?', options: ['It is unusual and full of history', 'It is made from chocolate', 'It is underwater', 'It changes colour every day'], answer: 0 }
];

let qIdx = 0;
let score = 0;
let answered = false;
let quizPassed = false;

function resetQuiz() {
  qIdx = 0;
  score = 0;
  answered = false;
  quizPassed = false;
  document.getElementById('quizActive').style.display = 'block';
  document.getElementById('quizPass').style.display = 'none';
  document.getElementById('quizFail').style.display = 'none';
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const q = finalQuestions[qIdx];
  document.getElementById('qCounter').textContent = `Question ${qIdx + 1} of ${finalQuestions.length}`;
  document.getElementById('qScore').textContent = `Score: ${score}`;
  document.getElementById('qEmoji').textContent = q.emoji;
  document.getElementById('qText').textContent = q.question;
  document.getElementById('qResultMsg').textContent = '';
  document.getElementById('nextQBtn').style.display = 'none';
  answered = false;
  const opts = document.getElementById('fquizOptions');
  opts.innerHTML = '';
  q.options.forEach((opt, index) => {
    const btn = document.createElement('button');
    btn.className = 'fq-opt';
    btn.textContent = String.fromCharCode(65 + index) + '. ' + opt;
    btn.onclick = () => answerQuiz(index, btn);
    opts.appendChild(btn);
  });
}

function answerQuiz(index) {
  if (answered) return;
  answered = true;
  const q = finalQuestions[qIdx];
  const buttons = [...document.querySelectorAll('.fq-opt')];
  buttons.forEach((b, i) => {
    if (i === q.answer) b.classList.add('correct');
    else if (i === index) b.classList.add('wrong');
    b.classList.add('locked');
  });
  if (index === q.answer) {
    score++;
    document.getElementById('qResultMsg').textContent = 'Correct! You are a Pisa pro! 🏛️';
  } else {
    document.getElementById('qResultMsg').textContent = 'Good try! Keep going.';
  }
  document.getElementById('qScore').textContent = `Score: ${score}`;
  document.getElementById('nextQBtn').style.display = 'block';
  document.getElementById('nextQBtn').textContent = qIdx === finalQuestions.length - 1 ? 'See Result →' : 'Next Question →';
}

function nextQuizQuestion() {
  if (qIdx < finalQuestions.length - 1) {
    qIdx++;
    renderQuizQuestion();
  } else {
    showQuizResult();
  }
}

function showQuizResult() {
  document.getElementById('quizActive').style.display = 'none';
  if (score >= 5) {
    quizPassed = true;
    document.getElementById('passScore').textContent = `${score}/${finalQuestions.length}`;
    document.getElementById('quizPass').style.display = 'block';
  } else {
    document.getElementById('failScore').textContent = `${score}/${finalQuestions.length}`;
    document.getElementById('quizFail').style.display = 'block';
  }
}

window.nextQuizQuestion = nextQuizQuestion;
window.resetQuiz = resetQuiz;

const certCanvas = document.getElementById('cert');
const ctx = certCanvas.getContext('2d');
const qrImage = new Image();
let qrReady = false;
qrImage.crossOrigin = 'anonymous';
qrImage.onload = () => { qrReady = true; drawCert(); };
qrImage.src = 'https://quickchart.io/qr?text=' + encodeURIComponent('https://fivetofifteen.com/') + '&size=180';

function drawCert() {
  const name = document.getElementById('certName').value.trim() || 'Little Explorer';
  const W = certCanvas.width;
  const H = certCanvas.height;
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, '#fff7dc');
  grad.addColorStop(1, '#ffe0bf');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = '#c76b3c';
  ctx.lineWidth = 18;
  ctx.strokeRect(34, 34, W - 68, H - 68);
  ctx.strokeStyle = '#f4c95d';
  ctx.lineWidth = 6;
  ctx.strokeRect(64, 64, W - 128, H - 128);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#8a4d19';
  ctx.font = 'bold 62px Nunito';
  ctx.fillText('Certificate of Exploration', W / 2, 170);
  ctx.font = 'bold 84px Nunito';
  ctx.fillStyle = '#2d3436';
  ctx.fillText(name, W / 2, 325);
  ctx.font = 'bold 38px Nunito';
  ctx.fillStyle = '#c76b3c';
  ctx.fillText('has completed The Leaning Tower of Pisa adventure', W / 2, 420);
  ctx.font = '32px Nunito';
  ctx.fillStyle = '#555';
  ctx.fillText('and passed the final Pisa Tower Explorer Challenge!', W / 2, 485);
  ctx.font = '110px serif';
  ctx.fillText('🏛️', W / 2, 640);
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#d9c9a3';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(W - 170, 70, 110, 110, 16);
  ctx.fill();
  ctx.stroke();
  if (qrReady) {
    ctx.drawImage(qrImage, W - 160, 60, 90, 90);
  } else {
    ctx.fillStyle = '#f9f4ea';
    ctx.fillRect(W - 160, 60, 90, 90);
    ctx.fillStyle = '#8a4d19';
    ctx.font = 'bold 12px Nunito';
    ctx.fillText('QR', W - 115, 132);
  }
  ctx.fillStyle = '#8a4d19';
  ctx.font = 'bold 16px Nunito';
  ctx.fillText('Scan to visit', W - 115, 180);
  ctx.font = '28px Nunito';
  ctx.fillText('Presented by fivetofifteen.com', W / 2, 760);
  ctx.fillText(new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' }), W / 2, 810);
}

document.getElementById('certName').addEventListener('input', drawCert);

function downloadCert() {
  drawCert();
  const link = document.createElement('a');
  link.download = 'pisa-tower-explorer-certificate.png';
  link.href = certCanvas.toDataURL('image/png');
  link.click();
}

function printCert() {
  drawCert();
  const dataUrl = certCanvas.toDataURL('image/png');
  const w = window.open('', '_blank');
  const html = [
    '<!DOCTYPE html>',
    '<html><head><title>Print Certificate</title>',
    '<style>body{margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#fff}img{max-width:100%;height:auto}</style>',
    '</head><body>',
    '<img src="' + dataUrl + '" alt="Certificate">',
    '</body></html>'
  ].join('');
  w.document.write(html);
  w.document.close();
  w.onload = () => { w.focus(); w.print(); };
}

window.downloadCert = downloadCert;
window.printCert = printCert;

let speech = null;

function stopReadAloud() {
  speechSynthesis.cancel();
  document.getElementById('ttsStop').style.display = 'none';
}

function toggleReadAloud() {
  if (speechSynthesis.speaking) {
    stopReadAloud();
    return;
  }
  const active = pages[currentPage];
  const text = Array.from(active.querySelectorAll('[data-tts], .story-text, .cover-title, .cover-sub, .cover-tagline, .quiz-q-text, .result-msg'))
    .map((el) => el.innerText)
    .join(' ');
  if (!text.trim()) return;
  speech = new SpeechSynthesisUtterance(text);
  speech.rate = 0.95;
  speech.pitch = 1.02;
  speech.onend = () => {
    document.getElementById('ttsStop').style.display = 'none';
  };
  document.getElementById('ttsStop').style.display = 'inline-flex';
  speechSynthesis.speak(speech);
}

window.toggleReadAloud = toggleReadAloud;
window.stopReadAloud = stopReadAloud;

drawCert();
resetQuiz();
updateNav();
