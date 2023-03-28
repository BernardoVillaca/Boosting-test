import React from 'react'
import { convertTimestamp } from '../../helpers/convertTimeStamp';
import { AiOutlineCheck } from "react-icons/ai";
import TextSliceButton from '../../components/buttons/TextSliceButton';


const MyServicesItem = ({ serviceItem, searchTabs, boosterArea }) => {
    const { name, serviceInfo, price, status, service_id, boostersAssigned, servicePurchasedDate, customer_discord } = serviceItem || {}
    const { coachLvl, currentRating, desiredRating, hoursAmount, region, extraOptionsSelected } = serviceInfo || {}

    return (
        <div className='h-24 border-t-[1px] border-secondary/gray border-opacity-20 place-content-center items-center text-white'>
            <div className='flex flex-row h-24'>
                {/* service id */}
                <div className={`flex ${searchTabs[0].searchTabSize} h-full border-x-[1px] border-secondary/gray border-opacity-20 text-center items-center place-content-center`}>
                    <TextSliceButton text={service_id} slice={12}/>
                </div>
                {/* service */}
                <div className={`flex ${searchTabs[1].searchTabSize} h-full border-r-[1px] border-secondary/gray border-opacity-20 items-center`}>
                    <span className='w-full text-center'>{name}</span>
                </div>
                {/* service information */}
                <div className={`flex flex-col ${searchTabs[2].searchTabSize} h-full text-sm border-r-[1px] border-secondary/gray border-opacity-20 place-content-center`}>
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
                            )}
                    </div>
                </div>
                {/* price */}
                <div className={`flex ${searchTabs[3].searchTabSize} h-full items-center border-r-[1px] border-secondary/gray border-opacity-20`}>
                    <span className='w-full text-center text-2xl'>${price?.toFixed(2)}</span>
                </div>
                {/* purchased date */}
                <div className={`flex h-full ${searchTabs[4].searchTabSize} border-r-[1px] border-secondary/gray border-opacity-20 place-content-center items-center`}>
                    {servicePurchasedDate !== undefined &&
                        convertTimestamp(servicePurchasedDate)}
                </div>
                {/* booster assigned /customer disc */}
                {boosterArea ? (
                    <div className={`flex flex-col ${searchTabs[5].searchTabSize} h-full items-center place-content-center border-r-[1px] border-secondary/gray border-opacity-20 overflow-hidden`}>
                        {customer_discord !== null &&
                            <TextSliceButton text={customer_discord} slice={8} />
                        }
                    </div>
                ) : (
                    <div className={`flex flex-col ${searchTabs[5].searchTabSize} h-full items-center place-content-center border-r-[1px] border-secondary/gray border-opacity-20 overflow-hidden`}>
                        {boostersAssigned &&
                            boostersAssigned.map((item, index) =>
                                <TextSliceButton key={index} text={item.discord} slice={8} />
                            )}
                    </div>
                )}
                {/* status */}
                <div className={`flex ${searchTabs[6].searchTabSize} h-full place-content-center items-center`}>
                    {status === 'completed' ? (
                        <div className='flex items-center '>
                            <span className='text-custom-green'>{status}</span>
                            <AiOutlineCheck size={25} color={'#49BF7C'} />
                        </div>
                    ) : (
                        <span className='w-full text-center text-custom-red '>{status}</span>
                    )}

                </div>
            </div>
        </div >
    )
}

export default MyServicesItem