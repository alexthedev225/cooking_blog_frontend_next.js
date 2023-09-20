"use client";
import React from "react";
import styles from "@/styles/LayoutLoadingSpinner.module.css";

export default function LoadingSpinner({height}) {
  return (
    <div className={styles["spinner-container"]} style={{height: height}}>
      <div className={styles['loader']}></div>
    </div>
  );
}
