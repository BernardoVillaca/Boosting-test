import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { confirmOldPassword, updateUserPassword } from '../../../utils/firebase.utils';
import useDebounce from '../../../hooks/useDebounce';
import { VscLoading } from "react-icons/vsc";
import { AppContext } from '../../../components/context/appContext';
import ChangePWInput from './changePwInput';
import CustomButton from '../../../components/buttons/customButton';

const ChangePassordWindow = () => {
    const { setIsPasswordWindowOpen, setPasswordChangeEffect, userInfo } = useContext(AppContext)

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [isProcessing, setIsProcessing] = useState(false)

    const [isPasswordCorrect, setIsPasswordCorrent] = useState(null)
    const [doPasswordMatch, setDoPasswordMatch] = useState(null)

    const oldPasswordDebouncedValue = useDebounce(oldPassword, 1000);
    const confirmPasswordDebouncedValue = useDebounce(confirmPassword, 1000);

    const [oldPasswordErrorEffect, setOldPasswordErrorEffect] = useState(false)
    const [newPasswordErrorEffect, setNewPasswordErrorEffect] = useState(false)
    const [confirmPasswordErrorEffect, setConfirmPasswordErrorEffect] = useState(false)

    const [oldPasswordError, setOldPasswordError] = useState('')
    const [newPasswordError, setNewPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')


    const triggerPassWordChangeEffect = () => {
        setPasswordChangeEffect(true)
        setTimeout(() => {
            setPasswordChangeEffect(false)
        }, '3000')
    }

    const triggerOldPassowordErrorEffect = () => {
        if (oldPasswordErrorEffect === true) return
        setOldPasswordErrorEffect(true)
        setTimeout(() => {
            setOldPasswordErrorEffect(false)
        }, '400')
    }

    const triggerNewPassowordErrorEffect = () => {
        if (newPasswordErrorEffect === true) return
        setNewPasswordErrorEffect(true)
        setTimeout(() => {
            setNewPasswordErrorEffect(false)
        }, '400')
    }
    const triggerConfirmPasswordErrorEffect = () => {
        if (confirmPasswordErrorEffect === true) return
        setConfirmPasswordErrorEffect(true)
        setTimeout(() => {
            setConfirmPasswordErrorEffect(false)
        }, '400')
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (oldPassword === '') setOldPasswordError('old password required!!')
        if (confirmPassword === '') setConfirmPasswordError('confirm password required!!')
        if (newPassword === '') setNewPasswordError('new password required!!')
        if (newPassword.length <= 8) setNewPasswordError('password must have at least 8 characters')
        if (newPasswordError !== '') triggerNewPassowordErrorEffect()
        if (oldPasswordError !== '') triggerOldPassowordErrorEffect()
        if (confirmPasswordError !== '') return triggerConfirmPasswordErrorEffect()
        if (doPasswordMatch === true && isPasswordCorrect === true) {
            setIsProcessing(true)
            const response = await updateUserPassword(userInfo.email, oldPassword, newPassword, confirmPassword)
            if (response?.success) {
                setIsProcessing(false)
                triggerPassWordChangeEffect()
                setIsPasswordWindowOpen(false)
            }
            setIsProcessing(false)
        }
    }

    useEffect(() => {
        const passwordCheck = async () => {
            if (oldPasswordDebouncedValue !== '') {
                const response = await confirmOldPassword(userInfo.email, oldPasswordDebouncedValue)
                if (response?.success) return setIsPasswordCorrent(true)
                setOldPasswordError('wrong password!!')
                setIsPasswordCorrent(false)
            }
        }
        passwordCheck()
    }, [oldPasswordDebouncedValue])

    useEffect(() => {
        const passwordsMatch = () => {
            if (newPassword === '') return setDoPasswordMatch(null)
            if (confirmPasswordDebouncedValue === '') return setDoPasswordMatch(null)
            if (newPassword.length <= 8) return setNewPasswordError('at least 8 characters')
            if (confirmPasswordDebouncedValue === newPassword) return setDoPasswordMatch(true)
            setConfirmPasswordError('passwords do not match')
            setDoPasswordMatch(false)
        }
        passwordsMatch()
    }, [confirmPasswordDebouncedValue, newPassword])


    return (
        <div className='absolute flex h-screen w-screen place-content-center items-center left-0 '>
            <button
                className='absolute flex h-screen w-screen  z-10 bg-primary/black opacity-40 cursor-default'
                onClick={() => {
                    setIsPasswordWindowOpen(false)
                    document.body.style.overflow = ""
                }}
            />
            <div className='flex flex-col rounded-md bg-primary/black px-6 z-10'         >
                <div className='flex place-content-end w-full mb-3 pt-3 '>
                    <button
                        onClick={() => {
                            setIsPasswordWindowOpen(false)
                            document.body.style.overflow = ""
                        }}
                    >
                        <AiOutlineClose className='text-white' />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <ChangePWInput
                        inputName={'Old password:'}
                        onChange={(e) => {
                            setOldPasswordError('')
                            setOldPassword(e.target.value)
                            setIsPasswordCorrent(null)
                        }}
                        value={oldPassword}
                        error={oldPasswordError}
                        effect={oldPasswordErrorEffect}
                        confirmation={isPasswordCorrect}
                    />
                    <ChangePWInput
                        inputName={'New password:'}
                        onChange={(e) => {
                            setNewPasswordError('')
                            setNewPassword(e.target.value)
                            setDoPasswordMatch(null)
                            setConfirmPassword('')
                        }}
                        value={newPassword}
                        error={newPasswordError}
                        effect={newPasswordErrorEffect}
                    />
                    <ChangePWInput
                        inputName={'Confirm password:'}
                        onChange={(e) => {
                            setConfirmPasswordError('')
                            setConfirmPassword(e.target.value)
                            setDoPasswordMatch(null)
                        }}
                        value={confirmPassword}
                        error={confirmPasswordError}
                        effect={confirmPasswordErrorEffect}
                        confirmation={doPasswordMatch}
                    />
                    <div className='flex w-full items-center place-content-center p-3'>
                        <CustomButton
                            otherProps={'p-1'}
                            gray={true}
                            disabled={isProcessing}
                        >
                            {isProcessing ? <VscLoading className='animate-spin' /> : 'Change Password'}
                        </CustomButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePassordWindow