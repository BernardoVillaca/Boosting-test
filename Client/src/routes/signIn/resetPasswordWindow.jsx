import React, { useContext, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { sendUserPasswordResetEmail } from '../../utils/firebase.utils';
import FormInput from '../../components/formInput';
import { VscLoading } from "react-icons/vsc";
import { AppContext} from '../../components/context/appContext';
import CustomButton from '../../components/buttons/customButton';

const PasswordReset = () => {
    const { setIsPasswordResetOpen, setEmailSent } = useContext(AppContext)
    const [resetEmail, setResetEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)


    const triggerEmailSentEffect = () => {
        setEmailSent(true)
        setTimeout(() => {
            setEmailSent(false)

        }, 4000);
    }

    const handleClick = async (e) => {
        setIsProcessing(true)
        e.preventDefault()
        const response = await sendUserPasswordResetEmail(resetEmail)
        setIsProcessing(false)
        if (response?.emailError) return setEmailError(response?.emailError)
        if (response?.success) {
            triggerEmailSentEffect()
            setIsPasswordResetOpen(false)
        }
    }

    return (
        <div className='absolute flex h-screen w-screen place-content-center items-center left-0 '>
            <button
                className='absolute flex z-20 h-full w-full bg-primary/black opacity-50 cursor-default'
                onClick={() => {
                    setIsPasswordResetOpen(false)
                    document.body.style.overflow = ""
                }}
            />
            <div className='flex flex-col z-50 pb-4 mb-[13rem]  bg-primary/black rounded-md px-6'>
                <div className='flex h-2 z-50 place-content-end w-full pt-3'>
                    <button
                        onClick={() => {
                            setIsPasswordResetOpen(false)
                            document.body.style.overflow = ""
                        }}
                    >
                        <AiOutlineClose style={{color: 'white'}}/>
                    </button>
                </div>
                <h1 className='text-2xl font-semibold text-white'>Forgot Password?</h1>
                <span className='text-primary/purple mb-8'>No worries, we'll send reset instructions</span>
                <form>
                    <FormInput
                        // setErrorsToNull={setErrorsToNull}
                        error={emailError}
                        id='Reset Email'
                        label='Email'
                        type='email'
                        onChange={(e) => {
                            setEmailError(null)
                            setResetEmail(e.target.value)
                        }}
                        name='email'
                        value={resetEmail}
                    />
                    <CustomButton
                        onClick={handleClick}
                        disabled={isProcessing}
                        otherProps={'w-full h-8 flex'}
                        hover={true}
                        toggle={true}
                    >
                        {isProcessing ?
                            <VscLoading className='animate-spin' /> :
                            'Reset Password'
                        }
                    </CustomButton>
                </form>
            </div>
        </div >
    )
}

export default PasswordReset