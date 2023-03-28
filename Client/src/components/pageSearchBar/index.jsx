import React, { useEffect, useState } from 'react'
import { BsSearch } from "react-icons/bs";
import useDebounce from '../../hooks/useDebounce';


const PageSearchBar = ({ services, setSearchResults }) => {
    const [search, setSearch] = useState('')
    const [error, setError] = useState(null)
    const debouncedSearch = useDebounce(search, 1000)

    const handleSubmit = (e) => e.preventDefault()


    useEffect(() => {
        const getFilteredSearch = async () => {
            if (debouncedSearch === '') return
            let resultsArray = []
            resultsArray = services.filter(item => item.serviceName.toLowerCase().includes(debouncedSearch))
            if (resultsArray.length === 0) {
                setSearchResults(services)
                return setError('no services found!!')
            }
            setSearchResults(resultsArray)
        }
        getFilteredSearch()
    }, [debouncedSearch])

    const handleSearchChange = async (event) => {
        setSearch(event.target.value)
        setError('')
        if (!event.target.value) return setSearchResults(services)
    }

    return (
        <div className='flex items-center'>
            <form
                className='flex justify-between items-center h-8 w-56 rounded-xl bg-primary/black p-2'
                onSubmit={handleSubmit}
            >
                <input
                    className='outline-none bg-primary/black text-secondary/gray accent-white px-2'
                    onFocus={() => setError('')}
                    onChange={handleSearchChange}
                    value={search}
                    placeholder='search'
                />
                <button className='h-5 w-5 text-secondary/gray'>
                    <BsSearch />
                </button>
            </form>
            {error &&
                <span className='pl-4 text-sm text-custom-red'>{error}</span>
            }
        </div>
    )
}

export default PageSearchBar