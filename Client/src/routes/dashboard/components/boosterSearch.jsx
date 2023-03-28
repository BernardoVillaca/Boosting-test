import React, { useState } from 'react'
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

const BoosterSearch = () => {
  const [servicesArray, setServicesArray] = useState([])
  const [booster, setBooster] = useState({})
  const [boosterId, setBoosterId] = useState('')
  const [error, setError] = useState()
  const { boosterTags, discord, email, displayName, id } = booster


  const handleSubmit = async (event) => {
    event.preventDefault()
    const firstresponse = await getDocumentById('boosters', boosterId)
    if (firstresponse?.error) return setError(firstresponse?.error)
    setBooster(firstresponse.success)
    const secondResponse = await getDocumentSubCollection('boosters', boosterId, 'services')
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
            label='Booster Id'
            id='booster id'
            onChange={(e) => {
              setError(null)
              setBoosterId(e.target.value)
            }}
            value={boosterId}
          ></FormInput>
          <button
            className='flex text-sm w-10 h-10 place-content-center '
          >
            <FaSearch size={15} />
          </button>
        </form>
      </div>
      {(Object.keys(booster)).length !== 0 &&
        <>
          <div className='flex flex-col py-12'>
            <div className='flex'>
              <span>Tags:</span>
              {boosterTags?.map((item, index) =>
                <span key={index} className='px-2'>{item}</span>
              )}
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
          <ServiceItems key={item.service_id} servicesItem={item} tabs={tabs} />
        )}
    </div>
  )
}

export default BoosterSearch