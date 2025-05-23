import { RegisterFormDataprops } from "./pages/Register"
import { SignInFormData } from "./pages/SignIn"
import {HotelSearchResponse, HotelType, PaymentIntentResponse, UserType} from "../../backend/src/shared/types"
import { BookingFormData } from "./forms/bookingForm/BookingForm"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""

// Current user
export const fetchCurrentUser = async ():Promise<UserType> => {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        credentials: "include"
    })
    if(!response.ok){
        throw new Error("Error fetching user")
    }
     return response.json()
}

// Register form
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

// Sign in form
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

// validate token
export const validateToken = async ()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: 'include'
    })
    if (!response.ok){
        throw new Error("Token invalid")
    }

    return response.json()
}

// Sign out
export const signOut = async ()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST"
    })

    if(!response.ok){
        throw new Error("Error during sign out")
    }
}

// Add hotel to the data base
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

// fetch the list of all the hotels
export const fetchMyHotel = async (): Promise<HotelType[]> =>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: "include",
    })

    if(!response.ok){
        throw new Error("Error fetching hotels")
    }
    return response.json()
}

// Editing my-hotel
export const editMyHotel = async (): Promise<HotelType[]> =>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: "include",
    })
    
    if(!response.ok){
        throw new Error("Error fetching hotels")
    }
    return response.json()
}

// fetch my-hotel by its hotelId
export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> =>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        credentials: "include",
    })

    if(!response.ok){
        throw new Error("Error fetching hotels")
    }
    return response.json()
}

// Update my-hotel
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

// Search hotel
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









export const fetchHotels = async (): Promise<HotelType[]> =>{
    const response = await fetch(`${API_BASE_URL}/api/hotels`)
    if (!response.ok){
        throw new Error("Error fetching hotels")
    }

    return response.json()
}

// fetch hotel by id
export const fetchHotelById = async (hotelId: string):Promise<HotelType> =>{
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`)

    if(!response.ok){
        throw new Error("Error fetch hotels")
    }

    return response.json()
}

// payment intent
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

// for creating new booking
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

// My bookings
export const fetchMyBookings = async ():Promise<HotelType[]> =>{
    const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
        credentials: "include"
    })

    if(!response.ok){
        throw new Error("Unable to fetch bookings");
        
    }

    const data = await response.json();
    console.log('Fetched bookings:', data); // Add this line to debug
    return data;
}










