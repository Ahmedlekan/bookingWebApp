import img from "../assets/bg-1.jpeg"
import Quick from '../components/Quick'
import Trending from '../components/Trending'
import GuestLoveCard from "../components/GuestLoveCard"
import * as apiClient from "../api-client"
import { useQuery } from "@tanstack/react-query"

const HomePage = () => {
    const {data: hotels} = useQuery({
        queryKey:["fetchQuery"],
        queryFn: ()=> apiClient.fetchHotels()
    })

    const guestLoves = hotels?.slice(0, 4) || []
    const uniqueProperties = hotels?.slice?.(4, 8) || []

  return (
    <div className='flex flex-col gap-5'>
        <h2 className='text-xl lg:text-4xl font-bold'>Offers</h2>
        <p className='text-lg lg:text-xl text-gray-500'>Promotions, deals and special offers for you</p>
        
        <div className="relative w-full h-54 rounded-md overflow-hidden">
            <img
                src={img}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative flex justify-start items-center h-full p-6">
                <div className="text-left text-white">
                <h1 className="text-4xl font-bold mb-4">Seize the moment</h1>
                <p className="mb-4"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br /> Voluptatem 
                    reprehenderit laboriosam</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Find Gateway Deals
                </button>
                </div>
            </div>
        </div>

        <div>
            <Quick />
            <Trending />
            <div className="mt-10">
                <h2 className=" text-xl lg:text-3xl font-bold mb-5">Home guest love</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {guestLoves.map((hotel) => (
                        <GuestLoveCard key={hotel._id} hotel={hotel} />
                    ))}
                </div>
            </div>
            
            <div className="mt-10">
                <h2 className=" text-xl lg:text-3xl font-bold mb-5">Stay at our top unique properties</h2>
                <p className=" mb-3 text-gray-500 text-lg">From castles and villas to boats and igloos, we have it all</p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {uniqueProperties.map((hotel) => (
                        <GuestLoveCard key={hotel._id} hotel={hotel} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomePage