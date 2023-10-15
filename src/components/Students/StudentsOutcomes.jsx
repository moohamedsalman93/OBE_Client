import React, { useState } from 'react'
import loading from "../../assets/loading.svg";
import studentMarksImg from "../../assets/studentMark.png";

function StudentsOutcomes() {
    const [regNo, setRegNo] = useState('')


    return (
        <div className=' h-full w-full flex flex-col '>
            <div className=" flex justify-end items-center space-x-5">

                <div className=' w-[19rem] relative flex items-center justify-end space-x-2' ref={null}>
                    <h1 className="">Register No :</h1>
                    <input
                        type="text"
                        value={regNo}
                        onChange={(e)=>setRegNo(e.target.value)}
                        placeholder="Eg: 23MCA001"
                        className='border-2 p-2 rounded-md'
                    />

                </div>

                <button className=" bg-[#3b84f4] py-2 px-4 rounded-md text-white" onClick={null}>
                    Get
                </button>

            </div>

            {true ?
                <div className=' grow w-full  p-2 overflow-y-auto'>
                        
                </div>
                :
                (
                    <div className=' grow  w-full' onClick={null}>
                        <div className="h-full w-full flex flex-col items-center justify-center text-base font-semibold">
                            <div className="w-fit h-fit">
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

export default StudentsOutcomes
