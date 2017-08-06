var express = require('express');
var path = require('path');
var session = require('express-session');

var app = express();

app.use(session({secret: 'codingdojo'}));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', function(requrest, response) {
    response.render('index');
})

var server = app.listen(8000, function() {
    console.log('Listening on port 8000');
})

var io = require('socket.io').listen(server);

var users = [];
var messages = [];

io.on('connection', function(socket) {

    socket.emit('initial_server_response', {
        users: users,
        messages: messages,
    });

    socket.on('submitted', function(data) {

        users.push(data.name);
        messages.push(data.message);
        console.log(users);
        console.log(messages);

        io.emit('server_response', {
            users: users,
            messages: messages,
        });

    });



})