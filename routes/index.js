const express = require('express');
const router = express.Router();
const {
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    getLogout
} = require('../controllers');
const { asyncErrorHandler } = require('../middleware');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Nodejs-Basics' });
});


/* GET /register */
router.get('/register', getRegister);

/* POST /register */
router.post('/register', asyncErrorHandler(postRegister));

/* GET /login */
router.get('/login', getLogin);

/* POST /login */
router.post('/login', postLogin);

/* Get /logout */
router.get('/logout', getLogout);

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