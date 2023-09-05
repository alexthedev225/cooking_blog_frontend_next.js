import React from "react";
import Link from "next/link";
import styles from "@/styles/Button.module.css";

export default function NavigateToAllPostsButton() {
  return (
    <Link href={"/blog"}>
      <button className={styles["link-button"]}>Tous les posts</button>
    </Link>
  );
}
