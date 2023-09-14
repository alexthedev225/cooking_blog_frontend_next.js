"use client";
import React from "react";
import styles from "@/styles/LayoutLoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles["spinner-container"]}>
      <div className={styles['loader']}></div>
    </div>
  );
}
