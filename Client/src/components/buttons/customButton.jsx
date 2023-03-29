import React from 'react'

const CustomButton = ({ size, onClick, disabled, children, otherProps, hover, toggle, gray }) => {
    return (
        <button
            className={` select-none 
                ${size} place-content-center items-center  rounded-md 
                ${toggle ? 'bg-primary/purple' : 'bg-secondary/gray'} 
                ${hover ? 'hover:bg-secondary/light-purple' : ''} 
                ${gray ? 'hover:bg-gray-200' : ''} 
                ${otherProps}
            `}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default CustomButton