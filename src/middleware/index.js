import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
/**
 * This middleware is used to set a cookie for every player so as to be able to uniquely recognise every player.
 * This is to tackle the problem that players can change their names in order to cheat.
 * Using cookies with uuid a player can have the same name as the other player and retain their high score.
 */
export default ({ app }) => {
	let routes = Router();
	var cookieParser = require('cookie-parser')

app.use(cookieParser());

app.use(function (req, res, next) {
  // check if player sent cookie
  var cookie = req.cookies.uuid;
  if (cookie === undefined)
  {
    // cookie doesn't exist, set a new one
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('uuid',uuidv4(), { maxAge: 900000, httpOnly: true });
  } 
  next();
});

	return routes;
}
