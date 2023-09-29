import React from "react";
import styles from "./css/cell.module.css";

interface CellProps {
  location: string;
  color: string;
  captured?: boolean;
}

class Cell {
  location: string;
  color: string;
  captured?: boolean;
  constructor(props: CellProps) {
    this.location = props.location;
    this.color = props.color;
    this.captured = props.captured;
  }

  getColor() {
    return this.color;
  }

  setColor(color: string) {
    this.color = color;
  }

  setCaptured(captured: boolean) {
    this.captured = captured;
  }

  getView() {
    return (
      <div>
        <div
          className={
            this.captured ? styles.cellCaptured : styles.cellNonCaptured
          }
          style={{ backgroundColor: this.color }}
        >
          <h2>{this.captured}</h2>
        </div>
      </div>
    );
  }
}

export default Cell;
