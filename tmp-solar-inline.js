
/* ===== STARFIELD ===== */
const sf=document.getElementById('starfield');
for(let i=0;i<160;i++){
  const s=document.createElement('div');
  s.className='star-dot';
  const sz=Math.random()*2.5+0.5;
  s.style.cssText=`width:${sz}px;height:${sz}px;left:${Math.random()*100}%;top:${Math.random()*100}%;--dur:${Math.random()*4+2}s;--delay:${Math.random()*4}s;opacity:${Math.random()*.6+.2}`;
  sf.appendChild(s);
}

/* ===== NAVIGATION ===== */
const TOTAL=17;
let currentPage=0;
const pages=document.querySelectorAll('.page');
const prevBtn=document.getElementById('prevBtn');
const nextBtn=document.getElementById('nextBtn');
const dotsContainer=document.getElementById('pageDots');

for(let i=0;i<=TOTAL;i++){
  const d=document.createElement('div');
  d.className='dot'+(i===0?' active':'');
  d.onclick=()=>goToPage(i);
  dotsContainer.appendChild(d);
}

function goToPage(n){
  if(n<0||n>TOTAL)return;
  if(n===17&&!quizPassed){alert('You need to pass the quiz with at least 5/6 to get your certificate! 🌟');return;}
  pages[currentPage].classList.remove('active');
  currentPage=n;
  pages[currentPage].classList.add('active');
  prevBtn.disabled=currentPage===0;
  nextBtn.disabled=currentPage===TOTAL;
  document.getElementById('progressFill').style.width=Math.round(currentPage/TOTAL*100)+'%';
  document.getElementById('progressText').textContent='Page '+(currentPage+1)+' of '+(TOTAL+1);
  document.querySelectorAll('.dot').forEach((d,i)=>{d.classList.toggle('active',i===currentPage);if(i<currentPage)d.classList.add('visited');});
  if(currentPage===16)initQuiz();
  if(currentPage===17)setTimeout(drawCert,120);
}
function changePage(d){goToPage(currentPage+d);}

/* ===== ORBIT INTERACTIVE ===== */
const orbitPlanets=[
  {name:'Mercury',emoji:'☿',color:'#9ca3af',r:30,size:8},
  {name:'Venus',emoji:'♀',color:'#fde68a',r:42,size:10},
  {name:'Earth 🌍',emoji:'🌍',color:'#3b82f6',r:54,size:11},
  {name:'Mars',emoji:'♂',color:'#ef4444',r:66,size:8},
  {name:'Jupiter',emoji:'♃',color:'#fb923c',r:79,size:18},
  {name:'Saturn 🪐',emoji:'🪐',color:'#eab308',r:92,size:15},
  {name:'Uranus',emoji:'⛢',color:'#5eead4',r:102,size:12},
  {name:'Neptune',emoji:'♆',color:'#6366f1',r:110,size:10},
];
window.addEventListener('load',()=>{
  const od=document.getElementById('orbitDisplay');
  if(!od)return;
  const cx=od.offsetWidth/2||80,cy=110;
  orbitPlanets.forEach((p,i)=>{
    const angle=(i/orbitPlanets.length)*2*Math.PI;
    const x=cx+p.r*Math.cos(angle)-p.size/2;
    const y=cy+p.r*Math.sin(angle)*0.45-p.size/2;
    const el=document.createElement('div');
    el.className='orbit-planet-dot';
    el.style.cssText=`left:${x}px;top:${y}px;width:${p.size}px;height:${p.size}px;background:${p.color};font-size:${p.size*0.7}px;`;
    el.title=p.name;
    const tip=document.createElement('div');
    tip.className='orbit-tooltip';
    tip.textContent=p.emoji+' '+p.name;
    el.appendChild(tip);
    el.addEventListener('mouseenter',()=>{tip.style.display='block';tip.style.left=(p.size+4)+'px';tip.style.top='-4px';});
    el.addEventListener('mouseleave',()=>{tip.style.display='none';});
    el.addEventListener('click',()=>{tip.style.display=tip.style.display==='block'?'none':'block';});
    od.appendChild(el);
  });
});

/* ===== MINI QUIZZES ===== */
function miniQuiz(btn,type,fbId){
  const container=btn.closest('.quiz-bubble');
  const btns=container.querySelectorAll('.q-opt');
  btns.forEach(b=>b.style.pointerEvents='none');
  const fb=document.getElementById(fbId);
  if(type==='correct'){
    btn.classList.add('correct');
    fb.innerHTML='<span style="color:#86efac;">🎉 Correct! Amazing work, Space Explorer!</span>';
  } else {
    btn.classList.add('wrong');
    fb.innerHTML='<span style="color:#fca5a5;">Not quite! Keep reading to find out! 🚀</span>';
    btns.forEach(b=>{if(b.dataset.correct==='true')b.classList.add('correct');});
  }
}

/* ===== SIZE INFO ===== */
function showSizeInfo(msg){document.getElementById('sizeInfo').textContent='✨ '+msg;}

/* ===== MEMORY TRICK ===== */
const memPlanets=['☿ Mercury — 1st planet!','♀ Venus — 2nd planet!','🌍 Earth — 3rd planet (us!)','♂ Mars — 4th planet!','♃ Jupiter — 5th planet!','🪐 Saturn — 6th planet!','⛢ Uranus — 7th planet!','♆ Neptune — 8th planet!'];
let memReveal=0;
function revealMem(row){
  const span=row.querySelector('[id^="mp"]');
  if(!span)return;
  const idx=parseInt(span.id.replace('mp',''))-1;
  if(span.style.color!=='#64748b'){
    span.textContent=memPlanets[idx];
    span.style.color='#94a3b8';
    row.style.background='rgba(124,58,237,.1)';
  }
}

/* ===== FINAL QUIZ ===== */
const QUESTIONS=[
  {emoji:'☀️',q:'What is the Sun?',opts:['A planet like Earth','A giant star made of burning gas','A very large moon','A space station'],ans:1},
  {emoji:'🔴',q:'Why is Mars called the Red Planet?',opts:['It is covered in lava','Its sky is red at sunset','Its soil has rusty iron in it','It has red oceans'],ans:2},
  {emoji:'🪐',q:'Which planet has famous beautiful rings around it?',opts:['Jupiter','Neptune','Uranus','Saturn'],ans:3},
  {emoji:'🌍',q:'What makes Earth special compared to other planets?',opts:['It is the biggest planet','It is the closest to the Sun','It has liquid water and life on it','It has the most moons'],ans:2},
  {emoji:'🔢',q:'How many planets are in our Solar System?',opts:['9','10','8','7'],ans:2},
  {emoji:'🌪️',q:'Which planet is the HOTTEST?',opts:['Mercury — closest to Sun','Mars — it looks hot!','Venus — thick clouds trap heat','Jupiter — it is the biggest'],ans:2},
];

let qIdx=0,score=0,answered=false,quizPassed=false;

function initQuiz(){
  qIdx=0;score=0;answered=false;
  document.getElementById('quizActive').style.display='block';
  document.getElementById('quizPass').style.display='none';
  document.getElementById('quizFail').style.display='none';
  renderQuestion();
}

function renderQuestion(){
  const q=QUESTIONS[qIdx];
  document.getElementById('qEmoji').textContent=q.emoji;
  document.getElementById('qText').textContent=q.q;
  document.getElementById('qCounter').textContent='Question '+(qIdx+1)+' of 6';
  document.getElementById('qScoreBadge').textContent='Score: '+score+' / 6';
  document.getElementById('qResultMsg').textContent='';
  document.getElementById('nextQBtn').style.display='none';
  answered=false;
  const opts=document.getElementById('fquizOptions');
  opts.innerHTML='';
  q.opts.forEach((o,i)=>{
    const btn=document.createElement('button');
    btn.className='fq-opt';
    btn.textContent=o;
    btn.onclick=()=>answerQ(i,btn);
    opts.appendChild(btn);
  });
}

function answerQ(i,btn){
  if(answered)return;
  answered=true;
  const q=QUESTIONS[qIdx];
  const allBtns=document.querySelectorAll('.fq-opt');
  allBtns.forEach(b=>b.classList.add('locked'));
  const msg=document.getElementById('qResultMsg');
  if(i===q.ans){
    btn.classList.add('correct');
    score++;
    const praise=['🎉 Brilliant! You are a space genius!','⭐ Correct! Cosmo is proud of you!','🚀 Amazing! That is exactly right!','🌟 Spot on! You remembered well!','💫 Outstanding, Space Explorer!'];
    msg.innerHTML='<span style="color:#86efac;">'+praise[Math.floor(Math.random()*praise.length)]+'</span>';
  } else {
    btn.classList.add('wrong');
    allBtns[q.ans].classList.add('correct');
    msg.innerHTML='<span style="color:#fca5a5;">Not this time! The correct answer was highlighted in green. Keep going! 💪</span>';
  }
  document.getElementById('qScoreBadge').textContent='Score: '+score+' / 6';
  document.getElementById('nextQBtn').style.display='block';
  document.getElementById('nextQBtn').textContent=qIdx===5?'See My Result! 🏁':'Next Question →';
}

function nextQuestion(){
  qIdx++;
  if(qIdx>=6){showResult();return;}
  renderQuestion();
}

function showResult(){
  document.getElementById('quizActive').style.display='none';
  if(score>=5){
    quizPassed=true;
    document.getElementById('quizPass').style.display='block';
    document.getElementById('passScore').textContent=score+' / 6 ⭐';
    const msgs={5:'So close to perfect! You are a brilliant Space Explorer! 🌟',6:'PERFECT SCORE! You are the ultimate Cosmic Champion! The entire Solar System salutes you! 🌌🏆'};
    document.getElementById('passMsg').innerHTML=msgs[score]||'Amazing work!';
  } else {
    document.getElementById('quizFail').style.display='block';
    document.getElementById('failScore').textContent=score+' / 6';
    document.getElementById('failMsg').innerHTML='You got <strong style="color:#fbbf24;">'+score+' out of 6</strong>. You need at least 5 to earn your certificate. Don\'t worry — go back and read about the planets again, then try once more! Cosmo believes in you! 🚀<br><br><em style="color:#64748b;">Hint: Pay attention to the hottest planet, the ringed planet, and how many planets there are!</em>';
  }
}

function restartQuiz(){initQuiz();}
function goToCertificate(){goToPage(17);}

/* ===== CERTIFICATE CANVAS ===== */
const certCanvas=document.getElementById('cert');
const ctx=certCanvas.getContext('2d');
const CW=900,CH=640;

function drawStar(cx,cy,r,pts,color){
  ctx.save();ctx.fillStyle=color;ctx.beginPath();
  for(let i=0;i<pts*2;i++){const a=(i*Math.PI/pts)-Math.PI/2,rd=i%2===0?r:r*.42;i===0?ctx.moveTo(cx+rd*Math.cos(a),cy+rd*Math.sin(a)):ctx.lineTo(cx+rd*Math.cos(a),cy+rd*Math.sin(a));}
  ctx.closePath();ctx.fill();ctx.restore();
}
function rrect(x,y,w,h,r){
  ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.arcTo(x+w,y,x+w,y+r,r);ctx.lineTo(x+w,y+h-r);ctx.arcTo(x+w,y+h,x+w-r,y+h,r);ctx.lineTo(x+r,y+h);ctx.arcTo(x,y+h,x,y+h-r,r);ctx.lineTo(x,y+r);ctx.arcTo(x,y,x+r,y,r);ctx.closePath();
}
const qrImage=new Image();let qrReady=false;qrImage.crossOrigin='anonymous';qrImage.onload=()=>{qrReady=true;drawCert();};qrImage.src='https://quickchart.io/qr?text='+encodeURIComponent('https://fivetofifteen.com/')+'&size=180';

function drawCert(){
  const name=document.getElementById('certName').value.trim()||'Space Explorer';
  ctx.clearRect(0,0,CW,CH);

  /* space background */
  const bg=ctx.createRadialGradient(CW/2,CH/2,80,CW/2,CH/2,CW/2);
  bg.addColorStop(0,'#0f172a');bg.addColorStop(.6,'#1e1b4b');bg.addColorStop(1,'#030712');
  ctx.fillStyle=bg;rrect(0,0,CW,CH,24);ctx.fill();

  /* stars bg */
  ctx.fillStyle='white';
  for(let i=0;i<80;i++){const x=Math.random()*CW,y=Math.random()*CH,r=Math.random()*1.5+.3;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=`rgba(255,255,255,${Math.random()*.7+.3})`;ctx.fill();}

  /* outer border */
  ctx.strokeStyle='#fbbf24';ctx.lineWidth=4;rrect(8,8,CW-16,CH-16,18);ctx.stroke();

  /* inner dashed border */
  ctx.strokeStyle='#7c3aed';ctx.lineWidth=2;ctx.setLineDash([8,5]);
  rrect(20,20,CW-40,CH-40,12);ctx.stroke();ctx.setLineDash([]);

  /* corner stars */
  [[50,50],[CW-50,50],[50,CH-50],[CW-50,CH-50]].forEach(([x,y])=>drawStar(x,y,16,5,'#fbbf24'));
  [[50,50],[CW-50,50],[50,CH-50],[CW-50,CH-50]].forEach(([x,y])=>drawStar(x,y,8,5,'rgba(251,191,36,.4)'));

  /* top ribbon */
  const rg=ctx.createLinearGradient(CW/2-220,0,CW/2+220,0);
  rg.addColorStop(0,'#4c1d95');rg.addColorStop(.5,'#7c3aed');rg.addColorStop(1,'#4c1d95');
  ctx.fillStyle=rg;rrect(CW/2-220,28,440,44,22);ctx.fill();
  ctx.fillStyle='#fbbf24';ctx.font='bold 17px "Orbitron",monospace';ctx.textAlign='center';
  ctx.fillText('⭐  MY TRIP TO THE SOLAR SYSTEM  ⭐',CW/2,57);

  /* rocket */
  ctx.font='64px serif';ctx.textAlign='center';ctx.fillText('🚀',CW/2,148);

  /* title */
  const tg=ctx.createLinearGradient(CW/2-200,0,CW/2+200,0);
  tg.addColorStop(0,'#fbbf24');tg.addColorStop(.5,'#f97316');tg.addColorStop(1,'#a855f7');
  ctx.fillStyle=tg;ctx.font='bold 40px "Orbitron",monospace';
  ctx.fillText('Space Explorer Certificate',CW/2,200);

  /* subtitle */
  ctx.fillStyle='#94a3b8';ctx.font='17px "Nunito",sans-serif';
  ctx.fillText('This certifies that the amazing explorer',CW/2,236);

  /* name underline */
  ctx.strokeStyle='#fbbf24';ctx.lineWidth=2.5;
  ctx.beginPath();ctx.moveTo(CW/2-240,282);ctx.lineTo(CW/2+240,282);ctx.stroke();

  /* name */
  ctx.fillStyle='#a78bfa';ctx.font='bold 38px "Fredoka One",cursive';
  ctx.textAlign='center';ctx.fillText(name,CW/2,276);

  /* description */
  ctx.fillStyle='#cbd5e1';ctx.font='16px "Nunito",sans-serif';
  ctx.fillText('has completed the Solar System Adventure and is now an official',CW/2,316);

  ctx.fillStyle='#fbbf24';ctx.font='bold 24px "Fredoka One",cursive';
  ctx.fillText('🌟 Certified Space Explorer 🌟',CW/2,350);

  ctx.fillStyle='#94a3b8';ctx.font='14px "Nunito",sans-serif';
  ctx.fillText('Scored 5 or more on the final cosmic quiz!',CW/2,376);

  /* skill badges */
  const badges=[
    {t:'☀️ Knows the Sun',bg:'rgba(249,115,22,.25)',c:'#fdba74'},
    {t:'🪐 Learnt all 8 planets',bg:'rgba(234,179,8,.2)',c:'#fde047'},
    {t:'🔴 Mars Expert',bg:'rgba(239,68,68,.2)',c:'#fca5a5'},
    {t:'🏆 Quiz Champion',bg:'rgba(34,197,94,.2)',c:'#86efac'},
  ];
  const bw=168,bh=30,bg3=10,tot=badges.length*(bw+bg3)-bg3;
  let bx=CW/2-tot/2;
  badges.forEach(b=>{
    ctx.fillStyle=b.bg;rrect(bx,396,bw,bh,15);ctx.fill();
    ctx.fillStyle=b.c;ctx.font='bold 12px "Nunito",sans-serif';ctx.textAlign='center';
    ctx.fillText(b.t,bx+bw/2,415);bx+=bw+bg3;
  });

  /* planets row */
  ctx.font='34px serif';ctx.textAlign='center';
  ctx.fillText('☀️  ☿  ♀  🌍  ♂  ♃  🪐  ⛢  ♆',CW/2,476);

  ctx.fillStyle='#ffffff';ctx.strokeStyle='rgba(255,255,255,.25)';ctx.lineWidth=2;rrect(CW-154,68,102,102,14);ctx.fill();ctx.stroke();
  if(qrReady){ctx.drawImage(qrImage,CW-144,78,82,82);}else{ctx.fillStyle='#1e1b4b';ctx.fillRect(CW-144,78,82,82);ctx.fillStyle='#fbbf24';ctx.font='bold 10px "Nunito",sans-serif';ctx.fillText('QR loading...',CW-103,122);}
  ctx.fillStyle='#fbbf24';ctx.font='bold 10px "Nunito",sans-serif';ctx.textAlign='center';ctx.fillText('Scan to visit',CW-103,185);
  ctx.fillStyle='#cbd5e1';ctx.font='bold 12px "Nunito",sans-serif';ctx.fillText('Presented by fivetofifteen.com',CW/2,548);
  /* date */
  const d=new Date().toLocaleDateString('en-AU',{day:'numeric',month:'long',year:'numeric'});
  ctx.fillStyle='#374151';ctx.font='12px "Nunito",sans-serif';ctx.textAlign='center';
  ctx.fillText('Awarded on '+d,CW/2,580);

  /* deco stars scatter */
  [[80,200],[CW-80,200],[80,430],[CW-80,430],[160,350],[CW-160,350]].forEach(([x,y])=>drawStar(x,y,9,5,'rgba(251,191,36,.35)'));
}

function downloadCert(){
  drawCert();
  const link=document.createElement('a');
  link.download='space-explorer-certificate.png';
  link.href=certCanvas.toDataURL('image/png');
  link.click();
}

function printCert(){
  drawCert();
  const url=certCanvas.toDataURL('image/png');
  const win=window.open('','_blank');
  win.document.write('<!DOCTYPE html><html><head><title>Space Explorer Certificate</title><style>body{margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#030712;}img{max-width:100%;border-radius:12px;}@media print{body{background:white;}img{width:100%;}}</style></head><body><img src="'+url+'"/></body></html>');
  win.document.close();
  win.onload=()=>{win.focus();win.print();};
}

/* init */
initQuiz();
drawCert();
