import React, { useState, useEffect } from 'react'
import { getDocumentOrderedByField, getDocumentOrderedByFieldsDesc, getDocumentsOrderedByField } from '../../../utils/firebase.utils';
import Arrow from '../../../components/searchArrow';
import ServiceItem from './serviceItem';

const tabs = [
    {
        tabName: 'Service Name',
        tabSize: 'w-1/3',
        fieldName: 'name'
    },
    {
        tabName: 'Service Id',
        tabSize: 'w-1/3',
        disabled: true
    },
    {
        tabName: 'Customer Id',
        tabSize: 'w-32',
        disabled: true
    },
    {
        tabName: 'Service Info',
        tabSize: 'w-1/3',
        disabled: true
    },
    {
        tabName: 'Customer Disc',
        tabSize: 'w-48',
        fieldName: 'customer_discord'
    },
    {
        tabName: 'Price',
        tabSize: 'w-48',
        fieldName: 'price'
    },
    {
        tabName: 'B. Assigned Date',
        tabSize: 'w-56',
        fieldName: 'boostersAssignedDate'
    },
    {
        tabName: 'Purchase Date',
        tabSize: 'w-48',
        fieldName: 'servicePurchasedDate'
    },
    {
        tabName: 'Status',
        tabSize: 'w-48',
        fieldName: 'status'
    },
]
const Services = () => {
    const [services, setServices] = useState([])
    const [orderedSearch, setOrderedSearch] = useState('servicePurchasedDate')
    const [descendantSearch, setDescendantSearch] = useState(true)
    
    
    useEffect(() => {
        const getDocuments = async () => {
            const documents = await getDocumentsOrderedByField({
                collectionName: 'servicesPurchased',
                fieldName: `${orderedSearch}`,
                descendant: descendantSearch ? true : false
            })
             setServices(documents)
       }
        getDocuments()
    }, [descendantSearch, orderedSearch])

    const handleClick = (item) => {
        if (orderedSearch === item.fieldName) return setDescendantSearch(!descendantSearch)
        setOrderedSearch(item.fieldName)
        setDescendantSearch(false)
    }

    return (
        <div className='flex flex-col w-full overflow-auto'>
            <div className='flex h-16 text-center text-sm'>
                {tabs.map((item, index) =>
                    <button
                        className={`${item.tabSize} ${item.disabled ? '' : 'text-blue-600'} ${orderedSearch === item.fieldName ? 'underline' : ''}`}
                        onClick={() => handleClick(item)}
                        key={index}
                        disabled={item.disabled}
                    >
                        <div className='flex items-center place-content-center'>
                            <span>{item.tabName}</span>
                            {orderedSearch === item.fieldName &&
                                <Arrow descendantSearch={descendantSearch} />
                            }
                        </div>
                    </button>
                )}
            </div>
            {services &&
                services.map((item) =>
                    <ServiceItem key={item.service_id} servicesItem={item} tabs={tabs} />
                )}
        </div>
    )
}

export default Services