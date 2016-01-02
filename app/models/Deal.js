var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
		name : {
            type: String
		},
		business : {
            type: mongoose.Schema.ObjectId,
            ref: "Business"
		},
		description : {
            type: String
		},
		expiry_date : {
            type: String
		},
		redeem_enforced : {
            type: String
		},
		category : {
			type: mongoose.Schema.ObjectId,
            ref: "DealCat"
		}
    });
    
    return Schema;
}