var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname + '/static')));
app.use(session({secret: 'codingdojorocks'}));

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    if (request.session.count) {
        request.session.count += 1;
    } else {
        request.session.count = 1;
    }
    response.render('index', {current_count: request.session.count});
})

app.get('/plus_two', function(request, response) {
    if (request.session.count) {
        request.session.count += 1;
    } else {
        request.session.count = 1;
    }
    response.redirect('/');
})

app.get('/reset', function(request, response) {
    request.session.count = 0;
    response.redirect('/');
})


app.listen(8000, function() {
    console.log('listening to port 8000');
});