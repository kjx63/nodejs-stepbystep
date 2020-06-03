const User = require('../models/user');
const passport = require('passport')

module.exports = {
    // GET /register
    getRegister(req, res, next) {
        res.render('register', { title: 'Register', username: '', email: '' });
    },
    // Post /register
    // In ES6, this is how you create the method on this object{}
    async postRegister(req, res, next) {
        try {
            const user = await User.register(new User(req.body), req.body.password);
            // let's log user in
            // In that way, we're not redirect back to the homepage and user don't have to go back to the logged in page.
            // a user has a logged in session
            // // http://www.passportjs.org/docs/login/
            req.login(user, function(err) {
                if (err) return next(err);
                req.session.success = `Welcome to Surf Shop, ${user.username}!`
                res.redirect('/');
            });

        } catch (err) {
            // create a custom error message
            // if username is already used, handle error is pre-set by passport local mongoose
            // But for the email, write it manually here
            const { username, email } = req.body;
            let error = err.message;
            if (error.includes('duplicate') && error.includes('index: email_1 dup key')) {
                error = 'A user with the given email is already registered';
            }
            res.render('register', { title: 'Register', username, email, error });
        }
    },

    // GET /login
    getLogin(req, res, next) {
        res.render('login', { title: 'Login' });
    },

    // POST /login
    // if successfully logged in, send them back to where they are from.
    async postLogin(req, res, next) {
        // pull up the username and passport variables
        const { username, password } = req.body;
        // try and authenticate a user
        const { user, error } = await User.authenticate()(username, password);

        if (!user && error) return next(error);
        // if there is a user (valid information, username and passwords are correct)
        req.login(user, function(err) {
            if (err) return next(err);
            req.session.success = `Welcome back, ${username}!`;
            // figure out where we redirect to // let's see isLoggedIn middleware
            // // req.session.redirectTo is how we stored that url from req.originalUrl
            const redirectUrl = req.session.redirectTo || '/';
            // we no longer have access to req.originalUrl but session persists until we delete it
            delete req.session.redirectTo;
            res.redirect(redirectUrl);
        });

    },

    // GET /logout
    getLogout(req, res, next) {
        req.logout();
        req.session.success = "Successfully Logged you out!"
        res.redirect('/');
    }
}