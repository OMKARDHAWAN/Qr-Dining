import React, { useState } from 'react';
import { X, Trash2, AlertCircle } from 'lucide-react';
import { useCart } from '../../../shared/hooks/useCart';
import axios from 'axios';
import { useTable } from '../../../app/providers/TableContextApi/TableProvider';
import { useAuth } from '../../../app/providers/AuthContextApi/AuthProvider';
import LoginViaMobile from './LoginViaMobile';
import LoginViaCredential from './LoginViaCredential';

export default function CartDrawer({ isOpen, onClose }) {
  const { 
    cartItems, 
    increaseQuantity, 
    decreaseQuantity, 
    removeFromCart, 
    clearCart,
    subtotal,
    tax,
    deliveryFee: delivery,
    totalPrice: finalTotal
  } = useCart();

  const { tableId } = useTable();
  const { user, logout } = useAuth();

  // Steps: "cart" | "login-mobile" | "login-credential"
  const [drawerStep, setDrawerStep] = useState("cart");
  const [savedMobile, setSavedMobile] = useState("");

  const [error, setError] = useState("");
  const [ordering, setOrdering] = useState(false);

  if (!isOpen) return null;

  // sum of item quantities
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Send request to ASP.NET Core Order Service
  const handlePlaceOrder = async () => {
    setOrdering(true);
    setError("");

    const token = localStorage.getItem("token");
    const itemsDescription = cartItems
      .map((item) => `${item.name} x${item.quantity}`)
      .join(", ");

    const orderPayload = {
      TableId: parseInt(tableId || "1"),
      OrderItems: itemsDescription,
      Price: finalTotal,
      Notes: "Table QR Order",
      Status: "Pending",
      Quantity: totalQuantity,
      Duration: "15-20 mins"
    };

    try {
      const response = await axios.post("https://localhost:44311/api/orders", orderPayload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        alert(`🎉 Order placed successfully for Table #${tableId || "1"}!`);
        clearCart();
        setDrawerStep("cart");
        onClose();
      } else {
        setError("Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error("Order Service error:", err);
      setError(err.response?.data?.message || err.message || "Could not connect to the Order Service.");
    } finally {
      setOrdering(false);
    }
  };

  const handleCheckoutClick = () => {
    const isCustomer = user && (user.role === "User" || user.Role === "User");
    if (isCustomer) {
      handlePlaceOrder();
    } else {
      setDrawerStep("login-mobile");
    }
  };

  const handleLoginSuccess = () => {
    handlePlaceOrder();
  };

  const handleNewUser = (mobile) => {
    setSavedMobile(mobile);
    setDrawerStep("login-credential");
  };

  const handleRegisterSuccess = () => {
    handlePlaceOrder();
  };

  const handleCloseDrawer = () => {
    setDrawerStep("cart");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Background shadow overlay */}
      <div 
        onClick={handleCloseDrawer}
        className="absolute inset-0 bg-black bg-opacity-40"
      />

      {/* Cart Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-[400px] bg-white flex flex-col justify-between shadow-2xl p-6 font-sans">
        
        {/* Cart Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-bold text-[#2D2F2F]">
              {drawerStep === "cart" ? "Julian's Order Cart" : "Checkout"}
            </h2>
            {/* User details and logout button removed */}
          </div>
          <button 
            onClick={handleCloseDrawer}
            className="p-1 rounded hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Local Error Alert */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2 text-[11px] font-bold text-red-600">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Scrollable Body */}
        <div className="flex-grow overflow-y-auto py-4">
          
          {drawerStep === "cart" && (
            cartItems.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <p className="text-sm">Your cart is empty.</p>
                <p className="text-xs mt-1">Add items from the menu to start ordering!</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl mb-3 border border-gray-150"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-12 h-12 rounded-xl object-cover"
                  />

                  <div className="flex-grow">
                    <h4 className="text-xs font-bold text-[#2D2F2F]">{item.name}</h4>
                    <p className="text-[10px] text-gray-400">Price: ₹{item.price}</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-5 h-5 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 text-xs"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => increaseQuantity(item.id)}
                        className="w-5 h-5 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs font-bold text-[#2D2F2F]">₹{item.price * item.quantity}</span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )
          )}

          {drawerStep === "login-mobile" && (
            <LoginViaMobile 
              onLoginSuccess={handleLoginSuccess}
              onNewUser={handleNewUser}
              onBack={() => setDrawerStep("cart")}
            />
          )}

          {drawerStep === "login-credential" && (
            <LoginViaCredential
              mobileNumber={savedMobile}
              onRegisterSuccess={handleRegisterSuccess}
              onBack={() => setDrawerStep("login-mobile")}
            />
          )}

        </div>

        {/* Pricing Summary and Checkout Button */}
        {drawerStep === "cart" && cartItems.length > 0 && (
          <div className="border-t border-gray-200 pt-4 bg-white">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Subtotal:</span>
              <span className="font-bold text-[#2D2F2F]">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>GST (5%):</span>
              <span className="font-bold text-[#2D2F2F]">₹{tax.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Delivery Charges:</span>
              <span className="font-bold text-[#2D2F2F]">
                {delivery === 0 ? "FREE" : `₹${delivery}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#2D2F2F] my-3 pt-2 border-t border-dashed">
              <span>Grand Total:</span>
              <span className="text-[#B41B00]">₹{finalTotal.toFixed(0)}</span>
            </div>

            <button
              onClick={handleCheckoutClick}
              disabled={ordering}
              className="w-full py-3 bg-[#B41B00] hover:bg-[#FF775D] text-white font-bold rounded-full text-xs transition-colors duration-200 uppercase disabled:opacity-50"
            >
              {ordering ? "Placing Order..." : "Checkout Order"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
