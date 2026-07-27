import OrderData from "./OrderData";

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      {OrderData.stats.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow p-6 text-center"
        >
          <h1 className={`text-5xl font-bold ${item.color}`}>
            {item.count}
          </h1>

          <p className="mt-2 text-gray-500 uppercase">
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
}