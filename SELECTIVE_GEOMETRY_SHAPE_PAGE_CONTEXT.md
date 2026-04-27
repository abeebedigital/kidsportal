# Selective Geometry Shape Page Context (Build Blueprint)

This file explains how to create new geometry shape pages in the current project, matching the same quality, structure, and UI style.

Use this as a handoff guide for any teammate adding new shapes.

## Purpose
- Build one dedicated page per shape.
- Keep explanation simple for kids.
- Include formulas, real-life reasons, examples, and practice.
- Use labeled diagrams with clean non-overlapping pointers.

## Core Files
- Data source: `geometry-shape-data.js`
- Page renderer and diagram SVGs: `geometry-shape-page.js`
- Per-shape HTML entry file: `selective-geometry-<shape-key>.html`

## Shape Flow (How Next/Previous Works)
- Page bottom navigation uses `window.GEOMETRY_SHAPE_ORDER` in `geometry-shape-data.js`.
- If you want shape sequencing to work, add new key in that order list.

## Required Build Steps
1. Create the shape HTML file.
- File name pattern: `selective-geometry-<shape-key>.html`
- Must include:
  - `window.GEOMETRY_SHAPE_KEY="<shape-key>";`
  - Script includes for:
    - `geometry-shape-data.js`
    - `geometry-shape-page.js`

2. Add shape key to order list.
- In `geometry-shape-data.js`, add key in `window.GEOMETRY_SHAPE_ORDER`.
- This controls bottom `Next` and `Previous`.

3. Add shape object in `window.GEOMETRY_SHAPE_DATA`.
- Minimum:
  - `file`, `name`, `family`, `overview`
  - `properties[]`
  - `formulas[]`
  - `example { question, steps[], answer }`
  - `mistakes[]`
- Preferred (full page):
  - `deepDive { ... }` (see template below)

4. If custom diagram needed, add renderer in `geometry-shape-page.js`.
- Add `render<ShapeName>Diagram(diagram)` function.
- Add switch line in `renderDiagram()`:
  - `if (diagram.type === '<shape-diagram-type>') return render<ShapeName>Diagram(diagram);`

5. Set `deepDive.diagram.type` to your diagram type.
- Example: `type: 'hexagon-labeled'`

## Deep Dive Content Standard
Each full page should include these fields inside `deepDive`:
- `simpleIdea`
- `diagram { type, caption }`
- `measurements[]`
- `angleFacts[]`
- `speciality[]`
- `funFacts[]`
- `realLifeUseCases[]`
- `formulaMeaning[]`
- `workedExamples[]`
- `tryOutProblems[]`
- `practiceQa[]`

## Diagram Design Rules (Important)
1. Color match rule:
- Pointer line color must match label chip border/text color.
- In-shape mark/label should use same color family.

2. Non-overlap rule:
- Do not route all pointers to same center point.
- Spread target points.
- Use split labels (left and right) when needed.
- Prefer straight connectors if curves cause crossings.

3. Readability rule:
- Keep arrowheads small for dense diagrams.
- Keep labels away from arrow tips.
- Avoid covering internal formula/angle text.

4. Consistency rule:
- Use same visual grammar as existing pages:
  - rounded outer card
  - pointer chips
  - clear variable letters (`s`, `h`, `d1`, `ap`, etc.)

## Formula Text Rule (Superscript)
- In data, continue writing exponent as `^` (example: `a^2`, `cm^3`).
- Renderer already converts this to superscript automatically.
- Do not manually write raw HTML in data fields.

## Real-Life Explanation Rule
- Every shape should answer: "Why does this equation matter?"
- Include practical use-cases for:
  - perimeter/circumference
  - area/surface area
  - volume (if 3D; otherwise say not applicable)

## Validation Checklist (Before Marking Complete)
Run:
```bash
node --check geometry-shape-page.js
node --check geometry-shape-data.js
```

Then quick checks:
```bash
rg -n "<shape-key>|<diagram-type>|deepDive" geometry-shape-data.js geometry-shape-page.js
```

Manual review:
- Open `selective-geometry-<shape-key>.html`
- Check:
  - No overlapping pointers
  - Label colors match markers
  - Worked examples and practice sections appear
  - Superscripts render correctly
  - Bottom `Next` goes to expected shape

## Copy Template: Data Block
```js
'<shape-key>': {
  file: 'selective-geometry-<shape-key>.html',
  name: '<Shape Name>',
  family: '2D Shape', // or 3D Shape / Polygon
  overview: '...',
  properties: ['...', '...', '...'],
  formulas: [
    { label: '...', formula: '...', where: '...' }
  ],
  example: {
    question: '...',
    steps: ['...', '...'],
    answer: '...'
  },
  mistakes: ['...', '...'],
  deepDive: {
    simpleIdea: '...',
    diagram: {
      type: '<diagram-type>',
      caption: '...'
    },
    measurements: [
      { label: 'Perimeter', applicable: true, formula: '...', idea: '...' },
      { label: 'Area', applicable: true, formula: '...', idea: '...' },
      { label: 'Volume', applicable: false, idea: '...' }
    ],
    angleFacts: ['...', '...'],
    speciality: ['...', '...'],
    funFacts: ['...', '...'],
    realLifeUseCases: ['...', '...', '...'],
    formulaMeaning: [
      { title: '...', formula: '...', steps: ['...', '...'] }
    ],
    workedExamples: [
      { title: '...', question: '...', steps: ['...', '...'], answer: '...' }
    ],
    tryOutProblems: [
      { level: 'Easy', question: '...', hint: '...', answer: '...' }
    ],
    practiceQa: [
      { question: '...', answer: '...' }
    ]
  }
}
```

## Copy Template: Diagram Dispatch
```js
function render<ShapeName>Diagram(diagram) {
  if (!diagram || diagram.type !== '<diagram-type>') return '';
  // return SVG string
}

// inside renderDiagram()
if (diagram.type === '<diagram-type>') return render<ShapeName>Diagram(diagram);
```

## Recommended Team Workflow
1. Add one shape.
2. Validate with visual screenshot.
3. Fix overlaps and readability.
4. Only then proceed to next shape in order.

This keeps quality stable while building many shapes quickly.
