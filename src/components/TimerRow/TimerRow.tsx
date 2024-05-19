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
      const now = Date.now();
      const elapsed = now - props.runner.startTime;
      setElapsed(elapsed);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div key={props.runner.name} className={styles.TimerRow}>
      
      <span>{props.runner.name}</span>
      {/* <span>{toTimeString(getDate(props.runner.startTime))}</span> */}
      <span>{toTimeString(getDate(elapsed))}</span>

      {/* <button onClick={() => props.stop(elapsed)}>Stop</button> */}
    </div>
  );
}
