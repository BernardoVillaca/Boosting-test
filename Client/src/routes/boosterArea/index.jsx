import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams, Link } from 'react-router-dom'
import Arrow from '../../components/searchArrow'
import MyServicesItem from '../myServices/myServicesItem'
import { selectCurrentUser } from '../../store/user/user.selector'
import { getSubCollectionOrderedByfield } from '../../utils/firebase.utils'
import textureBackground from '../../assets/background_texture.png'
import PageContainer from '../../components/containers/pageContainer'
import LeftContainer from '../../components/containers/innerPage/left'
import MiddleContainer from '../../components/containers/innerPage/middle'
import RightContainer from '../../components/containers/innerPage/right'
import Title from '../../components/pageComponents/title'
import { useFetch } from '../../hooks/useFetch'


const searchTabs = [
    {
        searchTabName: 'Service Id',
        searchTabSize: 'w-1/4',
        searctTabParams: 'service_id',
        searchDisabled: true

    },
    {
        searchTabName: 'Service Name',
        searchTabSize: 'w-1/4',
        searctTabParams: 'name'

    },
    {
        searchTabName: 'Service Info',
        searchTabSize: 'w-1/4',
        searctTabParams: 'service-info',
        searchDisabled: true

    },
    {
        searchTabName: 'Price',
        searchTabSize: 'w-48',
        searctTabParams: 'price'

    },
    {
        searchTabName: 'Purchased Date',
        searchTabSize: 'w-[13rem]',
        searctTabParams: 'servicePurchasedDate'

    },
    {
        searchTabName: 'Customer Discord',
        searchTabSize: 'w-1/4',
        searctTabParams: 'boostersAssigned',
        searchDisabled: true

    },
    {
        searchTabName: 'Status',
        searchTabSize: 'w-[14rem]',
        searctTabParams: 'status'

    },
]

const BoosterArea = () => {
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
                collectionName: 'boosters',
                id: currentUser.uid,
                subCollectionName: 'services',
                fieldName: searchParams.get('search'),
                descendant: descendantSearch ? true : false
            })
            return services
        }
    }, [currentUser, searchParams, descendantSearch]);

    const services = useFetch({
        key: ["boosterServices", currentUser?.uid, searchParams.get("search"), descendantSearch],
        fn: () => fetchServices(),
    });

    return (

        <PageContainer image={textureBackground}>
            <LeftContainer />
            <MiddleContainer otherProps={'space-y-8'}>
                <Title text={'Assigned Services'} />
                <div className='flex flex-col w-full items-center  '>
                    {/* orders container */}
                    <div className='flex flex-col w-full'>
                        <div className='flex justify-between text-center'>
                            {searchTabs.map((item, index) =>
                                <Link
                                    to={`/booster-area?search=${item.searctTabParams}`}
                                    key={index}
                                    className={`
                                        ${item.searchTabSize} 
                                        ${item.searchDisabled !== true && 'text-blue-400'} 
                                        ${searchParams.get('search') === item.searctTabParams && 'underline'}
                                    `}
                                    onClick={() => handleClick(item)}
                                    style={{ pointerEvents: item.searchDisabled !== true ? '' : 'none' }}
                                >
                                    <div className='flex items-center place-content-center'>
                                        <span>{item.searchTabName}</span>
                                        {searchParams.get('search') === item.searctTabParams &&
                                            <Arrow descendantSearch={descendantSearch} />
                                        }
                                    </div>
                                </Link>
                            )}
                        </div>
                        {services?.map((item) => (
                            <MyServicesItem key={item.service_id} serviceItem={item} searchTabs={searchTabs} boosterArea={true}
                            />
                        ))}
                    </div>
                </div>
            </MiddleContainer>
            <RightContainer />
        </PageContainer>
    )
}

export default BoosterArea