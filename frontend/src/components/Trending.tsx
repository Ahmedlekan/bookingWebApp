import lagos from "../assets/lagos.jpg"
import ibadan from "../assets/ibadan.jpg"
import enugu from "../assets/enugu.jpg"
import abia from "../assets/abia.jpg"
import kwara from "../assets/kwara.jpg"
import { Link } from 'react-router-dom'

const Trending = () => {
  return (
    <div className='flex flex-col gap-5 mt-10'>
        <h2 className='text-xl lg:text-4xl font-bold'>Trending destinations</h2>
        <p className='text-lg lg:text-xl text-gray-500'>Most popular choices for travellers from Nigeria</p>

        <div className='flex flex-col gap-5'>
            <div className=' flex flex-col lg:flex-row gap-5'>
                <Link to="/search" className='flex flex-1'>
                    <div className='flex flex-1 relative hover:opacity-95'>
                        <img src={lagos} className='w-full h-[350px] rounded-lg object-cover' alt="Lagos" />
                        <div className='absolute inset-0 bg-gradient-to-b from-slate-700 via-transparent rounded-lg'></div>
                        <h2 className='absolute font-bold text-xl lg:text-3xl text-white ml-5 mt-5'>
                        Lagos
                        </h2>
                    </div>
                </Link>
                
                <Link to="/search" className='flex flex-1'>
                    <div className=' flex flex-1 relative hover:opacity-95'>
                        <img src={ibadan} className='w-full h-[350px] rounded-lg' alt="" />
                        <div className='absolute inset-0 bg-gradient-to-b from-slate-700 via-transparent rounded-lg'></div>
                        <h2 className=' absolute font-bold text-xl lg:text-3xl 
                            text-white ml-5 mt-5'
                        >
                            Ibadan
                        </h2>
                    </div>
                </Link>
            </div>
            
            <div className='flex flex-col lg:flex-row gap-5'>
                <Link to="/search">
                    <div className='relative flex hover:opacity-95'>
                        <img src={enugu} className='w-full h-[350px] rounded-lg' alt="" />
                        <div className='absolute inset-0 bg-gradient-to-b from-slate-700 via-transparent rounded-lg'></div>
                        <h2 className=' absolute font-bold text-xl lg:text-3xl 
                            text-white ml-5 mt-5'
                        >
                            Enugu
                        </h2>
                    </div>
                </Link>

                <Link to="/search">
                    <div className=' flex relative hover:opacity-95'>
                        <img src={abia} className='w-full h-[350px] rounded-lg' alt="" />
                        <div className='absolute inset-0 bg-gradient-to-b from-slate-700 via-transparent rounded-lg'></div>
                        <h2 className=' absolute font-bold text-xl lg:text-3xl 
                            text-white ml-5 mt-5'
                        >
                            Abia
                        </h2>
                    </div>
                </Link>
                
                <Link to="/search">
                    <div className=' flex relative hover:opacity-95'>
                        <img src={kwara} className='w-full h-[350px] rounded-lg' alt="" />
                        <div className='absolute inset-0 bg-gradient-to-b from-slate-700 via-transparent rounded-lg'></div>
                        <h2 className=' absolute font-bold text-xl lg:text-3xl 
                            text-white ml-5 mt-5'
                        >
                            Kwara
                        </h2>
                    </div>
                </Link>
                
            </div>
            
        </div>

        <div>
            
        </div>

    </div>
  )
}

export default Trending