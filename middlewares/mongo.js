var mongoose = require('mongoose');
var credentials = require('../credentials.js');

module.exports = function (app) {
    //判断mongo的运行环境
    var opts = {
        server: {
            socketOptions: { keepAlive: 1 },
        },
    };
    switch (app.get('env')) {
        case 'development':
            mongoose.Promise = global.Promise; 
            mongoose.connect(credentials.mongo.development.connectionString, opts);
            break;
        case 'production':
            mongoose.Promise = global.Promise; 
            mongoose.connect(credentials.mongo.production.connectionString, opts);
            break;
        default:
            throw new Error('Unknown execution environment: ' + app.get('env'));
    }
   
}
