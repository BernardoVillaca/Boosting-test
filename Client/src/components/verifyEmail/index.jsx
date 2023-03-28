import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../store/user/user.selector'
import { reauthenticateUser, sendUserVerificationEmail } from '../../utils/firebase.utils'



const VerifyEmail = ({ setIsEmailVerified }) => {
    const currentUser = useSelector(selectCurrentUser)
    const [error, setError] = useState(null)

    useEffect(() => {
        const reloadUser = () => {
            if (currentUser?.emailVerified === false) return reauthenticateUser()
            setIsEmailVerified(true)
        }
        if (currentUser?.emailVerified === true) return clearInterval(interval)
        var interval = setInterval(() => reloadUser(), 3000)

        return () => clearInterval(interval)
    }, [currentUser])

    return (
        <div className='h-16 p-2 border-[1px] border-light-purple border-opacity-20 rounded-md mt-2'>
            <div>
                <span className='text-white'>You have successfully created your account. Please check your email to complete your registration by verfying it.</span>
                <div>
                    <span className='text-white'>{`If you haven't got it, click here to `}</span>
                    <button
                        className={`text-yellowish/white ${error !== null ? '' : 'hover:underline'}`}
                        disabled={error !== null}
                        onClick={async () => {
                            const response = await sendUserVerificationEmail()
                            if (response?.error === 'Firebase: Error (auth/too-many-requests).') return setError('too many attemps try again later!!')
                            if (response?.error) return setError(response.error)
                        }}
                    >
                        resend the verfication email
                    </button>
                    {error !== null &&
                        <span className='text-red-500 text-sm pl-4'>{error}</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail