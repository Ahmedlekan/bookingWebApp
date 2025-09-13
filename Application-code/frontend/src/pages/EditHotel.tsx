import { useParams } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import * as apiClient from "../api-client"
import ManageHotelForm from '../forms/manageHotelForm/ManageHotelForm'
import { useQuery, useMutation } from '@tanstack/react-query'

const EditHotel = () => {
    const {showToast} = useAppContext()
    //get the hotelId from the url
    const {hotelId} = useParams()
    
    //fetch the hotel you want to edit
    const {data: hotel} = useQuery({
        queryKey:['fetchMyHotelId'],
        queryFn: () => apiClient.fetchMyHotelById(hotelId || ""),
        enabled: !!hotelId,
    })

    // update the hotel after editing
    const {mutate, isPending} = useMutation( {
      mutationFn: apiClient.updateMyHotelById,
      onSuccess: async () => {
        showToast({ message: "Hotel Updated!", type: "SUCCESS" });
      },
      onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
      },
    });

    const handleSave = (hotelFormData: FormData)=>{
      mutate(hotelFormData)
    }

  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isPending} />
  )
}

export default EditHotel