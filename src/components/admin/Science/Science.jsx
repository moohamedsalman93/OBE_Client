import React, { useEffect, useState } from "react";
import { getCatagoryOut } from "../../../api/api";
import studentMarksImg from "../../../assets/studentMark.png";
import loading from "../../../assets/loading.svg";
import {
  Card,
  CardBody
} from "@material-tailwind/react";
import Chart from "react-apexcharts";

function Science({ year, currentSem }) {

  const [outComeData, setCourseData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [currentTab, setCurrentTab] = useState("All"); // Set default tab to "All"
  const [Data, setData] = useState([0, 2])


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
    } else if (currentTab === "PG") {
      return !item.depCode.startsWith("U");
    } else {
      return true; // Show all records for "All" tab
    }
  });


  useEffect(() => {
    const newData = filteredData.map(item =>
      item.overAtain !== "NaN" ? Number(item.overAtain).toFixed(2) : 0
    );
    setData(newData);
  }, [currentTab]);


  const chartConfig = {
    type: "bar",
    height: 250,
    series: [
      {
        name: "Sales",
        data: Data
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#6777ef", "#FF5733", "#66FF66", "#2563eb", "#ffa528"], // This is now moved to plotOptions.bar.colors
      plotOptions: {
        bar: {
          columnWidth: "10%",
          borderRadius: 2,
          distributed: true, // Enable distributed mode
          colors: {
            backgroundBarColors: [], // Optional: Use if you want to set background colors for the bars
            backgroundBarOpacity: 1,
            colors: ["#6777ef", "#FF5733", "#66FF66", "#2563eb", "#ffa528"],  // Define colors for each bar here
          },
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        // labels: {
        //   style: {
        //     colors: "#616161",
        //     fontSize: "14px",
        //     fontFamily: "inherit",
        //     fontWeight: 400,
        //   },
        // },
        categories: filteredData.map(item => item.depCode),
      },
      yaxis: {
        // labels: {
        //   style: {
        //     colors: "#616161",
        //     fontSize: "12px",
        //     fontFamily: "inherit",
        //     fontWeight: 400,
        //   },
        // },

      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  return (

    <div className="w-full xl:h-[45rem] 2xl:h-[39rem] overflow-y-auto space-y-2 flex flex-col items-center bg-white rounded-md shadow-md">
      <div className=" w-fit flex justify-start space-x-4 my-4 h-fit">
      <button
          className={`font-semibold h-10 px-2 ${
            currentTab === "All"
              ? "text-white bg-[#4f72cc] rounded-md"
              : " bg-slate-200 rounded-md font-semibold"
          }`}
          onClick={() => setCurrentTab("All")}
        >
          All - Science
        </button>
        <button
          className={`font-semibold  h-10 px-2 ${currentTab === "UG" ? "text-white bg-[#4f72cc] rounded-md" : " bg-slate-200 rounded-md font-semibold"}`}
          onClick={() => setCurrentTab("UG")}
        >
          UG - Science
        </button>
        <button
          className={`font-semibold h-10 px-2 ${currentTab === "PG" ? "text-white bg-[#4f72cc] rounded-md" : " bg-slate-200 rounded-md font-semibold"}`}
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


        <div className=' w-full grow flex flex-col items-center py-2'>

          <div className=' text-start w-[75%] px-4 font-semibold  grid gap-2 grid-cols-5 h-12 bg-slate-300 place-content-center place-items-center rounded-lg'>
            <p className=' text-start w-full'>S. No.</p>
            <p className=' text-start w-full col-span-2'>Programme</p>
            <p className=' text-start w-full'>OBE Level</p>
            <p className=' text-start w-full'>Course Outcome</p>
          </div>
          <div className=" w-[75%] mt-2 overflow-y-auto flex flex-col justify-start items-center h-[32rem] ">
            {
              filteredData.map((item, index) =>
                <div key={index} className={` text-start w-full px-4 font-medium text-sm gap-2 grid grid-cols-5 min-h-[45px] border-b place-content-center place-items-center ${index % 2 === 0 ? 'bg-slate-200' : ''}`}>
                  <p className=' text-start w-full'>{index + 1}</p>
                  <p className=" w-full text-start col-span-2">{item.depTitle}</p>
                  <p className=' text-start w-full'> {item.overAtain !== "NaN"
                    ? item.overAtain < 0.01
                      ? "-"
                      : Number(item.overAtain).toFixed(2)
                    : "-"}</p>
                  <p className=' text-start w-full'> {item.overAtain !== "NaN"
                    ? item.overAtain < 0.01
                      ? "-"
                      : item.overAtain < 1.5
                        ? "Low"
                        : item.overAtain > 2.5
                          ? "High"
                          : "Moderate"
                    : "-"}</p>
                </div>


              )
            }
          </div>

          <div className="w-full h-12 flex items-center justify-center space-x-2 font-bold">
            <h1>Average AttainLevel for Science:</h1>
            <h1>{avgAttain(filteredData).toFixed(2) || 0}</h1>
          </div>

          <Card className=" w-full h-[40rem]">

            <CardBody className="px-2 pb-0">
              <Chart {...chartConfig} />
            </CardBody>
          </Card>

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
