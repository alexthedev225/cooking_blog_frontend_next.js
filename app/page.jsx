import GetAllPostHome from "@/components/AllPostHome";
import NavigateToAllPostsButton from "@/components/NavigateToAllPostsButton";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <GetAllPostHome />
      <NavigateToAllPostsButton />
    </div>
  );
}
