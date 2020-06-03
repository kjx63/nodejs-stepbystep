const User = require('../models/user');
const passport = require('passport')

module.exports = {
    // GET /register
    getRegister(req, res, next) {
        res.render('register', { title: 'Register' });
    },

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

        let user = await User.register(newUser, req.body.password);
        // to establish a login session
        // // http://www.passportjs.org/docs/login/
        req.login(user, function(err) {
            if (err) return next(err);
            req.session.success = `Welcome to Surf Shop, ${user.username}!`
            res.redirect('/');
        });
        // When the login operation completes, user will be assigned to req.user.
        res.redirect('/');
    },

    // GET /login
    getLogin(req, res, next) {
        res.render('login', { title: 'Login' });
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
        req.session.success = "Successfully Logged you out!"
        res.redirect('/');
    }
}