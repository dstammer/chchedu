var mongoose = require("mongoose");

module.exports.devPort = process.env.PORT || 9010;
module.exports.prodPort = process.env.PORT || 80;

//module.exports.dbConnection = mongoose.createConnection("mongodb://localhost:27017/chchedu");
module.exports.dbConnection = mongoose.createConnection("mongodb://<dbuser>:<dbpassword>@ds037165.mongolab.com:37165/heroku_x0h82d13");