var express = require('express');
var path = require('path');
var session = require('express-session');

var app = express();

app.use(session({secret: 'codingdojo'}));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('index');
});

var server = app.listen(8000, function() {
    console.log('Listening on port 8000.');
});

var io = require('socket.io').listen(server);

let counter = 0;

io.on('connection', function(socket) {
    socket.on('button_pressed', function(data) {
        counter += 1;
        socket.emit('server_response', {count: counter})
    });
    socket.on('reset_pressed', function(data) {
        counter = 0;
        socket.emit('server_response', {count: counter})
    });
});