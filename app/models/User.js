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
		},
		address : {
            type: String
		},
		mobile : {
            type: String
		},
		date_of_birth : {
            type: String
		},
		nationality : {
            type: String
		},
		institution : {
            type: String
		},
		device_token : {
            type: String
		},
		deals : {
            type: String
		},
		deal_timestamp : {
			type: String
		},
		events : {
            type: String
		},
		event_timestamp : {
			type: String
		},
		alert_timestamp1 : {
			type: String
		},
		alert_timestamp2 : {
			type: String
		},
		alert_timestamp3 : {
			type: String
		},
		settings : {
            type: String
		}
    });
    
    return Schema;
}