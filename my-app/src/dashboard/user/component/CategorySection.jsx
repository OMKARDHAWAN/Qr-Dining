import React from 'react';
import { Coffee, Flame, Utensils, IceCream, UtensilsCrossed } from 'lucide-react';

export default function CategorySection({ activeCategory, setActiveCategory }) {
  const categories = [
    {
      id: "chai-coffee",
      name: "Chai & Coffee",
      icon: Coffee,
    },
    {
      id: "street-bites",
      name: "Street Bites",
      icon: Flame,
    },
    {
      id: "parathas-rolls",
      name: "Parathas & Rolls",
      icon: Utensils,
    },
    {
      id: "indian-desserts",
      name: "Indian Desserts",
      icon: IceCream,
    },
    {
      id: "fusion-mains",
      name: "Fusion Mains",
      icon: UtensilsCrossed,
    },
  ];

  return (
    <section className="w-full px-4 md:px-6 lg:px-8 py-6">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-black text-[#2D2F2F]">
            Browse Categories
          </h2>
          <button 
            onClick={() => setActiveCategory(null)}
            className="text-xs font-extrabold tracking-widest text-[#B41B00] hover:text-[#FF775D] transition-colors duration-300 uppercase"
          >
            VIEW ALL
          </button>
        </div>

        {/* Category Flex List */}
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => setActiveCategory(isActive ? null : cat.id)}
                className={`group flex flex-col items-center justify-center p-6 rounded-[32px] cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-xl hover:scale-[1.03] transition-all duration-300 w-[calc(50%-8px)] md:w-[calc(33.33%-11px)] lg:w-[calc(20%-13px)] flex-shrink-0 ${
                  isActive ? 'bg-[#B41B00] text-white shadow-lg' : 'bg-white text-[#2D2F2F]'
                }`}
              >
                {/* Icon Container */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-colors duration-300 ${
                  isActive 
                    ? 'bg-white text-[#B41B00]' 
                    : 'bg-[#F6F6F6] text-[#2D2F2F] group-hover:bg-[#B41B00] group-hover:text-white'
                }`}>
                  <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Label */}
                <span className={`text-[10px] font-extrabold tracking-wider uppercase text-center ${
                  isActive ? 'text-white' : 'text-gray-500 group-hover:text-[#2D2F2F]'
                }`}>
                  {cat.name}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
