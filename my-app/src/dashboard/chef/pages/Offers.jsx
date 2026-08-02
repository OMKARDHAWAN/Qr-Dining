import React, { useCallback, useEffect, useState } from "react";
import { offerService } from "../../../services/offerService";

const emptyForm = {
  title: "",
  description: "",
  discountType: "Percentage",
  discountValue: "",
  minOrderAmount: "0",
  startDate: "",
  endDate: "",
  couponCode: "",
  applicableCategory: "All",
  isActive: true,
};

function formatDiscount(offer) {
  if (offer.discountType === "Fixed") {
    return `₹${offer.discountValue}`;
  }
  return `${offer.discountValue}%`;
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function statusClass(status) {
  switch (status) {
    case "Active":
      return "bg-green-500";
    case "Scheduled":
      return "bg-blue-500";
    case "Expired":
      return "bg-gray-500";
    default:
      return "bg-red-500";
  }
}

function toFormValues(offer) {
  return {
    title: offer.title,
    description: offer.description,
    discountType: offer.discountType,
    discountValue: String(offer.discountValue),
    minOrderAmount: String(offer.minOrderAmount),
    startDate: offer.startDate.split("T")[0],
    endDate: offer.endDate.split("T")[0],
    couponCode: offer.couponCode ?? "",
    applicableCategory: offer.applicableCategory,
    isActive: offer.isActive,
  };
}

function toPayload(form) {
  return {
    title: form.title.trim(),
    description: form.description.trim(),
    discountType: form.discountType,
    discountValue: Number(form.discountValue),
    minOrderAmount: Number(form.minOrderAmount || 0),
    startDate: form.startDate,
    endDate: form.endDate,
    couponCode: form.couponCode.trim() || null,
    applicableCategory: form.applicableCategory.trim() || "All",
    isActive: form.isActive,
  };
}

function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const loadOffers = useCallback(async (searchTerm = "") => {
    setLoading(true);
    setError("");

    try {
      const data = await offerService.getAll(
        searchTerm ? { search: searchTerm } : {}
      );
      setOffers(data);
    } catch (err) {
      setError(err.message || "Failed to load offers.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOffers();
  }, [loadOffers]);

  const openCreateForm = () => {
    setEditingOffer(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (offer) => {
    setEditingOffer(offer);
    setForm(toFormValues(offer));
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingOffer(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const payload = toPayload(form);

      if (editingOffer) {
        await offerService.update(editingOffer.id, payload);
      } else {
        await offerService.create(payload);
      }

      closeForm();
      await loadOffers(search);
    } catch (err) {
      setError(err.message || "Failed to save offer.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this offer?")) return;

    setError("");
    try {
      await offerService.delete(id);
      await loadOffers(search);
    } catch (err) {
      setError(err.message || "Failed to delete offer.");
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    await loadOffers(search);
  };

  return (
    <div className="p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Offers & Promotions</h1>
          <p className="text-gray-500 mt-1">
            Create and manage restaurant discounts and coupon codes.
          </p>
        </div>

        <button
          onClick={openCreateForm}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg font-semibold"
        >
          + Add Offer
        </button>
      </div>

      <form onSubmit={handleSearch} className="mb-6 flex gap-3">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by title, coupon code, or category..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3"
        />
        <button
          type="submit"
          className="bg-zinc-800 hover:bg-zinc-900 text-white px-5 py-3 rounded-lg font-semibold"
        >
          Search
        </button>
      </form>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading offers...</div>
        ) : offers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No offers found. Create your first promotion to get started.
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="p-4 text-left">Offer</th>
                <th className="text-left">Discount</th>
                <th className="text-left">Coupon</th>
                <th className="text-left">Valid Period</th>
                <th className="text-left">Category</th>
                <th className="text-left">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-semibold">{offer.title}</div>
                    <div className="text-sm text-gray-500">{offer.description}</div>
                  </td>
                  <td>{formatDiscount(offer)}</td>
                  <td>{offer.couponCode || "—"}</td>
                  <td>
                    {formatDate(offer.startDate)} - {formatDate(offer.endDate)}
                  </td>
                  <td>{offer.applicableCategory}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm text-white ${statusClass(offer.status)}`}
                    >
                      {offer.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => openEditForm(offer)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(offer.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">
                {editingOffer ? "Edit Offer" : "Create Offer"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  required
                  value={form.title}
                  onChange={(event) =>
                    setForm({ ...form, title: event.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    setForm({ ...form, description: event.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Discount Type</label>
                  <select
                    value={form.discountType}
                    onChange={(event) =>
                      setForm({ ...form, discountType: event.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="Percentage">Percentage</option>
                    <option value="Fixed">Fixed Amount</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Discount Value</label>
                  <input
                    required
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={form.discountValue}
                    onChange={(event) =>
                      setForm({ ...form, discountValue: event.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Min Order Amount</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.minOrderAmount}
                    onChange={(event) =>
                      setForm({ ...form, minOrderAmount: event.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Coupon Code</label>
                  <input
                    value={form.couponCode}
                    onChange={(event) =>
                      setForm({ ...form, couponCode: event.target.value })
                    }
                    placeholder="Optional"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input
                    required
                    type="date"
                    value={form.startDate}
                    onChange={(event) =>
                      setForm({ ...form, startDate: event.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <input
                    required
                    type="date"
                    value={form.endDate}
                    onChange={(event) =>
                      setForm({ ...form, endDate: event.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Applicable Category</label>
                <input
                  value={form.applicableCategory}
                  onChange={(event) =>
                    setForm({ ...form, applicableCategory: event.target.value })
                  }
                  placeholder="All"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(event) =>
                    setForm({ ...form, isActive: event.target.checked })
                  }
                />
                <span className="text-sm font-medium">Offer is active</span>
              </label>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2 rounded-lg border border-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white px-5 py-2 rounded-lg font-semibold"
                >
                  {submitting ? "Saving..." : editingOffer ? "Update Offer" : "Create Offer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Offers;
