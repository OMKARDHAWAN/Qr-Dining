import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../../../shared/hooks/useCart';


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

  if (!isOpen) return null;

  const handleCheckout = () => {
    alert("Thank you for your order! Your request has been sent to the kitchen.");
    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Background shadow overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black bg-opacity-40"
      />

      {/* Cart Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-[400px] bg-white flex flex-col justify-between shadow-2xl p-6 font-sans">
        
        {/* Cart Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-[#2D2F2F]">Julian's Order Cart</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Scrollable list of items */}
        <div className="flex-grow overflow-y-auto py-4">
          {cartItems.length === 0 ? (
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
                {/* Product Thumbnail */}
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-xl object-cover"
                />

                {/* Info & Quantity controls */}
                <div className="flex-grow">
                  <h4 className="text-xs font-bold text-[#2D2F2F]">{item.name}</h4>
                  <p className="text-[10px] text-gray-400">Price: ₹{item.price}</p>
                  
                  {/* Plus and Minus buttons */}
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

                {/* Delete button and price */}
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
          )}
        </div>

        {/* Pricing Summary and Checkout Button */}
        {cartItems.length > 0 && (
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
              onClick={handleCheckout}
              className="w-full py-3 bg-[#B41B00] hover:bg-[#FF775D] text-white font-bold rounded-full text-xs transition-colors duration-200 uppercase"
            >
              Checkout Order
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
