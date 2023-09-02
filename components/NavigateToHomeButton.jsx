import React from "react";
import Link from "next/link";

export default function NavigateToHomeButton() {
  return (
    <Link href={"/"}>
      <button
        style={{
          height: "3rem",
          width: "15rem",
          backgroundColor: "hotpink",
          color: "white",
          border: "none",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "0.5rem"
        }}
      >
        Retour a la page d'accueil
      </button>
    </Link>
  );
}
