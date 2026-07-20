import { FiBell, FiSettings } from "react-icons/fi";

const AdminNavbar = () => {
  return (
    <div className="bg-white h-24 px-10 flex justify-between items-center border-b shadow-sm">

      {/* Left */}

      <div>
        <h1 className="text-2xl font-bold text-red-700">
          
        </h1>

        <p className="text-gray-500">
          
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        <input
          type="text"
          placeholder="Search..."
          className="w-80 border rounded-full px-5 py-3 outline-none"
        />

        <FiBell
          className="text-2xl cursor-pointer hover:text-orange-500"
        />

        <FiSettings
          className="text-2xl cursor-pointer hover:text-orange-500"
        />

        <div className="flex items-center gap-3">

          <div className="text-right">
            <h3 className="font-semibold">
              Krish Kapoor
            </h3>

            <p className="text-sm text-gray-500">
              Restaurant Manager
            </p>
          </div>

          <img
            src="https://randomuser.me/api/portraits/men/22.jpg"
            alt="Manager"
            className="w-12 h-12 rounded-full object-cover"
          />

        </div>

      </div>

    </div>
  );
};

export default AdminNavbar;