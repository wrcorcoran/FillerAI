import styles from "./page.module.css";
import Board from "./components/Board";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>FillerAI</h1>
      <div className={styles.board}>
        <Board />
      </div>
    </main>
  );
}
