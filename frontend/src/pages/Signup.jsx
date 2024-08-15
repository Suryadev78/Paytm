import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Signup() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  async function sigUpInfo(data) {
    try {
      const res = await axios.post("http://localhost:3002/api/v1/user/signup", {
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.email,
        password: data.password,
      });
      localStorage.setItem("token", res.data.token);
      reset();
      navigate(
        "/dashboard?name=" + data.firstName + "&lastname=" + data.lastName
      );

      console.log(res);
    } catch (e) {
      console.log("error", e);
    }
  }
  return (
    <div className="h-screen bg-zinc-300 flex justify-center items-center ">
      <div className="w-72 h-4/5 bg-white rounded-md  ">
        <div className="flex justify-center mt-3">
          <h2 className="text-2xl font-semibold">Signup</h2>
        </div>
        <div className="pt-1">
          <p className="text-center text-base text-slate-500">
            Enter your information to create an account
          </p>
        </div>
        <div>
          <form
            className="flex flex-col  pl-2"
            onSubmit={handleSubmit((data) => sigUpInfo(data))}
          >
            <label className="font-semibold mt-1" htmlFor="firstName">
              FirstName
            </label>
            <input
              required
              className="w-5/6 p-1 mt-1 border rounded-sm"
              type="text"
              {...register("firstName")}
              placeholder="FirstName"
            />
            <label className="font-semibold mt-1" htmlFor="LastName">
              LastName
            </label>
            <input
              required
              className="w-5/6 p-1 mt-1 rounded-sm border"
              type="text"
              {...register("lastName")}
              placeholder="LastName"
            />
            <label className="font-semibold mt-1" htmlFor="username">
              Email
            </label>
            <input
              required
              className="w-5/6 p-1 mt-1 rounded-sm border"
              type="text"
              {...register("email")}
              placeholder="abc@example.com"
            />
            <label className="font-semibold mt-1" htmlFor="password">
              Password
            </label>

            <input
              required
              className="w-5/6 p-1 mt-1 rounded-sm border"
              type="password"
              {...register("password")}
              placeholder="******"
            />
            <div className="flex justify-center items-center mt-4">
              <button
                type="submit"
                className="bg-gray-950 w-5/6 rounded-sm text-white font-semibold p-1"
              >
                Signup
              </button>
            </div>
          </form>
        </div>
        <div className="text-sm flex justify-center items-center mt-5">
          Already have an account?{" "}
          <Link className="underline font-semibold" to={"/signin"}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
