import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import BookingForm from "../forms/bookingForm/BookingForm";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { Elements } from "@stripe/react-stripe-js";

const Booking = () => {
    const {hotelId} = useParams()
    const search = useSearchContext()
    const [numberOfNights, setNumberOfNights] = useState<number>(0);
    const {stripePromise} = useAppContext()

    // we want to make sure that whenever the checkin and checkout changes from the
    // global state, the price per nights all so changes 
    useEffect(()=>{
        if(search.checkIn && search.checkOut){
            const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime() ) / (1000 * 60 * 60 * 24)
            setNumberOfNights(Math.ceil(nights))
        }   
    }, [search.checkIn, search.checkOut])

    const {data: hotel} = useQuery({
        queryKey:["fetchHotelById"],
        queryFn: ()=> apiClient.fetchHotelById(hotelId as string),
        enabled: !!hotelId
    })

    const {data:paymentIntentData, isLoading, error} = useQuery({
        queryKey:["createPaymentIntent"],
        queryFn: ()=> apiClient.createPaymentIntent(hotelId as string, numberOfNights.toString()),
        enabled: !! hotelId && numberOfNights > 0
    })
    
    const {data: currentUser} = useQuery({
        queryKey:["currentUser"],
        queryFn: ()=> apiClient.fetchCurrentUser()
    })

    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
    return <div>Error: {error.message}</div>;
    }
    
    if(!hotel){
        return <></>
    }

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
        <BookingDetailsSummary
            checkIn={search.checkIn}
            checkOut={search.checkOut}
            adultCount={search.adultCount}
            childCount={search.childCount}
            numberOfNights={numberOfNights}
            hotel={hotel}
        />

        {currentUser && paymentIntentData &&  (
            <Elements stripe={stripePromise} options={{clientSecret: paymentIntentData.clientSecret}}>
                <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData} />
            </Elements>
        )}
    </div>
  )
}

export default Booking