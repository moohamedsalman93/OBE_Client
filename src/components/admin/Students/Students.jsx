import React, { useEffect, useRef, useState } from 'react'
import { putApi2 } from '../../../api/api';
import { debounce } from 'lodash';
import loading from "../../../assets/loading.svg";
import studentMarksImg from "../../../assets/studentMark.png";

function Students() {
    const [regNo, setRegNo] = useState("");
    const [isLoading1, setIsLoading1] = useState(false)
    const [outComeData, setOutcomeData] = useState([]);


    //#region handleGet
    const handleGet = () => {
        putApi2(`staff/getStudent`, setOutcomeData, { RegNO: regNo }, setIsLoading1).then(res => {
           
        })
    }
    //#endregion

    useEffect(() => {
        console.log(outComeData)
    }, [])


    return (
        <div className=' w-full h-full p-5'>
            <div className=" flex justify-start items-center space-x-5">


                <span className="flex items-center space-x-2">
                    <h1>Register No :</h1>
                    <input type="text" placeholder='23MCAXXX' value={regNo} onChange={(e) => setRegNo(e.target.value)} className='border-2 p-2 rounded-md' />
                </span>

                <button className=" bg-[#3b84f4] py-2 px-4 rounded-md text-white" onClick={handleGet}>
                    Get
                </button>
                <div className=' grow  h-12 flex justify-end items-center'>
                    <div className=' w-fit flex px-3 py-1 border-2 text-gray-700 cursor-pointer rounded-md'>
                        Print
                    </div>
                </div>
            </div>

            {outComeData.length !== 0 ?
                (<div className=" px-5 flex w-full flex-col justify-start space-y-4 items-center py-6">
                    <p className=' font-semibold text-xl text-gray-700'>Student OutCome for {regNo}</p>

                    <table className="table-auto rounded-md border mt-2">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="px-4 py-2 border">Courses Name</th>
                                <th className="px-4 py-2 border">CIA</th>
                                <th className="px-4 py-2 border">ESE</th>
                                <th className="px-4 py-2 border">ALL</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>

                                <th className="border px-4 py-2 bg-[#e2e8f0]">{outComeData?.code?.name}</th>

                                <td className="border px-4 py-2">{outComeData?.above40TCO?.TCO1}</td>
                                <td className="border px-4 py-2">{outComeData?.above40TCO?.TCO2}</td>
                                <td className="border px-4 py-2">{outComeData?.above40TCO?.TCO3}</td>

                            </tr>
                            <tr>
                                <th className="border px-4 py-2 bg-[#e2e8f0]">Percentage</th>
                                <td className="border px-4 py-2">{outComeData?.percentages?.TCO1}</td>
                                <td className="border px-4 py-2">{outComeData?.percentages?.TCO2}</td>
                                <td className="border px-4 py-2">{outComeData?.percentages?.TCO3}</td>

                            </tr>
                            <tr>
                                <th className="border px-4 py-2 bg-[#e2e8f0]">Attainment level</th>
                                <td className="border px-4 py-2">{outComeData?.attainLevels?.TCO1}</td>
                                <td className="border px-4 py-2">{outComeData?.attainLevels?.TCO2}</td>
                                <td className="border px-4 py-2">{outComeData?.attainLevels?.TCO3}</td>

                            </tr>
                        </tbody>
                    </table>

                </div>)
                :
                (
                    <div className=' mt-5'>
                        <div className="h-full w-full flex flex-col items-center justify-center text-base font-semibold">
                            <div className="w-fit h-fit relative">
                                <img src={studentMarksImg} alt="" className=" w-[20rem] " />
                                <div className=" absolute bottom-[9rem] text-center">
                                    <p>Enter Department and Course code to get</p>
                                    <p>Course OutCome</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default Students
