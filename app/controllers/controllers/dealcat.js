var format_category = function (cat){
    if(cat){
        var c = {};

        c._id             = cat._id;
        c.name            = cat.name;

        return c;
    }

    return null;
}

var format_categories = function (cat){
    if(cat.constructor === Array){
        // Format Array
        if(cat.length){
            var return_value = [];
            for(var i = 0; i < cat.length; i++){
                return_value.push(format_category(cat[i]));
            }

            return return_value;
        } else {
            return [];
        }
    } else {
        return format_category(cat);
    }
}

module.exports = function (opts) {
    var catModel = opts.models.DealCat;
    var failure_callback = require('./common.js')().failure_callback;
    var success_callback = require('./common.js')().success_callback;
  
    return {
        "format_category" : format_category,
        "format_categories" : format_categories,
        "post#deal_category/create" : function (req, res) {
        	// Get Request Parameters
            var name			= req.body.name;

            // Validate Input
            if(!name){
            	return failure_callback(res, "Required Parameters are empty!");
            }

            // Check If Business Already Exists
			var query = catModel.findOne({name: name});
            query.exec(function (err, cat) {
                if (err) {
                    console.log("-- Error : Finding Business --");
                    console.log(err);
                    return failure_callback(res);
                } else if (cat) {
                	return failure_callback(res, "Another cat has already registered with same name.");
                }

                var c = new catModel();
                c.name   		= name;
				c.save(function (err, new_cat) {
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

		"post#deal_category/get" : function( req, res ) {
			var _id = req.body.id;
			var query;

			if(_id){
				query = catModel.findOne({_id : _id});
			} else {
				query = catModel.find({});
			}

			query.exec(function(err, cat){
				if(err){
					console.log("-- Error : Querying Business Failed --");
					console.log(err);
					return failure_callback();
				} else {
                    console.log('we get here');
					return res.json({ success : true, cat : format_categories(cat) });
				}
			});
		},

		"post#deal_category/update" : function (req, res) {
        	// Get Request Parameters
            var name            = req.body.name;

            // Check If Id is correctly posted
            if(!id){
            	return failure_callback(res);
            }

            // Check If Business Already Exists
			var query = catModel.findOne({_id : id});
            query.exec(function (err, b) {
                if (err) {
                    console.log("-- Error : Finding Business --");
                    console.log(err);
                    return failure_callback(res);
                } else if (!b) {
                	return failure_callback(res, "Business Not Found!");
                }

                c.name          = (name)?name:c.name;
				
				c.save(function (err, new_cat) {
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

		"post#deal_category/delete" : function( req, res) {
			var id = req.body.id;
			catModel.remove({ _id : id}, function(err){
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