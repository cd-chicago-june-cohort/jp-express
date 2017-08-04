var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'codingdojo'}));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('index');
})

var server = app.listen(8000, function() {
    console.log('Listening on port 8000');
});

var io = require('socket.io').listen(server);

io.on('connection', function(socket) {
    console.log('Client/socket is connected.');
    console.log('Client/socket id is:', socket.id);
    
    socket.on('form_submitted', function(data) {
        var rand = Math.floor((Math.random() * 1000) + 1);
        console.log('RANDOM NUMBER: ', rand);
        socket.emit('server_response', {
            info: data,
            number: rand,
        })

    });


})
