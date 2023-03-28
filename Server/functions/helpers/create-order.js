const crypto = require('crypto');

function createOrder(currentUser, cartItems) {
    const orderId = crypto.randomBytes(16).toString("hex");
    const serviceId = () => {
        return crypto.randomBytes(8).toString("hex")
    }
    const id = `Order_${orderId}`

    const newCartItems = cartItems.map((item) => ({
        ...item, service_id: `${item.name.charAt(0)}${item.serviceInfo.region.charAt(0)}${item.serviceInfo.coachLvl.charAt(0)}${serviceId()}`
    }))

    const order = {
        id: id,
        customer_id: currentUser.uid,
        customer_email: currentUser.email,
        purchased_items: newCartItems,
        orderCreatedDate: new Date(),
        status: 'created'
    }   

    return order
}

module.exports = createOrder;