"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "./Header";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, 2000);
  }, []);

  return (
    <div className="w-[360px] mx-auto relative">
      {isLoading ? (
        <div className="fixed inset-0 flex flex-col justify-center items-center z-[999] bg-white pt-[245px]">
          <Image
            src="/assets/images/webp/pre-loader-img.webp"
            alt="pre-loader"
            width={130}
            height={120.15}
            className="pointer-events-none preloader-shadow"
          />
          <p className="text-[32px] leading-[155%] text-center pt-[260px] pb-[76px]">
            B.net
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default Preloader;
