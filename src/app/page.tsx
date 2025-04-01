import Header from "@/components/common/Header";
import Preloader from "@/components/common/PreLoader";
import LoginPage from "@/components/LoginPage";

export default function Home() {
  return (
    <>
      <Header/>
      <Preloader/>
      <LoginPage />
    </>
  );
}
