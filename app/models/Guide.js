var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
		type : {
            type: String
		},
		title : {
            type: String
		},
		text : {
            type: String
		},
		photo : {
            type: String
		},
		category : {
			type: mongoose.Schema.ObjectId,
            ref: "GuideCat"
		}
    });
    
    return Schema;
}