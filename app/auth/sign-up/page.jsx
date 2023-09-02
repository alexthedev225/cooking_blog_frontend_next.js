"use client"
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "@/styles/Form.module.css";
import { Lora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import NavigateToHomeButton from "@/components/NavigateToHomeButton";

const lora = Lora({
  weight: "700",
  subsets: ["latin"],
});

const SignUpForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      imageProfil: null,
    },
    validationSchema: Yup.object({
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
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("email", values.email);
        formData.append("name", values.name);
        formData.append("password", values.password);
        formData.append("imageProfil", values.imageProfil);

        const response = await axios.post(
          "https://cooking-blog-backend-expres-js.onrender.com/api/users/register",
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
      }
    },
  });

  return (
    <div className={styles["box-container-primary"]}>
      <div className={styles["box-container-secondary"]}>
        <div className={styles["register-container"]}>
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <h1 className={lora.className}>Inscription</h1>
            <div className={styles["register-input-container"]}>
              <div className={styles["input-container"]}>
                <Image src="/nom.png" alt="user" height={20} width={20} />
                <input
                  type="text"
                  id="name"
                  placeholder="Nom et Prénom"
                  {...formik.getFieldProps("name")}
                />
              </div>
              <div className={styles["error-container"]}>
                {formik.touched.name && formik.errors.name ? (
                  <div className={styles["error"]}>{formik.errors.name}</div>
                ) : null}
              </div>
              <div className={styles["input-container"]}>
                <Image src="/user.png" alt="user" height={20} width={20} />
                <input
                  type="text"
                  id="username"
                  placeholder="Nom d'Utilisateur"
                  {...formik.getFieldProps("username")}
                />
              </div>
              <div className={styles["error-container"]}>
                {formik.touched.username && formik.errors.username ? (
                  <div className={styles["error"]}>
                    {formik.errors.username}
                  </div>
                ) : null}
              </div>
              <div className={styles["input-container"]}>
                <Image src="/email.png" alt="email" height={20} width={20} />
                <input
                  type="email"
                  id="email"
                  placeholder="Adresse E-mail"
                  {...formik.getFieldProps("email")}
                />
              </div>
              <div className={styles["error-container"]}>
                {formik.touched.email && formik.errors.email ? (
                  <div className={styles["error"]}>{formik.errors.email}</div>
                ) : null}
              </div>
              <div className={styles["input-container"]}>
                <Image
                  src="/password1.png"
                  alt="password1"
                  height={20}
                  width={20}
                />
                <input
                  type="password"
                  id="password"
                  placeholder="Mot de passe"
                  {...formik.getFieldProps("password")}
                />
              </div>
              <div className={styles["error-container"]}>
                {formik.touched.password && formik.errors.password ? (
                  <div className={styles["error"]}>
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div className={styles["input-container"]}>
                <Image
                  src="/password2.gif"
                  alt="password2"
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
                formik.errors.confirmPassword ? (
                  <div className={styles["error"]}>
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>
              <div className={styles["file-input-container"]}>
                <label htmlFor="imageProfil" className={styles["file-label"]}>
                  <span className={styles["file-label-text"]}>
                    Photo de profil
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles["file-icon"]}
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
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
                  }}
                  className={styles["file-input"]}
                />
              </div>
            </div>

            {formik.errors.general && <p>{formik.errors.general}</p>}

            <button type="submit">S&apos;inscrire</button>
          </form>
        </div>
        <div className={styles["image-container"]}>
          <Image
            src={"/signup-image.jpg"}
            alt="signup-image"
            height={294}
            width={314}
          />
          <br />
          <Link href={'/auth/sign-in'}>
          Je suis déjà membre
          </Link>
        </div>
      </div>
      <NavigateToHomeButton />
    </div>
  );
};

export default SignUpForm;
