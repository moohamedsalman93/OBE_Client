import React, { useEffect, useRef, useState } from 'react'
import { getApi, getDepOut, putApi, searchData } from '../../api/api';
import { debounce } from 'lodash';
import loading from "../../assets/loading.svg";
import studentMarksImg from "../../assets/studentMark.png";

function Programs() {

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
        }

        getDepOut(`staff/getByDepartment`, setOutcomeData, data, setIsLoading1).then(res => {
            console.log(res)
        })
    }
    //#endregion

    const addAttain = () => {

        let i = 0.00
        let l = 0
        outComeData.map((item) => {
            if(item.overAtain > 0){
                l += 1
                i += parseFloat(item.overAtain)
            }
        })

        console.log(i)
        return i/l.toFixed(2)
    }

    return (
        <div className=' w-full grow flex flex-col space-y-10 overflow-y-auto py-2'>

            <div className=' flex space-x-2 w-full justify-end'>

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



                <button className=" bg-[#3b84f4] py-2 px-4 rounded-md text-white" onClick={handleGet}>
                    Get
                </button>

            </div>

            {outComeData.length !== 0 ?
                (<div className=' w-full flex flex-col justify-center items-center  grow'>
                    <div className=' grow p-5 space-x-3 text-xl flex items-center'>
                        <p className=' font-medium  '>Attain Level for {departmentName}</p>
                        <p className=' text-blue-500 font-medium'>{addAttain()}</p>
                    </div>
                    <div className=' w-[70%]  grow'>
                        <table>
                            <thead>
                                <tr className=' border rounded-lg bg-[#3b84f4] text-white'>
                                    <th className="px-4 py-2" >S no</th>
                                    <th className="px-4 py-2" >Course Code</th>
                                    <th className="px-4 py-2" >Course Title</th>
                                    <th className="px-4 py-2" >CIA AttainLevel</th>
                                    <th className="px-4 py-2" >ESE AttainLevel</th>
                                    <th className="px-4 py-2" >overAll AttainLevel</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    outComeData?.map((item, index) => (<tr className=' border rounded-lg  text-black text-center'>
                                        <td className="px-4 py-2" >{index + 1}</td>
                                        <td className="px-4 py-2" >{item.courseCode}</td>
                                        <td className="px-4 py-2" >{item.courseTitle}</td>
                                        <td className="px-4 py-2">
                                            {item.ciaAttain == 0 && item.eseAtain == 0  ? "-" : (item.ciaAttain)}
                                        </td>
                                        <td className="px-4 py-2">
                                            {item.ciaAttain == 0 && item.eseAtain == 0  ? "-" : (item.eseAtain)}
                                        </td>
                                        <td className="px-4 py-2">
                                            {item.ciaAttain == 0 && item.eseAtain == 0  ? "-" : (item.overAtain)}
                                        </td>
                                    </tr>))
                                }
                            </tbody>

                        </table>

                    </div>



                </div>) :

                (<div className=' w-full'>
                    <div className="h-full w-full flex flex-col items-center justify-center text-base font-semibold">
                        <div className="w-fit h-fit relative text-center">
                            <img src={studentMarksImg} alt="" className=" w-[20rem] " />
                            <div className=" absolute bottom-[9rem] text-center w-[20rem]">
                                <p>Enter Department to get</p>
                                <p>all Course OutCome</p>
                            </div>
                        </div>
                    </div>
                </div>)
            }

        </div>
    )
}

export default Programs
