document.addEventListener('DOMContentLoaded', function () {
  function slugify(value) {
    return String(value || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  document.querySelectorAll('[data-slug-source]').forEach(function (source) {
    var target = document.getElementById(source.getAttribute('data-slug-source'));
    if (!target) {
      return;
    }

    var touched = target.value.trim() !== '';
    target.addEventListener('input', function () {
      touched = true;
      target.value = slugify(target.value);
    });

    source.addEventListener('input', function () {
      if (!touched || target.value.trim() === '') {
        target.value = slugify(source.value);
      }
    });
  });

  document.querySelectorAll('[data-topic-category-select]').forEach(function (select) {
    var form = select.closest('form') || document;
    var topicCards = Array.prototype.slice.call(form.querySelectorAll('[data-topic-category]'));
    var emptyState = form.querySelector('[data-topic-category-empty]');

    function filterTopicCards() {
      var selectedCategory = String(select.value || '');
      var visibleCount = 0;

      topicCards.forEach(function (card) {
        var isVisible = selectedCategory !== '' && String(card.getAttribute('data-topic-category')) === selectedCategory;
        var input = card.querySelector('[data-topic-count-input]');
        card.hidden = !isVisible;
        if (input) {
          input.disabled = !isVisible;
          if (!isVisible) {
            input.value = '0';
          }
        }
        if (isVisible) {
          visibleCount += 1;
        }
      });

      if (emptyState) {
        emptyState.hidden = visibleCount > 0;
        emptyState.textContent = selectedCategory === '' ? 'Select a category to view its topics.' : 'No topics are available for this category yet.';
      }
    }

    select.addEventListener('change', filterTopicCards);
    filterTopicCards();
  });

  document.querySelectorAll('[data-modal-target]').forEach(function (button) {
    button.addEventListener('click', function () {
      var modal = document.getElementById(button.getAttribute('data-modal-target'));
      if (modal) {
        modal.hidden = false;
      }
    });
  });

  document.querySelectorAll('[data-modal-close]').forEach(function (button) {
    button.addEventListener('click', function () {
      var modal = button.closest('.modal-backdrop');
      if (modal) {
        modal.hidden = true;
      }
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(function (modal) {
    modal.addEventListener('click', function (event) {
      if (event.target === modal) {
        modal.hidden = true;
      }
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') {
      return;
    }
    document.querySelectorAll('.modal-backdrop:not([hidden])').forEach(function (modal) {
      modal.hidden = true;
    });
  });

  document.querySelectorAll('[data-admin-filter]').forEach(function (button) {
    button.addEventListener('click', function () {
      var filter = button.getAttribute('data-admin-filter') || 'all';
      document.querySelectorAll('[data-admin-filter]').forEach(function (item) {
        item.classList.toggle('is-active', item === button);
      });
      document.querySelectorAll('[data-admin-attempt-row]').forEach(function (row) {
        var status = row.getAttribute('data-admin-attempt-row') || '';
        row.hidden = filter !== 'all' && status !== filter;
      });
    });
  });

  document.querySelectorAll('[data-admin-toggle]').forEach(function (button) {
    button.addEventListener('click', function () {
      var row = button.closest('[data-admin-category-row]');
      if (row) {
        row.classList.toggle('is-open');
      }
    });
  });

  function readChartData(element) {
    try {
      return JSON.parse(element.getAttribute('data-chart') || '[]');
    } catch (error) {
      return [];
    }
  }

  function renderTrendChart(mode) {
    var chart = document.querySelector('[data-admin-trend-chart]');
    if (!chart) {
      return;
    }

    var data = readChartData(chart);
    var tooltip = chart.querySelector('[data-admin-chart-tooltip]');
    var width = 760;
    var height = 300;
    var padX = 42;
    var padTop = 24;
    var padBottom = 42;
    var plotWidth = width - padX * 2;
    var plotHeight = height - padTop - padBottom;
    var values = data.map(function (item) {
      return Number(item[mode]) || 0;
    });
    var maxValue = Math.max(1, Math.max.apply(Math, values));
    var points = data.map(function (item, index) {
      var x = padX + (data.length <= 1 ? 0 : (plotWidth / (data.length - 1)) * index);
      var y = padTop + plotHeight - ((Number(item[mode]) || 0) / maxValue) * plotHeight;
      return { x: x, y: y, item: item };
    });
    var linePoints = points.map(function (point) {
      return point.x + ',' + point.y;
    }).join(' ');
    var areaPoints = padX + ',' + (padTop + plotHeight) + ' ' + linePoints + ' ' + (padX + plotWidth) + ',' + (padTop + plotHeight);

    chart.querySelectorAll('svg').forEach(function (svg) {
      svg.remove();
    });

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Admin performance trend chart');

    [0, 0.25, 0.5, 0.75, 1].forEach(function (step) {
      var y = padTop + plotHeight * step;
      var grid = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      grid.setAttribute('x1', padX);
      grid.setAttribute('x2', padX + plotWidth);
      grid.setAttribute('y1', y);
      grid.setAttribute('y2', y);
      grid.setAttribute('class', 'admin-chart-grid-line');
      svg.appendChild(grid);
    });

    var area = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    area.setAttribute('points', areaPoints);
    area.setAttribute('class', 'admin-chart-area');
    svg.appendChild(area);

    var polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('points', linePoints);
    polyline.setAttribute('class', 'admin-chart-line');
    svg.appendChild(polyline);

    points.forEach(function (point, index) {
      var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      group.setAttribute('class', 'admin-chart-point');
      group.setAttribute('tabindex', '0');

      var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', point.x);
      circle.setAttribute('cy', point.y);
      circle.setAttribute('r', 5);
      group.appendChild(circle);

      if (index % 2 === 0 || index === points.length - 1) {
        var label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', point.x);
        label.setAttribute('y', height - 12);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('class', 'admin-chart-label');
        label.textContent = point.item.label;
        svg.appendChild(label);
      }

      function showTooltip() {
        if (!tooltip) {
          return;
        }
        tooltip.hidden = false;
        tooltip.style.left = Math.min(82, Math.max(8, (point.x / width) * 100)) + '%';
        tooltip.style.top = Math.max(8, ((point.y - 46) / height) * 100) + '%';
        tooltip.innerHTML = '<strong>' + point.item.label + '</strong><span>' + point.item[mode] + ' ' + mode.replace(/([A-Z])/g, ' $1').toLowerCase() + '</span>';
      }

      group.addEventListener('mouseenter', showTooltip);
      group.addEventListener('focus', showTooltip);
      group.addEventListener('mouseleave', function () {
        if (tooltip) {
          tooltip.hidden = true;
        }
      });
      group.addEventListener('blur', function () {
        if (tooltip) {
          tooltip.hidden = true;
        }
      });

      svg.appendChild(group);
    });

    chart.appendChild(svg);
  }

  function renderCategoryChart(mode) {
    var chart = document.querySelector('[data-admin-category-chart]');
    if (!chart) {
      return;
    }

    var data = readChartData(chart);
    var maxValue = data.reduce(function (max, item) {
      return Math.max(max, Number(item[mode]) || 0);
    }, 1);

    chart.innerHTML = '';
    data.forEach(function (item) {
      var value = Number(item[mode]) || 0;
      var width = Math.max(4, Math.round((value / maxValue) * 100));
      var row = document.createElement('article');
      row.className = 'admin-category-chart-row';
      row.innerHTML = '<div><strong></strong><span></span></div><div class="admin-category-chart-track"><span style="width: ' + width + '%;"></span></div><b>' + value + '</b>';
      row.querySelector('strong').textContent = item.name;
      row.querySelector('span').textContent = mode === 'examSets' ? 'Exam sets' : mode.charAt(0).toUpperCase() + mode.slice(1);
      chart.appendChild(row);
    });
  }

  document.querySelectorAll('[data-admin-chart-mode]').forEach(function (button) {
    button.addEventListener('click', function () {
      document.querySelectorAll('[data-admin-chart-mode]').forEach(function (item) {
        item.classList.toggle('is-active', item === button);
      });
      renderTrendChart(button.getAttribute('data-admin-chart-mode') || 'attempts');
    });
  });

  document.querySelectorAll('[data-admin-category-chart-mode]').forEach(function (button) {
    button.addEventListener('click', function () {
      document.querySelectorAll('[data-admin-category-chart-mode]').forEach(function (item) {
        item.classList.toggle('is-active', item === button);
      });
      renderCategoryChart(button.getAttribute('data-admin-category-chart-mode') || 'questions');
    });
  });

  renderTrendChart('attempts');
  renderCategoryChart('questions');

  if (!window.examConfig) {
    return;
  }

  var form = document.getElementById('examForm');
  var hiddenInput = document.getElementById('answersJson');
  var panes = Array.prototype.slice.call(document.querySelectorAll('.question-pane'));
  var paletteButtons = Array.prototype.slice.call(document.querySelectorAll('.palette-btn'));
  var prevBtn = document.getElementById('prevQuestionBtn');
  var nextBtn = document.getElementById('nextQuestionBtn');
  var submitBtn = document.getElementById('submitExamBtn');
  var timerEl = document.getElementById('examTimer');
  var storageKey = 'kids_exam_answers_' + window.examConfig.examId;
  var currentIndex = 0;
  var answers = {};

  function readSavedAnswers() {
    var initial = window.examConfig.initialAnswers || {};
    try {
      var saved = localStorage.getItem(storageKey);
      if (saved) {
        var parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      }
    } catch (error) {
      return initial;
    }
    return initial;
  }

  answers = readSavedAnswers();

  function persistAnswers() {
    if (hiddenInput) {
      hiddenInput.value = JSON.stringify(answers);
    }
    try {
      localStorage.setItem(storageKey, JSON.stringify(answers));
    } catch (error) {
      // Ignore localStorage write errors.
    }
  }

  function clearSavedAnswers() {
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      // Ignore localStorage removal errors.
    }
  }

  function updatePalette() {
    paletteButtons.forEach(function (button) {
      var index = Number(button.getAttribute('data-index'));
      var questionId = String(button.getAttribute('data-question-id'));
      button.classList.toggle('is-active', index === currentIndex);
      button.classList.toggle('is-answered', !!answers[questionId]);
    });
  }

  function showQuestion(index) {
    currentIndex = Math.max(0, Math.min(index, panes.length - 1));
    panes.forEach(function (pane, paneIndex) {
      pane.classList.toggle('is-active', paneIndex === currentIndex);
    });
    if (prevBtn) {
      prevBtn.disabled = currentIndex === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = currentIndex === panes.length - 1;
    }
    updatePalette();
  }

  function markSelectedOptions() {
    panes.forEach(function (pane) {
      var questionId = String(pane.getAttribute('data-question-id'));
      var selected = answers[questionId] || '';
      var inputs = pane.querySelectorAll('input[type="radio"]');
      inputs.forEach(function (input) {
        input.checked = input.value === selected;
      });
    });
  }

  paletteButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      showQuestion(Number(button.getAttribute('data-index')));
    });
  });

  panes.forEach(function (pane) {
    var questionId = String(pane.getAttribute('data-question-id'));
    pane.querySelectorAll('input[type="radio"]').forEach(function (input) {
      input.addEventListener('change', function () {
        answers[questionId] = input.value;
        persistAnswers();
        updatePalette();
      });
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      showQuestion(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      showQuestion(currentIndex + 1);
    });
  }

  if (form) {
    form.addEventListener('submit', function () {
      persistAnswers();
      clearSavedAnswers();
    });
  }

  function renderTimer() {
    if (!timerEl || typeof window.examConfig.remainingSeconds === 'undefined') {
      return;
    }

    var remaining = Math.max(0, Number(window.examConfig.remainingSeconds) || 0);

    function updateTimer() {
      var minutes = Math.floor(remaining / 60);
      var seconds = remaining % 60;
      timerEl.textContent = String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');

      if (remaining <= 0) {
        clearInterval(window.__kidsExamTimer);
        if (form) {
          persistAnswers();
          form.submit();
        }
        return;
      }

      remaining -= 1;
    }

    updateTimer();
    window.__kidsExamTimer = setInterval(updateTimer, 1000);
  }

  markSelectedOptions();
  persistAnswers();
  showQuestion(0);
  renderTimer();
});
