import React, { useContext } from 'react'
import { ServicePageContext } from '../context/service-page.context'
import ServiceTabContainer from './serviceTabContainer'

const OptionsTab = ({ service }) => {
  const { serviceOptions } = service;

  const { optionsChecked, setOptionsChecked, setOptionsTotalValue } = useContext(ServicePageContext)

  const handleCheck = (event) => {
    const isChecked = event.target.checked;
    const optionData = {
      optionName: event.target.name,
      optionPrice: event.target.value,
    };
  
    let updatedList = isChecked
      ? [...optionsChecked, optionData]
      : optionsChecked.filter((item) => item.optionName !== event.target.name);
  
    setOptionsChecked(updatedList);
  
    // Calculate the total value and update the state
    const totalValue = updatedList.reduce(
      (sum, option) => sum + parseFloat(option.optionPrice),
      0
    );
    setOptionsTotalValue(totalValue);
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
            <span className='text-sm text-secondary/gray ml-5'>{item.optionPrice == 0 ? 'free!' : null}</span>
          </div>
        )}
      </div>
    </ServiceTabContainer>

  )
}

export default OptionsTab