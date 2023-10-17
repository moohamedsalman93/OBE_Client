import React, { useEffect, useState } from "react";
import results from "../assets/results.png";
import marks from "../assets/add marks.png";
import course from "../assets/add cources.png";
import logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { toast } from "react-hot-toast";

function Home({ Role, setRole, setuserName, userName }) {

  const navigate = useNavigate();
  let token = localStorage.getItem('token');
  const [logOutBtn, setlogOutBtn] = useState(false);

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

  return (
    <div className=" w-screen h-screen p-10 bg-gradient-to-r from-blue-500 to-green-500">
      <div className="w-full h-full bg-white  rounded-lg ">

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

          <div className="relative space-y-2 flex flex-col items-center mr-4">
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

      </div>
    </div>
  );
}

export default Home;
