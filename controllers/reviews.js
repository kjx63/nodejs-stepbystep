const Post = require('../models/post');
const Review = require('../models/review');


module.exports = {
    // Review Create
    async reviewCreate(req, res, next) {
        // find the post by its id
        let post = await Post.findById(req.params.id);
        // create the review 
        req.body.review.author = req.user._id; // to save the author to the review
        let review = await Review.create(req.body.review);
        // assign review to post 
        post.reviews.push(review);
        // save the post 
        await post.save();
        // redirect to post
        req.session.success = 'Review created successfully!';
        res.redirect(`/posts/${post.id}`);
    },
    // Review Update
    async reviewUpdate(req, res, next) {

    },

    //Review Destroy 
    async reviewDestroy(req, res, next) {

    }
}