var express = require('express');
var app = express();
var server_port = process.env.PORT || 3000;
//var server_ip = process.env.app_host || "127.0.0.1";
var bodyParser = require('body-parser');

var tools = require('./lib/tools');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var accounts = [{
					"username": "onesomeone@yandex.com",
					"password": "onepassword"
				},
				{
					"username": "buffiloffi@yandex.com",
					"password": "onepassword"
				},
				{
					"username": "lotomomoto@yandex.com",
					"password": "onepassword"
				},
				{
					"username": "abdulabi@yandex.com",
					"password": "onepassword"
				},
				{
					"username": "roachmama@yandex.com",
					"password": "onepassword"
				},
				{
					"username": "capacollo@yandex.com",
					"password": "onepassword"
				}];


var account_index = Math.floor(Math.random() * 5) + 0;
var account = accounts[account_index];


/*ROUTER*/
var dwRouter = express.Router();


dwRouter.get('/:id', function(req, res) {
	var id = req.params.id;
	//res.send('ciaooo ' + id);




	tools.init(account.username, account.password,function(result){
		//console.log("token " + res);
		tools.getTrack(id,function(track){
			/*return "url: " + tools.downloadUrl + " ciao";*/
			//var json = {"url" : result}
			//res.json(track);
			
			tools.decryptTrack(track, function(result){
				res.write(result,'song');
	    		res.end(null, 'song');
			});
		});
		
	});


});

// Attach the routers for their respective paths
app.use('/downloadTrack', dwRouter);








app.listen(server_port, function(){
	console.log('API running on port' + server_port);
});