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

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

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

// logger
app.use((0, _morgan2.default)('dev'));

// // 3rd party middleware
// app.use(cors({
// 	exposedHeaders: config.corsHeaders
// }));

app.use(_bodyParser2.default.json({
	limit: _config2.default.bodyLimit
}));

function calculateHighScores() {
	IsMutexEnabled = true;
	Top5Users = new Array();
	AllUsers.sort(function (a, b) {
		return _scores2.default[b].points - _scores2.default[a].points;
	});
	if (AllUsers.length >= 5) {
		//na ypologistei sdto telos tou gyros
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

var db = "test";
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
	_scores2.default[req.cookies.uuid] = new _score.Score(name, word);
	if (AllUsers.includes(req.cookies.uuid) === false) {
		AllUsers.push(req.cookies.uuid);
	}
	//SortedMap.set(highscores[req.body.name].points,req.body.name);
	res.json(_scores2.default[req.cookies.uuid].points);
	//res.json(req.body.name)
});

app.server.listen(process.env.PORT || _config2.default.port, function () {
	console.log('Started on port ' + app.server.address().port);
});

exports.default = app;
//# sourceMappingURL=index.js.map