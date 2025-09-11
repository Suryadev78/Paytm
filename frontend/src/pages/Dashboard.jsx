import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Users from "../components/Users.jsx";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Wallet, Users as UsersIcon, IndianRupee, Search } from "lucide-react";

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const userName = searchParams.get("name");
  const lastName = searchParams.get("lastName");
  const [user, setUser] = useState([]);
  const [filter, setFilter] = useState("");
  const [balance, setBalance] = useState("");

  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  });
  
  setTimeout(() => {
    localStorage.removeItem("token");
  }, 600000);

  useEffect(() => {
    const res = axios
      .get("https://paytm-292b.onrender.com/api/v1/account/balance", {  
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setBalance(res.data);
      });
    if (!res) {
      console.log("Some error occurred while verifying jwt");
    }
  }, []);

  useEffect(() => {
    axios
      .get("https://paytm-292b.onrender.com/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        setUser(response.data.user);
      });
  }, [filter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Appbar lastName={lastName} user={userName} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userName}!
          </h1>
          <p className="text-gray-600">
            Manage your account and connect with other users
          </p>
        </div>

        {/* Balance Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Wallet className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Account Balance</h2>
                <p className="text-sm text-gray-600">Your current available balance</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-3xl font-bold text-green-600">
                <IndianRupee className="w-8 h-8" />
                <span>{balance.balance || "0.00"}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Available now</p>
            </div>
          </div>
        </div>

        {/* Users Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <UsersIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Users</h2>
                  <p className="text-sm text-gray-600">Find and connect with other users</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {user.length} user{user.length !== 1 ? 's' : ''} found
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="p-6 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <SearchBar 
                onChange={(e) => setFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="Search users..."
              />
            </div>
          </div>

          {/* Users List */}
          <div className="divide-y divide-gray-100">
            {user.length > 0 ? (
              user.map((user, index) => (
                <div key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <Users user={user} />
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <UsersIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-600">
                  {filter ? `No users match "${filter}"` : "Start typing to search for users"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}