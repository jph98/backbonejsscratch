// See Express docs - built on top of connect
// http://expressjs.com/guide.html
// http://expressjs.com/api.html
// Tutorial - http://www.slideshare.net/cjoudrey/building-your-first-node-app-with-connect-express

var express = require('express');

var app = express();

// app.configure(function() {
// 	app.use(express.bodyParser());
// 	app.use(express.cookieParser());	
// });

// app.configure('development', function() {});
// app.configure('production', function() {});

// Param: app.get('/user/:id', function(req, res){

app.get('/user', function(req, res){

	// Wrap up some JSON
	var body = 'Userinfo';

	res.setHeader('Content-Type', 'text/plain');
	res.setHeader('Content-Length', body.length);
	res.end(body);
});

// Serve static files from a directory with:
app.use(express.static(__dirname));

// Start server
app.listen(5000);
console.log('Server started');