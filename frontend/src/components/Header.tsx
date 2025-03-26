
import { Link } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import SignOutBtn from './SignOutBtn'

const Header = () => {

    const {isLoggedIn} = useAppContext()

  return (
    <header className=" bg-black py-6 font-body">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold flex items-center gap-2">
          <span className="text-3xl">📍</span> Diplo
        </Link>

        {/* Nav Links */}

            <nav className="hidden md:flex space-x-6 text-white
                uppercase font-semibold text-sm md:text-base tracking-wide">
                <Link to="/">Home</Link>
                <Link to="/aboutus">About Us</Link>
                <Link to="/search">For Rent</Link>
                {
                    isLoggedIn ? (
                        <div className='hidden md:flex space-x-6'>
                            <Link to="/my-bookings">My Bookings</Link>
                            <Link to="/my-hotels">My Hotels</Link>
                            <SignOutBtn />
                        </div>
                    ): (
                        <div className='hidden md:flex space-x-6'>
                            <Link to="/register">Register</Link>
                            <Link to="/sign-in">Sign In</Link>
                        </div>
                    )
                }
                
            </nav>
      </div>
    </header>
  );
};

export default Header