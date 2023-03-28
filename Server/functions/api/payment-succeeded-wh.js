const stripeAPI = require('../stripe')
const firebase = require('../firebase');

async function paymentSucceededWH(req, res) {
    let event;
    let services;
    const payload = req.rawBody;
    const sig = req.headers['stripe-signature'];
    const endpointSecret = "whsec_17ad110f60a90307c35ab25af6673a167ef72e950aff0936e97242766b12bd01";

    try {
        event = await stripeAPI.webhooks.constructEvent(payload, sig, endpointSecret)

        if (event.type !== 'payment_intent.succeeded') return res.json({ success: false })
        res.json({ success: true })

        await firebase.db.collection('payment_intent_succeeded').doc(event.id).set(event)

        await firebase.db.collection('users').doc(event.data.object.metadata.uid).collection('user_payment_intent_succeeded').doc(event.id).set(event)
        await firebase.db.collection('users').doc(event.data.object.metadata.uid).collection('user_orders').doc(event.data.object.metadata.order_id).update({ status: 'succeeded' })

        await firebase.db.collection('orders').doc(event.data.object.metadata.order_id).update({ status: 'succeeded' })
        
        await firebase.db.collection('orders')
            .doc(event.data.object.metadata.order_id)
            .get()
            .then(doc => {
                const order = doc.data()
                services = order.purchased_items.map((item) => ({
                    ...item, 
                    customer_id: event.data.object.metadata.uid, 
                    servicePurchasedDate: new Date(),
                    status: 'incomplete',
                    boostersAssigned : null,
                    boostersAssignedDate : null
                }))
                return services
            })
            services.map((item) =>{
                firebase.db.collection('users').doc(item.customer_id).collection('services').doc(item.service_id).set(item)
                firebase.db.collection('servicesPurchased').doc(item.service_id).set(item)
            })
    } catch (error) {
        console.log({ Error: error.message })
    }
}

module.exports = paymentSucceededWH