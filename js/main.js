// Keep course progress separate in localStorage.
const storagePrefix = "learnhub-progress-";

function getCourseKey() {
  const match = window.location.pathname.match(/([^/\\]+)\.html$/i);
  return match && match[1] !== "index" ? match[1] : "";
}

function readProgress(course) {
  try {
    return JSON.parse(localStorage.getItem(storagePrefix + course)) || [];
  } catch (error) {
    return [];
  }
}

function updateProgress(course, completed, total) {
  const percentage = Math.round((completed.length / total) * 100);
  const bar = document.querySelector(".progress-global");
  const text = document.querySelector(".course-header .progress-label strong");
  if (bar) {
    bar.setAttribute("aria-valuenow", percentage);
    bar.querySelector("span").style.width = `${percentage}%`;
  }
  if (text) text.textContent = `${percentage}%`;
  localStorage.setItem(storagePrefix + course, JSON.stringify(completed));
}

function setupMenu() {
  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (!button || !nav) return;
  const setMenuState = (isOpen) => {
    nav.classList.toggle("is-open", isOpen);
    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute(
      "aria-label",
      isOpen ? "Fermer le menu" : "Ouvrir le menu",
    );
  };

  button.addEventListener("click", () => {
    setMenuState(button.getAttribute("aria-expanded") !== "true");
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuState(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuState(false);
  });
  document.addEventListener("click", (event) => {
    if (
      !nav.classList.contains("is-open") ||
      nav.contains(event.target) ||
      button.contains(event.target)
    )
      return;
    setMenuState(false);
  });
}

function setupCourse() {
  const course = getCourseKey();
  const modules = [...document.querySelectorAll(".lesson")];
  const links = [...document.querySelectorAll(".module-list a")];
  const content = document.querySelector(".modules-content");
  if (!course || !modules.length || !content) return;
  const completed = readProgress(course);

  const showModule = (index, shouldScroll = true) => {
    const activeIndex = Math.min(Math.max(index, 0), modules.length - 1);
    const active = modules[activeIndex];
    modules.forEach((module, moduleIndex) => {
      module.hidden = moduleIndex !== activeIndex;
    });
    links.forEach((link, linkIndex) => {
      link.classList.toggle("is-active", linkIndex === activeIndex);
    });
    content.querySelectorAll(".previous-link, .next-link").forEach((link) => {
      const target = link.hash;
      const isInternalNavigation = target.startsWith("#module-");
      const isPrevious = link.classList.contains("previous-link");
      const isNext = link.classList.contains("next-link");
      const isUnavailable =
        (isPrevious && activeIndex === 0) ||
        (isNext && isInternalNavigation && activeIndex === modules.length - 1);
      link.hidden = isUnavailable;
      link.setAttribute("aria-disabled", String(isUnavailable));
    });
    history.replaceState(null, "", `#${active.id}`);
    if (shouldScroll)
      content.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  links.forEach((link) =>
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const index = links.indexOf(link);
      if (index !== -1) showModule(index);
    }),
  );
  content.addEventListener("click", (event) => {
    const link = event.target.closest(".previous-link, .next-link");
    if (!link || !link.hash.startsWith("#module-")) return;
    event.preventDefault();
    const targetIndex = modules.findIndex(
      (module) => `#${module.id}` === link.hash,
    );
    if (targetIndex !== -1) showModule(targetIndex);
  });

  modules.forEach((module, index) => {
    const link = links[index];
    if (!link) return;
    const check = document.createElement("span");
    check.className = "module-check";
    check.setAttribute("aria-hidden", "true");
    link.append(check);
    const button = module.querySelector(".lesson-actions .button");
    button.addEventListener("click", () => {
      if (!completed.includes(module.id)) completed.push(module.id);
      module.classList.add("is-complete");
      button.textContent = "Module terminé";
      check.textContent = "✓";
      updateProgress(course, completed, modules.length);
    });
    if (completed.includes(module.id)) {
      module.classList.add("is-complete");
      button.textContent = "Module terminé";
      check.textContent = "✓";
    }
  });
  updateProgress(course, completed, modules.length);
  const initialIndex = modules.findIndex(
    (module) => `#${module.id}` === window.location.hash,
  );
  showModule(initialIndex === -1 ? 0 : initialIndex, false);
}

function restoreHomeProgress() {
  document.querySelectorAll(".course-card").forEach((card) => {
    const link = card.querySelector(".course-link");
    const match = link && link.getAttribute("href").match(/([^/]+)\.html$/);
    const total = Number(card.dataset.total);
    if (!match || !Number.isFinite(total) || total <= 0) return;
    const percentage = Math.round(
      (readProgress(match[1]).length / total) * 100,
    );
    const bar = card.querySelector(".progress");
    bar.querySelector("span").style.width = `${percentage}%`;
    bar.setAttribute("aria-valuenow", percentage);
    card.querySelector(".progress-label strong").textContent = `${percentage}%`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupMenu();
  setupCourse();
  restoreHomeProgress();
});
