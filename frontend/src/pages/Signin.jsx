import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Signin() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function signInClick() {
    const res = await axios.post("http://localhost:3002/api/v1/user/signin", {
      userName,
      password,
    });
    console.log(res);
    const yourToken = res.data.token;
    console.log("Everything went smooth");
    if (!yourToken) {
      console.log("Your account is invalid");
      navigate("/");
    } else {
      navigate("/dashboard");
      localStorage.setItem("token", res.data.token);
    }
  }

  return (
    <div className="h-screen bg-zinc-300 flex justify-center items-center">
      <div className=" w-80 h-4/6 rounded-md bg-white">
        <div className="flex text-2xl font-semibold mt-2 justify-center items-center">
          <h1>Signin</h1>
        </div>
        <div className="w-11/12 ml-3 flex justify-center items-center">
          <p className="text-center text-slate-500 mt-2 ">
            Enter your credentials to access your account
          </p>
        </div>
        <div className="flex flex-col mt-3">
          <h3 className="ml-3 font-semibold">Email</h3>
          <input
            required
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            className="w-11/12 ml-3 mt-2 p-1 border"
            type="text"
            placeholder="abc@example.com"
          />
          <h3 className="ml-3 font-semibold mt-3">Password</h3>
          <input
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-11/12 ml-3 mt-2 p-1 border"
            type="password"
            placeholder="******"
          />
          <div className="flex justify-center items-center mt-7">
            <button
              onClick={signInClick}
              className="w-11/12 p-2 rounded-md border text-white font-semibold bg-gray-900"
            >
              Signin
            </button>
          </div>

          <div className="flex justify-center items-center text-sm mt-4">
            Don't have an account?
            <Link className="underline font-semibold" to={"/signup"}>
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
