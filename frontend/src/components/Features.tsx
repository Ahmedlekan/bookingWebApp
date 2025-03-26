import ListingCard from '../components/ListingCard'

import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";

const Features = () => {

  const { data: hotels, isLoading, isError } = useQuery({
    queryKey: ["fetchQuery"],
    queryFn: () => apiClient.fetchHotels(),
  });

  const listings = hotels?.slice(0, 6) || []

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
        Our Featured Exclusives</h2>
    <p className="text-center text-lg text-gray-600 mb-12 font-display">
        Choose from different listing templates and
        lay them out as lists or grids, full-width or boxed
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2
        lg:grid-cols-3 gap-8 justify-items-center">
        {listings.map((listing) => (
        <ListingCard key={listing.userId} listing={listing} />
        ))}
    </div>

</section>
  )
}

export default Features