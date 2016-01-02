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
		events : {
            type: String
		},
		settings : {
            type: String
		},
		auth_token : {
			type: String
		}
    });
    
    return Schema;
}