import React, { useContext } from 'react'
import LeftContainer from '../../components/containers/innerPage/left'
import MiddleContainer from '../../components/containers/innerPage/middle'
import PageContainer from '../../components/containers/pageContainer'
import { AppContext } from '../../components/context/appContext'
import backgroundImage from '../../assets/background_elf.png'
import Title from '../../components/pageComponents/title'
import RightContainer from '../../components/containers/innerPage/right'
import ServiceCard from '../../components/serviceCard'
import { getDocumentsByField } from '../../utils/firebase.utils'
import { useFetchWithLocalStorage } from '../../hooks/useFetch'

const ServicesFound = () => {
    const { searchedServices } = useContext(AppContext)
    
    const featuredServices = searchedServices.length === 0 
    ? useFetchWithLocalStorage({ key: 'Featured', fn: () => getDocumentsByField('ServicesInfo', 'featured', true) }) 
    : null

    return (
        <PageContainer image={backgroundImage}>
            <LeftContainer />
            <MiddleContainer otherProps={'space-y-6'}>
                {searchedServices.length !== 0 ?
                    <>
                        <div className='h-14'>
                            <Title text={'Services found for you'} />
                        </div>
                        <div className='flex flex-col space-y-4 h-32 place-content-center'>
                            <span className='text-white'>sdffsdf sdfsdfs fsdf sdfsdf sdfsdfsd fsdfs sdffsdf sdfsdfs fsdf sdfsdf sdfsdfsd fsdfssdffsdf sdfsdfs fsdf sdfsdf sdfsdfsd fsdfs sdffsdf sdfsdfs fsdf sdfsdf sdfsdfsd fsdfs</span>
                        </div>
                        <div className='w-full place-content-center'>
                            <div className='flex flex-wrap w-full h-[27rem] overflow-hidden overflow-y-auto overlay snap-y snap-mandatory'>
                                {searchedServices?.map((item, index) => (
                                    <ServiceCard key={index} item={item} small={true} otherProps={'m-2'} />
                                ))}
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className='h-14'>
                            <Title text={'Sorry. Nothing found!! '} />
                        </div>
                        <div className='flex flex-col space-y-4 h-32 place-content-center'>
                            <span className='text-white'>But don't worry. I got some of our best services for you.</span>
                        </div>
                        <div className='w-full place-content-center'>
                            <div className='flex flex-wrap w-full h-[27rem] overflow-hidden overflow-y-auto overlay snap-y snap-mandatory'>
                                {featuredServices?.map((item, index) => (
                                    <ServiceCard key={index} item={item} small={true} otherProps={'m-2'} />
                                ))}
                            </div>
                        </div>
                    </>
                }
            </MiddleContainer>
            <RightContainer logo={true} />
        </PageContainer>
    )
}

export default ServicesFound