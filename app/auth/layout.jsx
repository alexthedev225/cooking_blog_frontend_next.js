import LoadingSpinner from "@/components/LayoutLoadingSpinner";
import NavigateToHomeButton from "@/components/NavigateToHomeButton";
import styles from "@/styles/AuthLayout.module.css";
import { Suspense } from "react";

export default function AuthLayout({ children }) {
  return (
    <Suspense fallback={<LoadingSpinner height={"100vh"} />}>
      <div className={styles["auth-layout"]}>
        <div>{children}</div>
        <NavigateToHomeButton />
      </div>
    </Suspense>
  );
}
