"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SignupPage from "@/components/SignupPage"; 

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("isLogin") === "true"
    ) {
      router.push("/home");
    }
  }, [router]); 

  return (
    <>
      <SignupPage />
    </>
  );
};

export default Page;
