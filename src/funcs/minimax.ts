import Board from "@/app/components/Board";
import Player from "@/app/components/Player";
import evalFunction from "./eval";
import { alterBoard, isGameOver } from "./util";

/**
 * minimax() is the standard minimax with alpha beta pruning
 * algorithm.
 *
 * @param board - current board at each play
 * @param depth - depth of search
 * @param alpha - alpha constant for pruning
 * @param beta - beta constant for pruning
 * @param isMaximizing - is it the bot?
 * @param colors - choice of colors
 * @param bot - bot player object
 * @param human - human player object
 * @param selectionColor - color being tested
 * @returns - promise containing optimal color and its value
 */
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

            beta = Math.min(beta, bestVal);

            if (beta <= alpha) {
                break;
            }
        }

        return [bestColor, bestVal];
    }
}
