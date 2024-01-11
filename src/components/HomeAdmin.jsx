import React, { useEffect, useState } from "react";
import results from "../assets/results.png";
import marks from "../assets/add marks.png";
import course from "../assets/add cources.png";
import logo from "../assets/Logo.png";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { toast } from "react-hot-toast";
import '../App.css'
import { getYearApi, setYearApi } from "../api/api";

function HomeAdmin({ Role, setRole, setuserName, setuserId, date, setDate }) {

  const navigate = useNavigate();
  let token = localStorage.getItem('token');
  const [dateData, setDataData] = useState([2023, 2024, 2025, 2026, 2027, 2028]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {

      let decodedToken = jwtDecode(token);
      let currentTime = Date.now() / 1000;

      console.log(decodedToken)

      setRole(decodedToken.role)
      setuserName(decodedToken.name)
      setuserId(decodedToken.uname)

      if (decodedToken.exp < currentTime) {
        toast.error("Token Expired Directing To Login!", { theme: 'colored', autoclose: 1 });
        localStorage.removeItem('token');
        navigate('/login');
      }

    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }, [token, navigate]);

  const handleLogOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  let menus = [
    {
      icon: "add",
      name: "Add Marks",
      by: "manage",
      path: "/Admin/"
    },
    {
      icon: "folder-open-outline",
      name: "Manage Departments",
      by: "manage",
      path: "/Admin/Manage-Department"
    },
    {
      icon: "folder-open-outline",
      name: "Manage Courses",
      by: "manage",
      path: "/Admin/Manage-Course"
    },

    {
      icon: "folder-open-outline",
      name: "Manage Staffs",
      by: "manage",
      path: "/Admin/Manage-Staff"
    },
    {
      icon: "book",
      name: "Student's Outcomes",
      by: "report",
      path: "/Admin/Outcome/Student"
    },
    {
      icon: "book",
      name: "Course Outcomes",
      by: "report",
      path: "/Admin/Outcome/Course"
    },
    {
      icon: "book",
      name: "Program Specific Outcomes",
      by: "report",
      path: "/Admin/Outcome/Program"
    },
    {
      icon: "book",
      name: "Program Outcomes-Science",
      by: "report",
      path: "/Admin/Outcome/Science-Outcome"
    },
    {
      icon: "book",
      name: "Program Outcomes-Arts",
      by: "report",
      path: "/Admin/Outcome/Arts-Outcome"
    },
    // {
    //   icon: "person-circle-outline",
    //   name: "Account",
    //   by: "manage",
    //   path: "/Account"
    // },

  ]

  //#region hanledOnselectDate
  const handleCourseOnDate = (e) => {
    setDate(e.target.value)
    setYearApi(e.target.value)
  }
  //#endregion

  return (
    <div className=" w-screen h-screen bg-white flex flex-col">
      <div className=" w-full flex h-full  relative">

        <div className=" w-[19%] absolute border-r border-white left-0 top-0 h-full z-10  p-1 flex flex-col bg-gradient-to-br from-[#4f72cc] to-[#58caea] ">

          <div className=" w-full flex flex-col justify-start items-center border border-white rounded-lg bg-white/75 py-2 px-3 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
            <div className="w-full flex justify-start space-x-2 items-start ">
              <img src={logo} alt="" className=" h-20 " />
              <div className=" w-full h-24 space-y-2">
                <p className=" text-lg font-bold">OBE Software</p>
                <p className=" font-medium">Admin Panel</p>
              </div>
            </div>


          </div>

          <div className=" w-full grow py-4 px-2 text-white space-y-3">

            <div className=" w-full space-y-3">
              <div className=" w-full flex justify-between">
                <p className=" text-lg font-bold text-black">Manage</p>
                <div className=" space-x-2 flex items-center">
                  <h1 className="text-[#000000] font-medium">Year</h1>
                  <select
                    value={date}
                    onChange={handleCourseOnDate}
                    className={`bg-[#f8fcff00] shadow-sm border h-fit w-[5rem] font-medium rounded px-2 ${date === '' ? 'text-gray-400' : 'text-black'}`}
                  >
                    {dateData.map((eachDate, index) => (
                      <option key={index} value={eachDate} className="rounded font-medium">
                        {eachDate}
                      </option>
                    ))}
                  </select>
                </div>
              </div>


              <div className=" space-y-2">
                {
                  menus.map((item, index) => item.by === 'manage' &&
                    <NavLink
                      to={item.path}
                      className=' space-x-4 text-xl pl-[5px] flex items-center h-[45px] transition-all duration-800 hover:bg-black hover:rounded-[5px] hover:bg-opacity-50' >
                      <ion-icon name={item.icon}></ion-icon>
                      <label className=' text-center cursor-pointer text-sm text-white relative z-10'>{item.name}</label>
                    </NavLink>
                  )
                }

              </div>

            </div>

            <div className=" w-full space-y-3">
              <p className=" text-lg font-bold text-black">Reports</p>

              <div className=" space-y-2">
                {
                  menus.map((item, index) => item.by === 'report' &&
                    <NavLink
                      to={item.path}
                      className=' space-x-4 text-xl pl-[5px] flex items-center h-[45px] transition-all duration-800 hover:bg-black hover:rounded-[5px] hover:bg-opacity-50' >
                      <ion-icon name={item.icon}></ion-icon>
                      <label className=' text-center cursor-pointer text-sm text-white relative z-10'>{item.name}</label>
                    </NavLink>
                  )
                }

                <div onClick={handleLogOut} className=" transition-all duration-300 space-x-4 w-full h-10 text-2xl  cursor-pointer bg-white  text-red-600 flex  items-center  rounded-[5px]">
                  <ion-icon name="log-in"></ion-icon>
                  <p className=" text-sm font-medium">Log Out</p>
                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="  w-full pl-[20%] bg-gradient-to-r from-slate-200 to-white h-full">
          <Outlet />
        </div>

      </div>

      {/* <div className="w-full h-full bg-white  rounded-lg ">

        <div className=" bg-[#D7EAFF] flex justify-between items-center p-5 rounded-t-lg">
          <div className=" flex">
            <img src={logo} alt="no img"></img>
            <h1 class="text-black text-[18px] font-medium flex flex-col justify-center items-center">
              JAMAL MOHAMED COLLEGE
              <h1 className="text-black text-[18px] font-normal flex">
                (Autonomous)
              </h1>
              <p className="font-medium"> TIRUCHIRAPPALLI </p>
            </h1>
          </div>

          {/* <div className=" space-y-2 flex flex-col items-center">
            <div className=" text-black font-medium">{userName}</div>
            <div className="flex justify-center items-center w-[80px] h-[40px] rounded-lg bg-[#3b84f4] text-white font-medium cursor-pointer" onClick={handleLogOut}>
              Log Out
            </div>
          </div> */}

      {/* <div className="relative space-y-2 flex flex-col items-center mr-4">
            <div className=" bg-blue-200 rounded-full px-5 py-3 cursor-pointer" onClick={handleLogOutbtn}>
              <p className=" font-medium cursor-pointer">{userName[0]}</p>
            </div>
            {logOutBtn === true && (
              <div className=" absolute top-12 flex justify-center items-center w-[80px] h-[40px] rounded-lg bg-[#3b84f4] text-white font-medium cursor-pointer" onClick={handleLogOut}>
                Log Out
              </div>
            )}
          </div>

        </div>

        <div className=" w-full py-[150px] flex justify-center items-center space-x-10">

          <div className="flex flex-col justify-center items-center space-y-3 cursor-pointer" onClick={() => navigate("/addmarks")}>
            <div className="w-[100px] h-[100px] bg-[#3b84f4] rounded-lg p-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              <img src={marks} alt="no img" />
            </div>
            <h1 className=" font-medium ">Add Marks</h1>
          </div>

          <div className="flex flex-col justify-center items-center space-y-3 cursor-pointer " onClick={() => navigate("/result")}>

            <div className="w-[100px] h-[100px] bg-[#3b84f4] rounded-lg p-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              <img src={results} alt="no img" />
            </div>

            <h1 className=" font-medium ">Results</h1>

          </div>

          <div className={` ${Role === 'Staff' && 'hidden'} flex flex-col justify-center items-center space-y-3 cursor-pointer`}>
            <div className="w-[100px] h-[100px] bg-[#3b84f4] rounded-lg p-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              <img src={course} alt="no img" />
            </div>
            <h1 className=" font-medium ">Add course</h1>
          </div>

        </div>

      </div> */}
    </div>
  );
}

export default HomeAdmin;
