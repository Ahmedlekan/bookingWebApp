import {useState} from 'react'
import { useSearchContext } from '../contexts/SearchContext'
import { useQuery } from '@tanstack/react-query'
import * as apiClient from "../api-client"
import StarRatingFilter from '../components/StarRatingFilter'
import HotelTypesFilter from '../components/HotelTypesFilter'
import FacilitiesFilter from '../components/FacilitiesFilter'
import PriceFilter from '../components/PriceFilter'
import SearchResultsCard from '../components/SearchResultsCard'
import Pagination from '../components/Pagination'
import { XMarkIcon } from "@heroicons/react/24/outline";

const FilterTag = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
    <div className="inline-flex items-center bg-blue-50 text-blue-800
    rounded-full py-1.5 pl-3 pr-2 text-sm font-medium">
      {label}
      <button 
        type="button" 
        onClick={onRemove}
        className="ml-1 p-0.5 rounded-full hover:bg-blue-100 text-blue-600"
      >
        <XMarkIcon className="h-3 w-3" />
      </button>
    </div>
  );

const Search = () => {
  const search = useSearchContext()
  const [page, setPage] = useState<number>(1)
  const [selectedStars, setSelectedStars] = useState<string[]>([])
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState({
    stars: [] as string[],
    types: [] as string[],
    facilities: [] as string[],
    price: undefined as number | undefined
  });

  //taking what the user search into our searcHotels
  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption
  }

  const {data: hotelData} = useQuery({
    queryKey:["searchHotels", searchParams],
    queryFn: ()=> apiClient.searchHotels(searchParams),
  })

  // adding and removing the checked and unchecked stars
  // Update your filter change handlers to update activeFilters
const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
    setActiveFilters(prev => ({
      ...prev,
      stars: event.target.checked
        ? [...prev.stars, starRating]
        : prev.stars.filter(star => star !== starRating)
    }));
  };

  // adding and removing the type and unchecked type
  const hotelTypesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hotelType = event.target.value;
    setSelectedHotelTypes((prevTypes) =>
      event.target.checked
        ? [...prevTypes, hotelType]
        : prevTypes.filter((type) => type !== hotelType)
    );
    setActiveFilters(prev => ({
      ...prev,
      types: event.target.checked
        ? [...prev.types, hotelType]
        : prev.types.filter(type => type !== hotelType)
    }));
  };

  // adding and removing the facilities and unchecked facilities 
  const hotelFacilitiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hotelFacility = event.target.value;
    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, hotelFacility]
        : prevFacilities.filter((facility) => facility !== hotelFacility)
    );
    setActiveFilters(prev => ({
      ...prev,
      facilities: event.target.checked
        ? [...prev.facilities, hotelFacility]
        : prev.facilities.filter(facility => facility !== hotelFacility)
    }));
  };
  
  const handlePriceChange = (value?: number) => {
    setSelectedPrice(value);
    setActiveFilters(prev => ({...prev, price: value}));
  };

  
  // Function to remove a filter
const removeFilter = (type: keyof typeof activeFilters, value?: string | number) => {
    if (type === 'price') {
      setSelectedPrice(undefined);
      setActiveFilters(prev => ({...prev, price: undefined}));
      return;
    }
  
    const currentFilters = [...activeFilters[type]];
    const updatedFilters = value 
      ? currentFilters.filter(item => item !== value)
      : [];
    
    if (type === 'stars') {
      setSelectedStars(updatedFilters);
      setActiveFilters(prev => ({...prev, stars: updatedFilters}));
    } else if (type === 'types') {
      setSelectedHotelTypes(updatedFilters);
      setActiveFilters(prev => ({...prev, types: updatedFilters}));
    } else if (type === 'facilities') {
      setSelectedFacilities(updatedFilters);
      setActiveFilters(prev => ({...prev, facilities: updatedFilters}));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search Results Header */}
        <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-display">
            {search.destination ? `Hotels in ${search.destination}` : "All Hotels"}
            </h1>
            <p className="text-gray-600 mt-2 font-body">
            {hotelData?.pagination.total} properties found
            {search.destination ? ` in ${search.destination}` : ""}
            </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
            {/* Star Rating Filters */}
            {activeFilters.stars.map(star => (
                <FilterTag 
                key={`star-${star}`}
                label={`${star} Stars`}
                onRemove={() => removeFilter('stars', star)}
                />
            ))}
            
            {/* Hotel Type Filters */}
            {activeFilters.types.map(type => (
                <FilterTag 
                key={`type-${type}`}
                label={type}
                onRemove={() => removeFilter('types', type)}
                />
            ))}
            
            {/* Facility Filters */}
            {activeFilters.facilities.map(facility => (
                <FilterTag 
                key={`facility-${facility}`}
                label={facility}
                onRemove={() => removeFilter('facilities', facility)}
                />
            ))}
            
            {/* Price Filter */}
            {activeFilters.price && (
                <FilterTag 
                key={`price-${activeFilters.price}`}
                label={`Max $${activeFilters.price}`}
                onRemove={() => removeFilter('price')}
                />
            )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 font-body">
            {/* Filters Sidebar - Sticky */}
            <div className="lg:sticky lg:top-4 h-fit">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 pb-4 border-b border-gray-200">
                    Refine Your Search
                </h3>
                
                <div className="space-y-5">
                    <StarRatingFilter
                        selectedStars={selectedStars}
                        onChange={handleStarsChange}
                    />
                    
                    <div className="border-t border-gray-200 pt-5">
                    <HotelTypesFilter
                        selectedHotelTypes={selectedHotelTypes}
                        onChange={hotelTypesChange}
                    />
                    </div>
                    
                    <div className="border-t border-gray-200 pt-5">
                    <FacilitiesFilter
                        selectedFacilities={selectedFacilities}
                        onChange={hotelFacilitiesChange}
                    />
                    </div>
                    
                    <div className="border-t border-gray-200 pt-5">
                    <PriceFilter
                        selectedPrice={selectedPrice}
                        onChange={(value?: number) => setSelectedPrice(value)}
                    />
                    </div>
                </div>
                </div>
            </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col gap-6">
            {/* Sort Controls */}
            <div className="flex flex-col sm:flex-row justify-between
                items-start sm:items-center gap-4 bg-white p-4 rounded-lg
                shadow-sm border border-gray-200">
                <div className="text-sm text-gray-600">
                Showing {hotelData?.data.length} of {hotelData?.pagination.total} hotels
                </div>
                
                <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <select
                    className="py-2 pl-3 pr-8 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={sortOption}
                    onChange={(event) => setSortOption(event.target.value)}
                >
                    <option value="">Recommended</option>
                    <option value="starRating">Star Rating</option>
                    <option value="pricePerNightAsc">
                    Price (Low to High)
                    </option>
                    <option value="pricePerNightDesc">
                    Price (High to Low)
                    </option>
                </select>
                </div>
            </div>

            {/* Hotel Results */}
            <div className="space-y-6">
                {hotelData?.data.map((hotel) => (
                <SearchResultsCard key={hotel._id} hotel={hotel} />
                ))}
            </div>

            {/* Pagination */}
            {hotelData?.pagination.pages && hotelData.pagination.pages > 1 && (
                <div className="mt-8">
                <Pagination
                    page={hotelData?.pagination.page || 1}
                    pages={hotelData?.pagination.pages || 1}
                    onPageChange={(page) => setPage(page)}
                />
                </div>
            )}
            </div>
        </div>
</div>
  )
}

export default Search