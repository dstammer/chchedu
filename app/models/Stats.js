var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
		business : {
            type: mongoose.Schema.ObjectId,
            ref: "Business"
		},
		deal : {
            type: mongoose.Schema.ObjectId,
            ref: "Deal"
		},
		event : {
            type: mongoose.Schema.ObjectId,
            ref: "Event"
		},
		guide : {
            type: mongoose.Schema.ObjectId,
            ref: "Guide"
		},
		ambassador : {
            type: mongoose.Schema.ObjectId,
            ref: "Ambassador"
		},
		time : {
			type : Number
		}
    });
    
    return Schema;
}