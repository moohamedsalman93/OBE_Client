import React from 'react'
import loading from "../../assets/loading.svg";
import studentMarksImg from "../../assets/studentMark.png";
import { Pagination } from './pagiNation';

function ExistingStudent({ isLoading3, courseCode,presentYear, typeData, editStudent, handleEditClick, examType, setSortby, Sortby, active, setActive, total, setIsOpenImport }) {
    return (
        <div className="bg-white p-2 flex flex-col rounded h-full w-[28%] overflow-hidden">
            <div className=" h-10 border-b  flex justify-between py-5 items-center font-semibold">
                <p>Entered Marks</p>
                <div onClick={() => setSortby(!Sortby)} className=' h-8 w-fit text-[#4f72cc] rounded-md flex justify-center items-center px-3 cursor-pointer'>
                    <p className=' font-medium text-sm '>{Sortby ? 'Asc' : 'Desc'}</p>
                    <ion-icon name={Sortby ? 'arrow-down-outline' : 'arrow-up-outline'}></ion-icon>
                </div>
            </div>

            <div className=" w-full grow flex flex-col justify-start items-center">
                {isLoading3 ? <img src={loading} alt="" className=" w-10 h-10 animate-spin" /> :
                    (
                        presentYear === null ?
                            (
                                <div className="h-full w-full flex flex-col items-center justify-center text-base font-semibold">
                                    <div className="w-fit grow flex flex-col items-center justify-center relative">
                                        <img src={studentMarksImg} alt="" className=" w-[20rem] " />
                                        <div className=" absolute bottom-[9rem] text-center">
                                            <p>Enter Department and Course code to get</p>
                                            <p>Existing Students Marks</p>
                                        </div>
                                    </div>
                                    <div className=' w-full flex justify-center items-center h-22'>
                                        <button className=' px-4 py-2 bg-[#4f72cc] rounded-md text-white font-medium ' onClick={() => setIsOpenImport(true)}>Import</button>

                                    </div>
                                </div>
                            )
                            :
                            (
                                typeData?.length !== 0 && typeData !== undefined ?
                                    (
                                        <div className=" w-full h-full   flex flex-col justify-start">
                                            <div className=' w-full h-[44rem] 2xl:h-[36.5rem] '>
                                                <div className=" h-10 m-2 pr-2  grid grid-cols-2 px-2 items-center text-center font-medium  rounded-md bg-slate-200   shadow-md border">
                                                    <p>Register No</p>
                                                    <p>staff Name</p>
                                                </div>
                                                <div className=" w-full  h-[90%] overflow-y-auto">
                                                    {typeData?.map((item, index) =>
                                                        <div key={index} className={` h-10 mx-2  grid grid-cols-2 px-2 items-center text-center border-b text-sm font-medium hover:border-blue-700 hover:text-blue-600 cursor-pointer ${editStudent === index ? 'font-semibold text-[#4f72cc] border-[#4f72cc]' : (item?.marks[0][examType + 'STATUS'] === 'absent' && 'text-red-600')}`} onClick={() => handleEditClick(index)}>
                                                            <p>{item?.regNo}</p>
                                                            <p className='  w-full h-4 overflow-hidden flex items-start  justify-center'>{item?.marks[0][examType + 'STAFF']}</p>
                                                        </div>
                                                    )
                                                    }
                                                </div>

                                            </div>

                                            <div className=' flex flex-col  w-full h-[5rem]'>
                                                {total !== 0 &&
                                                    <div className=' w-full flex justify-center items-center'>
                                                        <Pagination active={active} setActive={setActive} total={total} />
                                                    </div>
                                                }

                                               
                                            </div>

                                        </div>
                                    )
                                    :
                                    (
                                        <div className="h-full w-full flex flex-col items-center justify-center text-base font-semibold">
                                            <div className="w-fit grow flex flex-col items-center justify-center">
                                                <div className=' w-fit h-fit relative'>
                                                    <img src={studentMarksImg} alt="" className=" w-[20rem] " />
                                                    <div className=" absolute bottom-[9rem] text-center w-full">
                                                        <p>There are no existing students.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    )

                            )
                    )
                }
            </div>

        </div>
    )
}

export default ExistingStudent
