import React, { useContext, useEffect, useState } from 'react'
import { ServicePageContext } from '../context/service-page.context'
import ServiceTabContainer from './serviceTabContainer'

const HoursSlideBar = () => {
    const { hours, setHours } = useContext(ServicePageContext)

    useEffect(() => setHours(1),[])

    const onChangeHandler = (e) => {
        if (e.target.value >= 10) {
            e.target.select()
            return setHours(10)
        }
        if (e.target.value < 1) {
            e.target.select()
            return setHours(1)
        }
        e.target.select()
        setHours(+e.target.value)
    }

    return (
        <ServiceTabContainer tabName={'Hours'}>
            {/* silder container */}
            <div className='flex flex-col space-y-4'>
                <input
                    type='number'
                    min={1}
                    max={10}
                    className='h-8 w-8 rounded-lg text-center outline-none bg-primary/purple'
                    onChange={onChangeHandler}
                    value={hours < 1 ? 1 : hours > 10 ? 10 : hours}
                >
                </input>
                <input
                    className='w-full inputRange accent-primary/purple'
                    onChange={(e) => setHours(+e.target.value)}
                    type='range'
                    value={hours < 1 ? 1 : hours > 10 ? 10 : hours}
                    min={1}
                    max={10}
                    step={1}
                />
                <div className=' text-xs text-secondary/gray mb-3'>{`Add ${hours < 5 ? 5 - hours : hours > 10 ? '0' : 10 - hours} more hours for a ${hours < 5 ? '5' : hours > 10 ? '10' : '10'}% discount`}</div>
            </div>
        </ServiceTabContainer>

    )
}

export default HoursSlideBar