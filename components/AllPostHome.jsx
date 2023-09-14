import React from "react";
import { Ubuntu } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});

async function getBlogPost() {
  const limitToFive = true;
  const data = await fetch(
    `https://cooking-blog-backend-express-js.onrender.com/api/articles?limitToFive=${limitToFive}`,
    {
      cache: "no-store",
    }
  );
  if (!data.ok) {
    throw new Error("Erreur lors de la récupération des articles");
  }
  const blogPostHome = await data.json();
  return blogPostHome;
}

async function getCommentByArticle(articleId) {
  const response = await fetch(
    `https://cooking-blog-backend-express-js.onrender.com/api/comments/${articleId}`,
    {
      cache: "no-store",
    }
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

export default async function GetAllPostHome() {
  const blogPostHome = await getBlogPost();
  const commentsByArticle = {};

  for (const post of blogPostHome) {
    commentsByArticle[post._id] = await getCommentsForArticle(post._id);
  }
  return (
    <ul className={`${styles["articles-items-container"]} ${ubuntu.className}`}>
      {blogPostHome.map((post) => {
        const comments = commentsByArticle[post._id];

        return (
          <Link href={`/blog/${post._id}`} key={post._id}>
            <li key={post._id} className={styles["article-item"]}>
              {post.image && (
                <img
                  className={styles["article-image"]}
                  src={`data:image/jpeg;base64,${post.image}`} // Utilisez le bon format (jpeg, png, etc.)
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
