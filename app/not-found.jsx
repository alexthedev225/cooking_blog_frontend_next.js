import Link from "next/link";
import styles from "@/styles/NotFound.module.css"; // Importez le module CSS pour styliser la page

export default function NotFound() {
  return (
    <div className={styles["not-found-container"]}>
      <h2 className={styles["not-found-title"]}>404 - Page non trouvée</h2>
      <p className={styles["not-found-message"]}>
        Désolé, la page que vous recherchez n&apos;a pas été trouvée.
      </p>
      <Link href="/" className={styles["return-home-link"]}>
        Retourner à la page d&apos;accueil
      </Link>
    </div>
  );
}
