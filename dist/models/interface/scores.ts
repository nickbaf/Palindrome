import { Score } from "../classes/score";

interface Scores {
    [uid: string] : Score;
}

let highscores: Scores = {};   
export default highscores;
