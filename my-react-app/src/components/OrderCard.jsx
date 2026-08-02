
function OrderCard({ order }) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-gray-200
        shadow-md
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        p-6
        flex
        flex-col
        md:flex-row
        gap-6
      "
    >
      {/* Food Image */}
      <img
        src={order.image}
        alt={order.restaurant}
        className="w-24 h-24 rounded-xl object-cover"
      />

      {/* Order Details */}
      <div className="flex-1">

        <div className="flex justify-between items-start flex-wrap gap-3">

          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {order.restaurant}
            </h2>

            <p className="text-sm text-gray-500 uppercase tracking-wider">
              Order #{order.orderId} • {order.date}
            </p>
          </div>

          {/* Status Badge */}

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              order.statusColor === "green"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {order.status}
          </span>
        </div>

        <p className="text-gray-600 mt-3">
          {order.items}
        </p>

        <h3 className="text-2xl font-bold text-[#ff5233] mt-4">
          {order.price}
        </h3>

      </div>
    </div>
  );
}

export default OrderCard;