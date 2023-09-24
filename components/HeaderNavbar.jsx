"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "@/styles/HeaderLayout.module.css";
import { useRouter, usePathname } from "next/navigation";
import { Lora } from "next/font/google";
import HeaderLogo from "./HeaderLogo";

const lora = Lora({
  weight: "700",
  subsets: ["latin"],
});

export default function HeaderNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Gère la fermeture du menu lorsque vous cliquez sur un lien
  const handleLinkClick = () => {
    closeMenu();
  };

  return (
    <nav className={`${styles["header-navbar-container"]} `}>
      <button
        className={`${styles["burger-button"]} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul
        className={`${styles["navbar-links-container"]} ${
          isOpen ? styles.open : ""
        }`}
      >
        <Link
          href={"/auth/sign-in"}
          className={styles["auth-button-container"]}
          onClick={handleLinkClick}
        >
          <img src={"/username.png"} height={32} width={32} alt="connexion" />
          <p>Connexion</p>
        </Link>
        <li>
          <Link
            href={"/"}
            className={`${pathname === "/" ? styles.activeLink : ""}`}
            onClick={handleLinkClick}
          >
            accueil
          </Link>
        </li>
        <li>
          <Link
            href={"/blog"}
            className={`${pathname === "/blog" ? styles.activeLink : ""}`}
            onClick={handleLinkClick}
          >
            blog
          </Link>
        </li>
        <li>
          <Link
            href={"/about"}
            className={`${pathname === "/a-propos" ? styles.activeLink : ""}`}
            onClick={handleLinkClick}
          >
            à propos
          </Link>
        </li>
        <div className={styles["social-link-container"]}>
          <a href="#">
            <img src="/facebook.png" alt="facebook" />
          </a>
          <a href="#">
            <img src="/pinterest.png" alt="pinterest" />
          </a>
          <a href="#">
            <img src="/twitter.png" alt="twitter" />
          </a>
          <a href="#">
            <img src="/instagram.png" alt="instagram" />
          </a>
        </div>
      </ul>

      <HeaderLogo />
      <div className={styles["navbar-auth-and-social-container"]}>
        <Link
          href={"/auth/sign-in"}
          className={styles["auth-button-container"]}
          onClick={handleLinkClick}
        >
          <img src={"/username.png"} height={32} width={32} alt="connexion" />
          <p>Connexion</p>
        </Link>
        <div className={styles["social-link-container"]}>
          <a href="#">
            <img src="/facebook.png" alt="facebook" />
          </a>
          <a href="#">
            <img src="/pinterest.png" alt="pinterest" />
          </a>
          <a href="#">
            <img src="/twitter.png" alt="twitter" />
          </a>
          <a href="#">
            <img src="/instagram.png" alt="instagram" />
          </a>
        </div>
      </div>
    </nav>
  );
}
