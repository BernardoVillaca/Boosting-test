const crypto = require('crypto');

function metadaStrings(cartItems) {
    let descriptionArray = [];
    let orderIdArray = [];

    cartItems.forEach((item) => {
        const {name, serviceInfo} = item
        const {region, coachLvl, currentRating, desiredRating, hoursAmount} = serviceInfo
        const id = crypto.randomBytes(8).toString("hex");
        descriptionArray.push([
            `${name} ${region} ${coachLvl} ${currentRating}-${desiredRating} ${hoursAmount >= 1 ? `${hoursAmount} hour(s)` : null}`
        ])
        orderIdArray.push([
            `${name.charAt(0)}${region.charAt(0)}${coachLvl.charAt(0)}${id}`
        ])
    })

    const descriptionString = descriptionArray.toString().replace(',', ' // ').replaceAll('null', '')
    const orderIdString = orderIdArray.toString().replace(',', ' // ')

    return {
        descriptionString,
        orderIdString
    }

}

module.exports = metadaStrings;