const Post = require('../models/Post');

module.exports = {

    /* Função para dar like */
    async store(req, res) {
        const post = await Post.findById(req.params.id);

        post.likes += 1;

        await post.save();

        // todos os usuarios recebem o like em realtime
        req.io.emit('like', post);

        return res.json(post);
    }
};