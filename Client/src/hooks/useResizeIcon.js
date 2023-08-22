import { useEffect, useState } from "react";


export const useResizeIcons = (smallScreen, aboveMedium) => {
    const [iconSize, setIconSize] = useState(smallScreen);
    
   
    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            if (width >= 768) return setIconSize(aboveMedium);
            setIconSize(smallScreen)
        }

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return iconSize

}