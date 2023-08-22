import React from 'react'

const LeftContainer = ({children}) => {
  return (
    <div className='hidden md:flex md:w-1/5 '>
        {children}
     
    </div>
  )
}

export default LeftContainer