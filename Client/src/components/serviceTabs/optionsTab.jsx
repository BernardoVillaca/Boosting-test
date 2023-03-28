import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { ServicePageContext } from '../context/service-page.context'
import ServiceTabContainer from './serviceTabContainer'

const OptionsTab = ({ service }) => {
  const { serviceOptions } = service;

  const { checked, setChecked, setOptionsTotalValue } = useContext(ServicePageContext)

  const handleCheck = (event) => {
    var updatedList = { ...checked };
    if (event.target.checked) {
      updatedList = { ...checked, [event.target.name]: +event.target.value };
    } else {
      updatedList = { ...checked, [event.target.name]: 0 };
    }
    setChecked(updatedList);

    let sum = Object.values(updatedList).reduce((a, b) => a + b, 0)
    setOptionsTotalValue(sum)
  };

  return (
    <ServiceTabContainer tabName={'Options'}>
      <div className='flex flex-col '>
        {serviceOptions.map((item, index) =>
          <div key={index} className='flex justify-between items-end'>
            <div className='space-x-2'>
              <input
                className='accent-primary/purple'
                name={item.optionName}
                value={item.optionPrice}
                type='checkbox'
                onChange={handleCheck}
              >
              </input>
              <span className='text-secondary/gray'>{item.optionName}</span>
            </div>
            <span className='text-sm text-secondary/gray ml-5'>{item.optionPrice == 0 ? 'free!' : `$${item.optionPrice.toFixed(2)}`}</span>
          </div>
        )}
      </div>
    </ServiceTabContainer>

  )
}

export default OptionsTab