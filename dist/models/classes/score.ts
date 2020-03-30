export class Score {
    name: string;
    points: number;
    constructor(playerName: string,word:string) {
        this.name = playerName;
        this.points=this.palindrome(word);
    }
    updateScore(word:string){
        var score=this.palindrome(word)
        if(score>this.points){
            this.points=score;
        }
    }



     palindrome(word:string):number {
        if (word === "") {
            return word.length;
        }
        
        // 1. Remove non-alphanumeric chars from the string
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

