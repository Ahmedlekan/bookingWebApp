import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Layout from "./layouts/Layout"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"
import AddHotel from "./pages/AddHotel"
import MyHotels from "./pages/MyHotels"
import { useAppContext } from "./contexts/AppContext"
import EditHotel from "./pages/EditHotel"
import Search from "./pages/Search"
import Detail from "./pages/Detail"
import Booking from "./pages/Booking"
import MyBookings from "./pages/MyBookings"
import HomePage from "./pages/HomePage"
import AboutUs from "./pages/AboutUs"

function App() {

  const {isLoggedIn} = useAppContext()

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/search" element={<Layout><Search /></Layout>} />
        <Route path="/detail/:hotelId" element={<Layout><Detail /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/sign-in" element={<Layout><SignIn /></Layout>} />
        <Route path="/aboutus" element={<Layout><AboutUs /></Layout>} />

        {isLoggedIn && (<>
          <Route path="/hotel/:hotelId/booking" element={<Layout ><Booking /></Layout>} />
          <Route path="/add-hotel" element={<Layout ><AddHotel /></Layout>} />
          <Route path="/my-hotels" element={<Layout ><MyHotels /></Layout>} />
          <Route path="/my-bookings" element={<Layout ><MyBookings /></Layout>} />
          <Route path="/edit-hotel/:hotelId" element={<Layout ><EditHotel /></Layout>} />
        </>)
        }

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
