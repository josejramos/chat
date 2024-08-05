const socket = io();

// Obtém o nome de usuário do localStorage
const username = localStorage.getItem('username');

if (!username) {
    window.location.href = 'login.html'; // Redireciona para a página de login se o nome de usuário não estiver definido
}

// Seleção dos elementos
const fileInput = document.getElementById('fileInput');
const imageContainer = document.getElementById('imageContainer');
const messageContainer = document.getElementById('messageContainer');
const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessageButton');

// Envio de imagem para o servidor
fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        const imageData = reader.result;
        socket.emit('image', { image: imageData, user: username });
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

// Recebe a imagem e adiciona ao container
socket.on('image', (data) => {
    const { image, user } = data;
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `
        <span class="username">${user}:</span>
        <img src="${image}" />
    `;
    imageContainer.appendChild(messageElement);
});

// Envio de mensagem para o servidor
sendMessageButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('message', { text: message, user: username });
        messageInput.value = '';
    }
});

// Recebe a mensagem e adiciona ao container
socket.on('message', (data) => {
    const { text, user } = data;
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<span class="username">${user}:</span> <span class="text">${text}</span>`;
    messageContainer.appendChild(messageElement);
});

// Recebe mensagens anteriores do servidor e as exibe
socket.on('previousMessages', (messages) => {
    messages.forEach((message) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        if (message.image) {
            messageElement.innerHTML = `
                <span class="username">${message.user}:</span>
                <img src="${message.image}" />
            `;
        } else {
            messageElement.innerHTML = `
                <span class="username">${message.user}:</span>
                <span class="text">${message.text}</span>
            `;
        }
        messageContainer.appendChild(messageElement);
    });
});
