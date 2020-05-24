const User = require('../models/user');

module.exports = {
    // In ES6, this is how you create the method on this object{}
    postRegister(req, res, next) {
        // https://github.com/saintedlama/passport-local-mongoose/blob/master/examples/login/routes.js
        User.register(new User({ username: req.body.username }), req.body.password, (err) => {
            if (err) {
                console.log('error while user register!', err);
                return next(err);
            }
            console.log('user registered!');

            res.redirect('/');
        });
    }
}