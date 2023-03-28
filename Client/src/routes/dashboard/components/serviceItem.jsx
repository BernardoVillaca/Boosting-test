import React, { useState } from 'react'
import { BiCopyAlt } from "react-icons/bi";
import TextSliceButton from '../../../components/buttons/TextSliceButton';
import { convertTimestamp } from '../../../helpers/convertTimeStamp';


const ServiceItem = ({ servicesItem, tabs }) => {
    const { customer_id, name, price, serviceInfo, servicePurchasedDate, boostersAssignedDate, service_id, status, customer_discord } = servicesItem;
    const { coachLvl, currentRating, desiredRating, hoursAmount, region, extraOptionsSelected } = serviceInfo;


    const [customerIdEffect, setCustomerIdEffect] = useState(false);
   
    return (
        <div className='flex justify-between w-full h-20 border-t-2 items-center'>
            {/* Service Name */}
            <div className={`flex ${tabs[0].tabSize} h-full items-center place-content-center border-r-2`}>
                {name}
            </div>
            {/*  Service Id */}
            <div className={`flex ${tabs[1].tabSize} h-full items-center place-content-center border-r-2`}>
                {service_id}
            </div>
            {/*  Customer Id */}
            <div className={`relative flex ${tabs[2].tabSize} h-full items-center place-content-center border-r-2`}>
                {customerIdEffect && <span
                    className='absolute text-xs right-0 top-3'
                >
                    copied
                </span>}
                <button className={`${customerIdEffect && "animate-wiggle"}`}
                    onClick={() => {
                        navigator.clipboard.writeText(customer_id)
                        setCustomerIdEffect(true);
                    }}
                    onAnimationEnd={() => setCustomerIdEffect(false)}
                >
                    <BiCopyAlt size={30} />
                </button>
            </div>
            {/*  Service Info */}
            <div className={`flex flex-col ${tabs[3].tabSize} h-full  text-start  place-content-center text-sm border-r-2`}>
                <div className='flex w-full justify-between px-2'>
                    <span>{region} // {coachLvl}</span>
                    {currentRating !== null &&
                        <span>{currentRating}-{desiredRating}</span>
                    }
                    {hoursAmount !== null &&
                        <span>{hoursAmount} hour(s)</span>
                    }
                </div>
                <div className='flex flex-col px-2'>
                    {extraOptionsSelected &&
                        Object.keys(extraOptionsSelected).map((item, index) =>
                            <span key={index}>{item}</span>
                        )
                    }
                </div>
            </div>
            {/*  Customer disc */}
            <div className={`flex relative ${tabs[4].tabSize} h-full items-center place-content-center border-r-2 overflow-hidden`}>
                <TextSliceButton text={customer_discord} slice={6} />
            </div>
            {/*  Price */}
            <div className={`flex ${tabs[5].tabSize} h-full items-center place-content-center border-r-2`}>
                ${price.toFixed(2)}
            </div>
            {/* Boosters Assigned */}
            <div className={`flex ${tabs[6].tabSize} h-full items-center place-content-center border-r-2`}>
                {boostersAssignedDate !== undefined &&
                    convertTimestamp(boostersAssignedDate)
                }
            </div>
            {/*  Purchase Date */}
            <div className={`flex ${tabs[7].tabSize} h-full items-center place-content-center border-r-2`}>
                {servicePurchasedDate !== undefined &&
                    convertTimestamp(servicePurchasedDate)}
            </div >
            {/*  Status */}
            <div className={`flex ${tabs[8].tabSize} h-full items-center place-content-center border-r-2`}>
                {status}
            </div>
        </div>
    )
}

export default ServiceItem