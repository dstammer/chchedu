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
		try{
            u.deal_timestamp = JSON.parse(user.deal_timestamp);
        }
        catch (e){
            u.deal_timestamp = {};
        }
		try{
            u.event_timestamp = JSON.parse(user.event_timestamp);
        }
        catch (e){
            u.event_timestamp = {};
        }


        return u;
    }

    return user;
}

function isInWishlist(user, deal){
	if(user.deals.wishlist){
		var wishlist = user.deals.wishlist;

		for(var i = 0; i < wishlist.length; i++){
			if(deal._id.equals(wishlist[i])){
				return true;
			}
		}
	}

	return false;
}

function isInRedeemed(user, deal){
	if(user.deals.redeemed){
		var redeemed = user.deals.redeemed;

		for(var i = 0; i < redeemed.length; i++){
			if(deal._id.equals(redeemed[i])){
				return true;
			}
		}
	}

	return false;
}

function redeemedTimestamp(user, deal_id){
	if(user.deal_timestamp.redeemed){
		var redeemed = user.deal_timestamp.redeemed;
		if(redeemed[deal_id]){
			return redeemed[deal_id];
		}
	}

	return 0;
}

function isMyEvent(user, event){
	if(user.events.events){
		var events = user.events.events;
		for(var i = 0; i < events.length; i++){
			if(event._id.equals(events[i]._id)){
				return events[i].reminder;
			}
		}
	}

	return null;
}

function cron(){
	var async = require('async'),
		config  = require("./config.js"),
	    utils   = require("./utils.js");

	async.parallel([
		function (callback) {
			utils.loadModels({ dbConnection : config.dbConnection }, callback);
		}
	], function (err, results) {
		var models = results[0];
		var userModel = models.User,
			dealModel = models.Deal,
			eventModel = models.Event,
			alertModel = models,Alert,
			notification = require('./notification.js');

		userModel.find({}).exec(function(err, users){
			if(users){
				dealModel.find({}).populate('business category').exec(function(err, deals){
					if(!err){
						eventModel.find({}).exec(function(err, events){
							if(!err){
								for(var i = 0; i < users.length; i++){
									var u = format_user(users[i]);
									// Alert For Deals
									for(var j = 0; j < deals.length; j++){
										//In Wish list but not redeemed
										if(isInWishlist(u, deals[j]) && !isInRedeemed(u, deals[j])){
											var d1 = new Date( deals[j].expiry_date ),
											d2 = new Date();

											if(d1.getTime() - d2.getTime() >= 1000 * 3600 * 24 * 2 - 1000 * 60 * 10 && d1.getTime() - d2.getTime() < 1000 * 3600 * 24 * 2){
												if(u.settings.redeem == "YES"){
													notification.sendDevNotification(u.device_token, 'You hae a deal in your wishlist for ' + deals[j].business.name + " called " + deals[j].name + " that expires in 2 days. Don't miss out!");
													notification.sendProdNotification(u.device_token, 'You hae a deal in your wishlist for ' + deals[j].business.name + " called " + deals[j].name + " that expires in 2 days. Don't miss out!");
													var a = new alertModel();
													a.user = u._id;
													a.alert = 'You hae a deal in your wishlist for ' + deals[j].business.name + " called " + deals[j].name + " that expires in 2 days. Don't miss out!";
													a.time = new Date().getTime();
													a.save();
												}
											}
										}
										
										// After 2 days from redeemed
										if(isInRedeemed(u, deals[j])){
											var t = redeemedTimestamp(u, deals[j]),
											d2 = new Date();

											if(d2.getTime() - t >= 1000 * 3600 * 24 * 2 - 1000 * 60 * 10 && d2.getTime() - t < 1000 * 3600 * 24 * 2){
												notification.sendDevNotification(u.device_token, 'You recently redeemed the deal ' + deals[j].name + ' at ' + deals[j].business.name + '. Help others by rating your experience. Go to the place in your App to leave a rating.');
												notification.sendProdNotification(u.device_token, 'You recently redeemed the deal ' + deals[j].name + ' at ' + deals[j].business.name + '. Help others by rating your experience. Go to the place in your App to leave a rating.');
												a.user = u._id;
												a.alert = 'You recently redeemed the deal ' + deals[j].name + ' at ' + deals[j].business.name + '. Help others by rating your experience. Go to the place in your App to leave a rating.';
												a.time = new Date().getTime();
												a.save();
											}
										}
									}
									

									//Alert For Events
									for(var j = 0; j < events.length; j++){
										var reminder = isMyEvent(u, events[j]);

										// After 2 days from redeemed
										if(reminder && reminder.set == "YES"){
											var date = reminder.date;
											var d1 = new Date(Date.parse(events[j].start_date)),
											d2 = new Date();

											if(d1.getTime() - d2.getTime() >= 1000 * 3600 * 24 * date - 1000 * 60 * 10 && d1.getTime() - d2.getTime() < 1000 * 3600 * 24 * date){
												notification.sendDevNotification(u.device_token, events[j].name + ' starts in ' + date + ' days.');
												notification.sendProdNotification(u.device_token, events[j].name + ' starts in ' + date + ' days.');
												a.user = u._id;
												a.alert = events[j].name + ' starts in ' + date + ' days.';
												a.time = new Date().getTime();
												a.save();
											}
										}
									}
								}
							}
						});
					}
				});
			}
		});
	});
}

cron();