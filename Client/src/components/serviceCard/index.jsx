import { Link, useLocation } from 'react-router-dom';
import { BsFillDiamondFill } from 'react-icons/bs'



const ServiceCard = ({ item, small, otherProps }) => {
  const { serviceName, servicePrice, description, serviceImage, category, shortDescription } = item;
  const path = serviceName.replace(/ /g, '').toLowerCase()
  const currentPath = useLocation()

  return (
    <Link
      to={small ? `/${category}/${path}` : `${currentPath.pathname}/${path}`}
      className={`flex group/container relative ${small ? 'w-[200px] h-[200px]' : 'w-64 h-64 m-2'} ${otherProps} text-white  rounded-lg overflow-hidden  space-x-2 space-y-1 items-end snap-end snap`}
      style={{
        backgroundImage: `linear-gradient(30deg, rgba(30,27,29,0.95) 45%, rgba(30,27,29,0.05) 66%, rgba(30,27,29,0) 100%), url(${serviceImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className={`absolute ${small ? 'h-[66px]' : 'h-24'}  w-[1px] top-0 bg-gradient-to-b from-transparent via-white to-transparent opacity-0
                      ${small ? 'group-hover/container:translate-y-[8rem]' : 'group-hover/container:translate-y-[10rem]'}  group-hover/container:opacity-100 ease-in duration-500`} />
      <div className={`absolute ${small ? 'h-[66px]' : 'h-24'}  w-[1px] right-0 bg-gradient-to-t from-transparent via-white to-transparent opacity-0
                      ${small ? 'group-hover/container:-translate-y-[8rem]' : 'group-hover/container:-translate-y-[10rem]'} group-hover/container:opacity-100 ease-in duration-500`} />
     
      <div className='flex flex-col w-full text-start  pb-2'>
        <p className='text-xl'>{serviceName}</p>
        {small ? (
          <>
            {shortDescription?.map((item, index) =>
              <div key={index} className='flex items-center space-x-2 pl-2'>
                <BsFillDiamondFill size={8} />
                <p>{item}</p>
              </div>
            )}
          </>
        ) : (
          <>
            {description.map((item, index) =>
              <div key={index} className='flex items-center space-x-2'>
                <BsFillDiamondFill size={8} />
                <p>{item}</p>
              </div>
            )}
          </>
        )}
        <div className='h-full w-full flex place-content-end px-4'>
          <p className={`${small ? 'text-2xl' : 'text-3xl'} font-bold  text-yellowish/white`}> from ${servicePrice.toFixed(2)}</p>
        </div>

      </div>
    </Link >

  );
};

export default ServiceCard