import { useState, useEffect } from 'react';
import { IoCart } from "react-icons/io5";

function AddToCartButton({ onClickHandler }) {
    const [added, setAdded] = useState(false);
    const [cartMoved, setCartMoved] = useState(false);

    useEffect(() => {
        if (!added) return
        const timer = setTimeout(() => {
            setAdded(false);
            setCartMoved(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, [added]);

    const handleClick = () => {
       const response = onClickHandler()
       if(response === false) return
        setCartMoved(true);
        setTimeout(() => {
            setAdded(true);

        }, 300);
    };

    return (
        <div className="relative w-36 h-12 overflow-hidden shadow-md mt-6">
            <button
            disabled={added === true || cartMoved === true}
                className="flex shadow-xl box-shado items-center justify-center place-content-center w-full h-full bg-primary/purple  rounded-md hover:bg-secondary/light-purple transition duration-300"
                onClick={handleClick}
            >
                <IoCart
                    size={25}
                    className={`absolute transition-all top-1/2 transform -translate-y-1/2 ${cartMoved ? 'translate-x-24' : null}`}
                />
                {added && (
                    <span className="text-lg">
                        Added!
                    </span>
                )}
            </button>
        </div>
    );
}

export default AddToCartButton;
