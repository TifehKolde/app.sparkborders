import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import CartSidebar from "../components/CartSidebar";
import {
  Star,
  ShoppingCart,
  Minus,
  Plus,
  ShieldCheck,
  User,
} from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";
import SidebarInfo from "../components/SidebarInfo";

// Distributor images
import Dangote from "../assets/Distributors/dangote.png";
import Nestle from "../assets/Distributors/nestle.png";
import Unilever from "../assets/Distributors/unilever.png";
import Fmn from "../assets/Distributors/fmn.svg";
import Uac from "../assets/Distributors/uacfood.svg";

// Product Images
import ProductImg from "../assets/products/chivita.png";
import Footer from "../components/Footer";

// Distributor data
const distributors = [
  { id: "dangote", title: "Dangote Group", image: Dangote, rating: 4.5 },
  { id: "unilever", title: "Unilever Plc", image: Unilever, rating: 4 },
  { id: "nestle", title: "Nestle Plc", image: Nestle, rating: 5 },
  { id: "cadbury", title: "Cadbury", image: Fmn, rating: 3.5 },
  { id: "uac", title: "UAC Foods", image: Uac, rating: 4 },
];

// Products data
const products = [
  {
    id: 1,
    distributorId: "dangote",
    name: "Product 1",
    desc: "A brand of 100% natural fruit juice, known for its variety of flavors and commitment to natural ingredients",
    price: 5000,
    image: ProductImg,
  },
  {
    id: 2,
    distributorId: "dangote",
    name: "Product 2",
    desc: "Short description of product 2",
    price: 3500,
    image: ProductImg,
  },
  {
    id: 3,
    distributorId: "nestle",
    name: "Product 3",
    desc: "Short description of product 3",
    price: 4200,
    image: ProductImg,
  },
  {
    id: 4,
    distributorId: "uac",
    name: "Product 4",
    desc: "Short description of product 4",
    price: 2800,
    image: ProductImg,
  },
];

// Render stars
const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        key={i}
        className="w-4 h-4 text-yellow-500 fill-yellow-500"
      />
    );
  }
  if (halfStar) {
    stars.push(
      <Star
        key="half"
        className="w-4 h-4 text-yellow-500 fill-yellow-500 opacity-50"
      />
    );
  }
  while (stars.length < 5) {
    stars.push(
      <Star
        key={`empty-${stars.length}`}
        className="w-4 h-4 text-gray-300"
      />
    );
  }
  return stars;
};

export default function ProductDetails() {
  const { distributorId, id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("reviews"); // default now "reviews"

  const product = products.find(
    (p) => p.id === Number.parseInt(id) && p.distributorId === distributorId
  );
  if (!product) return <p className="pt-20 text-center">Product not found.</p>;

  const distributor = distributors.find((d) => d.id === product.distributorId);
  if (!distributor)
    return <p className="pt-20 text-center">Distributor not found.</p>;

  const addToCart = (item) => {
    console.log("Added to cart:", { ...item, quantity });
  };

  return (
   <>
    <div className="bg-[#f5f5f5] pt-16">
      <Navbar />

      {/* Hero Section */}
      <div className="text-center py-28 bg-navy text-white flex flex-col items-center">
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Distributors", to: "/distributors" },
            { label: distributor.title, to: `/distributors/${distributor.id}` },
            { label: product.name },
          ]}
          className="text-xl font-semibold"
        />
        <p className="mt-6 max-w-2xl text-gray-200">
          At Sparkborders, we bridge the gap between major distributor companies
          like Unilever, Nestlé, Cadbury, and Dangote Group and local
          wholesalers.
        </p>
      </div>

      {/* Main Section */}
      <section className="px-6 max-w-7xl mx-auto py-12 grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Product Content Area */}
        <div className="lg:col-span-3 space-y-12">
          {/* Product Details */}
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[400px] object-contain rounded-xl"
              />
            </div>

            <div className="flex-1 space-y-4">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="text-gray-700">{product.desc}</p>

              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-800">Sold by</span>
                <img
                  src={distributor.image}
                  alt={distributor.title}
                  className="w-10 h-10 object-contain rounded-full bg-white p-1"
                />
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  disabled={quantity === 1}
                  className={`p-2 rounded-full ${
                    quantity === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-navy text-white"
                  }`}
                >
                  <Minus size={16} />
                </button>
                <span className="font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-full bg-navy text-white"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Price & MOQ */}
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg text-navy">
                  ₦{product.price} /pack
                </span>
                <span className="text-navy text-lg font-semibold">MOQ - 50</span>
              </div>

              {/* Rating */}
              <div className="flex">{renderStars(distributor.rating)}</div>

              <button
                onClick={() => addToCart(product)}
                className="bg-primary text-navy font-semibold px-6 py-3 rounded flex items-center justify-center gap-2 hover:bg-primary/90 w-full"
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
            </div>
          </div>

          {/* Tabs Section */}
          <section>
            {/* Tabs */}
            <div className="flex gap-8 border-b border-gray-200 mb-6">
              <button
                className={`pb-2 ${
                  activeTab === "reviews"
                    ? "border-b-2 border-navy text-navy font-semibold"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </button>
              <button
                className={`pb-2 ${
                  activeTab === "about"
                    ? "border-b-2 border-navy text-navy font-semibold"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("about")}
              >
                About Product
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                {/* Verified info */}
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full w-fit">
                  <ShieldCheck className="text-green-600 w-4 h-4" />
                  <span className="text-sm text-green-700">
                    All reviews are from verified buyers
                  </span>
                </div>

                {/* Example Review */}
                <div className="bg-white p-4 rounded shadow space-y-2">
                  <div className="flex items-center gap-3">
                    <User className="w-10 h-10 text-gray-400" />
                    <div>
                      <p className="font-semibold">John Doe</p>
                      <p className="text-sm text-gray-500">Lagos, Nigeria</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Great product, delivery was fast and packaging was secure.
                  </p>
                  <div className="flex">{renderStars(4)}</div>
                </div>

                {/* Submit Review */}
                <form className="space-y-4">
                  <textarea
                    className="w-full border border-gray-300 rounded p-3 text-sm"
                    rows="3"
                    placeholder="Write your review..."
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-navy text-white px-6 py-2 rounded font-medium hover:bg-navy/90"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            )}

            {activeTab === "about" && (
              <div className="text-gray-700 leading-relaxed">
                <p>
                  {product.desc} This product is sourced directly from{" "}
                  <strong>{distributor.title}</strong>, ensuring authenticity and
                  quality.
                </p>
              </div>
            )}
          </section>

          {/* Related Products */}
          <section>
            <h3 className="text-xl font-bold mb-6">Related Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter(
                  (p) => p.distributorId === distributor.id && p.id !== product.id
                )
                .map((p) => (
                  <div
                    key={p.id}
                    className="p-4 flex flex-col rounded-xl bg-white hover:shadow-lg transition"
                  >
                    <Link
                      to={`/distributors/${p.distributorId}/products/${p.id}`}
                      className="flex flex-col flex-1"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-58 object-contain mb-3 rounded"
                      />
                      <h4 className="font-semibold text-gray-800 mb-1">{p.name}</h4>
                    </Link>

                    <p className="text-gray-600 text-sm mb-2">{p.desc}</p>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-navy text-lg">
                        ₦{p.price}/pack
                      </span>
                      <span className="text-navy text-lg font-semibold">MOQ-50</span>
                    </div>
                    <div className="flex mb-3">{renderStars(4)}</div>
                    <button
                      onClick={() => addToCart(p)}
                      className="bg-primary text-navy font-semibold px-4 py-2 rounded flex items-center justify-center gap-2 mt-auto hover:bg-primary/90"
                    >
                      <ShoppingCart size={16} /> Add to Cart
                    </button>
                  </div>
                ))}
            </div>
          </section>
        </div>

        {/* Sidebar Component */}
        <div className="lg:col-span-1 space-y-6">
          
                  <CartSidebar />
          <SidebarInfo />
        </div>
      </section>
    </div>
    <Footer />
   </>
  );
}
