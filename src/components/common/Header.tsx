"use client";
import React, { useState, useEffect } from "react";
import { HEADER_ICONS_LIST } from "@/utils/helper";

const Header = ({ myClass = "" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);

    return () => clearInterval(timer); 
  }, []);

  return (
    <div className={`pt-4 pb-[17px] ${myClass}`}>
      <div className="w-[360px] px-5 mx-auto">
        <div className="flex items-center justify-between">
          <p className="font-semibold font-inter text-xs leading-[100%]">
            {currentTime}
          </p>
          <div className="flex items-center gap-[2px]">
            {HEADER_ICONS_LIST.map((item, index) => (
              <div key={index}>{item.icon}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
