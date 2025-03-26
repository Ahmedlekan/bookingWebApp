import { useFormContext } from 'react-hook-form'
import { HotelFormData } from './ManageHotelForm'
import { hotelFacilities } from '../../constants'

const FacilitiesSection = () => {
  const {register, formState:{errors}} = useFormContext<HotelFormData>()

  return (
    <div className='font-display'>
      <h2 className="text-2xl md:text-4xl font-bold mb-3">
        Facilities
      </h2>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facility)=>(
          <label className="inline-flex items-center gap-2">
          <input 
            type="checkbox" 
            className="peer hidden"
            {...register("facilities")}
          />
          <span className="w-5 h-5 border-2 border-gray-300 rounded-sm
            flex items-center justify-center peer-checked:bg-lime-500 
              peer-checked:border-lime-500 transition-colors">
            <svg className="w-3 h-3 text-white opacity-0
              peer-checked:opacity-100 transition-opacity">
              {/* checkmark icon */}
            </svg>
          </span>
          <span>{facility}</span>
        </label>
        ))}
      </div>

      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  )
}

export default FacilitiesSection