import styles from "./css/scoreboard.module.css";
import { FaComputer } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";

interface ScoreboardProps {
    player: string;
    score: number;
}

export default function Scoreboard(props: ScoreboardProps) {
    return (
        <div className={styles.background}>
            <div className={styles.player}>
                <h2>{props.player}</h2>
            </div>
            <div className={styles.icon}>
                {props.player === "Bot" ? (
                    <FaComputer color="black" size={30} />
                ) : (
                    <IoPerson color="black" size={30} />
                )}
            </div>
            <div className={styles.score}>
                <h2>{props.score}</h2>
            </div>
        </div>
    );
}
