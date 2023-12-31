import React from "react";
import Link from "next/link";
import styles from "@/styles/Button.module.css";

export default function NavigateToAllPostsButton() {
  return (
    <Link href={"/blog"} className={styles["button-link-container"]}>
      Tous les posts
    </Link>
  );
}
