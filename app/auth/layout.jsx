import NavigateToHomeButton from "@/components/NavigateToHomeButton";
import styles from "@/styles/AuthLayout.module.css";

export default function AuthLayout({ children }) {
  return (
    <div className={styles["auth-layout"]}>
      <div>{children}</div>
      <NavigateToHomeButton />
    </div>
  );
}
