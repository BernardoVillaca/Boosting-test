import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { DashboardProvider } from '../../components/context/dashboard.context'
import { selectCurrentUser } from '../../store/user/user.selector'
import { manualSync, verifyCurrentUserClaims } from '../../utils/api.utils'
import Home from '../homePage'
import AddBooster from './components/addBooster'
import AssignServices from './components/assignService'
import BoosterSearch from './components/boosterSearch'
import ClientSearch from './components/clientSearch'
import Services from './components/services'
import ServiceSearch from './components/serviceSearch'


const Dashboard = () => {
    const currentUser = useSelector(selectCurrentUser)
    const [customClaims, setCustomClaims] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams();

    const buttons = [
        {
            buttonName: 'Assign Services',
            buttonParams: 'assign-services'
        },
        {
            buttonName: 'Services',
            buttonParams: 'services'
        },
        {
            buttonName: 'Service Search',
            buttonParams: 'service-search'
        },
        {
            buttonName: 'Booster Search',
            buttonParams: 'booster-search'
        },
        {
            buttonName: 'Client Search',
            buttonParams: 'client-search'
        },
        {
            buttonName: 'Add Booster',
            buttonParams: 'add-booster'
        },
    ]

    useEffect(() => {
        const getCustomClaims = async () => {
            const customClaims = await verifyCurrentUserClaims(currentUser)
            setCustomClaims(customClaims)
        }
        getCustomClaims()

    }, [currentUser])

    const syncHandler = () => {
        manualSync()
    }

    if (!customClaims?.admin) return <Home />
    return (
        <DashboardProvider>
            <div className='flex flex-col p-16'>
                <div className='flex flex-row h-10 w-full'>
                    {buttons.map((button, index) =>
                        <Link
                            to={`/dashboard?tab=${button.buttonParams}`}
                            key={index}
                            className={
                                `flex place-content-center items-center cursor-default 
                                hover:bg-blue-300 w-36 text border-r-2 
                                ${searchParams.get('tab') === button.buttonParams ? 'bg-blue-400' : 'bg-blue-200'}`
                            }
                            onClick={() => setSearchParams({ tab: button.buttonParams })}
                        >
                            {button.buttonName}
                        </Link>
                    )}
                </div>
                <div className='flex'>
                    {searchParams.get('tab') === 'assign-services' && <AssignServices />}
                    {searchParams.get('tab') === 'add-booster' && <AddBooster />}
                    {searchParams.get('tab') === 'service-search' && <ServiceSearch />}
                    {searchParams.get('tab') === 'client-search' && <ClientSearch />}
                    {searchParams.get('tab') === 'booster-search' && <BoosterSearch />}
                    {searchParams.get('tab') === 'services' && <Services />}
                    <button
                        className='w-16 h-8 bg-blue-300'
                        onClick={syncHandler}

                    >
                        SYNC
                    </button>
                </div>
            </div>
        </DashboardProvider>
    )
}

export default Dashboard