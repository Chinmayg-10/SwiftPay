import { useState, useEffect } from "react";
import { Button } from "./Button";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

 useEffect(() => {
  axios
    .get(
      "http://localhost:3000/api/v1/user/bulk?filter=" + filter,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
    .then((response) => {
      setUsers(response.data.user);
    })
    .catch((err) => {
      console.error("Error fetching users:", err);
    });
}, [filter]);


  return (
    <div className="mt-6">
      <h2 className="font-bold text-2xl mb-4">Users</h2>
      <input
        onChange={(e) => setFilter(e.target.value)}
        type="text"
        placeholder="🔍 Search users..."
        className="w-full px-4 py-2 border rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      <div className="mt-4 space-y-3">
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition">
      <div className="flex items-center space-x-3">
        <div className="rounded-full h-10 w-10 bg-blue-100 flex justify-center items-center text-blue-600 font-semibold">
          {user.firstName[0].toUpperCase()}
        </div>
        <div>
          <div className="font-medium text-gray-800">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-sm text-gray-500">{user.email || ""}</div>
        </div>
      </div>

      <button
        onClick={() =>
          navigate(`/send?id=${user.id}&name=${user.firstName}`)
        }
        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-1.5 rounded-md shadow-sm transition"
      >
        Send Money
      </button>
    </div>
  );
}
