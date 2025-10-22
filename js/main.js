(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    const cycleContainer = document.querySelector('[data-question-cycle]');
    if (cycleContainer) {
      const questionList = Array.from(document.querySelectorAll('#askQuestionList span'));
      const questionDisplay = document.getElementById('askQuestion');
      const counterDisplay = document.getElementById('askCounter');
      let currentIndex = 0;

      function renderQuestion() {
        if (!questionDisplay || questionList.length === 0) {
          return;
        }
        const currentQuestion = questionList[currentIndex];
        questionDisplay.textContent = currentQuestion ? currentQuestion.textContent : '';
        if (counterDisplay) {
          counterDisplay.textContent = `Question ${currentIndex + 1} of ${questionList.length}`;
        }
      }

      cycleContainer.addEventListener('click', function (event) {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
          return;
        }
        const action = target.getAttribute('data-action');
        if (!action) {
          return;
        }
        event.preventDefault();
        if (action === 'next') {
          currentIndex = (currentIndex + 1) % questionList.length;
        } else if (action === 'prev') {
          currentIndex = (currentIndex - 1 + questionList.length) % questionList.length;
        }
        renderQuestion();
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowRight') {
          currentIndex = (currentIndex + 1) % questionList.length;
          renderQuestion();
        } else if (event.key === 'ArrowLeft') {
          currentIndex = (currentIndex - 1 + questionList.length) % questionList.length;
          renderQuestion();
        }
      });

      renderQuestion();
    }

    const collapseClass = 'is-collapsed';
    const wheelToggles = document.querySelectorAll('.wheel-toggle');
    const togglePairs = [];

    function setExpandedState(toggle, navEl, shouldExpand) {
      toggle.setAttribute('aria-expanded', shouldExpand ? 'true' : 'false');
      if (shouldExpand) {
        navEl.classList.remove(collapseClass);
        navEl.style.removeProperty('display');
      } else {
        navEl.classList.add(collapseClass);
      }
    }

    wheelToggles.forEach(function (toggle) {
      const navId = toggle.getAttribute('aria-controls');
      const navEl = navId ? document.getElementById(navId) : null;
      if (!navEl) {
        return;
      }

      togglePairs.push({ toggle: toggle, navEl: navEl });

      toggle.addEventListener('click', function () {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        setExpandedState(toggle, navEl, !expanded);
      });

      const initialExpanded = toggle.getAttribute('aria-expanded') !== 'false';
      setExpandedState(toggle, navEl, initialExpanded);
    });

    if (togglePairs.length > 0) {
      const mobileQuery = window.matchMedia('(max-width: 640px)');
      const handleBreakpointChange = function (event) {
        if (!event.matches) {
          togglePairs.forEach(function (pair) {
            setExpandedState(pair.toggle, pair.navEl, true);
          });
        }
      };

      handleBreakpointChange(mobileQuery);

      if (typeof mobileQuery.addEventListener === 'function') {
        mobileQuery.addEventListener('change', handleBreakpointChange);
      } else if (typeof mobileQuery.addListener === 'function') {
        mobileQuery.addListener(handleBreakpointChange);
      }
    }
  });
})();
