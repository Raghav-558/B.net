"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import RecordData from "./RecordData";
import { HOME_TABS_LIST } from "@/utils/helper";
import Image from "next/image";
import {
  HomeIcon,
  NotificationIcon,
  PlusIcon,
  ProfileIcon,
  TimerIcon,
  WarningIcon,
} from "@/utils/icons";

const HomePage = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "today";
  const [activeTab, setActiveTab] = useState(false);

  const form = {
    startTime: "",
    endTime: "",
    project: "",
  };

  const [formData, setFormData] = useState(form);

  const handlerSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { startTime, endTime, project } = formData;

    if (startTime && endTime && project) {
      const savedData = localStorage.getItem("project");
      const dataList = savedData ? JSON.parse(savedData) : []; // Initialize as array if null
      dataList.push({ startTime, endTime, project }); // Append new data
      localStorage.setItem("project", JSON.stringify(dataList)); // Save updated array
      alert("Form data saved successfully!");
      setFormData({
        startTime: "",
        endTime: "",
        project: "",
      });

      // Hide the active tab after a delay
      setTimeout(() => {
        setActiveTab(false);
      }, 1000);
    } else {
      alert("Please fill all fields.");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden w-[360px] mx-auto">
      {activeTab ? (
        <div>
          <form onSubmit={handlerSubmit} className="flex flex-col gap-3">
            <input
              required
              value={formData.startTime}
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
              placeholder="Start Time"
              type="text"
              className="border border-black border-solid"
            />
            <input
              required
              value={formData.endTime}
              onChange={(e) =>
                setFormData({ ...formData, endTime: e.target.value })
              }
              placeholder="End Time"
              type="text"
              className="border border-black border-solid"
            />
            <input
              required
              value={formData.project}
              onChange={(e) =>
                setFormData({ ...formData, project: e.target.value })
              }
              placeholder="Project"
              type="text"
              className="border border-black border-solid"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
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
                  Hi, Moin Thomas!
                </h3>
                <p className="leading-[160%] text-sm text-black/60">
                  Good morning
                </p>
              </div>
              <Image
                src="/assets/images/webp/profile-image.webp"
                width={48}
                height={48}
                className="pointer-events-none rounded-full"
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
      )}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="bottom-bar py-3 bg-cover mt-24 relative">
          <div className="flex justify-between items-center px-5">
            <div className="flex items-center gap-[45px]">
              <Link href="/">
                <HomeIcon />
              </Link>
              <Link href="/">
                <TimerIcon />
              </Link>
            </div>
            <div className="flex items-center gap-[45px]">
              <Link href="/">
                <NotificationIcon />
              </Link>
              <Link href="/">
                <ProfileIcon />
              </Link>
            </div>
          </div>
          <div className="bg-black size-12 rounded-full flex items-center justify-center absolute -top-8 left-1/2 -translate-x-1/2">
            <button
              className="cursor-pointer"
              onClick={() => setActiveTab(!activeTab)}
            >
              <PlusIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;