const Post = require('../models/post')

module.exports = {
    async postIndex(req, res, next) {
        let posts = await Post.find({});
        res.render('posts/index', { posts: posts });
    },

}