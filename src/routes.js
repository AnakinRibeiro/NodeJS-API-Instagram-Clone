const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
// Utilizando o Multer para fazer o upload da imagem para dentro dos arquivos
const upload = multer(uploadConfig);

// Rota para listar todos os posts utilizando o PostController.index
routes.get('/posts', PostController.index);

// Rota para inserir post e fazendo o upload da imagem para dentro dos arquivos SRC utilizando o PostController.store
routes.post('/posts', upload.single('image'), PostController.store);

// Rota para dar um like em um post
routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;