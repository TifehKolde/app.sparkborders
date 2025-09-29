// src/components/OrderSummary.jsx
import { Info, ShoppingCart } from "lucide-react";

export default function OrderSummary({ cart = [], onCheckout }) {
  // Compute totals dynamically from cart
  const itemsTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 3000; // placeholder; you can replace with real value
  const subtotal = itemsTotal - discount;
  const shipping = 2500; // placeholder for Spark Logistics
  const orderTotal = subtotal + shipping;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-6 shadow space-y-4">
        <h3 className="font-bold text-lg">Order Summary</h3>

        {/* Items Total */}
        <div className="flex justify-between">
          <span>Item(s) Total</span>
          <span className="text-gray-500 line-through">
            ₦{itemsTotal.toLocaleString()}
          </span>
        </div>

        {/* Discount */}
        <div className="flex justify-between">
          <span>Item(s) Discount</span>
          <span className="text-red-500">-₦{discount.toLocaleString()}</span>
        </div>

        {/* Subtotal */}
        <div className="flex justify-between">
          <span>Sub Total</span>
          <span className="font-semibold text-navy">₦{subtotal.toLocaleString()}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between">
          <span>Spark Logistics</span>
          <span className="text-gray-600">₦{shipping.toLocaleString()}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 pt-4 flex justify-between font-semibold text-navy">
          <span>Order Total</span>
          <span>₦{orderTotal.toLocaleString()}</span>
        </div>

        {/* Checkout Button */}
        <button
          onClick={onCheckout}
          className="w-full bg-primary text-navy font-semibold py-3 rounded hover:bg-primary/90 flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} /> Proceed to Checkout
        </button>

        {/* Notification Box */}
        <div className="flex items-start gap-2 bg-[#FEECEC] border-l-4 border-[#CC2125] rounded p-2">
          <Info className="h-4 w-4 text-black flex-shrink-0 mt-0.5" />
          <p className="text-sm text-custom-black line-clamp-2">
            Item availability and pricing are not guaranteed until payment is final.
          </p>
        </div>
      </div>
    </div>
  );
}
