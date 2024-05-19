import React, { useEffect, useState } from "react";

import styles from "./TimerRow.module.css";
import { Runner } from "../../runner";
import { getDate, toTimeString } from "../../time-utils";

export interface TimerRowProps {
  runner: Runner;
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
  }, [props.runner.startTime]);

  return (
    <div key={props.runner.name} className={styles.TimerRow}>
      <span>{props.runner.name}</span>
      <span>{toTimeString(getDate(elapsed))}</span>
    </div>
  );
}
