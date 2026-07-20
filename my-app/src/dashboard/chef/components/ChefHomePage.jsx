import React from "react";

import ChefSidebar from "../components/ChefSidebar";
import ChefNavbar from "../components/ChefNavbar";
import StatsCards from "../components/StatsCards";
import OrdersTable from "../components/OrdersTable";
import ActionCard from "../components/ActionCard";
import FloatingButton from "../components/FloatingButton";

function ChefHomePage() {
    return (
        <div className="min-h-screen bg-gray-100">

            {/* Sidebar */}

            <ChefSidebar />

            {/* Main Content */}

            <main className="md:ml-72 min-h-screen">

                {/* Navbar */}

                <ChefNavbar />

                {/* Dashboard */}

                <div className="p-8 space-y-8">

                    {/* Stats */}

                    <StatsCards />

                    {/* Orders */}

                    <OrdersTable />

                    {/* Bottom Card */}

                    <div className="flex justify-end">

                        <ActionCard />

                    </div>

                </div>

            </main>

            {/* Floating Action Button */}

            <FloatingButton />

        </div>
    );
}

export default ChefHomePage;