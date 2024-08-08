import React from "react";
import SearchBar from "./SearchBar";

export default function Appbar({ user, lastName }) {
  return (
    <div className="bg-white shadow-md p-1 px-3 flex justify-between items-center">
      <div className="text-2xl font-semibold">Paytm</div>
      <div className="flex gap-2">
        <div className="flex justify-center text-xl font-semibold  items-center">
          Hello, {user} {lastName}
        </div>
        <div className="w-10 h-10 bg-slate-400 rounded-full flex items-center font-semibold justify-center">
          U
        </div>
      </div>
    </div>
  );
}
