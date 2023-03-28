import Home from './routes/homePage';
import { Routes, Route } from 'react-router-dom'
import Navigation from './routes/navigation';
import CheckoutPage from './routes/checkout';
import CheckOutSuccess from './routes/checkoutSuccess';
import PaymentPage from './routes/payment';
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { onAuthStateChangedListener } from '../src/utils/firebase.utils'
import { setCurrentUser } from './store/user/user.action';
import PvP from './routes/pvp';
import Dungeons from './routes/dungeons';
import Raids from './routes/raids';
import Dashboard from './routes/dashboard';
import MyServicesPage from './routes/myServices';
import UserProfile from './routes/userProfile';
import SignIn from './routes/signIn';
import SignUp from './routes/signUp';
import BoosterArea from './routes/boosterArea';
import ServicePage from './components/pageComponents/servicePage';
import FooterLinksPage from './routes/footerLinks';
import ServicesFound from './routes/servicesFound';



const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const subscribe = onAuthStateChangedListener((user) => {
      dispatch(setCurrentUser(user));
    });
    return subscribe;

  }, []);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<Home />} />
        <Route path='my-services' element={<MyServicesPage />} />
        <Route path='pvp' element={<PvP />} />
        <Route path='pvp/:id' element={<ServicePage />} />
        <Route path='dungeons' element={<Dungeons />} />
        <Route path='dungeons/:id' element={<ServicePage />} />
        <Route path='raids' element={<Raids />} />
        <Route path='raids/:id' element={<ServicePage />} />
        <Route path='sign-in' element={<SignIn />} />
        <Route path='sign-up' element={<SignUp />} />
        <Route path='checkout' element={<CheckoutPage />} />
        <Route path='payment' element={<PaymentPage />} />
        <Route path='checkout-success' element={<CheckOutSuccess />} />
        <Route path='profile' element={<UserProfile />} />
        <Route path='booster-area' element={<BoosterArea />} />
        <Route path='services-found' element={<ServicesFound />} />
        <Route path='about-us' element={<FooterLinksPage />} />
        <Route path='work-with-us' element={<FooterLinksPage />} />
        <Route path='contact-us' element={<FooterLinksPage />} />
        <Route path='terms-and-conditions' element={<FooterLinksPage />} />
        <Route path='refund-policy' element={<FooterLinksPage />} />
        <Route path='privacy-policy' element={<FooterLinksPage />} />
      </Route>
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='dashboard/:id' element={<Dashboard />} />
    </Routes>
  );
};

export default App;

