import { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../components/context/appContext'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../store/user/user.selector';
import CartItem from '../../components/cart/cartItem'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Link, useNavigate } from "react-router-dom";
import { createPaypalOrder, fetchClientId } from '../../utils/api.utils';
import textureBackground from '../../assets/background_texture.png'
import PageContainer from '../../components/containers/pageContainer';
import LeftContainer from '../../components/containers/innerPage/left';
import MiddleContainer from '../../components/containers/innerPage/middle';
import RightContainer from '../../components/containers/innerPage/right';
import { useFetch } from '../../hooks/useFetch';



const CheckoutPage = () => {
    const { cartItems, cartCount, cartTotalValue, clearItemsFromCart } = useContext(AppContext);
    const currentUser = useSelector(selectCurrentUser)
    const [orderPlaced, setOrderPlaced] = useState(false)
    const navigate = useNavigate()

    const paypalClientId = useFetch({ key: 'paypalClientId', fn: async () => currentUser && await fetchClientId() })

    return (
        <PageContainer image={textureBackground}>
            <LeftContainer />
            <MiddleContainer center={true}>
                <h1 className='font-bold text-6xl py-6 text-white'>Secure Checkout</h1>
                <div className='flex flex-row h-full text-white'>
                    <div className=' h-[32rem] w-[27.4rem] border-[1px] border-secondary/gray border-opacity-20 bg-primary/black rounded-md'>
                        <div className='flex justify-center items-end border-b-[2px] border-secondary/gray border-opacity-20'>
                            <h2 className='font-bold text-3xl pr-3'>Review Order</h2>
                            <h2 className='font-bold text-2xl '>{`(${cartCount} ${cartCount == 1 ? 'Item' : 'Items'})`}</h2>
                        </div>
                        {cartItems.length === 0 &&
                            <div className='flex w-full h-36 place-content-center items-center text-2xl text-secondary/gray text-opacity-60'>
                                <span>Don't forget to add products to cart</span>
                            </div>
                        }
                        {cartItems.map((item) => (
                            <CartItem key={item.purchased_item_id} cartItem={item} orderPlaced={orderPlaced} />
                        ))}
                    </div>
                    <div className='ml-6 w-72'>
                        <h2 className='font-bold text-3xl pr-3 pb-3 text-center'>Payment Method</h2>
                        <div className='flex flex-col place-content-start items-center'>
                            <div className='flex h-16 w-full items-center justify-between px-3'>
                                <span>Order total:</span>
                                <span className='text-3xl'>${cartTotalValue.toFixed(2)}</span>
                            </div>
                            {/* <button className='w-24 h-24 bg-white' onClick={async () => {
                                const id = await createPaypalOrder(cartItems, currentUser)
                                console.log(id)
                            }}></button> */}
                            {paypalClientId && cartCount !== 0 &&
                                <PayPalScriptProvider options={{ "client-id": paypalClientId }}>
                                    <PayPalButtons
                                        createOrder={async function () {
                                            const id = await createPaypalOrder(cartItems, currentUser)
                                            return id
                                        }}
                                        onApprove={(data, actions) => {
                                            return actions.order.capture().then((details) => {
                                                const name = details.payer.name.given_name;
                                                navigate('/checkout-success')
                                                clearItemsFromCart()
                                            });
                                        }}
                                    />
                                </PayPalScriptProvider>
                            }
                            {currentUser === null &&
                                <Link
                                    to={'/sign-in'}
                                    className='bg-blue-300 p-2 rounded-md hover:bg-blue-400'
                                >
                                    Please sign in to proceed to payment
                                </Link>

                            }
                        </div>
                    </div>
                </div>

            </MiddleContainer>
            <RightContainer />
        </PageContainer>
    )
}

export default CheckoutPage;