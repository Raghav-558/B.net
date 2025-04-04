"use client";
import { ClockIcon, SearchIcon } from "@/utils/icons";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Project = () => {
  const router = useRouter();
  const form = {
    startTime: "",
    endTime: "",
    project: "",
  };

  const [formData, setFormData] = useState(form);

  const handlerSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { startTime, endTime, project } = formData;

    if (!startTime || !endTime || !project) {
      toast.error("Please fill all fields.");
      return;
    }

    const toMinutes = (time: string) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes; 
    };

    const startMinutes = toMinutes(startTime);
    const endMinutes = toMinutes(endTime);

    if (endMinutes <= startMinutes) {
      toast.error("End time must be later than start time.");
      return;
    }

    const savedData = localStorage.getItem("project");
    const dataList = savedData ? JSON.parse(savedData) : [];
    dataList.push({ startTime, endTime, project });
    localStorage.setItem("project", JSON.stringify(dataList));

    toast.success("Form data saved successfully!");
    setFormData({
      startTime: "",
      endTime: "",
      project: "",
    });

    setTimeout(() => {
      router.push("/home");
    }, 1500);
  };

  const handleCancel = () => {
    setFormData({
      startTime: "",
      endTime: "",
      project: "",
    });
    toast.info("Form reset successfully!");
  };

  return (
    <div className="w-[360px] mx-auto relative">
      <Image
        src="/assets/images/webp/project-vector.webp"
        width={360}
        height={367}
        alt="project"
        className="pointer-events-none absolute z-[-10] -top-20 -left-4"
      />
      <form
        noValidate
        onSubmit={handlerSubmit}
        className="flex flex-col pt-3 px-5"
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <label
              htmlFor="startTime"
              className="font-medium text-xs leading-[170%] text-custom-black"
            >
              Start Time
            </label>
            <div className="mt-1">
              <input
                required
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                placeholder="10:00 PM"
                type="time"
                style={{ appearance: "none" }}
                className="w-[130px] bg-white rounded-[10px] border-[0.5px] border-solid border-black/12 h-11 pr-[25px] pl-[18px] text-[10px] leading-[175%] font-medium outline-none text-black/50 input-shadow"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="endTime"
              className="font-medium text-xs leading-[170%] text-custom-black"
            >
              End Time
            </label>
            <div className="mt-1">
              <input
                required
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                placeholder="04:00 AM"
                type="time"
                className="w-[130px] bg-white rounded-[10px] border-[0.5px] border-solid border-black/12 h-11 pr-[25px] pl-[18px] text-[10px] leading-[175%] font-medium outline-none text-black/50 input-shadow"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-[18px]">
          <label
            htmlFor="Project"
            className="font-medium text-xs leading-[170%] text-custom-black pb-1"
          >
            Project
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black/50">
              <SearchIcon />
            </span>
            <input
              required
              value={formData.project}
              onChange={(e) =>
                setFormData({ ...formData, project: e.target.value })
              }
              placeholder="Project Name"
              type="text"
              className="w-full bg-white rounded-[10px] border-[0.5px] border-solid border-black/12 h-11 pr-[25px] pl-[42px] text-xs leading-[170%] outline-none text-black/50 input-shadow"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-[25px]">
          <button
            type="submit"
            className="w-full h-12 bg-custom-green text-custom-white font-medium leading-[160%] text-sm border border-transparent rounded-sm hover:border-black hover:bg-black hover:text-custom-white transition-all duration-300 cursor-pointer"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-full h-12 border border-solid border-custom-green text-custom-green font-medium leading-[160%] text-sm rounded-sm hover:bg-black hover:text-custom-white hover:border-black transition-all duration-300 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Project;
