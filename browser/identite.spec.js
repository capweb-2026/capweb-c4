import { test, expect } from '@playwright/test';
/* global localStorage -- callbacks exécutés dans la page */

// Tests rouges — identité Nova dans le navigateur (SPEC critères 1 à 5).
// Ils échouent tant que la page n'affiche pas le nom, l'emoji,
// l'accueil, les suggestions et les réponses signées Nova.

const NOM = 'Nova';
const EMOJI = '🎥';
const SUGGESTIONS = [
  'Quels sont les meilleurs films de science-fiction de tous les temps ?',
  "Explique-moi l'univers de Star Wars",
  'Quelle est la différence entre space opera et cyberpunk ?',
];

function surveiller(page) {
  const erreurs = [];
  page.on('pageerror', (e) => erreurs.push(e.message));
  return erreurs;
}

async function pageNeuve(page) {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
}

async function envoyer(page, texte) {
  await page.locator('#message').fill(texte);
  await page.getByRole('button', { name: /envoyer/i }).click();
}

const lignes = (page) => page.locator('#messages li');

test.describe('Identité Nova — titre et accueil (critères 1 à 3)', () => {
  test('Crit.1 — le titre principal affiche le nom Nova', async ({ page }) => {
    const erreurs = surveiller(page);
    await pageNeuve(page);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText(NOM);
    expect(erreurs).toHaveLength(0);
  });

  test('Crit.2 — un seul emoji est affiché à côté du nom', async ({ page }) => {
    await pageNeuve(page);
    await expect(page.locator('h1')).toContainText(EMOJI);
  });

  test('Crit.3a — conversation vide : l’accueil contient Nova et reste hors de #messages', async ({ page }) => {
    await pageNeuve(page);
    await expect(lignes(page)).toHaveCount(0);
    await expect(page.locator('#accueil')).toBeVisible();
    await expect(page.locator('#accueil')).toContainText(NOM);
    await expect(page.locator('#messages #accueil')).toHaveCount(0);
  });

  test('Crit.3b — l’accueil disparaît dès le premier message envoyé', async ({ page }) => {
    await pageNeuve(page);
    await envoyer(page, 'salut');
    await expect(lignes(page)).toHaveCount(2);
    await expect(page.locator('#accueil')).not.toBeVisible();
  });

  test('Crit.3c — l’accueil revient quand la conversation est effacée', async ({ page }) => {
    await pageNeuve(page);
    await envoyer(page, 'salut');
    await expect(lignes(page)).toHaveCount(2);
    page.once('dialog', (d) => d.accept());
    await page.locator('#effacer').click();
    await expect(lignes(page)).toHaveCount(0);
    await expect(page.locator('#accueil')).toBeVisible();
    await expect(page.locator('#accueil')).toContainText(NOM);
  });
});

test.describe('Identité Nova — suggestions et signature (critères 4 et 5)', () => {
  test('Crit.4a — trois questions SF exactes, hors de #messages', async ({ page }) => {
    await pageNeuve(page);
    await expect(page.locator('#suggestions')).toBeVisible();
    await expect(page.locator('#messages #suggestions')).toHaveCount(0);
    const boutons = page.locator('#suggestions button');
    await expect(boutons).toHaveCount(3);
    for (let i = 0; i < SUGGESTIONS.length; i += 1) {
      await expect(boutons.nth(i)).toHaveText(SUGGESTIONS[i]);
    }
  });

  test('Crit.4b — cliquer une suggestion la place dans le champ sans l’envoyer', async ({ page }) => {
    await pageNeuve(page);
    const avant = await lignes(page).count();
    await page.locator('#suggestions button').nth(1).click();
    await expect(page.locator('#message')).toHaveValue(SUGGESTIONS[1]);
    await expect(lignes(page)).toHaveCount(avant);
  });

  test('Crit.5 — la réponse de l’assistant commence par Nova, pas par Cap Web', async ({ page }) => {
    const erreurs = surveiller(page);
    await pageNeuve(page);
    await envoyer(page, 'salut');
    await expect(lignes(page)).toHaveCount(2);
    const texte = await lignes(page).nth(1).textContent();
    expect(texte.trim().startsWith(NOM)).toBe(true);
    expect(texte).not.toContain('Cap Web');
    expect(erreurs).toHaveLength(0);
  });
});
