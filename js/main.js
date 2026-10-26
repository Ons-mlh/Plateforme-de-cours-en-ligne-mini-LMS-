/* main.js : application LearnHub (SPA simplifiée)
   - routage par hash (#/, #/course/:id/:module, #/admin) : aucun rechargement de page
   - suivi de progression, sauvegarde de position, quiz, lecteur vidéo, administration */
(() => {
  const { esc } = LH.utils;
  const app = document.getElementById("app");
  const announcer = document.getElementById("announcer");
  let cleanup = null; // nettoyage de la vue précédente (scroll, vidéo…)
  let adminNotice = "";

  /* ------------------------------ Menu mobile ------------------------------ */
  function setupMenu() {
    const button = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".site-nav");
    const setState = (open) => {
      nav.classList.toggle("is-open", open);
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute(
        "aria-label",
        open ? "Fermer le menu" : "Ouvrir le menu",
      );
    };
    button.addEventListener("click", () =>
      setState(button.getAttribute("aria-expanded") !== "true"),
    );
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) setState(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setState(false);
    });
    document.addEventListener("click", (e) => {
      if (
        nav.classList.contains("is-open") &&
        !nav.contains(e.target) &&
        !button.contains(e.target)
      )
        setState(false);
    });
  }

  /* ------------------------------ Utilitaires ------------------------------ */
  const progressBar = (pct, label, extra = "") => `
    <div class="progress ${extra}" role="progressbar" aria-label="${esc(label)}"
      aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><span style="width:${pct}%"></span></div>`;

  const announce = (text) => {
    announcer.textContent = "";
    setTimeout(() => {
      announcer.textContent = text;
    }, 50);
  };

  const finishRender = (title, focusSelector = "#page-title") => {
    document.title = `LearnHub - ${title.replace(/<[^>]+>|&[a-z#0-9]+;/g, "")}`;
    const heading = app.querySelector(focusSelector);
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
    announce(`Page : ${document.title.replace("LearnHub - ", "")}`);
  };

  const scrollInstant = (top) => window.scrollTo({ top, behavior: "instant" });

  /* -------------------------------- Accueil -------------------------------- */
  function renderHome(target) {
    const courses = LH.store.allCourses();
    const pos = LH.store.readPosition();
    const resumeCourse = pos && LH.store.findCourse(pos.courseId);
    const resumeModule =
      resumeCourse && resumeCourse.modules.find((m) => m.id === pos.moduleId);

    app.innerHTML = `
      <section class="hero" aria-labelledby="page-title">
        <div class="container hero-content">
          <p class="eyebrow">Votre apprentissage, votre rythme</p>
          <h1 id="page-title">Développez vos compétences numériques avec LearnHub</h1>
          <p class="hero-description">Apprenez les technologies du web grâce à des cours clairs, progressifs et accessibles à tous.</p>
          <a class="button" href="#/cours">Commencer</a>
        </div>
      </section>
      ${
        resumeModule
          ? `
      <section class="container resume" aria-label="Reprendre votre cours">
        <div class="resume-card">
          <div>
            <p class="eyebrow">Reprendre où vous vous êtes arrêté</p>
            <p><strong>${resumeCourse.title}</strong> · ${resumeModule.title}</p>
          </div>
          <a class="button" href="#/course/${esc(resumeCourse.id)}">Reprendre</a>
        </div>
      </section>`
          : ""
      }
      <section class="courses-section container" id="cours" aria-labelledby="courses-title">
        <div class="section-heading">
          <p class="eyebrow">Apprendre en pratique</p>
          <h2 id="courses-title">Nos cours</h2>
          <p>Choisissez un parcours et avancez étape par étape vers vos objectifs.</p>
        </div>
        ${
          courses.length
            ? `<div class="course-grid">
          ${courses
            .map((c) => {
              const pct = LH.store.percent(c);
              const done = LH.store.completed(c.id).length;
              return `
            <article class="course-card card">
              <div class="course-image" role="img" aria-label="Illustration du cours ${esc(c.label)}">${esc(c.label)}</div>
              <div class="course-card-content">
                <h3>${c.title}</h3>
                <p>${c.short}</p>
                <dl class="course-details">
                  <div><dt>Modules</dt><dd>${c.modules.length} modules</dd></div>
                  <div><dt>Niveau</dt><dd>${esc(c.level)}</dd></div>
                </dl>
                <div class="progress-label"><span>Progression · ${Math.min(done, c.modules.length)}/${c.modules.length}</span><strong>${pct}%</strong></div>
                ${progressBar(pct, `Progression du cours ${c.title.replace(/<[^>]+>/g, "")}`)}
                <a class="course-link" href="#/course/${esc(c.id)}">${pct > 0 || (pos && pos.courseId === c.id) ? "Continuer le cours" : "Voir le cours"} <span aria-hidden="true">→</span></a>
              </div>
            </article>`;
            })
            .join("")}
        </div>`
            : `<p class="empty">Aucun cours disponible. <a href="#/admin">Ajoutez-en un</a>.</p>`
        }
      </section>
      <section class="why-section container" aria-labelledby="why-title">
        <div class="section-heading"><p class="eyebrow">Une méthode simple</p><h2 id="why-title">Pourquoi LearnHub ?</h2></div>
        <div class="features-grid">
          <article class="feature"><span class="feature-icon" aria-hidden="true">01</span><h3>Apprenez à votre rythme</h3><p>Accédez aux leçons quand vous le souhaitez : votre position est sauvegardée automatiquement.</p></article>
          <article class="feature"><span class="feature-icon" aria-hidden="true">02</span><h3>Des contenus pratiques</h3><p>Consolidez vos connaissances avec des vidéos, des exemples de code et des quiz corrigés immédiatement.</p></article>
          <article class="feature"><span class="feature-icon" aria-hidden="true">03</span><h3>Suivez vos progrès</h3><p>Visualisez votre avancement en pourcentage et cochez les modules terminés.</p></article>
        </div>
      </section>
      <section class="cta-section container" aria-labelledby="cta-title">
        <div class="cta-content">
          <h2 id="cta-title">Prêt à commencer votre parcours ?</h2>
          <p>Faites le premier pas et développez une nouvelle compétence dès aujourd'hui.</p>
          <a class="button button-light" href="#/cours">Explorer les cours</a>
        </div>
      </section>`;

    finishRender("Accueil");
    if (target === "cours") document.getElementById("cours").scrollIntoView();
    else if (target === "contact")
      document.getElementById("contact").scrollIntoView();
    else scrollInstant(0);
  }

  /* Page de cours */
  function renderCourse(courseId, moduleId) {
    const course = LH.store.findCourse(courseId);
    if (!course)
      return renderNotFound("Ce cours n'existe pas ou a été supprimé.");
    if (!course.modules.length)
      return renderNotFound("Ce cours ne contient aucun module.");

    // Reprise automatique : sans module dans l'URL, on revient à la position sauvegardée
    const saved = LH.store.readPosition();
    let startIndex = course.modules.findIndex((m) => m.id === moduleId);
    let restoreScroll = null;
    if (startIndex === -1) {
      const idx =
        saved && saved.courseId === course.id
          ? course.modules.findIndex((m) => m.id === saved.moduleId)
          : -1;
      startIndex = idx === -1 ? 0 : idx;
      if (idx !== -1) restoreScroll = saved.scroll;
    }
    let index = startIndex;

    app.innerHTML = `
      <div class="course-page">
        <div class="container">
          <header class="course-header">
            <p class="eyebrow">${esc(course.eyebrow || "Parcours")}</p>
            <h1 id="page-title">${course.title}</h1>
            <p>${course.intro}</p>
            <div class="progress-label"><span>Progression globale</span><strong data-pct>0%</strong></div>
            <div data-global></div>
            <p class="save-note" data-save aria-live="off"></p>
          </header>
          <div class="course-layout">
            <aside class="module-sidebar" aria-label="Plan du cours">
              <details open>
                <summary>Checklist des modules <span data-count></span></summary>
                <nav aria-label="Navigation des modules"><ol class="module-list" data-list></ol></nav>
              </details>
            </aside>
            <section class="modules-content" aria-label="Contenu du module" data-content></section>
          </div>
        </div>
      </div>`;

    const listEl = app.querySelector("[data-list]");
    const contentEl = app.querySelector("[data-content]");
    const pctEl = app.querySelector("[data-pct]");
    const globalEl = app.querySelector("[data-global]");
    const saveEl = app.querySelector("[data-save]");
    const countEl = app.querySelector("[data-count]");

    const plainTitle = course.title.replace(/<[^>]+>|&[a-z#0-9]+;/g, "");

    const updateProgress = () => {
      const pct = LH.store.percent(course);
      const done = course.modules.filter((m) =>
        LH.store.isDone(course.id, m.id),
      ).length;
      pctEl.textContent = `${pct}%`;
      globalEl.innerHTML = progressBar(
        pct,
        `Progression globale du cours ${plainTitle}`,
        "progress-global",
      );
      countEl.textContent = `${done}/${course.modules.length} terminés`;
      listEl.querySelectorAll("li").forEach((li, i) => {
        const isDone = LH.store.isDone(course.id, course.modules[i].id);
        li.classList.toggle("is-done", isDone);
        li.querySelector("input").checked = isDone;
      });
    };

    listEl.innerHTML = course.modules
      .map(
        (m, i) => `
      <li>
        <input class="module-checkbox" type="checkbox" id="chk-${i}" data-i="${i}"
          aria-label="Module ${i + 1} terminé : ${esc(m.title.replace(/<[^>]+>|&[a-z#0-9]+;/g, ""))}">
        <a href="#/course/${esc(course.id)}/${esc(m.id)}" data-i="${i}">
          <span class="module-badge">${String(i + 1).padStart(2, "0")}</span>
          <span class="module-title">${m.title}</span>
        </a>
      </li>`,
      )
      .join("");

    const showModule = (i, { scroll = true } = {}) => {
      index = Math.min(Math.max(i, 0), course.modules.length - 1);
      const m = course.modules[index];
      const done = LH.store.isDone(course.id, m.id);
      listEl.querySelectorAll("a").forEach((a, ai) => {
        a.classList.toggle("is-active", ai === index);
        ai === index
          ? a.setAttribute("aria-current", "step")
          : a.removeAttribute("aria-current");
      });
      const prev = course.modules[index - 1];
      const next = course.modules[index + 1];
      contentEl.innerHTML = `
        <article class="lesson card ${done ? "is-complete" : ""}" id="${esc(m.id)}">
          <p class="lesson-number">Module ${String(index + 1).padStart(2, "0")} sur ${String(course.modules.length).padStart(2, "0")}</p>
          <h2 tabindex="-1">${m.title}</h2>
          <p>${m.text}</p>
          ${m.image ? `<img src="${esc(m.image)}" alt="${esc(m.imageAlt)}">` : ""}
          ${m.code ? `<pre><code>${esc(m.code)}</code></pre>` : ""}
          <div class="player" data-player></div>
          <div class="quiz" data-quiz aria-labelledby="quiz-title-${esc(m.id)}"></div>
          <div class="lesson-actions">
            ${prev ? `<a class="previous-link" href="#/course/${esc(course.id)}/${esc(prev.id)}">← Précédent</a>` : `<span></span>`}
            <button class="button ${done ? "button-done" : ""}" type="button" data-done aria-pressed="${done}">
              ${done ? "Module terminé ✓" : "Marquer comme terminé"}</button>
            ${
              next
                ? `<a class="next-link" href="#/course/${esc(course.id)}/${esc(next.id)}">Suivant : ${next.title} →</a>`
                : `<a class="next-link" href="#/cours">Retour aux cours →</a>`
            }
          </div>
        </article>`;

      LH.player.mount(contentEl.querySelector("[data-player]"), {
        courseId: course.id,
        moduleId: m.id,
        videoId: m.video,
        title: m.videoTitle || `Vidéo : ${m.title}`,
      });
      LH.quiz.mount(contentEl.querySelector("[data-quiz]"), course, m);

      contentEl.querySelector("[data-done]").addEventListener("click", (e) => {
        const nowDone = !LH.store.isDone(course.id, m.id);
        LH.store.setDone(course.id, m.id, nowDone);
        e.currentTarget.textContent = nowDone
          ? "Module terminé ✓"
          : "Marquer comme terminé";
        e.currentTarget.classList.toggle("button-done", nowDone);
        e.currentTarget.setAttribute("aria-pressed", String(nowDone));
        contentEl
          .querySelector(".lesson")
          .classList.toggle("is-complete", nowDone);
        updateProgress();
      });

      LH.store.savePosition(course.id, m.id, 0);
      saveEl.textContent = "Position enregistrée automatiquement.";
      history.replaceState(null, "", `#/course/${course.id}/${m.id}`);
      document.title = `LearnHub - ${plainTitle} · ${m.title.replace(/<[^>]+>|&[a-z#0-9]+;/g, "")}`;
      if (scroll) {
        const top = contentEl.getBoundingClientRect().top + window.scrollY - 16;
        window.scrollTo({ top, behavior: "smooth" });
        contentEl.querySelector("h2").focus({ preventScroll: true });
      }
    };

    // Navigation latérale sans rechargement
    listEl.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      e.preventDefault();
      showModule(Number(a.dataset.i));
    });
    contentEl.addEventListener("click", (e) => {
      const link = e.target.closest(".previous-link, .next-link");
      if (!link || !link.hash.startsWith("#/course/")) return;
      e.preventDefault();
      const target = link.hash.split("/").pop();
      showModule(course.modules.findIndex((m) => m.id === target));
    });
    // Checklist : cocher/décocher un module
    listEl.addEventListener("change", (e) => {
      const box = e.target.closest(".module-checkbox");
      if (!box) return;
      const m = course.modules[Number(box.dataset.i)];
      LH.store.setDone(course.id, m.id, box.checked);
      updateProgress();
      if (Number(box.dataset.i) === index) showModule(index, { scroll: false });
    });

    updateProgress();
    showModule(startIndex, { scroll: false });
    document.title = `LearnHub - ${plainTitle}`;
    announce(`Cours ${plainTitle}`);
    if (restoreScroll !== null) scrollInstant(restoreScroll);
    else scrollInstant(0);

    // Sauvegarde automatique de la position de défilement
    const onScroll = LH.utils.throttle(() => {
      LH.store.savePosition(
        course.id,
        course.modules[index].id,
        window.scrollY,
      );
    }, 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanup = () => {
      LH.store.savePosition(
        course.id,
        course.modules[index].id,
        window.scrollY,
      );
      window.removeEventListener("scroll", onScroll);
      LH.player.destroy();
    };
  }

  /* Admin / 404 */
  function renderAdmin() {
    app.innerHTML = `<div class="course-page">${LH.admin.render()}</div>`;
    if (adminNotice) {
      app.querySelector("#admin-msg").textContent = adminNotice;
      adminNotice = "";
    }
    LH.admin.mount(app, (notice) => {
      adminNotice = notice;
      renderAdmin();
    });
    finishRender("Administration");
    scrollInstant(0);
  }

  function renderNotFound(message = "Cette page n'existe pas.") {
    app.innerHTML = `
      <div class="course-page"><div class="container">
        <header class="course-header">
          <h1 id="page-title">Page introuvable</h1>
          <p>${esc(message)}</p>
          <a class="button" href="#/">Retour à l'accueil</a>
        </header>
      </div></div>`;
    finishRender("Page introuvable");
  }

  /* Routeur */
  function route() {
    if (cleanup) {
      cleanup();
      cleanup = null;
    }
    const parts = location.hash
      .replace(/^#\/?/, "")
      .split("/")
      .filter(Boolean)
      .map(decodeURIComponent);
    const [view, a, b] = parts;
    document.querySelectorAll(".site-nav a").forEach((link) => {
      const target = link.dataset.route;
      const active =
        (target === "home" && !view) ||
        (target === "cours" && (view === "cours" || view === "course")) ||
        target === view;
      active
        ? link.setAttribute("aria-current", "page")
        : link.removeAttribute("aria-current");
    });
    if (!view) return renderHome("");
    if (view === "cours" || view === "contact") return renderHome(view);
    if (view === "course" && a) return renderCourse(a, b);
    if (view === "admin") return renderAdmin();
    return renderNotFound();
  }

  window.addEventListener("hashchange", route);
  window.addEventListener("pagehide", () => {
    if (cleanup) cleanup();
  });
  document.addEventListener("DOMContentLoaded", () => {
    setupMenu();
    route();
  });
})();
