const Post = require('../models/post')

module.exports = {
    // Posts Index
    async postIndex(req, res, next) {
        let posts = await Post.find({});
        // looing inside the /views by default
        res.render('posts/index', { posts: posts, title: "Posts Index!" });
    },
    // Posts New
    postNew(req, res, next) {
        res.render('posts/new');
    },

    // Post Create
    async postCreate(req, res, next) {
        let post = await Post.create(req.body.post);
        res.redirect(`/posts/${post.id}`);
    },

    //Post Show 
    async postShow(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/show', { post });
    },

    // Post Edit
    async postEdit(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/edit');
    },
    // Post Update
    async postUpdate(req, res, next) {
        let post = await Post.findByIdAndUpdate(req.params.id, req.body.post, { new: true });
        res.redirect(`/posts/${post.id}`); // post.id can be replaced with req.params.id
    },

    //Post Destroy 
    async postDestroy(req, res, next) {
        await Post.findByIdAndRemove(req.params.id);
        res.redirect('/posts');
    }


}