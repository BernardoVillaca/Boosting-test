import React from 'react'
import { Link } from 'react-router-dom'

const UserDropdown = ({handleSignout, setIsUserDropDownOpen}) => {
    return (
        <div className='flex flex-col absolute w-24 top-8 right-0 rounded-md bg-white overflow-hidden'>
            <Link
                onClick={() => setIsUserDropDownOpen(false)}
                to={'/profile'}
                className='text-start hover:bg-secondary/gray px-2'
            >
                Profile
            </Link>
            <button
                className='text-start hover:bg-secondary/gray px-2 '
                onClick={handleSignout}
            >
                Sign Out
            </button>
        </div>
    )
}

export default UserDropdown