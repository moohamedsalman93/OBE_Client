import React from 'react'

function AboutUs() {
    return (
        <div className=" w-screen h-screen flex flex-col space-x-4  overflow-hidden justify-center items-center p-10 bg-gradient-to-br from-[#4f72cc] to-[#58caea]">
            <div className=" w-full grow bg-white rounded-lg flex justify-center items-center">

                <div className=' w-[40%] h-full space-y-6 flex flex-col justify-center items-center'>
                    <div className=' text-2xl font-semibold'>Software Guide</div>
                    <div className=' w-full flex flex-col items-center space-y-3'>
                        <div className=' bg-black rounded-full h-[13rem] w-[13rem]'>

                        </div>
                        <div>
                            <p className=' text-xl text-neutral-500 font-semibold'>S Abdul Qadir.,</p>
                            <p className=' text-md text-neutral-500 font-medium'>Assistant Controller</p>

                        </div>

                    </div>



                </div>
                <div className=' h-[30rem] my-5 w-[0.1px] shadow-xl rounded-md bg-black'></div>
                <div className=' w-[60%] h-full space-y-6 mt-10 flex flex-col justify-center items-center'>
                    <div className=' text-2xl font-semibold'>Developers</div>
                    <div className=' grid grid-cols-2 h-[33rem]  w-full justify-evenly'>
                    <div className=' w-full flex flex-col items-center space-y-3'>
                        <div className=' bg-black rounded-full h-[10rem] w-[10rem]'>

                        </div>
                        <div className=' flex flex-col items-center'>
                            <p className=' text-xl text-neutral-500 font-semibold'>Abdul Sirajudeen S.,</p>
                            <p className=' text-md text-neutral-500 font-medium'>MCA</p>

                        </div>

                    </div>
                    <div className=' w-full flex flex-col items-center space-y-3'>
                        <div className=' bg-black rounded-full h-[10rem] w-[10rem]'>

                        </div>
                        <div className=' flex flex-col items-center'>
                            <p className=' text-xl text-neutral-500 font-semibold'>Abdul Basith A.,</p>
                            <p className=' text-md text-neutral-500 font-medium'>MCA</p>

                        </div>

                    </div>
                    <div className=' w-full flex flex-col items-center space-y-3'>
                        <div className=' bg-black rounded-full h-[10rem] w-[10rem]'>

                        </div>
                        <div className=' flex flex-col items-center'>
                            <p className=' text-xl text-neutral-500 font-semibold'>Mohamed Salman S.,</p>
                            <p className=' text-md text-neutral-500 font-medium'>B.Sc CS, MCA</p>

                        </div>

                    </div>
                    <div className=' w-full flex flex-col items-center space-y-3'>
                        <div className=' bg-black rounded-full h-[10rem] w-[10rem]'>

                        </div>
                        <div className=' flex flex-col items-center'>
                            <p className=' text-xl text-neutral-500 font-semibold'>Jayaprakash R.,</p>
                            <p className=' text-md text-neutral-500 font-medium'>MCA</p>

                        </div>

                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs
