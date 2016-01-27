var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
		caption : {
            type: String
		},
		image : {
            type: String
		}
    });
    
    return Schema;
}