import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";


import Dangote from "../Assets/dangote.png";
import Nestle from "../Assets/nestle.png";
import Unilever from "../Assets/unilever.png";
import Fmn from '../Assets/Partners/fmn.svg';
import Uac from '../Assets/Partners/uacfood.svg';
import { Heart, Share2, Star } from "lucide-react";

// Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };


const data = [
  {
    title: "Dangote Group",
    desc: "Diversified African conglomerate in cement, agriculture, energy, logistics, manufacturing, trading.",
    image: Dangote,
    rating: 4.5,
  },
  {
    title: "Unilever Plc",
    desc: "Global consumer goods company producing food, beauty, and hygiene products.",
    image: Unilever,
    rating: 4,
  },
  {
    title: "Nestle Plc",
    desc: "Leading nutrition, health, and wellness company with trusted food brands.",
    image: Nestle,
    rating: 5,
  },
  {
    title: "Cadbury",
    desc: "Iconic confectionery brand known for chocolates, beverages, and sweet treats.",
    image: Fmn,
    rating: 3.5,
  },
  {
    title: "Cadbury",
    desc: "Iconic confectionery brand known for chocolates, beverages, and sweet treats.",
    image: Uac,
    rating: 3.5,
  },
  
];

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />);
  }

  if (halfStar) {
    stars.push(
      <Star key="half" className="w-4 h-4 text-yellow-500 fill-yellow-500 opacity-50" />
    );
  }

  while (stars.length < 5) {
    stars.push(<Star key={`empty-${stars.length}`} className="w-4 h-4 text-gray-300" />);
  }

  return stars;
};

const SliderDistributor = () => {
  return (
    <section className="bg-[#f5f5f5] pb-28 px-4 relative">

      {/* Distributor Companies Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true }}
        className="bg-[#f5f5f5] pt-20 px-4"
      >
        <div className="max-w-6xl w-full mx-auto">
          <motion.div className="mb-16">
            <motion.h3
              variants={fadeUp}
              className="text-xl sm:text-2xl font-bold text-gray-800 mb-4"
            >
              Distributor Companies
            </motion.h3>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="text-gray-600 text-base leading-relaxed"
            >
              At Sparkborders, we bridge the gap between major distributor
              companies like Unilever, Nestlé, Cadbury, and Dangote Group and
              local wholesalers. By streamlining access to trusted products and
              simplifying the ordering process, we help wholesalers connect
              directly with top suppliers, ensuring faster delivery, better
              pricing, and a more efficient supply chain. Our platform empowers
              businesses to grow through seamless B2B trade.
            </motion.p>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-stretch gap-10 sm:gap-16">
            {/* Add columns content here */}
          </div>
        </div>
      </motion.section>



      <div className="max-w-7xl mx-auto">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 3500 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-2xl p-5 mb-6 shadow-md relative group h-[496px] flex flex-col transition-all hover:shadow-xl hover:scale-[1.02] duration-300">
               {/* Top Left Badges */}
<div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
  <button className="bg-navy text-white text-xs px-3 py-1 rounded-full font-semibold hover:bg-yellow-600 transition duration-200 cursor-pointer shadow-sm">
    -15%
  </button>

  {index === 0 &&  (
    <button className="bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold hover:bg-green-700 transition duration-200 cursor-pointer shadow-sm">
      Hot
    </button>
  )}
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

                {/* Title and Description */}
                <h4 className="text-[14px] font-semibold text-gray-800 mb-1">{item.title}</h4>
                <p className="text-[16px] text-gray-600 mb-3 leading-relaxed">{item.desc}</p>

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {renderStars(item.rating)}
                </div>

                {/* CTA Button */}
                <button className="mt-auto text-sm text-navy font-semibold hover:underline flex items-center gap-1">
                  Learn More →
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      {/* Navigation Arrows (shown only on mobile)
<div className="flex justify-center gap-4 mt-8 sm:hidden">
  <button className="swiper-button-prev bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center">
    <ChevronLeft className="w-5 h-5 text-gray-700" />
  </button>
  <button className="swiper-button-next bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center">
    <ChevronRight className="w-5 h-5 text-gray-700" />
  </button>
</div> */}

      </div>
    </section>
  );
};

export default SliderDistributor;
