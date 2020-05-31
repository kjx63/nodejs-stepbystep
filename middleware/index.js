const Review = require('../models/review');
const User = require('../models/user');

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
    //make sure email that the new user registered is a unique email address.
    checkIfUserExists: async(req, res, next) => {
        // find the user by the email that's entered in the register form.
        // if we find a user with his email then we know that a user already exists with that email
        let userExists = await User.findOne({ 'email': req.body.email }); // returns a true or false
        // if above code returns true, 
        if (userExists) {
            req.session.error = 'A user with the given email is already registered';
            return res.redirect('back');
        }
        next();
    }

}