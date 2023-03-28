import { useContext } from "react"
import { ServicePageContext } from "../components/context/service-page.context"

export function calculateFinalPrice(product) {
    const { currentRating, desiredRating, optionsTotalValue, coachLvlPrice, hours, resourceAmount, startRating } = useContext(ServicePageContext)
    const { ratingSlideBar, servicePrice, hoursSlideBar, resourceSlideBar, startRatingSlideBar } = product
    const {startRatingPrice, startRatingMax} = startRatingSlideBar || {}
    const {max} = resourceSlideBar || {}

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

    if(resourceSlideBar){
        if (resourceAmount < max/2) return resourceAmount * servicePrice + optionsTotalValue
        if (resourceAmount < max) return (resourceAmount * servicePrice + optionsTotalValue) * 0.95
        return (resourceAmount * servicePrice + optionsTotalValue) * 0.9
    }

    if(startRatingSlideBar){
        return ((startRatingMax - startRating) * startRatingPrice + servicePrice) * (1 + (optionsTotalValue + coachLvlPrice) / 30)
    }

    return servicePrice + optionsTotalValue

}