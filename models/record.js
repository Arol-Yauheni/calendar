var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var RecordSchema = mongoose.Schema({
	recordName: {
		type: String,
		index: true
	},
  usersName: [{
    type: String,
		index: true
  }],
	description: {
		type: String
	},
	date: {
		type: String
	},
  time: {
    type: String
  }
});

var Record = module.exports = mongoose.model('Record', RecordSchema);


module.exports.createRecord = function(newRecord, callback) {
  newRecord.save(callback);
}

module.exports.addUserInRecord = function(record, callback) {
  record.save(callback);
}

module.exports.getAllRecordsByUsername = function(username, callback) {
	var query = {usersName: username};
	Record.find(query, callback);
}

module.exports.getRecordById = function(id, callback) {
	var query = { _id: id};
	Record.findOne(query, callback);
}
