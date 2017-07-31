'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');

router.use('/user', express.static(path.join(__dirname, '../public/user')));
router.use('/creator', express.static(path.join(__dirname, '../public/creator')));
router.use('/register', express.static(path.join(__dirname, '../public/register')));

module.exports = router;