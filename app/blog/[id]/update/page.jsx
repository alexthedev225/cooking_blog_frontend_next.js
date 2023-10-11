"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import styles from "@/styles/UpdateArticle.module.css";

export default function Page({ params }) {
  const [cookies] = useCookies(["token", "userId"]);
  const [article, setArticle] = useState({
    title: "",
    content: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null); // State pour stocker le fichier image

  const router = useRouter();

  const articleId = params.id;

  useEffect(() => {
    const getArticleDetails = async () => {
      try {
        const response = await fetch(
          `https://cooking-blog-backend-express-js.onrender.com/api/articles/${articleId}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Article non trouvé");
        }

        const articleData = await response.json();
        setArticle(articleData);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'article", error);
      }
    };

    getArticleDetails();
  }, [articleId]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(); // Créez un objet FormData pour envoyer le fichier image

      formData.append("title", article.title);
      formData.append("content", article.content);

      if (imageFile) {
        formData.append("image", imageFile); // Ajoutez le fichier image au FormData s'il a été sélectionné
      }

      const response = await fetch(
        `https://cooking-blog-backend-express-js.onrender.com/api/articles/${articleId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`, // Ajout du jeton d'authentification
          },
          method: "PUT",
          body: formData, // Utilisez FormData comme corps de la requête
        }
      );

      if (!response.ok) {
        throw new Error("La mise à jour a échoué");
      }

      router.push(`/blog/${articleId}`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'article", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setArticle({
      ...article,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file); // Stockez le fichier image dans le state
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Modifier l&apos;article</h1>
      <form onSubmit={handleUpdate} className={styles.form}>
        <div className={styles.formField}>
          <label htmlFor="title" className={styles.label}>
            Titre
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={article.title}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="content" className={styles.label}>
            Contenu
          </label>
          <textarea
            id="content"
            name="content"
            value={article.content}
            onChange={handleInputChange}
            className={styles.textarea}
          />
        </div>
        <div className={styles.formField}>
        <label htmlFor="content" className={styles.label}>
            Image
          </label>
            <input
              type="file"
              accept="image/*" // N'acceptez que les fichiers image
              id="image"
              name="image"
              onChange={handleImageChange}
              className={styles.fileInput}
            />
        </div>

        <button type="submit" className={styles.button}>
          Mettre à jour
        </button>
      </form>
    </div>
  );
}
