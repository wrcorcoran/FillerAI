import Board from "@/app/components/Board";

// calculate euclidean distance form starting point
function euclideanDistance(x1: any, y1: any, x2: any, y2: any) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// calculate value given parameters (see README.MD for technical explanation)
function getValue(bot: any, bot_mult: any, human: any, human_mult: any) {
    let inside = human_mult !== 0 ? bot_mult / human_mult : 0;
    let raised = Math.pow(inside, bot - human);
    let rooted = Math.pow(raised, 1 / Math.pow(Math.E, Math.E));
    let output = (bot - human) * rooted;

    return output;
}

// evaluate the value of the board for the bot
export default function evalFunction(b: Board) {
    let bot = 0;
    let bot_mult = 0;
    let human = 0;
    let human_mult = 0;

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 8; j++) {
            if (b.board[i][j].getCapturedBy() === "bot") {
                let temp = euclideanDistance(i, j, 0, 7);
                bot_mult += temp;
                bot++;
            } else if (b.board[i][j].getCapturedBy() === "human") {
                let temp = euclideanDistance(i, j, 6, 0);
                human_mult += temp;
                human++;
            }
        }
    }

    // previous solutions
    // bot_mult - human_mult + 56 * (bot - human);
    // let val = (bot_mult - human_mult) * (bot - human) // return (human_mult > bot_mult && human > bot) ? -1 * val : val;

    return getValue(bot, bot_mult, human, human_mult);
}
