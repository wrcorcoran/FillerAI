import React from "react";
import Cell from "./Cell";
import styles from "./board.module.css";

export default function Board() {
  const BOARD_WIDTH = 8;
  const BOARD_HEIGHT = 7;

  let cells: JSX.Element[][] = [];

  for (let i = 1; i <= BOARD_HEIGHT; i++) {
    cells[i] = [];
    for (let j = 1; j <= BOARD_WIDTH; j++) {
      let tempKey = `${i}${j}`;
      cells[i][j] = <Cell key={tempKey} location={tempKey} />;
    }
  }

  return (
    <div className={styles.board}>
      {cells.map((row, rowIndex) => (
        <div
          key={rowIndex.toString()}
          style={{ display: "flex", flexDirection: "row" }}
        >
          {row.map((cell, cellIndex) => (
            <div key={cellIndex.toString()}>{cell}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
