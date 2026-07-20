import { Outlet } from "react-router-dom";
import UserNavbar from "../../dashboard/user/component/UserNavbar";
import { CartProvider } from "../../app/providers/CartProvider";
import { useState } from "react";
import { useCart } from "../../shared/hooks/useCart";

export default function UserLayout(){
     const [searchQuery, setSearchQuery] = useState('');
      const [activeCategory, setActiveCategory] = useState(null);
      const [activeSection, setActiveSection] = useState('discover');
    
      // Interactive Drawer States
      const [cartOpen, setCartOpen] = useState(false);
      const [aiOpen, setAiOpen] = useState(false);
    
      // Consume global cart Context API
      const { addToCart } = useCart();
    
      // Helper to add item to order and automatically open the drawer for user feedback
      const handleAddToOrder = (item) => {
        addToCart(item);
        setCartOpen(true);
      };
    
      const handleProfileClick = () => {
        alert("👤 Julian Gold's Profile Summary:\n- Account Tier: Platinum VIP\n- Table Number: 14\n- Total Spent This Month: ₹4,850");
      };
    
      const handleNotificationClick = () => {
        alert("🔔 Notifications:\n- Your last order has been served!\n- Happy Hour ends in 45 minutes!");
      };
    
      const handleClaimOffer = (offer) => {
        alert(`🎉 Offer Applied: "${offer.title}"! We've added this to your session discounts.`);
      };
    
    return(
        <CartProvider>
       <div className="flex flex-col  w-full ">
        <UserNavbar
         searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCartClick={() => setCartOpen(true)}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        />
        <Outlet/>
       </div>
        </CartProvider>
    )
}