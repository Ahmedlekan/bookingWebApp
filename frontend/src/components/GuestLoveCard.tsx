import { HotelType } from '../../../backend/src/shared/types'
import { Link } from 'react-router-dom'


type GuestLoveCardProps = {
    hotel: HotelType
}

const GuestLoveCard = ({hotel}: GuestLoveCardProps) => {

  return (
    <div>
        <Link to={`/detail/${hotel._id}`}>
            <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
                <img className="w-full h-auto object-cover aspect-video" 
                    src={hotel.imageUrls[0]} alt={hotel.name} />
                
                <div className="px-6 pt-4 pb-2">
                    <div className="font-bold text-xl whitespace-nowrap mb-2">{hotel.name}</div>
                    <p className="text-gray-700 text-base">{hotel.city} {hotel.country}</p>
                    
                    <div className='flex gap-3 justify-between items-center mt-3'>
                        <div className=' bg-blue-800 text-white py-1 px-2'>{hotel.starRating}</div>
                        <div className='flex justify-end items-center gap-3'>
                            <p> Starting from </p>
                            <span className='font-bold text-xl'>${hotel.pricePerNight}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default GuestLoveCard