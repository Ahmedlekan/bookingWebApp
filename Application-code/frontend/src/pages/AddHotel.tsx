import ManageHotelForm from '../forms/manageHotelForm/ManageHotelForm'
import { useMutation } from '@tanstack/react-query'
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const AddHotel = () => {
  const {showToast} = useAppContext()

  const {mutate, isPending} = useMutation( {
    mutationFn: apiClient.addMyHotel,
    onSuccess: async () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
      },
      onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
      },
  });

  const handleSave = (hotelFormData: FormData)=>{
    mutate(hotelFormData)
  }

  return (
    <ManageHotelForm onSave={handleSave} isLoading={isPending} />
  )
}

export default AddHotel