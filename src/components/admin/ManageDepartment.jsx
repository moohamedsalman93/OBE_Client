

import React, { useEffect, useRef, useState } from 'react'
import { AddNewCourse, getCourseApi, searchData } from '../../api/api';
import { Pagination } from '../addMarks/pagiNation';
import loading from "../../assets/loading.svg";
import { debounce } from 'lodash';
import toast, { LoaderIcon } from 'react-hot-toast';

function ManageDepartment() {
  const [CourseData, setCourseData] = useState([]);
  const [Total, setTotal] = useState(0);
  const [Active, setActive] = useState(1);
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef2 = useRef(null);
  const [deparment, setdepartment] = useState("");
  const [isOpen2, setIsOpen2] = useState(false);
  const [isDeletePopup, setIsDeletePopup] = useState(-1);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [searchValue, setSearchValue] = useState([]);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);
  const [CourseCode, setCourseCode] = useState('');
  const [CourseName, setCourseName] = useState('');

  useEffect(() => {
    getCourseApi(`staff/getAllDepartment?page=${Active}`, setCourseData, setTotal, setIsLoading)
  }, [Active])

  //#region search
  const handleDepSearch = debounce(async (val) => {
    if (val.length > 0) {
      searchData('staff/searchDepartment/?question=' + val, setSearchValue, setIsLoading2)
    }

  }, 500);
  //#endregion

  //#region departmentOnChange
  const departmentOnChange = event => {
    setdepartment(event.target.value.toUpperCase());
    handleDepSearch(event.target.value.toUpperCase());
  };
  //#endregion

  //#region drop
  const handleDropdownToggle2 = () => {
    setIsOpen2(!isOpen2);
  };
  //#endregion

  //#region departmentOnSelect
  const departmentOnSelect = item => {
    setdepartment(item.departmentCode);
    setIsOpen2(false);

  };
  //#endregion

  const handleSubmit = () => {
    if (!deparment || !CourseCode || !CourseName) {
      return toast.error('Please fill all field')
    }
    const data = {
      code: CourseCode,
      name: CourseName,
      depCode: deparment
    }

    AddNewCourse(data, setIsLoading3).then((res) => {
      if (res.status === 200) {
        toast.success(CourseCode + 'is added successfully')
        setIsOpen(false);
        setCourseCode('');
        setCourseName('');
        setdepartment('');
        getCourseApi(`staff/getAllCourses?page=${Active}`, setCourseData, setTotal, setIsLoading)
      }
      else {
        toast.error('Please try again later')
      }
    })
  }

  const handleDeletePopup = (ItemId) => {
    setIsDeletePopup(ItemId)
  }

  const handleDelete = (ItemId) => {
    // setIsDeletePopup(ItemId)
  }



  return (
    <div className=' h-full w-full flex flex-col'>
      <div className=' h-20 px-10  py-2 w-full flex justify-between items-end '>
        <p className=' font-semibold text-xl'>Department List</p>
        <button onClick={() => setIsOpen(true)} className=' h-10 px-3 bg-black rounded-lg text-white'>New Department</button>
      </div>

      <div className=' w-full grow flex flex-col items-center py-4'>
        <div className=' w-[70%] font-medium text-lg grid grid-cols-5 h-12 bg-slate-300 place-content-center place-items-center rounded-lg'>
          <p>S.no</p>
          <p>Department Code</p>
          <p className=' col-span-2'>Department</p>
          <p>Actions</p>
        </div>
        {isLoading ? <img src={loading} alt="" className=' h-12 w-12 absolute top-1/2' /> : CourseData.map((item, index) =>
          <div key={index} className={` w-[70%] font-normal text-sm grid grid-cols-5 h-12 border-b place-content-center place-items-center rounded-lg`}>
            <p>{item.id}</p>
            <p>{item.departmentCode}</p>
            <p className=' col-span-2 text-center truncate overflow-hidden w-full'>{item.name}</p>
           
            <div className=' flex space-x-3'>
              <div className=' text-lg' onClick={null}>
                <ion-icon name="create-outline"></ion-icon>
              </div>
              <div className=' text-lg' onClick={() => handleDeletePopup(index)}>
                <ion-icon name="trash-outline"></ion-icon>
              </div>
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
          <div className=" w-[30%] h-[40%] rounded-lg bg-white shadow-2xl antialiased p-2 flex flex-col">
            <div className="w-full grow flex flex-col">

              <div className=" flex space-x-2 text-xl font-semibold items-center border-b py-2">
                <ion-icon name="add"></ion-icon>
                <p >New Department</p>
              </div>

              <div className=" w-full  grow flex flex-col space-y-2 justify-start items-center px-7 py-4">
                <div className=' w-full space-x-2 flex items-center relative ' ref={dropdownRef2}>
                  <h1 className="text-[#676060] w-[40%]">Department Code :</h1>
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
                  
                </div>

                
                <div className=' w-full space-x-2 flex items-start '>
                  <h1 className="text-[#676060] w-[40%]">Department Name :</h1>
                  <textarea
                    type="text"
                    value={CourseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="Java"
                    className='bg-[#F8FCFF] shadow-sm border h-20 w-[9rem] xl:w-[60%] rounded px-2 text-black font-medium'
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

      {isDeletePopup !== -1 &&
        <div className=" fixed z-20 w-screen h-screen  top-0 right-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
          <div className=" w-[30%] h-[40%] rounded-lg bg-white shadow-2xl antialiased p-2 flex flex-col">
            <div className="w-full grow flex flex-col">

              <div className=" flex space-x-2 text-xl font-semibold items-center border-b py-2">
                <ion-icon name="trash-outline"></ion-icon>
                <p >Delete</p>
              </div>

              <div className=" w-full  grow flex flex-col space-y-2 justify-center items-center px-7 py-4 font-medium">
                  <p className=' text-center text-lg text-red-500'><ion-icon name="warning"></ion-icon>Assosiated Courses and the student mark will be deleted</p>
                  <p className=' text-center'>Are you sure to delete this course "<span className=' font-bold'>{CourseData[isDeletePopup].name}-{CourseData[isDeletePopup].depCode} </span>" ? </p>
              </div>

            </div>

            <div className=" w-full space-x-2 flex justify-end font-medium ">
              <button className=" px-2 py-2 rounded-md bg-[#4f72cc] text-white hover:shadow-lg hover:shadow-[#4f72cc] transition-all duration-700" onClick={()=>setIsDeletePopup(-1)}>Cancel</button>
              <button className=" px-3 py-2 rounded-md hover:bg-red-700 text-red-700 hover:bg-opacity-10 transition-all duration-700" onClick={handleDelete(CourseData[isDeletePopup].id)}>Sure</button>

            </div>


          </div>
        </div>
      }

    </div>
  )
}

export default ManageDepartment
