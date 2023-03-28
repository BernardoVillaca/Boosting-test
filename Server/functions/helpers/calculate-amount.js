const firebase = require('../firebase');
const calculateRatingPrice = require('./calculate-rating-price');

async function calculateAmount(cartItems) {

    const promises = cartItems.map(async function (item) {
        
        const docRef = firebase.db.collection('ServicesInfo').doc(item.purchased_item_id);
        const doc = await docRef.get();
        const service = doc.data();

        const { serviceInfo } = item;
        const { extraOptionsSelected, coachLvl, hoursAmount, currentRating, desiredRating } = serviceInfo;
        const { serviceName, servicePrice, serviceOptions, coachLvls } = service;

        if (serviceName === 'Arena 2v2 Coaching') {
            const selectedCoachLvl = coachLvls.find(item => item.coachLvlName === coachLvl);
            const coachLvlValue = selectedCoachLvl.coachLvlPrice;
            let optionsTotalValue = 0;
            Object.keys(extraOptionsSelected).map(function (option) {
                const optionsSelected = serviceOptions.find(item => item.optionName === option)
                optionsTotalValue = optionsTotalValue + optionsSelected.optionPrice
            })
            const finalHourlyPrice = hoursAmount < 5 ? hoursAmount * (servicePrice + optionsTotalValue + coachLvlValue) :
                hoursAmount <= 9 ? (hoursAmount * (servicePrice + optionsTotalValue + coachLvlValue)) * 0.95 :
                    (10 * (servicePrice + optionsTotalValue + coachLvlValue)) * 0.9

            return finalHourlyPrice;

        }
        if (serviceName === 'Arena Selfplay 3v3') {
            const selectedCoachLvl = coachLvls.find(item => item.coachLvlName === coachLvl);
            const coachLvlValue = selectedCoachLvl.coachLvlPrice;
            let optionsTotalValue = 0
            Object.keys(extraOptionsSelected).map(function (option) {
                const optionsSelected = serviceOptions.find(item => item.optionName === option)
                optionsTotalValue = optionsTotalValue + optionsSelected.optionPrice
            })
            const pricePerRating = calculateRatingPrice(currentRating, desiredRating);

            const finalRatingPrice = pricePerRating * (1 + (optionsTotalValue + coachLvlValue) / 50);

            return finalRatingPrice;

        }
    })

    const totalAmount = (await Promise.all(promises)).reduce((a, b) => a + b)
    
    return totalAmount
}

module.exports = calculateAmount;