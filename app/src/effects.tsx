import { useState, useEffect, useRef } from "react";
export type Direction = "right"|"left"|"up"|"down";
export function useFadeIn(direction: Direction = "right") {
    const ref = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        if (!ref.current) return;
        
        const element = ref.current;
        
        const observer = new IntersectionObserver(entry => {
            if(entry[0].isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }            
        },
            {
                threshold: 0.05,
            });
        observer.observe(element);
        return () => {
            observer.disconnect();
        };
        
    }, [ref]);
    
    return {ref, isVisible, direction};
}


export function domLoaded(className: string) {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;

        function addClass() {
            element.classList.add(className);
        }

        if (document.readyState === "loading") {
            window.addEventListener("DOMContentLoaded", addClass);
        } else {
            addClass();
        }

        return () => {
            window.removeEventListener("DOMContentLoaded", addClass);
        };
    }, [className]);

    return ref;
}

export function useWindowSize() {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    return width;
}