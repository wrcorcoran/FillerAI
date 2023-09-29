"use client";
import styles from "./page.module.css";
import Board from "./components/Board";
import ColorBar from "./components/ColorBar";
import Player from "./components/Player";

export default function Home() {
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

    return (
        <main className={styles.main}>
            <h1 className={styles.title} style={{ paddingBottom: "5%" }}>
                FillerAI
            </h1>
            <div className={styles.board}>
                <Board />
                <div style={{ marginTop: "5%" }}>
                    <ColorBar
                        players={[
                            String(human.getColor()),
                            String(bot.getColor()),
                        ]}
                    />
                </div>
            </div>
        </main>
    );
}
