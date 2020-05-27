const Review = require('../models/review');

module.exports = {
    asyncErrorHandler: (fn) =>
        (req, res, next) => {
            // returns the thenable promise fn()
            Promise.resolve(fn(req, res, next))
                // if error, catch it and pass it to the (next)
                .catch(next);
        },
    isReviewAuthor: async(req, res, next) => {
        // find the review 
        let review = await Review.findById(req.params.review_id);
        // check to see if the author of the review is equal to the person who currently logged in.
        if (review.author.equals(req.user._id)) {
            return next();
        }
        // if not, send them error flash message
        req.session.error = 'You do not have the permission to do that';
        return res.redirect('/');
    },

}