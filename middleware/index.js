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
    // isLoggedIn Method
    // check to see if a user is logged in. 
    // 1. if not logged in, take him/her back to the login Page
    // 1-2. after logging in, take them back to the previous page (if they were trying to create a new post, take them back to '/posts/new')
    isLoggedIn: (req, res, next) => {
        // isAuthenticated = passport method 
        if (req.isAuthenticated()) return next();
        // if not logged in
        req.session.error = 'You need to be logged in to do that!';
        // '/posts/new' => '/login' : redirectTo = '/posts/new'
        req.session.redirectTo = req.originalUrl;
        res.redirect('/login');
    }

}