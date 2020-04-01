'use strict';

var _score = require('./models/classes/score.ts');

describe('Score test', function () {
    var s = new _score.Score("nick", "a man a plan a canal panama");
    it('name should be nick', function () {

        expect(s.name).toBe("Nick");
    });
});
//# sourceMappingURL=score.test.js.map