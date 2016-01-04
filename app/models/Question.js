var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
		ambassador : {
			type: mongoose.Schema.ObjectId,
            ref: "Ambassador"
		},
		name : {
            type: String
		},
		email : {
            type: String
		},
		subject : {
            type: String
		},
		message : {
            type: String
		}
    });
    
    return Schema;
}