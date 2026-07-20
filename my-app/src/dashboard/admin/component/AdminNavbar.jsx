import { FiBell, FiSettings } from "react-icons/fi";

const AdminNavbar = () => {
  return (
    <div className="bg-white h-24 px-10 flex justify-between items-center border-b">

      <div>

        <h1 className="text-red-700 text-3xl font-bold">
          
        </h1>

      </div>

      <div className="flex items-center gap-6">

        <input
          type="text"
          placeholder="Search orders, tables..."
          className="w-96 border rounded-full px-5 py-3 outline-none"
        />

        <FiBell className="text-2xl cursor-pointer" />

        <FiSettings className="text-2xl cursor-pointer" />

        <div className="flex items-center gap-3">

          <div>

            <h3 className="font-semibold">
              Krish Kapoor
            </h3>

            <p className="text-sm text-gray-500">
              Manager
            </p>

          </div>

          <img
            src="https://randomuser.me/api/portraits/men/22.jpg"
            alt=""
            className="w-12 h-12 rounded-full"
          />

        </div>

      </div>

    </div>
  );
};

export default AdminNavbar;