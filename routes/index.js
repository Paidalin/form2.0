'use strict';
var wx = require('../middlewares/wx.js');
var excel = require('../middlewares/excel.js');
var credentials = require('../credentials.js');
var errorHandler = require('../middlewares/errorHandler.js');
var unfoundHandler = require('../middlewares/unfoundHandler.js');

var session = require('express-session');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var fs = require('fs');

module.exports = function (app) {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(require('cookie-parser')(credentials.cookieSecret));
    app.use(session({
        secret: 'cool_leooo',
        name: 'lin_cookie',
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },//30 days
        resave: false,
        saveUninitialized: true,
    }));
    var logpath = __dirname + 'logger.log';
    var accessLogStream = fs.createWriteStream(logpath, {flags: 'a'});

    app.use(morgan('short', {stream: accessLogStream}));
    app.use('/',require('./page.js'));
    app.use('/register',require('./register.js'));
    app.use('/creator',require('./creatorRouter.js'));
    app.use('/creator/download/:formid', excel.createFile, excel.downloadFile);
    app.use('/user', require('./userRouter.js'));

    app.use(errorHandler);
    app.use(unfoundHandler);
}