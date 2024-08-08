import React from "react";

export default function SearchBar({ onChange }) {
  return (
    <div className="flex justify-center items-center mt-2 ">
      <input
        type="text"
        onChange={onChange}
        className="w-11/12 px-2 py-1 rounded-sm border"
        placeholder="Search users..."
      />
    </div>
  );
}
