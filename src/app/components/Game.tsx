import Board from "./Board";
import ColorBar from "./ColorBar";
import Player from "./Player";
import Scoreboard from "./Scoreboard";
import styles from "./css/game.module.css";
import {
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
} from "./GameFunctions";

export default function Game() {
    let opening = decideFirst();
    let players = createPlayers(opening);
    let human = players[0];
    let bot = players[1];

    let board = new Board({ humanSetInitialColor, botSetInitialColor });

    function humanSetInitialColor(color: string) {
        human.setColor(color);
        console.log("human color set", human.getColor());
    }

    function botSetInitialColor(color: string) {
        bot.setColor(color);
        console.log("bot color set", bot.getColor());
    }

    function playerOneSetColor(color: string) {
        humanChooseColor(human, color, bot, board);
    }

    function playerOneGetColor() {
        return human.getColor();
    }

    function playerTwoGetColor() {
        return bot.getColor();
    }

    return (
        <div className={styles.board_score}>
            <Scoreboard player="You" score={human.getScore()} />

            <div
                className={styles.board}
                style={{ opacity: human.getActive() ? "100%" : "20%" }}
            >
                {board.getView()}
                <div style={{ marginTop: "5%" }}>
                    <ColorBar
                        playerOneGetColor={playerOneGetColor}
                        playerTwoGetColor={playerTwoGetColor}
                        playerOneSetColor={playerOneSetColor}
                    />
                </div>
            </div>

            <Scoreboard player="Bot" score={bot.getScore()} />
        </div>
    );
}
