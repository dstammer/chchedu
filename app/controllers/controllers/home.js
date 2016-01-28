module.exports = function (opts) {
    var homeModel = opts.models.Home;
    var failure_callback = require('./common.js')().failure_callback;
    var success_callback = require('./common.js')().success_callback;

    var format_home = function (home){
        if(home){
            var a = {};

            a.caption   = home.caption;
            a.image     = home.image;

            return a;
        }

        return null;
    }

    var format_homees = function (home){
        if(home && home.constructor === Array){
            // Format Array
            if(home.length){
                var return_value = [];
                for(var i = 0; i < home.length; i++){
                    return_value.push(format_home(home[i]));
                }

                return return_value;
            } else {
                return [];
            }
        } else {
            return format_home(home);
        }
    }
  
    return {
        "format_home" : format_home,
        "format_homees" : format_homees,
        "post#home/create" : function (req, res) {
        	// Get Request Parameters
			var cloudinary = require('cloudinary')
            var caption = req.body.caption,
                image   = req.body.image;

			// Validate Input
            if(!caption || !image){
            	return failure_callback(res, "Required Parameters are empty!");
            }

            // Check If Home Already Exists
			var query = homeModel.findOne({});
            console.log('----');
            query.exec(function (err, a) {
                if (err) {
                    console.log("-- Error : Finding Home --");
                    console.log(err);
                    return failure_callback(res);
                } else if (!a) {
                    console.log("abc");
                	var a = new homeModel();
                }

				cloudinary.uploader.upload(image, function (r) {
					a.caption = (caption)?caption:"";
					a.image   = r.url;
					
					a.save(function (err, new_home) {
						if (err) {
							console.log("-- Error : Saving Home --");
							console.log(err);
							return failure_callback(res);
						} else {
							return success_callback(res);
						}
					});
				});
            });
        },

		"post#home/get" : function( req, res ) {
			var _id = req.body.id;
			var query;

			if(_id){
				query = homeModel.findOne({_id : _id});
			} else {
				query = homeModel.findOne({});
			}

			query.exec(function(err, home){
				if(err){
					console.log("-- Error : Querying Home Failed --");
					console.log(err);
					return failure_callback(res);
				} else {
                    console.log('we get here');
					return res.json({ success : true, home : format_home(home) });
				}
			});
		}
    }
}