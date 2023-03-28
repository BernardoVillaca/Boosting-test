import SignUpForm from "./signUpForm";
import { Link } from "react-router-dom";
import textureBackground from '../../assets/background_texture.png'
import PageContainer from "../../components/containers/pageContainer";
import LeftContainer from "../../components/containers/innerPage/left";
import MiddleContainer from "../../components/containers/innerPage/middle";
import RightContainer from "../../components/containers/innerPage/right";

export const SignUp = () => {
    return (
        <PageContainer image={textureBackground}>
            <LeftContainer />
            <MiddleContainer center={true}>
                <div className="flex flex-col w-[17rem]">
                    <span className='text-3xl pt-16 text-white font-semibold pb-4 '>Sign up to continue</span>
                    <div className='flex items-end pb-8'>
                        <span className='text-primary/black'>Already have an account?</span>
                        <Link
                            to={'/sign-in'}
                            className='px-1 text-sm underline text-white hover:underline-none hover:text-white'
                        >
                            Login here
                        </Link>
                    </div>
                    <SignUpForm />
                </div>
            </MiddleContainer>
            <RightContainer/>
        </PageContainer>

    );
};

export default SignUp;
