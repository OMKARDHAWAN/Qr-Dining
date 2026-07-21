import DashboardCards from "./DashboardCards";
import OrderTable from "./OrderTable";
import KitchenCard from "./KitchenCard";
import RevenueCard from "./RevenueCard";

export default function OrderStatus() {
  return (
    <div className="p-8">

      <h1 className="text-5xl font-bold">
        Active Orders
      </h1>

      <p className="text-gray-500 mb-8">
        Real-time status of current kitchen and floor activity.
      </p>

      <DashboardCards />

      <OrderTable />

      <div className="grid grid-cols-3 gap-6 mt-8">

        <div className="col-span-2">
          <KitchenCard />
        </div>

        <RevenueCard />

      </div>

    </div>
  );
}