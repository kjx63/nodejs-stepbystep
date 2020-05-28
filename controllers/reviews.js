const Post = require('../models/post');
const Review = require('../models/review');


module.exports = {
    // Review Create
    async reviewCreate(req, res, next) {
        // find the post by its id
        // // make sure we get all the individual review documents inside of the reviews array.
        let post = await Post.findById(req.params.id).populate('reviews').exec();
        // haveReviewed = is there any reviews the user have posted or empty array?
        let haveReviewed = post.reviews.filter(review => {
            return review.author.equals(req.user._id);
        }).length;
        // if the logged-in user already reviewed one time
        if (haveReviewed) {
            req.session.error = 'Sorry, you can only create one review per post.';
            return res.redirect(`/posts/${post.id}`);
        }
        // otherwise, create the review 
        // // add the author to the review
        req.body.review.author = req.user._id;
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
        await Review.findByIdAndUpdate(req.params.review_id, req.body.review);
        req.session.success = 'Review updated successfully!';
        res.redirect(`/posts/${req.params.id}`);
    },

    //Review Destroy 
    async reviewDestroy(req, res, next) {
        // find the post by its id and update it by deleting the review id from the post.reviews array.
        await Post.findByIdAndUpdate(req.params.id, {
            $pull: { reviews: req.params.review_id }
        });
        // find the actual review document and remove the review from thd database.
        await Review.findByIdAndRemove(req.params.review_id);
        req.session.success = 'Review deleted successfully!';
        res.redirect(`/posts/${req.params.id}`);

    }
}