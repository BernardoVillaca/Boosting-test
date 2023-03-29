function createMetadataString(elements) {
    return elements
        .filter(element => element !== undefined && element !== null)
        .join(' ');
}

function metadataStrings(cartItems) {
    let descriptionArray = [];

    cartItems.forEach((item) => {
        const { name, serviceInfo } = item;
        const { region, coachLvl, currentRating, desiredRating, hours, resourceAmount, extraOptionsSelected, startRating } = serviceInfo;
        
        const optionsNamesList = extraOptionsSelected?.map((option) => option.optionName);
        const optionsNamesString = optionsNamesList ? '(' + optionsNamesList.join(', ') + ')' : '';

        descriptionArray.push(
            createMetadataString([
                name,
                region,
                coachLvl?.coachLvlName,
                desiredRating && `${desiredRating}-${currentRating}`,
                hours,
                resourceAmount,
                extraOptionsSelected && optionsNamesString,
                startRating
            ])
        );
    });

    const descriptionString = descriptionArray.join(' // ').replaceAll('null', '');

    return descriptionString;
}

module.exports = metadataStrings;