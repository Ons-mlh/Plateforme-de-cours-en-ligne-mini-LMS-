/* player.js : lecteur vidéo (API YouTube IFrame) avec marqueurs de progression
   - la position de lecture est sauvegardée et reprise automatiquement
   - 4 marqueurs cliquables (0 %, 25 %, 50 %, 75 %) s'allument quand ils sont atteints */
window.LH = window.LH || {};

LH.player = (() => {
  const MARKERS = [
    { at: 0, label: "Introduction" },
    { at: 0.25, label: "Notions clés" },
    { at: 0.5, label: "Exemple" },
    { at: 0.75, label: "Conclusion" },
  ];
  let apiPromise = null;
  let current = null; // lecteur actif (un seul à la fois)

  const loadApi = () => {
    if (apiPromise) return apiPromise;
    apiPromise = new Promise((resolve, reject) => {
      if (window.YT && window.YT.Player) return resolve(window.YT);
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof previous === "function") previous();
        resolve(window.YT);
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.onerror = () => { apiPromise = null; reject(new Error("API YouTube indisponible")); };
      document.head.append(script);
      setTimeout(() => reject(new Error("Délai dépassé")), 8000);
    });
    return apiPromise;
  };

  const destroy = () => {
    if (!current) return;
    clearInterval(current.timer);
    try { current.player.destroy(); } catch (e) {}
    current = null;
  };

  const fallback = (container, videoId, title, reason) => {
    container.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${encodeURIComponent(videoId)}" title="${LH.utils.esc(title)}"
        loading="lazy" allowfullscreen></iframe>
      <p class="player-note">Marqueurs indisponibles (${LH.utils.esc(reason)}).</p>`;
  };

  const mount = (container, { courseId, moduleId, videoId, title }) => {
    destroy();
    if (!videoId) {
      container.innerHTML = `<p class="player-note">Aucune vidéo pour ce module.</p>`;
      return;
    }
    const { formatTime, esc } = LH.utils;
    const saved = LH.store.videoTime(courseId, moduleId);
    container.innerHTML = `
      <div class="player-frame"><div id="yt-slot"></div></div>
      <div class="player-bar" aria-label="Marqueurs de progression de la vidéo">
        <div class="player-track" aria-hidden="true"><span class="player-fill"></span></div>
        <ol class="player-markers">
          ${MARKERS.map((m, i) => `
            <li style="left:${m.at * 100}%"><button type="button" class="player-marker" data-i="${i}"
              aria-label="Aller au repère : ${esc(m.label)}" disabled></button>
              <span class="player-label" aria-hidden="true">${esc(m.label)}</span></li>`).join("")}
        </ol>
      </div>
      <p class="player-status" role="status" aria-live="polite" data-status>Chargement du lecteur…</p>`;

    const fill = container.querySelector(".player-fill");
    const buttons = [...container.querySelectorAll(".player-marker")];
    const status = container.querySelector("[data-status]");

    loadApi().then((YT) => {
      if (!container.isConnected) return;
      const player = new YT.Player("yt-slot", {
        videoId,
        host: "https://www.youtube.com",
        playerVars: { rel: 0, start: saved, modestbranding: 1 },
        events: {
          onReady: () => {
            const duration = player.getDuration() || 0;
            buttons.forEach((b) => {
              b.disabled = !duration;
              b.addEventListener("click", () => {
                const target = Math.floor(duration * MARKERS[Number(b.dataset.i)].at);
                player.seekTo(target, true);
                player.playVideo();
              });
            });
            status.textContent = saved > 5
              ? `Reprise automatique à ${formatTime(saved)}.`
              : "Cliquez sur un repère pour naviguer dans la vidéo.";
          },
          onError: () => { status.textContent = "Cette vidéo ne peut pas être lue ici."; },
        },
      });
      const tick = () => {
        if (!player.getCurrentTime || !player.getDuration) return;
        const t = player.getCurrentTime();
        const d = player.getDuration();
        if (!d) return;
        const ratio = Math.min(1, t / d);
        fill.style.width = `${ratio * 100}%`;
        buttons.forEach((b, i) => b.classList.toggle("is-reached", ratio >= MARKERS[i].at && t > 0));
        if (t > 1) LH.store.saveVideoTime(courseId, moduleId, t >= d - 2 ? 0 : t);
      };
      current = { player, timer: setInterval(tick, 500) };
    }).catch((err) => fallback(container, videoId, title, err.message));
  };

  return { mount, destroy };
})();
