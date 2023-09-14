"use client";
// components/AllPostComment.js
import { Suspense, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import io from "socket.io-client";
import styles from "@/styles/Comment.module.css";

const socket = io("https://cooking-blog-backend-express-js.onrender.com");

export default function AllPostComment({ articleId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        "https://cooking-blog-backend-express-js.onrender.com/api/comments",
        {
          cache: "no-store",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        console.error("Erreur lors du chargement des commentaires");
      }
    } catch (error) {
      console.error("Erreur lors du chargement des commentaires", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Cette fonction met à jour la date de création de chaque commentaire
  const updateCommentCreationTime = () => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        const updatedCreatedAt = comment.originalCreatedAt
          ? new Date(
              new Date(comment.originalCreatedAt).getTime() +
                (new Date() - new Date(comment.updatedAt))
            )
          : null;

        return {
          ...comment,
          createdAt: updatedCreatedAt,
          updatedAt: new Date(),
        };
      })
    );
  };

  useEffect(() => {
    if (comments.length === 0) {
      fetchComments();
    }

    // Mettre à jour périodiquement la date de création (toutes les secondes ici)
    const updateInterval = setInterval(updateCommentCreationTime, 1000);

    socket.on(`comments_article_${articleId}`, ({ comment, createdAt }) => {
      setComments((prevComments) => [
        ...prevComments,
        {
          ...comment,
          createdAt, // Mise à jour de la date de création
          updatedAt: new Date(), // Mettre à jour le champ updatedAt
          originalCreatedAt: createdAt, // Stocker la date de création initiale
        },
      ]);
    });

    return () => {
      clearInterval(updateInterval); // Nettoyer l'intervalle lors du démontage du composant
      socket.off(`comments_article_${articleId}`);
    };
  }, []);

  function getBase64Image(imageData) {
    const binaryData = Buffer.from(imageData);
    const base64String = binaryData.toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  }

  function formatDistanceToNow(createdAt) {
    const now = new Date();
    const diffInMilliseconds = now - new Date(createdAt);
    const seconds = Math.floor(diffInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    switch (true) {
      case years > 0:
        return `il y a ${years} ans`;
      case months > 0:
        return months === 1 ? "il y a 1 mois" : `il y a ${months} mois`;
      case days > 0:
        return days === 1 ? "il y a 1 jour" : `il y a ${days} jours`;
      case hours > 0:
        return hours === 1 ? "il y a 1 heure" : `il y a ${hours} heures`;
      case minutes > 0:
        return minutes === 1 ? "il y a 1 minute" : `il y a ${minutes} minutes`;
      default:
        return seconds === 1
          ? "il y a 1 seconde"
          : `il y a ${seconds} secondes`;
    }
  }

  return (
    <>
      {isLoading ? (
        <div className="spinner-container">
          <TailSpin
            height="80"
            width="80"
            color="hotpink"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className={styles["comments-container"]}>
          {comments.map((comment) => (
            <div key={comment._id} className={styles["comment-item"]}>
              <div className={styles["comment-author"]}>
                {comment.authorImage && (
                  <img
                    src={getBase64Image(comment.authorImage.data)}
                    className={styles["comment-author-image"]}
                    alt={comment.authorName}
                  />
                )}
                <div className={styles["comment-author-details"]}>
                  <p className={styles["comment-author-name"]}>
                    {comment.authorName}
                  </p>
                  <p className={styles["comment-published"]}>
                    Publié {formatDistanceToNow(comment.originalCreatedAt)}
                  </p>
                </div>
              </div>
              <p className={styles["comment-text"]}>{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
