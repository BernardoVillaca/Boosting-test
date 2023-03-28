const firebase = require('../firebase');

async function listServiceAsComplete(req, res) {

    const { serviceFound } = req.body
    const date = new Date()
    const idToken = req.headers.authorization.split(' ')[1]
    const decodedToken = await firebase.auth.verifyIdToken(idToken)
    if (!decodedToken.admin) return res.status(401).json({ message: "Not Authorized" })

    try {
        await firebase.db.collection('servicesPurchased').doc(serviceFound.service_id).update({
            status: 'completed',
            listedAsCompletedDate: date
        })

        await firebase.db.collection('users').doc(serviceFound.customer_id).collection('services').doc(serviceFound.service_id).update({
            status: 'completed',
            listedAsCompletedDate: date
        })

        serviceFound.boostersAssigned.forEach(async function (booster) {
            await firebase.db.collection('boosters').doc(booster.id).collection('services').doc(serviceFound.service_id).update({
                status: 'completed',
                listedAsCompletedDate: date
            })
        })
        res.status(200).json({ message: 'Service successfully listed as complete' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = listServiceAsComplete;