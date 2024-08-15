import React from "react";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

export default function Appbar({ user, lastName }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-md p-1 px-3 flex justify-between items-center">
      <div className="text-2xl font-semibold">Paytm</div>
      <div className="flex gap-4">
        <div className="flex justify-center items-center underline   hover:cursor-pointer hover:scale-95 text-2xl font-semibold text-cyan-400">
          <button onClick={() => navigate("/me")}>Profile</button>
        </div>
        <div className="flex justify-center text-xl font-semibold  items-center">
          Hello{user} {lastName}
        </div>
        <div className="w-10 h-10 bg-slate-400 rounded-full flex items-center font-semibold justify-center">
          U
        </div>
      </div>
    </div>
  );
}
