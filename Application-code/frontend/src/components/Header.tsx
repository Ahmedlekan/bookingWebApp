
import { Link } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import SignOutBtn from './SignOutBtn'

const Header = () => {
    const {isLoggedIn} = useAppContext()

  return (
    <div className="bg-blue-800 py-6">

        <div className="container mx-auto flex justify-between">
            <span className=" text-xl md:text-3xl text-white font-bold tracking-tight">
                <Link to="/">Diplo.com</Link>
            </span>

            <span className="flex">
                {isLoggedIn ? (
                    <div className='flex items-center'>
                        <Link
                            className=" text-white px-3 hidden md:block 
                                font-bold hover:bg-blue-600 text-sm md:text-lg"
                            to="/my-bookings"
                        >
                            My Bookings
                        </Link>
                        
                        <Link
                            className=" text-white px-3 
                                font-bold hover:bg-blue-600 text-sm md:text-lg"
                            to="/my-hotels"
                        >
                            My Hotels
                        </Link>
                        <SignOutBtn />
                    </div>
                ) : (
                    <div className=' flex gap-2 md:gap-5 justify-center items-center'>
                        <Link
                            to="/"
                            className="items-center text-white text-xl hidden md:block"
                            >
                                List your property
                        </Link>
                        <Link
                            to="/register"
                            className="bg-white items-center text-blue-600 
                                px-2 py-1 md:px-3 md:py-2  hover:bg-gray-100 rounded-md
                                text-sm md:text-lg"
                            >
                                Register
                        </Link>
                        <Link
                            to="/sign-in"
                            className="bg-white items-center text-blue-600 
                                px-2 py-1 md:px-3 md:py-2 text-sm md:text-lg 
                                hover:bg-gray-100 rounded-md"
                            >
                                Sign In
                        </Link>
                    </div>
                )}
            </span>

        </div>

    </div>
  )
}

export default Header