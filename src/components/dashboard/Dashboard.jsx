import React, { useEffect, useState } from "react";
import { PiStudentFill } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import CountUp from "react-countup";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { VscGraph } from "react-icons/vsc";

function Dashboard() {
  const chartConfig = {
    type: "bar",
    height: 250,
    series: [
      {
        name: "Sales",
        data: [2, 1, 3, 2.5, 1],
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
      colors: ["#6777ef", "#FF5733", "#66FF66","#2563eb","#ffa528"], // This is now moved to plotOptions.bar.colors
      plotOptions: {
        bar: {
          columnWidth: "30%",
          borderRadius: 2,
          distributed: true, // Enable distributed mode
          colors: {
            backgroundBarColors: [], // Optional: Use if you want to set background colors for the bars
            backgroundBarOpacity: 1,
            colors: ["#6777ef", "#FF5733", "#66FF66","#2563eb","#ffa528"],  // Define colors for each bar here
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
        labels: {
          style: {
            colors: "#616161",
            fontSize: "14px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "UG - Arts",
          "UG - Science",
          "PG - Arts",
          "PG - Science",
          "Over All",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
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

  const outcomesData = [
    {
      title: "Course Outcome",
      values: [
        { label: "CIA I", value: 253, maxValue: 280 },
        { label: "CIA II", value: 197, maxValue: 280 },
      ],
    },
    {
      title: "Other Component",
      values: [
        { label: "OC I", value: 140, maxValue: 280 },
        { label: "OC II", value: 100, maxValue: 280 },
      ],
    },
    {
      title: "End Semester",
      values: [{ label: "ESE", value: 55, maxValue: 280 }],
    },
  ];

  return (
    <div className="p-5">
      <div className=" flex space-x-5">
        <div className=" w-[300px] flex justify-between items-center bg-white rounded-lg shadow-lg p-4">
          <div>
            <Typography variant="h6" color="blue-gray">
              Total Students
            </Typography>
            <CountUp
              end={4110}
              duration={2}
              separator=","
              className="text-[28px] font-bold"
            />
          </div>
          <div className=" text-[40px]">
            <h1 className=" font-semibold text-[#3b4ac2]">
              <PiStudentFill />
            </h1>
          </div>
        </div>
        <div className=" w-[300px] flex justify-between items-center bg-white rounded-lg shadow-lg p-4">
          <div>
            <Typography variant="h6" color="blue-gray">
              Total Staffs
            </Typography>
            <CountUp
              end={455}
              duration={2}
              separator=","
              className="text-[28px] font-bold"
            />
          </div>
          <div className=" text-[40px]">
            <h1 className=" font-semibold text-[#00cd00]">
              <FaUsers />
            </h1>
          </div>
        </div>
        <div className=" w-[300px] flex justify-between items-center bg-white rounded-lg shadow-lg p-4">
          <div>
            <Typography variant="h6" color="blue-gray">
              Total Course
            </Typography>
            <CountUp
              end={280}
              duration={2}
              separator=","
              className="text-[28px] font-bold"
            />
          </div>
          <div className=" text-[35px]">
            <h1 className=" text-[#ffa528]">
              <FaBook />
            </h1>
          </div>
        </div>
        <div className=" w-[300px] flex justify-between items-center bg-white rounded-lg shadow-lg p-4">
          <div>
            <Typography variant="h6" color="blue-gray">
              Total Programme
            </Typography>
            <CountUp
              end={43}
              duration={2}
              separator=","
              className="text-[28px] font-bold"
            />
          </div>
          <div className=" text-[40px]">
            <h1 className=" font-semibold text-[#6777ef]">
              <MdDashboard />
            </h1>
          </div>
        </div>
      </div>
      <div className=" w-full flex justify-between items-center space-x-3">
        <div className=" w-full h-full mt-5">
          <Card>
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
              <div className="w-max rounded-lg bg-[#6777ef] p-3 text-[20px] text-white">
                <VscGraph />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray">
                  Programme Outcomes
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="max-w-sm font-normal"
                >
                  UG - PG Arts and Science for attainment level on a 3-point
                  scale
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="px-2 pb-0">
              <Chart {...chartConfig} />
            </CardBody>
          </Card>
        </div>
        <Card className="w-full h-full bg-white  px-4 mt-5">
          {outcomesData.map((outcome, index) => (
            <div key={index} className="w-full mt-5">
              <div className="flex justify-between items-start">
                {/* Left side: Outcome Title */}
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className=" flex justify-center items-center h-full  w-[100px]"
                >
                  {outcome.title}
                </Typography>

                {/* Right side: Progress Bars */}
                <div className="w-full ml-4">
                  {" "}
                  {/* Adjust 'ml-4' as needed for spacing */}
                  {outcome.values.map((item, itemIndex) => (
                    <div key={itemIndex} className="mb-4 ">

                      <div className="flex items-center justify-between gap-4 mb-2">
                        <Typography
                          color="blue-gray"
                          variant="h6"
                          className="w-[140px]"
                        >
                          {" "}
                          {/* Adjust width as needed */}
                          {item.label}
                        </Typography>
                        <Typography color="blue-gray" variant="h6">
                          <CountUp end={item.value} duration={2} /> /{" "}
                          {item.maxValue} (
                          <CountUp
                            end={Math.round((item.value / item.maxValue) * 100)}
                            duration={2}
                          />
                          %)
                        </Typography>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-[#a8b6fe]">
                        <div
                          style={{
                            width: ` ${(item.value / item.maxValue) * 100}%`,
                          }}
                          className="bg-blue-600 h-3 rounded-full transition-all ease-out duration-1000"
                        >

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
          }
        </Card>
      </div >
    </div >
  );
}

export default Dashboard
