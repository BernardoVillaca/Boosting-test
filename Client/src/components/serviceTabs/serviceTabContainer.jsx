import React from 'react'

const ServiceTabContainer = ({children, tabName, titleWidht}) => {
    return (
        <div className='flex place items-center p-3 space-x-3 border-b-[1px] border-secondary/gray border-opacity-20 cursor-default select-none'>
            <span className={`font-semibold ${titleWidht === undefined ? 'w-[4.5rem] ' : titleWidht } text-white`}>{tabName}</span>
            {children}
        </div>
    )
}

export default ServiceTabContainer