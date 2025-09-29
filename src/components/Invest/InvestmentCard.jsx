import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users, Wallet, } from "lucide-react"; // icons
import Nestle from "../../assets/chivita.svg";
import { Link } from "react-router-dom";
// Pick a set of background colors for tags
const tagColors = [
  "bg-blue-100 text-blue-800",
  "bg-green-100 text-green-800",
  "bg-yellow-100 text-yellow-800",
  "bg-purple-100 text-purple-800",
  "bg-pink-100 text-pink-800",
  "bg-indigo-100 text-indigo-800",
];

// Sample products (manual for now)
const products = [
  {
    id: 1,
    logo: Nestle,
    tags: ["Real Estate"],
    title: "CORPORATE DEBT NOTES SERIES XLVII",
    roi: "20% per annum",
    investors: 540,
    price: "₦50,000",
  },
  {
    id: 2,
    logo: Nestle,
    tags: ["Real Estate", "Luxury"],
    title: "Rice Farming Project",
    roi: "18% per annum",
    investors: 320,
    price: "₦5,000",
  },
  {
    id: 3,
    logo: Nestle,
    tags: ["Technology"],
    title: "Solar Energy Expansion",
    roi: "22% per annum",
    investors: 410,
    price: "₦10,000",
  },
  {
    id: 4,
    logo: Nestle,
    tags: ["Manufacturing"],
    title: "Nestle Distribution Investment",
    roi: "15% per annum",
    investors: 280,
    price: "₦25,000",
  },
  {
    id: 5,
    logo: Nestle,
    tags: ["Real Estate"],
    title: "Luxury Duplex Development",
    roi: "19% per annum",
    investors: 600,
    price: "₦100,000",
  },
];

export default function InvestmentProducts() {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <section className="pb-16 px-6 bg-[#F8FDFF]">
     

      {/* Header Row */}
      <motion.div
        className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Tabs */}
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === "all"
                ? "bg-navy text-white"
                : "bg-white text-navy shadow"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("featured")}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === "featured"
                ? "bg-navy text-white"
                : "bg-white text-navy shadow"
            }`}
          >
            Featured
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full bg-white md:w-72">
          <input
            type="text"
            placeholder="Search investments..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </motion.div>

      {/* Product Cards */}
    


<motion.div
  className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  variants={{
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15 },
    },
  }}
>
  {paginatedProducts.map((item) => (
    <motion.div
      key={item.id}
      className="p-4 flex flex-col transition h-full "
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo */}
      <div className="h-28 bg-white flex shadow items-center justify-center rounded-lg mb-4">
        <img
          src={item.logo}
          alt={item.title}
          className="h-28 object-contain"
        />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {item.tags.map((tag, idx) => (
          <span
            key={idx}
            className={`w-fit inline-block text-xs font-medium px-3 py-1 rounded-full ${
              tagColors[(item.id + idx) % tagColors.length]
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-black mb-2">{item.title}</h3>

      {/* ROI */}
      <p className="text-lg font-semibold text-[#F04438] mb-2">
        ROI: {item.roi}
      </p>

      {/* Investors */}
      <div className="flex items-center text-gray-500 text-sm mb-2">
        <Users className="h-4 w-4 mr-1" />
        {item.investors} investors
      </div>

      {/* Price */}
      <p className="text-sm mb-4">
        <span className="font-bold text-navy">{item.price}</span>{" "}
        <span className="text-gray-600">per unit</span>
      </p>

      {/* Button → Link */}
      <Link
  to={`/investment/${item.id}-${item.title
    .toLowerCase()
    .replace(/\s+/g, "-")}`} // convert title into slug
  className="mt-auto flex font-semibold items-center justify-center bg-primary text-navy py-2 rounded-lg hover:bg-navy hover:text-white transition"
>
  Invest Now
  <Wallet className="ml-2 h-5 w-5" />
</Link>
    </motion.div>
  ))}
</motion.div>

      {/* Pagination */}
      <motion.div
        className="flex justify-center items-center gap-2 mt-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-lg disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-lg ${
              currentPage === i + 1
                ? "bg-navy text-white"
                : "bg-white border text-navy"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </motion.div>
    </section>
  );
}
