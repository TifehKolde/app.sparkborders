// src/components/AuthCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Import your images
import Slide1 from "../assets/leftslider/img1.webp";
import Slide2 from "../assets/leftslider/img2.webp";
import Slide3 from "../assets/leftslider/img3.webp";

const carouselImages = [
  { src: Slide1, alt: "Slide 1" },
  { src: Slide2, alt: "Slide 2" },
  { src: Slide3, alt: "Slide 3" },
];

export default function AuthCarousel({ fullWidth = false }) {
    // Wrapper dynamically adapts
    const wrapperClass = fullWidth
    ? "flex w-full h-full items-center justify-center"
    : "hidden md:flex w-2/3 h-full bg-[#00008b] items-center justify-center";

  // Square carousel for modal or fullWidth
  const swiperClass = fullWidth
  ? "w-96 h-[32rem] md:w-[28rem] md:h-[36rem] relative" // increased height
  : "w-full max-w-md max-h-[80%] relative";



    return (
      <div className={wrapperClass}>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          pagination={{ clickable: true }}
          className={swiperClass}
        >
          {carouselImages.map((img, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center h-full">
              <img
                src={img.src}
                alt={img.alt}
                className="object-cover w-full h-full rounded"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
