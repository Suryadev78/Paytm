import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Users from "../components/Users.jsx";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  // const Id = searchParams.get('token')
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
      .get("http://localhost:3002/api/v1/account/balance", {
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
      .get("http://localhost:3002/api/v1//user/bulk?filter=" + filter)
      .then((response) => {
        setUser(response.data.user);
      });
  }, [filter]);

  return (
    <div className="h-full bg-zinc-300">
      <Appbar lastName={lastName} user={userName} />
      <div>
        <div className="px-3 mt-5 text-xl font-bold">
          Your Balance : {balance.balance}{" "}
        </div>
      </div>
      <div className="px-3 mt-5">
        <h2 className="text-xl font-bold ">Users</h2>
        <SearchBar onChange={(e) => setFilter(e.target.value)} />
      </div>
      {user.map((user) => {
        return <Users user={user}></Users>;
      })}
    </div>
  );
}
