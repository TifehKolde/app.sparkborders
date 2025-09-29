// src/pages/OrderDetailsPage.jsx
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";
import { orders } from "../data/orders"; // ✅ Import data
import { CheckCircle, Clock, Truck } from "lucide-react";

export default function OrderDetailsPage() {
  const { id } = useParams();

  // ✅ Find order by ID
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-700">
            Order not found
          </h2>
          <Link
            to="/orders"
            className="mt-4 inline-block px-4 py-2 bg-navy text-white rounded-lg text-sm font-medium hover:bg-navy/90 transition"
          >
            Back to Orders
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="bg-[#f5f5f5] pt-16">
        <Navbar />

        {/* Hero Section */}
        <div className="text-center py-16 bg-navy text-white flex flex-col items-center">
          <Breadcrumb
            items={[
              { label: "Home", to: "/" },
              { label: "Orders", to: "/orders" },
              { label: `Order #${order.id}` },
            ]}
            className="text-xl font-semibold"
          />
          <p className="mt-3 max-w-2xl text-gray-200">
            View full details of your order.
          </p>
        </div>

        {/* Main Section */}
        <section className="px-4 sm:px-6 max-w-5xl mx-auto py-8 sm:py-12 space-y-8">
          {/* Order Summary */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <p>
                <span className="font-medium">Order ID:</span> {order.id}
              </p>
              <p>
                <span className="font-medium">Placed on:</span> {order.createdAt}
              </p>
              <p>
                <span className="font-medium">Delivery Date:</span>{" "}
                {order.deliveryDate}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Status:</span>
                {order.status === "Delivered" ? (
                  <CheckCircle className="text-green-600" size={18} />
                ) : order.status === "Processing" ? (
                  <Clock className="text-yellow-500" size={18} />
                ) : (
                  <Truck className="text-blue-600" size={18} />
                )}
                {order.status}
              </p>
              <p>
                <span className="font-medium">Total:</span> ₦
                {order.total.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-lg font-semibold mb-4">Ordered Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-4 last:border-none"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₦{item.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
            <p className="text-gray-700">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </p>
            <p className="text-gray-700">{order.shippingAddress.phone}</p>
            <p className="text-gray-700">{order.shippingAddress.address}</p>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
