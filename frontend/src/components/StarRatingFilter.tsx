import React from 'react'

type StarRatingFilterProps = {
  selectedStars: string[]
  onChange: ()=> void
}

const StarRatingFilter = ({selectedStars, onChange}: StarRatingFilterProps) => {
  
  return (
    <div>StarRatingFilter</div>
  )
}

export default StarRatingFilter