import React from "react";

import ChefNavbar from "./ChefNavbar";
import StatsCards from "./StatsCards";
import OrdersTable from "./OrdersTable";
import ActionCard from "./ActionCard";
import FloatingButton from "./FloatingButton";

function ChefHomePage() {
    return (
        <div className="space-y-6">

            {/* Navbar */}
            <ChefNavbar />

            {/* Dashboard */}
            <div className="space-y-8">

                {/* Stats */}
                <StatsCards />

                {/* Orders */}
                <OrdersTable />

                {/* Bottom Card */}
                <div className="flex justify-end">
                    <ActionCard />
                </div>

            </div>

            {/* Floating Action Button */}
            <FloatingButton />

        </div>
    );
}

export default ChefHomePage;