const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    /* Função para listar todos os posts */
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt');

        // Retorna um JSON para ser mostrado
        return res.json(posts);
    },

    /* Função para inserir post */
    async store(req, res) {
        // Desestruturando req.body e req.file pra dentro das respectivas variaveis
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        const [name] = image.split('.');
        const fileName = `${name}.jpg`;

        // Redimensiona imagem
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )
        
        // Deleta imagem com tamanho original
        fs.unlinkSync(req.file.path);

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName,
        })

        // todos o usuarios recebem o post em realtime
        req.io.emit('post', post);

        // Retorna um JSON do post para ser inserido
        return res.json(post);
    }
};