import React from "react";
import Link from "next/link";
import styles from "@/styles/Button.module.css";

export default function NavigateToHomeButton() {
  return (
    <Link href={"/"}>
      <button
       className={styles['link-button']}
      >
        Retour a la page d&apos;accueil
      </button>
    </Link>
  );
}
