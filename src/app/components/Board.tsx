import Cell, { CellProps } from "./Cell";
import Player from "./Player";
import styles from "./css/board.module.css";

class Board {
    board: Cell[][] = [];

    BOARD_WIDTH = 7;
    BOARD_HEIGHT = 6;
    COLORS = ["#d9c027", "#3f97d1", "#92b956", "#6a5293", "#d3324d", "#494949"];

    constructor() {
        this.board = this.createBoard();
    }

    createBoard() {
        let cells: Cell[][] = [];

        for (let i = 0; i <= this.BOARD_HEIGHT; i++) {
            cells[i] = [];
            for (let j = 0; j <= this.BOARD_WIDTH; j++) {
                let tempKey = `${i}${j}`;
                let availableColors = this.COLORS.filter((color) => {
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

                let tempColor =
                    availableColors[
                        Math.floor(Math.random() * availableColors.length)
                    ];

                cells[i][j] = new Cell({
                    location: tempKey,
                    color: tempColor,
                    captured:
                        (i === 6 && j === 0) || (i === 0 && j === 7)
                            ? true
                            : false,
                    capturedBy:
                        (i === 6 && j === 0) || (i === 0 && j === 7)
                            ? i === 6
                                ? "human"
                                : "bot"
                            : undefined,
                });
            }
        }

        return cells;
    }

    cloneBoard(): Board {
        const clonedBoard = new Board();

        // Clone each cell in the board
        for (let i = 0; i <= this.BOARD_HEIGHT; i++) {
            for (let j = 0; j <= this.BOARD_WIDTH; j++) {
                const originalCell = this.board[i][j];
                const clonedCell = new Cell({
                    location: originalCell.location,
                    color: originalCell.getColor(),
                    captured: originalCell.getCaptured(),
                    capturedBy: originalCell.getCapturedBy(),
                });

                clonedBoard.board[i][j] = clonedCell;
            }
        }

        // console.log(clonedBoard)

        return clonedBoard;
    }

    async changeCells(
        cellProps: CellProps[],
        playerMap: Player["personalMap"],
        color: any
    ) {
        return new Promise<void>(async (resolve, reject) => {
            let tempColor = color;
            cellProps.forEach((cell) => {
                this.board[Number(cell.location[0])][
                    Number(cell.location[1])
                ].setCaptured(cell.captured as boolean);
                this.board[Number(cell.location[0])][
                    Number(cell.location[1])
                ].setCapturedBy(cell.capturedBy as string);
            });

            for (let i = 0; i < 7; i++) {
                for (let j = 0; j < 8; j++) {
                    if (playerMap[i][j]) this.board[i][j].setColor(tempColor);
                }
            }

            resolve();
        });
    }

    getHumanColor() {
        return this.board[6][0].getColor();
    }

    getBotColor() {
        return this.board[0][7].getColor();
    }

    getJSON() {
        let boardJSON: {
            [rowIndex: number]: {
                [colIndex: number]: {
                    location: string;
                    color: string;
                    captured: string | undefined;
                    capturedBy: string | undefined;
                };
            }[];
        }[] = [];
        let rowIndex = 0;

        this.board.forEach((row) => {
            let tempRow: {
                [colIndex: number]: {
                    location: string;
                    color: string;
                    captured: string | undefined;
                    capturedBy: string | undefined;
                };
            }[] = [];

            let colCount = 0;

            row.forEach((cell) => {
                tempRow.push({ [colCount]: cell.getJSON() });
                colCount++;
            });
            boardJSON.push({ [rowIndex]: tempRow });
            rowIndex++;
        });

        return { board: boardJSON };
    }

    getColors() {
        return this.COLORS;
    }

    getView() {
        return (
            <div className={styles.board}>
                {this.board.map((row, rowIndex) => (
                    <div
                        key={rowIndex.toString()}
                        style={{ display: "flex", flexDirection: "row" }}
                    >
                        {row.map((cell, cellIndex) => (
                            <div key={cellIndex.toString()}>
                                {cell.getView()}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}

export default Board;
