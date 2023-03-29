import React from 'react'

const MiddleContainer = ({ children, otherProps, center }) => {
    return (
        <div className='w-3/5 h-full border-b-[1px] border-light-purple border-opacity-20 py-8 pr-8'>
            <div className='h-16 w-full bg-transparent' />
            {/* navbar filler */}
            <div className={`flex flex-col ${otherProps} ${center && 'place-content-center items-center'}`}>
                {children}
            </div>
        </div>
    )
}

export default MiddleContainer