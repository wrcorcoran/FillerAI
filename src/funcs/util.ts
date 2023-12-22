import Board from "@/app/components/Board";
import { CellProps } from "@/app/components/Cell";
import { findSpaces } from "@/app/components/GameFunctions";
import Player from "@/app/components/Player";

export function isGameOver(b: Board) {
    let bot = 0;
    let human = 0;

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 8; j++) {
            if (b.board[i][j].getCapturedBy() === "bot") bot++;
            else if (b.board[i][j].getCapturedBy() === "human") human++;
        }
    }

    return human > 29 || bot > 29 || (human === 28 && bot === 28);
}

async function changeBoardState(
    spaces: any,
    board: Board,
    color: string,
    player: Player
) {
    return new Promise<Board>(async (resolve, reject) => {
        let cells: CellProps[] = [];
        for (let i = 0; i < spaces.length; i++) {
            cells.push({
                location: spaces[i],
                color: color,
                captured: true,
                capturedBy: player.getType(),
            });
        }

        // console.log("cells: ", cells)

        await board.changeCells(cells, player.personalMap, color);

        resolve(board);
    });
}

export async function alterBoard(b: Board, color: string, player: Player) {
    return new Promise<Board>(async (resolve, reject) => {
        let spaces = await findSpaces(b, player, color);
        // console.log("player: ", player.getType(), " , space: ", spaces)
        let tempBoard = await changeBoardState(spaces, b.cloneBoard(), color, player);
    
        resolve(tempBoard);
    })
}
