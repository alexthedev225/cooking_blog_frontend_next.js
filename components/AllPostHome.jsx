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
  const blogPostHome = await data.json();

  return blogPostHome;
}

export default async function GetAllPostHome() {
  const blogPostHome = await getBlogPost();
  console.log(blogPostHome)
  return (
    <ul className={`${styles["articles-items-container"]} ${ubuntu.className}`}>
      {blogPostHome &&
        blogPostHome.map((post) => (
          <Link href={`/blog/${post._id}`} key={post._id}>
            <li key={post._id}>
              {post.image && (
                <img
                  src={`data:image/jpeg;base64,${post.image}`} // Utilisez le bon format (jpeg, png, etc.)
                  alt={post.title}
                  style={{
                    objectFit: "cover",
                  }}
                  height={"auto"}
                  width={450}
                />
              )}
              <div className={styles["post-container"]}>
                <div className={styles["post-content"]}>
                  <div className={styles["author-info"]}>
                    {post.author?.imageProfil && (
                      <img
                        src={`data:image/jpeg;base64,${post.author.imageProfil}`} // Utilisez le bon format (jpeg, png, etc.)
                        height={50}
                        width={50}
                        style={{
                          borderRadius: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                          border: "2px solid rgba(240, 46, 170, 0.6)",
                        }}
                        alt={post.author?.name}
                      />
                    )}
                    <div>
                      <h4>{post.author?.name}</h4>
                      <p>
                        {new Date(post.createdAt).toLocaleDateString("fr-FR", {
                          timeZone: "Africa/Abidjan",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className={styles["post-details"]}>
                    <h2>{post.title}</h2>
                    <p>{post.subTitle}</p>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        ))}
    </ul>
  );
}
