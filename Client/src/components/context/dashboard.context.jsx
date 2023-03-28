import { createContext, useState, useEffect } from 'react'


export const DashboardContext = createContext({
    boosters: [],
    setBoosters: () => { },

});

export const DashboardProvider = ({ children }) => {
    const [boosters, setBoosters] = useState([])


    const value = {
        boosters, setBoosters
    }

    return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>

}