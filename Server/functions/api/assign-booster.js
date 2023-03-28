const firebase = require('../firebase');


async function assignBooster(req, res) {
    const { selectedBooster, serviceItem } = req.body
    const idToken = req.headers.authorization.split(' ')[1]
    const decodedToken = await firebase.auth.verifyIdToken(idToken)
    if (!decodedToken.admin) return res.status(401).json({ message: 'Not Authorized' })
    const date = new Date()

    try {
        // create collection with services assigned for each booster
        await firebase.db.collection('servicesPurchased').doc(serviceItem.service_id).update({
            boostersAssigned: selectedBooster,
            boostersAssignedDate: date
        })
        // created services for each booster assigned
        selectedBooster.forEach(async function (booster) {
            const serviceRef = await firebase.db.collection('servicesPurchased').doc(serviceItem.service_id).get()
            const service = serviceRef.data()
            await firebase.db.collection('boosters').doc(booster.id).collection('services').doc(serviceItem.service_id).set(service)
        })
        // update service purcharsed collection with assigned booster
        // update collection of services for each specific user
        await firebase.db.collection('users').doc(serviceItem.customer_id).collection('services').doc(serviceItem.service_id).update({
            boostersAssigned: selectedBooster,
            boostersAssignedDate: date
        })

        res.status(200).json({ message: `Success! Booster has been assigned` })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = assignBooster