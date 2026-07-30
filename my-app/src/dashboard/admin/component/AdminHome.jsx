const status = [
  {
    title: "Pending",
    value: "12",
    color: "text-red-600",
  },
  {
    title: "Preparing",
    value: "08",
    color: "text-purple-600",
  },
  {
    title: "Ready",
    value: "05",
    color: "text-green-600",
  },
];

const AdminHomePage = () => {
  return (
    <div>

      {/* Header */}

      <div className="flex justify-between">

        <div>

          <h1 className="text-5xl font-bold">
            Active Orders
          </h1>

          <p className="text-gray-500 mt-2">
            Real-time status of current kitchen and floor activity.
          </p>

        </div>

        <div className="flex gap-6">

          {status.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl shadow p-8 w-44 text-center"
            >
              <h1 className={`text-5xl font-bold ${item.color}`}>
                {item.value}
              </h1>

              <p className="uppercase mt-2 tracking-widest text-gray-500">
                {item.title}
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* Table will be added in Part 3 */}

      <div className="mt-12 bg-white rounded-3xl h-[500px] flex items-center justify-center text-gray-400 text-xl">

        Orders Table Coming Soon

      </div>

    </div>
  );
};

export default AdminHomePage;