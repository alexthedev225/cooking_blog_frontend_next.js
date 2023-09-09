import React from "react";
import Link from "next/link";
import styles from "@/styles/Button.module.css";

export default function NavigateToHomeButton() {
  return (
    <Link href={"/"} className={styles["button-link-container"]}>
      <button
        className={styles["button"]}
        style={{
          margin: 0,
        }}
      >
        Retour a la page d&apos;accueil
      </button>
    </Link>
  );
}
