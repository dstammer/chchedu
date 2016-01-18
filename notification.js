module.exports = {
	sendDevNotification : function(token, message){
		var apnagent = require('apnagent');
		agent = module.exports = new apnagent.Agent();

		var join = require('path').join;
		var pfx = join(__dirname, './dev.p12');
		console.log(pfx);

		agent.set('pfx file', pfx);
		agent.enable('sandbox');

		agent.connect(function (err) {
			console.log(err);
		});

		console.log('-- sending dev notification --');
		console.log(token);
		console.log(message);

		agent.createMessage().device(token).alert(message).send();
	},
	sendProdNotification : function(token, message){
		var apnagent = require('apnagent');
		agent = module.exports = new apnagent.Agent();

		var join = require('path').join;
		var pfx = join(__dirname, './prod.p12');
		console.log(pfx);

		agent.set('pfx file', pfx);
//		agent.enable('sandbox');

		agent.connect(function (err) {
			console.log(err);
		});

		console.log('-- sending prod notification --');
		console.log(token);
		console.log(message);

		agent.createMessage().device(token).alert(message).send();
	}
};