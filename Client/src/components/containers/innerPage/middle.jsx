import React from 'react'

const MiddleContainer = ({ children, otherProps, center }) => {
    return (
        <div
            className={`flex flex-col border-b-[1px] border-light-purple border-opacity-20 ${otherProps} 
                        md:w-3/5 pt-[5rem]   xl:h-screen ${center && 'items-center '} `}
        >
            {children}
         </div>
    )
}

export default MiddleContainer