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


const Search = () => {
  const search = useSearchContext()
  const [page, setPage] = useState<number>(1)
  const [selectedStars, setSelectedStars] = useState<string[]>([])
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  //taking what the usaul search into our searcHotels
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
  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  // adding and removing the type and unchecked type
  const hotelTypesChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    const hotelType = event.target.value

    setSelectedHotelTypes( (prevTypes) =>
        event.target.checked
        ? [...prevTypes, hotelType]
        : prevTypes.filter((type)=> type !== hotelType)
    )
  }

  // adding and removing the facilities and unchecked facilities 
  const hotelFacilitiesChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    const hotelFacility = event.target.value

    setSelectedFacilities((prevFacilities) =>
        event.target.checked
        ? [...prevFacilities, hotelFacility]
        : prevFacilities.filter((facility) => facility !== hotelFacility)
    )
  }
  

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        
        {/* filter */}
        <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
            <div className="space-y-5">
                <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                    Filter By:
                </h3>
                <StarRatingFilter
                    selectedStars={selectedStars}
                    onChange={handleStarsChange}
                />
                <HotelTypesFilter
                    selectedHotelTypes={selectedHotelTypes}
                    onChange={hotelTypesChange}
                />
                <FacilitiesFilter
                    selectedFacilities={selectedFacilities}
                    onChange={hotelFacilitiesChange}
                />
                <PriceFilter
                    selectedPrice={selectedPrice}
                    onChange={(value?:number)=> setSelectedPrice(value)}
                />
            </div>
        </div>

        <div className="flex flex-col gap-5">
            
            <div className="flex justify-between items-center">
                <span className='text-xl font-bold'>
                    {hotelData?.pagination.total} Hotels found
                    {search.destination ? ` in ${search.destination}` : ""}
                </span>
                <select 
                    className="p-2 border rounded-md"
                    value={sortOption}
                    onChange={(event)=> setSortOption(event.target.value) }
                >
                    <option value="">Sort By</option>
                    <option value="starRating">Star Rating</option>
                    <option value="pricePerNightAsc">
                        Price Per Night (low to high)
                    </option>
                    <option value="pricePerNightDesc">
                        Price Per Night (high to low)
                    </option>
                </select>
            </div>

            {hotelData?.data.map((hotel)=>(
                <SearchResultsCard hotel={hotel} />
            ))}

            <div>
            <Pagination
                page={hotelData?.pagination.page || 1}
                pages={hotelData?.pagination.pages || 1}
                onPageChange={(page)=> setPage(page)}
            />
            </div>

        </div>

    </div>
  )
}

export default Search