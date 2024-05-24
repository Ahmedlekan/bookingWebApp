import React from 'react'

type FacilitiesFilterProps = {
  selectedFacilities: string[]
  onChange: ()=> void
}

const FacilitiesFilter = ({selectedFacilities, onChange}: FacilitiesFilterProps) => {
  return (
    <div>FacilitiesFilter</div>
  )
}

export default FacilitiesFilter