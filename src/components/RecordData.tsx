import { ArrowIcon, TableClockIcon } from "@/utils/icons";
import React, { useEffect, useState } from "react";

interface FormData {
  startTime: string;
  endTime: string;
  project: string;
}

const RecordData = () => {
  const [dataList, setDataList] = useState<FormData[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem("project");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setDataList(parsedData);
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        setDataList([]);
      }
    }
  }, []);

  return (
    <div className="mt-[25px]">
      {dataList.length > 0 ? (
        <div>
          <div className="max-h-[280px] overflow-y-auto">
            <table className="">
              <thead>
                <tr>
                  <th className="pl-1.5 text-left font-medium text-[10px] leading-[175%]">
                    Start Time
                  </th>
                  <th className="pl-6 text-left font-medium text-[10px] leading-[175%]">
                    End Time
                  </th>
                  <th className="pl-6 text-left font-medium text-[10px] leading-[175%]">
                    Project
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataList.map((data, index) => (
                  <tr
                    key={index}
                    className="border-b-[0.5px] border-solid border-black/12 !min-w-[360px]"
                  >
                    <td className="pt-[11px] pb-1 text-black/70 text-xs leading-[170%] flex items-center gap-1 pl-1.5">
                      <TableClockIcon />
                      {data.startTime}
                      <span className="translate-x-3">
                        <ArrowIcon />
                      </span>
                    </td>
                    <td className="pl-6 pt-[11px] pb-1 text-black/70 text-xs leading-[170%]">
                      {data.endTime}
                      <span className="pl-5 translate-x-7 border-r border-solid border-black/33"></span>
                    </td>
                    <td className="pl-6 pt-[11px] pb-1 text-black/70 text-xs leading-[170%]">
                      {data.project}
                    </td>
                    <td className="w-full"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-center leading-[170%]">No saved data found.</p>
      )}
    </div>
  );
};

export default RecordData;
