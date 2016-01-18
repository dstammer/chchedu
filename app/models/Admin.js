var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
		email : {
            type: String
		},
		password : {
            type: String
		}
    });
    
    return Schema;
}