import React from "react";
import StaffData from "./StaffData";
import StaffCard from "./StaffCard";

const StaffDirectory = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* Heading */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Staff Directory
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your restaurant staff.
          </p>

        </div>

        <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600">
          + Add Staff
        </button>

      </div>

      {/* Stats */}

      <div className="flex gap-10 mb-8">

        <div>
          <p className="text-gray-500 text-sm">
            TOTAL BRIGADE
          </p>

          <h2 className="text-4xl font-bold">
            24
          </h2>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            ON DUTY
          </p>

          <h2 className="text-4xl font-bold text-red-600">
            12
          </h2>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            OFF DUTY
          </p>

          <h2 className="text-4xl font-bold">
            12
          </h2>
        </div>

      </div>

      {/* Staff Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {StaffData.map((staff) => (
          <StaffCard
            key={staff.id}
            staff={staff}
          />
        ))}

        {/* Add Staff Card */}

        <div className="border-2 border-dashed border-orange-300 rounded-xl flex flex-col justify-center items-center h-80">

          <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center text-5xl text-orange-600">
            +
          </div>

          <h2 className="text-2xl font-bold mt-6 text-red-600">
            Onboard Staff
          </h2>

          <p className="text-gray-500 mt-3">
            Add new member to the brigade
          </p>

        </div>

      </div>

    </div>
  );
};

export default StaffDirectory;