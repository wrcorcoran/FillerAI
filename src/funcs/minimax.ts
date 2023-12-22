import Board from "@/app/components/Board";
import Player from "@/app/components/Player";
import evalFunction from "./eval";
import { alterBoard, isGameOver } from "./util";

export async function minimax(
    board: Board,
    depth: any,
    alpha: any,
    beta: any,
    isMaximizing: any,
    colors: any,
    bot: Player,
    human: Player,
    selectionColor: string
): Promise<[string, number]> {
    // console.log("depth:", depth)
    // console.log("board", board)

    if (isGameOver(board)) {
        return [selectionColor, depth * evalFunction(board)];
    }

    if (depth <= 0) return [selectionColor, evalFunction(board)];

    let humanColor = board.board[6][0].getColor();
    let botColor = board.board[0][7].getColor();

    let availableColors = colors.filter(
        (color: string) => color !== humanColor && color !== botColor
    );

    if (isMaximizing) {
        let bestVal = -Infinity;
        let bestColor = "";

        for (const color of availableColors) {
            let tempVal = -Infinity;
            let tempBoard = await alterBoard(board.cloneBoard(), color, bot);
            let tempCol = "";

            let temp = await minimax(
                tempBoard,
                depth - 1,
                alpha,
                beta,
                false,
                colors,
                bot,
                human,
                color
            );

            tempCol = temp[0];
            tempVal = temp[1];

            if (tempVal > bestVal) {
                bestVal = tempVal;
                bestColor = color;
            }

            // tempVal = temp[1]

            // bestVal = Math.max(bestVal, tempVal);

            // if (bestVal === tempVal) {
            //     // console.log("best max:", bestVal)
            //     // console.log("best max:", color)
            //     bestColor = color;
            // }

            alpha = Math.max(alpha, bestVal);

            if (beta <= alpha) {
                break;
            }
        }

        return [bestColor, bestVal];
    } else {
        let bestVal = +Infinity;
        let bestColor = "";

        for (const color of availableColors) {
            let tempVal = +Infinity;
            let tempBoard = await alterBoard(board.cloneBoard(), color, human);
            let tempCol = "";

            let temp = await minimax(
                tempBoard,
                depth - 1,
                alpha,
                beta,
                true,
                colors,
                bot,
                human,
                color
            );

            tempCol = temp[0];
            tempVal = temp[1];

            if (tempVal < bestVal) {
                bestVal = tempVal;
                bestColor = color;
            }

            // bestVal = Math.min(bestVal, tempVal);

            // if (bestVal === tempVal) {
            //     // console.log("best min:", bestVal)
            //     // console.log("best min:", color)
            //     bestColor = color;
            // }

            beta = Math.min(beta, bestVal);

            if (beta <= alpha) {
                break;
            }
        }

        return [bestColor, bestVal];
    }
}
