import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseOutcome from "./Course/CourseOutcome";
import StudentsOutcomes from "./Students/StudentsOutcomes";


const TabBar = ({name,selectedOption,setselectedOption}) => {
  return <button
    className={`p-2  ${selectedOption === name
      ? "bg-[#3b84f4] text-white "
      : "bg-slate-200"
      } rounded-md`}
    onClick={() => setselectedOption(name)}
  >
    {name}
  </button>
}

export const Result = () => {
  const [selectedOption, setselectedOption] = useState("Students");
  const Navigate = useNavigate();

  const options = ["Students","Courses","Programs","Arts","Science"]

  return (
    <div className="w-screen h-screen p-5 bg-gradient-to-r from-blue-500 to-green-500 ">
      <div className="w-full h-full flex flex-col bg-white  rounded-lg p-5">

        <div onClick={() => Navigate("/")} className=" cursor-pointer my-4 w-fit px-3 py-2 border-2 border-blue-700  hover:bg-blue-700 hover:text-white hover:scale-110 transition rounded-xl flex items-center space-x-2">
          <ion-icon name="home"></ion-icon>
          <p className=" text-base">Home</p>
        </div>

        <div className=" space-x-2">

        {
          options.map((item,index)=> <TabBar name={item} selectedOption={selectedOption} setselectedOption={setselectedOption}  key={index}/>)
        }

        </div>

        {selectedOption === "Students" && <StudentsOutcomes/>}

        {selectedOption === "Courses" && <CourseOutcome />}
        {selectedOption === "Programs" && <div>Programs</div>}
        {selectedOption === "Science" && <div>Science</div>}
        {selectedOption === "Arts" && <div>Arts</div>}
      </div>
    </div>
  );
};
