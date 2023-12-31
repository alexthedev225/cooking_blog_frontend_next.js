import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LayoutLoadingSpinner";

const inter = Inter({ subsets: ["greek"] });

export const metadata = {
  title: "Délices et Saveurs : Créez, Dégustez, Partagez",
  description: `Explorez un monde de saveurs et de créativité culinaire sur Délices et Saveurs. Découvrez des recettes délicieuses, des astuces de cuisine, et la possibilité de partager vos propres articles. Rejoignez notre communauté passionnée de chefs en herbe et de gourmets.`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <div className="layout-container">
            <Header />
            {children}
          </div>
      </body>
    </html>
  );
}
