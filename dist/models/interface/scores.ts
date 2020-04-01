import { Score } from "../classes/score";
/**
 * Interface that implements a Dictionary of scores
 * Key= uid: the user ID
 * Value= a Score
 */
interface Scores {
    [uid: string] : Score;
}

let highscores: Scores = {};   
export default highscores;
