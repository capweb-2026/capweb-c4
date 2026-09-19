
export function validateMessage(raw) {
  if(typeof(raw) !== "string") return { 'ok': false, 'error': 'Message invalide : il faut du texte.' };
  const trimedMessage = raw.trim();

  if (trimedMessage.length === 0 || typeof(trimedMessage) !== "string" || trimedMessage.length > 280 ) {
    return { 'ok': false, 'error': 'Message vide ou trop long : 280 caractères maximum.' };
  }
  return {'ok': true, 'value' : trimedMessage};
}

export function replyTo(message) {
  message = validateMessage(message).value ? validateMessage(message).value : ''
  message = message.toLowerCase();
  if (message === "salut" || message === "bonjour") return "Salut ! Prêt à explorer le cinéma de science-fiction ?"
  else if (message === "aide") return "Pose-moi une question sur un film, un réalisateur ou un sous-genre : space opera, cyberpunk, hard SF."
  else if (message === "test") return "Tous les systèmes sont opérationnels, le vaisseau répond."
  else return "Je n'ai pas compris. Je ne parle que de cinéma de science-fiction : demande-moi un film ou un sous-genre."
}