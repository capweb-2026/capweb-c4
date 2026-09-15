import { validateMessage, replyTo } from './brain.js';
import { renderMessages } from './view.js';

document.querySelector('#status').textContent = 'Votre point de départ est prêt.';

const formulaire = document.querySelector('#chat-form');
const statut = document.querySelector('#status');
const versionElt = document.querySelector('#version');
const champ = document.querySelector('#message');
const messages = document.querySelector('#messages');
const effacerButton = document.querySelector('#effacer')
let historique = [];

try {
  historique = JSON.parse(localStorage.getItem('capweb.historique'))
  historique.forEach(ligne => {
    if (ligne.role !== "user" && ligne.role !== "assistant") throw new Error;
    if (validateMessage(ligne.text).ok === false) throw new Error;
  });
    renderMessages(historique,messages);
    
} catch (error) {
  historique = []
  localStorage.removeItem('capweb.historique')
  statut.textContent = "Impossible de récuperer la conversation."
}

// J1 : interface seule, on bloque l’envoi et on l’explique.
formulaire?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (statut) {
    statut.textContent = 'Interface prête ; les réponses arrivent au J2.';
  }
  const cleanedMessage = validateMessage(champ.value);

  if (!cleanedMessage.ok) {
    statut.textContent = cleanedMessage.error;
    return;
  }

  historique.push({'role':'user', 'text':cleanedMessage.value})
  historique.push({'role':'assistant', 'text':replyTo(cleanedMessage.value)})

  localStorage.setItem('capweb.historique', JSON.stringify(historique))

  renderMessages(historique,messages);

  champ.value = '';
  champ.focus();
  statut.textContent = "";

});

effacerButton?.addEventListener('click', event => {
    event.preventDefault();
    historique = [];
    localStorage.removeItem('capweb.historique')
    renderMessages(historique,messages);
})

// Version du serveur local, échec discret si indisponible.
fetch('/version.json', { headers: { accept: 'application/json' } })
  .then((reponse) => (reponse.ok ? reponse.json() : null))
  .then((donnees) => {
    if (donnees && typeof donnees.version === 'string' && versionElt) {
      versionElt.textContent = `version ${donnees.version}`;
    }
  })
  .catch(() => {});
