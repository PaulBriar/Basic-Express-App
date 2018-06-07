var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/friends';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

var friends = ['Tom', 'Paul', 'Jon', 'Tim', 'Ken'];

app.get('/', function(req, res) {
        res.render('home');
});

app.post('/addfriend', function(req, res) {
    var newFriend = (req.body.newfriend);
    friends.push(newFriend);
    //res.send('You have reached the post route')
    res.redirect('/friends');
});

app.get('/friends', function(req, res) {
    res.render('friends', {friends: friends});
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Beep Booop Bop');
});