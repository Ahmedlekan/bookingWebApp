import React from 'react'
import img from "../assets/bg-1.jpeg"
import Quick from '../components/Quick'
import Trending from '../components/Trending'

const HomePage = () => {
  return (
    <div className='flex flex-col gap-5'>
        <h2 className='text-xl lg:text-4xl font-bold'>Offers</h2>
        <p className='text-lg lg:text-xl text-gray-500'>Promotions, deals and special offers for you</p>
        
        <div className="relative w-full h-54 rounded-md overflow-hidden">
            <img
                src={img} // replace with your image URL
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

        <Quick />
        <Trending />
    </div>
  )
}

export default HomePage