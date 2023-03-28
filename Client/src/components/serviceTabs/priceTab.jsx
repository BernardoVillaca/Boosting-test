import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/appContext';
import { ServicePageContext } from '../context/service-page.context';
import { calculateFinalPrice } from '../../helpers/calculateFinalPrice';
import AddToCartButton from '../buttons/AddToCartButton';
import AddNotes from '../addNotes';
import { createItemToAdd } from '../../helpers/createItemToAdd';

const PriceTab = ({ service }) => {
    const {
        hours, region, notes, resourceAmount, startRating,
        coachLvl, checked, currentRating,
        desiredRating, wowClass, spec, classIcon,
        faction, boosterString, setMessage, message
    } = useContext(ServicePageContext);
    const { addItemToCart, cartItems } = useContext(AppContext);
    
    const { id, serviceName, serviceImage, resourceSlideBar } = service;

    const { max } = resourceSlideBar || {};

    const finalPrice = calculateFinalPrice(service).toFixed(2);

    const messageEffect = (message) => {
        setMessage(message)
        setTimeout(() => {
            setMessage('');
        }, 2000);
    };

    const onClickHandler = () => {
        if (spec === null) {
            messageEffect('Fill with your class and spec to proceed!!')
            return
        };

        const itemToAdd = createItemToAdd(
            id, serviceName, serviceImage, hours, 
            region, notes, resourceAmount, startRating,
            coachLvl, checked, currentRating,
            desiredRating, wowClass, spec, classIcon,
            faction, boosterString, finalPrice);
     
        if (cartItems.some(item => item.purchased_item_id === itemToAdd.purchased_item_id)) messageEffect('Item updated!!');
        addItemToCart(itemToAdd);
        return
    };

    return (
        <div className='flex flex-col '>
            <div className='flex h-[100px] flex-row justify-between border-b-[1px] border-opacity-20 border-secondary/gray items-center'>
                <div className='h-full w-32 flex flex-col pl-3 items-start place-content-between py-2'>
                    <span className='text-yellowish/white text-3xl font-semibold'>${finalPrice}</span>
                    <AddNotes />
                </div>
                <button className='h-8 w-16 '></button>
                <div className='flex flex-col pr-3'>
                    {resourceSlideBar ? (
                        <>
                            <span className='text-3xl ml-8 text-custom-green'>{`${resourceAmount < max / 2 ? '' : resourceAmount >= max / 2 && resourceAmount < max ? '5%' : resourceAmount == max ? '10%' : '10%'}`}</span>
                            <span className='ml-8 text-sm text-custom-green'>{`${resourceAmount < max / 2 ? '' : 'discount applied!'}`}</span>
                        </>
                    ) : (
                        <>
                            <span className='text-3xl ml-8 text-custom-green'>{`${hours < 5 ? '' : hours >= 5 && hours < 10 ? '5%' : hours == 10 ? '10%' : '10%'}`}</span>
                            <span className='ml-8 text-sm text-custom-green'>{`${hours < 5 ? '' : 'discount applied!'}`}</span>
                        </>
                    )}
                </div>
            </div>
            {/*button container*/}
            <div className='flex flex-col place-content-center items-center'>
                <AddToCartButton onClickHandler={onClickHandler} />
                <span className={`h-6 ${message === 'Item updated!!' ? 'text-white' : 'text-custom-red'}`}>{message}</span>
            </div>
        </div>
    )
}
export default PriceTab;