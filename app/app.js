// Requires
var express    = require("express");
var fs         = require("fs");
var path       = require("path");
var nodemailer = require("nodemailer");
var iniparser  = require("iniparser")

// Read INI configuration
var config     = iniparser.parseSync( path.resolve(__dirname, 'config/parameters.ini') );

// Configure Mail Transport
var smtpTransport = nodemailer.createTransport( "SMTP", {
	service: config.email.service,
	auth: {
		user: config.email.user,
		pass: config.email.password
	}
});

// New Express Instance
var app = express();

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
	var message = {
		from: "Portfolio Contact <contact@portfolio.com>",
		to: "Alfons Foubert <alfons.foubert@gmail.com>",
		subject: "Contacto del Portfolio - " + req.body.name,
		html: "<dt>Nombre</dt>" + 
			  "<dd>"+req.body.name+"</dd>" + 
			  "<dt>Contacto</dt>" + 
			  "<dd>"+req.body.contact+"</dd>" + 
			  "<dt>Mensaje</dt>"+ 
			  "<dd>"+req.body.message+"</dd>"
	}

	smtpTransport.sendMail(message, function(error, response){
	    if(error){
	    	res.send( '{ "status" : "error" }' );
	    }else{
	        res.send( '{ "status" : "sent" }' );
	    }
	});
});

// Starting server
console.log( 'Lisening server at port 80 ');
app.listen(80);