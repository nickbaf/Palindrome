"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class that represents a Score
 * name: the player's name
 * points: the number of points that the player's submition has
 */
var Score = /** @class */ (function () {
    function Score(playerName, word) {
        this.name = playerName;
        this.points = this.palindrome(word);
    }
    /**
     * Function that given a new word updates the highscore.
     * @param word the word that the player has submited
     */
    Score.prototype.updateScore = function (word) {
        var score = this.palindrome(word);
        if (score > this.points) {
            this.points = score;
        }
    };
    /**
     * Function that calculates the palindrome
     * @param word the word that the player has submited
     */
    Score.prototype.palindrome = function (word) {
        if (word === "") {
            return word.length;
        }
        // Remove illegal chars
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
