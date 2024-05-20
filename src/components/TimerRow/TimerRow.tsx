import React, { useEffect, useState } from "react";

import styles from "./TimerRow.module.css";
import { Runner } from "../../runner";
import { getDate, toTimeString } from "../../time-utils";

export interface TimerRowProps {
  runner: Runner;
  stop?: (runner: Runner) => void;
  resume?: (runner: Runner) => void;
}

export function TimerRow(props: TimerRowProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(props.runner.getElapsed());
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [props.runner.startTime, props.runner.endTime]);

  return (
    <div key={props.runner.name} className={styles.timerRow}>
      <span>{props.runner.name}</span>
      {props.stop && (
        <button
          className={styles.stopButton + " material-symbols-outlined"}
          onClick={() => props.stop && props.stop(props.runner)}
        >
          stop_circle
        </button>
      )}
      {props.resume && (
        <button
          className={styles.resumeButton + " material-symbols-outlined"}
          onClick={() => props.resume && props.resume(props.runner)}
        >
          resume
        </button>
      )}
      <span className={styles.timer}>{toTimeString(getDate(elapsed))}</span>
    </div>
  );
}
