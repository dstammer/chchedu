var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
		business : {
            type: mongoose.Schema.ObjectId,
            ref: "Business"
		},
		user : {
            type: mongoose.Schema.ObjectId,
            ref: "User"
		},
		rate : {
            type: Number
		}
    });
    
    return Schema;
}