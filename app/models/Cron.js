var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
		date : {
            type: Date
		},
    });
    
    return Schema;
}