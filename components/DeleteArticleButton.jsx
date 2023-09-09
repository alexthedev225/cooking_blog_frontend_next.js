"use client";
import styles from "@/styles/Button.module.css";
import { useCookies } from "react-cookie";
import { redirect } from "next/navigation"; // Importez le hook useRouter

export default function DeleteArticleButton({ articleId }) {
  const [cookies] = useCookies(["token", "userId"]);
  const token = cookies.token;
  async function deleteArticle() {
    try {
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
    }
  }

  const handleDelete = () => {
    // Demande de confirmation de suppression à l'utilisateur si nécessaire
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cet article ?"
    );

    if (confirmDelete) {
      // Appel de la fonction de suppression avec l'ID de l'article
      deleteArticle(articleId, token, router);
    }
  };

  return (
    <button className={styles["button-danger"]} onClick={handleDelete}>
      Supprimer l&apos;article
    </button>
  );
}
