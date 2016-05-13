var express = require("express");
var router = express.Router();

var Record = require('../models/record');
var User = require('../models/user');

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
		res.send(record);
	});
});

router.get('/api/delRecord/:evId', ensureAuthenticated, function(req, res) {
	var evId = req.params.evId;

	Record.getRecordById(evId, function(err, record) {
		if(err) throw err;
 	  if(!record) {
 		 return done(null, false);
 	  }
		record.update({$pull:{usersName: res.locals.user.username}}, function(err, rec) {
			if(err) throw err;
	 	  if(!rec) {
	 		 return done(null, false);
		 	}
			req.flash('success_msg', 'Вы отказались от участия в событии');
			res.redirect('/viewInf/' + evId);
		});
	});
});

router.get('/api/addNewUser/:currName/:evId', ensureAuthenticated, function(req, res) {
	var name = req.params.currName;
	var evId = req.params.evId;

	Record.getRecordById(evId, function(err, record) {
		if(err) throw err;
 	  if(!record) {
 		 return done(null, false);
 	  }
		record.usersName.push(name);

		Record.addUserInRecord(record, function(err) {
			if(err) throw err;
			req.flash('success_msg', 'Новый участник успешно добавлен');
			res.redirect('/viewInf/' + evId);
		});
	});
});

router.get('/viewInf/:eventId', ensureAuthenticated, function(req, res) {
	var evId = req.params.eventId;
	Record.getRecordById(evId, function(err, record) {
		if(err) throw err;
 	  if(!record) {
 		 return done(null, false);
 	  }

		User.getAllUsers(function(err, users) {
			if(err) throw err;
	 	  if(!users) {
	 		 return done(null, false);
	 	  }
			var freeUsers = {
				name: record.recordName,
				date: record.date,
				time: record.time,
				description: record.description,
				eventId: evId,
				members: [],
				users: []
			};

			for (var i = 0; i < record.usersName.length; i++) {
				freeUsers.members.push({username: record.usersName[i]});
			}
			for (var i = 0; i < users.length; i++) {
				var check = 0;
				for (var j = 0; j < record.usersName.length; j++) {
					if(users[i].username !== record.usersName[j]) {
						check++;
						if(check === record.usersName.length){
							freeUsers.users.push({
								username: users[i].username,
								evId: evId
							});
						}
					}
				}
			}
			res.render('viewInf', freeUsers);
		});
	});
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
			usersName: res.locals.user.username,
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
