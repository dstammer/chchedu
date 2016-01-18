module.exports = function (opts) {
    var adminModel = opts.models.Admin;
    var failure_callback = require('./common.js')().failure_callback;
    var success_callback = require('./common.js')().success_callback;
  
    return {
		"post#admin/login" : function( req, res ) {
			var email = req.body.email,
                password = req.body.password;

                console.log(req.body);

            if(!email || !password){
                return failure_callback(res);
            }

			adminModel.findOne({"email": email, "password": password}).exec(function(err, admin){
				if(err){
					console.log("-- Error : Querying Ambassador Failed --");
					console.log(err);
					return failure_callback(res);
				} else if(admin) {
                    return res.json({ success : true });
                } else {
                    return failure_callback(res);
				}
			});
		}
    }
}