import React, { useEffect, useState } from 'react'
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import ServiceCard from '../serviceCard';
import { useResizeIcons } from '../../hooks/useResizeIcon';





const Carousel = ({ initialArray }) => {
    const [featuredServicesArray, setFeaturedServicesArray] = useState(initialArray)
    const [leftSlide, setLeftSlide] = useState(false)
    const [rightSlide, setRightSlide] = useState(false)

    const iconsize = useResizeIcons(22, 30)

    const rightClickHandler = () => {
        if (leftSlide || rightSlide) return
        setLeftSlide(true)
        const firstItem = featuredServicesArray[0]
        let newArray = featuredServicesArray.filter((item) => item.serviceName !== firstItem.serviceName)
        newArray = [...newArray, firstItem]
        setTimeout(() => {
            setLeftSlide(false)
            setFeaturedServicesArray(newArray)
        }, 1000)
    }

    const leftClickHandler = () => {
        if (rightSlide || leftSlide) return
        setRightSlide(true)
        const lastItem = featuredServicesArray[featuredServicesArray.length - 1]
        let newArray = featuredServicesArray.filter((item) => item.serviceName !== lastItem.serviceName)
        newArray = [lastItem, ...newArray]
        setTimeout(() => {
            setRightSlide(false)
            setFeaturedServicesArray(newArray)
        }, 1000)
    }

    useEffect(() => {
        var interval = setInterval(() => rightClickHandler(), 8000)
        return () => clearInterval(interval)
    }, [featuredServicesArray])

    return (
        <div className='flex items-center place-content-center w-full bg-transparent space-x-1 '>
            <button
                className='flex p-1 md:p-2 bg-primary/black z-10 rounded-full place-content-center items-center border-[1px] border-secondary/gray border-opacity-20'
                onClick={leftClickHandler}
            >
                <SlArrowLeft className='text-secondary/gray' size={iconsize} />
            </button>
            <div className={`relative w-[200px] lg:w-[440px] xl:w-[640px] 2xl:w-[860px]  h-[200px] justify-center items-center transform duration-1000  overflow-hidden`}>
                <div className={
                    `absolute flex transform -translate-x-[440px]  space-x-[20px]
                    ${rightSlide && 'duration-1000 -translate-x-[219px] '}  
                    ${leftSlide && 'duration-1000  -translate-x-[660px] '}
                    `}>
                    {featuredServicesArray?.map((item, index) => (
                        <ServiceCard small={true} key={index} item={item} />
                    ))}
                </div>
            </div>
            <button
                className='flex p-1 md:p-2 bg-primary/black z-10 rounded-full place-content-center items-center border-[1px] border-secondary/gray border-opacity-20'
                onClick={rightClickHandler}
            >
                <SlArrowRight className='text-secondary/gray' size={iconsize} />
            </button>

        </div>
    )
}

export default Carousel