import React, { useState } from "react";

export const Result = () => {
  const [selectedOption, setselectedOption] = useState("Students");

  return (
    <div className="w-screen h-screen p-5 bg-gradient-to-r from-blue-500 to-green-500 ">
      <div className="w-full bg-white  rounded-lg p-5">
        <div className=" cursor-pointer">
          <ion-icon name="arrow-back-outline"></ion-icon>
        </div>
        <div>
          <button
            className={`p-2  ${selectedOption === "Students"
                ? "bg-[#3b84f4] text-white rounded-md"
                : "bg-slate-200"
              }`}
            onClick={() => setselectedOption("Students")}
          >
            Students
          </button>
          <button
            className={`p-2  ${selectedOption === "Courses"
                ? "bg-[#3b84f4] text-white rounded-md"
                : "bg-slate-200"
              }`}
            onClick={() => setselectedOption("Courses")}
          >
            Courses
          </button>
          <button
            className={`p-2  ${selectedOption === "Programs"
                ? "bg-[#3b84f4] text-white rounded-md"
                : "bg-slate-200"
              }`}
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
        {selectedOption === "Courses" && (
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
                <h1>Course Code :</h1>
                <input
                  type="text"
                  placeholder="Course code"
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
        {selectedOption === "Programs" && <div>Programs</div>}
      </div>
    </div>
  );
};
