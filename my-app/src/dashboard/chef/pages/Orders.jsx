import React from "react";

const orders = [
    {
        id: "#ORD001",
        table: 1,
        customer: "Rahul Sharma",
        items: "Paneer Butter Masala, Butter Naan",
        amount: "₹540",
        status: "Preparing",
        time: "10:15 AM",
    },
    {
        id: "#ORD002",
        table: 5,
        customer: "Priya Singh",
        items: "Veg Biryani, Raita",
        amount: "₹380",
        status: "Ready",
        time: "10:20 AM",
    },
    {
        id: "#ORD003",
        table: 3,
        customer: "Aman Verma",
        items: "Masala Dosa, Coffee",
        amount: "₹270",
        status: "Cooking",
        time: "10:25 AM",
    },
    {
        id: "#ORD004",
        table: 8,
        customer: "Neha Gupta",
        items: "Pizza, Garlic Bread",
        amount: "₹720",
        status: "Pending",
        time: "10:30 AM",
    },
    {
        id: "#ORD005",
        table: 2,
        customer: "Rohit Kumar",
        items: "Fried Rice, Manchurian",
        amount: "₹450",
        status: "Completed",
        time: "10:35 AM",
    },
];

function Orders() {
    return (
        <div className="p-8">

            <h1 className="text-3xl font-bold mb-6">
                Orders
            </h1>

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-orange-500 text-white">

                        <tr>

                            <th className="p-4">Order ID</th>
                            <th>Table</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Time</th>

                        </tr>

                    </thead>

                    <tbody>

                        {orders.map((order) => (

                            <tr
                                key={order.id}
                                className="border-b hover:bg-gray-100"
                            >

                                <td className="p-4">{order.id}</td>

                                <td>{order.table}</td>

                                <td>{order.customer}</td>

                                <td>{order.items}</td>

                                <td>{order.amount}</td>

                                <td>

                                    <span
                                        className={`px-3 py-1 rounded-full text-white text-sm
                      ${order.status === "Preparing"
                                                ? "bg-yellow-500"
                                                : order.status === "Ready"
                                                    ? "bg-green-500"
                                                    : order.status === "Cooking"
                                                        ? "bg-blue-500"
                                                        : order.status === "Pending"
                                                            ? "bg-red-500"
                                                            : "bg-gray-500"
                                            }`}
                                    >
                                        {order.status}
                                    </span>

                                </td>

                                <td>{order.time}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Orders;