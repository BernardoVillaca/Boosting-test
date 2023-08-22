import { Outlet, } from 'react-router-dom'
import { useCallback, useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../store/user/user.selector';
import { verifyCurrentUserClaims } from '../../utils/api.utils';
import NavigationBar from './navigationBar';
import PasswordReset from '../signIn/resetPasswordWindow';
import { AppContext } from '../../components/context/appContext';
import ChangePassordWindow from '../userProfile/changePasswordWindow';
import Footer from './footer';
import { useFetch } from '../../hooks/useFetch';
import { Sidebar } from './sidebar';
import CartDropdown from '../../components/cart/cartDropdown';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)
  const { isPasswordResetOpen, isPasswordWindowOpen, setUserInfo, setisMenuOpen } = useContext(AppContext)

  const customClaimsFetcher = useCallback(async () => {
    return currentUser ? await verifyCurrentUserClaims(currentUser) : null;
  }, [currentUser]);

  const customClaims = useFetch({ key: ["customClaims", currentUser?.uid], fn: () => customClaimsFetcher, });

  return (
    <div >
      <NavigationBar currentUser={currentUser} customClaims={customClaims} setUserInfo={setUserInfo} setisMenuOpen={setisMenuOpen} />
      <Sidebar />
      {isPasswordResetOpen && <PasswordReset />}
      {isPasswordWindowOpen && <ChangePassordWindow />}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Navigation