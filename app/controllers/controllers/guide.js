module.exports = function (opts) {
    var guideModel = opts.models.Guide;
    var failure_callback = require('./common.js')().failure_callback;
    var success_callback = require('./common.js')().success_callback;

    var format_guide = function (guide){
        if(guide){
            var g = {};
            var guidecat = require('./guidecat.js')(opts);

            g._id       = guide._id;
            g.type      = guide.type;
            g.title     = guide.title;
            g.text      = guide.text;
            g.photo     = guide.photo;
            g.category  = guidecat.format_category(guide.category);

            return g;
        }

        return null;
    }

    var format_guidees = function (guide){
        if(guide && guide.constructor === Array){
            // Format Array
            if(guide.length){
                var return_value = [];
                for(var i = 0; i < guide.length; i++){
                    return_value.push(format_guide(guide[i]));
                }

                return return_value;
            } else {
                return [];
            }
        } else {
            return format_guide(guide);
        }
    }
  
    return {
        "format_guide" : format_guide,
        "format_guidees" : format_guidees,
        "post#guide/create" : function (req, res) {
        	// Get Request Parameters
            var type        = req.body.type,
            	title	    = req.body.title,
            	text  	    = req.body.text,
                category    = req.body.category,
                photo       = req.body.photo;

            // Validate Input
            if(!title || !text){
            	return failure_callback(res, "Required Parameters are empty!");
            }

            // Check If Guide Already Exists
			var query = guideModel.findOne({title: title});
            query.exec(function (err, guide) {
                if (err) {
                    console.log("-- Error : Finding Guide --");
                    console.log(err);
                    return failure_callback(res);
                } else if (guide) {
                	return failure_callback(res, "Another guide has already registered with same title.");
                }

                var g = new guideModel();

                g.type      = (type)?"YES":"NO";
                g.title	    = (title)?title:"";
                g.text      = (text)?text:"";
                g.photo     = (photo)?photo:"";
                g.category  = (category)?category:null;
				
				g.save(function (err, new_guide) {
					if (err) {
						console.log("-- Error : Saving Guide --");
                    	console.log(err);
						return failure_callback(res);
					} else {
						return success_callback(res);
					}
				});
            });
        },

		"post#guide/get" : function( req, res ) {
			var _id = req.body.id,
                page = req.body.page;
			var query;

            console.log('---' + page + '---');

			if(_id){
                if(page){
                    query = guideModel.findOne({_id : _id}, {}, {skip : page * 5, limit : 5}).populate('category');
                } else {
                    query = guideModel.findOne({_id : _id}).populate('category');
                }
			} else {
                if(page){
                    query = guideModel.find({}, {}, {skip : page * 5, limit : 5}).populate('category');
                } else {
                    query = guideModel.find({}).populate('category');
                }
			}

			query.exec(function(err, guide){
				if(err){
					console.log("-- Error : Querying Guide Failed --");
					console.log(err);
					return failure_callback(res);
				} else {
                    console.log('we get here');
					return res.json({ success : true, guide : format_guidees(guide) });
				}
			});
		},

		"post#guide/update" : function (req, res) {
        	// Get Request Parameters
            var id          = req.body.id,
                type        = req.body.type,
                title       = req.body.title,
                text        = req.body.text,
                photo       = req.body.photo,
                category    = req.body.category;

            // Check If Id is correctly posted
            if(!id){
            	return failure_callback(res);
            }

            // Check If Guide Already Exists
			var query = guideModel.findOne({_id : id});
            query.exec(function (err, g) {
                if (err) {
                    console.log("-- Error : Finding Guide --");
                    console.log(err);
                    return failure_callback(res);
                } else if (!g) {
                	return failure_callback(res, "Guide Not Found!");
                }

                g.type      = (type)?"YES":"NO";
                g.title     = (title)?title:g.type;
                g.text      = (text)?text:g.text;
                g.photo     = (photo)?photo:g.photo;
                g.category  = (category)?category:g.category;
				
				g.save(function (err, new_guide) {
					if (err) {
						console.log("-- Error : Saving Guide --");
                    	console.log(err);
						return failure_callback(res);
					} else {
						return success_callback(res);
					}
				});
            });
        },

		"post#guide/delete" : function( req, res) {
			var id = req.body.id;
			guideModel.remove({ _id : id}, function(err){
				if(err){
					console.log("-- Error : Deleting Guide --");
                    console.log(err);
					return failure_callback(res);
				} else {
					return success_callback(res);
				}
			});
		},
    }
}