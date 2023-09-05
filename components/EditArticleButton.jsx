import Link from "next/link";
import styles from '@/styles/Button.module.css'

function EditArticleButton({ articleId }) {
  return (
    <Link href={`/blog/${articleId}/update`}>
      <button className={styles['link-button']}>Modifier l&apos;article</button>
    </Link>
  );
}

export default EditArticleButton;
