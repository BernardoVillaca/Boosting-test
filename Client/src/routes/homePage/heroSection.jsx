import React from 'react'
import trustPilot from '../../assets/trustpilot_icon.png'



const HeroSection = () => {
    return (
        <div className='flex flex-col w-full items-center place-content-center border-b-[1px] border-light-purple border-opacity-20 font-heading'>
            <h1 className='text-center font-extrabold text-white text-6xl '>Obtain the items, currency, and coaching necessary to take your game to the next level</h1>
            <div className='flex  items-center  rounded-xl  bg-opacity-70'>
                <span className='text-white'>Excellent 5.0 out of 5.0 </span>
                <img className='h-24 w-24' src={trustPilot} />
            </div>
        </div>
    )
}

export default HeroSection