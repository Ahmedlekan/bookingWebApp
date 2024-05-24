import React from 'react'

type HotelTypesFilterProps = {
  selectedHotelTypes: string[]
  onChange: ()=> void
}

const HotelTypesFilter = ({selectedHotelTypes, onChange}: HotelTypesFilterProps) => {
  return (
    <div>HotelTypesFilter</div>
  )
}

export default HotelTypesFilter