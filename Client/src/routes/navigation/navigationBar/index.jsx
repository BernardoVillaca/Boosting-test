import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOutUser } from '../../../utils/firebase.utils';
import { BsCardChecklist } from "react-icons/bs";
import CartIcon from '../../../components/cart/cartIcon';
import { useOnHoverOutside } from '../../../hooks/useOnHoverOutside';
import CartDropdown from '../../../components/cart/cartDropdown';
import SearchBar from './searchBar';
import { AppContext } from '../../../components/context/appContext';
import ChoosingUs from '../../../components/choosingUsMenu';


const NavigationBar = ({ currentUser, dropdownRef, customClaims, setUserInfo, onUpdateRef }) => {
  const [isUserDropDownOpen, setIsUserDropDownOpen] = useState(false)
  const { isCartOpen, isMenuOpen, setIsCartOpen, setIsMenuOpen } = useContext(AppContext)
  const navigate = useNavigate()
  const aboutUsButtonRef = useRef(null);


  const showMenu = () => {
    if (isCartOpen) setIsCartOpen(false)
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closeHoverMenu = () => {
    setIsUserDropDownOpen(false);
  };

  useOnHoverOutside(dropdownRef, closeHoverMenu);


  return (
    <div className="flex fixed w-full h-16 z-20">
      <CartDropdown />
      <ChoosingUs aboutUsButtonRef={aboutUsButtonRef} />
      <div className="relative flex w-full h-16 pl-8">
        <div className="absolute inset-0 bg-primary/black opacity-95"></div>
        <div className="w-48 flex h-16 place-content-center items-center z-20">
          <Link to="/">
            <img src={"/logos/logoVariation-01.png"} />
          </Link>
        </div>
        <div className="flex items-center w-full justify-between p-8 z-20">
          <div className="flex">
            <button
              ref={aboutUsButtonRef}
              className="hover:underline pl-2 pr-12 text-primary/purple font-heading"
              onClick={showMenu}
            >
              About us?
            </button>
            <SearchBar />
          </div>
          <div className="relative flex items-center place-content-center">
            {currentUser ? (
              <div className='flex flex-row'>
                {customClaims?.booster &&
                  <Link
                    className='flex items-center hover:underline text-primary/purple font-heading'
                    to='/booster-area?search=servicePurchasedDate'
                  >
                    Booster Area
                  </Link>
                }
                <Link
                  className='flex flex-row items-center mx-3 hover:underline text-primary/purple font-heading'
                  to='/my-services?search=servicePurchasedDate'
                >
                  <BsCardChecklist size={20} className='mx-1' />
                  My Services
                </Link>
                <div ref={dropdownRef}>
                  <button
                    className='h-8 w-8 rounded-full overflow-hidden mx-2 mt-2'
                    onMouseOver={() => setIsUserDropDownOpen(true)}
                  >
                    <img src={currentUser.photoURL ? currentUser.photoURL : 'https://i.pinimg.com/564x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'}></img>
                  </button>
                  {isUserDropDownOpen &&
                    <div className='flex flex-col absolute w-24 top-12 right-16 rounded-md bg-white overflow-hidden'>
                      <Link
                        to={'/profile'}
                        className='text-start hover:bg-secondary/gray px-2'
                      >
                        Profile
                      </Link>
                      <button
                        className='text-start hover:bg-secondary/gray px-2 '
                        onClick={() => {
                          signOutUser()
                          setUserInfo(null)
                          localStorage.clear()
                          navigate('/')
                        }}
                      >
                        Sign Out
                      </button>
                    </div>
                  }
                </div>
              </div>
            ) : (
              <Link className='hover:underline text-primary/purple' to='/sign-in'>
                Sign In
              </Link>
            )}
            <CartIcon />
          </div>
        </div>

      </div>
    </div>


  )
}

export default NavigationBar