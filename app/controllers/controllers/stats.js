module.exports = function (opts) {
    var statsModel = opts.models.Stats;
    var failure_callback = require('./common.js')().failure_callback;
    var success_callback = require('./common.js')().success_callback;

    var format_stats = function (stats){
        if(stats){
            var r = {};

            r._id         = stats._id;
            r.business    = stats.business;
            r.deal		  = stats.deal;
            r.event		  = stats.event;
            r.guide		  = stats.guide;
            r.ambassador  = stats.ambassador;
			r.time		  = stats.time;

            return r;
        }

        return stats;
    }

    var format_statss = function (statss){
        if(statss && statss.constructor === Array){
            // Format Array
            if(statss.length){
                var return_value = [];
                for(var i = 0; i < statss.length; i++){
                    return_value.push(format_stats(statss[i]));
                }

                return return_value;
            } else {
                return [];
            }
        } else {
            return format_stats(statss);
        }
    }
        
    return {
        "format_statss" : format_statss,
        "format_stats" : format_stats,
        "post#stats/create" : function (req, res) {
        	// Get Request Parameters
            var business    = req.body.business,
            	deal		= req.body.deal,
				event		= req.body.event,
				guide		= req.body.guide,
				ambassador	= req.body.ambassador;

			var r = new statsModel();
			r.business		= business;
			r.deal			= deal;
			r.event			= event;
			r.guide			= guide;
			r.ambassador	= ambassador;
			r.time			= new Date().getTime();

			r.save(function (err, new_stats) {
				if (err) {
					console.log("-- Error : Saving Stats --");
					console.log(err);
					return failure_callback(res);
				} else {
					return success_callback(res);
				}
			});
        },

		"post#stats/get" : function( req, res ) {
			var query = statsModel.find({});

			query.exec(function(err, statss){
				if(err){
					console.log("-- Error : Querying Stats Failed --");
					console.log(err);
					return failure_callback(res);
				} else {
					return res.json({ success : true, stats : format_statss(statss) });
				}
			});
		},
    }
}