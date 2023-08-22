import { IoCart } from "react-icons/io5";
import React, { useContext } from 'react'
import { AppContext } from "../../context/appContext";




const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount, isMenuOpen, setIsMenuOpen, isMobileMenuOpen, setIsMobileMenuOpen } = useContext(AppContext)

  const toggleIsCartOpen = () => {
    if (isMenuOpen) setIsMenuOpen(false)
    if (isMobileMenuOpen) setIsMobileMenuOpen(false)
    if (isCartOpen) {
      document.body.style.overflow = ""
      return setIsCartOpen(false)
    }
    setIsCartOpen(true)
    document.body.style.overflow = "hidden"
  }


  return (
    <button className='relative flex w-16 h-16 place-content-center items-center' onClick={toggleIsCartOpen}>
      <IoCart className="text-secondary/gray" size={30} />
      <div className='flex absolute right-3 top-4 rounded-full bg-primary/purple w-4 h-4 top right p-0 m-0   text-sm items-center place-content-center'>
        <p className='cursor-default select-none text-secondary/gray'>{cartCount}</p>
      </div>
    </button>
  );
};

export default CartIcon;