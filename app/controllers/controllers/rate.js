 var format_rate = function (rate){
    if(rate){
        var b = {};

        r._id         = rate._id;
        r.business    = rate.business;
        r.user        = rate.user;
        r.rate        = rate.rate;

        return b;
    }

    return rate;
}

var format_rates = function (rates){
    if(rates.constructor === Array){
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

module.exports = function (opts) {
    var rateModel = opts.models.Rate;
    var failure_callback = require('./common.js')().failure_callback;
    var success_callback = require('./common.js')().success_callback;
        
    return {
        "format_rates" : format_rates,
        "format_rate" : format_rate,
        "post#rate/create" : function (req, res) {
        	// Get Request Parameters
            var business    = req.body.business,
            	user	    = req.body.user,
            	rate        = req.body.rate;

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
				query = rateModel.find({business : business});
			} else {
				query = rateModel.find({});
			}

			query.exec(function(err, rates){
				if(err){
					console.log("-- Error : Querying Rate Failed --");
					console.log(err);
					return failure_callback();
				} else {
					return res.json({ success : true, rates : format_rates(rates) });
				}
			});
		},

		"post#rate/update" : function (req, res) {
        	// Get Request Parameters
            var business    = req.body.business,
                user        = req.body.user,
                rate        = req.body.rate;

            // Check If Id is correctly posted
            if(!id){
            	return failure_callback(res);
            }

            // Check If Rate Already Exists
			var query = rateModel.findOne({_id : id});
            query.exec(function (err, r) {
                if (err) {
                    console.log("-- Error : Finding Rate --");
                    console.log(err);
                    return failure_callback(res);
                } else if (!r) {
                	return failure_callback(res, "Rate Not Found!");
                }

                r.business  = (business)?business:r.business;
                r.user      = (user)?user:r.user;
                r.rate      = (rate)?rate:r.rate;
				
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