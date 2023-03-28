import React, { useState } from 'react'
import { AiOutlineCheck } from "react-icons/ai";



const UserProfileInput = ({ isEditEnabled, error, initialValue, onChange, onFocus, effect, setEffect, label}) => {
   
    return (
        <div className='flex flex-col h-16 w-full pl-3 relative'>
            <div className='flex w-full justify-between h-8 items-center'>
                <span className='text-white'>{label}:</span>
                <input
                    className={`w-48 pl-2 text-white border-[1px] bg-transparent outline-primary/black ${isEditEnabled === true ? 'border-primary/black border-opacity-50 rounded-md' : 'border-transparent' } ${error !== null && 'border-custom-red'} ${effect && "animate-textToGreen"}`}
                    disabled={isEditEnabled === false}
                    value={initialValue}
                    onChange={onChange}
                    onFocus={onFocus}
                    onAnimationEnd={() => setEffect(false)}
                />
            </div>
            {effect &&
                <AiOutlineCheck className='absolute right-3 top-1' color={'00b200'} size={20} />
            }
            <span className='text-end text-custom-red text-sm'>{error !== null && error}</span>
        </div>
    )
}

export default UserProfileInput