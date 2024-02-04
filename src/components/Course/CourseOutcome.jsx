import React, { useEffect, useRef, useState } from 'react'
import { getApi, putApi, searchData } from '../../api/api';
import { debounce } from 'lodash';
import loading from "../../assets/loading.svg";
import studentMarksImg from "../../assets/studentMark.png";

function CourseOutcome({ userId,year,currentSem }) {

    const dropdownRef2 = useRef(null);
    const [courseCode, setCourseCode] = useState("");
    const [CourseData, setCourseData] = useState([]);
    const [isLoading1, setIsLoading1] = useState(false);
    const [outComeData, setOutcomeData] = useState([]);


    //#region useEffect
    useEffect(() => {
        getApi(`staff/getStaffsDetails?uname=${userId}&sem=${currentSem}&year=`+year, setCourseData, setIsLoading1)
    }, []);
    //#endregion

    //#region handleGet
    const handleGet = () => {
        const data = {
            department: courseCode.split('-')[1],
            code: courseCode.split('-')[0],
            year:year
        }
        putApi(`staff/getMarks`, setOutcomeData, data, setIsLoading1).then(res => {
            console.log(res)
        })
    }
    //#endregion


    return (
        <div className=' w-full h-full p-5'>
            <div className=" flex justify-start items-center space-x-5">

                <span className="flex items-center space-x-2">
                    <h1 className=' font-medium'>Course Code :</h1>
                    <select
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                        className={` border-2 h-[2.8rem] rounded-md px-2 ${courseCode === '' ? 'text-gray-400' : 'text-black font-medium'}`}
                    >
                        <option value=''>
                            Select Code
                        </option>

                        {CourseData.map((course, index) => (
                            <option key={index} value={course.code.code + '-' + course.code.department.departmentCode}>
                                {course.code.code + '-' + course.code.department.departmentCode}
                            </option>
                        ))}
                    </select>
                </span>

                <button className=" bg-[#4f72cc] py-2 px-4 rounded-md text-white" onClick={handleGet}>
                    Get
                </button>
            </div>

            {outComeData.length !== 0 ?
                (<div className=" px-5">

                    <div className=' w-full flex'>

                        <div className=" w-[50%] space-y-16">
                            <div className="mt-10">
                                <h1 className=" font-medium">CIA Attainment</h1>
                                {/* CIA I */}
                                <div>
                                    {/* <h1 className="py-2">CIA I</h1> */}
                                    <table className="table-auto rounded-md border mt-2">
                                        <thead className="bg-black text-white">
                                            <tr>
                                                <th className="px-4 py-2 border"></th>
                                                <th className="px-4 py-2 border">LOT</th>
                                                <th className="px-4 py-2 border">MOT</th>
                                                <th className="px-4 py-2 border">HOT</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>

                                                <th className="border px-4 py-2 bg-[#e2e8f0]">No of student above 60%</th>

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
                                </div>
                            </div>
                            <div>
                                <h1 className=" font-medium">Overall CO Attainment</h1>

                                <table className="table-auto rounded-md border mt-2">
                                    <thead className="bg-black text-white">
                                        <tr>
                                            <th className="px-4 py-2 border">LOT</th>
                                            <th className="px-4 py-2 border">MOT</th>
                                            <th className="px-4 py-2 border">HOT</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>

                                            <td className="border px-4 py-2">{outComeData?.overAll?.CO1}</td>
                                            <td className="border px-4 py-2">{outComeData?.overAll?.CO2}</td>
                                            <td className="border px-4 py-2">{outComeData?.overAll?.CO3}</td>

                                        </tr>
                                    </tbody>
                                </table>

                                <h1 className=" px-4 pt-5 "><span className=' font-medium text-[18px]'>Total no of student :</span> {Math.round(outComeData?.totalStudents)}</h1>
                                <h1 className=" px-4 py-2 "><span className=' font-medium text-[18px]'>Course Attainment Level :</span> {outComeData?.averageAttainLevel}
                                    <span className={` font-bold px-2 ${outComeData?.averageAttainLevel < 1.5 ? ' text-red-600 ' : (outComeData?.averageAttainLevel > 2.5 ? ' text-green-600' : ' text-yellow-600')}`}>
                                        {outComeData?.averageAttainLevel < 1.5 ? 'Low' : (outComeData?.averageAttainLevel > 2.5 ? 'High' : 'Moderate')}
                                    </span>
                                </h1>
                                <h1 className=" px-4 "><span className=' font-medium text-[18px]'>Course Attainment Level - Direct Method (80%) :</span> {(outComeData?.direct80).toFixed(2)}</h1>
                                <h1 className=" px-4 "><span className=' font-medium text-[18px]'>The Mean PSA refers the PSO for that course :</span> {(outComeData?.direct80).toFixed(2)}</h1>
                            </div>


                        </div>

                        <div className=" w-[50%] space-y-16">
                            <div className="mt-10">
                                <h1 className=" font-medium">ESE Attainment</h1>
                                <div>
                                    <table className="table-auto rounded-md border mt-2">
                                        <thead className="bg-black text-white">
                                            <tr>
                                                <th className="px-4 py-2 border"></th>
                                                <th className="px-4 py-2 border">LOT</th>
                                                <th className="px-4 py-2 border">MOT</th>
                                                <th className="px-4 py-2 border">HOT</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th className="border px-4 py-2 bg-[#e2e8f0]">No of student above 60%</th>
                                                <td className="border px-4 py-2">{outComeData?.above40ESECO?.ESECO1}</td>
                                                <td className="border px-4 py-2">{outComeData?.above40ESECO?.ESECO2}</td>
                                                <td className="border px-4 py-2">{outComeData?.above40ESECO?.ESECO3}</td>

                                            </tr>
                                            <tr>
                                                <th className="border px-4 py-2 bg-[#e2e8f0]">Percentage</th>
                                                <td className="border px-4 py-2">{outComeData?.percentagesESECO?.ESECO1}</td>
                                                <td className="border px-4 py-2">{outComeData?.percentagesESECO?.ESECO2}</td>
                                                <td className="border px-4 py-2">{outComeData?.percentagesESECO?.ESECO3}</td>

                                            </tr>
                                            <tr>
                                                <th className="border px-4 py-2 bg-[#e2e8f0]">Attainment level</th>
                                                <td className="border px-4 py-2">{outComeData?.attainLevelsESECO?.ESECO1}</td>
                                                <td className="border px-4 py-2">{outComeData?.attainLevelsESECO?.ESECO2}</td>
                                                <td className="border px-4 py-2">{outComeData?.attainLevelsESECO?.ESECO3}</td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div>
                                <h1 className=" font-medium"> PSA - the level of attainment</h1>

                                <table className="table-auto rounded-md border mt-2">
                                    <thead className="bg-black text-white">
                                        <tr>

                                            <th className="px-4 py-2 border">CO1</th>
                                            <th className="px-4 py-2 border">CO2</th>
                                            <th className="px-4 py-2 border">CO3</th>
                                            <th className="px-4 py-2 border">CO4</th>
                                            <th className="px-4 py-2 border">CO5</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>

                                            <td className="border px-4 py-2">{(outComeData?.psoCOS?.ps1 || 0).toFixed(2)}</td>
                                            <td className="border px-4 py-2">{(outComeData?.psoCOS?.ps2 || 0).toFixed(2)}</td>
                                            <td className="border px-4 py-2">{(outComeData?.psoCOS?.ps3 || 0).toFixed(2)}</td>
                                            <td className="border px-4 py-2">{(outComeData?.psoCOS?.ps4 || 0).toFixed(2)}</td>
                                            <td className="border px-4 py-2">{(outComeData?.psoCOS?.ps5 || 0).toFixed(2)}</td>

                                        </tr>
                                    </tbody>
                                </table>
                                <h1 className=" px-4  pt-5"><span className=' font-medium text-[18px]'>The Mean PSA refers the PSO for that course :</span> {((outComeData?.psoCOS?.ps1 + outComeData?.psoCOS?.ps2 + outComeData?.psoCOS?.ps3 + outComeData?.psoCOS?.ps4 + outComeData?.psoCOS?.ps5) / 5).toFixed(2)}</h1>

                            </div>
                        </div>

                    </div>



                </div>)
                :
                (
                    <div className=''>
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

export default CourseOutcome
