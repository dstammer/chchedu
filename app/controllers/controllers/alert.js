module.exports = function (opts) {
    var alertModel = opts.models.Alert;
    var failure_callback = require('./common.js')().failure_callback;
    var success_callback = require('./common.js')().success_callback;

    var format_alert = function (alert){
        if(alert){
            var a = {};
 
			a._id	= alert._id;
            a.user	= alert.user;
            a.alert = alert.alert;
            a.time	= alert.time;

            return a;
        }

        return null;
    }

    var format_alertes = function (alert){
        if(alert && alert.constructor === Array){
            // Format Array
            if(alert.length){
                var return_value = [];
                for(var i = 0; i < alert.length; i++){
                    return_value.push(format_alert(alert[i]));
                }

                return return_value;
            } else {
                return [];
            }
        } else {
            return format_alert(alert);
        }
    }
  
    return {
        "format_alert" : format_alert,
        "format_alertes" : format_alertes,
		"post#alert/create" : function( req, res ) {
			var id = req.body.id,
				alert = req.body.alert;

			a.user = id;
			a.alert = alert;
			a.time = new Date().getTime();

			a.save();
			return res.json({success : true, messgae : ""});
		},
		"post#alert/get" : function( req, res ) {
			var _id = req.body.id;
			var query;

			if(_id){
				query = alertModel.findOne({_id : _id}).populate('category');
			} else {
				query = alertModel.find({}).populate('category');
			}

			query.exec(function(err, alert){
				if(err){
					console.log("-- Error : Querying Alert Failed --");
					console.log(err);
					return failure_callback(res);
				} else {
                    console.log('we get here');
					return res.json({ success : true, alert : format_alertes(alert) });
				}
			});
		},
		"post#alert/delete" : function( req, res) {
			var id = req.body.id;
			alertModel.remove({ _id : id}, function(err){
				if(err){
					console.log("-- Error : Deleting Alert --");
                    console.log(err);
					return failure_callback(res);
				} else {
					return success_callback(res);
				}
			});
		},
    }
}