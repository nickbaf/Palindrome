'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _uuid = require('uuid');

exports.default = function (_ref) {
  var app = _ref.app;

  var routes = (0, _express.Router)();
  var cookieParser = require('cookie-parser');

  app.use(cookieParser());

  // set a cookie
  app.use(function (req, res, next) {
    // check if client sent cookie
    var cookie = req.cookies.uuid;
    if (cookie === undefined) {
      // no: set a new cookie
      var randomNumber = Math.random().toString();
      randomNumber = randomNumber.substring(2, randomNumber.length);
      res.cookie('uuid', (0, _uuid.v4)(), { maxAge: 900000, httpOnly: true });
      console.log('cookie created successfully');
    } else {
      // yes, cookie was already present 
      console.log('cookie exists', cookie);
    }
    next(); // <-- important!
  });

  return routes;
};
//# sourceMappingURL=index.js.map