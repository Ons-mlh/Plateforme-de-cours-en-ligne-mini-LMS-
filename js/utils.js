/* utils.js : petits utilitaires partagés */
window.LH = window.LH || {};

LH.utils = {
  // Échappe le HTML (indispensable pour tout contenu saisi par l'utilisateur)
  esc(value) {
    return String(value).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  },
  // Identifiant d'une vidéo YouTube à partir d'une URL ou d'un id
  youtubeId(input) {
    const value = String(input || "").trim();
    const match = value.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
    if (match) return match[1];
    return /^[\w-]{11}$/.test(value) ? value : "";
  },
  slug(text) {
    return String(text).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "cours";
  },
  formatTime(seconds) {
    const s = Math.max(0, Math.floor(seconds));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  },
  throttle(fn, delay) {
    let timer = null;
    return (...args) => {
      if (timer) return;
      timer = setTimeout(() => { timer = null; fn(...args); }, delay);
    };
  },
};
