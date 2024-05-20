import React from "react";

import styles from "./ConfirmationDialog.module.css";

export interface ConfirmationDialogProps {
  prompt?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationDialog(props: ConfirmationDialogProps) {
  return (
    <dialog open={true}>
      <p>{props.prompt}</p>
      <button className={styles.cancelButton} onClick={props.onCancel}>
        No
      </button>
      <button className={styles.confirmButton} onClick={props.onConfirm}>
        Yes
      </button>
    </dialog>
  );
}
