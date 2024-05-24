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
//   const [sortOption, setSortOption] = useState<string>("");

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString()
  }

  const {data: hotelData} = useQuery({
    queryKey:["searchHotels", searchParams],
    queryFn: ()=> apiClient.searchHotels(searchParams),
  })

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
                    onChange={()=>{}}
                />
                <HotelTypesFilter
                    selectedHotelTypes={selectedHotelTypes}
                    onChange={()=>{}}
                />
                <FacilitiesFilter
                    selectedFacilities={selectedFacilities}
                    onChange={()=>{}}
                />
                <PriceFilter
                    selectedPrice={selectedPrice}
                    onChange={()=>{}}
                />
            </div>
        </div>

        <div className="flex flex-col gap-5">
            
            <div className="flex justify-between items-center">
                <span className='text-xl font-bold'>
                    {hotelData?.pagination.total} Hotels found
                    {search.destination ? ` in ${search.destination}` : ""}
                </span>
                <select></select>
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