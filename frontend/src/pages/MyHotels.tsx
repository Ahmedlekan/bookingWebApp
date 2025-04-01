import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import * as apiClient from "../api-client"
import { BsBuilding, BsMap, BsPlusCircle } from "react-icons/bs";
import { BiMoney, BiStar } from "react-icons/bi";
import { FiEdit2 } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa';
import Skeleton from '../components/Skeleton';

const MyHotels = () => {

    const {data: hotelData, isLoading} = useQuery({
        queryKey: ["fetchMyHotels"],
        queryFn: apiClient.fetchMyHotel
    })

    if (isLoading) {
        return (
            <div className="space-y-8">
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-48 w-full rounded-xl" />
                ))}
            </div>
        );
    }

    if (!hotelData || hotelData.length === 0) {
        return (
            <div className="flex flex-col items-center
                justify-center py-12 text-center">
                <BsBuilding className="text-5xl text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold text-gray-700 mb-2 font-display">
                    No Hotels Found
                </h2>
                <p className="text-gray-500 mb-6 max-w-md font-body">
                    You haven't added any hotels yet. Get started by adding your first property!
                </p>
                <Link
                    to="/add-hotel"
                    className="flex items-center gap-2 bg-lime-600 hover:bg-lime-700 
                    text-white font-medium py-2 px-6 rounded-lg transition-colors font-body"
                >
                    <BsPlusCircle className="text-lg" />
                    Add Your First Hotel
                </Link>
            </div>
        );
    }


  return (
    <div className="space-y-8 py-8 px-4 sm:px-6 lg:px-8
        max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between
            items-start sm:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 font-display">
                    My Properties
                </h1>
                <p className="text-gray-600 mt-1 font-body">
                    {hotelData.length} {hotelData.length === 1 ? "property" : "properties"} listed
                </p>
            </div>
            <Link
                to="/add-hotel"
                className="flex items-center gap-2 bg-lime-600 
                    hover:bg-lime-700 text-white font-medium 
                        py-2 px-6 rounded-lg transition-colors font-body"
            >
                <BsPlusCircle className="text-lg" />
                Add New Property
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2
            lg:grid-cols-3 gap-6">
            {hotelData.map((hotel) => (
                <div
                    key={hotel._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden
                        border border-gray-100 hover:shadow-lg transition-shadow"
                >
                    <div className="h-48 bg-gray-200 overflow-hidden">
                        {hotel.imageUrls?.[0] ? (
                            <img
                                src={hotel.imageUrls[0]}
                                alt={hotel.name}
                                className="w-full h-full object-cover transition-transform
                                hover:scale-105 duration-300"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-r from-gray-200 
                                to-gray-300 flex items-center justify-center">
                                <BsBuilding className="text-4xl text-gray-400" />
                            </div>
                        )}
                    </div>

                    <div className="p-5 font-body">
                        <div className="flex justify-between items-start mb-3">
                            <h2 className="text-xl font-bold text-gray-900 truncate">
                                {hotel.name}
                            </h2>
                            <span className="flex items-center bg-lime-100 
                                text-lime-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                <BiStar className="mr-1" />
                                {hotel.starRating}
                            </span>
                        </div>

                        <p className="text-gray-600 mb-4 line-clamp-2">{hotel.description}</p>

                        <div className="space-y-3 mb-5">
                            <div className="flex items-center text-sm text-gray-700">
                                <BsMap className="mr-2 text-gray-500" />
                                <span>{hotel.city}, {hotel.province}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-700">
                                <BiMoney className="mr-2 text-gray-500" />
                                <span>${hotel.pricePerNight} <span className="text-gray-500">/night</span></span>
                            </div>
                            <div className="flex items-center text-sm text-gray-700">
                                <FaRegUser className="mr-2 text-gray-500" />
                                <span>{hotel.adultCount} adults • {hotel.childCount} children</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            <span className="inline-flex items-center bg-gray-100 
                                text-gray-800 text-xs px-3 py-1 rounded-full">
                                <BsBuilding className="mr-1" />
                                {hotel.type}
                            </span>
                            <Link
                                to={`/edit-hotel/${hotel._id}`}
                                className="flex items-center gap-1 text-lime-600 
                                    hover:text-lime-800 font-bold text-base"
                            >
                                <FiEdit2 />
                                Manage Property
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default MyHotels