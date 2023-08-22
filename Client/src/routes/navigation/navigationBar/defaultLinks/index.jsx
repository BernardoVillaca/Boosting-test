import React, { useContext } from 'react'
import { AppContext } from '../../../../components/context/appContext'
import SearchBar from './searchBar'

const DefaultLinks = ({ aboutUsButtonRef }) => {
   
    
    const { isCartOpen, isMenuOpen, setIsCartOpen, setIsMenuOpen } = useContext(AppContext)

    const showMenu = () => {
        if (isCartOpen) setIsCartOpen(false)
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return (
        <div className="flex z-20 space-x-4 items-center">
            <button
                ref={aboutUsButtonRef}
                className="hover:underline text-primary/purple font-heading hidden md:flex "
                onClick={showMenu}
            >
                About us?
            </button>
            {<SearchBar />}
        </div>
    )
}

export default DefaultLinks