// src/pages/CheckoutPage.jsx
import { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import { CartContext } from "../context/CartContext";
import OrderSummary from "../components/OrderSummary";
import SidebarInfo from "../components/SidebarInfo";
import { Minus, Plus, Trash, RefreshCcw, Copy, Edit2 } from "lucide-react";
import DropdownCard from "../components/ShippingCardDropdownCard";
import Footer from "../components/Footer";

export default function CheckoutPage() {
  const { cart = [], setCart } = useContext(CartContext);
  const [selectedPayment, setSelectedPayment] = useState("");

  // shipping address menu
  const menuOptions = [
    { label: "Edit", icon: <Edit2 size={16} />, onClick: () => {} },
    { label: "Change", icon: <RefreshCcw size={16} />, onClick: () => {} },
    { label: "Copy", icon: <Copy size={16} />, onClick: () => {} },
    {
      label: "Delete",
      icon: <Trash size={16} />,
      onClick: () => {}, // your delete logic here
      isDelete: true,
    },
  ];

  const updateCart = (newCart) => setCart(newCart);

  const increaseQty = (id) => {
    updateCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    updateCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    updateCart(cart.filter((item) => item.id !== id));
  };

  const removeAll = () => updateCart([]);

  // Shipping address fallback
  const shippingAddress = {
    firstName: "John",
    lastName: "Doe",
    phone: "+2348012345678",
    address: "No 1, Example Street, Lagos",
  };

  const handleCheckout = () => {
    console.log("Checkout clicked with payment method:", selectedPayment);
  };

  return (
    <>
    <div className="bg-[#f5f5f5] pt-16">
      <Navbar />

      {/* Hero Section */}
      <div className="text-center py-16 bg-navy text-white flex flex-col items-center">
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Checkout" },
          ]}
          className="text-xl font-semibold"
        />
        <p className="mt-3 max-w-2xl text-gray-200">
          Review your order and complete your purchase.
        </p>
      </div>

      {/* Main Section */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping & Delivery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <DropdownCard title="Shipping Address" options={menuOptions}>
              <p>
                {shippingAddress.firstName} {shippingAddress.lastName}
              </p>
              <p>{shippingAddress.phone}</p>
              <p>{shippingAddress.address}</p>
            </DropdownCard>

            <div className="bg-white rounded-xl p-6 shadow space-y-2">
              <h3 className="font-semibold text-lg">Shipping Method</h3>
              <p>Standard: Free</p>
              <p>Delivery Date: 05 Sep 2025 &gt;</p>
              <p>Courier: Spark Logistics</p>
            </div>
          </div>

          {/* Product List */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start bg-white rounded-xl p-4 sm:p-6 shadow-sm gap-4"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-48 h-40 sm:h-24 object-cover rounded"
                />

                {/* Info + Actions */}
                <div className="flex flex-1 flex-col sm:flex-row justify-between w-full gap-4">
                  {/* Product Info */}
                  <div className="space-y-1">
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

                  {/* Actions */}
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
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl p-6 shadow space-y-4">
            <h3 className="font-semibold text-lg">Pick a Payment Method</h3>
            {["Monnify", "Loan Wallet", "Wallet", "Paystack"].map((method) => (
              <label key={method} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={selectedPayment === method}
                  onChange={() => setSelectedPayment(method)}
                  className="rounded-full w-4 h-4"
                />
                <span>{method}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          <OrderSummary cart={cart} onCheckout={handleCheckout} />
          <SidebarInfo />
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
}
