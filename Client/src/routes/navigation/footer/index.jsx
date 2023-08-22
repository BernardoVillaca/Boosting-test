import React from 'react'
import LinksSection from './linksSection'
import ReviewSection from './reviewSection'

const Footer = () => {
  return (
    <div className='lg:h-[50vh] bg-primary/black '>
       <ReviewSection/>
       <LinksSection/>
      </div>
  )
}

export default Footer