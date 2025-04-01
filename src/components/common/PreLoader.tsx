"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "";
    setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, 2000); 
  }, []);

  return (
    <div className="w-[360px] mx-auto relative ">
      {isLoading ? (
        <div className="fixed inset-0 flex flex-col justify-center items-center w-[360px] mx-auto z-[999] bg-white">
          <Image
            src="/assets/images/webp/preloader-vector.webp"
            alt="pre-loader-vector"
            width={690}
            height={323}
            className="pointer-events-none absolute bottom-0 right-0 inset-"
          />
          <Image
            src="/assets/images/webp/pre-loader-img.webp"
            alt="pre-loader"
            width={130}
            height={120.15}
            className="pointer-events-none z-[1000] mt-[245px] mb-[260px]"
          />
          <p className="text-[32px] leading-[155%] text-center z-[1000] pb-[76px]">
            B.net
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default Preloader;
