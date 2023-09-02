import React from "react";
import Link from "next/link";

export default function NavigateToAllPostsButton() {
  return (
    <Link href={"/blog"}>
      <button
        style={{
          height: "3rem",
          width: "15rem",
          backgroundColor: "hotpink",
          color: "white",
          border: "none",
          fontSize: "16px",
          marginBottom: "3rem",
          cursor: "pointer",
          borderRadius: "0.5rem",
        }}
      >
        Tous les posts
      </button>
    </Link>
  );
}
