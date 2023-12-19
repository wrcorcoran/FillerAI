import { useContext, useEffect, useReducer, useState } from "react";
import { ReloadContext } from "../contexts/ReloadContext";
import Board from "./Board";
import ColorBar from "./ColorBar";
import {
    botChooseColor,
    checkForTie,
    checkForWinner,
    createPlayers,
    decideFirst,
    hasTie,
    hasWinner,
    humanChooseColor,
} from "./GameFunctions";
import GameOver from "./GameOver";
import Player from "./Player";
import Scoreboard from "./Scoreboard";
import styles from "./css/game.module.css";

export default function Game() {
    function reducer(active: any, action: any) {
        return {
            player: action.type,
        };
    }

    const { reload, setReload } = useContext(ReloadContext);
    const [builtGame, setBuiltGame] = useState(false);
    const [active, dispatch] = useReducer(reducer, { player: "human" });
    const [humanColorChoice, setHumanColorChoice] = useState("");

    const [human, setHuman] = useState<Player>(null as unknown as Player);
    const [bot, setBot] = useState<Player>(null as unknown as Player);
    const [board, setBoard] = useState<Board>(null as unknown as Board);

    function playerOneGetColor() {
        return human.getColor();
    }

    function playerTwoGetColor() {
        return bot.getColor();
    }

    function setHumanPromise(human: Player) {
        return new Promise<void>((resolve) => {
            setHuman(human);
            resolve();
        });
    }

    function setBotPromise(bot: Player) {
        return new Promise<void>((resolve) => {
            setBot(bot);
            resolve();
        });
    }

    const initializeGame = async () => {
        const newBoard = new Board();
        setBoard(newBoard);

        let humanColor = newBoard.getHumanColor();
        let botColor = newBoard.getBotColor();

        let opening = await decideFirst();
        let players = await createPlayers(opening, humanColor, botColor);

        await setHumanPromise(players[0]);
        await setBotPromise(players[1]);

        setReload(false);
        setBuiltGame(true);

        dispatch({ type: "human" });
    };

    const humanTurn = async () => {
        await humanChooseColor(
            human,
            humanColorChoice,
            bot,
            board,
            dispatch,
            setHumanColorChoice
        );
        checkForWinner([human, bot]);
        checkForTie([human, bot]);
    };

    const botTurn = async () => {
        await botChooseColor(board.getColors(), board, bot, human, dispatch);
        checkForWinner([human, bot]);
        checkForTie([human, bot]);
    };

    const handleGameTurn = async () => {
        if (!hasWinner && !hasTie) {
            if (active.player === "human") {
                await humanTurn();
            } else if (active.player === "bot") {
                await botTurn();
            }
        }
    };

    useEffect(() => {
        const build = async () => {
            if (!builtGame) await initializeGame();
        };
        build();
    }, [builtGame]);

    useEffect(() => {
        const play = async () => {
            if (builtGame) await handleGameTurn();
        };
        play();
    }, [humanColorChoice]);

    return (
        <div className={styles.board_score}>
            {reload || human === null || bot === null ? (
                <div style={{ color: "black", marginTop: "10vh" }}>
                    <h1>generating game...</h1>
                </div>
            ) : (
                <>
                    {hasWinner || hasTie ? (
                        <GameOver
                            humanScore={human.getScore()}
                            botScore={bot.getScore()}
                        />
                    ) : (
                        <>
                            <div
                                className={styles.board}
                                style={{
                                    opacity:
                                        active.player === "human"
                                            ? "100%"
                                            : "20%",
                                }}
                            >
                                {board.getView()}
                                <div style={{ marginTop: "5%" }}>
                                    <ColorBar
                                        playerOneGetColor={playerOneGetColor}
                                        playerTwoGetColor={playerTwoGetColor}
                                        playerOneSetColor={setHumanColorChoice}
                                    />
                                </div>
                            </div>

                            <div className={styles.bottom}>
                                <Scoreboard
                                    player="Human"
                                    score={human.getScore()}
                                />
                                <Scoreboard
                                    player="Bot"
                                    score={bot.getScore()}
                                />
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
