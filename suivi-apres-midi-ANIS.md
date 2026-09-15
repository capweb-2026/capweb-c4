# Suivi — après-midi J1

**Noté. Un fichier par étudiant, écrit avec vos mots.** Une phrase honnête (« j'ai essayé X, j'ai vu Y, je ne comprends pas pourquoi ») rapporte plus qu'une phrase parfaite recopiée.

- Nom : Anis CHARA
- Binôme : Ismael GENET
- Atelier utilisé (le mien, celui du binôme, la reprise) : le mien

## Pour chaque TP abordé

Recopiez ce bloc autant de fois que nécessaire.

### TP…

- J'ai prédit :
- Nous avons fait :
- J'ai observé :
- J'ai compris :
- Je n'ai pas compris :
- Réponse à la question « Dans le suivi » du TP :

### TP6

- J'ai prédit :
- Nous avons fait :
- J'ai observé :
- J'ai compris :
- Je n'ai pas compris :
- Réponse à la question « Dans le suivi » du TP : event.preventDefault();

### TP7

- J'ai prédit : Que cette etape consiste à ajouter des messages écrit par l'utilisateur dans la liste des messages
- Nous avons fait : l'ajout des messages au submit dans la liste
- J'ai observé : que cela fonctionnait
- J'ai compris : tout
- Je n'ai pas compris : rien
- Réponse à la question « Dans le suivi » du TP : avec textContent les balises ne sont prise en compte que comme du texte

### TP8 

- J'ai prédit : que la reponse s'afficherai selon les reponses prédéfinies
- Nous avons fait : l'implementation de la reponse du chat bot
- J'ai observé : que cela fonctionnait
- J'ai compris : le fonctionnement global
- Je n'ai pas compris : rien
- Réponse à la question « Dans le suivi » du TP : brain.js ne peut pas utiliser document car c'est un module.

### TP9

- J'ai prédit : qu'il s'agissait de separer les responsabilités 
- Nous avons fait : l'implementation de view.js
- J'ai observé : que cela fonctionnait de la meme maniere
- J'ai compris : qu'il s'agissait purement d'architecture
- Je n'ai pas compris : rien
- Réponse à la question « Dans le suivi » du TP : brain.js fait office de backend, view.js gere le rendu, app.js est le controleur qui les relie.

### TP10

- J'ai prédit : que les messages seraient persistants
- Nous avons fait : le stockage sur localstorage ainsi que le bouton effacer
- J'ai observé : que cela fonctionnait
- J'ai compris : tout
- Je n'ai pas compris : rien
- Réponse à la question « Dans le suivi » du TP : nous avons prédit que cela marcherait seulement sur un autre onglet avec la meme url, pas en navigation privée ou localhost.

### TP11

- J'ai prédit : qu'il s'agissait de tests
- Nous avons fait : les tests pour tous les cas cités
- J'ai observé : que cela fonctionnait
- J'ai compris : tout
- Je n'ai pas compris : rien
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

  Cela car j'ai retiré le toLowerCase dans replyTo()

## Épreuve de l'explication (TP12)

- Ce que je n'ai pas su expliquer :
- Ce que mon binôme n'a pas su expliquer :

## Trois questions

1. Pourquoi `textContent` et pas `innerHTML` ?
2. Pourquoi trois fichiers plutôt qu'un seul ?
3. Si demain une IA écrit une partie du code, comment saurai-je qu'il est correct ?

## Aides utilisées

- Indices, aide-mémoire, voisins :
- Ce que j'ai demandé à une IA, et comment j'ai vérifié sa réponse :
