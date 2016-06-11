var Yelp = require('yelp');

var yelp = new Yelp({
	consumer_key: 'at1SvYDKmyRuCiJlorSTwA',
	consumer_secret: 'WQxFPhrek1o0mWi1qYb8Mgt1HHQ',
	token: 'jbVh62IqYFHRWaLVbGXQNBRSmBlRPfan',
	token_secret: 'A5hnX_e2BFtYkTr1ozUqdZp_PN0',
});


var express = require('express');
var app = express();

var server = "https://hungry-hungry-hipster.herokuapp.com";

// for facebook login
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

var mongoUri = process.env.MONGODB_URI || 'mongodb://heroku_svrwbps4:q5925jipkirefdlurqd18phpg8@ds019471.mlab.com:19471/heroku_svrwbps4';
var MongoClient = require('mongodb').MongoClient,
	format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});

// Configure Passport authenticated session persistence.
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Twitter profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
	cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
	cb(null, obj);
});

passport.use(new Strategy({
		clientID: '1812688892295844',
		clientSecret: '2dfb75c8b6f984766d1a8674567a014d',
		callbackURL: server + "/auth/facebook/callback"
	},
	function(accessToken, refreshToken, profile, cb) {
		var cursor = db.collection('users');

		cursor.count({ facebookId: profile.id }, function(err, count) {
			if (count == 1) { // user exists
				cursor.find({ facebookId: profile.id }, function(err, user) {
					return cb(err, user);
				});
			} 
			else { // create new user
				var toInsert = {
					"facebookId": profile.id,
					"name": profile.displayName,
					"scores": []
				}
				cursor.insert(toInsert, function(err, user) {
					return cb(err, user);
				});
			}
		});
	}
));

app.use(passport.initialize());
app.use(passport.session());

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
	extended: true
})); // support encoded bodies

app.set('port', (process.env.PORT || 5000));

// views is directory for 	all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// facebook login authentication pages
app.get('/auth/facebook',
	passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
	passport.authenticate('facebook', {
		failureRedirect: '/'
	}),
	function(req, res) {
		// Successful authentication, redirect home
		res.redirect('/home.html?id=' + req.user.cmd.query.facebookId);
});

app.use(express.static(__dirname + '/public'));

app.get('/checkin.html', function(request, response) {
	response.sendFile(__dirname + '/public/checkin.html')
});

app.get('/trends.html', function(request, response) {
	response.sendFile(__dirname + '/public/trends.html')
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/login.html');
});

app.get('/getRestaurants', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");

	var reqLocation = String(Number(req.query.lat) + "," + Number(req.query.lng));

	yelp.search({
			term: 'food',
			ll: reqLocation,
			sort: 1
		})
		.then(function(dataR) {
			yelp.search({
					term: 'coffee',
					ll: reqLocation,
					sort: 1
				})
				.then(function(dataC) {

					var concated = (dataC.businesses).concat(dataR.businesses)
						.sort(function(a, b) {
							if (a.distance < b.distance)
								return -1;
							if (a.distance > b.distance)
								return 1;
							return 0;
						});

					res.send(concated);
				})
				.catch(function(err) {
					console.error(err);
					res.send(err);
				});
		})
		.catch(function(err) {
			console.error(err);
			res.send(err);
		});
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});

app.post('/sendScore', function(req, res) {
	var login = String(req.body.login);
	var score = Number(req.body.score);

	var cursor = db.collection('users');

	cursor.findOne({ "facebookId": login }, function(err, user) {
		if (err || user == null) {
			res.send(":-(");
		} 
		else {
			var updatedUser = user;
			updatedUser.scores.unshift(score);
			cursor.update({
				"facebookId": login
			}, updatedUser, function() {
				res.send(":-)");
			});
		}
	});
});

app.get('/trendSelf', function(req, res) {
	var login = String(req.query.login);
	var cursor = db.collection('users');

	cursor.findOne({ "facebookId": login }, function(err, user) {
		if (err || user == null) {
			res.send({"name": "", "score": []});
		} 
		else {
			res.send({"name": user.name, "score": user.scores});
		}
	});
});

app.get('/trendCompare', function(req, res) {
	var login = String(req.query.login);
	var friend = String(req.query.friend);

	var cursor = db.collection('users');

	cursor.findOne({ "facebookId": login }, function(err, user) {
		if (err || user == null) {
			res.send([ [], [] ]);
		} 
		else {
			cursor.findOne({ "name": friend }, function(err, frienduser) {
				if (err || frienduser == null) {
					res.send([ [], [] ]);
				}
				else {
					res.send({"name": user.name, "score": [user.scores, frienduser.scores]});
				}
			});
		}
	});
});

app.get('/trendEveryone', function(req, res) {
	var cursor = db.collection('users');

	cursor.find().toArray(function(err, coll){
		if (err || coll == null) {
			res.send(err);
		} 
		else {
			res.send(coll);
		}
	});
});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}
