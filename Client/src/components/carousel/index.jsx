import React, { useEffect, useState } from 'react'
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import ServiceCard from '../serviceCard';



const Carousel = ({ initialArray }) => {
    const [featuredServicesArray, setFeaturedServicesArray] = useState(initialArray)
    const [leftSlide, setLeftSlide] = useState(false)
    const [rightSlide, setRightSlide] = useState(false)


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
        <div className='flex items-center place-content-center w-full bg-transparent '>
            <button
                className='flex w-12 h-12 bg-primary/black z-10 rounded-full place-content-center items-center border-[1px] border-secondary/gray border-opacity-20'
                onClick={leftClickHandler}
            >
                <SlArrowLeft className='text-secondary/gray' size={30} />
            </button>
            <div className='relative w-[900px] h-[200px] justify-center items-center transform duration-1000 overflow-hidden '>
                <button className={
                            `absolute flex transform -translate-x-[420px] space-x-[20px]
                            ${rightSlide && 'duration-1000 -translate-x-[201px]'}  
                            ${leftSlide && 'duration-1000 -translate-x-[640px]'}
                        `}>
                    {featuredServicesArray?.map((item, index) => (
                        <ServiceCard small={true} key={index} item={item}/>
                    ))}
                </button>
            </div>
            <button
                className='flex w-12 h-12 bg-primary/black z-10 rounded-full place-content-center items-center border-[1px] border-secondary/gray border-opacity-20'
                onClick={rightClickHandler}
            >
                <SlArrowRight className='text-secondary/gray' size={30} />
            </button>

        </div>
    )
}

export default Carousel