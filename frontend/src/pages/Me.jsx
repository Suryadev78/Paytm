import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Me() {
  const [me, setMe] = useState({});
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3002/api/v1/user/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setMe(res.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3002/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}}`,
        },
      })
      .then((res) => setBalance(res.data.balance));
  }, []);

  return (
    <div className="h-screen bg-zinc-300 flex justify-center items-center">
      <div className=" w-80 h-4/6 rounded-md bg-white">
        <h2 className="text-center text-2xl font-semibold">Your profile</h2>
        <div className="flex pl-2 mt-5 gap-3 text-xl font-semibold flex-col">
          <div className="flex justify-center items-center">
            <h2>
              Name : {me.firstName} {me.lastName}
            </h2>
          </div>
          <div className="flex justify-center items-center">
            <h2>UserId : {me.userId}</h2>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="mt-3 text-xl font-bold underline ">Your balance :</h2>
          <div className="w-40 h-32 bg-slate-200 flex justify-center items-center rounded-lg mt-6">
            <h4 className="text-lg font-semibold">INR : {balance.balance}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
