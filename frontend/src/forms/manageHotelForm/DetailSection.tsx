import { useFormContext } from 'react-hook-form'
import { HotelFormData } from './ManageHotelForm'

const DetailSection = () => {
  const { register, formState: { errors } } = useFormContext<HotelFormData>()
  
  return (
    <div className="space-y-6">
      
      <div className="pb-6 border-b border-gray-200">
        <h1 className="text-3xl md:text-5xl font-display
          font-bold text-gray-800">
            Add Hotel
        </h1>
        <p className="text-gray-600 mt-1 text-lg font-body">
          Fill in the details of your property
        </p>
      </div>

      {/* Basic Information Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 font-body">
        <div className="space-y-6">
          <div>
            <label className="block text-xl font-medium
              text-gray-900 mb-1">
              Hotel Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`block w-full font-body
                rounded-md shadow-sm ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-lime-500 focus:ring-lime-500'} py-2 px-3`}
              {...register("name", { required: "Hotel name is required" })}
              placeholder="Grand Plaza Hotel"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xl font-medium 
                text-gray-900 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`block w-full rounded-md shadow-sm ${errors.city ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-lime-500 focus:ring-lime-500'} py-2 px-3`}
                {...register("city", { required: "City is required" })}
                placeholder="Laval"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xl font-medium
                text-gray-900 mb-1">
                Province <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`block w-full rounded-md shadow-sm ${errors.province ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-lime-500 focus:ring-lime-500'} py-2 px-3`}
                {...register("province", { required: "Country is required" })}
                placeholder="Montreal Quebec"
              />
              {errors.province && (
                <p className="mt-1 text-sm text-red-600">{errors.province.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xl font-medium 
              text-gray-900 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              className={`block w-full rounded-md shadow-sm ${errors.description ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-lime-500 focus:ring-lime-500'} py-2 px-3`}
              {...register("description", { required: "Description is required" })}
              placeholder="Describe your hotel's features, amenities, and unique qualities..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>
        </div>

        {/* Ratings and Pricing Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xl font-medium 
                text-gray-900 mb-1">
                Price Per Night ($) <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex
                  items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  min={1}
                  className={`block w-full pl-7 rounded-md ${errors.pricePerNight ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-lime-500 focus:ring-lime-500'} py-2 px-3`}
                  {...register("pricePerNight", { 
                    required: "Price is required",
                    min: { value: 1, message: "Price must be at least $1" }
                  })}
                  placeholder="199"
                />
              </div>
              {errors.pricePerNight && (
                <p className="mt-1 text-sm text-red-600">{errors.pricePerNight.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xl font-medium 
                text-gray-900 mb-1">
                Star Rating <span className="text-red-500">*</span>
              </label>
              <select
                {...register("starRating", {
                  required: "Rating is required",
                })}
                className={`block w-full rounded-md shadow-sm ${errors.starRating ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-lime-500 focus:ring-lime-500'} py-2 px-3`}
              >
                <option value="">Select rating</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} Star{num !== 1 ? 's' : ''}
                  </option>
                ))}
              </select>
              {errors.starRating && (
                <p className="mt-1 text-sm text-red-600">{errors.starRating.message}</p>
              )}
            </div>
          </div>

          {/* Room Details Section */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label className="block text-xl font-medium 
                text-gray-900 mb-1">
                Bedrooms <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min={1}
                className={`block w-full rounded-md shadow-sm ${errors.bedrooms ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-lime-500 focus:ring-lime-500'} py-2 px-3`}
                {...register("bedrooms", { 
                  required: "Bedroom count is required",
                  min: { value: 1, message: "Must have at least 1 bedroom" }
                })}
                placeholder="2"
              />
              {errors.bedrooms && (
                <p className="mt-1 text-sm text-red-600">{errors.bedrooms.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xl font-medium 
                text-gray-900 mb-1">
                Bathrooms <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min={1}
                className={`block w-full rounded-md shadow-sm ${errors.bathrooms ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-lime-500 focus:ring-lime-500'} py-2 px-3`}
                {...register("bathrooms", { 
                  required: "Bathroom count is required",
                  min: { value: 1, message: "Must have at least 1 bathroom" }
                })}
                placeholder="2"
              />
              {errors.bathrooms && (
                <p className="mt-1 text-sm text-red-600">{errors.bathrooms.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xl font-medium 
                text-gray-900 mb-1">
                Parking Spaces
              </label>
              <input
                type="number"
                min={0}
                className={`block w-full rounded-md shadow-sm ${errors.garage ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-lime-500 focus:ring-lime-500'} py-2 px-3`}
                {...register("garage", { 
                  min: { value: 0, message: "Cannot be negative" }
                })}
                placeholder="1"
              />
              {errors.garage && (
                <p className="mt-1 text-sm text-red-600">{errors.garage.message}</p>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default DetailSection