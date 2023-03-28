import { PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js'
import React, { useState } from 'react'



const PaymentForm = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [ message, setMessage] = useState(null)
    const stripe = useStripe()
    const elements = useElements()
    
    const paymentHandler = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);
        
        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/checkout-success`
            }
        })
        if (error) {
            setMessage(error.message)
        }  
        setIsProcessing(false);
    }

    return (
        <div className='flex flex-col w-full h-48 border-2 mt-3'>
            <PaymentElement />
            <button className='border-2' onClick={paymentHandler}>{isProcessing ? 'Processing...' : 'Pay now'}</button>
        </div>
    )
}

export default PaymentForm