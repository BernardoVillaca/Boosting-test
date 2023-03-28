import React, { useEffect, useState } from 'react'
import Carousel from '../../components/carousel'
import { useFetchWithLocalStorage } from '../../hooks/useFetch'
import { getDocumentsByField } from '../../utils/firebase.utils'

const FeaturedServices = () => {

  const featuredServices = useFetchWithLocalStorage({ key: 'Featured', fn: () => getDocumentsByField('ServicesInfo', 'featured', true) })
  
  return (
    <div className='flex h-[18rem] flex-col w-full border-b-[1px] border-light-purple border-opacity-20 py-4 space-y-4'>
      <h1 className='font-semibold text-white text-4xl '>Featured Services</h1>
      {featuredServices && <Carousel initialArray={featuredServices} />}
    </div>
  )
}

export default FeaturedServices