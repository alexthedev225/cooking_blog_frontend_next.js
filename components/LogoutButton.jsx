import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Assurez-vous d'avoir installé ce package
import axios from "axios";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    const token = Cookies.get("token"); // Récupérez le token depuis les cookies

    if (token) {
      axios
        .post("http://localhost:8000/api/users/logout", null, {
          headers: {
            Authorization: `Bearer ${token}`, // Ajoutez le token à l'en-tête
          },
        })
        .then((response) => {
          // Gérez la réponse, par exemple supprimez le token stocké côté client
          Cookies.remove("token"); // Supprimez le token des cookies
          router.push("/"); // Redirigez l'utilisateur vers la page d'accueil ou une autre page
        })
        .catch((error) => {
          // Gérez les erreurs
        });
    }
  };

  return <button onClick={handleLogout}>Déconnexion</button>;
};

export default LogoutButton;
