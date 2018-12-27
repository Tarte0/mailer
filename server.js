var app 		= require('express')();
var http 		= require('http').Server(app);
var io 			= require('socket.io')(http);
var mailHelpers = require('./mailHelpers.js');

http.listen(3000, function(){
 console.log('listening on *:3000');
});

app.get('/',function(req,res){
    res.sendFile('/home/stev/Documents/projet/mailer/index.html');
});

io.on('connection', function(socket) { 
	console.log('client connected : (', socket.client.id,')');
	
	io.emit('mailer', {message:'Salut !'});

	socket.on('sendMail', function(value) { 

		console.log(socket.client.id, value);

		if(value.from && value.to && value.html && value.subject){
			sendMail(value);
		}else{
			io.emit('mailer', {message:'incomplete mail ! should be : {from, to, html, subject}'});
		}
	});		
});

io.on('sendMail', function(socket) { 
	console.log(socket);
	//io.emit('cptRes', {cpt:cpt});
});

function sendMail(mail){
	mailHelpers.sendMailFromConfig(mail);
	io.emit('mailer', {message:'J\'ai envoyé ton mail !', mail});
}
