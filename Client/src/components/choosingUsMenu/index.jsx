import React, { useContext, useEffect, useRef } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { AppContext } from '../context/appContext';
import { useLocation } from 'react-router-dom'
import useOnClickOutside from '../../hooks/useOnClickOutside';

const ChoosingUs = ({aboutUsButtonRef}) => {
  const {isMenuOpen, setIsMenuOpen} = useContext(AppContext)
  const path = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    setIsMenuOpen(false)
  },[path])

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  useOnClickOutside(menuRef, closeMenu, aboutUsButtonRef);

  return (
    <div ref={menuRef} className={`flex absolute h-[26.2rem] w-full  p-16 bg-secondary/blue  transform duration-500  translate-y-0 ${!isMenuOpen && '-translate-y-[26.2rem]'} `}>
      <div className='w-1/5' />
      <div className='w-3/5 flex flex-col '>
        <button
          className='flex h-16 w-full place-content-end items-center'
          onClick={() => setIsMenuOpen(false)}
        >
          <AiOutlineClose className='text-white' size={25} />
        </button>
        <div className='flex h-full'>
          <div className='border h-full w-1/4'>
          </div>
          <div className='border h-full w-1/4'>
          </div>
          <div className='border h-full w-1/4'>
          </div>
          <div className='border h-full w-1/4'>
          </div>
        </div>
      </div>
      <div className='w-1/5' />
    </div>
  )
}

export default ChoosingUs