import styles from "./css/colorBar.module.css";

interface ColorBarProps {
    playerOneGetColor: () => string;
    playerTwoGetColor: () => string;
}

export default function ColorBar(props: ColorBarProps) {
    let colors = [
        "#d9c027",
        "#3f97d1",
        "#92b956",
        "#6a5293",
        "#d3324d",
        "#494949",
    ];

    function handleYellow() {
        if (props.playerOneGetColor() !== colors[0] && props.playerTwoGetColor() !== colors[0]) {
            console.log("yellow");
        }
    }

    function handleBlue() {
        if (props.playerOneGetColor() !== colors[1] && props.playerTwoGetColor() !== colors[1]) {
            console.log("blue");
        }
    }

    function handleGreen() {
        if (props.playerOneGetColor() !== colors[2] && props.playerTwoGetColor() !== colors[2]) {
            console.log("green");
        }
    }

    function handlePurple() {
        if (props.playerOneGetColor() !== colors[3] && props.playerTwoGetColor() !== colors[3]) {
            console.log("purple");
        }
    }

    function handleRed() {
        if (props.playerOneGetColor() !== colors[4] && props.playerTwoGetColor() !== colors[4]) {
            console.log("red");
        }
    }

    function handleBlack() {
        if (props.playerOneGetColor() !== colors[5] && props.playerTwoGetColor() !== colors[5]) {
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
                            props.playerOneGetColor() === colors[0] || props.playerTwoGetColor() === colors[0]
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
                            props.playerOneGetColor() === colors[1] || props.playerTwoGetColor() === colors[1]
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
                            props.playerOneGetColor() === colors[2] || props.playerTwoGetColor() === colors[2]
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
                            props.playerOneGetColor() === colors[3] || props.playerTwoGetColor() === colors[3]
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
                            props.playerOneGetColor() === colors[4] || props.playerTwoGetColor() === colors[4]
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
                            props.playerOneGetColor() === colors[5] || props.playerTwoGetColor() === colors[5]
                                ? 0.1
                                : 1,
                    }}
                ></div>
            </div>
        </div>
    );
}
