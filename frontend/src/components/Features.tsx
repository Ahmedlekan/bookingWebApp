import { useState } from 'react';
import ListingCard from '../components/ListingCard'

import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";

const Features = () => {

  const [visibleCount, setVisibleCount] = useState(6);

  const { data: hotels, isLoading, isError } = useQuery({
    queryKey: ["fetchQuery"],
    queryFn: () => apiClient.fetchHotels(),
  });

   // Show only the currently visible listings
   const visibleListings = hotels?.slice(0, visibleCount) || [];

   const loadMore = () => {
     // Increase by 3 each time, but don't exceed total hotels length
     setVisibleCount(prev => Math.min(prev + 3, hotels?.length || prev + 3));
   };

  if (isLoading) {
    return <div className="text-center py-10 text-gray-500">
      Loading listings...</div>;
  }

  if (isError || !hotels) {
    return <div className="text-center py-10 text-red-500">
      Failed to load listings.</div>;
  }

  return (
    <section className="min-h-screen px-6 py-20">
      <h2 className="text-3xl md:text-5xl font-display
          font-bold text-center mb-6">
          Our Featured Exclusives
      </h2>
      <p className="text-center text-lg text-gray-600 mb-12 font-display">
        Choose from different listing properties
        Start your year with a sense of adventure, saving
        15% or more with Early 2025 Deals.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {visibleListings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>

      {hotels.length > visibleCount && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="bg-lime-500 hover:bg-lime-600 
              text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Show More
          </button>
        </div>
      )}
    </section>
  )
}

export default Features