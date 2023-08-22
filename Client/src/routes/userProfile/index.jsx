import React, { useContext, useEffect, useState } from 'react'
import { MdModeEditOutline } from "react-icons/md"
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../store/user/user.selector'
import { getUserByUid, updateUserDiscord, updateUserEmail, updateUserName } from '../../utils/firebase.utils'
import { VscLoading } from "react-icons/vsc";
import VerifyEmail from '../../components/verifyEmail'
import PageContainer from '../../components/containers/pageContainer'
import textureBackground from '../../assets/background_texture.png'
import LeftContainer from '../../components/containers/innerPage/left'
import MiddleContainer from '../../components/containers/innerPage/middle'
import RightContainer from '../../components/containers/innerPage/right'
import { AppContext } from '../../components/context/appContext'
import UserProfileInput from './userProfileInput'
import Title from '../../components/pageComponents/title'
import Home from '../homePage'
import { useFetch } from '../../hooks/useFetch'

const UserProfile = () => {
    const { setIsPasswordWindowOpen, passwordChangeEffect, userInfo, setUserInfo } = useContext(AppContext)
    const currentUser = useSelector(selectCurrentUser)
    const [isEditEnabled, setIsEditEnabled] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isEmailVerified, setIsEmailVerified] = useState(null)


    const [newEmail, setNewEmail] = useState('')
    const [newDiscord, setNewDiscord] = useState('')
    const [newName, setNewName] = useState('')

    const [emailError, setEmailError] = useState(null)
    const [nameError, setNameError] = useState(null)
    const [discordError, setDiscordError] = useState(null)

    const [emailEffect, setEmailEffect] = useState(false)
    const [nameEffect, setNameEffect] = useState(false)
    const [discordEffect, setDiscordEffect] = useState(false)


    const fetchedUserInfo = useFetch({
        key: ['userInfo', currentUser?.uid],
        fn: async () => (currentUser ? await getUserByUid(currentUser.uid) : null),
    });

    useEffect(() => {
        if (fetchedUserInfo) {
            setIsEmailVerified(currentUser?.emailVerified);
            setUserInfo(fetchedUserInfo);
            setNewName(fetchedUserInfo.displayName);
            setNewDiscord(fetchedUserInfo.discord);
            setNewEmail(fetchedUserInfo.email);
        }
    }, [fetchedUserInfo, currentUser]);

    const handleSaveNewUserInfo = async () => {
        setIsProcessing(true)
        if (newEmail !== userInfo.email) {
            const response = await updateUserEmail(newEmail)
            const newUserInfo = { ...userInfo, email: newEmail }
            if (response?.error) {
                setIsProcessing(false)
                return setEmailError(response.error)
            }
            setEmailEffect(true)
            setUserInfo(newUserInfo)
        }
        if (newName !== userInfo.displayName) {
            const response = await updateUserName(newName)
            const newUserInfo = { ...userInfo, displayName: newName }
            if (response?.error) {
                setIsProcessing(false)
                return setNameError(response.error)
            }
            setNameEffect(true)
            setUserInfo(newUserInfo)
        }
        if (newDiscord !== userInfo.discord) {
            const response = await updateUserDiscord(newDiscord)
            const newUserInfo = { ...userInfo, discord: newDiscord }
            if (response?.error) {
                setIsProcessing(false)
                return setDiscordError(response.error)
            }
            setDiscordEffect(true)
            setUserInfo(newUserInfo)
        }
        setIsProcessing(false)
        setIsEditEnabled(false)
    }

    const handleCancel = () => {
        setNewName(userInfo.displayName)
        setNewDiscord(userInfo.discord)
        setNewEmail(userInfo.email)
        setIsEditEnabled(false)
        setEmailError(null)
        setNameError(null)
        setDiscordError(null)
    }


    if (currentUser === null) return <Home />

    return (
        <PageContainer image={textureBackground}>
            <LeftContainer />
            <MiddleContainer >
                <div className='flex flex-col '>
                    {userInfo !== null &&
                        <div className='flex flex-col rounded-md pl-14 md:pl-16 lg:pl-24 2xl:pl-0  items-center md:items-start place-content-center  min-w-[20rem] max-w-lg '>
                            <Title text={'Profile'} />
                            <div className='flex flex-col space-y-4 '>
                            <div className='flex h-8 items-center place-content-end w-full'>
                                {isEditEnabled === false ? (
                                    <button
                                        className='flex rounded-md items-center px-1 bg-primary/black text-white'
                                        onClick={() => setIsEditEnabled(true)}
                                    >
                                        <span className='pr-2'>Edit</span>
                                        <MdModeEditOutline />
                                    </button>
                                ) : (
                                    <div className='flex space-x-2'>
                                        <button
                                            className='flex w-14 rounded-md items-center place-content-center px-1 text-center font-semibold bg-primary/black text-white text-sm'
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className='flex w-14 rounded-md  items-center place-content-center px-1 bg-primary/black text-white font-semibold'
                                            disabled={isProcessing}
                                            onClick={handleSaveNewUserInfo}
                                        >
                                            {isProcessing ?
                                                <VscLoading className='animate-spin' /> :
                                                'Save'
                                            }
                                        </button>
                                    </div>
                                )}
                            </div>
                                <UserProfileInput
                                    isEditEnabled={isEditEnabled}
                                    label={'Email'}
                                    error={emailError}
                                    initialValue={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    onFocus={() => setEmailError(null)}
                                    effect={emailEffect}
                                    setEffect={setEmailEffect}
                                />
                                <UserProfileInput
                                    isEditEnabled={isEditEnabled}
                                    label={'Name'}
                                    error={nameError}
                                    initialValue={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    onFocus={() => setNameError(null)}
                                    effect={nameEffect}
                                    setEffect={setNameEffect}
                                />
                                <UserProfileInput
                                    isEditEnabled={isEditEnabled}
                                    label={'Discord'}
                                    error={discordError}
                                    initialValue={newDiscord}
                                    onChange={(e) => setNewDiscord(e.target.value)}
                                    onFocus={() => setDiscordError(null)}
                                    effect={discordEffect}
                                    setEffect={setDiscordEffect}
                                />
                                <div className='flex flex-col md:flex-row  md:justify-between '>
                                    <span className='text-white '>Password:</span>
                                    <div className=''>
                                        <button
                                            className={`flex sm:flex-col rounded-md p-1 text-sm  ${isEditEnabled ? 'bg-secondary/gray hover:bg-gray-200 border-[1px] text-black border-light-purple border-opacity-20' : 'text-white'}`}
                                            disabled={currentUser?.providerData[0].providerId === 'google.com' || isEditEnabled === false}
                                            onClick={() => {
                                                setIsPasswordWindowOpen(true)
                                                document.body.style.overflow = "hidden"
                                            }}
                                        >
                                            {isEditEnabled ? 'Change password' : '**********'}
                                        </button>

                                        {currentUser?.providerData[0].providerId === 'google.com' &&
                                            <span className='text-xs  text-gray-600'>User logged with google</span>
                                        }
                                    </div>
                                </div>

                            </div>
                            <div className='flex w-full place-content-center items-center'>
                                {passwordChangeEffect &&
                                    <span className='text-custom-green pt-2'>Password has been changed!!</span>
                                }
                            </div>
                        </div>
                    }
                    <div className='h-16 place-content-center items-center'>
                        {isEmailVerified === false && <VerifyEmail setIsEmailVerified={setIsEmailVerified} />}
                    </div>
                </div>
            </MiddleContainer>
            <RightContainer logo={true} />
        </PageContainer>
    )
}

export default UserProfile