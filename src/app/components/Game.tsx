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
    hasTie,
} from "./GameFunctions";
import { use, useCallback, useContext, useEffect, useState } from "react";
import { ReloadContext } from "../contexts/ReloadContext";

export default function Game() {
    const { reload, setReload } = useContext(ReloadContext);
    const [builtGame, setBuiltGame] = useState(false);

    const [human, setHuman] = useState<Player>(null as unknown as Player);
    const [bot, setBot] = useState<Player>(null as unknown as Player);
    const [board, setBoard] = useState<Board>(null as unknown as Board);

    async function playerOneSetColor(color: string) {
        await humanChooseColor(human, color, bot, board, setReload);
        setReload(false);
    }

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

    const beginGame = useCallback(async () => {
        const newBoard = new Board();
        setBoard(newBoard);
    }, [setBoard]);

    useEffect(() => {
        if (!builtGame) beginGame();
    }, [builtGame, beginGame]);

    useEffect(() => {
        const playGame = async () => {
            console.log("playing");
            console.log(reload);

            if (hasWinner || hasTie) {
                return;
            }

            if (bot.getActive()) {
                await botChooseColor(board.COLORS, board, bot, human);
                setReload(true);
                setReload(false);
            }
        };

        const setUp = async () => {
            if (board) {
                let humanColor = board.getHumanColor();
                let botColor = board.getBotColor();

                let opening = await decideFirst();
                let players = await createPlayers(opening, humanColor, botColor);

                await setHumanPromise(players[0]);
                await setBotPromise(players[1]);
                setReload(false);
                setBuiltGame(true);

                if (bot && human) playGame();
            }
        };

        setUp();
    }, [board, setReload, setBuiltGame]);

    return (
        <div className={styles.board_score}>
            {reload || human === null || bot === null ? (
                <h1>generating game...</h1>
            ) : (
                <>
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
                </>
            )}
        </div>
    );
}
