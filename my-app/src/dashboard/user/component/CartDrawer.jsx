import React, { useState } from "react";
import { X, Trash2 } from "lucide-react";
import { useCart } from "../../../shared/hooks/useCart";
import LoginViaMobile from "./LoginViaMobile";
import LoginViaCredential from "./LoginViaCredential";

export default function CartDrawer() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    tax,
    deliveryFee: delivery,
    totalPrice: finalTotal,
    cartOpen,
    setCartOpen,
  } = useCart();

  // cart | login-mobile | login-credential
  const [drawerStep, setDrawerStep] = useState("cart");

  const [savedMobile, setSavedMobile] = useState("");

  if (!cartOpen) return null;


  // Existing customer login success
  const handleLoginSuccess = () => {
    alert("🎉 Login successful! Order placed successfully.");

    clearCart();

    setDrawerStep("cart");
    setCartOpen(false);
  };


  // New customer
  const handleNewUser = (mobile) => {
    setSavedMobile(mobile);
    setDrawerStep("login-credential");
  };


  // New customer registration success
  const handleRegisterSuccess = () => {
    alert("🎉 Account created successfully! Order placed.");

    clearCart();

    setDrawerStep("cart");
    setCartOpen(false);
  };


  const handleCloseDrawer = () => {
    setCartOpen(false);
    setDrawerStep("cart");
  };


  return (
    <div className="fixed inset-0 z-50">

      {/* Overlay */}
      <div
        onClick={handleCloseDrawer}
        className="absolute inset-0 bg-black bg-opacity-40"
      />


      {/* Drawer */}
      <div className="
        absolute right-0 top-0 bottom-0 
        w-full max-w-[400px]
        bg-white
        flex flex-col
        justify-between
        shadow-2xl
        p-6
      ">


        {/* Header */}
        <div className="
          flex justify-between items-center 
          pb-4 border-b
        ">

          <h2 className="text-lg font-bold text-[#2D2F2F]">

            {
              drawerStep === "cart"
                ? "Julian's Order Cart"
                : "Checkout"
            }

          </h2>


          <button
            onClick={handleCloseDrawer}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

        </div>



        {/* Body */}
        <div className="
          flex-grow
          overflow-y-auto
          py-6
        ">


          {/* CART SCREEN */}

          {
            drawerStep === "cart" && (

              cartItems.length === 0 ? (

                <div className="
                  text-center
                  py-10
                  text-gray-400
                ">

                  <p className="text-sm">
                    Your cart is empty.
                  </p>

                  <p className="text-xs mt-1">
                    Add items from menu.
                  </p>

                </div>


              ) : (


                cartItems.map((item) => (

                  <div
                    key={item.id}
                    className="
                      flex items-center gap-3
                      bg-gray-50
                      p-3
                      rounded-2xl
                      mb-3
                    "
                  >


                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                        w-12 h-12
                        rounded-xl
                        object-cover
                      "
                    />


                    <div className="flex-grow">

                      <h4 className="
                        text-xs
                        font-bold
                      ">
                        {item.name}
                      </h4>


                      <p className="
                        text-[10px]
                        text-gray-400
                      ">
                        Price: ₹{item.price}
                      </p>


                      <div className="
                        flex items-center gap-2 mt-2
                      ">


                        <button
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          className="
                            w-5 h-5
                            border
                            rounded
                          "
                        >
                          -
                        </button>


                        <span className="text-xs font-bold">
                          {item.quantity}
                        </span>


                        <button
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          className="
                            w-5 h-5
                            border
                            rounded
                          "
                        >
                          +
                        </button>


                      </div>


                    </div>



                    <div className="
                      flex flex-col items-end gap-2
                    ">

                      <span className="
                        text-xs font-bold
                      ">
                        ₹{item.price * item.quantity}
                      </span>


                      <button
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        className="
                          text-gray-400
                          hover:text-red-500
                        "
                      >

                        <Trash2 className="w-4 h-4"/>

                      </button>


                    </div>


                  </div>

                ))

              )

            )
          }





          {/* MOBILE LOGIN */}

          {
            drawerStep === "login-mobile" && (

              <LoginViaMobile

                onLoginSuccess={handleLoginSuccess}

                onNewUser={handleNewUser}

                onBack={() =>
                  setDrawerStep("cart")
                }

              />

            )
          }





          {/* REGISTRATION */}

          {
            drawerStep === "login-credential" && (

              <LoginViaCredential

                mobileNumber={savedMobile}

                onRegisterSuccess={handleRegisterSuccess}

                onBack={() =>
                  setDrawerStep("login-mobile")
                }

              />

            )
          }



        </div>




        {/* PRICE SECTION */}

        {
          drawerStep === "cart" &&
          cartItems.length > 0 && (

            <div className="
              border-t
              pt-4
            ">


              <div className="
                flex justify-between
                text-xs mb-2
              ">

                <span>
                  Subtotal:
                </span>

                <span className="font-bold">
                  ₹{subtotal}
                </span>

              </div>



              <div className="
                flex justify-between
                text-xs mb-2
              ">

                <span>
                  GST (5%):
                </span>

                <span className="font-bold">
                  ₹{tax.toFixed(0)}
                </span>

              </div>



              <div className="
                flex justify-between
                text-xs mb-2
              ">

                <span>
                  Delivery Charges:
                </span>


                <span className="font-bold">

                  {
                    delivery === 0
                    ? "FREE"
                    : `₹${delivery}`
                  }

                </span>


              </div>




              <div className="
                flex justify-between
                font-bold
                text-sm
                border-t
                border-dashed
                pt-3
                mb-3
              ">

                <span>
                  Grand Total:
                </span>


                <span className="text-[#B41B00]">
                  ₹{finalTotal.toFixed(0)}
                </span>


              </div>




              <button
                onClick={() =>
                  setDrawerStep("login-mobile")
                }
                className="
                  w-full
                  py-3
                  bg-[#B41B00]
                  text-white
                  font-bold
                  rounded-full
                  text-xs
                "
              >

                Checkout Order

              </button>


            </div>

          )
        }


      </div>

    </div>
  );
}