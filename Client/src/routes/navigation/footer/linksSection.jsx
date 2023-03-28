import React from 'react'
import { Link } from 'react-router-dom';
const LinksSection = () => {
    return (
        <div className='flex flex-col h-1/2 w-2/5'>
            <div className='flex w-full h-full '>
                <div className='flex flex-col h-full w-[14rem] text-secondary/gray text-opacity-50 text-sm place-content-center items-end '>
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
                <div className='relative flex place content-center items-center w-full'>
                    <img className='absolute scale-50' src={'logos/Logo variation-02.png'} />
                </div>
                <div className='flex flex-col h-full w-[14rem] text-secondary/gray text-opacity-50 text-sm place-content-center items-start'>
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
            <div className='flex w-full h-[5rem] text-sm text-secondary/gray text-opacity-50 place-content-center '>
                <span>© Innate Gaming 2023. All rights reserved.</span>
            </div>

        </div>
    )
}

export default LinksSection