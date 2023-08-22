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
            <MiddleContainer >
                {services &&
                    <div className=' space-y-4 '>
                        <div className='h-14 pl-14  lg:pl-12  2xl:pl-0'>
                            <Title text={name} />
                        </div>
                        <PageSearchBar services={services} setSearchResults={setSearchResults} />
                        <div className='flex flex-col space-y-4 pl-14 pr-8  lg:pl-12  2xl:pl-0'>
                            {description?.map((item, index) => (
                                <p key={index} className='text-white text-lg'>{item}</p>
                            ))}
                        </div>
                        <div className='flex w-full place-content-center md:place-content-start md:pl-9 2xl:pl-0 pb-4'>
                            <div className='flex flex-wrap w-[17rem] lg:w-[34rem] xl:w-[51rem] 2xl:w-[68rem] h-[33rem] overflow-hidden overflow-y-auto overlay snap-y snap-mandatory '>
                                {searchResults?.map((item, index) => (
                                    <ServiceCard key={index} item={item} />
                                ))}
                            </div>
                        </div>

                    </div>
                }
            </MiddleContainer>
            <RightContainer logo={true} />
        </PageContainer>
    )
}


export default CategoryMenuPage