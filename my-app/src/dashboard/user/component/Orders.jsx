import OrderCard from "../components/OrderCard";
import OrderHistory from "../components/OrderHistory";
import ordersData from "../data/ordersData";

function Orders() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">

      <main className="max-w-5xl mx-auto px-6 py-12">

        {/* Heading */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold text-[#2D2E32]">
            My Orders
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Track and manage your recent dining experiences.
          </p>

        </div>

        {/* Orders */}

        <div className="space-y-6">

          {ordersData.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
            />
          ))}

        </div>

        {/* Bottom Section */}

        <OrderHistory />

      </main>

    </div>
  );
}

export default Orders;