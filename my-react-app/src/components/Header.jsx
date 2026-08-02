import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  ShoppingBasket,
} from "lucide-react";

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">

      <div className="max-w-[1600px] mx-auto h-20 px-8 flex items-center justify-between gap-6">

        {/* Left */}

        <Link to="/" className="flex items-center gap-2 text-red-700 font-semibold text-lg hover:text-red-800 transition-colors">

          <ArrowLeft size={26} />

          <span>Back</span>

        </Link>

        {/* Search */}

        <div className="flex-1 relative">

          <Search
            className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500"
            size={28}
          />

          <input
            type="text"
            placeholder="Search for dishes, cuisines..."
            className="w-full h-14 rounded-full bg-red-50 pl-16 text-xl outline-none"
          />

        </div>

        {/* Right */}

        <div className="flex items-center gap-6">

          <div className="relative">

            <ShoppingBasket
              size={34}
              className="text-red-700"
            />

            <div
              className="
                absolute
                -top-2
                -right-2
                w-6
                h-6
                rounded-full
                bg-red-700
                text-white
                text-sm
                flex
                items-center
                justify-center
                font-bold"
            >
              3
            </div>

          </div>

          <img
            src="https://i.pravatar.cc/100"
            alt=""
            className="w-14 h-14 rounded-full border"
          />

        </div>

      </div>

    </header>
  );
}

export default Header;