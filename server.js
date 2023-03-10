require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const indexRouter = require('./src/routes/index.route');
const classicRouter = require('./src/routes/classic.route');
const gameRouter = require('./src/routes/game.route');

// Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(layouts);

// Configure Express
app.use(express.static('public'));
app.use('/libs/jquery', express.static('node_modules/jquery/dist'));
app.use('/libs/boxicons', express.static('node_modules/boxicons'));
app.set('view engine', 'ejs');

// Configure session middleware
app.use(session({
    name: 'bingo',
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 1000 * 60 * 1440
    }
}));

// Routes
app.use('/', indexRouter);
app.use('/classic', classicRouter);
app.use('/play', gameRouter);

app.get('*', function(req, res) {
    res.render('error', { user: req.user });
});

// Listen
app.listen(port, () => {
    console.info(`App listening at http://localhost:${port}`)
});
