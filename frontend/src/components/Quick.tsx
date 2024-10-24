import lagos from "../assets/lagos.jpg"
import ibadan from "../assets/ibadan.jpg"
import { Link } from 'react-router-dom'

const Quick = () => {

  return (
    <div className='flex flex-col gap-5 mt-20'>
        <h2 className='text-xl lg:text-4xl font-bold'>Quick and easy trip planner</h2>
        <p className='text-lg lg:text-xl text-gray-500'>Pick a vibe and explore the top 
            destinations in Nigeria
        </p>

        <div className='flex gap-10'>
            
            <div className=" flex flex-col gap-2">
                <Link to="/search?destination=Lagos">
                    <img 
                        src={lagos} 
                        className=' w-[200px] h-[150px] object-cover rounded-md'
                    />
                </Link>

                <div className='flex flex-col'>
                    <h3 className=' font-bold text-base md:text-xl'>Lagos</h3>
                    <p className=' mt-2 text-gray-500 text-base md:text-lg'>20km away</p>
                </div>
            </div>
            
            <div className='flex flex-col gap-2'>
                <Link to="/search">
                    <img 
                        src={ibadan} 
                        className=' w-[200px] h-[150px] object-cover rounded-md'
                    />
                </Link>

                <div className=''>
                    <h3 className=' font-bold text-base md:text-xl'>Ibadan</h3>
                    <p className=' mt-2 text-gray-500 text-base md:text-lg'>40km away</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Quick