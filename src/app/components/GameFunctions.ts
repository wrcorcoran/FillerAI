import Board from "./Board";
import Player from "./Player";

let hasWinner = false;

function decideFirst() {
    return Math.random() < 0.5 ? "human" : "bot";
}

function createPlayers(opening: string) {
    let human = new Player({
        color: "white",
        personalMap: Array(7).fill(Array(8).fill(false)),
        score: 1,
        type: "human",
        active: opening === "human" ? true : false,
    });

    let bot = new Player({
        color: "white",
        personalMap: Array(7).fill(Array(8).fill(false)),
        score: 1,
        type: "bot",
        active: opening === "bot" ? true : false,
    });

    console.log("players made");

    return [human, bot];
}

function humanChooseColor(
    human: Player,
    color: string,
    bot: Player,
    board: Board
) {
    console.log(color);
    human.setColor(color);
    let spaces = findSpaces(board, human, color);
    console.log(spaces);
    let num = changeBoardState(spaces, board, color, human);
    updateScore(human, num);
    swapActivePlayer([human, bot]);
}

function botChooseColor(
    colors: string[],
    board: Board,
    bot: Player,
    human: Player
) {
    let availableColors = colors.filter(
        (color) => color !== bot.getColor() || color !== human.getColor()
    );

    let color =
        availableColors[Math.floor(Math.random() * availableColors.length)];

    let spaces = findSpaces(board, bot, color);
    let num = changeBoardState(spaces, board, color, bot);
    updateScore(bot, num);
    swapActivePlayer([human, bot]);
}

function swapActivePlayer(players: Player[]) {
    players[0].active = !players[0].active;
    players[1].active = !players[1].active;
}

function findSpaces(b: Board, p: Player, color: string) {
    let spaces = [];

    for (let i = 0; i < b.board.length; i++) {
        for (let j = 0; j < b.board[i].length; j++) {
            if (validMove(b, p, color, i, j)) {
                spaces.push([i, j]);
            }
        }
    }

    return spaces;
}

function validMove(b: Board, p: Player, color: string, i: number, j: number) {
    if (b.board[i][j].color === color) {
        if (i > 0 && String(b.board[i - 1][j].getCapturedBy) === p.getType()) {
            return true;
        } else if (
            i < 6 &&
            String(b.board[i + 1][j].getCapturedBy) === p.getType()
        ) {
            return true;
        } else if (
            j > 0 &&
            String(b.board[i][j - 1].getCapturedBy) === p.getType()
        ) {
            return true;
        } else if (
            j < 7 &&
            String(b.board[i][j + 1].getCapturedBy) === p.getType()
        ) {
            return true;
        } else {
            return false;
        }
    }

    return false;
}

function changeBoardState(
    spaces: any,
    board: Board,
    color: string,
    player: Player
) {
    for (let i = 0; i < spaces.length; i++) {
        board.board[spaces[i][0]][spaces[i][1]].setColor(color);
        board.board[spaces[i][0]][spaces[i][1]].setCapturedBy(player.getType());
    }

    return spaces.length;
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
        hasWinner = true;
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
};
