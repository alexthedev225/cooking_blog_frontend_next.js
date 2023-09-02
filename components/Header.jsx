"use client"
import React from "react";
import { usePathname } from 'next/navigation';
import HeaderImage from "./HeaderImage";
import HeaderNavbar from "./HeaderNavbar";
import styles from "@/styles/HeaderLayout.module.css"

export default function Header() {
  const pathname = usePathname();
  if (pathname === '/auth/sign-in' || pathname === '/auth/sign-up') {
    return null;
  }
  return (
    <div className={styles['header-container']}>
      <HeaderNavbar />
      <HeaderImage />
    </div>
  );
}
