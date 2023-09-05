import Link from "next/link";

function EditArticleButton({ articleId }) {
  return (
    <Link href={`/blog/${articleId}/update`}>
      <button
        style={{
          height: "3rem",
          width: "15rem",
          backgroundColor: "hotpink",
          color: "white",
          border: "none",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "0.5rem",
        }}
      >
        Modifier l&apos;article
      </button>
    </Link>
  );
}

export default EditArticleButton;
