const firebase = require('../firebase');
const stripeAPI = require('../stripe');

const createOrder = require('../helpers/create-order');
const metadaStrings = require('../helpers/metadataStrings');
const calculateAmount = require('../helpers/calculate-amount');

async function paymentIntent(req, res) {
    const { currentUser, cartItems } = req.body;
    const {descriptionString} = metadaStrings(cartItems)
    const incompleteOrder = createOrder(currentUser, cartItems)
    const paymentIntentAmount = await calculateAmount(cartItems)
    const fixedPaymentIntentAmount = paymentIntentAmount.toFixed(2)
    try {
        paymentIntent = await stripeAPI.paymentIntents.create({
            description: descriptionString,
            amount: Math.round(fixedPaymentIntentAmount * 100),
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                order_id: incompleteOrder.id,
                email: currentUser.email,
                uid: currentUser.uid,
            }
        });
        const order = {...incompleteOrder, 
            paymentIntent_id: paymentIntent.id,
            paymentIntentAmount: paymentIntentAmount
        }
        await firebase.db.collection('orders').doc(order.id).set(order)
        await firebase.db.collection('users').doc(order.customer_id).collection('user_orders').doc(order.id).set(order)
        
        res.status(200).json({ clientSecret: paymentIntent.client_secret })

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'an error occurred, unable to create payment intent' })

    };
};

module.exports = paymentIntent









