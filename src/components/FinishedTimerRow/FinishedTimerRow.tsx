import React from "react";

import styles from "./FinishedTimerRow.module.css";
import { Runner } from "../../runner";
import { getDate, toTimeString } from "../../time-utils";

export interface FinishedTimerRowProps {
  runner: Runner;
}

export function FinishedTimerRow(props: FinishedTimerRowProps) {
  const elapsed = props.runner.endTime - props.runner.startTime;
  return (
    <div key={props.runner.name} className={styles.FinishedTimerRow}>
      <span>{props.runner.name}</span>
      {/* <span>{toTimeString(getDate(props.runner.startTime))}</span> */}
      <span>{toTimeString(getDate(elapsed))}</span>

      {/* <button onClick={() => props.stop(elapsed)}>Stop</button> */}
    </div>
  );
}
