const Post = require('../models/post')

module.exports = {
    // Posts Index
    async postIndex(req, res, next) {
        let posts = await Post.find({});
        // looing inside the /views by default
        res.render('posts/index', { posts: posts });
    },
    // Posts New
    postNew(req, res, next) {
        res.render('posts/new');
    },

    // Post Create
    async postCreate(req, res, next) {
        let post = Post.create(req.body.post);
        console.log(post);
        res.redirect(`/posts/${post.id}`);
    }

}