'use strict';
const basicAuth = require('basic-auth');
const userinformation = require('../models/userinformation.js');

function unauthorized(res) {
	// 认证框要求输入用户名和密码的提示语
	res.set('WWW-Authenticate', 'Basic realm=Input User&Password');
	return res.sendStatus(401);
}

const auth = function(req, res, next) {
	const user = basicAuth(req);
  
	if (!user || !user.name || !user.pass) {
		return unauthorized(res);
	}
	userinformation
		.findOne({ username: user.name })
		.exec((err, user) => {
			if (user && user.pass === user.password) {
				req.session.user = user;
				return next();
			} else {
				return unauthorized(res);
        	}
    	});	
};

module.exports = auth;