var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
		name : {
            type: String
		},
		photo : {
            type: String
		},
		description : {
            type: String
		},
		start_date : {
            type: String
		},
		price : {
            type: String
		},
		place : {
			type: String
		},
		address : {
            type: String
		},
		location : {
            type: String
		},
		category : [{
			type: mongoose.Schema.ObjectId,
            ref: "EventCat"
		}]
    });
    
    return Schema;
}