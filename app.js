const createError = require('http-errors');
const express = require('express');
const engine = require('ejs-mate');
var favicon = require('serve-favicon');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session')
const User = require('./models/user');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// require routes
const index = require('./routes/index');
const posts = require('./routes/posts');
const reviews = require('./routes/reviews');

const app = express();

// connect to the database
// - https://mongoosejs.com/docs/index.html
mongoose.connect('mongodb://localhost:27017/nodejs_basics', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('We\'re connected!');

});

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set public assets directory
app.use(express.static('public'));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // set true if using this syntax name="post[title]"
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// https://github.com/expressjs/method-override
app.use(methodOverride('_method'));

// In a Connect or Express-based application, passport.initialize() middleware is required to initialize Passport. 
// configure Passport/Passport-Local (https://github.com/saintedlama/passport-local-mongoose);
app.use(session({
    secret: 'Juke is the best dog!',
    resave: false,
    saveUninitialized: true,
}));

// http://www.passportjs.org/docs/configure/
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// pre-route middleware
// set local variables middleware
app.use(function(req, res, next) {
    // Set the default user 
    // req.user = {
    //     '_id': '5eca72c2f445070f3c3a9071', // Kenji
    //     // '_id': '5eca75c551b2790ff7c1e5cd', // Kenji2
    //     'username': 'Kenji',
    // }
    res.locals.currentUser = req.user; // any views it gets rendered, we have currentUser available
    // set default page title
    res.locals.title = 'Surf Shop';

    // set success flash message
    res.locals.success = req.session.success || ''; // if there's no req.session.success, then we need it to empty string ''.
    delete req.session.success; // After dealing with the session, need to get rid of it.
    // set error flash message
    res.locals.error = req.session.error || '';
    delete req.session.error;

    // continue onto next function in middleware chain
    next();
});

// Mount routes
app.use('/', index);
app.use('/posts', posts);
app.use('/posts/:id/reviews', reviews);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// post-route error handling middleware
app.use(function(err, req, res, next) {
    // // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};

    // // render the error page
    // res.status(err.status || 500);
    // res.render('error');
    console.log(err); // console.log() the full err for developers
    req.session.error = err.message; // for users
    res.redirect('back');
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, () => {});

module.exports = app;