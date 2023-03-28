
import SignInForm from "./signInForm";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import PasswordReset from "./resetPasswordWindow";
import PageContainer from "../../components/containers/pageContainer";
import textureBackground from '../../assets/background_texture.png'
import LeftContainer from "../../components/containers/innerPage/left";
import MiddleContainer from "../../components/containers/innerPage/middle";
import RightContainer from "../../components/containers/innerPage/right";
import { AppContext} from "../../components/context/appContext";

export const SignIn = () => {
  const { setIsPasswordResetOpen, emailSent } = useContext(AppContext)


  const handleOpenPasswordReset = () => {
    setIsPasswordResetOpen(true)
    document.body.style.overflow = "hidden"
  }

  return (
    <PageContainer image={textureBackground}>
      <LeftContainer />
      <MiddleContainer center={true}>
        <div className='flex flex-col w-[17rem]'>
          <span className='text-3xl font-semibold pt-16 pb-4 text-white'>Sign in to continue</span>
          <div className='flex items-end'>
            <span className='text-primary/black'>Don't have an account?</span>
            <Link
              to={'/sign-up'}
              className='px-1 text-sm text-/white underline text hover:text-white hover:underline-none'
            >
              Register here
            </Link>
          </div>
          <SignInForm />
          <button
            onClick={handleOpenPasswordReset}
            className="text-sm text-/white underline p-2 hover:text-white"
          >
            Forgot password?
          </button>
          {emailSent &&
            <span className='w-full text-center text-custom-green'>Email has been sent!!</span>
          }
        </div>
      </MiddleContainer>
      <RightContainer />
    </PageContainer>


  );
};

export default SignIn;
