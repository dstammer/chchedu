var mongoose = require("mongoose");

module.exports.devPort = process.env.PORT || 9010;
module.exports.prodPort = process.env.PORT || 80;

//module.exports.dbConnection = mongoose.createConnection("mongodb://localhost:27017/chchedu");
module.exports.dbConnection = mongoose.createConnection("mongodb://heroku_svr6wbp2:2ntqcpoo90egmhsu0amefe3bgk@ds049715-a0.mongolab.com:49715,ds049715-a1.mongolab.com:49715/heroku_svr6wbp2?replicaSet=rs-ds049715");