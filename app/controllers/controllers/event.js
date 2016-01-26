module.exports = function (opts) {
    var eventModel = opts.models.Event;
    var failure_callback = require('./common.js')().failure_callback;
    var success_callback = require('./common.js')().success_callback;

    var format_event = function (event){
        if(event){
            var e = {};
            var eventcat = require('./eventcat.js')(opts);

            e._id             = event._id;
            e.name            = event.name;
            e.photo           = event.photo;
            e.description     = event.description;
            e.start_date      = event.start_date;
            e.price           = event.price;
            e.address         = event.address;
            e.place           = event.place;
            e.category        = eventcat.format_categories(event.category);

            try{
                e.location = JSON.parse(event.location);
            }
            catch (e){
                e.location = {};
            }

            return e;
        }

        return null;
    }

    var format_eventes = function (event){
        if(event && event.constructor === Array){
            // Format Array
            if(event.length){
                var return_value = [];
                for(var i = 0; i < event.length; i++){
                    return_value.push(format_event(event[i]));
                }

                return return_value;
            } else {
                return [];
            }
        } else {
            return format_event(event);
        }
    }
  
    return {
        "format_event" : format_event,
        "format_eventes" : format_eventes,
        "post#event/create" : function (req, res) {
        	// Get Request Parameters
            var name		= req.body.name,
            	photo	    = req.body.photo,
            	description = req.body.description,
            	start_date	= req.body.start_date,
            	price    	= req.body.price,
            	address		= req.body.address,
                category    = req.body.category,
                place       = req.body.place,
				location	= req.body.location;

            // Validate Input
            if(!name || !location || !price || !start_date){
            	return failure_callback(res, "Required Parameters are empty!");
            }

            // Check If Event Already Exists
			var query = eventModel.findOne({name: name});
            query.exec(function (err, event) {
                if (err) {
                    console.log("-- Error : Finding Event --");
                    console.log(err);
                    return failure_callback(res);
                } else if (event) {
                	return failure_callback(res, "Another event has already registered with same name.");
                }

                var e = new eventModel();

                e.name   		= name;
                e.photo	        = (photo)?photo:"";
                e.description   = (description)?description:"";
                e.start_date 	= (start_date)?start_date:"";
                e.price         = (price)?price:"";
                e.place         = (place)?place:"";
                e.address       = (address)?address:"";
                e.category      = (category)?category:null;
               
                e.location		= (location)?JSON.stringify(location):"{}";
				
				e.save(function (err, new_event) {
					if (err) {
						console.log("-- Error : Saving Event --");
                    	console.log(err);
						return failure_callback(res);
					} else {
						return success_callback(res);
					}
				});
            });
        },

		"post#event/get" : function( req, res ) {
			var _id = req.body.id;
			var query;

			if(_id){
				query = eventModel.findOne({_id : _id}).populate('category');
			} else {
				query = eventModel.find({}).populate('category');
			}

			query.exec(function(err, event){
				if(err){
					console.log("-- Error : Querying Event Failed --");
					console.log(err);
					return failure_callback(res);
				} else {
                    console.log('we get here');
					return res.json({ success : true, event : format_eventes(event) });
				}
			});
		},

        "post#event/getPeople" : function( req, res ) {
            var _id = req.body.id,
                user_id = req.body.user_id;
            var userModel = opts.models.User;

            userModel.find({}).exec(function(err, users){
                if(err){
                    console.log("-- Error : Querying Users Failed --");
                    console.log(err);
                    return failure_callback(res);
                } else {
                    var user = require('./user.js')(opts);
                    var us = user.format_users(users);
                    
                    var ret = [];
                    for(var i = 0; i < us.length; i++){
                        if(us[i]["events"] && us[i]["events"]["events"] && us[i]["events"]["events"].length){
                            for(var j = 0 ; j < us[i]["events"]["events"].length; j++){
                                if(us[i]["events"]["events"][j]["share"] == "YES"){
                                    console.log(_id);
                                    console.log(us[i]._id);
                                    if(user_id == us[i]._id){
                                        ;//return;
                                    }
                                    var u = {};
                                    u._id = us[i]._id;
                                    u.email = us[i].email;
                                    u.mobile = us[i].mobile;
                                    u.name = us[i].name;
                                    ret.push(u)
                                }
                            }
                        }
                    }
                    return res.json({ success : true, people : ret });
                }
            });
        },

		"post#event/update" : function (req, res) {
        	// Get Request Parameters
            var id          = req.body.id,
                name        = req.body.name,
                photo       = req.body.photo,
                description = req.body.description,
                start_date  = req.body.start_date,
                price       = req.body.price,
                place       = req.body.place,
                address     = req.body.address,
                category    = req.body.category,
				location	= req.body.location;

            // Check If Id is correctly posted
            if(!id){
            	return failure_callback(res);
            }

            // Check If Event Already Exists
			var query = eventModel.findOne({_id : id});
            query.exec(function (err, e) {
                if (err) {
                    console.log("-- Error : Finding Event --");
                    console.log(err);
                    return failure_callback(res);
                } else if (!e) {
                	return failure_callback(res, "Event Not Found!");
                }

                e.name          = (name)?name:e.name;
                e.photo         = (photo)?photo:e.photo;
                e.description   = (description)?description:e.description;
                e.start_date    = (start_date)?start_date:e.start_date;
                e.price         = (price)?price:e.price;
                e.place         = (place)?place:e.place;
                e.address       = (address)?address:e.address;
                e.category      = (category)?category:e.category;
               
                e.location      = (location)?JSON.stringify(location):e.location;
				
				e.save(function (err, new_event) {
					if (err) {
						console.log("-- Error : Saving Event --");
                    	console.log(err);
						return failure_callback(res);
					} else {
						return success_callback(res);
					}
				});
            });
        },

		"post#event/delete" : function( req, res) {
			var id = req.body.id;
			eventModel.remove({ _id : id}, function(err){
				if(err){
					console.log("-- Error : Deleting Event --");
                    console.log(err);
					return failure_callback(res);
				} else {
					return success_callback(res);
				}
			});
		},
    }
}