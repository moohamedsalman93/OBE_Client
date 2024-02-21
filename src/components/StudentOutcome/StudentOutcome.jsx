import React, { useEffect, useState } from "react";
import { getApi, getStudentOutcomeApi } from "../../api/api";
import loading from "../../assets/loading.svg";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const StudentOutcome = ({ userId, year, currentSem }) => {

  const [courseCode, setCourseCode] = useState("");
  const [StudentData, setStudentData] = useState([]);
  const [isLoading1, setIsLoading1] = useState(false);
  const [outComeData, setOutcomeData] = useState([]);
  const [low, setlow] = useState(0);
  const [med, setmedium] = useState(0);
  const [high, sethigh] = useState(0);

  //#region useEffect
  useEffect(() => {
    getApi(
      `staff/getStaffsDetails?uname=${userId}&sem=${currentSem}&year=` + year,
      setStudentData,
      setIsLoading1
    );
  }, []);
  //#endregion

  //#region handleGet
  const handleGet = () => {
    const data = {
      department: courseCode.split("-")[1],
      code: courseCode.split("-")[0],
      year: year,
    };
    getStudentOutcomeApi(
      `staff/EachStudentOutcome?code=${data.code}&dep=${data.department}&sem=${currentSem}&year=${year}`,
      setOutcomeData
    ).then((res) => {

    });
    setlow(0)
    setmedium(0)
    sethigh(0)
  };
  //#endregion

  useEffect(() => {
    outComeData.forEach(item => {
      if (item?.averageAttainLevel?.attain.toFixed(2) > 2.5) {
        sethigh(prevHigh => prevHigh + 1);
      } else if (item?.averageAttainLevel?.attain.toFixed(2) < 1.5) {
        setlow(prevLow => prevLow + 1);
      } else {
        setmedium(prevMed => prevMed + 1);
      }
    });
  }, [outComeData]);


  return (
    <div className=" w-full h-full p-5 overflow-hidden">

      <div className=" flex justify-start items-center space-x-5">
        <span className="flex items-center space-x-2">
          <h1 className=" font-medium">Course Code :</h1>
          <select
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            className={` border-2 h-[2.8rem] rounded-md px-2 ${courseCode === "" ? "text-gray-400" : "text-black font-medium"
              }`}
          >
            <option value="">Select Code</option>

            {StudentData.map((course, index) => (
              <option
                key={index}
                value={
                  course.code.code + "-" + course.code.department.departmentCode
                }
              >
                {course.code.code + "-" + course.code.department.departmentCode}
              </option>
            ))}
          </select>
        </span>

        <button
          className=" bg-[#4f72cc] py-2 px-4 rounded-md text-white"
          onClick={handleGet}
        >
          Get
        </button>
      </div>

      <div className="w-full flex flex-col items-center py-4 mt-5 space-y-4 overflow-y-auto xl:h-[47rem]">



        <div className=' w-full grow flex flex-col items-center py-2'>
          <div className=' text-start w-[75%] px-4 font-semibold  grid gap-2 grid-cols-7 h-12 bg-slate-300 place-content-center place-items-center rounded-lg'>
            <p className=' text-start w-full'>S. No.</p>
            <p className=' text-start w-full col-span-2'>Register No</p>
            <p className=' text-start w-full'>LOT</p>
            <p className=' text-start w-full'>MOT</p>
            <p className=' text-start w-full'>HOT</p>
            <p className=' text-start w-full'>Attainment</p>
          </div>
          <div className=" w-[75%] mt-2 overflow-y-auto flex flex-col justify-start items-center h-[32rem] ">
            {isLoading1 ? <img src={loading} alt="" className=' h-12 w-12 absolute top-1/2' /> : (outComeData.length === 0 ? <div className=' font-medium mt-5'>No Data found</div> :
              outComeData.map((item, index) =>
                <div key={index} className={` text-start w-full px-4 font-medium text-sm gap-2 grid grid-cols-7 min-h-[45px] border-b place-content-center place-items-center ${index % 2 === 0 ? 'bg-slate-200' : ''}`}>
                  <p className=' text-start w-full'>{index + 1}</p>
                  <p className=" w-full text-start col-span-2">{item?.reg}</p>
                  <p className=' text-start w-full'>{item?.averageAttainLevel?.Mot.toFixed(2)}</p>
                  <p className=' text-start w-full'>{item?.averageAttainLevel?.Lot.toFixed(2)}</p>
                  <p className=' text-start w-full'>{item?.averageAttainLevel?.Hot.toFixed(2)}</p>
                  <p className=' text-start w-full'>{item?.averageAttainLevel?.attain.toFixed(2)}</p>
                </div>

              )
            )
            }
          </div>

        </div>

        {outComeData.length !== 0 && (
          <div className="w-full flex justify-evenly mt-10">

            <div className="w-[180px] space-y-2">
              <CircularProgressbar value={low} maxValue={outComeData.length} text={low} styles={{
                path: {
                  stroke: 'red',
                },
                text: {
                  fill: 'red',
                },
              }} />
              <p className=" w-full text-center font-medium text-red-600">Low</p>
            </div>

            <div className="w-[180px]">
              <CircularProgressbar value={med} maxValue={outComeData.length} text={med}  styles={{
                path: {
                  stroke: 'orange',
                },
                text: {
                  fill: 'orange',
                },
              }} />
               <p className=" w-full text-center font-medium text-orange-400">Modurate</p>
            </div>

            <div className="w-[180px]">
              <CircularProgressbar value={high} maxValue={outComeData.length} text={high} styles={{
                path: {
                  stroke: 'green',
                },
                text: {
                  fill: 'green',
                },
              }} />
               <p className=" w-full text-center font-medium text-green-800">High</p>
            </div>

          </div>
        )}

      </div>


    </div>
  );
};
