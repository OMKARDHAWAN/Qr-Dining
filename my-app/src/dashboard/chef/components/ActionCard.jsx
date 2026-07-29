aimport React from "react";

function ActionCard() {
  return (
    <div className="w-full lg:w-1/3">

      <div className="bg-gradient-to-br from-orange-600 to-orange-500 rounded-3xl p-8 shadow-xl shadow-orange-300/40 flex flex-col justify-between h-full">

        {/* Top Icon */}

        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-8">

          <span className="material-symbols-outlined text-white text-3xl">
            auto_awesome
          </span>

        </div>

        {/* Content */}

        <div>

          <h2 className="text-white text-2xl font-bold leading-tight mb-4">
            Add a new daily special to the menu
          </h2>

          <p className="text-orange-100 text-sm leading-6 mb-8">
            AI will automatically suggest pricing based on
            current inventory and customer demand.
          </p>

          <button className="w-full bg-white text-orange-600 font-bold py-4 rounded-2xl hover:bg-gray-100 transition duration-300 active:scale-95">

            New Special

          </button>

        </div>

      </div>

    </div>
  );
}

export default ActionCard;