export const persona = {
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

export function validatePersona(candidate) {
  const erreurs = [];
  if (!candidate || typeof candidate !== 'object') {
    return { ok: false, erreurs: ['persona invalide'] };
  }
  if (typeof candidate.nom !== 'string' || candidate.nom.length < 2 || candidate.nom.length > 20) {
    erreurs.push('le nom doit comporter entre 2 et 20 caractères');
  }
  if (!estEmojiUnique(candidate.emoji)) {
    erreurs.push("l'emoji doit être exactement un emoji");
  }
  if (
    typeof candidate.accueil !== 'string' ||
    typeof candidate.nom !== 'string' ||
    !candidate.accueil.includes(candidate.nom)
  ) {
    erreurs.push("l'accueil doit contenir le nom");
  }
  if (!Array.isArray(candidate.suggestions) || candidate.suggestions.length !== 3) {
    erreurs.push('il faut exactement trois suggestions');
  } else {
    candidate.suggestions.forEach((suggestion) => {
      if (typeof suggestion !== 'string' || suggestion.trim().length === 0) {
        erreurs.push('aucune suggestion ne doit être vide');
      }
    });
  }
  if (erreurs.length > 0) {
    return { ok: false, erreurs };
  }
  return { ok: true };
}
