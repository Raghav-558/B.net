"use client";
import {
  HomeIcon,
  NotificationIcon,
  PlusIcon,
  ProfileIcon,
  TimerIcon,
} from "@/utils/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavigationBar = () => {
  const path = usePathname();
  return (
    <div className="absolute bottom-0 left-0 right-0">
      <div className="bottom-bar py-3 bg-cover relative">
        <div className="flex justify-between items-center px-5">
          <div className="flex items-center gap-[45px]">
            <Link href="/home">
              <HomeIcon
                pathClass={path === "/home" ? "!stroke-custom-green" : ""}
              />
            </Link>
            <Link href="/timer">
              <TimerIcon
                pathClass={path === "/timer" ? "!stroke-custom-green" : ""}
              />
            </Link>
          </div>
          <div className="flex items-center gap-[45px]">
            <Link href="/notifications">
              <NotificationIcon
                pathClass={
                  path === "/notifications" ? "!stroke-custom-green" : ""
                }
              />
            </Link>
            <Link href="/profile">
              <ProfileIcon
                pathClass={path === "/profile" ? "!stroke-custom-green" : ""}
              />
            </Link>
          </div>
        </div>
        <Link
          href="/add-project"
          className="bg-black size-12 rounded-full flex items-center justify-center absolute -top-8 left-1/2 -translate-x-1/2"
        >
          <PlusIcon />
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
