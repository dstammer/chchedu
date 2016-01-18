var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
		name : {
            type: String
		},
		type : {
			type: String
		}
    });
    
    return Schema;
}