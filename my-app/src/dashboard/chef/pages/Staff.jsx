import React, { useEffect, useState } from "react";
import axios from "axios";

function Staff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStaff = async () => {
    try {
      const response = await axios.get("/api/auth/staff");
      setStaff(response.data);
    } catch (err) {
      console.error("Failed to load staff", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const addStaff = async () => {
    const username = prompt("Enter username");
    if (!username) return;
    const email = prompt("Enter email");
    const mobileNumber = prompt("Enter mobile number");
    const password = prompt("Enter password");
    try {
      await axios.post("/api/auth/staff", { username, email, mobileNumber, password });
      fetchStaff();
    } catch (err) {
      alert("Failed to add staff");
    }
  };

  const updateStaff = async (id) => {
    const username = prompt("Enter new username");
    if (!username) return;
    const email = prompt("Enter new email");
    const mobileNumber = prompt("Enter new mobile number");
    const password = prompt("Enter new password");
    try {
      await axios.put(`/api/auth/staff/${id}`, { username, email, mobileNumber, password });
      fetchStaff();
    } catch (err) {
      alert("Failed to update staff");
    }
  };

  const deleteStaff = async (id) => {
    if (!window.confirm("Delete this staff?")) return;
    try {
      await axios.delete(`/api/auth/staff/${id}`);
      fetchStaff();
    } catch (err) {
      alert("Failed to delete staff");
    }
  };

  if (loading) {
    return <div className="p-8">Loading staff...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Staff Management</h1>
          <p className="text-gray-500 mt-1">Manage all kitchen staff and their shifts.</p>
        </div>
        <button
          onClick={addStaff}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg font-semibold"
        >
          + Add Staff
        </button>
      </div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-orange-500 text-white">
            <tr>
                <th className="p-4 text-left">Username</th>
                <th className="text-left">Email</th>
                <th className="text-left">Mobile</th>
                <th className="text-left">Role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((employee) => (
              <tr key={employee.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-semibold">{employee.username}</td>
                  <td>{employee.email}</td>
                  <td>{employee.mobileNumber}</td>
                  <td>{employee.role}</td>
                <td className="text-center">
                  <button
                    onClick={() => updateStaff(employee.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteStaff(employee.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Staff;