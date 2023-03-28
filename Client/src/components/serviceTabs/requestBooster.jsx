import React, { useContext, useState } from 'react'
import { ServicePageContext } from '../context/service-page.context'
import ServiceTabContainer from './serviceTabContainer'
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";


const RequestBooster = ({titleWidht}) => {
  const { boosterString, setBoosterString } = useContext(ServicePageContext)
  const [isInputLocked, setIsInputLocked] = useState(false)
  

  const handleSubmit = (e) => {
    e.preventDefault()
    if(boosterString === '') return
    setIsInputLocked(true)
  }
  
  return (
    <ServiceTabContainer tabName={'Request booster'} titleWidht={titleWidht}>
      <form
        className='flex bg-secondary/gray items-center rounded-md'
        onSubmit={handleSubmit}

      >
        <input
          className={`w-32 h-7 rounded-md px-2 bg-secondary/gray outline-none border-0 ${isInputLocked ? 'text-primary/purple' : 'text-black'}`}
          disabled={isInputLocked}
          onChange={(e) => setBoosterString(e.target.value)}
          value={boosterString}
        />
        <button
          className={`flex h-7 w-10 bg-primary/purple ${isInputLocked ? '' : 'hover:bg-secondary/light-purple'} rounded-r-md place-content-center items-center text-center`}
          disabled={isInputLocked}
        >
          {isInputLocked ? <AiOutlineCheck className='h-full ' size={20} color={'white'} /> : 'Add'}
        </button>
      </form>
      <button
        className='h-7 w-7'
        onClick={() => setIsInputLocked(false)}
      >
        {isInputLocked && <AiOutlineClose className='text-white' />}
      </button>
    </ServiceTabContainer>
  )
}

export default RequestBooster