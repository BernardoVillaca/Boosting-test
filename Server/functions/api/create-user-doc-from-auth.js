const firebase = require('../firebase');

async function createUserDocFromAuth(req, res) {
    const { displayName, uid, discord, email } = req.body
    const docRef = firebase.db.collection('users').doc(uid)
    const documentSnapShot = await docRef.get()
    if (documentSnapShot.exists) return res.status(200).json({ message: `User already in db` })
    try {
        await firebase.db.collection('users').doc(uid).set({
            displayName: displayName,
            discord: discord,
            email: email,
            createdAt: new Date()
        })
        res.status(200).json({ message: `Success! user has been created` })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = createUserDocFromAuth