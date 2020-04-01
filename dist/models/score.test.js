"use strict";

var _score = require("./classes/score");

var _score2 = _interopRequireDefault(_score);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Score test', function () {

  var s = new _score2.default("nick", "a man a plan a canal panama");
  it('name should be nick', function () {

    expect(s.name).toBe("Nick");
    expect(s.points).toBe(50);
  });
});
//# sourceMappingURL=score.test.js.map