import React, { useEffect, useState } from "react";

interface FormData {
  startTime: string;
  endTime: string;
  project: string;
}

const RecordData = () => {
  const [dataList, setDataList] = useState<FormData[]>([]);
  console.log("Data List Length:", dataList.length , dataList);

  useEffect(() => {
    const savedData = localStorage.getItem("project");
    console.log("Raw localStorage Data:", savedData);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        console.log("Parsed Data:", parsedData);
        setDataList(parsedData);
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        setDataList([]); // Set to empty array if parsing fails
      }
    } else {
      setDataList([]); // Set to empty array if no data found
    }
  }, []);

  return (
    <div className="p-4 border border-gray-300 rounded-md">
      {dataList.length > 0 ? (
        <div>
          <h2 className="font-semibold text-lg mb-2">Saved Data</h2>
          {dataList.map((data, index) => (
            <div key={index} className="mb-4">
              <p>
                <strong>Start Time:</strong> {data.startTime}
              </p>
              <p>
                <strong>End Time:</strong> {data.endTime}
              </p>
              <p>
                <strong>Project:</strong> {data.project}
              </p>
              <hr className="my-2 border-t border-gray-300" />
            </div>
          ))}
        </div>
      ) : (
        <p>No saved data found.</p>
      )}
    </div>
  );
};

export default RecordData;
