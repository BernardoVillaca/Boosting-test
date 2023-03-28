const firebase = require('../firebase');



async function verifyCurrentUserClaims(req, res) {
    const idToken = req.headers.authorization.split(' ')[1]
    const decodedToken = await firebase.auth.verifyIdToken(idToken)
    const userRecord = await firebase.auth.getUser(decodedToken.uid)
    res.status(200).json(userRecord.customClaims)
}

module.exports = verifyCurrentUserClaims