import styles from "./css/colorBar.module.css";

export default function ColorBar({ players }: { players: string[] }) {
    let colors = [
        "#d9c027",
        "#3f97d1",
        "#92b956",
        "#6a5293",
        "#d3324d",
        "#494949",
    ];

    function handleYellow() {
        if (players[0] !== colors[0] && players[1] !== colors[0]) {
            console.log("yellow");
        }
    }

    function handleBlue() {
        if (players[0] !== colors[1] && players[1] !== colors[1]) {
            console.log("blue");
        }
    }

    function handleGreen() {
        if (players[0] !== colors[2] && players[1] !== colors[2]) {
            console.log("green");
        }
    }

    function handlePurple() {
        if (players[0] !== colors[3] && players[1] !== colors[3]) {
            console.log("purple");
        }
    }

    function handleRed() {
        if (players[0] !== colors[4] && players[1] !== colors[4]) {
            console.log("red");
        }
    }

    function handleBlack() {
        if (players[0] !== colors[5] && players[1] !== colors[5]) {
            console.log("black");
        }
    }

    return (
        <div className={styles.centerContainer}>
            <div className={styles.bar} style={{ width: "80%" }}>
                <div
                    onClick={handleYellow}
                    className={styles.square}
                    style={{
                        backgroundColor: colors[0],
                        opacity:
                            players[0] === colors[0] || players[1] === colors[0]
                                ? 0.1
                                : 1,
                    }}
                ></div>

                <div
                    onClick={handleBlue}
                    className={styles.square}
                    style={{
                        backgroundColor: colors[1],
                        opacity:
                            players[0] === colors[1] || players[1] === colors[1]
                                ? 0.1
                                : 1,
                    }}
                ></div>

                <div
                    onClick={handleGreen}
                    className={styles.square}
                    style={{
                        backgroundColor: colors[2],
                        opacity:
                            players[0] === colors[2] || players[1] === colors[2]
                                ? 0.1
                                : 1,
                    }}
                ></div>

                <div
                    onClick={handlePurple}
                    className={styles.square}
                    style={{
                        backgroundColor: colors[3],
                        opacity:
                            players[0] === colors[3] || players[1] === colors[3]
                                ? 0.1
                                : 1,
                    }}
                ></div>

                <div
                    onClick={handleRed}
                    className={styles.square}
                    style={{
                        backgroundColor: colors[4],
                        opacity:
                            players[0] === colors[4] || players[1] === colors[4]
                                ? 0.1
                                : 1,
                    }}
                ></div>

                <div
                    onClick={handleBlack}
                    className={styles.square}
                    style={{
                        backgroundColor: colors[5],
                        opacity:
                            players[0] === colors[5] || players[1] === colors[5]
                                ? 0.1
                                : 1,
                    }}
                ></div>
            </div>
        </div>
    );
}
