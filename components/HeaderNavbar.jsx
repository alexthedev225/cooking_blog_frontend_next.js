"use client"
import Link from "next/link";
import React from "react";
import styles from "@/styles/HeaderLayout.module.css";
import { useRouter, usePathname } from "next/navigation";
import { Lora } from "next/font/google";
import Image from "next/image";


const lora = Lora({
  weight: "700",
  subsets: ["latin"],
});

export default function HeaderNavbar() {
  const pathname = usePathname()

  return (
    <nav className={styles["header-navbar-container"]}>
      <ul className={styles["navbar-links-container"]}>
        <li>
          <Link
            href={"/"}
            className={`${pathname === "/" ? styles.activeLink : ""}`}
          >
            accueil
          </Link>
        </li>
        <li>
          <Link
            href={"/blog"}
            className={`${
              pathname === "/blog" ? styles.activeLink : ""
            }`}
          >
            blog
          </Link>
        </li>
        <li>
          <Link
            href={"/about"}
            className={`${
              pathname === "/a-propos" ? styles.activeLink : ""
            }`}
          >
            à propos
          </Link>
        </li>
      </ul>
      <Link href={"/"} className={styles["navbar-logo-container"]}>
        <p className={lora.className}>delices & saveurs</p>
      </Link>
      <div className={styles["navbar-auth-and-social-container"]}>
        <Link href={"/auth/sign-in"} className={styles["auth-button-container"]}>
          <Image src={"/user.png"} height={32} width={32} alt="connexion" />
          <p>Connexion</p>
        </Link>
        <div className={styles["social-link-container"]}>
          <a href="#">
            <Image src="/facebook.png" alt="facebook" height={21} width={21} />
          </a>
          <a href="#">
            <Image src="/pinterest.png" alt="pinterest" height={21} width={21}/>
          </a>
          <a href="#">
            <Image src="/twitter.png" alt="twitter" height={21} width={21}/>
          </a>
          <a href="#">
            <Image src="/instagram.png" alt="instagram"  height={21} width={21}/>
          </a>
        </div>
      </div>
    </nav>
  );
}
