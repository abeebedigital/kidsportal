(function () {
  window.GEOMETRY_SHAPE_ORDER = [
    'square',
    'rectangle',
    'triangle-types',
    'right-triangle',
    'circle',
    'semicircle',
    'sector',
    'parallelogram',
    'trapezium',
    'rhombus',
    'kite',
    'pentagon',
    'hexagon',
    'heptagon',
    'octagon',
    'nonagon',
    'decagon',
    'cube',
    'cuboid',
    'triangular-prism',
    'cylinder',
    'cone',
    'sphere',
    'hemisphere',
    'square-pyramid',
    'triangular-pyramid'
  ];

  window.GEOMETRY_SHAPE_DATA = {
    'square': {
      file: 'selective-geometry-square.html',
      name: 'Square',
      family: '2D Shape',
      overview: 'A square has four equal sides and four right angles.',
      properties: [
        'All sides are equal.',
        'Each interior angle is 90 degrees.',
        'Diagonals are equal and bisect each other at 90 degrees.'
      ],
      formulas: [
        { label: 'Perimeter', formula: 'P = 4a', where: 'a = side length' },
        { label: 'Area', formula: 'A = a^2', where: 'a = side length' },
        { label: 'Diagonal', formula: 'd = a*sqrt(2)', where: 'd = diagonal length' }
      ],
      example: {
        question: 'If side a = 7 cm, find perimeter and area.',
        steps: ['Perimeter: 4 x 7 = 28 cm.', 'Area: 7 x 7 = 49 cm^2.'],
        answer: 'P = 28 cm, A = 49 cm^2'
      },
      mistakes: [
        'Using area formula when asked for perimeter.',
        'Forgetting that all sides are the same.'
      ],
      deepDive: {
        simpleIdea: 'A square is a 2D shape with four equal sides and four right angles (90 degrees).',
        diagram: {
          type: 'square-labeled',
          caption: 'Square parts shown: side a, right angle, diagonal d, and center O.'
        },
        measurements: [
          {
            label: 'Perimeter',
            applicable: true,
            formula: 'P = 4a',
            idea: 'Perimeter is the total boundary length of all four equal sides.'
          },
          {
            label: 'Area',
            applicable: true,
            formula: 'A = a^2',
            idea: 'Area is the inside region. Multiply side by side.'
          },
          {
            label: 'Volume',
            applicable: false,
            idea: 'Square is a 2D shape, so it does not have volume.'
          }
        ],
        angleFacts: [
          'Each corner angle is 90 degrees.',
          'Total interior angle sum is 360 degrees.',
          'Diagonals meet at right angles in a square.'
        ],
        speciality: [
          'All four sides are equal.',
          'Opposite sides are parallel.',
          'Diagonals are equal and bisect each other.'
        ],
        funFacts: [
          'Chessboard cells are squares.',
          'Most floor tiles and sticky notes are square shapes.',
          'Pixels on many screens are arranged in square-like grids.'
        ],
        realLifeUseCases: [
          'Area helps calculate paint or tile needed for square floors or boards.',
          'Perimeter helps measure border tape, frame length, or fencing.',
          'Builders use square angles (90 degrees) to keep corners correct.',
          'Diagonal formula helps check if a square frame is aligned properly.',
          'Design layouts often use square grids for spacing and balance.',
          'Correct square formulas reduce material waste and cutting errors.'
        ],
        formulaMeaning: [
          {
            title: 'Why P = 4a',
            formula: 'P = 4a',
            steps: [
              'A square has 4 equal sides.',
              'Each side is a.',
              'Add all sides: a + a + a + a = 4a.'
            ]
          },
          {
            title: 'Why A = a^2',
            formula: 'A = a^2',
            steps: [
              'Area of rectangle is length x width.',
              'For square, length = width = a.',
              'So area = a x a = a^2.'
            ]
          },
          {
            title: 'Why d = a*sqrt(2)',
            formula: 'd = a*sqrt(2)',
            steps: [
              'Diagonal splits square into two right triangles.',
              'Use Pythagoras: d^2 = a^2 + a^2 = 2a^2.',
              'So d = a*sqrt(2).'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'Find perimeter and area',
            question: 'Side a = 9 cm. Find perimeter and area.',
            steps: [
              'Perimeter: P = 4a = 4 x 9 = 36 cm.',
              'Area: A = a^2 = 9^2 = 81 cm^2.'
            ],
            answer: 'P = 36 cm, A = 81 cm^2'
          },
          {
            title: 'Find side from perimeter',
            question: 'Perimeter is 52 cm. Find side length.',
            steps: [
              'Use P = 4a.',
              '52 = 4a, so a = 13 cm.'
            ],
            answer: 'a = 13 cm'
          },
          {
            title: 'Find side from area',
            question: 'Area is 144 cm^2. Find side length.',
            steps: [
              'Use A = a^2.',
              'a^2 = 144, so a = 12 cm.'
            ],
            answer: 'a = 12 cm'
          },
          {
            title: 'Find diagonal from side',
            question: 'Side a = 10 cm. Find diagonal length.',
            steps: [
              'Use d = a*sqrt(2).',
              'd = 10*sqrt(2) cm.',
              'Approx d = 14.14 cm.'
            ],
            answer: 'd = 10*sqrt(2) cm (about 14.14 cm)'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'Find perimeter if side a = 6 cm.',
            hint: 'Use P = 4a.',
            answer: 'P = 24 cm.'
          },
          {
            level: 'Easy',
            question: 'Find area if side a = 6 cm.',
            hint: 'Use A = a^2.',
            answer: 'A = 36 cm^2.'
          },
          {
            level: 'Easy',
            question: 'Find side if perimeter is 40 cm.',
            hint: 'Use a = P/4.',
            answer: 'a = 10 cm.'
          },
          {
            level: 'Medium',
            question: 'Find side if area is 225 cm^2.',
            hint: 'Take square root of area.',
            answer: 'a = 15 cm.'
          },
          {
            level: 'Medium',
            question: 'Find diagonal if side is 8 cm.',
            hint: 'Use d = a*sqrt(2).',
            answer: 'd = 8*sqrt(2) cm (about 11.31 cm).'
          },
          {
            level: 'Medium',
            question: 'Square garden has side 12 m. Find perimeter and area.',
            hint: 'Use both P and A formulas.',
            answer: 'P = 48 m, A = 144 m^2.'
          },
          {
            level: 'Hard',
            question: 'Diagonal is 14*sqrt(2) cm. Find side and area.',
            hint: 'Rearrange d = a*sqrt(2).',
            answer: 'a = 14 cm, A = 196 cm^2.'
          },
          {
            level: 'Hard',
            question: 'If side doubles, by what factor do perimeter and area change?',
            hint: 'Check formulas P = 4a and A = a^2.',
            answer: 'Perimeter doubles; area becomes 4 times.'
          }
        ],
        practiceQa: [
          {
            question: 'How many equal sides does a square have?',
            answer: 'Four equal sides.'
          },
          {
            question: 'What is the perimeter formula for square?',
            answer: 'P = 4a.'
          },
          {
            question: 'What is the area formula for square?',
            answer: 'A = a^2.'
          },
          {
            question: 'What is the diagonal formula for square?',
            answer: 'd = a*sqrt(2).'
          },
          {
            question: 'If a = 11 cm, find perimeter.',
            answer: 'P = 44 cm.'
          },
          {
            question: 'If a = 11 cm, find area.',
            answer: 'A = 121 cm^2.'
          },
          {
            question: 'If P = 28 cm, find side.',
            answer: 'a = 7 cm.'
          },
          {
            question: 'If A = 169 cm^2, find side.',
            answer: 'a = 13 cm.'
          },
          {
            question: 'Is volume applicable to square?',
            answer: 'No. Square is 2D, so volume is not applicable.'
          },
          {
            question: 'Give one real-life use of square formulas.',
            answer: 'Used for floor tiling, square plot fencing, and frame measurement.'
          }
        ],
        examCorner: {
          shortcut: 'P = 4a (four equal sides). A = a^2 (square the side length). Both formulas use only one measurement.',
          trap: 'Exam questions often give area and ask for perimeter — find the side first by taking the square root of area, then multiply by 4.',
          quickMethod: 'Step 1: identify if the question asks for P or A. Step 2: for P write a = given side; for A write a^2. Never skip labelling the side.'
        }
      }
    },
    'rectangle': {
      file: 'selective-geometry-rectangle.html',
      name: 'Rectangle',
      family: '2D Shape',
      overview: 'A rectangle has opposite sides equal and four right angles.',
      properties: [
        'Opposite sides are equal and parallel.',
        'Each interior angle is 90 degrees.',
        'Diagonals are equal and bisect each other.'
      ],
      formulas: [
        { label: 'Perimeter', formula: 'P = 2(l + w)', where: 'l = length, w = width' },
        { label: 'Area', formula: 'A = l x w', where: 'l = length, w = width' },
        { label: 'Diagonal', formula: 'd = sqrt(l^2 + w^2)', where: 'from Pythagoras' }
      ],
      example: {
        question: 'If l = 10 cm and w = 4 cm, find perimeter and area.',
        steps: ['Perimeter: 2(10 + 4) = 28 cm.', 'Area: 10 x 4 = 40 cm^2.'],
        answer: 'P = 28 cm, A = 40 cm^2'
      },
      mistakes: ['Adding only two sides for perimeter.', 'Confusing length and width in word problems.'],
      deepDive: {
        simpleIdea: 'A rectangle is a 2D shape with opposite sides equal and all corners as right angles.',
        diagram: {
          type: 'rectangle-labeled',
          caption: 'Rectangle parts shown: length l, width w, right angle, diagonal d, and center O.'
        },
        measurements: [
          {
            label: 'Perimeter',
            applicable: true,
            formula: 'P = 2(l + w)',
            idea: 'Perimeter is the total outer boundary length.'
          },
          {
            label: 'Area',
            applicable: true,
            formula: 'A = l x w',
            idea: 'Area is inside space found by multiplying length and width.'
          },
          {
            label: 'Volume',
            applicable: false,
            idea: 'Rectangle is 2D, so it has no volume.'
          }
        ],
        angleFacts: [
          'Each interior angle of a rectangle is 90 degrees.',
          'Adjacent angles add to 180 degrees.',
          'Total interior angle sum is 360 degrees.'
        ],
        speciality: [
          'Opposite sides are equal and parallel.',
          'Diagonals are equal.',
          'Diagonals bisect each other at the center.'
        ],
        funFacts: [
          'Books, phones, doors, and screens are mostly rectangle-shaped.',
          'Football grounds and many classrooms use rectangle layouts.',
          'Most paper sheets are rectangles.'
        ],
        realLifeUseCases: [
          'Area formula helps plan floor tiles, carpet, wallpaper, and paint.',
          'Perimeter formula helps estimate fencing, border strip, or frame length.',
          'Diagonal formula helps check if a rectangular frame is square and aligned.',
          'Architects and interior designers use rectangle formulas daily.',
          'Builders estimate material quantities using rectangle measurements.',
          'Correct rectangle calculations reduce waste and project cost.'
        ],
        formulaMeaning: [
          {
            title: 'Why P = 2(l + w)',
            formula: 'P = 2(l + w)',
            steps: [
              'A rectangle has two lengths and two widths.',
              'Perimeter = l + w + l + w.',
              'Group terms: perimeter = 2(l + w).'
            ]
          },
          {
            title: 'Why A = l x w',
            formula: 'A = l x w',
            steps: [
              'Area counts unit squares inside the rectangle.',
              'Number of rows is width, number per row is length.',
              'Total unit squares = length x width.'
            ]
          },
          {
            title: 'Why d = sqrt(l^2 + w^2)',
            formula: 'd = sqrt(l^2 + w^2)',
            steps: [
              'Diagonal forms a right triangle with l and w.',
              'Use Pythagoras: d^2 = l^2 + w^2.',
              'Take square root: d = sqrt(l^2 + w^2).'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'Find perimeter and area',
            question: 'l = 12 cm, w = 5 cm. Find perimeter and area.',
            steps: [
              'Perimeter: P = 2(l + w) = 2(12 + 5) = 34 cm.',
              'Area: A = l x w = 12 x 5 = 60 cm^2.'
            ],
            answer: 'P = 34 cm, A = 60 cm^2'
          },
          {
            title: 'Find width from area',
            question: 'Area is 84 cm^2 and length is 12 cm. Find width.',
            steps: [
              'A = l x w.',
              '84 = 12 x w.',
              'w = 7 cm.'
            ],
            answer: 'w = 7 cm'
          },
          {
            title: 'Find length from perimeter',
            question: 'Perimeter is 46 cm and width is 8 cm. Find length.',
            steps: [
              'P = 2(l + w).',
              '46 = 2(l + 8) so l + 8 = 23.',
              'l = 15 cm.'
            ],
            answer: 'l = 15 cm'
          },
          {
            title: 'Find diagonal',
            question: 'l = 9 cm, w = 12 cm. Find diagonal length.',
            steps: [
              'd = sqrt(l^2 + w^2).',
              'd = sqrt(9^2 + 12^2) = sqrt(81 + 144).',
              'd = sqrt(225) = 15 cm.'
            ],
            answer: 'd = 15 cm'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'Find perimeter if l = 14 cm and w = 3 cm.',
            hint: 'Use P = 2(l + w).',
            answer: 'P = 34 cm.'
          },
          {
            level: 'Easy',
            question: 'Find area if l = 14 cm and w = 3 cm.',
            hint: 'Use A = l x w.',
            answer: 'A = 42 cm^2.'
          },
          {
            level: 'Easy',
            question: 'Find width if area is 72 cm^2 and length is 9 cm.',
            hint: 'w = A/l.',
            answer: 'w = 8 cm.'
          },
          {
            level: 'Medium',
            question: 'Find length if perimeter is 50 cm and width is 9 cm.',
            hint: 'Rearrange P = 2(l + w).',
            answer: 'l = 16 cm.'
          },
          {
            level: 'Medium',
            question: 'Find diagonal if l = 8 cm and w = 15 cm.',
            hint: 'Use d = sqrt(l^2 + w^2).',
            answer: 'd = 17 cm.'
          },
          {
            level: 'Medium',
            question: 'A rectangular lawn is 18 m by 11 m. Find area and perimeter.',
            hint: 'Use both A and P formulas.',
            answer: 'A = 198 m^2, P = 58 m.'
          },
          {
            level: 'Hard',
            question: 'Diagonal is 13 cm and width is 5 cm. Find length.',
            hint: 'Use Pythagoras on l, w, d.',
            answer: 'l = 12 cm.'
          },
          {
            level: 'Hard',
            question: 'If both length and width double, by what factor do perimeter and area change?',
            hint: 'Test formulas with scaling.',
            answer: 'Perimeter doubles; area becomes 4 times.'
          }
        ],
        practiceQa: [
          {
            question: 'What makes a rectangle different from a general quadrilateral?',
            answer: 'All four interior angles are right angles.'
          },
          {
            question: 'What is the perimeter formula for rectangle?',
            answer: 'P = 2(l + w).'
          },
          {
            question: 'What is the area formula for rectangle?',
            answer: 'A = l x w.'
          },
          {
            question: 'What is the diagonal formula for rectangle?',
            answer: 'd = sqrt(l^2 + w^2).'
          },
          {
            question: 'If l = 20 cm and w = 4 cm, find perimeter.',
            answer: 'P = 48 cm.'
          },
          {
            question: 'If l = 20 cm and w = 4 cm, find area.',
            answer: 'A = 80 cm^2.'
          },
          {
            question: 'If area is 96 cm^2 and l = 12 cm, find width.',
            answer: 'w = 8 cm.'
          },
          {
            question: 'If perimeter is 30 cm and w = 5 cm, find length.',
            answer: 'l = 10 cm.'
          },
          {
            question: 'Is volume applicable for rectangle?',
            answer: 'No, rectangle is a 2D shape.'
          },
          {
            question: 'Give one real-life use of rectangle formulas.',
            answer: 'Used for room flooring, wall painting, and frame measurements.'
          }
        ],
        examCorner: {
          shortcut: 'P = 2(l+w) — add length and width, then double. A = l x w — multiply the two different sides.',
          trap: 'Exam questions often give three values and ask which is length or width — identify the two different dimensions carefully before substituting.',
          quickMethod: 'Write l = __ and w = __ before any calculation. Then choose P = 2(l+w) or A = l x w based on what the question asks.'
        }
      }
    },
    'triangle-types': {
      file: 'selective-geometry-triangle-types.html',
      name: 'Triangle (Scalene, Isosceles, Equilateral)',
      family: '2D Shape',
      overview: 'Triangles have 3 sides and interior angles that sum to 180 degrees.',
      properties: [
        'Scalene: all sides and angles are different.',
        'Isosceles: two sides are equal, base angles are equal.',
        'Equilateral: all three sides are equal, each angle is 60 degrees.'
      ],
      formulas: [
        { label: 'Perimeter', formula: 'P = a + b + c', where: 'sum of all sides' },
        { label: 'Area', formula: 'A = 1/2 x b x h', where: 'b = base, h = perpendicular height' },
        { label: 'Angle Sum', formula: 'A + B + C = 180', where: 'interior angle sum' }
      ],
      example: {
        question: 'Base b = 12 cm, height h = 5 cm. Find area.',
        steps: ['A = 1/2 x 12 x 5', 'A = 30 cm^2'],
        answer: 'A = 30 cm^2'
      },
      mistakes: ['Using slanted side instead of perpendicular height.', 'Assuming any triangle has equal sides.'],
      deepDive: {
        simpleIdea: 'A triangle has 3 sides and 3 angles. Based on side lengths, it can be scalene, isosceles, or equilateral.',
        diagram: {
          type: 'triangle-types-labeled',
          caption: 'Three triangle types are shown with key properties and the common angle-sum rule.'
        },
        measurements: [
          {
            label: 'Perimeter',
            applicable: true,
            formula: 'P = a + b + c',
            idea: 'Add all three side lengths.'
          },
          {
            label: 'Area',
            applicable: true,
            formula: 'A = 1/2 x b x h',
            idea: 'Use base and perpendicular height.'
          },
          {
            label: 'Volume',
            applicable: false,
            idea: 'Triangle is 2D, so volume is not applicable.'
          }
        ],
        angleFacts: [
          'Interior angles of any triangle always add to 180 degrees.',
          'Equilateral triangle has 60 degrees at each angle.',
          'Isosceles triangle has two equal base angles.',
          'Scalene triangle has all different angles.'
        ],
        speciality: [
          'Scalene: all sides different.',
          'Isosceles: two sides equal.',
          'Equilateral: all sides equal and all angles equal.',
          'Triangles are rigid and stable in structures.'
        ],
        typeDifferences: [
          'Scalene: all 3 sides are different, all 3 angles are different, and it has no line of symmetry.',
          'Isosceles: 2 sides are equal, base angles are equal, and it has 1 line of symmetry.',
          'Equilateral: all 3 sides are equal, all 3 angles are 60 degrees, and it has 3 lines of symmetry.',
          'Key difference summary: side equality changes from none (scalene) to two equal (isosceles) to all equal (equilateral).'
        ],
        funFacts: [
          'Bridges and roof trusses use triangles for strength.',
          'Warning road signs are often triangular.',
          'Triangular supports reduce wobble in frames.'
        ],
        realLifeUseCases: [
          'Area formula helps measure triangular land plots, tiles, and design pieces.',
          'Perimeter helps estimate border wire or frame edges.',
          'Angle sum rule helps in construction layout and roof slope planning.',
          'Architects and engineers use triangle geometry for stable structures.',
          'Graphic design uses triangle proportions for logos and layouts.',
          'Correct triangle measurements reduce material waste.'
        ],
        formulaMeaning: [
          {
            title: 'Why P = a + b + c',
            formula: 'P = a + b + c',
            steps: [
              'A triangle has exactly 3 sides.',
              'Perimeter means total boundary length.',
              'So add all side lengths: a + b + c.'
            ]
          },
          {
            title: 'Why A = 1/2 x b x h',
            formula: 'A = 1/2 x b x h',
            steps: [
              'A triangle is half of a matching rectangle/parallelogram with same base and height.',
              'Rectangle area is b x h.',
              'Half of that gives triangle area: 1/2 x b x h.'
            ]
          },
          {
            title: 'Why A + B + C = 180',
            formula: 'A + B + C = 180',
            steps: [
              'All three interior angles of a triangle form a straight-angle total.',
              'A straight angle is 180 degrees.',
              'So the interior sum is always 180 degrees.'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'Find area from base and height',
            question: 'b = 14 cm and h = 9 cm. Find area.',
            steps: [
              'Use A = 1/2 x b x h.',
              'A = 1/2 x 14 x 9.',
              'A = 63 cm^2.'
            ],
            answer: 'A = 63 cm^2'
          },
          {
            title: 'Find perimeter of scalene triangle',
            question: 'Sides are 6 cm, 8 cm, and 11 cm. Find perimeter.',
            steps: [
              'Use P = a + b + c.',
              'P = 6 + 8 + 11.',
              'P = 25 cm.'
            ],
            answer: 'P = 25 cm'
          },
          {
            title: 'Find missing angle',
            question: 'Two angles are 48 degrees and 67 degrees. Find the third angle.',
            steps: [
              'Angle sum in triangle is 180 degrees.',
              'Third angle = 180 - (48 + 67).',
              'Third angle = 65 degrees.'
            ],
            answer: 'Third angle = 65 degrees'
          },
          {
            title: 'Perimeter of equilateral triangle',
            question: 'Equilateral triangle has side 9 cm. Find perimeter.',
            steps: [
              'All sides equal in equilateral triangle.',
              'P = 9 + 9 + 9.',
              'P = 27 cm.'
            ],
            answer: 'P = 27 cm'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'Find perimeter if sides are 5 cm, 7 cm, and 8 cm.',
            hint: 'Add all 3 sides.',
            answer: 'P = 20 cm.'
          },
          {
            level: 'Easy',
            question: 'Find area if b = 10 cm and h = 6 cm.',
            hint: 'Use A = 1/2 x b x h.',
            answer: 'A = 30 cm^2.'
          },
          {
            level: 'Easy',
            question: 'Find the third angle if two angles are 55 degrees and 45 degrees.',
            hint: 'Total is 180 degrees.',
            answer: 'Third angle = 80 degrees.'
          },
          {
            level: 'Medium',
            question: 'Isosceles triangle has equal sides 13 cm and base 10 cm. Find perimeter.',
            hint: 'Perimeter is sum of all sides.',
            answer: 'P = 36 cm.'
          },
          {
            level: 'Medium',
            question: 'Equilateral triangle side is 12 cm. Find each angle and perimeter.',
            hint: 'All angles and all sides are equal.',
            answer: 'Each angle = 60 degrees, P = 36 cm.'
          },
          {
            level: 'Medium',
            question: 'Area is 48 cm^2 and base is 12 cm. Find height.',
            hint: 'Rearrange A = 1/2 x b x h.',
            answer: 'h = 8 cm.'
          },
          {
            level: 'Hard',
            question: 'A triangle has angles in ratio 2:3:4. Find all three angles.',
            hint: 'Let angles be 2x, 3x, 4x and sum to 180.',
            answer: 'Angles are 40 degrees, 60 degrees, and 80 degrees.'
          },
          {
            level: 'Hard',
            question: 'If base is doubled and height is doubled, by what factor does area change?',
            hint: 'Check A = 1/2 x b x h.',
            answer: 'Area becomes 4 times.'
          }
        ],
        practiceQa: [
          {
            question: 'Name the three triangle types by sides.',
            answer: 'Scalene, Isosceles, Equilateral.'
          },
          {
            question: 'What is the perimeter formula for any triangle?',
            answer: 'P = a + b + c.'
          },
          {
            question: 'What is the area formula using base and height?',
            answer: 'A = 1/2 x b x h.'
          },
          {
            question: 'What is the angle sum of any triangle?',
            answer: '180 degrees.'
          },
          {
            question: 'What are angles of an equilateral triangle?',
            answer: '60 degrees, 60 degrees, 60 degrees.'
          },
          {
            question: 'If sides are 9, 9, 12, which triangle type is it?',
            answer: 'Isosceles triangle.'
          },
          {
            question: 'If sides are 5, 6, 7, which triangle type is it?',
            answer: 'Scalene triangle.'
          },
          {
            question: 'If b = 20 cm and h = 4 cm, find area.',
            answer: 'A = 40 cm^2.'
          },
          {
            question: 'Is volume applicable to triangle?',
            answer: 'No, triangle is 2D.'
          },
          {
            question: 'Give one real-life use of triangle formulas.',
            answer: 'Used in roof frames, bridges, and land-survey calculations.'
          }
        ],
        examCorner: {
          shortcut: 'Angle sum = 180 degrees always. Area = (1/2) x base x perpendicular height. Identify triangle type first: Scalene (all different), Isosceles (2 equal), Equilateral (all 60 degrees).',
          trap: 'Height in A = (1/2)bh must be perpendicular to the base — the slant side is NOT the height. Exam diagrams often show both and hope you pick the wrong one.',
          quickMethod: 'For missing angle: subtract known angles from 180. For area: confirm which measurement is the perpendicular height before using the formula.'
        }
      }
    },
    'right-triangle': {
      file: 'selective-geometry-right-triangle.html',
      name: 'Right-Angled Triangle',
      family: '2D Shape',
      overview: 'A right triangle has one 90-degree angle.',
      properties: [
        'The longest side opposite 90 degrees is the hypotenuse.',
        'Pythagoras applies only to right triangles.',
        'Area can be found with two perpendicular sides.'
      ],
      formulas: [
        { label: 'Pythagoras', formula: 'c^2 = a^2 + b^2', where: 'c = hypotenuse' },
        { label: 'Area', formula: 'A = 1/2 x a x b', where: 'a and b are perpendicular sides' },
        { label: 'Perimeter', formula: 'P = a + b + c', where: 'sum of sides' }
      ],
      example: {
        question: 'If a = 6 and b = 8, find hypotenuse c.',
        steps: ['c^2 = 6^2 + 8^2 = 36 + 64 = 100', 'c = 10'],
        answer: 'Hypotenuse c = 10'
      },
      mistakes: ['Applying Pythagoras to non-right triangles.', 'Not identifying the hypotenuse correctly.'],
      deepDive: {
        simpleIdea: 'A right-angled triangle is a triangle with exactly one 90 degree angle. The side opposite that angle is called the hypotenuse.',
        diagram: {
          type: 'right-triangle-labeled',
          caption: 'Right triangle parts: perpendicular legs a and b, hypotenuse c, and the 90 degree angle.'
        },
        measurements: [
          {
            label: 'Perimeter',
            applicable: true,
            formula: 'P = a + b + c',
            idea: 'Add all three sides to get total boundary length.'
          },
          {
            label: 'Area',
            applicable: true,
            formula: 'A = 1/2 x a x b',
            idea: 'Use only the two perpendicular sides around the right angle.'
          },
          {
            label: 'Volume',
            applicable: false,
            idea: 'Right triangle is 2D, so volume is not applicable.'
          }
        ],
        angleFacts: [
          'One angle is always 90 degrees.',
          'The other two acute angles add up to 90 degrees.',
          'Total interior angle sum is 180 degrees.'
        ],
        speciality: [
          'Pythagoras theorem works only for right triangles.',
          'Hypotenuse is always the longest side.',
          'Area can be found directly from perpendicular legs.'
        ],
        funFacts: [
          'Ladders against walls create right triangles.',
          'TV size is measured diagonally, linked to right-triangle geometry.',
          'Surveyors and builders use 3-4-5 triangles to check right angles.'
        ],
        realLifeUseCases: [
          'Pythagoras helps find ladder length needed to reach a certain height.',
          'Builders use right triangles to ensure corners are square and accurate.',
          'Engineers use right triangles in ramps, roof slopes, and road gradients.',
          'Area formula helps in triangular panel and support material estimation.',
          'Navigation and mapping often break paths into right-triangle components.',
          'Correct right-triangle calculations reduce construction errors.'
        ],
        formulaMeaning: [
          {
            title: 'Why c^2 = a^2 + b^2',
            formula: 'c^2 = a^2 + b^2',
            steps: [
              'Works only when triangle has a 90 degree angle.',
              'a and b are the perpendicular legs around the right angle.',
              'c is the hypotenuse opposite the right angle.',
              'Square of hypotenuse equals sum of squares of the legs.'
            ]
          },
          {
            title: 'Why A = 1/2 x a x b',
            formula: 'A = 1/2 x a x b',
            steps: [
              'The legs a and b are perpendicular (base and height).',
              'A matching rectangle would have area a x b.',
              'Triangle is half of that rectangle area.'
            ]
          },
          {
            title: 'Why P = a + b + c',
            formula: 'P = a + b + c',
            steps: [
              'Perimeter means total boundary.',
              'A triangle has three sides.',
              'So add all three side lengths.'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'Find hypotenuse',
            question: 'a = 9 cm, b = 12 cm. Find hypotenuse c.',
            steps: [
              'Use c^2 = a^2 + b^2.',
              'c^2 = 9^2 + 12^2 = 81 + 144 = 225.',
              'c = 15 cm.'
            ],
            answer: 'c = 15 cm'
          },
          {
            title: 'Find missing leg',
            question: 'c = 13 cm and a = 5 cm. Find b.',
            steps: [
              'Use c^2 = a^2 + b^2.',
              '13^2 = 5^2 + b^2 => 169 = 25 + b^2.',
              'b^2 = 144 so b = 12 cm.'
            ],
            answer: 'b = 12 cm'
          },
          {
            title: 'Find area',
            question: 'Perpendicular sides are a = 10 cm and b = 7 cm. Find area.',
            steps: [
              'Use A = 1/2 x a x b.',
              'A = 1/2 x 10 x 7.',
              'A = 35 cm^2.'
            ],
            answer: 'A = 35 cm^2'
          },
          {
            title: 'Find perimeter',
            question: 'a = 6 cm, b = 8 cm, c = 10 cm. Find perimeter.',
            steps: [
              'Use P = a + b + c.',
              'P = 6 + 8 + 10.',
              'P = 24 cm.'
            ],
            answer: 'P = 24 cm'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'Find c if a = 3 cm and b = 4 cm.',
            hint: 'Use c^2 = a^2 + b^2.',
            answer: 'c = 5 cm.'
          },
          {
            level: 'Easy',
            question: 'Find area if a = 8 cm and b = 5 cm.',
            hint: 'Use A = 1/2 x a x b.',
            answer: 'A = 20 cm^2.'
          },
          {
            level: 'Easy',
            question: 'Find perimeter if sides are 5 cm, 12 cm, and 13 cm.',
            hint: 'Add all three sides.',
            answer: 'P = 30 cm.'
          },
          {
            level: 'Medium',
            question: 'c = 17 cm and a = 8 cm. Find b.',
            hint: 'Use b^2 = c^2 - a^2.',
            answer: 'b = 15 cm.'
          },
          {
            level: 'Medium',
            question: 'A ladder reaches 12 m height and is 13 m long. How far is the base from the wall?',
            hint: 'Use right triangle with c = 13, vertical = 12.',
            answer: 'Base distance = 5 m.'
          },
          {
            level: 'Medium',
            question: 'Find area if c = 10 cm and one leg is 6 cm.',
            hint: 'Find missing leg first using Pythagoras.',
            answer: 'Other leg = 8 cm, area = 24 cm^2.'
          },
          {
            level: 'Hard',
            question: 'If legs are in ratio 3:4 and hypotenuse is 25 cm, find legs.',
            hint: 'Use scaled 3-4-5 relationship.',
            answer: 'Legs are 15 cm and 20 cm.'
          },
          {
            level: 'Hard',
            question: 'If both legs double, how do hypotenuse and area change?',
            hint: 'Use scaling: linear vs area.',
            answer: 'Hypotenuse doubles; area becomes 4 times.'
          }
        ],
        practiceQa: [
          {
            question: 'Which side is hypotenuse?',
            answer: 'The side opposite the 90 degree angle.'
          },
          {
            question: 'When can Pythagoras be used?',
            answer: 'Only for right-angled triangles.'
          },
          {
            question: 'State Pythagoras theorem.',
            answer: 'c^2 = a^2 + b^2.'
          },
          {
            question: 'Area formula for right triangle using legs?',
            answer: 'A = 1/2 x a x b.'
          },
          {
            question: 'If a = 7 cm and b = 24 cm, find c.',
            answer: 'c = 25 cm.'
          },
          {
            question: 'If c = 10 cm and a = 6 cm, find b.',
            answer: 'b = 8 cm.'
          },
          {
            question: 'If legs are 9 cm and 12 cm, find area.',
            answer: 'A = 54 cm^2.'
          },
          {
            question: 'If sides are 9, 40, 41, find perimeter.',
            answer: 'P = 90 cm.'
          },
          {
            question: 'Is volume applicable for right triangle?',
            answer: 'No, it is a 2D shape.'
          },
          {
            question: 'Give one real-life use of right-triangle formulas.',
            answer: 'Used for ladders, ramps, roof slopes, and distance-height calculations.'
          }
        ],
        examCorner: {
          shortcut: 'Memorise Pythagorean triples: 3-4-5, 5-12-13, 8-15-17. If you see those numbers, c is the largest.',
          trap: 'Hypotenuse c is ALWAYS the side opposite the 90 degree angle. Exam questions swap labels a, b, c — label sides yourself first.',
          quickMethod: 'Step 1: mark the right angle. Step 2: label the side opposite it c. Step 3: use c^2 = a^2 + b^2 or rearranged form.'
        }
      }
    },
    'circle': {
      file: 'selective-geometry-circle.html',
      name: 'Circle',
      family: '2D Shape',
      overview: 'A circle is all points the same distance from the center.',
      properties: [
        'Radius: center to boundary.',
        'Diameter: across center, equals 2r.',
        'Circumference: distance around the circle.'
      ],
      formulas: [
        { label: 'Circumference', formula: 'C = 2pi r = pi d', where: 'r = radius, d = diameter' },
        { label: 'Area', formula: 'A = pi r^2', where: 'r = radius' },
        { label: 'Diameter', formula: 'd = 2r', where: 'conversion' }
      ],
      example: {
        question: 'If r = 5 cm, find circumference and area.',
        steps: ['C = 2pi x 5 = 10pi cm', 'A = pi x 5^2 = 25pi cm^2'],
        answer: 'C = 10pi cm, A = 25pi cm^2'
      },
      mistakes: ['Using diameter in area formula without halving.', 'Confusing circumference with area.'],
      deepDive: {
        simpleIdea: 'A circle is a flat (2D) shape that is perfectly round. Every point on the boundary is exactly the same distance from the center.',
        diagram: {
          type: 'circle-labeled',
          caption: 'Arrows point to the key parts: center, radius, diameter, and circumference.'
        },
        measurements: [
          {
            label: 'Perimeter (Circumference)',
            applicable: true,
            formula: 'C = 2 x pi x r',
            idea: 'This gives the total distance around the boundary of the circle.'
          },
          {
            label: 'Area',
            applicable: true,
            formula: 'A = pi x r^2',
            idea: 'This gives the amount of space inside the circle.'
          },
          {
            label: 'Volume',
            applicable: false,
            idea: 'A circle is 2D, so it has no volume. Volume is for 3D shapes only.'
          }
        ],
        angleFacts: [
          'A full angle at the center of a circle is 360 degrees.',
          'A semicircle is half a circle, so its central angle is 180 degrees.',
          'A quarter circle has a central angle of 90 degrees.'
        ],
        speciality: [
          'All radii of one circle are equal.',
          'The diameter is always the longest chord and equals 2 x radius.',
          'A line from the center to the tangent point is perpendicular to the tangent.'
        ],
        funFacts: [
          'Wheels are circular so they can roll smoothly.',
          'The number pi starts as 3.14159 and never ends.',
          'Bubbles and ripples often look circular because distance spreads evenly from one center.'
        ],
        realLifeUseCases: [
          'Circumference is used to find how much border tape or wire is needed around a circular frame or garden bed.',
          'Area helps when planning how much paint, turf, or fabric is needed for a circular region.',
          'Engineers use circle formulas for wheels, gears, pipes, and round machine parts.',
          'Sports tracks, round tables, and pizza sizes are compared using circumference and area.',
          'Designers use diameter and radius to scale logos, dials, and circular icons correctly.',
          'Builders avoid waste by using exact measurements instead of guessing.'
        ],
        formulaMeaning: [
          {
            title: 'How to understand C = 2 x pi x r',
            formula: 'C = 2 x pi x r',
            steps: [
              'Start with radius r.',
              'Double it to get diameter: d = 2r.',
              'Circumference is pi times the diameter, so C = pi x d = pi x 2r.'
            ]
          },
          {
            title: 'How to understand A = pi x r^2',
            formula: 'A = pi x r^2',
            steps: [
              'Square the radius first: r x r.',
              'Multiply by pi to get the full inside region of the circle.',
              'Always write area in square units, such as cm^2.'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'Find circumference from radius',
            question: 'A circle has radius r = 7 cm. Find circumference.',
            steps: [
              'Use C = 2 x pi x r.',
              'Substitute r = 7: C = 2 x pi x 7.',
              'C = 14pi cm (about 43.98 cm).'
            ],
            answer: 'C = 14pi cm (about 43.98 cm)'
          },
          {
            title: 'Find area from diameter',
            question: 'A circle has diameter d = 12 cm. Find area.',
            steps: [
              'Convert diameter to radius: r = d/2 = 6 cm.',
              'Use A = pi x r^2.',
              'A = pi x 6^2 = 36pi cm^2 (about 113.10 cm^2).'
            ],
            answer: 'A = 36pi cm^2 (about 113.10 cm^2)'
          },
          {
            title: 'Find radius from circumference',
            question: 'Circumference is 31.4 cm. Find radius (use pi = 3.14).',
            steps: [
              'Use C = 2 x pi x r.',
              '31.4 = 2 x 3.14 x r.',
              'r = 31.4 / 6.28 = 5 cm.'
            ],
            answer: 'r = 5 cm'
          },
          {
            title: 'Compare two circles',
            question: 'Circle A has radius 4 cm, Circle B has radius 8 cm. How many times larger is B area than A area?',
            steps: [
              'Area depends on r^2.',
              'If radius doubles from 4 to 8, area factor is 2^2 = 4.',
              'So Circle B area is 4 times Circle A area.'
            ],
            answer: 'Circle B has 4 times the area of Circle A.'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'Find circumference when r = 10 cm.',
            hint: 'Use C = 2 x pi x r.',
            answer: 'C = 20pi cm (about 62.8 cm).'
          },
          {
            level: 'Easy',
            question: 'Find area when r = 3 cm.',
            hint: 'Use A = pi x r^2.',
            answer: 'A = 9pi cm^2 (about 28.26 cm^2).'
          },
          {
            level: 'Easy',
            question: 'Find diameter when r = 8 cm.',
            hint: 'Use d = 2r.',
            answer: 'd = 16 cm.'
          },
          {
            level: 'Medium',
            question: 'If diameter is 20 cm, find circumference.',
            hint: 'Use C = pi x d.',
            answer: 'C = 20pi cm (about 62.8 cm).'
          },
          {
            level: 'Medium',
            question: 'If circumference is 44 cm, estimate radius (use pi = 22/7).',
            hint: 'Rearrange C = 2pi r to r = C / (2pi).',
            answer: 'r = 44 / (2 x 22/7) = 7 cm.'
          },
          {
            level: 'Medium',
            question: 'Find area when diameter is 14 cm (use pi = 22/7).',
            hint: 'First find radius.',
            answer: 'r = 7 cm, so A = 22/7 x 7^2 = 154 cm^2.'
          },
          {
            level: 'Hard',
            question: 'A circular garden has area 154 m^2 (use pi = 22/7). Find radius.',
            hint: 'A = pi r^2, so r^2 = A/pi.',
            answer: 'r^2 = 154 / (22/7) = 49, so r = 7 m.'
          },
          {
            level: 'Hard',
            question: 'A bike wheel radius increases from 20 cm to 30 cm. By what factor does area increase?',
            hint: 'Area scales with square of radius.',
            answer: 'Factor = (30^2)/(20^2) = 900/400 = 2.25 times.'
          }
        ],
        practiceQa: [
          {
            question: 'Which measurement tells us the distance around a circle?',
            answer: 'Circumference. Formula: C = 2pi r or C = pi d.'
          },
          {
            question: 'Which measurement tells us the space inside a circle?',
            answer: 'Area. Formula: A = pi r^2.'
          },
          {
            question: 'If r = 11 cm, find diameter.',
            answer: 'd = 2r = 22 cm.'
          },
          {
            question: 'If d = 18 cm, find radius.',
            answer: 'r = d/2 = 9 cm.'
          },
          {
            question: 'If r = 4 cm, find circumference in terms of pi.',
            answer: 'C = 8pi cm.'
          },
          {
            question: 'If r = 4 cm, find area in terms of pi.',
            answer: 'A = 16pi cm^2.'
          },
          {
            question: 'Why can circle area not be written in cm (only)?',
            answer: 'Because area covers 2D space, so the unit must be squared (cm^2).'
          },
          {
            question: 'Is volume applicable for a circle?',
            answer: 'No. Circle is a 2D shape and does not have volume.'
          },
          {
            question: 'In real life, when would circumference be useful?',
            answer: 'When measuring border length, wheel travel per rotation, or round fencing length.'
          },
          {
            question: 'If radius doubles, what happens to area?',
            answer: 'Area becomes 4 times because A is proportional to r^2.'
          }
        ],
        examCorner: {
          shortcut: 'r = d / 2 always as Step 1 when diameter is given. C = 2 x pi x r. A = pi x r^2. Remember: circumference uses r once, area uses r twice (r^2).',
          trap: 'Diameter given does NOT go directly into A = pi x r^2. Halve it first. This is the most common circle mistake on selective exams.',
          quickMethod: 'Write r = at the top of your working. Find r from d if needed. Then substitute into C or A depending on the question.'
        }
      }
    },
    'semicircle': {
      file: 'selective-geometry-semicircle.html',
      name: 'Semicircle',
      family: '2D Shape',
      overview: 'A semicircle is half of a circle.',
      properties: [
        'It has a curved arc and one straight diameter edge.',
        'Area is half the area of a full circle.',
        'Perimeter includes arc plus diameter.'
      ],
      formulas: [
        { label: 'Area', formula: 'A = 1/2 pi r^2', where: 'half of circle area' },
        { label: 'Arc Length', formula: 'L = pi r', where: 'half circumference' },
        { label: 'Perimeter', formula: 'P = pi r + 2r', where: 'arc + diameter' }
      ],
      example: {
        question: 'If r = 4 cm, find area.',
        steps: ['A = 1/2 x pi x 4^2', 'A = 8pi cm^2'],
        answer: 'A = 8pi cm^2'
      },
      mistakes: ['Using full circle area.', 'For perimeter, forgetting to include the diameter.'],
      deepDive: {
        simpleIdea: 'A semicircle is exactly half of a full circle, made by cutting a circle along its diameter.',
        diagram: {
          type: 'semicircle-labeled',
          caption: 'The curved arc, radius, diameter, and center are marked in different colors.'
        },
        measurements: [
          {
            label: 'Perimeter',
            applicable: true,
            formula: 'P = pi r + 2r',
            idea: 'Perimeter of a semicircle means curved arc plus straight diameter.'
          },
          {
            label: 'Area',
            applicable: true,
            formula: 'A = 1/2 x pi x r^2',
            idea: 'Area of semicircle is half the area of a full circle.'
          },
          {
            label: 'Volume',
            applicable: false,
            idea: 'Semicircle is a 2D shape, so it does not have volume.'
          }
        ],
        angleFacts: [
          'A semicircle corresponds to 180 degrees at the center of the full circle.',
          'The arc of a semicircle is half the full circumference.',
          'If a triangle is drawn with diameter as one side and third point on arc, the angle at arc is 90 degrees (Thales idea).'
        ],
        speciality: [
          'It has one curved boundary and one straight boundary.',
          'Diameter is the longest straight line inside the parent circle.',
          'Its line of symmetry is the radius line through the center perpendicular to diameter.'
        ],
        funFacts: [
          'Rainbow shapes are often modeled like semicircles.',
          'Tunnel entrances and bridge arches are commonly semicircular for strength and design.',
          'Many playground domes and amphitheater tops use semicircle geometry.'
        ],
        realLifeUseCases: [
          'Perimeter helps in finding border length for semicircular garden edges and arch frames.',
          'Area helps estimate paint, turf, or tiles needed for semicircular regions.',
          'Engineers use semicircle area in bridge arch and tunnel cross-section design.',
          'Architects use semicircular windows and doors where both style and measurement matter.',
          'Sports grounds and stage layouts often include semicircle markings measured using these formulas.',
          'Correct equations reduce material waste and cost.'
        ],
        formulaMeaning: [
          {
            title: 'Why A = 1/2 x pi x r^2',
            formula: 'A = 1/2 x pi x r^2',
            steps: [
              'Area of a full circle is pi x r^2.',
              'Semicircle is half of that full circle.',
              'So divide by 2: A = 1/2 x pi x r^2.'
            ]
          },
          {
            title: 'Why P = pi r + 2r',
            formula: 'P = pi r + 2r',
            steps: [
              'Curved part of semicircle is half circumference = pi r.',
              'Straight edge is the diameter = 2r.',
              'Add both: P = pi r + 2r.'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'Find area from radius',
            question: 'Radius r = 6 cm. Find area of the semicircle.',
            steps: [
              'Use A = 1/2 x pi x r^2.',
              'A = 1/2 x pi x 6^2 = 1/2 x 36pi.',
              'A = 18pi cm^2 (about 56.52 cm^2).'
            ],
            answer: 'A = 18pi cm^2 (about 56.52 cm^2)'
          },
          {
            title: 'Find perimeter from radius',
            question: 'Radius r = 7 cm. Find perimeter of the semicircle.',
            steps: [
              'Use P = pi r + 2r.',
              'P = 7pi + 14 cm.',
              'Using pi = 22/7, P = 22 + 14 = 36 cm.'
            ],
            answer: 'P = 7pi + 14 cm (or 36 cm if pi = 22/7)'
          },
          {
            title: 'Find radius from area',
            question: 'Area is 77 cm^2. Find radius (use pi = 22/7).',
            steps: [
              'A = 1/2 x pi x r^2.',
              '77 = 1/2 x 22/7 x r^2 = 11/7 x r^2.',
              'r^2 = 49 so r = 7 cm.'
            ],
            answer: 'r = 7 cm'
          },
          {
            title: 'Perimeter when diameter is given',
            question: 'Diameter d = 20 cm. Find perimeter.',
            steps: [
              'First find radius: r = d/2 = 10 cm.',
              'Use P = pi r + 2r = 10pi + 20.',
              'About 51.4 cm (using pi = 3.14).'
            ],
            answer: 'P = 10pi + 20 cm (about 51.4 cm)'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'Find area if r = 4 cm.',
            hint: 'A = 1/2 x pi x r^2.',
            answer: 'A = 8pi cm^2.'
          },
          {
            level: 'Easy',
            question: 'Find perimeter if r = 5 cm.',
            hint: 'Use P = pi r + 2r.',
            answer: 'P = 5pi + 10 cm.'
          },
          {
            level: 'Easy',
            question: 'If diameter is 18 cm, what is radius?',
            hint: 'r = d/2.',
            answer: 'r = 9 cm.'
          },
          {
            level: 'Medium',
            question: 'Find perimeter if diameter is 14 cm (use pi = 22/7).',
            hint: 'Convert diameter to radius first.',
            answer: 'r = 7, so P = 22 + 14 = 36 cm.'
          },
          {
            level: 'Medium',
            question: 'Find area if diameter is 12 cm.',
            hint: 'r = 6, then use semicircle area formula.',
            answer: 'A = 18pi cm^2.'
          },
          {
            level: 'Medium',
            question: 'A semicircular window has radius 0.8 m. Find its area (in terms of pi).',
            hint: 'A = 1/2 x pi x r^2.',
            answer: 'A = 0.32pi m^2.'
          },
          {
            level: 'Hard',
            question: 'Perimeter is 29.7 cm. Find radius (use pi = 3.14).',
            hint: '29.7 = pi r + 2r = r(pi + 2).',
            answer: 'r = 29.7 / 5.14 about 5.78 cm.'
          },
          {
            level: 'Hard',
            question: 'Semicircle A has radius 3 cm and B has radius 6 cm. How many times is area of B compared to A?',
            hint: 'Area scales with r^2.',
            answer: 'Factor = (6^2)/(3^2) = 4 times.'
          }
        ],
        practiceQa: [
          {
            question: 'What is the arc length of a semicircle?',
            answer: 'Arc length = pi r.'
          },
          {
            question: 'What is the full perimeter of a semicircle?',
            answer: 'P = pi r + 2r.'
          },
          {
            question: 'What is the area formula of a semicircle?',
            answer: 'A = 1/2 x pi x r^2.'
          },
          {
            question: 'If r = 9 cm, find diameter.',
            answer: 'd = 18 cm.'
          },
          {
            question: 'If r = 9 cm, find arc length.',
            answer: 'L = 9pi cm.'
          },
          {
            question: 'If r = 9 cm, find perimeter.',
            answer: 'P = 9pi + 18 cm.'
          },
          {
            question: 'If diameter is 16 cm, find area.',
            answer: 'r = 8, so A = 1/2 x pi x 8^2 = 32pi cm^2.'
          },
          {
            question: 'Is volume applicable for semicircle?',
            answer: 'No. Semicircle is 2D and has no volume.'
          },
          {
            question: 'Why do we add diameter in perimeter?',
            answer: 'Because semicircle perimeter includes both curved arc and straight base edge.'
          },
          {
            question: 'Give one real-life use of semicircle equations.',
            answer: 'To measure material needed for semicircular windows, arches, and garden borders.'
          }
        ],
        examCorner: {
          shortcut: 'Semicircle perimeter = curved arc + straight diameter = pi x r + 2r. Area = (1/2) x pi x r^2. Both formulas are exactly half of the full circle plus the straight base.',
          trap: 'Perimeter of semicircle includes the straight diameter edge. Many students only calculate the curved arc and forget to add 2r.',
          quickMethod: 'Write full circle C and A first. Halve each. Then add 2r for perimeter only (not area).'
        }
      }
    },
    'sector': {
      file: 'selective-geometry-sector.html',
      name: 'Sector',
      family: '2D Shape',
      overview: 'A sector is a slice of a circle made by two radii and an arc.',
      properties: [
        'Its size depends on central angle theta.',
        'Area is a fraction of the full circle area.',
        'Arc length is a fraction of full circumference.'
      ],
      formulas: [
        { label: 'Area', formula: 'A = (theta/360) x pi r^2', where: 'theta in degrees' },
        { label: 'Arc Length', formula: 'L = (theta/360) x 2pi r', where: 'theta in degrees' },
        { label: 'Perimeter', formula: 'P = 2r + L', where: 'two radii + arc length' }
      ],
      example: {
        question: 'r = 6 cm, theta = 90. Find area.',
        steps: ['A = (90/360) x pi x 6^2', 'A = 1/4 x 36pi = 9pi cm^2'],
        answer: 'A = 9pi cm^2'
      },
      mistakes: ['Forgetting to divide by 360.', 'Mixing sector area and arc length formulas.'],
      deepDive: {
        simpleIdea: 'A sector is like a pizza slice: two radii and one curved arc cut out from a full circle.',
        diagram: {
          type: 'sector-labeled',
          caption: 'Sector parts: arc length L, two radii r, central angle theta, and center O.'
        },
        measurements: [
          {
            label: 'Perimeter',
            applicable: true,
            formula: 'P = 2r + L',
            idea: 'Perimeter includes both straight sides (r and r) plus the curved arc.'
          },
          {
            label: 'Area',
            applicable: true,
            formula: 'A = (theta/360) x pi x r^2',
            idea: 'Sector area is a fraction of full circle area based on central angle theta.'
          },
          {
            label: 'Volume',
            applicable: false,
            idea: 'Sector is 2D, so volume is not applicable.'
          }
        ],
        angleFacts: [
          'theta is the central angle and controls how big the sector is.',
          'If theta = 360, the sector becomes a full circle.',
          'If theta = 180, the sector becomes a semicircle.',
          'If theta = 90, the sector is a quarter circle.'
        ],
        speciality: [
          'Arc length and area both scale directly with theta/360.',
          'Two sectors with the same r and theta are congruent.',
          'A bigger radius increases both area and arc length quickly.'
        ],
        funFacts: [
          'Pizza slices, fan blades, and radar sweeps are often sector-shaped.',
          'Clock pie charts use sector angles to show data proportions.',
          'A wheel spoke section between two spokes forms a sector.'
        ],
        realLifeUseCases: [
          'Designers use sector area to estimate material for fan-shaped pieces.',
          'Engineers use arc length in curved track sections and rotating machinery.',
          'City planners use sector models in roundabout lane and signage design.',
          'Data charts (pie charts) are sectors where angle represents percentage.',
          'Bakers and caterers estimate slice sizes using sector formulas.',
          'Using correct formulas prevents over-cutting and material waste.'
        ],
        formulaMeaning: [
          {
            title: 'Why A = (theta/360) x pi x r^2',
            formula: 'A = (theta/360) x pi x r^2',
            steps: [
              'Start with full circle area pi x r^2.',
              'Sector is only theta out of 360 degrees.',
              'Multiply by theta/360 to get the sector part.'
            ]
          },
          {
            title: 'Why L = (theta/360) x 2pi r',
            formula: 'L = (theta/360) x 2pi r',
            steps: [
              'Full circumference is 2pi r.',
              'Arc is only theta out of 360 degrees of that circle.',
              'So arc length is (theta/360) times full circumference.'
            ]
          },
          {
            title: 'Why P = 2r + L',
            formula: 'P = 2r + L',
            steps: [
              'A sector boundary has two radii and one arc.',
              'Add radius + radius + arc length.',
              'So perimeter is 2r + L.'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'Area when r and theta are known',
            question: 'r = 6 cm and theta = 90 degrees. Find area.',
            steps: [
              'A = (theta/360) x pi x r^2.',
              'A = (90/360) x pi x 6^2 = 1/4 x 36pi.',
              'A = 9pi cm^2 (about 28.27 cm^2).'
            ],
            answer: 'A = 9pi cm^2 (about 28.27 cm^2)'
          },
          {
            title: 'Arc length of a 60-degree sector',
            question: 'r = 12 cm and theta = 60 degrees. Find arc length.',
            steps: [
              'L = (theta/360) x 2pi r.',
              'L = (60/360) x 2pi x 12 = 1/6 x 24pi.',
              'L = 4pi cm (about 12.57 cm).'
            ],
            answer: 'L = 4pi cm (about 12.57 cm)'
          },
          {
            title: 'Perimeter of a sector',
            question: 'r = 10 cm and theta = 72 degrees. Find perimeter.',
            steps: [
              'First find arc: L = (72/360) x 2pi x 10 = 4pi cm.',
              'Perimeter P = 2r + L = 20 + 4pi cm.',
              'About 32.57 cm (using pi = 3.14).'
            ],
            answer: 'P = 20 + 4pi cm (about 32.57 cm)'
          },
          {
            title: 'Find theta from area',
            question: 'r = 7 cm and area = 77 cm^2. Find theta (use pi = 22/7).',
            steps: [
              'A = (theta/360) x pi x r^2.',
              '77 = (theta/360) x (22/7) x 49 = (theta/360) x 154.',
              'theta = 77 x 360 / 154 = 180 degrees.'
            ],
            answer: 'theta = 180 degrees'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'Find area when r = 5 cm and theta = 72 degrees.',
            hint: 'Use A = (theta/360) x pi x r^2.',
            answer: 'A = 5pi cm^2.'
          },
          {
            level: 'Easy',
            question: 'Find arc length when r = 9 cm and theta = 120 degrees.',
            hint: 'Use L = (theta/360) x 2pi r.',
            answer: 'L = 6pi cm.'
          },
          {
            level: 'Easy',
            question: 'Find perimeter when r = 7 cm and arc length is 11 cm.',
            hint: 'P = 2r + L.',
            answer: 'P = 25 cm.'
          },
          {
            level: 'Medium',
            question: 'r = 8 cm, theta = 45 degrees. Find perimeter in terms of pi.',
            hint: 'Find arc first, then add 2r.',
            answer: 'L = 2pi cm, so P = 16 + 2pi cm.'
          },
          {
            level: 'Medium',
            question: 'A pie chart sector has theta = 144 degrees and r = 10 cm. Find area.',
            hint: 'Area is theta/360 of full circle area.',
            answer: 'A = 40pi cm^2.'
          },
          {
            level: 'Medium',
            question: 'Arc length is 15.7 cm, radius is 10 cm. Find theta (use pi = 3.14).',
            hint: 'Use L = (theta/360) x 2pi r and solve for theta.',
            answer: 'theta = 90 degrees.'
          },
          {
            level: 'Hard',
            question: 'Area of sector is 44 cm^2, radius is 6 cm. Find theta (use pi = 22/7).',
            hint: 'Set 44 = (theta/360) x (22/7) x 36.',
            answer: 'theta about 127.27 degrees.'
          },
          {
            level: 'Hard',
            question: 'Two sectors have same radius. Sector A has theta = 30, Sector B has theta = 150. How many times is area B compared to A?',
            hint: 'Area is proportional to theta when radius is same.',
            answer: 'B is 150/30 = 5 times A.'
          }
        ],
        practiceQa: [
          {
            question: 'What is a sector in one line?',
            answer: 'A sector is a portion of a circle bounded by two radii and an arc.'
          },
          {
            question: 'What does theta represent?',
            answer: 'theta is the central angle of the sector in degrees.'
          },
          {
            question: 'How do you find sector area?',
            answer: 'A = (theta/360) x pi x r^2.'
          },
          {
            question: 'How do you find arc length of a sector?',
            answer: 'L = (theta/360) x 2pi r.'
          },
          {
            question: 'How do you find sector perimeter?',
            answer: 'P = 2r + L.'
          },
          {
            question: 'If theta = 180 degrees, what shape is the sector?',
            answer: 'A semicircle.'
          },
          {
            question: 'If theta = 360 degrees, what shape is the sector?',
            answer: 'A full circle.'
          },
          {
            question: 'Is volume applicable for sector?',
            answer: 'No, because a sector is a 2D shape.'
          },
          {
            question: 'If radius doubles and theta stays same, what happens to area?',
            answer: 'Area becomes 4 times larger.'
          },
          {
            question: 'Give one real-life use of sector formulas.',
            answer: 'Used in pie charts, fan blade design, and circular slice measurements.'
          }
        ],
        examCorner: {
          shortcut: 'Sector is a pizza slice. Fraction of circle = theta / 360. Arc length = (theta/360) x 2 x pi x r. Area = (theta/360) x pi x r^2.',
          trap: 'Exam asks for arc length OR sector area — not the same thing. Arc length is a line measurement; sector area is a region measurement.',
          quickMethod: 'Write fraction = theta / 360 first. Multiply fraction by the relevant full-circle formula for C or A.'
        }
      }
    },
    'parallelogram': {
      file: 'selective-geometry-parallelogram.html',
      name: 'Parallelogram',
      family: '2D Shape',
      overview: 'A parallelogram has both pairs of opposite sides parallel.',
      properties: [
        'Opposite sides are equal.',
        'Opposite angles are equal.',
        'Adjacent angles add to 180 degrees.'
      ],
      formulas: [
        { label: 'Area', formula: 'A = b x h', where: 'h is perpendicular height' },
        { label: 'Perimeter', formula: 'P = 2(a + b)', where: 'a and b are side lengths' }
      ],
      example: {
        question: 'If b = 9 cm and h = 4 cm, find area.',
        steps: ['A = 9 x 4', 'A = 36 cm^2'],
        answer: 'A = 36 cm^2'
      },
      mistakes: ['Using slanted side as height.', 'Assuming all angles are right angles.'],
      deepDive: {
        simpleIdea: 'A parallelogram is a slanted rectangle-like shape where opposite sides stay parallel and equal. Height is the perpendicular distance between the parallel sides.',
        diagram: {
          type: 'parallelogram-labeled',
          caption: 'Parallelogram parts: base b, side a, perpendicular height h, and opposite sides that remain parallel.'
        },
        measurements: [
          {
            label: 'Perimeter',
            applicable: true,
            formula: 'P = 2(a + b)',
            idea: 'Add one pair of adjacent sides and double it.'
          },
          {
            label: 'Area',
            applicable: true,
            formula: 'A = b x h',
            idea: 'Use base with perpendicular height (not slanted side).'
          },
          {
            label: 'Volume',
            applicable: false,
            idea: 'Parallelogram is 2D, so volume does not apply.'
          }
        ],
        angleFacts: [
          'Opposite angles are equal.',
          'Adjacent angles are supplementary (sum to 180 degrees).',
          'All interior angles together sum to 360 degrees.'
        ],
        speciality: [
          'Opposite sides are both equal and parallel.',
          'Area matches a rectangle with same base and height.',
          'Diagonals bisect each other (meet at midpoint).'
        ],
        funFacts: [
          'A rectangle is a special type of parallelogram.',
          'Shearing a rectangle keeps area the same but changes angles.',
          'Many floor tile and pattern designs use parallelogram grids.'
        ],
        realLifeUseCases: [
          'Architects estimate slanted wall panel coverage using A = b x h.',
          'Engineers use parallelogram force diagrams in mechanics.',
          'Designers use perimeter to calculate frame or border material.',
          'Roof and ramp side views often form parallelogram sections.',
          'Manufacturing layouts use parallelogram geometry for angled cuts.',
          'Correct base-height use avoids costly material miscalculation.'
        ],
        formulaMeaning: [
          {
            title: 'Why A = b x h',
            formula: 'A = b x h',
            steps: [
              'Height h is measured perpendicular to the base.',
              'If you cut and slide a triangular part, the shape can rearrange into a rectangle.',
              'That rectangle has same base and height, so same area.'
            ]
          },
          {
            title: 'Why P = 2(a + b)',
            formula: 'P = 2(a + b)',
            steps: [
              'A parallelogram has two sides of length a and two of length b.',
              'So perimeter is a + b + a + b.',
              'This simplifies to 2(a + b).'
            ]
          },
          {
            title: 'Height vs Side: important difference',
            formula: 'A uses b and h, not b and a',
            steps: [
              'Side a is slanted and does not represent vertical gap.',
              'Height h is the shortest perpendicular distance between parallel sides.',
              'Using side instead of height gives wrong area.'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'Area from base and height',
            question: 'b = 12 cm and h = 7 cm. Find area.',
            steps: [
              'Use A = b x h.',
              'A = 12 x 7.',
              'A = 84 cm^2.'
            ],
            answer: 'A = 84 cm^2'
          },
          {
            title: 'Perimeter from two sides',
            question: 'a = 6 cm and b = 11 cm. Find perimeter.',
            steps: [
              'Use P = 2(a + b).',
              'P = 2(6 + 11) = 2 x 17.',
              'P = 34 cm.'
            ],
            answer: 'P = 34 cm'
          },
          {
            title: 'Find missing height',
            question: 'Area is 90 cm^2 and base is 15 cm. Find height.',
            steps: [
              'Use A = b x h.',
              '90 = 15 x h.',
              'h = 6 cm.'
            ],
            answer: 'h = 6 cm'
          },
          {
            title: 'Real-life panel estimate',
            question: 'A slanted glass panel is a parallelogram with b = 1.8 m and h = 1.2 m. Find area.',
            steps: [
              'Use A = b x h.',
              'A = 1.8 x 1.2.',
              'A = 2.16 m^2.'
            ],
            answer: 'A = 2.16 m^2'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'Find area if b = 9 cm and h = 5 cm.',
            hint: 'Use A = b x h.',
            answer: 'A = 45 cm^2.'
          },
          {
            level: 'Easy',
            question: 'Find perimeter if a = 4 cm and b = 10 cm.',
            hint: 'Use P = 2(a + b).',
            answer: 'P = 28 cm.'
          },
          {
            level: 'Easy',
            question: 'Opposite angles are 70 degrees and ___ ?',
            hint: 'Opposite angles are equal.',
            answer: '70 degrees.'
          },
          {
            level: 'Medium',
            question: 'Area is 63 cm^2 and base is 9 cm. Find h.',
            hint: 'h = A/b.',
            answer: 'h = 7 cm.'
          },
          {
            level: 'Medium',
            question: 'A = 96 cm^2, h = 8 cm. Find base b.',
            hint: 'b = A/h.',
            answer: 'b = 12 cm.'
          },
          {
            level: 'Medium',
            question: 'a = 13 cm, b = 9 cm. Find perimeter.',
            hint: 'Add and double.',
            answer: 'P = 44 cm.'
          },
          {
            level: 'Hard',
            question: 'Base increases by 20% while height stays same. How does area change?',
            hint: 'Area is directly proportional to base.',
            answer: 'Area increases by 20%.'
          },
          {
            level: 'Hard',
            question: 'A parallelogram and rectangle have same base 10 cm and height 6 cm. Compare areas.',
            hint: 'Use A = b x h for both.',
            answer: 'Both areas are equal: 60 cm^2.'
          }
        ],
        practiceQa: [
          {
            question: 'What is the area formula of a parallelogram?',
            answer: 'A = b x h.'
          },
          {
            question: 'What is the perimeter formula?',
            answer: 'P = 2(a + b).'
          },
          {
            question: 'Can slanted side be used as height?',
            answer: 'No, height must be perpendicular to base.'
          },
          {
            question: 'If b = 14 cm and h = 3 cm, find area.',
            answer: 'A = 42 cm^2.'
          },
          {
            question: 'If a = 8 cm and b = 5 cm, find perimeter.',
            answer: 'P = 26 cm.'
          },
          {
            question: 'If one angle is 110 degrees, adjacent angle is?',
            answer: '70 degrees.'
          },
          {
            question: 'If one angle is 48 degrees, opposite angle is?',
            answer: '48 degrees.'
          },
          {
            question: 'Do parallelograms always have right angles?',
            answer: 'No. Only rectangles and squares do.'
          },
          {
            question: 'Is volume applicable to parallelogram?',
            answer: 'No, because it is a 2D shape.'
          },
          {
            question: 'Give one real-life use of parallelogram equations.',
            answer: 'Used for angled panel area, frame edging, and force-diagram calculations.'
          }
        ],
        examCorner: {
          shortcut: 'A = b x h where h is the PERPENDICULAR height (not the slant side). P = 2(a + b) adds the two different side lengths.',
          trap: 'Diagrams always show the slant side prominently. Perpendicular height is usually shown as a dashed vertical line — use that for area, never the slant.',
          quickMethod: 'Locate the dashed height line in the diagram. Write h = that value. Then A = b x h.'
        }
      }
    },
    'trapezium': {
      file: 'selective-geometry-trapezium.html',
      name: 'Trapezium',
      family: '2D Shape',
      overview: 'A trapezium has one pair of parallel sides.',
      properties: [
        'The parallel sides are called bases.',
        'Height is perpendicular distance between bases.',
        'Can be isosceles if non-parallel sides are equal.'
      ],
      formulas: [
        { label: 'Area', formula: 'A = 1/2 x (a + b) x h', where: 'a,b are parallel sides' },
        { label: 'Perimeter', formula: 'P = sum of all 4 sides', where: 'add each edge' }
      ],
      example: {
        question: 'a = 10 cm, b = 6 cm, h = 5 cm. Find area.',
        steps: ['A = 1/2 x (10 + 6) x 5', 'A = 1/2 x 16 x 5 = 40 cm^2'],
        answer: 'A = 40 cm^2'
      },
      mistakes: ['Averaging sides but forgetting to multiply by height.', 'Using non-perpendicular height.'],
      deepDive: {
        simpleIdea: 'A trapezium is a 4-sided shape with exactly one pair of parallel sides. These parallel sides are called bases, and height is the perpendicular gap between them.',
        diagram: {
          type: 'trapezium-labeled',
          caption: 'Trapezium parts: parallel bases a and b, perpendicular height h, and non-parallel sides c and d.'
        },
        measurements: [
          {
            label: 'Perimeter',
            applicable: true,
            formula: 'P = a + b + c + d',
            idea: 'Add all four side lengths.'
          },
          {
            label: 'Area',
            applicable: true,
            formula: 'A = 1/2 x (a + b) x h',
            idea: 'Take average of the two bases, then multiply by perpendicular height.'
          },
          {
            label: 'Volume',
            applicable: false,
            idea: 'Trapezium is a 2D shape, so volume is not applicable.'
          }
        ],
        angleFacts: [
          'Interior angles on the same leg add to 180 degrees because bases are parallel.',
          'Total interior angle sum of any quadrilateral is 360 degrees.',
          'In an isosceles trapezium, base angles are equal in pairs.'
        ],
        speciality: [
          'Only one pair of opposite sides is parallel.',
          'The mid-segment length equals (a + b)/2.',
          'Area depends on base lengths and perpendicular height, not slanted sides.'
        ],
        funFacts: [
          'Many bridge supports and roof profiles look like trapeziums.',
          'A bucket side view is often modeled with trapezium geometry.',
          'Some optical illusions use trapezium frames to fake depth.'
        ],
        realLifeUseCases: [
          'Builders use trapezium area to estimate paint or panel coverage on sloped walls.',
          'Road and ramp cross-sections are often trapezium-shaped for drainage and stability.',
          'Civil engineers estimate excavation and embankment areas using trapezium sections.',
          'Perimeter helps calculate border material for trapezium windows and frames.',
          'Manufacturing uses trapezium dimensions for angled sheet-metal cuts.',
          'Using correct height avoids overestimating area and wasting materials.'
        ],
        formulaMeaning: [
          {
            title: 'Why A = 1/2 x (a + b) x h',
            formula: 'A = 1/2 x (a + b) x h',
            steps: [
              'Bases a and b are parallel, but usually different lengths.',
              'Average base length is (a + b)/2.',
              'Area is average base multiplied by perpendicular height h.'
            ]
          },
          {
            title: 'Why P = a + b + c + d',
            formula: 'P = a + b + c + d',
            steps: [
              'Perimeter means total outer boundary.',
              'A trapezium has four sides.',
              'So add all four side lengths.'
            ]
          },
          {
            title: 'Height is not a slanted side',
            formula: 'h is perpendicular to bases',
            steps: [
              'Height must be at 90 deg to the bases.',
              'Slanted sides c and d are usually longer than h.',
              'Using c or d in place of h gives wrong area.'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'Find area',
            question: 'a = 14 cm, b = 8 cm, h = 6 cm. Find area.',
            steps: [
              'Use A = 1/2 x (a + b) x h.',
              'A = 1/2 x (14 + 8) x 6 = 1/2 x 22 x 6.',
              'A = 66 cm^2.'
            ],
            answer: 'A = 66 cm^2'
          },
          {
            title: 'Find perimeter',
            question: 'a = 12 cm, b = 7 cm, c = 5 cm, d = 6 cm. Find perimeter.',
            steps: [
              'Use P = a + b + c + d.',
              'P = 12 + 7 + 5 + 6.',
              'P = 30 cm.'
            ],
            answer: 'P = 30 cm'
          },
          {
            title: 'Find missing height',
            question: 'Area is 72 cm^2, bases are a = 10 cm and b = 8 cm. Find h.',
            steps: [
              'Use A = 1/2 x (a + b) x h.',
              '72 = 1/2 x 18 x h = 9h.',
              'h = 8 cm.'
            ],
            answer: 'h = 8 cm'
          },
          {
            title: 'Find unknown base',
            question: 'A = 90 cm^2, h = 10 cm, and b = 8 cm. Find a.',
            steps: [
              '90 = 1/2 x (a + 8) x 10.',
              '90 = 5(a + 8), so a + 8 = 18.',
              'a = 10 cm.'
            ],
            answer: 'a = 10 cm'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'Find area if a = 9 cm, b = 5 cm, h = 4 cm.',
            hint: 'Use A = 1/2 x (a + b) x h.',
            answer: 'A = 28 cm^2.'
          },
          {
            level: 'Easy',
            question: 'Find perimeter if sides are 11 cm, 7 cm, 4 cm, 5 cm.',
            hint: 'Add all four sides.',
            answer: 'P = 27 cm.'
          },
          {
            level: 'Easy',
            question: 'One pair of sides is parallel. Name the shape.',
            hint: 'Think of quadrilateral with one parallel pair.',
            answer: 'Trapezium.'
          },
          {
            level: 'Medium',
            question: 'Area is 54 cm^2, a = 8 cm, b = 10 cm. Find h.',
            hint: '54 = 1/2 x (8 + 10) x h.',
            answer: 'h = 6 cm.'
          },
          {
            level: 'Medium',
            question: 'a = 16 cm, b = 10 cm, h = 3 cm. Find area.',
            hint: 'Average bases first.',
            answer: 'A = 39 cm^2.'
          },
          {
            level: 'Medium',
            question: 'If one side angle is 112 degrees, the angle on same leg at other base is?',
            hint: 'Co-interior angles with parallel lines.',
            answer: '68 degrees.'
          },
          {
            level: 'Hard',
            question: 'A trapezium has a = 2b, b = 6 cm, h = 7 cm. Find area.',
            hint: 'Find a first, then apply area formula.',
            answer: 'a = 12, so A = 63 cm^2.'
          },
          {
            level: 'Hard',
            question: 'If both bases double and height stays same, what happens to area?',
            hint: 'Area uses (a + b).',
            answer: 'Area doubles.'
          }
        ],
        practiceQa: [
          {
            question: 'What is a trapezium?',
            answer: 'A quadrilateral with one pair of parallel sides.'
          },
          {
            question: 'Which sides are called bases?',
            answer: 'The two parallel sides.'
          },
          {
            question: 'State area formula of trapezium.',
            answer: 'A = 1/2 x (a + b) x h.'
          },
          {
            question: 'State perimeter formula.',
            answer: 'P = a + b + c + d.'
          },
          {
            question: 'If a = 13 cm, b = 7 cm, h = 5 cm, find area.',
            answer: 'A = 50 cm^2.'
          },
          {
            question: 'If sides are 9, 6, 5, 4, find perimeter.',
            answer: 'P = 24 cm.'
          },
          {
            question: 'Can you use slanted side as height?',
            answer: 'No, height must be perpendicular to bases.'
          },
          {
            question: 'Interior angle sum of trapezium equals?',
            answer: '360 degrees.'
          },
          {
            question: 'Is volume applicable to trapezium?',
            answer: 'No, trapezium is 2D.'
          },
          {
            question: 'Give one real-life use of trapezium equations.',
            answer: 'Used for road sections, roof panels, and trapezium frame area calculations.'
          }
        ],
        examCorner: {
          shortcut: 'A = (1/2)(a + b) x h means average the two parallel sides then multiply by height. The two parallel sides are a and b.',
          trap: 'Must identify WHICH two sides are parallel. A trapezium has exactly one pair of parallel sides — the other two sides are NOT used in the area formula.',
          quickMethod: 'Circle the two parallel sides in the question. Write a = __ and b = __. Then A = (a + b) / 2 x h.'
        }
      }
    },
    'rhombus': {
      file: 'selective-geometry-rhombus.html',
      name: 'Rhombus',
      family: '2D Shape',
      overview: 'A rhombus has four equal sides.',
      properties: [
        'Opposite sides are parallel.',
        'Opposite angles are equal.',
        'Diagonals bisect each other at right angles.'
      ],
      formulas: [
        { label: 'Area', formula: 'A = 1/2 x d1 x d2', where: 'd1,d2 are diagonals' },
        { label: 'Perimeter', formula: 'P = 4a', where: 'a = side length' }
      ],
      example: {
        question: 'If d1 = 12 cm and d2 = 8 cm, find area.',
        steps: ['A = 1/2 x 12 x 8', 'A = 48 cm^2'],
        answer: 'A = 48 cm^2'
      },
      mistakes: ['Confusing rhombus with square.', 'Using diagonal formula for perimeter.'],
      deepDive: {
        simpleIdea: 'A rhombus is a 4-sided shape where all sides are equal. Opposite sides are parallel, and diagonals cross each other at right angles.',
        diagram: {
          type: 'rhombus-labeled',
          caption: 'Rhombus parts: equal side a, diagonals d1 and d2, and center point O where diagonals bisect at 90 degrees.'
        },
        measurements: [
          {
            label: 'Perimeter',
            applicable: true,
            formula: 'P = 4a',
            idea: 'All four sides are equal, so multiply one side by 4.'
          },
          {
            label: 'Area',
            applicable: true,
            formula: 'A = 1/2 x d1 x d2',
            idea: 'Use the two diagonals that cross each other.'
          },
          {
            label: 'Volume',
            applicable: false,
            idea: 'Rhombus is 2D, so volume is not applicable.'
          }
        ],
        angleFacts: [
          'Opposite angles are equal.',
          'Adjacent angles add to 180 degrees.',
          'The diagonals of a rhombus meet at 90 degrees.'
        ],
        speciality: [
          'All sides are equal, unlike a general parallelogram.',
          'Diagonals bisect each other and also bisect vertex angles.',
          'A square is a special rhombus with all angles equal to 90 degrees.'
        ],
        funFacts: [
          'Diamond playing-card symbols are rhombus-like.',
          'Kite and rhombus both use diagonal-based area formulas.',
          'Rhombus tiles are popular in decorative floor patterns.'
        ],
        realLifeUseCases: [
          'Designers use rhombus area for diamond-shaped logos and tiles.',
          'Engineers use perimeter to estimate frame length around rhombus plates.',
          'Diagonal measurements are easier in fabrication than measuring slant heights.',
          'Rhombus geometry appears in mesh grills and lattice structures.',
          'Architectural facades use rhombus panels for visual rhythm and strength.',
          'Correct formulas reduce cutting errors and material waste.'
        ],
        formulaMeaning: [
          {
            title: 'Why A = 1/2 x d1 x d2',
            formula: 'A = 1/2 x d1 x d2',
            steps: [
              'Diagonals split rhombus into 4 right triangles.',
              'The product d1 x d2 forms the area of a related rectangle-like arrangement.',
              'Rhombus area is half of that product.'
            ]
          },
          {
            title: 'Why P = 4a',
            formula: 'P = 4a',
            steps: [
              'All four sides in rhombus are equal.',
              'Perimeter means total boundary length.',
              'So add a + a + a + a = 4a.'
            ]
          },
          {
            title: 'Using diagonals to find side',
            formula: 'a = sqrt((d1/2)^2 + (d2/2)^2)',
            steps: [
              'Diagonals bisect each other at right angles.',
              'Half-diagonals form a right triangle with side a as hypotenuse.',
              'Apply Pythagoras to find side when needed.'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'Area from diagonals',
            question: 'd1 = 18 cm and d2 = 10 cm. Find area.',
            steps: [
              'Use A = 1/2 x d1 x d2.',
              'A = 1/2 x 18 x 10.',
              'A = 90 cm^2.'
            ],
            answer: 'A = 90 cm^2'
          },
          {
            title: 'Perimeter from side',
            question: 'Side a = 7 cm. Find perimeter.',
            steps: [
              'Use P = 4a.',
              'P = 4 x 7.',
              'P = 28 cm.'
            ],
            answer: 'P = 28 cm'
          },
          {
            title: 'Find side from diagonals',
            question: 'd1 = 16 cm and d2 = 12 cm. Find side a.',
            steps: [
              'Half diagonals are 8 cm and 6 cm.',
              'Use a = sqrt(8^2 + 6^2) = sqrt(64 + 36).',
              'a = sqrt(100) = 10 cm.'
            ],
            answer: 'a = 10 cm'
          },
          {
            title: 'Area with decimal diagonals',
            question: 'd1 = 9.5 cm and d2 = 6 cm. Find area.',
            steps: [
              'Use A = 1/2 x d1 x d2.',
              'A = 1/2 x 9.5 x 6.',
              'A = 28.5 cm^2.'
            ],
            answer: 'A = 28.5 cm^2'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'Find area if d1 = 14 cm and d2 = 8 cm.',
            hint: 'Use A = 1/2 x d1 x d2.',
            answer: 'A = 56 cm^2.'
          },
          {
            level: 'Easy',
            question: 'Find perimeter if a = 11 cm.',
            hint: 'Use P = 4a.',
            answer: 'P = 44 cm.'
          },
          {
            level: 'Easy',
            question: 'If one angle is 70 degrees, opposite angle is?',
            hint: 'Opposite angles are equal.',
            answer: '70 degrees.'
          },
          {
            level: 'Medium',
            question: 'Find side a if d1 = 24 cm and d2 = 10 cm.',
            hint: 'Use half-diagonals and Pythagoras.',
            answer: 'a = 13 cm.'
          },
          {
            level: 'Medium',
            question: 'If area is 96 cm^2 and d1 = 12 cm, find d2.',
            hint: '96 = 1/2 x 12 x d2.',
            answer: 'd2 = 16 cm.'
          },
          {
            level: 'Medium',
            question: 'If side is 9 cm, what is total perimeter?',
            hint: 'All four sides are equal.',
            answer: 'P = 36 cm.'
          },
          {
            level: 'Hard',
            question: 'If d1 doubles and d2 stays same, how does area change?',
            hint: 'Area is proportional to d1 x d2.',
            answer: 'Area doubles.'
          },
          {
            level: 'Hard',
            question: 'A rhombus and kite have same diagonals 20 cm and 12 cm. Compare areas.',
            hint: 'Both use 1/2 x d1 x d2.',
            answer: 'Areas are equal: 120 cm^2.'
          }
        ],
        practiceQa: [
          {
            question: 'What is the perimeter formula for rhombus?',
            answer: 'P = 4a.'
          },
          {
            question: 'What is the area formula using diagonals?',
            answer: 'A = 1/2 x d1 x d2.'
          },
          {
            question: 'Are all sides of rhombus equal?',
            answer: 'Yes, all four sides are equal.'
          },
          {
            question: 'Do diagonals of rhombus intersect at 90 degrees?',
            answer: 'Yes.'
          },
          {
            question: 'If d1 = 10 cm and d2 = 6 cm, find area.',
            answer: 'A = 30 cm^2.'
          },
          {
            question: 'If side a = 5.5 cm, find perimeter.',
            answer: 'P = 22 cm.'
          },
          {
            question: 'If one angle is 118 degrees, adjacent angle is?',
            answer: '62 degrees.'
          },
          {
            question: 'Is every rhombus a square?',
            answer: 'No. Only rhombus with all right angles is a square.'
          },
          {
            question: 'Is volume applicable to rhombus?',
            answer: 'No, rhombus is a 2D shape.'
          },
          {
            question: 'Give one real-life use of rhombus equations.',
            answer: 'Used in diamond-shaped tiles, panel design, and lattice frame calculations.'
          }
        ],
        examCorner: {
          shortcut: 'A = (1/2) x d1 x d2 when diagonals given. P = 4a when side given. A rhombus is a pushed-over square — all sides equal but angles are NOT 90 degrees.',
          trap: 'Rhombus looks like a square but angles are not right angles unless explicitly stated. Never assume 90 degrees for rhombus angles.',
          quickMethod: 'Check what values are given — diagonals given: use A = (1/2) x d1 x d2. Side given: use P = 4a.'
        }
      }
    },
    'kite': {
      file: 'selective-geometry-kite.html',
      name: 'Kite',
      family: '2D Shape',
      overview: 'A kite has two pairs of adjacent equal sides.',
      properties: [
        'One pair of opposite angles is equal.',
        'Diagonals intersect at right angles (in common kite cases).',
        'One diagonal bisects the other.'
      ],
      formulas: [
        { label: 'Area', formula: 'A = 1/2 x d1 x d2', where: 'd1,d2 are diagonals' },
        { label: 'Perimeter', formula: 'P = 2(a + b)', where: 'a,b are the two side lengths' }
      ],
      example: {
        question: 'If diagonals are 10 cm and 6 cm, find area.',
        steps: ['A = 1/2 x 10 x 6', 'A = 30 cm^2'],
        answer: 'A = 30 cm^2'
      },
      mistakes: ['Assuming all 4 sides are equal.', 'Forgetting half in diagonal area formula.'],
      deepDive: {
        simpleIdea: 'A kite is a 4-sided shape with two pairs of adjacent equal sides. One diagonal is usually a line of symmetry and often bisects the other at right angles.',
        diagram: {
          type: 'kite-labeled',
          caption: 'Kite parts: equal side pairs a,a and b,b, diagonals d1 and d2, and center O where diagonals intersect.'
        },
        measurements: [
          {
            label: 'Perimeter',
            applicable: true,
            formula: 'P = 2(a + b)',
            idea: 'Add one of each adjacent side pair and multiply by 2.'
          },
          {
            label: 'Area',
            applicable: true,
            formula: 'A = 1/2 x d1 x d2',
            idea: 'Use the two diagonals that cross each other.'
          },
          {
            label: 'Volume',
            applicable: false,
            idea: 'Kite is 2D, so volume is not applicable.'
          }
        ],
        angleFacts: [
          'One pair of opposite angles is equal (in a standard kite).',
          'Diagonals of a kite are perpendicular in common school geometry cases.',
          'Interior angle sum is 360 degrees like all quadrilaterals.'
        ],
        speciality: [
          'Two pairs of adjacent sides are equal, not opposite sides.',
          'One diagonal often acts as symmetry line and bisects the other.',
          'Area can be found quickly from diagonals.'
        ],
        funFacts: [
          'Traditional paper kites are often based on kite geometry.',
          'Many logo and badge designs use kite-like symmetric shapes.',
          'Gem and crystal cuts sometimes show kite faces.'
        ],
        realLifeUseCases: [
          'Designers use kite area to estimate material for kite-shaped graphics and panels.',
          'Festival kite makers use perimeter to calculate edge tape and string lengths.',
          'Engineers use diagonal checks in symmetric plate layouts.',
          'Architecture uses kite panels in facades and skylight patterns.',
          'Tiling and craft patterns use kite units to create repeating mosaics.',
          'Correct equations improve fit and reduce material waste.'
        ],
        formulaMeaning: [
          {
            title: 'Why A = 1/2 x d1 x d2',
            formula: 'A = 1/2 x d1 x d2',
            steps: [
              'Diagonals divide kite into right triangles in common kite forms.',
              'Multiplying diagonals gives a doubled measure of the kite region.',
              'Taking half gives exact kite area.'
            ]
          },
          {
            title: 'Why P = 2(a + b)',
            formula: 'P = 2(a + b)',
            steps: [
              'Kite has two sides of length a and two sides of length b.',
              'Perimeter is a + a + b + b.',
              'This simplifies to 2(a + b).'
            ]
          },
          {
            title: 'When to use diagonals vs sides',
            formula: 'Area uses d1,d2; perimeter uses a,b',
            steps: [
              'Use diagonals when finding area.',
              'Use side lengths when finding perimeter.',
              'Do not mix side formula into area or vice versa.'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'Find area',
            question: 'd1 = 14 cm and d2 = 9 cm. Find area.',
            steps: [
              'Use A = 1/2 x d1 x d2.',
              'A = 1/2 x 14 x 9.',
              'A = 63 cm^2.'
            ],
            answer: 'A = 63 cm^2'
          },
          {
            title: 'Find perimeter',
            question: 'a = 8 cm and b = 5 cm. Find perimeter.',
            steps: [
              'Use P = 2(a + b).',
              'P = 2(8 + 5) = 2 x 13.',
              'P = 26 cm.'
            ],
            answer: 'P = 26 cm'
          },
          {
            title: 'Find missing diagonal',
            question: 'Area is 72 cm^2 and d1 = 12 cm. Find d2.',
            steps: [
              'Use A = 1/2 x d1 x d2.',
              '72 = 1/2 x 12 x d2 = 6d2.',
              'd2 = 12 cm.'
            ],
            answer: 'd2 = 12 cm'
          },
          {
            title: 'Real-life cloth cut',
            question: 'A kite-shaped cloth has d1 = 1.2 m and d2 = 0.8 m. Find area.',
            steps: [
              'Use A = 1/2 x d1 x d2.',
              'A = 1/2 x 1.2 x 0.8.',
              'A = 0.48 m^2.'
            ],
            answer: 'A = 0.48 m^2'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'Find area if d1 = 16 cm and d2 = 6 cm.',
            hint: 'Use A = 1/2 x d1 x d2.',
            answer: 'A = 48 cm^2.'
          },
          {
            level: 'Easy',
            question: 'Find perimeter if a = 7 cm and b = 4 cm.',
            hint: 'Use P = 2(a + b).',
            answer: 'P = 22 cm.'
          },
          {
            level: 'Easy',
            question: 'How many pairs of adjacent equal sides does a kite have?',
            hint: 'Look at definition of kite.',
            answer: 'Two pairs.'
          },
          {
            level: 'Medium',
            question: 'Area is 90 cm^2 and d2 = 10 cm. Find d1.',
            hint: '90 = 1/2 x d1 x 10.',
            answer: 'd1 = 18 cm.'
          },
          {
            level: 'Medium',
            question: 'If a = 9 cm and b = 6 cm, find perimeter.',
            hint: 'Add then multiply by 2.',
            answer: 'P = 30 cm.'
          },
          {
            level: 'Medium',
            question: 'd1 increases by 25% while d2 remains same. What happens to area?',
            hint: 'Area proportional to d1 x d2.',
            answer: 'Area increases by 25%.'
          },
          {
            level: 'Hard',
            question: 'Two kites have same d1 but second has d2 double. Compare areas.',
            hint: 'Area scales with each diagonal linearly.',
            answer: 'Second kite area is 2 times.'
          },
          {
            level: 'Hard',
            question: 'If P = 40 cm and a = 13 cm, find b.',
            hint: '40 = 2(a + b).',
            answer: 'b = 7 cm.'
          }
        ],
        practiceQa: [
          {
            question: 'What is the area formula of a kite?',
            answer: 'A = 1/2 x d1 x d2.'
          },
          {
            question: 'What is the perimeter formula of a kite?',
            answer: 'P = 2(a + b).'
          },
          {
            question: 'Are opposite sides equal in a kite?',
            answer: 'Not generally. Adjacent pairs are equal.'
          },
          {
            question: 'If d1 = 20 cm and d2 = 5 cm, find area.',
            answer: 'A = 50 cm^2.'
          },
          {
            question: 'If a = 6 cm and b = 8 cm, find perimeter.',
            answer: 'P = 28 cm.'
          },
          {
            question: 'Does kite have volume?',
            answer: 'No, it is a 2D shape.'
          },
          {
            question: 'What is the angle sum of a kite?',
            answer: '360 degrees.'
          },
          {
            question: 'Can a square be a kite?',
            answer: 'Yes. It has two pairs of adjacent equal sides.'
          },
          {
            question: 'If area is 54 cm^2 and d1 = 9 cm, find d2.',
            answer: 'd2 = 12 cm.'
          },
          {
            question: 'Give one real-life use of kite equations.',
            answer: 'Used for kite fabric cutting, decorative panel area, and symmetric frame design.'
          }
        ],
        examCorner: {
          shortcut: 'A = (1/2) x d1 x d2 same as rhombus. The symmetry diagonal bisects the other. Two pairs of adjacent equal sides.',
          trap: 'The two diagonals of a kite are NOT equal. One is the symmetry axis (longer), the other is the cross diagonal (shorter). Do not swap them.',
          quickMethod: 'Label the symmetry diagonal d1 and the cross diagonal d2. Write A = (1/2) x d1 x d2 directly.'
        }
      }
    },
    'pentagon': {
      file: 'selective-geometry-pentagon.html',
      name: 'Pentagon',
      family: 'Polygon',
      overview: 'A pentagon is a 5-sided polygon.',
      properties: [
        'Regular pentagon has all sides and angles equal.',
        'Sum of interior angles is 540 degrees.',
        'Each interior angle in regular pentagon is 108 degrees.'
      ],
      formulas: [
        { label: 'Interior Sum', formula: '(n - 2) x 180', where: 'n = 5' },
        { label: 'Regular Interior Angle', formula: '((n - 2) x 180) / n', where: 'n = 5' },
        { label: 'Perimeter (regular)', formula: 'P = 5s', where: 's = side length' },
        { label: 'Area (regular)', formula: 'A = 1/2 x ap x P', where: 'ap = apothem, P = perimeter' }
      ],
      example: {
        question: 'Regular pentagon with side 7 cm. Find perimeter.',
        steps: ['P = 5 x 7', 'P = 35 cm'],
        answer: 'P = 35 cm'
      },
      mistakes: ['Using 360/n for interior angle (that is exterior).'],
      deepDive: {
        simpleIdea: 'A pentagon is a 5-sided shape. In a regular pentagon, all sides and all angles are equal.',
        diagram: {
          type: 'pentagon-labeled',
          caption: 'Regular pentagon parts: side s, apothem ap, central angle 72 deg, center O, and total 5 sides.'
        },
        measurements: [
          {
            label: 'Perimeter (regular)',
            applicable: true,
            formula: 'P = 5s',
            idea: 'A regular pentagon has five equal sides, so multiply one side by 5.'
          },
          {
            label: 'Area (regular)',
            applicable: true,
            formula: 'A = 1/2 x ap x P',
            idea: 'Use apothem (ap) and perimeter (P) for regular pentagon area.'
          },
          {
            label: 'Volume',
            applicable: false,
            idea: 'Pentagon is 2D, so volume does not apply.'
          }
        ],
        angleFacts: [
          'Interior angle sum of any pentagon is 540 degrees.',
          'Each interior angle of a regular pentagon is 108 degrees.',
          'Each exterior angle of a regular pentagon is 72 degrees and all exterior angles sum to 360 degrees.'
        ],
        speciality: [
          'Regular pentagon can be split into 5 equal triangles from center.',
          'Central angle of regular pentagon is 360/5 = 72 degrees.',
          'Diagonals of a regular pentagon create star-like patterns.'
        ],
        funFacts: [
          'Many flowers and starfruit show natural 5-fold symmetry.',
          'The Pentagon building in the USA uses a pentagonal plan.',
          'Soccer balls contain pentagons mixed with hexagons.'
        ],
        realLifeUseCases: [
          'Perimeter helps estimate border material for pentagon signs and frames.',
          'Area helps estimate paint, tile, or sheet material on pentagon panels.',
          'Interior/exterior angles help in accurate carpentry and polygon layouts.',
          'Graphic designers use pentagon geometry in logos and badges.',
          'Engineers use regular polygons to approximate curved forms in designs.',
          'Using exact formulas reduces measurement and cutting errors.'
        ],
        formulaMeaning: [
          {
            title: 'Why interior sum is (n - 2) x 180',
            formula: '(n - 2) x 180',
            steps: [
              'A polygon can be split into triangles from one vertex.',
              'A pentagon (n = 5) becomes 3 triangles.',
              'Each triangle is 180 degrees, so 3 x 180 = 540 degrees.'
            ]
          },
          {
            title: 'Why each regular interior angle is 108 deg',
            formula: 'Interior each = 540/5',
            steps: [
              'Total interior sum for pentagon is 540 degrees.',
              'In regular pentagon all 5 angles are equal.',
              'So each interior angle is 540/5 = 108 degrees.'
            ]
          },
          {
            title: 'Why A = 1/2 x ap x P (regular)',
            formula: 'A = 1/2 x ap x P',
            steps: [
              'Split regular pentagon into 5 triangles from center.',
              'Each triangle area is 1/2 x base x apothem.',
              'Adding all triangle bases gives perimeter P.'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'Interior angle sum',
            question: 'Find the interior angle sum of a pentagon.',
            steps: [
              'Use (n - 2) x 180 with n = 5.',
              '(5 - 2) x 180 = 3 x 180.',
              'Interior sum = 540 degrees.'
            ],
            answer: '540 degrees'
          },
          {
            title: 'Regular interior angle',
            question: 'Find each interior angle of a regular pentagon.',
            steps: [
              'Total interior sum is 540 degrees.',
              'Divide by 5 equal angles.',
              'Each interior angle = 108 degrees.'
            ],
            answer: '108 degrees'
          },
          {
            title: 'Perimeter of regular pentagon',
            question: 'Side s = 9 cm. Find perimeter.',
            steps: [
              'Use P = 5s.',
              'P = 5 x 9.',
              'P = 45 cm.'
            ],
            answer: 'P = 45 cm'
          },
          {
            title: 'Area using apothem',
            question: 'Regular pentagon has side s = 8 cm and apothem ap = 5.5 cm. Find area.',
            steps: [
              'First find perimeter: P = 5s = 40 cm.',
              'Use A = 1/2 x ap x P.',
              'A = 1/2 x 5.5 x 40 = 110 cm^2.'
            ],
            answer: 'A = 110 cm^2'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'Find interior sum of a pentagon.',
            hint: 'Use (n - 2) x 180.',
            answer: '540 degrees.'
          },
          {
            level: 'Easy',
            question: 'Regular pentagon has side 6 cm. Find perimeter.',
            hint: 'Use P = 5s.',
            answer: 'P = 30 cm.'
          },
          {
            level: 'Easy',
            question: 'Find each interior angle of a regular pentagon.',
            hint: 'Divide 540 by 5.',
            answer: '108 degrees.'
          },
          {
            level: 'Medium',
            question: 'If ap = 4 cm and side s = 10 cm, find area of regular pentagon.',
            hint: 'P = 5s, then A = 1/2 x ap x P.',
            answer: 'P = 50, so A = 100 cm^2.'
          },
          {
            level: 'Medium',
            question: 'Find each exterior angle of regular pentagon.',
            hint: 'Exterior sum is 360 degrees.',
            answer: '72 degrees.'
          },
          {
            level: 'Medium',
            question: 'A regular pentagon perimeter is 55 cm. Find side length.',
            hint: 's = P/5.',
            answer: 's = 11 cm.'
          },
          {
            level: 'Hard',
            question: 'If side doubles, what happens to perimeter?',
            hint: 'Perimeter is linear in side.',
            answer: 'Perimeter doubles.'
          },
          {
            level: 'Hard',
            question: 'If both apothem and side double in a regular pentagon, how does area change?',
            hint: 'A = 1/2 x ap x P and P depends on side.',
            answer: 'Area becomes 4 times.'
          }
        ],
        practiceQa: [
          {
            question: 'How many sides does a pentagon have?',
            answer: '5 sides.'
          },
          {
            question: 'Interior angle sum of pentagon?',
            answer: '540 degrees.'
          },
          {
            question: 'Each interior angle of regular pentagon?',
            answer: '108 degrees.'
          },
          {
            question: 'Each exterior angle of regular pentagon?',
            answer: '72 degrees.'
          },
          {
            question: 'Perimeter formula for regular pentagon?',
            answer: 'P = 5s.'
          },
          {
            question: 'Area formula for regular pentagon with apothem?',
            answer: 'A = 1/2 x ap x P.'
          },
          {
            question: 'If s = 12 cm, find perimeter.',
            answer: 'P = 60 cm.'
          },
          {
            question: 'If ap = 6 cm and P = 40 cm, find area.',
            answer: 'A = 120 cm^2.'
          },
          {
            question: 'Is volume applicable for pentagon?',
            answer: 'No, pentagon is a 2D shape.'
          },
          {
            question: 'Give one real-life use of pentagon equations.',
            answer: 'Used in logo design, panel layout, and polygon frame measurements.'
          }
        ],
        examCorner: {
          shortcut: 'Interior angle sum = (5 - 2) x 180 = 540 degrees. Each angle in a regular pentagon = 540 / 5 = 108 degrees.',
          trap: 'Only regular pentagons have every angle equal to 108 degrees. Irregular pentagons do not — only the sum 540 degrees is guaranteed.',
          quickMethod: 'Use (n - 2) x 180 for any polygon angle sum. For n = 5: (3) x 180 = 540 degrees.'
        }
      }
    },
    'hexagon': {
      file: 'selective-geometry-hexagon.html',
      name: 'Hexagon',
      family: 'Polygon',
      overview: 'A hexagon is a 6-sided polygon.',
      properties: ['Interior angle sum is 720 degrees.', 'Regular hexagon has each interior angle 120 degrees.', 'Can be split into 6 equilateral triangles if regular.'],
      formulas: [
        { label: 'Interior Sum', formula: '(6 - 2) x 180 = 720', where: 'n = 6' },
        { label: 'Regular Interior Angle', formula: '720/6 = 120', where: 'regular hexagon' },
        { label: 'Perimeter (regular)', formula: 'P = 6s', where: 's = side length' },
        { label: 'Area (regular)', formula: 'A = 1/2 x ap x P', where: 'ap = apothem, P = perimeter' }
      ],
      example: {
        question: 'Regular hexagon side 5 cm. Find perimeter.',
        steps: ['P = 6 x 5', 'P = 30 cm'],
        answer: 'P = 30 cm'
      },
      mistakes: ['Mixing up hexagon with heptagon side count.'],
      deepDive: {
        simpleIdea: 'A hexagon is a 6-sided shape. In a regular hexagon, all six sides and all six angles are equal.',
        diagram: {
          type: 'hexagon-labeled',
          caption: 'Regular hexagon parts: side s, apothem ap, central angle 60 deg, center O, and total 6 sides.'
        },
        measurements: [
          {
            label: 'Perimeter (regular)',
            applicable: true,
            formula: 'P = 6s',
            idea: 'A regular hexagon has six equal sides, so perimeter is 6 times one side.'
          },
          {
            label: 'Area (regular)',
            applicable: true,
            formula: 'A = 1/2 x ap x P',
            idea: 'Use apothem and perimeter for a clean area calculation.'
          },
          {
            label: 'Volume',
            applicable: false,
            idea: 'Hexagon is a 2D shape, so volume does not apply.'
          }
        ],
        angleFacts: [
          'Interior angle sum of any hexagon is 720 degrees.',
          'Each interior angle in a regular hexagon is 120 degrees.',
          'Each central angle in a regular hexagon is 60 degrees.',
          'Each exterior angle in a regular hexagon is 60 degrees.'
        ],
        speciality: [
          'A regular hexagon can be divided into 6 equal equilateral triangles.',
          'In a regular hexagon, side length equals circumradius.',
          'Hexagon tiles pack with no gaps, making them efficient for coverage.'
        ],
        funFacts: [
          'Honeycombs are hexagonal because this shape stores maximum area with minimum wax.',
          'Hex nuts and bolts use hexagons for easy grip by tools.',
          'Snowflake patterns often show six-fold symmetry.'
        ],
        realLifeUseCases: [
          'Engineers and mechanics use hexagon perimeter for tool-head dimensions.',
          'Architects and designers use hexagon tiling for floors and walls.',
          'Manufacturing uses hexagon geometry for packing and cutting layouts.',
          'Game and map design use hex grids for balanced movement spaces.',
          'Area formulas help estimate material and coating for hexagonal surfaces.',
          'Exact geometry reduces waste and improves fit in assembly work.'
        ],
        formulaMeaning: [
          {
            title: 'Why interior sum is 720 degrees',
            formula: '(n - 2) x 180 with n = 6',
            steps: [
              'A polygon can be split into triangles from one vertex.',
              'A hexagon splits into 4 triangles.',
              '4 x 180 = 720 degrees.'
            ]
          },
          {
            title: 'Why each regular interior angle is 120 degrees',
            formula: '720/6 = 120',
            steps: [
              'Regular hexagon has all interior angles equal.',
              'Total interior sum is 720 degrees.',
              'Divide by 6 angles to get 120 degrees each.'
            ]
          },
          {
            title: 'Why A = 1/2 x ap x P',
            formula: 'A = 1/2 x ap x P',
            steps: [
              'Split the regular hexagon into 6 congruent triangles from center.',
              'Each small triangle area is 1/2 x base x apothem.',
              'Sum of triangle bases is perimeter P.'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'Find perimeter',
            question: 'Regular hexagon side s = 9 cm. Find perimeter.',
            steps: [
              'Use P = 6s.',
              'P = 6 x 9.',
              'P = 54 cm.'
            ],
            answer: 'P = 54 cm'
          },
          {
            title: 'Find interior angle sum',
            question: 'Find interior angle sum of a hexagon.',
            steps: [
              'Use (n - 2) x 180 with n = 6.',
              '(6 - 2) x 180 = 4 x 180.',
              'Sum = 720 degrees.'
            ],
            answer: '720 degrees'
          },
          {
            title: 'Find area using apothem',
            question: 'Regular hexagon has side s = 8 cm and apothem ap = 6.9 cm. Find area.',
            steps: [
              'Find perimeter: P = 6 x 8 = 48 cm.',
              'Use A = 1/2 x ap x P.',
              'A = 1/2 x 6.9 x 48 = 165.6 cm^2.'
            ],
            answer: 'A = 165.6 cm^2'
          },
          {
            title: 'Central angle',
            question: 'Find central angle of a regular hexagon.',
            steps: [
              'Full turn around center is 360 degrees.',
              'There are 6 equal central angles.',
              'Central angle = 360/6 = 60 degrees.'
            ],
            answer: '60 degrees'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'Regular hexagon side is 7 cm. Find perimeter.',
            hint: 'Use P = 6s.',
            answer: 'P = 42 cm.'
          },
          {
            level: 'Easy',
            question: 'Find interior angle sum of hexagon.',
            hint: 'Use (n - 2) x 180.',
            answer: '720 degrees.'
          },
          {
            level: 'Easy',
            question: 'Each regular hexagon interior angle is?',
            hint: '720/6.',
            answer: '120 degrees.'
          },
          {
            level: 'Medium',
            question: 'If perimeter is 78 cm for a regular hexagon, find side.',
            hint: 's = P/6.',
            answer: 's = 13 cm.'
          },
          {
            level: 'Medium',
            question: 'If ap = 5 cm and P = 36 cm, find area.',
            hint: 'Use A = 1/2 x ap x P.',
            answer: 'A = 90 cm^2.'
          },
          {
            level: 'Medium',
            question: 'What is each exterior angle of regular hexagon?',
            hint: 'Exterior sum is 360 degrees.',
            answer: '60 degrees.'
          },
          {
            level: 'Hard',
            question: 'If side doubles, what happens to perimeter?',
            hint: 'Perimeter is linear in side.',
            answer: 'Perimeter doubles.'
          },
          {
            level: 'Hard',
            question: 'If both side and apothem double, how does area change?',
            hint: 'A = 1/2 x ap x P and P depends on side.',
            answer: 'Area becomes 4 times.'
          }
        ],
        practiceQa: [
          {
            question: 'How many sides does a hexagon have?',
            answer: '6 sides.'
          },
          {
            question: 'Interior angle sum of hexagon?',
            answer: '720 degrees.'
          },
          {
            question: 'Each interior angle in regular hexagon?',
            answer: '120 degrees.'
          },
          {
            question: 'Each central angle in regular hexagon?',
            answer: '60 degrees.'
          },
          {
            question: 'Perimeter formula for regular hexagon?',
            answer: 'P = 6s.'
          },
          {
            question: 'Area formula using apothem?',
            answer: 'A = 1/2 x ap x P.'
          },
          {
            question: 'If s = 4 cm, find perimeter.',
            answer: 'P = 24 cm.'
          },
          {
            question: 'If ap = 3 cm and P = 30 cm, find area.',
            answer: 'A = 45 cm^2.'
          },
          {
            question: 'Is volume applicable for hexagon?',
            answer: 'No, hexagon is a 2D shape.'
          },
          {
            question: 'Give one real-life use of hexagon equations.',
            answer: 'Used in nuts/bolts design, hex-tiling layouts, and honeycomb-style structures.'
          }
        ],
        examCorner: {
          shortcut: 'Interior angle sum = (6 - 2) x 180 = 720 degrees. Each angle in regular hexagon = 720 / 6 = 120 degrees. Think of honeycomb.',
          trap: 'Area formula A = (3 x sqrt(3) / 2) x s^2 works ONLY for regular hexagons. Do not use it if the hexagon is irregular.',
          quickMethod: 'For angle questions: 720 / 6 = 120 degrees each. For missing angle in irregular hexagon: sum of others subtracted from 720.'
        }
      }
    },
    'heptagon': {
      file: 'selective-geometry-heptagon.html',
      name: 'Heptagon',
      family: 'Polygon',
      overview: 'A heptagon is a 7-sided polygon.',
      properties: ['Interior angle sum is 900 degrees.', 'Regular heptagon has equal sides and equal angles.'],
      formulas: [
        { label: 'Interior Sum', formula: '(7 - 2) x 180 = 900', where: 'n = 7' },
        { label: 'Regular Interior Angle', formula: '900/7', where: 'about 128.57 degrees' },
        { label: 'Perimeter (regular)', formula: 'P = 7s', where: 's = side length' },
        { label: 'Area (regular)', formula: 'A = 1/2 x ap x P', where: 'ap = apothem, P = perimeter' }
      ],
      example: {
        question: 'Regular heptagon side 3 cm. Find perimeter.',
        steps: ['P = 7 x 3', 'P = 21 cm'],
        answer: 'P = 21 cm'
      },
      mistakes: ['Assuming all polygon interior angles are whole numbers.'],
      deepDive: {
        simpleIdea: 'A heptagon is a 7-sided shape. In a regular heptagon, all sides and all angles are equal.',
        diagram: {
          type: 'heptagon-labeled',
          caption: 'Regular heptagon parts: side s, apothem ap, central angle about 51.43 deg, center O, and total 7 sides.'
        },
        measurements: [
          {
            label: 'Perimeter (regular)',
            applicable: true,
            formula: 'P = 7s',
            idea: 'A regular heptagon has seven equal sides.'
          },
          {
            label: 'Area (regular)',
            applicable: true,
            formula: 'A = 1/2 x ap x P',
            idea: 'Use apothem and perimeter for regular heptagon area.'
          },
          {
            label: 'Volume',
            applicable: false,
            idea: 'Heptagon is 2D, so volume is not applicable.'
          }
        ],
        angleFacts: [
          'Interior angle sum of a heptagon is 900 degrees.',
          'Each interior angle in a regular heptagon is about 128.57 degrees.',
          'Each exterior angle in a regular heptagon is about 51.43 degrees.',
          'Each central angle in a regular heptagon is about 51.43 degrees.'
        ],
        speciality: [
          'A regular heptagon can be split into 7 equal triangles from the center.',
          'Its angle values are non-integer, which makes it a good precision-practice shape.',
          'It has rotational symmetry of order 7.'
        ],
        funFacts: [
          'The number 7 appears often in nature and design, making heptagons visually interesting.',
          'Regular heptagons are harder to construct exactly with only ruler and compass.',
          'Some logos and decorative emblems use 7-sided polygon structures.'
        ],
        realLifeUseCases: [
          'Perimeter helps estimate border material for heptagon frames and decorative trims.',
          'Area helps calculate paint or material needed for heptagon signboards and panels.',
          'Angle values are used in CAD designs when creating seven-sided parts.',
          'Game and puzzle designers use heptagon geometry for uncommon tile patterns.',
          'Craft and laser-cut work needs exact side and angle measurements to avoid fitting errors.',
          'Engineers use polygon equations for precise radial layouts and machining references.'
        ],
        formulaMeaning: [
          {
            title: 'Why interior sum is 900 degrees',
            formula: '(n - 2) x 180 with n = 7',
            steps: [
              'From one vertex, a heptagon splits into 5 triangles.',
              'Each triangle is 180 degrees.',
              'So 5 x 180 = 900 degrees.'
            ]
          },
          {
            title: 'Why each regular interior angle is about 128.57 degrees',
            formula: '900/7 about 128.57',
            steps: [
              'Regular heptagon has 7 equal interior angles.',
              'Total interior sum is 900 degrees.',
              '900 divided by 7 gives about 128.57 degrees.'
            ]
          },
          {
            title: 'Why A = 1/2 x ap x P',
            formula: 'A = 1/2 x ap x P',
            steps: [
              'Split regular heptagon into 7 triangles from the center.',
              'Each triangle area is 1/2 x base x apothem.',
              'Adding all bases gives perimeter P.'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'Find perimeter',
            question: 'Regular heptagon side s = 6 cm. Find perimeter.',
            steps: [
              'Use P = 7s.',
              'P = 7 x 6.',
              'P = 42 cm.'
            ],
            answer: 'P = 42 cm'
          },
          {
            title: 'Find interior sum',
            question: 'Find interior angle sum of a heptagon.',
            steps: [
              'Use (n - 2) x 180 with n = 7.',
              '(7 - 2) x 180 = 5 x 180.',
              'Sum = 900 degrees.'
            ],
            answer: '900 degrees'
          },
          {
            title: 'Area from apothem',
            question: 'Regular heptagon has side s = 5 cm and apothem ap = 6 cm. Find area.',
            steps: [
              'Find perimeter: P = 7 x 5 = 35 cm.',
              'Use A = 1/2 x ap x P.',
              'A = 1/2 x 6 x 35 = 105 cm^2.'
            ],
            answer: 'A = 105 cm^2'
          },
          {
            title: 'Find one regular interior angle',
            question: 'What is each interior angle of a regular heptagon?',
            steps: [
              'Total interior sum is 900 degrees.',
              'Regular heptagon has 7 equal angles.',
              'Each angle = 900/7 about 128.57 degrees.'
            ],
            answer: 'About 128.57 degrees'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'Find perimeter if regular heptagon side is 4 cm.',
            hint: 'Use P = 7s.',
            answer: 'P = 28 cm.'
          },
          {
            level: 'Easy',
            question: 'Interior angle sum of heptagon?',
            hint: 'Use (n - 2) x 180 with n = 7.',
            answer: '900 degrees.'
          },
          {
            level: 'Easy',
            question: 'Each regular heptagon exterior angle is?',
            hint: 'Use 360/7.',
            answer: 'About 51.43 degrees.'
          },
          {
            level: 'Medium',
            question: 'If perimeter is 63 cm, find side of regular heptagon.',
            hint: 's = P/7.',
            answer: 's = 9 cm.'
          },
          {
            level: 'Medium',
            question: 'If ap = 8 cm and P = 49 cm, find area.',
            hint: 'Use A = 1/2 x ap x P.',
            answer: 'A = 196 cm^2.'
          },
          {
            level: 'Medium',
            question: 'Find each interior angle of a regular heptagon.',
            hint: 'Use 900/7.',
            answer: 'About 128.57 degrees.'
          },
          {
            level: 'Hard',
            question: 'If side doubles, how does perimeter change?',
            hint: 'Perimeter is linear in side.',
            answer: 'Perimeter doubles.'
          },
          {
            level: 'Hard',
            question: 'If both apothem and side double, how does area change?',
            hint: 'A = 1/2 x ap x P and P depends on side.',
            answer: 'Area becomes 4 times.'
          }
        ],
        practiceQa: [
          {
            question: 'How many sides does a heptagon have?',
            answer: '7 sides.'
          },
          {
            question: 'Interior angle sum of heptagon?',
            answer: '900 degrees.'
          },
          {
            question: 'Each interior angle in regular heptagon?',
            answer: 'About 128.57 degrees.'
          },
          {
            question: 'Each exterior angle in regular heptagon?',
            answer: 'About 51.43 degrees.'
          },
          {
            question: 'Perimeter formula for regular heptagon?',
            answer: 'P = 7s.'
          },
          {
            question: 'Area formula using apothem and perimeter?',
            answer: 'A = 1/2 x ap x P.'
          },
          {
            question: 'If s = 8 cm, find perimeter.',
            answer: 'P = 56 cm.'
          },
          {
            question: 'If ap = 5 cm and P = 35 cm, find area.',
            answer: 'A = 87.5 cm^2.'
          },
          {
            question: 'Is volume applicable for heptagon?',
            answer: 'No, heptagon is a 2D shape.'
          },
          {
            question: 'Give one real-life use of heptagon equations.',
            answer: 'Used in decorative panel design and precise polygon cutting.'
          }
        ],
        examCorner: {
          shortcut: 'Interior angle sum = (7 - 2) x 180 = 900 degrees. Each angle in regular heptagon = 900 / 7 = approximately 128.57 degrees.',
          trap: 'Heptagon (7 sides) is rarely tested directly but angle sum questions do appear. The formula (n-2) x 180 is the one to remember.',
          quickMethod: '(7 - 2) x 180 = 5 x 180 = 900 degrees total. For each angle in regular: divide 900 by 7.'
        }
      }
    },
    'octagon': {
      file: 'selective-geometry-octagon.html',
      name: 'Octagon',
      family: 'Polygon',
      overview: 'An octagon is an 8-sided polygon.',
      properties: ['Interior angle sum is 1080 degrees.', 'Regular octagon has each interior angle 135 degrees.'],
      formulas: [
        { label: 'Interior Sum', formula: '(8 - 2) x 180 = 1080', where: 'n = 8' },
        { label: 'Regular Interior Angle', formula: '1080/8 = 135', where: 'regular octagon' },
        { label: 'Perimeter (regular)', formula: 'P = 8s', where: 's = side length' },
        { label: 'Area (regular)', formula: 'A = 1/2 x ap x P', where: 'ap = apothem, P = perimeter' }
      ],
      example: {
        question: 'Regular octagon side 4 cm. Find perimeter.',
        steps: ['P = 8 x 4', 'P = 32 cm'],
        answer: 'P = 32 cm'
      },
      mistakes: ['Confusing interior angle with exterior angle.'],
      deepDive: {
        simpleIdea: 'An octagon is an 8-sided shape. In a regular octagon, all sides and all angles are equal.',
        diagram: {
          type: 'octagon-labeled',
          caption: 'Regular octagon parts: side s, apothem ap, central angle 45 deg, center O, and total 8 sides.'
        },
        measurements: [
          {
            label: 'Perimeter (regular)',
            applicable: true,
            formula: 'P = 8s',
            idea: 'A regular octagon has eight equal sides.'
          },
          {
            label: 'Area (regular)',
            applicable: true,
            formula: 'A = 1/2 x ap x P',
            idea: 'Use apothem and perimeter for regular octagon area.'
          },
          {
            label: 'Volume',
            applicable: false,
            idea: 'Octagon is 2D, so volume is not applicable.'
          }
        ],
        angleFacts: [
          'Interior angle sum of an octagon is 1080 degrees.',
          'Each interior angle of a regular octagon is 135 degrees.',
          'Each exterior angle of a regular octagon is 45 degrees.',
          'Each central angle of a regular octagon is 45 degrees.'
        ],
        speciality: [
          'Regular octagon can be split into 8 equal triangles from center.',
          'Stop signs are octagonal for high visual recognition.',
          'Symmetry of regular octagon helps in balanced design layouts.'
        ],
        funFacts: [
          'The classic STOP traffic sign is an octagon.',
          'Some temple and dome floor plans use octagonal rings.',
          'In games and tokens, octagons are used as a strong visual shape.'
        ],
        realLifeUseCases: [
          'Traffic sign manufacturing uses octagon perimeter for border strip length.',
          'Area helps estimate paint or reflective film for stop signs and panels.',
          'Architects use octagonal layouts for gazebos and plaza designs.',
          'Designers use octagon geometry for logo frames and badge shapes.',
          'Fabricators use angle facts to cut octagon edges accurately.',
          'Exact geometry avoids fitting gaps and material wastage.'
        ],
        formulaMeaning: [
          {
            title: 'Why interior sum is 1080 degrees',
            formula: '(n - 2) x 180 with n = 8',
            steps: [
              'From one vertex, octagon can be split into 6 triangles.',
              'Each triangle has 180 degrees.',
              'So 6 x 180 = 1080 degrees.'
            ]
          },
          {
            title: 'Why each regular interior angle is 135 degrees',
            formula: '1080/8 = 135',
            steps: [
              'Regular octagon has 8 equal interior angles.',
              'Total is 1080 degrees.',
              '1080 divided by 8 equals 135 degrees.'
            ]
          },
          {
            title: 'Why A = 1/2 x ap x P',
            formula: 'A = 1/2 x ap x P',
            steps: [
              'Split regular octagon into 8 congruent triangles from center.',
              'Each triangle area is 1/2 x base x apothem.',
              'All triangle bases together make perimeter P.'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'Find perimeter',
            question: 'Regular octagon side s = 6 cm. Find perimeter.',
            steps: [
              'Use P = 8s.',
              'P = 8 x 6.',
              'P = 48 cm.'
            ],
            answer: 'P = 48 cm'
          },
          {
            title: 'Interior angle sum',
            question: 'Find interior angle sum of an octagon.',
            steps: [
              'Use (n - 2) x 180 with n = 8.',
              '(8 - 2) x 180 = 6 x 180.',
              'Sum = 1080 degrees.'
            ],
            answer: '1080 degrees'
          },
          {
            title: 'Area using apothem',
            question: 'Regular octagon has side s = 5 cm and apothem ap = 6 cm. Find area.',
            steps: [
              'Find perimeter: P = 8 x 5 = 40 cm.',
              'Use A = 1/2 x ap x P.',
              'A = 1/2 x 6 x 40 = 120 cm^2.'
            ],
            answer: 'A = 120 cm^2'
          },
          {
            title: 'Find one interior angle',
            question: 'What is each interior angle in a regular octagon?',
            steps: [
              'Total interior sum is 1080 degrees.',
              'Regular octagon has 8 equal angles.',
              'Each angle = 1080/8 = 135 degrees.'
            ],
            answer: '135 degrees'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'Find perimeter of regular octagon if side is 7 cm.',
            hint: 'Use P = 8s.',
            answer: 'P = 56 cm.'
          },
          {
            level: 'Easy',
            question: 'What is interior angle sum of octagon?',
            hint: 'Use (n - 2) x 180 with n = 8.',
            answer: '1080 degrees.'
          },
          {
            level: 'Easy',
            question: 'Each regular octagon interior angle is?',
            hint: 'Divide 1080 by 8.',
            answer: '135 degrees.'
          },
          {
            level: 'Medium',
            question: 'If perimeter is 64 cm, find side length of regular octagon.',
            hint: 's = P/8.',
            answer: 's = 8 cm.'
          },
          {
            level: 'Medium',
            question: 'If ap = 4.5 cm and P = 40 cm, find area.',
            hint: 'Use A = 1/2 x ap x P.',
            answer: 'A = 90 cm^2.'
          },
          {
            level: 'Medium',
            question: 'Find each exterior angle of regular octagon.',
            hint: 'Exterior sum is 360 degrees.',
            answer: '45 degrees.'
          },
          {
            level: 'Hard',
            question: 'If side doubles, what happens to perimeter?',
            hint: 'Perimeter is linear in side length.',
            answer: 'Perimeter doubles.'
          },
          {
            level: 'Hard',
            question: 'If both apothem and side double, how does area change?',
            hint: 'A = 1/2 x ap x P and P depends on side.',
            answer: 'Area becomes 4 times.'
          }
        ],
        practiceQa: [
          {
            question: 'How many sides in an octagon?',
            answer: '8 sides.'
          },
          {
            question: 'Interior angle sum of octagon?',
            answer: '1080 degrees.'
          },
          {
            question: 'Each regular interior angle?',
            answer: '135 degrees.'
          },
          {
            question: 'Each regular exterior angle?',
            answer: '45 degrees.'
          },
          {
            question: 'Perimeter formula for regular octagon?',
            answer: 'P = 8s.'
          },
          {
            question: 'Area formula (regular, using apothem)?',
            answer: 'A = 1/2 x ap x P.'
          },
          {
            question: 'If s = 10 cm, find perimeter.',
            answer: 'P = 80 cm.'
          },
          {
            question: 'If ap = 7 cm and P = 56 cm, find area.',
            answer: 'A = 196 cm^2.'
          },
          {
            question: 'Is volume applicable for octagon?',
            answer: 'No, octagon is a 2D shape.'
          },
          {
            question: 'Give one real-life use of octagon equations.',
            answer: 'Used in traffic sign design, panel cutting, and octagonal floor layouts.'
          }
        ],
        examCorner: {
          shortcut: 'Interior angle sum = (8 - 2) x 180 = 1080 degrees. Each angle in regular octagon = 1080 / 8 = 135 degrees. Think stop sign.',
          trap: 'Exterior angle of regular octagon = 360 / 8 = 45 degrees. Interior + exterior = 180 degrees. Exam often asks for exterior — do not give interior.',
          quickMethod: '(8 - 2) x 180 = 1080. Divide by 8 for regular interior angle = 135. Exterior = 180 - 135 = 45.'
        }
      }
    },
    'nonagon': {
      file: 'selective-geometry-nonagon.html',
      name: 'Nonagon',
      family: 'Polygon',
      overview: 'A nonagon is a 9-sided polygon.',
      properties: ['Interior angle sum is 1260 degrees.', 'Regular nonagon has each interior angle 140 degrees.'],
      formulas: [
        { label: 'Interior Sum', formula: '(9 - 2) x 180 = 1260', where: 'n = 9' },
        { label: 'Regular Interior Angle', formula: '1260/9 = 140', where: 'regular nonagon' },
        { label: 'Perimeter (regular)', formula: 'P = 9s', where: 's = side length' },
        { label: 'Area (regular)', formula: 'A = 1/2 x ap x P', where: 'ap = apothem, P = perimeter' }
      ],
      example: {
        question: 'Regular nonagon side 2 cm. Find perimeter.',
        steps: ['P = 9 x 2', 'P = 18 cm'],
        answer: 'P = 18 cm'
      },
      mistakes: ['Counting sides incorrectly in diagrams.'],
      deepDive: {
        simpleIdea: 'A nonagon is a 9-sided shape. In a regular nonagon, all sides and all angles are equal.',
        diagram: {
          type: 'nonagon-labeled',
          caption: 'Regular nonagon parts: side s, apothem ap, central angle 40 deg, center O, and total 9 sides.'
        },
        measurements: [
          {
            label: 'Perimeter (regular)',
            applicable: true,
            formula: 'P = 9s',
            idea: 'A regular nonagon has nine equal sides.'
          },
          {
            label: 'Area (regular)',
            applicable: true,
            formula: 'A = 1/2 x ap x P',
            idea: 'Use apothem and perimeter for regular nonagon area.'
          },
          {
            label: 'Volume',
            applicable: false,
            idea: 'Nonagon is 2D, so volume is not applicable.'
          }
        ],
        angleFacts: [
          'Interior angle sum of a nonagon is 1260 degrees.',
          'Each interior angle in a regular nonagon is 140 degrees.',
          'Each exterior angle in a regular nonagon is 40 degrees.',
          'Each central angle in a regular nonagon is 40 degrees.'
        ],
        speciality: [
          'A regular nonagon can be split into 9 triangles from the center.',
          'Nonagons are less common than hexagons or octagons in daily objects.',
          'Their higher side count makes them look closer to a circle.'
        ],
        funFacts: [
          'Some decorative coin and badge designs use nonagon outlines.',
          'As side count increases, regular polygons look more circular.',
          'Nonagon patterns are used in advanced geometric art.'
        ],
        realLifeUseCases: [
          'Designers use nonagon perimeter to estimate border strips for badges and emblems.',
          'Area helps calculate material needed for nonagon-shaped panels or craft pieces.',
          'Polygon angle formulas are used in CAD when designing custom parts.',
          'Geometry teachers use nonagons to teach interior/exterior angle rules.',
          'Architectural ornamentation sometimes includes nine-sided motifs.',
          'Using exact values avoids scaling and fitting mistakes.'
        ],
        formulaMeaning: [
          {
            title: 'Why interior sum is 1260 degrees',
            formula: '(n - 2) x 180 with n = 9',
            steps: [
              'From one vertex, a nonagon splits into 7 triangles.',
              'Each triangle is 180 degrees.',
              'So 7 x 180 = 1260 degrees.'
            ]
          },
          {
            title: 'Why each regular interior angle is 140 degrees',
            formula: '1260/9 = 140',
            steps: [
              'Regular nonagon has 9 equal interior angles.',
              'Total interior sum is 1260 degrees.',
              '1260 divided by 9 equals 140 degrees.'
            ]
          },
          {
            title: 'Why A = 1/2 x ap x P',
            formula: 'A = 1/2 x ap x P',
            steps: [
              'Divide the regular nonagon into 9 congruent triangles from center.',
              'Each triangle area is 1/2 x base x apothem.',
              'Adding all bases gives the perimeter P.'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'Find perimeter',
            question: 'Regular nonagon side s = 4 cm. Find perimeter.',
            steps: [
              'Use P = 9s.',
              'P = 9 x 4.',
              'P = 36 cm.'
            ],
            answer: 'P = 36 cm'
          },
          {
            title: 'Find interior sum',
            question: 'Find interior angle sum of a nonagon.',
            steps: [
              'Use (n - 2) x 180 with n = 9.',
              '(9 - 2) x 180 = 7 x 180.',
              'Sum = 1260 degrees.'
            ],
            answer: '1260 degrees'
          },
          {
            title: 'Area from apothem',
            question: 'Regular nonagon has side s = 6 cm and apothem ap = 8 cm. Find area.',
            steps: [
              'Find perimeter: P = 9 x 6 = 54 cm.',
              'Use A = 1/2 x ap x P.',
              'A = 1/2 x 8 x 54 = 216 cm^2.'
            ],
            answer: 'A = 216 cm^2'
          },
          {
            title: 'Find one regular interior angle',
            question: 'What is each interior angle of a regular nonagon?',
            steps: [
              'Total interior sum is 1260 degrees.',
              'Regular nonagon has 9 equal angles.',
              'Each angle = 1260/9 = 140 degrees.'
            ],
            answer: '140 degrees'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'Find perimeter if regular nonagon side is 5 cm.',
            hint: 'Use P = 9s.',
            answer: 'P = 45 cm.'
          },
          {
            level: 'Easy',
            question: 'Interior angle sum of nonagon?',
            hint: 'Use (n - 2) x 180 with n = 9.',
            answer: '1260 degrees.'
          },
          {
            level: 'Easy',
            question: 'Each regular nonagon interior angle is?',
            hint: '1260 divided by 9.',
            answer: '140 degrees.'
          },
          {
            level: 'Medium',
            question: 'If perimeter is 81 cm, find side of regular nonagon.',
            hint: 's = P/9.',
            answer: 's = 9 cm.'
          },
          {
            level: 'Medium',
            question: 'If ap = 7 cm and P = 63 cm, find area.',
            hint: 'Use A = 1/2 x ap x P.',
            answer: 'A = 220.5 cm^2.'
          },
          {
            level: 'Medium',
            question: 'Find each exterior angle of regular nonagon.',
            hint: 'Exterior sum is 360 degrees.',
            answer: '40 degrees.'
          },
          {
            level: 'Hard',
            question: 'If side doubles, how does perimeter change?',
            hint: 'Perimeter is linear in side.',
            answer: 'Perimeter doubles.'
          },
          {
            level: 'Hard',
            question: 'If both apothem and side double, how does area change?',
            hint: 'A = 1/2 x ap x P and P depends on side.',
            answer: 'Area becomes 4 times.'
          }
        ],
        practiceQa: [
          {
            question: 'How many sides does a nonagon have?',
            answer: '9 sides.'
          },
          {
            question: 'Interior angle sum of nonagon?',
            answer: '1260 degrees.'
          },
          {
            question: 'Each interior angle in regular nonagon?',
            answer: '140 degrees.'
          },
          {
            question: 'Each exterior angle in regular nonagon?',
            answer: '40 degrees.'
          },
          {
            question: 'Perimeter formula for regular nonagon?',
            answer: 'P = 9s.'
          },
          {
            question: 'Area formula using apothem and perimeter?',
            answer: 'A = 1/2 x ap x P.'
          },
          {
            question: 'If s = 3 cm, find perimeter.',
            answer: 'P = 27 cm.'
          },
          {
            question: 'If ap = 6 cm and P = 45 cm, find area.',
            answer: 'A = 135 cm^2.'
          },
          {
            question: 'Is volume applicable for nonagon?',
            answer: 'No, nonagon is a 2D shape.'
          },
          {
            question: 'Give one real-life use of nonagon equations.',
            answer: 'Used in decorative design layouts and custom polygon panel measurements.'
          }
        ],
        examCorner: {
          shortcut: 'Interior angle sum = (9 - 2) x 180 = 1260 degrees. Each angle in regular nonagon = 1260 / 9 = 140 degrees.',
          trap: 'Nonagon (9 sides) is uncommon in day-to-day life so it can cause hesitation. Rely on (n-2) x 180 with n = 9 rather than memorizing the sum.',
          quickMethod: '(9 - 2) x 180 = 7 x 180 = 1260. For each regular angle: 1260 / 9 = 140 degrees.'
        }
      }
    },
    'decagon': {
      file: 'selective-geometry-decagon.html',
      name: 'Decagon',
      family: 'Polygon',
      overview: 'A decagon is a 10-sided polygon.',
      properties: ['Interior angle sum is 1440 degrees.', 'Regular decagon has each interior angle 144 degrees.'],
      formulas: [
        { label: 'Interior Sum', formula: '(10 - 2) x 180 = 1440', where: 'n = 10' },
        { label: 'Regular Interior Angle', formula: '1440/10 = 144', where: 'regular decagon' },
        { label: 'Perimeter (regular)', formula: 'P = 10s', where: 's = side length' },
        { label: 'Area (regular)', formula: 'A = 1/2 x ap x P', where: 'ap = apothem, P = perimeter' }
      ],
      example: {
        question: 'Regular decagon side 6 cm. Find perimeter.',
        steps: ['P = 10 x 6', 'P = 60 cm'],
        answer: 'P = 60 cm'
      },
      mistakes: ['Using n x 180 for interior sum.'],
      deepDive: {
        simpleIdea: 'A decagon is a 10-sided shape. In a regular decagon, all sides and all angles are equal.',
        diagram: {
          type: 'decagon-labeled',
          caption: 'Regular decagon parts: side s, apothem ap, central angle 36 deg, center O, and total 10 sides.'
        },
        measurements: [
          {
            label: 'Perimeter (regular)',
            applicable: true,
            formula: 'P = 10s',
            idea: 'A regular decagon has ten equal sides.'
          },
          {
            label: 'Area (regular)',
            applicable: true,
            formula: 'A = 1/2 x ap x P',
            idea: 'Use apothem and perimeter for regular decagon area.'
          },
          {
            label: 'Volume',
            applicable: false,
            idea: 'Decagon is 2D, so volume is not applicable.'
          }
        ],
        angleFacts: [
          'Interior angle sum of a decagon is 1440 degrees.',
          'Each interior angle in a regular decagon is 144 degrees.',
          'Each exterior angle in a regular decagon is 36 degrees.',
          'Each central angle in a regular decagon is 36 degrees.'
        ],
        speciality: [
          'A regular decagon can be split into 10 equal triangles from the center.',
          'Its many sides make it look close to a circle.',
          'It is useful in radial and symmetric designs.'
        ],
        funFacts: [
          'The 10-sided shape appears in decorative tiles and logo patterns.',
          'Some coins and tokens use decagon-like borders for visual uniqueness.',
          'Decagon geometry is linked to pentagon and golden-ratio constructions.'
        ],
        realLifeUseCases: [
          'Perimeter helps estimate edge banding or frame length for decagon tables and panels.',
          'Area helps calculate paint, print, or material needed for decagon plates and signs.',
          'Angle values are used in CAD drawings to place equal edges accurately.',
          'Architecture and interior design use decagon layouts for patterned floors and ceiling motifs.',
          'Craft projects use these formulas to avoid trial-and-error cutting.',
          'Engineering drawings use exact polygon geometry to reduce fitting errors.'
        ],
        formulaMeaning: [
          {
            title: 'Why interior sum is 1440 degrees',
            formula: '(n - 2) x 180 with n = 10',
            steps: [
              'From one vertex, a decagon splits into 8 triangles.',
              'Each triangle is 180 degrees.',
              'So 8 x 180 = 1440 degrees.'
            ]
          },
          {
            title: 'Why each regular interior angle is 144 degrees',
            formula: '1440/10 = 144',
            steps: [
              'Regular decagon has 10 equal interior angles.',
              'Total interior sum is 1440 degrees.',
              '1440 divided by 10 equals 144 degrees.'
            ]
          },
          {
            title: 'Why A = 1/2 x ap x P',
            formula: 'A = 1/2 x ap x P',
            steps: [
              'Divide the regular decagon into 10 equal triangles from center.',
              'Each triangle area is 1/2 x base x apothem.',
              'Adding all bases gives perimeter P.'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'Find perimeter',
            question: 'Regular decagon side s = 5 cm. Find perimeter.',
            steps: [
              'Use P = 10s.',
              'P = 10 x 5.',
              'P = 50 cm.'
            ],
            answer: 'P = 50 cm'
          },
          {
            title: 'Find interior sum',
            question: 'Find interior angle sum of a decagon.',
            steps: [
              'Use (n - 2) x 180 with n = 10.',
              '(10 - 2) x 180 = 8 x 180.',
              'Sum = 1440 degrees.'
            ],
            answer: '1440 degrees'
          },
          {
            title: 'Area from apothem',
            question: 'Regular decagon has side s = 4 cm and apothem ap = 6 cm. Find area.',
            steps: [
              'Find perimeter: P = 10 x 4 = 40 cm.',
              'Use A = 1/2 x ap x P.',
              'A = 1/2 x 6 x 40 = 120 cm^2.'
            ],
            answer: 'A = 120 cm^2'
          },
          {
            title: 'Find one regular interior angle',
            question: 'What is each interior angle of a regular decagon?',
            steps: [
              'Total interior sum is 1440 degrees.',
              'Regular decagon has 10 equal angles.',
              'Each angle = 1440/10 = 144 degrees.'
            ],
            answer: '144 degrees'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'Find perimeter if regular decagon side is 7 cm.',
            hint: 'Use P = 10s.',
            answer: 'P = 70 cm.'
          },
          {
            level: 'Easy',
            question: 'Interior angle sum of decagon?',
            hint: 'Use (n - 2) x 180 with n = 10.',
            answer: '1440 degrees.'
          },
          {
            level: 'Easy',
            question: 'Each regular decagon interior angle is?',
            hint: '1440 divided by 10.',
            answer: '144 degrees.'
          },
          {
            level: 'Medium',
            question: 'If perimeter is 90 cm, find side of regular decagon.',
            hint: 's = P/10.',
            answer: 's = 9 cm.'
          },
          {
            level: 'Medium',
            question: 'If ap = 8 cm and P = 60 cm, find area.',
            hint: 'Use A = 1/2 x ap x P.',
            answer: 'A = 240 cm^2.'
          },
          {
            level: 'Medium',
            question: 'Find each exterior angle of regular decagon.',
            hint: 'Exterior sum is 360 degrees.',
            answer: '36 degrees.'
          },
          {
            level: 'Hard',
            question: 'If side doubles, how does perimeter change?',
            hint: 'Perimeter is linear in side.',
            answer: 'Perimeter doubles.'
          },
          {
            level: 'Hard',
            question: 'If both apothem and side double, how does area change?',
            hint: 'A = 1/2 x ap x P and P depends on side.',
            answer: 'Area becomes 4 times.'
          }
        ],
        practiceQa: [
          {
            question: 'How many sides does a decagon have?',
            answer: '10 sides.'
          },
          {
            question: 'Interior angle sum of decagon?',
            answer: '1440 degrees.'
          },
          {
            question: 'Each interior angle in regular decagon?',
            answer: '144 degrees.'
          },
          {
            question: 'Each exterior angle in regular decagon?',
            answer: '36 degrees.'
          },
          {
            question: 'Perimeter formula for regular decagon?',
            answer: 'P = 10s.'
          },
          {
            question: 'Area formula using apothem and perimeter?',
            answer: 'A = 1/2 x ap x P.'
          },
          {
            question: 'If s = 8 cm, find perimeter.',
            answer: 'P = 80 cm.'
          },
          {
            question: 'If ap = 5 cm and P = 40 cm, find area.',
            answer: 'A = 100 cm^2.'
          },
          {
            question: 'Is volume applicable for decagon?',
            answer: 'No, decagon is a 2D shape.'
          },
          {
            question: 'Give one real-life use of decagon equations.',
            answer: 'Used for panel design, flooring patterns, and accurate polygon cutting.'
          }
        ],
        examCorner: {
          shortcut: 'Interior angle sum = (10 - 2) x 180 = 1440 degrees. Each angle in regular decagon = 1440 / 10 = 144 degrees.',
          trap: 'Decagon (10 sides) could be confused with decagram. Confirm the shape is closed with 10 straight sides before applying formulas.',
          quickMethod: '(10 - 2) x 180 = 8 x 180 = 1440. Divide by 10 for each regular interior angle = 144.'
        }
      }
    },
    'cube': {
      file: 'selective-geometry-cube.html',
      name: 'Cube',
      family: '3D Shape',
      overview: 'A cube has 6 equal square faces.',
      properties: ['12 equal edges.', '8 vertices.', 'All angles are right angles.'],
      formulas: [
        { label: 'Surface Area', formula: 'SA = 6a^2', where: 'a = edge length' },
        { label: 'Volume', formula: 'V = a^3', where: 'a = edge length' },
        { label: 'Face Diagonal', formula: 'd_f = a x sqrt(2)', where: 'diagonal on one square face' },
        { label: 'Space Diagonal', formula: 'D = a x sqrt(3)', where: 'corner to opposite corner through interior' },
        { label: 'Total Edge Length', formula: 'E_total = 12a', where: 'sum of all 12 edges' }
      ],
      example: {
        question: 'If a = 3 cm, find surface area and volume.',
        steps: ['SA = 6 x 3^2 = 54 cm^2', 'V = 3^3 = 27 cm^3'],
        answer: 'SA = 54 cm^2, V = 27 cm^3'
      },
      mistakes: ['Mixing square units and cubic units.'],
      deepDive: {
        simpleIdea: 'A cube is a 3D box where all edges are equal. Think of a dice or a Rubik cube.',
        diagram: {
          type: 'cube-labeled',
          caption: 'Cube parts: edge a, face diagonal d_f, space diagonal D, one vertex, and center O.'
        },
        measurements: [
          {
            label: 'Surface Area',
            applicable: true,
            formula: 'SA = 6a^2',
            idea: 'A cube has 6 square faces, each of area a^2.'
          },
          {
            label: 'Volume',
            applicable: true,
            formula: 'V = a^3',
            idea: 'Volume is length x width x height, and all are a.'
          },
          {
            label: 'Perimeter',
            applicable: false,
            idea: 'Perimeter is mainly for 2D shapes. For cubes, we use edge length, area, or volume.'
          },
          {
            label: 'Total Edge Length',
            applicable: true,
            formula: 'E_total = 12a',
            idea: 'A cube has 12 equal edges.'
          }
        ],
        angleFacts: [
          'Every face angle in a cube is 90 degrees.',
          'Each face is a square.',
          'At each vertex, three edges meet and are mutually perpendicular.',
          'A cube has no curved surface.'
        ],
        speciality: [
          'All faces are congruent squares.',
          'All 12 edges are equal.',
          'A cube is a special case of a cuboid where l = w = h.'
        ],
        funFacts: [
          'Standard dice are cubes because equal faces make rolling fair.',
          'A Rubik cube is built from cube geometry.',
          'Many storage boxes and shipping cartons use near-cube designs.'
        ],
        realLifeUseCases: [
          'Volume tells how much liquid or material a cube-shaped container can hold.',
          'Surface area helps estimate paint, wrapping paper, or sticker material needed.',
          'Total edge length helps estimate frame rod or edge-protector requirements.',
          'Packaging design uses these formulas to optimize space and material cost.',
          'Game design and 3D modeling use cube diagonals for camera and lighting calculations.',
          'Civil and interior projects use cubic volume for concrete blocks and storage planning.'
        ],
        formulaMeaning: [
          {
            title: 'Why SA = 6a^2',
            formula: 'SA = 6a^2',
            steps: [
              'Each face is a square of area a^2.',
              'Cube has 6 faces.',
              'So total surface area is 6 x a^2.'
            ]
          },
          {
            title: 'Why V = a^3',
            formula: 'V = a^3',
            steps: [
              'Volume is length x width x height.',
              'For cube, all three are a.',
              'So V = a x a x a = a^3.'
            ]
          },
          {
            title: 'Why D = a x sqrt(3)',
            formula: 'D = a x sqrt(3)',
            steps: [
              'First find face diagonal: d_f = a x sqrt(2).',
              'Use 3D Pythagoras with d_f and another edge a.',
              'D^2 = (a x sqrt(2))^2 + a^2 = 2a^2 + a^2 = 3a^2, so D = a x sqrt(3).'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'Surface area and volume',
            question: 'If edge a = 4 cm, find surface area and volume.',
            steps: [
              'SA = 6a^2 = 6 x 4^2 = 6 x 16 = 96 cm^2.',
              'V = a^3 = 4^3 = 64 cm^3.'
            ],
            answer: 'SA = 96 cm^2, V = 64 cm^3'
          },
          {
            title: 'Find edge from volume',
            question: 'A cube has volume 125 cm^3. Find edge length.',
            steps: [
              'Use V = a^3.',
              'a^3 = 125.',
              'a = 5 cm.'
            ],
            answer: 'a = 5 cm'
          },
          {
            title: 'Find space diagonal',
            question: 'If edge a = 6 cm, find space diagonal D.',
            steps: [
              'Use D = a x sqrt(3).',
              'D = 6 x sqrt(3) cm.',
              'Approximate value: D about 10.39 cm.'
            ],
            answer: 'D = 6 x sqrt(3) cm (about 10.39 cm)'
          },
          {
            title: 'Find total edge length',
            question: 'If edge a = 2.5 cm, find total edge length.',
            steps: [
              'Use E_total = 12a.',
              'E_total = 12 x 2.5.',
              'E_total = 30 cm.'
            ],
            answer: '30 cm'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'Find surface area if a = 3 cm.',
            hint: 'Use SA = 6a^2.',
            answer: '54 cm^2.'
          },
          {
            level: 'Easy',
            question: 'Find volume if a = 7 cm.',
            hint: 'Use V = a^3.',
            answer: '343 cm^3.'
          },
          {
            level: 'Easy',
            question: 'Find total edge length if a = 4 cm.',
            hint: 'Use E_total = 12a.',
            answer: '48 cm.'
          },
          {
            level: 'Medium',
            question: 'A cube has SA = 150 cm^2. Find edge a.',
            hint: '6a^2 = 150.',
            answer: 'a = 5 cm.'
          },
          {
            level: 'Medium',
            question: 'If a = 8 cm, find face diagonal d_f.',
            hint: 'Use d_f = a x sqrt(2).',
            answer: 'd_f = 8 x sqrt(2) cm (about 11.31 cm).'
          },
          {
            level: 'Medium',
            question: 'If a = 8 cm, find space diagonal D.',
            hint: 'Use D = a x sqrt(3).',
            answer: 'D = 8 x sqrt(3) cm (about 13.86 cm).'
          },
          {
            level: 'Hard',
            question: 'If edge doubles, how does surface area change?',
            hint: 'Area depends on a^2.',
            answer: 'Surface area becomes 4 times.'
          },
          {
            level: 'Hard',
            question: 'If edge doubles, how does volume change?',
            hint: 'Volume depends on a^3.',
            answer: 'Volume becomes 8 times.'
          }
        ],
        practiceQa: [
          {
            question: 'How many faces does a cube have?',
            answer: '6 square faces.'
          },
          {
            question: 'How many edges does a cube have?',
            answer: '12 edges.'
          },
          {
            question: 'How many vertices does a cube have?',
            answer: '8 vertices.'
          },
          {
            question: 'Surface area formula of cube?',
            answer: 'SA = 6a^2.'
          },
          {
            question: 'Volume formula of cube?',
            answer: 'V = a^3.'
          },
          {
            question: 'Face diagonal formula?',
            answer: 'd_f = a x sqrt(2).'
          },
          {
            question: 'Space diagonal formula?',
            answer: 'D = a x sqrt(3).'
          },
          {
            question: 'If a = 2 cm, find SA.',
            answer: 'SA = 24 cm^2.'
          },
          {
            question: 'If a = 2 cm, find V.',
            answer: 'V = 8 cm^3.'
          },
          {
            question: 'Why are cube equations used in real life?',
            answer: 'To calculate capacity, material usage, and structural dimensions accurately.'
          }
        ],
        examCorner: {
          shortcut: 'SA = 6a^2 (6 square faces). V = a^3 (three equal dimensions). Power tells you the dimension: 2 for surface, 3 for volume.',
          trap: 'Mixing squared units (cm^2) for surface area with cubic units (cm^3) for volume. Always write the unit right after the value.',
          quickMethod: 'Write SA = 6a^2 and V = a^3 side by side. Substitute the same a value into both if both are asked.'
        }
      }
    },
    'cuboid': {
      file: 'selective-geometry-cuboid.html',
      name: 'Rectangular Prism (Cuboid)',
      family: '3D Shape',
      overview: 'A cuboid has 6 rectangular faces.',
      properties: ['Opposite faces are equal.', '12 edges and 8 vertices.', 'All angles are right angles.'],
      formulas: [
        { label: 'Surface Area', formula: 'SA = 2(lw + lh + wh)', where: 'l,w,h dimensions' },
        { label: 'Volume', formula: 'V = lwh', where: 'l,w,h dimensions' },
        { label: 'Space Diagonal', formula: 'D = sqrt(l^2 + w^2 + h^2)', where: '3D Pythagoras' },
        { label: 'Total Edge Length', formula: 'E_total = 4(l + w + h)', where: 'sum of all 12 edges' }
      ],
      example: {
        question: 'l=5, w=3, h=2. Find volume.',
        steps: ['V = 5 x 3 x 2', 'V = 30 cm^3'],
        answer: 'V = 30 cm^3'
      },
      mistakes: ['Using 2D area formula for 3D volume.'],
      deepDive: {
        simpleIdea: 'A cuboid is a 3D box with length, width, and height. Most rooms, books, and cartons are close to cuboids.',
        diagram: {
          type: 'cuboid-labeled',
          caption: 'Cuboid parts: length l, width w, height h, space diagonal D, one vertex, and center O.'
        },
        measurements: [
          {
            label: 'Surface Area',
            applicable: true,
            formula: 'SA = 2(lw + lh + wh)',
            idea: 'Add areas of all three face pairs and multiply by 2.'
          },
          {
            label: 'Volume',
            applicable: true,
            formula: 'V = lwh',
            idea: 'Volume is length x width x height.'
          },
          {
            label: 'Perimeter',
            applicable: false,
            idea: 'Perimeter is mostly a 2D idea. For cuboid, use edge total, area, or volume.'
          },
          {
            label: 'Total Edge Length',
            applicable: true,
            formula: 'E_total = 4(l + w + h)',
            idea: 'Each dimension appears on 4 edges.'
          }
        ],
        angleFacts: [
          'All face angles in a cuboid are 90 degrees.',
          'Each face is a rectangle.',
          'Three edges meet at each vertex.',
          'A cuboid has no curved surfaces.'
        ],
        speciality: [
          'Opposite faces are equal and parallel.',
          'A cube is a special cuboid where l = w = h.',
          'It is one of the most useful shapes in measurement and packaging.'
        ],
        funFacts: [
          'Shipping boxes are designed as cuboids for easy stacking.',
          'Many school objects like erasers and books are cuboid-shaped.',
          'Room volume calculations use cuboid formulas as a base.'
        ],
        realLifeUseCases: [
          'Volume is used to find storage capacity of tanks, boxes, and rooms.',
          'Surface area helps estimate paint, wrapping, and material requirements.',
          'Total edge length helps estimate frame strips or protective edge covers.',
          'Warehouse planning uses cuboid volume for packing and stacking efficiency.',
          'Construction uses cuboid measurements for bricks, beams, and slabs.',
          'Interior planning uses room cuboid dimensions for ventilation and cooling estimates.'
        ],
        formulaMeaning: [
          {
            title: 'Why SA = 2(lw + lh + wh)',
            formula: 'SA = 2(lw + lh + wh)',
            steps: [
              'A cuboid has 3 types of rectangular faces: lw, lh, and wh.',
              'Each type appears twice as opposite faces.',
              'So total area is 2(lw + lh + wh).'
            ]
          },
          {
            title: 'Why V = lwh',
            formula: 'V = lwh',
            steps: [
              'Volume is the space inside a 3D object.',
              'For cuboid, multiply length, width, and height.',
              'So V = l x w x h.'
            ]
          },
          {
            title: 'Why D = sqrt(l^2 + w^2 + h^2)',
            formula: 'D = sqrt(l^2 + w^2 + h^2)',
            steps: [
              'First find base rectangle diagonal: d_b = sqrt(l^2 + w^2).',
              'Then use Pythagoras with d_b and height h.',
              'D^2 = d_b^2 + h^2 = l^2 + w^2 + h^2.'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'Find volume',
            question: 'For l = 8 cm, w = 5 cm, h = 3 cm, find volume.',
            steps: [
              'Use V = lwh.',
              'V = 8 x 5 x 3.',
              'V = 120 cm^3.'
            ],
            answer: '120 cm^3'
          },
          {
            title: 'Find surface area',
            question: 'For l = 6 cm, w = 4 cm, h = 2 cm, find surface area.',
            steps: [
              'Use SA = 2(lw + lh + wh).',
              'SA = 2(6x4 + 6x2 + 4x2) = 2(24 + 12 + 8).',
              'SA = 2 x 44 = 88 cm^2.'
            ],
            answer: '88 cm^2'
          },
          {
            title: 'Find space diagonal',
            question: 'For l = 3 cm, w = 4 cm, h = 12 cm, find D.',
            steps: [
              'Use D = sqrt(l^2 + w^2 + h^2).',
              'D = sqrt(3^2 + 4^2 + 12^2) = sqrt(9 + 16 + 144).',
              'D = sqrt(169) = 13 cm.'
            ],
            answer: '13 cm'
          },
          {
            title: 'Find total edge length',
            question: 'For l = 7 cm, w = 2 cm, h = 5 cm, find total edge length.',
            steps: [
              'Use E_total = 4(l + w + h).',
              'E_total = 4(7 + 2 + 5).',
              'E_total = 56 cm.'
            ],
            answer: '56 cm'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'Find volume if l=5 cm, w=4 cm, h=3 cm.',
            hint: 'Use V = lwh.',
            answer: '60 cm^3.'
          },
          {
            level: 'Easy',
            question: 'Find SA if l=4 cm, w=3 cm, h=2 cm.',
            hint: 'Use SA = 2(lw + lh + wh).',
            answer: '52 cm^2.'
          },
          {
            level: 'Easy',
            question: 'Find total edge length if l=3 cm, w=2 cm, h=1 cm.',
            hint: 'Use E_total = 4(l + w + h).',
            answer: '24 cm.'
          },
          {
            level: 'Medium',
            question: 'A cuboid has volume 210 cm^3 with l=7 cm and w=5 cm. Find h.',
            hint: 'h = V/(lw).',
            answer: 'h = 6 cm.'
          },
          {
            level: 'Medium',
            question: 'For l=9 cm, w=12 cm, h=20 cm, find space diagonal.',
            hint: 'Use D = sqrt(l^2 + w^2 + h^2).',
            answer: 'D = 25 cm.'
          },
          {
            level: 'Medium',
            question: 'If SA=94 cm^2, l=5 cm, w=3 cm, find h.',
            hint: 'Use 2(lw + lh + wh) = 94.',
            answer: 'h = 4 cm.'
          },
          {
            level: 'Hard',
            question: 'If all dimensions double, how does volume change?',
            hint: 'Volume depends on lwh.',
            answer: 'Volume becomes 8 times.'
          },
          {
            level: 'Hard',
            question: 'If all dimensions double, how does surface area change?',
            hint: 'Area depends on square terms.',
            answer: 'Surface area becomes 4 times.'
          }
        ],
        practiceQa: [
          {
            question: 'How many faces does a cuboid have?',
            answer: '6 rectangular faces.'
          },
          {
            question: 'How many edges does a cuboid have?',
            answer: '12 edges.'
          },
          {
            question: 'How many vertices does a cuboid have?',
            answer: '8 vertices.'
          },
          {
            question: 'Surface area formula of cuboid?',
            answer: 'SA = 2(lw + lh + wh).'
          },
          {
            question: 'Volume formula of cuboid?',
            answer: 'V = lwh.'
          },
          {
            question: 'Space diagonal formula?',
            answer: 'D = sqrt(l^2 + w^2 + h^2).'
          },
          {
            question: 'Total edge length formula?',
            answer: 'E_total = 4(l + w + h).'
          },
          {
            question: 'If l=4, w=3, h=2, find volume.',
            answer: 'V = 24 cm^3.'
          },
          {
            question: 'If l=4, w=3, h=2, find SA.',
            answer: 'SA = 52 cm^2.'
          },
          {
            question: 'Why are cuboid equations used in real life?',
            answer: 'To calculate capacity, surface materials, and layout dimensions accurately.'
          }
        ],
        examCorner: {
          shortcut: 'V = l x w x h (three different dimensions multiplied). SA = 2(lw + lh + wh) means three pairs of faces each counted twice.',
          trap: 'SA needs all three unique face pairs. Forgetting one pair (e.g., the top and bottom) is the most common cuboid mistake.',
          quickMethod: 'Draw three rectangles: l x w, l x h, w x h. Find each area. Add them and multiply by 2.'
        }
      }
    },
    'triangular-prism': {
      file: 'selective-geometry-triangular-prism.html',
      name: 'Triangular Prism',
      family: '3D Shape',
      overview: 'A prism with triangular cross-section and constant length.',
      properties: ['2 triangular faces and 3 rectangular faces.', 'Volume = triangle area x prism length.'],
      formulas: [
        { label: 'Base Triangle Area', formula: 'A_base = 1/2 x b x h_t', where: 'b = triangle base, h_t = triangle height' },
        { label: 'Volume', formula: 'V = A_base x L', where: 'L = prism length' },
        { label: 'Surface Area', formula: 'SA = (perimeter of base triangle x L) + 2A_base', where: 'right triangular prism' },
        { label: 'Total Edge Length', formula: 'E_total = 2(a + b + c) + 3L', where: 'triangle sides a,b,c and prism length L' }
      ],
      example: {
        question: 'Triangle b=6, h=4, prism length L=10. Find volume.',
        steps: ['Triangle area = 1/2 x 6 x 4 = 12', 'V = 12 x 10 = 120 cm^3'],
        answer: 'V = 120 cm^3'
      },
      mistakes: ['Using triangle perimeter for volume.'],
      deepDive: {
        simpleIdea: 'A triangular prism is like extending a triangle in one direction. It has the same triangular shape at both ends.',
        diagram: {
          type: 'triangular-prism-labeled',
          caption: 'Triangular prism parts: base b, triangle height h_t, prism length L, triangular faces, and rectangular side faces.'
        },
        measurements: [
          {
            label: 'Volume',
            applicable: true,
            formula: 'V = A_base x L = (1/2 x b x h_t) x L',
            idea: 'Find triangle base area first, then multiply by prism length.'
          },
          {
            label: 'Surface Area',
            applicable: true,
            formula: 'SA = (perimeter of base triangle x L) + 2A_base',
            idea: 'Add lateral rectangular area and two triangular ends.'
          },
          {
            label: 'Perimeter',
            applicable: false,
            idea: 'Perimeter is a 2D concept. For prism we use area, volume, or total edge length.'
          },
          {
            label: 'Total Edge Length',
            applicable: true,
            formula: 'E_total = 2(a + b + c) + 3L',
            idea: 'Two triangle boundaries plus three connecting prism edges.'
          }
        ],
        angleFacts: [
          'A triangular prism has 5 faces, 9 edges, and 6 vertices.',
          'It has 2 triangular faces and 3 side faces.',
          'In a right triangular prism, side faces are rectangles.',
          'Angles inside the triangular base depend on the triangle type.'
        ],
        speciality: [
          'Cross-section parallel to the triangular base stays the same shape.',
          'Volume grows linearly with prism length L.',
          'Useful for ramps, roof supports, and wedge-like solids.'
        ],
        funFacts: [
          'Camping tent profiles often resemble triangular prisms.',
          'Some chocolate bars and packaging boxes use prism-like geometry.',
          'Bridge truss models often use triangular prism components.'
        ],
        realLifeUseCases: [
          'Engineers compute triangular prism volume for concrete ramp sections.',
          'Packaging designers use surface area to estimate cardboard required.',
          'Architecture uses prism geometry in skylights and roof structures.',
          'Manufacturing uses these formulas for material costing and cutting plans.',
          'Students use prism formulas in physics when calculating mass from density and volume.',
          '3D game design uses prism meshes for modeling roofs and wedges.'
        ],
        formulaMeaning: [
          {
            title: 'Why V = A_base x L',
            formula: 'V = A_base x L',
            steps: [
              'A prism keeps the same base shape all along its length.',
              'Base area here is triangle area A_base.',
              'So volume is base area times length.'
            ]
          },
          {
            title: 'Why A_base = 1/2 x b x h_t',
            formula: 'A_base = 1/2 x b x h_t',
            steps: [
              'A triangle area is half of a matching rectangle area.',
              'Rectangle with same base and height is b x h_t.',
              'So triangle area is half of that.'
            ]
          },
          {
            title: 'Why SA = perimeter x L + 2A_base',
            formula: 'SA = (a + b + c)L + 2A_base',
            steps: [
              'Each side of triangle sweeps a rectangular face of area side x L.',
              'So lateral area is (a + b + c)L.',
              'Add two triangular ends to get total surface area.'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'Find volume',
            question: 'Given b = 8 cm, h_t = 5 cm, and L = 12 cm, find volume.',
            steps: [
              'Find base area: A_base = 1/2 x 8 x 5 = 20 cm^2.',
              'Use V = A_base x L.',
              'V = 20 x 12 = 240 cm^3.'
            ],
            answer: '240 cm^3'
          },
          {
            title: 'Find surface area',
            question: 'Base triangle sides are 3 cm, 4 cm, 5 cm. Prism length L = 10 cm. Find SA.',
            steps: [
              'Base area for 3-4-5 triangle: A_base = 1/2 x 3 x 4 = 6 cm^2.',
              'Perimeter of base = 3 + 4 + 5 = 12 cm.',
              'SA = perimeter x L + 2A_base = 12x10 + 2x6 = 132 cm^2.'
            ],
            answer: '132 cm^2'
          },
          {
            title: 'Find prism length from volume',
            question: 'A triangular prism has A_base = 15 cm^2 and volume 180 cm^3. Find L.',
            steps: [
              'Use V = A_base x L.',
              '180 = 15 x L.',
              'L = 12 cm.'
            ],
            answer: '12 cm'
          },
          {
            title: 'Find total edge length',
            question: 'Base triangle sides are 5 cm, 6 cm, 7 cm and L = 9 cm. Find total edge length.',
            steps: [
              'Use E_total = 2(a + b + c) + 3L.',
              'E_total = 2(5 + 6 + 7) + 3x9.',
              'E_total = 36 + 27 = 63 cm.'
            ],
            answer: '63 cm'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'If b=6 cm, h_t=4 cm, L=5 cm, find volume.',
            hint: 'Find A_base first.',
            answer: 'V = 60 cm^3.'
          },
          {
            level: 'Easy',
            question: 'How many faces does a triangular prism have?',
            hint: 'Count triangle faces and side faces.',
            answer: '5 faces.'
          },
          {
            level: 'Easy',
            question: 'How many edges does a triangular prism have?',
            hint: '3 on front triangle, 3 on back triangle, 3 connecting.',
            answer: '9 edges.'
          },
          {
            level: 'Medium',
            question: 'For base sides 3,4,5 and L=7, find lateral area only.',
            hint: 'Lateral area = perimeter x L.',
            answer: '84 cm^2.'
          },
          {
            level: 'Medium',
            question: 'A_base=18 cm^2 and V=234 cm^3. Find L.',
            hint: 'L = V/A_base.',
            answer: '13 cm.'
          },
          {
            level: 'Medium',
            question: 'Base sides 5,5,6 and L=8. Find total edge length.',
            hint: 'Use E_total formula.',
            answer: '54 cm.'
          },
          {
            level: 'Hard',
            question: 'If all dimensions double, how does volume change?',
            hint: 'Volume depends on three dimensions overall.',
            answer: 'Volume becomes 8 times.'
          },
          {
            level: 'Hard',
            question: 'If all dimensions double, how does total surface area change?',
            hint: 'Area scales with square of scale factor.',
            answer: 'Surface area becomes 4 times.'
          }
        ],
        practiceQa: [
          {
            question: 'How many triangular faces in a triangular prism?',
            answer: '2 triangular faces.'
          },
          {
            question: 'How many side faces in a triangular prism?',
            answer: '3 side faces.'
          },
          {
            question: 'Volume formula of triangular prism?',
            answer: 'V = A_base x L.'
          },
          {
            question: 'Base triangle area formula?',
            answer: 'A_base = 1/2 x b x h_t.'
          },
          {
            question: 'Surface area formula (right triangular prism)?',
            answer: 'SA = (perimeter of base triangle x L) + 2A_base.'
          },
          {
            question: 'Total edge length formula?',
            answer: 'E_total = 2(a + b + c) + 3L.'
          },
          {
            question: 'If b=10, h_t=6, L=4, find volume.',
            answer: 'V = 120 cm^3.'
          },
          {
            question: 'If A_base=12 cm^2 and L=9 cm, find volume.',
            answer: 'V = 108 cm^3.'
          },
          {
            question: 'Is perimeter applicable directly for a triangular prism?',
            answer: 'Not as a main 3D measure; use surface area, volume, or total edge length.'
          },
          {
            question: 'Why are triangular prism equations useful?',
            answer: 'They help calculate material, storage space, and structural dimensions in real designs.'
          }
        ],
        examCorner: {
          shortcut: 'V = triangular cross-section area x length. SA = 2 x triangle area + 3 x rectangle areas (two ends + three sides).',
          trap: 'The triangle area (half base x height) goes into V, not the rectangular face area. Identify the cross-section (triangular end) first.',
          quickMethod: 'Step 1: find triangle area A = (1/2) x b x h. Step 2: multiply by prism length for V. Step 3: add rectangular sides for SA.'
        }
      }
    },
    'cylinder': {
      file: 'selective-geometry-cylinder.html',
      name: 'Cylinder',
      family: '3D Shape',
      overview: 'A cylinder has two parallel circular faces and one curved surface.',
      properties: ['Cross-sections parallel to base are circles.', 'Radius is same on both circular ends.'],
      formulas: [
        { label: 'Volume', formula: 'V = pi r^2 h', where: 'r = radius, h = height' },
        { label: 'Curved Surface Area', formula: 'CSA = 2pi r h', where: 'lateral area only' },
        { label: 'Total Surface Area', formula: 'SA = 2pi r^2 + 2pi r h', where: 'top + bottom + curved' },
        { label: 'Base Circumference', formula: 'C = 2pi r', where: 'circle edge of top or bottom' }
      ],
      example: {
        question: 'r = 3 cm, h = 8 cm. Find volume.',
        steps: ['V = pi x 3^2 x 8', 'V = 72pi cm^3'],
        answer: 'V = 72pi cm^3'
      },
      mistakes: ['For total surface area, forgetting one circular end.'],
      deepDive: {
        simpleIdea: 'A cylinder is like a can shape: same circular base all along its height.',
        diagram: {
          type: 'cylinder-labeled',
          caption: 'Cylinder parts: radius r, height h, center O, curved surface, and top/bottom circular bases.'
        },
        measurements: [
          {
            label: 'Volume',
            applicable: true,
            formula: 'V = pi r^2 h',
            idea: 'Base area pi r^2 multiplied by height h.'
          },
          {
            label: 'Curved Surface Area',
            applicable: true,
            formula: 'CSA = 2pi r h',
            idea: 'Curved part only, without top and bottom circles.'
          },
          {
            label: 'Total Surface Area',
            applicable: true,
            formula: 'SA = 2pi r^2 + 2pi r h',
            idea: 'Add two circular bases and curved surface.'
          },
          {
            label: 'Perimeter',
            applicable: false,
            idea: 'Perimeter is for 2D boundaries. In 3D cylinder, use area and volume.'
          }
        ],
        angleFacts: [
          'A cylinder has no vertices and no straight edges.',
          'Top and bottom bases are congruent circles.',
          'Axis of a right cylinder is perpendicular to circular bases.',
          'Any cross-section parallel to the base is a circle.'
        ],
        speciality: [
          'Constant circular cross-section makes flow and rotation smooth.',
          'Many containers use cylinders for good volume-to-material ratio.',
          'Cylinders are easy to roll and stack in industrial settings.'
        ],
        funFacts: [
          'Soft drink cans are cylinders for manufacturing efficiency.',
          'Pipes use cylindrical shape for fluid transport.',
          'Many batteries are cylindrical for compact packing.'
        ],
        realLifeUseCases: [
          'Volume is used to calculate storage capacity of tanks, pipes, and bottles.',
          'Curved surface area helps estimate label paper around cans and bottles.',
          'Total surface area helps estimate paint or coating needed on cylindrical tanks.',
          'Civil engineering uses cylinder formulas for pillars and columns.',
          'Mechanical design uses cylinder measurements in shafts and rollers.',
          'Medical syringes use cylindrical volume principles for dosage.'
        ],
        formulaMeaning: [
          {
            title: 'Why V = pi r^2 h',
            formula: 'V = pi r^2 h',
            steps: [
              'Cylinder has constant circular base area pi r^2.',
              'Stacking that base through height h gives volume.',
              'So volume is base area x height.'
            ]
          },
          {
            title: 'Why CSA = 2pi r h',
            formula: 'CSA = 2pi r h',
            steps: [
              'If curved surface is opened, it becomes a rectangle.',
              'Rectangle length is base circumference 2pi r.',
              'Rectangle width is height h, so area is 2pi r h.'
            ]
          },
          {
            title: 'Why SA = 2pi r^2 + 2pi r h',
            formula: 'SA = 2pi r^2 + 2pi r h',
            steps: [
              'Two bases together give 2pi r^2.',
              'Curved area is 2pi r h.',
              'Add them for total surface area.'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'Find volume',
            question: 'If r = 4 cm and h = 10 cm, find volume.',
            steps: [
              'Use V = pi r^2 h.',
              'V = pi x 4^2 x 10 = pi x 16 x 10.',
              'V = 160pi cm^3.'
            ],
            answer: '160pi cm^3'
          },
          {
            title: 'Find curved surface area',
            question: 'If r = 7 cm and h = 12 cm, find CSA.',
            steps: [
              'Use CSA = 2pi r h.',
              'CSA = 2pi x 7 x 12.',
              'CSA = 168pi cm^2.'
            ],
            answer: '168pi cm^2'
          },
          {
            title: 'Find total surface area',
            question: 'If r = 3 cm and h = 8 cm, find SA.',
            steps: [
              'Use SA = 2pi r^2 + 2pi r h.',
              'SA = 2pi x 3^2 + 2pi x 3 x 8 = 18pi + 48pi.',
              'SA = 66pi cm^2.'
            ],
            answer: '66pi cm^2'
          },
          {
            title: 'Find height from volume',
            question: 'A cylinder has V = 200pi cm^3 and r = 5 cm. Find h.',
            steps: [
              'Use V = pi r^2 h.',
              '200pi = pi x 25 x h.',
              'h = 8 cm.'
            ],
            answer: '8 cm'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'Find volume if r=2 cm and h=9 cm.',
            hint: 'Use V = pi r^2 h.',
            answer: '36pi cm^3.'
          },
          {
            level: 'Easy',
            question: 'Find CSA if r=3 cm and h=5 cm.',
            hint: 'Use CSA = 2pi r h.',
            answer: '30pi cm^2.'
          },
          {
            level: 'Easy',
            question: 'Find base circumference if r=6 cm.',
            hint: 'Use C = 2pi r.',
            answer: '12pi cm.'
          },
          {
            level: 'Medium',
            question: 'Find SA if r=5 cm and h=11 cm.',
            hint: 'Use SA = 2pi r^2 + 2pi r h.',
            answer: '160pi cm^2.'
          },
          {
            level: 'Medium',
            question: 'A cylinder has volume 324pi cm^3 and h=9 cm. Find r.',
            hint: '324pi = pi r^2 x 9.',
            answer: 'r = 6 cm.'
          },
          {
            level: 'Medium',
            question: 'If r=4 cm, what height gives volume 64pi cm^3?',
            hint: 'V = pi x 16 x h.',
            answer: 'h = 4 cm.'
          },
          {
            level: 'Hard',
            question: 'If radius doubles and height stays same, how does volume change?',
            hint: 'Volume depends on r^2.',
            answer: 'Volume becomes 4 times.'
          },
          {
            level: 'Hard',
            question: 'If both radius and height double, how does volume change?',
            hint: 'V depends on r^2h.',
            answer: 'Volume becomes 8 times.'
          }
        ],
        practiceQa: [
          {
            question: 'How many circular bases does a cylinder have?',
            answer: '2 circular bases.'
          },
          {
            question: 'Does a cylinder have vertices?',
            answer: 'No vertices.'
          },
          {
            question: 'Volume formula of cylinder?',
            answer: 'V = pi r^2 h.'
          },
          {
            question: 'Curved surface area formula?',
            answer: 'CSA = 2pi r h.'
          },
          {
            question: 'Total surface area formula?',
            answer: 'SA = 2pi r^2 + 2pi r h.'
          },
          {
            question: 'Base circumference formula?',
            answer: 'C = 2pi r.'
          },
          {
            question: 'If r=5 and h=2, find volume.',
            answer: '50pi cm^3.'
          },
          {
            question: 'If r=5 and h=2, find CSA.',
            answer: '20pi cm^2.'
          },
          {
            question: 'Is perimeter directly used for full cylinder?',
            answer: 'No, perimeter is mainly for 2D boundaries.'
          },
          {
            question: 'Why are cylinder equations important?',
            answer: 'They help design containers, pipes, pillars, and industrial parts accurately.'
          }
        ],
        examCorner: {
          shortcut: 'V = pi x r^2 x h (circle area times height). Curved SA = 2 x pi x r x h. Total SA = 2 x pi x r^2 + 2 x pi x r x h (two circles + curved strip).',
          trap: 'Curved SA and total SA are not the same. If the question says "total surface area" include both circular ends. If "curved only" exclude them.',
          quickMethod: 'V = circle area x h. Total SA = (2 x circle area) + (circumference x h).'
        }
      }
    },
    'cone': {
      file: 'selective-geometry-cone.html',
      name: 'Cone',
      family: '3D Shape',
      overview: 'A cone has one circular base and one apex.',
      properties: ['Height is perpendicular from apex to base center.', 'Slant height differs from vertical height.'],
      formulas: [
        { label: 'Volume', formula: 'V = 1/3 pi r^2 h', where: 'r = radius, h = vertical height' },
        { label: 'Curved Surface Area', formula: 'CSA = pi r l', where: 'l = slant height' },
        { label: 'Total Surface Area', formula: 'SA = pi r l + pi r^2', where: 'curved + base' },
        { label: 'Slant Height Relation', formula: 'l^2 = r^2 + h^2', where: 'right cone' }
      ],
      example: {
        question: 'r = 4 cm, h = 9 cm. Find volume.',
        steps: ['V = 1/3 x pi x 4^2 x 9', 'V = 48pi cm^3'],
        answer: 'V = 48pi cm^3'
      },
      mistakes: ['Using slant height in place of vertical height for volume.'],
      deepDive: {
        simpleIdea: 'A cone has a circular base and narrows to one top point called apex.',
        diagram: {
          type: 'cone-labeled',
          caption: 'Cone parts: radius r, height h, slant height l, apex, center O, curved surface, and circular base.'
        },
        measurements: [
          {
            label: 'Volume',
            applicable: true,
            formula: 'V = 1/3 pi r^2 h',
            idea: 'Cone volume is one-third of a cylinder with same base and height.'
          },
          {
            label: 'Curved Surface Area',
            applicable: true,
            formula: 'CSA = pi r l',
            idea: 'Only the side curved part, not the base circle.'
          },
          {
            label: 'Total Surface Area',
            applicable: true,
            formula: 'SA = pi r l + pi r^2',
            idea: 'Add curved area and base circle area.'
          },
          {
            label: 'Perimeter',
            applicable: false,
            idea: 'Perimeter is a 2D concept, not for full 3D cone.'
          }
        ],
        angleFacts: [
          'A right cone has apex directly above the center of base.',
          'Height h is perpendicular to the base plane.',
          'Slant height l is along the side from apex to edge of base.',
          'Cone has one vertex (apex) and one circular boundary edge.'
        ],
        speciality: [
          'Cone is used where smooth taper is needed.',
          'Volume has factor 1/3 compared to corresponding cylinder.',
          'Slant-height relation connects 2D and 3D geometry.'
        ],
        funFacts: [
          'Ice-cream cones are classic real-life cones.',
          'Traffic cones use cone shape for visibility and stability.',
          'Volcanoes are often modeled as cones in school science.'
        ],
        realLifeUseCases: [
          'Packaging and paper cups use cone area formulas for material estimation.',
          'Traffic and safety cone design uses slant and height calculations.',
          'Funnel design uses cone volume to estimate liquid capacity.',
          'Industrial nozzles and hoppers use conical sections.',
          'Architecture uses cones in roofs and tower tops.',
          '3D modeling and animation use cone geometry for pointed forms.'
        ],
        formulaMeaning: [
          {
            title: 'Why V = 1/3 pi r^2 h',
            formula: 'V = 1/3 pi r^2 h',
            steps: [
              'Cone and cylinder can share same radius r and height h.',
              'Experimentally and geometrically, cone volume is one-third of that cylinder.',
              'Cylinder volume is pi r^2 h, so cone is one-third of it.'
            ]
          },
          {
            title: 'Why CSA = pi r l',
            formula: 'CSA = pi r l',
            steps: [
              'Curved surface of cone can be unfolded into a sector.',
              'Sector arc equals circumference of base circle.',
              'Sector area simplifies to pi r l.'
            ]
          },
          {
            title: 'Why l^2 = r^2 + h^2',
            formula: 'l^2 = r^2 + h^2',
            steps: [
              'In a right cone, r, h, and l form a right triangle in cross-section.',
              'Apply Pythagoras theorem to that triangle.',
              'So slant height squared equals radius squared plus height squared.'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'Find volume',
            question: 'If r = 6 cm and h = 10 cm, find cone volume.',
            steps: [
              'Use V = 1/3 pi r^2 h.',
              'V = 1/3 pi x 6^2 x 10 = 1/3 pi x 360.',
              'V = 120pi cm^3.'
            ],
            answer: '120pi cm^3'
          },
          {
            title: 'Find slant height',
            question: 'If r = 5 cm and h = 12 cm, find slant height l.',
            steps: [
              'Use l^2 = r^2 + h^2.',
              'l^2 = 5^2 + 12^2 = 25 + 144 = 169.',
              'l = 13 cm.'
            ],
            answer: '13 cm'
          },
          {
            title: 'Find curved surface area',
            question: 'If r = 7 cm and l = 9 cm, find CSA.',
            steps: [
              'Use CSA = pi r l.',
              'CSA = pi x 7 x 9.',
              'CSA = 63pi cm^2.'
            ],
            answer: '63pi cm^2'
          },
          {
            title: 'Find total surface area',
            question: 'If r = 4 cm and l = 6 cm, find SA.',
            steps: [
              'Use SA = pi r l + pi r^2.',
              'SA = pi x 4 x 6 + pi x 4^2 = 24pi + 16pi.',
              'SA = 40pi cm^2.'
            ],
            answer: '40pi cm^2'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'Find volume if r=3 cm and h=9 cm.',
            hint: 'Use V = 1/3 pi r^2 h.',
            answer: '27pi cm^3.'
          },
          {
            level: 'Easy',
            question: 'Find CSA if r=5 cm and l=8 cm.',
            hint: 'Use CSA = pi r l.',
            answer: '40pi cm^2.'
          },
          {
            level: 'Easy',
            question: 'Find SA if r=2 cm and l=5 cm.',
            hint: 'Use SA = pi r l + pi r^2.',
            answer: '14pi cm^2.'
          },
          {
            level: 'Medium',
            question: 'If r=8 cm and h=15 cm, find l.',
            hint: 'Use l^2 = r^2 + h^2.',
            answer: 'l = 17 cm.'
          },
          {
            level: 'Medium',
            question: 'If V=100pi cm^3 and r=5 cm, find h.',
            hint: '100pi = 1/3 pi x 25 x h.',
            answer: 'h = 12 cm.'
          },
          {
            level: 'Medium',
            question: 'If r=6 cm and l=10 cm, find h.',
            hint: 'Use h^2 = l^2 - r^2.',
            answer: 'h = 8 cm.'
          },
          {
            level: 'Hard',
            question: 'If radius doubles and height stays same, how does volume change?',
            hint: 'Volume depends on r^2h.',
            answer: 'Volume becomes 4 times.'
          },
          {
            level: 'Hard',
            question: 'If radius and height both double, how does volume change?',
            hint: 'Scale effect on r^2h.',
            answer: 'Volume becomes 8 times.'
          }
        ],
        practiceQa: [
          {
            question: 'How many circular bases does a cone have?',
            answer: 'One circular base.'
          },
          {
            question: 'How many vertices does a cone have?',
            answer: 'One vertex called apex.'
          },
          {
            question: 'Volume formula of cone?',
            answer: 'V = 1/3 pi r^2 h.'
          },
          {
            question: 'Curved surface area formula of cone?',
            answer: 'CSA = pi r l.'
          },
          {
            question: 'Total surface area formula of cone?',
            answer: 'SA = pi r l + pi r^2.'
          },
          {
            question: 'Slant height relation in a right cone?',
            answer: 'l^2 = r^2 + h^2.'
          },
          {
            question: 'If r=3 and h=4, find l.',
            answer: 'l = 5.'
          },
          {
            question: 'If r=3 and l=5, find CSA.',
            answer: '15pi cm^2.'
          },
          {
            question: 'Is perimeter used directly for full cone?',
            answer: 'No, perimeter is mainly for 2D boundaries.'
          },
          {
            question: 'Why are cone equations useful?',
            answer: 'They help design funnels, containers, roofs, and tapered engineering parts.'
          }
        ],
        examCorner: {
          shortcut: 'V = (1/3) x pi x r^2 x h. Slant height l = sqrt(r^2 + h^2). Curved SA = pi x r x l. Total SA = pi x r^2 + pi x r x l.',
          trap: 'Height h and slant height l are different. h is the vertical height; l is the slant edge. Exam often gives one and asks you to find the other via Pythagoras.',
          quickMethod: 'Check: is h or l given? If only l is given, use l^2 = r^2 + h^2 to find h before calculating volume.'
        }
      }
    },
    'sphere': {
      file: 'selective-geometry-sphere.html',
      name: 'Sphere',
      family: '3D Shape',
      overview: 'A sphere is perfectly round in 3D; all boundary points are distance r from center.',
      properties: ['No edges and no vertices.', 'Any cross-section through center is a circle.'],
      formulas: [
        { label: 'Surface Area', formula: 'SA = 4pi r^2', where: 'r = radius' },
        { label: 'Volume', formula: 'V = 4/3 pi r^3', where: 'r = radius' },
        { label: 'Great Circle Circumference', formula: 'C = 2pi r', where: 'equator or any great circle' }
      ],
      example: {
        question: 'r = 3 cm. Find surface area.',
        steps: ['SA = 4pi x 3^2', 'SA = 36pi cm^2'],
        answer: 'SA = 36pi cm^2'
      },
      mistakes: ['Using circle formulas for sphere questions.'],
      deepDive: {
        simpleIdea: 'A sphere is a 3D round object where every surface point is the same distance from the center.',
        diagram: {
          type: 'sphere-labeled',
          caption: 'Sphere parts: radius r, center O, diameter d, great circle (equator), and curved surface.'
        },
        measurements: [
          {
            label: 'Surface Area',
            applicable: true,
            formula: 'SA = 4pi r^2',
            idea: 'Total outer skin area of the sphere.'
          },
          {
            label: 'Volume',
            applicable: true,
            formula: 'V = 4/3 pi r^3',
            idea: 'Space occupied inside the sphere.'
          },
          {
            label: 'Perimeter',
            applicable: false,
            idea: 'Perimeter is for 2D boundaries, not full 3D solids.'
          },
          {
            label: 'Great Circle Circumference',
            applicable: true,
            formula: 'C = 2pi r',
            idea: 'Circumference of largest circle through center.'
          }
        ],
        angleFacts: [
          'A sphere has no edges and no vertices.',
          'Any line from center to surface is a radius.',
          'Diameter is always twice the radius.',
          'All great circles on a sphere have same radius as the sphere.'
        ],
        speciality: [
          'Sphere gives maximum volume for minimum surface area among 3D shapes.',
          'It looks the same from every direction.',
          'It rolls smoothly due to constant curvature.'
        ],
        funFacts: [
          'Planets and bubbles are close to spherical due to symmetry of forces.',
          'Sports balls are made spherical for predictable movement.',
          'Droplets tend to form spheres because of surface tension.'
        ],
        realLifeUseCases: [
          'Volume formula is used for storage tanks and spherical containers.',
          'Surface area helps estimate paint or coating needed for dome-like objects.',
          'Medical imaging approximates organs or cells using spherical models.',
          'Astrophysics models stars and planets as spheres for calculations.',
          'Manufacturing uses sphere formulas in ball bearings and pressure vessels.',
          'Computer graphics uses sphere geometry for lighting and shading.'
        ],
        formulaMeaning: [
          {
            title: 'Why SA = 4pi r^2',
            formula: 'SA = 4pi r^2',
            steps: [
              'A sphere’s surface area is four times the area of a great circle.',
              'Great circle area is pi r^2.',
              'So total surface area becomes 4pi r^2.'
            ]
          },
          {
            title: 'Why V = 4/3 pi r^3',
            formula: 'V = 4/3 pi r^3',
            steps: [
              'Sphere volume grows with cube of radius.',
              'The constant factor from geometric derivation is 4/3 pi.',
              'So volume is 4/3 pi r^3.'
            ]
          },
          {
            title: 'Why C = 2pi r for great circle',
            formula: 'C = 2pi r',
            steps: [
              'A great circle is an ordinary circle of radius r.',
              'Circle circumference formula is 2pi r.',
              'So equator circumference of sphere is also 2pi r.'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'Find surface area',
            question: 'If r = 7 cm, find surface area.',
            steps: [
              'Use SA = 4pi r^2.',
              'SA = 4pi x 7^2 = 4pi x 49.',
              'SA = 196pi cm^2.'
            ],
            answer: '196pi cm^2'
          },
          {
            title: 'Find volume',
            question: 'If r = 6 cm, find volume.',
            steps: [
              'Use V = 4/3 pi r^3.',
              'V = 4/3 pi x 6^3 = 4/3 pi x 216.',
              'V = 288pi cm^3.'
            ],
            answer: '288pi cm^3'
          },
          {
            title: 'Find radius from volume',
            question: 'A sphere has volume 36pi cm^3. Find radius.',
            steps: [
              'Use 36pi = 4/3 pi r^3.',
              'r^3 = 27.',
              'r = 3 cm.'
            ],
            answer: '3 cm'
          },
          {
            title: 'Find great-circle circumference',
            question: 'If r = 5 cm, find great circle circumference.',
            steps: [
              'Use C = 2pi r.',
              'C = 2pi x 5.',
              'C = 10pi cm.'
            ],
            answer: '10pi cm'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'Find SA if r = 4 cm.',
            hint: 'Use SA = 4pi r^2.',
            answer: '64pi cm^2.'
          },
          {
            level: 'Easy',
            question: 'Find V if r = 3 cm.',
            hint: 'Use V = 4/3 pi r^3.',
            answer: '36pi cm^3.'
          },
          {
            level: 'Easy',
            question: 'Find diameter if r = 8 cm.',
            hint: 'd = 2r.',
            answer: '16 cm.'
          },
          {
            level: 'Medium',
            question: 'If SA = 100pi cm^2, find r.',
            hint: '100pi = 4pi r^2.',
            answer: 'r = 5 cm.'
          },
          {
            level: 'Medium',
            question: 'If r = 9 cm, find great circle circumference.',
            hint: 'Use C = 2pi r.',
            answer: '18pi cm.'
          },
          {
            level: 'Medium',
            question: 'If volume is 288pi cm^3, find r.',
            hint: 'Use V = 4/3 pi r^3.',
            answer: 'r = 6 cm.'
          },
          {
            level: 'Hard',
            question: 'If radius doubles, how does surface area change?',
            hint: 'SA depends on r^2.',
            answer: 'Surface area becomes 4 times.'
          },
          {
            level: 'Hard',
            question: 'If radius doubles, how does volume change?',
            hint: 'Volume depends on r^3.',
            answer: 'Volume becomes 8 times.'
          }
        ],
        practiceQa: [
          {
            question: 'How many edges does a sphere have?',
            answer: 'No edges.'
          },
          {
            question: 'How many vertices does a sphere have?',
            answer: 'No vertices.'
          },
          {
            question: 'Surface area formula of sphere?',
            answer: 'SA = 4pi r^2.'
          },
          {
            question: 'Volume formula of sphere?',
            answer: 'V = 4/3 pi r^3.'
          },
          {
            question: 'Great circle circumference formula?',
            answer: 'C = 2pi r.'
          },
          {
            question: 'Relation between diameter and radius?',
            answer: 'd = 2r.'
          },
          {
            question: 'If r=2 cm, find SA.',
            answer: '16pi cm^2.'
          },
          {
            question: 'If r=2 cm, find volume.',
            answer: '32pi/3 cm^3.'
          },
          {
            question: 'Is perimeter directly used for full sphere?',
            answer: 'No, perimeter is for 2D boundaries.'
          },
          {
            question: 'Why are sphere equations useful?',
            answer: 'They help calculate capacity, area, and dimensions for balls, domes, and spherical tanks.'
          }
        ],
        examCorner: {
          shortcut: 'SA = 4 x pi x r^2. V = (4/3) x pi x r^3. Both use only radius r — no height, no length.',
          trap: 'Diameter is often given in the question. Always halve it: r = d / 2. Using diameter directly in r^2 or r^3 gives a value 4x or 8x too large.',
          quickMethod: 'Write r = d / 2 as the very first step if diameter is given. Then substitute r into SA or V formula.'
        }
      }
    },
    'hemisphere': {
      file: 'selective-geometry-hemisphere.html',
      name: 'Hemisphere',
      family: '3D Shape',
      overview: 'A hemisphere is half of a sphere.',
      properties: ['One curved surface and one flat circular face.', 'Radius is shared with the base circle.'],
      formulas: [
        { label: 'Volume', formula: 'V = 2/3 pi r^3', where: 'half of sphere volume' },
        { label: 'Curved Surface Area', formula: 'CSA = 2pi r^2', where: 'curved part only' },
        { label: 'Total Surface Area', formula: 'SA = 3pi r^2', where: 'curved + base circle' },
        { label: 'Base Circumference', formula: 'C = 2pi r', where: 'circular rim of hemisphere base' }
      ],
      example: {
        question: 'r = 5 cm. Find volume.',
        steps: ['V = 2/3 x pi x 5^3', 'V = 250pi/3 cm^3'],
        answer: 'V = 250pi/3 cm^3'
      },
      mistakes: ['Confusing curved area with total area.'],
      deepDive: {
        simpleIdea: 'A hemisphere is exactly half of a sphere, like a bowl cut from a ball.',
        diagram: {
          type: 'hemisphere-labeled',
          caption: 'Hemisphere parts: radius r, diameter d, center O, curved surface, and base circle.'
        },
        measurements: [
          {
            label: 'Volume',
            applicable: true,
            formula: 'V = 2/3 pi r^3',
            idea: 'Half of the full sphere volume.'
          },
          {
            label: 'Curved Surface Area',
            applicable: true,
            formula: 'CSA = 2pi r^2',
            idea: 'Only the curved bowl-like part.'
          },
          {
            label: 'Total Surface Area',
            applicable: true,
            formula: 'SA = 3pi r^2',
            idea: 'Curved area plus flat circular base.'
          },
          {
            label: 'Perimeter',
            applicable: false,
            idea: 'Perimeter is for 2D boundaries; hemisphere uses area and volume.'
          }
        ],
        angleFacts: [
          'A hemisphere has one curved face and one flat circular face.',
          'Its base is a full circle of radius r.',
          'Diameter is d = 2r.',
          'It has no vertices and no straight edges.'
        ],
        speciality: [
          'It is exactly half of a sphere.',
          'Used in dome and bowl designs.',
          'Useful when only one side needs to be open/flat.'
        ],
        funFacts: [
          'Planetarium domes are hemisphere-like structures.',
          'Many bowls and stadium roofs use hemisphere geometry.',
          'Soap bubbles cut by a plane make hemisphere-like caps.'
        ],
        realLifeUseCases: [
          'Volume is used for bowl, dome, and tank capacity calculations.',
          'Curved area helps estimate coating or paint on dome surfaces.',
          'Total surface area helps estimate material for solid hemisphere objects.',
          'Architecture uses hemisphere formulas for dome shells and skylights.',
          'Industrial molds use hemisphere geometry for cast parts.',
          'Medical and scientific modeling approximates caps and cavities as hemispheres.'
        ],
        formulaMeaning: [
          {
            title: 'Why V = 2/3 pi r^3',
            formula: 'V = 2/3 pi r^3',
            steps: [
              'Sphere volume is 4/3 pi r^3.',
              'Hemisphere is half of sphere.',
              'So volume is half of 4/3 pi r^3.'
            ]
          },
          {
            title: 'Why CSA = 2pi r^2',
            formula: 'CSA = 2pi r^2',
            steps: [
              'Sphere total surface area is 4pi r^2.',
              'Curved part of hemisphere is half of sphere surface.',
              'Half of 4pi r^2 is 2pi r^2.'
            ]
          },
          {
            title: 'Why SA = 3pi r^2',
            formula: 'SA = 3pi r^2',
            steps: [
              'Total hemisphere area includes curved part and base circle.',
              'Curved part is 2pi r^2.',
              'Add base area pi r^2 to get 3pi r^2.'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'Find volume',
            question: 'If r = 6 cm, find hemisphere volume.',
            steps: [
              'Use V = 2/3 pi r^3.',
              'V = 2/3 pi x 6^3 = 2/3 pi x 216.',
              'V = 144pi cm^3.'
            ],
            answer: '144pi cm^3'
          },
          {
            title: 'Find curved surface area',
            question: 'If r = 4 cm, find CSA.',
            steps: [
              'Use CSA = 2pi r^2.',
              'CSA = 2pi x 4^2 = 2pi x 16.',
              'CSA = 32pi cm^2.'
            ],
            answer: '32pi cm^2'
          },
          {
            title: 'Find total surface area',
            question: 'If r = 5 cm, find SA.',
            steps: [
              'Use SA = 3pi r^2.',
              'SA = 3pi x 5^2 = 3pi x 25.',
              'SA = 75pi cm^2.'
            ],
            answer: '75pi cm^2'
          },
          {
            title: 'Find radius from volume',
            question: 'If V = 72pi cm^3, find r.',
            steps: [
              'Use 72pi = 2/3 pi r^3.',
              'r^3 = 108.',
              'r about 4.76 cm.'
            ],
            answer: 'r about 4.76 cm'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'Find volume if r=3 cm.',
            hint: 'Use V = 2/3 pi r^3.',
            answer: '18pi cm^3.'
          },
          {
            level: 'Easy',
            question: 'Find CSA if r=7 cm.',
            hint: 'Use CSA = 2pi r^2.',
            answer: '98pi cm^2.'
          },
          {
            level: 'Easy',
            question: 'Find SA if r=2 cm.',
            hint: 'Use SA = 3pi r^2.',
            answer: '12pi cm^2.'
          },
          {
            level: 'Medium',
            question: 'Find base circumference if r=9 cm.',
            hint: 'C = 2pi r.',
            answer: '18pi cm.'
          },
          {
            level: 'Medium',
            question: 'If SA = 147pi cm^2, find r.',
            hint: '147pi = 3pi r^2.',
            answer: 'r = 7 cm.'
          },
          {
            level: 'Medium',
            question: 'If CSA = 50pi cm^2, find r.',
            hint: '50pi = 2pi r^2.',
            answer: 'r = 5 cm.'
          },
          {
            level: 'Hard',
            question: 'If radius doubles, how does volume change?',
            hint: 'Volume depends on r^3.',
            answer: 'Volume becomes 8 times.'
          },
          {
            level: 'Hard',
            question: 'If radius doubles, how does total area change?',
            hint: 'Area depends on r^2.',
            answer: 'Area becomes 4 times.'
          }
        ],
        practiceQa: [
          {
            question: 'What is a hemisphere?',
            answer: 'Half of a sphere.'
          },
          {
            question: 'Volume formula of hemisphere?',
            answer: 'V = 2/3 pi r^3.'
          },
          {
            question: 'Curved surface area formula?',
            answer: 'CSA = 2pi r^2.'
          },
          {
            question: 'Total surface area formula?',
            answer: 'SA = 3pi r^2.'
          },
          {
            question: 'Base circumference formula?',
            answer: 'C = 2pi r.'
          },
          {
            question: 'Relation between diameter and radius?',
            answer: 'd = 2r.'
          },
          {
            question: 'If r=4 cm, find CSA.',
            answer: '32pi cm^2.'
          },
          {
            question: 'If r=4 cm, find SA.',
            answer: '48pi cm^2.'
          },
          {
            question: 'Is perimeter a main 3D measure for hemisphere?',
            answer: 'No, area and volume are main measures.'
          },
          {
            question: 'Why are hemisphere equations useful?',
            answer: 'They help with dome, bowl, and tank design calculations.'
          }
        ],
        examCorner: {
          shortcut: 'V = (2/3) x pi x r^3 (half of sphere V). Total SA = 2 x pi x r^2 + pi x r^2 = 3 x pi x r^2 (curved surface + flat circular base).',
          trap: 'Hemisphere total SA = curved part PLUS the flat circular base. Forgetting the flat base pi x r^2 is the most common hemisphere error.',
          quickMethod: 'Write sphere SA = 4 pi r^2. Halve it for curved part = 2 pi r^2. Add flat base pi r^2. Total = 3 pi r^2.'
        }
      }
    },
    'square-pyramid': {
      file: 'selective-geometry-square-pyramid.html',
      name: 'Square Pyramid',
      family: '3D Shape',
      overview: 'A pyramid with a square base and four triangular faces.',
      properties: ['5 faces, 8 edges, 5 vertices.', 'Height is perpendicular from apex to base center.'],
      formulas: [
        { label: 'Volume', formula: 'V = 1/3 x a^2 x h', where: 'a = base side, h = vertical height' },
        { label: 'Surface Area', formula: 'SA = a^2 + 2al', where: 'l = slant height of triangular face' },
        { label: 'Lateral Surface Area', formula: 'LSA = 2al', where: 'sum of four triangular side faces' },
        { label: 'Base Perimeter', formula: 'P_base = 4a', where: 'square base perimeter' }
      ],
      example: {
        question: 'a = 6 cm, h = 9 cm. Find volume.',
        steps: ['V = 1/3 x 6^2 x 9', 'V = 108 cm^3'],
        answer: 'V = 108 cm^3'
      },
      mistakes: ['Using slant height in place of vertical height for volume.'],
      deepDive: {
        simpleIdea: 'A square pyramid has a square base and one top point (apex). The side faces are triangles.',
        diagram: {
          type: 'square-pyramid-labeled',
          caption: 'Square pyramid parts: base side a, vertical height h, slant height l, apex A, and base center O.'
        },
        measurements: [
          {
            label: 'Volume',
            applicable: true,
            formula: 'V = 1/3 x a^2 x h',
            idea: 'Use base area a^2 and vertical height h.'
          },
          {
            label: 'Surface Area',
            applicable: true,
            formula: 'SA = a^2 + 2al',
            idea: 'Base area plus four triangular side faces.'
          },
          {
            label: 'Lateral Surface Area',
            applicable: true,
            formula: 'LSA = 2al',
            idea: 'Only side triangular faces, excluding the square base.'
          },
          {
            label: 'Perimeter',
            applicable: false,
            idea: 'Perimeter is for 2D boundaries; for this 3D shape use area and volume.'
          }
        ],
        angleFacts: [
          'A square pyramid has 5 faces, 8 edges, and 5 vertices.',
          'All base angles are 90 degrees because base is a square.',
          'Vertical height h is from apex straight down to base center.',
          'Slant height l runs from apex to midpoint of a base side.'
        ],
        speciality: [
          'It combines square and triangle geometry in one solid.',
          'Volume has factor 1/3 compared to prism with same base and height.',
          'Used widely in architecture and decorative structures.'
        ],
        funFacts: [
          'Ancient pyramids are close to square pyramid geometry.',
          'Many roof tops and caps use pyramid-like shapes.',
          'Pyramid forms are used in game graphics for low-poly models.'
        ],
        realLifeUseCases: [
          'Engineers use pyramid volume for stone, sand, and mound estimates.',
          'Surface area helps estimate material needed for pyramid roofs or covers.',
          'Architectural models use slant height for side panel cutting.',
          'Packaging design uses pyramid formulas for specialty boxes.',
          'Construction drawings use apex, center, and base dimensions for alignment.',
          '3D modeling and printing rely on these equations for scaling.'
        ],
        formulaMeaning: [
          {
            title: 'Why V = 1/3 x a^2 x h',
            formula: 'V = 1/3 x a^2 x h',
            steps: [
              'Base is a square of area a^2.',
              'A pyramid with same base and height has one-third of matching prism volume.',
              'So volume is one-third of base area times height.'
            ]
          },
          {
            title: 'Why SA = a^2 + 2al',
            formula: 'SA = a^2 + 2al',
            steps: [
              'Base area is a^2.',
              'Each side triangle area is 1/2 x a x l.',
              'There are 4 side triangles, so lateral area is 4 x 1/2 al = 2al.'
            ]
          },
          {
            title: 'Why LSA = 2al',
            formula: 'LSA = 2al',
            steps: [
              'Lateral surface means only side triangles.',
              'Each side triangle is 1/2 a l.',
              'Multiply by 4 side faces to get 2al.'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'Find volume',
            question: 'If a = 8 cm and h = 9 cm, find volume.',
            steps: [
              'Use V = 1/3 x a^2 x h.',
              'V = 1/3 x 8^2 x 9 = 1/3 x 64 x 9.',
              'V = 192 cm^3.'
            ],
            answer: '192 cm^3'
          },
          {
            title: 'Find lateral and total surface area',
            question: 'If a = 6 cm and l = 5 cm, find LSA and SA.',
            steps: [
              'LSA = 2al = 2 x 6 x 5 = 60 cm^2.',
              'Base area = a^2 = 36 cm^2.',
              'SA = LSA + base area = 60 + 36 = 96 cm^2.'
            ],
            answer: 'LSA = 60 cm^2, SA = 96 cm^2'
          },
          {
            title: 'Find height from volume',
            question: 'If V = 300 cm^3 and a = 10 cm, find h.',
            steps: [
              'Use 300 = 1/3 x 10^2 x h.',
              '300 = 100h/3.',
              'h = 9 cm.'
            ],
            answer: '9 cm'
          },
          {
            title: 'Find base side from SA',
            question: 'If a = 4 cm and l = 7 cm, find SA.',
            steps: [
              'SA = a^2 + 2al.',
              'SA = 4^2 + 2 x 4 x 7.',
              'SA = 16 + 56 = 72 cm^2.'
            ],
            answer: '72 cm^2'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'Find V if a=5 cm and h=12 cm.',
            hint: 'Use V = 1/3 x a^2 x h.',
            answer: '100 cm^3.'
          },
          {
            level: 'Easy',
            question: 'Find LSA if a=7 cm and l=4 cm.',
            hint: 'Use LSA = 2al.',
            answer: '56 cm^2.'
          },
          {
            level: 'Easy',
            question: 'Find base perimeter if a=9 cm.',
            hint: 'Use P_base = 4a.',
            answer: '36 cm.'
          },
          {
            level: 'Medium',
            question: 'If V=256 cm^3 and a=8 cm, find h.',
            hint: '256 = 1/3 x 64 x h.',
            answer: 'h = 12 cm.'
          },
          {
            level: 'Medium',
            question: 'If SA=117 cm^2 and a=9 cm, find l.',
            hint: 'Use SA = a^2 + 2al.',
            answer: 'l = 2 cm.'
          },
          {
            level: 'Medium',
            question: 'If a=10 cm and l=13 cm, find SA.',
            hint: 'Compute a^2 + 2al.',
            answer: '360 cm^2.'
          },
          {
            level: 'Hard',
            question: 'If base side doubles and height stays same, how does volume change?',
            hint: 'Volume depends on a^2h.',
            answer: 'Volume becomes 4 times.'
          },
          {
            level: 'Hard',
            question: 'If both base side and height double, how does volume change?',
            hint: 'Scale in a^2h.',
            answer: 'Volume becomes 8 times.'
          }
        ],
        practiceQa: [
          {
            question: 'How many faces in a square pyramid?',
            answer: '5 faces.'
          },
          {
            question: 'How many edges in a square pyramid?',
            answer: '8 edges.'
          },
          {
            question: 'How many vertices in a square pyramid?',
            answer: '5 vertices.'
          },
          {
            question: 'Volume formula of square pyramid?',
            answer: 'V = 1/3 x a^2 x h.'
          },
          {
            question: 'Lateral surface area formula?',
            answer: 'LSA = 2al.'
          },
          {
            question: 'Total surface area formula?',
            answer: 'SA = a^2 + 2al.'
          },
          {
            question: 'If a=6 and h=3, find V.',
            answer: '36 cm^3.'
          },
          {
            question: 'If a=6 and l=5, find LSA.',
            answer: '60 cm^2.'
          },
          {
            question: 'Is perimeter a main 3D measure for this shape?',
            answer: 'No, surface area and volume are the main measures.'
          },
          {
            question: 'Why are square pyramid equations useful?',
            answer: 'They help in architecture, roof design, and material estimation.'
          }
        ],
        examCorner: {
          shortcut: 'V = (1/3) x base^2 x h. SA = base^2 + 4 x (1/2 x base x slant height). Perpendicular height h is used for V; slant height l is used for SA.',
          trap: 'Slant height (l) and perpendicular height (h) are different. Exam diagrams label both — use h for volume, l for triangular face area in SA.',
          quickMethod: 'Mark h (vertical) and l (slant edge) from the diagram. Use h in V formula. Use l in SA triangle area formula.'
        }
      }
    },
    'triangular-pyramid': {
      file: 'selective-geometry-triangular-pyramid.html',
      name: 'Triangular Pyramid (Tetrahedron)',
      family: '3D Shape',
      overview: 'A pyramid with triangular base. A regular tetrahedron has 4 equal triangular faces.',
      properties: ['4 faces, 6 edges, 4 vertices.', 'Volume uses base area and perpendicular height.'],
      formulas: [
        { label: 'Volume (general)', formula: 'V = 1/3 x (base area) x h', where: 'h = perpendicular height from apex to base' },
        { label: 'Surface Area (general)', formula: 'SA = sum of 4 triangular face areas', where: 'add base and three side triangles' },
        { label: 'Regular Tetrahedron Surface Area', formula: 'SA = sqrt(3) x a^2', where: 'all edges equal to a' },
        { label: 'Regular Tetrahedron Volume', formula: 'V = a^3/(6sqrt(2))', where: 'all edges equal to a' }
      ],
      example: {
        question: 'Base triangle area = 18 cm^2 and h = 10 cm. Find volume.',
        steps: ['V = 1/3 x 18 x 10', 'V = 60 cm^3'],
        answer: 'V = 60 cm^3'
      },
      mistakes: ['Using prism formula instead of pyramid formula.'],
      deepDive: {
        simpleIdea: 'A triangular pyramid has a triangle base and one apex point. It is also called a tetrahedron when all faces are triangles.',
        diagram: {
          type: 'triangular-pyramid-labeled',
          caption: 'Triangular pyramid parts: base triangle, perpendicular height h, slant edge e, apex A, and base center O.'
        },
        measurements: [
          {
            label: 'Volume',
            applicable: true,
            formula: 'V = 1/3 x (base area) x h',
            idea: 'Use base triangle area and perpendicular height.'
          },
          {
            label: 'Surface Area',
            applicable: true,
            formula: 'SA = sum of 4 triangular face areas',
            idea: 'Add base triangle and three side triangles.'
          },
          {
            label: 'Perimeter',
            applicable: false,
            idea: 'Perimeter is a 2D concept. For this 3D shape use area and volume.'
          },
          {
            label: 'Regular Tetrahedron Volume',
            applicable: true,
            formula: 'V = a^3/(6sqrt(2))',
            idea: 'Shortcut only when all 6 edges are equal.'
          }
        ],
        angleFacts: [
          'A triangular pyramid has 4 faces, 6 edges, and 4 vertices.',
          'Each face is a triangle.',
          'In a regular tetrahedron, all edges and all face angles are equal.',
          'Perpendicular height is from apex to the base plane.'
        ],
        speciality: [
          'It is the simplest pyramid with triangular base.',
          'Regular tetrahedron is one of the five Platonic solids.',
          'Strong truss and frame designs often use triangular tetra frameworks.'
        ],
        funFacts: [
          'Molecular geometry of methane is tetrahedral.',
          'Some game dice (4-sided die) are tetrahedrons.',
          'Tetrahedral structures are used in lightweight engineering designs.'
        ],
        realLifeUseCases: [
          'Volume formulas are used in packaging and mold design for tetra-shaped containers.',
          'Architectural models use triangular pyramid geometry in roof caps and decorative tops.',
          'Chemistry and material science use tetrahedral shape understanding.',
          '3D graphics use tetra meshes in simulation and finite-element methods.',
          'Engineering uses tetrahedral partitions for structural analysis.',
          'Manufacturing uses surface area to estimate coating and material usage.'
        ],
        formulaMeaning: [
          {
            title: 'Why V = 1/3 x base area x h',
            formula: 'V = 1/3 x (base area) x h',
            steps: [
              'A pyramid with same base and height as a prism has one-third volume.',
              'Base area here is triangle area.',
              'Multiply base area and height, then divide by 3.'
            ]
          },
          {
            title: 'Why SA is sum of 4 triangle areas',
            formula: 'SA = A_base + A_side1 + A_side2 + A_side3',
            steps: [
              'Triangular pyramid has exactly 4 triangular faces.',
              'Each face area can be found with triangle formulas.',
              'Add all face areas for total surface area.'
            ]
          },
          {
            title: 'Regular tetrahedron shortcut',
            formula: 'V = a^3/(6sqrt(2)), SA = sqrt(3) x a^2',
            steps: [
              'These apply only if all edges are equal.',
              'Each face is an equilateral triangle.',
              'Known geometric derivations give the compact formulas.'
            ]
          }
        ],
        workedExamples: [
          {
            title: 'General volume',
            question: 'Base triangle area is 24 cm^2 and height h = 9 cm. Find volume.',
            steps: [
              'Use V = 1/3 x (base area) x h.',
              'V = 1/3 x 24 x 9.',
              'V = 72 cm^3.'
            ],
            answer: '72 cm^3'
          },
          {
            title: 'Surface area from face areas',
            question: 'Face areas are 15 cm^2, 12 cm^2, 12 cm^2, and 9 cm^2. Find SA.',
            steps: [
              'Add all 4 triangle areas.',
              'SA = 15 + 12 + 12 + 9.',
              'SA = 48 cm^2.'
            ],
            answer: '48 cm^2'
          },
          {
            title: 'Regular tetrahedron surface area',
            question: 'Regular tetrahedron edge a = 6 cm. Find SA.',
            steps: [
              'Use SA = sqrt(3) x a^2.',
              'SA = sqrt(3) x 36.',
              'SA = 36sqrt(3) cm^2.'
            ],
            answer: '36sqrt(3) cm^2'
          },
          {
            title: 'Regular tetrahedron volume',
            question: 'Regular tetrahedron edge a = 6 cm. Find volume.',
            steps: [
              'Use V = a^3/(6sqrt(2)).',
              'V = 6^3/(6sqrt(2)) = 216/(6sqrt(2)).',
              'V = 18sqrt(2) cm^3 (after rationalization).'
            ],
            answer: '18sqrt(2) cm^3'
          }
        ],
        tryOutProblems: [
          {
            level: 'Easy',
            question: 'Base area is 30 cm^2 and h = 6 cm. Find volume.',
            hint: 'Use V = 1/3 x base area x h.',
            answer: '60 cm^3.'
          },
          {
            level: 'Easy',
            question: 'How many faces does a triangular pyramid have?',
            hint: 'Count all triangular faces.',
            answer: '4 faces.'
          },
          {
            level: 'Easy',
            question: 'How many edges does it have?',
            hint: 'Count base edges and side edges.',
            answer: '6 edges.'
          },
          {
            level: 'Medium',
            question: 'If volume is 84 cm^3 and base area is 21 cm^2, find h.',
            hint: 'Rearrange V = 1/3 x B x h.',
            answer: 'h = 12 cm.'
          },
          {
            level: 'Medium',
            question: 'Face areas are 8, 9, 10, and 11 cm^2. Find SA.',
            hint: 'Add all face areas.',
            answer: '38 cm^2.'
          },
          {
            level: 'Medium',
            question: 'Regular tetrahedron with a = 4 cm. Find SA.',
            hint: 'Use SA = sqrt(3) x a^2.',
            answer: '16sqrt(3) cm^2.'
          },
          {
            level: 'Hard',
            question: 'If all linear dimensions double, how does volume change?',
            hint: 'Volume scales with cube of scale factor.',
            answer: 'Volume becomes 8 times.'
          },
          {
            level: 'Hard',
            question: 'If all linear dimensions double, how does surface area change?',
            hint: 'Area scales with square of scale factor.',
            answer: 'Surface area becomes 4 times.'
          }
        ],
        practiceQa: [
          {
            question: 'Faces, edges, vertices in triangular pyramid?',
            answer: '4 faces, 6 edges, 4 vertices.'
          },
          {
            question: 'General volume formula?',
            answer: 'V = 1/3 x (base area) x h.'
          },
          {
            question: 'General surface area idea?',
            answer: 'Add areas of all 4 triangular faces.'
          },
          {
            question: 'Regular tetrahedron SA formula?',
            answer: 'SA = sqrt(3) x a^2.'
          },
          {
            question: 'Regular tetrahedron volume formula?',
            answer: 'V = a^3/(6sqrt(2)).'
          },
          {
            question: 'If base area = 12 and h = 9, find volume.',
            answer: '36 cm^3.'
          },
          {
            question: 'If face areas are 6, 6, 7, and 7, find SA.',
            answer: '26 cm^2.'
          },
          {
            question: 'Is perimeter a main measure for this 3D shape?',
            answer: 'No, area and volume are main measures.'
          },
          {
            question: 'Why are tetrahedron equations useful?',
            answer: 'They are used in chemistry, engineering meshes, and 3D modeling.'
          },
          {
            question: 'What does h represent in volume formula?',
            answer: 'Perpendicular height from apex to base plane.'
          }
        ],
        examCorner: {
          shortcut: 'V = (1/3) x base triangle area x h. All pyramids divide by 3. SA = base triangle area + 3 triangular side areas.',
          trap: 'Using prism formula V = base area x h without dividing by 3 is the most common pyramid mistake. Every pyramid uses the (1/3) factor.',
          quickMethod: 'Calculate base triangle area first using A = (1/2) x b x h_triangle. Then V = (1/3) x that area x pyramid height.'
        }
      }
    }
  };
})();
