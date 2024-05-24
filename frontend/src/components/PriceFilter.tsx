import React from 'react'

type PriceFilterProps = {
  selectedPrice: number | undefined
  onChange: ()=> void
}

const PriceFilter = ({selectedPrice, onChange}: PriceFilterProps) => {
  return (
    <div>PriceFilter</div>
  )
}

export default PriceFilter