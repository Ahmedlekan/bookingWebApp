import { HotelType } from "../../../backend/src/shared/types";
import { FaMapMarkerAlt, FaCalendarAlt, FaMoon, FaUserFriends } from "react-icons/fa";

type BookingDetailsSummaryProps = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  childCount,
  adultCount,
  numberOfNights,
  hotel,
}: BookingDetailsSummaryProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 h-fit">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">Your Booking Details</h2>
      
      <div className="space-y-5">
        {/* Location */}
        <div className="flex items-start gap-3 font-body">
          <FaMapMarkerAlt className="text-lime-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-base font-medium text-gray-500">Location</h3>
            <p className="text-lg font-semibold text-gray-900">
              {hotel.name}, {hotel.city}, {hotel.country}
            </p>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-3 font-body">
            <FaCalendarAlt className="text-lime-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-base font-medium text-gray-500">Check-in</h3>
              <p className="font-semibold text-gray-900">
                {checkIn.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 font-body">
            <FaCalendarAlt className="text-lime-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-base font-medium text-gray-500">Check-out</h3>
              <p className="font-semibold text-gray-900">
                {checkOut.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Stay Duration */}
        <div className="flex items-start gap-3 font-body">
          <FaMoon className="text-lime-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-base font-medium text-gray-500">Total length of stay</h3>
            <p className="font-semibold text-gray-900">
              {numberOfNights} night{numberOfNights > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Guests */}
        <div className="flex items-start gap-3">
          <FaUserFriends className="text-lime-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-base font-medium text-gray-500">Guests</h3>
            <p className="font-semibold text-gray-900">
              {adultCount} adult{adultCount > 1 ? "s" : ""}
              {childCount > 0 && `, ${childCount} child${childCount > 1 ? "ren" : ""}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;