const firebase = require('../firebase');

async function verifyCurrentUserClaims(req, res) {

    try {
        const idToken = req.headers.authorization.split(' ')[1]
        const decodedToken = await firebase.auth.verifyIdToken(idToken)
        const userRecord = await firebase.auth.getUser(decodedToken.uid)
        res.status(200).json(userRecord.customClaims)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

module.exports = verifyCurrentUserClaims

