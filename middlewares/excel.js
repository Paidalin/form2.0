'use strict';

var xlsx = require('node-xlsx');
var fs = require('fs');
var form = require('../models/form.js');
var action = require('../models/action.js');
var path = require('path');
const util = require('../lib/util');

module.exports.createFile = function (req, res, next) {
    var acid = req.params.formid.slice(3);
    form.find({ actionid: acid }, function (err, forms) {
        if (err) console.log(err);
        action.find({ _id: acid }, function (err, actions) {
            var data = [];            
            var actionInformation = actions[0].action;
            var actionJson = JSON.parse(actionInformation);
            data.push(Object.keys(actionJson).toString().split(','));
            for (var fo in forms) {
                data.push(forms[fo].form.split(','));
            }
            // console.log(data);
            var buffer = xlsx.build([
                { name: '表单集合', data: data }
            ]);
            var filePath = path.join(__dirname, '../xlsxfile', forms[0].actionid, '.xlsx');
            fs.writeFileSync(filePath, buffer, { 'flag': 'w' });
            });
    });
    next();
};

module.exports.downloadFile = function (req, res) {
    var fileName = req.params.formid;
    var filePath = path.join(__dirname, '../xlsxfile', fileName, '.xlsx');
    var stats = fs.statSync(filePath);
    if (stats.isFile()) {
        res.set({
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment; filename=' + fileName,
            'Content-Length': stats.size
        });
        fs.createReadStream(filePath).pipe(res);
        res.sendStatus(200);
    } else {
        return next(util.standardError(1003, '下载文件失败'));
    }
};
