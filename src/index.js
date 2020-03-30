import http from 'http';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from './middleware';
import highscores from './models/interface/scores'
import config from './config.json';
import { Score } from './models/classes/score';
import scores from './api/scores';
let app = express();
app.use(express.static(__dirname));
app.server = http.createServer(app);

setInterval(calculateHighScores, 1500)

var AllUsers = new Array();
var Top5Users = new Array();
var IsMutexEnabled = false;

// logger for debug purposes
// app.use(morgan('dev'));

app.use(bodyParser.json({
	limit: config.bodyLimit
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
		return highscores[b].points - highscores[a].points
	})
	if (AllUsers.length >= 5) {
		AllUsers.slice(0, 5).forEach(element => {
			Top5Users.push(highscores[element])
		})
	} else {
		AllUsers.forEach(element => {
			Top5Users.push(highscores[element])
		})
	}
	IsMutexEnabled = false;
}

app.use(middleware({ app })); //the first level of middleware
app.get('/', function (req, res) {
	res.render('index.html');
});
app.get('/api/getScores', function (req, res) {
	if (Top5Users.length === 0) {
		calculateHighScores()
	}
	res.json(Top5Users)
})

app.post('/api/submitEntry', function (req, res) {
	if (req.body.name === undefined || req.body.word === undefined) {
		res.json("Bad request");
		return;
	}
	var name = req.body.name
	var word = req.body.word
	if (IsMutexEnabled) {
		res.json("The turn is over");
	}
	if (highscores[req.cookies.uuid] !== undefined) {
		highscores[req.cookies.uuid].updateScore(word)
	} else {
		highscores[req.cookies.uuid] = new Score(name, word)
		AllUsers.push(req.cookies.uuid)
	}
	// if (AllUsers.includes(req.cookies.uuid) === false) {
	// 	AllUsers.push(req.cookies.uuid)
	// }
	res.json(highscores[req.cookies.uuid].points)
})

app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.server.address().port}`);
});

export default app;
