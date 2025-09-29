// src/components/CartSidebar.jsx
import { useContext } from "react";
import { ShoppingCart, Edit3, Trash2 } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; // ✅ import for navigation

export default function CartSidebar() {
  const { cart, total, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate(); // ✅ initialize navigation

  return (
    <aside className="w-80 sticky top-24 self-start bg-white shadow-lg rounded-xl p-6 transition-all duration-300 min-h-[300px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Cart</h2>
        <button className="flex items-center gap-1 text-sm text-navy hover:underline">
          <Edit3 className="w-4 h-4" />
          Edit
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center mb-6">
        <span className="flex-1 border-t border-gray-300"></span>
      </div>

      {/* Empty State */}
      {cart.length === 0 ? (
        <div className="flex flex-col items-center text-center text-gray-500">
          <ShoppingCart className="w-12 h-12 mb-3" />
          <h3 className="text-lg font-semibold text-gray-800">
            No item in your cart
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Looks like you haven’t added anything yet.
          </p>
          <button
            onClick={() => navigate("/store")} // ✅ Go back to store
            className="mt-5 px-5 py-2 rounded-lg bg-primary text-navy text-sm font-semibold transition"
          >
            Go to Store
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <ul className="space-y-3">
            {cart.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-gray-100 rounded-md p-2"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{item.name}</span>
                  <span className="text-xs text-gray-500">x{item.quantity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-navy">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="flex items-center my-6">
            <span className="flex-1 border-t border-gray-300"></span>
          </div>

          {/* Subtotal */}
          <div className="flex justify-between items-center font-semibold text-gray-800">
            <span>Subtotal</span>
            <span>₦{total.toLocaleString()}</span>
          </div>

          {/* Checkout Button */}
          <button
            onClick={() => navigate("/carts")} // ✅ go to checkout page
            className="mt-5 w-full px-5 py-4 rounded-lg bg-primary text-navy text-sm font-semibold transition"
          >
            Proceed to Cart
          </button>
        </>
      )}
    </aside>
  );
}
