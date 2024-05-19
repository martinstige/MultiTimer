import React from "react";

import styles from "./MultiTimer.module.css";
import { Runner } from "../../runner";
import { TimerRow } from "../TimerRow/TimerRow";
import { FinishedTimerRow } from "../FinishedTimerRow";

export interface MultiTimerProps {
  prop?: string;
}

export function MultiTimer({ prop = "default value" }: MultiTimerProps) {
  const [runners, setRunners] = React.useState<Runner[]>([]);
  const [counter, setCounter] = React.useState(0);
  const onStart = () => {
    setRunners([new Runner(`#${counter}`, Date.now(), 0), ...runners]);
    setCounter(counter + 1);
  };

  const onStop = () => {
    const lastActiveRunner = runners
      .filter((r) => r.isRunning())
      .reduce((prevRunner, currRunner) => {
        return currRunner.startTime < prevRunner.startTime
          ? currRunner
          : prevRunner;
      });

    const updatedRunners = [
      ...runners.filter((r) => r.name !== lastActiveRunner.name),
      lastActiveRunner.stop(),
    ];
    setRunners(updatedRunners);
  };

  const onReset = () => {
    setRunners([]);
    setCounter(0);
  };

  return (
    <div className={styles.multiTimer}>
      <div className={styles.topButtonRow}>
        <button
          className={styles.playButton + " material-symbols-outlined"}
          onClick={onStart}
        >
          play_circle
        </button>
        <button
          className={styles.playButton + " material-symbols-outlined"}
          onClick={onStop}
          disabled={!runners.some((r) => r.isRunning())}
        >
          stop_circle
        </button>
      </div>

      <div className={styles.timersSection}>
        <div className={styles.runningTimers}>
          {runners
            .filter((r) => r.isRunning())
            .sort((a, b) => b.startTime - a.startTime)
            .map((runner) => (
              <TimerRow runner={runner} />
            ))}
        </div>

        <div className={styles.finishedTimers}>
          {runners
            .filter((r) => r.isEnded())
            .sort((a, b) => b.startTime - a.startTime)
            .map((runner) => (
              <TimerRow runner={runner} />
            ))}
        </div>
      </div>
      <div className={styles.footer}>
        <button className={styles.resetButton} onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
