import { RegisterFormDataprops } from "./pages/Register"
import { SignInFormData } from "./pages/SignIn"
import {HotelSearchResponse, HotelType, PaymentIntentResponse, UserType} from "../../backend/src/shared/types"
import { BookingFormData } from "./forms/bookingForm/BookingForm"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""

// connecting the current user from the backend to the frontend
export const fetchCurrentUser = async ():Promise<UserType> => {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        credentials: "include"
    })
    if(!response.ok){
        throw new Error("Error fetching user")
    }
     return response.json()
}

// connecting the register from the backend to the fronend
export const register = async (formData: RegisterFormDataprops)=>{
    const response =  await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-type": "Application/json"
        },
        body: JSON.stringify(formData)
    })
    const responseBody = await response.json()
    if(!response.ok){
        throw new Error(responseBody.message)
    }
}

// connecting the user sign in from the backend to the fronend
export const signIn = async ( formData: SignInFormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method:"POST",
        credentials:'include',
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify(formData)
    })   
    const body = await response.json()
    if (!response.ok){
        throw new Error(body.message)
    }
    return body
}

// The validate token makes sures the user is loged in
export const validateToken = async ()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: 'include'
    })
    if (!response.ok){
        throw new Error("Token invalid")
    }

    return response.json()
}

// connecting the user sign out from the backend to the fronend
export const signOut = async ()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST"
    })

    if(!response.ok){
        throw new Error("Error during sign out")
    }
}

// connecting the backend to the frontend. Used for adding hotel to my data base
export const addMyHotel = async (hotelFormData: FormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: "include",
        method: "POST",
        body: hotelFormData,
    })

    if(!response.ok){
        throw new Error("Error adding hotels")
    }
    return response.json()
}

// connecting the backend to the frontend. For fetching the list of all the hotels added from the data base
export const fetchMyHotel = async (): Promise<HotelType[]> =>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: "include",
    })

    if(!response.ok){
        throw new Error("Error fetching hotels")
    }
    return response.json()
}

// connecting the backend to the frontend. For editing my-hotel
export const editMyHotel = async (): Promise<HotelType[]> =>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: "include",
    })

    if(!response.ok){
        throw new Error("Error fetching hotels")
    }
    return response.json()
}

// for fetching my-hotel by its hotelId
export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> =>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        credentials: "include",
    })

    if(!response.ok){
        throw new Error("Error fetching hotels")
    }
    return response.json()
}

// updating the my-hotel by each hotelId
export const updateMyHotelById = async (hotelFormData: FormData) =>{
    const response =  await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`, {
        method: "PUT",
        body: hotelFormData,
        credentials:"include"
    })

    if(!response.ok){
        throw new Error("Failed to edit hotelId")
    }
    return response.json()
}

export type SearchParams = {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adultCount?: string;
    childCount?: string;
    page?: string;
    facilities?: string[];
    types?: string[];
    stars?: string[];
    maxPrice?: string;
    sortOption?: string;
};


export const searchHotels = async (searchParams : SearchParams) : Promise<HotelSearchResponse> =>{
    // create new url params object
    const queryParams = new URLSearchParams()

    queryParams.append("destination", searchParams.destination || "")
    queryParams.append("checkIn", searchParams.checkIn || "")
    queryParams.append("checkOut", searchParams.checkOut || "")
    queryParams.append("adultCount", searchParams.adultCount || "")
    queryParams.append("childCount", searchParams.childCount || "")
    queryParams.append("page", searchParams.page || "")
    queryParams.append("sortOption", searchParams.sortOption || "")
    queryParams.append("maxPrice", searchParams.maxPrice || "")

    searchParams.facilities?.forEach((facility)=> queryParams.append("facilities", facility))
    searchParams.types?.forEach((type)=> queryParams.append("types", type))
    searchParams.stars?.forEach((star)=> queryParams.append("stars", star))

    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`)

    if (!response.ok){
        throw new Error("Error fetching hotels")
    }

    return response.json()
}

//
export const fetchHotelById = async (hotelId: string):Promise<HotelType> =>{
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`)

    if(!response.ok){
        throw new Error("Error fetch hotels")
    }

    return response.json()
}

// for creating payment intent
export const createPaymentIntent = async (
    hotelId: string,
    numberOfNights: string
  ): Promise<PaymentIntentResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
      {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ numberOfNights }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Error fetching payment intent");
    }
  
    return response.json();
};

// for creating bookings
export const createRoomBooking = async (formData: BookingFormData)=>{
    const response = await fetch (`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify(formData)
    })

    if(!response.ok){
        throw new Error("Error booking room")
    }
}









