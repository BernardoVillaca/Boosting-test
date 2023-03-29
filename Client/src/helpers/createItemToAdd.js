

export function createItemToAdd(
    id, serviceName, serviceImage, hours,
    region, notes, resourceAmount, startRating,
    coachLvl, optionsChecked, currentRating,
    desiredRating, wowClass, spec, classIcon,
    faction, boosterString, finalPrice) {

    const itemToAdd = {
        purchased_item_id: id,
        name: serviceName,
        price: finalPrice,
        serviceImage: serviceImage,
    };
    const serviceInfo = {
        customerRole: {
            class: wowClass,
            classIcon: classIcon,
            spec: spec
        }
    };
    if (notes) serviceInfo.notes = notes;
    if (region) serviceInfo.region = region;
    if (faction) serviceInfo.faction = faction;
    if (boosterString) serviceInfo.boosterRequested = boosterString;
    if (optionsChecked.length !== 0) serviceInfo.extraOptionsSelected = optionsChecked;
    if (coachLvl) serviceInfo.coachLvl = coachLvl;
    if (resourceAmount !== 0) serviceInfo.resourceAmount = resourceAmount;
    if (desiredRating !== 0) {
        serviceInfo.currentRating = currentRating;
        serviceInfo.desiredRating = desiredRating;
    }
    if (startRating !== 0) serviceInfo.startRating = startRating;
    if (hours !== 0) serviceInfo.hours = hours;

    return { ...itemToAdd, serviceInfo }

}
