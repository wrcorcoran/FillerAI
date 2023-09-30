import Board from "./Board";
import ColorBar from "./ColorBar";
import Player from "./Player";
import Scoreboard from "./Scoreboard";
import styles from "./css/game.module.css";
import { decideFirst, createPlayers } from "./GameFunctions";

export default function Game() {
    let opening = decideFirst();
    let players = createPlayers(opening);
    let human = players[0];
    let bot = players[1];

    function playerOneSetColor(color: string) {
        human.setColor(color);
    }

    function playerTwoSetColor(color: string) {
        bot.setColor(color);
    }

    function playerOneGetColor() {
        return human.getColor();
    }

    function playerTwoGetColor() {
        return bot.getColor();
    }

    let board = new Board({ playerOneSetColor, playerTwoSetColor });

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
                    />
                </div>
            </div>

            <Scoreboard player="Bot" score={bot.getScore()} />
        </div>
    );
}
