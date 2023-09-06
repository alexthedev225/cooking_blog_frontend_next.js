import DeleteArticleButton from "@/components/DeleteArticleButton";
import EditArticleButton from "@/components/EditArticleButton";
import styles from "@/styles/Button.module.css";
import Link from "next/link";
import React from "react";

async function getArticleById(id) {
  const response = await fetch(
    `https://cooking-blog-backend-expres-js.onrender.com/api/articles/${id}`,
    {
      cache: "no-store",
    }
  );
  const article = await response.json();
  return article;
}

export default async function Page({ params }) {
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
    <ul className={`${["articles-items-container"]} `}>
      <li key={article._id}>
        <h1>{article.title}</h1>
        <br />
        <p>{article.content}</p>
        <div className={["author-container"]}>
          <h3>Publié par : {article.author?.name}</h3>
          {/* Convertir les données binaires en URL pour l'image de profil de l'auteur */}
          {imageSrcArray[1] && (
            <img
              src={imageSrcArray[1]} // URL de l'image du profil de l'auteur
              height={100}
              width={100}
              style={{
                borderRadius: "100%",
                objectFit: "cover",
                objectPosition: "center",
                border: "2px solid rgba(240, 46, 170, 0.6)",
              }}
              alt={article.author?.name}
            />
          )}
        </div>
        {/* Convertir les données binaires en URL pour l'image principale de l'article */}
        {imageSrcArray[0] && (
          <img
            src={imageSrcArray[0]} // URL de l'image principale de l'article
            alt={article.title}
            style={{
              border: "2px solid rgba(240, 46, 170, 0.6)",
              objectFit: "cover",
            }}
            height={600}
            width={700}
          />
        )}
      </li>
      <div>
        <EditArticleButton articleId={articleId} margin={0}/>
        <DeleteArticleButton articleId={articleId}/>
      </div>
    </ul>
  );
}
