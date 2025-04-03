"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import RecordData from "./RecordData";
import { HOME_TABS_LIST } from "@/utils/helper";
import Image from "next/image";
import { WarningIcon } from "@/utils/icons";

const HomePage = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "today";

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [profileName, setProfileName] = useState<string | null>("Hi there!");

  useEffect(() => {
    const storedProfilePic = localStorage.getItem("profilePicture");
    const storedProfileName = localStorage.getItem("formData");

    if (storedProfilePic) {
      setProfilePic(storedProfilePic);
    }

    if (storedProfileName) {
      const parsedName = JSON.parse(storedProfileName).name;
      setProfileName(parsedName || "Moin Thomas");
    }
  }, []);

  return (
    <>
      <Image
        src="/assets/images/webp/home-page-vector-img.webp"
        alt="home-vector"
        width={352}
        height={252}
        className="pointer-events-none absolute mx-auto z-[-10] -top-50 -left-24"
      />
      <div className="w-[360px] mx-auto px-5">
        <div className="pt-3 pb-6 flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="font-medium text-xl leading-[120%]">
              Hi, {profileName}!
            </h3>
            <p className="leading-[160%] text-sm text-black/60">Good morning</p>
          </div>
          <Image
            src={profilePic || "/assets/images/webp/profile-image.webp"}
            width={48}
            height={48}
            className="pointer-events-none rounded-full w-[48px] h-[48px]"
            alt="profile-image"
          />
        </div>
        <div className="green-card bg-cover py-5 mb-[33px] h-[94px] rounded-[10px]">
          <span className="flex justify-center">
            <WarningIcon />
          </span>
          <p className="leading-[160%] text-white text-center pt-2">
            You didn't enter any time yesterday!
          </p>
        </div>
        <div className="flex justify-center items-center border-[0.5px] border-solid border-black/12 rounded-[60px]">
          {HOME_TABS_LIST.map((item, i) => {
            const tabData = item
              .toLocaleLowerCase()
              .replaceAll(" ", "-")
              .replace("&", "and");
            const isActive = tab === tabData;

            return (
              <div
                key={i}
                className={`flex justify-center relative w-full py-2.5 rounded-[60px] px-[27px] ${
                  isActive ? "bg-custom-green text-white" : "bg-transparent"
                }`}
              >
                <Link
                  href={`?tab=${tabData}`}
                  className={`text-sm leading-[160%] font-normal ${
                    isActive && "font-medium"
                  }`}
                >
                  {item}
                </Link>
              </div>
            );
          })}
        </div>
        {tab === "today" ? (
          <RecordData />
        ) : (
          <div className="mt-[25px]">
            <h2 className="text-center">Coming soon</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
