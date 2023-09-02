"use client"
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

export default function CreateArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const router = useRouter()
  const [cookies] = useCookies(["token", "userId"]); // Utilisation des cookies
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
   
    try {
      const response = await axios.post(
        "https://cooking-blog-backend-expres-js.onrender.com/api/articles",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookies.token}`, // Ajout du jeton d'authentification
          },
        }
      );
        router.push('/blog')
      console.log("Article created:", response.data);
      // Vous pouvez naviguer vers une page de succès ou mettre à jour l'interface utilisateur si nécessaire
    } catch (error) {
      console.error("Error creating article:", error);
      // Gérez l'erreur et mettez à jour l'interface utilisateur en conséquence
    }
  };

  return (
    <div>
      <h1>Create New Article</h1>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />
        <label>Content</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        <br />
        <label>Image</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <br />
        <button type="submit">Create Article</button>
      </form>
    </div>
  );
}
