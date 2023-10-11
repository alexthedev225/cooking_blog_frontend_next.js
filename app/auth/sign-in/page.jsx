"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useCookies } from "react-cookie";
import styles from "@/styles/AuthSignIn.module.css";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ButtonLoadingSpinner from "@/components/ButtonLoadingSpinner";

const SignInForm = () => {
  const signInText = "Connexion"; // Constante pour les chaînes de texte réutilisables

  const router = useRouter();
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(pathname); // Affiche le chemin de l'itinéraire actuel dans la console

  const [, setCookie] = useCookies(["token", "userId"]);

  const handleSignIn = async (values, actions) => {
    try {
      setIsSubmitting(true); // Définit l'état de soumission à true lors de la requête

      const response = await axios.post(
        "https://cooking-blog-backend-express-js.onrender.com/api/users/login",
        {
          email: values.email,
          password: values.password,
        }
      );

      if (response.status === 200) {
        // Connexion réussie, redirigez ici vers la page souhaitée
        console.log(response.data.token);
        console.log(response.data.userId);
        // Enregistrement du token et de l'ID de l'utilisateur dans les cookies
        setCookie("userId", response.data.userId, { path: "/" });
        setCookie("token", response.data.token, { path: "/" });
        router.push("/");
      }
    } catch (error) {
      actions.setFieldError("general", error.response.data.message);
    } finally {
      setIsSubmitting(false); // Réinitialise l'état de soumission à false après la requête
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Adresse e-mail invalide")
      .required("L'adresse e-mail est requise"),
    password: Yup.string().required("Le mot de passe est requis"),
  });

  return (
    <div className={styles["sign-in-container"]}>
      <div className={styles["image-container"]}>
        <img src={"/signin-image.jpg"} alt="signin-image" />
        <br />
        <Link href={"/auth/sign-up"}>Créer un compte</Link>
      </div>
      <div className={styles["form-container"]}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSignIn}
        >
          <Form className={styles["sign-in-form"]}>
            <h1 className={styles["custom-heading"]}>{signInText}</h1>
            <div className={styles["input-container"]}>
              <div className={styles["custom-input"]}>
                <Image src="/email.png" alt="email" height={20} width={20} />
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Adresse E-mail"
                  className={styles["custom-input-field"]}
                />
              </div>
              <div className={styles["error-container"]}>
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles["error-message"]}
                />
              </div>
              <div className={styles["custom-input"]}>
                <Image
                  src="/password.png"
                  alt="password"
                  height={20}
                  width={20}
                />
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Mot de passe"
                  className={styles["custom-input-field"]}
                />
              </div>
              <div className={styles["error-container"]}>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles["error-message"]}
                />
              </div>
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <ButtonLoadingSpinner /> : signInText}
            </button>

            <ErrorMessage
              name="general"
              component="div"
              className={styles["error-message"]}
            />
          </Form>
        </Formik>
      </div>
      
    </div>
  );
};

export default SignInForm;
