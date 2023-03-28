import { useNavigate } from "react-router-dom";
import React from 'react'
import CartItem from "../cartItem";
import { useContext } from "react";
import { AppContext } from "../../context/appContext";
import CustomButton from "../../buttons/customButton";



const CartDropdown = () => {
  const { cartItems, isCartOpen, setIsCartOpen, cartTotalValue } = useContext(AppContext);
  const navigate = useNavigate();
  const toggleIsCartOpen = () => {
    setIsCartOpen(false)
    document.body.style.overflow = ""
  }

  const goToCheckoutHandler = () => {
    document.body.style.overflow = ""
    navigate('/checkout');
    setIsCartOpen(false);
  };

  return (
    <div className={`absolute flex w-screen z-30 h-screen place-content-end ${isCartOpen ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute h-full w-full bg-black opacity-30 ${isCartOpen ? 'flex ' : 'hidden'}`}
        onClick={toggleIsCartOpen}
      >
      </div>
      <div className={`absolute top-16 flex flex-col p-9 bg-primary/black w-[32rem] content-end transition-transform ease-in-out duration-500  ${isCartOpen ? '' : 'translate-x-full'}`}>
        {/* items container */}
        <div className='border-[1px] border-secondary/gray border-opacity-20 h-[32rem] overflow overflow-y-auto overlay'>
          {cartItems.map((item) => (
            <CartItem key={item.purchased_item_id} cartItem={item} />
          ))}
        </div>
        {/* price/button containers */}
        <div className="flex flex-col h-72">
          {/* price container */}
          <div className="h-1/2 border-opacity-20 border-[1px] border-t-0 border-secondary/gray flex flex-row justify-between place-content-center items-center px-10">
            <span className="text-3xl text-white">Item(s)</span>
            <span className="text-3xl font-semibold text-white">${cartTotalValue.toFixed(2)}</span>
          </div>
          {/* button container */}
          <div className="border-secondary/gray border-[1px] border-opacity-20 border-t-0 h-1/2 flex place-content-center items-center ">
            <CustomButton
              toggle={true}
              size={'h-1/2 w-3/4'}
              hover={true}
              onClick={goToCheckoutHandler}
            >
              Secure checkout
            </CustomButton>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CartDropdown;