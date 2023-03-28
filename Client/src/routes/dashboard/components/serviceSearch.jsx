import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { getDocumentsByField } from '../../../utils/firebase.utils';
import FormInput from '../../../components/formInput';
import { axiosRequesthWithToken } from '../../../utils/api.utils';

const ServiceSearch = () => {
    const [serviceId, setServiceId] = useState('')
    const [error, setError] = useState('')
    const [serviceFound, setServiceFound] = useState(null)
    const [message, setMessage] = useState('')


    const handleSubmit = async (event) => {
        event.preventDefault()
        if (serviceId === '') return setError('First type a service id')
        const serviceArray = await getDocumentsByField('servicesPurchased', 'service_id', serviceId)
        if (serviceArray.length === 0) return setError('Service not Found!')
        setError('')
        setServiceFound(serviceArray[0])
        setServiceId('')
    }

    const handleClick = async () => {
        if (serviceFound.status === 'completed') return setMessage('Service has already been listed')
        if (serviceFound.boostersAssigned === null) return setMessage('Assign service to a booster before listing')

        const response = await axiosRequesthWithToken('listServiceAsComplete', {
            serviceFound
        })
        setMessage(response.data.message)
    }

    return (
        <div className='w-full'>
            <div className='p-8 w-full flex'>
                <div className='flex items-center'>
                    <FormInput
                        error={error}
                        label='Service Id'
                        id='email'
                        value={serviceId}
                        onChange={(e) => {
                            setError('')
                            setServiceId(e.target.value)
                        }}
                    ></FormInput>
                    <button
                        className='flex text-sm w-10 h-10 place-content-center'
                        onClick={handleSubmit}
                    >
                        <FaSearch size={15} />
                    </button>
                </div>
            </div>
            <div className='w-1/2'>
                {serviceFound &&
                    <div className='flex flex-col w-full h-96'>
                        <span>Service Id: {serviceFound.service_id}</span>
                        <span>Description: {serviceFound.name}</span>
                        <span>Customer Id: {serviceFound.customer_id}</span>
                        <span>Price: ${serviceFound.price.toFixed(2)}</span>
                        <span>Boosters: {serviceFound.boostersAssigned?.map(item => item.discord).toString()}</span>
                        <span>status: {serviceFound.status}</span>
                        <button
                            className='w-32 h-8 mt-8 bg-blue-300 hover:bg-blue-400 cursor-default rounded-xl'
                            onClick={handleClick}
                        >
                            List as complete
                        </button>
                        {message &&
                            <span>{message}</span>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default ServiceSearch