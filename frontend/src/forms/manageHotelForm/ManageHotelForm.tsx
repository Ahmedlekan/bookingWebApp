import { FormProvider, useForm } from 'react-hook-form';
import DetailSection from './DetailSection';
import TypeSection from './TypeSection';
import FacilitiesSection from './FacilitiesSection';
import GuestsSection from './GuestsSection';
import ImagesSection from './ImagesSection';
import { useEffect } from 'react';
import { HotelType } from "../../../../backend/src/shared/types"

export type HotelFormData = {
    name: string;
    city: string;
    province: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    imageUrls: string[];
    adultCount: number;
    childCount: number;
    bedrooms: number;
    bathrooms: number;
    garage: number;
  };

  type Props = {
    hotel?: HotelType;
    onSave: (hotelFormData: FormData) => void;
    isLoading?: boolean;
  };

const ManageHotelForm = ({onSave, isLoading, hotel}: Props) => {
  // all the data from the useForm spread to the formProvider
    const formMethods = useForm<HotelFormData>()
    const {handleSubmit, reset} = formMethods

    useEffect(()=>{
      reset(hotel)
    }, [hotel, reset])

    const onSubmit = handleSubmit((formDataJson: HotelFormData)=>{
      const formData = new FormData()
      // if we are in edit mode, we want to add hotelId to the form data
      if (hotel){
        formData.append("hotelId", hotel._id)
      }

      formData.append("name", formDataJson.name)
      formData.append("city", formDataJson.city)
      formData.append("province", formDataJson.province)
      formData.append("description", formDataJson.description)
      formData.append("type", formDataJson.type);
      formData.append("pricePerNight", formDataJson.pricePerNight.toString());
      formData.append("starRating", formDataJson.starRating.toString());
      formData.append("adultCount", formDataJson.adultCount.toString());
      formData.append("childCount", formDataJson.childCount.toString());
      formData.append("bedrooms", formDataJson.bedrooms.toString());
      formData.append("bathrooms", formDataJson.bathrooms.toString());
      formData.append("garage", formDataJson.garage.toString());

      formDataJson.facilities.map((facility, index)=>{
        formData.append(`facilities[${index}]`, facility)
      })

      // Append image URLs. The updated imageUrls
      if (formDataJson.imageUrls){
        formDataJson.imageUrls.forEach((url, index)=>{
          formData.append(`imageUrls[${index}]`, url)
        })
      }

      // Append image Files
      Array.from(formDataJson.imageFiles).forEach((imageFile) => {
        formData.append(`imageFiles`, imageFile);
      });

      onSave(formData)
    })

  return (
    <FormProvider {...formMethods}>
      <form className="py-20 px-6 flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />

        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-lime-600 text-white p-2 font-bold 
              hover:bg-lime-500 text-xl disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  )
}

export default ManageHotelForm