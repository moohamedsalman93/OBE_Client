import React, { useEffect, useState } from "react";
import results from "../assets/results.png";
import marks from "../assets/add marks.png";
import course from "../assets/add cources.png";
import logo from "../assets/Logo.png";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { toast } from "react-hot-toast";
import '../App.css'
import { getYearApi } from "../api/api";
import { Radio } from "@material-tailwind/react";

function Home({ Role, setRole, setuserName, userName, setuserId, userId, currentSem, setCurrentSem  }) {

  const navigate = useNavigate();
  let token = localStorage.getItem('token');
  const [logOutBtn, setlogOutBtn] = useState(false);
  const [date, setDate] = useState()

  const handleLogOutbtn = () => {

    if (logOutBtn == true) {
      setlogOutBtn(false)
    }
    else {
      setlogOutBtn(true)
    }
  }

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

      if (decodedToken.uname === 'admin') {
        navigate('/Admin/');
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
      icon: "add-circle",
      name: "Add Marks",
      path: "/"
    },

    {
      icon: "albums",
      name: "Course Outcomes",
      path: "/Outcome/Course"
    },
    {
      icon: "extension-puzzle",
      name: "Relational Matrix",
      path: "/RelationalMatrix"
    },

    {
      icon: "settings",
      name: "Account",
      path: "/Account"
    },


  ]

  return (
    <div className=" w-screen h-screen bg-white flex flex-col">
      <div className=" w-full flex h-full  relative">

        <div className=" w-[19%] absolute border-r border-white left-0 top-0 h-full z-10  p-1 flex flex-col bg-gradient-to-br from-[#4f72cc] to-[#58caea] ">

          <div className=" w-full flex flex-col justify-start items-center border border-white rounded-lg bg-white/75 py-2 px-3 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
            <div className="w-full flex justify-start space-x-2 items-start ">
              <img src={logo} alt="" className=" h-20 " />
              <div className=" w-full h-24 font-bold space-y-2">
                <p className="">user : {userName}</p>
                <p className="">ID : {userId}</p>
              </div>
            </div>
            <div className=" flex flex-col justify-start space-y-2 font-normal w-full">
              <p className=" font-medium">Semester :</p>

              <div className=" font-medium">
                <Radio label="Odd" checked={currentSem === 'odd'} onChange={() => {
                  setCurrentSem("odd")
                  navigate('/');
                }} />
                <Radio label="Even" checked={currentSem === 'even'} onChange={() => {
                  setCurrentSem("even")
                  navigate('/');
                }} />
              </div>

            </div>
          </div>

          <div className=" w-full grow py-4 px-2 text-white">
            <div className=" w-full space-y-7">
              <p className=" text-medium font-semibold">Menus</p>

              <div className=" space-y-2">
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

                <div onClick={handleLogOut} className=" transition-all duration-300 space-x-4 w-full h-10 text-2xl  cursor-pointer bg-white  text-red-600 flex  items-center  rounded-[5px]">
                  <ion-icon name="log-in"></ion-icon>
                  <p className=" text-sm font-medium">Sign Out</p>
                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="  w-full pl-[20%] bg-gradient-to-r from-slate-200 to-white h-full">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default Home;
