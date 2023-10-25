import React, { useEffect, useRef, useState } from 'react'
import { getApi, putApi, searchData } from '../../api/api';
import { debounce } from 'lodash';
import loading from "../../assets/loading.svg";
import studentMarksImg from "../../assets/studentMark.png";

function CourseOutcome() {

    const dropdownRef2 = useRef(null);
    const [courseCode, setCourseCode] = useState("");
    const [deparment, setdepartment] = useState("");
    const [searchValue, setSearchValue] = useState([]);
    const [CourseData, setCourseData] = useState([]);
    const [isLoading2, setIsLoading2] = useState(false);
    const [isLoading1, setIsLoading1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);
    const [outComeData, setOutcomeData] = useState([]);

    //#region Handle Outside Click
    const handleOutsideClick2 = event => {
        if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
            setIsOpen2(false);
        }
    };
    //#endregion

    //#region useEffect
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick2);
        return () => {
            document.removeEventListener('click', handleOutsideClick2);
        };
    }, []);
    //#endregion

    //#region departmentOnSelect
    const departmentOnSelect = item => {
        setdepartment(item.departmentCode);
        setIsOpen2(false);
        getApi(`staff/searchCode?question=${item.departmentCode}`, setCourseData, setIsLoading2)

    };
    //#endregion

    //#region drop
    const handleDropdownToggle2 = () => {
        setIsOpen2(!isOpen2);
    };
    //#endregion

    //#region search
    const handleDepSearch = debounce(async (val) => {
        console.log('searching..')
        searchData('staff/searchDepartment/?question=' + val, setSearchValue, setIsLoading2)
    }, 500);
    //#endregion

    //#region departmentOnChange
    const departmentOnChange = event => {
        setdepartment(event.target.value);
        handleDepSearch(event.target.value);
    };
    //#endregion

    //#region useEffect
    useEffect(() => {
        const handleKeyDown = (event) => {
            // Arrow down
            if (event.keyCode === 40) {
                event.preventDefault();
                setFocusedOptionIndex((prevIndex) => Math.min(prevIndex + 1, searchValue.length - 1));
            }
            // Arrow up
            else if (event.keyCode === 38) {
                event.preventDefault();
                setFocusedOptionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
            }
            // Enter
            else if (event.keyCode === 13) {
                event.preventDefault();
                if (searchValue[focusedOptionIndex]) {
                    departmentOnSelect(searchValue[focusedOptionIndex]);
                }
            }
        };

        if (isOpen2) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen2, searchValue, focusedOptionIndex]);
    //#endregion

    //#region handleGet
    const handleGet = () => {
        const data = {
            department: deparment,
            code: courseCode
        }
        putApi(`staff/getMarks`, setOutcomeData, data, setIsLoading1).then(res => {
            console.log(res)
        })
    }
    //#endregion


    return (
        <div className=''>
            <div className=" flex justify-end items-center space-x-5">

                <div className=' w-[19rem] relative flex items-center justify-end space-x-2' ref={dropdownRef2}>
                    <h1 className="">Department :</h1>
                    <input
                        type="text"
                        value={deparment}
                        onChange={departmentOnChange}
                        onFocus={handleDropdownToggle2}
                        placeholder="Eg: MCA"
                        className='border-2 p-2 rounded-md'
                    />
                    {isOpen2 && (
                        <ul className="absolute z-20 top-10 mt-2 w-[12.6rem]  flex flex-col items-center min-h-min max-h-[20rem] overflow-y-hidden  bg-white border border-gray-300 rounded-md shadow-md">
                            {isLoading2 ? (<img src={loading} alt="" className=" w-8 h-8 animate-spin text-black" />) :
                                (searchValue.length === 0 ? (
                                    <li className="py-1 px-4 text-gray-400">{deparment.length === 0 ? "Type..." : "No Department found"}</li>
                                ) : (
                                    searchValue.map((item, index) => (
                                        <li
                                            key={item.id}
                                            onClick={() => departmentOnSelect(item)}
                                            className={`py-1 px-4 cursor-pointer ${index === focusedOptionIndex ? 'bg-blue-200 w-full flex justify-center' : ''}`}
                                        >
                                            {item.departmentCode}
                                        </li>
                                    ))
                                ))
                            }
                        </ul>
                    )}
                </div>

                <span className="flex items-center space-x-2">
                    <h1>Course Code :</h1>
                    <select
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                        className={` border-2 h-[2.8rem] rounded-md px-2 ${courseCode === '' ? 'text-gray-400' : 'text-black'}`}
                    >
                        <option value=''>
                            Select Code
                        </option>

                        {CourseData.map((course) => (
                            <option key={course.id} value={course.code}>
                                {course.code}
                            </option>
                        ))}
                    </select>
                </span>

                <button className=" bg-[#3b84f4] py-2 px-4 rounded-md text-white" onClick={handleGet}>
                    Get
                </button>
            </div>

            {outComeData.length !== 0 ?
                (<div className=" px-20">
                    <div className="flex justify-between">
                        {/* CIA TEST */}
                        <div className="mt-10">
                            <h1 className=" font-medium">CIA TEST</h1>
                            {/* CIA I */}
                            <div>
                                {/* <h1 className="py-2">CIA I</h1> */}
                                <table className="table-auto border mt-2">
                                    <thead className="bg-[#3b84f4] text-white">
                                        <tr>
                                            <th className="px-4 py-2 border"></th>
                                            <th className="px-4 py-2 border">CO1</th>
                                            <th className="px-4 py-2 border">CO2</th>
                                            <th className="px-4 py-2 border">CO3</th>
                                            <th className="px-4 py-2 border">CO4</th>
                                            <th className="px-4 py-2 border">CO5</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>

                                            <th className="border px-4 py-2 bg-[#e2e8f0]">No of student above 60%</th>

                                            <td className="border px-4 py-2">{outComeData?.above40TCO?.TCO1}</td>
                                            <td className="border px-4 py-2">{outComeData?.above40TCO?.TCO2}</td>
                                            <td className="border px-4 py-2">{outComeData?.above40TCO?.TCO3}</td>
                                            <td className="border px-4 py-2">{outComeData?.above40TCO?.TCO4}</td>
                                            <td className="border px-4 py-2">{outComeData?.above40TCO?.TCO5}</td>
                                        </tr>
                                        <tr>
                                            <th className="border px-4 py-2 bg-[#e2e8f0]">Percentage</th>
                                            <td className="border px-4 py-2">{outComeData?.percentages?.TCO1}</td>
                                            <td className="border px-4 py-2">{outComeData?.percentages?.TCO2}</td>
                                            <td className="border px-4 py-2">{outComeData?.percentages?.TCO3}</td>
                                            <td className="border px-4 py-2">{outComeData?.percentages?.TCO4}</td>
                                            <td className="border px-4 py-2">{outComeData?.percentages?.TCO5}</td>
                                        </tr>
                                        <tr>
                                            <th className="border px-4 py-2 bg-[#e2e8f0]">Attainment level</th>
                                            <td className="border px-4 py-2">{outComeData?.attainLevels?.TCO1}</td>
                                            <td className="border px-4 py-2">{outComeData?.attainLevels?.TCO2}</td>
                                            <td className="border px-4 py-2">{outComeData?.attainLevels?.TCO3}</td>
                                            <td className="border px-4 py-2">{outComeData?.attainLevels?.TCO4}</td>
                                            <td className="border px-4 py-2">{outComeData?.attainLevels?.TCO5}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* ESE TEST */}
                        <div className="mt-10">
                            <h1 className=" font-medium">ESE TEST</h1>
                            <div>
                                <table className="table-auto border mt-2">
                                    <thead className="bg-[#3b84f4] text-white">
                                        <tr>
                                            <th className="px-4 py-2 border"></th>
                                            <th className="px-4 py-2 border">CO1</th>
                                            <th className="px-4 py-2 border">CO2</th>
                                            <th className="px-4 py-2 border">CO3</th>
                                            <th className="px-4 py-2 border">CO4</th>
                                            <th className="px-4 py-2 border">CO5</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th className="border px-4 py-2 bg-[#e2e8f0]">No of student above 60%</th>
                                            <td className="border px-4 py-2">{outComeData?.above40ESECO?.ESECO1}</td>
                                            <td className="border px-4 py-2">{outComeData?.above40ESECO?.ESECO2}</td>
                                            <td className="border px-4 py-2">{outComeData?.above40ESECO?.ESECO3}</td>
                                            <td className="border px-4 py-2">{outComeData?.above40ESECO?.ESECO4}</td>
                                            <td className="border px-4 py-2">{outComeData?.above40ESECO?.ESECO5}</td>
                                        </tr>
                                        <tr>
                                            <th className="border px-4 py-2 bg-[#e2e8f0]">Percentage</th>
                                            <td className="border px-4 py-2">{outComeData?.percentagesESECO?.ESECO1}</td>
                                            <td className="border px-4 py-2">{outComeData?.percentagesESECO?.ESECO2}</td>
                                            <td className="border px-4 py-2">{outComeData?.percentagesESECO?.ESECO3}</td>
                                            <td className="border px-4 py-2">{outComeData?.percentagesESECO?.ESECO4}</td>
                                            <td className="border px-4 py-2">{outComeData?.percentagesESECO?.ESECO5}</td>
                                        </tr>
                                        <tr>
                                            <th className="border px-4 py-2 bg-[#e2e8f0]">Attainment level</th>
                                            <td className="border px-4 py-2">{outComeData?.attainLevelsESECO?.ESECO1}</td>
                                            <td className="border px-4 py-2">{outComeData?.attainLevelsESECO?.ESECO2}</td>
                                            <td className="border px-4 py-2">{outComeData?.attainLevelsESECO?.ESECO3}</td>
                                            <td className="border px-4 py-2">{outComeData?.attainLevelsESECO?.ESECO4}</td>
                                            <td className="border px-4 py-2">{outComeData?.attainLevelsESECO?.ESECO5}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                    <div className="mt-10">
                        <table className="table-auto border mt-2">
                            <thead className="bg-[#3b84f4] text-white">
                                <tr>
                                    <th className="px-4 py-2 border"></th>
                                    <th className="px-4 py-2 border">CO1</th>
                                    <th className="px-4 py-2 border">CO2</th>
                                    <th className="px-4 py-2 border">CO3</th>
                                    <th className="px-4 py-2 border">CO4</th>
                                    <th className="px-4 py-2 border">CO5</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th className="border-2 px-4 py-2 bg-[#e2e8f0]">Overall CO Attainment </th>
                                    <td className="border px-4 py-2">{outComeData?.overAll?.CO1}</td>
                                    <td className="border px-4 py-2">{outComeData?.overAll?.CO2}</td>
                                    <td className="border px-4 py-2">{outComeData?.overAll?.CO3}</td>
                                    <td className="border px-4 py-2">{outComeData?.overAll?.CO4}</td>
                                    <td className="border px-4 py-2">{outComeData?.overAll?.CO5}</td>
                                </tr>
                            </tbody>
                        </table>
                        <h1 className=" px-4 pt-5 "><span className=' font-medium text-[18px]'>Total no of student :</span> {outComeData?.totalStudents}</h1>
                        <h1 className=" px-4 py-2 "><span className=' font-medium text-[18px]'>Course Attainment Level :</span> {outComeData?.averageAttainLevel}</h1>
                        <h1 className=" px-4 py- "><span className=' font-medium text-[18px]'>Course Attainment Level - Direct Method (80%) :</span> {outComeData?.direct80}</h1>
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
