import React, { useState } from "react";

import studentMarksImg from "../../assets/studentMark.png";

import { putApi } from "../../api/api";
import toast from "react-hot-toast";

function StudentsOutcomes() {
    const [regNo, setRegNo] = useState("");

    const [data, setdata] = useState([]);
    const [OutcomeData, setOutcomeData] = useState([]);
    const [isLoading1, setIsLoading1] = useState(false)

   

    const dataArray = Object.values(OutcomeData).map((item, index) => ({
        index: index + 1,
        courseCode: item.courseCode,
        courseName: item.courseName,
        FinalLevel: item.FinalLevel,
        finalESELevel: item.finalESELevel,
        overAll: item.overAll
    }));


    //#region handleGet
    const handleGet = () => {
        const data = {
            regNo: regNo,
        }
        putApi(`staff/getByStudent`, setOutcomeData, data, setIsLoading1).then(res => {
            console.log(res)
        })
    }
    //#endregion



    return (
        <div className=" h-full w-full flex flex-col overscroll-y-auto">
            <div onClick={() => { console.log(OutcomeData) }} className=" flex justify-end items-center space-x-5">
                <div
                    className=" w-[19rem] relative flex items-center justify-end space-x-2"

                >
                    <h1 className="">Register No :</h1>
                    <input
                        type="text"
                        value={regNo}
                        onChange={(e) => setRegNo(e.target.value)}
                        placeholder="Eg: 23MCA001"
                        className="border-2 p-2 rounded-md"
                    />
                </div>

                <button
                    className=" bg-[#3b84f4] py-2 px-4 rounded-md text-white"
                    onClick={handleGet}
                >
                    Get
                </button>
            </div>

            {OutcomeData.length !== 0 ? (
                <div className=" flex flex-col mt-10 items-center">
                    {data.length === 1 ? (
                        <div className=" flex justify-center items-center">
                            No data found{" "}
                        </div>
                    ) : (
                        <table>
                            <thead>
                                <tr className=' border rounded-lg bg-[#3b84f4] text-white'>
                                    <th className="px-4 py-2" >S no</th>
                                    <th className="px-4 py-2" >Course Code</th>
                                    <th className="px-4 py-2" >Course Name</th>
                                    <th className="px-4 py-2" >CIA AttainLevel</th>
                                    <th className="px-4 py-2" >ESE AttainLevel</th>
                                    <th className="px-4 py-2" >overAll AttainLevel</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    dataArray.map((item, index) => (
                                        <tr className="border rounded-lg text-black text-center" key={index}>
                                            <td className="px-4 py-2" >{index + 1}</td>
                                            <td className="px-4 py-2" >{item.courseCode}</td>
                                            <td className="px-4 py-2" >{item.courseName}</td>
                                            <td className="px-4 py-2" >{item.FinalLevel}</td>
                                            <td className="px-4 py-2" >{item.finalESELevel}</td>
                                            <td className="px-4 py-2" >{item.overAll}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>
                    )}
                </div>
            ) : (
                <div className=" grow  w-full" onClick={null}>
                    <div className="h-full w-full flex flex-col items-center justify-center text-base font-semibold">
                        <div className="w-fit h-fit">
                            <img src={studentMarksImg} alt="" className=" w-[20rem] " />
                            <div className=" absolute bottom-[9rem] text-center w-[20rem]">
                                <p>Register No to get</p>
                                <p>Course OutCome</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StudentsOutcomes;