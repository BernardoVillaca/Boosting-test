import React, { useContext, useEffect } from 'react'
import { ServicePageContext } from '../context/service-page.context'
import ServiceTabContainer from './serviceTabContainer'


const StartRatingSlideBar = ({ service }) => {
    const { startRating, setStartRating } = useContext(ServicePageContext);
    const { startRatingSlideBar } = service
    const { startRatingMin, startRatingMax } = startRatingSlideBar;


    useEffect(() => setStartRating(1500), [])

    return (
        <ServiceTabContainer tabName={'Start Rating'}>
            {/* silder container */}
            <div className='flex flex-col space-y-4'>
                <input
                    className='flex px-3 h-8 w-16 rounded-md place-content-center items-center  bg-primary/purple outline-none '
                    type='number'
                    min={startRatingMin}
                    max={startRatingMax}
                    onChange={(e) => {
                        if (startRating > startRatingMax) return setStartRating(startRatingMax)
                        if (startRating < startRatingMin) return setStartRating(startRatingMin)
                        setStartRating(e.target.value)
                    }}

                    value={startRating}
                />

                <input
                    className='w-full inputRange accent-primary/purple'
                    onChange={(e) => setStartRating(e.target.value)}
                    type='range'
                    value={startRating}
                    min={startRatingMin}
                    max={startRatingMax}
                />
            </div>
        </ServiceTabContainer>

    )
}

export default StartRatingSlideBar