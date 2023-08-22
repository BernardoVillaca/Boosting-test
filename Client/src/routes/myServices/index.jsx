import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams, Link } from 'react-router-dom'
import Arrow from '../../components/searchArrow'
import MyServicesItem from './myServicesItem'
import { selectCurrentUser } from '../../store/user/user.selector'
import { getSubCollectionOrderedByfield } from '../../utils/firebase.utils'
import textureBackground from '../../assets/background_texture.png'
import Title from '../../components/pageComponents/title'
import PageContainer from '../../components/containers/pageContainer'
import MiddleContainer from '../../components/containers/innerPage/middle'
import RightContainer from '../../components/containers/innerPage/right'
import LeftContainer from '../../components/containers/innerPage/left'
import { useFetch } from '../../hooks/useFetch'


const searchTabs = [
    {
        searchTabName: 'Service Id',
        searchTabSize: 'w-1/4 text-xs md:text-sm lg:text-base 2xl:w-1/3',
        searctTabParams: 'service_id',
        searchDisabled: true

    },
    {
        searchTabName: 'Service Name',
        searchTabSize: 'w-1/4 text-xs md:text-sm lg:text-base 2xl:w-1/3  ',
        searctTabParams: 'name'
        

    },
    {
        searchTabName: 'Service Info',
        searchTabSize: ' hidden 2xl:flex 2xl:w-1/3',
        searctTabParams: 'service-info',
        searchDisabled: true

    },
    {
        searchTabName: 'Price',
        searchTabSize: 'w-1/4 text-xs md:text-sm lg:text-base 2xl:w-[12rem] ',
        searctTabParams: 'price'

    },
    {
        searchTabName: 'Purchased Date',
        searchTabSize: ' xl:w-[15rem] hidden 2xl:flex',
        searctTabParams: 'servicePurchasedDate'

    },
    {
        searchTabName: 'Boosters Assigned',
        searchTabSize: 'w-1/4 text-xs md:text-sm lg:text-base 2xl:w-[15.5rem]',
        searctTabParams: 'boostersAssigned',
        searchDisabled: true

    },
    {
        searchTabName: 'Status',
        searchTabSize: ' w-[12rem] hidden 2xl:flex',
        searctTabParams: 'status'

    },
]

const MyServicesPage = () => {
    const currentUser = useSelector(selectCurrentUser)
    const [searchParams, setSearchParams] = useSearchParams({ search: 'purchased-date' })
    const [descendantSearch, setDescendantSearch] = useState(true)

    const handleClick = (item) => {
        setSearchParams({ search: item.searctTabParams })
        if (searchParams.get('search') !== item.searctTabParams) return setDescendantSearch(false)
        setDescendantSearch(!descendantSearch)
    }

    const fetchServices = useCallback(async () => {
        if (currentUser) {
            const services = await getSubCollectionOrderedByfield({
                collectionName: "users",
                id: currentUser.uid,
                subCollectionName: "services",
                fieldName: searchParams.get("search"),
                descendant: descendantSearch ? true : false,
            });
            return services;
        }
    }, [currentUser, searchParams, descendantSearch]);

    const services = useFetch({
        key: ["services", currentUser?.uid, searchParams.get("search"), descendantSearch],
        fn: () => fetchServices(),
    });


    return (
        <PageContainer image={textureBackground}>
            <LeftContainer />
            <MiddleContainer otherProps={'space-y-8 pl-14 md:pl-16 xl:pl-8 2xl:pl-0 pr-6 2xl:pr-0'}>
                <Title text={'My services'} />
                {/* orders container */}
                <div className='flex flex-col w-full h-full bg-primary/black rounded-md'>
                    <div className='flex'>
                        {searchTabs.map((item, index) =>
                            <Link
                                to={`/my-services?search=${item.searctTabParams}`}
                                key={index}
                                className={` flex items-center px-1
                                    ${item.searchTabSize} 
                                    ${item.searchDisabled !== true ? 'text-primary/purple' : 'text-white'} 
                                    ${searchParams.get('search') === item.searctTabParams && 'underline'}
                                `}
                                onClick={() => handleClick(item)}
                                style={{ pointerEvents: item.searchDisabled !== true ? '' : 'none' }}
                            >
                                <div className='flex items-center place-content-center '>
                                    <span>{item.searchTabName}</span>
                                    {searchParams.get('search') === item.searctTabParams &&
                                        <Arrow descendantSearch={descendantSearch} />
                                    }
                                </div>
                            </Link>
                        )}
                    </div>
                    <div className='flex flex-col h-[674px] overflow-auto overlay'>
                        {services && services?.map((item) => (
                            <MyServicesItem key={item.service_id} serviceItem={item} searchTabs={searchTabs} />
                        ))}
                    </div>
                </div>
            </MiddleContainer>
            <RightContainer logo={true} />
        </PageContainer>
    )
}

export default MyServicesPage