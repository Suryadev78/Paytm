import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Appbar() {
  const navigate = useNavigate();
  const [me, setMe] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("https://paytm-292b.onrender.com/api/v1/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMe(res.data)
      })
      .catch((err) => console.error("Error fetching user info:", err));
  }, []);

  const getInitials = (user) => {
    const firstInitial = user?.firstName?.charAt(0).toUpperCase() || "";
    const lastInitial = user?.lastName?.charAt(0).toUpperCase() || "";
    return firstInitial + lastInitial;
  };

  return (
    <header className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      <div
        className="text-2xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Paytm
      </div>

      <div className="flex items-center space-x-6">
        <button
          onClick={() => navigate("/me")}
          className="text-blue-500 font-medium text-lg hover:underline hover:scale-95 transition"
        >
          Profile
        </button>

        <div className="text-gray-700 text-base font-medium">
          Hello, {me?.firstName} {me?.lastName}
        </div>

        <div className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center font-semibold text-lg shadow-md">
          {getInitials(me)}
        </div>
      </div>
    </header>
  );
}
