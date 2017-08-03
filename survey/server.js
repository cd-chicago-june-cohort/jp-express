var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'codingdojo'}));

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('index');
})

app.post('/submit', function(request, response) {
    request.session.name = request.body.name;
    request.session.location = request.body.location;
    request.session.language = request.body.language;
    if (request.body.comment) {
        request.session.comment = request.body.comment;
    } else {
        request.session.comment = "";
    }
    response.redirect('/result');
})

app.get('/result', function(request, response) {
    var info = {
        name: request.session.name,
        location: request.session.location,
        language: request.session.language,
        comment: request.session.comment,
    }
    response.render('result', {info: info});
})

app.listen(9000, function() {
    console.log('Listening to port 9000');
})