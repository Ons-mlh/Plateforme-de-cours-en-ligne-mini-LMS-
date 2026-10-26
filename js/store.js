/* store.js : accès sécurisé à localStorage + données de l'application */
window.LH = window.LH || {};

LH.store = (() => {
  const PREFIX = "learnhub-";
  const K = {
    progress: (c) => `${PREFIX}progress-${c}`,          // modules terminés (tableau d'ids)
    position: `${PREFIX}position`,                       // dernière position de lecture
    video: (c, m) => `${PREFIX}video-${c}-${m}`,         // temps de lecture de la vidéo
    quiz: (c, m) => `${PREFIX}quiz-${c}-${m}`,           // meilleur score du quiz
    custom: `${PREFIX}custom-courses`,                   // cours ajoutés via l'admin
    hidden: `${PREFIX}hidden-courses`,                   // cours intégrés supprimés
  };

  const read = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  };
  const write = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* quota / mode privé */ }
  };
  const remove = (key) => { try { localStorage.removeItem(key); } catch (e) {} };

  /* ---- Cours (intégrés + ajoutés, moins les supprimés) ---- */
  const customCourses = () => read(K.custom, []);
  const hiddenIds = () => read(K.hidden, []);
  const allCourses = () => {
    const hidden = hiddenIds();
    return [...LH.COURSES, ...customCourses()].filter((c) => !hidden.includes(c.id));
  };
  const findCourse = (id) => allCourses().find((c) => c.id === id) || null;

  const addCourse = (course) => write(K.custom, [...customCourses(), course]);
  const deleteCourse = (id) => {
    if (customCourses().some((c) => c.id === id)) {
      write(K.custom, customCourses().filter((c) => c.id !== id));
    } else {
      write(K.hidden, [...new Set([...hiddenIds(), id])]);
    }
    remove(K.progress(id));
    const pos = readPosition();
    if (pos && pos.courseId === id) remove(K.position);
  };
  const restoreBuiltIns = () => remove(K.hidden);

  /* ---- Progression ---- */
  const completed = (courseId) => read(K.progress(courseId), []);
  const isDone = (courseId, moduleId) => completed(courseId).includes(moduleId);
  const setDone = (courseId, moduleId, done) => {
    const set = new Set(completed(courseId));
    done ? set.add(moduleId) : set.delete(moduleId);
    write(K.progress(courseId), [...set]);
  };
  const percent = (course) => {
    if (!course.modules.length) return 0;
    const ids = course.modules.map((m) => m.id);
    const done = completed(course.id).filter((id) => ids.includes(id)).length;
    return Math.round((done / course.modules.length) * 100);
  };

  /* ---- Position dans les cours ---- */
  const readPosition = () => read(K.position, null);
  const savePosition = (courseId, moduleId, scroll) =>
    write(K.position, { courseId, moduleId, scroll: Math.round(scroll), ts: Date.now() });

  /* ---- Vidéo & quiz ---- */
  const videoTime = (c, m) => Number(read(K.video(c, m), 0)) || 0;
  const saveVideoTime = (c, m, t) => write(K.video(c, m), Math.floor(t));
  const bestQuiz = (c, m) => read(K.quiz(c, m), null);
  const saveQuiz = (c, m, score, total) => {
    const prev = bestQuiz(c, m);
    if (!prev || score > prev.score) write(K.quiz(c, m), { score, total });
    return bestQuiz(c, m);
  };

  return {
    allCourses, findCourse, addCourse, deleteCourse, restoreBuiltIns, customCourses, hiddenIds,
    completed, isDone, setDone, percent,
    readPosition, savePosition,
    videoTime, saveVideoTime, bestQuiz, saveQuiz,
  };
})();
