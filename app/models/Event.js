var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
		name : {
            type: String
		},
		end_date : {
            type: Number
		},
		price : {
            type: Number
		},
		address : {
            type: String
		},
		location : {
            type: String
		}
    });
    
    return Schema;
}