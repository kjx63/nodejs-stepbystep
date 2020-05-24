const User = require('../models/user');
const passport = require('passport')

module.exports = {
    // Post /register
    // In ES6, this is how you create the method on this object{}
    async postRegister(req, res, next) {
        // https://github.com/saintedlama/passport-local-mongoose/blob/master/examples/login/routes.js
        const newUser = new User({
            username: req.body.username,
            // Add other keys here
            email: req.body.email,
            image: req.body.image
        });

        await User.register(newUser, req.body.password);
        res.redirect('/');
    },

    // POST /login
    postLogin(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login'
        })(req, res, next);
    },

    // GET /logout
    getLogout(req, res, next) {
        req.logout();
        res.redirect('/');
    }
}