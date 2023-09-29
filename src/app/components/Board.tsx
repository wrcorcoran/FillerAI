import React, { useEffect } from "react";
import Cell from "./Cell";
import styles from "./css/board.module.css";

export default function Board() {
    let colors = [
        "#d9c027",
        "#3f97d1",
        "#92b956",
        "#6a5293",
        "#d3324d",
        "#494949",
    ];
    const BOARD_WIDTH = 7;
    const BOARD_HEIGHT = 6;

    let cells: Cell[][] = [];

    for (let i = 0; i <= BOARD_HEIGHT; i++) {
        cells[i] = [];
        for (let j = 0; j <= BOARD_WIDTH; j++) {
            let tempKey = `${i}${j}`;
            let availableColors = colors.filter((color) => {
                // main cases
                if (i > 0) {
                    if (cells[i - 1][j].getColor() === color) {
                        return false;
                    }
                }
                if (j > 0) {
                    if (cells[i][j - 1].getColor() === color) {
                        return false;
                    }
                }

                // edge cases
                if (i === 1 && j === 7) {
                    if (cells[i - 1][j - 1].getColor() === color) {
                        return false;
                    }
                }

                if (i === 6 && j === 1) {
                    if (cells[i - 1][j - 1].getColor() === color) {
                        return false;
                    }
                }

                if (i === 6 && j === 0) {
                    if (cells[0][7].getColor() === color) {
                        return false;
                    }
                }

                return true;
            });

            let tempColor = availableColors[
                Math.floor(Math.random() * availableColors.length)
            ];

            cells[i][j] = new Cell({
                location: tempKey,
                color: tempColor,
                captured: i === 6 && j === 0 ? true : false,
            });

            // if (i === 0 && j === 7) {
            //     playerTwoSetColor(tempColor);
            // }

            // if (i === 6 && j === 0) {
            //     playerOneSetColor(tempColor);
            // }
        }
    }

    // useEffect(() => {
    //     fillBoard();
    //     // playerOneSetColor(cells[0][7]?.getColor());
    //     // playerTwoSetColor(cells[6][0]?.getColor());
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <div className={styles.board}>
            {cells.map((row, rowIndex) => (
                <div
                    key={rowIndex.toString()}
                    style={{ display: "flex", flexDirection: "row" }}
                >
                    {row.map((cell, cellIndex) => (
                        <div key={cellIndex.toString()}>{cell.getView()}</div>
                    ))}
                </div>
            ))}
        </div>
    );
}
