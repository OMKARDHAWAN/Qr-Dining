import React, { useEffect, useState } from "react";
import { useAuth } from "../../../app/providers/AuthContextApi/AuthProvider";
import StaffCard from "./StaffCard";
import { FiUserPlus, FiSearch, FiX, FiCheck } from "react-icons/fi";

const StaffDirectory = () => {
  const { staffList, fetchStaff, addStaff, updateStaff, deleteStaff } = useAuth();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobileNumber: "",
    password: "",
    role: "Chef"
  });

  const [errorMsg, setErrorMsg] = useState("");

  const loadData = async () => {
    setLoading(true);
    await fetchStaff();
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingMember(null);
    setFormData({
      username: "",
      email: "",
      mobileNumber: "",
      password: "",
      role: "Chef"
    });
    setErrorMsg("");
    setShowModal(true);
  };

  const handleOpenEdit = (member) => {
    setEditingMember(member);
    setFormData({
      username: member.username,
      email: member.email,
      mobileNumber: member.mobileNumber || "",
      password: "", // blank password means unchanged
      role: member.role || "Chef"
    });
    setErrorMsg("");
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      const res = await deleteStaff(id);
      if (res.success) {
        alert("Staff member deleted successfully!");
      } else {
        alert(res.message || "Failed to delete staff member.");
      }
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const payload = {
      Username: formData.username,
      Email: formData.email,
      MobileNumber: formData.mobileNumber,
      Role: formData.role
    };

    if (formData.password) {
      payload.Password = formData.password;
    }

    if (editingMember) {
      // Update
      const res = await updateStaff(editingMember.id, payload);
      if (res.success) {
        alert("Staff updated successfully!");
        setShowModal(false);
      } else {
        setErrorMsg(res.message || "Failed to update staff.");
      }
    } else {
      // Create
      if (!formData.password) {
        setErrorMsg("Password is required for new registration.");
        return;
      }
      const res = await addStaff(payload);
      if (res.success) {
        alert("Staff registered successfully!");
        setShowModal(false);
      } else {
        setErrorMsg(res.message || "Failed to register staff.");
      }
    }
  };

  const filteredStaff = (staffList || []).filter(member => {
    const q = searchQuery.toLowerCase();
    return (
      (member.username || "").toLowerCase().includes(q) ||
      (member.email || "").toLowerCase().includes(q) ||
      (member.role || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight font-sans">
            Staff Directory
          </h1>
          <p className="text-gray-500 mt-1 font-sans text-sm font-semibold">
            Manage your kitchen and administration team
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-[#B41B00] hover:bg-[#FF775D] text-white px-5 py-3 rounded-xl font-bold shadow-md cursor-pointer transition duration-200 text-sm font-sans"
        >
          <FiUserPlus size={18} />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="mb-6 max-w-md relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
        <input
          type="text"
          placeholder="Search by name, email, or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-sans"
        />
      </div>

      {/* Grid of Cards */}
      {loading ? (
        <div className="text-center py-12 text-gray-500 font-bold font-sans animate-pulse">
          Loading Staff Directory...
        </div>
      ) : filteredStaff.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((member) => (
            <StaffCard
              key={member.id}
              member={member}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-150 p-12 text-center text-gray-400 font-sans">
          No staff members found matching your search.
        </div>
      )}

      {/* Modal Dialog Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative font-sans">
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <FiX className="w-5 h-5 text-gray-500" />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-800 font-sans tracking-tight">
              {editingMember ? "Edit Staff Details" : "Register New Staff"}
            </h2>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-700 text-xs font-bold rounded-xl">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="e.g. chef_john"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#B41B00]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@spicekitchen.com"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#B41B00]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#B41B00]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  Password {editingMember && <span className="text-[10px] text-gray-400 font-normal">(Leave blank to keep current)</span>}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={editingMember ? "••••••" : "Min 6 characters"}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#B41B00]"
                  required={!editingMember}
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#B41B00]"
                >
                  <option value="Chef">Chef</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 border border-gray-350 rounded-xl text-sm font-semibold cursor-pointer text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 bg-[#B41B00] hover:bg-[#FF775D] text-white px-5 py-2.5 rounded-xl font-bold shadow-md cursor-pointer text-sm"
                >
                  <FiCheck />
                  <span>Submit</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffDirectory;