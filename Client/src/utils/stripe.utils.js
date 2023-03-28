import { loadStripe } from '@stripe/stripe-js'

export const stripePromise = loadStripe('pk_test_51LlB41AmqMvTCjYg7z0lArGa3D5BXF2zQ5MnDqjZrD3ue24ug8ePK6BuTujLn5fRJIrt0HzjuihQDYmG2SWCDJfG00YH2NCmOK')  

// process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY