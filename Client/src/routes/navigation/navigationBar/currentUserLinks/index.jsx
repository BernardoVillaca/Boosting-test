import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useOnHoverOutside } from '../../../../hooks/useOnHoverOutside';
import UserDropdown from './userDropdown';
import { BsCardChecklist } from "react-icons/bs";
import { signOutUser } from '../../../../utils/firebase.utils';

const CurrentUserLinks = ({ customClaims, currentUser, setUserInfo }) => {
    const [isUserDropDownOpen, setIsUserDropDownOpen] = useState(false)
    const navigate = useNavigate()
    const dropdownRef = useRef(null)
    
    
    const handleSignout = () => {
        signOutUser()
        setUserInfo(null)
        localStorage.clear()
        navigate('/')
      }

    const closeHoverMenu = () => {
        setIsUserDropDownOpen(false);
    };

    useOnHoverOutside(dropdownRef, closeHoverMenu);
    return (
        <div className='flex space-x-4'>
            {customClaims?.booster &&
                <Link
                    className='hidden md:flex items-center hover:underline text-primary/purple font-heading'
                    to='/booster-area?search=servicePurchasedDate'
                >
                    Booster Area
                </Link>
            }
            <Link
                className='hidden md:flex items-center hover:underline text-primary/purple font-heading space-x-1'
                to='/my-services?search=servicePurchasedDate'
            >
                <BsCardChecklist size={20} />
                <span>My Services</span>
            </Link>
           
            <div ref={dropdownRef} className='relative flex items-center'>
                <button
                    className=' h-8 w-8 rounded-full overflow-hidden '
                    onMouseOver={() => setIsUserDropDownOpen(true)}
                >
                    <img src={currentUser.photoURL ? currentUser.photoURL : 'https://i.pinimg.com/564x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'}></img>
                </button>
                {isUserDropDownOpen &&
                    <UserDropdown handleSignout={handleSignout} setIsUserDropDownOpen={setIsUserDropDownOpen} />
                }
            </div>
        </div>
    )
}

export default CurrentUserLinks