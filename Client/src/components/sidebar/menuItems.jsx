import { Link } from 'react-router-dom'


const MenuItems = ({ item, index, lastIndex }) => {

    return (
        <>
            <div className={`flex opacity-90 h-11 justify-between place-content-center items-center ${index !== lastIndex && 'border-b-[1px]'} border-opacity-20 border-secondary/gray text-white hover:text-primary/purple select-none`}>
                <Link
                    className='flex h-full w-full place-content-start items-center pl-4 space-x-4'
                    key={index}
                    to={`${item.path}`}
                >
                    <img className='h-5' src={item.icon} />
                    <span>{item.name}</span>
                </Link>
            </div>

        </>
    )
}

export default MenuItems;