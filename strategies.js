var //passport = require("passport"),
    LocalStrategy = require('passport-local').Strategy;
    
module.exports = function (passport, opts, cb) {
	var userModel = opts.models.User;
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
		if(obj._id){
			userModel.findById(obj._id, function(err, user){
				done(null, obj);
			});
		}
	});

	passport.use('local-login', new LocalStrategy({usernameField: 'name', passwordField: 'password', passReqToCallback: true}, function(req, name, password, done){
		userModel.findOne({$and : [{'email': name}, {'password':password}]}).exec(function(err, user){
			if(err){
				console.log(err);
				console.log(' ---- err ---- ');
				return done(err, false, req.flash('loginMessage', 'Service temporarily unavailable.'));
			}
			if(!user){
				console.log(' ---- user not found ---- ');
				return done(null, false, req.flash('loginMessage', 'Could not find any user with given credentials.'));
			}


			var u = {};
						
			u._id = user._id
			u.name = user.name;
			u.site = user.site;
			u.company = user.company;
			u.ownedCompany = user.ownedCompany;
			u.role = user.role;
			user.sitesafe = user.sitesafe;
			u.mobile = user.mobile;
			u.phone = user.phone;
			u.fax = user.fax;
			u.email = user.email;
			u.password = user.password;

			try
			{
				u.preferences = JSON.parse(user.preferences);
			}
			catch (e)
			{
				u.preferences = {};
			}

			console.log(u);

			return done(null, u);
		});
	}));

    if (cb) {
        cb(null);
    }
}