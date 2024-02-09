import React, { useEffect, useRef, useState } from 'react'
import { getCourseApi, searchData } from '../../../api/api';
import { debounce } from 'lodash';
import toast, { LoaderIcon } from 'react-hot-toast';
import loading from "../../../assets/loading.svg";
import { Pagination } from '../../addMarks/pagiNation';
import * as XLSX from 'xlsx';

function Entryreports({ year,currentSem }) {
    const [CourseData, setCourseData] = useState([]);
    const [printData, setPrintData] = useState([]);
    const [Total, setTotal] = useState(0);
    const [Active, setActive] = useState(1);
    const [isLoading, setIsLoading] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef2 = useRef(null);
    const [deparment, setdepartment] = useState("");
    const [searchValue, setSearchValue] = useState([]);
    const [isLoading2, setIsLoading2] = useState(false);
    const [isLoading3, setIsLoading3] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);

    useEffect(() => {
        getCourseApi(`staff/Entryreport?pageNo=${Active}&sem=${currentSem}&year=` + year, setCourseData, setTotal, setIsLoading)
    }, [Active])

    //#region departmentOnSelect
    const departmentOnSelect = item => {
        setdepartment(item.departmentCode);
        setIsOpen2(false);

    };
    //#endregion


    //#region apicall
    const handleInputChange = debounce(async (value) => {
        if (value.length % 2 !== 0) {
            getCourseApi(`staff/Entryreport?pageNo=&search=${value}&sem=${currentSem}&year=` + year, setCourseData, setTotal, setIsLoading)
        }
        else if (value.length == 0) {
            getCourseApi(`staff/Entryreport?pageNo=&year=${year}&sem=${currentSem}&search=`, setCourseData, setTotal, setIsLoading)
        }
    }, 500);
    //#endregion

    //#region handle input changes for search
    const handleInput = (e) => {
        const value = e.target.value;
        setSearchText(value);
        handleInputChange(value);
    };
    //#endregion

    //#region search
    const handleDepSearch = debounce(async (val) => {
        if (val.length > 0) {
            searchData('staff/searchDepartment/?question=' + val + '&year=' + year, setSearchValue, setIsLoading2)
        }

    }, 500);
    //#endregion
    //#region drop
    const handleDropdownToggle2 = () => {
        setIsOpen2(!isOpen2);
    };
    //#endregion

    //#region departmentOnChange
    const departmentOnChange = event => {
        setdepartment(event.target.value.toUpperCase());
        handleDepSearch(event.target.value.toUpperCase());
    };
    //#endregion

    //#region handlePrint
    const handlePrint = () => {
        getCourseApi(`staff/EntryReportBydepartment?search=${deparment}&sem=${currentSem}&year=` + year, setPrintData, setTotal, setIsLoading).then(res => {
            if (res?.status === 200 && res?.data?.data?.length > 0) {

                const data = res?.data?.data?.map(item => ({
                    'ID': item.id,
                    'Course Code': item.code,
                    'Course Name': item.name,
                    'Department Code': item.department.departmentCode,
                    'Staff': item.staff.map(staff => staff.staffName).join(', ')
                }));

                const ws = XLSX.utils.json_to_sheet(data);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
                XLSX.writeFile(wb, "entry_report_data.xlsx");

                setIsOpen(false)
            }
        })
    }
    //#endregion

    return (
        <div className=' h-full w-full xl:h-[45rem] 2xl:h-[39rem] flex flex-col bg-white rounded-md shadow-md p-2'>
            <div className=' h-10 px-2  py-2 w-full flex justify-end items-end space-x-2'>

                <div className=' flex relative w-fit h-fit'>
                    <input
                        type="text"
                        value={searchText}
                        onChange={handleInput}
                        placeholder="Search here"
                        className='bg-[#F8FCFF] shadow-xl border-[1.5px] h-10 w-[14rem] rounded-md px-2 placeholder:text-gray-600 text-black font-medium'
                    />
                    <div className=' absolute right-2 h-full flex flex-col justify-center'>
                        <ion-icon name="search"></ion-icon>
                    </div>
                </div>

                <button onClick={() => setIsOpen(true)} className=' h-10 px-3 bg-black rounded-lg text-white font-normal'>Print</button>

            </div>

            <div className=' w-full grow flex flex-col items-center py-2'>
                <div className=' w-[70%] px-2  font-semibold grid grid-cols-6 h-11 bg-slate-300 gap-2 place-content-center place-items-center rounded-lg'>
                    <p className='text-start w-full'>S. No.</p>
                    <p className='text-start w-full'>Course Code</p>
                    <p className='text-start w-full col-span-2'>Course Tille</p>
                    <p className='text-start w-full'>Dep Code</p>
                    <p className='text-start w-full'>Staff Name</p>
                </div>
                {isLoading ? <img src={loading} alt="" className=' h-12 w-12 absolute top-1/2' /> : (CourseData.length === 0 ? <div className=' font-medium mt-5'>No Data found</div> :
                    CourseData.map((item, index) =>
                        <div key={index} className={` w-[70%] px-2 font-medium text-sm grid gap-2 grid-cols-6 h-11 border-b place-content-center place-items-center rounded-lg`}>
                            <p className='text-start w-full'>{index + 1 + (Active - 1) * 10}</p>
                            <p className='text-start w-full'>{item.code}</p>
                            <p className='text-start w-full  truncate overflow-hidden pr-3 col-span-2'>{item.name.toUpperCase()}</p>
                            <p className='text-start w-full'>{item?.department?.departmentCode}</p>
                            <p className='text-start w-full truncate overflow-hidden '>{item.staff[0]?.staffName.toUpperCase() || '-'}</p>
                        </div>
                    )
                )
                }
            </div>

            <div className=' h-10 w-full flex justify-center items-start relative'>
                {Total !== 0 && <Pagination active={Active} setActive={setActive} total={Total} />}
            </div>
            {isOpen &&
                <div className=" fixed z-50 w-screen h-screen  top-0 right-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
                    <div className=" w-[30%] h-[30%] rounded-lg bg-white shadow-2xl antialiased p-2 flex flex-col">
                        <div className="w-full grow flex flex-col">

                            <div className=" flex space-x-2 text-xl font-semibold items-center border-b py-2">
                                <ion-icon name="print"></ion-icon>
                                <p >Print</p>
                            </div>

                            <div className=" w-full  grow flex flex-col space-y-2 justify-start items-center px-7 py-4">
                                <div className=' w-full space-x-2 flex items-center relative ' ref={dropdownRef2}>
                                    <h1 className="text-[#676060] w-[40%]">Department :</h1>
                                    <input
                                        type="text"
                                        value={deparment}
                                        maxLength={3}
                                        // onBlur={() => !optionSelected && setdepartment('')} // Modify this line
                                        onChange={departmentOnChange}
                                        onFocus={handleDropdownToggle2}
                                        placeholder="Eg: MCA"
                                        className='bg-[#F8FCFF] shadow-sm border h-10 w-[60%] rounded px-2 text-black font-medium'
                                    />
                                    {isOpen2 && (
                                        <ul className="absolute z-20 mt-2 w-[60%] flex right-0 top-9 flex-col items-center min-h-min max-h-[20rem] overflow-y-hidden  bg-white border border-gray-300 rounded-md shadow-md">
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
                                <div className=' grow'>
                                    {isLoading3 &&
                                        <img src={loading} alt="" className=' h-8' />
                                    }

                                </div>



                            </div>

                        </div>

                        <div className=" w-full space-x-2 flex justify-end font-medium ">
                            <button className=" px-3 py-2 rounded-md hover:bg-red-700 text-red-700 hover:bg-opacity-10 transition-all duration-700" onClick={() => setIsOpen(false)}>Cancel</button>
                            <button className=" px-2 py-2 rounded-md bg-[#4f72cc] text-white hover:shadow-lg hover:shadow-[#4f72cc] transition-all duration-700" onClick={() => handlePrint()}>Print</button>
                        </div>


                    </div>
                </div>
            }
        </div>
    )
}

export default Entryreports
