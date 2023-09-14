import Link from "next/link";
import styles from "@/styles/Button.module.css";

function EditArticleButton({ articleId, margin }) {
  return (
    <Link
      href={`/blog/${articleId}/update`}
      className={styles["button-link-container"]}
      style={{ margin: margin }}
    >
        Modifier l&apos;article
    </Link>
  );
}

export default EditArticleButton;
