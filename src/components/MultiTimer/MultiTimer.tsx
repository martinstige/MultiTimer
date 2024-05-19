import React from "react";

import styles from "./MultiTimer.module.scss";
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
    <>
      <button onClick={onStart}>Start</button>
      <button onClick={onStop}>Stop</button>
      <hr />
      {runners
        .filter((r) => r.isRunning())
        .sort((a, b) => b.startTime - a.startTime)
        .map((runner) => (
          <TimerRow runner={runner} />
        ))}
      <hr />
      {runners
        .filter((r) => r.isEnded())
        .sort((a, b) => b.startTime - a.startTime)
        .map((runner) => (
          <FinishedTimerRow runner={runner} />
        ))}
      <hr />
      <button onClick={onReset}>Reset</button>
    </>
  );
}
