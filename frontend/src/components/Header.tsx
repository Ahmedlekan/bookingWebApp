import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import SignOutBtn from './SignOutBtn';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-lime-700 py-4 md:py-6 font-body sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-xl md:text-2xl
          font-bold flex items-center gap-1 md:gap-2">
            <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 10L30 30L40 10" stroke="#84CC16" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="30" cy="10" r="3" fill="#84CC16"/>
              <text x="50" y="25" fontFamily="display" fontSize="20" fontWeight="bold" fill="white">DIPLO</text>
            </svg>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4 lg:space-x-6 text-white uppercase font-semibold text-sm md:text-base tracking-wide">
          <Link to="/" className="hover:text-lime-200 transition-colors">Home</Link>
          <Link to="/aboutus" className="hover:text-lime-200 transition-colors">About Us</Link>
          <Link to="/search" className="hover:text-lime-200 transition-colors">For Rent</Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/my-bookings" className="hover:text-lime-200 transition-colors">My Bookings</Link>
              {/* <Link to="/my-hotels" className="hover:text-lime-200 transition-colors">My Hotels</Link> */}
              <SignOutBtn />
            </>
          ) : (
            <>
              <Link to="/register" className="hover:text-lime-200 transition-colors">Register</Link>
              <Link to="/sign-in" className="hover:text-lime-200 transition-colors">Sign In</Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 
            bg-lime-700 py-4 px-4 shadow-lg">
            <nav className="flex flex-col space-y-4 
              text-white uppercase font-semibold text-sm tracking-wide">
              <Link 
                to="/" 
                className="hover:text-lime-200 transition-colors 
                  py-2 border-b border-lime-600"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <Link 
                to="/aboutus" 
                className="hover:text-lime-200 transition-colors py-2 
                  border-b border-lime-600"
                onClick={toggleMobileMenu}
              >
                About Us
              </Link>
              <Link 
                to="/search" 
                className="hover:text-lime-200 transition-colors py-2 
                border-b border-lime-600"
                onClick={toggleMobileMenu}
              >
                For Rent
              </Link>
              
              {isLoggedIn ? (
                <>
                  <Link 
                    to="/my-bookings" 
                    className="hover:text-lime-200 transition-colors py-2 
                      border-b border-lime-600"
                    onClick={toggleMobileMenu}
                  >
                    My Bookings
                  </Link>
                  <Link 
                    to="/my-hotels" 
                    className="hover:text-lime-200 transition-colors py-2 
                      border-b border-lime-600"
                    onClick={toggleMobileMenu}
                  >
                    My Hotels
                  </Link>
                  <div className="pt-2">
                    <SignOutBtn onClick={toggleMobileMenu} />
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    to="/register" 
                    className="hover:text-lime-200 transition-colors py-2 
                      border-b border-lime-600"
                    onClick={toggleMobileMenu}
                  >
                    Register
                  </Link>
                  <Link 
                    to="/sign-in" 
                    className="hover:text-lime-200 transition-colors py-2 
                      border-b border-lime-600"
                    onClick={toggleMobileMenu}
                  >
                    Sign In
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;