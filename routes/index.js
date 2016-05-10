var express = require("express");
var router = express.Router();

var Record = require('../models/record');

router.get('/', ensureAuthenticated, function(req, res) {
	res.render('index');
});

router.get('/api/data/:date', ensureAuthenticated, function(req, res) {
	var date = req.params.date;

	Record.getAllRecordsByUsername(res.locals.user.username, function(err, record){
  	if(err) throw err;
  	if(!record){
	  	return done(null, false);
  	}
		//res.send(JSON.stringify(record));
		res.send(record);
	});

	//res.send(JSON.stringify({userName: "b", description: "dfsdf"}));
});

router.get('/recordAdd', ensureAuthenticated, function(req, res) {
	res.render('recordAdd');
});

router.post('/recordAdd', function(req, res){
	var name = req.body.recordName;
	var description = req.body.description;
	var date = req.body.date;
	var time = req.body.time;

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
		var newRecord = new Record({
			recordName:name,
			userName: res.locals.user.username,
			description:description,
			date:date,
			time:time
		});

		Record.createRecord(newRecord, function(err, record){
				if(err) throw err;
		});
		req.flash('success_msg', 'Запись успешно добавлена');
		res.redirect('/');
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
