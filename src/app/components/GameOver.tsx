import styles from "./css/gameover.module.css";

interface GameOverProps {
    humanScore: number;
    botScore: number;
}

export default function GameOver(props: GameOverProps) {
    return (
        <div className={styles.background}>
            <div className={styles.title}>
                <h1>GAME OVER</h1>
            </div>
            <div className={styles.decision}>
                {props.humanScore === props.botScore ? (
                    <>
                        <h2>You and the bot TIED.</h2>
                    </>
                ) : (
                    <>
                        {props.humanScore > props.botScore ? (
                            <h1>
                                You WIN, {props.humanScore} to {props.botScore}
                            </h1>
                        ) : (
                            <h1>
                                You LOSE, {props.humanScore} to {props.botScore}
                            </h1>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
