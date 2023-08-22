import React from 'react'
import trustPilot from '../../assets/PngItem_184365.png'



const HeroSection = () => {
    return (
        <div className='flex flex-col items-center place-content-center border-b-[1px] border-light-purple border-opacity-20 font-heading space-y-4 px-14 pb-4'>
            <h1 className='text-center font-extrabold text-3xl text-white md:text-4xl lg:text-5xl xl:text-6xl'>Obtain the items, currency, and coaching necessary to take your game to the next level</h1>
            <div className='md:flex md:h-8 md:items-end md:place-content-end md:space-x-2'>
                <img className='h-8' src={trustPilot} />
                <span className=' text-white text-xs md:text-base '>Excellent 5.0 out of 5.0 </span>
            </div>
        </div>
    )
}

export default HeroSection