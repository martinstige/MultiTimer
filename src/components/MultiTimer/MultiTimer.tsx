import React from "react";

import styles from "./MultiTimer.module.css";
import { Runner } from "../../runner";
import { TimerRow } from "../TimerRow/TimerRow";
import { ConfirmationDialog } from "../ConfirmationDialog";

export interface MultiTimerProps {}

export function MultiTimer(props: MultiTimerProps) {
  const [runners, setRunners] = React.useState<Runner[]>([]);
  const [counter, setCounter] = React.useState(0);
  const [resetConfirmationOpen, setResetConfirmationOpen] =
    React.useState(false);
  const onStart = () => {
    setRunners([new Runner(`#${counter}`, Date.now(), 0), ...runners]);
    setCounter(counter + 1);
  };

  const onStop = () => {
    const oldestActiveRunner = runners
      .filter((r) => r.isRunning())
      .reduce((prevRunner, currRunner) => {
        return currRunner.startTime < prevRunner.startTime
          ? currRunner
          : prevRunner;
      });
    stopSelected(oldestActiveRunner);
  };

  const stopSelected = (runner: Runner) => {
    updateRunner(runner.stop());
  };

  const resumeSelected = (runner: Runner) => {
    updateRunner(runner.resume());
  };

  const updateRunner = (runner: Runner) => {
    const updatedRunners = [
      ...runners.filter((r) => r.name !== runner.name),
      runner,
    ];
    setRunners(updatedRunners);
  };

  const onReset = () => {
    setResetConfirmationOpen(false);
    setRunners([]);
    setCounter(0);
  };

  return (
    <div className={styles.multiTimer}>
      <div className={styles.mainMenuRow}>
        <button
          className={styles.resetButton}
          onClick={() => setResetConfirmationOpen(true)}
        >
          Reset
        </button>
      </div>

      <div className={styles.timersSection}>
        <div className={styles.runningTimers}>
          {runners
            .filter((r) => r.isRunning())
            .sort((a, b) => b.startTime - a.startTime)
            .map((runner) => (
              <TimerRow runner={runner} stop={stopSelected} />
            ))}
        </div>

        <div className={styles.finishedTimers}>
          {runners
            .filter((r) => r.isEnded())
            .sort((a, b) => b.startTime - a.startTime)
            .map((runner) => (
              <TimerRow runner={runner} resume={resumeSelected} />
            ))}
        </div>
      </div>

      <div className={styles.timerButtonRow}>
        <button
          className={styles.playButton + " material-symbols-outlined"}
          onClick={onStart}
        >
          play_circle
        </button>
        <button
          className={styles.stopButton + " material-symbols-outlined"}
          onClick={onStop}
          disabled={!runners.some((r) => r.isRunning())}
        >
          stop_circle
        </button>
      </div>
      {resetConfirmationOpen && (
        <ConfirmationDialog
          prompt="Are you sure you want to reset all timers?"
          onConfirm={onReset}
          onCancel={() => setResetConfirmationOpen(false)}
        />
      )}
    </div>
  );
}
