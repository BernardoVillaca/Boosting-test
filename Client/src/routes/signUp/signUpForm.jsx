import { useState } from "react";
import { createUserhWithEmailAndPassword, createUserDocumentFromAuth, sendUserVerificationEmail } from '../../utils/firebase.utils';
import FormInput from '../../components/formInput';
import { useNavigate } from "react-router-dom";

import { VscLoading } from "react-icons/vsc";
import { axiosRequest } from "../../utils/api.utils";
import CustomButton from "../../components/buttons/customButton";



const defaultFormFields = {
    displayName: '',
    discord: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword, discord } = formFields;
    const [isProcessing, setIsProcessing] = useState(false)

    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [discordError, setDiscordError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsProcessing(true)
        const firstResponse = await createUserhWithEmailAndPassword(formFields);
        if (firstResponse?.nameError) setNameError(firstResponse.nameError)
        if (firstResponse?.emailError) setEmailError(firstResponse.emailError)
        if (firstResponse?.discordError) setDiscordError(firstResponse.discordError)
        if (firstResponse?.passwordError) setPasswordError(firstResponse.passwordError)
        if (firstResponse?.confirmPasswordError) setConfirmPasswordError(firstResponse.confirmPasswordError)
        if (firstResponse?.success === undefined) return setIsProcessing(false)
        const user = firstResponse.success
        await axiosRequest('createUserDocFromAuth', {
            uid: user.uid,
            email: user.email,
            discord: discord,
            displayName: displayName
        })
        sendUserVerificationEmail()
        setIsProcessing(false)
        navigate('/')
    };

    return (
        <div className='flex flex-col'>
            <form onSubmit={handleSubmit}>
                <FormInput
                    error={nameError}
                    id='Sign up Name'
                    label='Display Name'
                    type='text'
                    onChange={handleChange}
                    onFocus={() => setNameError(null)}
                    name='displayName'
                    value={displayName}
                />
                <FormInput
                    error={emailError}
                    id='Sign up Email'
                    label='Email'
                    type='email'
                    onChange={handleChange}
                    onFocus={() => setEmailError(null)}
                    name='email'
                    value={email}
                />
                <FormInput
                    error={discordError}
                    id='Sign up Discord'
                    label='Discord'
                    type='text'
                    onFocus={() => setDiscordError(null)}
                    onChange={handleChange}
                    name='discord'
                    value={discord}
                />
                <FormInput
                    error={passwordError}
                    id='Sign up Password'
                    label='Password'
                    type='password'
                    onFocus={() => setPasswordError(null)}
                    onChange={handleChange}
                    name='password'
                    value={password}
                />
                <FormInput
                    error={confirmPasswordError}
                    id='Sign up Confirm Password'
                    label='Confirm Password'
                    type='password'
                    onFocus={() => setConfirmPasswordError(null)}
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
                />
                <CustomButton
                    disabled={isProcessing}
                    toggle={true}
                    hover={true}
                    otherProps={'flex place-content-center items-center  w-full h-8 rounded-md '}
                    
                >
                    {isProcessing ?
                        <VscLoading className='animate-spin' /> :
                        'Sign up'
                    }
                </CustomButton>
            </form>
        </div>
    );
};

export default SignUpForm;