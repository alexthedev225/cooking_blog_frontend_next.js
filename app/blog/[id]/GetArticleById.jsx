import CommentInput from "@/components/CreateComment";
import DeleteArticleButton from "@/components/DeleteArticleButton";
import EditArticleButton from "@/components/EditArticleButton";
import styles from "@/styles/ArticleById.module.css";

async function getArticleById(id) {
  const response = await fetch(
    `https://cooking-blog-backend-express-js.onrender.com/api/articles/${id}`,
    {
      cache: 'no-store'
    }
  );
  const article = await response.json();
  return article;
}

export default async function ArticleById({ params }) {
  // Utilisez params.id pour accéder à l'ID de l'utilisateur depuis l'URL
  const articleId = params.id;

  function getBase64Image(imageData) {
    const binaryData = Buffer.from(imageData);
    const base64String = binaryData.toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  }
  const article = await getArticleById(articleId);

  // Organisez les données d'image dans un tableau
  const {
    image,
    author: { imageProfil },
  } = article;
  const images = [
    image.data,
    imageProfil.data /* Ajoutez d'autres images si nécessaire */,
  ];

  // Utilisez une boucle pour générer les URL d'image
  const imageSrcArray = images.map((imageData) => getBase64Image(imageData));

  return (
    <>
      <div className={`${styles["article-container"]} `}>
        <div key={article._id} className={styles["article-details"]}>
          <div className={styles["author-details"]}>
            {/* Image de profil de l'auteur */}
            {imageSrcArray[1] && (
              <img
                src={imageSrcArray[1]}
                alt={article.author?.name}
                className={styles["author-avatar"]}
              />
            )}
            <div className={styles["article-info"]}>
              <p className={styles["author-name"]}>{article.author?.name}</p>
              <span></span>
              <p className={styles["article-date"]}>
                {new Date(article.createdAt).toLocaleDateString("fr-FR", {
                  timeZone: "Africa/Abidjan",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <h2 className={styles["article-title"]}>{article.title}</h2>
          <h3 className={styles["article-subtitle"]}>{article.subTitle}</h3>
          {/* Image principale de l'article */}
          {imageSrcArray[0] && (
            <img
              src={imageSrcArray[0]}
              alt={article.title}
              className={styles["article-image"]}
            />
          )}
          <p className={styles["article-content"]}>{article.content}</p>
        </div>
      </div>
      <CommentInput articleId={articleId} />
      <div className={styles["article-actions"]}>
        <EditArticleButton articleId={articleId} margin={"0 0 2rem 0"} />
        <DeleteArticleButton articleId={articleId} margin={"0 0 2rem 0"} />
      </div>
    </>
  );
}
