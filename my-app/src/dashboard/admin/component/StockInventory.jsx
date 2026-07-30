import React from "react";
import StockCard from "./StockCard";
import StockTable from "./StockTable";

const StockInventory = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* Heading */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            Stock & Inventory
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your kitchen inventory efficiently.
          </p>
        </div>

        <div className="flex gap-4">

          <button className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
            Export Report
          </button>

          <button className="px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600">
            + Add New Item
          </button>

        </div>

      </div>

      {/* Top Cards */}

      <StockCard />

      {/* Inventory Table */}

      <StockTable />

      {/* Bottom Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        <div className="bg-white rounded-xl shadow-md p-6">

          <h2 className="text-2xl font-bold">
            AI Restock Predictions
          </h2>

          <p className="text-gray-500 mt-3">
            Based on recent usage, rice and paneer should be
            reordered within the next 3 days.
          </p>

          <button className="mt-5 bg-black text-white px-5 py-2 rounded-lg">
            View Analysis
          </button>

        </div>

        <div className="bg-purple-100 rounded-xl shadow-md p-6">

          <h2 className="text-2xl font-bold text-purple-700">
            Supplier Connect
          </h2>

          <p className="text-gray-600 mt-3">
            Contact your suppliers directly and request
            quotations for low-stock items.
          </p>

          <button className="mt-5 bg-purple-600 text-white px-5 py-2 rounded-lg">
            Open Portal
          </button>

        </div>

      </div>

    </div>
  );
};

export default StockInventory;