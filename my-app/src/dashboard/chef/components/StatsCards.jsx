import React from "react";

function StatsCards() {
  const stats = [
    {
      title: "Total Active",
      value: "12",
      subtitle: "+2 since 10m",
      border: "border-orange-500",
      badgeColor: "bg-green-100 text-green-600",
      icon: null,
    },
    {
      title: "Preparing",
      value: "08",
      subtitle: null,
      border: "",
      badgeColor: "",
      icon: "skillet",
      iconColor: "text-orange-500",
    },
    {
      title: "Avg. Time",
      value: "18",
      unit: "min",
      subtitle: null,
      border: "",
      badgeColor: "",
      icon: "timer",
      iconColor: "text-blue-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      {stats.map((card, index) => (
        <div
          key={index}
          className={`bg-white rounded-2xl shadow-sm p-6 ${card.border ? `border-l-4 ${card.border}` : ""
            }`}
        >
          <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">
            {card.title}
          </p>

          <div className="flex justify-between items-end">

            <div>

              <h2 className="text-4xl font-black text-gray-900">

                {card.value}

                {card.unit && (
                  <span className="text-lg font-semibold ml-1">
                    {card.unit}
                  </span>
                )}

              </h2>

              {card.subtitle && (
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${card.badgeColor}`}
                >
                  {card.subtitle}
                </span>
              )}

            </div>

            {card.icon && (
              <span
                className={`material-symbols-outlined text-4xl ${card.iconColor}`}
              >
                {card.icon}
              </span>
            )}

          </div>

        </div>
      ))}

    </div>
  );
}

export default StatsCards;