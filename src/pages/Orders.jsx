import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import SidebarInfo from "../components/SidebarInfo";
import { CheckCircle, Clock, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { orders } from "../data/orders"; // ✅ import data

export default function OrdersPage() {
  return (
    <>
      <div className="bg-[#f5f5f5] pt-16">
        <Navbar />

        {/* Hero Section */}
        <div className="text-center py-16 bg-navy text-white flex flex-col items-center">
          <Breadcrumb
            items={[
              { label: "Home", to: "/" },
              { label: "Orders" },
            ]}
            className="text-xl font-semibold"
          />
          <p className="mt-3 max-w-2xl text-gray-200">
            Track and manage all your past and ongoing orders.
          </p>
        </div>

        {/* Main Section */}
        <section className="px-4 sm:px-6 max-w-7xl mx-auto py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Left Column (Orders List) */}
          <div className="lg:col-span-2 space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl p-6 shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition"
              >
                {/* Left Info */}
                <div>
                  <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600">
                    Placed on {order.createdAt}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    {order.status === "Delivered" ? (
                      <CheckCircle className="text-green-600" size={18} />
                    ) : order.status === "Processing" ? (
                      <Clock className="text-yellow-500" size={18} />
                    ) : (
                      <Truck className="text-blue-600" size={18} />
                    )}
                    <span className="font-medium">{order.status}</span>
                  </div>
                </div>

                {/* Right Info */}
                <div className="flex flex-col sm:items-end text-sm gap-2">
                  <p className="text-gray-600">{order.items.length} items</p>
                  <p className="font-bold text-navy">
                    ₦{order.total.toLocaleString()}
                  </p>
                  <Link
                    to={`/orders/${order.id}`}
                    className="inline-block px-4 py-2 bg-navy text-white rounded-lg text-sm font-medium hover:bg-navy/90 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}

            {orders.length === 0 && (
              <p className="text-center text-gray-600">
                No orders yet.{" "}
                <Link to="/" className="text-navy font-semibold underline">
                  Start Shopping
                </Link>
              </p>
            )}
          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-1 space-y-6">
            <SidebarInfo />
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
