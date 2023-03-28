import backgroundImage from '../../assets/background_elf.png'
import LeftContainer from '../../components/containers/innerPage/left';
import MiddleContainer from '../../components/containers/innerPage/middle';
import RightContainer from '../../components/containers/innerPage/right';
import PageContainer from '../../components/containers/pageContainer';
import BottomSection from './bottomSection';
import FeaturedServices from './featuredServices';
import HeroSection from './heroSection';

const Home = () => {

  return (
    <PageContainer image={backgroundImage}>
      <LeftContainer />
      <MiddleContainer>
        <HeroSection />
        <FeaturedServices />
        <BottomSection/>
      </MiddleContainer>
      <RightContainer logo={true} />
    </PageContainer>
  )
};

export default Home;