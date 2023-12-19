import styles from "./css/colorBar.module.css";

interface ColorBarProps {
    playerOneGetColor: () => string;
    playerTwoGetColor: () => string;
    playerOneSetColor: any;
}

export default function ColorBar(props: ColorBarProps) {
    let colors = [
        "#d9c027", // yellow
        "#3f97d1", // blue
        "#92b956", // green
        "#6a5293", // purple
        "#d3324d", // red
        "#494949", // black
    ];

    async function handleYellow() {
        if (
            props.playerOneGetColor() !== colors[0] &&
            props.playerTwoGetColor() !== colors[0]
        ) {
            await props.playerOneSetColor(colors[0]);
        }
    }

    async function handleBlue() {
        if (
            props.playerOneGetColor() !== colors[1] &&
            props.playerTwoGetColor() !== colors[1]
        ) {
            await props.playerOneSetColor(colors[1]);
        }
    }

    async function handleGreen() {
        if (
            props.playerOneGetColor() !== colors[2] &&
            props.playerTwoGetColor() !== colors[2]
        ) {
            await props.playerOneSetColor(colors[2]);
        }
    }

    async function handlePurple() {
        if (
            props.playerOneGetColor() !== colors[3] &&
            props.playerTwoGetColor() !== colors[3]
        ) {
            await props.playerOneSetColor(colors[3]);
        }
    }

    async function handleRed() {
        if (
            props.playerOneGetColor() !== colors[4] &&
            props.playerTwoGetColor() !== colors[4]
        ) {
            await props.playerOneSetColor(colors[4]);
        }
    }

    async function handleBlack() {
        if (
            props.playerOneGetColor() !== colors[5] &&
            props.playerTwoGetColor() !== colors[5]
        ) {
            await props.playerOneSetColor(colors[5]);
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
                            props.playerOneGetColor() === colors[0] ||
                            props.playerTwoGetColor() === colors[0]
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
                            props.playerOneGetColor() === colors[1] ||
                            props.playerTwoGetColor() === colors[1]
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
                            props.playerOneGetColor() === colors[2] ||
                            props.playerTwoGetColor() === colors[2]
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
                            props.playerOneGetColor() === colors[3] ||
                            props.playerTwoGetColor() === colors[3]
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
                            props.playerOneGetColor() === colors[4] ||
                            props.playerTwoGetColor() === colors[4]
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
                            props.playerOneGetColor() === colors[5] ||
                            props.playerTwoGetColor() === colors[5]
                                ? 0.1
                                : 1,
                    }}
                ></div>
            </div>
        </div>
    );
}
