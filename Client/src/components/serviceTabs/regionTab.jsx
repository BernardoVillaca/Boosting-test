import React, { useEffect } from 'react'
import { useContext } from 'react'
import CustomButton from '../buttons/customButton'
import { ServicePageContext } from '../context/service-page.context'
import ServiceTabContainer from './serviceTabContainer'

const RegionTab = () => {
    const { region, setRegion } = useContext(ServicePageContext)


    useEffect(() => setRegion('Us'), [])


    return (
        <ServiceTabContainer tabName={'Region'}>
            <div className='flex items-center place-content-center space-x-2'>
                <CustomButton
                    size={'w-12 h-12'}
                    onClick={() => setRegion('Us')}
                    children={'US'}
                    toggle={region === 'Us'}
                    hover={false}
                />
                <CustomButton
                    size={'w-12 h-12'}
                    onClick={() => setRegion('Eu')}
                    children={'EU'}
                    toggle={region === 'Eu'}
                    hover={false}
                />
            </div>
        </ServiceTabContainer>
    )
}
export default RegionTab