import React from 'react'
import { Link } from 'react-router-dom';
const LinksSection = () => {
    return (
        <div className='flex flex-col xl:h-1/2 xl:w-2/5 mx-auto'>
            <div className='xl:flex w-full h-full'>
                <div className='flex flex-col h-full min-w-[10rem]  text-secondary/gray text-opacity-50 text-sm place-content-center items-center xl:items-end xl:pr-4 '>
                    <Link to={'/about-us'}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        About us
                    </Link>
                    <Link to={'/work-with-us'}
                    onClick={()=> window.scrollTo({top: 0, behavior: 'smooth'})}
                    >
                        Work with us
                    </Link>
                    <Link to={'/contact-us'}
                    onClick={()=> window.scrollTo({top: 0, behavior: 'smooth'})}
                    >
                        Contact us
                    </Link>
                </div>
                <div className='flex place-content-center items-center w-full'>
                    <img className='h-16 xl:h-[4rem] 2xl:h-[5rem]' src={'logos/logoVariation-01.png'} />
                </div>
                <div className='flex flex-col h-full min-w-[10rem] text-secondary/gray text-opacity-50 text-sm place-content-center items-center xl:items-start xl:pl-4'>
                    <Link to={'/terms-and-conditions'}
                    onClick={()=> window.scrollTo({top: 0, behavior: 'smooth'})}
                    >
                        Terms and Conditions
                    </Link>
                    <Link to={'/refund-policy'}
                    onClick={()=> window.scrollTo({top: 0, behavior: 'smooth'})}
                    >
                        Refund policy
                    </Link>
                    <Link to={'/privacy-policy'}
                    onClick={()=> window.scrollTo({top: 0, behavior: 'smooth'})}
                    >
                        Privacy policy
                    </Link>
                </div>
            </div>
            <div className='flex w-full py-4 text-sm text-secondary/gray text-opacity-50 place-content-center '>
                <span>© Innate Gaming 2023. All rights reserved.</span>
            </div>
            

        </div>
    )
}

export default LinksSection