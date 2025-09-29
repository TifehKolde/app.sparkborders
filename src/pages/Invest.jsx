import { motion } from "framer-motion";
import Invest from "../assets/invest.webp";
import Made from "../assets/madeinvest.webp";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import InvestmentProducts from "../components/Invest/InvestmentCard";

export default function InvestmentPage() {
  return (
    <>
      <Navbar />
      <div className="bg-[#F8FDFF]">
        {/* Hero Section */}
        <section className="bg-navy text-white pt-28 md:pt-20 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug">
                  SparkInvest
                </h1>
                <span className="bg-white text-navy px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  Up to 35% returns
                </span>
              </div>

              <p className="mt-4 text-base sm:text-lg text-gray-200">
                At Sparkborders, we see investment as dedicating our time,
                money, and energy into opportunities that help you grow, earn
                more, and reach your full potential. We work with you to ensure
                every step is a smart move toward long-term success and a more
                rewarding.
              </p>
            </motion.div>

            {/* Right Image */}
            <motion.div
              className="flex justify-center pt-8 md:justify-end"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full max-w-[450px]">
                <img
                  src={Invest}
                  alt="Investment growth"
                  className="w-full h-auto object-contain mt-8 md:mt-0"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Growth Section */}
        <section className="py-16 px-6 bg-[#F8FDFF] text-center overflow-hidden">
          <motion.h2
            className="text-4xl font-bold mb-3"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            You Invest in Growth with Us
          </motion.h2>

          <motion.p
            className="max-w-3xl mx-auto text-gray-600 mb-10 mt-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            When you choose Sparkinvest, you're investing your time, money, or
            energy into a platform built to support your growth. We provide the
            tools and systems that help you move forward with confidence.
          </motion.p>

          {/* 3 Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Investments Simplify",
                desc: "With minimum investments starting as low as N5,000, investment is no longer out of reach. Everyone is welcome.",
              },
              {
                title: "Invest confidently",
                desc: "We work with leading licensed investment houses such as ARM, AIICO and Stanbic.",
              },
              {
                title: "Diversify your portfolio",
                desc: "Invest in various industries such as fixed income instruments, agriculture, transportation, etc.",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="bg-white px-6 py-14 rounded-xl shadow-md hover:shadow-xl transition"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
              >
                <h3 className="font-semibold text-left text-3xl text-navy mb-2 max-w-[250px] leading-snug break-words">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-left">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Split Section */}
        <section className="py-0 bg-white overflow-hidden">
          <div className="grid md:grid-cols-[2fr_3fr] items-stretch">
            {/* Left Image */}
            <motion.div
              className="h-full"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <img
                src={Made}
                alt="Get started"
                className="w-full h-full object-cover rounded-r-none"
                loading="lazy"
              />
            </motion.div>

            {/* Right Content */}
            <motion.div
              className="flex flex-col text-white bg-navy justify-center p-10 md:p-16 rounded-l-none"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  We’ve made it easier for anyone to get started
                </h2>
                <p className="text-base md:text-lg mb-6 text-gray-200">
                  We’re not just here for today—we help you lay the foundation
                  for long-term success. Your investment with Sparkinvest is a
                  step toward sustainable growth and future rewards.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Investment Products */}
        <div className="max-w-7xl mx-auto text-center pt-16 mb-12">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-black mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          You Build a Future with Us
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
      </div>

      <Footer />
    </>
  );
}
