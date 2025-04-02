import React, { useState } from "react";

const Project = () => {

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

    //   setTimeout(() => {
    //     setActiveTab(false);
    //   }, 1000);
    } else {
      alert("Please fill all fields.");
    }
  };
  return (
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
  );
};

export default Project;
