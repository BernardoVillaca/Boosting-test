const firebaseAdmin = require('firebase-admin');


async function verifyTokenById (req, res) {
    const { id } = req.body
    try {
        const userRecord = await firebaseAdmin.auth().getUser(id)
        res.status(200).json(userRecord.customClaims)
        
    } catch (error) {
        res.status(400).json({message: error.message})
   }
}

module.exports = verifyTokenById;