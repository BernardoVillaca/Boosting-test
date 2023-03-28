import React, { useEffect } from 'react'
import { useState } from 'react';
import ServiceCard from '../serviceCard';
import { getCollectionDocuments, getDocumentById } from '../../utils/firebase.utils';
import PageContainer from '../containers/pageContainer';
import LeftContainer from '../containers/innerPage/left';
import RightContainer from '../containers/innerPage/right';
import Title from './title';
import MiddleContainer from '../containers/innerPage/middle';
import PageSearchBar from '../pageSearchBar';
import { useFetchWithLocalStorage } from '../../hooks/useFetch';


const CategoryMenuPage = ({ backgroundImage, id }) => {
    const [info, setInfo] = useState(null)

    const [searchResults, setSearchResults] = useState(null)

    const { description, name } = info || {}
    const services = id
        ? useFetchWithLocalStorage({ key: id, fn: () => getCollectionDocuments(`Categories/${id}/Services`) })
        : null

    useEffect(() => {
        setSearchResults(services);
    }, [services]);


    useEffect(() => {
        const getCategorieInfo = async () => {
            const response = await getDocumentById('Categories', id)
            setInfo(response.success)
        }
        getCategorieInfo()
    }, []);

    return (

        <PageContainer image={backgroundImage}>
            <LeftContainer />
            <MiddleContainer otherProps={'space-y-6'}>
                {services &&
                    <>
                        <div className='h-14'>
                            <Title text={name} />
                        </div>
                        <PageSearchBar services={services} setSearchResults={setSearchResults} />
                        <div className='flex flex-col space-y-4 h-32'>
                            {description?.map((item, index) => (
                                <p key={index} className='text-white text-lg'>{item}</p>
                            ))}
                        </div>
                        <div className='w-full place-content-center'>
                            <div className='flex flex-wrap w-full h-[34rem] overflow-hidden overflow-y-auto overlay snap-y snap-mandatory'>
                                {searchResults?.map((item, index) => (
                                    <ServiceCard key={index} item={item} />
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


export default CategoryMenuPage