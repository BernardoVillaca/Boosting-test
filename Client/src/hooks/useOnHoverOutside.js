import { useEffect } from "react";

export function useOnHoverOutside(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            if (!ref || !ref.current || ref.current.contains(event.target)) return;
            handler(event);
        };
        document.addEventListener("mousemove", listener);
        return () => {
            document.removeEventListener("mousemove", listener);
        };
    },
        [ref, handler]
    );
}