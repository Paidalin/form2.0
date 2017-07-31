'use strict';
const express = require('express');
const router = express.Router();
const userinformation = require('../models/userinformation.js');
const jihuoma = require('../models/jihuoma.js');
const util = require('../lib/util');

router.post('/', (req, res, next) => {
    const data = req.body;
    userinformation
        .findOne({ username: data.username })
        .exec((err, user) => {
            if (err) return next(err);
            if (user) return next(util.standardError(1003, '用户名已存在'));
            jihuoma
                .findOne({ id: data.codeid })
                .exec((err, code) => {
                    if (!code.usable) return next(util.standardError(1004, '激活码不可用'));
                    const user = new userinformation({
                        username: data.username,
                        password: data.password,
                    });
                    user.save((err) => {
                        return next(err);
                    });
                    code.usable = false;
                    code.save((err) => {
                        return next(err);
                    });
                    req.session.user = user;
                    res.sendStatus(200);
                });
        });
});

module.exports = router;