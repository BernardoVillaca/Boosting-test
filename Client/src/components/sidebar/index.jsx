import { getCollectionDocuments } from '../../utils/firebase.utils';
import { useEffect, useState } from 'react';
import MenuItems from './menuItems';
import wowLogo from '../../assets/wowLogo.png'
import { useQuery } from '@tanstack/react-query';
import { useFetchWithLocalStorage } from '../../hooks/useFetch';


export const Sidebar = () => {

    const categories = useFetchWithLocalStorage({ key: 'Categories', fn: () => getCollectionDocuments('Categories') })

    return (
        <>
            {categories &&
                <div className='bg-primary/black fixed w-48 mt-[5.5rem] ml-24 flex flex-col z-20 border-transparet rounded-xl overflow-hidden opacity-90 shadow' >
                    <div className='flex justify-center items-center border-b-[1px] border-secondary-gray'>
                        <img className='h-5 w-5 mr-2 opacity-70' src={wowLogo} />
                        <h1 className='text-center py-2 cursor-default select-none text-white'>World of Warcraft</h1>
                    </div>
                    <div className='flex flex-col'>
                        {categories?.map((item, index) => {
                            return <MenuItems item={item} key={index} index={index} lastIndex={categories.length - 1} />
                        })}
                    </div>
                </div>
            }
        </>
    )

}






