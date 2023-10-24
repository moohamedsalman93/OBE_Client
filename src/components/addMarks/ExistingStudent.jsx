import React from 'react'
import loading from "../../assets/loading.svg";
import studentMarksImg from "../../assets/studentMark.png";

function ExistingStudent({isLoading3,courseCode,typeData,editStudent,handleEditClick,examType}) {
    return (
        <div className="bg-white p-2 flex flex-col rounded h-full w-3/12">
            <div className=" h-10 border-b  flex justify-center items-center font-semibold">
                <p>Student Marks</p>
            </div>
            <div className=" w-full grow flex flex-col justify-center items-center">
                {isLoading3 ? <img src={loading} alt="" className=" w-10 h-10 animate-spin" /> :
                    (
                        courseCode === '' ?
                            (
                                <div className="h-full w-full flex flex-col items-center justify-center text-base font-semibold">
                                    <div className="w-fit h-fit relative">
                                        <img src={studentMarksImg} alt="" className=" w-[20rem] " />
                                        <div className=" absolute bottom-[9rem] text-center">
                                            <p>Enter Department and Course code to get</p>
                                            <p>Existing Students Marks</p>
                                        </div>
                                    </div>
                                </div>
                            )
                            :
                            (
                                typeData?.length !== 0 ?
                                    (
                                        <div className=" w-full h-full flex flex-col">
                                            <div className=" h-10 m-2  grid grid-cols-2 px-2 items-center text-center font-medium  rounded-md bg-slate-400">
                                                <p>Register No</p>
                                                <p>staff's Name</p>
                                            </div>
                                            <div className=" w-full grow">
                                                {typeData?.map((item, index) =>
                                                    <div key={index} className={` h-10 mx-2  grid grid-cols-2 px-2 items-center text-center border-b font-medium hover:border-blue-700 hover:text-blue-600 cursor-pointer ${editStudent === index ? 'font-semibold text-blue-600' : (item?.marks[0][examType + 'STATUS'] === 'absent' && 'text-red-600' )}`} onClick={() => handleEditClick(index)}>
                                                        <p>{item?.regNo}</p>
                                                        <p className='  w-full h-7 truncate '>{item?.marks[0][examType + 'STAFF']}</p>
                                                    </div>
                                                )
                                                }
                                            </div>
                                        </div>
                                    )
                                    :
                                    (
                                        <div className="h-full w-full flex flex-col items-center justify-center text-base font-semibold">
                                            <div className="w-fit h-fit relative">
                                                <img src={studentMarksImg} alt="" className=" w-[20rem] " />
                                                <div className=" absolute bottom-[9rem] text-center w-full">
                                                    <p>There are no existing students.</p>
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
