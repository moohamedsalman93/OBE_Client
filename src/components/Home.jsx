import React, { useEffect, useState } from "react";
import logo from "../assets/Logo.jpeg";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { toast } from "react-hot-toast";
import '../App.css'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  DocumentDuplicateIcon,
  AcademicCapIcon,
  UserIcon
} from "@heroicons/react/24/solid";
import axios from 'axios';

export const api = import.meta.env.VITE_APP_API_URL;


export function UG() {
  return (
    <div className=" h-96 w-full flex flex-col  font-medium overflow-y-auto  ">
      <div class="h-96 overflow-auto ">
        <div class="grid grid-cols-2 gap-1 w-fit">
          <div className="font-bold text-xl">Department Code</div>
          <div className="font-bold text-xl">Department</div>
          <div>UAR</div>
          <div>BA ARABIC</div>
          <div>UBA</div>
          <div>BBA BAUSINESS ADMINISTRATION</div>
          <div>UBO</div>
          <div>B.Sc BOTANY</div>
          <div>UBT</div>
          <div>B.Sc BIOTECHNOLOGY</div>
          <div>UCO</div>
          <div>B.com COMMERCE</div>
          <div>UCH</div>
          <div>B.Sc CHEMISTRY</div>
          <div>UCA</div>
          <div>BCA COMPUTER APPLICAIONS</div>
          <div>UCS</div>
          <div>B.Sc COMPUTER SCIENCE</div>
          <div>UEC</div>
          <div>BA ECONOMICS</div>
          <div>UEN</div>
          <div>BA ENGLISH</div>
          <div>UFT</div>
          <div>B.Sc FASHION TECHNOLOGY AND COSTUME DESIGNING</div>
          <div>UHS</div>
          <div>BA HISTORY</div>
          <div>UHM</div>
          <div>B.Sc HOTEL MANAGEMENT AND CATERING SCIENCE</div>
          <div>UIT</div>
          <div>B.Sc INFORMATION TECHNOLOGY</div>
          <div>UMA</div>
          <div>B.Sc MATHEMATICS</div>
          <div>UMB</div>
          <div>B.Sc MICROBIOLOGY</div>
          <div>UND</div>
          <div>B.Sc NUTRITION AND DIETICS</div>
          <div>UPH</div>
          <div>B.Sc PHYSICS</div>
          <div>UTA</div>
          <div>BA TAMIL</div>
          <div>UVC</div>
          <div>B.Sc VISUAL COMMUNICATION</div>
          <div>UZO</div>
          <div>B.Sc ZOOLOGY</div>
        </div>
      </div>
    </div>

  )
}

export function PG() {
  return (
    <div className=" h-96 w-full flex flex-col  font-medium overflow-y-auto">
      <div class="h-96 overflow-auto">
        <div class="grid grid-cols-2 gap-1 w-5/6">
          <div className="font-bold text-xl ">Department Code</div>
          <div className="font-bold text-xl ">Department</div>
          <div>PAR</div>
          <div>MA ARABIC</div>
          <div>PBO</div>
          <div>M.Sc BOTANY</div>
          <div>PBT</div>
          <div>M.Sc BIOTECHNOLOGY</div>
          <div>PCO</div>
          <div>M.Com COMMERCE</div>
          <div>PCH</div>
          <div>M.Sc CHEMISTRY</div>
          <div>PCS</div>
          <div>M.Sc COMPUTER SCIENCE</div>
          <div>PEC</div>
          <div>M.A ECONOMICS</div>
          <div>PEN</div>
          <div>M.A ENGLISH</div>
          <div>PFT</div>
          <div>M.Sc FASHION TECHNOLOGY</div>
          <div>PHS</div>
          <div>M.A HISTORY</div>
          <div>PIT</div>
          <div>M.Sc INFORMATION TECHNOLOGY</div>
          <div>PMA</div>
          <div>M.Sc MATHEMATICS</div>
          <div>PMB</div>
          <div>M.Sc MICROBIOLOGY</div>
          <div>PND</div>
          <div>M.Sc NUTRITION AND DIETICS</div>
          <div>PPH</div>
          <div>M.Sc PHYSICS</div>
          <div>PTA</div>
          <div>M.A TAMIL</div>
          <div>PZO</div>
          <div>M.Sc ZOOLOGY</div>
          <div>MBA</div>
          <div>MBA BUSINESS ADMINISTRATION</div>
          <div>MCA</div>
          <div>MCA COMPUTER APPLICAIONS</div>
        </div>
      </div>
    </div>
  )
}


function Home({ Role, setRole, setuserName, userName, setuserId, userId, currentSem, setCurrentSem, currentYear }) {

  const navigate = useNavigate();
  let token = localStorage.getItem('token');
  const [OpenInstruction, setOpenInstruction] = useState(false);
  const [OpenCodeExpansion, setOpenCodeExpansion] = useState(false);
  const [activeTab, setActiveTab] = React.useState("UG");

  const data = [
    {
      label: "UG Code",
      value: "UG",
      icon: DocumentDuplicateIcon,
      desc: <UG />
    },

    {
      label: "PG Code",
      value: "PG",
      icon: AcademicCapIcon,
      desc: <PG />,
    },

  ];


  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        const response = await axios.get(api + `health`);
        return response.status;
      } catch (error) {
        console.error('Error checking server health:', error);
        return null; // Return null or appropriate error code
      }
    };
  
    const verifyAndNavigate = async () => {
      const status = await checkServerHealth();
      if (status === 200) {
        if (!token) {
          navigate('/login');
          return;
        }
  
        try {
          let decodedToken = jwtDecode(token);
          let currentTime = Date.now() / 1000;
  
          setRole(decodedToken.role);
          setuserName(decodedToken.name);
          setuserId(decodedToken.uname);
  
          if (decodedToken.exp < currentTime) {
            toast.error("Token Expired Directing To Login!", { theme: 'colored', autoclose: 1 });
            localStorage.removeItem('token');
            navigate('/login');
          }
  
          if (decodedToken.role === 'Admin') {
            navigate('/Admin/Dashboard');
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      } else {
        navigate("/denied");
      }
    };
  
    verifyAndNavigate();
  }, [token, navigate]);

  const handleLogOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }


  let menus = [
    {
      icon: "menu",
      name: "Dashboard",
      path: "/Dashboard"
    },
    {
      icon: "add-circle",
      name: "Add Marks",
      path: "/addmarks"
    },

    {
      icon: "people",
      name: "Student Outcomes",
      path: "/Outcome/Student"
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
          {/* <div className=" animate-slideinjmc w-[19%] absolute border-r border-white left-0 top-0 h-full z-10  p-1 flex flex-col bg-[#3b5f9c] "></div> */}
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
                        navigate('/Dashboard')
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
                        navigate('/Dashboard')
                      }}
                      className="sr-only" // Hide the actual radio button
                    />
                    Even
                  </label>
                </div>

              </div>

            </div>
          </div>

          <div className=" w-full grow py-4 px-2 text-white overflow-y-auto">
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

              </div>

              <div className=" flex space-x-2 text-lg items-center cursor-pointer justify-center animate-bounce text-black" onClick={() => setOpenInstruction(true)}>
                <ion-icon name="alert-circle"></ion-icon>
                <p className=" text-base font-medium">How to Enter the Marks</p>
              </div>

              <div className=" flex space-x-2 text-lg items-center cursor-pointer justify-center text-black" onClick={() => setOpenCodeExpansion(true)}>
                <ion-icon name="alert-circle"></ion-icon>
                <p className=" text-base font-medium">Department Code </p>
              </div>

            </div>

          </div>
          <div className=" pb-8">
            <div onClick={handleLogOut} className=" transition-all duration-300 space-x-4 w-full h-10 text-2xl  cursor-pointer bg-white  text-red-600 flex justify-center  items-center  rounded-[5px]">
              <ion-icon name="log-in"></ion-icon>
              <p className=" text-base font-bold">Log Out</p>
            </div>
          </div>
        </div>

        <div className="  w-full pl-[20%] bg-gradient-to-r from-slate-200 to-white h-full overflow-y-auto">
          {OpenInstruction && <div className=" fixed z-50 w-screen h-screen  top-0 right-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
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
                    <br />
                    <div className="text-orange-500 font-bold">
                      • LOT (Sum of marks of Q. Nos 1 to 20)
                      <br />
                      • MOT (Sum of marks of Q. Nos 21 to 27)
                      <br />
                      • HOT (mark of Q. No 28).
                    </div>
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

          </div>}

          {OpenCodeExpansion && <div className=" fixed z-50 w-screen h-screen  top-0 right-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
            <div className=" w-[60%] h-[75%] rounded-lg bg-white shadow-2xl antialiased p-2 flex flex-col">
              <div className=" relative w-full px-4 py-2">
                <p className=" text-xl font-semibold text-[#3b5f9c]">Department Code</p>
                <div onClick={() => setOpenCodeExpansion(false)} className=" text-4xl text-red-600 animate-bounce bg-white cursor-pointer rounded-full  flex items-center  absolute right-[-20px] top-[-20px]">
                  <ion-icon name="close-circle"></ion-icon>
                </div>
              </div>
              <Tabs value={activeTab} className=' py-2 h-full'>

                <TabsHeader className=' ml-4 shadow-md  z-0  w-96 bg-white' indicatorProps={{
                  className: "bg-[#4f72cc] text-white",
                }}>
                  {data.map(({ label, value, icon }) => (
                    <Tab key={value} value={value} onClick={() => setActiveTab(value)}
                      className={activeTab === value ? "text-white" : ""}>
                      <div className="flex items-center gap-2 font-medium">
                        {React.createElement(icon, { className: "w-5 h-5" })}
                        {label}
                      </div>
                    </Tab>
                  ))}
                </TabsHeader>

                <TabsBody className=' w-full h-full flex flex-col ' animate={{
                  initial: { y: 250 },
                  mount: { y: 0 },
                  unmount: { y: 250 },
                }}>
                  {data.map(({ value, desc }) => (
                    <TabPanel key={value} value={value}>
                      {desc}
                    </TabPanel>
                  ))}
                </TabsBody>
              </Tabs>
            </div>

          </div>}

          <div className=" overflow-y-auto w-full h-full">
            <Outlet />
          </div>



        </div>

      </div>
    </div>
  );
}

export default Home;
