module.exports = function (opts) {
    var dealModel = opts.models.Deal;
    var failure_callback = require('./common.js')().failure_callback;
    var success_callback = require('./common.js')().success_callback;

    var format_deal = function (deal){
        if(deal){
            var d = {};
            var business = require('./business.js')(opts);
            var dealcat  = require('./dealcat.js')(opts);

            d._id             = deal._id;
            d.name            = deal.name;
            d.expiry_date     = deal.expiry_date;
            d.description     = deal.description;
            d.redeem_enforced = deal.redeem_enforced;
            d.business        = business.format_business(deal.business);
            d.category        = dealcat.format_category(deal.category);
            return d;
        }

        return deal;
    }

    var format_deals = function (deals){
        if(deals && deals.constructor === Array){
            // Format Array
            if(deals.length){
                var return_value = [];
                for(var i = 0; i < deals.length; i++){
                    return_value.push(format_deal(deals[i]));
                }

                return return_value;
            } else {
                return [];
            }
        } else {
            return format_deal(deals);
        }
    }
        
    return {
        "format_deal" : format_deal,
        "format_deals" : format_deals,
        "post#deal/create" : function (req, res) {
        	// Get Request Parameters
            var name			= req.body.name,
            	expiry_date	    = req.body.expiry_date,
            	redeem_enforced = req.body.redeem_enforced,
                description     = req.body.description,
                business        = req.body.business,
                category        = req.body.category;

            // Validate Input
            if(!name || !description){
            	return failure_callback(res, "Required Parameters are empty!");
            }

            // Check If Deal Already Exists
			var query = dealModel.findOne({name: name});
            query.exec(function (err, deal) {
                if (err) {
                    console.log("-- Error : Finding Deal --");
                    console.log(err);
                    return failure_callback(res);
                } else if (deal) {
                	return failure_callback(res, "Another deal has already registered with same name.");
                }

                var d = new dealModel();

                d.name   		     = name;
                d.expiry_date	     = (expiry_date)?expiry_date:"";
                d.redeem_enforced    = (redeem_enforced)?"YES":"NO";
                d.description 		 = (description)?description:"";
                d.business           = (business)?business:null;
                d.category           = (category)?category:null;

				var catModel = opts.models.DealCat,
					userModel = opts.models.User;

				catModel.find({}).exec(function(err, cats){
					if(cats){
						userModel.find({}).exec(function(err, users){
							if(users){
								for(var i = 0; i < users.length; i++){
									var settings = {};
									try{
										settings = JSON.parse(users[i].settings);
									}
									catch (e){
										settings = {};
									}

									if(settings["preference"] && settings["preference"].constructor === Array && settings["new_deal"] == "YES"){
										for(var j = 0; j < cats.length; j++){
											for(var k = 0; k < settings["preference"].length; k++){
												if(cats[j]._id.equals(category) && cats[j].name == settings["preference"][k]){
													console.log(cats[j].name);
													console.log(settings["preference"]);
													console.log(users[i].device_token);
													var notification = require('../../../notification.js');
													notification.sendDevNotification(users[i].device_token, 'A new deal "' + name + '" that matches your preferred deal category has been added.');
													notification.sendProdNotification(users[i].device_token, 'A new deal "' + name + '" that matches your preferred deal category has been added.');
												}
											}
										}
									}
								}
							}
						});
					}
				});
				
				d.save(function (err, new_deal) {
					if (err) {
						console.log("-- Error : Saving Deal --");
                    	console.log(err);
						return failure_callback(res);
					} else {
						return success_callback(res);
					}
				});
            });
        },

		"post#deal/get" : function( req, res ) {
			var _id = req.body.id;
			var query;

			if(_id){
				query = dealModel.findOne({_id : _id}).populate('business category');
			} else {
				query = dealModel.find({}).populate('business category');
			}

			query.exec(function(err, deals){
				if(err){
					console.log("-- Error : Querying Deal Failed --");
					console.log(err);
					return failure_callback(res);
				} else {
					return res.json({ success : true, deals : format_deals(deals) });
				}
			});
		},

		"post#deal/update" : function (req, res) {
        	// Get Request Parameters
            var id				= req.body.id,
				name            = req.body.name,
                expiry_date     = req.body.expiry_date,
                redeem_enforced = req.body.redeem_enforced,
                description     = req.body.description,
                business        = req.body.business,
                category        = req.body.category;

            // Check If Id is correctly posted
            if(!id){
            	return failure_callback(res);
            }

            // Check If Deal Already Exists
			var query = dealModel.findOne({_id : id});
            query.exec(function (err, d) {
                if (err) {
                    console.log("-- Error : Finding Deal --");
                    console.log(err);
                    return failure_callback(res);
                } else if (!d) {
                	return failure_callback(res, "Deal Not Found!");
                }

                d.name              = (name)?name:d.name;
                d.expiry_date       = (expiry_date)?expiry_date:d.expiry_date;
                d.redeem_enforced   = (redeem_enforced)?"YES":"NO";
                d.description       = (description)?description:d.description;
                d.business          = (business)?business:d.business;
                d.category          = (category)?category:d.category;
				
				d.save(function (err, new_deal) {
					if (err) {
						console.log("-- Error : Saving Deal --");
                    	console.log(err);
						return failure_callback(res);
					} else {
						return success_callback(res);
					}
				});
            });
        },

		"post#deal/delete" : function(req, res) {
			var id = req.body.id;
			dealModel.remove({ _id : id}, function(err){
				if(err){
					console.log("-- Error : Deleting Deal --");
                    console.log(err);
					return failure_callback(res);
				} else {
					return success_callback(res);
				}
			});
		},
    }
}