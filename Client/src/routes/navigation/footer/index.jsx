import React from 'react'
import LinksSection from './linksSection'
import ReviewSection from './reviewSection'

const Footer = () => {
  return (
    <div className='flex flex-col w-screen h-[50vh] bg-primary/black items-center'>
       <ReviewSection/>
       <LinksSection/>
      </div>
  )
}

export default Footer