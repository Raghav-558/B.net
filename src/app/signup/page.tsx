"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SignupPage from "@/components/SignupPage";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("isLogin") !== "true") {
      router.push("/");
    }
  }, []);

  return (
    <>
      <SignupPage />
    </>
  );
};

export default page;
