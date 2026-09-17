import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as modulePersona from '../public/js/persona.js';
import { createApp } from '../server/app.js';

// Tests rouges — identité Nova (SPEC critères 1 à 5).
// Ils échouent tant que public/js/persona.js et la liste blanche du serveur manquent.

const PERSONA_ATTENDUE = {
  nom: 'Nova',
  emoji: '🎥',
  accueil: '🎥 Salut, je suis Nova, ton guide du cinéma de science-fiction ! Prêt à explorer les étoiles ?',
  suggestions: [
    'Quels sont les meilleurs films de science-fiction de tous les temps ?',
    "Explique-moi l'univers de Star Wars",
    'Quelle est la différence entre space opera et cyberpunk ?',
  ],
};

const estEmojiUnique = (texte) => {
  if (typeof texte !== 'string') {
    return false;
  }
  const segments = [...new Intl.Segmenter('fr', { granularity: 'grapheme' }).segment(texte)];
  return segments.length === 1 && /\p{Extended_Pictographic}/u.test(texte);
};

const assertRefus = (resultat) => {
  assert.equal(resultat.ok, false);
  assert.ok(Array.isArray(resultat.erreurs), 'un refus expose un tableau erreurs');
  assert.ok(resultat.erreurs.length > 0, 'un refus expose au moins une erreur');
  for (const erreur of resultat.erreurs) {
    assert.equal(typeof erreur, 'string');
    assert.ok(erreur.trim().length > 0, 'chaque erreur est un texte non vide');
  }
};

describe('Identité Nova — persona (critères 1 à 4)', () => {
  it('Crit.1 — le nom est Nova, de 2 à 20 caractères', () => {
    assert.equal(modulePersona.persona.nom, PERSONA_ATTENDUE.nom);
    assert.ok(modulePersona.persona.nom.length >= 2, 'nom trop court');
    assert.ok(modulePersona.persona.nom.length <= 20, 'nom trop long');
  });

  it('Crit.2 — l’emoji est 🎥, un seul emoji', () => {
    assert.equal(modulePersona.persona.emoji, PERSONA_ATTENDUE.emoji);
    assert.equal(estEmojiUnique(modulePersona.persona.emoji), true, 'un seul emoji attendu');
  });

  it('Crit.3 — l’accueil est exact et contient le nom', () => {
    assert.equal(modulePersona.persona.accueil, PERSONA_ATTENDUE.accueil);
    assert.ok(modulePersona.persona.accueil.includes(modulePersona.persona.nom), 'l’accueil contient le nom');
  });

  it('Crit.4 — les trois suggestions sont exactes et non vides', () => {
    assert.deepEqual(modulePersona.persona.suggestions, PERSONA_ATTENDUE.suggestions);
    assert.equal(modulePersona.persona.suggestions.length, 3);
    for (const suggestion of modulePersona.persona.suggestions) {
      assert.equal(typeof suggestion, 'string');
      assert.ok(suggestion.trim().length > 0, 'aucune suggestion vide');
    }
  });
});

describe('Identité Nova — validatePersona', () => {
  it('accepte la persona attendue', () => {
    assert.deepEqual(modulePersona.validatePersona(PERSONA_ATTENDUE), { ok: true });
  });

  it('refuse un nom de moins de 2 caractères', () => {
    assertRefus(modulePersona.validatePersona({ ...PERSONA_ATTENDUE, nom: 'N' }));
  });

  it('refuse un nom de plus de 20 caractères', () => {
    assertRefus(modulePersona.validatePersona({ ...PERSONA_ATTENDUE, nom: 'N'.repeat(21) }));
  });

  it('refuse un emoji qui n’est pas exactement un emoji', () => {
    for (const emoji of ['', 'A', '🎥🎥', 'ab']) {
      assertRefus(modulePersona.validatePersona({ ...PERSONA_ATTENDUE, emoji }), `emoji refusé : ${emoji}`);
    }
  });

  it('refuse un accueil qui ne contient pas le nom', () => {
    assertRefus(
      modulePersona.validatePersona({ ...PERSONA_ATTENDUE, accueil: '🎥 Salut, bienvenue au cinéma !' }),
    );
  });

  it('refuse un nombre de suggestions différent de trois', () => {
    assertRefus(
      modulePersona.validatePersona({ ...PERSONA_ATTENDUE, suggestions: PERSONA_ATTENDUE.suggestions.slice(0, 2) }),
    );
    assertRefus(
      modulePersona.validatePersona({ ...PERSONA_ATTENDUE, suggestions: [...PERSONA_ATTENDUE.suggestions, 'Et Alien ?'] }),
    );
  });

  it('refuse une suggestion vide ou faite d’espaces', () => {
    assertRefus(
      modulePersona.validatePersona({
        ...PERSONA_ATTENDUE,
        suggestions: [PERSONA_ATTENDUE.suggestions[0], '', PERSONA_ATTENDUE.suggestions[2]],
      }),
    );
    assertRefus(
      modulePersona.validatePersona({
        ...PERSONA_ATTENDUE,
        suggestions: [PERSONA_ATTENDUE.suggestions[0], '   ', PERSONA_ATTENDUE.suggestions[2]],
      }),
    );
  });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

let serveur;
let baseUrl;

before(async () => {
  const app = createApp({ publicDir, version: 'test-identite' });
  await new Promise((resolve) => {
    serveur = app.listen(0, '127.0.0.1', resolve);
  });
  const adresse = serveur.address();
  const port = typeof adresse === 'object' && adresse !== null ? adresse.port : 0;
  baseUrl = `http://127.0.0.1:${port}`;
});

after(
  () =>
    new Promise((resolve, reject) => {
      if (!serveur) {
        resolve();
        return;
      }
      serveur.close((erreur) => (erreur ? reject(erreur) : resolve()));
    }),
);

describe('Identité Nova — serveur (appui critères 1 à 5)', () => {
  it('GET /js/persona.js est servi en JavaScript', async () => {
    const reponse = await fetch(`${baseUrl}/js/persona.js`);
    assert.equal(reponse.status, 200);
    const mime = reponse.headers.get('content-type') ?? '';
    assert.ok(mime.includes('javascript'), `MIME JavaScript attendu, reçu : ${mime}`);
    const corps = await reponse.text();
    assert.ok(corps.trim().length > 0, 'persona.js ne doit pas être vide');
  });
});
