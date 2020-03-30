"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Score = /** @class */ (function () {
    function Score(playerName, word) {
        this.name = playerName;
        this.points = this.palindrome(word);
    }
    Score.prototype.updateScore = function (word) {
        var score = this.palindrome(word);
        if (score > this.points) {
            this.points = score;
        }
    };
    Score.prototype.palindrome = function (word) {
        if (word === "") {
            return word.length;
        }
        // 1. Remove non-alphanumeric chars from the string
        var alphanum = word.toLowerCase().replace(/[\W]/g, "");
        var front = 0;
        var back = alphanum.length - 1;
        while (front < back) {
            var frontChar = alphanum[front];
            var backChar = alphanum[back];
            if (frontChar != backChar) {
                return 0;
            }
            front++;
            back--;
        }
        return word.length;
    };
    ;
    return Score;
}());
exports.Score = Score;
