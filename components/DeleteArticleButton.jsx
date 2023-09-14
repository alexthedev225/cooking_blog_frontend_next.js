"use client";
import styles from "@/styles/Button.module.css";
import { useCookies } from "react-cookie";
import { redirect } from "next/navigation"; // Importez le hook useRouter
import { useState } from "react";
import ButtonLoadingSpinner from "./ButtonLoadingSpinner";

export default function DeleteArticleButton({ articleId, margin }) {
  const [cookies] = useCookies(["token", "userId"]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = cookies.token;
  async function deleteArticle() {
    try {
      setIsSubmitting(true); // Définit l'état de soumission à true lors de la requête
      const response = await fetch(
        `https://cooking-blog-backend-express-js.onrender.com/api/articles/${articleId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Ajout du jeton d'authentification
          },
        }
      );

      if (response.status === 200) {
        // Suppression réussie, redirigez vers la page d'accueil
        console.log("Article supprimé avec succès");
        redirect("/"); // Redirection vers la page d'accueil
      } else {
        // La suppression a échoué, affichez un message d'erreur ou effectuez une autre action ici
        console.error("Échec de la suppression de l'article");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article", error);
    } finally {
      isSubmitting(false);
    }
  }

  const handleDelete = () => {
    // Demande de confirmation de suppression à l'utilisateur si nécessaire
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cet article ?"
    );

    if (confirmDelete) {
      // Appel de la fonction de suppression avec l'ID de l'article
      deleteArticle();
    }
  };

  return (
    <button
      className={styles["button-danger"]}
      onClick={handleDelete}
      style={{ margin: margin }}
    >
      {isSubmitting ? <ButtonLoadingSpinner /> : "Supprimer l'article"}{" "}
    </button>
  );
}
