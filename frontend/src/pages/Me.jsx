import React from "react";

export default function Me() {
  return (
    <div className="h-screen bg-zinc-300 flex justify-center items-center">
      <div className=" w-80 h-4/6 rounded-md bg-white">
        <h2 className="text-center text-2xl font-semibold">Your profile</h2>
        <div className="flex pl-2 mt-5 gap-3 text-xl font-semibold flex-col">
          <div className="flex justify-center items-center">
            <h2>Name : Suryadev Pandey</h2>
          </div>
          <div className="flex justify-center items-center">
            <h2>UserId : 3dw4235gdfewr</h2>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="mt-3 text-xl font-bold underline ">Your balance :</h2>
          <div className="w-40 h-40 bg-slate-200 flex justify-center items-center rounded-lg mt-6">
            <h4 className="text-lg font-semibold">INR : 343</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
