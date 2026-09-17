import { validateMessage, replyTo } from './brain.js';
import { renderMessages } from './view.js';
import { persona } from './persona.js';

document.querySelector('#status').textContent = 'Votre point de départ est prêt.';

const formulaire = document.querySelector('#chat-form');
const statut = document.querySelector('#status');
const versionElt = document.querySelector('#version');
const champ = document.querySelector('#message');
const messages = document.querySelector('#messages');
const effacerButton = document.querySelector('#effacer')
const accueil = document.querySelector('#accueil');
const suggestions = document.querySelector('#suggestions');
let historique = [];

function afficherAccueil() {
  if (accueil) {
    // L'accueil n'est pas une ligne de #messages : il disparaît dès le premier message.
    accueil.textContent = historique.length === 0 ? persona.accueil : '';
    accueil.hidden = historique.length !== 0;
  }
  if (suggestions) {
    suggestions.replaceChildren();
    if (historique.length === 0) {
      suggestions.hidden = false;
      persona.suggestions.forEach((texte) => {
        const bouton = document.createElement('button');
        bouton.type = 'button';
        // Texte uniquement : jamais de HTML injecté.
        bouton.textContent = texte;
        bouton.addEventListener('click', () => {
          // Remplit le champ sans envoyer.
          champ.value = texte;
          champ.focus();
        });
        suggestions.appendChild(bouton);
      });
    } else {
      suggestions.hidden = true;
    }
  }
}

try {
  historique = JSON.parse(localStorage.getItem('capweb.historique'))
  historique.forEach(ligne => {
    if (ligne.role !== "user" && ligne.role !== "assistant") throw new Error;
    if (validateMessage(ligne.text).ok === false) throw new Error;
  });
    renderMessages(historique,messages);
    afficherAccueil();
    
} catch (error) {
  historique = []
  localStorage.removeItem('capweb.historique')
  statut.textContent = "Impossible de récuperer la conversation."
  afficherAccueil();
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
  afficherAccueil();

  champ.value = '';
  champ.focus();
  statut.textContent = "";

});

effacerButton?.addEventListener('click', event => {
    event.preventDefault();
    if (!confirm('Voulez-vous effacer la conversation ?')) return;
    
    historique = [];
    localStorage.removeItem('capweb.historique')
    renderMessages(historique,messages);
    afficherAccueil();
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
