var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
		name : {
            type: String
		},
		is_available : {
            type: String
		},
		phone : {
            type: String
		},
		price_range : {
            type: String
		},
		website : {
            type: String
		},
		open_time : {
            type: String
		},
		description : {
            type: String
		},
		address : {
            type: String
		},
		location : {
            type: String
		},
		photo : {
            type: String
		},
		category : {
			type: mongoose.Schema.ObjectId,
            ref: "BusCat"
		},
		redeem_enforced : {
            type: String
		},
    });
    
    return Schema;
}