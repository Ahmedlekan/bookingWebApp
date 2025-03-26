import { PaymentIntentResponse, UserType } from "../../../../backend/src/shared/types";
import { useForm } from "react-hook-form";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";
import { FaLock, FaUser, FaEnvelope } from "react-icons/fa";

type BookingFormProps = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  childCount: number;
  adultCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntent }: BookingFormProps) => {
  const search = useSearchContext();
  const { hotelId } = useParams();
  const { showToast } = useAppContext();

  const { mutate: bookRoom, isPending } = useMutation({
    mutationFn: apiClient.createRoomBooking,
    onSuccess: () => {
      showToast({ message: "Booking confirmed!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error saving booking", type: "ERROR" });
    },
  });

  const { register, handleSubmit } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      childCount: search.childCount,
      adultCount: search.adultCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
    >
      <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Confirm Your Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-body">
        <div className="space-y-1">
          <label className="text-base font-medium text-gray-700 flex items-center gap-2">
            <FaUser className="text-gray-500" />
            First Name
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-lime-500 
                focus:border-lime-500 bg-gray-100"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
        </div>

        <div className="space-y-1 font-body">
          <label className="text-base font-medium text-gray-700 flex items-center gap-2">
            <FaUser className="text-gray-500" />
            Last Name
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md 
            focus:ring-lime-500 focus:border-lime-500 bg-gray-100"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </div>

        <div className="space-y-1 md:col-span-2 font-body">
          <label className="text-base font-medium text-gray-700 flex items-center gap-2">
            <FaEnvelope className="text-gray-500" />
            Email
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md 
                focus:ring-lime-500 focus:border-lime-500 bg-gray-100"
            type="text"
            readOnly
            disabled
            {...register("email")}
          />
        </div>
      </div>

      <div className="mb-6 font-body">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Price Summary</h3>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">Total Cost:</span>
            <span className="text-xl font-bold text-lime-700">
              £{paymentIntent.totalCost.toFixed(2)}
            </span>
          </div>
          <p className="text-base text-gray-500 mt-1">Includes all taxes and charges</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Details</h3>
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <FaLock className="text-green-500" />
            <span>Secure credit card payment</span>
          </div>
          <CardElement
            id="payment-element"
            className="border border-gray-300 rounded-md p-3"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
      </div>

      <button
        disabled={isPending}
        type="submit"
        className="w-full bg-lime-600 hover:bg-lime-700 
            text-white font-bold py-3 px-4 rounded-lg transition-colors 
            disabled:bg-gray-400 flex justify-center items-center gap-2"
      >
        {isPending ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          "Confirm Booking"
        )}
      </button>
    </form>
  );
};

export default BookingForm;