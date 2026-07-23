const OrderData = {
  stats: [
    { title: "Pending", count: 12, color: "text-red-600" },
    { title: "Preparing", count: 8, color: "text-purple-600" },
    { title: "Ready", count: 5, color: "text-green-600" },
  ],

  orders: [
    {
      id: "#ORD-2849",
      table: "T-04",
      guest: "Aditi Patel",
      time: "12:45 PM",
      amount: "₹1450",
      status: "Preparing",
    },
    {
      id: "#ORD-2850",
      table: "T-12",
      guest: "Rohan Verma",
      time: "12:52 PM",
      amount: "₹890",
      status: "Ready",
    },
    {
      id: "#ORD-2851",
      table: "T-07",
      guest: "Priya Kapoor",
      time: "1:05 PM",
      amount: "₹2120",
      status: "Pending",
    },
    {
      id: "#ORD-2852",
      table: "T-02",
      guest: "Arjun Singh",
      time: "1:10 PM",
      amount: "₹540",
      status: "Preparing",
    },
    {
      id: "#ORD-2853",
      table: "T-15",
      guest: "Neha Malhotra",
      time: "1:15 PM",
      amount: "₹3200",
      status: "Pending",
    },
  ],

  kitchen: {
    title: "Kitchen Pace is Optimal",
    description:
      "Average prep time is currently 14 mins. This is 3 mins faster than your average weekend rush.",
  },

  revenue: {
    amount: "₹48,250",
    growth: "+12%",
  },
};

export default OrderData;