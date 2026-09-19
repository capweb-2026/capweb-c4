# Carte des défenses

Chaque ligne dit quelle connerie est arrêtée, par quoi, et **où est la preuve** : le lien d'un run rouge ou d'une PR bloquée. Une barrière sans preuve ne compte pas.

| Connerie | Barrière qui l'arrête | Preuve (lien) | Checkpoint |
|---|---|---|---|
| Régression | Tests de contrat et CI obligatoire sur `main` | [run rouge #34967492773](https://github.com/capweb-2026/capweb-c4/actions/runs/34967492773) : `npm test`, 3/43 rouges — `validateMessage` plantait sur une entrée non-string, `replyTo` ne reconnaissait pas « salut »/« bonjour » ; [run rouge #35203692599](https://github.com/capweb-2026/capweb-c4/actions/runs/35203692599) : `npm test`, les tests d'identité du commit `test:` échouent avant l'écriture du code, `public/js/persona.js` n'existe pas encore | CP1, CP2 |
| Test affaibli ou supprimé | `check:tests` (TEST-CHANGE obligatoire) et relecture | | CP2 |
| Dépendance ajoutée | `check:deps` et `dependances-autorisees.json` | | CP2 |
| Secret exposé | | | CP3 |
| IA qui sort de son thème | | | CP3 |
| Faille (`innerHTML`, injection) | | | CP4 |
| Contrôle désactivé | | | CP4 |
| Action destructrice | | | CP4 |
