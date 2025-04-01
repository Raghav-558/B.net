"use client";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
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
      <Suspense>
        <HomePage />
      </Suspense>
    </>
  );
};

export default page;
