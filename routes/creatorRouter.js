'use strict';
const action = require('../models/action.js');
const jihuoma = require('../models/jihuoma.js');
const form = require('../models/form.js');
const basicAuth = require('../middlewares/basicAuth.js');
const express = require('express');
const router = express.Router();
const util = require('../lib/util');


// /creator
//创建者根路径设置认证
router.use('/', basicAuth);

// 创建活动界面
// post /creator/create
router.post('/create', (req, res, next) => {
    // 获得必要（非自定义）的表单信息
    const data = req.body;
    action
        .findOne({ actionName: data.actionName })
        .exec((err, action) => {
            if (err) {
                return next(err);
            } else if (action) {
                return next(util.standardError(1001, '活动名已存在'));
            } else {
                const newAction = new action({
                    startDate: new Date(data.startDate),
                    endDate: new Date(data.endDate),
                    actionName: data.actionName,
                    action: data.action,
                    creator: req.session.user._id,
                    description: data.description,
                    detail: data.detail,
                    isHidden: data.isHidden,
                    logoUrl: data.logoUrl,
                });
                newAction.save((err) => {
                    return next(err);
                });
                req.session.action = newAction;
                res.sendStatus(200);
            }
        });
});

// 添加活动id认证
function getFormId(req, res, next) {
    const formid = req.params.formid;
    action
        .findById(formid)
        .where('idDeleted').equals(false)
        .exec((err, action) => {
            if (err) return next(err);
            if (!action) return next(util.standardError(1002, '没有该活动'));
            req.session.action = action;
            next();
        });
}

// 查看自己所有活动界面
router.get('/read', (req, res, next) => {
    action
        .find({ creator: req.session.user._id })
        .select('actionName id')
        .exec((err, actions) => {
            if (err) return next(err);
            res.send(actions);
        });
});

// 提交某一活动信息
router.get('/change/:formid', getFormId, (req, res, next) => {
    const action = req.session.action;
    res.send(action);
});

// 修改活动信息
router.post('/change/:formid', getFormId, (req, res, next) => {
    const action = req.session.action;
    const data = req.body;

    action.startDate = new Date(data.startDate) || action.startDate;
    action.endDate = new Date(data.endDate) || action.endDate;
    action.actionName = data.actionName || action.actionName;
    action.action = data.action || action.action;
    action.description = data.description || action.description;
    action.detail = data.detail || action.detail;
    action.isHidden = data.isHidden || action.isHidden;
    action.logoUrl = data.logoUrl || action.logoUrl;

    action.save((err) => {
        return next(err);
    });
    req.session.action = action;
    res.sendStatus(200);
});

// 删除某个活动
router.delete('/delete/:formid', getFormId, (req, res, next) => {
    const action = req.session.action;
    action.isDeleted = true;
    action.save((err) => {
        return next(err);
    });
});

// 查看某个活动所有表单
router.get('/readone/:formid', getFormId, (req, res, next) => {
    const formid = req.params.formid;
    form
        .find({ actionid: formid })
        .select('form')
        .exec((err, forms) => {
            if (err) return next(err);
            action
                .find({ _id: acid })
                .select('action')
                .exec((err, actions) => {
                    if (err) return next(err);
                    for (var fo in forms) {
                        actions.push(forms[fo]);
                    }
                    res.send(actions);
                });
        });
});

module.exports = router;