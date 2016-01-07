var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
		name : {
            type: String
		},
		nationality : {
            type: String
		},
		institution : {
            type: String
		},
		course : {
            type: String
		},
		description : {
            type: String
		},
		photo : {
            type: String
		},
		video : {
			type: String
		}
    });
    
    return Schema;
}