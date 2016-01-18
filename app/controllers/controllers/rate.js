module.exports = function (opts) {
    var rateModel = opts.models.Rate;
    var failure_callback = require('./common.js')().failure_callback;
    var success_callback = require('./common.js')().success_callback;

    var format_rate = function (rate){
        if(rate){
            var r = {};
            var user = require('./user.js')(opts);

            r._id         = rate._id;
            r.business    = rate.business;
            r.user        = user.format_user(rate.user);
            r.rate        = rate.rate;
            r.comment     = rate.comment;
			r.date		  = rate.date;

            return r;
        }

        return rate;
    }

    var format_rates = function (rates){
        if(rates && rates.constructor === Array){
            // Format Array
            if(rates.length){
                var return_value = [];
                for(var i = 0; i < rates.length; i++){
                    return_value.push(format_rate(rates[i]));
                }

                return return_value;
            } else {
                return [];
            }
        } else {
            return format_rate(rates);
        }
    }
        
    return {
        "format_rates" : format_rates,
        "format_rate" : format_rate,
        "post#rate/create" : function (req, res) {
        	// Get Request Parameters
            var business    = req.body.business,
            	user	    = req.body.user,
            	rate        = req.body.rate,
                comment     = req.body.comment;

            // Check If Rate Already Exists
			var query = rateModel.findOne({name: name});
            query.exec(function (err, rate) {
                if (err) {
                    console.log("-- Error : Finding Rate --");
                    console.log(err);
                    return failure_callback(res);
                } else if (rate) {
                	return failure_callback(res, "Another rate has already registered with same name.");
                }

                var r = new rateModel();

                r.business  = business;
                r.user	    = user;
                r.rate      = (rate)?rate:0;
                r.comment   = (comment)?comment:"";
				r.date		= new Date().getTime();
				
				r.save(function (err, new_rate) {
					if (err) {
						console.log("-- Error : Saving Rate --");
                    	console.log(err);
						return failure_callback(res);
					} else {
						return success_callback(res);
					}
				});
            });
        },

		"post#rate/get" : function( req, res ) {
			var business = req.body.business;
			var query;

			if(business){
				query = rateModel.find({business : business}).populate('user');
			} else {
				query = rateModel.find({}).populate('user');
			}

			query.exec(function(err, rates){
				if(err){
					console.log("-- Error : Querying Rate Failed --");
					console.log(err);
					return failure_callback(res);
				} else {
					return res.json({ success : true, rates : format_rates(rates) });
				}
			});
		},

		"post#rate/update" : function (req, res) {
        	// Get Request Parameters
            var business    = req.body.business,
                user        = req.body.user,
                rate        = req.body.rate,
                comment     = req.body.comment;

            // Check If Id is correctly posted
            if(!business || !user){
            	return failure_callback(res);
            }

            // Check If Rate Already Exists
			var query = rateModel.findOne({user: user, business: business});
            query.exec(function (err, r) {
                if (err) {
                    console.log("-- Error : Finding Rate --");
                    console.log(err);
                    return failure_callback(res);
                } else if (!r) {
                	r = new rateModel();
                }

                if(business) r.business = business;
                if(user) r.user = user;
                if(rate) r.rate = rate;
                if(comment) r.comment = comment;
				r.date		= new Date().getTime();
				
				r.save(function (err, new_rate) {
					if (err) {
						console.log("-- Error : Saving Rate --");
                    	console.log(err);
						return failure_callback(res);
					} else {
						return success_callback(res);
					}
				});
            });
        },

		"post#rate/delete" : function( req, res) {
			var id = req.body.id;
			rateModel.remove({ _id : id}, function(err){
				if(err){
					console.log("-- Error : Deleting Rate --");
                    console.log(err);
					return failure_callback(res);
				} else {
					return success_callback(res);
				}
			});
		},
    }
}