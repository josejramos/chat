document.getElementById('registerButton').addEventListener('click', () => {
    const username = document.getElementById('usernameInput').value.trim();
    if (username) {
        fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'User registered successfully') {
                alert('Registro bem-sucedido! Você pode agora entrar.');
            } else {
                alert(data.message);
            }
        })
        .catch(error => alert('Erro ao registrar usuário.'));
    } else {
        alert('Por favor, digite um nome.');
    }
});

document.getElementById('loginButton').addEventListener('click', () => {
    const username = document.getElementById('usernameInput').value.trim();
    if (username) {
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Login successful') {
                localStorage.setItem('username', username);
                window.location.href = 'chat.html'; // Redireciona para a página do chat
            } else {
                alert(data.message);
            }
        })
        .catch(error => alert('Erro ao fazer login.'));
    } else {
        alert('Por favor, digite um nome.');
    }
});

