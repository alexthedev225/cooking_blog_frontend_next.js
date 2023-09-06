import Link from "next/link";
import styles from "@/styles/Button.module.css";

function EditArticleButton({ articleId, margin }) {
  return (
    <Link href={`/blog/${articleId}/update`}>
      <button className={styles["button"]} style={{ margin: margin }}>
        Modifier l&apos;article
      </button>
    </Link>
  );
}

export default EditArticleButton;
