import React from "react";
import { Ubuntu } from "next/font/google";
import styles from "@/styles/Article.module.css";
import Link from "next/link";
import CreateArticleButton from "@/components/CreateArticleButton";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});

async function getBlogPost() {
  const data = await fetch(
    "https://cooking-blog-backend-express-js.onrender.com/api/articles",
  );
  const blogPost = await data.json();
  return blogPost;
}

async function getCommentByArticle(articleId) {
  const response = await fetch(
    `https://cooking-blog-backend-express-js.onrender.com/api/comments/${articleId}`,
  );
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des commentaires");
  }
  const data = await response.json();
  return data;
}

async function getCommentsForArticle(articleId) {
  const comments = await getCommentByArticle(articleId);
  return comments;
}

export default async function GetAllPost() {

  const blogPost = await getBlogPost();

  const commentsByArticle = {};

  for (const post of blogPost) {
    commentsByArticle[post._id] = await getCommentsForArticle(post._id);
  }
  return (
    <ul className={`${styles["articles-items-container"]} ${ubuntu.className}`}>
      <CreateArticleButton />
      {blogPost.map((post) => {
        const comments = commentsByArticle[post._id];

        return (
          <Link
            href={`/blog/${post._id}`}
            key={post._id}
            className={styles["articles-container"]}
          >
            <li key={post._id} className={styles["article-item"]}>
              {post.image && (
                <img
                  className={styles["article-image"]}
                  src={`data:image/jpeg;base64,${post.image}`} // Utilisez le bon format (jpeg, png, etc.)
                  height={320}
                  alt={post.title}
                />
              )}
              <div className={styles["article-container"]}>
                <div className={styles["content-group"]}>
                  <div className={styles["author-info"]}>
                    {post.author?.imageProfil && (
                      <img
                        className={styles["author-profile-image"]}
                        src={`data:image/jpeg;base64,${post.author.imageProfil}`}
                        height={20}
                        width={20}
                        alt={post.author?.name}
                      />
                    )}
                    <div className={styles["author-details"]}>
                      <p className={styles["author-name"]}>
                        {post.author?.name}
                      </p>
                      <p className={styles["article-date"]}>
                        {new Date(post.createdAt).toLocaleDateString("fr-FR", {
                          timeZone: "Africa/Abidjan",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className={styles["article-details"]}>
                    <p className={styles["article-title"]}>{post.title}</p>
                    <p className={styles["article-subtitle"]}>
                      {post.subTitle}
                    </p>
                  </div>
                </div>
                <div className={styles["content-group"]}>
                  <div className={styles["comment-info"]}>
                    <div className={styles["comment-section"]}>
                      <img
                        className={styles["comment-icon"]}
                        src="/message.png"
                        alt="commentaire icone"
                        height={20}
                        width={20}
                      />
                      <p className={styles["comment-count"]}>
                        {comments.length}
                      </p>
                      <p className={styles["comment-label"]}>Commentaires</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
}
