var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var RecordSchema = mongoose.Schema({
	recordName: {
		type: String,
		index: true
	},
  userName: {
    type: String
  },
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


module.exports.createRecord = function(newRecord, callback){
  newRecord.save(callback);
}

/*module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}*/
