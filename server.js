const express = require('express');
const http = require('http');  // Adicionado para criar o servidor HTTP
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const messagesFilePath = path.join(__dirname, 'messages.json');
const usersFilePath = path.join(__dirname, 'users.json');

// Função para ler mensagens do arquivo JSON
const readMessages = () => {
    if (fs.existsSync(messagesFilePath)) {
        const data = fs.readFileSync(messagesFilePath, 'utf8');
        return JSON.parse(data);
    }
    return [];
};

// Função para salvar mensagens no arquivo JSON
const saveMessages = (messages) => {
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2), 'utf8');
};

// Função para ler usuários do arquivo JSON
const readUsers = () => {
    if (fs.existsSync(usersFilePath)) {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(data);
    }
    return [];
};

// Função para salvar usuários no arquivo JSON
const saveUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
};

let messages = readMessages();

// Middleware para processar JSON
app.use(express.json());

// Rota para registro de usuários
app.post('/register', (req, res) => {
    const { username } = req.body;
    const users = readUsers();

    if (users.some(user => user.username === username)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    users.push({ username });
    saveUsers(users);
    res.json({ message: 'User registered successfully' });
});

// Rota para login de usuários
app.post('/login', (req, res) => {
    const { username } = req.body;
    const users = readUsers();

    if (users.some(user => user.username === username)) {
        res.json({ message: 'Login successful' });
    } else {
        res.status(400).json({ message: 'User not found' });
    }
});

// WebSocket para mensagens e imagens
io.on('connection', (socket) => {
    console.log('Novo usuário conectado');

    // Envia mensagens anteriores para o novo usuário
    socket.emit('previousMessages', messages);

    // Recebe uma mensagem do cliente
    socket.on('message', (data) => {
        messages.push(data);
        saveMessages(messages);
        io.emit('message', data);
    });

    // Recebe uma imagem do cliente
    socket.on('image', (data) => {
        messages.push(data);
        saveMessages(messages);
        io.emit('image', data);
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });
});

// Serve arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Define a porta do servidor
const port = 8080; // Altere a porta aqui

server.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`);
});
