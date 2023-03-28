import React, { useState, useContext, useEffect } from 'react'
import { getCollectionDocuments, getDocumentsByField } from '../../../utils/firebase.utils'
import { DashboardContext } from '../../../components/context/dashboard.context'
import AssignServiceItem from './assignServiceItem'

const AssignServices = () => {
    const [servicesToBeAssigned, setServicesToBeAssigned] = useState([])
    const { boosters, setBoosters } = useContext(DashboardContext)

    useEffect(() => {
        const getServices = async () => {
            const fetchedServices = await getDocumentsByField('servicesPurchased', 'boostersAssigned', null)
            setServicesToBeAssigned(fetchedServices)
        }
        const getBoosters = async () => {
            const fetchedBoosters = await getCollectionDocuments('boosters')
            setBoosters(fetchedBoosters)
        }
        getBoosters()
        getServices()

    }, [])


    if (servicesToBeAssigned !== [] && boosters !== []) {
        return (
            <div className='flex flex-col h-full w-full '>
                <div className='flex h-16 place-content-center items-center text-center text-sm'>
                    <span className='w-1/4'>Service Name</span>
                    <span className='w-1/4'>Service Id</span>
                    <span className='w-32'>Customer Id</span>
                    <span className='w-1/4'>Service Info</span>
                    <span className='w-48'>Custormer Disc</span>
                    <span className='w-48'>Price</span>
                    <span className='w-1/4'>Assign booster</span>
                </div>
                <div>
                    {servicesToBeAssigned.map((item) => (
                        <AssignServiceItem serviceItem={item} key={item.service_id} />
                    ))}
                </div>
            </div>
        )
    }
}

export default AssignServices