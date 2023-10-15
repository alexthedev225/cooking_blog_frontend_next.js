"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

const LogoutButton = ({ className }) => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = () => {
    const token = Cookies.get("token");

    if (token) {
      axios
        .post("https://cooking-blog-backend-express-js.onrender.com/api/users/logout", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          Cookies.remove("token");
          setIsLoggedOut(true);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        })
        .catch(() => {});
    }
  };

  return (
    <>
      <button onClick={handleLogout} className={className}>
        <Image src="/logout.png" height={24} width={24} alt="Déconnexion" />
        <p>Déconnexion</p>
      </button>
      <Modal
        show={isLoggedOut}
        onClose={() => setIsLoggedOut(false)}
        message="Vous avez été déconnecté avec succès."
      />
    </>
  );
};

export default LogoutButton;

const modalStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContentStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
  position: "relative",
};

const Modal = ({ show, onClose, message }) => {
  return show ? (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <p>{message}</p>
      </div>
    </div>
  ) : null;
};
