/**
 * Class that represents a Score
 * name: the player's name
 * points: the number of points that the player's submition has
 */
export class Score {
    name: string;
    points: number;
    constructor(playerName: string,word:string) {
        this.name = playerName;
        this.points=this.palindrome(word);
    }
    /**
     * Function that given a new word updates the highscore.
     * @param word the word that the player has submited
     */
    updateScore(word:string){
        var score=this.palindrome(word)
        if(score>this.points){
            this.points=score;
        }
    }


    /**
     * Function that calculates the palindrome
     * @param word the word that the player has submited
     */
     palindrome(word:string):number {
        if (word === "") {
            return word.length;
        }
        
        // Remove illegal chars
        const alphanum = word.toLowerCase().replace(/[\W]/g, "");
        
        let front = 0;
        let back = alphanum.length - 1;
        
        while (front < back) {
            const frontChar = alphanum[front];
            const backChar = alphanum[back];
            if (frontChar != backChar) {
                return 0;
            }
            front++;
            back--;
        }
        
        return word.length;
    };

}

