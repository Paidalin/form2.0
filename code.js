// 创建激活码数据库。
const mongoose = require('mongoose');
const jihuoma = require('./models/jihuoma.js');
const uuid = require('uuid');
const xlsx = require('node-xlsx');
const path = require('path');
const fs = require('fs');

function xiazai() {
    jihuoma
        .find({})
        .exec((err, codes) => {
            const data = [];
            for (var co in codes) {
                const temp = co + ',' + codes[co]._id;
                data.push(temp.split(','));
            }
            var buffer = xlsx.build([
                { name: '激活码', data: data }
            ]);
            var filePath = path.join(__dirname, './xlsxfile/激活码.xlsx');
            fs.writeFileSync(filePath, buffer, { 'flag': 'w' });
        });
}

function jihuo() {
    jihuoma
        .find({})
        .exec((err, codes) => {
            if(err) return next(err);
            if (!codes.length) { 
                for (var i = 0; i < 200; i++) {
                    new jihuoma({
                        id: uuid.v1(),
                    }).save();
                }
                setTimeout(function(){
                    xiazai();
                },10000);
            } else {
                console.error('数据库已存在');
            }
        });
}

module.exports = jihuo();