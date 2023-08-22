import { Link } from 'react-router-dom'


const MenuItems = ({ item, index, lastIndex, isMobileMenuOpen }) => {

    return (
        <>
            <div className={`flex opacity-90 h-11 justify-between place-content-center items-center ${index !== lastIndex && 'border-b-[1px]'} border-opacity-20 border-secondary/gray text-white hover:text-primary/purple select-none`}>
                <Link
                    className='flex h-full w-full place-content-start items-center   space-x-2 md:space-x-4 '
                    key={index}
                    to={`${item.path}`}
                >
                    <div className='flex h-10 w-10  items-center place-content-center'>
                        <img className='h-5 text' src={item.icon} />
                    </div>
                    {isMobileMenuOpen && <span className='text-xs md:hidden '>{item.name}</span>}
                    <span className=' hidden md:flex'>{item.name}</span>
                </Link>
            </div>

        </>
    )
}

export default MenuItems;