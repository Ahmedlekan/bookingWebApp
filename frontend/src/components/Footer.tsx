import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaLinkedinIn,
  FaInstagram,FaPinterestP,FaYelp, FaYoutube } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";


export default function Footer() {

  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  return (
    <footer className="bg-black text-white px-6 py-12 font-body">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Logo and description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-white text-3xl">📍</span> Diplo
          </div>
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis
            et sem sed sollicitudin. Donec non odio neque. Aliquam hendrerit
            sollicitudin purus, quis rutrum mi accumsan nec.
          </p>
        </motion.div>

        {/* Discover links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-4">Discover</h3>
          <ul className="space-y-2 text-gray-300">
            {['Toronto Ontario', 'Montreal Quebec', 'Edmilton Alberta', 'Vancouver'].map((city) => (
              <li key={city} className="flex items-center gap-2 hover:text-white
                cursor-pointer"
              >
                <span>&#8250;</span> {city}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Lifestyle links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-xl font-semibold mb-4">Lifestyle</h3>
          <ul className="space-y-2 text-gray-300">
            {['Apartment', 'Single Family Home', 'Villa', 'Loft'].map((type) => (
              <li key={type} className="flex items-center gap-2 
                hover:text-white cursor-pointer">
                <span>&#8250;</span> {type}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="mt-12 border-t border-gray-700 pt-6 flex
        flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-400">© Houzez - All rights reserved</p>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <FaFacebookF className="cursor-pointer hover:text-white" />
          <FaTwitter className="cursor-pointer hover:text-white" />
          <FaGooglePlusG className="cursor-pointer hover:text-white" />
          <FaLinkedinIn className="cursor-pointer hover:text-white" />
          <FaInstagram className="cursor-pointer hover:text-white" />
          <FaPinterestP className="cursor-pointer hover:text-white" />
          <FaYelp className="cursor-pointer hover:text-white" />
          <FaYoutube className="cursor-pointer hover:text-white" />
        </div>

        {/* Back to top button - Only visible when scrolled down */}
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 bg-lime-500 hover:bg-lime-600 
              text-white p-3 rounded-lg shadow-lg z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowUp />
          </motion.button>
        )}
        
      </div>
    </footer>
  );
}