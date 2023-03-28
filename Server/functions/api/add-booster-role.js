const firebase = require('../firebase');


async function addBoosterRole(req, res) {
    const { email, booster } = req.body
    const idToken = req.headers.authorization.split(' ')[1]
    const decodedToken = await firebase.auth.verifyIdToken(idToken)
    if (!decodedToken.admin) return res.status(401).json({ message: "Not Authorized" })
    try {
        const user = await firebase.auth.getUserByEmail(email)
        await firebase.auth.setCustomUserClaims(user.uid, {
            booster: true
        });
        await firebase.db.collection('boosters').doc(booster.id).set(booster)
        res.status(200).json({ message: `Success! ${email} has been made a booster` })

    } catch (error) {
        res.status(400).json({ message: error.message })

    }
}

module.exports = addBoosterRole