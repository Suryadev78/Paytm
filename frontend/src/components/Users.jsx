import React from "react";
import { useNavigate } from "react-router-dom";

export default function Users({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between px-5 mt-4">
      <div className="flex gap-3 ">
        <div className="w-10 h-10 rounded-full font-semibold bg-slate-400 flex justify-center items-center">
          {user.firstName[0]}
        </div>
        <div className="text-xl flex justify-center items-center font-semibold">
          {user.firstName}
        </div>
        <div className="text-xl flex justify-center items-center font-semibold">
          {user.lastName}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={() => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
          className="bg-gray-800 px-2 py-1 rounded-md text-white"
        >
          Send Money
        </button>
      </div>
    </div>
  );
}
