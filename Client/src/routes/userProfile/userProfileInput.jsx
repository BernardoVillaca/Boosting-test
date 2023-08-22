import React, { useState } from 'react'
import { AiOutlineCheck } from "react-icons/ai";



const UserProfileInput = ({ isEditEnabled, error, initialValue, onChange, onFocus, effect, setEffect, label }) => {

    return (
        <div className='relative border-b-[1px] border-primary/black border-opacity-20 pb-2 '>
            <div className='flex flex-col md:flex-row  w-full md:justify-between  '>
                <span className='text-white '>{label}:</span>
                <input
                    className={` text-start md:text-end text-secondary/gray border-[1px] bg-transparent outline-primary/black ${isEditEnabled === true ? 'border-primary/black border-opacity-50 rounded-md' : 'border-transparent'} ${error !== null && 'border-custom-red'} ${effect && "animate-textToGreen"}`}
                    disabled={isEditEnabled === false}
                    value={initialValue}
                    onChange={onChange}
                    onFocus={onFocus}
                    onAnimationEnd={() => setEffect(false)}
                />
            </div>
            {effect &&
                <AiOutlineCheck className='absolute md:right-3 md:top-1 top-0 left-12' color={'00b200'} size={20} />
            }
            <span className='text-end text-custom-red text-sm'>{error !== null && error}</span>
        </div>
    )
}

export default UserProfileInput