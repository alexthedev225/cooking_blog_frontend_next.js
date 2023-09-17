"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import styles from "@/styles/AuthSignUp.module.css"; // Assurez-vous que le module CSS est importé correctement
import Image from "next/image";
import Link from "next/link";
import ButtonLoadingSpinner from "@/components/ButtonLoadingSpinner";

const SignUpForm = () => {
  const signUpText = "Inscription"; // Constante pour les chaînes de texte réutilisables

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false); // État pour le succès du téléchargement

  const validationSchema = Yup.object({
    username: Yup.string().required("Le nom d'utilisateur est requis"),
    email: Yup.string()
      .email("Adresse e-mail invalide")
      .required("L'adresse e-mail est requise"),
    name: Yup.string().required("Le nom est requis"),
    password: Yup.string().required("Le mot de passe est requis"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Les mots de passe doivent correspondre"
      )
      .required("La confirmation du mot de passe est requise"),
  });

  const initialValues = {
    username: "",
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    imageProfil: null,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("email", values.email);
        formData.append("name", values.name);
        formData.append("password", values.password);
        formData.append("imageProfil", values.imageProfil);

        const response = await axios.post(
          "https://cooking-blog-backend-express-js.onrender.com/api/users/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
          router.push("/auth/sign-in");
          console.log(response.data);
        }
      } catch (error) {
        formik.setFieldError("general", error.response.data.message);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Fonction pour rendre les champs du formulaire
  const renderInputField = (name, placeholder, type = "text") => (
    <div className={styles["custom-input"]}>
      <Image src={`/${name}.png`} alt={name} height={20} width={20} />
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        {...formik.getFieldProps(name)}
      />
    </div>
  );

  return (
    <div className={styles["sign-up-container"]}>
      <div className={styles["form-container"]}>
        <form
          onSubmit={formik.handleSubmit}
          encType="multipart/form-data"
          className={styles["sign-up-form"]}
        >
          <h1 className={styles["custom-heading"]}>{signUpText}</h1>
          <div className={styles["input-container"]}>
            {renderInputField("name", "Nom et Prénom")}
            <div className={styles["error-container"]}>
              {formik.touched.name && formik.errors.name && (
                <div className={styles["error-message"]}>
                  {formik.errors.name}
                </div>
              )}
            </div>

            {renderInputField("username", "Nom d'Utilisateur")}
            <div className={styles["error-container"]}>
              {formik.touched.username && formik.errors.username && (
                <div className={styles["error-message"]}>
                  {formik.errors.username}
                </div>
              )}
            </div>

            {renderInputField("email", "Adresse E-mail", "email")}
            <div className={styles["error-container"]}>
              {formik.touched.email && formik.errors.email && (
                <div className={styles["error-message"]}>
                  {formik.errors.email}
                </div>
              )}
            </div>

            {renderInputField("password", "Mot de passe", "password")}
            <div className={styles["error-container"]}>
              {formik.touched.password && formik.errors.password && (
                <div className={styles["error-message"]}>
                  {formik.errors.password}
                </div>
              )}
            </div>

            <div className={styles["custom-input"]}>
              <img
                src={`/confirmPassword.gif`}
                alt="confirmPassword"
                height={20}
                width={20}
              />
              <input
                type="password"
                id="confirmPassword"
                placeholder="Répétez votre mot de passe"
                {...formik.getFieldProps("confirmPassword")}
              />
            </div>
            <div className={styles["error-container"]}>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className={styles["error-message"]}>
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>
            <div className={styles["file-input-container"]}>
              <label htmlFor="imageProfil" className={styles["file-label"]}>
                <span className={styles["file-label-text"]}>
                  <img
                    src="/telecharger.png"
                    alt="telechargement d'icone"
                    height={24}
                    width={24}
                  />{" "}
                  Télécharger une photo de profil
                </span>
              </label>
              <input
                type="file"
                name="imageProfil"
                id="imageProfil"
                onChange={(event) => {
                  formik.setFieldValue(
                    "imageProfil",
                    event.currentTarget.files[0]
                  );
                  setIsUploadSuccess(true); // Définir le succès du téléchargement sur true
                }}
                className={`${styles["file-input"]} ${styles["custom-file-input"]}`}
              />
            </div>
            <div className={styles["upload-success-container"]}>
              {isUploadSuccess && ( // Afficher le message de succès si le téléchargement est réussi
                <div className={styles["upload-success-message"]}>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={styles["success-icon"]}
                  />
                  Photo de profil téléchargée avec succès !
                </div>
              )}
            </div>
          </div>

          {formik.errors.general && <p>{formik.errors.general}</p>}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <ButtonLoadingSpinner /> : signUpText}
          </button>
        </form>
      </div>
      <div className={styles["image-container"]}>
        <img src={"/signup-image.jpg"} alt="signup-image" />
        <br />
        <Link href={"/auth/sign-in"}>Je suis déjà membre</Link>
      </div>
    </div>
  );
};

export default SignUpForm;
