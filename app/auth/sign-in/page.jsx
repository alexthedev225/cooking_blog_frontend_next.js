"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useCookies } from "react-cookie";
import styles from "@/styles/Form.module.css";
import axios from "axios";
import { Lora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import NavigateToHomeButton from "@/components/NavigateToHomeButton";

const lora = Lora({
  weight: "700",
  subsets: ["latin"],
});

const SignInForm = () => {
  const router = useRouter();
  const pathname = usePathname();

  console.log(pathname); // Affiche le chemin de l'itinéraire actuel dans la console

  const [cookies, setCookie] = useCookies(["token", "userId"]);

  const handleSignIn = async (values, actions) => {
    try {
      const response = await axios.post(
        "https://cooking-blog-backend-expres-js.onrender.com/api/users/login",
        {
          email: values.email,
          password: values.password,
        }
      );

      if (response.status === 200) {
        // Connexion réussie, redirigez ici vers la page souhaitée
        console.log(response.data.token);
        console.log(response.data.userId);
        // Enregistrer le token et l'ID de l'utilisateur dans les cookies
        setCookie("userId", response.data.userId, { path: "/" });
        setCookie("token", response.data.token, { path: "/" });
        router.push("/");
      }
    } catch (error) {
      actions.setFieldError("general", error.response.data.message);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Adresse e-mail invalide")
      .required("L'adresse e-mail est requise"),
    password: Yup.string().required("Le mot de passe est requis"),
  });

  return (
    <div className={styles["box-container-primary"]}>
      <div className={styles["box-container-secondary"]}>
        <div className={styles["image-container"]}>
          <Image
            src={"/signin-image.jpg"}
            alt="signin-image"
            height={350}
            width={350}
          />
          <br />
          <Link href={"/auth/sign-up"}>Créer un compte</Link>
        </div>
        <div className={styles["login-container"]}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSignIn}
          >
            <Form>
              <h1 className={lora.className}>Connexion</h1>
              <div className={styles["login-input-container"]}>
                <div className={styles["input-container"]}>
                  <Image src="/email.png" alt="email" height={20} width={20} />
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Adresse E-mail"
                  />
                </div>
                <div className={styles["error-container"]}>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles["error"]}
                  />
                </div>
                <div className={styles["input-container"]}>
                  <Image
                    src="/password1.png"
                    alt="password1"
                    height={20}
                    width={20}
                  />
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Mot de passe"
                  />
                </div>
                <div className={styles["error-container"]}>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={styles["error"]}
                  />
                </div>
              </div>
              <button type="submit">Se connecter</button>
              <ErrorMessage name="general" component="div" />
            </Form>
          </Formik>
        </div>
      </div>
      <NavigateToHomeButton />
    </div>
  );
};

export default SignInForm;
