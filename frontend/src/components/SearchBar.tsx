import {FormEvent, useState} from "react";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchContext } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const search = useSearchContext()
  const navigate = useNavigate()

  const [destination, setDestination] = useState<string>(search.destination)
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn)
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut)
  const [adultCount, setAdultCount] = useState<number>(search.adultCount)
  const [childCount, setChildCount] = useState<number>(search.childCount)

  const handleSubmit = (event: FormEvent) => {
   event.preventDefault()
   search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount,"")
   navigate("/search")
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-1 bg-default rounded shadow-md grid 
      grid-cols-1 lg:grid-cols-5 items-center gap-2
      relative z-20 -mt-10 font-display"
    >
      <div className="flex flex-row items-center flex-1 bg-white py-4 px-2 rounded">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={ (event)=> setDestination(event.target.value)}
        />
      </div>

      <div className="flex bg-white px-2 py-3 gap-2 rounded">
        <label className="items-center flex">
          Adults:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="items-center flex">
          Children:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>

      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date) }
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full bg-white py-4 px-2 focus:outline-none rounded"
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="min-w-full bg-white py-4 px-2 focus:outline-none rounded"
          wrapperClassName="min-w-full"
        />
      </div>
      <button className="w-full lg:w-auto  bg-lime-600 text-white h-full p-2 
          text-xl lg:text-2xl hover:bg-lime-500 rounded"
        >
          Search
      </button>
    </form>
  );
};

export default SearchBar;