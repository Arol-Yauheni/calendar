var express = require("express");
var router = express.Router();

var Record = require('../models/record');

router.get('/', ensureAuthenticated, function(req, res) {
	res.render('index');
});

router.get('/recordAdd', ensureAuthenticated, function(req, res) {
	res.render('recordAdd');
});

router.post('/recordAdd', function(req, res){
	var name = req.body.recordName;
	var description = req.body.description;
	var date = req.body.date;
	var description = req.body.time;


	req.checkBody('recordName', 'Введите название события').notEmpty();
	req.checkBody('description', 'Введите описание').notEmpty();
	req.checkBody('date', 'Введите дату').notEmpty();
	req.checkBody('time', 'Введите время').notEmpty();


	var errors = req.validationErrors();

	if(errors){
		res.render('recordAdd',{
			errors:errors
		});
	} else {
		/*var newRecord = new Record({
			email:email,
			username: username,
			password: password
		});*/

	/*	User.getUserByUsername(username, function(err, user){
			if(err) throw err;
	   	if(!user){
				User.createUser(newUser, function(err, user){
						if(err) throw err;
				});
				req.flash('success_msg', 'Вы успешно зарегистрировались');
				res.redirect('/users/login');
	   	} else {
				req.flash('error_msg', 'Пользователь с таким именем уже существует');
				res.redirect('/users/register');
			}
    });*/
	}
});

function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/users/login');
	}
}

module.exports = router;
