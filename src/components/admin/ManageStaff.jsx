import React, { useEffect, useRef, useState } from 'react'
import { AddNewCourse, getApi, getCourseApi, searchData } from '../../api/api';
import { Pagination } from '../addMarks/pagiNation';
import loading from "../../assets/loading.svg";
import { debounce } from 'lodash';
import toast, { LoaderIcon } from 'react-hot-toast';

function ManageStaff() {
  const [StaffData, setStaffData] = useState([]);
  const [CourseData, setCourseData] = useState([]);
  const [Total, setTotal] = useState(0);
  const [Active, setActive] = useState(1);
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isPopup, setIsPopup] = useState(-1);

  const [isLoading3, setIsLoading3] = useState(false);
  const [isLoading4, setIsLoading4] = useState(false);


  const [Code, setCode] = useState('');
  const [Name, setName] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getCourseApi(`staff/getAllStaff?page=${Active}`, setStaffData, setTotal, setIsLoading)
  }, [Active])


  const handleSubmit = () => {
    if (!Code || !Name) {
      return toast.error('Please fill all field')
    }
    const data = {
      code: Code,
      name: Name,
      // depCode: deparment
    }

    AddNewCourse(data, setIsLoading3).then((res) => {
      if (res.status === 200) {
        toast.success(Code + 'is added successfully')
        setIsOpen(false);


        getCourseApi(`staff/getAllCourses?page=${Active}`, setStaffData, setTotal, setIsLoading)
      }
      else {
        toast.error('Please try again later')
      }
    })
  }

  const handlePopup = (ItemId) => {
    setIsPopup(ItemId)
    const userId = StaffData[ItemId].email
    getApi(`staff/getStaffsDetails?uname=${userId}`, setCourseData, setIsLoading4)
  }

  const handleDelete = (ItemId) => {
    // setIsDeletePopup(ItemId)
  }

  //#region apicall
  const handleInputChange = debounce(async (value) => {
    if (value.length % 2 !== 0) {
      getCourseApi(`staff/getAllStaff?page=1&question=${value}`, setStaffData, setTotal, setIsLoading)
    }
    else if (value.length == 0) {
      getCourseApi(`staff/getAllStaff?page=1&question=`, setStaffData, setTotal, setIsLoading)
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



  return (
    <div className=' h-full w-full flex flex-col'>
      <div className=' h-20 px-10  py-2 w-full flex justify-between items-end space-x-2'>
        <p className=' font-semibold text-xl grow'>Manage Staff</p>

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

        <button onClick={() => setIsOpen(true)} className=' h-10 px-3 bg-black rounded-lg text-white'>Add Staff</button>
      </div>

      <div className=' w-full grow flex flex-col items-center py-4'>
        <div className=' w-[60%] font-semibold text-lg grid grid-cols-6 h-12 bg-slate-300 place-content-center place-items-center rounded-lg'>
          <p>Id</p>
          <p>Code</p>
          <p>Course Name</p>
          <p>Role</p>
          <p className=' '>Action</p>
          <p className=' '>Details</p>
        </div>
        {isLoading ? <img src={loading} alt="" className=' h-12 w-12 absolute top-1/2' /> : StaffData.map((item, index) =>
          <div key={index} className={` w-[60%] font-medium text-sm grid grid-cols-6 h-12 border-b place-content-center place-items-center rounded-lg`}>
            <p>{item.id}</p>
            <p>{item.email}</p>
            <p className=' text-center truncate overflow-hidden w-full'>{item.name}</p>
            <p>{item.role}</p>

            <div className=' flex space-x-2'>
             <div className=' flex space-x-3'>
              <div className=' text-lg' onClick={null}>
                <ion-icon name="add"></ion-icon>
              </div>
              <div className=' text-lg text-red-500' onClick={null}>
                <ion-icon name="trash-outline"></ion-icon>
              </div>
            </div>
              
            </div>
            <div className=' bg-blue-500 px-4 py-1 rounded-md text-white cursor-pointer' onClick={() => handlePopup(index)}>
              show
            </div>
           
          </div>
        )
        }
      </div>

      <div className=' h-10 w-full flex justify-center items-start'>
        <Pagination active={Active} setActive={setActive} total={Total} />
      </div>

      {isOpen &&
        <div className=" fixed z-20 w-screen h-screen  top-0 right-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
          <div className=" w-[30%] h-[30%] rounded-lg bg-white shadow-2xl antialiased p-2 flex flex-col">
            <div className="w-full grow flex flex-col">

              <div className=" flex space-x-2 text-xl font-semibold items-center border-b py-2">
                <ion-icon name="add"></ion-icon>
                <p >Add staff</p>
              </div>

              <div className=" w-full  grow flex flex-col space-y-2 justify-start items-center px-7 py-4">

                <div className=' w-full space-x-2 flex items-center '>
                  <h1 className="text-[#676060] w-[40%]">Staff Code :</h1>
                  <input
                    type="text"
                    value={Code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="232421"
                    className='bg-[#F8FCFF] shadow-sm border h-10 w-[9rem] xl:w-[60%] rounded px-2 text-black font-medium'
                  />

                </div>

                <div className=' w-full space-x-2 flex items-center '>
                  <h1 className="text-[#676060] w-[40%]">Staff Name :</h1>
                  <input
                    type="text"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Salman"
                    className='bg-[#F8FCFF] shadow-sm border h-10 w-[9rem] xl:w-[60%] rounded px-2 text-black font-medium'
                  />

                </div>

              </div>

            </div>

            <div className=" w-full space-x-2 flex justify-end font-medium ">
              <button className=" px-3 py-2 rounded-md hover:bg-red-700 text-red-700 hover:bg-opacity-10 transition-all duration-700" onClick={() => setIsOpen(false)}>Cancel</button>
              <button className=" px-2 py-2 rounded-md bg-[#4f72cc] text-white hover:shadow-lg hover:shadow-[#4f72cc] transition-all duration-700" onClick={handleSubmit}>Add</button>
            </div>


          </div>
        </div>
      }

      {isPopup !== -1 &&
        <div className=" fixed z-20 w-screen h-screen  top-0 right-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
          <div className=" w-[40%] h-[60%] rounded-lg bg-white shadow-2xl antialiased p-2 flex flex-col">
            <div className=' flex w-full justify-between h-12 border-b items-center'>
              <p className=' font-bold'>Manage Course </p>
              <p className=' font-medium'>{StaffData[isPopup].email}</p>
            </div>
            <div className="w-full grow flex flex-col">
              <div className=' w-full grow flex flex-col items-center py-4'>
                <div className=' w-full font-semibold text-base grid grid-cols-5 h-12 bg-slate-300 place-content-center place-items-center rounded-lg'>
                  <p>index</p>
                  <p>depCode</p>
                  <p>Course Code</p>
                  <p>Course Name</p>
                  <p>Action</p>
                </div>
                {isLoading4 ? <img src={loading} alt="" className=' h-12 w-12 absolute top-1/2' /> : CourseData.map((item, index) =>
                  <div key={index} className={` w-full font-medium text-sm grid grid-cols-5 h-12 border-b place-content-center place-items-center rounded-lg`}>
                    <p>{index + 1}</p>
                    <p>{item.code.depCode}</p>
                    <p>{item.code.code}</p>
                    <p className=' text-center truncate overflow-hidden w-full'>{item.code.name}</p>
                    <div className=' bg-red-500 px-4 py-1 rounded-md text-white cursor-pointer' onClick={null}>
                      remove
                    </div>

                  </div>
                )
                }
              </div>


            </div>

            <div className=" w-full space-x-2 flex justify-end font-medium ">
              <button className=" px-2 py-2 rounded-md bg-[#4f72cc] text-white hover:shadow-lg hover:shadow-[#4f72cc] transition-all duration-700" onClick={() => setIsPopup(-1)}>Close</button>
            </div>


          </div>
        </div>
      }

    </div>
  )
}

export default ManageStaff
