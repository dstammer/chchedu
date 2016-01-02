var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
		name : {
            type: String
		},
		require_login : {
            type: String
		}
    });
    
    return Schema;
}