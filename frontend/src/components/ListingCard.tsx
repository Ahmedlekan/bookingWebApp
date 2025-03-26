import { motion } from 'framer-motion';
import { useState } from 'react';
import { HotelType } from '../../../backend/src/shared/types';
import { Link } from 'react-router-dom'

type Props = {
  listing: HotelType;
};

export default function ListingCard({ listing }: Props) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % listing.imageUrls.length);
  const prevImage = () =>
    setCurrentImage((prev) =>
      prev === 0 ? listing.imageUrls.length - 1 : prev - 1
    );

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-md
        overflow-hidden w-full max-w-md font-body"
    >
      <div className="relative h-64 overflow-hidden ">
        <Link to={`/detail/${listing._id}`}>
          <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
              <img
                src={listing.imageUrls[currentImage]}
                alt={listing.name}
                className="w-full h-full object-cover
                transition-all duration-500 "
              />
          </div>
        </Link>

        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform 
          -translate-y-1/2 bg-white/80 rounded-full p-1"
        >
          ◀
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform 
          -translate-y-1/2 bg-white/80 rounded-full p-1"
        >
            ▶
        </button>
      </div>

      <div className="p-4">
        <div className=' flex flex-col items-center gap-2'>
          <h3 className="text-xl md:text-2xl font-semibold font-display">
            {listing.name}
          </h3>
          <p className="text-gray-700 font-body text-lg">
            ${listing.pricePerNight}
          </p>
          <p className="text-lg text-gray-500 font-body">
            {listing.type}
          </p>
        </div>

        <div className="flex items-center justify-evenly
          mt-4 text-gray-600 text-lg font-body">
          <span>🛏 {listing.bedrooms}</span>
          <span>🛁 {listing.bathrooms}</span>
          <span>🚗 {listing.garage}</span>
          <span>📐 1200 m²</span>
        </div>
      </div>
    </motion.div>
  );
}