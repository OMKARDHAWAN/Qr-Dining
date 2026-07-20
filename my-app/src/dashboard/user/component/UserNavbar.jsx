import React, { useState } from 'react';
import { Search, Bell, ShoppingCart, User, Menu as MenuIcon, X } from 'lucide-react';
import { useCart } from '../../../shared/hooks/useCart';
export default function UserNavbar({ 
  searchQuery, 
  setSearchQuery, 
  onCartClick, 
  onNotificationClick, 
  onProfileClick,
  activeSection,
  setActiveSection
}) {
  const { cartItemsCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 md:px-6 lg:px-8 py-4 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-black tracking-tight text-[#2D2F2F] hover:opacity-80 transition-opacity cursor-pointer">
            Culinary<span className="text-[#B41B00]">AI</span>
          </span>
        </div>
        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-semibold text-sm tracking-wider">
          <button 
            onClick={() => setActiveSection('discover')}
            className={`transition-colors duration-300 py-1 border-b-2 ${
              activeSection === 'discover' 
                ? 'text-[#B41B00] border-b-[#B41B00]' 
                : 'text-[#2D2F2F]/60 border-b-transparent hover:text-[#2D2F2F]'
            }`}
          >
            DISCOVER
          </button>
          <button 
            onClick={() => setActiveSection('menu')}
            className={`transition-colors duration-300 py-1 border-b-2 ${
              activeSection === 'menu' 
                ? 'text-[#B41B00] border-b-[#B41B00]' 
                : 'text-[#2D2F2F]/60 border-b-transparent hover:text-[#2D2F2F]'
            }`}
          >
            MENU
          </button>
         
        </div>
        {/* Right: Search, Cart, Notifications, Profile */}
        <div className="flex items-center gap-3 md:gap-5">
          
          {/* Search bar */}
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search flavors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[180px] md:w-[240px] pl-10 pr-4 py-2 text-sm rounded-full bg-[#F3F4F6] text-[#2D2F2F] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B41B00]/20 focus:bg-white transition-all duration-300"
            />
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
          </div>
          {/* Cart Icon */}
          <button 
            onClick={onCartClick}
            className="relative p-2 rounded-full text-[#2D2F2F] hover:bg-gray-100 active:scale-95 transition-all duration-300"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#B41B00] text-[10px] font-bold text-white shadow-[0_2px_8px_rgba(180,27,0,0.4)] animate-pulse">
                {cartItemsCount}
              </span>
            )}
          </button>
          {/* Notification Icon */}
          <button 
            onClick={onNotificationClick}
            className="relative p-2 rounded-full text-[#2D2F2F] hover:bg-gray-100 active:scale-95 transition-all duration-300"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#B41B00] ring-2 ring-white" />
          </button>
          {/* Profile Icon */}
          <button 
            onClick={onProfileClick}
            className="flex items-center justify-center p-0.5 rounded-full border-2 border-transparent hover:border-[#B41B00] active:scale-95 transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150" 
                alt="User Profile" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <User className="w-4 h-4 text-[#2D2F2F]" />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}
