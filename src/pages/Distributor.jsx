import { useState } from "react";
import { Heart, Share2, Star, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

import Dangote from "../assets/Distributors/dangote.png";
import Nestle from "../assets/Distributors/nestle.png";
import Unilever from "../assets/Distributors/unilever.png";
import Fmn from "../assets/Distributors/fmn.svg";
import Uac from "../assets/Distributors/uacfood.svg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Distributor static data
const distributors = [
  { 
    id: "dangote",
    title: "Dangote Group", 
    desc: "Diversified African conglomerate...", 
    image: Dangote, 
    rating: 4.5, 
    badges: ["Hot", "-15%"] 
  },
  { 
    id: "unilever",
    title: "Unilever Plc", 
    desc: "Global consumer goods company...", 
    image: Unilever, 
    rating: 4,
    badges: ["-10%"] 
  },
  { 
    id: "nestle",
    title: "Nestle Plc", 
    desc: "Leading nutrition, health, and wellness...", 
    image: Nestle, 
    rating: 5,
    badges: ["30%"] 
  },
  { 
    id: "cadbury",
    title: "Cadbury", 
    desc: "Iconic confectionery brand...", 
    image: Fmn, 
    rating: 3.5,
    badges: ["Hot"] 
  },
  { 
    id: "uac",
    title: "UAC Foods", 
    desc: "Trusted Nigerian food processing company...", 
    image: Uac, 
    rating: 4,
    badges: ["Hot", "-20%"] 
  },
];

// Helper: Render stars
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

export default function DistributorPage() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(""); // committed search query
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;

  const filtered = distributors.filter((d) =>
    d.title.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const currentItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = () => {
    setQuery(search);
    setCurrentPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <>
      <Navbar />
      <section className="bg-[#f5f5f5] pt-20 pb-10 min-h-screen">
        {/* Hero with Search */}
        <div className="text-center py-16 bg-navy text-white">
          <h1 className="text-3xl sm:text-4xl font-bold">Distributor Companies</h1>
          <p className="mt-3 max-w-2xl mx-auto text-gray-200">
            At Sparkborders, we bridge the gap between major distributor companies like Unilever, Nestlé, Cadbury, and Dangote Group and local wholesalers
          </p>

          <div className="mt-6 max-w-xl mx-auto px-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search distributors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 p-3 rounded-lg bg-white text-custom-black placeholder-[#D0D5DD] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition duration-200 flex items-center gap-2 shadow-sm"
              >
                <Search size={18} className="text-navy" />
                <span className="text-navy">Search</span>
              </button>
              <button
                onClick={() => console.log("Filter clicked")}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200 flex items-center gap-2 shadow-sm"
              >
                <Filter size={18} className="text-gray-600" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto pt-20 px-4 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentItems.map((item, index) => (
            <Link key={index} to={`/distributors/${item.id}`}>
              <div className="bg-white rounded-2xl p-5 mb-6 shadow-md relative group h-[496px] flex flex-col transition-all hover:shadow-xl hover:scale-[1.02] duration-300">
                {/* Top Left Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  {item.badges.map((badge, i) => (
                    <button
                      key={i}
                      className={`text-xs px-3 py-1 rounded-full font-semibold shadow-sm transition duration-200 cursor-pointer
                        ${
                          badge.includes("%")
                            ? "bg-navy text-white hover:bg-yellow-600"
                            : "bg-primary text-white hover:bg-green-700"
                        }`}
                    >
                      {badge}
                    </button>
                  ))}
                </div>

                {/* Top Right Icons */}
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <button className="bg-white p-1.5 rounded-full shadow-sm hover:bg-gray-100">
                    <Share2 className="w-4 h-4 text-navy" />
                  </button>
                  <button className="bg-white p-1.5 rounded-full shadow-sm hover:bg-gray-100">
                    <Heart className="w-4 h-4 text-navy" />
                  </button>
                </div>

                {/* Centered Image */}
                <div className="flex-grow flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[174px] w-full object-contain rounded-t-2xl"
                  />
                </div>

                {/* Title + Desc */}
                <h4 className="text-[14px] font-semibold text-gray-800 mb-1">{item.title}</h4>
                <p className="text-[16px] text-gray-600 mb-3 leading-relaxed line-clamp-3">{item.desc}</p>

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {renderStars(item.rating)}
                </div>

                {/* CTA Button */}
                <div className="mt-auto text-sm text-navy font-semibold flex items-center gap-1 hover:underline">
                  Learn More →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-10">
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
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1 ? "bg-navy text-white" : "bg-gray-200"
              }`}
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
      </section>

      <Footer/>
    </>
  );
}
