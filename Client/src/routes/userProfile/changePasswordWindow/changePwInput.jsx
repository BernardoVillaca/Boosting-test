import React from 'react'
import { AiOutlineCheck } from "react-icons/ai";


const ChangePWInput = ({ inputName, onChange, value, error, effect, confirmation }) => {

    return (
        <div className='flex flex-col w-full place-content-end '>
            <div className='relative flex flex-col md:flex-row md:space-x-4 justify-between md:pt-3 text-white'>
                <span>{inputName}</span>
                <input
                    className={`
                         pl-1 h-7 rounded-md bg-white border-[1px] border-secondary/gray text-black
                        ${confirmation === true && 'outline-custom-green'} 
                        ${error !== '' && 'outline-custom-red'} 
                        ${effect === true ? '' : 'outline-none'}
                    `}
                    type='password'
                    value={value}
                    onChange={onChange}
                    autoComplete="on"
                />
                {/* {confirmation === true &&
                    <AiOutlineCheck className='absolute right-2 top-4' color={'#49BF7C'} size={20} />
                } */}
            </div>
            <div className='flex w-full h-8 place-content-end '>
                {error !== '' && <span className='text-sm text-custom-red '>{error}</span>}
            </div>
        </div>
    )
}

export default ChangePWInput