"use client"
import Image from "next/image";
import styles from "@/styles/About.module.css";
import { useState } from "react";

function Line() {
  return <span className={styles.line}></span>;
}

function Header({ title }) {
  return (
    <div className={styles.heading}>
      <h3 className={styles.title}>{title}</h3>
      <Line />
    </div>
  );
}

export default function Page() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      nom: nom,
      email: email,
      message: message,
    };

    fetch("https://cooking-blog-backend-express-js.onrender.com/envoyer-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Gérez la réponse du serveur comme vous le souhaitez
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <Header title={"À PROPOS"} />
        <div className={styles["profile-container"]}>
          <div className={styles.image}>
            <Image
              src={"/MyPicture.jpg"}
              height={120}
              width={180}
              style={{
                marginBottom: "1rem",
                // objectFit: "cover",
              }}
              alt="Alex Konan Dev FullStack"
            />
            <div className={styles["profile-info"]}>
              <h5 className={styles.name}>Alex K.</h5>
              <p className={styles.description}>
                Développeur Web & Mobile FullStack
              </p>
            </div>
          </div>
          <div className={styles.description}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi quod
            officiis eius cum corporis, in porro blanditiis, tempora, quos
            labore velit? Consectetur doloremque magnam aspernatur voluptatem.
            Quis, quibusdam. Ad, a?
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <Header title={"ME CONTACTER"} />
        <div className={styles.contact}>
          <div className={styles["contact-info"]}>
            <p className={styles.email}>info@mysite.fr</p>
            <p className={styles.phone}>01 03 83 57 31</p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>
                <Image
                  src="/facebook.png"
                  alt="facebook"
                  height={17}
                  width={17}
                />
              </a>
              <a href="#" className={styles.socialLink}>
                <Image
                  src="/pinterest.png"
                  alt="pinterest"
                  height={17}
                  width={17}
                />
              </a>
              <a href="#" className={styles.socialLink}>
                <Image
                  src="/twitter.png"
                  alt="twitter"
                  height={17}
                  width={17}
                />
              </a>
              <a href="#" className={styles.socialLink}>
                <Image
                  src="/instagram.png"
                  alt="instagram"
                  height={17}
                  width={17}
                />
              </a>
            </div>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              className={styles.input}
              type="text"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
            <input
              className={styles.input}
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              className={styles.textarea}
              name=""
              id=""
              placeholder="Rédigez votre message ici..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button className={styles.button} type="submit">
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
