

import React, { useEffect, useRef, useState } from 'react'
import { AddNewCourse, AddNewProgram, deleteCourse, deleteDep, excelApi, getCourseApi, searchData } from '../../../api/api';
import { Pagination } from '../../addMarks/pagiNation';
import loading from "../../../assets/loading.svg";
import { debounce } from 'lodash';
import toast from 'react-hot-toast';
import sampleCSV from '../../../assets/program.csv';

function ManageDepartment({ year,currentSem }) {
  const [CourseData, setCourseData] = useState([]);
  const [Total, setTotal] = useState(0);
  const [Active, setActive] = useState(1);
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(-1);
  const [isDeletePopup, setIsDeletePopup] = useState(-1);
  const [isImportLoading, setIsImportLoading] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);

  const [Name, setName] = useState('');
  const [Code, setCode] = useState('');
  const [Cat, setCat] = useState('Science');

  const [searchText, setSearchText] = useState('');
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

    excelApi('staff/addDepartmentByExcel?year=' + year, data, setProgress, setFileList,setIsImportLoading).then((res) => {
      if (res?.status === 200) {
        toast.success("Imported successfully", { duration: 1500 });
        getCourseApi(`staff/getAllDepartment?page=1&year=` + year, setCourseData, setTotal, setIsLoading)
        setIsOpenImport(false)
        setIsImportLoading(false)
      }
    })

  };

  const uploading = progress > 0 && progress < 100;

  useEffect(() => {
    getCourseApi(`staff/getAllDepartment?page=${Active}&sem=${currentSem}&year=` + year, setCourseData, setTotal, setIsLoading)
  }, [Active])

  const handleSubmit = () => {
    if (!Cat || !Code || !Name) {
      return toast.error('Please fill all field')
    }
    const data = {
      name: Name,
      depCode: Code,
      cat: Cat,
      year: year
    }

    AddNewProgram(data, setIsLoading3).then((res) => {
      if (res?.status === 200) {
        toast.success(Code + ' is added successfully')
        setIsOpen(false);
        setCode('');
        setName('');
        setIsEdit(-1)
        getCourseApi(`staff/getAllDepartment?page=${Active}&year=` + year, setCourseData, setTotal, setIsLoading)
      }
      else {
        toast.error('Please try again later')
      }
    })
  }

  const handleDeletePopup = (ItemId) => {
    setIsDeletePopup(ItemId)
  }

  const handleEditPopup = (ItemId) => {
    setIsEdit(ItemId)
    setCode(CourseData[ItemId].departmentCode)
    setName(CourseData[ItemId].name)
    setCat(CourseData[ItemId].catagory)
  }

  const handleDelete = (ItemId) => {
    deleteDep(ItemId, setIsLoading).then(res => {
      if (res?.status === 200) {
        setIsDeletePopup(-1)
        toast.success(res.data.success)
        getCourseApi(`staff/getAllDepartment?page=${Active}&year=` + year, setCourseData, setTotal, setIsLoading)
      }
    })
  }

  //#region apicall
  const handleInputChange = debounce(async (value) => {
    if (value.length % 2 !== 0) {
      getCourseApi(`staff/getAllDepartment?page=1&question=${value}&year=` + year, setCourseData, setTotal, setIsLoading)
    }
    else if (value.length == 0) {
      getCourseApi(`staff/getAllDepartment?page=${Active}&year=${year}&question=`, setCourseData, setTotal, setIsLoading)
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

  //#region toDownload Sample csv
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = sampleCSV;
    link.setAttribute('download', 'sampleProgram.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  //#endregion

  return (
    <div className=' h-full w-full xl:h-[45rem] 2xl:h-[39rem] flex flex-col bg-white rounded-md shadow-md p-2'>
      <div className=' h-12 px-2  py-2 w-full flex justify-between items-end space-x-2'>
        <p className=' font-semibold text-xl grow'>Programme List</p>

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

        <button onClick={() => setIsOpen(true)} className=' h-10 px-3 bg-black font-medium rounded-lg text-white'>New Programme</button>
      </div>

      <div className=' w-full grow flex flex-col items-center py-2'>
        <div className=' w-[70%] px-2 font-medium  grid grid-cols-6 h-12 bg-slate-300 place-content-center place-items-center rounded-lg'>
          <p className=' text-start w-full'>S. No.</p>
          <p className=' text-start w-full'>Programme Code</p>
          <p className=' text-start w-full col-span-2'>Programme Name</p>
          <p className=' text-start w-full'>Catagory</p>
          <p className=' text-center w-full'>Action</p>
        </div>
        {isLoading ? <img src={loading} alt="" className=' h-12 w-12 absolute top-1/2' /> : CourseData.map((item, index) =>
          <div key={index} className={` w-[70%] px-2 font-medium text-sm grid grid-cols-6 h-11 border-b place-content-center place-items-center rounded-lg`}>
            <p className=' text-start w-full'>{index + 1 + (Active - 1) * 10}</p>
            <p className=' text-start w-full'>{item.departmentCode}</p>
            <p className=' text-start col-span-2  truncate overflow-hidden w-full'>{item.name}</p>
            <p className=' text-start w-full'>{item.catagory}</p>
            <div className=' flex space-x-3'>
              <div className=' text-lg hover:text-blue-600 cursor-pointer' onClick={() => handleEditPopup(index)}>
                <ion-icon name="create-outline"></ion-icon>
              </div>
              <div className=' text-lg hover:text-red-600 cursor-pointer' onClick={() => handleDeletePopup(index)}>
                <ion-icon name="trash-outline"></ion-icon>
              </div>
            </div>

          </div>
        )
        }
      </div>

      <div className=' h-10 w-full flex justify-center items-start relative'>
      {Total !== 0 && <Pagination active={Active} setActive={setActive} total={Total} />}

        <button className=' px-4 py-2 bg-[#4f72cc] absolute right-3 bottom-2 rounded-md text-white font-medium ' onClick={() => setIsOpenImport(true)}>Import</button>

      </div>

      {isOpen &&
        <div className=" fixed z-20 w-screen h-screen  top-0 right-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
          <div className=" w-[30%] h-[45%] rounded-lg bg-white shadow-2xl antialiased p-2 flex flex-col">
            <div className="w-full grow flex flex-col">

              <div className=" flex space-x-2 text-xl font-semibold items-center border-b py-2">
                <ion-icon name="add-circle"></ion-icon>
                <p className=' text-base' >New Programme</p>
              </div>

              <div className=" w-full  grow flex flex-col space-y-2 justify-start items-center px-7 py-4">

                <div className=' w-full space-x-2 flex items-center '>
                  <h1 className="text-[#676060] w-[40%]">Programmme Category :</h1>
                  <select
                    value={Cat}
                    onChange={(e) => setCat(e.target.value)}
                    className={`bg-[#F8FCFF] shadow-sm border h-10 w-[9rem] font-medium rounded px-2 ${Cat === '' ? 'text-gray-400' : 'text-black'}`}
                  >
                    <option value='Science' className="rounded mt-10">
                      Science
                    </option>
                    <option value='Arts' className="rounded mt-10">
                      Arts
                    </option>
                  </select>

                </div>

                <div className=' w-full space-x-2 flex items-center relative ' >
                  <h1 className="text-[#676060] w-[40%]">Programme Code :</h1>
                  <input
                    type="text"
                    value={Code}
                    maxLength={3}
                    // onBlur={() => !optionSelected && setdepartment('')} // Modify this line
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="MCA"
                    className='bg-[#F8FCFF] shadow-sm border h-10 w-[60%] rounded px-2 text-black font-medium'
                  />

                </div>


                <div className=' w-full space-x-2 flex items-start '>
                  <h1 className="text-[#676060] w-[40%]">Programme Name :</h1>
                  <textarea
                    type="text"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Computer Application"
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
          <div className=" w-[30%] h-[45%] rounded-lg bg-white shadow-2xl antialiased p-2 flex flex-col">
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
              <button className=" px-2 py-2 rounded-md bg-[#4f72cc] text-white hover:shadow-lg hover:shadow-[#4f72cc] transition-all duration-700" onClick={() => setIsDeletePopup(-1)}>Cancel</button>
              <button className=" px-3 py-2 rounded-md hover:bg-red-700 text-red-700 hover:bg-opacity-10 transition-all duration-700" onClick={() => handleDelete(CourseData[isDeletePopup].id)}>Sure</button>

            </div>


          </div>
        </div>
      }

      {isEdit !== -1 &&
        <div className=" fixed z-20 w-screen h-screen  top-0 right-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
          <div className=" w-[30%] h-[45%] rounded-lg bg-white shadow-2xl antialiased p-2 flex flex-col">
            <div className="w-full grow flex flex-col">

              <div className=" flex space-x-2 text-xl font-semibold items-center border-b py-2">
                <ion-icon name="add"></ion-icon>
                <p >Edit Programme</p>
              </div>

              <div className=" w-full  grow flex flex-col space-y-2 justify-start items-center px-7 py-4">

                <div className=' w-full space-x-2 flex items-center '>
                  <h1 className="text-[#676060] w-[40%]">Programme Category :</h1>
                  <select
                    value={Cat}
                    onChange={(e) => setCat(e.target.value)}
                    className={`bg-[#F8FCFF] shadow-sm border h-10 w-[9rem] font-medium rounded px-2 ${Cat === '' ? 'text-gray-400' : 'text-black'}`}
                  >
                    <option value='Science' className="rounded mt-10">
                      Science
                    </option>
                    <option value='Arts' className="rounded mt-10">
                      Arts
                    </option>
                  </select>

                </div>

                <div className=' w-full space-x-2 flex items-center relative ' >
                  <h1 className="text-[#676060] w-[40%]">Programme Code :</h1>
                  <input
                    type="text"
                    value={Code}
                    maxLength={3}
                    // onBlur={() => !optionSelected && setdepartment('')} // Modify this line
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="MCA"
                    className='bg-[#F8FCFF] shadow-sm border h-10 w-[60%] rounded px-2 text-black font-medium'
                  />

                </div>


                <div className=' w-full space-x-2 flex items-start '>
                  <h1 className="text-[#676060] w-[40%]">Program Name :</h1>
                  <textarea
                    type="text"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Computer Application"
                    className='bg-[#F8FCFF] shadow-sm border h-20 w-[9rem] xl:w-[60%] rounded px-2 text-black font-medium'
                  />

                </div>



              </div>

            </div>

            <div className=" w-full space-x-2 flex justify-end font-medium ">
              <button className=" px-3 py-2 rounded-md hover:bg-red-700 text-red-700 hover:bg-opacity-10 transition-all duration-700" onClick={() => setIsEdit(-1)}>Cancel</button>
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
            <div className=' w-full flex justify-center items-center absolute top-10'>
              {
                isImportLoading && <img src={loading} alt="" className=' h-8' />
              }
            </div>
            <div className=" w-full space-x-2 flex justify-between font-medium ">
              <div className=" underline cursor-pointer" onClick={handleDownload}>
                Sample Format
              </div>
              <button className=" px-3 py-2 rounded-md hover:bg-red-700 text-red-700 hover:bg-opacity-10 transition-all duration-700" onClick={() => setIsOpenImport(false)}>Close</button>

            </div>
          </div>
        </div>
      }

    </div>
  )
}

export default ManageDepartment
