import React from "react";

const orders = [
  {
    id: "#SK-9821",
    time: "Ordered 4 mins ago",
    table: "04",
    item: "Butter Chicken Premium",
    extra: "Garlic Naan (x2), Jeera Rice",
    qty: "4 Items",
    status: "Preparing",
    priority: "normal",
  },
  {
    id: "#SK-9818",
    time: "Ordered 12 mins ago",
    table: "12",
    item: "Paneer Tikka Platter",
    extra: "Dal Makhani, Roti (x4)",
    qty: "6 Items",
    status: "On Queue",
    priority: "queue",
  },
  {
    id: "#SK-9815",
    time: "Delayed - 22 mins",
    table: "02",
    item: "Hyderabadi Chicken Biryani",
    extra: "Mirchi Ka Salan, Raita",
    qty: "2 Items",
    status: "Urgent",
    priority: "urgent",
  },
  {
    id: "#SK-9812",
    time: "Ordered 15 mins ago",
    table: "09",
    item: "Lamb Rogan Josh",
    extra: "Tandoori Roti (x3), Salad",
    qty: "5 Items",
    status: "Preparing",
    priority: "normal",
  },
];

function OrdersTable() {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

      {/* Header */}

      <div className="flex justify-between items-center px-6 py-5 border-b">

        <div className="flex items-center gap-4">

          <h3 className="text-xl font-bold">
            Current Tickets
          </h3>

          <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full uppercase">
            High Priority (3)
          </span>

        </div>

        <div className="flex gap-3">

          <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium">

            <span className="material-symbols-outlined text-lg">
              filter_list
            </span>

            Filter

          </button>

          <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium">

            <span className="material-symbols-outlined text-lg">
              download
            </span>

            Export

          </button>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-50 text-left">

              <th className="px-6 py-4 text-xs uppercase tracking-widest text-gray-500">
                Order ID
              </th>

              <th className="px-6 py-4 text-xs uppercase tracking-widest text-gray-500">
                Table
              </th>

              <th className="px-6 py-4 text-xs uppercase tracking-widest text-gray-500">
                Items
              </th>

              <th className="px-6 py-4 text-xs uppercase tracking-widest text-gray-500">
                Qty
              </th>

              <th className="px-6 py-4 text-xs uppercase tracking-widest text-gray-500">
                Status
              </th>

              <th className="px-6 py-4 text-xs uppercase tracking-widest text-right text-gray-500">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order, index) => (

              <tr
                key={index}
                className={`border-t hover:bg-gray-50 transition ${order.priority === "urgent"
                  ? "bg-red-50"
                  : ""
                  }`}
              >

                {/* Order ID */}

                <td className="px-6 py-5">

                  <h4
                    className={`font-bold ${order.priority === "urgent"
                      ? "text-red-600"
                      : "text-gray-800"
                      }`}
                  >
                    {order.id}
                  </h4>

                  <p className="text-xs text-gray-500 mt-1">
                    {order.time}
                  </p>

                </td>

                {/* Table Number */}

                <td className="px-6 py-5">

                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${order.priority === "urgent"
                      ? "bg-red-100 text-red-600"
                      : "bg-orange-100 text-orange-600"
                      }`}
                  >
                    {order.table}
                  </div>

                </td>

                {/* Items */}

                <td className="px-6 py-5">

                  <h4 className="font-semibold text-gray-800">
                    {order.item}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {order.extra}
                  </p>

                </td>

                {/* Quantity */}

                <td className="px-6 py-5">

                  <span className="font-medium">
                    {order.qty}
                  </span>

                </td>

                {/* Status */}

                <td className="px-6 py-5">

                  {order.priority === "normal" && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase">

                      <span className="w-2 h-2 rounded-full bg-orange-500"></span>

                      Preparing

                    </span>
                  )}

                  {order.priority === "queue" && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase">

                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>

                      On Queue

                    </span>
                  )}

                  {order.priority === "urgent" && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase">

                      <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>

                      Urgent

                    </span>
                  )}

                </td>

                {/* Action */}

                <td className="px-6 py-5 text-right">

                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${order.priority === "urgent"
                        ? "bg-orange-600 text-white hover:bg-orange-700"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                  >
                    View Details
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Footer */}

      <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50">

        <p className="text-sm text-gray-500">
          Showing 4 of 12 active orders
        </p>

        <div className="flex gap-2">

          <button className="w-10 h-10 rounded-lg border hover:bg-gray-100 transition flex items-center justify-center">

            <span className="material-symbols-outlined">
              chevron_left
            </span>

          </button>

          <button className="w-10 h-10 rounded-lg border hover:bg-gray-100 transition flex items-center justify-center">

            <span className="material-symbols-outlined">
              chevron_right
            </span>

          </button>

        </div>

      </div>

    </div>
  );
}

export default OrdersTable;