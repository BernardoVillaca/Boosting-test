import React from 'react'
const RightContainer = ({ children, logo }) => {
  return (
    <div className='relative  md:w-1/5 md:py-8'>
      {/* navbar filler */}
      <div className='hidden md:flex lg:h-16 bg-transparent' />
      {children}
      {logo && <img className='hidden absolute bottom-14 lg:flex items-end ' src={'/logos/icon-03.png'} />}
    </div>
  )
}

export default RightContainer