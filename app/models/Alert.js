var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
		user : {
			type: mongoose.Schema.ObjectId,
            ref: "User"
		},
		alert : {
            type: String
		},
		time : {
            type: Number
		}
    });
    
    return Schema;
}