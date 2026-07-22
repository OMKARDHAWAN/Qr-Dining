import React, { useState } from "react";

const initialMenu = [
    {
        id: 1,
        name: "Butter Chicken",
        category: "Main Course",
        price: 320,
        status: "Available",
    },
    {
        id: 2,
        name: "Paneer Tikka",
        category: "Starter",
        price: 260,
        status: "Available",
    },
    {
        id: 3,
        name: "Veg Biryani",
        category: "Rice",
        price: 240,
        status: "Out of Stock",
    },
    {
        id: 4,
        name: "Masala Dosa",
        category: "South Indian",
        price: 180,
        status: "Available",
    },
    {
        id: 5,
        name: "Chocolate Brownie",
        category: "Dessert",
        price: 150,
        status: "Available",
    },
];

function Menu() {
    const [menuItems, setMenuItems] = useState(initialMenu);

    const toggleStatus = (id) => {
        setMenuItems(
            menuItems.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        status:
                            item.status === "Available"
                                ? "Out of Stock"
                                : "Available",
                    }
                    : item
            )
        );
    };

    return (
        <div className="p-8">

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Menu Management
                </h1>

                <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg font-semibold">
                    + Add Dish
                </button>

            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-orange-500 text-white">

                        <tr>

                            <th className="p-4">Dish</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {menuItems.map((item) => (

                            <tr
                                key={item.id}
                                className="border-b hover:bg-gray-50"
                            >

                                <td className="p-4 font-semibold">
                                    {item.name}
                                </td>

                                <td>{item.category}</td>

                                <td>₹ {item.price}</td>

                                <td>

                                    <span
                                        className={`px-3 py-1 rounded-full text-white text-sm ${item.status === "Available"
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                            }`}
                                    >
                                        {item.status}
                                    </span>

                                </td>

                                <td>

                                    <button
                                        onClick={() => toggleStatus(item.id)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
                                    >
                                        Toggle
                                    </button>

                                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg mr-2">
                                        Edit
                                    </button>

                                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
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

export default Menu;