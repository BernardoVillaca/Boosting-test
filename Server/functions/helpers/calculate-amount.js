const firebase = require('../firebase');
const calculateRatingPrice = require('./calculate-rating-price');

async function calculateAmount(cartItems) {

    const promises = cartItems.map(async function (item) {
        
        const docRef = firebase.db.collection('ServicesInfo').doc(item.purchased_item_id);
        const doc = await docRef.get();
        const service = doc.data();

        const { serviceInfo } = item;
        const { extraOptionsSelected, coachLvl, hours, currentRating, desiredRating, resourceAmount, startRating  } = serviceInfo;
        const { ratingSlideBar, servicePrice, hoursSlideBar, resourceSlideBar, startRatingSlideBar, serviceOptions, coachLvls } = service;
        const { startRatingPrice, startRatingMax } = startRatingSlideBar || {};
        const { max } = resourceSlideBar || {};

        let optionsTotalValue = 0;
        
        extraOptionsSelected?.map(function (option) {
            const optionsSelected = serviceOptions.find(item => item.optionName === option.optionName)
            optionsTotalValue = optionsTotalValue + optionsSelected.optionPrice
        })
        
        let coachLvlPrice = 0

        if (coachLvl) {
            const coachLvlSelected = coachLvls.find(item => item.coachLvlName === coachLvl.coachLvlName)
            coachLvlPrice = coachLvlSelected.coachLvlPrice
        }
                          

        if (ratingSlideBar) {
            const bandsArray = Object.values(ratingSlideBar?.bandsMap)
            if (currentRating === null || desiredRating === null) return 0
            if (desiredRating < 100) return 0
            let rankBandMinimum, rankBandMaximum, rankBandPrice
            [rankBandMinimum, rankBandMaximum, rankBandPrice] = bandsArray.find(band => ((band[0] <= currentRating) && (band[1] > currentRating)))
    
            let targetRankBandMinimum, targetRankBandMaximum, targetRankBandPrice
            [targetRankBandMinimum, targetRankBandMaximum, targetRankBandPrice] = bandsArray.find(band => ((band[0] < desiredRating) && (band[1] >= desiredRating)))
    
            let price = bandsArray.reduce((sumOfBands, currentBand) => {
                let bandMinimum, bandMaximum, bandPrice
                [bandMinimum, bandMaximum, bandPrice] = currentBand
    
                if (bandMinimum < desiredRating && bandMaximum > currentRating) {
                    return (sumOfBands + bandPrice * (bandMaximum - bandMinimum))
                } else {
                    return sumOfBands
                }
            }, servicePrice)
    
            price -= rankBandPrice * (currentRating - rankBandMinimum)
            price -= targetRankBandPrice * (targetRankBandMaximum - desiredRating)
    
            return price * (1 + (optionsTotalValue + coachLvlPrice) / 50)
        }

        if (hoursSlideBar) {

            if (hours < 5) return hours * (servicePrice + optionsTotalValue + coachLvlPrice)
            if (hours <= 9) return (hours * (servicePrice + optionsTotalValue + coachLvlPrice)) * 0.95
            return (10 * (servicePrice + optionsTotalValue + coachLvlPrice)) * 0.9
        }

        if (resourceSlideBar) {
            if (resourceAmount < max / 2) return resourceAmount * servicePrice + optionsTotalValue
            if (resourceAmount < max) return (resourceAmount * servicePrice + optionsTotalValue) * 0.95
            return (resourceAmount * servicePrice + optionsTotalValue) * 0.9
        }
    
        if (startRatingSlideBar) {
            return ((startRatingMax - startRating) * startRatingPrice + servicePrice) * (1 + (optionsTotalValue + coachLvlPrice) / 30)
        }
    
        return servicePrice + optionsTotalValue

    })

    const totalAmount = (await Promise.all(promises)).reduce((a, b) => a + b)
    
    return totalAmount
}

module.exports = calculateAmount;



// const promises = cartItems.map(async function (item) {
        
//     const docRef = firebase.db.collection('ServicesInfo').doc(item.purchased_item_id);
//     const doc = await docRef.get();
//     const service = doc.data();

//     const { serviceInfo } = item;
//     const { extraOptionsSelected, coachLvl, hoursAmount, currentRating, desiredRating } = serviceInfo;
//     const { serviceName, servicePrice, serviceOptions, coachLvls } = service;

//     if (serviceName === 'Arena 2v2 Coaching') {
//         const selectedCoachLvl = coachLvls.find(item => item.coachLvlName === coachLvl);
//         const coachLvlValue = selectedCoachLvl.coachLvlPrice;
//         let optionsTotalValue = 0;
//         Object.keys(extraOptionsSelected).map(function (option) {
//             const optionsSelected = serviceOptions.find(item => item.optionName === option)
//             optionsTotalValue = optionsTotalValue + optionsSelected.optionPrice
//         })
//         const finalHourlyPrice = hoursAmount < 5 ? hoursAmount * (servicePrice + optionsTotalValue + coachLvlValue) :
//             hoursAmount <= 9 ? (hoursAmount * (servicePrice + optionsTotalValue + coachLvlValue)) * 0.95 :
//                 (10 * (servicePrice + optionsTotalValue + coachLvlValue)) * 0.9

//         return finalHourlyPrice;

//     }
//     if (serviceName === 'Arena Selfplay 3v3') {
//         const selectedCoachLvl = coachLvls.find(item => item.coachLvlName === coachLvl);
//         const coachLvlValue = selectedCoachLvl.coachLvlPrice;
//         let optionsTotalValue = 0
//         Object.keys(extraOptionsSelected).map(function (option) {
//             const optionsSelected = serviceOptions.find(item => item.optionName === option)
//             optionsTotalValue = optionsTotalValue + optionsSelected.optionPrice
//         })
//         const pricePerRating = calculateRatingPrice(currentRating, desiredRating);

//         const finalRatingPrice = pricePerRating * (1 + (optionsTotalValue + coachLvlValue) / 50);

//         return finalRatingPrice;

//     }
// })

// const totalAmount = (await Promise.all(promises)).reduce((a, b) => a + b)

// return totalAmount