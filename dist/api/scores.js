'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _resourceRouterMiddleware = require('resource-router-middleware');

var _resourceRouterMiddleware2 = _interopRequireDefault(_resourceRouterMiddleware);

var _scores = require('../models/interface/scores');

var _scores2 = _interopRequireDefault(_scores);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;
	return (0, _resourceRouterMiddleware2.default)({

		/** Property name to store preloaded entity on `request`. */
		id: 'scores',

		/** For requests with an `id`, you can auto-load the entity.
   *  Errors terminate the request, success sets `req[id] = data`.
   */
		load: function load(req, id, callback) {

			callback(err, _scores2.default);
		},


		/** GET / - List all entities */
		index: function index(_ref2, res) {
			var params = _ref2.params;

			res.json("blah");
		},


		/** POST / - Create a new entity */
		create: function create(_ref3, res) {
			var body = _ref3.body;

			body.id = facets.length.toString(36);
			facets.push(body);
			res.json(body);
		}
	});
};
//import highscores from '../models/interface/scores';
//# sourceMappingURL=scores.js.map