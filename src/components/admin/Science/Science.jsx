import React, { useEffect, useState } from "react";
import { getCatagoryOut, putApi } from "../../../api/api";
import { Tooltip, BarChart, Bar, XAxis, CartesianGrid } from "recharts";
import studentMarksImg from "../../../assets/studentMark.png";
import loading from "../../../assets/loading.svg";

function Science({ year, currentSem }) {

  const [outComeData, setCourseData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [currentTab, setCurrentTab] = useState("UG"); // State to control the current tab

  useEffect(() => {
    const data = {
      catagory: "Science",
      year: year,
      sem: currentSem,
    };

    getCatagoryOut("staff/getByCategory", setCourseData, data, setIsloading);
  }, [year, currentSem]);

  const avgAttain = (filteredData) => {
    let total = 0;
    filteredData.forEach((item) => {
      total += parseFloat(item.overAtain) || 0;
    });
    return total / filteredData.length || 0;
  };

  // Filter data based on the current tab
  const filteredData = outComeData.filter((item) => {
    if (currentTab === "UG") {
      return item.depCode.startsWith("U");
    } else {
      // Includes PG and other codes
      return !item.depCode.startsWith("U");
    }
  });

  return (
   
    <div className="w-full xl:h-[45rem] 2xl:h-[39rem] overflow-y-auto space-y-2 flex flex-col items-center bg-white rounded-md shadow-md">
      <div className=" w-fit flex justify-start space-x-4 my-4">
        <button
          className={`font-semibold px-2 py-3 ml-10 ${currentTab === "UG" ? "text-white bg-[#2d73ff] rounded-md" : " bg-slate-200 rounded-md font-semibold"}`}
          onClick={() => setCurrentTab("UG")}
        >
          UG - Science
        </button>
        <button
          className={`font-semibold px-2 py-3 ml-10 ${currentTab === "PG" ? "text-white bg-[#2d73ff] rounded-md" : " bg-slate-200 rounded-md font-semibold"}`}
          onClick={() => setCurrentTab("PG")}
        >
          PG - Science
        </button>
      </div>

      {isLoading ? (
        <div className="w-full flex items-center justify-center h-full">
          <img src={loading} alt="" className="w-12" />
        </div>
      ) : filteredData.length !== 0 ? (
        <div className="w-full h-[50rem] space-y-4 flex flex-col items-center overflow-y-scroll">
          <table className="table-auto border-collapse border text-center mt-4 w-[60rem]">
            <thead className="bg-[#4f72cc] text-white">
              <tr>
                <th className="border p-2">S. No.</th>
                <th className="border p-2">Programme</th>
                <th className="border p-2">OBE Level</th>
                <th className="border p-2">Course Outcome</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="font-medium">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{item.depTitle}</td>
                  <td className="border p-2">
                    {item.overAtain !== "NaN"
                      ? item.overAtain < 0.01
                        ? "-"
                        : Number(item.overAtain).toFixed(2)
                      : "-"}
                  </td>
                  <td className="border p-2">
                    {item.overAtain !== "NaN"
                      ? item.overAtain < 0.01
                        ? "-"
                        : item.overAtain < 1.5
                        ? "Low"
                        : item.overAtain > 2.5
                        ? "High"
                        : "Moderate"
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="w-full h-12 flex items-center justify-center space-x-2">
            <h1>Average AttainLevel for Science:</h1>
            <h1>{avgAttain(filteredData).toFixed(2) || 0}</h1>
          </div>

          <div className="mt-4 w-full font-medium text-[#3b84f4] py-3 text-center flex justify-center">
            <BarChart
              width={900}
              height={300}
              data={filteredData.map((item) => ({
                name: item.depTitle,
                value: Number(item.overAtain).toFixed(1),
              }))}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={30}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="value"
                fill="#3b84f4"
                background={{ fill: "#eee" }}
                label={{ position: "top", fill: "white" }}
              />
            </BarChart>
          </div>
        </div>
      ) : (
        <div className="grow w-full" onClick={null}>
          <div className="h-full w-full flex flex-col items-center justify-center text-base font-semibold">
            <div className="w-fit h-fit">
              <img src={studentMarksImg} alt="" className="w-[20rem]" />
              <div className="absolute bottom-[18rem] text-center w-[20rem]">
                <p>No Data Found</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Science;
