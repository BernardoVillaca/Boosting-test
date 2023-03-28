import React from 'react'
import { BiChevronsDown, BiChevronsUp } from "react-icons/bi";

const Arrow = ({descendantSearch}) => {
    
      return (
    <>
        {(descendantSearch === true) ? 
            <BiChevronsUp/> :
            <BiChevronsDown/>
        }
    </>
    
 )
}

export default Arrow