import { createContext, useEffect, useState } from 'react'


export const ServicePageContext = createContext()

export const ServicePageProvider = ({ children }) => {
    const [coachLvlPrice, setcoachLvlPrice] = useState(0);
    const [coachLvl, setcoachLvl] = useState(null);
    const [hours, setHours] = useState(0)
    const [optionsTotalValue, setOptionsTotalValue] = useState(0)
    const [region, setRegion] = useState(null)
    const [currentRating, setCurrentRating] = useState(0);
    const [desiredRating, setDesiredRating] = useState(0);
    const [checked, setChecked] = useState({});
    const [wowClass, setWowClass] = useState(null)
    const [classIcon, setClassIcon] = useState(null)
    const [spec, setSpec] = useState(null)
    const [message, setMessage] = useState(null)
    const [faction, setFaction] = useState(null)
    const [resourceAmount, setResourceAmount] = useState(0)
    const [startRating, setStartRating] = useState(0)
    const [boosterString, setBoosterString] = useState('')
    const [notes, setNotes] = useState('')

    useEffect(() => {
        setHours(hours)
        setOptionsTotalValue(optionsTotalValue)
    }, [hours, optionsTotalValue])


    const value = {
        hours, setHours,
        optionsTotalValue, setOptionsTotalValue,
        coachLvlPrice, setcoachLvlPrice,
        coachLvl, setcoachLvl,
        region, setRegion,
        currentRating, setCurrentRating,
        desiredRating, setDesiredRating,
        checked, setChecked,
        wowClass, setWowClass,
        spec, setSpec,
        message, setMessage,
        classIcon, setClassIcon,
        faction, setFaction,
        boosterString, setBoosterString,
        notes, setNotes,
        resourceAmount, setResourceAmount,
        startRating, setStartRating
    }
    return <ServicePageContext.Provider value={value}>{children}</ServicePageContext.Provider>
}