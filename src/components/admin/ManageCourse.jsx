import React, { useEffect, useRef, useState } from 'react'
import { AddNewCourse, deleteCourse, excelApi, getCourseApi, searchData } from '../../api/api';
import { Pagination } from '../addMarks/pagiNation';
import loading from "../../assets/loading.svg";
import { debounce } from 'lodash';
import toast, { LoaderIcon } from 'react-hot-toast';

function ManageCourse() {
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
  const [searchText, setSearchText] = useState('');
  const [isEdit, setIsEdit] = useState(-1);
  const [isOpenImport, setIsOpenImport] = useState(false)
  const [fileList, setFileList] = useState(null);
  const [shouldHighlight, setShouldHighlight] = useState(false);
  const [progress, setProgress] = useState(0);

  const preventDefaultHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleUpload = async () => {

    let extention = (fileList.name).split('.')[(fileList.name).split('.').length - 1]

    if (extention !== 'csv') {
      toast.error("Please upload only csv file", { duration: 1500 });
      return
    }

    const data = new FormData();

    data.append('Excel', fileList);

    excelApi('staff/addCourseByExcel', data, setProgress, setFileList).then((res) => {
      if (res.status === 200) {
        toast.success("Imported successfully", { duration: 1500 });
      }
    })

  };

  const uploading = progress > 0 && progress < 100;


  useEffect(() => {
    getCourseApi(`staff/getAllCourses?page=${Active}`, setCourseData, setTotal, setIsLoading)
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

  //#region submit
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
      if (res?.status === 200) {
        toast.success(CourseCode + 'is added successfully')
        setIsOpen(false);
        setCourseCode('');
        setCourseName('');
        setdepartment('');
        setIsEdit(-1);
        getCourseApi(`staff/getAllCourses?page=${Active}`, setCourseData, setTotal, setIsLoading)
      }
      // else {
      //   toast.error('Please try again later')
      // }
    })
  }
  //#endregion

  const handleDeletePopup = (ItemId) => {
    setIsDeletePopup(ItemId)
  }

  const handleDelete = (ItemId) => {
    deleteCourse(ItemId, setIsLoading).then(res => {
      if (res.status === 200) {
        setIsDeletePopup(-1)
        toast.success(res.data.success)
        getCourseApi(`staff/deleteCourse?page=${Active}`, setCourseData, setTotal, setIsLoading)
      }
    })
  }

  const handleEditPopup = (ItemId) => {
    setIsEdit(ItemId)
    setCourseCode(CourseData[ItemId].code)
    setCourseName(CourseData[ItemId].name)
    setdepartment(CourseData[ItemId].depCode)
  }

  const handleEditCancel = () => {
    setIsEdit(-1)
    setCourseCode('')
    setCourseName('')
    setdepartment('')
  }

  //#region apicall
  const handleInputChange = debounce(async (value) => {
    if (value.length % 2 !== 0) {
      getCourseApi(`staff/getAllCourses?page=1&question=${value}`, setCourseData, setTotal, setIsLoading)
    }
    else if (value.length == 0) {
      getCourseApi(`staff/getAllCourses?page=1&question=`, setCourseData, setTotal, setIsLoading)
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
        <p className=' font-semibold text-xl grow'>Courses List</p>

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

        <button onClick={() => setIsOpen(true)} className=' h-10 px-3 bg-black rounded-lg text-white'>New Course</button>
      </div>

      <div className=' w-full grow flex flex-col items-center py-4'>
        <div className=' w-[60%] font-semibold text-lg grid grid-cols-5 h-12 bg-slate-300 place-content-center place-items-center rounded-lg'>
          <p>Id</p>
          <p>Course Code</p>
          <p>Course Name</p>
          <p>Department</p>
          <p>Actions</p>
        </div>
        {isLoading ? <img src={loading} alt="" className=' h-12 w-12 absolute top-1/2' /> : CourseData.map((item, index) =>
          <div key={index} className={` w-[60%] font-medium text-sm grid grid-cols-5 h-12 border-b place-content-center place-items-center rounded-lg`}>
            <p>{index + 1 + (Active - 1) * 10}</p>
            <p>{item.code}</p>
            <p className=' text-center truncate overflow-hidden w-full'>{item.name}</p>
            <p>{item.depCode}</p>
            <div className=' flex space-x-3'>
              <div className=' text-lg' onClick={() => handleEditPopup(index)}>
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

      <div className=' h-10 w-full flex justify-center items-start relative'>
        <Pagination active={Active} setActive={setActive} total={Total} />

        <button className=' px-4 py-2 bg-[#4f72cc] absolute right-3 bottom-2 rounded-md text-white font-medium ' onClick={() => setIsOpenImport(true)}>Import</button>

      </div>

      {isOpen &&
        <div className=" fixed z-20 w-screen h-screen  top-0 right-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
          <div className=" w-[30%] h-[40%] rounded-lg bg-white shadow-2xl antialiased p-2 flex flex-col">
            <div className="w-full grow flex flex-col">

              <div className=" flex space-x-2 text-xl font-semibold items-center border-b py-2">
                <ion-icon name="add"></ion-icon>
                <p >New Course</p>
              </div>

              <div className=" w-full  grow flex flex-col space-y-2 justify-start items-center px-7 py-4">
                <div className=' w-full space-x-2 flex items-center relative ' ref={dropdownRef2}>
                  <h1 className="text-[#676060] w-[40%]">Department :</h1>
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
                  {isOpen2 && (
                    <ul className="absolute z-20 mt-2 w-[60%] flex right-0 top-9 flex-col items-center min-h-min max-h-[20rem] overflow-y-hidden  bg-white border border-gray-300 rounded-md shadow-md">
                      {isLoading2 ? (<img src={loading} alt="" className=" w-8 h-8 animate-spin text-black" />) :
                        (searchValue.length === 0 ? (
                          <li className="py-1 px-4 text-gray-400">{deparment.length === 0 ? "Type..." : "No Department found"}</li>
                        ) : (
                          searchValue.map((item, index) => (
                            <li
                              key={item.id}
                              onClick={() => departmentOnSelect(item)}
                              className={`py-1 px-4 cursor-pointer ${index === focusedOptionIndex ? 'bg-blue-200 w-full flex justify-center' : ''}`}
                            >
                              {item.departmentCode}
                            </li>
                          ))
                        ))
                      }
                    </ul>
                  )}
                </div>

                <div className=' w-full space-x-2 flex items-center '>
                  <h1 className="text-[#676060] w-[40%]">Course Code :</h1>
                  <input
                    type="text"
                    value={CourseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    placeholder="23MCA1CC1"
                    className='bg-[#F8FCFF] shadow-sm border h-10 w-[9rem] xl:w-[60%] rounded px-2 text-black font-medium'
                  />

                </div>

                <div className=' w-full space-x-2 flex items-start '>
                  <h1 className="text-[#676060] w-[40%]">Course Name :</h1>
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
                <p className=' text-center text-lg text-red-500'><ion-icon name="warning"></ion-icon>Assosiated Course and the student mark will be deleted</p>
                <p className=' text-center'>Are you sure to delete this course "<span className=' font-bold'>{CourseData[isDeletePopup].name}-{CourseData[isDeletePopup].depCode} </span>" ? </p>
              </div>

            </div>

            <div className=" w-full space-x-2 flex justify-end font-medium ">
              <button className=" px-2 py-2 rounded-md bg-[#4f72cc] text-white hover:shadow-lg hover:shadow-[#4f72cc] transition-all duration-700" onClick={() => setIsDeletePopup(-1)}>Cancel</button>
              <button className=" px-3 py-2 rounded-md hover:bg-red-700 text-red-700 hover:bg-opacity-10 transition-all duration-700" onClick={() => handleDelete(CourseData[isDeletePopup].id)}>Sure</button>

            </div>


          </div>
        </div>
      }

      {isEdit !== -1 &&
        <div className=" fixed z-20 w-screen h-screen  top-0 right-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
          <div className=" w-[30%] h-[40%] rounded-lg bg-white shadow-2xl antialiased p-2 flex flex-col">
            <div className="w-full grow flex flex-col">

              <div className=" flex space-x-2 text-xl font-semibold items-center border-b py-2">
                <ion-icon name="add"></ion-icon>
                <p >Edit Course</p>
              </div>

              <div className=" w-full  grow flex flex-col space-y-2 justify-start items-center px-7 py-4">
                <div className=' w-full space-x-2 flex items-center relative ' ref={dropdownRef2}>
                  <h1 className="text-[#676060] w-[40%]">Department :</h1>
                  <input
                    type="text"
                    value={deparment}
                    maxLength={3}
                    disabled={true}
                    // onBlur={() => !optionSelected && setdepartment('')} // Modify this line
                    onChange={departmentOnChange}
                    onFocus={handleDropdownToggle2}
                    placeholder="Eg: MCA"
                    className='bg-[#F8FCFF] shadow-sm border h-10 w-[60%] rounded px-2 text-black font-medium'
                  />
                  {isOpen2 && (
                    <ul className="absolute z-20 mt-2 w-[60%] flex right-0 top-9 flex-col items-center min-h-min max-h-[20rem] overflow-y-hidden  bg-white border border-gray-300 rounded-md shadow-md">
                      {isLoading2 ? (<img src={loading} alt="" className=" w-8 h-8 animate-spin text-black" />) :
                        (searchValue.length === 0 ? (
                          <li className="py-1 px-4 text-gray-400">{deparment.length === 0 ? "Type..." : "No Department found"}</li>
                        ) : (
                          searchValue.map((item, index) => (
                            <li
                              key={item.id}
                              onClick={() => departmentOnSelect(item)}
                              className={`py-1 px-4 cursor-pointer ${index === focusedOptionIndex ? 'bg-blue-200 w-full flex justify-center' : ''}`}
                            >
                              {item.departmentCode}
                            </li>
                          ))
                        ))
                      }
                    </ul>
                  )}
                </div>

                <div className=' w-full space-x-2 flex items-center '>
                  <h1 className="text-[#676060] w-[40%]">Course Code :</h1>
                  <input
                    type="text"
                    value={CourseCode}
                    disabled={true}
                    onChange={(e) => setCourseCode(e.target.value)}
                    placeholder="23MCA1CC1"
                    className='bg-[#F8FCFF] shadow-sm border h-10 w-[9rem] xl:w-[60%] rounded px-2 text-black font-medium'
                  />

                </div>

                <div className=' w-full space-x-2 flex items-start '>
                  <h1 className="text-[#676060] w-[40%]">Course Name :</h1>
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
              <button className=" px-3 py-2 rounded-md hover:bg-red-700 text-red-700 hover:bg-opacity-10 transition-all duration-700" onClick={() => handleEditCancel()}>Cancel</button>
              <button className=" px-2 py-2 rounded-md bg-[#4f72cc] text-white hover:shadow-lg hover:shadow-[#4f72cc] transition-all duration-700" onClick={handleSubmit}>Add</button>
            </div>


          </div>
        </div>
      }

      {isOpenImport &&
        <div className=" fixed z-20 w-screen h-screen  top-0 right-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
          <div className=" w-[30%] h-[50%] rounded-lg bg-white shadow-2xl antialiased p-2 flex flex-col">
            <div className="w-full grow flex flex-col space-y-4">

              <div className=" flex space-x-2 text-xl font-semibold items-center">
                <ion-icon name="cloud-upload-outline"></ion-icon>
                <p >Excel Import</p>
              </div>

              <div className=" w-full  grow flex  flex-col justify-evenly items-center">

                <div
                  className="w-[70%] h-[50%] p-4 grid place-content-center cursor-pointer bg-blue-50 text-[#4f72cc] rounded-lg hover:bg-blue-100 border-4 border-dashed border-violet-100 hover:border-[#4f72cc] transition-colors"
                  onDragOver={(e) => {
                    preventDefaultHandler(e);
                    setShouldHighlight(true);
                  }}
                  onDragEnter={(e) => {
                    preventDefaultHandler(e);
                    setShouldHighlight(true);
                  }}
                  onDragLeave={(e) => {
                    preventDefaultHandler(e);
                    setShouldHighlight(false);
                  }}
                  onDrop={(e) => {
                    preventDefaultHandler(e);
                    // Get the first file from the dropped files
                    setFileList(e.dataTransfer.files[0]); // Set the fileList state with an array containing only the first file
                    setShouldHighlight(false);
                  }}
                >
                  <div className="flex flex-col items-center">
                    {!fileList ? (
                      <>
                        <ion-icon name="cloud-upload-outline"></ion-icon>
                        <span>
                          <span>Choose a File</span> or drag it here
                        </span>
                      </>
                    ) : (
                      <>
                        <p>Files to Upload</p>

                        <span >{fileList.name}</span>;

                        <div className="flex gap-2 mt-2">
                          <button
                            className="bg-[#4f72cc] text-violet-50 px-2 py-1 rounded-md w-full"

                            onClick={() => handleUpload()}
                          >
                            {uploading
                              ? `Uploading...  ( ${progress.toFixed(2)}% )`
                              : "Upload"}
                          </button>
                          {!uploading && (
                            <button
                              className="border border-[#4f72cc] px-2 py-1 rounded-md"
                              onClick={() => {
                                setFileList(null);
                              }}
                            >
                              Clear
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

              </div>

            </div>
            <div className=" w-full space-x-2 flex justify-end font-medium ">
              <button className=" px-3 py-2 rounded-md hover:bg-red-700 text-red-700 hover:bg-opacity-10 transition-all duration-700" onClick={() => setIsOpenImport(false)}>Close</button>

            </div>
          </div>
        </div>
      }

    </div>
  )
}

export default ManageCourse
