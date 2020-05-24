const User = require('../models/user');

module.exports = {
    // In ES6, this is how you create the method on this object{}
    postRegister(req, res, next) {
        res.send('POST /register');
    }
}