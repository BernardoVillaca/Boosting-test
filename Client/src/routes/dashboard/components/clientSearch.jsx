import React from 'react'
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import FormInput from '../../../components/formInput';
import { getDocumentById, getDocumentSubCollection } from '../../../utils/firebase.utils';




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
    tabSize: 'w-48',
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

const ClientSearch = () => {
  const [servicesArray, setServicesArray] = useState([])
  const [error, setError] = useState(null)
  const [clientDoc, setClientDoc] = useState({})
  const [clientId, setClientId] = useState('')
  const { discord, displayName, email, id } = clientDoc
  const handleSubmit = async (event) => {
    event.preventDefault()

    const firstresponse = await getDocumentById('users', clientId)
    if (firstresponse?.error) return setError(firstresponse?.error)
    setClientDoc(firstresponse.success)
    const secondResponse = await getDocumentSubCollection('users', clientId, 'services')
    if (secondResponse?.success) return setServicesArray(secondResponse.success)
    setError(secondResponse?.error)


  }

  return (
    <div className='w-full'>
      <div className='px-8 pt-8 w-full flex'>
        <form
          className='flex items-center'
          onSubmit={handleSubmit}
        >
          <FormInput
            error={error}
            label='Client id'
            id='client id'
            onChange={(e) => {
              setError(null)
              setClientId(e.target.value)
            }}
            value={clientId}
          ></FormInput>
          <button
            className='flex text-sm w-10 h-10 place-content-center '
          >
            <FaSearch size={15} />
          </button>
        </form>
      </div>
      {(Object.keys(clientDoc)).length !== 0 &&
        <>
          <div className='flex flex-col py-12'>
            <div className='flex'>
            </div>
            <span>Id: {id}</span>
            <span>Discord: {discord}</span>
            <span>Email: {email}</span>
            <span>Name: {displayName}</span>
          </div>
          <div className='flex w-full place-content-center items-center text-center'>
            {tabs.map((item, index) =>
              <span key={index} className={`${item.tabSize}`}>{item.tabName}</span>

            )}
          </div>
        </>
      }
      {servicesArray.length !== 0 &&
        servicesArray.map((item) =>
          <ServiceItem key={item.service_id} servicesItem={item} tabs={tabs} />
        )}
    </div>
  )
}

export default ClientSearch