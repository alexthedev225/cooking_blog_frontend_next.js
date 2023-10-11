import React from "react";
import Link from "next/link";
import styles from "@/styles/Button.module.css";

export default function NavigateToHomeButton() {
  return (
    <Link href={"/"} className={styles["button-link-container"]}  style={{
      margin: 0,
    }}>
        Retour a la page d&apos;accueil
    </Link>
  );
}
