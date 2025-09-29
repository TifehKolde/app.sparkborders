import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { Share2, Star } from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";
import CartSidebar from "../components/CartSidebar";
import ProductsGrid from "../components/ProductsGrid";
import { CartContext } from "../context/CartContext"; // ✅ import context

// Import assets
import Dangote from "../assets/Distributors/dangote.png";
import Nestle from "../assets/Distributors/nestle.png";
import Unilever from "../assets/Distributors/unilever.png";
import Fmn from "../assets/Distributors/fmn.svg";
import Uac from "../assets/Distributors/uacfood.svg";
import ProductImg from "../assets/products/chivita.png";
import Thumb from "../assets/Distributors/thumbnail.webp";
import Footer from "../components/Footer";

// ✅ Distributors data
const distributors = [
  { id: "dangote", title: "Dangote Group", desc: "Diversified African conglomerate...", image: Dangote, rating: 4.5 },
  { id: "unilever", title: "Unilever Plc", desc: "Global consumer goods company...", image: Unilever, rating: 4 },
  { id: "nestle", title: "Nestle Plc", desc: "Leading nutrition, health, and wellness...", image: Nestle, rating: 5 },
  { id: "cadbury", title: "Cadbury", desc: "Iconic confectionery brand...", image: Fmn, rating: 3.5 },
  { id: "uac", title: "UAC Foods", desc: "Trusted Nigerian food processing company...", image: Uac, rating: 4 },
];

// ✅ Products data
const products = [
  { id: 1, distributorId: "dangote", name: "Chivita Fruit juice", distributorName: "Dangote", desc: "Short description of product 1 how are you doing, hope you are very fine and shape, this is just a test oo let's go there bro let's go meh", price: 5000, image: ProductImg },
  { id: 2, distributorId: "dangote", name: "Product 2", distributorName: "Dangote", desc: "Short description of product 2", price: 3500, image: ProductImg },
  { id: 3, distributorId: "nestle", name: "Product 3", distributorName: "Nestle", desc: "Short description of product 3", price: 4200, image: ProductImg },
  { id: 4, distributorId: "uac", name: "Product 3", distributorName: "Uac", desc: "Short description of product 4", price: 2800, image: ProductImg },
];

// ✅ Render stars helper
const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />);
  }
  if (halfStar) {
    stars.push(<Star key="half" className="w-4 h-4 text-yellow-500 fill-yellow-500 opacity-50" />);
  }
  while (stars.length < 5) {
    stars.push(<Star key={`empty-${stars.length}`} className="w-4 h-4 text-gray-300" />);
  }
  return stars;
};

export default function DistributorDetails() {
  const { id } = useParams();
  const distributor = distributors.find((d) => d.id === id);

  const { addToCart } = useContext(CartContext); // ✅ use global cart
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (!distributor) return <p className="pt-20 text-center">Distributor not found.</p>;

  // Filter products
  const distributorProducts = products.filter((p) => p.distributorId === id);

  const totalPages = Math.ceil(distributorProducts.length / itemsPerPage);
  const currentProducts = distributorProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
    <div className="bg-[#f5f5f5]">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative h-[500px] md:h-[600px] bg-gray-800"
        style={{ backgroundImage: `url(${Thumb})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative max-w-7xl mx-auto px-6 flex items-center h-full">
          <div className="text-left text-white max-w-xl">
            <Breadcrumb
  items={[
    { label: "Home", to: "/" },
    { label: "Distributors", to: "/distributors" },
    { label: distributor.title },
  ]}
/>

            <h1 className="text-4xl md:text-5xl font-bold">{distributor.title}</h1>
            <p className="mt-4 text-lg md:text-xl">{distributor.desc}</p>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="px-6 max-w-7xl mx-auto py-12 flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">About {distributor.title}</h2>
          <p className="mb-4 text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
          </p>

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-gray-700 mb-8 hover:bg-gray-100">
            Share <Share2 size={16} />
          </button>

          {/* Products */}
          <ProductsGrid products={currentProducts} addToCart={addToCart} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-3 py-1 rounded ${currentPage === idx + 1 ? "bg-navy text-white" : "bg-gray-200"}`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <CartSidebar />
      </section>
    </div>

    <Footer/>
    </>
  );
}
