import React, { useEffect, useState } from "react";
import axios from "axios";

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInventory = async () => {
    try {
      const response = await axios.get("/api/inventory");
      setInventory(response.data);
    } catch (err) {
      console.error("Failed to load inventory", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const addItem = async () => {
    const inventoryName = prompt("Enter ingredient name");
    if (!inventoryName) return;
    const category = prompt("Enter category");
    const qty = prompt("Enter stock quantity");
    const lowStockThreshold = prompt("Enter low stock threshold");
    const status = prompt("Enter status (In Stock, Low Stock, Out of Stock)");
    try {
      await axios.post("/api/inventory", {
        inventoryName,
        category,
        qty: Number(qty),
        lowStockThreshold: Number(lowStockThreshold),
        status,
      });
      fetchInventory();
    } catch (err) {
      alert("Failed to add item");
    }
  };

  const updateItem = async (id) => {
    const inventoryName = prompt("Enter new ingredient name");
    if (!inventoryName) return;
    const category = prompt("Enter new category");
    const qty = prompt("Enter new stock quantity");
    const lowStockThreshold = prompt("Enter new low stock threshold");
    const status = prompt("Enter new status");
    try {
      await axios.put(`/api/inventory/${id}`, {
        inventoryName,
        category,
        qty: Number(qty),
        lowStockThreshold: Number(lowStockThreshold),
        status,
      });
      fetchInventory();
    } catch (err) {
      alert("Failed to update item");
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await axios.delete(`/api/inventory/${id}`);
      fetchInventory();
    } catch (err) {
      alert("Failed to delete item");
    }
  };

  if (loading) {
    return <div className="p-8">Loading inventory...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Inventory Management</h1>
          <p className="text-gray-500 mt-1">Monitor kitchen ingredients and stock levels.</p>
        </div>
        <button
          onClick={addItem}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg font-semibold"
        >
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
              <tr key={item.id} className={`border-b hover:bg-gray-50 ${item.status === "In Stock" ? "bg-green-100" : item.status === "Out of Stock" ? "bg-red-100" : ""}`}>
                <td className="p-4 font-semibold">{item.inventoryName}</td>
                <td>{item.category}</td>
                <td>{item.qty}</td>
                <td>{item.lowStockThreshold}</td>
                <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm text-white ${
                        item.status === "In Stock"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {item.status === "In Stock" ? "Available" : "Out of Stock"}
                    </span>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => updateItem(item.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                  >
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