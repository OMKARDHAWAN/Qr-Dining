import React, { useState } from "react";
import { useAuth } from "../../../app/providers/AuthContextApi/AuthProvider";

const UpdateStaffForm = ({ member, onClose }) => {
  const { updateStaff } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");
  const memberId = member?.id || member?.Id;
  const [imagePreview, setImagePreview] = useState(member?.imageUrl || member?.ImageUrl || null);

  const [formData, setFormData] = useState({
    username: member?.username || member?.Username || "",
    email: member?.email || member?.Email || "",
    mobileNumber: member?.mobileNumber || member?.MobileNumber || "", // phone no
    dutyPeriod: member?.dutyPeriod || member?.DutyPeriod || "",
    role: member?.role || member?.Role || "Chef",
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      if (file) {
        setImagePreview(URL.createObjectURL(file));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!/^[0-9]{10}$/.test(formData.mobileNumber)) {
      setErrorMsg("Phone number must be exactly 10 digits.");
      return;
    }

    if (formData.mobileNumber.startsWith("0")) {
      setErrorMsg("Phone number cannot start with 0.");
      return;
    }

    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("mobileNumber", formData.mobileNumber); // phone no
    data.append("role", formData.role);
    data.append("dutyPeriod", formData.dutyPeriod);
    const isOnDuty = member.isOnDuty !== undefined ? member.isOnDuty : member.IsOnDuty;
    data.append("isOnDuty", isOnDuty !== undefined ? isOnDuty : true); // preserve status

    if (formData.image) {
      data.append("image", formData.image);
    }

    const response = await updateStaff(memberId, data);
    if (response.success) {
      alert("Staff Member Updated Successfully");
      onClose();
    } else {
      setErrorMsg(response.message || "Failed to update staff member.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[500px] p-6 font-sans text-left">
        <h2 className="text-2xl font-bold mb-5 font-sans">
          Update Staff Member
        </h2>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-700 text-xs font-bold rounded-lg">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto pr-1">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Staff Name
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              maxLength={10}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Role
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Duty Period
            </label>
            <input
              type="text"
              name="dutyPeriod"
              value={formData.dutyPeriod}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Profile Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 w-32 h-32 object-cover rounded-lg border border-gray-200"
              />
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-5">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors font-semibold"
            >
              Update Staff
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStaffForm;
