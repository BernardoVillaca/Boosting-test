import React from 'react'
import { useState } from 'react'
import { axiosRequesthWithToken, verifyTokenById } from '../../../utils/api.utils'
import { getUserByEmail, getUserIdToken } from '../../../utils/firebase.utils'
import FormInput from '../../../components/formInput'
import { FaSearch } from "react-icons/fa";


const AddBooster = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)
  const [customClaims, setCustomClaims] = useState({})
  const [checked, setChecked] = useState([])
  const [message, setMessage] = useState(null)

  const boosterTags = [
    'Arena',
    'Rbg',
    'M+',
    'Raid',
    'Others'
  ]

  const handleSubmit = async (event) => {
    event.preventDefault()
    setCustomClaims({})
    const response = await getUserByEmail(email)
    if (response?.error) return setError(response.error)
    if (response?.success) {
      setUser(response?.success)
      setEmail('')
      setError('')
      setMessage(null)
      const customClaims = await verifyTokenById(user?.id)
      if (customClaims) setCustomClaims(customClaims)
    }
  }

  const handleCheck = (event) => {
    var checkedList = [...checked]
    if (event.target.checked) {
      checkedList = [...checked, event.target.name]
    }
    else {
      checkedList = checkedList.filter(item => item !== event.target.name)
    }
    setChecked(checkedList)
  }

  const handleClick = async (event) => {
    event.preventDefault()
    const booster = {
      ...user,
      boosterTags: checked,
      createdAt: new Date()
    }
    const response = await axiosRequesthWithToken('addBoosterRole', {
      booster,
      email: user.email
    })
    setMessage(response.data.message)

    // add updated customClaims to the UI
    const customClaims = await verifyTokenById(user.id)
    if (customClaims) setCustomClaims(customClaims)
  }

  return (

    <div className='p-8 w-full'>
      <form
        className='flex items-center'
        onSubmit={handleSubmit}
      >
        <FormInput
          error={error}
          label='Email'
          id='email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setChecked([])
            setMessage(null)
            setError('')
          }}
        ></FormInput>
        <button className='flex text-sm w-10 h-10 place-content-center'>
          <FaSearch size={15} />
        </button>
      </form>
      <div className='h-96 w-full'>
        {user && (
          <div className='flex flex-col'>
            <div className='flex flex-col w-1/2 p-4'>
              <span>Name: {user.displayName}</span>
              <span>Id: {user.id}</span>
              <span>Email: {user.email}</span>
              <span>Discord: {user.discord}</span>
              <span>Claim: {Object.keys(customClaims)[0]}</span>
            </div>
            <div className='flex  w-1/2 bg-slate-100 p-4'>
              <div className='flex flex-col w-1/2'>
                <h1>Booster Tags:</h1>
                {boosterTags.map((item, index) =>
                  <div className='pl-2' key={index}>
                    <input
                      name={item}
                      type='checkbox'
                      onChange={handleCheck}
                    />
                    <span className='text-sm pl-2'>{item}</span>
                  </div>
                )}
              </div>
              <div className='flex w-1/2 place-content-end items-end'>
                <button
                  className='bg-blue-300 p-2 hover:bg-blue-400'
                  onClick={handleClick}
                >
                  Add user as a Booster
                </button>
              </div>
            </div>
            <span>{message}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddBooster