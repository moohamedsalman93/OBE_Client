import React, { useEffect, useRef, useState } from 'react'
import { getDepOut,  searchData } from '../../../api/api';
import { debounce } from 'lodash';
import loading from "../../../assets/loading.svg";
import studentMarksImg from "../../../assets/studentMark.png";

function Programs({ year, currentSem }) {

    const dropdownRef2 = useRef(null);
    const [departmentName, setDepartmentName] = useState("");
    const [deparment, setdepartment] = useState("");
    const [searchValue, setSearchValue] = useState([]);
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
        setDepartmentName(item.name)
        setIsOpen2(false);

    };
    //#endregion

    //#region drop
    const handleDropdownToggle2 = () => {
        setIsOpen2(!isOpen2);
    };
    //#endregion

    //#region search
    const handleDepSearch = debounce(async (val) => {
       
        searchData('staff/searchDepartment/?question=' + val + '&year=' + year, setSearchValue, setIsLoading2)
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
            year: year,
            sem: currentSem
        }

        getDepOut(`staff/getByDepartment`, setOutcomeData, data, setIsLoading1)
    }
    //#endregion

    const addAttain = () => {

        let i = 0.00
        let l = 0
        outComeData.map((item) => {
            if (item.overAtain > 0) {
                l += 1
                i += parseFloat(item.overAtain)
            }
        })

        return i / l.toFixed(2)
    }

    return (
        <div className=' w-full grow flex flex-col space-y-2 xl:h-[45rem] 2xl:h-[39rem] overflow-y-auto py-2 bg-white rounded-lg shadow-md'>

            <div className=' flex space-x-2 w-full justify-start items-center px-4 py-2 font-normal '>

                <div className=' w-[20.5rem] relative flex items-center justify-end space-x-2' ref={dropdownRef2}>
                    <h1 className="w-[8rem] ">Department :</h1>
                    <input
                        type="text"
                        value={deparment}
                        onChange={departmentOnChange}
                        onFocus={handleDropdownToggle2}
                        placeholder="Eg: MCA"
                        className='border-2 p-2 rounded-md h-10'
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



                <button className="  bg-[#4f72cc] h-10 px-4 rounded-md text-white" onClick={handleGet}>
                    Get
                </button>

            </div>

            {outComeData.length !== 0 ?
                (<div className=' w-full flex space-y-4 flex-col justify-center items-center  grow'>
                    <div className=' space-x-3 text-lg flex items-center'>
                        <p className=' font-medium  '>Attain Level for {departmentName}</p>
                        <p className=' text-[#4f72cc] font-semibold'>{addAttain() || 0}</p>
                    </div>

                    

                    <div className=' w-full grow flex flex-col items-center py-2'>
                        <div className=' text-start w-[90%] px-4 font-semibold  grid gap-2 grid-cols-7 h-12 bg-slate-300 place-content-center place-items-center rounded-lg'>
                            <p className=' text-start w-full'>S. No.</p>
                            <p className=' text-start w-full '>Course Code</p>
                            <p className=' text-start w-full col-span-2'>Course Title</p>
                            <p className=' text-start w-full'>CIA AttainLevel</p>
                            <p className=' text-start w-full'>ESE AttainLevel</p>
                            <p className=' text-start w-full'>Overall AttainLevel</p>
                        </div>
                        <div className=" w-[90%] mt-2 overflow-y-auto flex flex-col justify-start items-center h-[32rem]">
                            {isLoading1 ? <img src={loading} alt="" className=' h-12 w-12 absolute top-1/2' /> : (outComeData.length === 0 ? <div className=' font-medium mt-5'>No Data found</div> :
                                outComeData.map((item, index) =>
                                    <div key={index} className={` text-start w-full px-4 font-medium text-sm gap-2 grid grid-cols-7 min-h-[45px] border-b place-content-center place-items-center ${index % 2 === 0 ? 'bg-slate-200' : ''}`}>
                                        <p className=' text-start w-full'>{index + 1}</p>
                                        <p className=" w-full text-start ">{item.courseCode}</p>
                                        <p className=' text-start w-full col-span-2'>{item.courseTitle}</p>
                                        <p className=' text-start w-full'>{item.ciaAttain == 0 && item.eseAtain == 0 ? "-" : (item.ciaAttain)}</p>
                                        <p className=' text-start w-full'>{item.ciaAttain == 0 && item.eseAtain == 0 ? "-" : (item.eseAtain)}</p>
                                        <p className=' text-start w-full'> {item.ciaAttain == 0 && item.eseAtain == 0 ? "-" : (item.overAtain)}</p>
                                    </div>

                                )
                            )
                            }
                        </div>

                    </div>


                </div>) :

                (<div className=' w-full'>
                    <div className="h-full w-full flex flex-col items-center justify-center text-base font-semibold">
                        <div className="w-fit h-fit relative text-center">
                            <img src={studentMarksImg} alt="" className=" w-[20rem] " />
                            <div className=" absolute bottom-[9rem] text-center w-[20rem]">
                                <p>Enter Department Code to get</p>
                                <p>All Department's OutCome</p>
                            </div>
                        </div>
                    </div>
                </div>)
            }

        </div>
    )
}

export default Programs
