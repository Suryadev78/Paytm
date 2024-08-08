import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
function Send() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");
  const userName = searchParams.get("name");
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  function onSend() {
    axios
      .post(
        "http://localhost:3002/api/v1/account/transfer",
        {
          to: userId,
          amount: balance,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate("/dashboard");
      });
  }
  return (
    <div className="h-screen bg-zinc-300 flex justify-center items-center">
      <div className="w-80 bg-white flex flex-col rounded-md  h-80">
        <h1 className="text-2xl text-center mt-5 font-bold">Transfer Money</h1>
        <div className="flex ml-4 mt-6  gap-2">
          <div className="w-10 h-10 bg-slate-400 flex justify-center items-center rounded-full">
            {userName[0]}
          </div>
          <div className="text-2xl flex justify-center items-center font-semibold">
            {userName}
          </div>
        </div>
        <h4 className="ml-5 text-sm font-semibold mt-2">Amount (in Rs)</h4>
        <div className="flex justify-center items-center mt-2 ">
          <input
            onChange={(e) => {
              setBalance(e.target.value);
            }}
            required={true}
            type="number"
            className="w-11/12 px-2 py-1 rounded-sm border"
            placeholder="Enter amount"
          />
        </div>
        <div className="flex justify-center items-center mt-7">
          <button
            onClick={onSend}
            className="w-11/12 p-2 rounded-md border text-white font-semibold bg-green-600"
          >
            Transfer Money
          </button>
        </div>
        <div className="flex justify-center mt-2 p-1  text-black underline font-semibold items-center">
          <Link to={"/dashboard"}>Go to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}

export default Send;
