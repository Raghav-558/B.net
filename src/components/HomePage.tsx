"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import RecordData from "./RecordData";
import { HOME_TABS_LIST } from "@/utils/helper";
import Image from "next/image";
import {
  HomeIcon,
  NotificationIcon,
  ProfileIcon,
  TimerIcon,
} from "@/utils/icons";

const HomePage = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "today"; // Default to "today" tab

  return (
    <div className="min-h-screen relative">
      {/* Main Content */}
      <div className="w-[360px] mx-auto px-5">
        <div className="pt-3 pb-6 flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="font-medium text-xl leading-[120%]">
              Hi, Moin Thomas!
            </h3>
            <p className="leading-[160%] text-sm text-black/60">Good morning</p>
          </div>
          <Image
            src="/assets/images/webp/profile-image.webp"
            width={48}
            height={48}
            className="pointer-events-none rounded-full"
            alt="profile-image"
          />
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

      {/* Bottom Navigation */}
      <div className="w-[360px] mx-auto bg-black py-3">
        <div className="flex justify-around items-center text-white">
          <Link href="/" className="">
            <HomeIcon />
          </Link>
          <Link href="/" className="">
            <TimerIcon />
          </Link>
          <Link href="/" className="">
            <NotificationIcon />
          </Link>
          <Link href="/" className="">
            <ProfileIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
