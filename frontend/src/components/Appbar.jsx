import React from "react";
import { useNavigate } from "react-router-dom";

export default function Appbar({ user, lastName }) {
  const navigate = useNavigate();

  // Get initials for avatar
  const getInitials = (first, last) => {
    const firstInitial = first?.charAt(0).toUpperCase() || "";
    const lastInitial = last?.charAt(0).toUpperCase() || "";
    return firstInitial + lastInitial;
  };

  return (
    <header className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      {/* Logo / Brand */}
      <div
        className="text-2xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Paytm
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Profile Button */}
        <button
          onClick={() => navigate("/me")}
          className="text-blue-500 font-medium text-lg hover:underline hover:scale-95 transition"
        >
          Profile
        </button>

        {/* Greeting */}
        <div className="text-gray-700 text-base font-medium">
          Hello, {user} {lastName}
        </div>

        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center font-semibold text-lg shadow-md">
          {getInitials(user, lastName)}
        </div>
      </div>
    </header>
  );
}
