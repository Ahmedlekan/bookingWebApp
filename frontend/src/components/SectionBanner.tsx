import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import banner1 from "../assets/banner-1.jpg"
import banner2 from "../assets/banner-2.jpg"
import banner3 from "../assets/banner-3.jpg"


const backgroundImages = [
  banner1,
  banner2,
  banner3,
];

export default function SectionBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cycle through images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden ">
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={backgroundImages[currentIndex]}
            alt="hero bg"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex bg-black/30 z-0
        items-center justify-start px-8 md:px-10">
        <div className="bg-lime-500/80 text-white
          p-8 md:p-12 max-w-md rounded shadow-md">
          <h1 className="text-3xl md:text-4xl
          font-semibold mb-4 leading-tight font-display">
            Discover Our <br /> Finest Selection
          </h1>
          <p className="uppercase text-sm tracking-wide
            mb-6 font-semibold font-body">
            Choose from different listing templates and lay them out as lists
            or grids, full-width or boxed
          </p>
          <button className="border border-white
            text-white px-4 py-2 rounded hover:bg-white 
            hover:text-lime-500 transition font-body">
            Discover
          </button>
        </div>
      </div>

    </div>
  );
}