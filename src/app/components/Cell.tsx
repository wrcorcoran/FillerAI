import React from "react";
import styles from "./css/cell.module.css";

// props struct
interface CellProps {
    location: string;
    color: string;
    captured?: boolean;
    capturedBy?: string;
}

// cell class
class Cell {
    location: string;
    color: string;
    captured?: boolean;
    capturedBy?: string;
    constructor(props: CellProps) {
        this.location = props.location;
        this.color = props.color;
        this.captured = props.captured;
        this.capturedBy = props.capturedBy;
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

    setCapturedBy(capturedBy: string) {
        this.capturedBy = capturedBy;
    }

    getCaptured() {
        return this.captured;
    }

    getCapturedBy() {
        return this.capturedBy;
    }

    getJSON() {
        return {
            location: this.location,
            color: this.color,
            captured: (this.captured)?.toString(),
            capturedBy: this.capturedBy,
        };
    }

    getView() {
        return (
            <div>
                <div
                    className={
                        this.captured
                            ? this.capturedBy === "human"
                                ? styles.cellCaptured
                                : styles.cellCapturedBot
                            : styles.cellNonCaptured
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
export type { CellProps };
