import { useParams } from "react-router-dom";
import { Users, Share2, CheckCircle, Wallet } from "lucide-react";
import Nestle from "../assets/chivita.svg"; // sample logo
import Thumb from "../assets/Distributors/thumbnail.webp";
import Breadcrumb from "../components/Breadcrumb";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InvestmentProducts from "../components/Invest/InvestmentCard";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    logo: Nestle,
    cover: Thumb,
    tags: ["Real Estate"],
    productName: "Corporate Investment",
    title: "CORPORATE DEBT NOTES SERIES XLVII",
    roi: "20% per annum",
    investors: 540,
    price: "₦50,000",
    verified: true,
    description:
      "The MFB Annual Conference stands as a significant camp event designed to foster a deeper understanding and appreciation of Islam among attendees. Tailored for Muslims seeking enlightenment and knowledge about their faith, this conference serves as a platform for learning, spiritual growth, and community engagement.",
  },
  {
    id: 2,
    logo: Nestle,
    cover: "https://via.placeholder.com/1200x300",
    tags: ["Agriculture", "Luxury"],
    productName: "Rice Farming",
    title: "Rice Farming Project",
    roi: "18% per annum",
    investors: 320,
    price: "₦5,000",
    verified: false,
    description:
      "Support local rice farming with consistent ROI. A perfect opportunity for sustainable agriculture investors.",
  },
];

export default function InvestmentDetails() {
  const { idSlug } = useParams();
  const [id] = idSlug.split("-");
  const investment = products.find((p) => p.id === parseInt(id));

  if (!investment) return <p className="text-center py-20">Investment not found.</p>;

  return (
    <>
  <div className="bg-[#F8FDFF]">
  <Navbar />

  {/* Hero / Breadcrumb */}
  <section className="text-center pb-16 pt-34 bg-navy text-white">
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Investments", to: "/investments" },
          { label: investment.title },
        ]}
      />
    </div>
  </section>

{/* Cover + Profile + Titles */}
<div className="bg-white max-w-7xl mx-auto rounded shadow mb-8">
  <div className="max-w-7xl mx-auto px-6 mt-18 relative">
    <img
      src={investment.cover}
      alt={investment.title}
      className="w-full h-[220px] sm:h-[280px] md:h-[320px] object-cover"
    />

    {/* Profile + Product & Title */}
    <div className="
      absolute -bottom-20
      flex flex-col items-center w-full
      md:flex-row md:items-end md:gap-4 md:w-auto md:left-10
    ">
      {/* Profile Logo */}
      <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-white shadow flex items-center justify-center relative">
        <img
          src={investment.logo}
          alt={investment.title}
          className="h-16 sm:h-20 object-contain"
        />
        {investment.verified && (
          <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-[2px] shadow-md">
            <CheckCircle className="h-5 w-5 text-blue-500" />
          </span>
        )}
      </div>

      {/* Titles */}
      <div className="flex flex-col justify-center text-center md:text-left mt-4 md:mt-0">
        <p className="text-lg font-bold text-black">{investment.productName}</p>
        <h2 className="text-base font-medium text-gray-700">{investment.title}</h2>
      </div>
    </div>
  </div>
</div>


  {/* Buttons directly under cover (right aligned on desktop) */}
  <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-center sm:justify-end gap-3 md:mt-4 mt-28 mb-6">
    <button className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition w-full sm:w-auto">
      <Share2 className="h-4 w-4" /> Share
    </button>
    <button className="flex items-center justify-center gap-2 bg-primary text-navy px-5 py-2 rounded-lg font-semibold hover:bg-navy hover:text-white transition w-full sm:w-auto">
      <Wallet className="h-4 w-4" /> Invest Now
    </button>
  </div>

  {/* Info Section */}
<div className="max-w-7xl mx-auto px-6 pb-10 flex flex-col gap-6">
  {/* About (always full width) */}
  <div className="w-full">
    <h3 className="text-lg font-semibold text-black mb-2">About</h3>
    <p className="text-gray-600">{investment.description}</p>
  </div>

  {/* Tags + Stats together */}
  <div className="w-full flex flex-col md:flex-row md:items-center md:gap-8 gap-4">
    {/* Tags */}
    <div className="flex flex-wrap items-center gap-2">
      {investment.tags.map((tag, idx) => (
        <span
          key={idx}
          className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
        >
          {tag}
        </span>
      ))}
    </div>

    {/* Stats */}
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-1 font-semibold text-[#F04438]">
        ROI: {investment.roi}
      </div>
      <div className="flex items-center gap-1 font-semibold">
        <Users className="h-4 w-4" /> Investors: {investment.investors}
      </div>
      <div className="font-semibold text-navy">
        Price: {investment.price}{" "}
        <span className="text-gray-500">per unit</span>
      </div>
    </div>
  </div>
</div>


</div>

<div className="max-w-7xl bg-[#F8FDFF] mx-auto text-center pt-16 mb-12">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-black mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Recent Opportunities on Invest
        </motion.h2>
        <motion.p
          className="max-w-2xl mx-auto text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
        We’re not just here for today—we help you lay the foundation for long-term success. 
        Your investment with Sparkinvest is a step toward sustainable growth and future rewards.
        </motion.p>
      </div>

  <InvestmentProducts />
  <Footer />


    </>
  );
}
