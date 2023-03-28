const { builtinModules } = require("module")

function calculateRatingPrice(currentRating, desiredRating) {
    const startPrice = 20
    const arrayOfBands = [
        [0, 1500, 0.06], [1500, 1550, 0.12], [1550, 1600, 0.18],
        [1600, 1650, 0.24], [1650, 1700, 0.30], [1700, 1750, 0.36],
        [1750, 1800, 0.42]
    ]

    let rankBandMinimum, rankBandMaximum, rankBandPrice
    [rankBandMinimum, rankBandMaximum, rankBandPrice] = arrayOfBands.find(band => ((band[0] <= currentRating) && (band[1] > currentRating)))

    let targetRankBandMinimum, targetRankBandMaximum, targetRankBandPrice
    [targetRankBandMinimum, targetRankBandMaximum, targetRankBandPrice] = arrayOfBands.find(band => ((band[0] < desiredRating) && (band[1] >= desiredRating)))

    let price = arrayOfBands.reduce((sumOfBands, currentBand) => {
        let bandMinimum, bandMaximum, bandPrice
        [bandMinimum, bandMaximum, bandPrice] = currentBand

        if (bandMinimum < desiredRating && bandMaximum > currentRating) {
            return (sumOfBands + bandPrice * (bandMaximum - bandMinimum))
        } else {
            return sumOfBands
        }
    }, startPrice)

    price -= rankBandPrice * (currentRating - rankBandMinimum)
    price -= targetRankBandPrice * (targetRankBandMaximum - desiredRating)
    return price
}

module.exports = calculateRatingPrice;