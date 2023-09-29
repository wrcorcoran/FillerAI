import Board from "./Board";
import ColorBar from "./ColorBar";
import Player from "./Player";
import Scoreboard from "./Scoreboard";
import styles from "./css/game.module.css";

export default function Game() {
    let human = new Player({
        color: "white",
        personalMap: [[]],
        score: 1,
        type: "human",
    });

    let bot = new Player({
        color: "white",
        personalMap: [[]],
        score: 1,
        type: "bot",
    });

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

    let board = new Board({playerOneSetColor, playerTwoSetColor});

    console.log(JSON.stringify(board.getJSON()));

    return (
        <main className={styles.main}>
            <h1 className={styles.title} style={{ paddingBottom: "5%" }}>
                FillerAI
            </h1>
            <div className={styles.board_score}>
                <Scoreboard player="You" score={human.getScore()} />

                <div className={styles.board}>
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
        </main>
    );
}
