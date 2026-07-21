import OrderData from "./OrderData";

export default function KitchenCard() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-orange-600 font-semibold">
        Efficiency AI
      </h3>

      <h2 className="text-2xl font-bold mt-3">
        {OrderData.kitchen.title}
      </h2>

      <p className="text-gray-500 mt-3">
        {OrderData.kitchen.description}
      </p>

      <button className="mt-4 text-orange-600 font-semibold">
        View Analytics →
      </button>
    </div>
  );
}