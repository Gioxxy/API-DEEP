var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

var tools = require('./lib/tools');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());






/*ROUTER*/
var dwRouter = express.Router();


dwRouter.get('/:id', function(req, res) {
	var id = req.params.id;
	//res.send('ciaooo ' + id);
	tools.init("onesomeone@yandex.com", "onepassword",function(result){
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








app.listen(port);
console.log('todo list RESTful API server started on: ' + port);