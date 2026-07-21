import OrderData from "./OrderData";

export default function RevenueCard() {
  return (
    <div className="bg-red-600 text-white rounded-xl shadow p-6">
      <p>Today's Revenue</p>

      <h1 className="text-4xl font-bold mt-5">
        {OrderData.revenue.amount}
      </h1>

      <span className="bg-orange-500 px-2 py-1 rounded text-sm">
        {OrderData.revenue.growth}
      </span>
    </div>
  );
}