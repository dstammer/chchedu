module.exports = function (opts) {
    var businessModel = opts.models.Business;
    var failure_callback = require('./common.js')().failure_callback;
    var success_callback = require('./common.js')().success_callback;

    var format_business = function (business){
        if(business){
            var b = {};
            var buscat = require('./buscat.js')(opts);

            b._id             = business._id;
            b.name            = business.name;
            b.is_available    = business.is_available;
            b.phone           = business.phone;
            b.website         = business.website;
            b.description     = business.description;
            b.address         = business.address;
            b.photo           = business.photo;
            b.category        = buscat.format_category(business.category);
            b.redeem_enforced = business.redeem_enforced;

            try{
                b.price_range = JSON.parse(business.price_range);
            }
            catch (e){
                b.price_range = {};
            }
            try{
                b.open_time = JSON.parse(business.open_time);
            }
            catch (e){
                b.open_time = {};
            }
            try{
                b.location = JSON.parse(business.location);
            }
            catch (e){
                b.location = {};
            }

            return b;
        }

        return null;
    }

    var format_businesses = function (business){
        if(business.constructor === Array){
            // Format Array
            if(business.length){
                var return_value = [];
                for(var i = 0; i < business.length; i++){
                    return_value.push(format_business(business[i]));
                }

                return return_value;
            } else {
                return [];
            }
        } else {
            return format_business(business);
        }
    }
  
    return {
        "format_business" : format_business,
        "format_businesses" : format_businesses,
        "post#business/create" : function (req, res) {
        	// Get Request Parameters
            var name			= req.body.name,
            	is_available	= req.body.is_available,
            	phone  			= req.body.phone,
            	price_range	    = req.body.price_range,
            	website    		= req.body.website,
            	open_time		= req.body.open_time,
            	description	    = req.body.description,
            	address			= req.body.address,
            	location		= req.body.location,
                category        = req.body.category,
                photo           = req.body.photo,
                redeem_enforced = req.body.redeem_enforced;

            // Validate Input
            if(!name || !location || !open_time || !price_range){
            	return failure_callback(res, "Required Parameters are empty!");
            }

            // Check If Business Already Exists
			var query = businessModel.findOne({name: name});
            query.exec(function (err, business) {
                if (err) {
                    console.log("-- Error : Finding Business --");
                    console.log(err);
                    return failure_callback(res);
                } else if (business) {
                	return failure_callback(res, "Another business has already registered with same name.");
                }

                var b = new businessModel();

                b.name   		     = name;
                b.is_available	     = (is_available)?is_available:"";
                b.phone              = (phone)?phone:"";
                b.website 		     = (website)?website:"";
                b.description        = (description)?description:"";
                b.address            = (address)?address:"";
                b.photo              = (photo)?photo:"";
                b.category           = (category)?category:null;
                b.redeem_enforced    = (redeem_enforced)?redeem_enforced:"NO";
   
                b.price_range	= (price_range)?JSON.stringify(price_range):"{}";
                b.open_time		= (open_time)?JSON.stringify(open_time):"{}";
                b.location		= (location)?JSON.stringify(location):"{}";
				
				b.save(function (err, new_business) {
					if (err) {
						console.log("-- Error : Saving Business --");
                    	console.log(err);
						return failure_callback(res);
					} else {
						return success_callback(res);
					}
				});
            });
        },

		"post#business/get" : function( req, res ) {
			var _id = req.body.id;
			var query;

			if(_id){
				query = businessModel.findOne({_id : _id}).populate('category');
			} else {
				query = businessModel.find({}).populate('category');
			}

			query.exec(function(err, business){
				if(err){
					console.log("-- Error : Querying Business Failed --");
					console.log(err);
					return failure_callback();
				} else {
                    console.log('we get here');
					return res.json({ success : true, business : format_businesses(business) });
				}
			});
		},

		"post#business/update" : function (req, res) {
        	// Get Request Parameters
            var id              = req.body.id,
                name            = req.body.name,
                is_available    = req.body.is_available,
                phone           = req.body.phone,
                price_range     = req.body.price_range,
                website         = req.body.website,
                open_time       = req.body.open_time,
                description     = req.body.description,
                address         = req.body.address,
                location        = req.body.location,
                category        = req.body.category,
                photo           = req.body.photo,
                redeem_enforced = req.body.redeem_enforced;

            // Check If Id is correctly posted
            if(!id){
            	return failure_callback(res);
            }

            // Check If Business Already Exists
			var query = businessModel.findOne({_id : id});
            query.exec(function (err, b) {
                if (err) {
                    console.log("-- Error : Finding Business --");
                    console.log(err);
                    return failure_callback(res);
                } else if (!b) {
                	return failure_callback(res, "Business Not Found!");
                }

                b.name              = (name)?name:b.name;
                b.is_available      = (is_available)?is_available:b.is_available;
                b.phone             = (phone)?phone:b.phone;
                b.website           = (website)?website:b.website;
                b.description       = (description)?description:b.description;
                b.address           = (address)?address:b.address;
                b.photo             = (photo)?photo:b.photo;
                b.category          = (category)?category:b.category;
                b.redeem_enforced   = (redeem_enforced)?redeem_enforced:b.redeem_enforced;
   
                b.price_range   = (price_range)?JSON.stringify(price_range):b.price_range;
                b.open_time     = (open_time)?JSON.stringify(open_time):b.open_time;
                b.location      = (location)?JSON.stringify(location):b.location;
				
				b.save(function (err, new_business) {
					if (err) {
						console.log("-- Error : Saving Business --");
                    	console.log(err);
						return failure_callback(res);
					} else {
						return success_callback(res);
					}
				});
            });
        },

		"post#business/delete" : function( req, res) {
			var id = req.body.id;
			businessModel.remove({ _id : id}, function(err){
				if(err){
					console.log("-- Error : Deleting Business --");
                    console.log(err);
					return failure_callback(res);
				} else {
					return success_callback(res);
				}
			});
		},
    }
}