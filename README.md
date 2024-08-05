Chat de Rede Interna
Este projeto é um sistema de chat para comunicação interna entre colaboradores. Ele permite que os usuários se registrem, façam login e se comuniquem em tempo real. As mensagens e imagens trocadas são armazenadas em arquivos JSON.

Funcionalidades
Registro de Usuários: Permite que novos usuários se registrem com um nome de usuário.
Login de Usuários: Permite que usuários existentes façam login.
Envio de Mensagens: Usuários podem enviar mensagens de texto que aparecem com o nome do remetente.
Envio de Imagens: Usuários podem enviar imagens que também são exibidas com o nome do remetente.
Histórico de Mensagens: As mensagens e imagens anteriores são recuperadas e enviadas para novos usuários quando eles se conectam.
Requisitos
Node.js
npm
Configuração
Clone o Repositório

bash
Copiar código
git clone https://github.com/seu-usuario/chat-rede-interna.git
cd chat-rede-interna
Instale as Dependências

bash
Copiar código
npm install
Inicie o Servidor

bash
Copiar código
npm start
O servidor estará disponível em http://localhost:8080.

Endpoints
Registro de Usuário
Método: POST

Rota: /register

Corpo da Requisição:

json
Copiar código
{
  "username": "nome_do_usuario"
}
Resposta:

json
Copiar código
{
  "message": "User registered successfully"
}
Login de Usuário
Método: POST

Rota: /login

Corpo da Requisição:

json
Copiar código
{
  "username": "nome_do_usuario"
}
Resposta:

json
Copiar código
{
  "message": "Login successful"
}
Funcionalidade WebSocket
O chat usa WebSockets para comunicação em tempo real. As seguintes mensagens são suportadas:

Mensagem de Texto: Envie uma mensagem de texto para o servidor. O servidor retransmite a mensagem para todos os clientes conectados.

json
Copiar código
{
  "username": "nome_do_usuario",
  "message": "Texto da mensagem"
}
Imagem: Envie uma imagem para o servidor. O servidor retransmite a imagem para todos os clientes conectados.

json
Copiar código
{
  "username": "nome_do_usuario",
  "image": "dados_da_imagem_em_base64"
}
Arquivos
messages.json: Armazena o histórico de mensagens e imagens.
users.json: Armazena a lista de usuários registrados.
Estrutura de Diretórios
public/: Diretório para arquivos estáticos, como HTML, CSS e JavaScript do lado do cliente.
src/: Código fonte do servidor (separado conforme sua preferência).
messages.json: Armazena as mensagens trocadas no chat.
users.json: Armazena os usuários registrados.
Contribuição
