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

    return [human, bot];
}

function humanChooseColor() {
    // TO_DO
}

function botChooseColor() {
    // TO_DO
}

function changeBoardState(spaces: any, player: any, color: string) {
    // TO_DO
}

function updateScore(player: any) {
    // TO_DO
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

export { decideFirst, createPlayers };
