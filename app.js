var express = require("express"),
    config  = require("./config.js"),
    utils   = require("./utils.js"),
    strategies = require("./strategies.js"),
    passport = require("passport"),
    redisStore = require('connect-redis')(express),
    path = require('path'),
	async = require('async'),
	flash = require('connect-flash');

var app       = express(),
    secretKey = "hJKQg7dxMGzEWqf",
    templatesDir = path.join(__dirname, "emails");

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    if (req.method == 'OPTIONS') res.send(200);
    else next();
});

if (process.env.REDISTOGO_URL) {
    var rtg = require("url").parse(process.env.REDISTOGO_URL);
    var store = new redisStore({
        host : rtg.hostname,
        port : rtg.port,
        pass : rtg.auth.split(":")[1] 
    });
} else {
    var store = new redisStore();
}

var models = null;

app.configure("development", function () {
    app.set("port", config.devPort);
    app.use(express.logger());
});

app.configure("production", function () {
    app.set("port", config.prodPort);
});

app.configure(function () {
    app.use(express.static(__dirname + '/frontend'));
    app.use(express.cookieParser());
    app.use(express.bodyParser({limit: '50mb'}));
    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({limit: '50mb'}));
    app.use(express.methodOverride());
    app.use(express.cookieSession({ secret: secretKey, store: store, cookie: { secure: false, maxAge: 3600000  }, maxAge: 360*5}));
    app.use(passport.initialize());
    app.use(passport.session());
	app.use(flash());
    app.use(app.router);
});

var startApp = function (err) {
    if (err) {
        console.log(err);
    } else {
        app.listen(app.get("port"), function () {
            console.log("App started on port: " + app.get("port"));

		    app.post("/api/login", passport.authenticate('local-login', { failureRedirect: '/api/login-success', successRedirect: '/api/login-success' }));
		   
		    app.get("/api/login-success", function(req, res){
			    if(req.isAuthenticated()){
                    res.json({success : true, user : req.user});
			    } else {
                    return res.json({success: false});
                }
            });

            app.get("/login", function (req, res) {
                res.sendfile(__dirname + "/frontend/login.html", {});
            });

            app.get("/*", function (req, res) {
                res.sendfile(__dirname + "/frontend/index.html", {});
            });
        });
    }
}

async.parallel([
    function (callback) {
        utils.loadMiddlewares({}, callback);
    },
    function (callback) {
        utils.loadModels({ dbConnection : config.dbConnection }, callback);
    },
    function (callback) {
        utils.loadControllers({}, callback);
    },
], function (err, results) {
    async.parallel([
        function (callback) {
            utils.sync(app, results, callback);
        },
		function (callback) {
			models = results[1];
			require("./strategies.js")(passport, { models : results[1] }, callback);
		}
    ], startApp);
});