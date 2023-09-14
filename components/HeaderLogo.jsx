import Link from "next/link";
import styles1 from "@/styles/Header.module.css";
import styles2 from "@/styles/HeaderLayout.module.css";

export default function HeaderLogo() {
  return (
    <Link
      href={"/"}
      className={`${styles1["navbar-logo-container"]} ${styles2["navbar-logo-container"]}`}
    >
      <p>POIVRE ET SEL</p>
    </Link>
  );
}
