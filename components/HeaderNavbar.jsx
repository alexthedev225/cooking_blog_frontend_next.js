"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/HeaderLayout.module.css";
import { usePathname } from "next/navigation";
import HeaderLogo from "./HeaderLogo";


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
          <Image src={"/username.png"} height={32} width={32} alt="connexion" />
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
            <Image src="/facebook.png" alt="facebook" width={24} height={24} />
          </a>
          <a href="#">
            <Image src="/pinterest.png" alt="pinterest" width={24} height={24} />
          </a>
          <a href="#">
            <Image src="/twitter.png" alt="twitter" width={24} height={24} />
          </a>
          <a href="#">
            <Image src="/instagram.png" alt="instagram" width={24} height={24} />
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
          <Image src={"/username.png"} height={32} width={32} alt="connexion" />
          <p>Connexion</p>
        </Link>
        <div className={styles["social-link-container"]}>
          <a href="#">
            <Image src="/facebook.png" alt="facebook" height={24} width={24} />
          </a>
          <a href="#">
            <Image src="/pinterest.png" alt="pinterest" height={24} width={24} />
          </a>
          <a href="#">
            <Image src="/twitter.png" alt="twitter" height={24} width={24} />
          </a>
          <a href="#">
            <Image src="/instagram.png" alt="instagram" height={24} width={24} />
          </a>
        </div>
      </div>
    </nav>
  );
}
