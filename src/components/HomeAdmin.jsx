import React, { useEffect, useState } from "react";
import results from "../assets/results.png";
import marks from "../assets/add marks.png";
import course from "../assets/add cources.png";
import logo from "../assets/Logo.png";
import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { toast } from "react-hot-toast";
import '../App.css'
import { getYearApi, setYearApi } from "../api/api";
import { Option, Radio, Select } from "@material-tailwind/react";

function HomeAdmin({ Role, setRole, setuserName, setuserId, date, setDate, year, setCurrentYear, currentSem, setCurrentSem }) {

  const navigate = useNavigate();
  let token = localStorage.getItem('token');
  const dateData = [2023, 2024, 2025, 2026, 2027, 2028];
  const semData = ["odd", "even"];

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
      icon: "menu",
      name: "Dashboard",
      path: "/Admin/"
    },
    {
      icon: "add-circle",
      name: "Add Marks",
      path: "/Admin/addmarks"
    },

    {
      icon: "albums",
      name: "Manage",
      path: "/Admin/manage"
    },
    {
      icon: "documents",
      name: "Reports",
      path: "/Admin/reports"
    },
    {
      icon: "desktop",
      name: "Outcome",
      path: "/Admin/Outcome"
    },

  ]

  //#region hanledOnselectDate
  const handleCourseOnDate = (e) => {
    setDate(e)
  }
  //#endregion

  //#region handleCourseOnSem
  const handleCourseOnSem = (e) => {
    setCurrentSem(e.target.value)
  }
  //#endregion

  //#region hanledOnselectDate
  const handlesetOnDate = () => {
    setYearApi(date).then(res => {
      if (res?.status === 200) {
        getYearApi().then(res => {
          if (res?.status === 200) {
            setDate(res?.data.data)
            setCurrentYear(res?.data.data)
            navigate('/');
            toast.success('Year set successfully')
          }
        })
      }
    }
    )
  }
  //#endregion

  return (
    <div className=" w-screen h-screen bg-white flex  relative overflow-hidden">


      <div className=" w-[19%]   overflow-hidden absolute border-r border-white left-0 top-0 h-full z-0  p-1 flex flex-col bg-gradient-to-br from-[#4f72cc] to-[#58caea] ">

        <div className=" w-full space-y-4 flex flex-col justify-start items-center border border-white rounded-lg bg-white/75 shadow-lg shadow-black/5 saturate-200 backdrop-blur-md">
          <div className="w-full flex justify-start space-x-2 items-start  py-2 px-3  rounded-md">
            <img src={logo} alt="" className=" h-16 " />
            <div className=" w-full h-22 space-y-2">
              <p className=" text-lg font-bold">OBE Software</p>
              <p className=" font-medium">Admin</p>

            </div>
          </div>
          <div className=" w-full  rounded-md p-2 flex flex-col space-y-2">


            <div className=" flex flex-col space-y-3 bg-white p-2 rounded-lg">
              <div className=" flex justify-center space-x-2 font-medium w-full">
                <p>Academic year :</p>
                <p>{year}-{year + 1}</p>
              </div>
              <p className=" font-medium w-full flex justify-center">Semester </p>

              <div className=" w-full flex justify-center space-x-4">
                <label
                  className={`transition-all duration-300 ${currentSem === 'odd'
                    ? "bg-[#4f72cc] text-white"
                    : "bg-slate-200"
                    } hover:bg-[#4f72cc] hover:text-white px-2 py-1 rounded-md cursor-pointer font-medium`}
                >
                  <input
                    type="radio"
                    value='odd'
                    checked={currentSem === 'odd'}
                    onChange={() =>{
                      setCurrentSem('odd')
                      navigate('/Admin/')
                    } }
                    className="sr-only" // Hide the actual radio button
                  />
                  Odd
                </label>
                <label
                  className={`transition-all duration-300 ${currentSem === 'even'
                    ? "bg-[#4f72cc] text-white"
                    : "bg-slate-200"
                    } hover:bg-[#4f72cc] hover:text-white px-2 py-1 rounded-md cursor-pointer font-medium`}
                >
                  <input
                    type="radio"
                    value='even'
                    checked={currentSem === 'even'}
                    onChange={() => {
                      setCurrentSem('even')
                      navigate('/Admin/')
                    }}
                    className="sr-only" // Hide the actual radio button
                  />
                  Even
                </label>
              </div>

            </div>


            <div className=" flex flex-col justify-end space-y-2 font-normal w-full z-40 relative">
              <p className=" font-medium">Preview :</p>
              <Select value={date} onChange={handleCourseOnDate} className=" z-50 relative bg-white border-[0px]">

                {dateData.map((eachDate, index) => (
                  <Option key={index} value={eachDate} className="rounded font-medium flex !bg-white ">
                    {eachDate}-{eachDate + 1}
                  </Option>))
                }


              </Select>

              <div className=" bg-[#46ae38] right-1 bottom-1  absolute z-50 w-fit rounded-md gap-1 px-2 py-1  flex items-center text-white font-medium cursor-pointer" onClick={() => handlesetOnDate()}>
                <ion-icon name="checkmark-circle"></ion-icon>
                set
              </div>
            </div>


          </div>


        </div>



        <div className=" w-full grow py-4 px-2 text-white space-y-3">

          <div className=" w-full space-y-3 ">



            <div className=" space-y-1">
              {
                menus.map((item, index) =>
                  <NavLink
                    to={item.path}
                    className=' z-0 space-x-4 text-2xl pl-[5px] flex items-center h-[45px] transition-all duration-800 hover:bg-black hover:rounded-[5px] hover:bg-opacity-50' >
                    <ion-icon name={item.icon}></ion-icon>
                    <label className=' text-center cursor-pointer text-base font-medium text-white relative z-10'>{item.name}</label>
                  </NavLink>
                )
              }

            </div>
            <div onClick={handleLogOut} className=" transition-all  justify-center duration-300 space-x-4 w-full h-10 text-2xl  cursor-pointer bg-white  text-red-600 flex  items-center  rounded-[5px]">
              <ion-icon name="log-in"></ion-icon>
              <p className=" text-sm font-medium">Log Out</p>
            </div>

          </div>



        </div>



      </div>

      <div className="  w-full pl-[20%] bg-gradient-to-r from-slate-200 to-white h-full">
        <Outlet />
      </div>

    </div>
  );
}

export default HomeAdmin;
