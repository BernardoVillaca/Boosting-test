import React, { useEffect } from 'react'
import { useContext } from 'react'
import CustomButton from '../buttons/customButton';
import { ServicePageContext } from '../context/service-page.context'
import ServiceTabContainer from './serviceTabContainer';

const CoachLvlTab = ({ service }) => {
    const { coachLvls } = service

    const { setcoachLvl, coachLvl } = useContext(ServicePageContext);
    useEffect(() => setcoachLvl(coachLvls[0]), [])
    
    return (
        <ServiceTabContainer tabName={'CoachLvl'}>
            <div className='flex flex-col justify-center items-center space-y-1 '>
                {coachLvls.map((item, index) =>
                    <CustomButton
                        
                        children={item.coachLvlName}
                        toggle={item.coachLvlName === coachLvl?.coachLvlName}
                        key={index}
                        size={'w-[6.5rem] h-8'}
                        onClick={() => setcoachLvl(item)}
                    >
                    </CustomButton>
                )}
            </div>
        </ServiceTabContainer>

    )
}

export default CoachLvlTab