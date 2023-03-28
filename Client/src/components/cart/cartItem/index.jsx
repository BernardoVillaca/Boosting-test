import { BiTrash } from "react-icons/bi";
import React from 'react'
import { useContext } from "react";
import { AppContext } from "../../context/appContext";
import CustomButton from "../../buttons/customButton";


const CartItem = ({ cartItem, orderPlaced }) => {
  const { name, price, serviceInfo, serviceImage } = cartItem;
  const { region, currentRating, desiredRating, hours, extraOptionsSelected, coachLvl, customerRole, resourceAmount, startRating } = serviceInfo;
  const { classIcon, spec } = customerRole;
  const { removeItemFromCart } = useContext(AppContext);


  return (
    <div className='flex flex-col w-[27.4rem] border-b-[1px]  border-secondary/gray border-opacity-20 h-[8rem] text-white'>
      <div className='flex justify-between px-3 items-end h-1/4 items-top '>
        <span >{name}</span>
        {resourceAmount && <span >{resourceAmount} points</span>}
        {hours && <span >{`${hours} ${hours == 1 ? 'hour' : 'hours'}`}</span>}
        {desiredRating && <span >{currentRating}-{desiredRating}</span>}
        {startRating && <span>{startRating}cr start</span>}
        <span>${price}</span>
      </div>
      <div className="flex">
        <div className='flex w-1/4 place-content-center items-center'>
          <div className='flex relative w-16 h-16 m-4 border-[1px] border-secondary/gray border-opacity-20'>
            <img src={serviceImage} />
          </div>
        </div>
        <div className='flex flex-col w-3/4 '>
          {/* name/specifics/price */}
          {/* options */}
          <div className='flex flex-row justify-between mt-1'>
            <div className='flex flex-col text-sm pl-3'>
              <li className="space-x-2">
                {region && <span>{region}</span>}
                {coachLvl && <span>{coachLvl} player</span>}
              </li>
              {Object.keys(extraOptionsSelected).map((item, index) =>
                <li key={index}>{item}</li>
              )}
            </div>
            <div className='flex h-full flex-col items-end justify-end p-2'>
              <div className="flex justify-center pb-1">
                <img className="w-8 h-8 m-1 rounded-md" src={classIcon} />
                <img className="w-8 h-8p m-1 rounded-md" src={spec.specIcon} />
              </div>
              <CustomButton
                gray={true}
                size={'h-8 w-24'}
                otherProps={'rounded-xl flex'}
                hover={true}
                onClick={() => removeItemFromCart(cartItem)}
                disabled={orderPlaced}
              >
                <BiTrash className="text-black" />
                <span className="text-black">Remove</span>
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem