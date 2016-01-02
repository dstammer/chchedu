var mongoose = require("mongoose");

module.exports.devPort = process.env.PORT || 9010;
module.exports.prodPort = process.env.PORT || 80;

module.exports.dbConnection = mongoose.createConnection("mongodb://localhost:27017/chchedu");