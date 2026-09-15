# Suivi — après-midi J1

**Noté. Un fichier par étudiant, écrit avec vos mots.** Une phrase honnête (« j'ai essayé X, j'ai vu Y, je ne comprends pas pourquoi ») rapporte plus qu'une phrase parfaite recopiée.

- Nom : GENET Ismael
- Binôme : CHARA Anis
- Atelier utilisé (le mien, celui du binôme, la reprise) : Celui du binome

## Pour chaque TP abordé

Recopiez ce bloc autant de fois que nécessaire.

### TP6

- J'ai prédit : x
- Nous avons fait : Setup le projet
- J'ai observé : Que ça marchait
- J'ai compris : Tout
- Je n'ai pas compris : Rien
- Réponse à la question « Dans le suivi » du TP : event.preventDefault();

### TP7

- J'ai prédit : x
- Nous avons fait : Affichage des messages envoyé par le user + clear de la box
- J'ai observé : Que ça marchait
- J'ai compris : Tout
- Je n'ai pas compris : Rien
- Réponse à la question « Dans le suivi » du TP : Car innerHTML considérera le <b>gras</b> comme du vrai HTML

### TP8

- J'ai prédit : x
- Nous avons fait : Réponses automatique
- J'ai observé : Que ça marchait
- J'ai compris : Tout
- Je n'ai pas compris : Rien
- Réponse à la question « Dans le suivi » du TP : brain.js ne doit pas utilisé document et doit rester hors navigateur car sinon il exposerait des fichiers sensibles (config, .env, etc.)

### TP9

- J'ai prédit : x
- Nous avons fait : Séparer les résponsabilités et création du systeme d'historique
- J'ai observé : Rien changeait particulierement
- J'ai compris : Tout
- Je n'ai pas compris : Rien
- Réponse à la question « Dans le suivi » du TP : app.js : gère les événements et branche l'interface sur la logique / brain.js : contient la logique / view.js : centralise l'affichage (créer/met à jour les éléments HTML).

### TP10

- J'ai prédit : x
- Nous avons fait : Créer l'historique et le btn de suppression de conv
- J'ai observé : Que il fallait bien render les responses dans le try sinon rien ne s'affiche
- J'ai compris : Globalement tout
- Je n'ai pas compris : Mal compris la syntaxe du bouton "Effacer la conversation" mais Anis ma aidé et m'as expliqué
- Réponse à la question « Dans le suivi » du TP : Non je prédit que l'historique sera pas dispo en nav privé et/ou sur le port 3000.

### TP11

- J'ai prédit : x
- Nous avons fait : Mise en place des premiers test du chatbot
- J'ai observé : Que ça marchait
- J'ai compris : Tout
- Je n'ai pas compris : Rien
- Réponse à la question « Dans le suivi » du TP :
  AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:
  actual expected
  'pas cyompris'
  at TestContext.<anonymous> (file:///C:/Users/Anis/Desktop/demarrage-etudiants-j1/atelier/tests/brain.test.js:19:12)
  at Test.runInAsyncScope (node:async_hooks:226:14)
  at Test.run (node:internal/test_runner/test:1402:25)
  at Suite.processPendingSubtests (node:internal/test_runner/test:974:18)
  at Test.postRun (node:internal/test_runner/test:1542:19)
  at Test.run (node:internal/test_runner/test:1467:12)
  at async Suite.processPendingSubtests (node:internal/test_runner/test:974:7) {
  generatedMessage: true,
  code: 'ERR_ASSERTION',
  actual: 'pas compris',
  expected: 'yo',
  operator: 'deepStrictEqual',
  diff: 'simple'
  }

  Que tout marche bien et que en enlevant la ligne toLowerCase alors le test des majuscules échoue.

## Épreuve de l'explication (TP12)

- Ce que je n'ai pas su expliquer : Pourquoi le localstorage n'est pas dispo en nav privé ou une autre URL
- Ce que mon binôme n'a pas su expliquer : x

## Trois questions

1. Pourquoi `textContent` et pas `innerHTML` ? Car innerHTML considérera le <b>gras</b> comme du vrai HTML et donc peut etre dangereux
2. Pourquoi trois fichiers plutôt qu'un seul ? Meilleur lisibilité du code, Bonne pratique,
3. Si demain une IA écrit une partie du code, comment saurai-je qu'il est correct ? En faisant une review du code a la main et/ou mettre en place des tests (unitaires, system, intégration)

## Aides utilisées

- Indices, aide-mémoire, voisins : Documentation StackOverflow
- Ce que j'ai demandé à une IA, et comment j'ai vérifié sa réponse : x
