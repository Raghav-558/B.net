"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Profile = () => {
  // State variables for email, profile picture, modal, and input field
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("/assets/images/webp/profile-image.webp"); // Default image
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  // Fetch stored email and profile picture from localStorage when the component mounts
  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    const storedPicture = localStorage.getItem("profilePicture");

    if (storedData) {
      const userData = JSON.parse(storedData);
      setEmail(userData.email);
    }
    if (storedPicture) {
      setProfilePicture(storedPicture);
    }
  }, []);

  // Function to update email in localStorage
  const handleUpdateEmail = () => {
    if (newEmail.trim() !== "") {
      const storedData = localStorage.getItem("formData");
      const updatedData = storedData
        ? { ...JSON.parse(storedData), email: newEmail }
        : { email: newEmail };

      localStorage.setItem("formData", JSON.stringify(updatedData));
      setEmail(newEmail);
      setNewEmail("");
      setIsModalOpen(false);
    }
  };

  // Function to update profile picture
  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        localStorage.setItem("profilePicture", imageDataUrl);
        setProfilePicture(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-5">
      {/* Profile Picture */}
      <Image width={48} height={48} alt="profile" src={profilePicture} className="rounded-full" />

      {/* Edit Button */}
      <button onClick={() => setIsModalOpen(true)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        Edit
      </button>

      <h1 className="text-lg font-bold mt-4">Profile Page</h1>
      <p className="mt-2 text-sm text-gray-600">Email: {email ? email : "No email found"}</p>

      {/* Modal for Editing Profile */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg w-96">
            <h2 className="text-lg font-semibold text-center">Edit Profile</h2>

            {/* Option 1: Change Profile Picture */}
            <div className="mt-4">
              <label className="block font-medium">Update Profile Picture:</label>
              <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
              {profilePicture && (
                <Image width={100} height={100} alt="Updated Profile" src={profilePicture} className="mt-2 rounded-full" />
              )}
            </div>

            {/* Option 2: Update Email */}
            <div className="mt-4">
              <label className="block font-medium">Update Email:</label>
              <input
                required
                type="email"
                className="border p-2 w-full"
                placeholder="Enter new email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <button className="bg-green-500 text-white px-4 py-2 mt-2 rounded w-full" onClick={handleUpdateEmail}>
                Save Email
              </button>
            </div>

            {/* Close Modal */}
            <button className="bg-red-500 text-white px-4 py-2 mt-4 rounded w-full" onClick={() => setIsModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;