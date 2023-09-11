import React from "react";
import results from "../assets/results.png";
import marks from "../assets/add marks.png";
import course from "../assets/add cources.png";
import logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";

function Home() {

  const Navigate = useNavigate();

  return (
    <div className=" w-screen h-screen p-10 bg-gradient-to-r from-blue-500 to-green-500">
      <div className="w-full bg-white  rounded-lg">

        <div className=" bg-[#D7EAFF] flex justify-between items-center p-5 rounded-t-lg">
          <div className=" flex">
            <img src={logo} alt="no img"></img>
            <h1 class="text-black text-[18px] font-medium flex flex-col justify-center items-center">
              JAMAL MOHAMED COLLEGE
              <h1 className="text-black text-[18px] font-normal flex">
                (Autonomous)
              </h1>
              <p className="font-medium"> TIRUCHIRAPPALLI </p>
            </h1>
          </div>
          <div className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-[#3b84f4]">
            <h1 className="text-white">jmc</h1>
          </div>
        </div>  
        <div className=" w-full py-[150px] flex justify-center items-center space-x-10">
          <div className="flex flex-col justify-center items-center space-y-3 cursor-pointer" onClick={()=>Navigate("/result")}>
            <div className="w-[100px] h-[100px] bg-[#3b84f4] rounded-lg p-2">
              <img src={results} alt="no img" />
            </div>
            <h1 className=" font-medium ">Results</h1>
          </div>
          <div className="flex flex-col justify-center items-center space-y-3 cursor-pointer" onClick={()=>Navigate("/addmarks")}>
            <div className="w-[100px] h-[100px] bg-[#3b84f4] rounded-lg p-2">
              <img src={marks} alt="no img" />
            </div>
            <h1 className=" font-medium ">Add Marks</h1>
          </div>
          <div className="flex flex-col justify-center items-center space-y-3 cursor-pointer">
            <div className="w-[100px] h-[100px] bg-[#3b84f4] rounded-lg p-2">
              <img src={course} alt="no img" />
            </div>
            <h1 className=" font-medium ">Add course</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
