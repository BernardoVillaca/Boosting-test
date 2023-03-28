import React from 'react'
const RightContainer = ({ children, logo }) => {
  return (
    <div className='relative  w-1/5 h-full py-8 '>
      {/* navbar filler */}
      <div className='h-16 bg-transparent' />
      {children}
      {logo && <img className='absolute h-[20rem] w-[20rem] mb-[4.7rem] bottom-10 right-[3.3rem]' src={'/logos/icon-03.png'} />}
    </div>
  )
}

export default RightContainer