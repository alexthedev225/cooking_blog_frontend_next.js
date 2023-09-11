"use client";
import React from "react";
import {Oval, TailSpin} from "react-loader-spinner";
import styles from "@/styles/Loading.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles["spinner-container"]}>
      <div className={styles['loader']}></div>
    </div>
  );
}
