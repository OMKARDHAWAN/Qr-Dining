import { Heart, Star, Plus } from "lucide-react";

function FoodCard({ item }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">

      {/* Image */}
      <div className="relative">

        <img
          src={item.image}
          alt={item.name}
          className="w-full h-80 object-cover"
        />

        {/* Favourite Button */}
        <button className="absolute top-4 right-4 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md">
          <Heart size={22} />
        </button>

        {/* Veg / Non Veg */}
        <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg flex items-center gap-2 shadow">

          {item.type === "veg" ? (
            <>
              <div className="w-4 h-4 border-2 border-green-600 flex items-center justify-center">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              </div>

              <span className="font-semibold text-sm uppercase">
                Veg
              </span>
            </>
          ) : (
            <>
              <div className="w-4 h-4 border-2 border-red-600 flex items-center justify-center">
                <div
                  className="
                    w-0
                    h-0
                    border-l-[5px]
                    border-r-[5px]
                    border-b-[8px]
                    border-l-transparent
                    border-r-transparent
                    border-b-red-600
                  "
                ></div>
              </div>

              <span className="font-semibold text-sm uppercase">
                Non-Veg
              </span>
            </>
          )}

        </div>

      </div>

      {/* Content */}

      <div className="p-6">

        <div className="flex justify-between items-start">

          <h2 className="text-3xl font-bold">
            {item.name}
          </h2>

          <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-lg">

            <Star
              size={18}
              fill="#facc15"
              color="#facc15"
            />

            <span className="font-bold">
              {item.rating}
            </span>

          </div>

        </div>

        <p className="text-gray-600 mt-4 leading-8">
          {item.description}
        </p>

        <div className="flex justify-between items-center mt-6">

          <h2 className="text-3xl font-bold text-red-600">
            ₹{item.price}
          </h2>

          <button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-3 flex items-center gap-2">

            <Plus size={20} />

            Add to Cart

          </button>

        </div>

      </div>

    </div>
  );
}

export default FoodCard;