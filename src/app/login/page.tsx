"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; 
import LoginPage from "@/components/LoginPage";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div>
      <LoginPage />
    </div>
  );
};

export default Page;
