import * as apiClient from "../api-client";
import { useQuery } from "@tanstack/react-query";
import { FiCalendar, FiUsers, FiHome, FiMapPin, FiDollarSign } from "react-icons/fi";
import Skeleton from "../components/Skeleton";
import { format } from "date-fns";

const MyBookings = () => {
  const { data: hotels, isLoading } = useQuery({
    queryKey: ["fetchMyBookings"],
    queryFn: apiClient.fetchMyBookings,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 p-6">
              <Skeleton className="w-full h-64 lg:h-full" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <div className="space-y-3">
                  {[...Array(2)].map((_, j) => (
                    <div key={j} className="space-y-2">
                      <Skeleton className="h-5 w-1/3" />
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-5 w-2/3" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!hotels || hotels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FiHome className="text-5xl text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">No Bookings Found</h2>
        <p className="text-gray-500 mb-6 max-w-md">
          You haven't made any bookings yet. Start exploring properties to book your next stay!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 font-display">My Bookings</h1>
        <p className="text-gray-600 text-lg mt-1 font-body">
          {hotels.length} upcoming {hotels.length === 1 ? "stay" : "stays"}
        </p>
      </div>

      <div className="space-y-6">
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="bg-white rounded-xl shadow-sm border 
                border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] font-body gap-6">
              {/* Hotel Image */}
              <div className="relative h-64 lg:h-full">
                <img
                  src={hotel.imageUrls[0]}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t 
                    from-black/60 to-transparent p-4">
                  <div className="flex items-center text-white">
                    <FiMapPin className="mr-2" />
                    <span className="text-base font-medium">
                      {hotel.city}, {hotel.province}
                    </span>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-900">{hotel.name}</h2>
                  <div className="flex items-center text-gray-600 mt-1">
                    <FiDollarSign className="mr-1" />
                    <span className=" text-base">${hotel.pricePerNight} per night</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {hotel.bookings.map((booking, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-lime-500 pl-4 py-2 bg-lime-50/50"
                    >
                      <div className="flex items-start mb-2">
                        <FiCalendar className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-gray-700">Dates: </span>
                          <span className="text-gray-600">
                            {format(new Date(booking.checkIn), "MMM dd, yyyy")} -{" "}
                            {format(new Date(booking.checkOut), "MMM dd, yyyy")}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FiUsers className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-gray-700">Guests: </span>
                          <span className="text-gray-600">
                            {booking.adultCount} adult{booking.adultCount !== 1 ? "s" : ""}
                            {booking.childCount > 0 &&
                              `, ${booking.childCount} child${booking.childCount !== 1 ? "ren" : ""}`}
                          </span>
                        </div>
                      </div>
                      {booking.totalCost && (
                        <div className="flex items-start mt-1">
                          <FiDollarSign className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-700">Total: </span>
                            <span className="text-gray-600">
                              ${booking.totalCost.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;