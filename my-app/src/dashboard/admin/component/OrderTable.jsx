import OrderData from "./OrderData";

export default function OrderTable() {
  return (
    <table className="w-full bg-white rounded-xl shadow">
      <thead>
        <tr className="border-b">
          <th>Order ID</th>
          <th>Table</th>
          <th>Guest</th>
          <th>Time</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {OrderData.orders.map((order) => (
          <tr key={order.id} className="border-b text-center">
            <td>{order.id}</td>
            <td>{order.table}</td>
            <td>{order.guest}</td>
            <td>{order.time}</td>
            <td>{order.amount}</td>
            <td>{order.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}