const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

// Conexão via HTTP
const server = require('http').Server(app);
// Conexão via WebSocket
const io = require('socket.io')(server);

/* URL para conexão ao banco online */
mongoose.connect('mongodb+srv://eduardo:semana@cluster0-ikhzi.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

// Permitir que todas as rotas e middleweres usem a conexão websocket
app.use((req, res, next) => {
    req.io = io;

    next();
})

// Permitir que outas apps usem a API
app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

/* Usando o arquivo routes.js */
app.use(require('./routes'));

/* Ouvindo a porta 3001 */
server.listen(3001);