import React from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import styles from "@/styles/Button.module.css";

export default function CreateArticleButton() {
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.has("token");

  return (
    isAuthenticated && (
      <Link href={"/blog/create"} className={styles["button-link-container"]}>
        Ajouter un article
      </Link>
    )
  );
}
