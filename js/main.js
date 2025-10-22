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

    const wheelToggles = document.querySelectorAll('.wheel-toggle');
    wheelToggles.forEach(function (toggle) {
      const navId = toggle.getAttribute('aria-controls');
      const navEl = navId ? document.getElementById(navId) : null;
      if (!navEl) {
        return;
      }
      toggle.addEventListener('click', function () {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        if (!expanded) {
          navEl.style.display = 'grid';
        } else {
          navEl.style.display = 'none';
        }
      });
    });
  });
})();
