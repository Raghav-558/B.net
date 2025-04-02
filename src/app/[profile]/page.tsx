"use client";
import NavigationBar from "@/components/common/NavigationBar";
import HomePage from "@/components/HomePage";
import Profile from "@/components/Profile";
import Project from "@/components/Project";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const router = useRouter();
  const path = usePathname();
  const homeRoute = path === "/home";
  const projectRoute = path === "/add-project";
  const profileRoute = path === "/profile";

  useEffect(() => {
    if (localStorage.getItem("isLogin") !== "true") {
      router.push("/");
    }
  }, []);

  return (
    <div className=" !relative !min-h-screen overflow-hidden w-[360px] mx-auto">
      {homeRoute && <HomePage />}
      {projectRoute && <Project />}
      {profileRoute && <Profile />}
      <NavigationBar />
    </div>
  );
};

export default page;
