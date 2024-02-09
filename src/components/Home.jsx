import React, { useEffect, useState } from "react";
import logo from "../assets/Logo.jpeg";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { toast } from "react-hot-toast";
import '../App.css'

function Home({ Role, setRole, setuserName, userName, setuserId, userId, currentSem, setCurrentSem, currentYear }) {

  const navigate = useNavigate();
  let token = localStorage.getItem('token');
  const [logOutBtn, setlogOutBtn] = useState(false);
  const [OpenInstruction, setOpenInstruction] = useState(false);

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
      icon: "menu",
      name: "Dashboard",
      path: "/"
    },
    {
      icon: "add-circle",
      name: "Add Marks",
      path: "/addmarks"
    },

    {
      icon: "albums",
      name: "Course Outcomes",
      path: "/Outcome/Course"
    },
    {
      icon: "extension-puzzle",
      name: "Relationship Matrix",
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

        <div className=" animate-slideinjmc w-[19%] absolute border-r border-white left-0 top-0 h-full z-10  p-1 flex flex-col bg-gradient-to-br from-[#4f72cc] to-[#58caea] ">

          <div className=" w-full h-fit space-y-4 flex flex-col justify-between items-center border border-white rounded-lg bg-white/75 py-2 px-3 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">

            <div className="w-full flex justify-start space-x-1 items-start ">


              <div className=" grow h-full flex items-center">
                <img src={logo} alt="" className=" h-24 w-24 rounded-md" />
              </div>


              <div className=" w-full h-full font-bold space-y-1 text-base flex flex-col items-center">
                <p className=" text-xl text-[#3b5f9c] ">Welcome</p>
                <p className=" text-center">{userName}</p>
                <p className="">{userId}</p>
              </div>

            </div>


            <div className=" flex flex-col justify-start space-y-2 font-normal w-full bg-white p-2 rounded-lg">
              <div className=" flex font-medium justify-center">
                <p>Academic Year : {currentYear}-{currentYear + 1}</p>
              </div>

              <div className=" flex flex-col space-y-2">
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
                      onChange={() => {
                        setCurrentSem('odd')
                        navigate('/')
                      }}
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
                        navigate('/')
                      }}
                      className="sr-only" // Hide the actual radio button
                    />
                    Even
                  </label>
                </div>

              </div>

            </div>
          </div>

          <div className=" w-full grow py-4 px-2 text-white">
            <div className=" w-full space-y-7">


              <div className=" space-y-2">
                {
                  menus.map((item, index) =>
                    <NavLink
                      to={item.path}
                      className=' space-x-4 text-xl pl-[5px] flex items-center h-[45px] transition-all duration-800 hover:bg-black hover:rounded-[5px] hover:bg-opacity-50' >
                      <ion-icon name={item.icon}></ion-icon>
                      <label className=' text-center cursor-pointer font-medium text-base text-white relative z-10'>{item.name}</label>
                    </NavLink>
                  )
                }

                <div onClick={handleLogOut} className=" transition-all duration-300 space-x-4 w-full h-10 text-2xl  cursor-pointer bg-white  text-red-600 flex justify-center  items-center  rounded-[5px]">
                  <ion-icon name="log-in"></ion-icon>
                  <p className=" text-base font-bold">Log Out</p>
                </div>

              </div>

              <div className=" flex space-x-2 text-lg items-center cursor-pointer justify-center animate-bounce text-black" onClick={() => setOpenInstruction(true)}>
                <ion-icon name="alert-circle"></ion-icon>
                <p className=" text-base font-medium">How to Enter the Marks</p>
              </div>

            </div>

          </div>

        </div>

        <div className="  w-full pl-[20%] bg-gradient-to-r from-slate-200 to-white h-full">
          {OpenInstruction ? <div className=" fixed z-50 w-screen h-screen  top-0 right-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
            <div className=" w-[60%] h-[85%] rounded-lg bg-white shadow-2xl antialiased p-2 flex flex-col">
              <div className=" relative w-full px-4 py-2">
                <p className=" text-xl font-semibold text-[#3b5f9c]">Please follow the instructions to enter the marks</p>
                <div onClick={() => setOpenInstruction(false)} className=" text-4xl text-red-600 animate-bounce bg-white cursor-pointer rounded-full  flex items-center  absolute right-[-20px] top-[-20px]">
                  <ion-icon name="close-circle"></ion-icon>
                </div>
              </div>
              <div className=" h-full w-full border-2 rounded-lg p-4 space-y-4 overflow-y-scroll ">

                <div>
                  <p className=" font-bold text-lg text-[#1e1f21]">
                    1. Select the Semester
                  </p>
                  <p className=" font-medium pl-20 w-full text-[#64686e]">
                    •	Navigate to the interface where you can choose the semester for which you want to enter marks.
                  </p>
                </div>

                <div>
                  <p className=" font-bold text-lg text-[#1e1f21]">
                    2.	Click the "Add Marks" Menu
                  </p>
                  <p className=" font-medium pl-20 w-full text-[#64686e]">
                    •	Click the "Add Marks" option to proceed to the marks entry section.
                  </p>
                </div>

                <div>
                  <p className=" font-bold text-lg text-[#1e1f21]">
                    3.	Choose the OBE Component
                  </p>
                  <p className=" font-medium pl-20 w-full text-[#64686e]">
                    •	Look for the option to choose the type of assessment component.
                  </p>
                </div>

                <div>
                  <p className=" font-bold text-lg text-[#1e1f21]">
                    4.	Choose the Department, Course Code, and Year
                  </p>
                  <p className=" font-medium pl-20 w-full text-[#64686e]">
                    •	Make your selections accordingly.</p>
                </div>

                <div>
                  <p className=" font-bold text-lg text-[#1e1f21]">
                    5.	Enter the Register Number and Marks for LOT, MOT, and HOT
                  </p>
                  <p className=" font-medium pl-20 w-full text-[#64686e]">
                    •	After selecting the department, course code, and year, you can enter the register number and corresponding marks.
                    <br />
                    •	Enter the register number in the designated field.
                    <br />
                    •	Input the marks for LOT (Low-Order Thinking), MOT (Middle Order Thinking), and HOT (Higher-Order Thinking).
                    <br />
                    •	For discontinued students, select NOR or Skip the register number.
                  </p>
                </div>

                <div>
                  <p className=" font-bold text-lg text-[#1e1f21]">
                    6.	Click Save
                  </p>
                  <p className=" font-medium pl-20 w-full text-[#64686e]">
                    •	Once you've entered the marks for a specific register number, click the "Save" button to save the entered marks.
                  </p>
                </div>

                <div>
                  <p className=" font-bold text-lg text-[#1e1f21]">
                    7.	Repeat for Next Register Number
                  </p>
                  <p className=" font-medium pl-20 w-full text-[#64686e]">
                    •	After saving the marks for one register number, enter marks for the next register number.
                    <br />
                    •	Repeat steps 5 and 6 until you've entered all the required marks.
                  </p>
                </div>

                <div className=" w-full text-center text-red-600">
                  Make sure to review the entered marks before saving to ensure accuracy. If you have any specific questions or encounter difficulties at any step, feel free to ask for further assistance!
                </div>

              </div>
            </div>

          </div> :
            <Outlet />
          }

        </div>

      </div>
    </div>
  );
}

export default Home;
