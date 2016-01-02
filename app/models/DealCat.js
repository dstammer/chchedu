var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
		name : {
            type: String
		}
    });
    
    return Schema;
}