import React, { useState } from 'react'
import { useContext } from 'react';
import { BiCopyAlt, BiArrowFromTop } from "react-icons/bi";
import { DashboardContext } from '../../../components/context/dashboard.context';
import BoosterItem from './boosterItem';
import TextSliceButton from '../../../components/buttons/TextSliceButton';
import { axiosRequesthWithToken } from '../../../utils/api.utils';

const AssignServiceItem = ({ serviceItem }) => {
    const { boosters } = useContext(DashboardContext)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [selectedBooster, setSelectedBooster] = useState([])
    const [isAssigned, setIsAssigned] = useState(false)
    const [effect, setEffect] = useState(false);
    const { name, serviceInfo, price, customer_id, service_id, customer_discord } = serviceItem;
    const { coachLvl, currentRating, desiredRating, hoursAmount, region } = serviceInfo;

    const handleChild = (booster) => {
        let selecetedBoosterArray = [...selectedBooster]
        if (selecetedBoosterArray.includes(booster)) return setSelectedBooster(selecetedBoosterArray.filter(item => item.id !== booster.id))
        if (selecetedBoosterArray.length < 1) return setSelectedBooster([...selecetedBoosterArray, booster])
        if (selecetedBoosterArray.length === 1) {
            setSelectedBooster([...selecetedBoosterArray, booster])
            setDropdownOpen(false)
        }
    }

    const handleClick = async () => {
       const response = await axiosRequesthWithToken('assignBooster', {
            selectedBooster,
            serviceItem
        })
        if(response.data.message === 'Success! Booster has been assigned') return setIsAssigned(true)
        
    }

    return (
        <div className='flex justify-between w-full h-16 border-y-2 items-center'>
            {/* service name */}
            <div className='flex w-1/4 h-full items-center border-r-2'>
                <span className='w-full text-center'>{name}</span>
            </div>
            {/* service id */}
            <div className='flex w-1/4 h-full items-center border-r-2'>
                <span className='w-full text-center'>{service_id}</span>
            </div>
            {/* customer id */}
            <div className='relative flex w-32 h-full items-center place-content-center border-r-2'>
                {effect && <span
                    className='absolute text-xs right-0 top-3'
                >
                    copied
                </span>}
                <button className={`${effect && "animate-wiggle"}`}
                    onClick={() => {
                        navigator.clipboard.writeText(customer_id)
                        setEffect(true);
                    }}
                    onAnimationEnd={() => setEffect(false)}
                >
                    <BiCopyAlt size={30} />
                </button>
            </div>
            {/* service info */}
            <div className='flex flex-col w-1/4 h-full items-center text-center text-sm border-r-2'>
                <div className='h-1/2 w-full '>
                    <span>{region} // {coachLvl}</span>
                </div>
                <div className='h-1/2 w-full'>
                    {currentRating !== null ?
                        <span>{currentRating}-{desiredRating}</span> :
                        null
                    }
                    {hoursAmount !== null ?
                        <span className=''>{hoursAmount} hour(s)</span> :
                        null
                    }
                </div>
            </div>
            {/* customer disc */}
            <div className='flex h-full w-48 place-content-center items-center border-r-2 overflow-hidden'>
                <TextSliceButton text={customer_discord} slice={8} />
            </div>
            {/* price */}
            <div className='flex h-full w-48 items-center border-r-2'>
                <span className='w-full text-center text-2xl'>${price.toFixed(2)}</span>
            </div>
            {/* select booster */}
            <div className='relative flex flex-col w-1/4 h-full items-center'>
                <div className=' flex w-full h-1/2 pl-10 border-b-2 border-r-2 place-content-between items-center'>
                    <span>Select Boosters:</span>
                    <button
                        disabled={isAssigned}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <BiArrowFromTop />
                    </button>
                    {dropdownOpen &&
                        <div className=' absolute w-1/2 h-32 bg-white right-0 top-7 z-20 overflow-auto border-2'>
                            {boosters.map((item) => (
                                <BoosterItem booster={item} key={item.id} handleChild={handleChild} selectedBooster={selectedBooster} />
                            ))}
                        </div>
                    }
                </div>
                <div className='flex w-full h-1/2 items-center place-content-between p-2'>
                    <div className='flex'>
                        {selectedBooster.map((booster) => (
                            <div key={booster?.id} className='rounded-md p-1 mx-1 text-sm bg-teal-300'>
                                <span className='pointer-events-none'>{booster?.displayName.length > 6 ? ` ${booster?.displayName.slice('', 6)}... ` : booster?.displayName}</span>
                                <button
                                    className='px-2'
                                    onClick={() => {
                                        const newArray = selectedBooster.filter(item => item.id !== booster.id)
                                        setSelectedBooster(newArray)
                                    }}
                                    disabled={isAssigned}
                                >
                                    x
                                </button>
                            </div>
                        ))}
                    </div>
                    {selectedBooster.length !== 0 &&
                        <button
                            className={`bg-blue-300  rounded-md px-2 ${isAssigned === true ? 'hover:none bg-green-300' : 'hover:bg-blue-400'}`}
                            onClick={handleClick}
                            disabled={isAssigned}
                        >
                            {`${isAssigned === true ? 'Assigned' : 'Assign'}`}
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default AssignServiceItem