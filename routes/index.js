const express = require('express');
const router = express.Router();
const passport = require('passport')
const { postRegister } = require('../controllers');
const { asyncErrorHandler } = require('../middleware');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Nodejs-Basics' });
});


/* GET /register */
router.get('/register', (req, res, next) => {
    res.send('GET /register');
});

/* POST /register */
router.post('/register', asyncErrorHandler(postRegister));

/* GET /login */
router.get('/login', (req, res, next) => {
    res.send('GET /login');
});

/* POST /login */
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

/* Get /logout */
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

/* GET /profile */
router.get('/profile', (req, res, next) => {
    res.send('GET /profile');
});

/* PUT /profile/:user_id */
router.put('/profile/:user_id', (req, res, next) => {
    res.send('PUT /profile/:user_id');
});


/* GET /forgot */
router.get('/forgot', (req, res, next) => {
    res.send('GET /forgot');
});

/* PUT /forgot */
router.put('/forgot', (req, res, next) => {
    res.send('PUT /forgot');
});

/* GET /reset/:token */
router.get('/reset/:token', (req, res, next) => {
    res.send('GET /reset/:token');
});

/* GET /reset/:token */
router.put('/reset/:token', (req, res, next) => {
    res.send('GET /reset/:token');
});

module.exports = router;