/* quiz.js : quiz interactif avec validation immédiate de chaque réponse */
window.LH = window.LH || {};

LH.quiz = {
  mount(container, course, module) {
    const { esc } = LH.utils;
    const questions = module.quiz || [];
    if (!questions.length) {
      container.innerHTML = `<p class="quiz-empty">Aucun quiz pour ce module.</p>`;
      return;
    }
    let answered = 0;
    let score = 0;

    const bestText = () => {
      const best = LH.store.bestQuiz(course.id, module.id);
      return best ? `Meilleur score : ${best.score}/${best.total}` : "Pas encore de score enregistré";
    };

    const render = () => {
      answered = 0; score = 0;
      container.innerHTML = `
        <div class="quiz-head">
          <h3 id="quiz-title-${esc(module.id)}">Quiz du module</h3>
          <p class="quiz-best" data-best>${bestText()}</p>
        </div>
        <ol class="quiz-list">
          ${questions.map((q, qi) => `
            <li class="quiz-question" data-q="${qi}">
              <fieldset>
                <legend>${esc(q.q)}</legend>
                <div class="quiz-options">
                  ${q.options.map((o, oi) => `
                    <button type="button" class="quiz-option" data-o="${oi}">${esc(o)}</button>`).join("")}
                </div>
                <p class="quiz-feedback" role="status" aria-live="polite"></p>
              </fieldset>
            </li>`).join("")}
        </ol>
        <div class="quiz-result" role="status" aria-live="polite" hidden></div>`;
    };

    const finish = () => {
      const best = LH.store.saveQuiz(course.id, module.id, score, questions.length);
      const result = container.querySelector(".quiz-result");
      const passed = score >= Math.ceil(questions.length / 2);
      result.hidden = false;
      result.className = `quiz-result ${passed ? "is-pass" : "is-fail"}`;
      result.innerHTML = `
        <strong>Score : ${score}/${questions.length}</strong>
        <span>${passed ? "Bravo, vous pouvez marquer ce module comme terminé." : "Relisez le module puis retentez le quiz."}</span>
        <button type="button" class="button button-small" data-retry>Recommencer le quiz</button>`;
      container.querySelector("[data-best]").textContent =
        `Meilleur score : ${best.score}/${best.total}`;
      result.querySelector("[data-retry]").addEventListener("click", () => {
        render();
        container.querySelector(".quiz-option").focus();
      });
    };

    container.addEventListener("click", (event) => {
      const button = event.target.closest(".quiz-option");
      if (!button || button.disabled) return;
      const item = button.closest(".quiz-question");
      const q = questions[Number(item.dataset.q)];
      const chosen = Number(button.dataset.o);
      const ok = chosen === q.answer;

      // Validation immédiate : on verrouille la question et on montre le résultat
      item.querySelectorAll(".quiz-option").forEach((b) => {
        b.disabled = true;
        if (Number(b.dataset.o) === q.answer) b.classList.add("is-correct");
      });
      if (!ok) button.classList.add("is-wrong");
      const feedback = item.querySelector(".quiz-feedback");
      feedback.className = `quiz-feedback ${ok ? "is-correct" : "is-wrong"}`;
      feedback.textContent = `${ok ? "✓ Bonne réponse. " : "✗ Mauvaise réponse. "}${q.explain || ""}`;

      answered += 1;
      if (ok) score += 1;
      if (answered === questions.length) finish();
    });

    render();
  },
};
