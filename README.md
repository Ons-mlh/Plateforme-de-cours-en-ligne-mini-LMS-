# LearnHub : Plateforme de cours en ligne (mini LMS) — Sujet 8

Mini-projet JavaScript FIA2 (ISSAT Sousse). La page HTML/CSS du sujet 8 est enrichie en **application monopage (SPA)** en JavaScript « vanilla » : aucune bibliothèque externe (hors API YouTube IFrame pour le lecteur vidéo).

## Lancer le projet
Ouvrir le dossier avec **Live Server** (ou `python -m http.server`) puis aller sur `index.html`. Le site fonctionne aussi en ouvrant simplement `index.html`.

## Fonctionnalités du cahier des charges
| Exigence | Où |
|---|---|
| **Obligatoire** : navigation entre cours sans rechargement (SPA) | `js/main.js` : routeur par hash (`#/`, `#/course/:id/:module`, `#/admin`), vues injectées dans `<main id="app">` |
| **Obligatoire** : suivi de progression (pourcentage, checklist) | Checklist de modules cochables dans le plan du cours, barre et % de progression par cours et sur l'accueil (`js/store.js`, `js/main.js`) |
| **Obligatoire** : sauvegarde automatique de la position (localStorage) | Module + défilement enregistrés en continu ; bouton « Reprendre » sur l'accueil ; reprise automatique à l'ouverture d'un cours |
| **Obligatoire** : quiz interactif avec validation immédiate | `js/quiz.js` : 2 questions par module (36 au total), correction instantanée avec explication, score, meilleur score sauvegardé, « Recommencer » |
| **Bonus** : lecteur vidéo avec marqueurs de progression | `js/player.js` : API YouTube IFrame, 4 repères cliquables qui s'allument, reprise de la vidéo à la dernière seconde vue |
| **Bonus** : interface d'administration simplifiée | `#/admin` (`js/admin.js`) : ajout (formulaire validé) et suppression de cours, restauration des cours intégrés |

## Structure
```
index.html          coquille de la SPA
css/style.css       styles d'origine
css/lms.css         styles ajoutés (quiz, lecteur, admin, checklist)
js/data.js          données des cours et des quiz (tableau JavaScript)
js/utils.js         échappement HTML, slug, throttle…
js/store.js         accès localStorage (progression, position, scores, cours)
js/quiz.js          quiz
js/player.js        lecteur vidéo + marqueurs
js/admin.js         administration
js/main.js          routeur et vues
images/             illustrations SVG
```

## Données localStorage (préfixe `learnhub-`)
`progress-<cours>`, `position`, `video-<cours>-<module>`, `quiz-<cours>-<module>`, `custom-courses`, `hidden-courses`.

## Qualité
HTML5 sémantique, responsive, lien d'évitement, focus visible, navigation clavier, `aria-live` pour les changements de vue et le quiz, `prefers-reduced-motion` respecté, contenu saisi dans l'admin échappé (pas d'injection HTML).

## Bibliothèques
Aucune bibliothèque JS. API YouTube IFrame (lecteur vidéo, bonus) — à citer dans le rapport.
