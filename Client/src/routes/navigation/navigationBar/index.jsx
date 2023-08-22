import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import CartIcon from '../../../components/cart/cartIcon';
import CartDropdown from '../../../components/cart/cartDropdown';
import ChoosingUs from '../../../components/choosingUsMenu';
import CurrentUserLinks from './currentUserLinks';
import DefaultLinks from './defaultLinks';


const NavigationBar = ({ currentUser, customClaims, setUserInfo }) => {
  const aboutUsButtonRef = useRef(null);

  return (
    <div className="flex fixed w-full h-16 z-20 ">
      <CartDropdown />
      <ChoosingUs aboutUsButtonRef={aboutUsButtonRef} />
      <div className='flex w-full md:justify-between justify-center xl:px-8 px-4'>
        <div className="absolute inset-0 h-16 bg-primary/black opacity-95"></div>
        <div className="w-48 flex place-content-center items-center z-20 ">
          <Link to="/">
            <img  className='hidden md:flex' src={"/logos/logoVariation-01.png"} />
            <img className='h-12 md:hidden  items-end ' src={'/logos/icon-03.png'} />
          </Link>
        </div>
        <DefaultLinks aboutUsButtonRef={aboutUsButtonRef} />
        <div className="flex items-center z-20">
          {currentUser ? (
            <CurrentUserLinks
              customClaims={customClaims}
              currentUser={currentUser}
              setUserInfo={setUserInfo}
            />
          ) : (
            <Link className='hover:underline text-primary/purple' to='/sign-in'>
              Sign In
            </Link>
          )}
          <CartIcon />
        </div>
      </div>
    </div>
  )
}

export default NavigationBar