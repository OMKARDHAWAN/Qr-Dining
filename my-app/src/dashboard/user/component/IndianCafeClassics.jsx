import React from 'react';
import { Star, Plus, Utensils } from 'lucide-react';

export default function IndianCafeClassics({ onAddToOrder }) {
  
  const featuredItem = {
    id: 'butter-chicken-bowl',
    name: 'Butter Chicken Bowl',
    category: 'Fusion Mains',
    badge: "CHEF'S CHOICE",
    rating: 4.9,
    description: 'Tender chicken in a rich, creamy tomato gravy, finished with a dollop of fresh butter and kasuri methi.',
    price: 450,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=600',
  };

  const compactItem = {
    id: 'paneer-tikka-platter',
    name: 'Paneer Tikka Platter',
    category: 'Street Bites',
    rating: 4.7,
    description: 'Marinated cottage cheese cubes grilled to perfection with bell peppers and onions.',
    price: 350,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=600',
  };

  return (
    <section className="w-full px-4 md:px-6 lg:px-8 py-6">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-black text-[#2D2F2F]">
            Indian Café Classics
          </h2>
          <span className="inline-flex items-center gap-1 bg-[#FFF0ED] text-[#B41B00] text-[10px] font-black tracking-widest px-3.5 py-1.5 rounded-full uppercase border border-[#B41B00]/10">
            <Utensils className="w-3.5 h-3.5" />
            CHEF'S SELECTION
          </span>
        </div>

        {/* Classics Flex List */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left: Large Featured Card */}
          <div className="group w-full lg:w-[calc(66.66%-8px)] bg-white rounded-[32px] overflow-hidden flex flex-col md:flex-row shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-500 flex-shrink-0">
            
            {/* Image section */}
            <div className="w-full md:w-[45%] h-[240px] md:h-auto relative overflow-hidden">
              <img 
                src={featuredItem.image} 
                alt={featuredItem.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Content section */}
            <div className="w-full md:w-[55%] p-6 md:p-8 flex flex-col justify-between">
              <div>
                
                {/* Badges */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-[#F3E8FF] text-[#9333EA] text-[10px] font-extrabold tracking-widest px-2.5 py-1 rounded-full uppercase">
                    {featuredItem.badge}
                  </span>
                  <div className="flex items-center gap-1 text-[#B41B00]">
                    <span className="text-xs font-black">★</span>
                    <span className="text-xs font-black text-[#2D2F2F]">{featuredItem.rating}</span>
                  </div>
                </div>

                {/* Title & Desc */}
                <h3 className="text-2xl font-black text-[#2D2F2F] tracking-tight mb-2">
                  {featuredItem.name}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed font-medium mb-6">
                  {featuredItem.description}
                </p>
              </div>

              {/* Bottom Action Area */}
              <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-black text-[#2D2F2F]">
                  ₹{featuredItem.price}
                </span>
                <button 
                  onClick={() => onAddToOrder(featuredItem)}
                  className="px-6 py-3 bg-gradient-to-r from-[#B41B00] to-[#FF775D] text-white text-xs font-extrabold rounded-full shadow-[0_4px_15px_rgba(180,27,0,0.25)] hover:scale-105 active:scale-95 transition-all duration-300 uppercase tracking-wider"
                >
                  Add to Order
                </button>
              </div>

            </div>
          </div>

          {/* Right: Compact Product Card */}
          <div 
            onClick={() => onAddToOrder(compactItem)}
            className="group w-full lg:w-[calc(33.33%-16px)] bg-white rounded-[32px] overflow-hidden flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-xl cursor-pointer transition-all duration-500 flex-shrink-0"
          >
            
            {/* Image */}
            <div className="h-[200px] w-full relative overflow-hidden">
              <img 
                src={compactItem.image} 
                alt={compactItem.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Floating icon badge */}
              <div className="absolute top-4 right-4 w-9 h-9 bg-[#B41B00] text-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:rotate-12">
                <Utensils className="w-4 h-4" />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col justify-between flex-grow">
              <div className="mb-4">
                
                {/* Rating & Title */}
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-black text-[#2D2F2F] tracking-tight">
                    {compactItem.name}
                  </h4>
                  <div className="flex items-center gap-0.5 text-[#B41B00]">
                    <span className="text-xs font-black">★</span>
                    <span className="text-xs font-black text-[#2D2F2F]">{compactItem.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed font-medium line-clamp-2">
                  {compactItem.description}
                </p>
              </div>

              {/* Price & Plus */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-lg font-black text-[#2D2F2F]">
                  ₹{compactItem.price}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#F3F4F6] text-[#2D2F2F] group-hover:bg-[#B41B00] group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-sm">
                  <Plus className="w-4 h-4" />
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
