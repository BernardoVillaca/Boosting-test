import React, { useContext, useEffect } from 'react'
import { ServicePageContext } from '../context/service-page.context'
import ServiceTabContainer from './serviceTabContainer'

const ResourceSlideBar = ({service}) => {
    const { resourceAmount, setResourceAmount } = useContext(ServicePageContext);
    const { resourceSlideBar } = service;
    const { name, min, max, step } = resourceSlideBar
    
    useEffect(() => setResourceAmount(max/2), [])


    return (
        <ServiceTabContainer tabName={name}>
            <div className='flex flex-col space-y-4'>
                <div className='flex h-8 w-16 rounded-md place-content-center items-center  bg-primary/purple '>
                    <span>{resourceAmount}</span>
                </div>
                <input
                    className='w-full inputRange accent-primary/purple'
                    onChange={(e) => setResourceAmount(e.target.value)}
                    type='range'
                    value={resourceAmount}
                    min={min}
                    max={max}
                    step={step}
                />
                <div className=' text-xs text-yellowish/white mb-3'>
                    {`Add ${resourceAmount < max / 2 ? max / 2 - resourceAmount : resourceAmount > max ? '0' :
                        max - resourceAmount} more ${name.toLowerCase()} for a ${resourceAmount < max / 2 ? '5' :
                            resourceAmount > max / 2 ? '10' : '10'}% discount`}
                </div>
            </div>
        </ServiceTabContainer>

    )
}

export default ResourceSlideBar