import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../store/user/user.selector"
import { reauthenticateUser } from "../firebase.utils"


export const checkEmailVerified = () => {
    const currentUser = useSelector(selectCurrentUser)

    useEffect(() => {
        const reloadUser = () => {
            if (currentUser?.emailVerified === false) return reauthenticateUser()
        }
        if (currentUser?.emailVerified === true) clearInterval(interval)
        if (currentUser?.emailVerified === false) {
            var interval = setInterval(() => reloadUser(), 3000)
        }

        return () => clearInterval(interval)
    }, [])

    return currentUser?.emailVerified
}
