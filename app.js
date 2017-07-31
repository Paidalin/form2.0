'use strict';
var express = require('express');
var app = express();

require('./middlewares/mongo.js')(app);
require('./routes/index.js')(app);
require('./code.js');

app.listen(80);