export function renderMessages(messages, container) {
    const lignes = [];
    messages.forEach(message => {
        const ligne = document.createElement('li');

        if (message.role === 'user') {
            ligne.textContent = 'Vous : '+message.text;
        }
        else if (message.role === 'assistant') {
            ligne.textContent = 'Cap Web : '+message.text;
        }
        lignes.push(ligne);
    });

    container.replaceChildren(...lignes);
}