import { useState } from "react";
import { signInWithGooglePoppup, createUserDocumentFromAuth, signInUserhWithEmailAndPassword, sendUserPasswordResetEmail } from '../../utils/firebase.utils';
import FormInput from '../../components/formInput';
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { VscLoading } from "react-icons/vsc";
import { axiosRequest } from "../../utils/api.utils";
import CustomButton from "../../components/buttons/customButton";

const defaultFormFields = {
    email: '',
    password: '',

};

const SignInForm = () => {
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const [isProcessing, setIsprocessing] = useState(false)

    const [emailError, setEmailError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)

    const setErrorsToNull = () => {
        setEmailError(null)
        setPasswordError(null)
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const signInWithGoogle = async () => {
        const response = await signInWithGooglePoppup();
        const user = response?.success
        await axiosRequest('createUserDocFromAuth', {
            uid: user.uid,
            email: user.email,
            discord: '',
            displayName: user.displayName
        })
        navigate('/')
    };

    const handleSubmit = async (event) => {
        setIsprocessing(true)
        event.preventDefault();
        const response = await signInUserhWithEmailAndPassword(email, password)
        if (response?.success) {
            resetFormFields();
            setIsprocessing(false)
            return navigate('/')
        }
        setIsprocessing(false)
        if (response?.emailError) setEmailError(response.emailError)
        if (response?.passwordError) setPasswordError(response.passwordError)

    };
    return (

        <div className='flex flex-col pt-8'>
            <form
                onSubmit={handleSubmit}
            >
                <FormInput
                    setErrorsToNull={setErrorsToNull}
                    error={emailError}
                    id='Sign in Email'
                    label='Email'
                    type='email'
                    onChange={handleChange}
                    name='email'
                    value={email}
                />
                <FormInput
                    setErrorsToNull={setErrorsToNull}
                    error={passwordError}
                    id='Sign in Password'
                    label='Password'
                    type='password'
                    onChange={handleChange}
                    name='password'
                    value={password}
                />
                <CustomButton
                    disabled={isProcessing}
                    toggle={true}
                    hover={true}
                    otherProps={'flex place-content-center items-center w-full h-8 rounded-md mb-2'}

                >
                    {isProcessing ?
                        <VscLoading className='animate-spin' /> :
                        'Sign in'
                    }
                </CustomButton>
            </form>
            <CustomButton
                gray={true}
                otherProps={'flex place-content-center items-center w-full h-8'}
                onClick={signInWithGoogle}
            >
                <FcGoogle size={25} />
            </CustomButton>
        </div>
    );
};

export default SignInForm;