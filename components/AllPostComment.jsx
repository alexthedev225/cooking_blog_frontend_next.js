"use client";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import io from "socket.io-client"; // Importez Socket.io

const socket = io("https://cooking-blog-backend-express-js.onrender.com"); // Remplacez l'URL par l'URL de votre serveur Socket.io
export default function AllPostComment({articleId}) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = async () => {
    try {

      const response = await fetch("https://cooking-blog-backend-express-js.onrender.com/api/comments", {
        cache: "no-store",
      });

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
  useEffect(() => {
    if (comments.length === 0) {
      fetchComments(); // Appel uniquement si les commentaires ne sont pas déjà chargés
    }
    // Écoutez l'événement "comments" et mettez à jour les commentaires lorsque de nouveaux commentaires sont émis
    socket.on(`comments_article_${articleId}`, (newComment) => {
      setComments((prevComments) => [...prevComments, newComment]);
    });
  
    // Nettoyez l'écouteur d'événement lorsque le composant est démonté
    return () => {
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
    const months = Math.floor(days / 30); // Approximation de 30 jours par mois
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
    <div>
      {isLoading ? ( // Affichez le spinner pendant le chargement
        <div className="spinner">
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
        <div>
          {comments.map((comment) => (
            <div key={comment._id}>
              <p>{comment.content}</p>
              <h2>{comment.authorName}</h2>
              {comment.authorImage && (
                <img
                  src={getBase64Image(comment.authorImage.data)}
                  height={50}
                  width={50}
                  style={{
                    borderRadius: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    border: "2px solid rgba(240, 46, 170, 0.6)",
                  }}
                  alt={comment.authorName}
                />
              )}
              <p>Publié {formatDistanceToNow(comment.createdAt)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
