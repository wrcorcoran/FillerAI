import React from "react";
import styles from "./cell.module.css";

interface CellProps {
  location: string;
}

export default function Cell(props: CellProps) {
  const { location } = props;

  return (
    <div>
      <div className={styles.rectangle}>
        <h2>{location}</h2>
      </div>
    </div>
  );
}
