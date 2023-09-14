"use client";
import { useCookies } from "react-cookie";
import { useState } from "react";
import styles from "@/styles/CommentForm.module.css";
import AllPostComment from "./AllPostComment";
import { TailSpin } from "react-loader-spinner";
import ButtonLoadingSpinner from "./ButtonLoadingSpinner";

export default function CommentInput({ articleId }) {
  const [cookies] = useCookies(["token", "userId"]);
  const token = cookies.token;

  // Utilisez la variable "token" comme bon vous semble
  console.log(`Le token est : ${token}`);

  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentChange = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";

    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await fetch(
        `https://cooking-blog-backend-express-js.onrender.com/api/comments/create/${articleId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: comment }),
        }
      );

      if (response.status === 200) {
        console.log("Commentaire créé avec succès");
        setComment("");
      } else {
        console.error("Échec de la création du commentaire");
      }
    } catch (error) {
      console.error("Erreur lors de la création du commentaire", error);
    } finally {
      setIsSubmitting(false); // Réinitialise l'état de soumission à false après la requête
    }
  };

  return (
    <form onSubmit={handleCommentSubmit} className={styles["comment-form"]}>
      <div className={styles["comment-header"]}>
        <h4>Commentaires</h4>
      </div>
      <div className={styles["comment-input-container"]}>
        <textarea
          id="comment"
          name="comment"
          value={comment}
          onChange={handleCommentChange}
          className={styles["comment-textarea"]}
        ></textarea>
      </div>
      <div className={styles["comment-button-container"]}>
        <button
          type="submit"
          className={styles["comment-button"]}
          disabled={isSubmitting || comment.trim() === ""}
        >
          {isSubmitting ? <ButtonLoadingSpinner /> : "Publier"}
        </button>
      </div>
      <AllPostComment articleId={articleId} />{" "}
      {/* Passez fetchComment comme prop */}
    </form>
  );
}
