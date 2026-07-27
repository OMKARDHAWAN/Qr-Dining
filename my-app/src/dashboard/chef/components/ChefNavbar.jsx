import React from "react";

function ChefNavbar() {
    return (
        <header className="w-full sticky top-0 z-40 bg-zinc-50/80 backdrop-blur-xl shadow-sm flex items-center justify-between px-8 py-4">

            {/* Left Side */}

            <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
                    Active Orders
                </h2>

                <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>

                    <span className="text-xs font-bold uppercase tracking-wider text-gray-600">
                        Live Dashboard
                    </span>
                </div>
            </div>

            {/* Right Side */}

            <div className="flex items-center gap-4">

                {/* Search */}

                <div className="relative hidden lg:block">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        search
                    </span>

                    <input
                        type="text"
                        placeholder="Search orders..."
                        className="bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                {/* Notification */}

                <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
                    <span className="material-symbols-outlined text-gray-600">
                        notifications
                    </span>

                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Settings */}

                <button className="p-2 rounded-full hover:bg-gray-100 transition">
                    <span className="material-symbols-outlined text-gray-600">
                        settings
                    </span>
                </button>

                {/* Profile */}

                <div className="flex items-center gap-3 pl-4 border-l border-gray-300">

                    <img
                        src="https://i.pravatar.cc/100?img=12"
                        alt="Chef"
                        className="w-10 h-10 rounded-full object-cover"
                    />

                    <div className="hidden xl:block">

                        <h4 className="font-bold text-sm text-gray-800">
                            Vikram Singh
                        </h4>

                        <p className="text-[11px] uppercase tracking-widest text-gray-500">
                            Executive Chef
                        </p>

                    </div>

                </div>

            </div>

        </header>
    );
}

export default ChefNavbar;