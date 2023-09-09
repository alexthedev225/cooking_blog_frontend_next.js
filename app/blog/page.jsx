import React from "react";
import { Lora, Ubuntu } from "next/font/google";
import styles from "@/styles/Article.module.css";
import axios from "axios";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});

async function getBlogPost() {
  const data = await fetch(
    "https://cooking-blog-backend-express-js.onrender.com/api/articles",
    {
      cache: "no-store",
    }
  );
  const blogPost = await data.json();
  return blogPost;
}

export default async function GetAllPost() {
  const blogPost = await getBlogPost();
  return (
    <div className={styles["articles-container"]}>
      <ul
        className={`${styles["articles-items-container"]} ${ubuntu.className}`}
      >
        {blogPost &&
          blogPost.map((post) => (
            <li key={post._id}>
              <h1>{post.title}</h1>
              <br />
              <h2>{post.subTitle}</h2>
              <br />
              <p>{post.content}</p>
              <div className={styles["author-container"]}>
                <h3>Publié par : {post.author?.name}</h3>
                {/* Convertir les données binaires en URL */}
                {post.author?.imageProfil && (
                  <img
                    src={`data:image/jpeg;base64,${post.author.imageProfil}`} // Utilisez le bon format (jpeg, png, etc.)
                    height={100}
                    width={100}
                    style={{
                      borderRadius: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      border: "2px solid rgba(240, 46, 170, 0.6)",
                    }}
                    alt={post.author?.name}
                  />
                )}
              </div>
              {/* Convertir les données binaires en URL */}
              {post.image && (
                <img
                  src={`data:image/jpeg;base64,${post.image}`} // Utilisez le bon format (jpeg, png, etc.)
                  alt={post.title}
                  style={{ border: "2px solid rgba(240, 46, 170, 0.6)" }}
                  height={600}
                  width={700}
                />
              )}
              {/* <p>{post.comments.content}</p> */}
            </li>
          ))}
      </ul>
    </div>
  );
}
