"use client"
import React, { useEffect, useState } from "react";

async function getArticleById(id) {
  const response = await fetch(`https://cooking-blog-backend-expres-js.onrender.com/api/articles/${id}`, {
    cache: "no-store",
  });
  const article = await response.json();
  return article;
}

export default function Layout({ params , children}) {
  const [article, setArticle] = useState({ title: "" });

  useEffect(() => {
    async function fetchArticle() {
      try {
        const userId = params.id;
        const fetchedArticle = await getArticleById(userId);
        setArticle(fetchedArticle);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'article", error);
      }
    }

    fetchArticle();
  }, [params.id]);

  useEffect(() => {
    // Modifiez le titre du document lorsque l'article est chargé
    if (article.title) {
      document.title = article.title;
    }
  }, [article.title]);

  return <div>
    {children}
  </div>;
}
