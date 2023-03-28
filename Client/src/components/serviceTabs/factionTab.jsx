import React, { useContext, useEffect } from 'react'
import CustomButton from '../buttons/customButton'
import { ServicePageContext } from '../context/service-page.context'
import ServiceTabContainer from './serviceTabContainer'


const FactionTab = () => {
    const { faction, setFaction } = useContext(ServicePageContext)

    useEffect(() => setFaction('Horde'),[])
    
    return (
        <ServiceTabContainer tabName={'Faction'}>
            <div className='flex items-center place-content-center space-x-2'>
                <CustomButton
                    size={'w-12 h-12'}
                    disabled={false}
                    onClick={() => setFaction('Horde')}
                    children={'Horde'}
                    toggle={faction === 'Horde'}
                    hover={false}
                >

                </CustomButton>
                <CustomButton
                    size={'w-12 h-12'}
                    disabled={false}
                    onClick={() => setFaction('Alliance')}
                    children={'Ally'}
                    toggle={faction === 'Alliance'}
                    hover={false}
                >

                </CustomButton>
            </div>

        </ServiceTabContainer>
    )
}

export default FactionTab