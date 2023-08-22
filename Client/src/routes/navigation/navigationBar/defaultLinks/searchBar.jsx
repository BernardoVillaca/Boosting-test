import React, { useContext, useEffect, useState } from 'react'
import { BsSearch } from "react-icons/bs";
import useDebounce from '../../../../hooks/useDebounce';
import { AiOutlineClose } from "react-icons/ai";
import algoliasearch from 'algoliasearch/lite';
import { VscLoading } from "react-icons/vsc";
import { AppContext } from '../../../../components/context/appContext';
import { Link, useLocation } from 'react-router-dom';

const searchClient = algoliasearch(
    'HNI117QS2X',
    '3994f5937e73d28b7e3491e720416693'
);

const SearchBar = () => {
    const [search, setSearch] = useState('')
    const [isDropDownOpen, setIsDropDownOpen] = useState(false)
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { searchedServices, setSearchedServices } = useContext(AppContext)
    const debouncedSearch = useDebounce(search, 1000)
    const handleSubmit = (e) => e.preventDefault()
    const { pathname } = useLocation()
    const screenWidth = window.innerWidth;



    const getSearchedsearchedServices = async () => {
        if (debouncedSearch) {
            setIsLoading(true)
            const searchResults = await searchClient.search([{
                indexName: 'innate_SERVICESINFO',
                query: debouncedSearch,
            }]);
            setSearchedServices(searchResults.results[0].hits);
            if (pathname !== '/services-found') setIsDropDownOpen(true)
            return setIsLoading(false)
        }
        setIsDropDownOpen(false)
    };

    useEffect(() => {
        getSearchedsearchedServices();
    }, [debouncedSearch]);

    useEffect(() => {
        setIsDropDownOpen(false)
        if (pathname !== '/services-found') setSearch('')
    }, [pathname]);

    const handleClose = () => {
        setSearch('')
        setIsDropDownOpen(false)
        setIsMobileSearchOpen(false)
    }

    const handleSearchChange = async (e) => {
        e.preventDefault()
        setSearch(e.target.value)
    }

    const handleSearchClick = () => {
        setIsMobileSearchOpen(!isMobileSearchOpen)
    }

    return (
        <div className='relative items-center pl-8 md:pl-0 '>
            <form
                className='flex place-content-center items-center w-8 h-8 md:w-56 md:rounded-xl rounded-full bg-secondary/gray border-[1px] border-primary/black border-opacity-20 p-2 '
                onSubmit={handleSubmit}
            >
                <input
                    className='outline-none bg-secondary/gray px-2 hidden md:flex'
                    onChange={handleSearchChange}
                    value={search}
                    placeholder='search'
                />
                <div className='h-5 w-5 '>
                    {isDropDownOpen ? (
                        <>
                            {isLoading ?
                                <VscLoading className='animate-spin' /> :
                                <button onClick={handleClose}>
                                    <AiOutlineClose />
                                </button>
                            }
                        </>
                     ) : (
                        <>
                            {isLoading ?
                                <VscLoading className='animate-spin' />
                                :
                                <button
                                    onClick={handleSearchClick}
                                    disabled={screenWidth >= 769}
                                >
                                    <BsSearch />
                                </button>
                            }
                        </>
                    )}
                </div>
            </form>
            <div className='absolute flex flex-col -left-14 top-14  md:left-0 z-10 space-y-2'>
                {isMobileSearchOpen &&
                    <form className='md:hidden flex w-56 h-8 bg-secondary/gray rounded-md'>
                        <input
                            className='outline-none bg-secondary/gray px-2 md:hidden rounded-md'
                            onChange={handleSearchChange}
                            value={search}
                            placeholder='search'
                        />
                    </form>
                }
                {isDropDownOpen &&
                    <button
                        className={`flex w-56 h-8 rounded-md bg-secondary/gray items-center place-content-center text-primary/purple 
                                ${searchedServices.length !== 0 && 'hover:underline'} border-[1px] border-secondary/gray border-opacity-20 shadow-xl`}
                        disabled={searchedServices.length === 0}

                    >
                        {searchedServices.length === 0 ?
                            <span className=''>Sorry. Nothing found!!</span>
                            :
                            <Link
                                to={'/services-found'}
                                className='flex place-content-center items-end'
                            >
                                <span>I got </span>
                                <div className='flex h-6 w-6 items-end place-content-center'>
                                    {isLoading ?
                                        <VscLoading className='animate-spin mb-1' />
                                        :
                                        <span className='text-custom-green'>{searchedServices && searchedServices.length}</span>
                                    }
                                </div>
                                <span>services for you!!</span>
                            </Link>
                        }
                    </button>
                }
            </div>
        </div >
    )
}

export default SearchBar