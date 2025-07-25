import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Me() {
  const [me, setMe] = useState({});
  const [balance, setBalance] = useState(0);

  const userAmount = parseFloat(balance.toFixed(2));

  useEffect(() => {
    axios
      .get("http://localhost:3002/api/v1/user/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setMe(res.data))
      .catch((err) => console.error("User fetch error:", err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3002/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setBalance(res.data.balance))
      .catch((err) => console.error("Balance fetch error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6 transition-transform duration-300 hover:scale-105">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Your Profile
        </h2>

        <div className="space-y-4 text-lg font-medium text-gray-800">
          <div className="text-center">
            Name: {me.firstName || "N/A"} {me.lastName || ""}
          </div>
          <div className="text-center">User ID: {me.userId || "N/A"}</div>
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold underline text-gray-700">
            Your Balance:
          </h3>
          <div className="mt-4 w-40 h-24 mx-auto bg-gray-100 rounded-lg flex items-center justify-center shadow-inner">
            <span className="text-lg font-bold text-gray-700">
              INR: {userAmount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
