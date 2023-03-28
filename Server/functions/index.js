require('dotenv').config();
const express = require('express');
const cors = require('cors')

const functions = require("firebase-functions");

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}))

exports.app = functions.https.onRequest(app);

// app.post('/addAdminRole', async (req, res) => {
//     const { currentUser } = req.body

//     const user = await firebaseAdmin.auth().getUserByEmail(currentUser.email)
//     await firebaseAdmin.auth().setCustomUserClaims(user.uid, {
//         admin: true
//     });
//     res.status(200).json({ message: `Success! ${currentUser.email} has been made an admin` })
// })

const paymentIntent = require('./api/payment-intent');
const paymentSucceededWH = require('./api/payment-succeeded-wh');
const addBoosterRole = require('./api/add-booster-role');
const verifyCurrentUserClaims = require('./api/verify-currrent-user-claims');
const assignBooster = require('./api/assign-booster');
const createPaypalOrder = require('./api/create-paypal-order');
const paypalWebhook = require('./api/paypal-webhook');
const listServiceAsComplete = require('./api/list-service-as-complete');
const verifyTokenById = require('./api/verify-token-by-id');
const createUserDocFromAuth = require('./api/create-user-doc-from-auth');
const { manualSync } = require('./api/manualSync');


app.post('/manual-sync', manualSync)
app.post('/addBoosterRole', addBoosterRole)
app.post('/assignBooster', assignBooster)
app.post('/verifyCurrentUserClaims', verifyCurrentUserClaims)
app.post('/create-payment-intent', paymentIntent)
app.post('/create-paypal-order', createPaypalOrder)
app.post('/listServiceAsComplete', listServiceAsComplete)
app.post('/stripe-webhook', paymentSucceededWH)
app.post('/paypal-webhook', paypalWebhook)
app.post('/createUserDocFromAuth', createUserDocFromAuth)
app.post('/verifyTokenById', verifyTokenById)

app.get('/stripe-config', (req, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    })
})

app.get('/paypal-config', (req, res) => {
    res.send({
        client_id: process.env.PAYPAL_CLIENT_ID
    })
})

