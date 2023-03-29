const firebase = require('../firebase');
const paypal = require('@paypal/checkout-server-sdk');
const paypalClient = new paypal.core.PayPalHttpClient(new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET
))

const calculateAmount = require('../helpers/calculate-amount');
const createOrder = require('../helpers/create-order');
const metadaStrings = require('../helpers/metadataStrings');

async function createPaypalOrder(req, res) {
    const { currentUser, cartItems } = req.body;
    let request = new paypal.orders.OrdersCreateRequest()
    const descriptionString = metadaStrings(cartItems)
    const incompleteOrder = createOrder(currentUser, cartItems)
    const total = await calculateAmount(cartItems)

    const fixedTotal = total.toFixed(2)

    request.requestBody({
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "invoice_id": incompleteOrder.id,
                "custom_id": currentUser.uid,
                "description": descriptionString,
                "amount": {
                    "currency_code": "USD",
                    "value": Math.round(fixedTotal)
                }
            }
        ]
    });
    try {
        const paypalOrder = await paypalClient.execute(request)
        const order = {
            ...incompleteOrder,
            paypalOrderId: paypalOrder.result.id,
            paypalOrderAmount: total
        }

        await firebase.db.collection('paypal_orders').doc(paypalOrder.result.id).set(paypalOrder)
        await firebase.db.collection('orders').doc(order.id).set(order)
        await firebase.db.collection('users').doc(order.customer_id).collection('user_orders').doc(order.id).set(order)
        res.json({ id: paypalOrder.result.id })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }

}

module.exports = createPaypalOrder;