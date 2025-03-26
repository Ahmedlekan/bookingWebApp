import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import BookingForm from "../forms/bookingForm/BookingForm";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { Elements } from "@stripe/react-stripe-js";
import Skeleton from "../components/Skeleton";

const Booking = () => {
  const { hotelId } = useParams();
  const search = useSearchContext();
  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  const { stripePromise } = useAppContext();

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: hotel, isLoading: isHotelLoading } = useQuery({
    queryKey: ["fetchHotelById", hotelId],
    queryFn: () => apiClient.fetchHotelById(hotelId as string),
    enabled: !!hotelId,
  });

  const {
    data: paymentIntentData,
    isLoading: isPaymentIntentLoading,
    error,
  } = useQuery({
    queryKey: ["createPaymentIntent", hotelId, numberOfNights],
    queryFn: () =>
      apiClient.createPaymentIntent(
        hotelId as string,
        numberOfNights.toString()
      ),
    enabled: !!hotelId && numberOfNights > 0,
  });

  const { data: currentUser, isLoading: isUserLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: apiClient.fetchCurrentUser,
  });

  if (isHotelLoading || isPaymentIntentLoading || isUserLoading) {
    return (
      <div className="grid md:grid-cols-[1fr_2fr] gap-8">
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Error loading booking details: {error.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return <div className="text-center py-8">Hotel not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 font-display">
        Complete Your Booking
    </h1>
      
      <div className="grid md:grid-cols-[1fr_2fr] gap-8">
        <BookingDetailsSummary
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          adultCount={search.adultCount}
          childCount={search.childCount}
          numberOfNights={numberOfNights}
          hotel={hotel}
        />

        {currentUser && paymentIntentData && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: paymentIntentData.clientSecret,
              appearance: {
                theme: "stripe",
                variables: {
                  colorPrimary: "#2563eb",
                  colorBackground: "#ffffff",
                  colorText: "#111827",
                  fontFamily: "Inter, sans-serif",
                },
              },
            }}
          >
            <BookingForm
              currentUser={currentUser}
              paymentIntent={paymentIntentData}
            />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Booking;