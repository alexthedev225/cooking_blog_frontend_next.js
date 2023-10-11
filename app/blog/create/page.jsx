"use client"
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import styles from "@/styles/CreateArticle.module.css"; // Importez le module CSS

export default function CreateArticle() {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const router = useRouter();
  const [cookies] = useCookies(["token", "userId"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append("content", content);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "https://cooking-blog-backend-express-js.onrender.com/api/articles",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      router.push("/blog");
      console.log("Article created:", response.data);
    } catch (error) {
      console.error("Error creating article:", error);
    }
  };

  return (
    <div>
      <h1 className={styles["create-article-title"]}>Créer un nouvel article</h1>
      <form onSubmit={handleSubmit}>
        <label className={styles["form-label"]}>Titre</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles["form-input"]}
        />
        <br />
        <label className={styles["form-label"]}>Sous Titre</label>
        <input
          type="text"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          className={styles["form-input"]}
        />
        <br />
        <label className={styles["form-label"]}>Contenue</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles["form-textarea"]}
        />
        <br />
        <label className={styles["form-label"]}>Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className={`${styles["form-input"]} ${styles.fileInput}`}
        />
        <br />
        <button type="submit" className={styles["form-button"]}>
          Create Article
        </button>
      </form>
    </div>
  );
}
