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

function HomeAdmin({ Role, setRole, setuserName, setuserId, date, setDate, year, setCurrentYear }) {

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
      path: "/Admin/"
    },

    {
      icon: "book",
      name: "Manage",
      path: "/Admin/manage"
    },
    {
      icon: "book",
      name: "Reports",
      path: "/Admin/reports"
    },
    {
      icon: "book",
      name: "Outcome",
      path: "/Admin/Outcome"
    },

  ]

  //#region hanledOnselectDate
  const handleCourseOnDate = (e) => {
    setDate(e.target.value)
    // setYearApi(e.target.value)
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

        <div className=" w-full space-y-4 flex flex-col justify-start items-center border border-white rounded-lg bg-white/75 py-2 px-3 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
          <div className="w-full flex justify-start space-x-2 items-start ">
            <img src={logo} alt="" className=" h-16 " />
            <div className=" w-full h-22 space-y-2">
              <p className=" text-lg font-bold">OBE Software</p>
              <p className=" font-medium">Admin Panel</p>

            </div>
          </div>
          <div className=" flex justify-start space-x-2 font-medium w-full">
            <p>Acadmeic year :</p>
            <p>{year}-{year+1}</p>
          </div>
          <div className=" flex justify-start space-x-2 font-normal w-full">
            <p className=" font-medium">Preview :</p>
            <div className=" flex space-x-2">
              <div className=" space-x-2 flex items-center ">

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
              <div className=" bg-blue-500 h-6 rounded-md px-2 text-white font-normal cursor-pointer" onClick={() => handlesetOnDate()}>
                Set
              </div>
            </div>
          </div>
        </div>

        <div className=" w-full grow py-4 px-2 text-white space-y-3">

          <div className=" w-full space-y-3 ">
            <div className=" w-full flex justify-between ">
              <p className=" text-lg font-bold text-black">Menus</p>

            </div>


            <div className=" space-y-1">
              {
                menus.map((item, index) =>
                  <NavLink
                    to={item.path}
                    className=' space-x-4 text-xl pl-[5px] flex items-center h-[45px] transition-all duration-800 hover:bg-black hover:rounded-[5px] hover:bg-opacity-50' >
                    <ion-icon name={item.icon}></ion-icon>
                    <label className=' text-center cursor-pointer text-sm text-white relative z-10'>{item.name}</label>
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
