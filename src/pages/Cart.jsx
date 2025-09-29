// src/pages/Cart.jsx
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import SidebarInfo from "../components/SidebarInfo";
import Breadcrumb from "../components/Breadcrumb";
import { Trash, Minus, Plus } from "lucide-react";
import CheckoutModal from "../components/CheckOutModal.jsx";
import { CartContext } from "../context/CartContext";
import OrderSummary from "../components/OrderSummary";
import Footer from "../components/Footer.jsx";

export default function Cart() {
  const { cart = [], setCart } = useContext(CartContext);
  const [selected, setSelected] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);

  // ✅ Centralized update
  const updateCart = (newCart) => setCart(newCart);

  // ✅ Quantity controls
  const increaseQty = (id) =>
    updateCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

  const decreaseQty = (id) =>
    updateCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

  // ✅ Remove controls
  const removeItem = (id) => {
    updateCart(cart.filter((item) => item.id !== id));
    setSelected((prev) => prev.filter((sid) => sid !== id));
  };

  const removeSelected = () => {
    updateCart(cart.filter((item) => !selected.includes(item.id)));
    setSelected([]);
  };

  const removeAll = () => {
    updateCart([]);
    setSelected([]);
  };

  // ✅ Selection handling
  const toggleSelect = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );

  const toggleSelectAll = () =>
    setSelected(selected.length === cart.length ? [] : cart.map((i) => i.id));

  return (
   <>
    <div className="bg-[#f5f5f5] pt-16">
      <Navbar />

      {/* Hero */}
      <div className="text-center py-20 bg-navy text-white flex flex-col items-center">
        {/* ✅ Breadcrumb supports both distributor & manufacturer */}
        <Breadcrumb cart={cart} selected={selected} />

        <p className="mt-3 max-w-2xl text-gray-200">
          Review your selected items and proceed to checkout.
        </p>
      </div>

      {/* Main Section */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.length === 0 ? (
            <p className="text-center text-gray-600">
              Your cart is empty.{" "}
              <Link to="/distributors" className="text-navy font-semibold">
                Continue shopping
              </Link>
            </p>
          ) : (
            <>
              {/* Select All */}
              <div className="flex justify-between items-center mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded-full w-4 h-4"
                    checked={selected.length === cart.length}
                    onChange={toggleSelectAll}
                  />
                  <span className="text-gray-700 font-medium text-sm sm:text-base">
                    Select All
                  </span>
                </label>
                {selected.length > 0 && (
                  <button
                    onClick={removeSelected}
                    className="text-red-500 hover:text-red-700 font-medium flex items-center gap-1 text-sm sm:text-base"
                  >
                    <Trash size={16} /> Remove Selected
                  </button>
                )}
              </div>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white rounded-xl p-4 sm:p-6 shadow-sm"
                >
                  {/* Left - Image + Checkbox */}
                  <div className="flex items-start gap-3 w-full sm:w-[220px] flex-shrink-0">
                    <input
                      type="checkbox"
                      className="rounded-full w-4 h-4 mt-2"
                      checked={selected.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                    />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full sm:w-48 h-40 sm:h-24 object-cover rounded bg-white shadow-sm"
                    />
                  </div>

                  {/* Middle + Right */}
                  <div className="flex flex-1 flex-col sm:flex-row justify-between gap-4">
                    {/* Product Info */}
                    <div className="flex-1 space-y-1">
                      <h4 className="font-semibold text-base sm:text-lg">
                        {item.name}
                      </h4>
                      <p className="text-sm sm:text-base text-gray-500">
                        {item.desc}
                      </p>
                      <div className="flex flex-wrap justify-between items-center mt-1 gap-2">
                        <p className="text-navy font-semibold text-sm sm:text-base">
                          ₦{item.price.toLocaleString()} / pack
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          MOQ - {item.moq}
                        </p>
                      </div>
                    </div>

                    {/* Price & Qty Controls */}
                    <div className="flex flex-col sm:items-end gap-3 flex-shrink-0">
                      <span className="font-bold text-navy text-sm sm:text-base">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className={`p-2 rounded-full shadow-sm ${
                            item.quantity > 1
                              ? "bg-navy text-white"
                              : "bg-gray-200"
                          }`}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="p-2 rounded-full bg-navy text-white shadow-sm hover:bg-navy/90"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-700 text-xs sm:text-sm mt-1"
                      >
                        <Trash size={14} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Remove All */}
              {cart.length > 0 && (
                <div className="flex justify-end mt-6">
                  <button
                    onClick={removeAll}
                    className="bg-red-600 text-white py-2 px-4 rounded flex items-center gap-1 font-medium"
                  >
                    <Trash size={16} /> Remove All
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <OrderSummary cart={cart} onCheckout={() => setShowCheckout(true)} />
          <SidebarInfo />
        </div>
      </section>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        onComplete={(data) => setCheckoutData(data)}
      />
    </div>
    <Footer/>
   </>
  );
}
