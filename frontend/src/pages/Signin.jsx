import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Lock, Mail, LogIn } from "lucide-react";
import * as z from "zod";

const signinSchema = z.object({
  userName: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Signin() {
  const navigate = useNavigate();
  const [error, setError] = useState(""); // <-- Server error state

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinSchema),
  });

  async function signInClick(data) {
    setError(""); 
    try { 
      const res = await axios.post(
        "https://paytm-292b.onrender.com/api/v1/user/signin",
        {
          userName: data.userName,
          password: data.password,
        }
      );

      const yourToken = res.data.token;
      if (!yourToken) {
        setError("Invalid credentials"); // display error
      } else {
        localStorage.setItem("token", yourToken);
        navigate("/dashboard");
      }
    } catch (e) {
      // Display backend message if available, else generic message
      setError(e.response?.data?.message || "sign-in failed.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <div className="flex items-center justify-center mb-2">
            <div className="p-3 bg-white/20 rounded-full">
              <LogIn className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white text-center">Sign In</h2>
          <p className="text-blue-100 text-center mt-2">
            Enter your credentials to access your account
          </p>
        </div>

        <div className="px-8 py-8">
          {error && (
            <p className="text-red-500 text-center mb-4 font-medium">
              {error}
            </p>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(signInClick)}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  type="text"
                  placeholder="abc@example.com"
                  {...register("userName")}
                />
              </div>
              {errors.userName && (
                <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  type="password"
                  placeholder="******"
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              Don’t have an account?{" "}
              <Link
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-200"
                to={"/signup"}
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
