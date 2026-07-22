import React, { useState } from "react";

const initialStaff = [
    {
        id: 1,
        name: "Vikram Singh",
        role: "Head Chef",
        shift: "Morning",
        phone: "9876543210",
        status: "Active",
    },
    {
        id: 2,
        name: "Amit Sharma",
        role: "Sous Chef",
        shift: "Evening",
        phone: "9123456780",
        status: "Active",
    },
    {
        id: 3,
        name: "Rahul Verma",
        role: "Kitchen Assistant",
        shift: "Night",
        phone: "9988776655",
        status: "On Leave",
    },
    {
        id: 4,
        name: "Neha Patel",
        role: "Pastry Chef",
        shift: "Morning",
        phone: "9871234567",
        status: "Active",
    },
    {
        id: 5,
        name: "Priya Gupta",
        role: "Cleaner",
        shift: "Evening",
        phone: "9012345678",
        status: "Inactive",
    },
];

function Staff() {
    const [staff] = useState(initialStaff);

    return (
        <div className="p-8">

            <div className="flex justify-between items-center mb-6">

                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Staff Management
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage all kitchen staff and their shifts.
                    </p>
                </div>

                <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg font-semibold">
                    + Add Staff
                </button>

            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-orange-500 text-white">

                        <tr>

                            <th className="p-4 text-left">Name</th>
                            <th className="text-left">Role</th>
                            <th className="text-left">Shift</th>
                            <th className="text-left">Phone</th>
                            <th className="text-left">Status</th>
                            <th className="text-center">Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {staff.map((employee) => (

                            <tr
                                key={employee.id}
                                className="border-b hover:bg-gray-50"
                            >

                                <td className="p-4 font-semibold">
                                    {employee.name}
                                </td>

                                <td>{employee.role}</td>

                                <td>{employee.shift}</td>

                                <td>{employee.phone}</td>

                                <td>

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm text-white ${employee.status === "Active"
                                            ? "bg-green-500"
                                            : employee.status === "On Leave"
                                                ? "bg-yellow-500"
                                                : "bg-red-500"
                                            }`}
                                    >
                                        {employee.status}
                                    </span>

                                </td>

                                <td className="text-center">

                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded mr-2">
                                        Edit
                                    </button>

                                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded">
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