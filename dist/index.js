'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _scores = require('./models/interface/scores');

var _scores2 = _interopRequireDefault(_scores);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _score = require('./models/classes/score');

var _scores3 = require('./api/scores');

var _scores4 = _interopRequireDefault(_scores3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_express2.default.static(__dirname));
app.server = _http2.default.createServer(app);

setInterval(calculateHighScores, 1500);

var AllUsers = new Array();
var Top5Users = new Array();
var IsMutexEnabled = false;

// logger for debug purposes
// app.use(morgan('dev'));

app.use(_bodyParser2.default.json({
	limit: _config2.default.bodyLimit
}));

/**
 * This function calculates the high score every 1500milis.
 * As this function is called from the SetInterval which is Async, we want a mutex 
 * so as to "lock" the object and all the players to submit a new word during the calculation of the highscores.
 */
function calculateHighScores() {
	IsMutexEnabled = true;
	Top5Users = new Array();
	AllUsers.sort(function (a, b) {
		return _scores2.default[b].points - _scores2.default[a].points;
	});
	if (AllUsers.length >= 5) {
		AllUsers.slice(0, 5).forEach(function (element) {
			Top5Users.push(_scores2.default[element]);
		});
	} else {
		AllUsers.forEach(function (element) {
			Top5Users.push(_scores2.default[element]);
		});
	}
	IsMutexEnabled = false;
}

app.use((0, _middleware2.default)({ app: app })); //the first level of middleware
app.get('/', function (req, res) {
	res.render('index.html');
});
app.get('/api/getScores', function (req, res) {
	if (Top5Users.length === 0) {
		calculateHighScores();
	}
	res.json(Top5Users);
});

app.post('/api/submitEntry', function (req, res) {
	if (req.body.name === undefined || req.body.word === undefined) {
		res.json("Bad request");
		return;
	}
	var name = req.body.name;
	var word = req.body.word;
	if (IsMutexEnabled) {
		res.json("The turn is over");
	}
	if (_scores2.default[req.cookies.uuid] !== undefined) {
		_scores2.default[req.cookies.uuid].updateScore(word);
	} else {
		_scores2.default[req.cookies.uuid] = new _score.Score(name, word);
		AllUsers.push(req.cookies.uuid);
	}
	// if (AllUsers.includes(req.cookies.uuid) === false) {
	// 	AllUsers.push(req.cookies.uuid)
	// }
	res.json(_scores2.default[req.cookies.uuid].points);
});

app.server.listen(process.env.PORT || _config2.default.port, function () {
	console.log('Started on port ' + app.server.address().port);
});

exports.default = app;
//# sourceMappingURL=index.js.map