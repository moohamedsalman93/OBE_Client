import React from 'react'
import salman from '../assets/salman.png'
import siraj from '../assets/siraj.JPG'
import SAQ from '../assets/SAQ.jpg'
import JP from '../assets/jp.png'
import basith from '../assets/basith.png'
import { useNavigate } from 'react-router-dom'

function AboutUs() {
    const Navigate = useNavigate();
    return (
        <div className=" w-screen h-screen flex flex-col space-x-4  overflow-hidden justify-center items-center p-10 bg-gradient-to-br from-[#4f72cc] to-[#58caea]">
            <div className=' w-full h-10'>
                <button className='  w-fit h-full font-medium text-white px-4 py-2 hover:underline flex justify-start items-center gap-x-2 text-center' onClick={() => Navigate('/')}><h1 className=' text-[20px] text-center h-full'><ion-icon name="arrow-back-circle-outline"></ion-icon></h1> Back to Login</button>
            </div>
            <div className=" w-full grow bg-white rounded-lg flex justify-center items-center">

                <div className=' w-[40%] h-full space-y-6 flex flex-col justify-center items-center'>
                    <div className=' text-2xl font-semibold'>Software Guide</div>
                    <a href="https://jmc.edu/include/department/cs/staff/profile/SAQ-Profile-13-07-2023.pdf" target="_blank" rel="noopener noreferrer">
                    <div className=' w-full flex flex-col items-center space-y-3  animate-slideinSAQ cursor-pointer'>
                        <div className='  rounded-full h-[13rem] w-[13rem]'>
                            <img src={SAQ} alt="" className=' h-[13rem] w-[13rem] rounded-full object-fit ' />
                        </div>
                        <div>
                            <p className=' text-xl text-neutral-500 font-semibold text-center'>Dr. O.S. Abdul Qadir</p>
                            <p className=' text-sm text-neutral-500 font-semibold text-center'>MCA,M.Phil,.Ph.D</p>
                            <p className=' text-md text-neutral-500 font-medium'>Assistant Controller of Examinations</p>
                            <button className=' w-full text-center  font-medium hover:scale-75 transition-all duration-300 px-3 py-2 text-blue-600 text-sm rounded-md'>View profile</button>
                        </div>

                    </div></a>



                </div>
                <div className=' h-[30rem] my-5 w-[0.1px] shadow-xl rounded-md bg-black'></div>
                <div className=' w-[60%] h-full space-y-6 mt-10 flex flex-col justify-center items-center'>
                    <div className=' text-2xl font-semibold'>Developers</div>
                    <div className=' grid grid-cols-2 h-[33rem]  w-full justify-evenly'>

                        <a href="https://abdsirajofficial.github.io/portfolio/" target="_blank" rel="noopener noreferrer">
                            <div className=' w-full flex flex-col items-center space-y-3 animate-slideinsiraj'>
                                <div className='  rounded-full h-40 w-40'>
                                    <img src={siraj} alt="" className=' object-cover h-40 w-40 rounded-full' />
                                </div>
                                <div className=' flex flex-col items-center '>
                                    <p className=' text-xl text-neutral-500 font-semibold'>Abdul Sirajudeen S, MCA</p>
                                    <button className='  font-medium hover:scale-75 transition-all duration-300 px-3 py-2 text-blue-600 text-sm rounded-md'>View profile</button>

                                </div>

                            </div>
                        </a>
                        <a href="https://www.linkedin.com/in/bass55" target="_blank" rel="noopener noreferrer">
                        <div className=' w-full flex flex-col items-center space-y-3 animate-slideinbasith'>
                            <div className='  rounded-full h-40 w-40'>
                                <img src={basith} alt="" className=' object-cover h-40 w-40 rounded-full' />
                            </div>
                            <div className=' flex flex-col items-center'>
                                <p className=' text-xl text-neutral-500 font-semibold'>Abdul Basith A, MCA</p>

                                <button className='  font-medium hover:scale-75 transition-all duration-300 px-3 py-2 text-blue-600 text-sm rounded-md'>View profile</button>

                            </div>

                        </div>
                        </a>
                        <a href="https://moohamedsalman93.github.io/portfolio/" target="_blank" rel="noopener noreferrer">
                            <div className='w-full flex flex-col items-center space-y-3 animate-slideinsalman'>
                                <div className='rounded-full h-[10rem] w-[10rem]'>
                                    <img src={salman} alt="" />
                                </div>
                                <div className='flex flex-col items-center'>
                                    <p className='text-xl text-neutral-500 font-semibold'>Mohamed Salman S, MCA</p>
                                    <button className='  font-medium hover:scale-75 transition-all duration-300 px-3 py-2 text-blue-600 text-sm rounded-md'>View profile</button>

                                </div>
                            </div>
                        </a>
                        <a href="https://www.linkedin.com/in/jayaprakash-r-596a6a25b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
                        <div className=' w-full flex flex-col items-center space-y-3 animate-slideinjp'>
                            <div className=' bg-black rounded-full h-[10rem] w-[10rem]'>
                            <div className='  rounded-full h-40 w-40'>
                                <img src={JP} alt="" className=' object-cover h-40 w-40 rounded-full' />
                            </div>
                            </div>
                            <div className=' flex flex-col items-center'>
                                <p className=' text-xl text-neutral-500 font-semibold'>Jayaprakash R, MCA</p>
                                <button className='  font-medium hover:scale-75 transition-all duration-300 px-3 py-2 text-blue-600 text-sm rounded-md'>View profile</button>

                            </div>

                        </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs
