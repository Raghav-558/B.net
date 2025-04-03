"use client";
import {
  BackArrowIcon,
  EditIcon,
  MobileIcon,
  ProfileMailIcon,
  UploadImage,
} from "@/utils/icons";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("+49 000 00000");
  const [profilePicture, setProfilePicture] = useState("/assets/images/webp/profile-image.webp");
  const [newProfilePicture, setNewProfilePicture] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newMobile, setNewMobile] = useState(""); 
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    const storedPicture = localStorage.getItem("profilePicture");

    if (storedData) {
      const userData = JSON.parse(storedData);
      setEmail(userData.email);
      setMobile(userData.mobile);
    }
    if (storedPicture) {
      setProfilePicture(storedPicture);
    }
  }, []);

  const isValidMobile = (mobile: string) => {
    const mobileRegex = /^[+]?[0-9]{10,15}$/; 
    return mobileRegex.test(mobile);
  };

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileExtension = file.type.split("/")[1]; 

      if (fileExtension !== "png" && fileExtension !== "jpeg" && fileExtension !== "jpg") {
        alert("Only .png and .jpg files are allowed!");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        setNewProfilePicture(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    if (newEmail.trim() !== "") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
        setEmailError("Please enter a valid email address.");
        return;
      } else {
        setEmailError("");
        const storedData = localStorage.getItem("formData");
        const updatedData = storedData
          ? { ...JSON.parse(storedData), email: newEmail }
          : { email: newEmail };

        localStorage.setItem("formData", JSON.stringify(updatedData));
        setEmail(newEmail);
        setNewEmail("");
      }
    }

    if (newMobile.trim() !== "") {
      if (!isValidMobile(newMobile)) {
        setMobileError("Please enter a valid mobile number.");
        return;
      } else {
        setMobileError("");
        const storedData = localStorage.getItem("formData");
        const updatedData = storedData
          ? { ...JSON.parse(storedData), mobile: newMobile }
          : { mobile: newMobile };

        localStorage.setItem("formData", JSON.stringify(updatedData));
        setMobile(newMobile);
        setNewMobile("");
      }
    }

    if (newProfilePicture) {
      localStorage.setItem("profilePicture", newProfilePicture);
      setProfilePicture(newProfilePicture);
      setNewProfilePicture("");
    }

    setIsModalOpen(false);
  };

  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-[360px] mx-auto">
      <div className="profile-box rounded-b-[40px]">
        <div className="flex items-center justify-between pt-3 px-5">
          <BackArrowIcon />
          <h3 className="text-base font-medium leading-[150%]">Profile</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer"
          >
            <EditIcon />
          </button>
        </div>
        <div className="flex flex-col w-full justify-center items-center pt-8 px-5">
          <Image
            width={87}
            height={87}
            alt="profile-image"
            src={profilePicture}
            className="rounded-full w-[87px] h-[87px] flex justify-center"
          />
          <h2 className="font-medium text-xl leading-[120%] pt-4 text-center">
            Moin Thomas
          </h2>
          <p className="text-sm leading-[160%] text-black/80 pt-2 text-center pb-[46px]">
            Senior Project Manager
          </p>
        </div>
      </div>
      <div className="flex gap-[13px] mx-5 pt-[33px] pb-5 border-b-[0.5px] border-solid border-black/12">
        <div className="pt-0.5">
          <ProfileMailIcon />
        </div>
        <div className="flex flex-col">
          <p className="font-medium leading-[175%] text-black/50 text-[10px]">
            Email
          </p>
          <p className="font-medium text-xs leading-[170%] text-black/70">
            {email ? email : "No email found"}
          </p>
        </div>
      </div>
      <div className="flex gap-[13px] mx-5 pt-9 pb-5 border-b-[0.5px] border-solid border-black/12">
        <div className="pt-0.5">
          <MobileIcon />
        </div>
        <div className="flex flex-col">
          <p className="font-medium leading-[175%] text-black/50 text-[10px]">
            Mobile
          </p>
          <p className="font-medium text-xs leading-[170%] text-black/70">
            {mobile ? mobile : "No found"}
          </p>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full px-4 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg w-96">
            <h2 className="text-lg font-semibold text-center">Edit Profile</h2>
            <div className="mt-4 flex justify-between items-center">
              <label className="block">Update Image:</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={triggerFileUpload}
                  className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-all duration-300"
                  aria-label="Upload Image"
                >
                  <UploadImage />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                />
                {newProfilePicture && (
                  <Image
                    width={87}
                    height={87}
                    alt="Updated Profile"
                    src={newProfilePicture}
                    className="mt-2 rounded-full w-[87px] h-[87px]"
                  />
                )}
              </div>
            </div>
            <div className="mt-4">
              <label className="block pb-2">Update Email:</label>
              <input
                type="email"
                className="border-[0.5px] border-black/12 rounded p-2 w-full text-sm outline-none"
                placeholder="Enter new email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>
            <div className="mt-4">
              <label className="block pb-2">Update Mobile:</label>
              <input
                type="text"
                className="border-[0.5px] border-black/12 rounded p-2 w-full text-sm outline-none"
                placeholder="Enter new mobile"
                value={newMobile}
                onChange={(e) => setNewMobile(e.target.value)}
              />
              {mobileError && (
                <p className="text-red-500 text-xs mt-1">{mobileError}</p>
              )}
            </div>
            <div className="flex items-center justify-between gap-5 pt-4">
              <button
                className="bg-custom-green text-custom-white border border-transparent hover:border-custom-green hover:bg-white hover:text-custom-green transition-all duration-300 px-4 py-2 rounded w-full outline-none"
                onClick={handleConfirm}
              >
                Confirm
              </button>
              <button
                className="bg-red-500 text-custom-white border border-transparent hover:bg-white hover:text-red-500 hover:border-red-500 transition-all duration-300 px-4 py-2 rounded w-full outline-none"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
