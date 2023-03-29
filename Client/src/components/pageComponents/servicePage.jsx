import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getDocumentsByField } from '../../utils/firebase.utils'
import textureBackground from '../../assets/background_texture.png'
import RegionTab from '../serviceTabs/regionTab';
import HoursSlideBar from '../serviceTabs/hoursSlideBar';
import OptionsTab from '../serviceTabs/optionsTab';
import PriceTab from '../serviceTabs/priceTab';
import { ServicePageProvider } from '../context/service-page.context';
import CoachLvl from '../serviceTabs/coachLvlTab';
import RatingSlideBar from '../serviceTabs/ratingSlideBar';
import ClassTab from '../serviceTabs/classTab';
import Title from './title';
import PageContainer from '../containers/pageContainer';
import LeftContainer from '../containers/innerPage/left';
import MiddleContainer from '../containers/innerPage/middle';
import RightContainer from '../containers/innerPage/right';
import FactionTab from '../serviceTabs/factionTab';
import RequestBooster from '../serviceTabs/requestBooster';
import SlideBar from '../serviceTabs/resourceSliderBar';
import StartRatingSlideBar from '../serviceTabs/startRatingSlideBar';
import { useFetch } from '../../hooks/useFetch';

const ServicePage = () => {
  const path = useLocation();
  const lastItem = path.pathname.split("/").pop();


  const fetchedService = useFetch({ key: `${lastItem}`, fn: async () => await getDocumentsByField('ServicesInfo', 'path', lastItem) })
  const [service] = fetchedService || [];
  const { serviceName, serviceImage, ratingSlideBar, description, factionTab, hoursSlideBar, regionTab, coachLvls, resourceSlideBar, serviceOptions, startRatingSlideBar } = service || {}

  return (
    <ServicePageProvider>
      <PageContainer image={textureBackground}>
        {service &&
          <>
            <LeftContainer />
            <MiddleContainer >
              <div className='flex flex-col h-full space-y-8 '>
                <Title text={serviceName} />
                <div className='flex flex-col space-y-4 text-yellowish/white'>
                  {description?.map((item, index) =>
                    <p key={index}>{item}</p>
                  )}
                </div>
              </div>
            </MiddleContainer>
            <RightContainer>
              <div
                className=' w-[22rem] rounded-md shadow-2xl'
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(30,27,29,1) 41%, rgba(30,27,29,0.66) 100%),
                  url(${serviceImage})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100%',
                }}
              >
                {regionTab && <RegionTab />}
                {factionTab && <FactionTab />}
                {coachLvls && <CoachLvl service={service} />}
                {hoursSlideBar && <HoursSlideBar />}
                {ratingSlideBar && <RatingSlideBar min={ratingSlideBar.min} max={ratingSlideBar.max} />}
                {resourceSlideBar && <SlideBar service={service} />}
                {startRatingSlideBar && <StartRatingSlideBar service={service} />}
                {serviceOptions && <OptionsTab service={service} />}
                <RequestBooster titleWidht={'w-[12rem]'} />
                <ClassTab />
                <PriceTab service={service} />
              </div>
            </RightContainer>
          </>
        }
      </PageContainer>
    </ServicePageProvider>
  )
}

export default ServicePage