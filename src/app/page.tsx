"use client";
import Game from "./components/Game";
import styles from "./page.module.css";
import { IoHelpCircle } from "react-icons/io5";
import { ReloadContext, ReloadProps } from "./contexts/ReloadContext";
import { useState } from "react";

export default function Home() {
    function onHelpClick() {
        alert(
            "Rules:\n" +
                "1. You begin in the bottom left corner, and the AI begins in the top right corner.\n" +
                "2. You and the AI take turns choosing a color.\n" +
                '3. Upon choosing a color, all tiles adjacent to your position with that color will become "captured".\n' +
                "4. You cannot choose your previous color or the AI's current color.\n" +
                "5. First to capture 29 of the 56 tiles wins (scroll for more).\n\n" +
                "Acknowledgements:\n" +
                '1. This game was inspired by the game "Filler".\n' +
                '2. "Filler" was created (to my knowledge) by GamePigeon.\n' +
                "3. All other work done on this project was done by me."
        );
    }

    const [reload, setReload] = useState(true);

    const reloadValues: ReloadProps = {
        reload: reload,
        setReload: setReload,
    };

    return (
        <ReloadContext.Provider value={reloadValues}>
            <main>
                <div className={styles.iconContainer}>
                    <div className={styles.icon} onClick={onHelpClick}>
                        <IoHelpCircle color="#494949" size={37.5} />
                    </div>
                </div>
                <div className={styles.main}>
                    <div className={styles.bar}>
                        <h1 className={styles.title}>FillerAI</h1>
                    </div>
                    <div className={styles.game}>
                        <Game />;
                    </div>
                </div>
            </main>
        </ReloadContext.Provider>
    );
}
