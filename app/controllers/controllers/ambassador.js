module.exports = function (opts) {
    var ambassadorModel = opts.models.Ambassador;
    var failure_callback = require('./common.js')().failure_callback;
    var success_callback = require('./common.js')().success_callback;

    var format_ambassador = function (ambassador){
        if(ambassador){
            var a = {};

            a._id           = ambassador._id;
            a.name          = ambassador.name;
            a.nationality   = ambassador.nationality;
            a.institution   = ambassador.institution;
            a.course        = ambassador.course;
            a.photo         = ambassador.photo;
            a.video         = ambassador.video;

            return a;
        }

        return null;
    }

    var format_ambassadores = function (ambassador){
        if(ambassador && ambassador.constructor === Array){
            // Format Array
            if(ambassador.length){
                var return_value = [];
                for(var i = 0; i < ambassador.length; i++){
                    return_value.push(format_ambassador(ambassador[i]));
                }

                return return_value;
            } else {
                return [];
            }
        } else {
            return format_ambassador(ambassador);
        }
    }
  
    return {
        "format_ambassador" : format_ambassador,
        "format_ambassadores" : format_ambassadores,
        "post#ambassador/create" : function (req, res) {
        	// Get Request Parameters
            var name        = req.body.name,
            	nationality	= req.body.title,
                institution = req.body.text,
                course      = req.body.photo,
                photo       = req.body.photo,
                video       = req.body.video;

            // Validate Input
            if(!name || !nationality || !institution || !course || !video){
            	return failure_callback(res, "Required Parameters are empty!");
            }

            // Check If Ambassador Already Exists
			var query = ambassadorModel.findOne({title: title});
            query.exec(function (err, ambassador) {
                if (err) {
                    console.log("-- Error : Finding Ambassador --");
                    console.log(err);
                    return failure_callback(res);
                } else if (ambassador) {
                	return failure_callback(res, "Another ambassador has already registered with same title.");
                }

                var b = new ambassadorModel();

                a.name          = (name)?name:"";
                a.nationality   = (nationality)?nationality:"";
                a.institution   = (institution)?institution:"";
                a.course        = (course)?course:"";
                a.photo         = (photo)?photo:"";
                a.video         = (video)?video:"";
				
				a.save(function (err, new_ambassador) {
					if (err) {
						console.log("-- Error : Saving Ambassador --");
                    	console.log(err);
						return failure_callback(res);
					} else {
						return success_callback(res);
					}
				});
            });
        },

		"post#ambassador/get" : function( req, res ) {
			var _id = req.body.id;
			var query;

			if(_id){
				query = ambassadorModel.findOne({_id : _id});
			} else {
				query = ambassadorModel.find({});
			}

			query.exec(function(err, ambassador){
				if(err){
					console.log("-- Error : Querying Ambassador Failed --");
					console.log(err);
					return failure_callback(res);
				} else {
                    console.log('we get here');
					return res.json({ success : true, ambassador : format_ambassadores(ambassador) });
				}
			});
		},

		"post#ambassador/update" : function (req, res) {
        	// Get Request Parameters
            var id          = req.body.id,
                name        = req.body.name,
                nationality = req.body.title,
                institution = req.body.text,
                course      = req.body.photo,
                photo       = req.body.photo,
                video       = req.body.video;

            // Check If Id is correctly posted
            if(!id){
            	return failure_callback(res);
            }

            // Check If Ambassador Already Exists
			var query = ambassadorModel.findOne({_id : id});
            query.exec(function (err, b) {
                if (err) {
                    console.log("-- Error : Finding Ambassador --");
                    console.log(err);
                    return failure_callback(res);
                } else if (!b) {
                	return failure_callback(res, "Ambassador Not Found!");
                }

                a.name          = (name)?name:a.name;
                a.nationality   = (nationality)?nationality:a.nationality;
                a.institution   = (institution)?institution:a.institution;
                a.course        = (course)?course:a.course;
                a.photo         = (photo)?photo:a.photo;
                a.video         = (video)?video:a.video;
				
				a.save(function (err, new_ambassador) {
					if (err) {
						console.log("-- Error : Saving Ambassador --");
                    	console.log(err);
						return failure_callback(res);
					} else {
						return success_callback(res);
					}
				});
            });
        },

		"post#ambassador/delete" : function( req, res) {
			var id = req.body.id;
			ambassadorModel.remove({ _id : id}, function(err){
				if(err){
					console.log("-- Error : Deleting Ambassador --");
                    console.log(err);
					return failure_callback(res);
				} else {
					return success_callback(res);
				}
			});
		},
    }
}