module.exports = function (opts) {
    var questionModel = opts.models.Question;
    var failure_callback = require('./common.js')().failure_callback;
    var success_callback = require('./common.js')().success_callback;

    var format_question = function (question){
        if(question){
            var a = {};
            var ambassador = require('./ambassador.js')(opts);

            a._id             = question._id;
            a.name            = question.name;
            a.email           = question.email;
            a.subject         = question.subject;
            a.message         = question.message;
            a.ambassador      = ambassador.format_ambassador(question.ambassador);

            return a;
        }

        return null;
    }

    var format_questiones = function (question){
        if(question && question.constructor === Array){
            // Format Array
            if(question.length){
                var return_value = [];
                for(var i = 0; i < question.length; i++){
                    return_value.push(format_question(question[i]));
                }

                return return_value;
            } else {
                return [];
            }
        } else {
            return format_question(question);
        }
    }
  
    return {
        "format_question" : format_question,
        "format_questiones" : format_questiones,
        "post#question/create" : function (req, res) {
        	// Get Request Parameters
            var name	   = req.body.name,
            	email	   = req.body.email,
            	subject    = req.body.subject,
            	message	   = req.body.message,
            	ambassador = req.body.ambassador;

            var ambassadorModel = opts.models.Ambassador;

            // Validate Input
            if(!name || !email || !message || !ambassador){
            	return failure_callback(res, "Required Parameters are empty!");
            }

			var nodemailer = require('nodemailer');
			var mailer = nodemailer.createTransport({service: 'Gmail',
														auth: {
															user: "christchurcheducated1@gmail.com",
															pass: "5012Wordsworth!"
														}});
			mailer.sendMail({
				from: "christchurcheducated1@gmail.com", // sender address
				to: "info.ceisa.chch@gmail.com", // list of receivers
				subject: "Question to Ambassadors", // Subject line
				text: "To: " + a.name + ", \n\n" + 
					  "From: " + name + ", \n\n" + 
					  "Email: " + email + ", \n\n" + 
					  "Subject: " + subject + ", \n\n" + 
					  'Message: ' + message + '\n\n',
				html: "To: " + a.name + "<br><br>" + 
					  "From: " + name + "<br><br>" + 
					  "Email: " + email + "<br><br>" + 
					  "Subject: " + subject + "<br><br>" + 
					  "Message: " + message + "<br><br>"
			}, function (err) {
				console.log(err);
				if(err){
					return failure_callback(res, "Service temporarily unavailable.");
				} else {
					return res.json({ success : true });
				}
			});
		} else {
			return failure_callback(res, "Ambassador Not Found!");
		}

            // Check If Question Already Exists
			/*
			var query = questionModel.findOne({name: name});
            query.exec(function (err, question) {
                if (err) {
                    console.log("-- Error : Finding Question --");
                    console.log(err);
                    return failure_callback(res);
                } else if (question) {
                	return failure_callback(res, "Another question has already registered with same name.");
                }

                var a = new questionModel();

                a.name   		= name;
                a.email	        = (email)?email:"";
                a.subject       = (subject)?subject:"";
                a.message 	    = (message)?message:"";
                a.ambassador    = (ambassador)?ambassador:null;
				
				a.save(function (err, new_question) {
					if (err) {
						console.log("-- Error : Saving Question --");
                    	console.log(err);
						return failure_callback(res);
					} else {
						return success_callback(res);
					}
				});
            });*/
        },

		"post#question/get" : function( req, res ) {
			var _id = req.body.id;
			var query;

			if(_id){
				query = questionModel.findOne({_id : _id}).populate('category');
			} else {
				query = questionModel.find({}).populate('category');
			}

			query.exec(function(err, question){
				if(err){
					console.log("-- Error : Querying Question Failed --");
					console.log(err);
					return failure_callback(res);
				} else {
                    console.log('we get here');
					return res.json({ success : true, question : format_questiones(question) });
				}
			});
		},

		"post#question/update" : function (req, res) {
        	// Get Request Parameters
            var id              = req.body.id,
                name       = req.body.name,
                email      = req.body.email,
                subject    = req.body.subject,
                message    = req.body.message,
                ambassador = req.body.ambassador;

            // Check If Id is correctly posted
            if(!id){
            	return failure_callback(res);
            }

            // Check If Question Already Exists
			var query = questionModel.findOne({_id : id});
            query.exec(function (err, b) {
                if (err) {
                    console.log("-- Error : Finding Question --");
                    console.log(err);
                    return failure_callback(res);
                } else if (!b) {
                	return failure_callback(res, "Question Not Found!");
                }

                a.name          = (name)?name:a.name;
                a.email         = (email)?email:a.email;
                a.subject       = (subject)?subject:a.subject;
                a.message       = (message)?message:a.message;
                a.ambassador    = (ambassador)?ambassador:a.ambassador;
				
				a.save(function (err, new_question) {
					if (err) {
						console.log("-- Error : Saving Question --");
                    	console.log(err);
						return failure_callback(res);
					} else {
						return success_callback(res);
					}
				});
            });
        },

		"post#question/delete" : function( req, res) {
			var id = req.body.id;
			questionModel.remove({ _id : id}, function(err){
				if(err){
					console.log("-- Error : Deleting Question --");
                    console.log(err);
					return failure_callback(res);
				} else {
					return success_callback(res);
				}
			});
		},
    }
}