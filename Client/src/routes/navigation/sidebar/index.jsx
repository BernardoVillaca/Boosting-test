import MenuItems from './menuItems';
import wowLogo from '../../../assets/wowLogo.png'
import { useFetchWithLocalStorage } from '../../../hooks/useFetch';
import { getCollectionDocuments } from '../../../utils/firebase.utils';
import { useContext, useEffect, useState } from 'react';
import { BiCaretRight, BiCaretLeft } from "react-icons/bi";
import { AppContext } from '../../../components/context/appContext';


export const Sidebar = () => {
    const { isCartOpen, setIsCartOpen, isMobileMenuOpen, setIsMobileMenuOpen } = useContext(AppContext);
    const categories = useFetchWithLocalStorage({ key: 'Categories', fn: () => getCollectionDocuments('Categories') })


    const handleMobileMenuClick = () => {
        if (isCartOpen) setIsCartOpen(false)
        setIsMobileMenuOpen(!isMobileMenuOpen)

    }

    return (
        <>
            {categories &&
                <div className='bg-primary/black fixed z-20 border-transparet rounded-r-md shadow
                                md:w-48 md:mt-[5.5rem] mt-[4.5rem] md:ml-4 lg:ml-[3rem] xl:ml-24  md:flex flex-col md:rounded-xl  md:opacity-90 ' >
                    <div className='flex  items-center border-b-[1px] border-secondary-gray space-x-2 pr-4'>
                        <img className='h-5 w-5 opacity-70 md:ml-4 ml-2 my-2' src={wowLogo} />
                        {isMobileMenuOpen && <h1 className={`md:text-center text-xs md:text-base  cursor-default select-none text-white md:hidden`}>World of Warcraft</h1>}
                        <h1 className={`md:text-center text-xs md:text-base  cursor-default select-none text-white hidden md:flex`}>World of Warcraft</h1>
                    </div>
                    <div className='flex flex-col'>
                        {categories?.map((item, index) => {
                            return <MenuItems item={item} key={index} index={index} lastIndex={categories.length - 1} isMobileMenuOpen={isMobileMenuOpen} />
                        })}
                    </div>
                    <button
                        onClick={handleMobileMenuClick}
                        className={`
                                    absolute flex h-4 w-4 rounded-full bg-primary/black border-[1px] border-secondary/gray border-opacity-50 
                                    place-content-center items-center top-3 md:hidden
                                    ${isMobileMenuOpen ? ' left-[8.7rem]' : ' left-[2.1rem]'}
                        `}
                    >
                        {isMobileMenuOpen ? (
                            <BiCaretLeft className='text-white' />
                        ) : (

                            <BiCaretRight className='text-white' />
                        )}
                    </button>
                </div>
            }
        </>
    )

}






