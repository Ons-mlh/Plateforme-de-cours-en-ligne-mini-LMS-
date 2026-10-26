/* admin.js : interface d'administration simplifiée (ajout / suppression de cours) */
window.LH = window.LH || {};

LH.admin = {
  render() {
    const { esc } = LH.utils;
    const courses = LH.store.allCourses();
    const hiddenCount = LH.store.hiddenIds().length;
    return `
      <div class="container admin-page">
        <header class="course-header">
          <p class="eyebrow">Administration</p>
          <h1 id="page-title" tabindex="-1">Gérer les cours</h1>
          <p>Ajoutez ou supprimez des cours. Les changements sont enregistrés dans votre navigateur (localStorage).</p>
        </header>
        <div class="admin-layout">
          <section class="card" aria-labelledby="admin-add-title">
            <h2 id="admin-add-title">Ajouter un cours</h2>
            <form id="admin-form" novalidate>
              <div class="field">
                <label for="a-title">Titre du cours</label>
                <input id="a-title" name="title" type="text" required minlength="3" maxlength="80" autocomplete="off">
                <p class="field-error" id="e-title" role="alert"></p>
              </div>
              <div class="field">
                <label for="a-desc">Description courte</label>
                <textarea id="a-desc" name="desc" rows="2" maxlength="200"></textarea>
              </div>
              <div class="field">
                <label for="a-level">Niveau</label>
                <select id="a-level" name="level">
                  <option>Débutant</option><option>Intermédiaire</option><option>Avancé</option>
                </select>
              </div>
              <div class="field">
                <label for="a-modules">Modules (un par ligne)</label>
                <textarea id="a-modules" name="modules" rows="5" required
                  placeholder="Titre | Texte du module | Lien YouTube (facultatif)"></textarea>
                <p class="field-hint">Format : <code>Titre | Texte | Lien YouTube</code>. Seul le titre est obligatoire.</p>
                <p class="field-error" id="e-modules" role="alert"></p>
              </div>
              <button class="button" type="submit">Ajouter le cours</button>
              <p class="admin-message" id="admin-msg" role="status" aria-live="polite"></p>
            </form>
          </section>
          <section class="card" aria-labelledby="admin-list-title">
            <h2 id="admin-list-title">Cours existants (${courses.length})</h2>
            ${courses.length ? `<ul class="admin-list">
              ${courses.map((c) => `
                <li>
                  <div>
                    <strong>${esc(c.title)}</strong>
                    <span>${c.modules.length} module${c.modules.length > 1 ? "s" : ""} · ${esc(c.level)}${c.custom ? " · ajouté" : ""}</span>
                  </div>
                  <button type="button" class="button button-danger button-small" data-delete="${esc(c.id)}"
                    aria-label="Supprimer le cours ${esc(c.title)}">Supprimer</button>
                </li>`).join("")}
            </ul>` : `<p>Aucun cours. Ajoutez-en un avec le formulaire.</p>`}
            ${hiddenCount ? `<button type="button" class="button button-outline button-small" data-restore>
              Restaurer les cours intégrés supprimés (${hiddenCount})</button>` : ""}
          </section>
        </div>
      </div>`;
  },

  mount(root, refresh) {
    const form = root.querySelector("#admin-form");
    const msg = root.querySelector("#admin-msg");
    const { esc, slug, youtubeId } = LH.utils;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const title = String(data.get("title")).trim();
      const lines = String(data.get("modules")).split("\n").map((l) => l.trim()).filter(Boolean);
      root.querySelector("#e-title").textContent = title.length < 3 ? "Saisissez un titre d'au moins 3 caractères." : "";
      root.querySelector("#e-modules").textContent = lines.length ? "" : "Ajoutez au moins un module.";
      if (title.length < 3 || !lines.length) {
        (title.length < 3 ? form.title : form.modules).focus();
        return;
      }
      const id = `${slug(title)}-${Date.now().toString(36)}`;
      const modules = lines.map((line, i) => {
        const [mTitle, mText = "", mVideo = ""] = line.split("|").map((p) => p.trim());
        return {
          id: `module-${i + 1}`, title: esc(mTitle || `Module ${i + 1}`), text: esc(mText),
          image: "", imageAlt: "", code: "", video: youtubeId(mVideo), videoTitle: `Vidéo du module ${i + 1}`, quiz: [],
        };
      });
      const course = {
        id, custom: true, title: esc(title), label: title.slice(0, 3).toUpperCase(),
        level: String(data.get("level")), eyebrow: "Nouveau parcours",
        short: esc(String(data.get("desc")).trim() || "Cours ajouté depuis l'administration."),
        intro: esc(String(data.get("desc")).trim() || "Cours ajouté depuis l'administration."),
        modules,
      };
      LH.store.addCourse(course);
      refresh(`Le cours « ${title} » a été ajouté.`);
    });

    root.addEventListener("click", (event) => {
      const del = event.target.closest("[data-delete]");
      if (del) {
        const course = LH.store.findCourse(del.dataset.delete);
        if (course && window.confirm(`Supprimer le cours « ${course.title.replace(/&[a-z#0-9]+;/g, "")} » et sa progression ?`)) {
          LH.store.deleteCourse(course.id);
          refresh("Cours supprimé.");
        }
      }
      if (event.target.closest("[data-restore]")) {
        LH.store.restoreBuiltIns();
        refresh("Cours intégrés restaurés.");
      }
    });
  },
};
