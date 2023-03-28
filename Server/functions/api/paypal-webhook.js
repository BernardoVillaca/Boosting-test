const firebase = require('../firebase');


async function paypalWebhook(req, res) {
    let event = req.body;

    if (event.event_type !== 'CHECKOUT.ORDER.APPROVED') return res.json({ success: false })
    res.status(200).json({ success: true })

    try {
        await firebase.db.collection('checkout_order_approved').doc(event.id).set(event)
        
        await firebase.db.collection('users').doc(event.resource.purchase_units[0].custom_id).collection('user_checkout_order_approved').doc(event.id).set(event)
        
        await firebase.db.collection('users').doc(event.resource.purchase_units[0].custom_id).collection('user_orders').doc(event.resource.purchase_units[0].invoice_id).update({ status: 'succeeded' })

        await firebase.db.collection('orders').doc(event.resource.purchase_units[0].invoice_id).update({ status: 'succeeded' })

        const userDocRef = await firebase.db.collection('users').doc(event.resource.purchase_units[0].custom_id).get()

        const userDoc = userDocRef.data()

        await firebase.db.collection('orders')
            .doc(event.resource.purchase_units[0].invoice_id)
            .get()
            .then(doc => {
                const order = doc.data()
                services = order.purchased_items.map((item) => ({
                    ...item,
                    customer_id: event.resource.purchase_units[0].custom_id,
                    customer_discord: userDoc.discord,
                    servicePurchasedDate: new Date(),
                    status: 'incomplete',
                    boostersAssigned: null,
                    boostersAssignedDate: null
                }))
                return services
            })
        services.map((item) => {
            firebase.db.collection('users').doc(item.customer_id).collection('services').doc(item.service_id).set(item)
            firebase.db.collection('servicesPurchased').doc(item.service_id).set(item)
        })
    } catch (error) {
        console.log({ Error: error.message })
    }
}
module.exports = paypalWebhook;