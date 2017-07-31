var url = require('url');
var crypto = require('crypto');

var TOKEN = 'lin';

module.exports.getService = function (req, res, next) {
    var reqObj = url.parse(req.url, true);
    var params = reqObj['query'];
    var signature = params['signature'];
    var timestamp = params['timestamp'];
    var nonce = params['nonce'];
    var echostr = params['echostr'];
    var tmpArr = [TOKEN, timestamp, nonce];
    tmpArr.sort();
    var tmpStr = tmpArr.join('');
    var shasum = crypto.createHash('sha1');
    shasum.update(tmpStr);
    var shaResult = shasum.digest('hex');
    if(shaResult == signature) {
        next();
    } else {
        res.send('登陆失败！');
    }
}