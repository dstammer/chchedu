var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
		email : {
            type: String
		},
		password : {
            type: String
		},
		name : {
            type: String
		}
    });
    
    return Schema;
}