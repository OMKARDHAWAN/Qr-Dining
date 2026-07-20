import React, { useState } from "react";

const initialInventory = [
    {
        id: 1,
        item: "Chicken",
        category: "Meat",
        stock: "25 Kg",
        minimum: "10 Kg",
        status: "In Stock",
    },
    {
        id: 2,
        item: "Paneer",
        category: "Dairy",
        stock: "5 Kg",
        minimum: "8 Kg",
        status: "Low Stock",
    },
    {
        id: 3,
        item: "Rice",
        category: "Grains",
        stock: "50 Kg",
        minimum: "20 Kg",
        status: "In Stock",
    },
    {
        id: 4,
        item: "Tomato",
        category: "Vegetables",
        stock: "0 Kg",
        minimum: "5 Kg",
        status: "Out of Stock",
    },
    {
        id: 5,
        item: "Cooking Oil",
        category: "Grocery",
        stock: "15 L",
        minimum: "5 L",
        status: "In Stock",
    },
];

function Inventory() {
    const [inventory] = useState(initialInventory);

    return (
        <div className="p-8">

            <div className="flex justify-between items-center mb-6">

                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Inventory Management
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Monitor kitchen ingredients and stock levels.
                    </p>
                </div>

                <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg font-semibold">
                    + Add Item
                </button>

            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-orange-500 text-white">

                        <tr>

                            <th className="p-4 text-left">Ingredient</th>
                            <th className="text-left">Category</th>
                            <th className="text-left">Available Stock</th>
                            <th className="text-left">Minimum Stock</th>
                            <th className="text-left">Status</th>
                            <th className="text-center">Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {inventory.map((item) => (

                            <tr
                                key={item.id}
                                className="border-b hover:bg-gray-50"
                            >

                                <td className="p-4 font-semibold">
                                    {item.item}
                                </td>

                                <td>{item.category}</td>

                                <td>{item.stock}</td>

                                <td>{item.minimum}</td>

                                <td>

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm text-white ${item.status === "In Stock"
                                            ? "bg-green-500"
                                            : item.status === "Low Stock"
                                                ? "bg-yellow-500"
                                                : "bg-red-500"
                                            }`}
                                    >
                                        {item.status}
                                    </span>

                                </td>

                                <td className="text-center">

                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded mr-2">
                                        Update
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

export default Inventory;