import React from "react";
import InventoryData from "./InventoryData";
import { FiMoreHorizontal } from "react-icons/fi";

const StockTable = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-600";
      case "Low Stock":
        return "bg-red-100 text-red-600";
      case "Restock Soon":
        return "bg-yellow-100 text-yellow-600";
      case "Critical":
        return "bg-pink-100 text-pink-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mt-8">
      <table className="w-full">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-4 text-left">Item</th>
            <th className="p-4 text-left">Stock Level</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Last Restocked</th>
            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {InventoryData.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />

                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-500 text-sm">
                      {item.category}
                    </p>
                  </div>
                </div>
              </td>

              <td className="p-4">
                <div className="w-36 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${item.stock}%` }}
                  ></div>
                </div>

                <p className="text-sm mt-2">{item.quantity}</p>
              </td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </td>

              <td className="p-4">{item.restocked}</td>

              <td className="p-4 text-center">
                <button>
                  <FiMoreHorizontal size={22} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;