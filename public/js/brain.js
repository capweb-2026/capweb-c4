
export function validateMessage(raw) {
  const trimedMessage = raw.trim();

  if (trimedMessage.length === 0 || typeof(trimedMessage) === String || trimedMessage.length > 280 ) {
    return { 'ok': false, 'error': 'Message invalide' };
  }
  return {'ok': true, 'value' : trimedMessage};
}

export function replyTo(message) {
    message = message.toLowerCase();
    if (message === "salut") return "yo" 
    else if (message === "bonjour") return "bonsoir"
    else if (message === "aide") return "demerde toi"
    else if (message === "test") return "test test"
    else return "pas compris"
}