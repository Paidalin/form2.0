'use strict';
const action = require('../models/action.js');
const form = require('../models/form.js');
const express = require('express');
const router = express.Router();
const util = require('../lib/util');

// 首页
router.get('/home', (req, res, next) => {
    action
        .find({ isDeleted: false, isHidden: false })
        .limit(20)
        .select('id actionName startDate endDate description logoUrl')
        .sort('startDate')
        .exec((err, actions) => {
            if (err) return next(err);
            res.send(actions);
        });
});

function getFormid(req, res, next) {
    const formid = req.params.formid;
    action
        .findById(formid)
        .where('isDeleted').equals(false)
        .exec((err, action) => {
            if (err) return next(err);
            if(!action) return next(util.standardError(1102, '没有该活动'));
            req.session.action = action;
            next();
        });
}

// 提交活动内容
router.get('/:formid', getFormid, (req, res, next) => {
    const action = req.session.action;
    res.send(action);
});

// 用户提交表单
router.post('/:formid', getFormid, (req, res, next) => {
    const formid = req.params.formid;
    const data = req.body;
    const form = new form({
        actionid: formid,
        form: data.form,
    });
    form.save((err) => {
        return next(err);
    });
    res.sendStatus(200);
});

module.exports = router;