// Requires
var express = require( 'express' );
var fs      = require('fs');
var path    = require("path");

// Instances
var app     = express();

// Configuration
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

// Routes
app.get('/api', function( req, res ){
	res.send( 'Portfolio API working' );
});

app.get('/api/projects', function( req, res ){
	fs.readFile( path.resolve(__dirname, 'data/projects.json') , "utf8", 
		function( err, data ){
			var projects = JSON.parse( data );
			res.json( projects );
		}
	);
});

app.post('/api/contact', function( req, res ){
	// Send Email
	console.log( req.body );
	res.send( '{ "status" : "sent" }' );
});

// Starting server
console.log( 'Lisening server at port 80 ');
app.listen(80);