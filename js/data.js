/* Données fictives des cours (tableau JavaScript, voir cahier des charges : « Données »). */
window.LH = window.LH || {};
LH.COURSES = [
  {
    "id": "html",
    "title": "Les bases du HTML5",
    "label": "HTML",
    "level": "Débutant",
    "eyebrow": "Parcours débutant",
    "short": "Construisez des pages web structurées avec un HTML moderne et sémantique.",
    "intro": "Apprenez à créer des pages web structurées, accessibles et sémantiques.",
    "modules": [
      {
        "id": "module-1",
        "title": "Structure d'une page HTML",
        "text": "Un document HTML commence par une déclaration de type, puis contient les éléments <code>html</code>, <code>head</code> et <code>body</code>. Cette structure permet au navigateur de comprendre le document et de présenter son contenu correctement.",
        "image": "images/html-structure.svg",
        "imageAlt": "Schéma illustrant la structure head et body d'un document HTML",
        "code": "<!doctype html>\n<html lang=\"fr\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>Ma première page</title>\n  </head>\n  <body>\n    <h1>Bienvenue</h1>\n  </body>\n</html>",
        "video": "qz0aGYrrlhU",
        "videoTitle": "Vidéo sur la structure d'un document HTML",
        "quiz": [
          {
            "q": "Quel élément contient les métadonnées du document, comme le titre de l'onglet ?",
            "options": [
              "<body>",
              "<head>",
              "<footer>"
            ],
            "answer": 1,
            "explain": "Le <head> regroupe les métadonnées (title, meta charset…) qui ne s'affichent pas dans la page."
          },
          {
            "q": "À quoi sert la déclaration <!doctype html> ?",
            "options": [
              "Elle indique au navigateur qu'il s'agit d'un document HTML5",
              "Elle importe la feuille de style",
              "Elle définit la langue de la page"
            ],
            "answer": 0,
            "explain": "Elle active le mode standard du navigateur pour un document HTML moderne."
          }
        ]
      },
      {
        "id": "module-2",
        "title": "Titres et paragraphes",
        "text": "Les titres de <code>h1</code> à <code>h6</code> organisent la hiérarchie du contenu. Utilisez un seul titre principal par page, puis descendez progressivement dans les niveaux. Les balises <code>p</code> servent à découper le texte en paragraphes lisibles.",
        "image": "images/html-titres-paragraphes.svg",
        "imageAlt": "Exemple visuel de titres HTML organisés en plusieurs niveaux",
        "code": "<h1>Le jardinage urbain</h1>\n<h2>Choisir ses plantes</h2>\n<p>Les herbes aromatiques poussent facilement\nsur un balcon bien exposé.</p>\n              ",
        "video": "UB1O30fR-EE",
        "videoTitle": "Vidéo sur les titres et paragraphes HTML",
        "quiz": [
          {
            "q": "Combien de titres <h1> une page devrait-elle idéalement contenir ?",
            "options": [
              "Un seul",
              "Un par paragraphe",
              "Au moins cinq"
            ],
            "answer": 0,
            "explain": "Le <h1> décrit le sujet principal de la page : un seul suffit."
          },
          {
            "q": "Quelle balise définit un paragraphe ?",
            "options": [
              "<para>",
              "<p>",
              "<text>"
            ],
            "answer": 1,
            "explain": "<p> est la balise de paragraphe."
          }
        ]
      },
      {
        "id": "module-3",
        "title": "Liens et images",
        "text": "La balise <code>a</code> relie les pages entre elles grâce à son attribut <code>href</code>. La balise <code>img</code> affiche une image et doit toujours posséder un attribut <code>alt</code> descriptif afin de rester accessible aux personnes qui utilisent un lecteur d'écran.",
        "image": "images/html-liens-images.svg",
        "imageAlt": "Illustration d'une page contenant un lien et une image accessible",
        "code": "<a href=\"contact.html\">Nous contacter</a>\n\n<img src=\"images/logo.png\"\n     alt=\"Logo de LearnHub\">",
        "video": "kUMe1FH4CHE",
        "videoTitle": "Vidéo sur les liens et les images en HTML",
        "quiz": [
          {
            "q": "Quel attribut est indispensable pour décrire une image aux lecteurs d'écran ?",
            "options": [
              "title",
              "alt",
              "src"
            ],
            "answer": 1,
            "explain": "L'attribut alt fournit un texte alternatif, essentiel pour l'accessibilité."
          },
          {
            "q": "Quel attribut d'un lien <a> contient l'adresse de destination ?",
            "options": [
              "href",
              "link",
              "url"
            ],
            "answer": 0,
            "explain": "href (hypertext reference) contient l'URL cible."
          }
        ]
      },
      {
        "id": "module-4",
        "title": "Listes et tableaux",
        "text": "Les listes non ordonnées présentent des éléments sans classement, tandis que les listes ordonnées indiquent une séquence. Les tableaux sont réservés aux données tabulaires et doivent utiliser des en-têtes pour faciliter leur compréhension.",
        "image": "images/html-listes-tableaux.svg",
        "imageAlt": "Exemple de liste et de tableau HTML organisés",
        "code": "<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>\n\n<table>\n  <tr><th>Cours</th><th>Niveau</th></tr>\n  <tr><td>HTML</td><td>Débutant</td></tr>\n</table>",
        "video": "PlxWf493en4",
        "videoTitle": "Vidéo sur les listes et tableaux HTML",
        "quiz": [
          {
            "q": "Quelle balise représente une liste à puces ?",
            "options": [
              "<ol>",
              "<ul>",
              "<li>"
            ],
            "answer": 1,
            "explain": "<ul> est la liste non ordonnée ; <li> en est un élément et <ol> une liste numérotée."
          },
          {
            "q": "Quelle balise définit une cellule d'en-tête dans un tableau ?",
            "options": [
              "<td>",
              "<th>",
              "<tr>"
            ],
            "answer": 1,
            "explain": "<th> est une cellule d'en-tête, <td> une cellule de données, <tr> une ligne."
          }
        ]
      },
      {
        "id": "module-5",
        "title": "Créer des formulaires",
        "text": "Les formulaires recueillent les informations saisies par les visiteurs. Chaque champ doit être associé à une étiquette <code>label</code>, et son type doit refléter la donnée attendue pour améliorer l'accessibilité et l'expérience sur mobile.",
        "image": "images/html-formulaires.svg",
        "imageAlt": "Maquette d'un formulaire HTML avec des champs étiquetés",
        "code": "<form action=\"/inscription\" method=\"post\">\n  <label for=\"email\">Votre adresse e-mail</label>\n  <input id=\"email\" type=\"email\" name=\"email\" required>\n  <button type=\"submit\">S'inscrire</button>\n</form>",
        "video": "fNcJuPIZ2WE",
        "videoTitle": "Vidéo sur la création de formulaires HTML",
        "quiz": [
          {
            "q": "Quel élément associe un texte à un champ de formulaire ?",
            "options": [
              "<label>",
              "<legend>",
              "<span>"
            ],
            "answer": 0,
            "explain": "<label for=\"id\"> relie le texte au champ et agrandit la zone cliquable."
          },
          {
            "q": "Quel attribut empêche l'envoi du formulaire si le champ est vide ?",
            "options": [
              "placeholder",
              "required",
              "name"
            ],
            "answer": 1,
            "explain": "required déclenche la validation native du navigateur."
          }
        ]
      },
      {
        "id": "module-6",
        "title": "Adopter le HTML sémantique",
        "text": "Les éléments sémantiques décrivent le rôle du contenu : <code>header</code>, <code>nav</code>, <code>main</code>, <code>section</code>, <code>article</code> et <code>footer</code>. Ils rendent la page plus claire pour les développeurs, les moteurs de recherche et les technologies d'assistance.",
        "image": "images/html-semantique.svg",
        "imageAlt": "Schéma d'une page organisée avec des éléments HTML sémantiques",
        "code": "<main>\n  <article>\n    <h1>Actualités du campus</h1>\n    <p>Découvrez les prochains événements.</p>\n  </article>\n</main>",
        "video": "OU6e6H0o4sY",
        "videoTitle": "Vidéo sur le HTML sémantique",
        "quiz": [
          {
            "q": "Quelle balise convient pour le contenu principal unique de la page ?",
            "options": [
              "<main>",
              "<div>",
              "<aside>"
            ],
            "answer": 0,
            "explain": "<main> désigne le contenu principal, présent une seule fois par page."
          },
          {
            "q": "Quel est l'intérêt principal du HTML sémantique ?",
            "options": [
              "Accessibilité et référencement améliorés",
              "Pages plus colorées",
              "Chargement du JavaScript plus rapide"
            ],
            "answer": 0,
            "explain": "Des balises porteuses de sens aident lecteurs d'écran et moteurs de recherche."
          }
        ]
      }
    ]
  },
  {
    "id": "css",
    "title": "Maîtriser le CSS3",
    "label": "CSS",
    "level": "Intermédiaire",
    "eyebrow": "Parcours créatif",
    "short": "Donnez vie à vos interfaces avec des mises en page élégantes et responsives.",
    "intro": "Apprenez à mettre en forme des interfaces modernes, lisibles et responsives.",
    "modules": [
      {
        "id": "module-1",
        "title": "Sélecteurs et propriétés",
        "text": "CSS associe des règles de présentation aux éléments HTML. Un sélecteur cible un élément, puis les déclarations entre accolades définissent son apparence, comme sa couleur, sa taille ou son alignement.",
        "image": "images/css-selecteurs.svg",
        "imageAlt": "Exemple de sélecteurs CSS appliqués à des éléments HTML",
        "code": "h1 {\n  color: #1d4ed8;\n  font-size: 2rem;\n}\n\n.introduction {\n  max-width: 40rem;\n}",
        "video": "1PnVor36_40",
        "videoTitle": "Vidéo sur les sélecteurs et propriétés CSS",
        "quiz": [
          {
            "q": "Quel sélecteur cible les éléments portant la classe « intro » ?",
            "options": [
              "#intro",
              ".intro",
              "intro"
            ],
            "answer": 1,
            "explain": "Le point cible une classe ; # cible un identifiant."
          },
          {
            "q": "Dans « color: red; », que représente « color » ?",
            "options": [
              "La valeur",
              "La propriété",
              "Le sélecteur"
            ],
            "answer": 1,
            "explain": "« color » est la propriété, « red » en est la valeur."
          }
        ]
      },
      {
        "id": "module-2",
        "title": "Couleurs et typographie",
        "text": "Une palette cohérente et une typographie bien choisie rendent une interface plus agréable. CSS accepte notamment les couleurs hexadécimales, RGB et HSL, ainsi que des familles de polices de secours.",
        "image": "images/css-couleurs-typographie.svg",
        "imageAlt": "Palette de couleurs et exemples de typographie pour une interface web",
        "code": "body {\n  color: #172033;\n  background-color: #f4f7fb;\n  font-family: \"Inter\", sans-serif;\n}\n\n.accent {\n  color: hsl(221 83% 53%);\n}",
        "video": "1Rs2ND1ryYc",
        "videoTitle": "Vidéo sur les couleurs et la typographie CSS",
        "quiz": [
          {
            "q": "Quelle propriété change la couleur du texte ?",
            "options": [
              "background-color",
              "color",
              "font-style"
            ],
            "answer": 1,
            "explain": "color définit la couleur du texte ; background-color celle du fond."
          },
          {
            "q": "Quelle notation correspond à une couleur HSL ?",
            "options": [
              "hsl(221 83% 53%)",
              "#2563eb",
              "rgb(37 99 235)"
            ],
            "answer": 0,
            "explain": "hsl() décrit teinte, saturation et luminosité."
          }
        ]
      },
      {
        "id": "module-3",
        "title": "Le modèle de boîte et les espacements",
        "text": "Chaque élément est une boîte composée du contenu, du padding, de la bordure et de la marge. La propriété <code>box-sizing</code> aide à conserver des dimensions prévisibles lorsque l'on ajoute du padding et des bordures.",
        "image": "images/css-modele-de-boite.svg",
        "imageAlt": "Schéma des zones contenu, padding, bordure et marge en CSS",
        "code": "* {\n  box-sizing: border-box;\n}\n\n.card {\n  margin: 1rem;\n  padding: 1.5rem;\n  border: 1px solid #dbe3ef;\n}",
        "video": "rIO5326FgPE",
        "videoTitle": "Vidéo sur le modèle de boîte CSS",
        "quiz": [
          {
            "q": "Quel est l'ordre de l'intérieur vers l'extérieur du modèle de boîte ?",
            "options": [
              "Contenu, padding, border, margin",
              "Contenu, margin, border, padding",
              "Padding, contenu, margin, border"
            ],
            "answer": 0,
            "explain": "Contenu → padding → bordure → marge."
          },
          {
            "q": "Que fait « box-sizing: border-box » ?",
            "options": [
              "Inclut padding et bordure dans la largeur déclarée",
              "Supprime les marges",
              "Ajoute une ombre"
            ],
            "answer": 0,
            "explain": "La largeur déclarée englobe contenu, padding et bordure : les calculs sont plus simples."
          }
        ]
      },
      {
        "id": "module-4",
        "title": "Organiser une interface avec Flexbox",
        "text": "Flexbox facilite l'alignement d'éléments sur un axe principal. Avec <code>display: flex</code>, on peut contrôler la direction, l'espacement et l'alignement d'une barre de navigation ou d'un groupe de cartes.",
        "image": "images/css-flexbox.svg",
        "imageAlt": "Éléments alignés horizontalement avec CSS Flexbox",
        "code": ".navigation {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}",
        "video": "fYq5PXgSsbE",
        "videoTitle": "Vidéo sur CSS Flexbox",
        "quiz": [
          {
            "q": "Quelle déclaration active Flexbox sur un conteneur ?",
            "options": [
              "display: flex",
              "position: flex",
              "flex: container"
            ],
            "answer": 0,
            "explain": "display: flex transforme le conteneur en flex container."
          },
          {
            "q": "Quelle propriété répartit les éléments sur l'axe principal ?",
            "options": [
              "align-items",
              "justify-content",
              "gap"
            ],
            "answer": 1,
            "explain": "justify-content agit sur l'axe principal, align-items sur l'axe secondaire."
          }
        ]
      },
      {
        "id": "module-5",
        "title": "Grid et design responsive",
        "text": "CSS Grid crée des mises en page en lignes et en colonnes. Associé aux media queries, il permet d'adapter une grille au mobile, à la tablette et au grand écran sans dupliquer le HTML.",
        "image": "images/css-grid-responsive.svg",
        "imageAlt": "Grille de cartes qui s'adapte à plusieurs tailles d'écran",
        "code": ".course-grid {\n  display: grid;\n  gap: 1.5rem;\n  grid-template-columns: 1fr;\n}\n\n@media (min-width: 768px) {\n  .course-grid { grid-template-columns: repeat(2, 1fr); }\n}",
        "video": "9zBsdzdE4sM",
        "videoTitle": "Vidéo sur CSS Grid et le responsive design",
        "quiz": [
          {
            "q": "Quelle déclaration crée trois colonnes égales avec Grid ?",
            "options": [
              "grid-template-columns: repeat(3, 1fr)",
              "flex-columns: 3",
              "columns: grid(3)"
            ],
            "answer": 0,
            "explain": "repeat(3, 1fr) crée trois colonnes de même largeur."
          },
          {
            "q": "Que permet une règle @media (min-width: 768px) ?",
            "options": [
              "Appliquer des styles à partir d'une certaine largeur d'écran",
              "Charger une police",
              "Créer une animation"
            ],
            "answer": 0,
            "explain": "Les media queries adaptent la mise en page à la taille de l'écran (responsive)."
          }
        ]
      },
      {
        "id": "module-6",
        "title": "Transitions et variables CSS",
        "text": "Les variables CSS centralisent les valeurs réutilisées comme les couleurs et les espacements. Les transitions ajoutent une évolution douce lorsqu'un élément change d'état, par exemple au survol d'un bouton.",
        "image": "images/css-variables-transitions.svg",
        "imageAlt": "Bouton illustrant une transition CSS et une palette de variables",
        "code": ":root {\n  --couleur-principale: #2563eb;\n}\n\n.button {\n  background: var(--couleur-principale);\n  transition: transform 150ms ease;\n}\n\n.button:hover { transform: translateY(-2px); }",
        "video": "Nloq6uzF8RQ",
        "videoTitle": "Vidéo sur les transitions et variables CSS",
        "quiz": [
          {
            "q": "Comment lit-on la variable CSS --couleur-principale ?",
            "options": [
              "var(--couleur-principale)",
              "get(--couleur-principale)",
              "$couleur-principale"
            ],
            "answer": 0,
            "explain": "On utilise la fonction var()."
          },
          {
            "q": "Quelle propriété décrit l'évolution douce d'un changement d'état ?",
            "options": [
              "transition",
              "filter",
              "visibility"
            ],
            "answer": 0,
            "explain": "transition anime le passage d'une valeur à une autre."
          }
        ]
      }
    ]
  },
  {
    "id": "javascript",
    "title": "Découvrir JavaScript",
    "label": "JS",
    "level": "Intermédiaire",
    "eyebrow": "Parcours interactif",
    "short": "Rendez vos pages interactives et créez vos premières fonctionnalités dynamiques.",
    "intro": "Découvrez les bases de la programmation et rendez vos pages web interactives.",
    "modules": [
      {
        "id": "module-1",
        "title": "Variables et types de données",
        "text": "Une variable donne un nom à une valeur utilisée par le programme. Utilisez <code>const</code> lorsque la référence ne change pas et <code>let</code> lorsqu'elle doit être réaffectée. JavaScript manipule notamment des chaînes, des nombres et des booléens.",
        "image": "images/js-variables.svg",
        "imageAlt": "Exemple de variables JavaScript contenant un nom et un âge",
        "code": "const prenom = \"Amina\";\nlet age = 21;\nconst estEtudiante = true;\n\nconsole.log(`${prenom} a ${age} ans.`);",
        "video": "W6NZfCO5SIk",
        "videoTitle": "Vidéo sur les variables JavaScript",
        "quiz": [
          {
            "q": "Quel mot-clé déclare une valeur qui ne sera pas réaffectée ?",
            "options": [
              "let",
              "const",
              "var"
            ],
            "answer": 1,
            "explain": "const déclare une constante : la variable ne peut pas être réaffectée."
          },
          {
            "q": "Quel est le type de la valeur true ?",
            "options": [
              "string",
              "number",
              "boolean"
            ],
            "answer": 2,
            "explain": "true et false sont des booléens."
          }
        ]
      },
      {
        "id": "module-2",
        "title": "Conditions et opérateurs",
        "text": "Les conditions permettent d'exécuter un bloc uniquement lorsqu'une expression est vraie. Les opérateurs de comparaison et les opérateurs logiques aident à combiner plusieurs règles pour représenter le comportement attendu.",
        "image": "images/js-conditions.svg",
        "imageAlt": "Organigramme représentant une condition si sinon en JavaScript",
        "code": "const note = 15;\n\nif (note >= 10) {\n  console.log(\"Module validé\");\n} else {\n  console.log(\"À revoir\");\n}",
        "video": "IsG4Xd6LlsM",
        "videoTitle": "Vidéo sur les conditions JavaScript",
        "quiz": [
          {
            "q": "Quel opérateur teste l'égalité stricte (valeur et type) ?",
            "options": [
              "==",
              "===",
              "="
            ],
            "answer": 1,
            "explain": "=== compare valeur et type ; = est l'affectation."
          },
          {
            "q": "Que s'affiche pour note = 8 dans l'exemple du module ?",
            "options": [
              "Module validé",
              "À revoir",
              "Rien"
            ],
            "answer": 1,
            "explain": "8 >= 10 est faux : le bloc else s'exécute."
          }
        ]
      },
      {
        "id": "module-3",
        "title": "Boucles et tableaux",
        "text": "Les tableaux regroupent plusieurs valeurs dans une même collection. Une boucle parcourt ces valeurs sans répéter manuellement le même code. La méthode <code>forEach</code> est particulièrement pratique pour traiter chaque élément.",
        "image": "images/js-boucles-tableaux.svg",
        "imageAlt": "Tableau de données parcouru par une boucle JavaScript",
        "code": "const matieres = [\"HTML\", \"CSS\", \"JavaScript\"];\n\nmatieres.forEach((matiere, index) => {\n  console.log(`${index + 1}. ${matiere}`);\n});",
        "video": "Kn06785iWLk",
        "videoTitle": "Vidéo sur les boucles et tableaux JavaScript",
        "quiz": [
          {
            "q": "Quel est l'indice du premier élément d'un tableau ?",
            "options": [
              "0",
              "1",
              "-1"
            ],
            "answer": 0,
            "explain": "Les indices commencent à 0."
          },
          {
            "q": "Quelle méthode exécute une fonction pour chaque élément d'un tableau ?",
            "options": [
              "forEach",
              "push",
              "join"
            ],
            "answer": 0,
            "explain": "forEach parcourt le tableau en appelant la fonction fournie."
          }
        ]
      },
      {
        "id": "module-4",
        "title": "Créer et utiliser des fonctions",
        "text": "Une fonction regroupe des instructions réutilisables. Elle peut recevoir des paramètres et retourner un résultat. Découper un programme en petites fonctions rend le code plus lisible et plus simple à tester.",
        "image": "images/js-fonctions.svg",
        "imageAlt": "Fonction JavaScript qui calcule un total à partir de deux valeurs",
        "code": "function calculerTotal(prix, quantite) {\n  return prix * quantite;\n}\n\nconst total = calculerTotal(12, 3);\nconsole.log(total); // 36",
        "video": "N8ap4k_1QEQ",
        "videoTitle": "Vidéo sur les fonctions JavaScript",
        "quiz": [
          {
            "q": "Quel mot-clé renvoie une valeur depuis une fonction ?",
            "options": [
              "break",
              "return",
              "yield"
            ],
            "answer": 1,
            "explain": "return termine la fonction et renvoie la valeur."
          },
          {
            "q": "Que renvoie calculerTotal(12, 3) dans l'exemple ?",
            "options": [
              "15",
              "36",
              "123"
            ],
            "answer": 1,
            "explain": "12 × 3 = 36."
          }
        ]
      },
      {
        "id": "module-5",
        "title": "Manipuler le DOM et écouter les événements",
        "text": "Le DOM représente la page HTML sous forme d'objets. JavaScript peut sélectionner un élément, modifier son contenu et réagir à une action de l'utilisateur avec <code>addEventListener</code>, comme un clic sur un bouton.",
        "image": "images/js-dom-evenements.svg",
        "imageAlt": "Bouton de page modifié par JavaScript après un clic",
        "code": "const bouton = document.querySelector(\"#saluer\");\n\nbouton.addEventListener(\"click\", () => {\n  document.querySelector(\"#message\").textContent =\n    \"Bonjour et bienvenue !\";\n});",
        "video": "5fb2aPlgoys",
        "videoTitle": "Vidéo sur le DOM et les événements JavaScript",
        "quiz": [
          {
            "q": "Quelle méthode sélectionne le premier élément correspondant à un sélecteur CSS ?",
            "options": [
              "getElement()",
              "querySelector()",
              "findNode()"
            ],
            "answer": 1,
            "explain": "document.querySelector(\"#id\") accepte n'importe quel sélecteur CSS."
          },
          {
            "q": "Quelle méthode attache un gestionnaire d'événement ?",
            "options": [
              "addEventListener",
              "onEvent",
              "attachClick"
            ],
            "answer": 0,
            "explain": "addEventListener(type, fonction) écoute un événement."
          }
        ]
      },
      {
        "id": "module-6",
        "title": "Formulaires et validation",
        "text": "JavaScript complète la validation native des formulaires en vérifiant les données avant leur envoi. Écoutez l'événement <code>submit</code>, empêchez l'envoi si nécessaire et affichez un message compréhensible à l'utilisateur.",
        "image": "images/js-validation-formulaire.svg",
        "imageAlt": "Formulaire affichant un message de validation JavaScript",
        "code": "form.addEventListener(\"submit\", (event) => {\n  if (email.value.trim() === \"\") {\n    event.preventDefault();\n    message.textContent = \"Saisissez votre e-mail.\";\n  }\n});",
        "video": "rsd4FNGTRBw",
        "videoTitle": "Vidéo sur la validation des formulaires JavaScript",
        "quiz": [
          {
            "q": "Que fait event.preventDefault() dans un submit ?",
            "options": [
              "Empêche l'envoi du formulaire",
              "Vide les champs",
              "Recharge la page"
            ],
            "answer": 0,
            "explain": "Il annule le comportement par défaut : l'envoi du formulaire."
          },
          {
            "q": "Quelle méthode retire les espaces au début et à la fin d'une chaîne ?",
            "options": [
              "trim()",
              "slice()",
              "split()"
            ],
            "answer": 0,
            "explain": "trim() supprime les espaces de début et de fin."
          }
        ]
      }
    ]
  }
];
