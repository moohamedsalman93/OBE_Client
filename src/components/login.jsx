import React, { useState } from "react";
import illustrate from "../assets/illustrate.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { loginApi } from "../api/api";

function LoginPage() {
    const Navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [emailerr, setEmailerr] = useState(false);
    const [passworderr, setPassworderr] = useState(false);
    const [isLoading, setIsloading] = useState(false);

    const handleSumbit = () => {
        setEmailerr(false);
        setPassworderr(false);

        if (!email) {
            setEmailerr(true);
            return;
        }
        if (!password) {
            setPassworderr(true);
            return;
        }

        loginApi(
            "staff/login",
            { email: email, password: password },
            setIsloading
        ).then((res) => {
            if (res) {
                console.log(res);

                if (res.status === 200) {
                    toast.success("login success");
                    localStorage.setItem("token", res.data.success.data.token);
                    Navigate("/");
                } else {
                    toast.error("Wrong credentials please check");
                }
            }
        });
    };

    

    return (
        <div className=" w-screen h-screen flex flex-row space-x-4  justify-center items-center p-10 bg-gradient-to-r from-blue-500 to-green-500">
            <div className=" w-full p-8 bg-white rounded-lg flex justify-center items-center">
                <div className=" w-1/2 h-full">
                    <div className=" flex flex-col justify-center">
                        <p className=" text-6xl font-semibold">Hello! Welcome</p>
                        <p className=" text-3xl text-neutral-500 font-medium">
                            JMC Marks Management System
                        </p>

                        <div className="w-[25rem] ml-6 space-y-5 mt-10 h-fit flex flex-col items-center border-2 py-6 rounded-lg">
                            <input
                                className={`bg-[#e8f0fe] text-black h-11 w-[20rem] rounded px-3  placeholder-neutral-500 placeholder:font-medium border-b-2 border-white focus:border-blue-500 outline-none ${emailerr && " border-red-600 placeholder:text-red-600"
                                    }`}
                                type="text"
                                name={"Gmail"}
                                placeholder={"Enter your email"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                maxLength={30}
                            />

                            <input
                                className={`bg-[#e8f0fe] text-black h-11 w-[20rem] rounded px-3  placeholder-neutral-500 placeholder:font-medium border-b-2 border-white focus:border-blue-500 outline-none ${passworderr && " border-red-600 placeholder:text-red-600"
                                    }`}
                                type="password"
                                name={"Gmail"}
                                placeholder={"Enter your password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                maxLength={30}
                            />

                            <button
                                onClick={handleSumbit}
                                className=" h-11 w-[20rem] bg-blue-500 rounded-lg text-lg font-medium text-white hover:scale-[0.95] transition"
                            >
                                Log In
                            </button>
                        </div>
                    </div>
                </div>
                <div className=" w-2/5 h-full flex items-center justify-center">
                    <img src={illustrate} alt="" className=" " />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;