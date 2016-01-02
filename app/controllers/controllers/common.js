
var failure_callback = function (res, msg){
	if(!msg){
		return res.json({ success : false, error : "Internal server error. Please try again later." });
	}
		
	return res.json({ success : false, error : msg });
}

var success_callback = function (res, msg){
	if(!msg){
		return res.json({ success : true, message : "success" });
	}
	
	return res.json({ success : true, message : msg });
}

module.exports = function(){
	return {
		"failure_callback" : failure_callback,
		"success_callback" : success_callback
	};
}