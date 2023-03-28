import { Outlet, } from 'react-router-dom'
import { useCallback, useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../store/user/user.selector';
import { Sidebar } from '../../components/sidebar';
import { useState } from 'react';
import { verifyCurrentUserClaims } from '../../utils/api.utils';
import NavigationBar from './navigationBar';
import PasswordReset from '../signIn/resetPasswordWindow';
import { AppContext } from '../../components/context/appContext';
import ChangePassordWindow from '../userProfile/changePasswordWindow';
import Footer from './footer';
import { useFetch } from '../../hooks/useFetch';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)
  const { isPasswordResetOpen, isPasswordWindowOpen, setUserInfo, setisMenuOpen } = useContext(AppContext)
  
  const dropdownRef = useRef(null);

  const customClaimsFetcher = useCallback(async () => {
    return currentUser ? await verifyCurrentUserClaims(currentUser) : null;
  }, [currentUser]);

  const customClaims = useFetch({ key: ["customClaims", currentUser?.uid], fn: () => customClaimsFetcher, });

  return (
    <div className='flex flex-col'>
      <NavigationBar currentUser={currentUser} dropdownRef={dropdownRef} customClaims={customClaims} setUserInfo={setUserInfo} setisMenuOpen={setisMenuOpen} />
      <Sidebar />
      {isPasswordResetOpen && <PasswordReset />}
      {isPasswordWindowOpen && <ChangePassordWindow />}
      {/* body container */}
      <div className='relative h-screen w-screen'>
        <div >
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Navigation