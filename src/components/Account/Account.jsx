import React, { useEffect, useState } from 'react'
import loadingImg from '../../assets/loading.svg'
import toast from 'react-hot-toast';
import { getApi, passChangeApi } from '../../api/api';

function Account({ userId,year,currentSem }) {
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [isLoading, setLoading] = useState(false)
  const [isLoading2, setLoading2] = useState(false)
  const [Course, setCourse] = useState([]);

  const handleSubmit = () => {

    if (p1.length > 6 && p2.length > 6) {
      passChangeApi(`staff/changePassword?email=${userId}&password=${p2}`, setLoading).then((res) => {
        toast.success(res.data.success.message)
        setP1('')
        setP2('')
      })
    } else {
      toast.error('Password should be min-7 and max-16')
    }
  }

  useEffect(() => {
    getApi(`staff/getStaffsDetails?uname=${userId}&year=${year}&sem=${currentSem}`, setCourse, setLoading2)
  }, [])

  return (
    <div className=' h-full w-full p-4 bg-white'>
      <div className=' h-full w-full flex flex-col border py-2 px-4 rounded-lg '>

        <div className='flex flex-col space-y-3'>
          <p className=' text-lg font-semibold  text-black'>Change password</p>
          <input
            className={`bg-white text-black h-10 w-[16rem] rounded-md px-3 border-2  placeholder-neutral-500 placeholder:font-normal  focus:border-blue-500 outline-none `}
            type='password'
            name={'username'}
            placeholder={"New Password"}
            value={p1}
            onChange={(e) => setP1(e.target.value)}
            maxLength={20}
          />
          <input
            className={`bg-white text-black h-10 w-[16rem] rounded-md px-3 border-2  placeholder-neutral-500 placeholder:font-normal  focus:border-blue-500 outline-none `}
            type='password'
            name={'username'}
            placeholder={"Confirm New Password"}
            value={p2}
            onChange={(e) => setP2(e.target.value)}
            maxLength={20}
          />

          <div className={` transition-all duration-300 ${p1 !== p2 ? 'flex' : " hidden"}`}>

            <p className=' text-red-800 font-medium text-sm  w-[16rem] flex justify-center'>Both password are not same</p>
          </div>


          <div className=' w-[16rem] flex justify-end'>
            <button onClick={handleSubmit} disabled={isLoading && (p1 === p2)} className=' w-[80px] transition-transform duration-700 hover:bg-blue-700 text-center flex justify-center items-center text-sm font-medium text-white rounded-md h-8 bg-[#4f72cc]'>
              {isLoading ? <img src={loadingImg} alt="" className=' h-8 w-8' /> : 'Confirm'}
            </button>
          </div>

        </div>

        <div className=' w-full  grow py-10'>
          <p className=' text-lg font-semibold  text-black'>Course Handle</p>
          {isLoading2 ?
            <div className=' w-full flex justify-center items-center'> <img src={loadingImg} alt=""  className=' h-8'/></div> : 
            (<div className=' w-full py-3 gap-3 flex flex-wrap'>
              {
                Course.map((item, index) =>
                  <div key={index} className=' h-[7rem] shadow-md bg-[#346fe1] bg-opacity-10 saturate-200 after:translate-x-3 before:translate-x-8 duration-300 rounded-lg w-[14rem] border flex flex-col justify-center items-center p-2 space-y-1'>
                    <p className=' text-sm font-medium'>{item.code.department.departmentCode}</p>
                    <p className=' text-md font-medium'>{item.code.code}</p>
                    <p className=' text-sm font-medium  w-full flex items-center justify-center text-center'>{item.code.name}</p>
                  </div>)
              }
            </div>)
          }

        </div>

      </div>
    </div>
  )
}

export default Account

