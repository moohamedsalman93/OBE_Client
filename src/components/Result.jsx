import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseOutcome from "./Course/CourseOutcome";

export const Result = () => {
  const [selectedOption, setselectedOption] = useState("Students");
  const Navigate = useNavigate();

  return (
    <div className="w-screen h-screen p-5 bg-gradient-to-r from-blue-500 to-green-500 ">
      <div className="w-full h-full flex flex-col bg-white  rounded-lg p-5">

        <div onClick={() => Navigate("/")} className=" cursor-pointer my-4 w-fit px-3 py-2 border-2 border-blue-700  hover:bg-blue-700 hover:text-white hover:scale-110 transition rounded-xl flex items-center space-x-2">
          <ion-icon name="home"></ion-icon>
          <p className=" text-base">Home</p>
        </div>

        <div  className=" space-x-2">

          <button
            className={`p-2  ${selectedOption === "Students"
              ? "bg-[#3b84f4] text-white "
              : "bg-slate-200"
              } rounded-md`}
            onClick={() => setselectedOption("Students")}
          >
            Students
          </button>

          <button
            className={`p-2  ${selectedOption === "Courses"
              ? "bg-[#3b84f4] text-white "
              : "bg-slate-200"
              } rounded-md`}
            onClick={() => setselectedOption("Courses")}
          >
            Courses
          </button>

          <button
            className={`p-2  ${selectedOption === "Programs"
              ? "bg-[#3b84f4] text-white "
              : "bg-slate-200"
              } rounded-md`}
            onClick={() => setselectedOption("Programs")}
          >
            Programs
          </button>

        </div>

        {selectedOption === "Students" && (
          <div>
            <div className=" flex justify-end items-center mt-5 space-x-5">
              <span className="flex items-center space-x-5">
                <h1>Department :</h1>
                <input
                  type="text"
                  placeholder="Deparment"
                  className=" border-2 p-2 rounded-md"
                />
              </span>
              <span className="flex items-center space-x-5">
                <h1>Reg No :</h1>
                <input
                  type="text"
                  placeholder="Reg no"
                  className=" border-2 p-2 rounded-md"
                />
              </span>
              <button className=" bg-[#3b84f4] py-2 px-4 rounded-md text-white">
                Get
              </button>
            </div>
            <div className="flex justify-center items-center">
              No data found
            </div>
          </div>
        )}
        {selectedOption === "Courses" && <CourseOutcome/> }
        {selectedOption === "Programs" && <div>Programs</div>}
      </div>
    </div>
  );
};
