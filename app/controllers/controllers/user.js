var format_user = function (user, includePassword){
    if(user){
        var u = {};

        u._id           = user._id;
        if(includePassword) u.password = user.password;
        u.name          = user.name;
        u.email         = user.email;format_user
        u.address       = user.address;
        u.mobile        = user.mobile;
        u.date_of_birth = user.date_of_birth;
        u.nationality   = user.nationality;
        u.institution   = user.institution;
        u.device_token  = user.device_token;

        try{
            u.deals = JSON.parse(user.deals);
        }
        catch (e){
            u.deals = {};
        }
        try{
            u.events = JSON.parse(user.events);
        }
        catch (e){
            u.events = {events:[]};
        }
        try{
            u.settings = JSON.parse(user.settings);
        }
        catch (e){
            u.settings = {};
        }

        return u;
    }

    return user;
}

var format_users = function (users){
    if(users && users.constructor === Array){
        // Format Array
        if(users.length){
            var return_value = [];
            for(var i = 0; i < users.length; i++){
                return_value.push(format_user(users[i]));
            }

            return return_value;
        } else {
            return [];
        }
    } else {
        return format_user(users);
    }
}

module.exports = function (opts) {
    var userModel = opts.models.User;
    var failure_callback = require('./common.js')().failure_callback;
    var success_callback = require('./common.js')().success_callback;
        
    return {
        "format_user" : format_user,
        "format_users" : format_users,
        "post#user/create" : function (req, res) {
        	// Get Request Parameters
            var email 			= req.body.email,
            	password		= req.body.password,
            	name			= req.body.name,
            	address			= req.body.address,
            	mobile			= req.body.mobile,
            	date_of_birth	= req.body.date_of_birth,
            	nationality		= req.body.nationality,
            	institution		= req.body.institution,
            	device_token	= req.body.device_token,
            	deals			= req.body.deals,
            	events			= req.body.events,
            	settings		= req.body.settings;

            // Validate Input
            if(!email || !password || !name){
            	return failure_callback(res, "Required Parameters are empty!");
            }

            // Check If User Already Exists
			var query = userModel.findOne({email: email});
            query.exec(function (err, user) {
                if (err) {
                    console.log("-- Error : Finding User --");
                    console.log(err);
                    return failure_callback(res);
                } else if (user) {
                	return failure_callback(res, "Another user has already registered with same email.");
                }

                var u = new userModel();

                u.email 		= email;
                u.password		= password;
                u.name			= name;
                u.address		= (address)?address:"";
                u.mobile		= (mobile)?mobile:"";
                u.date_of_birth	= (date_of_birth)?date_of_birth:"";
                u.nationality	= (nationality)?nationality:"";
                u.institution	= (institution)?institution:"";
                u.device_token	= (device_token)?device_token:"";
                u.deals			= (deals)?JSON.stringify(deals):"{}";
                u.events		= (events)?events:"{\"events\":[]}";
                u.settings		= (settings)?JSON.stringify(settings):"{}";
                u.auth_token    = "";
				
				u.save(function (err, new_user) {
					if (err) {
						console.log("-- Error : Saving User --");
                    	console.log(err);
						return failure_callback(res);
					} else {
						return res.json({success: true, user_data: format_user(new_user, true)});
					}
				});
            });
        },

		"post#user/get" : function( req, res ) {
			var _id = req.body.id;
			var query;

			if(_id){
				query = userModel.findOne({_id : _id});
			} else {
				query = userModel.find({});
			}

			query.exec(function(err, users){
				if(err){
					console.log("-- Error : Querying User Failed --");
					console.log(err);
					return failure_callback(res);
				} else {
					return res.json({ success : true, users : format_users(users) });
				}
			});
		},

        "post#user/login" : function( req, res ) {
            var email       = req.body.email,
                password    = req.body.password;
                console.log(email);
                console.log(password);
            var query = userModel.findOne({email: email, password: password});

            query.exec(function(err, users){
                if(err || !users){
                    console.log("-- Error : Querying User Failed --");
                    console.log(err);
                    return failure_callback(res);
                } else {
                    return res.json({ success : true, user_data : format_users(users) });
                }
            });
        },

        "post#user/forgot" : function( req, res ) {
            var email       = req.body.email;
            var query = userModel.findOne({email: email});

            query.exec(function(err, users){
                if(err){
                    console.log("-- Error : Querying User Failed --");
                    console.log(err);
                    return failure_callback(res);
                } else {
                    return res.json({ success : true });
                }
            });
        },

		"post#user/update" : function (req, res) {
        	// Get Request Parameters
            var id 				= req.body.id,
            	email 			= req.body.email,
            	password		= req.body.password,
            	name			= req.body.name,
            	address			= req.body.address,
            	mobile			= req.body.mobile,
            	date_of_birth	= req.body.date_of_birth,
            	nationality		= req.body.nationality,
            	institution		= req.body.institution,
            	device_token	= req.body.device_token,
            	deals			= req.body.deals,
            	events			= req.body.events,
            	settings		= req.body.settings;

            // Check If Id is correctly posted
            if(!id){
            	return failure_callback(res);
            }

            // Check If User Already Exists
			var query = userModel.findOne({_id : id});
            query.exec(function (err, u) {
                if (err) {
                    console.log("-- Error : Finding User --");
                    console.log(err);
                    return failure_callback(res);
                } else if (!u) {
                	return failure_callback(res, "User Not Found!");
                }

                u.email 		= (email)?email:u.email;
                u.password		= (password || password == "")?password:u.password;
                u.name			= (name)?name:u.name;
                u.address		= (address)?address:u.address;
                u.mobile		= (mobile)?mobile:u.mobile;
                u.date_of_birth	= (date_of_birth)?date_of_birth:u.date_of_birth;
                u.nationality	= (nationality)?nationality:u.nationality;
                u.institution	= (institution)?institution:u.institution;
                u.device_token	= (device_token)?device_token:u.device_token;
                u.deals			= (deals)?JSON.stringify(deals):u.deals;
                u.events		= (events)?events:u.events;
                u.settings		= (settings)?JSON.stringify(settings):u.settings;
				
				u.save(function (err, new_user) {
					if (err) {
						console.log("-- Error : Saving User --");
                    	console.log(err);
						return failure_callback(res);
					} else {
						return res.json({ success : true, user_data : format_users(new_user) });
					}
				});
            });
        },

		"post#user/delete" : function( req, res) {
			var id = req.body.id;
			userModel.remove({ _id : id}, function(err){
				if(err){
					console.log("-- Error : Deleting User --");
                    console.log(err);
					return failure_callback(res);
				} else {
					return success_callback(res);
				}
			});
		},
    }
}