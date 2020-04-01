'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _uuid = require('uuid');

/**
 * This middleware is used to set a cookie for every player so as to be able to uniquely recognise every player.
 * This is to tackle the problem that players can change their names in order to cheat.
 * Using cookies with uuid a player can have the same name as the other player and retain their high score.
 */
exports.default = function (_ref) {
  var app = _ref.app;

  var routes = (0, _express.Router)();
  var cookieParser = require('cookie-parser');

  app.use(cookieParser());

  app.use(function (req, res, next) {
    // check if player sent cookie
    var cookie = req.cookies.uuid;
    if (cookie === undefined) {
      // cookie doesn't exist, set a new one
      var randomNumber = Math.random().toString();
      randomNumber = randomNumber.substring(2, randomNumber.length);
      res.cookie('uuid', (0, _uuid.v4)(), { maxAge: 900000, httpOnly: true });
    }
    next();
  });

  return routes;
};
//# sourceMappingURL=index.js.map