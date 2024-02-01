import React from 'react'
import salman from '../assets/salman.png'
import siraj from '../assets/siraj.JPG'
import SAQ from '../assets/SAQ.jpg'
import JP from '../assets/jp.JPG'
import basith from '../assets/basith.png'
import { useNavigate } from 'react-router-dom'

function AboutUs() {
    const Navigate = useNavigate();
    return (
        <div className=" w-screen h-screen flex flex-col space-x-4  overflow-hidden justify-center items-center p-10 bg-gradient-to-br from-[#4f72cc] to-[#58caea]">
            <div className=' w-full h-10'>
                <button className=' font-medium text-white px-4 py-2 hover:underline' onClick={() => Navigate('/')}>{'<'} Back to Login</button>
            </div>
            <div className=" w-full grow bg-white rounded-lg flex justify-center items-center">

                <div className=' w-[40%] h-full space-y-6 flex flex-col justify-center items-center'>
                    <div className=' text-2xl font-semibold'>Software Guide</div>
                    <div className=' w-full flex flex-col items-center space-y-3  animate-slideinSAQ'>
                        <div className='  rounded-full h-[13rem] w-[13rem]'>
                            <img src={SAQ} alt="" className=' object-fill h-[13rem] w-[13rem] rounded-full' />
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

                        <div className=' w-full flex flex-col items-center space-y-3 animate-slideinbasith'>
                            <div className='  rounded-full h-40 w-40'>
                                <img src={basith} alt="" className=' object-cover h-40 w-40 rounded-full' />
                            </div>
                            <div className=' flex flex-col items-center'>
                                <p className=' text-xl text-neutral-500 font-semibold'>Abdul Basith A, MCA</p>

                                <button className='  font-medium hover:scale-75 transition-all duration-300 px-3 py-2 text-blue-600 text-sm rounded-md'>View profile</button>

                            </div>

                        </div>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs
