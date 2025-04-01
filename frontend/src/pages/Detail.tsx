import * as apiClient from "../api-client"
import { useQuery } from '@tanstack/react-query'
import { AiFillStar } from "react-icons/ai";
import { useParams } from 'react-router-dom';
import GuestInfoForm from "../forms/guestInfoForm/GuestInfoForm";
import { FaCheckCircle, FaWifi, FaSwimmingPool, FaParking,
    FaUtensils, FaTv, FaSnowflake, FaDumbbell } from "react-icons/fa";
import { IoIosFitness } from "react-icons/io";
import { MdFamilyRestroom, MdPets, MdAcUnit } from "react-icons/md";
import { GiElevator } from "react-icons/gi";
import { useState } from "react";

const facilityIcons: Record<string, JSX.Element> = {
  "Free WiFi": <FaWifi className="text-lime-500" />,
  "Swimming Pool": <FaSwimmingPool className="text-lime-400" />,
  "Parking": <FaParking className="text-gray-600" />,
  "Restaurant": <FaUtensils className="text-amber-600" />,
  "TV": <FaTv className="text-purple-500" />,
  "Air Conditioning": <MdAcUnit className="text-green-500" />,
  "Fitness Center": <IoIosFitness className="text-red-500" />,
  "Family Rooms": <MdFamilyRestroom className="text-pink-500" />,
  "Pet Friendly": <MdPets className="text-brown-500" />,
  "Elevator": <GiElevator className="text-gray-700" />,
  "Heating": <FaSnowflake className="text-lime-300" />,
  "Gym": <FaDumbbell className="text-amber-800" />
};

const Detail = () => {
  const { hotelId } = useParams();
  const [activeImage, setActiveImage] = useState(0);

  const { data: hotel } = useQuery({
    queryKey: ["fetchHotelById", hotelId],
    queryFn: () => apiClient.fetchHotelById(hotelId || ""),
    enabled: !!hotelId,
  });

  if (!hotel) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12
      border-t-2 border-b-2 border-lime-500"></div>
    </div>;
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header with Star Rating and Name */}
      <div className="mb-8">
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: hotel.starRating }).map((_, i) => (
            <AiFillStar key={i} className="text-yellow-400 w-5 h-5"/>
          ))}
          <span className="text-sm text-gray-500 ml-1 font-body">
            {hotel.starRating}-star hotel
        </span>
        </div>
        <h1 className="text-3xl md:text-4xl
            font-bold text-gray-900 font-display">
                {hotel.name}
        </h1>
        <div className="flex items-center mt-2">
          <svg className="w-4 h-4 text-gray-500"
            fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-600 ml-1 font-body">
            {hotel.city}, {hotel.province}
        </span>
        </div>
      </div>

      {/* Main Image Gallery */}
      <div className="relative mb-8 rounded-xl
        overflow-hidden bg-gray-100 h-96">
        <img
          src={hotel.imageUrls[activeImage]}
          alt={hotel.name}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        <div className="absolute bottom-4 left-0
            right-0 flex justify-center gap-2">
          {hotel.imageUrls.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`w-3 h-3 rounded-full ${activeImage === index ? 'bg-white' : 'bg-white/50'}`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>

      </div>

      {/* Property Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 font-body gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg
            shadow-sm border border-gray-100 text-center">
          <div className="text-2xl mb-1">🛏</div>
          <div className="font-medium">{hotel.bedrooms}</div>
          <div className="text-sm text-gray-500">Bedrooms</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm
            border border-gray-100 text-center">
          <div className="text-2xl mb-1">🛁</div>
          <div className="font-medium">{hotel.bathrooms}</div>
          <div className="text-sm text-gray-500">Bathrooms</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm
            border border-gray-100 text-center">
          <div className="text-2xl mb-1">🚗</div>
          <div className="font-medium">{hotel.garage}</div>
          <div className="text-sm text-gray-500">Parking</div>
        </div>
        <div className="bg-white p-4 rounded-lg
            shadow-sm border border-gray-100 text-center">
          <div className="text-2xl mb-1">📐</div>
          <div className="font-medium">1200</div>
          <div className="text-sm text-gray-500">Square meters</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-2/3">
          {/* Description */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">
                About this property
            </h2>
            <p className="text-gray-700 leading-relaxed
                whitespace-pre-line font-body">
                    {hotel.description}
            </p>
          </section>

          {/* Facilities */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold font-display text-gray-900 mb-4">
                Facilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {hotel.facilities.map((facility, index) => (
                <div key={index} className="flex items-center
                    gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg">
                    {facilityIcons[facility] || <FaCheckCircle className="text-green-500" />}
                  </div>
                  <span className="font-medium text-gray-700 font-body">{facility}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Image Gallery */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {hotel.imageUrls.map((src, index) => (
                <div key={index} className="group relative rounded-lg
                    overflow-hidden h-48">
                  <img
                    src={src}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform
                        duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Sticky Booking Form */}
        <div className="lg:w-1/3 font-body">
          <div className="sticky top-4">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-xl font-bold">${hotel.pricePerNight}</div>
                    <div className="text-sm text-gray-500">per night</div>
                  </div>
                  <div className="flex items-center">
                    <AiFillStar className="text-yellow-400 mr-1" />
                    <span>{hotel.starRating}</span>
                  </div>
                </div>
                <GuestInfoForm pricePerNight={hotel.pricePerNight} hotelId={hotel._id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail;