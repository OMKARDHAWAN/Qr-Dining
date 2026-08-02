import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-10">

      <h1 className="text-5xl font-bold mb-10">
        🍽 Restaurant Management System
      </h1>

      <div className="grid gap-4 w-full max-w-sm">

        <Link
          to="/menu"
          className="bg-orange-500 text-white text-center py-3 rounded-xl hover:bg-orange-600"
        >
          Menu
        </Link>

        <Link
          to="/offers"
          className="bg-blue-500 text-white text-center py-3 rounded-xl hover:bg-blue-600"
        >
          Offers
        </Link>

        <Link
          to="/orders"
          className="bg-green-500 text-white text-center py-3 rounded-xl hover:bg-green-600"
        >
          Orders
        </Link>

        <Link
          to="/profile"
          className="bg-purple-500 text-white text-center py-3 rounded-xl hover:bg-purple-600"
        >
          Edit Profile
        </Link>

        <Link
          to="/profile-overview"
          className="bg-pink-500 text-white text-center py-3 rounded-xl hover:bg-pink-600"
        >
          Profile Overview
        </Link>

      </div>

    </div>
  );
}

export default Home;