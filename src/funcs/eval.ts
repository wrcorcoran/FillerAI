import Board from "@/app/components/Board";

function euclideanDistance(x1: any, y1: any, x2: any, y2: any) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export default function evalFunction(b: Board) {
    let bot = 0;
    let bot_mult = 0;
    let human = 0;
    let human_mult = 0;

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 8; j++) {
            if (b.board[i][j].getCapturedBy() === "bot") {
                let temp = euclideanDistance(Math.sqrt(2) * i, j, 0, 7);
                bot_mult += temp;
                bot++;
            } else if (b.board[i][j].getCapturedBy() === "human") {
                let temp = euclideanDistance(Math.sqrt(2) * i, j, 6, 0);
                human_mult += temp;
                human++;
            }
        }
    }

    let val = (bot_mult - human_mult) * (bot - human)

    // for (let i = 0; i < 7; i++) {
    //     for (let j = 0; j < 8; j++) {
    //         if (b.board[i][j].getCapturedBy() === "bot") {
    //             bot++;
    //         }
    //         else if (b.board[i][j].getCapturedBy() === "human") {
    //             human++;
    //         }
    //     }
    // }

    // console.log("bot count:", bot)
    // console.log("human count:", human)

    // bot_mult - human_mult + 56 * (bot - human);

    return (human_mult > bot_mult && human > bot) ? -1 * val : val;
}
