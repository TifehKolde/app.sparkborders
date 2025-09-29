// src/pages/ManufacturerDetails.jsx
import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { Share2, Star } from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";
import CartSidebar from "../components/CartSidebar";
import ProductsGrid from "../components/ProductsGrid";
import { CartContext } from "../context/CartContext";

// Import assets
import DangoteManu from "../assets/Manufacturers/dangote.png";
import NestleManu from "../assets/Manufacturers/nestle.png";
import ThumbManu from "../assets/Manufacturers/thumbnail.webp";
import ProductImg from "../assets/products/chivita.png";
import Footer from "../components/Footer";

// Manufacturer data
const manufacturers = [
  { id: "dangote-manu", title: "Dangote Manufacturing", desc: "Leading industrial manufacturer in Africa...", image: DangoteManu, rating: 4.5 },
  { id: "nestle-manu", title: "Nestle Manufacturing", desc: "High-quality food and beverage production...", image: NestleManu, rating: 5 },
  // add more manufacturers here
];

// Products data
const products = [
  { id: 1, manufacturerId: "dangote-manu", name: " Fruit juice", desc: "Short description of product 1...", price: 5000, image: ProductImg },
  { id: 2, manufacturerId: "dangote-manu", name: "Product 2", desc: "Short description of product 2", price: 3500, image: ProductImg },
  { id: 3, manufacturerId: "nestle-manu", name: "Product 3", desc: "Short description of product 3", price: 4200, image: ProductImg },
];

// Render stars helper
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

export default function ManufacturerDetails() {
  const { id } = useParams();
  const manufacturer = manufacturers.find((m) => m.id === id);
  const { addToCart } = useContext(CartContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (!manufacturer) return <p className="pt-20 text-center">Manufacturer not found.</p>;

  // Filter products for this manufacturer
  const manufacturerProducts = products.filter((p) => p.manufacturerId === id);

  const totalPages = Math.ceil(manufacturerProducts.length / itemsPerPage);
  const currentProducts = manufacturerProducts.slice(
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
        style={{ backgroundImage: `url(${ThumbManu})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative max-w-7xl mx-auto px-6 flex items-center h-full">
          <div className="text-left text-white max-w-xl">
          <Breadcrumb
  items={[
    { label: "Home", to: "/" },
    { label: "Manufacturers", to: "/manufacturers" },
    { label: manufacturer.title },
  ]}
/>

            <h1 className="text-4xl md:text-5xl font-bold">{manufacturer.title}</h1>
            <p className="mt-4 text-lg md:text-xl">{manufacturer.desc}</p>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="px-6 max-w-7xl mx-auto py-12 flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">About {manufacturer.title}</h2>
          <p className="mb-4 text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
          </p>

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-gray-700 mb-8 hover:bg-gray-100">
            Share <Share2 size={16} />
          </button>

          {/* Products */}
          <ProductsGrid 
  products={currentProducts.map(p => ({
    ...p,
    manufacturerName: manufacturer.title,   // ✅ attach name
    manufacturerId: manufacturer.id         // ✅ ensure id is consistent
  }))} 
  addToCart={addToCart} 
/>

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
