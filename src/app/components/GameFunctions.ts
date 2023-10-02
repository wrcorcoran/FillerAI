import Board from "./Board";
import { CellProps } from "./Cell";
import Player from "./Player";

let hasWinner = false;
let hasTie = false;

function decideFirst() {
    return new Promise<string>((resolve, reject) => {
        resolve(Math.random() < 0.5 ? "human" : "bot");
    });
}

function createPlayers(opening: string, humanColor: string, botColor: string) {
    return new Promise<Player[]>((resolve, reject) => {
        let human = new Player({
            color: humanColor,
            personalMap: Array(7).fill(Array(8).fill(false)),
            score: 1,
            type: "human",
            active: opening === "human" ? true : false,
        });

        let bot = new Player({
            color: botColor,
            personalMap: Array(7).fill(Array(8).fill(false)),
            score: 1,
            type: "bot",
            active: opening === "bot" ? true : false,
        });

        resolve([human, bot]);
    });
}

async function humanChooseColor(
    human: Player,
    color: string,
    bot: Player,
    board: Board,
    setReload: (reload: boolean) => void
) {
    return new Promise<void>(async (resolve, reject) => {
        human.setColor(color);

        let spaces = await findSpaces(board, human, color);
        let num = await changeBoardState(spaces, board, color, human);

        updateScore(human, num);
        swapActivePlayer([human, bot]);

        setReload(true);
        resolve();
    });
}

function botChooseColor(
    colors: string[],
    board: Board,
    bot: Player,
    human: Player
) {
    return new Promise<void>(async (resolve, reject) => {
        let availableColors = colors.filter(
            (color) => color !== bot.getColor() || color !== human.getColor()
        );

        let color =
            availableColors[Math.floor(Math.random() * availableColors.length)];

        let spaces = await findSpaces(board, bot, color);
        let num = await changeBoardState(spaces, board, color, bot);
        updateScore(bot, num);
        swapActivePlayer([human, bot]);
        console.log("swapped");
        resolve();
    });
}

function swapActivePlayer(players: Player[]) {
    players[0].active = !players[0].active;
    players[1].active = !players[1].active;
}

function findSpaces(b: Board, p: Player, color: string) {
    return new Promise<any>((resolve, reject) => {
        let spaces = [];

        for (let i = 0; i < b.board.length; i++) {
            for (let j = 0; j < b.board[i].length; j++) {
                if (validMove(b, p, color, i, j)) {
                    console.log("valid move", i, j);
                    spaces.push([i, j]);
                }
            }
        }

        resolve(spaces);
    });
}

function validMove(b: Board, p: Player, color: string, i: number, j: number) {
    if (b.board[i][j].color === color) {
        if (
            i > 0 &&
            String(b.board[i - 1][j].getCapturedBy()) === p.getType()
        ) {
            return true;
        } else if (
            i < 6 &&
            String(b.board[i + 1][j].getCapturedBy()) === p.getType()
        ) {
            return true;
        } else if (
            j > 0 &&
            String(b.board[i][j - 1].getCapturedBy()) === p.getType()
        ) {
            return true;
        } else if (
            j < 7 &&
            String(b.board[i][j + 1].getCapturedBy()) === p.getType()
        ) {
            return true;
        } else {
            return false;
        }
    }

    return false;
}

async function changeBoardState(
    spaces: any,
    board: Board,
    color: string,
    player: Player
) {
    return new Promise<number>((resolve, reject) => {
        let cells: CellProps[] = [];
        for (let i = 0; i < spaces.length; i++) {
            console.log("board state", spaces[i]);
            cells.push({
                location: spaces[i],
                color: color,
                captured: true,
                capturedBy: player.getType(),
            });
        }

        board.changeCells(cells);

        resolve(spaces.length);
    });
}

function updateScore(player: any, num: number) {
    player.incrementScore(num);
}

function checkForWinner(players: Player[]) {
    if (players[0].getScore() > 28) {
        hasWinner = true;
        return players[0].getType();
    } else if (players[1].getScore() > 28) {
        hasWinner = true;
        return players[1].getType();
    }
}

function checkForTie(players: Player[]) {
    if (players[0].getScore() === 28 && players[1].getScore() === 28) {
        hasTie = true;
        return "tie";
    }
}

export {
    decideFirst,
    createPlayers,
    humanChooseColor,
    botChooseColor,
    swapActivePlayer,
    findSpaces,
    validMove,
    changeBoardState,
    updateScore,
    checkForWinner,
    checkForTie,
    hasWinner,
    hasTie,
};
