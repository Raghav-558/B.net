"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SignupPage from "@/components/SignupPage";
import HomePage from "@/components/HomePage";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("isLogin") !== "true") {
      router.push("/");
    }
  }, []);

  return (
    <>
      <HomePage />
    </>
  );
};

export default page;
