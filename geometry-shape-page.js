(function () {
  var key = window.GEOMETRY_SHAPE_KEY;
  var data = window.GEOMETRY_SHAPE_DATA || {};
  var order = window.GEOMETRY_SHAPE_ORDER || [];
  if (!key || !data[key]) return;

  var shape = data[key];
  var deepDive = shape.deepDive || null;
  var index = order.indexOf(key);
  var prevKey = index > 0 ? order[index - 1] : null;
  var nextKey = index >= 0 && index < order.length - 1 ? order[index + 1] : null;

  function esc(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function fmt(value) {
    return esc(value).replace(/\^([A-Za-z0-9]+)/g, '<sup>$1</sup>');
  }

  function renderSquareDiagram(diagram) {
    if (!diagram || diagram.type !== 'square-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Square diagram with side, right angle, diagonal and center labels">',
      '<defs>',
      '<marker id="sqArrowSide" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="sqArrowAngle" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#ea580c"></path>',
      '</marker>',
      '<marker id="sqArrowDiag" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#7c3aed"></path>',
      '</marker>',
      '<marker id="sqArrowCenter" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#dc2626"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<rect x="120" y="90" width="240" height="240" fill="rgba(14,165,233,0.12)" stroke="#16a34a" stroke-width="5"></rect>',
      '<line x1="120" y1="90" x2="360" y2="330" stroke="#7c3aed" stroke-width="4.5"></line>',
      '<circle cx="240" cy="210" r="5" fill="#dc2626"></circle>',
      '<path d="M120 90 H146 V116 H120 Z" fill="none" stroke="#ea580c" stroke-width="4"></path>',
      '<text x="227" y="85" class="diagram-value" style="fill:#16a34a">a</text>',
      '<text x="108" y="214" class="diagram-value" style="fill:#16a34a">a</text>',
      '<text x="240" y="216" class="diagram-value" style="fill:#dc2626">O</text>',
      '<text x="250" y="206" class="diagram-value" style="fill:#7c3aed">d</text>',
      '<text x="150" y="130" class="diagram-value" style="fill:#ea580c">90 deg</text>',
      '<path d="M548 90 C474 80, 396 90, 314 90" fill="none" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#sqArrowSide)"></path>',
      '<path d="M622 166 C516 162, 424 154, 146 108" fill="none" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#sqArrowAngle)"></path>',
      '<path d="M610 282 C520 270, 434 256, 296 266" fill="none" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#sqArrowDiag)"></path>',
      '<path d="M582 356 C484 344, 396 330, 240 210" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#sqArrowCenter)"></path>',
      '<g>',
      '<rect x="552" y="70" width="168" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="636" y="93" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Equal Sides (a)</text>',
      '<rect x="616" y="148" width="104" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="668" y="171" text-anchor="middle" class="diagram-text" style="fill:#ea580c">Right Angle</text>',
      '<rect x="620" y="264" width="100" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="670" y="287" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Diagonal</text>',
      '<rect x="580" y="338" width="140" height="36" rx="18" fill="#fef2f2" stroke="#dc2626"></rect>',
      '<text x="650" y="361" text-anchor="middle" class="diagram-text" style="fill:#dc2626">Center Point</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderRectangleDiagram(diagram) {
    if (!diagram || diagram.type !== 'rectangle-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Rectangle diagram with length, width, right angle, diagonal and center labels">',
      '<defs>',
      '<marker id="rectArrowLen" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="rectArrowWid" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#0ea5e9"></path>',
      '</marker>',
      '<marker id="rectArrowAngle" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#ea580c"></path>',
      '</marker>',
      '<marker id="rectArrowDiag" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#7c3aed"></path>',
      '</marker>',
      '<marker id="rectArrowCenter" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#dc2626"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<rect x="100" y="110" width="300" height="190" fill="rgba(14,165,233,0.12)" stroke="#16a34a" stroke-width="5"></rect>',
      '<line x1="100" y1="110" x2="400" y2="300" stroke="#7c3aed" stroke-width="4.5"></line>',
      '<circle cx="250" cy="205" r="5" fill="#dc2626"></circle>',
      '<path d="M100 110 H126 V136 H100 Z" fill="none" stroke="#ea580c" stroke-width="4"></path>',
      '<text x="240" y="100" class="diagram-value" style="fill:#16a34a">l</text>',
      '<text x="76" y="208" class="diagram-value" style="fill:#0ea5e9">w</text>',
      '<text x="262" y="196" class="diagram-value" style="fill:#7c3aed">d</text>',
      '<text x="250" y="214" class="diagram-value" style="fill:#dc2626">O</text>',
      '<text x="134" y="150" class="diagram-value" style="fill:#ea580c">90 deg</text>',
      '<path d="M548 88 C470 78, 386 86, 332 110" fill="none" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#rectArrowLen)"></path>',
      '<path d="M620 156 C536 154, 430 166, 100 200" fill="none" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#rectArrowWid)"></path>',
      '<path d="M624 220 C528 218, 438 210, 126 136" fill="none" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#rectArrowAngle)"></path>',
      '<path d="M610 288 C520 278, 430 268, 332 258" fill="none" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#rectArrowDiag)"></path>',
      '<path d="M582 356 C490 344, 404 332, 250 205" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#rectArrowCenter)"></path>',
      '<g>',
      '<rect x="560" y="68" width="160" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="640" y="91" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Length (l)</text>',
      '<rect x="570" y="140" width="150" height="36" rx="18" fill="#ecfeff" stroke="#0ea5e9"></rect>',
      '<text x="645" y="163" text-anchor="middle" class="diagram-text" style="fill:#0ea5e9">Width (w)</text>',
      '<rect x="616" y="204" width="104" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="668" y="227" text-anchor="middle" class="diagram-text" style="fill:#ea580c">Right Angle</text>',
      '<rect x="620" y="268" width="100" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="670" y="291" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Diagonal</text>',
      '<rect x="580" y="338" width="140" height="36" rx="18" fill="#fef2f2" stroke="#dc2626"></rect>',
      '<text x="650" y="361" text-anchor="middle" class="diagram-text" style="fill:#dc2626">Center Point</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderParallelogramDiagram(diagram) {
    if (!diagram || diagram.type !== 'parallelogram-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Parallelogram diagram with base, side, height and parallel sides labels">',
      '<defs>',
      '<marker id="parArrowBase" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#0ea5e9"></path>',
      '</marker>',
      '<marker id="parArrowSide" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="parArrowHeight" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#ea580c"></path>',
      '</marker>',
      '<marker id="parArrowParallel" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#7c3aed"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<polygon points="120,300 380,300 470,150 210,150" fill="rgba(14,165,233,0.12)" stroke="#0f4f88" stroke-width="4.5"></polygon>',
      '<line x1="120" y1="300" x2="380" y2="300" stroke="#0ea5e9" stroke-width="5"></line>',
      '<line x1="120" y1="300" x2="210" y2="150" stroke="#16a34a" stroke-width="5"></line>',
      '<line x1="210" y1="150" x2="210" y2="300" stroke="#ea580c" stroke-width="4.2" stroke-dasharray="8 7"></line>',
      '<path d="M210 300 H232 V278 H210 Z" fill="none" stroke="#ea580c" stroke-width="3.8"></path>',
      '<line x1="242" y1="300" x2="260" y2="300" stroke="#7c3aed" stroke-width="3.2"></line>',
      '<line x1="332" y1="150" x2="350" y2="150" stroke="#7c3aed" stroke-width="3.2"></line>',
      '<line x1="156" y1="236" x2="166" y2="218" stroke="#7c3aed" stroke-width="3.2"></line>',
      '<line x1="416" y1="236" x2="426" y2="218" stroke="#7c3aed" stroke-width="3.2"></line>',
      '<text x="246" y="324" class="diagram-value" style="fill:#0ea5e9">b</text>',
      '<text x="142" y="228" class="diagram-value" style="fill:#16a34a">a</text>',
      '<text x="220" y="228" class="diagram-value" style="fill:#ea580c">h</text>',
      '<path d="M548 90 C480 82, 402 92, 284 300" fill="none" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#parArrowBase)"></path>',
      '<path d="M620 160 C530 154, 430 164, 165 226" fill="none" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#parArrowSide)"></path>',
      '<path d="M614 246 C520 242, 422 238, 210 214" fill="none" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#parArrowHeight)"></path>',
      '<path d="M584 356 C494 346, 404 334, 340 150" fill="none" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#parArrowParallel)"></path>',
      '<g>',
      '<rect x="610" y="70" width="110" height="36" rx="18" fill="#ecfeff" stroke="#0ea5e9"></rect>',
      '<text x="665" y="93" text-anchor="middle" class="diagram-text" style="fill:#0ea5e9">Base b</text>',
      '<rect x="610" y="140" width="110" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="665" y="163" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Side a</text>',
      '<rect x="600" y="226" width="120" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="660" y="249" text-anchor="middle" class="diagram-text" style="fill:#ea580c">Height h</text>',
      '<rect x="544" y="338" width="176" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="632" y="361" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Opposite Sides Parallel</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderTrapeziumDiagram(diagram) {
    if (!diagram || diagram.type !== 'trapezium-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Trapezium diagram with parallel bases, height and non-parallel sides">',
      '<defs>',
      '<marker id="trapArrowBaseA" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#0ea5e9"></path>',
      '</marker>',
      '<marker id="trapArrowBaseB" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="trapArrowHeight" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#ea580c"></path>',
      '</marker>',
      '<marker id="trapArrowLegs" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#7c3aed"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<polygon points="120,300 420,300 340,160 200,160" fill="rgba(14,165,233,0.12)" stroke="#0f4f88" stroke-width="4.5"></polygon>',
      '<line x1="120" y1="300" x2="420" y2="300" stroke="#0ea5e9" stroke-width="5"></line>',
      '<line x1="200" y1="160" x2="340" y2="160" stroke="#16a34a" stroke-width="5"></line>',
      '<line x1="200" y1="160" x2="200" y2="300" stroke="#ea580c" stroke-width="4.2" stroke-dasharray="8 7"></line>',
      '<path d="M200 300 H222 V278 H200 Z" fill="none" stroke="#ea580c" stroke-width="3.8"></path>',
      '<line x1="246" y1="300" x2="264" y2="300" stroke="#7c3aed" stroke-width="3.2"></line>',
      '<line x1="256" y1="160" x2="274" y2="160" stroke="#7c3aed" stroke-width="3.2"></line>',
      '<text x="262" y="324" class="diagram-value" style="fill:#0ea5e9">a</text>',
      '<text x="264" y="150" class="diagram-value" style="fill:#16a34a">b</text>',
      '<text x="210" y="234" class="diagram-value" style="fill:#ea580c">h</text>',
      '<text x="148" y="228" class="diagram-value" style="fill:#7c3aed">c</text>',
      '<text x="372" y="228" class="diagram-value" style="fill:#7c3aed">d</text>',
      '<path d="M546 90 C476 82, 390 90, 278 300" fill="none" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#trapArrowBaseA)"></path>',
      '<path d="M622 154 C548 150, 468 148, 296 160" fill="none" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#trapArrowBaseB)"></path>',
      '<path d="M612 244 C522 240, 426 234, 200 220" fill="none" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#trapArrowHeight)"></path>',
      '<path d="M592 354 C502 344, 408 334, 340 230" fill="none" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#trapArrowLegs)"></path>',
      '<g>',
      '<rect x="602" y="70" width="118" height="36" rx="18" fill="#ecfeff" stroke="#0ea5e9"></rect>',
      '<text x="661" y="93" text-anchor="middle" class="diagram-text" style="fill:#0ea5e9">Base a</text>',
      '<rect x="602" y="136" width="118" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="661" y="159" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Base b</text>',
      '<rect x="600" y="224" width="120" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="660" y="247" text-anchor="middle" class="diagram-text" style="fill:#ea580c">Height h</text>',
      '<rect x="532" y="336" width="188" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="626" y="359" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Non-Parallel Sides c,d</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderRhombusDiagram(diagram) {
    if (!diagram || diagram.type !== 'rhombus-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Rhombus diagram with equal sides, diagonals and center labels">',
      '<defs>',
      '<marker id="rhoArrowSide" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="rhoArrowD1" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#7c3aed"></path>',
      '</marker>',
      '<marker id="rhoArrowD2" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#ea580c"></path>',
      '</marker>',
      '<marker id="rhoArrowCenter" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#dc2626"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<polygon points="250,90 380,210 250,330 120,210" fill="rgba(14,165,233,0.12)" stroke="#0f4f88" stroke-width="4.5"></polygon>',
      '<line x1="250" y1="90" x2="250" y2="330" stroke="#7c3aed" stroke-width="5"></line>',
      '<line x1="120" y1="210" x2="380" y2="210" stroke="#ea580c" stroke-width="5"></line>',
      '<circle cx="250" cy="210" r="5" fill="#dc2626"></circle>',
      '<path d="M250 210 H272 V188 H250 Z" fill="none" stroke="#7c3aed" stroke-width="3.6"></path>',
      '<line x1="120" y1="210" x2="250" y2="90" stroke="#16a34a" stroke-width="5"></line>',
      '<line x1="250" y1="90" x2="380" y2="210" stroke="#16a34a" stroke-width="5"></line>',
      '<line x1="250" y1="330" x2="120" y2="210" stroke="#16a34a" stroke-width="5"></line>',
      '<line x1="250" y1="330" x2="380" y2="210" stroke="#16a34a" stroke-width="5"></line>',
      '<text x="182" y="140" class="diagram-value" style="fill:#16a34a">a</text>',
      '<text x="262" y="140" class="diagram-value" style="fill:#7c3aed">d1</text>',
      '<text x="290" y="201" class="diagram-value" style="fill:#ea580c">d2</text>',
      '<text x="258" y="228" class="diagram-value" style="fill:#dc2626">O</text>',
      '<path d="M540 92 C472 82, 396 96, 182 140" fill="none" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#rhoArrowSide)"></path>',
      '<path d="M618 164 C524 156, 420 164, 250 144" fill="none" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#rhoArrowD1)"></path>',
      '<path d="M614 250 C532 244, 430 236, 296 210" fill="none" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#rhoArrowD2)"></path>',
      '<path d="M586 356 C490 344, 390 330, 250 210" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#rhoArrowCenter)"></path>',
      '<g>',
      '<rect x="592" y="72" width="128" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="656" y="95" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Equal Sides</text>',
      '<rect x="610" y="146" width="110" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="665" y="169" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Diagonal d1</text>',
      '<rect x="610" y="232" width="110" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="665" y="255" text-anchor="middle" class="diagram-text" style="fill:#ea580c">Diagonal d2</text>',
      '<rect x="580" y="338" width="140" height="36" rx="18" fill="#fef2f2" stroke="#dc2626"></rect>',
      '<text x="650" y="361" text-anchor="middle" class="diagram-text" style="fill:#dc2626">Center Point</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderKiteDiagram(diagram) {
    if (!diagram || diagram.type !== 'kite-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Kite diagram with two equal side pairs, diagonals, right-angle intersection and center labels">',
      '<defs>',
      '<marker id="kiteArrowA" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="kiteArrowB" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#0ea5e9"></path>',
      '</marker>',
      '<marker id="kiteArrowD1" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#7c3aed"></path>',
      '</marker>',
      '<marker id="kiteArrowD2" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#ea580c"></path>',
      '</marker>',
      '<marker id="kiteArrowCenter" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#dc2626"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<polygon points="250,90 370,220 250,340 130,220" fill="rgba(14,165,233,0.12)" stroke="#0f4f88" stroke-width="4.5"></polygon>',
      '<line x1="250" y1="90" x2="130" y2="220" stroke="#16a34a" stroke-width="5"></line>',
      '<line x1="250" y1="90" x2="370" y2="220" stroke="#16a34a" stroke-width="5"></line>',
      '<line x1="130" y1="220" x2="250" y2="340" stroke="#0ea5e9" stroke-width="5"></line>',
      '<line x1="370" y1="220" x2="250" y2="340" stroke="#0ea5e9" stroke-width="5"></line>',
      '<line x1="250" y1="90" x2="250" y2="340" stroke="#7c3aed" stroke-width="5"></line>',
      '<line x1="130" y1="220" x2="370" y2="220" stroke="#ea580c" stroke-width="5"></line>',
      '<circle cx="250" cy="220" r="5" fill="#dc2626"></circle>',
      '<path d="M250 220 H272 V198 H250 Z" fill="none" stroke="#ea580c" stroke-width="3.8"></path>',
      '<text x="186" y="154" class="diagram-value" style="fill:#16a34a">a</text>',
      '<text x="313" y="284" class="diagram-value" style="fill:#0ea5e9">b</text>',
      '<text x="260" y="152" class="diagram-value" style="fill:#7c3aed">d1</text>',
      '<text x="288" y="212" class="diagram-value" style="fill:#ea580c">d2</text>',
      '<text x="258" y="239" class="diagram-value" style="fill:#dc2626">O</text>',
      '<path d="M544 88 C476 80, 398 90, 186 154" fill="none" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#kiteArrowA)"></path>',
      '<path d="M620 150 C536 144, 444 162, 313 284" fill="none" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#kiteArrowB)"></path>',
      '<path d="M618 232 C526 226, 430 218, 250 162" fill="none" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#kiteArrowD1)"></path>',
      '<path d="M600 300 C520 292, 430 282, 302 220" fill="none" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#kiteArrowD2)"></path>',
      '<path d="M582 356 C494 346, 402 334, 250 220" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#kiteArrowCenter)"></path>',
      '<g>',
      '<rect x="586" y="68" width="134" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="653" y="91" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Equal Sides a,a</text>',
      '<rect x="586" y="132" width="134" height="36" rx="18" fill="#ecfeff" stroke="#0ea5e9"></rect>',
      '<text x="653" y="155" text-anchor="middle" class="diagram-text" style="fill:#0ea5e9">Equal Sides b,b</text>',
      '<rect x="610" y="214" width="110" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="665" y="237" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Diagonal d1</text>',
      '<rect x="610" y="280" width="110" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="665" y="303" text-anchor="middle" class="diagram-text" style="fill:#ea580c">Diagonal d2</text>',
      '<rect x="580" y="338" width="140" height="36" rx="18" fill="#fef2f2" stroke="#dc2626"></rect>',
      '<text x="650" y="361" text-anchor="middle" class="diagram-text" style="fill:#dc2626">Center Point</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderPentagonDiagram(diagram) {
    if (!diagram || diagram.type !== 'pentagon-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Regular pentagon diagram with side, apothem, central angle and center labels">',
      '<defs>',
      '<marker id="pentArrowSide" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="pentArrowAp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#ea580c"></path>',
      '</marker>',
      '<marker id="pentArrowAngle" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"></path>',
      '</marker>',
      '<marker id="pentArrowCenter" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#dc2626"></path>',
      '</marker>',
      '<marker id="pentArrowSides" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#0ea5e9"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<polygon points="250,90 370,175 325,320 175,320 130,175" fill="rgba(14,165,233,0.12)" stroke="#0f4f88" stroke-width="4.5"></polygon>',
      '<line x1="175" y1="320" x2="325" y2="320" stroke="#16a34a" stroke-width="5"></line>',
      '<circle cx="250" cy="220" r="5" fill="#dc2626"></circle>',
      '<line x1="250" y1="220" x2="250" y2="320" stroke="#ea580c" stroke-width="4.6"></line>',
      '<path d="M250 320 H272 V298 H250 Z" fill="none" stroke="#ea580c" stroke-width="3.8"></path>',
      '<line x1="250" y1="220" x2="250" y2="90" stroke="#7c3aed" stroke-width="3.8"></line>',
      '<line x1="250" y1="220" x2="370" y2="175" stroke="#7c3aed" stroke-width="3.8"></line>',
      '<path d="M250 185 A35 35 0 0 1 283 208" fill="none" stroke="#7c3aed" stroke-width="3.8"></path>',
      '<text x="244" y="342" class="diagram-value" style="fill:#16a34a">s</text>',
      '<text x="260" y="278" class="diagram-value" style="fill:#ea580c">ap</text>',
      '<text x="266" y="188" class="diagram-value" style="fill:#7c3aed">72 deg</text>',
      '<text x="236" y="236" class="diagram-value" style="fill:#dc2626">O</text>',
      '<line x1="610" y1="91" x2="350" y2="176" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#pentArrowSides)"></line>',
      '<line x1="580" y1="161" x2="286" y2="205" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#pentArrowAngle)"></line>',
      '<line x1="580" y1="229" x2="250" y2="220" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#pentArrowCenter)"></line>',
      '<line x1="158" y1="293" x2="250" y2="272" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#pentArrowAp)"></line>',
      '<line x1="158" y1="357" x2="305" y2="320" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#pentArrowSide)"></line>',
      '<g>',
      '<rect x="610" y="68" width="110" height="36" rx="18" fill="#ecfeff" stroke="#0ea5e9"></rect>',
      '<text x="665" y="91" text-anchor="middle" class="diagram-text" style="fill:#0ea5e9">Five Sides</text>',
      '<rect x="580" y="138" width="140" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="650" y="161" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Central Angle</text>',
      '<rect x="580" y="206" width="140" height="36" rx="18" fill="#fef2f2" stroke="#dc2626"></rect>',
      '<text x="650" y="229" text-anchor="middle" class="diagram-text" style="fill:#dc2626">Center Point</text>',
      '<rect x="40" y="274" width="118" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="99" y="297" text-anchor="middle" class="diagram-text" style="fill:#ea580c">Apothem ap</text>',
      '<rect x="40" y="338" width="118" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="99" y="361" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Side s</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderHexagonDiagram(diagram) {
    if (!diagram || diagram.type !== 'hexagon-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Regular hexagon diagram with side, apothem, central angle and center labels">',
      '<defs>',
      '<marker id="hexArrowSide" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="hexArrowAp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#ea580c"></path>',
      '</marker>',
      '<marker id="hexArrowAngle" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"></path>',
      '</marker>',
      '<marker id="hexArrowCenter" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#dc2626"></path>',
      '</marker>',
      '<marker id="hexArrowSides" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#0ea5e9"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<polygon points="140,220 195,125 305,125 360,220 305,315 195,315" fill="rgba(14,165,233,0.12)" stroke="#0f4f88" stroke-width="4.5"></polygon>',
      '<line x1="195" y1="125" x2="305" y2="125" stroke="#16a34a" stroke-width="5"></line>',
      '<circle cx="250" cy="220" r="5" fill="#dc2626"></circle>',
      '<line x1="250" y1="220" x2="250" y2="125" stroke="#ea580c" stroke-width="4.6"></line>',
      '<path d="M250 125 H272 V147 H250 Z" fill="none" stroke="#ea580c" stroke-width="3.6"></path>',
      '<line x1="250" y1="220" x2="305" y2="125" stroke="#7c3aed" stroke-width="3.8"></line>',
      '<line x1="250" y1="220" x2="360" y2="220" stroke="#7c3aed" stroke-width="3.8"></line>',
      '<path d="M300 220 A50 50 0 0 0 275 176.7" fill="none" stroke="#7c3aed" stroke-width="3.8"></path>',
      '<text x="244" y="118" class="diagram-value" style="fill:#16a34a">s</text>',
      '<text x="260" y="176" class="diagram-value" style="fill:#ea580c">ap</text>',
      '<text x="286" y="205" class="diagram-value" style="fill:#7c3aed">60 deg</text>',
      '<text x="236" y="238" class="diagram-value" style="fill:#dc2626">O</text>',
      '<line x1="158" y1="293" x2="250" y2="170" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#hexArrowAp)"></line>',
      '<line x1="158" y1="357" x2="244" y2="125" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#hexArrowSide)"></line>',
      '<line x1="610" y1="91" x2="334" y2="128" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#hexArrowSides)"></line>',
      '<line x1="580" y1="161" x2="300" y2="204" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#hexArrowAngle)"></line>',
      '<line x1="580" y1="229" x2="250" y2="220" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#hexArrowCenter)"></line>',
      '<g>',
      '<rect x="40" y="274" width="118" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="99" y="297" text-anchor="middle" class="diagram-text" style="fill:#ea580c">Apothem ap</text>',
      '<rect x="40" y="338" width="118" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="99" y="361" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Side s</text>',
      '<rect x="610" y="68" width="110" height="36" rx="18" fill="#ecfeff" stroke="#0ea5e9"></rect>',
      '<text x="665" y="91" text-anchor="middle" class="diagram-text" style="fill:#0ea5e9">Six Sides</text>',
      '<rect x="580" y="138" width="140" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="650" y="161" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Central Angle</text>',
      '<rect x="580" y="206" width="140" height="36" rx="18" fill="#fef2f2" stroke="#dc2626"></rect>',
      '<text x="650" y="229" text-anchor="middle" class="diagram-text" style="fill:#dc2626">Center Point</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderHeptagonDiagram(diagram) {
    if (!diagram || diagram.type !== 'heptagon-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Regular heptagon diagram with side, apothem, central angle and center labels">',
      '<defs>',
      '<marker id="hepArrowSide" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="hepArrowAp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#ea580c"></path>',
      '</marker>',
      '<marker id="hepArrowAngle" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"></path>',
      '</marker>',
      '<marker id="hepArrowCenter" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#dc2626"></path>',
      '</marker>',
      '<marker id="hepArrowSides" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#0ea5e9"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<polygon points="250,104 330,142 352,224 300,296 200,296 148,224 170,142" fill="rgba(14,165,233,0.12)" stroke="#0f4f88" stroke-width="4.5"></polygon>',
      '<line x1="250" y1="104" x2="330" y2="142" stroke="#16a34a" stroke-width="5"></line>',
      '<circle cx="250" cy="220" r="5" fill="#dc2626"></circle>',
      '<line x1="250" y1="220" x2="290" y2="123" stroke="#ea580c" stroke-width="4.6"></line>',
      '<line x1="250" y1="220" x2="250" y2="104" stroke="#7c3aed" stroke-width="3.8"></line>',
      '<line x1="250" y1="220" x2="330" y2="142" stroke="#7c3aed" stroke-width="3.8"></line>',
      '<path d="M250 184 A36 36 0 0 1 274 193" fill="none" stroke="#7c3aed" stroke-width="3.8"></path>',
      '<text x="286" y="126" class="diagram-value" style="fill:#16a34a">s</text>',
      '<text x="268" y="178" class="diagram-value" style="fill:#ea580c">ap</text>',
      '<text x="278" y="208" class="diagram-value" style="fill:#7c3aed">51.43 deg</text>',
      '<text x="236" y="238" class="diagram-value" style="fill:#dc2626">O</text>',
      '<path d="M148 62 C188 76, 232 92, 292 124" fill="none" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#hepArrowSide)"></path>',
      '<path d="M148 356 C198 332, 236 278, 268 156" fill="none" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#hepArrowAp)"></path>',
      '<path d="M586 68 C548 84, 494 122, 352 224" fill="none" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#hepArrowSides)"></path>',
      '<path d="M572 190 C498 188, 418 190, 284 194" fill="none" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#hepArrowAngle)"></path>',
      '<path d="M572 346 C492 328, 402 284, 250 220" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#hepArrowCenter)"></path>',
      '<g>',
      '<rect x="30" y="44" width="118" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="89" y="67" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Side s</text>',
      '<rect x="586" y="50" width="134" height="36" rx="18" fill="#ecfeff" stroke="#0ea5e9"></rect>',
      '<text x="653" y="73" text-anchor="middle" class="diagram-text" style="fill:#0ea5e9">Seven Sides</text>',
      '<rect x="30" y="338" width="118" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="89" y="361" text-anchor="middle" class="diagram-text" style="fill:#ea580c">Apothem ap</text>',
      '<rect x="572" y="172" width="148" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="646" y="195" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Central Angle</text>',
      '<rect x="572" y="328" width="148" height="36" rx="18" fill="#fef2f2" stroke="#dc2626"></rect>',
      '<text x="646" y="351" text-anchor="middle" class="diagram-text" style="fill:#dc2626">Center Point</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderOctagonDiagram(diagram) {
    if (!diagram || diagram.type !== 'octagon-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Regular octagon diagram with side, apothem, central angle and center labels">',
      '<defs>',
      '<marker id="octArrowSide" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="octArrowAp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#ea580c"></path>',
      '</marker>',
      '<marker id="octArrowAngle" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"></path>',
      '</marker>',
      '<marker id="octArrowCenter" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#dc2626"></path>',
      '</marker>',
      '<marker id="octArrowSides" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#0ea5e9"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<polygon points="190,125 310,125 360,175 360,265 310,315 190,315 140,265 140,175" fill="rgba(14,165,233,0.12)" stroke="#0f4f88" stroke-width="4.5"></polygon>',
      '<line x1="190" y1="125" x2="310" y2="125" stroke="#16a34a" stroke-width="5"></line>',
      '<circle cx="250" cy="220" r="5" fill="#dc2626"></circle>',
      '<line x1="250" y1="220" x2="250" y2="125" stroke="#ea580c" stroke-width="4.6"></line>',
      '<path d="M250 125 H272 V147 H250 Z" fill="none" stroke="#ea580c" stroke-width="3.6"></path>',
      '<line x1="250" y1="220" x2="310" y2="125" stroke="#7c3aed" stroke-width="3.8"></line>',
      '<line x1="250" y1="220" x2="360" y2="175" stroke="#7c3aed" stroke-width="3.8"></line>',
      '<path d="M291 155 A78 78 0 0 1 327 189" fill="none" stroke="#7c3aed" stroke-width="3.8"></path>',
      '<text x="244" y="118" class="diagram-value" style="fill:#16a34a">s</text>',
      '<text x="260" y="176" class="diagram-value" style="fill:#ea580c">ap</text>',
      '<text x="309" y="184" class="diagram-value" style="fill:#7c3aed">45 deg</text>',
      '<text x="236" y="238" class="diagram-value" style="fill:#dc2626">O</text>',
      '<line x1="158" y1="293" x2="250" y2="170" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#octArrowAp)"></line>',
      '<line x1="158" y1="357" x2="244" y2="125" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#octArrowSide)"></line>',
      '<line x1="610" y1="91" x2="350" y2="175" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#octArrowSides)"></line>',
      '<line x1="580" y1="161" x2="324" y2="186" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#octArrowAngle)"></line>',
      '<line x1="580" y1="229" x2="250" y2="220" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#octArrowCenter)"></line>',
      '<g>',
      '<rect x="40" y="274" width="118" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="99" y="297" text-anchor="middle" class="diagram-text" style="fill:#ea580c">Apothem ap</text>',
      '<rect x="40" y="338" width="118" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="99" y="361" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Side s</text>',
      '<rect x="602" y="68" width="118" height="36" rx="18" fill="#ecfeff" stroke="#0ea5e9"></rect>',
      '<text x="661" y="91" text-anchor="middle" class="diagram-text" style="fill:#0ea5e9">Eight Sides</text>',
      '<rect x="580" y="138" width="140" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="650" y="161" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Central Angle</text>',
      '<rect x="580" y="206" width="140" height="36" rx="18" fill="#fef2f2" stroke="#dc2626"></rect>',
      '<text x="650" y="229" text-anchor="middle" class="diagram-text" style="fill:#dc2626">Center Point</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderNonagonDiagram(diagram) {
    if (!diagram || diagram.type !== 'nonagon-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Regular nonagon diagram with side, apothem, central angle and center labels">',
      '<defs>',
      '<marker id="nonArrowSide" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="nonArrowAp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#ea580c"></path>',
      '</marker>',
      '<marker id="nonArrowAngle" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"></path>',
      '</marker>',
      '<marker id="nonArrowCenter" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#dc2626"></path>',
      '</marker>',
      '<marker id="nonArrowSides" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#0ea5e9"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<polygon points="250,108 321,132 359,194 346,267 288,313 212,313 154,267 141,194 179,132" fill="rgba(14,165,233,0.12)" stroke="#0f4f88" stroke-width="4.5"></polygon>',
      '<line x1="250" y1="108" x2="321" y2="132" stroke="#16a34a" stroke-width="5"></line>',
      '<circle cx="250" cy="220" r="5" fill="#dc2626"></circle>',
      '<line x1="250" y1="220" x2="285.5" y2="120" stroke="#ea580c" stroke-width="4.6"></line>',
      '<line x1="250" y1="220" x2="250" y2="108" stroke="#7c3aed" stroke-width="3.8"></line>',
      '<line x1="250" y1="220" x2="321" y2="132" stroke="#7c3aed" stroke-width="3.8"></line>',
      '<path d="M250 180 A40 40 0 0 1 276 189" fill="none" stroke="#7c3aed" stroke-width="3.8"></path>',
      '<text x="282" y="126" class="diagram-value" style="fill:#16a34a">s</text>',
      '<text x="268" y="176" class="diagram-value" style="fill:#ea580c">ap</text>',
      '<text x="270" y="201" class="diagram-value" style="fill:#7c3aed">40 deg</text>',
      '<text x="236" y="238" class="diagram-value" style="fill:#dc2626">O</text>',
      '<line x1="158" y1="293" x2="273" y2="158" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#nonArrowAp)"></line>',
      '<line x1="158" y1="357" x2="285" y2="120" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#nonArrowSide)"></line>',
      '<line x1="610" y1="91" x2="352" y2="194" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#nonArrowSides)"></line>',
      '<line x1="580" y1="161" x2="282" y2="196" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#nonArrowAngle)"></line>',
      '<line x1="580" y1="229" x2="250" y2="220" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#nonArrowCenter)"></line>',
      '<g>',
      '<rect x="40" y="274" width="118" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="99" y="297" text-anchor="middle" class="diagram-text" style="fill:#ea580c">Apothem ap</text>',
      '<rect x="40" y="338" width="118" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="99" y="361" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Side s</text>',
      '<rect x="602" y="68" width="118" height="36" rx="18" fill="#ecfeff" stroke="#0ea5e9"></rect>',
      '<text x="661" y="91" text-anchor="middle" class="diagram-text" style="fill:#0ea5e9">Nine Sides</text>',
      '<rect x="580" y="138" width="140" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="650" y="161" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Central Angle</text>',
      '<rect x="580" y="206" width="140" height="36" rx="18" fill="#fef2f2" stroke="#dc2626"></rect>',
      '<text x="650" y="229" text-anchor="middle" class="diagram-text" style="fill:#dc2626">Center Point</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderDecagonDiagram(diagram) {
    if (!diagram || diagram.type !== 'decagon-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Regular decagon diagram with side, apothem, central angle and center labels">',
      '<defs>',
      '<marker id="decArrowSide" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="decArrowAp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#ea580c"></path>',
      '</marker>',
      '<marker id="decArrowAngle" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"></path>',
      '</marker>',
      '<marker id="decArrowCenter" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#dc2626"></path>',
      '</marker>',
      '<marker id="decArrowSides" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L8,4 L0,8 z" fill="#0ea5e9"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<polygon points="250,108 316,130 356,186 356,254 316,310 250,332 184,310 144,254 144,186 184,130" fill="rgba(14,165,233,0.12)" stroke="#0f4f88" stroke-width="4.5"></polygon>',
      '<line x1="250" y1="108" x2="316" y2="130" stroke="#16a34a" stroke-width="5"></line>',
      '<circle cx="250" cy="220" r="5" fill="#dc2626"></circle>',
      '<line x1="250" y1="220" x2="283" y2="119" stroke="#ea580c" stroke-width="4.6"></line>',
      '<line x1="250" y1="220" x2="250" y2="108" stroke="#7c3aed" stroke-width="3.8"></line>',
      '<line x1="250" y1="220" x2="316" y2="130" stroke="#7c3aed" stroke-width="3.8"></line>',
      '<path d="M250 184 A36 36 0 0 1 270 191" fill="none" stroke="#7c3aed" stroke-width="3.8"></path>',
      '<text x="280" y="124" class="diagram-value" style="fill:#16a34a">s</text>',
      '<text x="266" y="178" class="diagram-value" style="fill:#ea580c">ap</text>',
      '<text x="270" y="198" class="diagram-value" style="fill:#7c3aed">36 deg</text>',
      '<text x="236" y="238" class="diagram-value" style="fill:#dc2626">O</text>',
      '<line x1="148" y1="352" x2="284" y2="121" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#decArrowSide)"></line>',
      '<line x1="148" y1="286" x2="266" y2="156" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#decArrowAp)"></line>',
      '<line x1="594" y1="88" x2="356" y2="186" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#decArrowSides)"></line>',
      '<line x1="572" y1="161" x2="278" y2="194" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#decArrowAngle)"></line>',
      '<line x1="572" y1="244" x2="250" y2="220" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#decArrowCenter)"></line>',
      '<g>',
      '<rect x="30" y="266" width="118" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="89" y="289" text-anchor="middle" class="diagram-text" style="fill:#ea580c">Apothem ap</text>',
      '<rect x="30" y="330" width="118" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="89" y="353" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Side s</text>',
      '<rect x="586" y="66" width="134" height="36" rx="18" fill="#ecfeff" stroke="#0ea5e9"></rect>',
      '<text x="653" y="89" text-anchor="middle" class="diagram-text" style="fill:#0ea5e9">Ten Sides</text>',
      '<rect x="572" y="138" width="148" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="646" y="161" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Central Angle</text>',
      '<rect x="572" y="222" width="148" height="36" rx="18" fill="#fef2f2" stroke="#dc2626"></rect>',
      '<text x="646" y="245" text-anchor="middle" class="diagram-text" style="fill:#dc2626">Center Point</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderCubeDiagram(diagram) {
    if (!diagram || diagram.type !== 'cube-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Cube diagram with edge, face diagonal, space diagonal, vertex and center labels">',
      '<defs>',
      '<marker id="cubeArrowEdge" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="cubeArrowFaceDiag" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#ea580c"></path>',
      '</marker>',
      '<marker id="cubeArrowSpaceDiag" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#7c3aed"></path>',
      '</marker>',
      '<marker id="cubeArrowVertex" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#0ea5e9"></path>',
      '</marker>',
      '<marker id="cubeArrowCenter" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#dc2626"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<polygon points="180,90 330,90 330,240 180,240" fill="rgba(14,165,233,0.08)" stroke="#4f46e5" stroke-width="3"></polygon>',
      '<polygon points="260,150 410,150 410,300 260,300" fill="rgba(14,165,233,0.14)" stroke="#0f4f88" stroke-width="4.5"></polygon>',
      '<line x1="180" y1="90" x2="260" y2="150" stroke="#0f4f88" stroke-width="4"></line>',
      '<line x1="330" y1="90" x2="410" y2="150" stroke="#0f4f88" stroke-width="4"></line>',
      '<line x1="330" y1="240" x2="410" y2="300" stroke="#0f4f88" stroke-width="4"></line>',
      '<line x1="180" y1="240" x2="260" y2="300" stroke="#0f4f88" stroke-width="4"></line>',
      '<line x1="260" y1="150" x2="410" y2="150" stroke="#16a34a" stroke-width="5"></line>',
      '<line x1="260" y1="150" x2="410" y2="300" stroke="#ea580c" stroke-width="4.5"></line>',
      '<line x1="180" y1="90" x2="410" y2="300" stroke="#7c3aed" stroke-width="4.5"></line>',
      '<circle cx="295" cy="195" r="5" fill="#dc2626"></circle>',
      '<circle cx="260" cy="300" r="5" fill="#0ea5e9"></circle>',
      '<text x="332" y="142" class="diagram-value" style="fill:#16a34a">a</text>',
      '<text x="330" y="232" class="diagram-value" style="fill:#ea580c">d_f</text>',
      '<text x="280" y="170" class="diagram-value" style="fill:#7c3aed">D</text>',
      '<text x="300" y="190" class="diagram-value" style="fill:#dc2626">O</text>',
      '<path d="M148 62 C214 78, 274 110, 334 150" fill="none" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#cubeArrowEdge)"></path>',
      '<path d="M560 74 C508 88, 448 126, 360 245" fill="none" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#cubeArrowFaceDiag)"></path>',
      '<path d="M560 196 C510 196, 442 196, 304 198" fill="none" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#cubeArrowSpaceDiag)"></path>',
      '<path d="M148 354 C198 334, 226 320, 260 300" fill="none" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#cubeArrowVertex)"></path>',
      '<path d="M560 352 C496 326, 420 284, 295 195" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#cubeArrowCenter)"></path>',
      '<g>',
      '<rect x="30" y="44" width="118" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="89" y="67" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Edge a</text>',
      '<rect x="560" y="50" width="160" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="640" y="73" text-anchor="middle" class="diagram-text" style="fill:#ea580c">Face Diagonal d_f</text>',
      '<rect x="560" y="172" width="160" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="640" y="195" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Space Diagonal D</text>',
      '<rect x="30" y="336" width="118" height="36" rx="18" fill="#ecfeff" stroke="#0ea5e9"></rect>',
      '<text x="89" y="359" text-anchor="middle" class="diagram-text" style="fill:#0ea5e9">Vertex</text>',
      '<rect x="560" y="328" width="160" height="36" rx="18" fill="#fef2f2" stroke="#dc2626"></rect>',
      '<text x="640" y="351" text-anchor="middle" class="diagram-text" style="fill:#dc2626">Center Point O</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderCuboidDiagram(diagram) {
    if (!diagram || diagram.type !== 'cuboid-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Cuboid diagram with length, width, height, space diagonal, vertex and center labels">',
      '<defs>',
      '<marker id="cbdArrowL" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="cbdArrowW" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#0ea5e9"></path>',
      '</marker>',
      '<marker id="cbdArrowH" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#ea580c"></path>',
      '</marker>',
      '<marker id="cbdArrowD" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#7c3aed"></path>',
      '</marker>',
      '<marker id="cbdArrowVertex" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#f43f5e"></path>',
      '</marker>',
      '<marker id="cbdArrowCenter" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#dc2626"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<polygon points="150,110 310,110 310,230 150,230" fill="rgba(14,165,233,0.08)" stroke="#4f46e5" stroke-width="3"></polygon>',
      '<polygon points="250,170 470,170 470,320 250,320" fill="rgba(14,165,233,0.14)" stroke="#0f4f88" stroke-width="4.5"></polygon>',
      '<line x1="150" y1="110" x2="250" y2="170" stroke="#0f4f88" stroke-width="4"></line>',
      '<line x1="310" y1="110" x2="470" y2="170" stroke="#0f4f88" stroke-width="4"></line>',
      '<line x1="310" y1="230" x2="470" y2="320" stroke="#0f4f88" stroke-width="4"></line>',
      '<line x1="150" y1="230" x2="250" y2="320" stroke="#0f4f88" stroke-width="4"></line>',
      '<line x1="250" y1="170" x2="470" y2="170" stroke="#16a34a" stroke-width="5"></line>',
      '<line x1="250" y1="170" x2="250" y2="320" stroke="#ea580c" stroke-width="5"></line>',
      '<line x1="250" y1="170" x2="150" y2="110" stroke="#0ea5e9" stroke-width="5"></line>',
      '<line x1="150" y1="110" x2="470" y2="320" stroke="#7c3aed" stroke-width="4.5"></line>',
      '<circle cx="310" cy="215" r="5" fill="#dc2626"></circle>',
      '<circle cx="250" cy="320" r="5" fill="#f43f5e"></circle>',
      '<text x="354" y="162" class="diagram-value" style="fill:#16a34a">l</text>',
      '<text x="196" y="136" class="diagram-value" style="fill:#0ea5e9">w</text>',
      '<text x="258" y="252" class="diagram-value" style="fill:#ea580c">h</text>',
      '<text x="300" y="182" class="diagram-value" style="fill:#7c3aed">D</text>',
      '<text x="316" y="210" class="diagram-value" style="fill:#dc2626">O</text>',
      '<path d="M148 60 C214 78, 286 110, 354 170" fill="none" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#cbdArrowL)"></path>',
      '<path d="M140 356 C176 320, 196 286, 250 320" fill="none" stroke="#f43f5e" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#cbdArrowVertex)"></path>',
      '<path d="M560 72 C524 88, 464 122, 206 138" fill="none" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#cbdArrowW)"></path>',
      '<path d="M572 150 C516 162, 428 198, 256 248" fill="none" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#cbdArrowH)"></path>',
      '<path d="M570 228 C510 220, 440 206, 316 188" fill="none" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#cbdArrowD)"></path>',
      '<path d="M570 352 C498 328, 430 282, 310 215" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#cbdArrowCenter)"></path>',
      '<g>',
      '<rect x="30" y="42" width="124" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="92" y="65" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Length l</text>',
      '<rect x="560" y="50" width="160" height="36" rx="18" fill="#ecfeff" stroke="#0ea5e9"></rect>',
      '<text x="640" y="73" text-anchor="middle" class="diagram-text" style="fill:#0ea5e9">Width w</text>',
      '<rect x="572" y="128" width="148" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="646" y="151" text-anchor="middle" class="diagram-text" style="fill:#ea580c">Height h</text>',
      '<rect x="560" y="206" width="160" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="640" y="229" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Space Diagonal D</text>',
      '<rect x="30" y="334" width="124" height="36" rx="18" fill="#ffe4ec" stroke="#f43f5e"></rect>',
      '<text x="92" y="357" text-anchor="middle" class="diagram-text" style="fill:#f43f5e">Vertex</text>',
      '<rect x="560" y="328" width="160" height="36" rx="18" fill="#fef2f2" stroke="#dc2626"></rect>',
      '<text x="640" y="351" text-anchor="middle" class="diagram-text" style="fill:#dc2626">Center Point O</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderTriangularPrismDiagram(diagram) {
    if (!diagram || diagram.type !== 'triangular-prism-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Triangular prism diagram with base, triangle height, prism length, triangular faces and rectangular faces labels">',
      '<defs>',
      '<marker id="tpArrowBase" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="tpArrowHeight" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#ea580c"></path>',
      '</marker>',
      '<marker id="tpArrowLength" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#7c3aed"></path>',
      '</marker>',
      '<marker id="tpArrowTriFaces" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#0ea5e9"></path>',
      '</marker>',
      '<marker id="tpArrowRectFaces" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#dc2626"></path>',
      '</marker>',
      '<marker id="tpArrowVertex" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#f43f5e"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<polygon points="180,290 300,290 240,190" fill="rgba(14,165,233,0.14)" stroke="#0f4f88" stroke-width="4.5"></polygon>',
      '<polygon points="320,220 440,220 380,120" fill="rgba(14,165,233,0.08)" stroke="#4f46e5" stroke-width="3.2"></polygon>',
      '<polygon points="180,290 300,290 440,220 320,220" fill="rgba(34,197,94,0.10)" stroke="#9bd0ff" stroke-width="1.5"></polygon>',
      '<polygon points="240,190 300,290 440,220 380,120" fill="rgba(168,85,247,0.10)" stroke="#9bd0ff" stroke-width="1.5"></polygon>',
      '<line x1="180" y1="290" x2="320" y2="220" stroke="#0f4f88" stroke-width="4"></line>',
      '<line x1="300" y1="290" x2="440" y2="220" stroke="#0f4f88" stroke-width="4"></line>',
      '<line x1="240" y1="190" x2="380" y2="120" stroke="#7c3aed" stroke-width="5"></line>',
      '<line x1="180" y1="290" x2="300" y2="290" stroke="#16a34a" stroke-width="5"></line>',
      '<line x1="240" y1="190" x2="240" y2="290" stroke="#ea580c" stroke-width="4.2" stroke-dasharray="8 7"></line>',
      '<path d="M240 290 H258 V272 H240 Z" fill="none" stroke="#ea580c" stroke-width="3.2"></path>',
      '<circle cx="180" cy="290" r="5" fill="#f43f5e"></circle>',
      '<text x="236" y="306" class="diagram-value" style="fill:#16a34a">b</text>',
      '<text x="250" y="244" class="diagram-value" style="fill:#ea580c">h_t</text>',
      '<text x="304" y="162" class="diagram-value" style="fill:#7c3aed">L</text>',
      '<path d="M152 62 C186 84, 214 118, 236 278" fill="none" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#tpArrowHeight)"></path>',
      '<path d="M150 356 C190 332, 220 316, 242 292" fill="none" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#tpArrowBase)"></path>',
      '<path d="M560 74 C514 80, 456 98, 378 122" fill="none" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#tpArrowLength)"></path>',
      '<path d="M570 166 C520 164, 468 176, 410 216" fill="none" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#tpArrowTriFaces)"></path>',
      '<path d="M570 352 C500 338, 430 318, 356 254" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#tpArrowRectFaces)"></path>',
      '<path d="M150 324 C164 312, 172 304, 180 290" fill="none" stroke="#f43f5e" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#tpArrowVertex)"></path>',
      '<g>',
      '<rect x="30" y="44" width="124" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="92" y="67" text-anchor="middle" class="diagram-text" style="fill:#ea580c">Triangle Height h_t</text>',
      '<rect x="560" y="52" width="160" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="640" y="75" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Prism Length L</text>',
      '<rect x="560" y="144" width="160" height="36" rx="18" fill="#ecfeff" stroke="#0ea5e9"></rect>',
      '<text x="640" y="167" text-anchor="middle" class="diagram-text" style="fill:#0ea5e9">Triangular Faces (2)</text>',
      '<rect x="560" y="330" width="160" height="36" rx="18" fill="#fef2f2" stroke="#dc2626"></rect>',
      '<text x="640" y="353" text-anchor="middle" class="diagram-text" style="fill:#dc2626">Rectangular Faces (3)</text>',
      '<rect x="30" y="336" width="124" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="92" y="359" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Triangle Base b</text>',
      '<rect x="30" y="300" width="124" height="30" rx="15" fill="#ffe4ec" stroke="#f43f5e"></rect>',
      '<text x="92" y="320" text-anchor="middle" class="diagram-text" style="fill:#f43f5e">Vertex</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderCylinderDiagram(diagram) {
    if (!diagram || diagram.type !== 'cylinder-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Cylinder diagram with radius, height, curved surface, circular bases and center labels">',
      '<defs>',
      '<marker id="cylArrowRadius" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="cylArrowHeight" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#ea580c"></path>',
      '</marker>',
      '<marker id="cylArrowCurved" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#7c3aed"></path>',
      '</marker>',
      '<marker id="cylArrowBase" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#0ea5e9"></path>',
      '</marker>',
      '<marker id="cylArrowCenter" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#dc2626"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<ellipse cx="250" cy="120" rx="90" ry="28" fill="rgba(14,165,233,0.22)" stroke="#0f4f88" stroke-width="4"></ellipse>',
      '<line x1="160" y1="120" x2="160" y2="300" stroke="#0f4f88" stroke-width="4"></line>',
      '<line x1="340" y1="120" x2="340" y2="300" stroke="#0f4f88" stroke-width="4"></line>',
      '<ellipse cx="250" cy="300" rx="90" ry="28" fill="rgba(14,165,233,0.16)" stroke="#0f4f88" stroke-width="4"></ellipse>',
      '<path d="M160 120 C168 230, 168 230, 160 300" fill="none" stroke="#7c3aed" stroke-width="4"></path>',
      '<path d="M340 120 C332 230, 332 230, 340 300" fill="none" stroke="#7c3aed" stroke-width="4"></path>',
      '<line x1="250" y1="120" x2="340" y2="120" stroke="#16a34a" stroke-width="4.5"></line>',
      '<line x1="130" y1="120" x2="130" y2="300" stroke="#ea580c" stroke-width="4.2" stroke-dasharray="8 7"></line>',
      '<path d="M130 300 H150 V280 H130 Z" fill="none" stroke="#ea580c" stroke-width="3.2"></path>',
      '<circle cx="250" cy="120" r="5" fill="#dc2626"></circle>',
      '<text x="293" y="110" class="diagram-value" style="fill:#16a34a">r</text>',
      '<text x="138" y="214" class="diagram-value" style="fill:#ea580c">h</text>',
      '<text x="238" y="114" class="diagram-value" style="fill:#dc2626">O</text>',
      '<path d="M144 58 C196 70, 244 88, 300 116" fill="none" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#cylArrowRadius)"></path>',
      '<path d="M142 350 C154 326, 166 290, 132 234" fill="none" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#cylArrowHeight)"></path>',
      '<path d="M574 80 C528 90, 478 116, 336 208" fill="none" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#cylArrowCurved)"></path>',
      '<path d="M572 172 C520 172, 454 188, 334 300" fill="none" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#cylArrowBase)"></path>',
      '<path d="M572 350 C500 330, 422 280, 250 120" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#cylArrowCenter)"></path>',
      '<g>',
      '<rect x="30" y="42" width="114" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="87" y="65" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Radius r</text>',
      '<rect x="30" y="334" width="114" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="87" y="357" text-anchor="middle" class="diagram-text" style="fill:#ea580c">Height h</text>',
      '<rect x="572" y="58" width="148" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="646" y="81" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Curved Surface</text>',
      '<rect x="572" y="150" width="148" height="36" rx="18" fill="#ecfeff" stroke="#0ea5e9"></rect>',
      '<text x="646" y="173" text-anchor="middle" class="diagram-text" style="fill:#0ea5e9">Circular Bases</text>',
      '<rect x="572" y="328" width="148" height="36" rx="18" fill="#fef2f2" stroke="#dc2626"></rect>',
      '<text x="646" y="351" text-anchor="middle" class="diagram-text" style="fill:#dc2626">Center O</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderConeDiagram(diagram) {
    if (!diagram || diagram.type !== 'cone-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Cone diagram with radius, height, slant height, apex, center, curved surface and circular base labels">',
      '<defs>',
      '<marker id="coneArrowR" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="coneArrowH" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#ea580c"></path>',
      '</marker>',
      '<marker id="coneArrowL" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#7c3aed"></path>',
      '</marker>',
      '<marker id="coneArrowApex" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#0ea5e9"></path>',
      '</marker>',
      '<marker id="coneArrowCurved" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#a855f7"></path>',
      '</marker>',
      '<marker id="coneArrowCenter" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#dc2626"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<ellipse cx="250" cy="300" rx="100" ry="28" fill="rgba(14,165,233,0.16)" stroke="#0f4f88" stroke-width="4"></ellipse>',
      '<path d="M250 100 L150 300" fill="none" stroke="#0f4f88" stroke-width="4.5"></path>',
      '<path d="M250 100 L350 300" fill="none" stroke="#0f4f88" stroke-width="4.5"></path>',
      '<path d="M150 300 C168 246, 188 186, 250 100" fill="none" stroke="#a855f7" stroke-width="4"></path>',
      '<path d="M350 300 C332 246, 312 186, 250 100" fill="none" stroke="#a855f7" stroke-width="4"></path>',
      '<line x1="250" y1="300" x2="350" y2="300" stroke="#16a34a" stroke-width="4.5"></line>',
      '<line x1="250" y1="100" x2="250" y2="300" stroke="#ea580c" stroke-width="4.2" stroke-dasharray="8 7"></line>',
      '<line x1="250" y1="100" x2="350" y2="300" stroke="#7c3aed" stroke-width="4.5"></line>',
      '<path d="M250 300 H270 V280 H250 Z" fill="none" stroke="#ea580c" stroke-width="3"></path>',
      '<circle cx="250" cy="300" r="5" fill="#dc2626"></circle>',
      '<circle cx="250" cy="100" r="5" fill="#0ea5e9"></circle>',
      '<text x="296" y="292" class="diagram-value" style="fill:#16a34a">r</text>',
      '<text x="258" y="208" class="diagram-value" style="fill:#ea580c">h</text>',
      '<text x="300" y="206" class="diagram-value" style="fill:#7c3aed">l</text>',
      '<text x="256" y="96" class="diagram-value" style="fill:#0ea5e9">A</text>',
      '<text x="236" y="316" class="diagram-value" style="fill:#dc2626">O</text>',
      '<path d="M146 60 C198 74, 244 94, 300 292" fill="none" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#coneArrowR)"></path>',
      '<path d="M144 350 C182 326, 224 294, 248 216" fill="none" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#coneArrowH)"></path>',
      '<path d="M572 74 C526 88, 468 118, 312 208" fill="none" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#coneArrowL)"></path>',
      '<path d="M572 150 C532 142, 478 124, 252 100" fill="none" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#coneArrowApex)"></path>',
      '<path d="M572 228 C516 220, 456 224, 340 262" fill="none" stroke="#a855f7" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#coneArrowCurved)"></path>',
      '<path d="M572 350 C502 332, 430 312, 250 300" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#coneArrowCenter)"></path>',
      '<g>',
      '<rect x="30" y="42" width="114" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="87" y="65" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Radius r</text>',
      '<rect x="30" y="334" width="114" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="87" y="357" text-anchor="middle" class="diagram-text" style="fill:#ea580c">Height h</text>',
      '<rect x="572" y="52" width="148" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="646" y="75" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Slant Height l</text>',
      '<rect x="572" y="128" width="148" height="36" rx="18" fill="#ecfeff" stroke="#0ea5e9"></rect>',
      '<text x="646" y="151" text-anchor="middle" class="diagram-text" style="fill:#0ea5e9">Apex</text>',
      '<rect x="572" y="206" width="148" height="36" rx="18" fill="#f3e8ff" stroke="#a855f7"></rect>',
      '<text x="646" y="229" text-anchor="middle" class="diagram-text" style="fill:#a855f7">Curved Surface</text>',
      '<rect x="572" y="328" width="148" height="36" rx="18" fill="#fef2f2" stroke="#dc2626"></rect>',
      '<text x="646" y="351" text-anchor="middle" class="diagram-text" style="fill:#dc2626">Center O</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderSphereDiagram(diagram) {
    if (!diagram || diagram.type !== 'sphere-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Sphere diagram with radius, diameter, great circle, curved surface and center labels">',
      '<defs>',
      '<marker id="sphArrowR" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="sphArrowD" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#ea580c"></path>',
      '</marker>',
      '<marker id="sphArrowGreat" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#7c3aed"></path>',
      '</marker>',
      '<marker id="sphArrowSurface" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#0ea5e9"></path>',
      '</marker>',
      '<marker id="sphArrowCenter" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#dc2626"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<circle cx="250" cy="210" r="118" fill="rgba(14,165,233,0.16)" stroke="#0f4f88" stroke-width="4.5"></circle>',
      '<ellipse cx="250" cy="210" rx="118" ry="30" fill="none" stroke="#7c3aed" stroke-width="4"></ellipse>',
      '<line x1="250" y1="210" x2="340" y2="210" stroke="#16a34a" stroke-width="4.5"></line>',
      '<line x1="132" y1="210" x2="368" y2="210" stroke="#ea580c" stroke-width="4.5" stroke-dasharray="10 8"></line>',
      '<circle cx="250" cy="210" r="5" fill="#dc2626"></circle>',
      '<text x="292" y="202" class="diagram-value" style="fill:#16a34a">r</text>',
      '<text x="242" y="228" class="diagram-value" style="fill:#dc2626">O</text>',
      '<text x="218" y="202" class="diagram-value" style="fill:#ea580c">d</text>',
      '<text x="292" y="198" class="diagram-value" style="fill:#7c3aed">Great Circle</text>',
      '<path d="M146 60 C188 76, 236 102, 302 206" fill="none" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#sphArrowR)"></path>',
      '<path d="M140 350 C186 334, 230 302, 168 210" fill="none" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#sphArrowD)"></path>',
      '<path d="M572 74 C536 82, 488 104, 360 210" fill="none" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#sphArrowGreat)"></path>',
      '<path d="M572 164 C522 164, 462 172, 344 130" fill="none" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#sphArrowSurface)"></path>',
      '<path d="M572 350 C502 332, 432 300, 250 210" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#sphArrowCenter)"></path>',
      '<g>',
      '<rect x="30" y="42" width="114" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="87" y="65" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Radius r</text>',
      '<rect x="30" y="334" width="114" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="87" y="357" text-anchor="middle" class="diagram-text" style="fill:#ea580c">Diameter d</text>',
      '<rect x="572" y="52" width="148" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="646" y="75" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Great Circle</text>',
      '<rect x="572" y="142" width="148" height="36" rx="18" fill="#ecfeff" stroke="#0ea5e9"></rect>',
      '<text x="646" y="165" text-anchor="middle" class="diagram-text" style="fill:#0ea5e9">Curved Surface</text>',
      '<rect x="572" y="328" width="148" height="36" rx="18" fill="#fef2f2" stroke="#dc2626"></rect>',
      '<text x="646" y="351" text-anchor="middle" class="diagram-text" style="fill:#dc2626">Center O</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderHemisphereDiagram(diagram) {
    if (!diagram || diagram.type !== 'hemisphere-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Hemisphere diagram with radius, diameter, center, curved surface and base circle labels">',
      '<defs>',
      '<marker id="hemiArrowR" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="hemiArrowD" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#ea580c"></path>',
      '</marker>',
      '<marker id="hemiArrowCurved" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#7c3aed"></path>',
      '</marker>',
      '<marker id="hemiArrowBase" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#0ea5e9"></path>',
      '</marker>',
      '<marker id="hemiArrowCenter" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#dc2626"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<path d="M132 280 A118 118 0 0 1 368 280" fill="rgba(14,165,233,0.18)" stroke="#0f4f88" stroke-width="4.5"></path>',
      '<line x1="132" y1="280" x2="368" y2="280" stroke="#ea580c" stroke-width="4.5" stroke-dasharray="10 8"></line>',
      '<ellipse cx="250" cy="280" rx="118" ry="24" fill="rgba(14,165,233,0.12)" stroke="#0ea5e9" stroke-width="3.5"></ellipse>',
      '<line x1="250" y1="280" x2="340" y2="280" stroke="#16a34a" stroke-width="4.5"></line>',
      '<circle cx="250" cy="280" r="5" fill="#dc2626"></circle>',
      '<text x="292" y="272" class="diagram-value" style="fill:#16a34a">r</text>',
      '<text x="218" y="272" class="diagram-value" style="fill:#ea580c">d</text>',
      '<text x="242" y="298" class="diagram-value" style="fill:#dc2626">O</text>',
      '<path d="M146 60 C188 84, 228 110, 304 276" fill="none" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#hemiArrowR)"></path>',
      '<path d="M146 350 C188 338, 232 320, 170 280" fill="none" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#hemiArrowD)"></path>',
      '<path d="M572 74 C536 88, 486 112, 320 198" fill="none" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#hemiArrowCurved)"></path>',
      '<path d="M572 164 C522 164, 468 174, 360 270" fill="none" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#hemiArrowBase)"></path>',
      '<path d="M572 350 C502 332, 432 310, 250 280" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#hemiArrowCenter)"></path>',
      '<g>',
      '<rect x="30" y="42" width="114" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="87" y="65" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Radius r</text>',
      '<rect x="30" y="334" width="114" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="87" y="357" text-anchor="middle" class="diagram-text" style="fill:#ea580c">Diameter d</text>',
      '<rect x="572" y="52" width="148" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="646" y="75" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Curved Surface</text>',
      '<rect x="572" y="142" width="148" height="36" rx="18" fill="#ecfeff" stroke="#0ea5e9"></rect>',
      '<text x="646" y="165" text-anchor="middle" class="diagram-text" style="fill:#0ea5e9">Base Circle</text>',
      '<rect x="572" y="328" width="148" height="36" rx="18" fill="#fef2f2" stroke="#dc2626"></rect>',
      '<text x="646" y="351" text-anchor="middle" class="diagram-text" style="fill:#dc2626">Center O</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderSquarePyramidDiagram(diagram) {
    if (!diagram || diagram.type !== 'square-pyramid-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Square pyramid diagram with base side, height, slant height, apex and base center labels">',
      '<defs>',
      '<marker id="spArrowA" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="spArrowH" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#ea580c"></path>',
      '</marker>',
      '<marker id="spArrowL" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#7c3aed"></path>',
      '</marker>',
      '<marker id="spArrowApex" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#0ea5e9"></path>',
      '</marker>',
      '<marker id="spArrowCenter" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#dc2626"></path>',
      '</marker>',
      '<marker id="spArrowFace" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#a855f7"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<polygon points="180,300 340,300 430,250 270,250" fill="rgba(14,165,233,0.12)" stroke="#0f4f88" stroke-width="4"></polygon>',
      '<polygon points="270,110 180,300 270,250" fill="rgba(168,85,247,0.10)" stroke="#0f4f88" stroke-width="3.5"></polygon>',
      '<polygon points="270,110 340,300 430,250" fill="rgba(168,85,247,0.10)" stroke="#0f4f88" stroke-width="3.5"></polygon>',
      '<polygon points="270,110 180,300 340,300" fill="rgba(168,85,247,0.08)" stroke="#0f4f88" stroke-width="3.5"></polygon>',
      '<polygon points="270,110 270,250 430,250" fill="rgba(168,85,247,0.08)" stroke="#0f4f88" stroke-width="3.5"></polygon>',
      '<line x1="180" y1="300" x2="340" y2="300" stroke="#16a34a" stroke-width="5"></line>',
      '<line x1="270" y1="110" x2="270" y2="275" stroke="#ea580c" stroke-width="4.2" stroke-dasharray="8 7"></line>',
      '<line x1="270" y1="110" x2="260" y2="250" stroke="#7c3aed" stroke-width="4.5"></line>',
      '<circle cx="270" cy="275" r="5" fill="#dc2626"></circle>',
      '<circle cx="270" cy="110" r="5" fill="#0ea5e9"></circle>',
      '<path d="M270 275 H288 V257 H270 Z" fill="none" stroke="#ea580c" stroke-width="3"></path>',
      '<text x="246" y="302" class="diagram-value" style="fill:#16a34a">a</text>',
      '<text x="278" y="206" class="diagram-value" style="fill:#ea580c">h</text>',
      '<text x="254" y="188" class="diagram-value" style="fill:#7c3aed">l</text>',
      '<text x="278" y="106" class="diagram-value" style="fill:#0ea5e9">A</text>',
      '<text x="278" y="286" class="diagram-value" style="fill:#dc2626">O</text>',
      '<path d="M146 60 C194 80, 226 102, 246 294" fill="none" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#spArrowA)"></path>',
      '<path d="M146 350 C184 332, 224 298, 272 214" fill="none" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#spArrowH)"></path>',
      '<path d="M572 74 C526 90, 470 116, 262 188" fill="none" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#spArrowL)"></path>',
      '<path d="M572 150 C534 142, 476 126, 272 110" fill="none" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#spArrowApex)"></path>',
      '<path d="M572 350 C502 332, 432 308, 270 275" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#spArrowCenter)"></path>',
      '<path d="M572 230 C520 226, 466 226, 384 242" fill="none" stroke="#a855f7" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#spArrowFace)"></path>',
      '<g>',
      '<rect x="30" y="42" width="118" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="89" y="65" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Base Side a</text>',
      '<rect x="30" y="334" width="118" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="89" y="357" text-anchor="middle" class="diagram-text" style="fill:#ea580c">Height h</text>',
      '<rect x="572" y="52" width="148" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="646" y="75" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Slant Height l</text>',
      '<rect x="572" y="128" width="148" height="36" rx="18" fill="#ecfeff" stroke="#0ea5e9"></rect>',
      '<text x="646" y="151" text-anchor="middle" class="diagram-text" style="fill:#0ea5e9">Apex A</text>',
      '<rect x="572" y="208" width="148" height="36" rx="18" fill="#f3e8ff" stroke="#a855f7"></rect>',
      '<text x="646" y="231" text-anchor="middle" class="diagram-text" style="fill:#a855f7">Triangular Face</text>',
      '<rect x="572" y="328" width="148" height="36" rx="18" fill="#fef2f2" stroke="#dc2626"></rect>',
      '<text x="646" y="351" text-anchor="middle" class="diagram-text" style="fill:#dc2626">Base Center O</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderTriangularPyramidDiagram(diagram) {
    if (!diagram || diagram.type !== 'triangular-pyramid-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Triangular pyramid diagram with base triangle, height, slant edge, apex and base center labels">',
      '<defs>',
      '<marker id="tpyrArrowBase" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="tpyrArrowH" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#ea580c"></path>',
      '</marker>',
      '<marker id="tpyrArrowE" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#7c3aed"></path>',
      '</marker>',
      '<marker id="tpyrArrowApex" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#0ea5e9"></path>',
      '</marker>',
      '<marker id="tpyrArrowCenter" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#dc2626"></path>',
      '</marker>',
      '<marker id="tpyrArrowFaces" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L10,5 L0,10 z" fill="#a855f7"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<polygon points="180,292 355,304 275,222" fill="rgba(14,165,233,0.12)" stroke="#0f4f88" stroke-width="4"></polygon>',
      '<polygon points="270,108 180,292 275,222" fill="rgba(168,85,247,0.10)" stroke="#0f4f88" stroke-width="3.5"></polygon>',
      '<polygon points="270,108 355,304 275,222" fill="rgba(168,85,247,0.10)" stroke="#0f4f88" stroke-width="3.5"></polygon>',
      '<polygon points="270,108 180,292 355,304" fill="rgba(168,85,247,0.08)" stroke="#0f4f88" stroke-width="3.5"></polygon>',
      '<line x1="180" y1="292" x2="355" y2="304" stroke="#16a34a" stroke-width="5"></line>',
      '<line x1="270" y1="108" x2="270" y2="252" stroke="#ea580c" stroke-width="4.2" stroke-dasharray="8 7"></line>',
      '<line x1="270" y1="108" x2="355" y2="304" stroke="#7c3aed" stroke-width="4.5"></line>',
      '<circle cx="270" cy="252" r="5" fill="#dc2626"></circle>',
      '<circle cx="270" cy="108" r="5" fill="#0ea5e9"></circle>',
      '<path d="M270 252 H288 V234 H270 Z" fill="none" stroke="#ea580c" stroke-width="3"></path>',
      '<text x="258" y="300" class="diagram-value" style="fill:#16a34a">base</text>',
      '<text x="278" y="188" class="diagram-value" style="fill:#ea580c">h</text>',
      '<text x="320" y="196" class="diagram-value" style="fill:#7c3aed">e</text>',
      '<text x="278" y="104" class="diagram-value" style="fill:#0ea5e9">A</text>',
      '<text x="278" y="264" class="diagram-value" style="fill:#dc2626">O</text>',
      '<path d="M146 60 C190 78, 224 106, 252 294" fill="none" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#tpyrArrowBase)"></path>',
      '<path d="M146 350 C182 334, 224 300, 274 196" fill="none" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#tpyrArrowH)"></path>',
      '<path d="M572 74 C526 90, 472 116, 324 194" fill="none" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#tpyrArrowE)"></path>',
      '<path d="M572 150 C534 144, 476 126, 272 108" fill="none" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#tpyrArrowApex)"></path>',
      '<path d="M572 350 C500 334, 426 310, 270 252" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#tpyrArrowCenter)"></path>',
      '<path d="M572 230 C524 226, 470 226, 318 258" fill="none" stroke="#a855f7" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#tpyrArrowFaces)"></path>',
      '<g>',
      '<rect x="30" y="42" width="124" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="92" y="65" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Base Triangle</text>',
      '<rect x="30" y="334" width="124" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="92" y="357" text-anchor="middle" class="diagram-text" style="fill:#ea580c">Height h</text>',
      '<rect x="572" y="52" width="148" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="646" y="75" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Slant Edge e</text>',
      '<rect x="572" y="128" width="148" height="36" rx="18" fill="#ecfeff" stroke="#0ea5e9"></rect>',
      '<text x="646" y="151" text-anchor="middle" class="diagram-text" style="fill:#0ea5e9">Apex A</text>',
      '<rect x="572" y="208" width="148" height="36" rx="18" fill="#f3e8ff" stroke="#a855f7"></rect>',
      '<text x="646" y="231" text-anchor="middle" class="diagram-text" style="fill:#a855f7">Triangular Faces</text>',
      '<rect x="572" y="328" width="148" height="36" rx="18" fill="#fef2f2" stroke="#dc2626"></rect>',
      '<text x="646" y="351" text-anchor="middle" class="diagram-text" style="fill:#dc2626">Base Center O</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderTriangleTypesDiagram(diagram) {
    if (!diagram || diagram.type !== 'triangle-types-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Triangle types diagram showing scalene, isosceles, and equilateral triangles">',
      '<defs>',
      '<marker id="triArrowScalene" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#0ea5e9"></path>',
      '</marker>',
      '<marker id="triArrowIso" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="triArrowEq" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#7c3aed"></path>',
      '</marker>',
      '<marker id="triArrowAngle" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#ea580c"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<polygon points="90,300 170,120 250,282" fill="rgba(14,165,233,0.12)" stroke="#0ea5e9" stroke-width="4.5"></polygon>',
      '<line x1="170" y1="120" x2="164" y2="296" stroke="#ea580c" stroke-width="4" stroke-dasharray="8 7"></line>',
      '<text x="126" y="311" class="diagram-value" style="fill:#ea580c">b</text>',
      '<text x="174" y="214" class="diagram-value" style="fill:#ea580c">h</text>',
      '<polygon points="290,300 360,140 430,300" fill="rgba(22,163,74,0.12)" stroke="#16a34a" stroke-width="4.5"></polygon>',
      '<line x1="324" y1="216" x2="342" y2="224" stroke="#16a34a" stroke-width="3"></line>',
      '<line x1="396" y1="216" x2="378" y2="224" stroke="#16a34a" stroke-width="3"></line>',
      '<polygon points="500,300 620,300 560,196" fill="rgba(124,58,237,0.12)" stroke="#7c3aed" stroke-width="4.5"></polygon>',
      '<text x="546" y="286" class="diagram-value" style="fill:#7c3aed">60</text>',
      '<text x="529" y="315" class="diagram-value" style="fill:#7c3aed">60</text>',
      '<text x="583" y="315" class="diagram-value" style="fill:#7c3aed">60</text>',
      '<path d="M560 86 C520 72, 464 80, 420 112" fill="none" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#triArrowAngle)"></path>',
      '<path d="M632 118 C604 116, 576 132, 556 182" fill="none" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#triArrowEq)"></path>',
      '<path d="M640 182 C606 180, 540 194, 398 214" fill="none" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#triArrowIso)"></path>',
      '<path d="M630 248 C560 254, 472 262, 238 262" fill="none" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#triArrowScalene)"></path>',
      '<g>',
      '<rect x="538" y="68" width="182" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="629" y="91" text-anchor="middle" class="diagram-text" style="fill:#ea580c">A + B + C = 180 deg</text>',
      '<rect x="602" y="104" width="118" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="661" y="127" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Equilateral</text>',
      '<rect x="612" y="166" width="108" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="666" y="189" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Isosceles</text>',
      '<rect x="618" y="232" width="102" height="36" rx="18" fill="#ecfeff" stroke="#0ea5e9"></rect>',
      '<text x="669" y="255" text-anchor="middle" class="diagram-text" style="fill:#0ea5e9">Scalene</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderRightTriangleDiagram(diagram) {
    if (!diagram || diagram.type !== 'right-triangle-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Right triangle diagram with perpendicular sides, hypotenuse, and right angle">',
      '<defs>',
      '<marker id="rtArrowA" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="rtArrowB" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#0ea5e9"></path>',
      '</marker>',
      '<marker id="rtArrowC" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#7c3aed"></path>',
      '</marker>',
      '<marker id="rtArrow90" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#ea580c"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<polygon points="110,310 110,110 370,310" fill="rgba(14,165,233,0.12)" stroke="#0f4f88" stroke-width="4.5"></polygon>',
      '<line x1="110" y1="310" x2="110" y2="110" stroke="#16a34a" stroke-width="5"></line>',
      '<line x1="110" y1="310" x2="370" y2="310" stroke="#0ea5e9" stroke-width="5"></line>',
      '<line x1="110" y1="110" x2="370" y2="310" stroke="#7c3aed" stroke-width="5"></line>',
      '<path d="M110 310 H136 V284 H110 Z" fill="none" stroke="#ea580c" stroke-width="4"></path>',
      '<text x="92" y="214" class="diagram-value" style="fill:#16a34a">a</text>',
      '<text x="234" y="330" class="diagram-value" style="fill:#0ea5e9">b</text>',
      '<text x="246" y="198" class="diagram-value" style="fill:#7c3aed">c (hypotenuse)</text>',
      '<text x="148" y="278" class="diagram-value" style="fill:#ea580c">90 deg</text>',
      '<path d="M548 92 C482 84, 422 92, 156 184" fill="none" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#rtArrowA)"></path>',
      '<path d="M620 158 C534 156, 444 174, 236 310" fill="none" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#rtArrowB)"></path>',
      '<path d="M618 244 C530 240, 450 236, 246 214" fill="none" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#rtArrowC)"></path>',
      '<path d="M586 356 C484 344, 388 332, 136 296" fill="none" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#rtArrow90)"></path>',
      '<g>',
      '<rect x="602" y="72" width="118" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="661" y="95" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Leg a</text>',
      '<rect x="602" y="140" width="118" height="36" rx="18" fill="#ecfeff" stroke="#0ea5e9"></rect>',
      '<text x="661" y="163" text-anchor="middle" class="diagram-text" style="fill:#0ea5e9">Leg b</text>',
      '<rect x="580" y="224" width="140" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="650" y="247" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Hypotenuse c</text>',
      '<rect x="580" y="338" width="140" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="650" y="361" text-anchor="middle" class="diagram-text" style="fill:#ea580c">Right Angle</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderCircleDiagram(diagram) {
    if (!diagram || diagram.type !== 'circle-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Circle diagram with radius, diameter, circumference and center labels">',
      '<defs>',
      '<marker id="arrowCirc" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#7c3aed"></path>',
      '</marker>',
      '<marker id="arrowRadius" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="arrowDiameter" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#ea580c"></path>',
      '</marker>',
      '<marker id="arrowCenter" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#dc2626"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<circle cx="220" cy="210" r="122" fill="rgba(14,165,233,0.12)" stroke="#7c3aed" stroke-width="5"></circle>',
      '<line x1="220" y1="210" x2="306" y2="124" stroke="#16a34a" stroke-width="5"></line>',
      '<line x1="98" y1="210" x2="342" y2="210" stroke="#ea580c" stroke-width="5" stroke-dasharray="10 8"></line>',
      '<circle cx="220" cy="210" r="5" fill="#dc2626"></circle>',
      '<path d="M540 94 C480 82, 408 88, 316 126" fill="none" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#arrowCirc)"></path>',
      '<path d="M620 172 C530 166, 430 154, 306 124" fill="none" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#arrowRadius)"></path>',
      '<path d="M610 284 C518 270, 422 250, 304 210" fill="none" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#arrowDiameter)"></path>',
      '<path d="M582 356 C498 340, 392 320, 220 210" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#arrowCenter)"></path>',
      '<circle cx="306" cy="124" r="4" fill="#16a34a"></circle>',
      '<g>',
      '<rect x="548" y="72" width="162" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="629" y="95" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Circumference</text>',
      '<rect x="628" y="154" width="92" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="674" y="177" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Radius</text>',
      '<rect x="618" y="266" width="102" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="669" y="289" text-anchor="middle" class="diagram-text" style="fill:#ea580c">Diameter</text>',
      '<rect x="580" y="338" width="140" height="36" rx="18" fill="#fef2f2" stroke="#dc2626"></rect>',
      '<text x="650" y="361" text-anchor="middle" class="diagram-text" style="fill:#dc2626">Center Point</text>',
      '</g>',
      '<g>',
      '<text x="209" y="228" class="diagram-value" style="fill:#dc2626">O</text>',
      '<text x="258" y="170" class="diagram-value" style="fill:#16a34a">r</text>',
      '<text x="214" y="246" class="diagram-value" style="fill:#ea580c">d = 2r</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderSemicircleDiagram(diagram) {
    if (!diagram || diagram.type !== 'semicircle-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Semicircle diagram with arc, radius, diameter and center labels">',
      '<defs>',
      '<marker id="semiArrowArc" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#7c3aed"></path>',
      '</marker>',
      '<marker id="semiArrowRadius" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="semiArrowDiameter" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#ea580c"></path>',
      '</marker>',
      '<marker id="semiArrowCenter" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#dc2626"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<circle cx="220" cy="260" r="120" fill="rgba(14,165,233,0.12)" stroke="#7c3aed" stroke-width="5"></circle>',
      '<rect x="90" y="260" width="260" height="150" fill="#f8fcff"></rect>',
      '<line x1="100" y1="260" x2="340" y2="260" stroke="#ea580c" stroke-width="5" stroke-dasharray="10 8"></line>',
      '<line x1="220" y1="260" x2="220" y2="140" stroke="#16a34a" stroke-width="5"></line>',
      '<circle cx="220" cy="260" r="5" fill="#dc2626"></circle>',
      '<path d="M540 92 C470 82, 380 98, 240 142" fill="none" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#semiArrowArc)"></path>',
      '<path d="M616 170 C516 166, 406 170, 220 178" fill="none" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#semiArrowRadius)"></path>',
      '<path d="M600 286 C510 278, 402 270, 286 260" fill="none" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#semiArrowDiameter)"></path>',
      '<path d="M578 356 C480 346, 380 330, 220 260" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#semiArrowCenter)"></path>',
      '<g>',
      '<rect x="548" y="72" width="170" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="633" y="95" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Curved Arc</text>',
      '<rect x="622" y="152" width="98" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="671" y="175" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Radius</text>',
      '<rect x="606" y="268" width="114" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="663" y="291" text-anchor="middle" class="diagram-text" style="fill:#ea580c">Diameter</text>',
      '<rect x="580" y="338" width="140" height="36" rx="18" fill="#fef2f2" stroke="#dc2626"></rect>',
      '<text x="650" y="361" text-anchor="middle" class="diagram-text" style="fill:#dc2626">Center Point</text>',
      '</g>',
      '<g>',
      '<text x="208" y="278" class="diagram-value" style="fill:#dc2626">O</text>',
      '<text x="228" y="198" class="diagram-value" style="fill:#16a34a">r</text>',
      '<text x="214" y="248" class="diagram-value" style="fill:#16a34a">Arc = pi r</text>',
      '<text x="202" y="286" class="diagram-value" style="fill:#ea580c">d = 2r</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderSectorDiagram(diagram) {
    if (!diagram || diagram.type !== 'sector-labeled') return '';
    var caption = diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '';
    return [
      '<div class="diagram-shell">',
      '<svg class="diagram-svg" viewBox="0 0 760 420" role="img" aria-label="Sector diagram with central angle, radius, arc length and center labels">',
      '<defs>',
      '<marker id="sectorArrowArc" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#7c3aed"></path>',
      '</marker>',
      '<marker id="sectorArrowRadius" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#16a34a"></path>',
      '</marker>',
      '<marker id="sectorArrowAngle" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#ea580c"></path>',
      '</marker>',
      '<marker id="sectorArrowCenter" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">',
      '<path d="M0,0 L12,6 L0,12 z" fill="#dc2626"></path>',
      '</marker>',
      '</defs>',
      '<rect x="16" y="16" width="728" height="388" rx="22" fill="#f8fcff" stroke="#d5e4f8"></rect>',
      '<path d="M220 270 L220 150 A120 120 0 0 1 332.76 229 L220 270 Z" fill="rgba(14,165,233,0.16)" stroke="#9bd0ff" stroke-width="1.5"></path>',
      '<line x1="220" y1="270" x2="220" y2="150" stroke="#16a34a" stroke-width="5"></line>',
      '<line x1="220" y1="270" x2="332.76" y2="229" stroke="#16a34a" stroke-width="5"></line>',
      '<path d="M220 228 A42 42 0 0 1 259.5 255" fill="none" stroke="#ea580c" stroke-width="5"></path>',
      '<path d="M220 150 A120 120 0 0 1 332.76 229" fill="none" stroke="#7c3aed" stroke-width="5"></path>',
      '<circle cx="220" cy="270" r="5" fill="#dc2626"></circle>',
      '<path d="M548 90 C474 80, 392 94, 308 170" fill="none" stroke="#7c3aed" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#sectorArrowArc)"></path>',
      '<path d="M620 166 C520 164, 414 176, 292 244" fill="none" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#sectorArrowRadius)"></path>',
      '<path d="M610 282 C520 270, 424 262, 253 247" fill="none" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#sectorArrowAngle)"></path>',
      '<path d="M582 356 C486 344, 392 330, 220 270" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round" marker-end="url(#sectorArrowCenter)"></path>',
      '<g>',
      '<rect x="548" y="70" width="170" height="36" rx="18" fill="#f5f0ff" stroke="#7c3aed"></rect>',
      '<text x="633" y="93" text-anchor="middle" class="diagram-text" style="fill:#7c3aed">Arc Length (L)</text>',
      '<rect x="622" y="148" width="98" height="36" rx="18" fill="#effdf3" stroke="#16a34a"></rect>',
      '<text x="671" y="171" text-anchor="middle" class="diagram-text" style="fill:#16a34a">Radius</text>',
      '<rect x="596" y="264" width="124" height="36" rx="18" fill="#fff4ed" stroke="#ea580c"></rect>',
      '<text x="658" y="287" text-anchor="middle" class="diagram-text" style="fill:#ea580c">Angle (theta)</text>',
      '<rect x="580" y="338" width="140" height="36" rx="18" fill="#fef2f2" stroke="#dc2626"></rect>',
      '<text x="650" y="361" text-anchor="middle" class="diagram-text" style="fill:#dc2626">Center Point</text>',
      '</g>',
      '<g>',
      '<text x="208" y="288" class="diagram-value" style="fill:#dc2626">O</text>',
      '<text x="230" y="205" class="diagram-value" style="fill:#16a34a">r</text>',
      '<text x="275" y="246" class="diagram-value" style="fill:#16a34a">r</text>',
      '<text x="236" y="248" class="diagram-value" style="fill:#ea580c">theta</text>',
      '<text x="252" y="154" class="diagram-value" style="fill:#7c3aed">L</text>',
      '</g>',
      '</svg>',
      caption,
      '</div>'
    ].join('');
  }

  function renderDiagram(diagram) {
    if (!diagram) return '';
    if (diagram.type === 'square-labeled') return renderSquareDiagram(diagram);
    if (diagram.type === 'rectangle-labeled') return renderRectangleDiagram(diagram);
    if (diagram.type === 'parallelogram-labeled') return renderParallelogramDiagram(diagram);
    if (diagram.type === 'trapezium-labeled') return renderTrapeziumDiagram(diagram);
    if (diagram.type === 'rhombus-labeled') return renderRhombusDiagram(diagram);
    if (diagram.type === 'kite-labeled') return renderKiteDiagram(diagram);
    if (diagram.type === 'pentagon-labeled') return renderPentagonDiagram(diagram);
    if (diagram.type === 'hexagon-labeled') return renderHexagonDiagram(diagram);
    if (diagram.type === 'heptagon-labeled') return renderHeptagonDiagram(diagram);
    if (diagram.type === 'octagon-labeled') return renderOctagonDiagram(diagram);
    if (diagram.type === 'nonagon-labeled') return renderNonagonDiagram(diagram);
    if (diagram.type === 'decagon-labeled') return renderDecagonDiagram(diagram);
    if (diagram.type === 'cube-labeled') return renderCubeDiagram(diagram);
    if (diagram.type === 'cuboid-labeled') return renderCuboidDiagram(diagram);
    if (diagram.type === 'triangular-prism-labeled') return renderTriangularPrismDiagram(diagram);
    if (diagram.type === 'cylinder-labeled') return renderCylinderDiagram(diagram);
    if (diagram.type === 'cone-labeled') return renderConeDiagram(diagram);
    if (diagram.type === 'sphere-labeled') return renderSphereDiagram(diagram);
    if (diagram.type === 'hemisphere-labeled') return renderHemisphereDiagram(diagram);
    if (diagram.type === 'square-pyramid-labeled') return renderSquarePyramidDiagram(diagram);
    if (diagram.type === 'triangular-pyramid-labeled') return renderTriangularPyramidDiagram(diagram);
    if (diagram.type === 'triangle-types-labeled') return renderTriangleTypesDiagram(diagram);
    if (diagram.type === 'right-triangle-labeled') return renderRightTriangleDiagram(diagram);
    if (diagram.type === 'circle-labeled') return renderCircleDiagram(diagram);
    if (diagram.type === 'semicircle-labeled') return renderSemicircleDiagram(diagram);
    if (diagram.type === 'sector-labeled') return renderSectorDiagram(diagram);
    return '';
  }

  function toneClass(tone) {
    return tone ? (' tone-' + tone) : '';
  }

  function renderListCard(title, items, tone) {
    if (!items || !items.length) return '';
    var html = '';
    html += '<article class="card' + toneClass(tone) + '">';
    html += '<h2>' + fmt(title) + '</h2>';
    html += '<ul class="list">';
    items.forEach(function (item) {
      html += '<li>' + fmt(item) + '</li>';
    });
    html += '</ul>';
    html += '</article>';
    return html;
  }

  function renderMeasurements(measurements, tone) {
    if (!measurements || !measurements.length) return '';
    var html = '';
    html += '<article class="card full' + toneClass(tone) + '">';
    html += '<h2>Area, Perimeter, Volume Guide</h2>';
    html += '<div class="measure-grid">';
    measurements.forEach(function (m) {
      html += '<div class="measure-item">';
      html += '<div class="measure-top">';
      html += '<strong>' + fmt(m.label) + '</strong>';
      html += '<span class="pill ' + (m.applicable ? 'pill-yes' : 'pill-no') + '">' + (m.applicable ? 'Applicable' : 'Not Applicable') + '</span>';
      html += '</div>';
      if (m.formula) html += '<div class="measure-formula">' + fmt(m.formula) + '</div>';
      if (m.idea) html += '<p class="measure-note">' + fmt(m.idea) + '</p>';
      html += '</div>';
    });
    html += '</div>';
    html += '</article>';
    return html;
  }

  function renderFormulaMeaning(items, tone) {
    if (!items || !items.length) return '';
    var html = '';
    html += '<article class="card full' + toneClass(tone) + '">';
    html += '<h2>Formula Understanding</h2>';
    html += '<div class="formula-meaning">';
    items.forEach(function (item) {
      html += '<div class="formula-meaning-item">';
      html += '<h3>' + fmt(item.title) + '</h3>';
      if (item.formula) html += '<div class="formula-eq">' + fmt(item.formula) + '</div>';
      html += '<ul class="list">';
      (item.steps || []).forEach(function (step) {
        html += '<li>' + fmt(step) + '</li>';
      });
      html += '</ul>';
      html += '</div>';
    });
    html += '</div>';
    html += '</article>';
    return html;
  }

  function findFormula(shapeFormulas, keywords) {
    var i;
    for (i = 0; i < shapeFormulas.length; i += 1) {
      var f = shapeFormulas[i];
      var blob = ((f.label || '') + ' ' + (f.formula || '')).toLowerCase();
      var has = keywords.some(function (k) { return blob.indexOf(k) !== -1; });
      if (has) return f;
    }
    return null;
  }

  function compactText(text) {
    return String(text || '').toLowerCase().replace(/\s+/g, '');
  }

  function buildAutoMeasurements(shapeData) {
    var formulas = shapeData.formulas || [];
    var perimeterFormula = findFormula(formulas, ['perimeter', 'circumference']);
    var areaFormula = findFormula(formulas, ['surface area', 'curved surface area', 'area']);
    var volumeFormula = findFormula(formulas, ['volume']);
    var is3D = (shapeData.family || '').toLowerCase().indexOf('3d') !== -1;

    return [
      {
        label: 'Perimeter / Circumference',
        applicable: !!perimeterFormula,
        formula: perimeterFormula ? perimeterFormula.formula : '',
        idea: perimeterFormula
          ? 'Use this when you need the distance around the outer boundary.'
          : (is3D ? 'Usually not used directly for 3D solids. Use surface area or volume instead.' : 'This page has no direct perimeter/circumference formula listed.')
      },
      {
        label: areaFormula && areaFormula.label ? areaFormula.label : 'Area / Surface Area',
        applicable: !!areaFormula,
        formula: areaFormula ? areaFormula.formula : '',
        idea: areaFormula
          ? 'Use this when you need the inside region (2D) or outside covering (3D surface).'
          : 'Not provided as a direct formula for this specific shape page.'
      },
      {
        label: 'Volume',
        applicable: !!volumeFormula,
        formula: volumeFormula ? volumeFormula.formula : '',
        idea: volumeFormula
          ? 'Use this for capacity: how much space is inside a 3D object.'
          : 'Not applicable for 2D shapes, and not listed for this shape.'
      }
    ];
  }

  function buildAutoUseCases(shapeData, measurements) {
    var cases = [];
    var perimeter = measurements[0];
    var area = measurements[1];
    var volume = measurements[2];
    var formulaBlob = (shapeData.formulas || []).map(function (f) {
      return ((f.label || '') + ' ' + (f.formula || '')).toLowerCase();
    }).join(' ');

    cases.push('Equations turn a drawing into measurable values, so we can plan material, space, and cost correctly.');
    if (perimeter && perimeter.applicable) {
      cases.push('Perimeter or circumference helps in fencing, ribbon length, wire around a frame, track length, or border measurement.');
    }
    if (area && area.applicable) {
      cases.push('Area or surface area helps in painting walls, tiling floors, wrapping boxes, or covering objects with fabric/paper.');
    }
    if (volume && volume.applicable) {
      cases.push('Volume helps in filling tanks, packing boxes, measuring storage, and estimating how much liquid a container can hold.');
    }
    if (formulaBlob.indexOf('angle') !== -1 || (shapeData.properties || []).join(' ').toLowerCase().indexOf('angle') !== -1) {
      cases.push('Angle formulas are useful in design, architecture, navigation, and checking if parts fit together accurately.');
    }
    if (cases.length < 4) {
      cases.push('Builders, designers, and students use these formulas to avoid guesswork and reduce mistakes.');
    }
    return cases;
  }

  function buildNumericPractice(formula, shapeName) {
    if (!formula) return null;
    var compact = compactText(formula.formula);
    var result = null;

    if (compact.indexOf('p=4a') !== -1) {
      result = { question: 'If side a = 6 cm, find perimeter of the ' + shapeName + '.', answer: 'P = 4 x 6 = 24 cm.' };
    } else if (compact.indexOf('a=a^2') !== -1) {
      result = { question: 'If side a = 7 cm, find area of the ' + shapeName + '.', answer: 'A = 7^2 = 49 cm^2.' };
    } else if (compact.indexOf('p=2(l+w)') !== -1) {
      result = { question: 'If l = 10 cm and w = 4 cm, find perimeter.', answer: 'P = 2(10 + 4) = 28 cm.' };
    } else if (compact.indexOf('a=lxw') !== -1 || compact.indexOf('a=l*w') !== -1) {
      result = { question: 'If l = 8 cm and w = 5 cm, find area.', answer: 'A = 8 x 5 = 40 cm^2.' };
    } else if (compact.indexOf('c=2pir') !== -1) {
      result = { question: 'If r = 6 cm, find circumference.', answer: 'C = 2pi x 6 = 12pi cm.' };
    } else if (compact.indexOf('a=pir^2') !== -1) {
      result = { question: 'If r = 5 cm, find area.', answer: 'A = pi x 5^2 = 25pi cm^2.' };
    } else if (compact.indexOf('d=2r') !== -1) {
      result = { question: 'If r = 9 cm, find diameter.', answer: 'd = 2 x 9 = 18 cm.' };
    } else if (compact.indexOf('v=a^3') !== -1) {
      result = { question: 'If edge a = 4 cm, find volume.', answer: 'V = 4^3 = 64 cm^3.' };
    } else if (compact.indexOf('sa=6a^2') !== -1) {
      result = { question: 'If edge a = 4 cm, find surface area.', answer: 'SA = 6 x 4^2 = 96 cm^2.' };
    } else if (compact.indexOf('v=lwh') !== -1) {
      result = { question: 'If l = 5 cm, w = 3 cm, h = 2 cm, find volume.', answer: 'V = 5 x 3 x 2 = 30 cm^3.' };
    } else if (compact.indexOf('v=pir^2h') !== -1) {
      result = { question: 'If r = 3 cm and h = 8 cm, find volume.', answer: 'V = pi x 3^2 x 8 = 72pi cm^3.' };
    } else if (compact.indexOf('v=1/3pir^2h') !== -1) {
      result = { question: 'If r = 3 cm and h = 12 cm, find volume.', answer: 'V = 1/3 x pi x 3^2 x 12 = 36pi cm^3.' };
    } else if (compact.indexOf('v=4/3pir^3') !== -1) {
      result = { question: 'If r = 3 cm, find volume.', answer: 'V = 4/3 x pi x 3^3 = 36pi cm^3.' };
    } else if (compact.indexOf('v=2/3pir^3') !== -1) {
      result = { question: 'If r = 3 cm, find volume.', answer: 'V = 2/3 x pi x 3^3 = 18pi cm^3.' };
    } else {
      var perimeterMatch = compact.match(/^p=(\d+)s$/);
      if (perimeterMatch) {
        var sides = Number(perimeterMatch[1]);
        var sideLen = 4;
        result = {
          question: 'If each side is ' + sideLen + ' cm in this regular shape, find perimeter.',
          answer: 'P = ' + sides + ' x ' + sideLen + ' = ' + (sides * sideLen) + ' cm.'
        };
      }
    }
    return result;
  }

  function buildAutoPractice(shapeData, measurements, useCases) {
    var formulaList = shapeData.formulas || [];
    var items = [];
    var i;

    for (i = 0; i < formulaList.length; i += 1) {
      var numeric = buildNumericPractice(formulaList[i], shapeData.name || 'shape');
      if (numeric) items.push(numeric);
      if (items.length >= 3) break;
    }

    if (measurements[0].applicable) {
      items.push({
        question: 'Which formula should you use when asked for the distance around this shape?',
        answer: 'Use ' + measurements[0].label + ': ' + measurements[0].formula
      });
    } else {
      items.push({
        question: 'Can we directly use perimeter/circumference for this shape?',
        answer: 'Not directly from this page. Use the listed formulas such as area/surface area or volume based on the question.'
      });
    }

    if (measurements[1].applicable) {
      items.push({
        question: 'A painter wants to cover this shape. Which measurement is most useful?',
        answer: 'Use ' + measurements[1].label + ', because painting/covering is an area-type task.'
      });
    } else {
      items.push({
        question: 'If area is not listed directly, what should you do first?',
        answer: 'Break the shape into known parts or use the specific formulas provided on this page.'
      });
    }

    items.push({
      question: 'If all linear dimensions are doubled in a similar shape, what happens?',
      answer: 'Perimeter doubles, area becomes 4 times, and volume becomes 8 times (for similar 3D scaling).'
    });

    items.push({
      question: 'Give one real-life reason to learn these formulas.',
      answer: useCases[1] || useCases[0] || 'They help us measure accurately in real projects.'
    });

    items.push({
      question: 'Which unit should you use for area?',
      answer: 'Use square units such as cm^2 or m^2.'
    });

    items.push({
      question: 'Which unit should you use for volume (if applicable)?',
      answer: 'Use cubic units such as cm^3 or m^3.'
    });

    items.push({
      question: 'What is one common error to avoid in this topic?',
      answer: (shapeData.mistakes && shapeData.mistakes[0]) || 'Choose the correct formula first, then substitute values carefully.'
    });

    return items.slice(0, 10);
  }

  function buildAutoFormulaMeaning(shapeData) {
    var formulas = shapeData.formulas || [];
    return formulas.slice(0, 3).map(function (f) {
      var steps = [
        'Read the question and confirm it asks for ' + (f.label || 'this measurement') + '.',
        'Substitute known values into the formula carefully.',
        f.where ? ('Use: ' + f.where + '.') : 'Keep units consistent while calculating.'
      ];
      if ((f.label || '').toLowerCase().indexOf('area') !== -1) {
        steps.push('Write the final answer in square units.');
      }
      if ((f.label || '').toLowerCase().indexOf('volume') !== -1) {
        steps.push('Write the final answer in cubic units.');
      }
      return {
        title: 'How to use ' + (f.label || 'this formula'),
        formula: f.formula || '',
        steps: steps
      };
    });
  }

  function buildAutoWorkedExamples(shapeData) {
    var examples = [];
    var formulas = shapeData.formulas || [];
    var i;

    if (shapeData.example) {
      examples.push({
        title: 'Example from this shape',
        question: shapeData.example.question || '',
        steps: shapeData.example.steps || [],
        answer: shapeData.example.answer || ''
      });
    }

    for (i = 0; i < formulas.length && examples.length < 4; i += 1) {
      var qp = buildNumericPractice(formulas[i], shapeData.name || 'shape');
      if (!qp) continue;
      if (examples.some(function (ex) { return ex.question === qp.question; })) continue;
      examples.push({
        title: (formulas[i].label || 'Formula') + ' worked example',
        question: qp.question,
        steps: [
          'Pick the correct formula from the Formula Toolkit.',
          'Substitute the values from the question.',
          'Calculate and attach correct units.'
        ],
        answer: qp.answer
      });
    }

    return examples;
  }

  function buildAutoTryOutProblems(shapeData, practiceItems) {
    return (practiceItems || []).slice(0, 8).map(function (item, idx) {
      return {
        level: idx < 3 ? 'Easy' : (idx < 6 ? 'Medium' : 'Hard'),
        question: item.question,
        hint: 'Find the matching formula in Formula Toolkit first, then substitute values.',
        answer: item.answer
      };
    });
  }

  function buildAutoAngleFacts(shapeData) {
    var props = shapeData.properties || [];
    var angleItems = props.filter(function (p) {
      return String(p).toLowerCase().indexOf('angle') !== -1;
    });
    if (angleItems.length) return angleItems.slice(0, 4);
    if ((shapeData.family || '').toLowerCase().indexOf('3d') !== -1) {
      return ['Many 3D shapes use right angles (90 degrees) where faces meet at rectangular edges.'];
    }
    return ['Angle facts are not the main focus for this shape. Use side/arc/area relationships first.'];
  }

  function buildAutoSpeciality(shapeData) {
    var props = shapeData.properties || [];
    if (props.length) return props.slice(0, 4);
    return ['This shape has unique measurement rules captured in its formula toolkit.'];
  }

  function buildAutoFunFacts(shapeData) {
    var name = (shapeData.name || 'This shape').toLowerCase();
    if (name.indexOf('triangle') !== -1) {
      return ['Triangles are used in bridges and roof trusses because they are very stable.'];
    }
    if (name.indexOf('circle') !== -1 || name.indexOf('sector') !== -1 || name.indexOf('semi') !== -1) {
      return ['Round geometry appears in wheels, clocks, and many natural patterns.'];
    }
    if ((shapeData.family || '').toLowerCase().indexOf('3d') !== -1) {
      return ['3D shape formulas are used in packaging, storage, and construction design.'];
    }
    return ['This shape appears in architecture, design layouts, and everyday objects.'];
  }

  function renderUseCases(items, tone) {
    if (!items || !items.length) return '';
    var html = '';
    html += '<article class="card full' + toneClass(tone) + '">';
    html += '<h2>Why These Equations Matter In Real Life</h2>';
    html += '<ul class="list">';
    items.forEach(function (item) {
      html += '<li>' + fmt(item) + '</li>';
    });
    html += '</ul>';
    html += '</article>';
    return html;
  }

  function renderPracticeQA(items, tone) {
    if (!items || !items.length) return '';
    var html = '';
    html += '<article class="card full' + toneClass(tone) + '">';
    html += '<h2>Practice Questions And Answers</h2>';
    html += '<p class="qa-intro">Try each question first, then open the answer.</p>';
    html += '<div class="qa-grid">';
    items.forEach(function (qa, idx) {
      html += '<div class="qa-item">';
      html += '<div class="qa-q">Q' + (idx + 1) + '. ' + fmt(qa.question) + '</div>';
      html += '<details class="qa-a"><summary>Show Answer</summary><p>' + fmt(qa.answer) + '</p></details>';
      html += '</div>';
    });
    html += '</div>';
    html += '</article>';
    return html;
  }

  function renderWorkedExamples(items, tone) {
    if (!items || !items.length) return '';
    var html = '';
    html += '<article class="card full' + toneClass(tone) + '">';
    html += '<h2>More Worked Examples</h2>';
    html += '<div class="worked-grid">';
    items.forEach(function (ex, idx) {
      html += '<div class="worked-item">';
      html += '<h3 class="worked-title">Example ' + (idx + 1) + (ex.title ? ': ' + fmt(ex.title) : '') + '</h3>';
      html += '<div class="example-q">' + fmt(ex.question || '') + '</div>';
      (ex.steps || []).forEach(function (step, stepIdx) {
        html += '<div class="step">' + (stepIdx + 1) + '. ' + fmt(step) + '</div>';
      });
      if (ex.answer) html += '<div class="answer">Answer: ' + fmt(ex.answer) + '</div>';
      html += '</div>';
    });
    html += '</div>';
    html += '</article>';
    return html;
  }

  function renderTryOutProblems(items, tone) {
    if (!items || !items.length) return '';
    var html = '';
    html += '<article class="card full' + toneClass(tone) + '">';
    html += '<h2>Try These Problems</h2>';
    html += '<p class="qa-intro">Try yourself first, then open hint/answer.</p>';
    html += '<div class="qa-grid">';
    items.forEach(function (item, idx) {
      html += '<div class="qa-item">';
      html += '<div class="qa-q">Problem ' + (idx + 1) + '. ' + fmt(item.question || '') + '</div>';
      if (item.level) html += '<div class="prob-level">Level: ' + fmt(item.level) + '</div>';
      if (item.hint) {
        html += '<details class="qa-a"><summary>Show Hint</summary><p>' + fmt(item.hint) + '</p></details>';
      }
      if (item.answer) {
        html += '<details class="qa-a"><summary>Show Answer</summary><p>' + fmt(item.answer) + '</p></details>';
      }
      html += '</div>';
    });
    html += '</div>';
    html += '</article>';
    return html;
  }

  function renderExamCorner(examCorner, tone) {
    if (!examCorner) return '';
    var html = '';
    html += '<article class="card full' + toneClass(tone) + '">';
    html += '<h2>Exam Corner</h2>';
    html += '<div class="exam-corner-grid">';
    if (examCorner.shortcut) {
      html += '<div class="exam-corner-item ec-shortcut">';
      html += '<div class="ec-label">Formula Shortcut</div>';
      html += '<div class="ec-body">' + fmt(examCorner.shortcut) + '</div>';
      html += '</div>';
    }
    if (examCorner.trap) {
      html += '<div class="exam-corner-item ec-trap">';
      html += '<div class="ec-label">Common Exam Trap</div>';
      html += '<div class="ec-body">' + fmt(examCorner.trap) + '</div>';
      html += '</div>';
    }
    if (examCorner.quickMethod) {
      html += '<div class="exam-corner-item ec-method">';
      html += '<div class="ec-label">Quick Solve Method</div>';
      html += '<div class="ec-body">' + fmt(examCorner.quickMethod) + '</div>';
      html += '</div>';
    }
    html += '</div>';
    html += '</article>';
    return html;
  }

  var style = document.createElement('style');
  style.textContent = [
    ':root{--ink:#223047;--muted:#5f6f86;--card:#fff;--line:#d9e5f2;--soft:#f4fbff;--brand:#0f766e;--brand2:#2563eb;--warn:#9f1239}',
    '*{box-sizing:border-box}',
    'sup{font-size:.72em;line-height:0;vertical-align:super}',
    'body{margin:0;font-family:"Nunito",sans-serif;color:var(--ink);background:radial-gradient(1200px 420px at 0% -10%,rgba(15,118,110,.14),transparent 42%),radial-gradient(1000px 520px at 100% -20%,rgba(37,99,235,.12),transparent 45%),linear-gradient(180deg,#f6fcff,#fff8ee)}',
    '.wrap{width:min(1080px,94vw);margin:22px auto 56px}',
    '.hero{border:1px solid var(--line);border-radius:24px;background:linear-gradient(135deg,#ffffff 0%,#f8fcff 50%,#fffaf2 100%);box-shadow:0 14px 34px rgba(25,41,69,.11);padding:18px}',
    '.chip{display:inline-flex;align-items:center;gap:8px;padding:7px 12px;border-radius:999px;border:1px solid #b8e2d8;background:#e9fbf6;color:#0f6a5a;font-weight:900;font-size:.76rem;text-transform:uppercase;letter-spacing:.35px}',
    'h1{margin:10px 0 6px;font-family:"Fredoka One",cursive;font-size:clamp(1.35rem,2.6vw,2rem)}',
    '.sub{color:var(--muted);font-weight:800}',
    '.nav{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}',
    '.btn{display:inline-flex;align-items:center;justify-content:center;min-height:38px;padding:8px 12px;border-radius:999px;text-decoration:none;font:900 .82rem "Nunito",sans-serif;border:1px solid #cddcf1;background:#fff;color:#2d4666}',
    '.btn:hover{transform:translateY(-1px);box-shadow:0 8px 16px rgba(31,55,98,.14)}',
    '.btn-primary{background:linear-gradient(135deg,#d9f6ef,#ddebff);border-color:#a7d8ca;color:#14516f}',
    '.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:14px}',
    '.card{border:1px solid var(--line);border-radius:18px;background:var(--card);box-shadow:0 8px 20px rgba(22,45,80,.08);padding:14px}',
    '.card h2{margin:0 0 8px;font-family:"Fredoka One",cursive;font-size:1.06rem}',
    '.card h3{margin:0 0 8px;font-size:.98rem;color:#1f3f68}',
    '.card.tone-aqua{background:linear-gradient(180deg,#f4fdff,#edf8ff);border-color:#cde9f7}',
    '.card.tone-mint{background:linear-gradient(180deg,#f4fff8,#ecfbf3);border-color:#cbe9d8}',
    '.card.tone-peach{background:linear-gradient(180deg,#fffaf4,#fff2e6);border-color:#f2dcc2}',
    '.card.tone-lavender{background:linear-gradient(180deg,#f9f5ff,#f3edff);border-color:#ded1fa}',
    '.card.tone-rose{background:linear-gradient(180deg,#fff6f8,#fff0f4);border-color:#efcfda}',
    '.card.tone-sky{background:linear-gradient(180deg,#f4f9ff,#edf4ff);border-color:#cfdef6}',
    '.card.tone-gold{background:linear-gradient(180deg,#fffdf3,#fff9e6);border-color:#f0e3b8}',
    '.card.tone-indigo{background:linear-gradient(180deg,#f6f7ff,#eef1ff);border-color:#d4d9f7}',
    '.card[class*="tone-"] h2{color:#1b3e66}',
    '.list{display:grid;gap:8px;padding-left:18px;margin:0}',
    '.list li{line-height:1.58;color:#2f4665}',
    '.formula{display:grid;gap:8px}',
    '.formula-row{border:1px solid #deebfa;background:#f8fbff;border-radius:12px;padding:10px}',
    '.formula-title{display:block;font-weight:900;color:#1f3f68;font-size:.88rem}',
    '.formula-eq{display:block;font-family:"Courier New",monospace;font-weight:700;color:#0f5e91;margin-top:4px}',
    '.formula-note{display:block;color:#5f7390;font-size:.82rem;margin-top:4px}',
    '.example-box{border:1px dashed #c7d8ef;background:#fbfdff;border-radius:12px;padding:10px}',
    '.example-q{font-weight:900;color:#203955;margin-bottom:8px}',
    '.step{margin:4px 0;color:#2e4a6a}',
    '.answer{margin-top:8px;font-weight:900;color:#0f6c58}',
    '.mistakes{display:grid;gap:8px}',
    '.mistake{border-radius:12px;background:#fff5f8;border:1px solid #f1cfdb;padding:10px;color:#7e2140;font-weight:800;font-size:.9rem}',
    '.full{grid-column:1/-1}',
    '.diagram-shell{border:1px solid #dce9f8;background:#ffffff;border-radius:16px;padding:10px}',
    '.diagram-svg{width:100%;height:auto;display:block}',
    '.diagram-caption{margin:8px 0 0;color:#536d8d;font-size:.88rem;font-weight:700}',
    '.diagram-text{font-family:"Nunito",sans-serif;font-size:16px;font-weight:800;fill:#183c67}',
    '.diagram-value{font-family:"Courier New",monospace;font-size:17px;font-weight:700;fill:#0d4f7e}',
    '.measure-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}',
    '.measure-item{border:1px solid #dbe9f9;background:#f9fcff;border-radius:12px;padding:10px}',
    '.measure-top{display:flex;justify-content:space-between;gap:8px;align-items:flex-start}',
    '.pill{display:inline-block;padding:3px 8px;border-radius:999px;font-weight:900;font-size:.7rem;text-transform:uppercase;letter-spacing:.3px}',
    '.pill-yes{background:#eafaf4;color:#0f6b53;border:1px solid #b8e3d7}',
    '.pill-no{background:#fff3f5;color:#8d2045;border:1px solid #f0ccd9}',
    '.measure-formula{margin-top:8px;font-family:"Courier New",monospace;color:#0d4f7e;font-weight:700}',
    '.measure-note{margin:6px 0 0;color:#556f8f;line-height:1.45;font-size:.88rem}',
    '.formula-meaning{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}',
    '.formula-meaning-item{border:1px solid #d9e7f9;background:#f8fbff;border-radius:12px;padding:10px}',
    '.qa-intro{margin:4px 0 10px;color:#54708f;font-weight:700}',
    '.qa-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}',
    '.qa-item{border:1px solid #dbe8f8;background:#fbfdff;border-radius:12px;padding:10px}',
    '.qa-q{font-weight:900;color:#1f3f68;line-height:1.42}',
    '.qa-a{margin-top:8px}',
    '.qa-a summary{cursor:pointer;font-weight:800;color:#155d8f}',
    '.qa-a p{margin:8px 0 0;color:#2b496a;line-height:1.5}',
    '.worked-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}',
    '.worked-item{border:1px solid #dbe8f8;background:#fbfdff;border-radius:12px;padding:10px}',
    '.worked-title{margin:0 0 6px;color:#1f3f68}',
    '.prob-level{display:inline-block;margin-top:6px;padding:3px 7px;border-radius:999px;background:#ecf4ff;border:1px solid #c8ddff;color:#1e4d85;font-size:.75rem;font-weight:800}',
    '.foot-nav{margin-top:14px;display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}',
    '.exam-corner-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}',
    '.exam-corner-item{border-radius:14px;padding:12px 14px}',
    '.ec-shortcut{background:#ecfdf5;border:1px solid #6ee7b7}',
    '.ec-trap{background:#fff1f2;border:1px solid #fca5a5}',
    '.ec-method{background:#eff6ff;border:1px solid #93c5fd}',
    '.ec-label{font-weight:900;font-size:.78rem;text-transform:uppercase;letter-spacing:.4px;margin-bottom:6px}',
    '.ec-shortcut .ec-label{color:#065f46}',
    '.ec-trap .ec-label{color:#991b1b}',
    '.ec-method .ec-label{color:#1e40af}',
    '.ec-body{line-height:1.55;font-size:.92rem;color:#1f3f68;font-weight:700}',
    '@media (max-width:960px){.measure-grid{grid-template-columns:1fr}.exam-corner-grid{grid-template-columns:1fr}}',
    '@media (max-width:880px){.grid,.formula-meaning,.qa-grid,.worked-grid{grid-template-columns:1fr}}'
  ].join('');
  document.head.appendChild(style);

  var measurementGuide = (deepDive && deepDive.measurements && deepDive.measurements.length)
    ? deepDive.measurements
    : buildAutoMeasurements(shape);
  var realLifeUseCases = (deepDive && deepDive.realLifeUseCases && deepDive.realLifeUseCases.length)
    ? deepDive.realLifeUseCases
    : buildAutoUseCases(shape, measurementGuide);
  var practiceItems = (deepDive && deepDive.practiceQa && deepDive.practiceQa.length)
    ? deepDive.practiceQa
    : buildAutoPractice(shape, measurementGuide, realLifeUseCases);
  var workedExamples = (deepDive && deepDive.workedExamples && deepDive.workedExamples.length)
    ? deepDive.workedExamples
    : buildAutoWorkedExamples(shape);
  var tryOutProblems = (deepDive && deepDive.tryOutProblems && deepDive.tryOutProblems.length)
    ? deepDive.tryOutProblems
    : buildAutoTryOutProblems(shape, practiceItems);
  var formulaMeaningItems = (deepDive && deepDive.formulaMeaning && deepDive.formulaMeaning.length)
    ? deepDive.formulaMeaning
    : buildAutoFormulaMeaning(shape);
  var angleFacts = (deepDive && deepDive.angleFacts && deepDive.angleFacts.length)
    ? deepDive.angleFacts
    : buildAutoAngleFacts(shape);
  var speciality = (deepDive && deepDive.speciality && deepDive.speciality.length)
    ? deepDive.speciality
    : buildAutoSpeciality(shape);
  var funFacts = (deepDive && deepDive.funFacts && deepDive.funFacts.length)
    ? deepDive.funFacts
    : buildAutoFunFacts(shape);
  var typeDifferences = deepDive && deepDive.typeDifferences;
  var simpleIdea = (deepDive && deepDive.simpleIdea) ? deepDive.simpleIdea : shape.overview;

  var html = '';
  html += '<div class="wrap">';
  html += '  <header class="hero">';
  html += '    <span class="chip">Geometry Library - ' + esc(shape.family) + '</span>';
  html += '    <h1>' + esc(shape.name) + '</h1>';
  html += '    <p class="sub">' + esc(shape.overview) + '</p>';
  html += '    <div class="nav">';
  html += '      <a class="btn btn-primary" href="selective-maths-geometry-shapes.html">Back to Shape Library</a>';
  html += '      <a class="btn" href="selective-maths-geometry.html">Back to Geometry Topic</a>';
  html += '    </div>';
  html += '  </header>';
  html += '  <section class="grid">';

  if (simpleIdea) {
    html += '<article class="card full tone-gold">';
    html += '<h2>What Is This Shape?</h2>';
    html += '<p>' + fmt(simpleIdea) + '</p>';
    html += '</article>';
  }

  if (deepDive && deepDive.diagram) {
    html += '<article class="card full tone-sky">';
    html += '<h2>Picture + Pointer Labels</h2>';
    html += renderDiagram(deepDive.diagram);
    html += '</article>';
  }

  html += renderMeasurements(measurementGuide, 'mint');
  html += renderUseCases(realLifeUseCases, 'aqua');
  html += renderWorkedExamples(workedExamples, 'peach');
  html += renderTryOutProblems(tryOutProblems, 'gold');
  html += renderPracticeQA(practiceItems, 'lavender');
  var examCorner = deepDive && deepDive.examCorner ? deepDive.examCorner : null;
  html += renderExamCorner(examCorner, 'mint');
  html += renderListCard('Triangle Type Differences', typeDifferences, 'rose');
  html += renderListCard('Angle Facts', angleFacts, 'aqua');
  html += renderListCard('Special Features', speciality, 'mint');
  html += renderListCard('Fun Factor', funFacts, 'peach');
  html += renderFormulaMeaning(formulaMeaningItems, 'sky');

  html += '    <article class="card tone-sky">';
  html += '      <h2>Key Properties</h2>';
  html += '      <ul class="list">';
  (shape.properties || []).forEach(function (p) {
    html += '<li>' + fmt(p) + '</li>';
  });
  html += '      </ul>';
  html += '    </article>';

  html += '    <article class="card tone-indigo">';
  html += '      <h2>Formula Toolkit</h2>';
  html += '      <div class="formula">';
  (shape.formulas || []).forEach(function (f) {
    html += '<div class="formula-row">';
    html += '<span class="formula-title">' + fmt(f.label) + '</span>';
    html += '<span class="formula-eq">' + fmt(f.formula) + '</span>';
    if (f.where) html += '<span class="formula-note">' + fmt(f.where) + '</span>';
    html += '</div>';
  });
  html += '      </div>';
  html += '    </article>';

  html += '    <article class="card full tone-mint">';
  html += '      <h2>Worked Mini Example</h2>';
  if (shape.example) {
    html += '      <div class="example-box">';
    html += '        <div class="example-q">' + fmt(shape.example.question || '') + '</div>';
    (shape.example.steps || []).forEach(function (s, i) {
      html += '<div class="step">' + (i + 1) + '. ' + fmt(s) + '</div>';
    });
    html += '        <div class="answer">Answer: ' + fmt(shape.example.answer || '') + '</div>';
    html += '      </div>';
  }
  html += '    </article>';

  html += '    <article class="card full tone-rose">';
  html += '      <h2>Common Mistakes</h2>';
  html += '      <div class="mistakes">';
  (shape.mistakes || []).forEach(function (m) {
    html += '<div class="mistake">' + fmt(m) + '</div>';
  });
  html += '      </div>';
  html += '    </article>';

  html += '  </section>';

  html += '  <div class="foot-nav">';
  if (prevKey) {
    html += '<a class="btn" href="' + esc(data[prevKey].file) + '">Previous: ' + esc(data[prevKey].name) + '</a>';
  } else {
    html += '<span></span>';
  }
  if (nextKey) {
    html += '<a class="btn" href="' + esc(data[nextKey].file) + '">Next: ' + esc(data[nextKey].name) + '</a>';
  }
  html += '  </div>';
  html += '</div>';

  var existing = document.getElementById('geometryShapeRoot');
  if (existing) existing.remove();
  var root = document.createElement('main');
  root.id = 'geometryShapeRoot';
  root.innerHTML = html;
  document.body.appendChild(root);
})();
