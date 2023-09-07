import React from 'react'
import illustrate from '../assets/illustrate.svg'

function LoginPage() {
    return (
        <div className=" w-screen h-screen flex flex-row space-x-4  justify-center items-center p-10 bg-gradient-to-r from-blue-500 to-green-500">
            <div className=" w-full h-[45rem] bg-white rounded-lg flex">
                <div className=' w-3/5 h-full flex flex-col justify-center items-start mx-10'>
                    <p className=' text-6xl font-semibold'>Hello! Welcome</p>
                    <p className=' text-3xl text-neutral-500 font-medium'>JMC Marks Management System</p>

                    <div className='w-[25rem] ml-6 space-y-5 mt-10 h-fit flex flex-col items-center border-2 py-6 rounded-lg'>
                        <input
                            className="bg-[#e8f0fe] text-black h-11 w-[20rem] rounded px-3  placeholder-neutral-500 placeholder:font-medium border-b-2 border-white focus:border-blue-500 outline-none"
                            type={'gmail'}
                            name={'Gmail'}
                            placeholder={"Enter your email"}
                            value={null}
                            onChange={null}
                            maxLength={30}
                        />

                        <input
                            className="bg-[#e8f0fe] text-black h-11 w-[20rem] rounded px-3  placeholder-neutral-500 placeholder:font-medium border-b-2 border-white focus:border-blue-500 outline-none"
                            type={'gmail'}
                            name={'Gmail'}
                            placeholder={"Enter your password"}
                            value={null}
                            onChange={null}
                            maxLength={30}
                        />

                        <button className=' h-11 w-[20rem] bg-blue-500 rounded-lg text-lg font-medium text-white hover:scale-[0.95] transition'>Log In</button>

                    </div>
                </div>
                <div className=' w-2/5 h-full flex items-center justify-center'>
                    <img src={illustrate} alt="" />
                </div>
            </div>
        </div>
    )
}

export default LoginPage
